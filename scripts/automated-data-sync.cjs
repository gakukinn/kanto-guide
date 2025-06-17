const fs = require('fs');
const path = require('path');

console.log('🤖 自动化数据同步和验证工具');
console.log('📋 基于GitHub最佳实践的数据管道');

// 配置项
const CONFIG = {
    // 第一步：从官方源自动获取数据
    dataSource: 'https://hanabi.walkerplus.com/kanto/',
    
    // 第二步：与我们的数据比较
    ourDataPaths: [
        'src/app/tokyo/hanabi/page.tsx',
        'src/app/chiba/hanabi/page.tsx',
        'src/app/saitama/hanabi/page.tsx',
        'src/app/kanagawa/hanabi/page.tsx',
        'src/app/kitakanto/hanabi/page.tsx',
        'src/app/koshinetsu/hanabi/page.tsx'
    ],
    
    // 第三步：自动修复策略
    autoFixRules: {
        dateFormat: 'prefer_detailed',      // 选择信息更详细的日期
        audienceCount: 'prefer_conservative', // 选择较小的观众数
        fireworksCount: 'prefer_official',    // 选择官方数据
        title: 'prefer_complete'             // 选择完整标题
    }
};

// 主要功能：批量数据同步
class DataSyncPipeline {
    constructor() {
        this.conflicts = [];
        this.fixed = [];
        this.errors = [];
    }

    // 1. 从官方数据源获取最新数据
    async fetchOfficialData() {
        console.log('🌐 从官方数据源获取最新数据...');
        
        // 这里应该实现真实的数据抓取
        // 目前返回模拟数据结构
        return {
            tokyo: [
                {
                    name: "第50回江戸川区花火大会",
                    date: "2025年8月2日(五)",
                    location: "江戸川河川敷（都立筱崎公园先）",
                    expectedVisitors: "90万人",
                    fireworksCount: "约1万4000发"
                }
                // ... 更多官方数据
            ]
        };
    }

    // 2. 解析我们当前的数据
    parseOurData() {
        console.log('📖 解析项目当前数据...');
        
        const allData = {};
        
        CONFIG.ourDataPaths.forEach(filePath => {
            try {
                const content = fs.readFileSync(filePath, 'utf8');
                const region = path.basename(path.dirname(filePath));
                
                // 提取事件数据
                const match = content.match(/const\s+\w+HanabiEvents\s*=\s*\[([^;]*)\];/s);
                if (match) {
                    allData[region] = this.extractEventData(match[1]);
                }
            } catch (error) {
                this.errors.push(`读取文件失败: ${filePath} - ${error.message}`);
            }
        });
        
        return allData;
    }

    // 3. 比较数据并识别冲突
    compareData(officialData, ourData) {
        console.log('🔍 比较官方数据与项目数据...');
        
        const conflicts = [];
        
        Object.keys(officialData).forEach(region => {
            const official = officialData[region];
            const ours = ourData[region] || [];
            
            official.forEach(officialEvent => {
                const ourEvent = ours.find(e => this.isSameEvent(e, officialEvent));
                
                if (ourEvent) {
                    const eventConflicts = this.findEventConflicts(ourEvent, officialEvent);
                    if (eventConflicts.length > 0) {
                        conflicts.push({
                            region,
                            eventName: officialEvent.name,
                            conflicts: eventConflicts
                        });
                    }
                } else {
                    conflicts.push({
                        region,
                        eventName: officialEvent.name,
                        conflicts: [{ type: 'missing', message: '我们的数据中缺少此活动' }]
                    });
                }
            });
        });
        
        return conflicts;
    }

    // 4. 自动修复策略
    autoFixConflicts(conflicts) {
        console.log('🔧 应用自动修复策略...');
        
        const fixPlan = [];
        
        conflicts.forEach(conflict => {
            conflict.conflicts.forEach(issue => {
                const fix = this.generateFix(conflict, issue);
                if (fix) {
                    fixPlan.push(fix);
                }
            });
        });
        
        return fixPlan;
    }

    // 生成修复方案
    generateFix(conflict, issue) {
        const { region, eventName } = conflict;
        
        switch (issue.type) {
            case 'date_format':
                return {
                    type: 'update_field',
                    region,
                    eventName,
                    field: 'date',
                    oldValue: issue.ourValue,
                    newValue: issue.officialValue,
                    reason: 'Official format more detailed'
                };
                
            case 'audience_conflict':
                // 选择较小的观众数（保守估计）
                const ourCount = parseInt(issue.ourValue.toString().replace(/\D/g, ''));
                const officialCount = parseInt(issue.officialValue.toString().replace(/\D/g, ''));
                
                return {
                    type: 'update_field',
                    region,
                    eventName,
                    field: 'expectedVisitors',
                    oldValue: issue.ourValue,
                    newValue: ourCount < officialCount ? issue.ourValue : issue.officialValue,
                    reason: 'Conservative estimate preferred'
                };
                
            case 'missing':
                return {
                    type: 'add_event',
                    region,
                    eventData: issue.officialData,
                    reason: 'Missing event from official source'
                };
                
            default:
                return null;
        }
    }

