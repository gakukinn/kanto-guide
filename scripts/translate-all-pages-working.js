const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const https = require('https');
require('dotenv').config({ path: '.env.local' });

// 腾讯云官方NodeJS示例代码实现
function sha256(message, secret = '', encoding) {
    const hmac = crypto.createHmac('sha256', secret)
    return hmac.update(message).digest(encoding)
}

function getHash(message, encoding = 'hex') {
    const hash = crypto.createHash('sha256')
    return hash.update(message).digest(encoding)
}

function getDate(timestamp) {
    const date = new Date(timestamp * 1000)
    const year = date.getUTCFullYear()
    const month = ('0' + (date.getUTCMonth() + 1)).slice(-2)
    const day = ('0' + date.getUTCDate()).slice(-2)
    return `${year}-${month}-${day}`
}

// 腾讯云翻译API调用
async function tencentTranslate(text) {
    const SECRET_ID = process.env.TENCENT_SECRET_ID;
    const SECRET_KEY = process.env.TENCENT_SECRET_KEY;
    
    const endpoint = "tmt.tencentcloudapi.com";
    const service = "tmt";
    const region = "ap-shanghai";
    const action = "TextTranslate";
    const version = "2018-03-21";
    const timestamp = Math.floor(Date.now() / 1000);
    const date = getDate(timestamp);

    const payload = JSON.stringify({
        "SourceText": text,
        "Source": "ja",
        "Target": "zh",
        "ProjectId": 0
    });

    const hashedRequestPayload = getHash(payload);
    const httpRequestMethod = "POST";
    const canonicalUri = "/";
    const canonicalQueryString = "";
    const canonicalHeaders = "content-type:application/json; charset=utf-8\n"
        + "host:" + endpoint + "\n"
        + "x-tc-action:" + action.toLowerCase() + "\n";
    const signedHeaders = "content-type;host;x-tc-action";

    const canonicalRequest = httpRequestMethod + "\n"
                         + canonicalUri + "\n"
                         + canonicalQueryString + "\n"
                         + canonicalHeaders + "\n"
                         + signedHeaders + "\n"
                         + hashedRequestPayload;

    const algorithm = "TC3-HMAC-SHA256";
    const hashedCanonicalRequest = getHash(canonicalRequest);
    const credentialScope = date + "/" + service + "/" + "tc3_request";
    const stringToSign = algorithm + "\n" +
                    timestamp + "\n" +
                    credentialScope + "\n" +
                    hashedCanonicalRequest;

    const kDate = sha256(date, 'TC3' + SECRET_KEY);
    const kService = sha256(service, kDate);
    const kSigning = sha256('tc3_request', kService);
    const signature = sha256(stringToSign, kSigning, 'hex');

    const authorization = algorithm + " " +
                    "Credential=" + SECRET_ID + "/" + credentialScope + ", " +
                    "SignedHeaders=" + signedHeaders + ", " +
                    "Signature=" + signature;

    return new Promise((resolve, reject) => {
        const options = {
            hostname: endpoint,
            port: 443,
            path: '/',
            method: 'POST',
            headers: {
                'Authorization': authorization,
                'Content-Type': 'application/json; charset=utf-8',
                'Host': endpoint,
                'X-TC-Action': action,
                'X-TC-Timestamp': timestamp.toString(),
                'X-TC-Version': version,
                'X-TC-Region': region,
                'Content-Length': Buffer.byteLength(payload)
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                try {
                    const response = JSON.parse(data);
                    if (response.Response && response.Response.TargetText) {
                        resolve(response.Response.TargetText);
                    } else {
                        reject(new Error(`翻译失败: ${JSON.stringify(response)}`));
                    }
                } catch (e) {
                    reject(new Error(`解析响应失败: ${data}`));
                }
            });
        });

        req.on('error', (e) => {
            reject(new Error(`请求出错: ${e.message}`));
        });

        req.write(payload);
        req.end();
    });
}

// 改进的日文检测函数
function containsJapanese(text) {
    if (!text || typeof text !== 'string') return false;
    
    // 检测平假名和片假名（这些是日文特有的）
    const hiraganaKatakana = /[\u3040-\u309F\u30A0-\u30FF]/;
    
    // 日文特有的汉字模式
    const japaneseSpecificPatterns = [
        /[々]/,  // 日文重复符号
        /[ヶ]/,  // 日文片假名小字符
        /(?:駅|町|丁目|番地)/,  // 日文地址常用词
        /(?:～|〜)/,  // 日文波浪号
        /(?:※)/,   // 日文注意符号
        /(?:年|月|日)(?:[\u3040-\u309F])/,  // 日期后跟平假名
    ];
    
    // 如果包含平假名/片假名，肯定是日文
    if (hiraganaKatakana.test(text)) {
        return true;
    }
    
    // 检查日文特有模式
    for (const pattern of japaneseSpecificPatterns) {
        if (pattern.test(text)) {
            return true;
        }
    }
    
    return false;
}

// 字段模式检测 - JSON双引号格式
const fieldPatterns = {
    name: /"name"\s*:\s*"([^"]+)"/,
    venue: /"venue"\s*:\s*"([^"]+)"/,
    access: /"access"\s*:\s*"([^"]+)"/,
    date: /"date"\s*:\s*"([^"]+)"/,
    time: /"time"\s*:\s*"([^"]+)"/,
    description: /"description"\s*:\s*"([^"]+)"/,
    price: /"price"\s*:\s*"([^"]+)"/,
    contact: /"contact"\s*:\s*"([^"]+)"/,
    notes: /"notes"\s*:\s*"([^"]+)"/,
    weatherInfo: /"weatherInfo"\s*:\s*"([^"]+)"/,
    parking: /"parking"\s*:\s*"([^"]+)"/,
    highlights: /"highlights"\s*:\s*"([^"]+)"/
};

