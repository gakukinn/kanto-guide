import { HanabiData } from '../types/hanabi';

export const hachioji: HanabiData = {
 id: 'hachioji',
 name: '八王子花火大会',
  japaneseName: '第65回八王子花火大会',

 englishName: 'Hachioji Hanabi Taikai',
  title: '八王子花火大会 - 7月东京花火大会',
  description: '八王子花火大会详情信息，包含举办时间、地点、交通方式、观赏攻略等完整信息。',
 year: 2025,
 date: '2025年7月1日',
 time: '19:00～20:15',
 duration: '75分钟',
 fireworksCount: '约4,000发',
 expectedVisitors: '约9万人',
 weather: '荒天中止',
 ticketPrice: '观览免费',
 status: '开催预定',
 themeColor: 'from-orange-400 to-red-600',
 month: 7,
 
 tags: {
 timeTag: '7月',
 regionTag: '东京',
 typeTag: '花火',
 layerTag: '详细介绍'
 
  },
 
 related: {
 regionRecommendations: [
 {
 id: 'tachikawa',
 name: '立川祭昭和纪念公园花火大会',
 date: '7月第四个周六',
 location: '立川市',
 visitors: '35万人',
 link: '/july/hanabi/tokyo/tachikawa'
 },
 {
 id: 'sumida',
 name: '隅田川花火大会',
 date: '7月最后一个周六',
 location: '台东区、墨田区',
 visitors: '91万人',
 link: '/july/hanabi/tokyo/sumida'
 }
 ],
 timeRecommendations: [
 {
 id: 'katsushika',
 name: '葛飾納涼花火大会',
 date: '7月最后一个周六',
 location: '葛飾区',
 visitors: '77万人',
 link: '/july/hanabi/tokyo/katsushika'
 },
 {
 id: 'itabashi',
 name: '板橋花火大会',
 date: '7月第三个周六',
 location: '板橋区',
 visitors: '52万人',
 link: '/july/hanabi/tokyo/itabashi'
 }
 ]
 },
 
 venues: [
 {
 name: '富士森公园',
 location: '东京都八王子市台町2-2',
 startTime: '16:00',
 features: [
 '头上炸裂震撼',
 '近距离观赏',
 '音响效果佳',
 '安全会场',
 '家族同乐'
 ]
 }
 ],

 access: [
 {
 venue: '富士森公园',
 stations: [
 {
 name: 'JR八王子駅南口',
 lines: ['JR中央线', 'JR横浜线', 'JR八高线'],
 walkTime: '徒步约20分钟'
 },
 {
 name: 'JR西八王子駅南口',
 lines: ['JR中央线'],
 walkTime: '徒步约20分钟'
 },
 {
 name: '京王山田駅',
 lines: ['京王高尾线'],
 walkTime: '徒步约15分钟'
 }
 ]
 }
 ],

 viewingSpots: [
 {
 name: '陆上竞技场',
 rating: 5,
 crowdLevel: 'High',
 tips: '16:00开场，最佳观赏位置',
 pros: ['最迫力观赏', '音响效果', '安全环境'],
 cons: ['场所取困难', '回程拥挤']
 },
 {
 name: '慰灵塔广场',
 rating: 4,
 crowdLevel: 'Medium',
 tips: '16:00开场，视野开阔',
 pros: ['视野良好', '相对宽松', '家族适合'],
 cons: ['距离稍远', '震撼感稍弱']
 },
 {
 name: '市民体育馆停车场',
 rating: 4,
 crowdLevel: 'Medium',
 tips: '16:00开场，停车场观赏',
 pros: ['交通便利', '设施完善', '安全管理'],
 cons: ['视角有限', '人数控制']
 }
 ],

 history: {
 established: 1980,
 significance: '八王子市夏季风物诗',
 highlights: [
 '地域密着型花火大会',
 '多摩地区代表花火祭',
 '家族连安心会场',
 '八王子祭一环活动'
 ]
 },

 tips: [
 {
 category: '时间安排',
 items: [
 '建议16:00前到达会场',
 '19:00正式开始',
 '20:15结束，预留返程时间',
 '当日18:00后入园免费'
 ]
 },
 {
 category: '观赏建议',
 items: [
 '携带野餐垫或折叠椅',
 '准备防蚊虫用品',
 '注意垃圾带回',
 '遵守会场指示'
 ]
 },
 {
 category: '安全注意',
 items: [
 '指定场所吸烟',
 '垃圾各自带回',
 '小心看护儿童',
 '注意补充水分'
 ]
 }
 ],

 contact: {
 organizer: '八王子观光会议协会',
 phone: '042-643-3115',
 website: 'https://www.hkc.or.jp/fireworks/',
 socialMedia: 'Instagram @hachioji_hanabi'
 },
 // 官方数据源验证
 officialSource: {
   walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0313e00799/',
   verificationDate: '2025-01-13',
   dataConfirmedBy: 'USER_PROVIDED' as const,
   lastChecked: '2025-01-13'
 },

 mapInfo: {
 hasMap: true,
 mapNote: '富士森公园会场，多站点接驳',
 parking: '× 无停车场（请利用公共交通）'
 },

 weatherInfo: {
 month: '7月',
 temperature: '夏季东京气候',
 humidity: '较高',
 rainfall: '梅雨季末期',
 recommendation: '出发前确认天气',
 rainPolicy: '荒天中止',
 note: '最新信息请查看官方网站'
 },

 specialFeatures: {
 scale: '约4,000发花火',
 location: '富士森公园',
 tradition: '八王子夏季风物诗',
 atmosphere: '9万人地域花火盛典'
 },

 mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.5!2d139.3397!3d35.6581!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z5a-M5aOr5qOu5YWs5ZyS!5e0!3m2!1sja!2sjp!4v1635724800000!5m2!1sja!2sjp'
}; 