import { HanabiData } from '../types/hanabi';

// 验证结果接口
export interface ValidationResult {
 isValid: boolean;
 errors: string[];
 warnings: string[];
}

// 验证花火详情数据的完整性和格式
export function validateHanabiDetailData(data: HanabiData): ValidationResult {
 const errors: string[] = [];
 const warnings: string[] = [];

 // 基本信息验证
 if (!data.id || data.id.trim() === '') {
 errors.push('缺少必填字段：id');
 }

 if (!data.name || data.name.trim() === '') {
 errors.push('缺少必填字段：name（花火大会名称）');
 } else if (!/[\u4e00-\u9fa5]/.test(data.name)) {
 warnings.push('建议使用中文名称');
 }

 if (!data.date || data.date.trim() === '') {
 errors.push('缺少必填字段：date（举办日期）');
 } else if (!isValidDateFormat(data.date)) {
 warnings.push('日期格式建议使用："YYYY年MM月DD日"格式');
 }

 if (!data.time || data.time.trim() === '') {
 errors.push('缺少必填字段：time（举办时间）');
 }

 if (!data.expectedVisitors || data.expectedVisitors.trim() === '') {
 errors.push('缺少必填字段：expectedVisitors（预计访客数）');
 }

 if (!data.fireworksCount || data.fireworksCount.trim() === '') {
 errors.push('缺少必填字段：fireworksCount（花火数量）');
 }

 // 标签验证
 if (!data.tags) {
 errors.push('缺少必填字段：tags');
 } else {
 if (!data.tags.timeTag) errors.push('缺少标签：timeTag');
 if (!data.tags.regionTag) errors.push('缺少标签：regionTag');
 if (!data.tags.typeTag) errors.push('缺少标签：typeTag');
 if (!data.tags.layerTag) errors.push('缺少标签：layerTag');
 }

 // 会场信息验证
 if (!data.venues || data.venues.length === 0) {
 errors.push('缺少必填字段：venues（会场信息）');
 } else {
 data.venues.forEach((venue, index) => {
 if (!venue.name) errors.push(`会场${index + 1}缺少名称`);
 if (!venue.location) errors.push(`会场${index + 1}缺少位置信息`);
 if (!venue.features || venue.features.length === 0) {
 warnings.push(`会场${index + 1}建议添加特色描述`);
 }
 });
 }

 // 交通信息验证
 if (!data.access || data.access.length === 0) {
 errors.push('缺少必填字段：access（交通信息）');
 } else {
 data.access.forEach((access, index) => {
 if (!access.venue) errors.push(`交通信息${index + 1}缺少会场名称`);
 if (!access.stations || access.stations.length === 0) {
 errors.push(`交通信息${index + 1}缺少站点信息`);
 } else {
 access.stations.forEach((station, stationIndex) => {
 if (!station.name) errors.push(`交通信息${index + 1}站点${stationIndex + 1}缺少名称`);
 if (!station.walkTime) errors.push(`交通信息${index + 1}站点${stationIndex + 1}缺少步行时间`);
 });
 }
 });
 }

 // 观赏点验证
 if (!data.viewingSpots || data.viewingSpots.length === 0) {
 warnings.push('建议添加观赏点信息');
 } else {
 data.viewingSpots.forEach((spot, index) => {
 if (!spot.name) errors.push(`观赏点${index + 1}缺少名称`);
 if (spot.rating < 1 || spot.rating > 5) {
 errors.push(`观赏点${index + 1}评分应在1-5之间`);
 }
 if (!spot.crowdLevel) warnings.push(`观赏点${index + 1}建议添加人流密度信息`);
 });
 }

 // 历史信息验证
 if (!data.history) {
 warnings.push('建议添加历史背景信息');
 } else {
 if (!data.history.established) warnings.push('建议添加创办年份');
 if (!data.history.significance) warnings.push('建议添加历史意义说明');
 }

 // 实用建议验证
 if (!data.tips || data.tips.length === 0) {
 warnings.push('建议添加实用建议信息');
 } else {
 data.tips.forEach((tip, index) => {
 if (!tip.category) errors.push(`建议类别${index + 1}缺少分类名称`);
 if (!tip.items || tip.items.length === 0) {
 warnings.push(`建议类别${index + 1}内容为空`);
 }
 });
 }

 // 联系信息验证
 if (!data.contact) {
 warnings.push('建议添加联系信息');
 } else {
 if (!data.contact.organizer) warnings.push('建议添加主办方信息');
 if (data.contact.phone && !isValidPhoneNumber(data.contact.phone)) {
 warnings.push('电话号码格式可能不正确');
 }
 if (data.contact.website && !isValidUrl(data.contact.website)) {
 warnings.push('网站URL格式可能不正确');
 }
 }

 // 地图信息验证
 if (data.mapEmbedUrl && !isValidUrl(data.mapEmbedUrl)) {
 warnings.push('地图嵌入URL格式可能不正确');
 }

 return {
 isValid: errors.length === 0,
 errors,
 warnings
 };
}

