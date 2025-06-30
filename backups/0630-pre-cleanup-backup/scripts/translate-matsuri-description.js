const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// 腾讯云翻译API配置
const secretId = process.env.TENCENT_SECRET_ID;
const secretKey = process.env.TENCENT_SECRET_KEY;
const endpoint = 'tmt.tencentcloudapi.com';
const service = 'tmt';
const version = '2018-03-21';
const action = 'TextTranslate';
const region = 'ap-beijing';

// 腾讯云API签名算法（官方实现）
function sha256(message, secret = '', encoding) {
    const hmac = crypto.createHmac('sha256', secret);
    return hmac.update(message).digest(encoding);
}

function getHash(message, encoding = 'hex') {
    const hash = crypto.createHash('sha256');
    return hash.update(message).digest(encoding);
}

// 腾讯云翻译API调用
async function tencentTranslate(text) {
    const timestamp = Math.floor(Date.now() / 1000);
    const date = new Date(timestamp * 1000).toISOString().substr(0, 10);

    // 构建规范请求串
    const httpRequestMethod = 'POST';
    const canonicalUri = '/';
    const canonicalQueryString = '';
    const canonicalHeaders = `content-type:application/json; charset=utf-8\nhost:${endpoint}\nx-tc-action:${action.toLowerCase()}\n`;
    const signedHeaders = 'content-type;host;x-tc-action';
    
    const payload = JSON.stringify({
        SourceText: text,
        Source: 'ja',
        Target: 'zh',
        ProjectId: 0
    });
    
    const hashedRequestPayload = getHash(payload);
    const canonicalRequest = `${httpRequestMethod}\n${canonicalUri}\n${canonicalQueryString}\n${canonicalHeaders}\n${signedHeaders}\n${hashedRequestPayload}`;

    // 构建待签名字符串
    const algorithm = 'TC3-HMAC-SHA256';
    const requestTimestamp = timestamp;
    const credentialScope = `${date}/${service}/tc3_request`;
    const hashedCanonicalRequest = getHash(canonicalRequest);
    const stringToSign = `${algorithm}\n${requestTimestamp}\n${credentialScope}\n${hashedCanonicalRequest}`;

    // 计算签名
    const secretDate = sha256(date, 'TC3' + secretKey);
    const secretService = sha256(service, secretDate);
    const secretSigning = sha256('tc3_request', secretService);
    const signature = sha256(stringToSign, secretSigning, 'hex');

    // 构建Authorization
    const authorization = `${algorithm} Credential=${secretId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

    try {
        const response = await fetch(`https://${endpoint}`, {
            method: 'POST',
            headers: {
                'Authorization': authorization,
                'Content-Type': 'application/json; charset=utf-8',
                'Host': endpoint,
                'X-TC-Action': action,
                'X-TC-Timestamp': requestTimestamp.toString(),
                'X-TC-Version': version,
                'X-TC-Region': region
            },
            body: payload
        });

        const data = await response.json();
        
        if (data.Response && data.Response.Error) {
            throw new Error(`API Error: ${data.Response.Error.Code} - ${data.Response.Error.Message}`);
        }
        
        return data.Response.TargetText;
    } catch (error) {
        console.error(`翻译失败: ${error.message}`);
        throw error;
    }
}

// 日文检测函数
function containsJapanese(text) {
    if (!text || typeof text !== 'string') return false;
    
    // 检测平假名、片假名
    const hiraganaKatakana = /[\u3040-\u309F\u30A0-\u30FF]/;
    if (hiraganaKatakana.test(text)) return true;
    
    // 检测日文特有的汉字模式和标点
    const japanesePatterns = [
        /[駅町丁目番地]/,           // 日文地址用汉字
        /[～※]/,                    // 日文标点
        /\d+年\d+月\d+日/,          // 日期格式
        /午前|午後/,                // 时间表达
        /会場|開催|主催|協賛/,       // 活动相关词汇
        /お問い合わせ|詳細/,        // 常见表达
        /無料|有料/                 // 价格表达
    ];
    
    return japanesePatterns.some(pattern => pattern.test(text));
}

