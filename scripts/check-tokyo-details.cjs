const fs = require('fs');
const path = require('path');

console.log('🗾 东京地区数据一致性详细检查');
console.log('📋 核对项目：标题、日期、地点、观众数、花火数');

// 读取东京三层页面数据
function getTokyoThirdLayerData() {
    try {
        const pagePath = path.join(process.cwd(), 'src/app/tokyo/hanabi/page.tsx');
        const content = fs.readFileSync(pagePath, 'utf8');
        
        const match = content.match(/const\s+tokyoHanabiEvents\s*=\s*\[([^;]*)\];/s);
        if (!match) {
            console.log('❌ 无法找到东京事件数据');
            return [];
        }
        
        const eventsText = match[1];
        const events = [];
        
        // 解析每个事件对象
        const objectMatches = eventsText.match(/\{[^}]*\}/g);
        if (objectMatches) {
            objectMatches.forEach(objStr => {
                const event = {};
                
                const nameMatch = objStr.match(/name:\s*['"`]([^'"`]*?)['"`]/);
                const dateMatch = objStr.match(/date:\s*['"`]([^'"`]*?)['"`]/);
                const locationMatch = objStr.match(/location:\s*['"`]([^'"`]*?)['"`]/);
                const fireworksMatch = objStr.match(/fireworksCount:\s*(\d+)/);
                const visitorsMatch = objStr.match(/expectedVisitors:\s*(\d+)/);
                const detailLinkMatch = objStr.match(/detailLink:\s*['"`]([^'"`]*?)['"`]/);
                
                if (nameMatch) event.name = nameMatch[1];
                if (dateMatch) event.date = dateMatch[1];
                if (locationMatch) event.location = locationMatch[1];
                if (fireworksMatch) event.fireworksCount = parseInt(fireworksMatch[1]);
                if (visitorsMatch) event.expectedVisitors = parseInt(visitorsMatch[1]);
                if (detailLinkMatch) event.detailLink = detailLinkMatch[1];
                
                if (event.name) {
                    events.push(event);
                }
            });
        }
        
        return events;
    } catch (error) {
        console.log(`❌ 读取东京三层页面失败: ${error.message}`);
        return [];
    }
}

// 读取四层页面数据
function getFourthLayerData(detailPath) {
    try {
        const fullPath = path.join(process.cwd(), `src/app${detailPath}/page.tsx`);
        
        if (!fs.existsSync(fullPath)) {
            return { error: '四层页面文件不存在', path: fullPath };
        }
        
        const content = fs.readFileSync(fullPath, 'utf8');
        
        // 找到数据文件引用
        const importMatch = content.match(/import\s*{\s*(\w+)\s*}\s*from\s*['"`]([^'"`]*?)['"`]/);
        if (!importMatch) {
            return { error: '找不到数据导入' };
        }
        
        const dataVarName = importMatch[1];
        const dataFilePath = importMatch[2];
        
        // 构建数据文件路径
        let dataPath = path.join(process.cwd(), 'src', dataFilePath.replace(/^[@\/]/, ''));
        if (!dataPath.endsWith('.ts')) dataPath += '.ts';
        
        if (!fs.existsSync(dataPath)) {
            return { error: `数据文件不存在`, dataPath: dataPath };
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

// 详细分析每个问题
function analyzeIssue(thirdLayer, fourthLayer, eventName) {
    const issues = [];
    
    console.log(`\n📌 【${eventName}】详细分析:`);
    console.log(`   三层数据: ${JSON.stringify({
        name: thirdLayer.name,
        date: thirdLayer.date, 
        location: thirdLayer.location,
        visitors: thirdLayer.expectedVisitors,
        fireworks: thirdLayer.fireworksCount
    }, null, 2)}`);
    
    if (fourthLayer.error) {
        console.log(`   ❌ 四层页面问题: ${fourthLayer.error}`);
        if (fourthLayer.path) console.log(`      路径: ${fourthLayer.path}`);
        if (fourthLayer.dataPath) console.log(`      数据文件: ${fourthLayer.dataPath}`);
        issues.push(`四层页面错误: ${fourthLayer.error}`);
        return issues;
    }
    
    console.log(`   四层数据: ${JSON.stringify({
        name: fourthLayer.name,
        date: fourthLayer.date,
        location: fourthLayer.location, 
        visitors: fourthLayer.expectedVisitors,
        fireworks: fourthLayer.fireworksCount
    }, null, 2)}`);
    
    // 详细核对每个字段
    if (thirdLayer.name && fourthLayer.name && thirdLayer.name.trim() !== fourthLayer.name.trim()) {
        console.log(`   ⚠️ 标题不一致:`);
        console.log(`      三层: "${thirdLayer.name}"`);
        console.log(`      四层: "${fourthLayer.name}"`);
        console.log(`      建议: 选择更完整的版本`);
        issues.push('标题不一致');
    }
    
    if (thirdLayer.date && fourthLayer.date) {
        console.log(`   ⚠️ 日期格式:`);
        console.log(`      三层: "${thirdLayer.date}"`);
        console.log(`      四层: "${fourthLayer.date}"`);
        console.log(`      建议: 统一为信息更多的格式`);
        issues.push('日期格式不同');
    }
    
    if (thirdLayer.expectedVisitors && fourthLayer.expectedVisitors) {
        console.log(`   ⚠️ 观众数格式:`);
        console.log(`      三层: ${thirdLayer.expectedVisitors}`);
        console.log(`      四层: "${fourthLayer.expectedVisitors}"`);
        console.log(`      建议: 统一为带"万人"的文字格式`);
        issues.push('观众数格式不同');
    }
    
    if (thirdLayer.fireworksCount && fourthLayer.fireworksCount) {
        console.log(`   ⚠️ 花火数格式:`);
        console.log(`      三层: ${thirdLayer.fireworksCount}`);
        console.log(`      四层: "${fourthLayer.fireworksCount}"`);
        console.log(`      建议: 统一为带"发"的文字格式`);
        issues.push('花火数格式不同');
    }
    
    if (issues.length === 0) {
        console.log(`   ✅ 数据完全一致`);
    }
    
    return issues;
}

// 主执行函数
function main() {
    console.log('\n🔍 开始东京地区详细检查...\n');
    
    const tokyoEvents = getTokyoThirdLayerData();
    
    if (tokyoEvents.length === 0) {
        console.log('❌ 无法获取东京事件数据');
        return;
    }
    
    console.log(`📊 找到 ${tokyoEvents.length} 个东京花火大会`);
    
    let totalIssues = 0;
    let fileNotFoundCount = 0;
    let dataInconsistentCount = 0;
    
    tokyoEvents.forEach((event, index) => {
        const fourthLayerData = getFourthLayerData(event.detailLink);
        const issues = analyzeIssue(event, fourthLayerData, event.name);
        
        if (issues.length > 0) {
            totalIssues++;
            if (issues.some(issue => issue.includes('文件不存在') || issue.includes('数据文件不存在'))) {
                fileNotFoundCount++;
            } else {
                dataInconsistentCount++;
            }
        }
    });
    
    console.log(`\n📋 ============ 东京地区问题汇总 ============`);
    console.log(`📊 总检查数量: ${tokyoEvents.length}个`);
    console.log(`❌ 有问题的: ${totalIssues}个`);
    console.log(`📁 文件缺失: ${fileNotFoundCount}个`);
    console.log(`📝 数据不一致: ${dataInconsistentCount}个`);
    console.log(`✅ 完全正常: ${tokyoEvents.length - totalIssues}个`);
    
    console.log(`\n💡 下一步建议:`);
    console.log(`1. 先修复文件缺失问题`);
    console.log(`2. 再统一数据格式`);
    console.log(`3. 确保信息准确性`);
}

main(); 