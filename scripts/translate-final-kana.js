const fs = require('fs');
const path = require('path');

// 用户确认的安全翻译映射（只翻译这11个项目）
const SAFE_TRANSLATIONS = {
    // 纯假名词汇
    'まつり': '祭典',
    'あり': '有',
    'または': '或',
    'もしくは': '或者', 
    'バス': '巴士',
    'できる': '可以',
    'のアジサイ': '的紫阳花',
    'されます': '举行',
    'します': '', // 删除，简化表达
    
    // 标准短语
    '有料観覧席あり': '有收费观览席',
    '有料観覧席なし': '无收费观览席'
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
                        pages.push(pagePath);
                    }
                });
            }
        });
    });
    
    return pages;
}

// 安全翻译单个文件
function translateSafely(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;
        const changes = [];
        const warnings = [];
        
        // 记录原始内容长度，用于验证翻译是否合理
        const originalLength = content.length;
        
        // 按映射表逐一安全替换
        for (const [japanese, chinese] of Object.entries(SAFE_TRANSLATIONS)) {
            const regex = new RegExp(japanese.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
            const matches = content.match(regex);
            
            if (matches) {
                // 验证替换的合理性
                if (matches.length > 50) {
                    warnings.push(`⚠️  "${japanese}"出现${matches.length}次，可能过多`);
                }
                
                if (chinese === '') {
                    // 删除表达，需要清理多余标点
                    content = content.replace(regex, '');
                    // 清理可能的多余标点
                    content = content.replace(/。。+/g, '。');
                    content = content.replace(/、。/g, '。');
                    content = content.replace(/\s+。/g, '。');
                } else {
                    content = content.replace(regex, chinese);
                }
                
                changes.push(`${japanese} → ${chinese || '(删除)'} (${matches.length}次)`);
                modified = true;
            }
        }
        
        // 验证翻译后内容的合理性
        const newLength = content.length;
        const lengthChange = Math.abs(newLength - originalLength) / originalLength;
        
        if (lengthChange > 0.1) { // 如果内容长度变化超过10%
            warnings.push(`⚠️  内容长度变化${(lengthChange * 100).toFixed(1)}%，可能异常`);
        }
        
        // 检查是否出现明显错误
        const errorPatterns = [
            /祭典祭典/, // 重复翻译
            /有有/, // 重复翻译
            /或或/, // 重复翻译
            /巴士巴士/, // 重复翻译
            /可以可以/, // 重复翻译
            /举行举行/, // 重复翻译
        ];
        
        for (const pattern of errorPatterns) {
            if (pattern.test(content)) {
                return {
                    success: false,
                    error: `检测到重复翻译错误: ${pattern.source}`,
                    changes: [],
                    warnings: [],
                    shouldStop: true
                };
            }
        }
        
        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            return {
                success: true,
                changes: changes,
                warnings: warnings,
                changeCount: changes.length,
                shouldStop: warnings.length > 2 // 如果警告过多，建议暂停
            };
        }
        
        return {
            success: true,
            changes: [],
            warnings: [],
            changeCount: 0,
            shouldStop: false
        };
        
    } catch (error) {
        return {
            success: false,
            error: error.message,
            changes: [],
            warnings: [],
            shouldStop: true
        };
    }
}

// 主执行函数
async function main() {
    console.log('🎯 开始最终假名翻译（只翻译确认的11个安全项目）...\n');
    
    const pages = findAllFourthLevelPages();
    console.log(`📁 发现 ${pages.length} 个四层页面\n`);
    
    console.log('🔤 将要翻译的内容：');
    Object.entries(SAFE_TRANSLATIONS).forEach(([jp, cn], i) => {
        console.log(`  ${i+1}. "${jp}" → "${cn || '(删除)'}"`);
    });
    console.log('');
    
    let processedCount = 0;
    let successCount = 0;
    let totalChanges = 0;
    let totalWarnings = 0;
    const results = [];
    const allWarnings = [];
    
    for (const pagePath of pages) {
        processedCount++;
        process.stdout.write(`\r处理进度: ${processedCount}/${pages.length} (${Math.round(processedCount/pages.length*100)}%)`);
        
        const result = translateSafely(pagePath);
        
        if (!result.success) {
            console.log(`\n\n❌ 发生错误！立即暂停！`);
            console.log(`文件: ${pagePath}`);
            console.log(`错误: ${result.error}`);
            console.log('\n🛑 翻译已暂停，请检查问题后再继续！');
            return;
        }
        
        if (result.shouldStop) {
            console.log(`\n\n⚠️  检测到潜在问题，建议暂停！`);
            console.log(`文件: ${pagePath}`);
            if (result.warnings.length > 0) {
                result.warnings.forEach(warning => console.log(`  ${warning}`));
            }
            console.log('\n❓ 建议检查上述问题，确认无误后再继续。');
            return;
        }
        
        successCount++;
        totalChanges += result.changeCount;
        totalWarnings += result.warnings.length;
        
        if (result.changeCount > 0) {
            results.push({
                file: pagePath,
                changes: result.changes,
                warnings: result.warnings
            });
        }
        
        allWarnings.push(...result.warnings.map(w => `${path.basename(path.dirname(pagePath))}: ${w}`));
    }
    
    console.log('\n\n📊 翻译完成！');
    console.log('===============================================');
    console.log(`✅ 处理页面: ${processedCount}个`);
    console.log(`🎯 成功翻译: ${successCount}个`);
    console.log(`🔤 翻译字段: ${totalChanges}个`);
    console.log(`📝 修改文件: ${results.length}个`);
    console.log(`⚠️  警告数量: ${totalWarnings}个`);
    
    if (results.length > 0) {
        console.log('\n📋 详细翻译结果:');
        console.log('================');
        
        let detailCount = 0;
        for (const result of results) {
            if (detailCount < 10) {
                console.log(`\n📄 ${result.file}:`);
                result.changes.forEach(change => {
                    console.log(`   ✅ ${change}`);
                });
                if (result.warnings.length > 0) {
                    result.warnings.forEach(warning => {
                        console.log(`   ⚠️  ${warning}`);
                    });
                }
                detailCount++;
            }
        }
        
        if (results.length > 10) {
            console.log(`\n... 还有 ${results.length - 10} 个文件被修改`);
        }
    }
    
    if (allWarnings.length > 0) {
        console.log('\n⚠️  所有警告汇总:');
        console.log('================');
        allWarnings.slice(0, 10).forEach(warning => {
            console.log(`  ${warning}`);
        });
        if (allWarnings.length > 10) {
            console.log(`  ... 还有 ${allWarnings.length - 10} 个警告`);
        }
    }
    
    console.log('\n🎉 最终假名翻译完成！商业网站信息已安全更新。');
}

// 运行主函数
main().catch(console.error); 