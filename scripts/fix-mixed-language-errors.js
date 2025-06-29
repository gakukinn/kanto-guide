require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// 腾讯云翻译API配置
const TENCENT_SECRET_ID = process.env.TENCENT_SECRET_ID;
const TENCENT_SECRET_KEY = process.env.TENCENT_SECRET_KEY;

// 官方签名算法实现
function sha256(message, secret = '', encoding) {
    return crypto.createHmac('sha256', secret).update(message).digest(encoding);
}

function getHash(message, encoding = 'hex') {
    return crypto.createHash('sha256').update(message).digest(encoding);
}

// 生成Authorization
function getAuth(secretId, secretKey, method, uri, query, headers, body, timestamp) {
    const date = new Date(timestamp * 1000).toISOString().substr(0, 10);
    
    // 构建规范URI
    const canonicalUri = uri;
    const canonicalQueryString = query;
    
    // 构建规范头部
    let canonicalHeaders = '';
    const sortedHeaders = Object.keys(headers).sort();
    for (const key of sortedHeaders) {
        canonicalHeaders += `${key.toLowerCase()}:${headers[key]}\n`;
    }
    
    const signedHeaders = sortedHeaders.map(key => key.toLowerCase()).join(';');
    
    // 构建规范请求
    const canonicalRequest = [
        method,
        canonicalUri,
        canonicalQueryString,
        canonicalHeaders,
        signedHeaders,
        getHash(body)
    ].join('\n');
    
    // 构建待签名字符串
    const algorithm = 'TC3-HMAC-SHA256';
    const service = 'tmt';
    const credentialScope = `${date}/${service}/tc3_request`;
    const stringToSign = [
        algorithm,
        timestamp,
        credentialScope,
        getHash(canonicalRequest)
    ].join('\n');
    
    // 计算签名
    const secretDate = sha256(date, `TC3${secretKey}`);
    const secretService = sha256(service, secretDate);
    const secretSigning = sha256('tc3_request', secretService);
    const signature = sha256(stringToSign, secretSigning, 'hex');
    
    // 构建Authorization
    return `${algorithm} Credential=${secretId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;
}

// 调用腾讯云翻译API
async function translateText(text) {
    const endpoint = 'tmt.tencentcloudapi.com';
    const service = 'tmt';
    const region = 'ap-beijing';
    const action = 'TextTranslate';
    const version = '2018-03-21';
    const timestamp = Math.floor(Date.now() / 1000);
    
    const payload = {
        SourceText: text,
        Source: 'ja',
        Target: 'zh',
        ProjectId: 0
    };
    
    const body = JSON.stringify(payload);
    
    const headers = {
        'Authorization': '', // 稍后填充
        'Content-Type': 'application/json; charset=utf-8',
        'Host': endpoint,
        'X-TC-Action': action,
        'X-TC-Timestamp': timestamp.toString(),
        'X-TC-Version': version,
        'X-TC-Region': region
    };
    
    // 生成Authorization
    headers['Authorization'] = getAuth(
        TENCENT_SECRET_ID,
        TENCENT_SECRET_KEY,
        'POST',
        '/',
        '',
        headers,
        body,
        timestamp
    );
    
    try {
        const response = await fetch(`https://${endpoint}/`, {
            method: 'POST',
            headers: headers,
            body: body
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.Response.Error) {
            throw new Error(`API Error: ${result.Response.Error.Code} - ${result.Response.Error.Message}`);
        }
        
        return result.Response.TargetText;
    } catch (error) {
        console.error(`翻译失败: ${error.message}`);
        return null;
    }
}

// 扫描所有四层页面
function findAllFourthLevelPages() {
    const regions = ['chiba', 'kanagawa', 'kitakanto', 'koshinetsu', 'saitama', 'tokyo'];
    const activities = ['hanabi', 'hanami', 'matsuri', 'bunka'];
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
                        pages.push(pagePath);
                    }
                });
            }
        });
    });
    
    return pages;
}

// 定义修复模式 - 优先修复最严重的错误
const CRITICAL_FIXES = [
    {
        pattern: /大会项目为过往の情報/g,
        replacement: '大会项目为过往信息'
    },
    {
        pattern: /開催予定の大会详细信息将在确定后/g,
        replacement: '预定举办的大会详细信息确定后将公布'
    },
    {
        pattern: /情報を更新/g,
        replacement: '信息更新'
    },
    {
        pattern: /開催予定の/g,
        replacement: '预定举办的'
    },
    {
        pattern: /の情報/g,
        replacement: '的信息'
    },
    {
        pattern: /状況により変更となる場合有/g,
        replacement: '根据情况可能会有变更'
    },
    {
        pattern: /から徒歩/g,
        replacement: '步行'
    },
    {
        pattern: /から車約/g,
        replacement: '驾车约'
    },
    {
        pattern: /から巴士約/g,
        replacement: '乘巴士约'
    },
    {
        pattern: /荒天時は/g,
        replacement: '恶劣天气时'
    },
    {
        pattern: /に延期/g,
        replacement: '延期'
    }
];

