const fs = require('fs');
const path = require('path');

// 必须修复的高频错误模式
const criticalErrors = [
    // 1. 中日文混合表达（必须修复）
    { pattern: /堪能可以/g, name: '堪能可以', type: '混合表达' },
    { pattern: /鑑賞可以/g, name: '鑑賞可以', type: '混合表达' },
    { pattern: /確認可以/g, name: '確認可以', type: '混合表达' },
    { pattern: /被燃放花火/g, name: '被燃放花火', type: '混合表达' },
    { pattern: /举办夏の/g, name: '举办夏の', type: '混合表达' },
    { pattern: /夏装点一大イベント/g, name: '夏装点一大イベント', type: '混合表达' },
    { pattern: /装点夜空/g, name: '装点夜空', type: '混合表达' },
    { pattern: /举行ため/g, name: '举行ため', type: '混合表达' },
    { pattern: /同時举办/g, name: '同時举办', type: '混合表达' },
    { pattern: /かけて举办/g, name: 'かけて举办', type: '混合表达' },
    
    // 2. 日文外来语（频率高，应翻译）
    { pattern: /フェスタ/g, name: 'フェスタ', type: '外来语' },
    { pattern: /イベント/g, name: 'イベント', type: '外来语' },
    { pattern: /テーブル席/g, name: 'テーブル席', type: '外来语' },
    { pattern: /シート席/g, name: 'シート席', type: '外来语' },
    { pattern: /インターネットで/g, name: 'インターネットで', type: '外来语' },
    { pattern: /ホームページ/g, name: 'ホームページ', type: '外来语' },
    { pattern: /スターマイン/g, name: 'スターマイン', type: '外来语' },
    
    // 3. 地名专有名词混合
    { pattern: /水郷おみがわ/g, name: '水郷おみがわ', type: '地名' },
    { pattern: /手賀沼/g, name: '手賀沼', type: '地名' },
    { pattern: /富津岬方面へ/g, name: '富津岬方面へ', type: '地名' },
    
    // 4. 明显语法错误
    { pattern: /恶劣天气时中止となるため/g, name: '恶劣天气时中止となるため', type: '语法混合' },
    { pattern: /なども举行/g, name: 'なども举行', type: '语法混合' },
    { pattern: /開催举行/g, name: '開催举行', type: '语法混合' }
];

// 扫描所有四层页面文件
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
                    if (fs.statSync(itemPath).isDirectory()) {
                        const pagePath = path.join(itemPath, 'page.tsx');
                        if (fs.existsSync(pagePath)) {
                            pages.push(pagePath);
                        }
                    }
                });
            }
        });
    });
    
    return pages;
}

// 统计错误频率
function findCriticalErrors() {
    const pages = findAllFourthLevelPages();
    const errorStats = {};
    const errorDetails = {};
    
    // 初始化统计
    criticalErrors.forEach(error => {
        errorStats[error.name] = 0;
        errorDetails[error.name] = {
            type: error.type,
            files: []
        };
    });
    
    pages.forEach(page => {
        try {
            const content = fs.readFileSync(page, 'utf8');
            
            criticalErrors.forEach(error => {
                const matches = content.match(error.pattern);
                if (matches) {
                    errorStats[error.name] += matches.length;
                    errorDetails[error.name].files.push({
                        file: page,
                        count: matches.length
                    });
                }
            });
        } catch (err) {
            console.error(`读取文件失败: ${page}`);
        }
    });
    
    return { errorStats, errorDetails };
}

// 主函数
function main() {
    console.log('🔍 查找必须修复的高频错误...\n');
    
    const { errorStats, errorDetails } = findCriticalErrors();
    
    // 按频率排序
    const sortedErrors = Object.entries(errorStats)
        .filter(([name, count]) => count > 0)
        .sort(([, a], [, b]) => b - a);
    
    if (sortedErrors.length === 0) {
        console.log('✅ 没有发现必须修复的高频错误！');
        return;
    }
    
    console.log('📊 必须修复的高频错误统计：');
    console.log('=====================================\n');
    
    sortedErrors.forEach(([errorName, count], index) => {
        const detail = errorDetails[errorName];
        console.log(`${index + 1}. ❌ "${errorName}" (${detail.type})`);
        console.log(`   📈 出现次数: ${count} 次`);
        console.log(`   📄 涉及文件: ${detail.files.length} 个`);
        
        if (count >= 5) {
            console.log('   🚨 高频错误 - 建议优先修复！');
        }
        
        console.log('   📁 详细文件:');
        detail.files.slice(0, 5).forEach(fileInfo => {
            console.log(`      ${fileInfo.file} (${fileInfo.count}次)`);
        });
        
        if (detail.files.length > 5) {
            console.log(`      ... 还有 ${detail.files.length - 5} 个文件`);
        }
        
        console.log('');
    });
    
    // 建议修复顺序
    const highFrequencyErrors = sortedErrors.filter(([, count]) => count >= 5);
    
    if (highFrequencyErrors.length > 0) {
        console.log('🎯 建议修复顺序（高频错误优先）：');
        console.log('====================================');
        highFrequencyErrors.forEach(([errorName, count], index) => {
            console.log(`${index + 1}. "${errorName}" - ${count}次`);
        });
    }
}

main(); 