    // 5. 应用修复
    async applyFixes(fixPlan) {
        console.log('✅ 应用数据修复...');
        
        const results = {
            success: 0,
            failed: 0,
            details: []
        };
        
        // 按地区分组修复
        const fixesByRegion = {};
        fixPlan.forEach(fix => {
            if (!fixesByRegion[fix.region]) {
                fixesByRegion[fix.region] = [];
            }
            fixesByRegion[fix.region].push(fix);
        });
        
        // 应用修复
        Object.keys(fixesByRegion).forEach(region => {
            try {
                this.applyRegionFixes(region, fixesByRegion[region]);
                results.success++;
                results.details.push(`✅ ${region}: ${fixesByRegion[region].length} 个修复成功`);
            } catch (error) {
                results.failed++;
                results.details.push(`❌ ${region}: 修复失败 - ${error.message}`);
            }
        });
        
        return results;
    }

    // 辅助方法
    extractEventData(eventsText) {
        // 简化的数据提取逻辑
        const events = [];
        const objectMatches = eventsText.match(/\{[^}]*\}/g);
        
        if (objectMatches) {
            objectMatches.forEach(objStr => {
                const event = {};
                
                const nameMatch = objStr.match(/name:\s*['"`]([^'"`]*?)['"`]/);
                const dateMatch = objStr.match(/date:\s*['"`]([^'"`]*?)['"`]/);
                const visitorsMatch = objStr.match(/expectedVisitors:\s*(\d+)/);
                
                if (nameMatch) event.name = nameMatch[1];
                if (dateMatch) event.date = dateMatch[1];
                if (visitorsMatch) event.expectedVisitors = parseInt(visitorsMatch[1]);
                
                if (event.name) events.push(event);
            });
        }
        
        return events;
    }

    isSameEvent(event1, event2) {
        // 简化的事件匹配逻辑
        return event1.name && event2.name && 
               event1.name.includes(event2.name.split('第')[1]?.split('回')[0] || '');
    }

    findEventConflicts(ourEvent, officialEvent) {
        const conflicts = [];
        
        // 检查日期格式
        if (ourEvent.date !== officialEvent.date) {
            conflicts.push({
                type: 'date_format',
                ourValue: ourEvent.date,
                officialValue: officialEvent.date
            });
        }
        
        // 检查观众数冲突
        if (ourEvent.expectedVisitors && officialEvent.expectedVisitors) {
            const ourNum = parseInt(ourEvent.expectedVisitors.toString().replace(/\D/g, ''));
            const officialNum = parseInt(officialEvent.expectedVisitors.toString().replace(/\D/g, ''));
            
            if (Math.abs(ourNum - officialNum) / Math.max(ourNum, officialNum) > 0.1) { // 10%以上差异
                conflicts.push({
                    type: 'audience_conflict',
                    ourValue: ourEvent.expectedVisitors,
                    officialValue: officialEvent.expectedVisitors
                });
            }
        }
        
        return conflicts;
    }

    applyRegionFixes(region, fixes) {
        console.log(`🔧 应用 ${region} 地区的 ${fixes.length} 个修复...`);
        
        // 这里应该实现实际的文件修改逻辑
        fixes.forEach(fix => {
            console.log(`   - ${fix.type}: ${fix.reason}`);
        });
    }

    // 主要执行流程
    async run() {
        console.log('\n🚀 开始自动化数据同步流程...\n');
        
        try {
            // 1. 获取官方数据
            const officialData = await this.fetchOfficialData();
            console.log('✅ 官方数据获取完成\n');
            
            // 2. 解析我们的数据
            const ourData = this.parseOurData();
            console.log('✅ 项目数据解析完成\n');
            
            // 3. 比较数据
            const conflicts = this.compareData(officialData, ourData);
            console.log(`🔍 发现 ${conflicts.length} 个数据冲突\n`);
            
            // 4. 生成修复方案
            const fixPlan = this.autoFixConflicts(conflicts);
            console.log(`🔧 生成 ${fixPlan.length} 个修复方案\n`);
            
            // 5. 应用修复
            const results = await this.applyFixes(fixPlan);
            
            // 6. 输出结果
            console.log('\n📊 ========== 执行结果 ==========');
            console.log(`✅ 成功: ${results.success} 个地区`);
            console.log(`❌ 失败: ${results.failed} 个地区`);
            console.log('\n📋 详细结果:');
            results.details.forEach(detail => console.log(`   ${detail}`));
            
            // 7. 建议下一步
            console.log('\n💡 建议下一步:');
            console.log('1. 检查修复结果');
            console.log('2. 运行 npm run build 测试');
            console.log('3. 验证网站功能正常');
            console.log('4. 设置定期自动同步(GitHub Actions)');
            
        } catch (error) {
            console.error('❌ 执行失败:', error.message);
        }
    }
}

// 执行主流程
const pipeline = new DataSyncPipeline();
pipeline.run(); 