import { HanabiData } from '@/types/hanabi';

export const seibuEnHanabiData: HanabiData = {
 id: 'seibu-en-2025',
 name: '西武园游乐园大火祭',
  japaneseName: '西武園ゆうえんち大火祭り',
 englishName: 'Seibu-en Amusement Park Great Fire Festival',
 year: 2025,
 month: 7,
 date: '2025年7月19日',
 time: '19:30开始',
 duration: '约7分钟',
 fireworksCount: '非公开',
 expectedVisitors: '非公开',
 weather: '夏季',
 ticketPrice: '需要入园门票',
 status: '2025年确定举办',
 themeColor: 'orange',
 
 tags: {
 timeTag: '7月',
 regionTag: '埼玉',
 typeTag: '花火',
 layerTag: '详细介绍'
 
  },
 
 venues: [
 {
 name: '西武园游乐园',
 location: '埼玉县所泽市',
 startTime: '19:30',
 features: ['游乐设施', '近距离观赏', '音乐同步', '主题公园体验']
 }
 ],
 
 access: [
 {
 venue: '西武园游乐园',
 stations: [
 {
 name: '西武山口线西武园游乐园站',
 lines: ['西武山口线'],
 walkTime: '即到'
 }
 ]
 }
 ],
 
 viewingSpots: [
 {
 name: '园内观赏区域',
 rating: 4.9,
 crowdLevel: '高',
 tips: '需要入园门票，享受最近距离的花火体验',
 pros: ['超近距离', '音乐同步', '游乐设施配合', '独特体验'],
 cons: ['需入园费', '人数限制']
 },
 {
 name: '园外观赏点',
 rating: 3.5,
 crowdLevel: '中',
 tips: '可免费观赏，但距离较远效果一般',
 pros: ['免费观赏', '停车方便'],
 cons: ['距离远', '效果有限', '视野受阻']
 }
 ],
 
 history: {
 established: 2020,
 significance: '西武园游乐园的夏季特别企划，结合音乐与花火的创新体验',
 highlights: [
 '日本首创音乐同步花火表演',
 '游乐园内超近距离观赏体验',
 '连续多日开催的夏季花火节',
 '所泽市代表性夏季娱乐活动'
 ]
 },
 
 tips: [
 {
 category: '入园须知',
 items: [
 '需要购买游乐园入园门票',
 '建议提前官网确认开催日程',
 '入园后可享受各种游乐设施',
 '花火表演时间约7分钟，短而精彩'
 ]
 },
 {
 category: '观赏建议',
 items: [
 '园内观赏为最佳体验，超近距离震撼',
 '音乐与花火完美同步，带来沉浸式体验',
 '建议携带防噪音耳塞，声音非常大',
 '可结合游乐设施享受一整天的娱乐'
 ]
 },
 {
 category: '交通便利',
 items: [
 '西武山口线西武园游乐园站直达',
 '有1000台停车位，但建议电车前往',
 '关越道所泽IC约30分钟车程',
 '圈央道入间IC约20分钟车程'
 ]
 },
 {
 category: '特别提醒',
 items: [
 '土日祝及8月11-15日连续开催',
 '荒天可能中止，请关注官网公告',
 '园内有丰富餐饮和购物设施',
 '建议全家参与，适合各年龄层'
 ]
 }
 ],
 
 contact: {
 organizer: '西武园游乐园',
 phone: '04-2929-5354',
 website: 'https://www.seibu-leisure.co.jp/amusementpark/',
 socialMedia: '@seibuenyuuenchi'
 },
 // 官方数据源验证
 officialSource: {
   walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0311e00803/',
   verificationDate: '2025-01-13',
   dataConfirmedBy: 'USER_PROVIDED' as const,
    lastChecked: '2025-01-13'
 },
 
 mapInfo: {
 hasMap: true,
 mapNote: '西武园游乐园内，园区地图可在入园处获取',
 parking: '1000台停车位，汽车2000日元，摩托车500日元'
 },
 
 weatherInfo: {
 month: '7-9月',
 temperature: '25-32℃',
 humidity: '70%',
 rainfall: '夏季雷雨',
 recommendation: '建议携带雨具和防暑用品',
 rainPolicy: '荒天中止，具体信息官网公布'
 },
 
 specialFeatures: {
 scale: '游乐园独有的音乐花火秀',
 location: '日本唯一在游乐园内举办的大规模花火',
 tradition: '现代创新的娱乐体验',
 atmosphere: '音乐与花火的完美融合',
 collaboration: '与游乐设施结合的独特观赏体验'
 },
 
 special2025: {
 theme: '夏夜花火节',
 concept: '音乐与花火的大迫力体验',
 features: [
 '连续开催土日祝及盂兰盆节期间',
 '7分钟超密集花火表演',
 '音乐同步的沉浸式体验',
 '全身感受音响与震动的震撼'
 ]
 },
 
 mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3229.5!2d139.4464!3d35.7608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018c2d4d4d4d4d4%3A0x4d4d4d4d4d4d4d4d!2z6KW_5q2m5ZyS44Om44OX44GI44KT44Gh!5e0!3m2!1sja!2sjp!4v1234567890123',
 
 media: [
 {
 type: 'image',
 url: '/images/hanabi-placeholder.jpg',
 title: '西武园游乐园大火祭',
 description: '音乐与花火同步的震撼表演'
 }
 ],
 
 related: {
 regionRecommendations: [
 {
 id: 'metsza-nordic-2025',
 name: '梅兹塔北欧花火',
 date: '2025年7月12日',
 location: '饭能市',
 visitors: '非公开',
 link: '/july/hanabi/saitama/metsza-nordic-2025'
 }
 ],
 timeRecommendations: [
 {
 id: 'iruma-base-2025',
 name: '入间基地纳凉祭',
 date: '2025年7月23日',
 location: '入间基地',
 visitors: '4万2000人',
 link: '/july/hanabi/saitama/iruma-base-2025'
 }
 ]
 }
}; 