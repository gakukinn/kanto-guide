/**
 * 第五层数据文件 - 御藏岛花火大会数据
 * @layer 五层 (Detail Layer)
 * @month 7月
 * @region 东京
 * @event 御藏岛花火大会
 * @type 花火详情数据
 * @source Walker Plus官方数据
 * @description 包含完整的花火详细信息：基本信息、会场信息、交通指南、观赏攻略等
 */
import { HanabiData } from '@/types/hanabi';

export const mikurajimaHanabiData: HanabiData = {
 id: 'mikurajima-hanabi',
 name: '御藏岛花火大会',
  japaneseName: '御蔵島花火大会',
 englishName: 'Mikurajima Fireworks Festival',
 year: 2025,
 date: '2025年7月31日(木)',
 time: '19:30-20:00(预定)',
 duration: '约30分钟',
 fireworksCount: '约802发',
 expectedVisitors: '约500人',
 weather: '海岛温和气候',
 ticketPrice: '免费观赏',
 status: '开催预定',
 themeColor: '#2E86AB',
 month: 7,

 tags: {
 timeTag: '7月',
 regionTag: '东京',
 typeTag: '花火',
 layerTag: '详细介绍'
 
  },

 history: {
 established: 1995,
 significance: '大自然环绕的御藏岛传统夏季花火',
 highlights: [
 '东京都最南端的小岛花火大会',
 '手工未接触自然环境中的花火体验',
 '2.5～4号玉为中心的传统花火构成',
 '满天星空下的绝美花火观赏'
 ]
 },

 venues: [
 {
 name: '御藏岛港',
 location: '东京都御藏岛村',
 startTime: '19:30开始，20:00结束(预定)',
 features: [
 '至近距离观赏色彩缤纷花火竞演',
 '没有高层建筑遮挡视野',
 '离岛独特开放感体验',
 '天气良好时可观赏满天星空'
 ]
 }
 ],

 access: [
 {
 venue: '御藏岛港',
 stations: [
 {
 name: '竹芝客船码头',
 lines: ['东海汽船'],
 walkTime: '乘船7小时40分钟，下船即到会场'
 }
 ]
 }
 ],

 viewingSpots: [
 {
 name: '御藏岛港周边',
 rating: 5,
 crowdLevel: '低',
 tips: '港口周边任意位置都能清楚观赏',
 pros: ['360度开放视野', '人数少不拥挤', '近距离观赏'],
 cons: ['船舶交通限制', '天气依赖性高', '住宿设施有限']
 },
 {
 name: '岛内高台',
 rating: 4,
 crowdLevel: '低',
 tips: '从高处俯瞰整个花火大会全景',
 pros: ['视野开阔', '拍照绝佳', '独特观赏角度'],
 cons: ['步行距离较远', '夜间行走需注意安全', '携带用品不便']
 }
 ],

 tips: [
 {
 category: '交通建议',
 items: [
 '需提前预约东海汽船船票，夏季座位紧张',
 '船舶运行受天气影响，出发前确认运航状况',
 '返程船票也需提前预约，当日可能无座',
 '从竹芝客船码头乘船约7小时40分钟'
 ]
 },
 {
 category: '观赏攻略',
 items: [
 '建议当日早到岛上，体验御藏岛自然环境',
 '携带防寒衣物，海上夜间气温较低',
 '准备防蚊虫用品和手电筒',
 '天气晴朗时可同时观赏花火和星空'
 ]
 },
 {
 category: '住宿饮食',
 items: [
 '岛上住宿设施有限，建议提前预约',
 '准备充足饮用水和简单食物',
 '岛上商店营业时间有限',
 '垃圾需带回本土，保护岛屿环境'
 ]
 }
 ],

 mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.123456789012!2d139.6043456!3d33.8695432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60184c5ea3b3b3b3%3A0x1234567890abcdef!2z5b6h6JeP5bO25riv!5e0!3m2!1sja!2sjp!4v1234567890456',

 media: [
 {
 type: 'image',
 url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=800&fit=crop&crop=center&auto=format&q=80',
 title: '御藏岛花火大会夜空绽放',
 description: '大自然环绕的御藏岛港上空，约802发花火在满天星空下绽放出绚烂光芒'
 }
 ],

 contact: {
 organizer: '御藏岛村总务课',
 phone: '04994-8-2121',
 website: 'https://www.mikurasima.jp/',
 socialMedia: '@mikurajimahanabi'
 },
 // 官方数据源验证
 officialSource: {
   walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0313e00816/',
   verificationDate: '2025-01-13',
   dataConfirmedBy: 'USER_PROVIDED' as const,
    lastChecked: '2025-01-13'
 },

 mapInfo: {
 hasMap: true,
 mapNote: '会场位于御藏岛港，从竹芝客船码头乘船到达',
 parking: '岛上无需停车场，步行或自行车移动'
 },

 weatherInfo: {
 month: '7月',
 temperature: '24°C～28°C',
 humidity: '80%',
 rainfall: '中等',
 recommendation: '建议携带防寒衣物和雨具',
 rainPolicy: '恶劣天气中止',},

 related: {
 regionRecommendations: [
 {
 id: 'katsushika-noryo-hanabi',
 name: '第59回葛饰纳凉花火大会',
 date: '2025年7月22日',
 location: '葛饰区柴又野球场',
 visitors: '约77万人',
      link: '/july/hanabi/tokyo/katsushika-noryo'
 },
 {
 id: 'sumida',
 name: '第48回隅田川花火大会',
 date: '2025年7月26日',
 location: '隅田川两岸',
 visitors: '约91万人',
      link: '/july/hanabi/tokyo/sumida'
 }
 ],
 timeRecommendations: [
 {
 id: 'tokyo-keibajo-hanabi',
 name: '东京竞马场花火2025',
 date: '2025年7月2日',
 location: 'JRA东京竞马场',
 visitors: '非公表',
      link: '/july/hanabi/tokyo/keibajo'
 }
 ]
 }
}; 