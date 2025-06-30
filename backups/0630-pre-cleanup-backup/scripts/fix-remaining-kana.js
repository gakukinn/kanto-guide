const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
require('dotenv').config({ path: '.env.local' });

// 腾讯云翻译配置
const TENCENT_SECRET_ID = process.env.TENCENT_SECRET_ID;
const TENCENT_SECRET_KEY = process.env.TENCENT_SECRET_KEY;

// 不需要翻译的假名内容（保持原样）
const DO_NOT_TRANSLATE = [
    // 连接词
    'の', 'と', 'に', 'で', 'が', 'は', 'を', 'や', 'か',
    
    // 常见助词
    'から', 'まで', 'より', 'など', 'ほか',
    
    // 专有名词保持原样
    'JR', 'ＪＲ', 'IC', 'バス', 'タクシー',
    
    // 地名常见部分（保持日式写法）
    '駅', '町', '市', '区', '県', '都', '府', '道',
    '丁目', '番地', '号', '−', '～',
    
    // 时间表达（日式写法更清晰）
    '時', '分', '秒', '日', '月', '年',
    '午前', '午後', '当日',
    
    // 符号和标点
    '※', '・', '〒', '○', '×', '△',
    
    // 电话和网址相关
    'TEL', 'FAX', 'HP', 'URL', 'www', 'http', '.com', '.jp',
    
    // 已经混合中日文的标准表达
    '会場', '入場', '開催', '実施', '予定', '中止', '延期',
    '主催', '共催', '後援', '協力', '協賛'
];

// 需要翻译的假名词汇（精准翻译）
const KANA_MAPPINGS = {
    // 最常见的必须翻译项
    'あり': '有',
    'なし': '无',
    
    // 完整的需要翻译的短语
    '有料観覧席あり': '有收费观览席',
    '有料観覧席なし': '无收费观览席',
    '有料特別桟敷席あり': '有收费特别包厢席',
    '無料': '免费',
    
    // 明确需要中文化的内容
    '荒天中止': '恶劣天气中止',
    '雨天中止': '雨天中止',
    '順延なし': '不延期',
    '順延日なし': '无延期日',
    
    // 交通相关（明确的动作）
    '下車': '下车',
    '徒歩': '步行',
    
    // 组织名称后缀
    '実行委員会': '执行委员会',
    '観光協会': '观光协会',
    '事務局': '事务局',
    
    // 价格相关
    '小学生以下': '小学生以下',
    '65歳以上': '65岁以上',
    '円': '日元'
};

// 检测是否需要翻译的假名
function detectTranslatableKana(text) {
    if (!text || typeof text !== 'string') return { hasKana: false, translatableText: [] };
    
    // 先检查是否在不翻译列表中
    for (const doNotTranslate of DO_NOT_TRANSLATE) {
        if (text.includes(doNotTranslate)) {
            // 如果包含不翻译的内容，需要更仔细分析
            continue;
        }
    }
    
    const hiraganaRegex = /[\u3040-\u309F]/g;
    const katakanaRegex = /[\u30A0-\u30FF]/g;
    
    const hiraganaMatches = text.match(hiraganaRegex) || [];
    const katakanaMatches = text.match(katakanaRegex) || [];
    
    if (hiraganaMatches.length > 0 || katakanaMatches.length > 0) {
        // 查找真正需要翻译的假名词汇
        const translatableWords = [];
        
        // 检查是否包含映射中的词汇
        for (const [kana, chinese] of Object.entries(KANA_MAPPINGS)) {
            if (text.includes(kana)) {
                translatableWords.push(kana);
            }
        }
        
        // 如果有映射词汇，才认为需要翻译
        if (translatableWords.length > 0) {
            return {
                hasKana: true,
                translatableText: translatableWords,
                hiraganaCount: hiraganaMatches.length,
                katakanaCount: katakanaMatches.length
            };
        }
    }
    
    return { hasKana: false, translatableText: [] };
}

// 腾讯云翻译API调用
function sha256(message, secret = '', encoding) {
    const hmac = crypto.createHmac('sha256', secret);
    return hmac.update(message).digest(encoding);
}

function getHash(message, encoding = 'hex') {
    const hash = crypto.createHash('sha256');
    return hash.update(message).digest(encoding);
}

function getDate(timestamp) {
    const date = new Date(timestamp * 1000);
    const year = date.getUTCFullYear();
    const month = ('0' + (date.getUTCMonth() + 1)).slice(-2);
    const day = ('0' + date.getUTCDate()).slice(-2);
    return `${year}-${month}-${day}`;
}

