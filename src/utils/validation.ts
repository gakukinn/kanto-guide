import { REGIONAL_CONFIG } from '@/config/regional-template';

// 数据验证接口
export interface ValidationResult {
 isValid: boolean;
 errors: string[];
 warnings: string[];
}

// 验证访客数据格式
export function validateVisitors(visitors: string): ValidationResult {
 const { patterns, examples } = REGIONAL_CONFIG.validation.visitors;
 const isValid = patterns.some(pattern => pattern.test(visitors));
 
 return {
 isValid,
 errors: isValid ? [] : [`访客数据格式错误: "${visitors}". 应为: ${examples.join(', ')}`],
 warnings: []
 };
}

// 验证花火数量格式
export function validateFireworks(fireworks: string): ValidationResult {
 const { patterns, examples } = REGIONAL_CONFIG.validation.fireworks;
 const isValid = patterns.some(pattern => pattern.test(fireworks));
 
 return {
 isValid,
 errors: isValid ? [] : [`花火数量格式错误: "${fireworks}". 应为: ${examples.join(', ')}`],
 warnings: []
 };
}

// 验证花火大会事件数据
export function validateHanabiEvent(event: any): ValidationResult {
 const errors: string[] = [];
 const warnings: string[] = [];

 // 必填字段检查
 const requiredFields = ['id', 'name', 'date', 'area', 'visitors', 'fireworks'];
 for (const field of requiredFields) {
 if (!event[field] || typeof event[field] !== 'string' || event[field].trim() === '') {
 errors.push(`缺少必填字段: ${field}`);
 }
 }

 // 格式验证
 if (event.visitors) {
 const visitorsResult = validateVisitors(event.visitors);
 errors.push(...visitorsResult.errors);
 }

 if (event.fireworks) {
 const fireworksResult = validateFireworks(event.fireworks);
 errors.push(...fireworksResult.errors);
 }

 // 标题长度检查
 if (event.name && event.name.length > 20) {
 warnings.push(`标题过长 (${event.name.length}字符): "${event.name}". 建议控制在20字符内`);
 }

 // ID格式检查
 if (event.id && !/^[a-z0-9-]+$/.test(event.id)) {
 errors.push(`ID格式错误: "${event.id}". 应为小写字母、数字和连字符组合`);
 }

 return {
 isValid: errors.length === 0,
 errors,
 warnings
 };
}

// 批量验证事件数组
export function validateHanabiEvents(events: any[]): ValidationResult {
 const allErrors: string[] = [];
 const allWarnings: string[] = [];

 events.forEach((event, index) => {
 const result = validateHanabiEvent(event);
 
 // 添加索引信息
 result.errors.forEach(error => {
 allErrors.push(`事件[${index}] ${error}`);
 });
 
 result.warnings.forEach(warning => {
 allWarnings.push(`事件[${index}] ${warning}`);
 });
 });

 // 检查重复ID
 const ids = events.map(e => e.id).filter(Boolean);
 const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
 if (duplicateIds.length > 0) {
 allErrors.push(`发现重复ID: ${[...new Set(duplicateIds)].join(', ')}`);
 }

 return {
 isValid: allErrors.length === 0,
 errors: allErrors,
 warnings: allWarnings
 };
}

// 开发环境下的数据验证助手
export function validateInDevelopment(events: any[], componentName: string) {
 if (process.env.NODE_ENV === 'development') {
 const result = validateHanabiEvents(events);
 
 if (result.errors.length > 0) {
 console.error(`❌ ${componentName} 数据验证失败:`);
 result.errors.forEach(error => console.error(` - ${error}`));
 }
 
 if (result.warnings.length > 0) {
 console.warn(`⚠️ ${componentName} 数据验证警告:`);
 result.warnings.forEach(warning => console.warn(` - ${warning}`));
 }

 if (result.errors.length === 0 && result.warnings.length === 0) {
 console.log(`✅ ${componentName} 数据验证通过`);
 }
 }
} 