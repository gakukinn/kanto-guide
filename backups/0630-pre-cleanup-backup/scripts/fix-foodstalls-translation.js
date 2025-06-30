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

// 简单翻译映射（避免API调用）
const SIMPLE_TRANSLATIONS = {
    'あり': '有',
    'なし': '无',
    '飲食出店あり': '有饮食摊位',
    '屋台あり': '有小摊',
    '売店あり': '有商店',
    '無料': '免费',
    '有料': '收费'
};

// 需要检查的字段（排除地址相关字段）
const HIRAGANA_FIELDS = [
    'foodStalls',      // 饮食摊位
    'parking',         // 停车场 
    'price',           // 价格
    'notes',           // 备注
    'weatherInfo',     // 天气信息
    'contact',         // 联系方式（如果有假名）
    'highlights'       // 亮点（如果有假名）
    // 明确排除: address, venue, access（地址相关不翻译）
];

function getHash(message, encoding = 'hex') {
    const hash = crypto.createHash('sha256');
    hash.update(message, 'utf8');
    return hash.digest(encoding);
}

function sha256(message, encoding = 'hex') {
    return getHash(message, encoding);
}

async function tencentTranslate(sourceText) {
    if (SIMPLE_TRANSLATIONS[sourceText]) {
        console.log(`  📝 使用映射翻译: ${sourceText} → ${SIMPLE_TRANSLATIONS[sourceText]}`);
        return SIMPLE_TRANSLATIONS[sourceText];
    }

    const timestamp = Math.floor(Date.now() / 1000) - 300; // 减去5分钟避免时间同步问题
    const date = new Date(timestamp * 1000).toISOString().substr(0, 10);

    // 构建请求体
    const payload = JSON.stringify({
        SourceText: sourceText,
        Source: 'ja',
        Target: 'zh',
        ProjectId: 0
    });

    // 构建规范请求字符串
    const hashedRequestPayload = sha256(payload);
    const httpRequestMethod = 'POST';
    const canonicalUri = '/';
    const canonicalQueryString = '';
    const canonicalHeaders = `content-type:application/json; charset=utf-8\nhost:${endpoint}\n`;
    const signedHeaders = 'content-type;host';
    const canonicalRequest = [
        httpRequestMethod,
        canonicalUri,
        canonicalQueryString,
        canonicalHeaders,
        signedHeaders,
        hashedRequestPayload
    ].join('\n');

    // 构建待签名字符串
    const algorithm = 'TC3-HMAC-SHA256';
    const hashedCanonicalRequest = sha256(canonicalRequest);
    const credentialScope = `${date}/${service}/tc3_request`;
    const stringToSign = [
        algorithm,
        timestamp,
        credentialScope,
        hashedCanonicalRequest
    ].join('\n');

    // 计算签名
    function hmac256(key, msg) {
        return crypto.createHmac('sha256', key).update(msg, 'utf8').digest();
    }

    const secretDate = hmac256('TC3' + secretKey, date);
    const secretService = hmac256(secretDate, service);
    const secretSigning = hmac256(secretService, 'tc3_request');
    const signature = hmac256(secretSigning, stringToSign).toString('hex');

    // 构建Authorization头
    const authorization = `${algorithm} Credential=${secretId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

    // 发送请求
    const headers = {
        'Authorization': authorization,
        'Content-Type': 'application/json; charset=utf-8',
        'Host': endpoint,
        'X-TC-Action': action,
        'X-TC-Version': version,
        'X-TC-Region': region,
        'X-TC-Timestamp': timestamp.toString()
    };

    try {
        const https = require('https');
        const response = await new Promise((resolve, reject) => {
            const req = https.request(`https://${endpoint}`, {
                method: 'POST',
                headers: headers
            }, (res) => {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => resolve({ status: res.statusCode, data }));
            });
            req.on('error', reject);
            req.write(payload);
            req.end();
        });

        if (response.status === 200) {
            const result = JSON.parse(response.data);
            if (result.Response && result.Response.TargetText) {
                console.log(`  🌐 API翻译: ${sourceText} → ${result.Response.TargetText}`);
                return result.Response.TargetText;
            }
        }
        throw new Error(`API调用失败: ${response.status} ${response.data}`);
    } catch (error) {
        console.log(`  ⚠️  翻译失败: ${error.message}`);
        return sourceText; // 失败时返回原文
    }
}