async function translateWithTencent(text) {
    try {
        const endpoint = "tmt.tencentcloudapi.com";
        const service = "tmt";
        const region = "ap-beijing";
        const action = "TextTranslate";
        const version = "2018-03-21";
        const timestamp = Math.round(Date.now() / 1000);
        const date = getDate(timestamp);

        // 1. 拼接规范请求串
        const signedHeaders = "content-type;host";
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
        const canonicalHeaders = "content-type:application/json; charset=utf-8\n" + "host:" + endpoint + "\n";

        const canonicalRequest = httpRequestMethod + "\n"
            + canonicalUri + "\n"
            + canonicalQueryString + "\n"
            + canonicalHeaders + "\n"
            + signedHeaders + "\n"
            + hashedRequestPayload;

        // 2. 拼接待签名字符串
        const algorithm = "TC3-HMAC-SHA256";
        const hashedCanonicalRequest = getHash(canonicalRequest);
        const credentialScope = date + "/" + service + "/" + "tc3_request";
        const stringToSign = algorithm + "\n" + timestamp + "\n" + credentialScope + "\n" + hashedCanonicalRequest;

        // 3. 计算签名
        const secretDate = sha256(date, "TC3" + TENCENT_SECRET_KEY);
        const secretService = sha256(service, secretDate);
        const secretSigning = sha256("tc3_request", secretService);
        const signature = sha256(stringToSign, secretSigning, "hex");

        // 4. 拼接 Authorization
        const authorization = algorithm + " " + "Credential=" + TENCENT_SECRET_ID + "/" + credentialScope + ", " + "SignedHeaders=" + signedHeaders + ", " + "Signature=" + signature;

        const headers = {
            "Authorization": authorization,
            "Content-Type": "application/json; charset=utf-8",
            "Host": endpoint,
            "X-TC-Action": action,
            "X-TC-Timestamp": timestamp.toString(),
            "X-TC-Version": version,
            "X-TC-Region": region
        };

        const response = await fetch(`https://${endpoint}`, {
            method: 'POST',
            headers: headers,
            body: payload
        });

        const result = await response.json();
        
        if (result.Response && result.Response.TargetText) {
            return {
                success: true,
                translation: result.Response.TargetText,
                originalCharCount: text.length
            };
        } else {
            return {
                success: false,
                error: result.Response?.Error?.Message || 'Unknown error',
                originalText: text
            };
        }
    } catch (error) {
        return {
            success: false,
            error: error.message,
            originalText: text
        };
    }
}

// 精准翻译（只翻译映射中的内容）
async function preciseTranslate(text) {
    let translatedText = text;
    let hasChanges = false;
    
    // 只替换映射中明确定义的内容
    for (const [kana, chinese] of Object.entries(KANA_MAPPINGS)) {
        if (translatedText.includes(kana)) {
            translatedText = translatedText.replace(new RegExp(kana, 'g'), chinese);
            hasChanges = true;
        }
    }
    
    return {
        success: true,
        translation: translatedText,
        usedMapping: hasChanges,
        originalText: text
    };
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
                        pages.push({
                            region,
                            activity,
                            item,
                            path: pagePath,
                            relativePath: `${region}/${activity}/${item}`
                        });
                    }
                });
            }
        });
    });
    
    return pages;
}

// 处理单个页面的精准假名翻译
async function processPagePreciseKana(filePath, relativePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let translationCount = 0;
        const changes = [];
        
        // 检查常见字段的假名内容
        const commonFields = [
            'name', 'description', 'venue', 'access', 'address', 
            'datetime', 'time', 'date', 'price', 'contact', 
            'organizer', 'website', 'notes', 'weatherInfo',
            'parking', 'foodStalls', 'highlights', 'fireworksCount',
            'fireworksTime', 'expectedVisitors'
        ];
        
        for (const field of commonFields) {
            // 匹配两种格式: "field": "value" 和 field: "value" 
            const patterns = [
                new RegExp(`"${field}":\\s*"([^"]+)"`, 'g'),
                new RegExp(`${field}:\\s*"([^"]+)"`, 'g')
            ];
            
            for (const pattern of patterns) {
                let match;
                while ((match = pattern.exec(content)) !== null) {
                    const fieldValue = match[1];
                    const kanaCheck = detectTranslatableKana(fieldValue);
                    
                    if (kanaCheck.hasKana) {
                        console.log(`      翻译字段 ${field}: "${fieldValue.substring(0, 50)}..."`);
                        console.log(`        需要翻译: ${kanaCheck.translatableText.join(', ')}`);
                        
                        const translationResult = await preciseTranslate(fieldValue);
                        
                        if (translationResult.success && translationResult.usedMapping) {
                            // 替换内容
                            const oldString = match[0];
                            const newString = oldString.replace(fieldValue, translationResult.translation);
                            content = content.replace(oldString, newString);
                            
                            translationCount++;
                            changes.push({
                                field: field,
                                original: fieldValue,
                                translated: translationResult.translation,
                                method: 'precise_mapping'
                            });
                            
                            console.log(`        ✅ ${fieldValue} → ${translationResult.translation}`);
                        } else {
                            console.log(`        ℹ️  无需翻译或无匹配映射`);
                        }
                    }
                }
                // 重置regex lastIndex
                pattern.lastIndex = 0;
            }
        }
        
        if (translationCount > 0) {
            fs.writeFileSync(filePath, content, 'utf8');
        }
        
        return {
            success: true,
            relativePath,
            translationCount,
            changes
        };
        
    } catch (error) {
        return {
            success: false,
            relativePath,
            error: error.message
        };
    }
}

