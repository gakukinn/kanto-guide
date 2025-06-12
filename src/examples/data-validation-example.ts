/**
 * 📖 数据验证工具使用示例
 * 
 * 这个文件展示如何在制作花火数据时使用验证工具
 */

import { quickValidate, dataValidator } from '@/utils/data-accuracy-validator';

// 示例：验证八月北关东花火数据
export function validateKitakantoData() {
 console.log('🔍 开始验证八月北关东花火数据...');
 
 // 模拟花火数据（实际使用时从数据文件导入）
 const testEvents = [
 {
 id: "ashikaga-august",
 name: "第109回足利花火大会",
 date: "8月2日",
 location: "渡良瀬川田中桥下流河川敷",
 visitors: "约45万人",
 fireworks: "约2万发",
 likes: 185
 },
 {
 id: "koga-august",
 name: "第20回古河花火大会", 
 date: "8月2日",
 location: "古河高尔夫球场",
 visitors: "约20万人",
 fireworks: "非公表",
 likes: 77
 }
 ];

 // 执行快速验证
 const result = quickValidate(testEvents, '北关东', '八月');
 
 if (result.failed > 0) {
 console.error('❌ 数据验证失败！');
 console.error('需要修正的问题:', result.issues);
 return false;
 }
 
 console.log('✅ 数据验证通过！可以继续制作页面');
 return true;
}

// 示例：详细验证单个花火大会
export function validateSingleEvent() {
 const eventData = {
 id: "example-hanabi",
 name: "测试花火大会",
 date: "8月15日", 
 location: "测试会场",
 visitors: "约10万人",
 fireworks: "约5000发",
 likes: 50
 };

 const officialSource = {
 url: "https://hanabi.walkerplus.com/detail/ar0308e00123/",
 siteName: "Walker Plus",
 accessDate: new Date().toISOString(),
 verifiedBy: "用户手动验证",
 verificationStatus: "verified" as const,
 lastChecked: new Date().toISOString()
 };

 const validation = dataValidator.validateEventData(eventData, officialSource);
 
 if (validation.legalCompliance) {
 console.log('✅ 花火大会数据验证通过');
 } else {
 console.error('❌ 验证失败:', validation.recommendations);
 }
 
 return validation;
}

// 示例：生成验证报告
export function generateReport() {
 const report = dataValidator.generateAccuracyReport();
 console.log('📊 数据准确性验证报告:');
 console.log(report);
 return report;
} 