// 检测需要API翻译的日文文本
function detectJapaneseText(text) {
    // 检测假名
    const hasHiragana = /[\u3040-\u309F]/.test(text);
    const hasKatakana = /[\u30A0-\u30FF]/.test(text);
    
    // 检测日文特有词汇
    const japanesePatterns = [
        /駅$/,         // XX駅
        /市$/,         // XX市  
        /町$/,         // XX町
        /区$/,         // XX区
        /県$/,         // XX県
        /から/,        // から
        /まで/,        // まで
        /について/,    // について
        /により/,      // により
        /において/,    // において
        /に関して/,    // に関して
        /をテーマに/,  // をテーマに
        /が開催/,      // が開催
        /を開催/,      // を開催
        /と開催/,      // と開催
        /で举办/,      // で举办 (已经是混合的错误)
        /を举办/,      // を举办 (已经是混合的错误)
        /が举办/,      // が举办 (已经是混合的错误)
    ];
    
    const hasJapanesePattern = japanesePatterns.some(pattern => pattern.test(text));
    
    return hasHiragana || hasKatakana || hasJapanesePattern;
}

// 应用直接修复规则
function applyDirectFixes(content) {
    let fixedContent = content;
    let fixCount = 0;
    
    CRITICAL_FIXES.forEach(fix => {
        const matches = fixedContent.match(fix.pattern);
        if (matches) {
            fixCount += matches.length;
            fixedContent = fixedContent.replace(fix.pattern, fix.replacement);
        }
    });
    
    return { content: fixedContent, fixCount };
}

// 处理单个文件
async function processFile(filePath) {
    console.log(`\n🔧 处理文件: ${filePath}`);
    
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let totalFixes = 0;
        
        // 先应用直接修复规则
        const directResult = applyDirectFixes(content);
        content = directResult.content;
        totalFixes += directResult.fixCount;
        
        if (directResult.fixCount > 0) {
            console.log(`   ✅ 直接修复: ${directResult.fixCount} 个错误`);
        }
        
        // TODO: 这里可以添加更复杂的API翻译逻辑
        // 目前先专注修复最关键的错误
        
        // 保存修复后的文件
        if (totalFixes > 0) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`   ✅ 文件已更新，共修复 ${totalFixes} 个错误`);
        } else {
            console.log(`   ℹ️  未发现需要修复的错误`);
        }
        
        return totalFixes;
        
    } catch (error) {
        console.error(`   ❌ 处理失败: ${error.message}`);
        return 0;
    }
}

// 主执行函数
async function main() {
    console.log('🔧 开始修复中日文混合错误...\n');
    
    if (!TENCENT_SECRET_ID || !TENCENT_SECRET_KEY) {
        console.error('❌ 错误：未找到腾讯云API密钥配置');
        console.error('请确保.env.local文件中配置了TENCENT_SECRET_ID和TENCENT_SECRET_KEY');
        return;
    }
    
    const pages = findAllFourthLevelPages();
    console.log(`📁 发现 ${pages.length} 个四层页面`);
    
    let processedCount = 0;
    let totalFixCount = 0;
    let successCount = 0;
    
    console.log('\n🔥 优先修复最严重的混合语言错误...\n');
    
    for (const pagePath of pages) {
        processedCount++;
        process.stdout.write(`\r进度: ${processedCount}/${pages.length} (${Math.round(processedCount/pages.length*100)}%)`);
        
        const fixCount = await processFile(pagePath);
        if (fixCount > 0) {
            successCount++;
            totalFixCount += fixCount;
        }
        
        // 添加小延迟避免API频率限制
        if (processedCount % 10 === 0) {
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
    
    console.log('\n\n📊 修复结果统计：');
    console.log('====================');
    console.log(`✅ 处理完成: ${processedCount}/${pages.length} 个文件`);
    console.log(`✅ 成功修复: ${successCount} 个文件`);
    console.log(`✅ 总计修复: ${totalFixCount} 个错误`);
    
    if (totalFixCount > 0) {
        console.log('\n🎉 恭喜！最严重的混合语言错误已修复！');
        console.log('💡 建议：再次运行检查脚本确认修复效果');
    } else {
        console.log('\n⚠️  未发现可自动修复的错误，可能需要手动处理');
    }
}

// 运行主函数
main().catch(console.error); 