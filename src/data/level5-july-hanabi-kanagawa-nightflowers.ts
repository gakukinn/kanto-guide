import { HanabiData } from '../types/hanabi';

export const nightflowersData: HanabiData = {
 id: 'nightflowers',
 name: '横滨夜间花火2025',
  japaneseName: 'よこはま夜景×HANABI 2025',

 englishName: 'Yokohama Night Flowers 2025',
  title: '横滨夜间花火2025 - 7月神奈川花火大会',
  description: '横滨夜间花火2025详情信息，包含举办时间、地点、交通方式、观赏攻略等完整信息。',
 year: 2025,
 date: '2025年7月5日、12日、8月10日、9月6日、14日等',
 time: '短时间花火',
 duration: '约5-10分钟',
 fireworksCount: '约150发',
 expectedVisitors: '观赏人数未公开',
 weather: '小雨举行（恶劣天气取消）',
 ticketPrice: '观赏免费（入园费另计）',
 status: '每月定期开催',
 themeColor: 'blue',
 month: 7,

 // 标签系统
 tags: {
 timeTag: '7月',
 regionTag: '神奈川',
 typeTag: '花火',
 layerTag: '详细介绍'
 
  },

 // 关联推荐
 related: {
 regionRecommendations: [
 {
 id: 'kamakura',
 name: '镰仓花火大会',
 date: '2025年7月18日',
 location: '由比之滨海岸',
 visitors: '16万人',
 link: '/july/hanabi/kanagawa/kamakura'
 },
 {
 id: 'seaparadise',
 name: '八景岛花火交响曲',
 date: '2025年7月19日',
 location: '八景岛海洋天堂',
 visitors: '非公开',
 link: '/july/hanabi/kanagawa/seaparadise'
 }
 ],
 timeRecommendations: [
 {
 id: 'kamakura',
 name: '镰仓花火大会',
 date: '2025年7月18日',
 location: '由比之滨海岸',
 visitors: '16万人',
 link: '/july/hanabi/kanagawa/kamakura'
 }
 ]
 },

 venues: [
 {
 name: '横滨港新港码头会场',
 location: '横滨港新港码头',
 startTime: '时间不定',
 features: [
 '每月定期开催',
 '短时间精彩',
 '港口夜景背景',
 '红砖仓库景观'
 ]
 },
 {
 name: '大栈桥会场',
 location: '大栈桥国际客船码头',
 startTime: '时间不定',
 features: [
 '最佳观赏位置',
 '港口全景',
 '港未来夜景',
 '横滨地标建筑'
 ]
 }
 ],

 access: [
 {
 venue: '新港码头',
 stations: [
 { 
 name: '港未来線馬車道駅', 
 lines: ['港未来線'], 
 walkTime: '徒步约10分钟' 
 },
 { 
 name: 'JR关内駅', 
 lines: ['JR根岸線', 'JR东海道本線'], 
 walkTime: '徒步约15分钟' 
 }
 ]
 },
 {
 venue: '大栈桥',
 stations: [
 { 
 name: '港未来線日本大通駅', 
 lines: ['港未来線'], 
 walkTime: '徒步约5分钟' 
 }
 ]
 }
 ],

 viewingSpots: [
 {
 name: '大栈桥国际客船码头',
 rating: 5,
 crowdLevel: 'Medium',
 tips: '最佳观赏位置，360度港口全景',
 pros: ['最佳视野', '免费观赏', '交通便利', '夜景绝佳'],
 cons: ['人流较多', '需要早到占位']
 },
 {
 name: '红砖仓库周边',
 rating: 4,
 crowdLevel: 'Medium', 
 tips: '历史建筑与花火的完美结合',
 pros: ['历史氛围', '拍照效果好', '周边设施完善'],
 cons: ['距离稍远', '角度有限']
 },
 {
 name: '宇宙世界摩天轮周边',
 rating: 4,
 crowdLevel: 'Low',
 tips: '可拍摄摩天轮与花火的组合美景',
 pros: ['独特角度', '人流较少', '地标建筑'],
 cons: ['距离较远', '花火相对较小']
 }
 ],

 history: {
 established: 2025,
 significance: '横滨港年间定期开催的新型花火企划',
 highlights: [
 '每月定期开催的新尝试',
 '短时间集中的精彩演出',
 '港口城市横滨的新名片',
 '与横滨夜景完美融合'
 ]
 },

 tips: [
 {
 category: '时间安排',
 items: [
 '每月开催时间不定，需关注官方发布',
 '短时间花火，约5-10分钟',
 '建议提前30分钟到达',
 '观赏后可游览横滨夜景'
 ]
 },
 {
 category: '必备物品',
 items: [
 '轻便椅子或站立观赏',
 '相机充满电（夜景拍摄）',
 '外套（海风较大）',
 '饮用水和小食'
 ]
 },
 {
 category: '观赏建议',
 items: [
 '大栈桥是最佳观赏位置',
 '可与横滨观光结合',
 '适合情侣约会',
 '拍摄港口夜景与花火组合'
 ]
 },
 {
 category: '交通贴士',
 items: [
 '港未来線最为便利',
 '各会场间距离不远可步行',
 '观赏后可顺便游览横滨夜景',
 '末班车时间充裕'
 ]
 }
 ],

 contact: {
 organizer: '横滨市',
 phone: '045-671-2111',
 website: 'https://www.city.yokohama.lg.jp/',
 socialMedia: '@yokohama_city'
 },
 // 官方数据源验证
 dataSourceUrl: 'https://hanabi.walkerplus.com/detail/ar0312e00786/',

 mapInfo: {
 hasMap: true,
 mapNote: '横滨港周边观赏地图',
 parking: '付费停车场，建议使用公共交通'
 },

 weatherInfo: {
   month: '7月',
   temperature: '最高30°C，最低23°C',
   humidity: '80%',
   rainfall: '小雨举行，恶劣天气可能取消',
   recommendation: '海风较大，建议携带外套',
   rainPolicy: '小雨举行，恶劣天气可能取消',
   note: '具体开催信息请关注官方网站'
 },

 specialFeatures: {
 scale: '约150发的精致规模',
 location: '横滨港的绝佳夜景背景',
 tradition: '每月定期开催的新企划',
 atmosphere: '短时间集中的都市花火体验'
 },

 mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3250.2!2d139.62!3d35.45!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60185c0c0c0c0c0c%3A0x0c0c0c0c0c0c0c0c!2z56We5aWI5bed55yM!5e0!3m2!1sja!2sjp!4v1600000000000!5m2!1sja!2sjp"
}; 