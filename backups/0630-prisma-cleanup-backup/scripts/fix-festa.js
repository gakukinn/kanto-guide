const fs = require('fs');
const path = require('path');

// 精准替换映射表 - 只处理フェスタ
const festaReplacement = {
    'フェスタ': '庆典'
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

// 处理单个文件
function processFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        let modified = false;
        let newContent = content;
        let replacementCount = 0;
        
        // 检查并替换フェスタ
        const matches = content.match(/フェスタ/g);
        if (matches) {
            newContent = content.replace(/フェスタ/g, '庆典');
            replacementCount = matches.length;
            modified = true;
        }
        
        if (modified) {
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log(`✅ ${filePath} - 替换 ${replacementCount} 处`);
        }
        
        return replacementCount;
    } catch (error) {
        console.error(`❌ 处理文件失败: ${filePath}`, error);
        return 0;
    }
}

// 主函数
function main() {
    console.log('🔧 开始修复 フェスタ...');
    console.log('');
    
    const pages = findAllFourthLevelPages();
    console.log(`📊 发现 ${pages.length} 个四层页面文件`);
    console.log('');
    
    let totalReplacements = 0;
    let modifiedFiles = 0;
    
    pages.forEach(page => {
        const replacements = processFile(page);
        if (replacements > 0) {
            totalReplacements += replacements;
            modifiedFiles++;
        }
    });
    
    console.log('');
    console.log('🎉 修复完成！');
    console.log(`📄 处理文件总数: ${pages.length}`);
    console.log(`🔧 修改文件数量: ${modifiedFiles}`);
    console.log(`✅ 总替换次数: ${totalReplacements}`);
    console.log('');
    console.log('📋 修复详情:');
    console.log('   フェスタ → 庆典');
}

main(); 