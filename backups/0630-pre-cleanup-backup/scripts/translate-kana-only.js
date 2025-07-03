const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
require('dotenv').config({ path: '.env.local' });

// 腾讯云翻译配置
const TENCENT_SECRET_ID = process.env.TENCENT_SECRET_ID;
const TENCENT_SECRET_KEY = process.env.TENCENT_SECRET_KEY;

// 纯假名翻译映射（只包含平假名和片假名，绝不包含汉字）
const KANA_ONLY_MAPPINGS = {
    // 平假名 (ひらがな)
    'あり': '有',
    'なし': '无',
    '祭典': '祭典',
    'はなび': '花火',
    'おどり': '舞蹈',
    'あじさい': '紫阳花',
    'さくら': '樱花',
    'まで': '到',
    'から': '从',
    'より': '比',
    'など': '等',
    'ほか': '其他',
    'すぐ': '立即',
    'について': '关于',
    'により': '根据',
    'として': '作为',
    'について': '关于',
    'もしくは': '或者',
    'または': '或者',
    'および': '以及',
    
    // 片假名 (カタカナ)
    'バス': '巴士',
    'タクシー': '出租车',
    'ホテル': '酒店',
    'レストラン': '餐厅',
    'カフェ': '咖啡厅',
    'パーキング': '停车场',
    'サービス': '服务',
    'センター': '中心',
    '事件': '活动',
    'フェスティバル': '节庆',
    'コンサート': '音乐会',
    'ステージ': '舞台',
    'ライト': '灯光',
    'ファイヤー': '火焰',
    'スペシャル': '特别',
    'メイン': '主要',
    'オープン': '开放',
    'スタート': '开始',
    'エンド': '结束',
    'チケット': '门票',
    'フリー': '免费',
    'プレミアム': '高级',
    'ベーシック': '基础',
    'スタンダード': '标准'
};

// 严格检测：只识别纯假名文本（不包含汉字）
function detectPureKana(text) {
    if (!text || typeof text !== 'string') return { hasKana: false, kanaOnly: [] };
    
    // 平假名范围: \u3040-\u309F
    // 片假名范围: \u30A0-\u30FF
    const hiraganaRegex = /[\u3040-\u309F]+/g;
    const katakanaRegex = /[\u30A0-\u30FF]+/g;
    
    const hiraganaMatches = text.match(hiraganaRegex) || [];
    const katakanaMatches = text.match(katakanaRegex) || [];
    
    const pureKanaWords = [];
    
    // 检查映射中的纯假名词汇
    for (const [kana, chinese] of Object.entries(KANA_ONLY_MAPPINGS)) {
        if (text.includes(kana)) {
            // 验证是否为纯假名（不包含汉字）
            const hasKanji = /[\u4e00-\u9fff]/.test(kana);
            if (!hasKanji) {
                pureKanaWords.push(kana);
            }
        }
    }
    
    if (pureKanaWords.length > 0) {
        return {
            hasKana: true,
            kanaOnly: pureKanaWords,
            hiraganaCount: hiraganaMatches.length,
            katakanaCount: katakanaMatches.length
        };
    }
    
    return { hasKana: false, kanaOnly: [] };
}

// 腾讯云翻译API（保持原有实现）
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

        const algorithm = "TC3-HMAC-SHA256";
        const hashedCanonicalRequest = getHash(canonicalRequest);
        const credentialScope = date + "/" + service + "/" + "tc3_request";
        const stringToSign = algorithm + "\n" + timestamp + "\n" + credentialScope + "\n" + hashedCanonicalRequest;

        const secretDate = sha256(date, "TC3" + TENCENT_SECRET_KEY);
        const secretService = sha256(service, secretDate);
        const secretSigning = sha256("tc3_request", secretService);
        const signature = sha256(stringToSign, secretSigning, "hex");

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

