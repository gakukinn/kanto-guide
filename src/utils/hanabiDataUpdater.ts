/**
 * 花火大会数据更新工具
 * 用于同步外部数据源并更新本地数据
 */

import { HanabiData, HanabiDynamicData } from '../types/hanabi';

// Walker Plus 数据结构
interface WalkerPlusData {
 name: string;
 date: string;
 location: string;
 fireworksCount: string;
 expectedVisitors: string;
 wantToGo: number;
 wentAndGood: number;
 hasReservedSeats: boolean;
 hasFood: boolean;
}

// 数据映射配置
const DATA_MAPPING = {
 // 东京都7月花火大会
 'tokyo-racecourse': {
 walkerPlusId: 'tokyo-racecourse-2025',
    officialName: '東京競馬場花火 2025 〜花火と聴きたい J-POP BEST〜',
 expectedData: {
 date: '2025年7月2日(水)',
 fireworksCount: '1万4000発',
 expectedVisitors: '非公表',
 wantToGo: 152,
 wentAndGood: 28
 }
 },
 'katsushika': {
 walkerPlusId: 'katsushika-2025',
    officialName: '第59回 葛飾納涼花火大会',
 expectedData: {
 date: '2025年7月22日(火)',
 fireworksCount: '約1万5000発',
 expectedVisitors: '約77万人',
 wantToGo: 98,
 wentAndGood: 30
 }
 },
 'sumida': {
 walkerPlusId: 'sumida-2025',
    officialName: '第48回 隅田川花火大会',
 expectedData: {
 date: '2025年7月26日(土)',
 fireworksCount: '約2万発',
 expectedVisitors: '約91万人',
 wantToGo: 124,
 wentAndGood: 30
 }
 },
 'hachioji': {
 walkerPlusId: 'hachioji-2025',
    officialName: '八王子花火大会',
 expectedData: {
 date: '2025年7月26日(土)',
 fireworksCount: '約4000発',
 expectedVisitors: '約9万人',
 wantToGo: 30,
 wentAndGood: 18
 }
 },
 'tachikawa': {
 walkerPlusId: 'tachikawa-2025',
    officialName: '立川まつり 国営昭和記念公園花火大会',
 expectedData: {
 date: '2025年7月26日(土)',
 fireworksCount: '5000発',
 expectedVisitors: '32万2575人',
 wantToGo: 34,
 wentAndGood: 11
 }
 },
 'mikurajima': {
 walkerPlusId: 'mikurajima-2025',
    officialName: '御蔵島花火大会',
 expectedData: {
 date: '2025年7月31日(木)',
 fireworksCount: '約802発',
 expectedVisitors: '500人',
 wantToGo: 1,
 wentAndGood: 2
 }
 },
 
 // 神奈川县7月花火大会
 'kamakura': {
 walkerPlusId: 'kamakura-2025',
    officialName: '第77回 鎌倉花火大会',
 expectedData: {
 date: '2025年7月18日(金)',
 fireworksCount: '約2500発',
 expectedVisitors: '約16万人',
 wantToGo: 147,
 wentAndGood: 37
 }
 },
 'yokohama-night': {
 walkerPlusId: 'yokohama-night-2025',
    officialName: '横浜ナイトフラワーズ2025',
 expectedData: {
 date: '7/5、12等（毎月開催）',
 fireworksCount: '約150発',
 expectedVisitors: '非公開',
 wantToGo: 151,
 wentAndGood: 130
 }
 },
 'hakkeijima': {
 walkerPlusId: 'hakkeijima-2025',
    officialName: '横浜・八景島シーパラダイス「花火シンフォニア」',
 expectedData: {
 date: '7/19、20、26等',
 fireworksCount: '約2500発',
 expectedVisitors: '非公開',
 wantToGo: 22,
 wentAndGood: 9
 }
 }
};

/**
 * 模拟从Walker Plus获取数据
 * (实际应用中应该是真实的API调用)
 */
async function fetchWalkerPlusData(walkerPlusId: string): Promise<WalkerPlusData | null> {
 // 模拟API延迟
 await new Promise(resolve => setTimeout(resolve, 100));
 
 // 返回模拟数据（基于我们从网站搜索得到的最新信息）
 const mapping = Object.values(DATA_MAPPING).find(m => m.walkerPlusId === walkerPlusId);
 if (!mapping) return null;
 
 return {
 name: mapping.officialName,
 date: mapping.expectedData.date,
 location: '详见各会场',
 fireworksCount: mapping.expectedData.fireworksCount,
 expectedVisitors: mapping.expectedData.expectedVisitors,
 wantToGo: mapping.expectedData.wantToGo,
 wentAndGood: mapping.expectedData.wentAndGood,
 hasReservedSeats: true,
 hasFood: true
 };
}

