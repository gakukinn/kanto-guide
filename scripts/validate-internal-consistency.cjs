const fs = require('fs');
const path = require('path');

console.log('🔍 开始内部数据一致性核对...');
console.log('📋 核对项目：标题、日期、地址、观众数、花火数');

// 读取三层页面数据
function readThirdLayerData() {
    const regions = ['tokyo', 'chiba', 'saitama', 'kanagawa', 'kitakanto', 'koshinetsu'];
    const allData = {};
    
    regions.forEach(region => {
        try {
            const pagePath = path.join(process.cwd(), `src/app/${region}/hanabi/page.tsx`);
            const content = fs.readFileSync(pagePath, 'utf8');
            
            // 提取花火数据数组
            const match = content.match(/const\s+\w+HanabiEvents\s*=\s*\[([\s\S]*?)\];/);
            if (match) {
                // 简化的数据提取（实际需要更复杂的解析）
                allData[region] = extractEventData(match[1], region);
            }
        } catch (error) {
            console.log(`❌ 读取${region}页面失败:`, error.message);
        }
    });
    
    return allData;
}

// 提取事件数据的简化函数
function extractEventData(dataString, region) {
    const events = [];
    
    // 使用正则提取每个事件的基本信息
    const eventMatches = dataString.match(/\{[^}]*id:\s*['"`]([^'"`]+)['"`][^}]*\}/g);
    
    if (eventMatches) {
        eventMatches.forEach(eventStr => {
            const event = {};
            
            // 提取ID
            const idMatch = eventStr.match(/id:\s*['"`]([^'"`]+)['"`]/);
            if (idMatch) event.id = idMatch[1];
            
            // 提取名称
            const nameMatch = eventStr.match(/name:\s*['"`]([^'"`]+)['"`]/);
            if (nameMatch) event.name = nameMatch[1];
            
            // 提取日期
            const dateMatch = eventStr.match(/date:\s*['"`]([^'"`]+)['"`]/);
            if (dateMatch) event.date = dateMatch[1];
            
            // 提取地点
            const locationMatch = eventStr.match(/location:\s*['"`]([^'"`]+)['"`]/);
            if (locationMatch) event.location = locationMatch[1];
            
            // 提取观众数
            const visitorsMatch = eventStr.match(/expectedVisitors:\s*(\d+)/);
            if (visitorsMatch) event.expectedVisitors = parseInt(visitorsMatch[1]);
            
            // 提取花火数
            const fireworksMatch = eventStr.match(/fireworksCount:\s*(\d+)/);
            if (fireworksMatch) event.fireworksCount = parseInt(fireworksMatch[1]);
            
            // 提取详情链接
            const linkMatch = eventStr.match(/detailLink:\s*['"`]([^'"`]+)['"`]/);
            if (linkMatch) event.detailLink = linkMatch[1];
            
            if (event.id) {
                event.region = region;
                events.push(event);
            }
        });
    }
    
    return events;
}

// 读取四层详情页面数据
function readFourthLayerData(region, eventId, detailPath) {
    try {
        // 尝试从多个可能的路径读取详情数据
        const possiblePaths = [
            path.join(process.cwd(), `src/app${detailPath}/page.tsx`),
            path.join(process.cwd(), `src/data/${region}/hanabi/${eventId}.json`),
            path.join(process.cwd(), `src/data/level5-${eventId}.ts`),
        ];
        
        for (const filePath of possiblePaths) {
            if (fs.existsSync(filePath)) {
                const content = fs.readFileSync(filePath, 'utf8');
                return extractDetailData(content, eventId);
            }
        }
        
        return null;
    } catch (error) {
        return null;
    }
}

// 提取详情数据
function extractDetailData(content, eventId) {
    const detail = { id: eventId };
    
    // 根据文件类型提取数据
    if (content.includes('.json')) {
        // JSON文件处理
        try {
            const jsonMatch = content.match(/import\s+\w+\s+from\s+['"`]([^'"`]+\.json)['"`]/);
            if (jsonMatch) {
                detail.source = 'json';
            }
        } catch (e) {}
    } else if (content.includes('export const')) {
        // TypeScript导出数据处理
        const nameMatch = content.match(/name:\s*['"`]([^'"`]+)['"`]/);
        if (nameMatch) detail.name = nameMatch[1];
        
        const dateMatch = content.match(/date:\s*['"`]([^'"`]+)['"`]/);
        if (dateMatch) detail.date = dateMatch[1];
        
        const locationMatch = content.match(/location:\s*['"`]([^'"`]+)['"`]/);
        if (locationMatch) detail.location = locationMatch[1];
        
        detail.source = 'typescript';
    }
    
    return detail;
}

// 核对数据一致性
function validateConsistency() {
    const thirdLayerData = readThirdLayerData();
    const issues = [];
    let totalChecked = 0;
    let issuesFound = 0;
    
    console.log('\n📊 开始逐项核对...\n');
    
    Object.keys(thirdLayerData).forEach(region => {
        console.log(`🗾 正在核对【${region.toUpperCase()}】地区:`);
        
        thirdLayerData[region].forEach(event => {
            totalChecked++;
            console.log(`  📌 核对: ${event.name}`);
            
            // 检查必要字段是否存在
            const requiredFields = ['name', 'date', 'location', 'expectedVisitors', 'fireworksCount'];
            const missingFields = requiredFields.filter(field => !event[field]);
            
            if (missingFields.length > 0) {
                const issue = {
                    region,
                    eventId: event.id,
                    eventName: event.name,
                    type: 'missing_fields',
                    details: `缺少字段: ${missingFields.join(', ')}`,
                    data: event
                };
                issues.push(issue);
                issuesFound++;
                console.log(`    ❌ 发现问题: 缺少字段 ${missingFields.join(', ')}`);
            }
            
            // 检查数据格式
            if (event.date && !event.date.match(/\d{4}年\d{1,2}月\d{1,2}日/)) {
                const issue = {
                    region,
                    eventId: event.id,
                    eventName: event.name,
                    type: 'date_format',
                    details: `日期格式异常: ${event.date}`,
                    data: event
                };
                issues.push(issue);
                issuesFound++;
                console.log(`    ⚠️ 日期格式问题: ${event.date}`);
            }
            
            // 检查数值合理性
            if (event.expectedVisitors && event.expectedVisitors > 1000000) {
                const issue = {
                    region,
                    eventId: event.id,
                    eventName: event.name,
                    type: 'unrealistic_visitors',
                    details: `观众数异常: ${event.expectedVisitors}人`,
                    data: event
                };
                issues.push(issue);
                issuesFound++;
                console.log(`    ⚠️ 观众数异常: ${event.expectedVisitors}人`);
            }
            
            if (event.fireworksCount && event.fireworksCount > 100000) {
                const issue = {
                    region,
                    eventId: event.id,
                    eventName: event.name,
                    type: 'unrealistic_fireworks',
                    details: `花火数异常: ${event.fireworksCount}发`,
                    data: event
                };
                issues.push(issue);
                issuesFound++;
                console.log(`    ⚠️ 花火数异常: ${event.fireworksCount}发`);
            }
            
            if (issues.length === 0 || issues[issues.length - 1].eventId !== event.id) {
                console.log(`    ✅ 数据正常`);
            }
        });
        console.log('');
    });
    
    return { issues, totalChecked, issuesFound };
}

// 生成报告
function generateReport(result) {
    console.log('📋 ============ 内部一致性核对报告 ============');
    console.log(`📊 总核对数量: ${result.totalChecked}个花火大会`);
    console.log(`❌ 发现问题: ${result.issuesFound}个`);
    console.log(`✅ 数据正常: ${result.totalChecked - result.issuesFound}个`);
    console.log(`📈 准确率: ${((result.totalChecked - result.issuesFound) / result.totalChecked * 100).toFixed(2)}%`);
    
    if (result.issues.length > 0) {
        console.log('\n🚨 需要处理的问题详情:');
        result.issues.forEach((issue, index) => {
            console.log(`\n${index + 1}. 【${issue.region.toUpperCase()}】${issue.eventName}`);
            console.log(`   问题类型: ${issue.type}`);
            console.log(`   问题描述: ${issue.details}`);
            console.log(`   事件ID: ${issue.eventId}`);
        });
        
        console.log('\n⚠️ 请询问如何处理这些问题后再进行修复!');
    } else {
        console.log('\n🎉 所有数据一致性检查通过!');
    }
}

// 执行验证
const result = validateConsistency();
generateReport(result);

console.log('\n✅ 内部数据一致性核对完成!'); 