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

// 检查单个文件
function checkFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const findings = [];

        // 查找access项中结尾是"地图"的情况
        const accessDituPattern = /"access"\s*:\s*"([^"]*?)地图\s*"/g;
        
        let match;
        while ((match = accessDituPattern.exec(content)) !== null) {
            const accessValue = match[1] + '地图';
            findings.push({
                pattern: 'access结尾地图',
                content: accessValue,
                fullMatch: match[0]
            });
        }

        // 也检查其他可能的地图位置
        const generalDituPattern = /"[^"]*地图[^"]*"/g;
        let generalMatch;
        while ((generalMatch = generalDituPattern.exec(content)) !== null) {
            // 排除已经在access中找到的
            const isAccessMatch = findings.some(f => generalMatch[0].includes(f.content));
            if (!isAccessMatch) {
                findings.push({
                    pattern: '其他位置地图',
                    content: generalMatch[0],
                    fullMatch: generalMatch[0]
                });
            }
        }

        return findings;
    } catch (error) {
        console.error(`❌ 读取文件失败: ${filePath}`, error.message);
        return [];
    }
}

// 主函数
function main() {
    console.log('🔍 检查四层页面中的"地图"残留...\n');
    
    const pages = findAllFourthLevelPages();
    console.log(`📄 找到 ${pages.length} 个四层页面文件\n`);
    
    let totalProcessed = 0;
    let totalFindings = 0;
    const filesWithDitu = [];
    
    pages.forEach(filePath => {
        totalProcessed++;
        
        const findings = checkFile(filePath);
        
        if (findings.length > 0) {
            totalFindings += findings.length;
            filesWithDitu.push({
                path: filePath,
                findings: findings
            });
        }
    });
    
    console.log('📊 "地图"残留统计：');
    console.log('=====================================');
    console.log(`📄 总计处理文件: ${totalProcessed} 个`);
    console.log(`❌ 发现"地图"残留: ${filesWithDitu.length} 个文件`);
    console.log(`🔢 "地图"总数量: ${totalFindings} 处`);
    
    if (filesWithDitu.length > 0) {
        console.log('\n📁 详细文件清单：');
        console.log('=====================================');
        filesWithDitu.forEach((fileInfo, index) => {
            console.log(`${index + 1}. ${fileInfo.path}`);
            console.log(`   地图数量: ${fileInfo.findings.length} 处`);
            
            fileInfo.findings.forEach((finding, fIndex) => {
                const preview = finding.content.length > 80 
                    ? finding.content.substring(0, 80) + '...' 
                    : finding.content;
                console.log(`   ${finding.pattern}: "${preview}"`);
            });
            console.log('');
        });
    } else {
        console.log('\n✅ 太好了！没有发现"地图"残留问题');
    }
    
    console.log('\n🎯 检查完成');
    console.log('====================================');
    if (filesWithDitu.length > 0) {
        console.log('建议处理方案：');
        console.log('1. 如果是技术残留，直接删除"地图"');
        console.log('2. 如果是有意翻译，考虑保留或调整表达');
    }
}

// 运行脚本
main(); 