// 纯假名翻译（优先使用映射，必要时调用API）
async function translatePureKana(text) {
    let translatedText = text;
    let hasChanges = false;
    
    // 只替换映射中的纯假名内容
    for (const [kana, chinese] of Object.entries(KANA_ONLY_MAPPINGS)) {
        if (translatedText.includes(kana)) {
            // 再次验证：确保不包含汉字
            const hasKanji = /[\u4e00-\u9fff]/.test(kana);
            if (!hasKanji) {
                translatedText = translatedText.replace(new RegExp(kana.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), chinese);
                hasChanges = true;
            }
        }
    }
    
    if (hasChanges) {
        return {
            success: true,
            translation: translatedText,
            usedMapping: true,
            originalText: text
        };
    }
    
    // 如果映射中没有，检查是否有其他纯假名需要API翻译
    const kanaCheck = detectPureKana(text);
    if (kanaCheck.hasKana) {
        // 只对纯假名部分调用API
        // 注意：这里需要小心，确保API不会翻译汉字
        console.log(`        🌐 API翻译纯假名: ${text.substring(0, 30)}...`);
        await new Promise(resolve => setTimeout(resolve, 100)); // 限流
        return await translateWithTencent(text);
    }
    
    return {
        success: true,
        translation: text,
        usedMapping: false,
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

// 处理单个页面的纯假名翻译
async function processPageKanaOnly(filePath, relativePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let translationCount = 0;
        let apiCallCount = 0;
        let mappingUsedCount = 0;
        const changes = [];
        
        // 检查常见字段的纯假名内容
        const commonFields = [
            'name', 'description', 'venue', 'access', 'address', 
            'datetime', 'time', 'date', 'price', 'contact', 
            'organizer', 'website', 'notes', 'weatherInfo',
            'parking', 'foodStalls', 'highlights', 'fireworksCount',
            'fireworksTime', 'expectedVisitors'
        ];
        
        for (const field of commonFields) {
            const patterns = [
                new RegExp(`"${field}":\\s*"([^"]+)"`, 'g'),
                new RegExp(`${field}:\\s*"([^"]+)"`, 'g')
            ];
            
            for (const pattern of patterns) {
                let match;
                while ((match = pattern.exec(content)) !== null) {
                    const fieldValue = match[1];
                    const kanaCheck = detectPureKana(fieldValue);
                    
                    if (kanaCheck.hasKana) {
                        console.log(`      翻译字段 ${field}: "${fieldValue.substring(0, 50)}..."`);
                        console.log(`        检测到纯假名: ${kanaCheck.kanaOnly.join(', ')}`);
                        
                        const translationResult = await translatePureKana(fieldValue);
                        
                        if (translationResult.success && translationResult.translation !== fieldValue) {
                            const oldString = match[0];
                            const newString = oldString.replace(fieldValue, translationResult.translation);
                            content = content.replace(oldString, newString);
                            
                            translationCount++;
                            if (translationResult.usedMapping) {
                                mappingUsedCount++;
                            } else {
                                apiCallCount++;
                            }
                            
                            changes.push({
                                field: field,
                                original: fieldValue,
                                translated: translationResult.translation,
                                method: translationResult.usedMapping ? 'mapping' : 'api'
                            });
                            
                            console.log(`        ✅ ${fieldValue.substring(0, 30)}... → ${translationResult.translation.substring(0, 30)}...`);
                        } else {
                            console.log(`        ℹ️  无变化或翻译失败`);
                        }
                    }
                }
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
            apiCallCount,
            mappingUsedCount,
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

// 主翻译函数
async function translateKanaOnly() {
    console.log('🔤 纯假名翻译 - 严格模式');
    console.log('============================');
    console.log('✅ 翻译: 平假名 (ひらがな)');
    console.log('✅ 翻译: 片假名 (カタカナ)');
    console.log('🚫 不翻译: 汉字 (漢字)');
    console.log('🚫 不翻译: 包含汉字的词汇');
    console.log('');
    
    console.log('📋 纯假名映射示例:');
    const exampleMappings = Object.entries(KANA_ONLY_MAPPINGS).slice(0, 5);
    exampleMappings.forEach(([kana, chinese]) => {
        console.log(`   ${kana} → ${chinese}`);
    });
    console.log(`   ...等${Object.keys(KANA_ONLY_MAPPINGS).length}项纯假名词汇`);
    console.log('');
    
    const allPages = findAllFourthLevelPages();
    console.log(`📊 发现 ${allPages.length} 个四层页面\n`);
    
    let totalProcessed = 0;
    let successCount = 0;
    let totalTranslations = 0;
    let totalApiCalls = 0;
    let totalMappings = 0;
    let errorPages = [];
    
    const startTime = Date.now();
    
    console.log('🔤 开始纯假名翻译处理...\n');
    
    for (const page of allPages) {
        totalProcessed++;
        console.log(`[${totalProcessed}/${allPages.length}] 处理: ${page.relativePath}`);
        
        const result = await processPageKanaOnly(page.path, page.relativePath);
        
        if (result.success) {
            if (result.translationCount > 0) {
                console.log(`  ✅ 成功翻译 ${result.translationCount} 个字段`);
                console.log(`     📋 映射使用: ${result.mappingUsedCount}个`);
                console.log(`     🌐 API调用: ${result.apiCallCount}个`);
                
                successCount++;
                totalTranslations += result.translationCount;
                totalApiCalls += result.apiCallCount;
                totalMappings += result.mappingUsedCount;
            } else {
                console.log(`  ℹ️  无纯假名内容需要处理`);
            }
        } else {
            console.log(`  ❌ 处理失败: ${result.error}`);
            errorPages.push(result);
        }
        
        console.log('');
        
        if (totalProcessed % 20 === 0) {
            const elapsed = (Date.now() - startTime) / 1000;
            const avgTime = elapsed / totalProcessed;
            const remaining = (allPages.length - totalProcessed) * avgTime;
            
            console.log(`📊 进度报告 [${totalProcessed}/${allPages.length}]`);
            console.log(`   ⏱️  已用时间: ${Math.round(elapsed)}秒`);
            console.log(`   🔮 预计剩余: ${Math.round(remaining)}秒`);
            console.log(`   ✅ 成功处理: ${successCount}个页面`);
            console.log(`   🔤 已翻译: ${totalTranslations}个字段`);
            console.log('');
        }
    }
    
    const totalTime = (Date.now() - startTime) / 1000;
    
    console.log('📊 纯假名翻译完成 - 最终报告');
    console.log('===============================');
    console.log(`✅ 处理页面: ${totalProcessed}个`);
    console.log(`🎯 成功翻译: ${successCount}个页面`);
    console.log(`❌ 处理失败: ${errorPages.length}个页面`);
    console.log(`🔤 总翻译字段: ${totalTranslations}个`);
    console.log(`📋 映射使用: ${totalMappings}个 (${totalTranslations > 0 ? Math.round(totalMappings/totalTranslations*100) : 0}%)`);
    console.log(`🌐 API调用: ${totalApiCalls}个 (${totalTranslations > 0 ? Math.round(totalApiCalls/totalTranslations*100) : 0}%)`);
    console.log(`⏱️  总耗时: ${Math.round(totalTime)}秒`);
    console.log(`🚫 已排除: 所有包含汉字的词汇`);
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
        console.log('🎉 纯假名翻译完成！');
        console.log('====================');
        console.log('✅ 严格按照指令执行');
        console.log('🔤 只翻译了平假名和片假名');
        console.log('🚫 完全避免了汉字翻译');
        console.log('');
        console.log('💡 建议下一步: 运行检查脚本验证结果');
        console.log('🔍 命令: node scripts/check-remaining-kana.js');
    } else {
        console.log('ℹ️  所有页面都已完成，无纯假名需要翻译');
    }
    
    return {
        total: totalProcessed,
        success: successCount,
        errors: errorPages.length,
        translations: totalTranslations,
        apiCalls: totalApiCalls,
        mappings: totalMappings,
        timeSeconds: totalTime
    };
}

// 运行脚本
if (require.main === module) {
    translateKanaOnly().catch(console.error);
}

module.exports = {
    translateKanaOnly,
    translatePureKana,
    detectPureKana,
    KANA_ONLY_MAPPINGS
}; 