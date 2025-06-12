import { HanabiData } from '@/types/hanabi';

export const koshigayaHanabiData: HanabiData = {
 id: 'koshigaya-2025',
 name: '越谷花火大会',
  japaneseName: '越谷花火大会',
 englishName: 'Koshigaya Fireworks Festival',
 year: 2025,
 date: '2025年7月26日(土)',
 time: '19:00～21:00',
 duration: '约2小时',
 fireworksCount: '约5000发',
 expectedVisitors: '约27万人',
 weather: '夏季温暖',
 ticketPrice: '免费观赏',
 status: '开催预定',
 themeColor: '#1E3A8A',
 month: 7,

 tags: {
 timeTag: '7月',
 regionTag: '埼玉',
 typeTag: '花火',
 layerTag: '详细介绍'
 
  },

 history: {
 established: 1978,
 significance: '水乡越谷的夏季传统花火大会',
 highlights: [
 '埼玉县参观人数最多的花火大会',
 '葛西用水中土手的绝佳水边环境',
 '川面倒影与花火的幻想演出',
 '水乡风情与现代花火技术的完美结合'
 ]
 },

 venues: [
 {
 name: '越谷市中央市民会馆葛西用水中土手',
 location: '埼玉县越谷市',
 startTime: '19:00',
 features: [
 '水边观赏环境',
 '川面倒影效果',
 '屋台丰富',
 '交通便利'
 ]
 }
 ],

 access: [
 {
 venue: '越谷市中央市民会馆葛西用水中土手',
 stations: [
 {
 name: '越谷站',
 lines: ['东武铁道越谷线'],
 walkTime: '步行6分钟'
 }
 ]
 }
 ],

 viewingSpots: [
 {
 name: '葛西用水中土手',
 rating: 5,
 crowdLevel: '非常拥挤',
 tips: '建议15:00前到达占位，携带折叠椅或垫子',
 pros: ['水边观赏的最佳位置', '可欣赏花火在川面的倒影', '主会场视野开阔'],
 cons: ['人群非常拥挤', '需要很早到达占位', '返程时拥堵严重']
 },
 {
 name: '越谷站周边',
 rating: 3,
 crowdLevel: '拥挤',
 tips: '适合携带儿童的家庭，避开最拥挤的主会场',
 pros: ['距离车站近', '人群相对较少', '适合家庭观赏'],
 cons: ['距离会场较远', '观赏效果一般', '可能有建筑物遮挡']
 },
 {
 name: '市民会馆周边',
 rating: 4,
 crowdLevel: '拥挤',
 tips: '注意不要妨碍交通，选择安全的观赏位置',
 pros: ['可以较好观赏花火全景', '有一定的观赏距离', '相对安全'],
 cons: ['需要注意交通安全', '可能有视线遮挡', '需要早到占位']
 }
 ],

 tips: [
 {
 category: '交通指南',
 items: [
 '强烈建议使用公共交通，17:00-21:30有交通管制',
 '越谷站是最近车站，步行仅6分钟',
 '避免开车前往，停车场非常有限',
 '返程时请耐心等待，车站会非常拥挤'
 ]
 },
 {
 category: '观赏攻略',
 items: [
 '约5000发花火包括彩色斯塔麦恩和大玉花火',
 '川面倒影是最大看点，选择水边观赏位置',
 '花火从葛西用水中州打上，视野开阔',
 '小雨天气仍会开催，大雨天气中止'
 ]
 },
 {
 category: '现场体验',
 items: [
 '屋台丰富，可品尝各种祭典美食',
 '建议携带折叠椅、垫子、饮料',
 '现场有临时厕所，但排队时间较长',
 '注意防蚊虫，夏季水边蚊虫较多'
 ]
 }
 ],

 contact: {
 organizer: '越谷市观光协会',
 phone: '048-971-9002',
 website: 'https://www.koshigaya-sightseeing.jp/',
 socialMedia: ''
 },
 // 官方数据源验证
 officialSource: {
   walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0311e00801/',
   verificationDate: '2025-01-13',
   dataConfirmedBy: 'USER_PROVIDED' as const,
    lastChecked: '2025-01-13'
 },

 mapInfo: {
 hasMap: true,
 mapNote: '会场位于葛西用水中土手，交通便利',
 parking: '停车场有限，建议使用公共交通'
 },

 weatherInfo: {
 month: '7月',
 temperature: '最高30℃/最低20℃',
 humidity: '约70%',
 rainfall: '夏季偶有阵雨',
 recommendation: '携带防暑用品和雨具',
 rainPolicy: '小雨开催，大雨中止'
 },

 mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3234.0123456789!2d139.7123456!3d35.8834567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018c3a1234567%3A0x1234567890abcdef!2s%E8%B6%8A%E8%B0%B7%E5%B8%82%E4%B8%AD%E5%A4%AE%E5%B8%82%E6%B0%91%E4%BC%9A%E9%A4%A8!5e0!3m2!1sja!2sjp!4v1234567890123!5m2!1sja!2sjp',

 media: [
 {
 type: 'image',
 url: '/images/hanabi-placeholder.jpg',
 title: '越谷花火大会夜空绽放',
 description: '约5000发花火照亮越谷夜空，川面倒影更添幻想色彩'
 }
 ],

 related: {
 regionRecommendations: [
 {
 id: 'iruma-base-2025',
 name: '入间基地纳凉祭',
 date: '2025年7月23日',
 location: '狭山市',
 visitors: '4万2000人',
 link: '/july/hanabi/saitama/iruma-base-2025'
 },
 {
 id: 'ogawa-tanabata-2025',
 name: '小川町七夕祭花火大会',
 date: '2025年7月26日',
 location: '小川町',
 visitors: '约9万人',
 link: '/july/hanabi/saitama/ogawa-tanabata-2025'
 }
 ],
 timeRecommendations: [
 {
 id: 'saitama-yamato-2025',
 name: '埼玉市花火大会大和田公园会场',
 date: '2025年7月27日',
 location: '埼玉市',
 visitors: '约10万人',
 link: '/july/hanabi/saitama/saitama-yamato-2025'
 }
 ]
 }
}; 