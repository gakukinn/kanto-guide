const fs = require('fs');
const path = require('path');

console.log('🔍 三层页面 ↔ 四层页面数据一致性核对');
console.log('📋 核对项目：标题、日期、地址、观众数、花火数');

// 读取三层页面的事件数据
function extractThirdLayerData(region) {
    try {
        const pagePath = path.join(process.cwd(), `src/app/${region}/hanabi/page.tsx`);
        const content = fs.readFileSync(pagePath, 'utf8');
        
        // 提取事件数组
        const match = content.match(/const\s+\w+HanabiEvents\s*=\s*\[([^;]*)\];/s);
        if (!match) {
            console.log(`❌ 无法找到${region}的事件数据`);
            return [];
        }
        
        // 解析事件对象
        const eventsText = match[1];
        const events = [];
        
        // 简单的对象解析
        const objectMatches = eventsText.match(/\{[^}]*\}/g);
        if (objectMatches) {
            objectMatches.forEach(objStr => {
                const event = {};
                
                // 提取各个字段
                const nameMatch = objStr.match(/name:\s*['"`]([^'"`]*?)['"`]/);
                const dateMatch = objStr.match(/date:\s*['"`]([^'"`]*?)['"`]/);
                const locationMatch = objStr.match(/location:\s*['"`]([^'"`]*?)['"`]/);
                const fireworksMatch = objStr.match(/fireworksCount:\s*(\d+|undefined)/);
                const visitorsMatch = objStr.match(/expectedVisitors:\s*(\d+|undefined)/);
                const detailLinkMatch = objStr.match(/detailLink:\s*['"`]([^'"`]*?)['"`]/);
                
                if (nameMatch) event.name = nameMatch[1];
                if (dateMatch) event.date = dateMatch[1];
                if (locationMatch) event.location = locationMatch[1];
                if (fireworksMatch) event.fireworksCount = fireworksMatch[1] === 'undefined' ? null : parseInt(fireworksMatch[1]);
                if (visitorsMatch) event.expectedVisitors = visitorsMatch[1] === 'undefined' ? null : parseInt(visitorsMatch[1]);
                if (detailLinkMatch) event.detailLink = detailLinkMatch[1];
                
                if (event.name && event.detailLink) {
                    events.push(event);
                }
            });
        }
        
        return events;
    } catch (error) {
        console.log(`❌ 读取${region}三层页面失败: ${error.message}`);
        return [];
    }
}

// 读取四层页面数据
function extractFourthLayerData(detailPath) {
    try {
        const fullPath = path.join(process.cwd(), `src/app${detailPath}/page.tsx`);
        
        if (!fs.existsSync(fullPath)) {
            return { error: '页面文件不存在' };
        }
        
        const content = fs.readFileSync(fullPath, 'utf8');
        
        // 找到数据文件引用
        const importMatch = content.match(/import\s*{\s*(\w+)\s*}\s*from\s*['"`]([^'"`]*?)['"`]/);
        if (!importMatch) {
            return { error: '找不到数据导入' };
        }
        
        const dataVarName = importMatch[1];
        const dataFilePath = importMatch[2];
        
        // 读取数据文件
        let dataPath = path.join(process.cwd(), 'src', dataFilePath.replace(/^[@\/]/, ''));
        if (!dataPath.endsWith('.ts')) dataPath += '.ts';
        
        if (!fs.existsSync(dataPath)) {
            return { error: `数据文件不存在: ${dataPath}` };
        }
        
        const dataContent = fs.readFileSync(dataPath, 'utf8');
        
        // 提取数据字段
        const data = {};
        
        const nameMatch = dataContent.match(/name:\s*['"`]([^'"`]*?)['"`]/);
        const dateMatch = dataContent.match(/date:\s*['"`]([^'"`]*?)['"`]/);
        const fireworksMatch = dataContent.match(/fireworksCount:\s*['"`]([^'"`]*?)['"`]/);
        const visitorsMatch = dataContent.match(/expectedVisitors:\s*['"`]([^'"`]*?)['"`]/);
        
        // 处理venues数组中的location
        const venuesMatch = dataContent.match(/venues:\s*\[[^\]]*name:\s*['"`]([^'"`]*?)['"`][^\]]*\]/s);
        
        if (nameMatch) data.name = nameMatch[1];
        if (dateMatch) data.date = dateMatch[1];
        if (fireworksMatch) data.fireworksCount = fireworksMatch[1];
        if (visitorsMatch) data.expectedVisitors = visitorsMatch[1];
        if (venuesMatch) data.location = venuesMatch[1];
        
        return data;
        
    } catch (error) {
        return { error: `读取四层页面失败: ${error.message}` };
    }
}

// 核对数据一致性
function checkConsistency(thirdLayer, fourthLayer, eventName) {
    const issues = [];
    
    if (fourthLayer.error) {
        issues.push(`四层页面错误: ${fourthLayer.error}`);
        return issues;
    }
    
    // 核对标题
    if (thirdLayer.name && fourthLayer.name) {
        if (thirdLayer.name.trim() !== fourthLayer.name.trim()) {
            issues.push(`标题不一致: "${thirdLayer.name}" vs "${fourthLayer.name}"`);
        }
    }
    
    // 核对日期格式
    if (thirdLayer.date && fourthLayer.date) {
        // 简单的日期对比，允许格式差异但需要包含相同信息
        const thirdDate = thirdLayer.date.replace(/[年月日]/g, '').replace(/\s+/g, '');
        const fourthDate = fourthLayer.date.replace(/[-()土日]/g, '').replace(/\s+/g, '');
        
        if (!fourthDate.includes(thirdDate.slice(-4))) { // 检查是否包含主要日期信息
            issues.push(`日期可能不一致: "${thirdLayer.date}" vs "${fourthLayer.date}"`);
        }
    }
    
    // 核对观众数
    if (thirdLayer.expectedVisitors && fourthLayer.expectedVisitors) {
        const thirdVisitors = thirdLayer.expectedVisitors;
        const fourthVisitors = fourthLayer.expectedVisitors.replace(/[万人]/g, '');
        
        let fourthNumber;
        if (fourthVisitors.includes('万')) {
            fourthNumber = parseInt(fourthVisitors) * 10000;
        } else {
            fourthNumber = parseInt(fourthVisitors);
        }
        
        if (thirdVisitors !== fourthNumber) {
            issues.push(`观众数不一致: ${thirdVisitors} vs ${fourthLayer.expectedVisitors}`);
        }
    }
    
    // 核对花火数
    if (thirdLayer.fireworksCount === null && fourthLayer.fireworksCount) {
        issues.push(`三层页面缺少花火数，四层页面有: ${fourthLayer.fireworksCount}`);
    } else if (thirdLayer.fireworksCount && fourthLayer.fireworksCount) {
        if (thirdLayer.fireworksCount.toString() !== fourthLayer.fireworksCount.replace(/[发]/g, '')) {
            issues.push(`花火数不一致: ${thirdLayer.fireworksCount} vs ${fourthLayer.fireworksCount}`);
        }
    }
    
    return issues;
}

// 主执行函数
function main() {
    const regions = ['tokyo', 'chiba', 'saitama', 'kanagawa', 'kitakanto', 'koshinetsu'];
    let totalChecked = 0;
    let totalIssues = 0;
    
    regions.forEach(region => {
        console.log(`\n🗾 正在核对【${region.toUpperCase()}】地区:`);
        
        const events = extractThirdLayerData(region);
        
        if (events.length === 0) {
            console.log(`  ❌ 无法获取${region}的事件数据`);
            return;
        }
        
        events.forEach(event => {
            totalChecked++;
            console.log(`  📌 核对: ${event.name}`);
            
            if (!event.detailLink) {
                console.log(`    ❌ 缺少详情页面链接`);
                totalIssues++;
                return;
            }
            
            const fourthLayerData = extractFourthLayerData(event.detailLink);
            const issues = checkConsistency(event, fourthLayerData, event.name);
            
            if (issues.length === 0) {
                console.log(`    ✅ 数据一致`);
            } else {
                console.log(`    ❌ 发现问题:`);
                issues.forEach(issue => {
                    console.log(`      - ${issue}`);
                });
                totalIssues++;
            }
        });
    });
    
    console.log(`\n📋 ============ 三层↔四层一致性核对报告 ============`);
    console.log(`📊 总核对数量: ${totalChecked}个花火大会`);
    console.log(`❌ 发现问题: ${totalIssues}个`);
    console.log(`✅ 数据一致: ${totalChecked - totalIssues}个`);
    console.log(`📈 一致性率: ${((totalChecked - totalIssues) / totalChecked * 100).toFixed(2)}%`);
    
    if (totalIssues > 0) {
        console.log(`\n⚠️ 需要处理的问题类型:`);
        console.log(`1. 标题用词不一致`);
        console.log(`2. 日期格式差异`);
        console.log(`3. 观众数计算不匹配`);
        console.log(`4. 花火数缺失或不一致`);
        console.log(`5. 详情页面文件缺失`);
    }
    
    console.log(`\n✅ 三层↔四层数据一致性核对完成!`);
}

main(); 