/**
 * 第五层数据文件 - 第59回葛饰纳凉花火大会数据
 * @layer 五层 (Detail Layer)
 * @month 7月
 * @region 东京
 * @event 第59回葛饰纳凉花火大会
 * @type 花火详情数据
 * @source Walker Plus官方数据
 * @description 包含完整的花火详细信息：基本信息、会场信息、交通指南、观赏攻略等
 */
import { HanabiData } from '@/types/hanabi';

export const katsushikaNoryoHanabiData: HanabiData = {
 id: 'katsushika-noryo-hanabi',
 name: '第59回葛饰纳凉花火大会',
  japaneseName: '第59回 葛飾納涼花火大会',
 englishName: 'The 59th Katsushika Noryo Fireworks Festival',
 year: 2025,
 date: '2025年7月22日(火)',
 time: '19:20开场，19:30花火开始',
 duration: '约1小时',
 fireworksCount: '约1万5000发',
 expectedVisitors: '约77万人',
 weather: '夏季温暖',
 ticketPrice: '有料席另行收费',
 status: '开催预定',
 themeColor: '#FF6B6B',
 month: 7,
 
 tags: {
 timeTag: '7月',
 regionTag: '东京',
 typeTag: '花火',
 layerTag: '详细介绍'
 
  },

 history: {
 established: 1967,
 significance: '下町情怀深厚的夏季花火传统',
 highlights: [
 '半世纪以上历史的传统花火大会',
 '葛饰区代表性夏季活动',
 '下町文化与花火艺术的完美结合',
 '每年吸引约77万观众的人气大会'
 ]
 },

 venues: [
 {
 name: '葛饰区柴又野球场',
 location: '东京都葛饰区柴又7丁目(江户川河川敷)',
 startTime: '19:20开场，19:30花火开始',
 features: [
 '观览席距离打上场所非常近',
 '观览席距离花火仅100米',
 '音响与花火完美同步',
 '下町柴又的特色氛围'
 ]
 }
 ],

 access: [
 {
 venue: '葛饰区柴又野球场',
 stations: [
 {
 name: '京成电铁柴又站',
 lines: ['京成金町线'],
 walkTime: '步行约10分钟'
 },
 {
 name: '北总铁道新柴又站',
 lines: ['北总线'],
 walkTime: '步行约15分钟'
 },
 {
 name: 'JR金町站',
 lines: ['JR常磐线'],
 walkTime: '步行约20分钟'
 },
 {
 name: '京成电铁金町站',
 lines: ['京成金町线'],
 walkTime: '步行约20分钟'
 }
 ]
 }
 ],

 viewingSpots: [
 {
 name: '有料席观赏区',
 rating: 5,
 crowdLevel: '高',
 tips: '预约平面椅席，近距离观赏花火迫力',
 pros: ['距离最近观赏', '座位保证', '最佳视野角度'],
 cons: ['需要预约', '费用较高']
 },
 {
 name: '江户川河川敷',
 rating: 4,
 crowdLevel: '非常高',
 tips: '免费观赏区域，建议早到占位',
 pros: ['免费观赏', '开放感十足', '可携带野餐垫'],
 cons: ['人流密集', '视野可能受限', '需早到占位']
 },
 {
 name: '柴又帝释天参道',
 rating: 3,
 crowdLevel: '高',
 tips: '可以体验下町风情后观赏花火',
 pros: ['下町文化体验', '美食丰富', '交通便利'],
 cons: ['距离较远', '视野一般', '人流拥挤']
 }
 ],

 tips: [
 {
 category: '交通建议',
 items: [
 '建议乘坐京成电铁柴又站最为便利',
 '当日会场周边非常拥挤，请预留充足时间',
 'IC乘车券建议事前充值避免排队',
 '散场时请耐心等待，避免拥挤'
 ]
 },
 {
 category: '观赏攻略',
 items: [
 '平面椅席：最佳观赏体验，需要预约',
 '河川敷免费区：建议16:00前到达占位',
 '有料席分为多个区域，C区块性价比较高',
 '花火开始前可先游览柴又帝释天'
 ]
 },
 {
 category: '便民设施',
 items: [
 '会场内设有临时厕所',
 '柴又站周边有便利店和餐厅',
 '会场内严禁吸烟和饮酒',
 '垃圾请带回家，保护环境'
 ]
 }
 ],

 mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.567890123456!2d139.8631!3d35.7558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188c2eb3b3b3b3%3A0x1234567890abcdef!2z6JGJ6aWzIOaftOWPiOmHjeuQgOWgtA!5e0!3m2!1sja!2sjp!4v1234567890123',

 media: [
 {
 type: 'image',
 url: 'https://images.unsplash.com/photo-1533671978801-8959e8ebc9e9?w=800&h=800&fit=crop&crop=center&auto=format&q=80',
 title: '第59回葛饰纳凉花火大会精彩瞬间',
 description: '无数的光芒覆盖夜空，迫力满点的压轴花火展现江户川河川敷的绚烂夏夜'
 }
 ],

 contact: {
 organizer: '葛饰纳凉花火大会实行委员会',
 phone: '03-6758-2222',
 website: 'https://www.city.katsushika.lg.jp/',
 socialMedia: '@katsuhanabi'
 },
 // 官方数据源验证
 officialSource: {
   walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0313e00795/',
   verificationDate: '2025-01-13',
   dataConfirmedBy: 'USER_PROVIDED' as const,
    lastChecked: '2025-01-13'
 },

 mapInfo: {
 hasMap: true,
 mapNote: '会场位于江户川河川敷，柴又野球场内及周边区域',
 parking: '会场周边无停车场，建议使用公共交通'
 },

 weatherInfo: {
 month: '7月',
 temperature: '26°C～32°C',
 humidity: '70%',
 rainfall: '低',
 recommendation: '建议携带防蚊虫用品和饮用水'
 },

 related: {
 regionRecommendations: [
 {
 id: 'tokyo-keibajo-hanabi',
 name: '东京竞马场花火2025',
 date: '2025年7月2日',
 location: 'JRA东京竞马场',
 visitors: '非公表',
 link: '/july/hanabi/tokyo/keibajo'
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