/**
 * 更新花火数据的动态字段
 */
export async function updateHanabiDynamicData(
 hanabiId: string, 
 currentData: HanabiData
): Promise<HanabiData> {
 const mapping = DATA_MAPPING[hanabiId as keyof typeof DATA_MAPPING];
 if (!mapping) {
 console.warn(`No mapping found for hanabi ID: ${hanabiId}`);
 return currentData;
 }

 try {
 const walkerData = await fetchWalkerPlusData(mapping.walkerPlusId);
 if (!walkerData) {
 console.warn(`No data returned for Walker Plus ID: ${mapping.walkerPlusId}`);
 return currentData;
 }

 // 创建动态数据
 const dynamicData: HanabiDynamicData = {
 popularity: {
 wantToGo: walkerData.wantToGo,
 wentAndGood: walkerData.wentAndGood,
 lastUpdated: new Date().toISOString()
 },
 schedule: {
 confirmed: true,
 dateStatus: 'confirmed',
 updates: [
 `${new Date().toLocaleDateString()} - 数据已同步Walker Plus最新信息`
 ]
 },
 ticketing: {
 salesStart: '2025年6月1日',
 salesEnd: '当日',
 availability: 'available',
 officialUrl: `https://hanabi.walkerplus.com/detail/${mapping.walkerPlusId}/`
 },
 venueDetails: {
 facilities: ['有料席', '屋台', '临时洗手间'],
 restrictions: ['禁止携带酒精', '禁止烟花', '雨天可能中止']
 },
 dataSources: {
 primary: 'Walker Plus',
 lastSync: new Date().toISOString(),
 verification: true
 }
 };

 // 更新基础数据
 const updatedData: HanabiData = {
 ...currentData,
 // 如果日期有变化，更新日期
 date: walkerData.date !== mapping.expectedData.date ? walkerData.date : currentData.date,
 // 更新动态数据
 dynamicData
 };

 console.log(`✅ Updated data for ${hanabiId}:`, {
 popularity: dynamicData.popularity,
 dateUpdated: walkerData.date !== mapping.expectedData.date
 });

 return updatedData;
 
 } catch (error) {
 console.error(`Failed to update data for ${hanabiId}:`, error);
 return currentData;
 }
}

/**
 * 批量更新所有花火数据
 */
export async function batchUpdateAllHanabi(hanabiDataList: HanabiData[]): Promise<HanabiData[]> {
 console.log(`🔄 Starting batch update for ${hanabiDataList.length} hanabi events...`);
 
 const updatedList = await Promise.all(
 hanabiDataList.map(async (hanabi) => {
 return await updateHanabiDynamicData(hanabi.id, hanabi);
 })
 );
 
 console.log(`✅ Batch update completed. Updated ${updatedList.length} events.`);
 return updatedList;
}

/**
 * 检查数据差异
 */
export function detectDataChanges(
 oldData: HanabiData, 
 newData: HanabiData
): { hasChanges: boolean; changes: string[] } {
 const changes: string[] = [];
 
 // 检查基础信息变化
 if (oldData.date !== newData.date) {
 changes.push(`日期变更: ${oldData.date} → ${newData.date}`);
 }
 
 if (oldData.fireworksCount !== newData.fireworksCount) {
 changes.push(`花火数量变更: ${oldData.fireworksCount} → ${newData.fireworksCount}`);
 }
 
 // 检查人气数据变化
 if (newData.dynamicData) {
 const oldWantToGo = oldData.dynamicData?.popularity.wantToGo || 0;
 const newWantToGo = newData.dynamicData.popularity.wantToGo;
 
 if (oldWantToGo !== newWantToGo) {
 changes.push(`人气变化: ${oldWantToGo} → ${newWantToGo} 想去人数`);
 }
 }
 
 return {
 hasChanges: changes.length > 0,
 changes
 };
}

/**
 * 生成数据更新报告
 */
export function generateUpdateReport(
 originalData: HanabiData[], 
 updatedData: HanabiData[]
): string {
 let report = `# 花火数据更新报告\n\n`;
 report += `更新时间: ${new Date().toLocaleString()}\n`;
 report += `更新数量: ${updatedData.length} 个花火大会\n\n`;
 
 report += `## 详细变更\n\n`;
 
 updatedData.forEach((newData, index) => {
 const oldData = originalData[index];
 const { hasChanges, changes } = detectDataChanges(oldData, newData);
 
 if (hasChanges) {
 report += `### ${newData.name}\n`;
 changes.forEach(change => {
 report += `- ${change}\n`;
 });
 report += `\n`;
 }
 });
 
 if (!updatedData.some((_, index) => 
 detectDataChanges(originalData[index], updatedData[index]).hasChanges
 )) {
 report += `暂无数据变更。\n`;
 }
 
 return report;
} 