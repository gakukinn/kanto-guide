const fs = require('fs');
const path = require('path');

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

// 检查MAP残留
function checkMapResidue() {
    console.log('🔍 检查四层页面access项中的MAP残留...\n');
    
    const pages = findAllFourthLevelPages();
    let totalFiles = 0;
    let affectedFiles = 0;
    let totalMapCount = 0;
    const affectedFilesList = [];
    
    pages.forEach(filePath => {
        totalFiles++;
        const content = fs.readFileSync(filePath, 'utf-8');
        
        // 检查access字段中的MAP
        const accessMatches = content.match(/"access"\s*:\s*"[^"]*MAP[^"]*"/g);
        if (accessMatches) {
            affectedFiles++;
            let fileMapCount = 0;
            
            accessMatches.forEach(match => {
                const mapMatches = match.match(/MAP/g);
                if (mapMatches) {
                    fileMapCount += mapMatches.length;
                }
            });
            
            totalMapCount += fileMapCount;
            affectedFilesList.push({
                file: filePath,
                count: fileMapCount,
                matches: accessMatches
            });
        }
    });
    
    console.log(`📊 MAP残留统计：`);
    console.log(`=====================================`);
    console.log(`📄 总计处理文件: ${totalFiles} 个`);
    console.log(`❌ 发现MAP残留: ${affectedFiles} 个文件`);
    console.log(`🔢 MAP总数量: ${totalMapCount} 处`);
    console.log('');
    
    if (affectedFilesList.length > 0) {
        console.log(`📁 详细文件清单：`);
        console.log(`=====================================`);
        affectedFilesList.forEach((item, index) => {
            console.log(`${index + 1}. ${item.file}`);
            console.log(`   MAP数量: ${item.count} 处`);
            item.matches.forEach(match => {
                console.log(`   内容预览: ${match.substring(0, 100)}...`);
            });
            console.log('');
        });
    }
    
    console.log(`🎯 建议处理方案：`);
    console.log(`====================================`);
    console.log(`1. 直接删除 "MAP" 文字`);
    console.log(`2. 替换为 "地图"`);
    console.log(`3. 完全移除 access 项末尾的 MAP 部分`);
}

// 执行检查
checkMapResidue(); 