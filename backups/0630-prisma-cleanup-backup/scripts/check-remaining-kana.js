const fs = require('fs');
const path = require('path');

// 检测平假名和片假名的函数
function detectKana(text) {
    if (!text || typeof text !== 'string') return { hasKana: false, kanaText: [] };
    
    // 平假名范围: \u3040-\u309F
    // 片假名范围: \u30A0-\u30FF
    const hiraganaRegex = /[\u3040-\u309F]/g;
    const katakanaRegex = /[\u30A0-\u30FF]/g;
    
    const hiraganaMatches = text.match(hiraganaRegex) || [];
    const katakanaMatches = text.match(katakanaRegex) || [];
    
    const kanaText = [];
    
    // 查找包含假名的完整词汇
    const kanaWordRegex = /[a-zA-Z0-9\u4e00-\u9fff]*[\u3040-\u309F\u30A0-\u30FF]+[a-zA-Z0-9\u4e00-\u9fff]*/g;
    const kanaWords = text.match(kanaWordRegex) || [];
    
    if (hiraganaMatches.length > 0 || katakanaMatches.length > 0) {
        return {
            hasKana: true,
            hiraganaCount: hiraganaMatches.length,
            katakanaCount: katakanaMatches.length,
            kanaWords: [...new Set(kanaWords)], // 去重
            kanaText: kanaWords
        };
    }
    
    return { hasKana: false, kanaText: [] };
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

// 检查单个页面的假名内容
function checkPageKana(filePath, relativePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const kanaResult = detectKana(content);
        
        if (kanaResult.hasKana) {
            // 进一步分析具体哪些字段包含假名
            const fieldAnalysis = [];
            
            // 检查常见字段
            const commonFields = [
                'name', 'description', 'venue', 'access', 'address', 
                'datetime', 'time', 'date', 'price', 'contact', 
                'organizer', 'website', 'notes', 'weatherInfo',
                'parking', 'foodStalls', 'highlights', 'fireworksCount',
                'fireworksTime', 'expectedVisitors'
            ];
            
            commonFields.forEach(field => {
                // 匹配两种格式: "field": "value" 和 field: "value"
                const patterns = [
                    new RegExp(`"${field}":\\s*"([^"]+)"`, 'g'),
                    new RegExp(`${field}:\\s*"([^"]+)"`, 'g')
                ];
                
                patterns.forEach(pattern => {
                    let match;
                    while ((match = pattern.exec(content)) !== null) {
                        const fieldValue = match[1];
                        const fieldKana = detectKana(fieldValue);
                        if (fieldKana.hasKana) {
                            fieldAnalysis.push({
                                field: field,
                                value: fieldValue,
                                kanaWords: fieldKana.kanaWords,
                                hiraganaCount: fieldKana.hiraganaCount,
                                katakanaCount: fieldKana.katakanaCount
                            });
                        }
                    }
                });
            });
            
            return {
                hasKana: true,
                relativePath,
                totalHiragana: kanaResult.hiraganaCount,
                totalKatakana: kanaResult.katakanaCount,
                totalKanaWords: kanaResult.kanaWords.length,
                fields: fieldAnalysis,
                allKanaWords: kanaResult.kanaWords
            };
        }
        
        return { hasKana: false, relativePath };
        
    } catch (error) {
        return { 
            hasKana: false, 
            relativePath, 
            error: error.message 
        };
    }
}

