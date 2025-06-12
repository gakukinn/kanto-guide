// 日文字符检测工具
export class JapaneseTextValidator {
 // 日文字符正则表达式
 private static readonly HIRAGANA_REGEX = /[\u3040-\u309F]/;
 private static readonly KATAKANA_REGEX = /[\u30A0-\u30FF]/;
 private static readonly JAPANESE_REGEX = /[\u3040-\u309F\u30A0-\u30FF]/;

 /**
 * 检查文本是否包含日文字符
 */
 static containsJapanese(text: string): boolean {
 return this.JAPANESE_REGEX.test(text);
 }

 /**
 * 检查文本是否包含平假名
 */
 static containsHiragana(text: string): boolean {
 return this.HIRAGANA_REGEX.test(text);
 }

 /**
 * 检查文本是否包含片假名
 */
 static containsKatakana(text: string): boolean {
 return this.KATAKANA_REGEX.test(text);
 }

 /**
 * 验证花火事件数据
 */
 static validateHanabiEvent(event: any): string[] {
 const errors: string[] = [];

 // 检查名称
 if (this.containsJapanese(event.name)) {
 errors.push(`花火名称包含日文字符: "${event.name}"`);
 }

 // 检查地区
 if (event.area && this.containsJapanese(event.area)) {
 errors.push(`地区名称包含日文字符: "${event.area}"`);
 }

 // 检查车站
 if (event.station && this.containsJapanese(event.station)) {
 errors.push(`车站名称包含日文字符: "${event.station}"`);
 }

 // 检查地点
 if (event.location && this.containsJapanese(event.location)) {
 errors.push(`地点名称包含日文字符: "${event.location}"`);
 }

 return errors;
 }

 /**
 * 验证整个事件数组
 */
 static validateEvents(events: any[]): void {
 let hasErrors = false;
 
 events.forEach((event, index) => {
 const errors = this.validateHanabiEvent(event);
 if (errors.length > 0) {
 hasErrors = true;
 console.error(`❌ 事件 ${index + 1} (${event.id}) 存在日文字符:`);
 errors.forEach(error => console.error(` - ${error}`));
 }
 });

 if (hasErrors) {
 throw new Error('数据验证失败：发现日文字符，请修正后重试');
 } else {
 console.log('✅ 所有事件数据通过中文化验证');
 }
 }
}

// 常用地名翻译对照表
export const PLACE_NAME_TRANSLATIONS = {
 // 茨城县
 '那珂': '日立那珂',
 '手市': '取手',
 '鹿岛': '鹿岛',
 '筑波': '筑波',
 
 // 栃木县
 '足利': '足利',
 '宇都宫': '宇都宫',
 '日光': '日光',
 
 // 群马县
 '高崎': '高崎',
 '前桥': '前桥',
 '桐生': '桐生',
 
 // 车站名
 '勝田': '胜田',
 '取手': '取手',
 '古河': '古河'
} as const; 