// 扫描页面文件
function findPageFiles() {
    const pagesDir = path.join(__dirname, '../app');
    const pageFiles = [];
    
    function scanDirectory(dir, depth = 0) {
        if (depth > 10) return; // 防止无限递归
        
        try {
            const items = fs.readdirSync(dir);
            for (const item of items) {
                const fullPath = path.join(dir, item);
                const stat = fs.statSync(fullPath);
                
                if (stat.isDirectory()) {
                    scanDirectory(fullPath, depth + 1);
                } else if (item === 'page.tsx' && depth >= 3) {
                    // 四层页面的特征：至少3层深度且文件名为page.tsx
                    const relativePath = path.relative(path.join(__dirname, '../app'), fullPath);
                    const pathSegments = relativePath.split(path.sep).length;
                    if (pathSegments >= 4) { // 确保是四层页面
                        pageFiles.push(fullPath);
                    }
                }
            }
        } catch (error) {
            console.log(`⚠️ 扫描目录时出错 ${dir}: ${error.message}`);
        }
    }
    
    scanDirectory(pagesDir);
    return pageFiles;
}

// 处理单个页面文件
async function processPageFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        let hasChanges = false;
        let updatedContent = content;
        const translations = [];

        // 检测各种字段模式
        for (const [fieldName, pattern] of Object.entries(fieldPatterns)) {
            const matches = content.match(new RegExp(pattern.source, 'g'));
            if (matches) {
                for (const match of matches) {
                    const textMatch = match.match(pattern);
                    if (textMatch && textMatch[1] && containsJapanese(textMatch[1])) {
                        try {
                            console.log(`  🔤 翻译${fieldName}: ${textMatch[1]}`);
                            const translatedText = await tencentTranslate(textMatch[1]);
                            console.log(`  ✅ 结果: ${translatedText}`);
                            
                            const oldText = match;
                            const newText = match.replace(textMatch[1], translatedText);
                            updatedContent = updatedContent.replace(oldText, newText);
                            hasChanges = true;
                            translations.push({
                                field: fieldName,
                                original: textMatch[1],
                                translated: translatedText
                            });
                            
                            // 添加延迟避免API限制
                            await new Promise(resolve => setTimeout(resolve, 1000));
                        } catch (error) {
                            console.log(`  ❌ 翻译失败: ${error.message}`);
                        }
                    }
                }
            }
        }

        // 保存文件
        if (hasChanges) {
            fs.writeFileSync(filePath, updatedContent, 'utf8');
            console.log(`  📝 已保存 ${translations.length} 个翻译`);
            return { success: true, count: translations.length, translations };
        } else {
            console.log(`  ℹ️ 无需翻译`);
            return { success: true, count: 0, translations: [] };
        }
    } catch (error) {
        console.log(`  ❌ 处理失败: ${error.message}`);
        return { success: false, error: error.message };
    }
}

// 主函数
async function main() {
    console.log('🌐 开始批量翻译四层页面...\n');
    
    // 检查API密钥
    if (!process.env.TENCENT_SECRET_ID || !process.env.TENCENT_SECRET_KEY) {
        console.log('❌ 错误：请在 .env.local 文件中配置腾讯云API密钥');
        console.log('TENCENT_SECRET_ID=你的密钥ID');
        console.log('TENCENT_SECRET_KEY=你的密钥KEY');
        return;
    }

    // 扫描页面文件
    console.log('📂 扫描页面文件...');
    const pageFiles = findPageFiles();
    console.log(`📋 发现 ${pageFiles.length} 个四层页面文件\n`);

    if (pageFiles.length === 0) {
        console.log('⚠️ 未发现任何页面文件');
        return;
    }

    // 处理每个页面文件
    let totalTranslations = 0;
    let processedFiles = 0;
    const startTime = Date.now();

    for (let i = 0; i < pageFiles.length; i++) {
        const filePath = pageFiles[i];
        const relativePath = path.relative(process.cwd(), filePath);
        
        console.log(`📄 [${i + 1}/${pageFiles.length}] ${relativePath}`);
        
        const result = await processPageFile(filePath);
        if (result.success) {
            totalTranslations += result.count;
            processedFiles++;
        }
        
        // 显示进度
        const progress = ((i + 1) / pageFiles.length * 100).toFixed(1);
        console.log(`📊 进度: ${progress}% (${i + 1}/${pageFiles.length})\n`);
    }

    // 完成统计
    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(1);
    
    console.log('🎉 批量翻译完成！');
    console.log(`📊 处理文件: ${processedFiles}/${pageFiles.length}`);
    console.log(`🔤 总翻译数: ${totalTranslations}`);
    console.log(`⏱️ 总耗时: ${duration}秒`);
    
    if (totalTranslations > 0) {
        console.log('\n💡 建议：');
        console.log('1. 请检查翻译结果的准确性');
        console.log('2. 对于专有名词可能需要手动调整');
        console.log('3. 建议在发布前进行测试');
    }
}

// 执行主函数
if (require.main === module) {
    main().catch(console.error);
}

module.exports = { tencentTranslate, processPageFile, findPageFiles }; 