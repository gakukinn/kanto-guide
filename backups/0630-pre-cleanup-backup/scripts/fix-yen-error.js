const fs = require('fs');
const path = require('path');

// 错误翻译的修复映射
const YEN_ERROR_FIXES = {
    // 地名修复（円 → 円）
    '高日元寺': '高円寺',
    '新高日元寺': '新高円寺',
    
    // 其他可能的地名错误
    'JR高日元寺駅': 'JR高円寺駅',
    '座・高日元寺': '座・高円寺',
    '東京高日元寺': '東京高円寺',
    
    // 保持价格中的正确翻译（这些应该保持为日元）
    // 注意：价格相关的翻译是正确的，不需要修复
};

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

// 修复单个页面的円错误翻译
function fixPageYenError(filePath, relativePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let fixCount = 0;
        const fixes = [];
        
        // 检查并修复每个错误翻译
        for (const [errorText, correctText] of Object.entries(YEN_ERROR_FIXES)) {
            if (content.includes(errorText)) {
                // 计算替换次数
                const matches = content.match(new RegExp(errorText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'));
                const replaceCount = matches ? matches.length : 0;
                
                if (replaceCount > 0) {
                    content = content.replace(new RegExp(errorText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), correctText);
                    fixCount += replaceCount;
                    fixes.push({
                        error: errorText,
                        correct: correctText,
                        count: replaceCount
                    });
                    
                    console.log(`        ✅ 修复: "${errorText}" → "${correctText}" (${replaceCount}处)`);
                }
            }
        }
        
        if (fixCount > 0) {
            fs.writeFileSync(filePath, content, 'utf8');
        }
        
        return {
            success: true,
            relativePath,
            fixCount,
            fixes
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
async function fixYenErrors() {
    console.log('🚨 修复円字错误翻译问题');
    console.log('==========================');
    console.log('❌ 问题: 地名"高円寺"被错误翻译为"高日元寺"');
    console.log('✅ 修复: 恢复地名的正确写法');
    console.log('💰 保持: 价格中的"日元"翻译');
    console.log('');
    
    console.log('🔍 错误翻译模式:');
    Object.entries(YEN_ERROR_FIXES).forEach(([error, correct]) => {
        console.log(`   "${error}" → "${correct}"`);
    });
    console.log('');
    
    // 扫描所有四层页面
    const allPages = findAllFourthLevelPages();
    console.log(`📊 扫描 ${allPages.length} 个四层页面\n`);
    
    let totalProcessed = 0;
    let fixedPages = 0;
    let totalFixes = 0;
    let errorPages = [];
    
    const startTime = Date.now();
    
    console.log('🔧 开始修复处理...\n');
    
    for (const page of allPages) {
        totalProcessed++;
        console.log(`[${totalProcessed}/${allPages.length}] 检查: ${page.relativePath}`);
        
        const result = fixPageYenError(page.path, page.relativePath);
        
        if (result.success) {
            if (result.fixCount > 0) {
                console.log(`  ✅ 修复了 ${result.fixCount} 处错误翻译`);
                fixedPages++;
                totalFixes += result.fixCount;
            } else {
                console.log(`  ℹ️  无需修复`);
            }
        } else {
            console.log(`  ❌ 处理失败: ${result.error}`);
            errorPages.push(result);
        }
        
        console.log('');
    }
    
    const totalTime = (Date.now() - startTime) / 1000;
    
    // 生成最终报告
    console.log('📊 円字错误修复完成 - 最终报告');
    console.log('===============================');
    console.log(`✅ 扫描页面: ${totalProcessed}个`);
    console.log(`🔧 修复页面: ${fixedPages}个`);
    console.log(`❌ 处理失败: ${errorPages.length}个`);
    console.log(`🔤 修复错误: ${totalFixes}处`);
    console.log(`⏱️  总耗时: ${Math.round(totalTime)}秒`);
    console.log('');
    
    if (errorPages.length > 0) {
        console.log('❌ 处理失败的页面:');
        console.log('==================');
        errorPages.forEach(page => {
            console.log(`  - ${page.relativePath}: ${page.error}`);
        });
        console.log('');
    }
    
    if (fixedPages > 0) {
        console.log('🎉 错误修复完成！');
        console.log('==================');
        console.log('✅ 地名翻译已恢复正确');
        console.log('💰 价格翻译保持正确');
        console.log('📍 特别修复: 高円寺相关地名');
        console.log('');
        console.log('💡 建议下一步: 重新运行检查脚本');
        console.log('🔍 命令: node scripts/check-remaining-kana.js');
    } else {
        console.log('ℹ️  未发现需要修复的円字错误');
    }
    
    return {
        total: totalProcessed,
        fixed: fixedPages,
        errors: errorPages.length,
        fixes: totalFixes,
        timeSeconds: totalTime
    };
}

// 运行脚本
if (require.main === module) {
    fixYenErrors().catch(console.error);
}

module.exports = {
    fixYenErrors,
    YEN_ERROR_FIXES
}; 