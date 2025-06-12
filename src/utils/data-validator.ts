import { HanabiData } from '../types/hanabi';

interface ValidationError {
 field: string;
 message: string;
 severity: 'error' | 'warning';
}

/**
 * 第五层花火数据验证工具
 */
export class DataValidator {
 private errors: ValidationError[] = [];

 /**
 * 验证花火数据
 */
 validate(data: HanabiData): ValidationError[] {
 this.errors = [];
 
 this.validateRequired(data);
 this.validateMapFields(data);
 this.validateChineseContent(data);
 this.validateViewingSpots(data);
 
 return this.errors;
 }

 /**
 * 验证必填字段
 */
 private validateRequired(data: HanabiData): void {
 const requiredFields = [
 'id', 'name', 'date', 'time', 'venues', 
 'access', 'viewingSpots', 'tips', 'contact',
 'mapInfo', 'weatherInfo'
 ];

 requiredFields.forEach(field => {
 if (!data[field as keyof HanabiData]) {
 this.addError(field, `缺少必填字段: ${field}`, 'error');
 }
 });
 }

 /**
 * 验证地图相关字段
 */
 private validateMapFields(data: HanabiData): void {
 if (!data.mapEmbedUrl) {
 this.addError('mapEmbedUrl', '缺少mapEmbedUrl字段，地图将无法显示', 'error');
 }

 if (data.mapInfo?.hasMap && !data.mapEmbedUrl) {
 this.addError('mapInfo', 'mapInfo.hasMap为true但缺少mapEmbedUrl', 'error');
 }
 }

 /**
 * 验证中文内容
 */
 private validateChineseContent(data: HanabiData): void {
 // 检查观赏席位名称
 if (data.viewingSpots) {
 data.viewingSpots.forEach((spot, index) => {
 if (this.containsJapanese(spot.name)) {
 this.addError(
 `viewingSpots[${index}].name`, 
 `观赏席位名称包含日文: ${spot.name}，需翻译为中文汉字`, 
 'error'
 );
 }
 });
 }

 // 检查实用建议
 if (data.tips) {
 data.tips.forEach((tip, tipIndex) => {
 tip.items.forEach((item, itemIndex) => {
 if (this.containsJapanese(item)) {
 this.addError(
 `tips[${tipIndex}].items[${itemIndex}]`,
 `实用建议包含日文: ${item}`,
 'warning'
 );
 }
 });
 });
 }
 }

 /**
 * 验证观赏攻略
 */
 private validateViewingSpots(data: HanabiData): void {
 if (!data.viewingSpots || data.viewingSpots.length === 0) {
 this.addError('viewingSpots', '缺少观赏攻略数据', 'error');
 return;
 }

 data.viewingSpots.forEach((spot, index) => {
 if (!spot.name) {
 this.addError(`viewingSpots[${index}]`, '观赏席位缺少名称', 'error');
 }
 
 if (!spot.rating || spot.rating < 1 || spot.rating > 5) {
 this.addError(`viewingSpots[${index}]`, '观赏席位评分必须在1-5之间', 'error');
 }
 });
 }

 /**
 * 检查是否包含日文
 */
 private containsJapanese(text: string): boolean {
 // 检查平假名、片假名
 const japaneseRegex = /[\u3040-\u309F\u30A0-\u30FF]/;
 return japaneseRegex.test(text);
 }

 /**
 * 添加错误
 */
 private addError(field: string, message: string, severity: 'error' | 'warning'): void {
 this.errors.push({ field, message, severity });
 }

 /**
 * 获取验证结果摘要
 */
 getValidationSummary(errors: ValidationError[]): string {
 const errorCount = errors.filter(e => e.severity === 'error').length;
 const warningCount = errors.filter(e => e.severity === 'warning').length;
 
 if (errorCount === 0 && warningCount === 0) {
 return '✅ 数据验证通过，无错误和警告';
 }
 
 return `❌ 发现 ${errorCount} 个错误，${warningCount} 个警告`;
 }
}

/**
 * 常用翻译对照
 */
export const commonTranslations = {
 '高级席位': '高级席位',
 '座位票S席': '座位票S席',
 '座位票A席': '座位票A席', 
 '草坪区域票': '草坪区域票',
 '野餐垫': '野餐垫',
 '自由席位': '自由席位',
 '指定席位': '指定席位',
 '收费席位': '收费席位'
};

/**
 * 快速验证函数
 */
export function validateHanabiData(data: HanabiData): void {
 const validator = new DataValidator();
 const errors = validator.validate(data);
 
 if (errors.length > 0) {
 console.log('🔍 数据验证结果:');
 console.log(validator.getValidationSummary(errors));
 console.log('');
 
 errors.forEach(error => {
 const icon = error.severity === 'error' ? '❌' : '⚠️';
 console.log(`${icon} ${error.field}: ${error.message}`);
 });
 
 if (errors.some(e => e.severity === 'error')) {
 throw new Error('数据验证失败，请修复错误后重试');
 }
 } else {
 console.log('✅ 数据验证通过');
 }
}

// 第五层数据验证规则
export const level5ValidationRules = {
 required: [
 'id', 'name', 'englishName', 'year', 'month', 'date', 'time', 
 'duration', 'fireworksCount', 'expectedVisitors', 'weather', 
 'ticketPrice', 'status', 'themeColor', 'tags', 'venues', 'access', 
 'viewingSpots', 'history', 'tips', 'contact', 'mapInfo', 'weatherInfo',
 'mapEmbedUrl' // 地图URL为必填字段
 ],
 // ... existing code ...
};

// 地图相关验证
export function validateMapData(data: any): { isValid: boolean; errors: string[] } {
 const errors: string[] = [];
 
 // 检查mapEmbedUrl是否存在
 if (!data.mapEmbedUrl) {
 errors.push('缺少必填字段: mapEmbedUrl (地图URL)');
 }
 
 // 检查mapEmbedUrl格式
 if (data.mapEmbedUrl && !data.mapEmbedUrl.includes('google.com/maps/embed')) {
 errors.push('mapEmbedUrl格式不正确，应为Google Maps嵌入链接');
 }
 
 // 检查mapInfo
 if (!data.mapInfo?.hasMap) {
 errors.push('mapInfo.hasMap应为true当存在地图时');
 }
 
 return {
 isValid: errors.length === 0,
 errors
 };
} 