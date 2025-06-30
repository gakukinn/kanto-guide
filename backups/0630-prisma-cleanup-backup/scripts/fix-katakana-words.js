const fs = require('fs');
const path = require('path');

// 精准替换映射表 - 只处理3个假名词汇
const katakanaReplacements = {
    'スターマイン': '连发烟花',
    'ホームページ': '官网', 
    'イベント': '活动'
};

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

// 修复单个文件
function fixFileKatakana(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;
        let replacements = {};
        
        // 逐个替换假名词汇
        Object.entries(katakanaReplacements).forEach(([katakana, chinese]) => {
            const regex = new RegExp(katakana, 'g');
            const matches = content.match(regex);
            
            if (matches) {
                content = content.replace(regex, chinese);
                replacements[katakana] = matches.length;
                modified = true;
            }
        });
        
        // 如果有修改，写入文件
        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            return { success: true, replacements };
        }
        
        return { success: false, replacements: {} };
        
    } catch (error) {
        console.error(`处理文件失败: ${filePath}`, error.message);
        return { success: false, error: error.message };
    }
}

// 主修复函数
function fixAllKatakanaWords() {
    console.log('🔧 开始修复假名外来语...\n');
    
    const pages = findAllFourthLevelPages();
    console.log(`📄 找到 ${pages.length} 个四层页面文件\n`);
    
    let totalProcessed = 0;
    let totalModified = 0;
    let totalReplacements = {};
    let modifiedFiles = [];
    
    // 初始化统计
    Object.keys(katakanaReplacements).forEach(katakana => {
        totalReplacements[katakana] = 0;
    });
    
    pages.forEach((page, index) => {
        const progress = `[${index + 1}/${pages.length}]`;
        process.stdout.write(`${progress} 处理: ${page}...`);
        
        const result = fixFileKatakana(page);
        totalProcessed++;
        
        if (result.success) {
            totalModified++;
            modifiedFiles.push({
                file: page,
                replacements: result.replacements
            });
            
            // 累计替换统计
            Object.entries(result.replacements).forEach(([katakana, count]) => {
                totalReplacements[katakana] += count;
            });
            
            console.log(` ✅ 已修复`);
            
            // 显示本文件的替换详情
            Object.entries(result.replacements).forEach(([katakana, count]) => {
                console.log(`    ${katakana} → ${katakanaReplacements[katakana]} (${count}次)`);
            });
        } else if (result.error) {
            console.log(` ❌ 错误: ${result.error}`);
        } else {
            console.log(` ⚪ 无需修改`);
        }
    });
    
    // 显示最终统计
    console.log('\n' + '='.repeat(50));
    console.log('🎉 修复完成！');
    console.log('='.repeat(50));
    console.log(`📄 处理文件: ${totalProcessed} 个`);
    console.log(`✅ 修改文件: ${totalModified} 个`);
    console.log(`⚪ 无需修改: ${totalProcessed - totalModified} 个\n`);
    
    console.log('📊 假名词汇替换统计：');
    Object.entries(totalReplacements).forEach(([katakana, count]) => {
        if (count > 0) {
            console.log(`✅ ${katakana} → ${katakanaReplacements[katakana]}: ${count} 次`);
        } else {
            console.log(`⚪ ${katakana}: 未发现`);
        }
    });
    
    console.log('\n🔧 修复原则：');
    console.log('✅ 只修改四层页面文件');
    console.log('✅ 只替换3个指定假名词汇');
    console.log('✅ 精准替换，不影响其他内容');
    console.log('✅ 保持文件结构不变');
}

// 执行修复
fixAllKatakanaWords(); 