// 检测是否包含日文假名
function containsHiragana(text) {
    if (!text || typeof text !== 'string') return false;
    
    // 检测平假名和片假名
    const hiraganaKatakana = /[ひらがなカタカナ]|[\u3040-\u309F]|[\u30A0-\u30FF]/;
    
    // 特殊日文表达
    const japaneseExpressions = /あり|なし|無料|有料/;
    
    return hiraganaKatakana.test(text) || japaneseExpressions.test(text);
}

// 处理单个页面文件
async function processPageFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        let modifiedContent = content;
        let translatedCount = 0;

        console.log(`\n🔍 检查: ${filePath}`);

        // 检查每个字段
        for (const field of HIRAGANA_FIELDS) {
            const regex = new RegExp(`"${field}"\\s*:\\s*"([^"]+)"`, 'g');
            let match;

            while ((match = regex.exec(content)) !== null) {
                const fieldValue = match[1];
                
                if (containsHiragana(fieldValue)) {
                    console.log(`  ⚡ 发现需翻译: ${field} = "${fieldValue}"`);
                    
                    const translatedValue = await tencentTranslate(fieldValue);
                    
                    if (translatedValue !== fieldValue) {
                        const oldPattern = `"${field}": "${fieldValue}"`;
                        const newPattern = `"${field}": "${translatedValue}"`;
                        modifiedContent = modifiedContent.replace(oldPattern, newPattern);
                        translatedCount++;
                        console.log(`  ✅ 已翻译: ${fieldValue} → ${translatedValue}`);
                        
                        // 避免API限制
                        await new Promise(resolve => setTimeout(resolve, 1000));
                    }
                }
            }
        }

        // 如果有修改，写入文件
        if (modifiedContent !== content) {
            fs.writeFileSync(filePath, modifiedContent, 'utf8');
            console.log(`  💾 已保存 ${translatedCount} 个翻译`);
        } else {
            console.log(`  ✅ 无需修改`);
        }

        return translatedCount;
    } catch (error) {
        console.error(`❌ 处理文件失败: ${filePath}`, error.message);
        return 0;
    }
}

// 扫描所有四层页面文件
function findPageFiles() {
    const pageFiles = [];
    const rootDir = './app';
    
    function scanDirectory(dirPath) {
        const items = fs.readdirSync(dirPath);
        
        for (const item of items) {
            const fullPath = path.join(dirPath, item);
            const stat = fs.statSync(fullPath);
            
            if (stat.isDirectory()) {
                scanDirectory(fullPath);
            } else if (item === 'page.tsx' && fullPath.split(path.sep).length >= 5) {
                // 四层页面: app/region/activity-type/activity-id/page.tsx
                pageFiles.push(fullPath);
            }
        }
    }
    
    scanDirectory(rootDir);
    return pageFiles;
}

// 主函数
async function main() {
    console.log('🔧 修复foodStalls等假名字段翻译');
    console.log('=====================================');
    
    // 检查环境变量
    if (!secretId || !secretKey) {
        console.error('❌ 环境变量未配置！请检查 TENCENT_SECRET_ID 和 TENCENT_SECRET_KEY');
        return;
    }
    
    console.log('✅ 环境配置正常');
    console.log('🚫 地址字段将被跳过（按用户要求）');
    console.log(`📋 检查字段: ${HIRAGANA_FIELDS.join(', ')}`);
    
    // 获取所有页面文件
    const pageFiles = findPageFiles();
    console.log(`\n📊 找到 ${pageFiles.length} 个四层页面\n`);
    
    let totalTranslated = 0;
    let processedFiles = 0;
    
    // 处理每个文件
    for (const filePath of pageFiles) {
        const count = await processPageFile(filePath);
        totalTranslated += count;
        processedFiles++;
        
        if (count > 0) {
            console.log(`\n✅ ${filePath}: ${count} 个字段已翻译`);
        }
        
        // 显示进度
        if (processedFiles % 10 === 0) {
            console.log(`\n📈 进度: ${processedFiles}/${pageFiles.length} (${Math.round(processedFiles/pageFiles.length*100)}%)`);
        }
    }
    
    console.log('\n🎉 修复完成！');
    console.log('===============');
    console.log(`📊 处理文件: ${processedFiles}`);
    console.log(`🔤 翻译字段: ${totalTranslated}`);
    console.log(`💰 使用映射: ${Object.keys(SIMPLE_TRANSLATIONS).length} 项`);
    console.log('🚫 地址字段已跳过');
}

// 运行脚本
if (require.main === module) {
    require('dotenv').config({ path: '.env.local' });
    main().catch(console.error);
}

module.exports = { processPageFile, tencentTranslate, findPageFiles }; 