// 验证日期格式
function isValidDateFormat(date: string): boolean {
 // 匹配格式：2025年7月26日、2025年7月26日(土)、7月26日等
 const datePatterns = [
 /^\d{4}年\d{1,2}月\d{1,2}日(\(.+\))?$/,
 /^\d{1,2}月\d{1,2}日(\(.+\))?$/,
 /^\d{4}-\d{2}-\d{2}$/
 ];
 
 return datePatterns.some(pattern => pattern.test(date));
}

// 验证电话号码格式
function isValidPhoneNumber(phone: string): boolean {
 // 匹配日本电话号码格式：03-1234-5678、042-643-3115等
 const phonePattern = /^0\d{1,4}-\d{2,4}-\d{4}$/;
 return phonePattern.test(phone);
}

// 验证URL格式
function isValidUrl(url: string): boolean {
 try {
 new URL(url);
 return true;
 } catch {
 return false;
 }
}

// 验证必填字段
export function validateRequiredFields(data: Partial<HanabiData>): string[] {
 const requiredFields = [
 'id', 'name', 'date', 'time', 'expectedVisitors', 
 'fireworksCount', 'venues', 'access', 'tags'
 ];
 
 const missingFields: string[] = [];
 
 requiredFields.forEach(field => {
 if (!(field in data) || !data[field as keyof HanabiData]) {
 missingFields.push(field);
 }
 });
 
 return missingFields;
}

// 数据规范性检查
export function checkDataStandards(data: HanabiData): string[] {
 const issues: string[] = [];
 
 // 检查中文显示要求
 if (data.fireworksCount && !data.fireworksCount.includes('发')) {
 issues.push('花火数量建议使用中文格式："约XXXX发"');
 }
 
 if (data.expectedVisitors && !data.expectedVisitors.includes('人')) {
 issues.push('访客数量建议使用中文格式："约XX万人"');
 }
 
 // 检查时间格式一致性
 if (data.time && !data.time.includes('～') && data.time.includes('-')) {
 issues.push('时间建议使用日式格式："19:00～20:15"');
 }
 
 return issues;
}

// 完整验证并输出报告
export function generateValidationReport(data: HanabiData): string {
 const result = validateHanabiDetailData(data);
 const standards = checkDataStandards(data);
 
 let report = `\n🔍 ${data.name || '未知花火大会'} 数据验证报告\n`;
 report += `========================================\n`;
 
 if (result.isValid) {
 report += `✅ 验证通过：数据完整性检查成功\n`;
 } else {
 report += `❌ 验证失败：发现 ${result.errors.length} 个错误\n`;
 result.errors.forEach(error => {
 report += ` • ${error}\n`;
 });
 }
 
 if (result.warnings.length > 0) {
 report += `\n⚠️ 建议改进 (${result.warnings.length}项):\n`;
 result.warnings.forEach(warning => {
 report += ` • ${warning}\n`;
 });
 }
 
 if (standards.length > 0) {
 report += `\n📋 格式规范建议:\n`;
 standards.forEach(standard => {
 report += ` • ${standard}\n`;
 });
 }
 
 report += `\n验证完成时间：${new Date().toLocaleString('zh-CN')}\n`;
 
 return report;
} 