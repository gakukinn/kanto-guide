/**
 * 🔍 数据准确性验证工具
 * 
 * 目的：确保所有花火大会信息都基于可验证的官方数据源
 * 使用：每次制作数据文件前必须通过此验证
 */

export interface OfficialDataSource {
 url: string;
 siteName: string;
 accessDate: string;
 verificationStatus: 'verified' | 'pending' | 'failed';
 lastChecked: string;
}

export interface DataAccuracyCheck {
 fieldName: string;
 ourValue: string;
 officialValue?: string;
 isAccurate: boolean;
 needsUpdate: boolean;
 notes?: string;
}

/**
 * 花火数据准确性验证接口
 */
export interface HanabiAccuracyValidation {
 id: string;
 name: string;
 officialSource: OfficialDataSource;
 checks: DataAccuracyCheck[];
 overallAccuracy: number; // 0-100%
 recommendations: string[];
 legalCompliance: boolean;
}

/**
 * 验证单个花火事件的数据准确性
 */
export function validateHanabiAccuracy(
 hanabiData: any,
 officialSource: OfficialDataSource
): HanabiAccuracyValidation {
 const checks: DataAccuracyCheck[] = [];
 
 // 必须验证的关键字段
 const criticalFields = [
 'name', 'date', 'location', 'fireworksCount', 
 'expectedVisitors', 'ticketPrice', 'time'
 ];
 
 criticalFields.forEach(field => {
 checks.push({
 fieldName: field,
 ourValue: hanabiData[field] || 'N/A',
 isAccurate: false, // 默认需要人工验证
 needsUpdate: false,
 notes: '需要与官方数据源对比验证'
 });
 });
 
 const accuracy = calculateAccuracy(checks);
 
 return {
 id: hanabiData.id,
 name: hanabiData.name,
 officialSource,
 checks,
 overallAccuracy: accuracy,
 recommendations: generateRecommendations(checks),
 legalCompliance: accuracy >= 95 // 95%以上准确率才符合法律要求
 };
}

/**
 * 计算数据准确率
 */
function calculateAccuracy(checks: DataAccuracyCheck[]): number {
 const verifiedChecks = checks.filter(check => check.isAccurate);
 return checks.length > 0 ? (verifiedChecks.length / checks.length) * 100 : 0;
}

/**
 * 生成准确性改进建议
 */
function generateRecommendations(checks: DataAccuracyCheck[]): string[] {
 const recommendations: string[] = [];
 
 const unverifiedChecks = checks.filter(check => !check.isAccurate);
 
 if (unverifiedChecks.length > 0) {
 recommendations.push(
 '🚨 紧急：必须验证以下字段与官方数据源的一致性：' + 
 unverifiedChecks.map(c => c.fieldName).join(', ')
 );
 }
 
 recommendations.push('📋 请提供官方数据源截图作为验证证据');
 recommendations.push('⚖️ 确保所有信息100%来自官方渠道，避免法律风险');
 
 return recommendations;
}

/**
 * Walker Plus 官方数据源配置
 */
export const WALKER_PLUS_SOURCES = {
 tokyo: 'https://hanabi.walkerplus.com/calendar/08/ar0313/',
 saitama: 'https://hanabi.walkerplus.com/calendar/08/ar0311/', 
 chiba: 'https://hanabi.walkerplus.com/calendar/08/ar0312/',
 kanagawa: 'https://hanabi.walkerplus.com/calendar/08/ar0314/',
 koshinetsu: 'https://hanabi.walkerplus.com/calendar/08/ar0400/',
 kitakanto: 'https://hanabi.walkerplus.com/calendar/08/ar0300/'
};

/**
 * 创建官方数据源记录
 */
export function createOfficialSource(url: string): OfficialDataSource {
 return {
 url,
 siteName: 'Walker Plus（公式）',
 accessDate: new Date().toISOString().split('T')[0],
 verificationStatus: 'pending',
 lastChecked: new Date().toISOString()
 };
}

/**
 * 数据准确性保障规范
 */
export const DATA_ACCURACY_STANDARDS = {
 MANDATORY_CHECKS: [
 '所有数据必须来自Walker Plus官方链接',
 '提供官方数据源截图证据', 
 '人工验证所有关键信息',
 '定期更新验证状态',
 '保持100%数据可追溯性'
 ],
 
 PROHIBITED_ACTIONS: [
 '禁止编造或推测任何信息',
 '禁止修改官方数据',
 '禁止使用非官方数据源',
 '禁止简化官方名称',
 '禁止添加未经验证的内容'
 ],
 
 LEGAL_REQUIREMENTS: [
 '商业网站信息准确率必须达到95%以上',
 '所有信息必须有可验证的官方来源',
 '虚假信息可能导致法律责任',
 '必须建立完整的数据溯源记录'
 ]
};

export class DataAccuracyValidator {
 private validatedData: Map<string, HanabiAccuracyValidation> = new Map();