// 扫描所有matsuri页面
function findMatsuriPages() {
    const regions = ['chiba', 'kanagawa', 'kitakanto', 'koshinetsu', 'saitama', 'tokyo'];
    const matsuriPages = [];
    
    regions.forEach(region => {
        const matsuriDir = path.join('app', region, 'matsuri');
        if (fs.existsSync(matsuriDir)) {
            const items = fs.readdirSync(matsuriDir);
            items.forEach(item => {
                const itemPath = path.join(matsuriDir, item);
                const pagePath = path.join(itemPath, 'page.tsx');
                if (fs.existsSync(pagePath)) {
                    matsuriPages.push({
                        region,
                        activity: item,
                        path: pagePath
                    });
                }
            });
        }
    });
    
    return matsuriPages;
}

// 处理单个页面的description字段
async function processMatsuriDescription(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    let translatedFields = 0;
    
    // 匹配description字段
    const descriptionPattern = /"description":\s*"([^"]+)"/g;
    const matches = [...content.matchAll(descriptionPattern)];
    
    if (matches.length === 0) {
        return { modified: false, translatedFields: 0 };
    }
    
    let newContent = content;
    
    for (const match of matches) {
        const fullMatch = match[0];
        const descriptionText = match[1];
        
        // 检查是否包含日文
        if (containsJapanese(descriptionText)) {
            try {
                console.log(`  🔤 翻译description: "${descriptionText.substring(0, 50)}..."`);
                
                const translatedText = await tencentTranslate(descriptionText);
                const newMatch = `"description": "${translatedText}"`;
                
                newContent = newContent.replace(fullMatch, newMatch);
                modified = true;
                translatedFields++;
                
                console.log(`  ✅ 翻译完成: "${translatedText.substring(0, 50)}..."`);
                
                // 延迟1秒避免API限制
                await new Promise(resolve => setTimeout(resolve, 1000));
                
            } catch (error) {
                console.log(`  ❌ 翻译失败: ${error.message}`);
                // 继续处理其他字段
            }
        }
    }
    
    if (modified) {
        fs.writeFileSync(filePath, newContent, 'utf8');
    }
    
    return { modified, translatedFields };
}

// 主函数
async function translateMatsuriDescriptions() {
    console.log('🏮 开始翻译六个地区MATSURI活动的description字段');
    console.log('=================================================');
    
    // 检查API
    try {
        console.log('🔧 测试腾讯云API连接...');
        await tencentTranslate('テスト');
        console.log('✅ API连接正常\n');
    } catch (error) {
        console.log(`❌ API连接失败: ${error.message}`);
        console.log('🛑 暂停执行');
        return;
    }
    
    // 扫描matsuri页面
    const matsuriPages = findMatsuriPages();
    console.log(`📊 发现 ${matsuriPages.length} 个matsuri页面\n`);
    
    let totalProcessed = 0;
    let totalTranslated = 0;
    let successCount = 0;
    
    for (const page of matsuriPages) {
        console.log(`📝 处理: ${page.region}/${page.activity}`);
        
        try {
            const result = await processMatsuriDescription(page.path);
            
            if (result.modified) {
                console.log(`  ✅ 成功翻译 ${result.translatedFields} 个description字段`);
                successCount++;
                totalTranslated += result.translatedFields;
            } else {
                console.log(`  ℹ️  无需翻译（无日文内容或已翻译）`);
            }
            
            totalProcessed++;
            
        } catch (error) {
            console.log(`  ❌ 处理失败: ${error.message}`);
        }
        
        console.log(''); // 空行分隔
    }
    
    console.log('🎉 matsuri description翻译完成！');
    console.log('==============================');
    console.log(`📊 总处理页面: ${totalProcessed}`);
    console.log(`✅ 成功处理: ${successCount}`);
    console.log(`🔤 翻译字段: ${totalTranslated}`);
    console.log(`📍 覆盖地区: chiba, kanagawa, kitakanto, koshinetsu, saitama, tokyo`);
}

// 运行脚本
if (require.main === module) {
    translateMatsuriDescriptions().catch(console.error);
}

module.exports = {
    translateMatsuriDescriptions,
    findMatsuriPages,
    processMatsuriDescription,
    tencentTranslate
}; 