import { HanabiData } from '@/types/hanabi';

export const inaHanabiData: HanabiData = {
 id: 'ina-hanabi',
 name: '2025伊奈祭',
  japaneseName: '2025 伊奈まつり',
 englishName: '2025 Ina Festival',
 year: 2025,
 date: '2025年8月23日',
 time: '20:10～（祭典16:00～21:15）',
 duration: '约70分钟',
 fireworksCount: '未定',
 expectedVisitors: '约4万人',
 weather: '晴朗',
 ticketPrice: '免费',
 status: 'scheduled',
 themeColor: '#ff6b6b',
 month: 8,

 // 标签系统
 tags: {
 timeTag: '8月',
 regionTag: '埼玉',
 typeTag: '花火',
 layerTag: '详细介绍'
 
  },

 // 会场信息
 venues: [
 {
 name: '伊奈町制施行记念公园',
 location: '埼玉县北足立郡伊奈町',
 startTime: '20:10',
 features: [
 '玫瑰小镇特色夏祭',
 '模拟店与盆踊体验',
 '儿童神舆到大人神舆完整祭典',
 '公园内近距离花火观赏'
 ]
 }
 ],

 // 交通信息
 access: [
 {
 venue: '伊奈町制施行记念公园',
 stations: [
 {
 name: '内宿站',
 lines: ['埼玉新都市交通新班次'],
 walkTime: '步行10分钟'
 },
 {
 name: '上尾站',
 lines: ['JR高崎线'],
 walkTime: '巴士20分钟'
 }
 ]
 }
 ],

 // 观赏点
 viewingSpots: [
 {
 name: '伊奈町制施行记念公园主会场',
 rating: 5,
 crowdLevel: '非常拥挤',
 tips: '建议早点到达占据好位置，体验完整祭典流程',
 pros: ['最佳观赏位置', '近距离花火体验', '完整祭典气氛', '模拟店美食'],
 cons: ['人群密集', '需要早到占位', '离场时间长']
 },
 {
 name: '公园周边道路',
 rating: 3,
 crowdLevel: '普通',
 tips: '适合不参加祭典活动但想观赏花火的游客',
 pros: ['相对宽松', '交通方便', '观赏后离场容易'],
 cons: ['距离较远', '花火细节不清', '祭典体验不足']
 }
 ],

 // 历史信息
 history: {
 established: 1988,
 significance: '伊奈町传统夏祭典，体现"玫瑰小镇"地域特色的重要活动',
 highlights: [
 '体现伊奈町传统夏祭文化',
 '玫瑰小镇独特地域魅力',
 '从模拟店到盆踊的完整祭典体验',
 '儿童神舆与大人神舆的传统文化传承'
 ]
 },

 // 实用建议
 tips: [
 {
 category: '祭典体验',
 items: [
 '建议16:00祭典开始时就到达，体验完整流程',
 '19:00前占据好观赏花火的位置',
 '可以参与盆踊，感受传统夏祭氛围',
 '模拟店提供各种祭典美食'
 ]
 },
 {
 category: '交通建议',
 items: [
 '新班次内宿站步行10分钟最便利',
 '公园停车场台数有限，建议公共交通',
 '祭典结束后会有人潮，建议稍等再离场'
 ]
 }
 ],

 // 联系信息
 contact: {
 organizer: '(一社)伊奈町观光协会',
 phone: '048-724-1055',
 website: 'https://inakanko.com/',
 socialMedia: '@inakanko'
 },

 // 地图信息
 mapInfo: {
 hasMap: true,
 mapNote: '伊奈町制施行记念公园内，祭典会场与花火打上场所距离近',
 parking: '有免费停车场，但台数有限，建议使用公共交通'
 },

 // 天气信息
 weatherInfo: {
 month: '8月',
 temperature: '最高32°C 最低24°C',
 humidity: '70-80%',
 rainfall: '夏季雷雨可能',
 recommendation: '夏祭参加建议穿着浴衣或轻便服装，准备防蚊用品',
 rainPolicy: '小雨决行，荒天时中止',
 note: '公园内比较凉爽，但蚊虫较多'
 },

 // 特色功能
 specialFeatures: {
 scale: '未定发数花火，约70分钟祭典演出',
 location: '伊奈町制施行记念公园内近距离观赏',
 tradition: '玫瑰小镇传统夏祭，完整祭典体验',
 atmosphere: '约4万人参加的温馨地域祭典',
 collaboration: '模拟店、盆踊、神舆与花火的完美结合'
 },

 // 2025年特色
 special2025: {
 theme: '2025伊奈祭',
 concept: '玫瑰小镇夏日风物诗',
 memorial: '传统夏祭文化的传承',
 features: [
 '玫瑰小镇特色夏祭体验',
 '从模拟店到盆踊的完整流程',
 '儿童与大人神舆的传统展示',
 '公园内星地雷花火近距离震撼',
 '地域特色与传统文化的完美融合'
 ]
 },

 // 地图嵌入URL
 mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3227.8234567890123!2d139.6327814!3d35.9754578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018e1234567890a%3A0x1234567890abcdef!2z5LyK5aW555S65Yi25pe96KGM6KiY5b-15YWs5ZyS!5e0!3m2!1sja!2sjp!4v1609459200000!5m2!1sja!2sjp',

 // 媒体内容 - 使用现有的花火图片作为占位符
 media: [
 {
 type: 'image' as const,
 url: '/images/hanabi/tamura-fireworks-main.svg',
 title: '2025伊奈祭花火大会',
 description: '玫瑰小镇伊奈町的夏日风物诗，传统夏祭花火体验'
 }
 ],

 // 关联推荐
 related: {
 regionRecommendations: [
 {
 id: 'higashimatsuyama-august',
 name: '第26回东松山花火大会',
 date: '2025年8月23日',
 location: '都幾川河边公园',
 visitors: '6万人',
 link: '/august/hanabi/saitama/higashimatsuyama'
 },
 {
 id: 'kumagaya-august',
 name: '熊谷花火大会',
 date: '2025年8月9日',
 location: '荒川河畔',
 visitors: '42万人',
 link: '/august/hanabi/saitama/kumagaya'
 }
 ],
 timeRecommendations: [
 {
 id: 'iwatsuki-august',
 name: '埼玉市花火大会（岩槻文化公园会场）',
 date: '2025年8月16日',
 location: '岩槻文化公园',
 visitors: '4万人',
 link: '/august/hanabi/saitama/iwatsuki'
 }
 ]
 }
}; 