// 主检查函数
function checkRemainingKana() {
    console.log('🔍 检查四层页面遗漏的片假名和平假名');
    console.log('=====================================');
    console.log('📋 扫描范围: 所有地区 × 所有活动类型');
    console.log('🎯 检测内容: 平假名(\u3040-\u309F) + 片假名(\u30A0-\u30FF)');
    console.log('');
    
    // 扫描所有四层页面
    const allPages = findAllFourthLevelPages();
    console.log(`📊 发现 ${allPages.length} 个四层页面\n`);
    
    let totalChecked = 0;
    let pagesWithKana = [];
    let totalKanaWords = 0;
    let errorPages = [];
    
    // 按地区分组统计
    const regionStats = {};
    allPages.forEach(page => {
        if (!regionStats[page.region]) regionStats[page.region] = 0;
        regionStats[page.region]++;
    });
    
    console.log('📋 页面分布:');
    Object.entries(regionStats).forEach(([region, count]) => {
        console.log(`  📍 ${region}: ${count}个页面`);
    });
    console.log('');
    
    console.log('🔍 开始检查...\n');
    
    for (const page of allPages) {
        totalChecked++;
        console.log(`[${totalChecked}/${allPages.length}] 检查: ${page.relativePath}`);
        
        const result = checkPageKana(page.path, page.relativePath);
        
        if (result.error) {
            console.log(`  ❌ 检查失败: ${result.error}`);
            errorPages.push(result);
        } else if (result.hasKana) {
            console.log(`  ⚠️  发现假名内容:`);
            console.log(`     🔤 平假名: ${result.totalHiragana}个`);
            console.log(`     🔤 片假名: ${result.totalKatakana}个`);
            console.log(`     📝 假名词汇: ${result.totalKanaWords}个`);
            
            if (result.fields && result.fields.length > 0) {
                console.log(`     📋 涉及字段:`);
                result.fields.forEach(field => {
                    console.log(`        - ${field.field}: "${field.value.substring(0, 50)}..."`);
                });
            }
            
            pagesWithKana.push(result);
            totalKanaWords += result.totalKanaWords;
        } else {
            console.log(`  ✅ 无假名内容`);
        }
        
        console.log('');
    }
    
    // 生成总结报告
    console.log('📊 检查结果总结');
    console.log('================');
    console.log(`✅ 检查页面: ${totalChecked}个`);
    console.log(`⚠️  包含假名: ${pagesWithKana.length}个`);
    console.log(`❌ 检查错误: ${errorPages.length}个`);
    console.log(`🔤 总假名词汇: ${totalKanaWords}个`);
    console.log('');
    
    if (pagesWithKana.length > 0) {
        console.log('⚠️  需要处理的页面列表:');
        console.log('========================');
        
        // 按地区分组显示
        const kanaByRegion = {};
        pagesWithKana.forEach(page => {
            const region = page.relativePath.split('/')[0];
            if (!kanaByRegion[region]) kanaByRegion[region] = [];
            kanaByRegion[region].push(page);
        });
        
        Object.entries(kanaByRegion).forEach(([region, pages]) => {
            console.log(`\n📍 ${region.toUpperCase()} (${pages.length}个页面):`);
            pages.forEach((page, index) => {
                console.log(`  ${index + 1}. ${page.relativePath}`);
                console.log(`     平假名: ${page.totalHiragana}, 片假名: ${page.totalKatakana}`);
                if (page.fields && page.fields.length > 0) {
                    const fieldNames = page.fields.map(f => f.field).join(', ');
                    console.log(`     字段: ${fieldNames}`);
                }
            });
        });
        
        console.log('\n🔤 常见假名词汇:');
        console.log('================');
        const allKanaWords = pagesWithKana.flatMap(page => page.allKanaWords);
        const kanaWordCount = {};
        allKanaWords.forEach(word => {
            kanaWordCount[word] = (kanaWordCount[word] || 0) + 1;
        });
        
        const sortedKanaWords = Object.entries(kanaWordCount)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 20); // 显示前20个最常见的
        
        sortedKanaWords.forEach(([word, count]) => {
            console.log(`  "${word}" - 出现${count}次`);
        });
        
    } else {
        console.log('🎉 恭喜！所有页面都已完成假名翻译！');
        console.log('✨ 汉化工作100%完成');
    }
    
    if (errorPages.length > 0) {
        console.log('\n❌ 检查错误的页面:');
        console.log('==================');
        errorPages.forEach(page => {
            console.log(`  - ${page.relativePath}: ${page.error}`);
        });
    }
    
    return {
        total: totalChecked,
        withKana: pagesWithKana.length,
        errors: errorPages.length,
        kanaWords: totalKanaWords,
        pagesWithKana,
        errorPages
    };
}

// 运行脚本
if (require.main === module) {
    checkRemainingKana();
}

module.exports = {
    checkRemainingKana,
    detectKana,
    findAllFourthLevelPages,
    checkPageKana
}; 