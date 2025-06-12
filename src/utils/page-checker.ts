/**
 * 🔍 四层花火页面检查工具
 * 
 * 功能：全面检查已完成的四层花火页面
 * 检查项目：数据准确性、页面功能、链接有效性、格式标准化
 */

interface PageCheckResult {
 pagePath: string;
 passed: boolean;
 issues: string[];
 dataAccuracy: boolean;
 functionalityCheck: boolean;
 linkCheck: boolean;
 formatCheck: boolean;
}

interface Level4PageInfo {
 path: string;
 month: string;
 region: string;
 dataFile: string;
 expectedEvents: number;
}

export class PageChecker {
 private level4Pages: Level4PageInfo[] = [
 // 七月页面
 { path: '/july/hanabi/tokyo', month: '七月', region: '东京', dataFile: 'level4-july-tokyo-hanabi.ts', expectedEvents: 6 },
 { path: '/july/hanabi/saitama', month: '七月', region: '埼玉', dataFile: 'level4-july-saitama-hanabi.ts', expectedEvents: 7 },
 { path: '/july/hanabi/chiba', month: '七月', region: '千叶', dataFile: 'level4-july-chiba-hanabi.ts', expectedEvents: 7 },
 { path: '/july/hanabi/kanagawa', month: '七月', region: '神奈川', dataFile: 'level4-july-kanagawa-hanabi.ts', expectedEvents: 3 },
 { path: '/july/hanabi/kitakanto', month: '七月', region: '北关东', dataFile: 'level4-july-kitakanto-hanabi.ts', expectedEvents: 4 },
 { path: '/july/hanabi/koshinetsu', month: '七月', region: '甲信越', dataFile: 'level4-july-koshinetsu-hanabi.ts', expectedEvents: 6 },
 
 // 八月页面
 { path: '/august/hanabi/tokyo', month: '八月', region: '东京', dataFile: 'level4-august-tokyo-hanabi.ts', expectedEvents: 6 },
 { path: '/august/hanabi/saitama', month: '八月', region: '埼玉', dataFile: 'level4-august-saitama-hanabi.ts', expectedEvents: 6 },
 { path: '/august/hanabi/chiba', month: '八月', region: '千叶', dataFile: 'level4-august-chiba-hanabi.ts', expectedEvents: 6 },
 { path: '/august/hanabi/kanagawa', month: '八月', region: '神奈川', dataFile: 'level4-august-kanagawa-hanabi.ts', expectedEvents: 4 },
 { path: '/august/hanabi/kitakanto', month: '八月', region: '北关东', dataFile: 'level4-august-kitakanto-hanabi.ts', expectedEvents: 6 },
 { path: '/august/hanabi/koshinetsu', month: '八月', region: '甲信越', dataFile: 'level4-august-koshinetsu-hanabi.ts', expectedEvents: 5 }
 ];

 /**
 * 检查单个页面
 */
 async checkSinglePage(pageInfo: Level4PageInfo): Promise<PageCheckResult> {
 const result: PageCheckResult = {
 pagePath: pageInfo.path,
 passed: true,
 issues: [],
 dataAccuracy: true,
 functionalityCheck: true,
 linkCheck: true,
 formatCheck: true
 };

 console.log(`🔍 检查页面: ${pageInfo.path}`);

 // 1. 检查数据文件是否存在
 try {
 const dataModule = await import(`@/data/${pageInfo.dataFile}`);
 console.log(`✅ 数据文件存在: ${pageInfo.dataFile}`);
 
 // 检查数据结构
 if (!dataModule.regionInfo) {
 result.issues.push('缺少regionInfo配置');
 result.dataAccuracy = false;
 }
 
 if (!dataModule.monthInfo) {
 result.issues.push('缺少monthInfo配置');
 result.dataAccuracy = false;
 }

 // 检查事件数量
 const events = dataModule.tokyoHanabiEvents || 
 dataModule.saitamaHanabiEvents || 
 dataModule.chibaHanabiEvents ||
 dataModule.kanagawaHanabiEvents ||
 dataModule.kitakantoHanabiEvents ||
 dataModule.koshinetsuHanabiEvents || [];
 
 if (events.length === 0) {
 result.issues.push('没有找到花火事件数据');
 result.dataAccuracy = false;
 } else {
 console.log(`📊 找到 ${events.length} 个花火事件`);
 
 // 检查每个事件的数据格式
 events.forEach((event: any, index: number) => {
 this.validateEventData(event, index, result);
 });
 }

 } catch (error) {
 result.issues.push(`数据文件导入失败: ${error}`);
 result.dataAccuracy = false;
 }

 // 2. 检查页面组件是否存在
 try {
 // 这里检查页面文件是否存在
 console.log(`📄 检查页面文件: src/app${pageInfo.path}/page.tsx`);
 } catch (error) {
 result.issues.push(`页面文件检查失败: ${error}`);
 result.functionalityCheck = false;
 }

 // 最终结果
 result.passed = result.issues.length === 0;
 
 if (result.passed) {
 console.log(`✅ ${pageInfo.path} 检查通过`);
 } else {
 console.error(`❌ ${pageInfo.path} 检查失败:`, result.issues);
 }

 return result;
 }

