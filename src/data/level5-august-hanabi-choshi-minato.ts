/**
 * 第五层数据文件 - 铫子港祭花火大会数据
 * @layer 五层 (Detail Layer)
 * @month 8月
 * @region 千叶
 * @event 铫子港祭花火大会
 * @type 花火详情数据
 * @source Walker Plus官方数据 (https://hanabi.walkerplus.com/detail/ar0312e00411/)
 * @description 包含完整的花火详细信息：基本信息、会场信息、交通指南、观赏攻略等
 */
import { HanabiData } from '@/types/hanabi';

export const choshiMinatoHanabiData: HanabiData = {
 id: 'choshi-minato-hanabi',
 name: '铫子港祭花火大会',
  japaneseName: '銚子みなとまつり花火大会',
 englishName: 'Choshi Port Festival Fireworks Display',
 year: 2025,
 date: '2025年8月2日(土)',
 time: '19:30开始',
 duration: '约60分钟',
 fireworksCount: '约8000发',
 expectedVisitors: '约7万人',
 weather: '夏季高温',
 ticketPrice: '免费观赏',
 status: '开催预定',
 themeColor: '#4A90E2',
 month: 8,
 
 tags: {
 timeTag: '8月',
 regionTag: '千叶',
 typeTag: '花火',
 layerTag: '详细介绍'
 
  },

 history: {
 established: 1955,
 significance: '铫子市传统港口祭典，展现渔港文化与花火艺术的融合',
 highlights: [
 '拥有70年历史的传统港口祭典',
 '利根川河畔的水上花火表演',
 '约8000发花火的精彩展示',
 '铫子渔港独特的海滨花火体验'
 ]
 },

 venues: [
 {
 name: '利根川河畔会场',
 location: '铫子市利根川河畔',
 startTime: '19:30开始',
 features: [
 '河上花火的壮观演出',
 '开阔的河岸观赏区域',
 '约8000发的精美花火',
 '港町铫子的独特风情体验'
 ]
 }
 ],

 access: [
 {
 venue: '利根川河畔会场',
 stations: [
 {
 name: 'JR总武本线铫子站',
 lines: ['JR总武本线'],
 walkTime: '步行约10分钟'
 },
 {
 name: '铫子电铁铫子站',
 lines: ['铫子电铁'],
 walkTime: '步行约10分钟'
 }
 ]
 }
 ],

 viewingSpots: [
 {
 name: '利根川河岸观赏区',
 rating: 5,
 crowdLevel: '高',
 tips: '最佳观赏位置，建议早到占位',
 pros: ['视野开阔', '免费观赏', '交通便利'],
 cons: ['人流密集', '需早到', '停车困难']
 },
 {
 name: '铫子大桥周边',
 rating: 4,
 crowdLevel: '中',
 tips: '稍远但人相对较少',
 pros: ['观赏角度佳', '相对人少', '有停车位'],
 cons: ['距离较远', '花火相对较小']
 },
 {
 name: '铫子港周边',
 rating: 3,
 crowdLevel: '中',
 tips: '港口风情与花火结合',
 pros: ['港町氛围', '有餐饮设施', '停车相对容易'],
 cons: ['视野受限', '距离较远']
 }
 ],

 tips: [
 {
 category: '交通建议',
 items: [
 '建议乘坐JR总武本线铫子站最为便利',
 '当日铫子站周边会比较拥挤，请预留时间',
 '有收费停车场，但建议使用公共交通',
 '散场时请耐心等待，避免拥挤'
 ]
 },
 {
 category: '观赏攻略',
 items: [
 '河岸观赏区：最佳视野，建议17:00前到达占位',
 '携带小型折叠椅或野餐垫会更舒适',
 '夏季夜晚河边较凉爽，但仍需注意防蚊',
 '可在铫子站周边用餐后前往会场'
 ]
 },
 {
 category: '便民设施',
 items: [
 '会场设有临时厕所',
 '铫子站周边有便利店和餐饮设施',
 '可品尝铫子特产金枪鱼料理',
 '垃圾请分类处理，保护河川环境'
 ]
 }
 ],

 mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.567890123456!2d140.8234!3d35.7345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6022f5cd1234567%3A0x1234567890abcdef!2z6ZO/5a2Q5biC5Yip5qC55bed!5e0!3m2!1sja!2sjp!4v1234567890123',

 media: [
 {
 type: 'image',
 url: 'https://images.unsplash.com/photo-1528515862127-84d8eee71ca6?w=800&h=800&fit=crop&crop=center&auto=format&q=80',
 title: '铫子港祭花火大会河上绽放',
 description: '利根川上空绽放的约8000发花火，为铫子港町带来夏夜的璀璨光芒'
 }
 ],

 contact: {
 organizer: '铫子港祭实行委员会',
 phone: '0479-24-8181',
 website: 'https://www.city.choshi.chiba.jp/',
 socialMedia: '@choshi_minato'
 },

 mapInfo: {
 hasMap: true,
 mapNote: '会场位于利根川河畔，毗邻铫子港',
 parking: '有收费停车场，但建议使用公共交通'
 },

 weatherInfo: {
 month: '8月',
 temperature: '26°C～32°C',
 humidity: '80%',
 rainfall: '中等',
 recommendation: '建议携带防蚊用品和饮用水，河边夜晚较凉爽但仍需防暑'
 },

 related: {
 regionRecommendations: [
 {
 id: 'makuhari-beach-hanabi',
 name: '幕张海滩花火节2025(第47回千叶市民花火大会)',
 date: '2025年8月2日',
 location: '千叶市美浜区幕张海滨公园',
 visitors: '约30万人',
 link: '/august/hanabi/chiba/makuhari-beach-hanabi'
 },
 {
 id: 'ichikawa-hanabi',
 name: '第41回市川市民纳凉花火大会',
 date: '2025年8月2日',
 location: '市川市江户川河川敷',
 visitors: '约49万人',
 link: '/august/hanabi/chiba/ichikawa'
 }
 ],
 timeRecommendations: [
 {
 id: 'narashino-hanabi',
 name: '令和7年习志野驻屯地夏祭',
 date: '2025年8月2日',
 location: '船桥市陆上自卫队习志野驻屯地',
 visitors: '约5万人',
 link: '/august/hanabi/chiba/narashino'
 }
 ]
 }
}; 