import { HanabiData } from '@/types/hanabi';

export const higashimatsuyamaHanabiData: HanabiData = {
 id: 'higashimatsuyama-hanabi-2025',
 name: '第26回东松山花火大会',
  japaneseName: '第26回 ひがしまつやま花火大会',
 englishName: '26th Higashimatsuyama Fireworks Festival',
 year: 2025,
 date: '2025年8月23日',
 time: '19:00～20:30',
 duration: '约90分钟',
 fireworksCount: '约5000发',
 expectedVisitors: '约6万人',
 weather: '晴朗',
 ticketPrice: '免费入场（部分有料席）',
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
 name: '都幾川河边公园',
 location: '埼玉县东松山市',
 startTime: '19:00',
 features: [
 '台风复兴重生的象征',
 '市民参与型花火大会',
 '全席门票制管理',
 '近距离迫力花火体验'
 ]
 }
 ],

 // 交通信息
 access: [
 {
 venue: '都幾川河边公园',
 stations: [
 {
 name: '高坂站',
 lines: ['东武东上线'],
 walkTime: '步行15分钟'
 }
 ]
 }
 ],

 // 观赏点
 viewingSpots: [
 {
 name: '都幾川河边公园主会场',
 rating: 5,
 crowdLevel: '非常拥挤',
 tips: '最佳观赏位置，采用全席门票制',
 pros: ['正面观赏花火', '近距离迫力体验', '设施完善'],
 cons: ['需要购票', '人群密集']
 },
 {
 name: '万力大桥周边',
 rating: 3,
 crowdLevel: '拥挤',
 tips: '免费观赏区域，视野开阔',
 pros: ['免费观赏', '全景视野'],
 cons: ['距离较远', '需早到占位']
 }
 ],

 // 历史信息
 history: {
 established: 1999,
 significance: '2019年台风19号水害复兴重生的象征，市民参与型花火大会',
 highlights: [
 '第26回开催的历史传统',
 '台风复兴主题"复活!!～绊之花火～"',
 '5年年来开催的市民期待',
 '都幾川河畔的夏日风物诗'
 ]
 },

 // 实用建议
 tips: [
 {
 category: '观赏建议',
 items: [
 '采用全席门票制，建议提前购买门票',
 '打上场所与会场距离近，可体验大迫力花火',
 '音乐付花火等特色演出，90分钟持续精彩',
 '注意河川安全，遵守安全指导'
 ]
 },
 {
 category: '交通建议',
 items: [
 '东武东上线高坂站最便利',
 '无专用停车场，建议公共交通',
 '会场周边交通管制，提前规划路线'
 ]
 }
 ],

 // 联系信息
 contact: {
 organizer: '东松山市观光协会',
 phone: '0493-23-3344',
 website: 'https://www.higashimatsuyama-kanko.com/',
 socialMedia: '@higashimatsuyama_kanko'
 },

 // 地图信息
 mapInfo: {
 hasMap: true,
 mapNote: '都幾川河边公园，东武东上线高坂站步行15分钟',
 parking: '无专用停车场，建议使用公共交通'
 },

 // 天气信息
 weatherInfo: {
 month: '8月',
 temperature: '最高32°C 最低24°C',
 humidity: '70-80%',
 rainfall: '夏季雷雨可能',
 recommendation: '夏日观赏建议穿着轻便服装，准备防蚊用品',
 rainPolicy: '小雨决行，荒天时中止',
 note: '河边较凉爽，但蚊虫较多'
 },

 // 特色功能
 specialFeatures: {
 scale: '约5000发花火，90分钟演出',
 location: '都幾川河边公园近距离观赏',
 tradition: '台风复兴重生的象征活动',
 atmosphere: '约6万人参加的市民参与型花火大会',
 collaboration: '音乐花火与星地雷花火的完美结合'
 },

 // 2025年特色
 special2025: {
 theme: '复活!!～绊之花火～',
 concept: '台风复兴重生的象征',
 memorial: '第26回开催纪念',
 features: [
 '2019年台风19号水害复兴活动',
 '5年年来开催的市民期待',
 '全席门票制的秩序管理',
 '近距离迫力花火震撼体验',
 '音乐付花火等特色演出'
 ]
 },

 // 地图嵌入URL
 mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3227.8234567890123!2d139.3827814!3d35.9154578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018e1234567890a%3A0x1234567890abcdef!2z6YO95bep5bed44Oq44OQ44O844K144Kk44OJ44OR44O844Kv!5e0!3m2!1sja!2sjp!4v1609459200000!5m2!1sja!2sjp',

 // 媒体内容
 media: [
 {
 type: 'image' as const,
 url: '/images/hanabi/tamura-fireworks-main.svg',
 title: '第26回东松山花火大会',
 description: '台风复兴重生的象征，都幾川河畔的迫力花火盛典'
 }
 ],

 // 关联推荐
 related: {
 regionRecommendations: [
 {
 id: 'ina-august',
 name: '2025伊奈祭',
 date: '2025年8月23日',
 location: '伊奈町制施行记念公园',
 visitors: '4万人',
 link: '/august/hanabi/saitama/ina'
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
 id: 'todabashi-august',
 name: '戸田桥花火大会',
 date: '2025年8月2日',
 location: '荒川河川敷',
 visitors: '45万人',
 link: '/august/hanabi/saitama/todabashi'
 }
 ]
 }
}; 