 /**
 * 验证花火大会数据的准确性
 */
 validateEventData(eventData: any, officialSource: OfficialDataSource): HanabiAccuracyValidation {
 const validation: HanabiAccuracyValidation = {
 id: eventData.id,
 name: eventData.name,
 officialSource,
 checks: [],
 overallAccuracy: 0,
 recommendations: [],
 legalCompliance: false
 };

 // 必填字段检查
 const requiredFields = ['name', 'date', 'location', 'visitors', 'fireworks', 'likes'];
 requiredFields.forEach(field => {
 if (!eventData[field] && eventData[field] !== 0) {
 validation.checks.push({
 fieldName: field,
 ourValue: 'N/A',
 isAccurate: false,
 needsUpdate: true,
 notes: '需要与官方数据源对比验证'
 });
 }
 });

 // 数据格式检查
 if (eventData.date && !eventData.date.includes('月')) {
 validation.checks.push({
 fieldName: 'date',
 ourValue: eventData.date,
 isAccurate: false,
 needsUpdate: true,
 notes: '日期格式应包含"月"字符'
 });
 }

 if (eventData.visitors && !['约', '万', '人', '非公开', '未定'].some(char => eventData.visitors.includes(char))) {
 validation.checks.push({
 fieldName: 'visitors',
 ourValue: eventData.visitors,
 isAccurate: false,
 needsUpdate: true,
 notes: '访客数格式可能不正确'
 });
 }

 if (eventData.fireworks && !['发', '非公表', '未定', '约'].some(char => eventData.fireworks.includes(char))) {
 validation.checks.push({
 fieldName: 'fireworks',
 ourValue: eventData.fireworks,
 isAccurate: false,
 needsUpdate: true,
 notes: '花火数格式可能不正确'
 });
 }

 // 官方数据源检查
 if (!officialSource.url.includes('hanabi.walkerplus.com')) {
 validation.checks.push({
 fieldName: 'dataSource',
 ourValue: officialSource.url,
 isAccurate: false,
 needsUpdate: true,
 notes: '数据源不是Walker Plus官方网站'
 });
 }

 validation.overallAccuracy = calculateAccuracy(validation.checks);
 validation.legalCompliance = validation.overallAccuracy >= 95;
 
 if (validation.legalCompliance) {
 this.validatedData.set(eventData.id, validation);
 console.log(`✅ ${eventData.name} 数据验证通过`);
 } else {
 console.error(`❌ ${eventData.name} 数据验证失败:`, validation.checks.filter(c => !c.isAccurate).map(c => c.fieldName));
 }

 return validation;
 }

 /**
 * 批量验证数据文件
 */
 validateDataFile(events: any[], region: string, month: string) {
 console.log(`🔍 开始验证 ${month}${region} 花火数据...`);
 
 const results = {
 total: events.length,
 passed: 0,
 failed: 0,
 issues: [] as string[]
 };

 events.forEach(event => {
 // 这里需要提供官方数据源信息
 const mockSource: OfficialDataSource = {
 url: `https://hanabi.walkerplus.com/calendar/xx/ar0xxx/`,
 siteName: 'Walker Plus（公式）',
 accessDate: new Date().toISOString(),
 verificationStatus: 'pending',
 lastChecked: new Date().toISOString()
 };

 const validation = this.validateEventData(event, mockSource);
 
 if (validation.legalCompliance) {
 results.passed++;
 } else {
 results.failed++;
 results.issues.push(`${event.name}: ${validation.checks.filter(c => !c.isAccurate).map(c => c.fieldName).join(', ')}`);
 }
 });

 console.log(`📊 验证结果: ${results.passed}/${results.total} 通过`);
 if (results.failed > 0) {
 console.error('❌ 验证失败的项目:', results.issues);
 }

 return results;
 }

 /**
 * 生成数据准确性报告
 */
 generateAccuracyReport(): string {
 const report = [];
 report.push('# 花火数据准确性验证报告');
 report.push(`生成时间: ${new Date().toLocaleString()}`);
 report.push(`已验证数据: ${this.validatedData.size} 项`);
 report.push('');

 this.validatedData.forEach(validation => {
 report.push(`## ${validation.name}`);
 report.push(`- 事件ID: ${validation.id}`);
 report.push(`- 数据源: ${validation.officialSource.url}`);
 report.push(`- 验证状态: ${validation.legalCompliance ? '✅ 通过' : '❌ 失败'}`);
 report.push(`- 验证准确率: ${validation.overallAccuracy.toFixed(2)}%`);
 report.push('');
 });

 return report.join('\n');
 }
}

// 导出全局验证器实例
export const dataValidator = new DataAccuracyValidator();

/**
 * 快速验证函数 - 在创建数据文件时使用
 */
export function quickValidate(events: any[], region: string, month: string) {
 return dataValidator.validateDataFile(events, region, month);
} 