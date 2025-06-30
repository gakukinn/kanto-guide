const fs = require('fs');
const path = require('path');

// 用户指定需要分析的日文内容
const TARGET_PHRASES = [
    'ち上',
    'される',
    'を彩',
    'になります',
    'については詳細',
    'が決定次第',
    'げられる',
    '大会プログラムは過去'
];

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

// 分析内容频率
function analyzeFrequency() {
    console.log('📊 分析四层页面中日文内容出现频率');
    console.log('========================================');
    
    const allPages = findAllFourthLevelPages();
    console.log(`📋 扫描 ${allPages.length} 个四层页面\n`);
    
    // 统计每个短语的出现次数和位置
    const statistics = {};
    TARGET_PHRASES.forEach(phrase => {
        statistics[phrase] = {
            count: 0,
            pages: [],
            contexts: []
        };
    });
    
    // 扫描所有页面
    allPages.forEach(page => {
        try {
            const content = fs.readFileSync(page.path, 'utf8');
            
            TARGET_PHRASES.forEach(phrase => {
                const regex = new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
                let match;
                while ((match = regex.exec(content)) !== null) {
                    statistics[phrase].count++;
                    
                    if (!statistics[phrase].pages.includes(page.relativePath)) {
                        statistics[phrase].pages.push(page.relativePath);
                    }
                    
                    // 获取上下文（前后30个字符）
                    const start = Math.max(0, match.index - 30);
                    const end = Math.min(content.length, match.index + phrase.length + 30);
                    const context = content.substring(start, end).replace(/\n/g, ' ').trim();
                    
                    // 只保存前3个上下文示例
                    if (statistics[phrase].contexts.length < 3) {
                        statistics[phrase].contexts.push(context);
                    }
                }
            });
            
        } catch (error) {
            console.log(`❌ 读取失败: ${page.relativePath}`);
        }
    });
    
    // 按出现频率排序
    const sortedPhrases = TARGET_PHRASES.sort((a, b) => 
        statistics[b].count - statistics[a].count
    );
    
    console.log('📊 频率统计结果（按出现次数排序）：');
    console.log('==========================================\n');
    
    sortedPhrases.forEach((phrase, index) => {
        const stat = statistics[phrase];
        const priority = stat.count >= 10 ? '🔥 高频' : stat.count >= 5 ? '⚠️  中频' : '⭕ 低频';
        
        console.log(`${index + 1}. "${phrase}"`);
        console.log(`   ${priority} - 出现 ${stat.count} 次，涉及 ${stat.pages.length} 个页面`);
        
        if (stat.count > 0) {
            console.log(`   📍 主要页面: ${stat.pages.slice(0, 3).join(', ')}${stat.pages.length > 3 ? '...' : ''}`);
            console.log(`   📝 上下文示例:`);
            stat.contexts.forEach((context, i) => {
                console.log(`      ${i + 1}. "${context}"`);
            });
        } else {
            console.log(`   ℹ️  未在任何页面中发现`);
        }
        console.log('');
    });
    
    // 建议翻译优先级
    console.log('🎯 翻译建议：');
    console.log('==============');
    
    const highFrequency = sortedPhrases.filter(phrase => statistics[phrase].count >= 10);
    const mediumFrequency = sortedPhrases.filter(phrase => statistics[phrase].count >= 5 && statistics[phrase].count < 10);
    const lowFrequency = sortedPhrases.filter(phrase => statistics[phrase].count > 0 && statistics[phrase].count < 5);
    const notFound = sortedPhrases.filter(phrase => statistics[phrase].count === 0);
    
    if (highFrequency.length > 0) {
        console.log(`🔥 高优先级翻译 (≥10次): ${highFrequency.join(', ')}`);
    }
    if (mediumFrequency.length > 0) {
        console.log(`⚠️  中优先级翻译 (5-9次): ${mediumFrequency.join(', ')}`);
    }
    if (lowFrequency.length > 0) {
        console.log(`⭕ 低优先级翻译 (1-4次): ${lowFrequency.join(', ')}`);
    }
    if (notFound.length > 0) {
        console.log(`❌ 未发现内容: ${notFound.join(', ')}`);
    }
    
    return statistics;
}

// 执行分析
if (require.main === module) {
    analyzeFrequency();
}

module.exports = { analyzeFrequency, findAllFourthLevelPages }; 