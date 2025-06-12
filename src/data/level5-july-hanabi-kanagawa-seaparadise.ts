import { HanabiData } from '../types/hanabi';

export const seaparadiseData: HanabiData = {
 id: 'seaparadise',
 name: '横滨、八景岛海洋天堂「花火交响曲」',
  japaneseName: '横浜・八景島シーパラダイス「花火シンフォニア」',

 englishName: 'Yokohama Hakkeijima Sea Paradise Fireworks Symphonia',
  title: '横滨、八景岛海洋天堂「花火交响曲」 - 7月神奈川花火大会',
  description: '横滨、八景岛海洋天堂「花火交响曲」详情信息，包含举办时间、地点、交通方式、观赏攻略等完整信息。',
 year: 2025,
 date: '2025年7月19日、20日、26日、8月2日、9日、10日、16日、23日、9月13日、14日',
 time: '音和光的现场娱乐',
 duration: '约20分钟',
 fireworksCount: '约2500发',
 expectedVisitors: '入园者数非公开',
 weather: '小雨举行（恶劣天气取消）',
 ticketPrice: '需要入园费',
 status: '夏季期间定期开催',
 themeColor: 'purple',
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
 id: 'nightflowers',
 name: '横滨夜间花火',
 date: '2025年7月5日',
 location: '横滨港',
 visitors: '未公开',
 link: '/july/hanabi/kanagawa/nightflowers'
 },
 {
 id: 'kamakura',
 name: '镰仓花火大会',
 date: '2025年7月18日',
 location: '由比之滨海岸',
 visitors: '16万人',
 link: '/july/hanabi/kanagawa/kamakura'
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
 name: '八景岛海洋天堂',
 location: '横滨市金泽区八景岛',
 startTime: '夏季夜间',
 features: [
 '音和光的现场娱乐',
 '海洋主题公园背景',
 '多感官花火体验',
 '海岛独特氛围'
 ]
 }
 ],

 access: [
 {
 venue: '八景岛海洋天堂',
 stations: [
 { 
 name: '海滨线八景島駅', 
 lines: ['金沢海滨线'], 
 walkTime: '徒步即达' 
 },
 { 
 name: 'JR新杉田駅', 
 lines: ['JR根岸線', 'JR京浜东北線'], 
 walkTime: '转乘海滨线' 
 },
 { 
 name: '京急金沢八景駅', 
 lines: ['京急本線'], 
 walkTime: '转乘海滨线' 
 }
 ]
 }
 ],

 viewingSpots: [
 {
 name: '八景岛海洋天堂园内',
 rating: 5,
 crowdLevel: 'Controlled',
 tips: '入园者限定的特别花火体验',
 pros: ['独家观赏', '音响效果绝佳', '多感官体验', '海洋氛围'],
 cons: ['需要入园费', '人数有限制']
 },
 {
 name: '八景岛周边海岸',
 rating: 3,
 crowdLevel: 'Low', 
 tips: '免费观赏但距离较远',
 pros: ['免费观赏', '海岸散步', '人流稀少'],
 cons: ['距离很远', '音响效果差', '花火较小']
 }
 ],

 history: {
 established: 1993,
 significance: '日本首个海洋主题公园的创新花火企划',
 highlights: [
 '音和光的创新花火表演',
 '海洋主题公园的独特背景',
 '多感官娱乐体验',
 '家庭友好的花火活动'
 ]
 },

 tips: [
 {
 category: '入园信息',
 items: [
 '需要购买八景岛海洋天堂入园券',
 '花火观赏包含在入园费中',
 '建议提前在线购票',
 '可享受白天的海洋馆设施'
 ]
 },
 {
 category: '时间安排',
 items: [
 '建议全天在八景岛游玩',
 '花火前可游览水族馆',
 '多个开催日可选择',
 '夏季夜间的最佳娱乐'
 ]
 },
 {
 category: '观赏建议',
 items: [
 '园内观赏位置最佳',
 '配合音乐的花火表演',
 '适合亲子家庭观赏',
 '可拍摄海洋主题花火'
 ]
 },
 {
 category: '交通贴士',
 items: [
 '海滨线是唯一交通方式',
 '花火结束后注意电车时间',
 '可考虑在附近住宿',
 '自驾需要预约停车场'
 ]
 }
 ],

 contact: {
 organizer: '横滨、八景岛海洋天堂',
 phone: '045-788-8888',
 website: 'http://www.seaparadise.co.jp/',
 socialMedia: '@seaparadise_official'
 },
 // 官方数据源验证
 dataSourceUrl: 'https://hanabi.walkerplus.com/detail/ar0312e00786/',

 mapInfo: {
 hasMap: true,
 mapNote: '八景岛海洋天堂园内地图',
 parking: '有料停车场（需预约）'
 },

 weatherInfo: {
   month: '7月',
   temperature: '最高30°C，最低23°C',
   humidity: '80%',
   rainfall: '室内外结合，小雨可举行',
   recommendation: '海岛气候，注意海风和温差',
   rainPolicy: '室内外结合，小雨可举行',
   note: '具体开催信息请确认官方网站'
 },

 specialFeatures: {
 scale: '2500发的主题公园规模',
 location: '海洋主题公园的独特背景',
 tradition: '音和光的娱乐花火',
 atmosphere: '家庭友好的海洋主题花火体验'
 },

 mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3250.2!2d139.62!3d35.45!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60185c0c0c0c0c0c%3A0x0c0c0c0c0c0c0c0c!2z56We5aWI5bed55yM!5e0!3m2!1sja!2sjp!4v1600000000000!5m2!1sja!2sjp"
}; 