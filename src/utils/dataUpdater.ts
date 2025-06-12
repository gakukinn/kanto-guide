import { monthsConfig, type MonthConfig } from '@/config/monthsConfig';

// 外部数据源接口
interface ExternalDataSource {
 url: string;
 parser: (html: string) => Partial<MonthConfig>;
}

// Go Tokyo网站数据解析器
class GoTokyoParser {
 static parseMonthData(html: string): Partial<MonthConfig> {
 // 这里实现解析逻辑，提取关键信息
 // 由于是静态示例，这里返回解析后的数据结构
 
 const parsed: Partial<MonthConfig> = {
 // 从HTML中提取天气信息
 weather: {
 temperature: this.extractTemperature(html),
 high_temp: this.extractHighTemp(html),
 conditions: this.extractConditions(html),
 tip: this.extractWeatherTip(html)
 },
 // 从HTML中提取活动信息
 activities: this.extractActivities(html)
 };

 return parsed;
 }

 private static extractTemperature(html: string): string {
 // 解析温度信息的逻辑
 const tempMatch = html.match(/(\d+\.?\d*)[°º]C/i);
 return tempMatch ? `${tempMatch[1]}°C` : '数据获取中...';
 }

 private static extractHighTemp(html: string): string {
 // 解析最高温度信息的逻辑
 const highTempMatch = html.match(/exceed (\d+\.?\d*)[°º]C/i);
 return highTempMatch ? `超过${highTempMatch[1]}°C` : '数据获取中...';
 }

 private static extractConditions(html: string): string {
 // 解析天气条件的逻辑
 if (html.includes('hot and humid')) return '炎热高湿';
 if (html.includes('rainy season')) return '梅雨季节';
 if (html.includes('typhoon')) return '台风季节';
 if (html.includes('mild')) return '温和舒适';
 return '请查看最新天气信息';
 }

 private static extractWeatherTip(html: string): string {
 // 解析天气小贴士的逻辑
 if (html.includes('light, airy clothing')) return '准备透气舒适的衣服';
 if (html.includes('rain gear')) return '携带雨具，注意防潮';
 if (html.includes('warm clothing')) return '准备保暖衣物';
 return '根据天气情况准备合适衣物';
 }

 private static extractActivities(html: string): any[] {
 // 解析活动信息的逻辑
 const activities = [];
 
 // 花火大会检测
 if (html.includes('fireworks') || html.includes('hanabi')) {
 activities.push({
 id: 'hanabi',
 name: '花火大会',
 description: '夏夜最美的烟花盛典',
 icon: '🎆',
 color: 'from-rose-100 to-white'
 });
 }

 // 传统节日检测
 if (html.includes('festival') || html.includes('matsuri')) {
 activities.push({
 id: 'matsuri',
 name: '传统祭祀',
 description: '传统节日庆典活动',
 icon: '🏮',
 color: 'from-white to-blue-100'
 });
 }

 // 特色活动检测
 if (html.includes('Bon-odori') || html.includes('dance')) {
 activities.push({
 id: 'events',
 name: '特色活动',
 description: '盆舞节、文化活动',
 icon: '🎪',
 color: 'from-blue-100 to-blue-200'
 });
 }

 return activities.length > 0 ? activities : [];
 }

 private static extractSourceUrl(html: string): string {
 // 提取原始URL（这里简化处理）
 return 'https://www.gotokyo.org/en/story/guide/august/index.html';
 }
}

// 数据更新器类
export class DataUpdater {
 private static sources: Record<number, ExternalDataSource> = {
 1: { url: 'https://www.gotokyo.org/en/story/guide/january/index.html', parser: GoTokyoParser.parseMonthData },
 2: { url: 'https://www.gotokyo.org/en/story/guide/february/index.html', parser: GoTokyoParser.parseMonthData },
 3: { url: 'https://www.gotokyo.org/en/story/guide/march/index.html', parser: GoTokyoParser.parseMonthData },
 4: { url: 'https://www.gotokyo.org/en/story/guide/april/index.html', parser: GoTokyoParser.parseMonthData },
 5: { url: 'https://www.gotokyo.org/en/story/guide/may/index.html', parser: GoTokyoParser.parseMonthData },
 6: { url: 'https://www.gotokyo.org/en/story/guide/june/index.html', parser: GoTokyoParser.parseMonthData },
 7: { url: 'https://www.gotokyo.org/en/story/guide/july/index.html', parser: GoTokyoParser.parseMonthData },
 8: { url: 'https://www.gotokyo.org/en/story/guide/august/index.html', parser: GoTokyoParser.parseMonthData },
 9: { url: 'https://www.gotokyo.org/en/story/guide/september/index.html', parser: GoTokyoParser.parseMonthData },
 10: { url: 'https://www.gotokyo.org/en/story/guide/october/index.html', parser: GoTokyoParser.parseMonthData },
 11: { url: 'https://www.gotokyo.org/en/story/guide/november/index.html', parser: GoTokyoParser.parseMonthData },
 12: { url: 'https://www.gotokyo.org/en/story/guide/december/index.html', parser: GoTokyoParser.parseMonthData }
 };