// 主修复函数
async function fixRemainingKana() {
    console.log('🔧 精准修复四层页面假名内容');
    console.log('===============================');
    console.log('🎯 策略: 只翻译必须翻译的假名');
    console.log('🚫 保留: 连接词、助词、专有名词');
    console.log('✅ 翻译: 明确需要中文化的内容');
    console.log('');
    
    console.log('📋 不翻译列表:');
    console.log(`   连接词: ${DO_NOT_TRANSLATE.slice(0, 10).join(', ')}...`);
    console.log('📋 翻译映射:');
    const mappingKeys = Object.keys(KANA_MAPPINGS).slice(0, 5);
    console.log(`   ${mappingKeys.join(', ')}...等${Object.keys(KANA_MAPPINGS).length}项`);
    console.log('');
    
    // 扫描所有四层页面
    const allPages = findAllFourthLevelPages();
    console.log(`📊 发现 ${allPages.length} 个四层页面\n`);
    
    let totalProcessed = 0;
    let successCount = 0;
    let totalTranslations = 0;
    let errorPages = [];
    
    const startTime = Date.now();
    
    console.log('🔧 开始精准修复处理...\n');
    
    for (const page of allPages) {
        totalProcessed++;
        console.log(`[${totalProcessed}/${allPages.length}] 处理: ${page.relativePath}`);
        
        const result = await processPagePreciseKana(page.path, page.relativePath);
        
        if (result.success) {
            if (result.translationCount > 0) {
                console.log(`  ✅ 精准翻译 ${result.translationCount} 个字段`);
                successCount++;
                totalTranslations += result.translationCount;
            } else {
                console.log(`  ℹ️  无需要精准翻译的假名内容`);
            }
        } else {
            console.log(`  ❌ 处理失败: ${result.error}`);
            errorPages.push(result);
        }
        
        console.log('');
        
        // 每20个页面显示进度
        if (totalProcessed % 20 === 0) {
            const elapsed = (Date.now() - startTime) / 1000;
            const avgTime = elapsed / totalProcessed;
            const remaining = (allPages.length - totalProcessed) * avgTime;
            
            console.log(`📊 进度报告 [${totalProcessed}/${allPages.length}]`);
            console.log(`   ⏱️  已用时间: ${Math.round(elapsed)}秒`);
            console.log(`   🔮 预计剩余: ${Math.round(remaining)}秒`);
            console.log(`   ✅ 成功处理: ${successCount}个页面`);
            console.log(`   🔤 精准翻译: ${totalTranslations}个字段`);
            console.log('');
        }
    }
    
    const totalTime = (Date.now() - startTime) / 1000;
    
    // 生成最终报告
    console.log('📊 精准修复完成 - 最终报告');
    console.log('============================');
    console.log(`✅ 处理页面: ${totalProcessed}个`);
    console.log(`🎯 成功修复: ${successCount}个页面`);
    console.log(`❌ 处理失败: ${errorPages.length}个页面`);
    console.log(`🔤 精准翻译字段: ${totalTranslations}个`);
    console.log(`⏱️  总耗时: ${Math.round(totalTime)}秒`);
    console.log(`🚫 未使用API (避免过度翻译)`);
    console.log('');
    
    if (errorPages.length > 0) {
        console.log('❌ 处理失败的页面:');
        console.log('==================');
        errorPages.forEach(page => {
            console.log(`  - ${page.relativePath}: ${page.error}`);
        });
        console.log('');
    }
    
    if (successCount > 0) {
        console.log('🎉 精准修复完成！');
        console.log('==================');
        console.log('✨ 建议下一步: 运行检查脚本验证修复效果');
        console.log('💡 命令: node scripts/check-remaining-kana.js');
        console.log('');
        console.log('🎯 修复原则:');
        console.log('  ✅ 只翻译了必须翻译的假名');
        console.log('  🚫 保留了连接词和专有名词');
        console.log('  📋 使用精准映射避免错误翻译');
    } else {
        console.log('ℹ️  所有页面都已完成，无需精准修复');
    }
    
    return {
        total: totalProcessed,
        success: successCount,
        errors: errorPages.length,
        translations: totalTranslations,
        timeSeconds: totalTime
    };
}

// 运行脚本
if (require.main === module) {
    fixRemainingKana().catch(console.error);
}

module.exports = {
    fixRemainingKana,
    preciseTranslate,
    detectTranslatableKana,
    KANA_MAPPINGS,
    DO_NOT_TRANSLATE
}; 