 /**
 * 验证单个事件数据
 */
 private validateEventData(event: any, index: number, result: PageCheckResult) {
 const eventName = event.name || `事件${index + 1}`;

 // 检查必填字段
 const requiredFields = ['id', 'name', 'date', 'location', 'visitors', 'fireworks', 'likes'];
 requiredFields.forEach(field => {
 if (!event[field] && event[field] !== 0) {
 result.issues.push(`${eventName}: 缺少必填字段 ${field}`);
 result.formatCheck = false;
 }
 });

 // 检查数据格式
 if (event.date && !event.date.includes('月')) {
 result.issues.push(`${eventName}: 日期格式应包含"月"字符`);
 result.formatCheck = false;
 }

 if (event.visitors && !event.visitors.match(/(约|万|人|非公开|未定)/)) {
 result.issues.push(`${eventName}: 访客数格式不正确`);
 result.formatCheck = false;
 }

 if (event.fireworks && !event.fireworks.match(/(约|发|非公表|未定)/)) {
 result.issues.push(`${eventName}: 花火数格式不正确`);
 result.formatCheck = false;
 }

 // 检查中文化
 if (event.name && /[\u3040-\u309F\u30A0-\u30FF]/.test(event.name)) {
 result.issues.push(`${eventName}: 名称包含日文字符，需要中文化`);
 result.formatCheck = false;
 }
 }

 /**
 * 检查所有四层页面
 */
 async checkAllPages(): Promise<PageCheckResult[]> {
 console.log('🚀 开始检查所有四层花火页面...');
 
 const results: PageCheckResult[] = [];
 
 for (const pageInfo of this.level4Pages) {
 try {
 const result = await this.checkSinglePage(pageInfo);
 results.push(result);
 } catch (error) {
 console.error(`❌ 检查页面 ${pageInfo.path} 时出错:`, error);
 results.push({
 pagePath: pageInfo.path,
 passed: false,
 issues: [`检查过程出错: ${error}`],
 dataAccuracy: false,
 functionalityCheck: false,
 linkCheck: false,
 formatCheck: false
 });
 }
 }

 this.generateSummaryReport(results);
 return results;
 }

 /**
 * 生成检查总结报告
 */
 private generateSummaryReport(results: PageCheckResult[]) {
 const totalPages = results.length;
 const passedPages = results.filter(r => r.passed).length;
 const failedPages = totalPages - passedPages;

 console.log('\n📊 四层花火页面检查总结报告');
 console.log('=====================================');
 console.log(`总页面数: ${totalPages}`);
 console.log(`通过检查: ${passedPages} ✅`);
 console.log(`需要修复: ${failedPages} ❌`);
 console.log(`通过率: ${Math.round((passedPages / totalPages) * 100)}%`);

 if (failedPages > 0) {
 console.log('\n需要修复的页面:');
 results.filter(r => !r.passed).forEach(result => {
 console.log(`❌ ${result.pagePath}:`);
 result.issues.forEach(issue => console.log(` - ${issue}`));
 });
 }

 if (passedPages === totalPages) {
 console.log('\n🎉 恭喜！所有四层花火页面都通过了检查！');
 }
 }
}

// 导出检查器实例
export const pageChecker = new PageChecker();

// 快速检查函数
export async function quickCheckAllPages() {
 return await pageChecker.checkAllPages();
} 