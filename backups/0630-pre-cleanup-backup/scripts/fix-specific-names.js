const fs = require('fs');
const path = require('path');

// 精准替换映射表
const nameReplacements = {
    '銚子みなと': '銚子港口',
    '幕張ビーチ': '幕张海滩', 
    '八千代ふるさと': '八千代故乡',
    'ぎおん柏崎祭典': '祇园柏崎祭典'
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
function fixFileNames(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;
        let replacements = [];
        
        // 对每个专有名词进行替换
        Object.entries(nameReplacements).forEach(([japanese, chinese]) => {
            const regex = new RegExp(japanese.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
            const matches = content.match(regex);
            if (matches) {
                content = content.replace(regex, chinese);
                replacements.push(`${japanese} → ${chinese} (${matches.length}次)`);
                modified = true;
            }
        });
        
        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ ${filePath}`);
            replacements.forEach(rep => console.log(`   ${rep}`));
            return replacements.length;
        }
        
        return 0;
    } catch (error) {
        console.error(`❌ 处理文件失败: ${filePath} - ${error.message}`);
        return 0;
    }
}

// 主函数
function main() {
    console.log('🔧 开始修复专有名词...\n');
    
    const pages = findAllFourthLevelPages();
    console.log(`📄 找到 ${pages.length} 个四层页面文件\n`);
    
    let totalReplacements = 0;
    let modifiedFiles = 0;
    
    pages.forEach(page => {
        const replacements = fixFileNames(page);
        if (replacements > 0) {
            modifiedFiles++;
            totalReplacements += replacements;
        }
    });
    
    console.log('\n🎉 修复完成！');
    console.log(`✅ 修改了 ${modifiedFiles} 个文件`);
    console.log(`✅ 总共替换了 ${totalReplacements} 处专有名词`);
    console.log('\n替换对照表:');
    Object.entries(nameReplacements).forEach(([jp, cn]) => {
        console.log(`${jp} → ${cn}`);
    });
}

main(); 