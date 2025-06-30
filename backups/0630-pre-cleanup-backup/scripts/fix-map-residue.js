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
        let mapCount = 0;

        // 查找并清理access项中的MAP残留
        // 匹配模式：access 项末尾的 MAP
        const accessMapPattern = /"access"\s*:\s*"([^"]*?)MAP"/g;
        
        let match;
        while ((match = accessMapPattern.exec(content)) !== null) {
            const fullMatch = match[0];
            const accessValue = match[1];
            
            // 清理MAP，保留原有交通信息
            const cleanedAccess = `"access": "${accessValue.trim()}"`;
            newContent = newContent.replace(fullMatch, cleanedAccess);
            mapCount++;
            modified = true;
        }

        return {
            modified,
            newContent,
            mapCount
        };
    } catch (error) {
        console.error(`❌ 处理文件失败: ${filePath}`, error.message);
        return { modified: false, newContent: '', mapCount: 0 };
    }
}

// 主函数
function main() {
    console.log('🧹 开始清理四层页面access项中的MAP残留...\n');
    
    const pages = findAllFourthLevelPages();
    console.log(`📄 找到 ${pages.length} 个四层页面文件\n`);
    
    let totalProcessed = 0;
    let totalModified = 0;
    let totalMapsCleaned = 0;
    const modifiedFiles = [];
    
    pages.forEach(filePath => {
        totalProcessed++;
        
        const result = processFile(filePath);
        
        if (result.modified) {
            try {
                fs.writeFileSync(filePath, result.newContent, 'utf8');
                totalModified++;
                totalMapsCleaned += result.mapCount;
                modifiedFiles.push({
                    path: filePath,
                    mapCount: result.mapCount
                });
                
                console.log(`✅ ${filePath} (清理 ${result.mapCount} 处MAP)`);
            } catch (error) {
                console.error(`❌ 写入文件失败: ${filePath}`, error.message);
            }
        }
    });
    
    console.log('\n🎉 MAP残留清理完成！');
    console.log('=====================================');
    console.log(`📄 处理文件总数: ${totalProcessed}`);
    console.log(`✅ 修改文件数量: ${totalModified}`);
    console.log(`🧹 清理MAP总数: ${totalMapsCleaned}`);
    
    if (modifiedFiles.length > 0) {
        console.log('\n📁 修改的文件清单:');
        console.log('=====================================');
        modifiedFiles.forEach((file, index) => {
            console.log(`${index + 1}. ${file.path}`);
            console.log(`   清理MAP数量: ${file.mapCount} 处`);
        });
    }
}

// 运行脚本
main(); 