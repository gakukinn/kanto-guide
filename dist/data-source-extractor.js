import { readdir, readFile } from 'fs/promises';
import { resolve } from 'path';
export class DataSourceExtractor {
    constructor() {
        this.activities = [];
        this.regions = [
            'tokyo',
            'kanagawa',
            'chiba',
            'saitama',
            'kitakanto',
            'koshinetsu',
        ];
        console.log('🔍 数据源提取器已初始化');
    }
    async extract() {
        console.log('\n📊 开始阶段1：精确数据源提取和验证');
        console.log('='.repeat(50));
        for (const region of this.regions) {
            await this.extractFromRegion(region);
        }
        const report = this.generateReport();
        this.printDetailedReport(report);
        return report;
    }
    async extractFromRegion(region) {
        console.log(`\n🗂️  扫描区域: ${region}`);
        const regionPath = resolve(`src/app/${region}/hanabi`);
        try {
            const entries = await readdir(regionPath, { withFileTypes: true });
            const directories = entries.filter(entry => entry.isDirectory());
            console.log(`  📁 发现 ${directories.length} 个活动目录`);
            for (const dir of directories) {
                await this.extractFromActivity(region, dir.name);
            }
        }
        catch (error) {
            console.warn(`  ⚠️  区域 ${region} 扫描失败: ${error}`);
        }
    }
    async extractFromActivity(region, activityDir) {
        const pageFile = resolve(`src/app/${region}/hanabi/${activityDir}/page.tsx`);
        try {
            // 读取页面文件以找到数据导入
            const pageContent = await readFile(pageFile, 'utf-8');
            // 匹配多种数据导入模式
            const patterns = [
                /from\s+['"](@\/data\/hanabi\/[^'"]+)['"]/, // 标准模式: @/data/hanabi/...
                /from\s+['"](@\/data\/level4-[^'"]+)['"]/, // Level4模式: @/data/level4-...
                /from\s+['"](@\/data\/[^'"]*hanabi[^'"]*)['"]/, // 包含hanabi的其他模式
                /from\s+['"](@\/data\/[^'"]+)['"]/, // 通用@/data模式
            ];
            let dataImportMatch = null;
            for (const pattern of patterns) {
                dataImportMatch = pageContent.match(pattern);
                if (dataImportMatch)
                    break;
            }
            if (!dataImportMatch) {
                // 尝试查找页面内嵌数据
                const inlineDataFound = await this.extractInlineData(region, activityDir, pageContent);
                if (!inlineDataFound) {
                    console.warn(`    ⚠️  ${activityDir}: 未找到数据导入`);
                }
                return;
            }
            const dataPath = dataImportMatch[1].replace('@/', 'src/');
            const fullDataPath = resolve(`${dataPath}.ts`);
            // 动态导入数据文件
            const fileUrl = `file://${fullDataPath.replace(/\\/g, '/')}`;
            const importedModule = await import(fileUrl);
            // 查找数据导出 - 更宽泛的匹配
            const dataKeys = Object.keys(importedModule).filter(key => {
                // 排除一些明显的非数据导出
                if (key === 'default' || key === '__esModule' || key.startsWith('_')) {
                    return false;
                }
                // 包含关键词的
                if (key.includes('Data') ||
                    key.endsWith('data') ||
                    key.includes('hanabi')) {
                    return true;
                }
                // 检查是否是对象类型的导出（可能是活动数据）
                const exportValue = importedModule[key];
                if (exportValue &&
                    typeof exportValue === 'object' &&
                    exportValue.id &&
                    exportValue.name) {
                    return true;
                }
                return false;
            });
            if (dataKeys.length === 0) {
                console.warn(`    ⚠️  ${activityDir}: 数据文件中无有效数据导出`);
                return;
            }
            for (const key of dataKeys) {
                const data = importedModule[key];
                if (!data || typeof data !== 'object') {
                    continue;
                }
                const activity = this.createActivityDataSource(region, activityDir, pageFile, fullDataPath, data);
                this.activities.push(activity);
                this.logActivityExtraction(activity);
            }
        }
        catch (error) {
            console.warn(`    ⚠️  ${activityDir}: 数据提取失败 - ${error}`);
        }
    }
    createActivityDataSource(region, activityDir, pageFile, dataPath, data) {
        // 提取路径中的ID（通常是目录名）
        const pathId = activityDir;
        const dataId = data.id || '';
        // 检查路径与ID的一致性
        const pathIdConsistency = pathId === dataId || dataId.includes(pathId) || pathId.includes(dataId);
        // 提取官方网站
        const officialWebsite = data.contact?.website;
        const walkerPlusUrl = data.officialSource?.walkerPlusUrl;
        // 获取基本位置信息
        const firstVenue = data.venues?.[0];
        const location = firstVenue?.location || firstVenue?.name || '';
        return {
            id: dataId,
            name: data.name || '',
            nameJapanese: data.nameJapanese,
            region,
            filePath: dataPath,
            pageFile,
            hasOfficialWebsite: !!officialWebsite,
            officialWebsite,
            hasWalkerPlusUrl: !!walkerPlusUrl,
            walkerPlusUrl,
            currentData: {
                date: data.date || '',
                time: data.time || '',
                location,
                expectedVisitors: data.expectedVisitors,
                fireworksCount: data.fireworksCount,
            },
            dataIntegrity: {
                hasValidId: !!dataId,
                hasValidName: !!data.name,
                hasTimeLocation: !!(data.date && data.time && location),
                pathIdConsistency,
            },
        };
    }
    async extractInlineData(region, activityDir, pageContent) {
        try {
            // 查找页面中定义的数据对象
            const dataPattern = /const\s+\w*[dD]ata\s*:\s*HanabiData\s*=\s*\{([\s\S]*?)\};/;
            const match = pageContent.match(dataPattern);
            if (!match) {
                return false;
            }
            // 尝试提取基本信息
            const dataContent = match[0];
            // 提取ID
            const idMatch = dataContent.match(/id:\s*['"]([^'"]+)['"]/);
            const id = idMatch?.[1] || activityDir;
            // 提取名称
            const nameMatch = dataContent.match(/name:\s*['"]([^'"]+)['"]/);
            const name = nameMatch?.[1] || '';
            // 提取官方网站
            const websiteMatch = dataContent.match(/website:\s*['"]([^'"]+)['"]/);
            const website = websiteMatch?.[1];
            // 提取WalkerPlus URL
            const walkerMatch = dataContent.match(/walkerPlusUrl:\s*['"]([^'"]+)['"]/);
            const walkerPlusUrl = walkerMatch?.[1];
            // 提取日期时间
            const dateMatch = dataContent.match(/date:\s*['"]([^'"]+)['"]/);
            const timeMatch = dataContent.match(/time:\s*['"]([^'"]+)['"]/);
            const locationMatch = dataContent.match(/location:\s*['"]([^'"]+)['"]/);
            const activity = {
                id,
                name,
                region,
                filePath: `内嵌数据 (${activityDir})`,
                pageFile: `src/app/${region}/hanabi/${activityDir}/page.tsx`,
                hasOfficialWebsite: !!website,
                officialWebsite: website,
                hasWalkerPlusUrl: !!walkerPlusUrl,
                walkerPlusUrl,
                currentData: {
                    date: dateMatch?.[1] || '',
                    time: timeMatch?.[1] || '',
                    location: locationMatch?.[1] || '',
                },
                dataIntegrity: {
                    hasValidId: !!id,
                    hasValidName: !!name,
                    hasTimeLocation: !!(dateMatch && timeMatch && locationMatch),
                    pathIdConsistency: true, // 内嵌数据不需要路径一致性检查
                },
            };
            this.activities.push(activity);
            this.logActivityExtraction(activity);
            return true;
        }
        catch (error) {
            return false;
        }
    }
    logActivityExtraction(activity) {
        const sources = [];
        if (activity.hasOfficialWebsite)
            sources.push('官网');
        if (activity.hasWalkerPlusUrl)
            sources.push('WalkerPlus');
        const sourcesText = sources.length > 0 ? `[${sources.join(', ')}]` : '[无外部源]';
        const integrityIcon = activity.dataIntegrity.hasTimeLocation ? '✅' : '⚠️';
        console.log(`    ${integrityIcon} ${activity.name} (${activity.id}) ${sourcesText}`);
        if (!activity.dataIntegrity.pathIdConsistency) {
            console.log(`      ⚠️  路径ID不一致: 目录=${activity.pageFile.split('/').pop()?.replace('/page.tsx', '')} vs 数据ID=${activity.id}`);
        }
    }
    generateReport() {
        const totalActivities = this.activities.length;
        const activitiesWithOfficialWebsite = this.activities.filter(a => a.hasOfficialWebsite).length;
        const activitiesWithWalkerPlus = this.activities.filter(a => a.hasWalkerPlusUrl).length;
        const activitiesWithBothSources = this.activities.filter(a => a.hasOfficialWebsite && a.hasWalkerPlusUrl).length;
        const activitiesWithNoSources = this.activities.filter(a => !a.hasOfficialWebsite && !a.hasWalkerPlusUrl).length;
        const dataIntegrityIssues = this.activities.filter(a => !a.dataIntegrity.hasValidId ||
            !a.dataIntegrity.hasValidName ||
            !a.dataIntegrity.hasTimeLocation ||
            !a.dataIntegrity.pathIdConsistency).length;
        const regionBreakdown = {};
        this.regions.forEach(region => {
            regionBreakdown[region] = this.activities.filter(a => a.region === region).length;
        });
        return {
            totalActivities,
            activitiesWithOfficialWebsite,
            activitiesWithWalkerPlus,
            activitiesWithBothSources,
            activitiesWithNoSources,
            dataIntegrityIssues,
            regionBreakdown,
            activities: this.activities,
        };
    }
    printDetailedReport(report) {
        console.log('\n📊 === 阶段1完成：数据源提取报告 ===');
        console.log(`总活动数: ${report.totalActivities}`);
        console.log(`包含官方网站: ${report.activitiesWithOfficialWebsite} 个`);
        console.log(`包含WalkerPlus: ${report.activitiesWithWalkerPlus} 个`);
        console.log(`两个源都有: ${report.activitiesWithBothSources} 个`);
        console.log(`无外部数据源: ${report.activitiesWithNoSources} 个`);
        console.log(`数据完整性问题: ${report.dataIntegrityIssues} 个`);
        console.log('\n📍 区域分布:');
        Object.entries(report.regionBreakdown).forEach(([region, count]) => {
            console.log(`  ${region}: ${count} 个活动`);
        });
        // 列出数据完整性问题
        if (report.dataIntegrityIssues > 0) {
            console.log('\n⚠️  数据完整性问题详情:');
            report.activities.forEach(activity => {
                const issues = [];
                if (!activity.dataIntegrity.hasValidId)
                    issues.push('缺少ID');
                if (!activity.dataIntegrity.hasValidName)
                    issues.push('缺少名称');
                if (!activity.dataIntegrity.hasTimeLocation)
                    issues.push('缺少时间/地点');
                if (!activity.dataIntegrity.pathIdConsistency)
                    issues.push('路径ID不一致');
                if (issues.length > 0) {
                    console.log(`  ❌ ${activity.name || '未命名'} (${activity.region}): ${issues.join(', ')}`);
                }
            });
        }
        // 数据源优先级分析
        console.log('\n🎯 数据源优先级分析:');
        console.log(`🟢 高优先级 (有官网): ${report.activitiesWithOfficialWebsite} 个`);
        console.log(`🟡 中优先级 (仅WalkerPlus): ${report.activitiesWithWalkerPlus - report.activitiesWithBothSources} 个`);
        console.log(`🔴 低优先级 (无外部源): ${report.activitiesWithNoSources} 个`);
    }
    // 获取结果的公共方法
    getResults() {
        return this.activities;
    }
}
// 便捷执行函数
export async function extractDataSources() {
    const extractor = new DataSourceExtractor();
    return await extractor.extract();
}
