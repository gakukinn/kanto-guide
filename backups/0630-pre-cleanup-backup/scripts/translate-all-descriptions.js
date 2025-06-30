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

    const algorithm = 'TC3-HMAC-SHA256';
    const requestTimestamp = timestamp;
    const credentialScope = `${date}/${service}/tc3_request`;
    const hashedCanonicalRequest = getHash(canonicalRequest);
    const stringToSign = `${algorithm}\n${requestTimestamp}\n${credentialScope}\n${hashedCanonicalRequest}`;

    const secretDate = sha256(date, 'TC3' + secretKey);
    const secretService = sha256(service, secretDate);
    const secretSigning = sha256('tc3_request', secretService);
    const signature = sha256(stringToSign, secretSigning, 'hex');

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
        /無料|有料/,                // 价格表达
        /により始められた|開催されます|行われます|催されます|出店し|賑わいます/, // 活动描述常用词
        /をはじめ|をはじめとして/,   // 常用表达
        /など|なども|において/      // 助词表达
    ];
    
    return japanesePatterns.some(pattern => pattern.test(text));
}

// 扫描所有四层页面
function findAllFourthLevelPages() {
    const regions = ['chiba', 'kanagawa', 'kitakanto', 'koshinetsu', 'saitama', 'tokyo'];
    const activities = ['hanabi', 'hanami', 'matsuri', 'bunka']; // 所有活动类型
    const pages = [];
    
    regions.forEach(region => {
        activities.forEach(activity => {
            const activityDir = path.join('app', region, activity);
            if (fs.existsSync(activityDir)) {
                const items = fs.readdirSync(activityDir);
                items.forEach(item => {
                    const itemPath = path.join(activityDir, item);
                    const pagePath = path.join(itemPath, 'page.tsx');
                    if (fs.existsSync(pagePath)) {
                        pages.push({
                            region,
                            activity,
                            item,
                            path: pagePath
                        });
                    }
                });
            }
        });
    });
    
    return pages;
}

// 处理单个页面的description字段
async function processPageDescription(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    let translatedFields = 0;
    
    // 支持两种格式的description字段匹配
    // 格式1: "description": "content" (JSON格式)
    // 格式2: description: "content" (JavaScript对象格式)
    const descriptionPatterns = [
        /"description":\s*"([^"]+)"/g,    // JSON格式
        /description:\s*"([^"]+)"/g       // JavaScript对象格式
    ];
    
    let newContent = content;
    let foundMatches = false;
    
    for (const pattern of descriptionPatterns) {
        const matches = [...content.matchAll(pattern)];
        
        if (matches.length > 0) {
            foundMatches = true;
            console.log(`  🔍 找到 ${matches.length} 个description字段 (${pattern.source})`);
            
            for (const match of matches) {
                const fullMatch = match[0];
                const descriptionText = match[1];
                
                // 检查是否包含日文
                if (containsJapanese(descriptionText)) {
                    try {
                        console.log(`  🔤 翻译: "${descriptionText.substring(0, 60)}..."`);
                        
                        const translatedText = await tencentTranslate(descriptionText);
                        
                        // 保持原格式替换
                        let newMatch;
                        if (fullMatch.includes('"description":')) {
                            // JSON格式
                            newMatch = `"description": "${translatedText}"`;
                        } else {
                            // JavaScript对象格式
                            newMatch = `description: "${translatedText}"`;
                        }
                        
                        newContent = newContent.replace(fullMatch, newMatch);
                        modified = true;
                        translatedFields++;
                        
                        console.log(`  ✅ 翻译完成: "${translatedText.substring(0, 60)}..."`);
                        
                        // 延迟1秒避免API限制
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        
                    } catch (error) {
                        console.log(`  ❌ 翻译失败: ${error.message}`);
                        // 继续处理其他字段
                    }
                } else {
                    console.log(`  ℹ️  跳过非日文内容: "${descriptionText.substring(0, 30)}..."`);
                }
            }
        }
    }
    
    if (!foundMatches) {
        console.log(`  ⚠️  未找到description字段`);
    }
    
    if (modified) {
        fs.writeFileSync(filePath, newContent, 'utf8');
    }
    
    return { modified, translatedFields };
}

// 主函数
async function translateAllDescriptions() {
    console.log('📝 开始翻译所有四层页面的description字段');
    console.log('==============================================');
    console.log('🎯 翻译范围: 所有地区 × 所有活动类型');
    console.log('🔤 翻译内容: 仅description字段');
    console.log('🚫 跳过内容: organizer等官方名称');
    console.log('');
    
    // 检查API
    try {
        console.log('🔧 测试腾讯云API连接...');
        await tencentTranslate('テスト');
        console.log('✅ API连接正常\n');
    } catch (error) {
        console.log(`❌ API连接失败: ${error.message}`);
        console.log('🛑 暂停一切执行');
        console.log('💡 建议：检查网络连接和API密钥配置');
        return;
    }
    
    // 扫描所有四层页面
    const allPages = findAllFourthLevelPages();
    console.log(`📊 发现 ${allPages.length} 个四层页面\n`);
    
    // 按地区分组显示统计
    const regionStats = {};
    allPages.forEach(page => {
        if (!regionStats[page.region]) regionStats[page.region] = {};
        if (!regionStats[page.region][page.activity]) regionStats[page.region][page.activity] = 0;
        regionStats[page.region][page.activity]++;
    });
    
    console.log('📋 页面分布统计:');
    Object.entries(regionStats).forEach(([region, activities]) => {
        const total = Object.values(activities).reduce((sum, count) => sum + count, 0);
        console.log(`  📍 ${region}: ${total}个页面`);
        Object.entries(activities).forEach(([activity, count]) => {
            console.log(`     🎆 ${activity}: ${count}个`);
        });
    });
    console.log('');
    
    let totalProcessed = 0;
    let totalTranslated = 0;
    let successCount = 0;
    let errorCount = 0;
    
    for (const page of allPages) {
        console.log(`📝 处理 [${totalProcessed + 1}/${allPages.length}]: ${page.region}/${page.activity}/${page.item}`);
        
        try {
            const result = await processPageDescription(page.path);
            
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
            errorCount++;
            
            // 如果错误率太高，暂停执行
            if (errorCount > 5) {
                console.log('\n🛑 检测到多个连续错误，暂停执行');
                console.log('💡 建议：检查网络连接或API限制');
                break;
            }
        }
        
        console.log(''); // 空行分隔
    }
    
    console.log('🎉 description字段翻译完成！');
    console.log('================================');
    console.log(`📊 总处理页面: ${totalProcessed}`);
    console.log(`✅ 成功处理: ${successCount}`);
    console.log(`❌ 错误页面: ${errorCount}`);
    console.log(`🔤 翻译字段: ${totalTranslated}`);
    console.log(`📍 覆盖范围: 所有地区 × 所有活动类型`);
}

// 运行脚本
if (require.main === module) {
    translateAllDescriptions().catch(console.error);
}

module.exports = {
    translateAllDescriptions,
    findAllFourthLevelPages,
    processPageDescription,
    tencentTranslate
}; 