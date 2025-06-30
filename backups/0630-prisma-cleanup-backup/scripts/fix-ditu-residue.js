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

// 处理单个文件
function processFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        let newContent = content;
        let modified = false;
        let dituCount = 0;

        // 查找并清理access项中的"地图"残留
        // 匹配模式：access 项末尾的 "地图"
        const accessDituPattern = /"access"\s*:\s*"([^"]*?)地图\s*"/g;
        
        let match;
        while ((match = accessDituPattern.exec(content)) !== null) {
            const fullMatch = match[0];
            const accessValue = match[1];
            
            // 清理"地图"，保留原有交通信息
            const cleanedAccess = `"access": "${accessValue.trim()}"`;
            newContent = newContent.replace(fullMatch, cleanedAccess);
            dituCount++;
            modified = true;
        }

        return {
            modified,
            newContent,
            dituCount
        };
    } catch (error) {
        console.error(`❌ 处理文件失败: ${filePath}`, error.message);
        return { modified: false, newContent: '', dituCount: 0 };
    }
}

// 主函数
function main() {
    console.log('🧹 开始清理四层页面access项中的"地图"残留...\n');
    
    const pages = findAllFourthLevelPages();
    console.log(`📄 找到 ${pages.length} 个四层页面文件\n`);
    
    let totalProcessed = 0;
    let totalModified = 0;
    let totalDitusCleaned = 0;
    const modifiedFiles = [];
    
    pages.forEach(filePath => {
        totalProcessed++;
        
        const result = processFile(filePath);
        
        if (result.modified) {
            try {
                fs.writeFileSync(filePath, result.newContent, 'utf8');
                totalModified++;
                totalDitusCleaned += result.dituCount;
                modifiedFiles.push({
                    path: filePath,
                    dituCount: result.dituCount
                });
                
                console.log(`✅ ${filePath} (清理 ${result.dituCount} 处"地图")`);
            } catch (error) {
                console.error(`❌ 写入文件失败: ${filePath}`, error.message);
                console.log('🚨 发现问题，暂停一切操作！');
                process.exit(1);
            }
        }
    });
    
    console.log('\n🎉 "地图"残留清理完成！');
    console.log('=====================================');
    console.log(`📄 处理文件总数: ${totalProcessed}`);
    console.log(`✅ 修改文件数量: ${totalModified}`);
    console.log(`🧹 清理"地图"总数: ${totalDitusCleaned}`);
    
    if (modifiedFiles.length > 0) {
        console.log('\n📁 修改的文件清单:');
        console.log('=====================================');
        modifiedFiles.forEach((file, index) => {
            console.log(`${index + 1}. ${file.path}`);
            console.log(`   清理"地图"数量: ${file.dituCount} 处`);
        });
    }
    
    // 验证清理结果
    console.log('\n🔍 验证清理结果...');
    let remainingDitu = 0;
    pages.forEach(filePath => {
        const content = fs.readFileSync(filePath, 'utf8');
        const matches = content.match(/"access"\s*:\s*"[^"]*地图\s*"/g);
        if (matches) {
            remainingDitu += matches.length;
        }
    });
    
    if (remainingDitu > 0) {
        console.log(`❌ 警告：仍有 ${remainingDitu} 处"地图"残留未清理！`);
        console.log('🚨 暂停一切操作，需要人工检查！');
    } else {
        console.log('✅ 验证通过：所有"地图"残留已完全清理！');
    }
}

// 运行脚本
main(); 