 // 获取单个月份的外部数据
 static async fetchMonthData(monthId: number): Promise<Partial<MonthConfig> | null> {
 const source = this.sources[monthId];
 if (!source) return null;

 try {
 // 在实际环境中，这里会发起网络请求
 // const response = await fetch(source.url);
 // const html = await response.text();
 
 // 为了演示，这里使用模拟数据
 const mockHtml = this.getMockHtmlForMonth(monthId);
 const parsedData = source.parser(mockHtml);
 
 return parsedData;
 } catch (error) {
 console.error(`获取月份 ${monthId} 数据失败:`, error);
 return null;
 }
 }

 // 更新单个月份配置
 static async updateMonthConfig(monthId: number): Promise<MonthConfig | null> {
 const baseConfig = monthsConfig[monthId];
 if (!baseConfig) return null;

 const externalData = await this.fetchMonthData(monthId);
 if (!externalData) return baseConfig;

 // 合并基础配置和外部数据
 const updatedConfig: MonthConfig = {
 ...baseConfig,
 ...externalData,
 // 保持ID不变
 id: baseConfig.id,
 // 合并天气信息
 weather: {
 ...baseConfig.weather,
 ...externalData.weather
 },
 // 合并旅游信息
 travel_info: {
 ...baseConfig.travel_info,
 ...externalData.travel_info
 },
 // 如果外部数据有活动信息，则使用外部数据，否则保持原有
 activities: externalData.activities && externalData.activities.length > 0 
 ? externalData.activities 
 : baseConfig.activities
 };

 return updatedConfig;
 }

 // 更新所有月份配置
 static async updateAllMonthConfigs(): Promise<Record<number, MonthConfig>> {
 const updatedConfigs: Record<number, MonthConfig> = {};

 for (let monthId = 1; monthId <= 12; monthId++) {
 const updatedConfig = await this.updateMonthConfig(monthId);
 if (updatedConfig) {
 updatedConfigs[monthId] = updatedConfig;
 }
 }

 return updatedConfigs;
 }

 // 模拟HTML数据（用于演示）
 private static getMockHtmlForMonth(monthId: number): string {
 const mockData: Record<number, string> = {
 8: `
 <div>白天平均氣溫約29.2度，最高氣溫超過35度的天數會變多。夜晚約有26度，8月的東京會較為炎熱。
 為了避暑，請準備輕便且通風的服裝。8月還有可能遇到豪大雨或颱風，建議隨身攜帶雨具，有備無患。
 日本的8月正好是夏日祭典的高峰期，能夠參加各式各樣的活動。各地會舉辦當地的慶典、煙火表演及「盂蘭盆舞」活動等。
 清瀨向日葵節、阿佐谷七夕祭、高圓寺阿波舞、麻布十番納涼祭、原宿表參道元氣祭Super Yosakoi。
 傳統音樂、舞蹈及熱鬧氛圍都令人難以忘懷。fireworks hanabi matsuri festival dance bon-odori。</div>
 `,
 // 可以为其他月份添加更多模拟数据
 };

 return mockData[monthId] || `<div>Mock data for month ${monthId}</div>`;
 }

 // 验证配置数据完整性
 static validateConfig(config: MonthConfig): boolean {
 return !!(
 config.id &&
 config.chinese &&
 config.traditional &&
 config.weather &&
 config.activities &&
 config.activities.length > 0 &&
 config.travel_info
 );
 }

 // 获取数据更新状态
 static getUpdateStatus(monthId: number): {
 hasExternalSource: boolean;
 lastUpdated: string | null;
 isStale: boolean;
 } {
 const config = monthsConfig[monthId];
 const lastUpdated = null; // 简化处理，移除external_sources依赖
 const hasExternalSource = false; // 简化处理，移除external_sources依赖
 
 // 判断数据是否过期（超过7天）
 const isStale = lastUpdated 
 ? (Date.now() - new Date(lastUpdated).getTime()) > 7 * 24 * 60 * 60 * 1000
 : true;

 return {
 hasExternalSource,
 lastUpdated,
 isStale
 };
 }
}

// 自动更新任务
export class AutoUpdater {
 private static updateInterval: NodeJS.Timeout | null = null;

 // 开始自动更新任务（每天执行一次）
 static startAutoUpdate(): void {
 if (this.updateInterval) return;

 this.updateInterval = setInterval(async () => {
 console.log('开始自动更新月份数据...');
 try {
 await DataUpdater.updateAllMonthConfigs();
 console.log('月份数据更新完成');
 } catch (error) {
 console.error('自动更新失败:', error);
 }
 }, 24 * 60 * 60 * 1000); // 24小时
 }

 // 停止自动更新任务
 static stopAutoUpdate(): void {
 if (this.updateInterval) {
 clearInterval(this.updateInterval);
 this.updateInterval = null;
 }
 }

 // 手动触发更新
 static async triggerUpdate(monthId?: number): Promise<void> {
 if (monthId) {
 await DataUpdater.updateMonthConfig(monthId);
 } else {
 await DataUpdater.updateAllMonthConfigs();
 }
 }
} 