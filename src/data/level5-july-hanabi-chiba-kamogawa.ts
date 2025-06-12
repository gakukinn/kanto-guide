import { HanabiData } from '../types/hanabi';

export const kamogawaData: HanabiData = {
 id: 'kamogawa',
 name: '鴨川市民花火大会',
  japaneseName: '鴨川市民花火大会',

 englishName: 'Kamogawa Citizens Fireworks Festival',
  title: '鴨川市民花火大会 - 7月千叶花火大会',
  description: '鴨川市民花火大会详情信息，包含举办时间、地点、交通方式、观赏攻略等完整信息。',
 year: 2025,
 date: '2025年7月29日(火)',
 time: '19:30～20:15',
 duration: '45分钟',
 fireworksCount: '约1500発',
 expectedVisitors: '4万人',
 weather: '小雨举行（恶劣天气延期）',
 ticketPrice: '免费观赏',
 status: '已确认举办',
 themeColor: 'blue',
 month: 7,

 // 标签系统
 tags: {
 timeTag: '7月',
 regionTag: '千叶',
 typeTag: '花火',
 layerTag: '详细介绍'
 
  },

 // 关联推荐 - 双维度轮回设计
 related: {
 regionRecommendations: [
 {
 id: 'shirahama',
 name: '南房総白浜海女祭典',
 date: '7月19-20日',
 location: '白浜野島埼灯台前',
 visitors: '2万5000人',
 link: '/july/hanabi/chiba/shirahama'
 },
 {
 id: 'futtsu',
 name: '富津市民花火大会',
 date: '2025年7月26日',
 location: '富津海水浴场',
 visitors: '5万人',
 link: '/july/hanabi/chiba/futtsu'
 },
 {
 id: 'oamishirasato',
 name: '大网白里花火',
 date: '2025年7月26日',
 location: '白里海水浴场',
 visitors: '2万8000人',
 link: '/july/hanabi/chiba/oamishirasato'
 }
 ],
 timeRecommendations: [
 {
 id: 'adachi',
 name: '足立的花火',
 date: '2025年7月19日',
 location: '荒川河川敷',
 visitors: '60万人',
 link: '/july/hanabi/tokyo/adachi'
 },
 {
 id: 'sumida',
 name: '隅田川花火大会',
 date: '2025年7月26日',
 location: '隅田川',
 visitors: '91万人',
 link: '/july/hanabi/tokyo/sumida'
 },
 {
 id: 'shirahama',
 name: '南房総白浜海女祭典',
 date: '7月19-20日',
 location: '白浜野島埼灯台前',
 visitors: '2万5000人',
 link: '/july/hanabi/chiba/shirahama'
 }
 ]
 },

 venues: [
 {
 name: '前原横渚海岸',
 location: '鴨川市前原',
 startTime: '19:30',
 features: [
 '日本的渚100選的美海岸',
 '房総半島的絶景地点',
 '約1500発的花火壮观',
 '鴨川海洋世界近的好立地'
 ]
 }
 ],

 access: [
 {
 venue: '前原横渚海岸',
 stations: [
 { 
 name: 'JR安房鴨川駅', 
 lines: ['JR外房線'], 
 walkTime: '徒歩約10分' 
 }
 ]
 }
 ],

 viewingSpots: [
 {
 name: '前原横渚海岸主要会場',
 rating: 5,
 crowdLevel: 'High',
 tips: '日本的渚100選選美海岸',
 pros: ['絶景地点', '駅从近', '設備充実'],
 cons: ['混雑激', '駐車場確保困難', '風的影響']
 },
 {
 name: '鴨川海洋世界周辺',
 rating: 4,
 crowdLevel: 'Medium',
 tips: '海洋世界的帰花火也楽',
 pros: ['観光和套装', '比較的空', '交通良好'],
 cons: ['花火斜从', '和和距離', '施設利用制限']
 },
 {
 name: '前原海岸北側',
 rating: 4,
 crowdLevel: 'Low',
 tips: '地元的人知穴場地点',
 pros: ['人少', '落着観賞', '駐車和'],
 cons: ['花火遠', '設備不足', '夜間的安全性']
 }
 ],

 history: {
 established: 1980,
 significance: '房総半島的美海岸開催鴨川的夏祭',
 highlights: [
 '45年的歴史持伝統的花火大会',
 '日本的渚100選的絶景会場',
 '鴨川観光的夏的亮点',
 '房総半島的海岸美和花火的融合'
 ]
 },

 tips: [
 {
 category: '時間安排',
 items: [
 '鴨川海洋世界和套装楽',
 '45分間的紧凑構成',
 '火曜日開催的平日的特別感',
 '駅从近的電車利用'
 ]
 },
 {
 category: '必備物品',
 items: [
 '野餐垫',
 '防風対策（海風強）',
 '虫除喷雾',
 '飲物',
 '懐中電灯'
 ]
 },
 {
 category: '观赏建议',
 items: [
 '日本的渚100選的美堪能',
 '房総半島的海岸線背景花火',
 '鴨川観光和合楽',
 '比較的紧凑規模親和'
 ]
 },
 {
 category: '交通攻略',
 items: [
 'JR外房線安房鴨川駅利用',
 '徒歩10分的好交通',
 '車的場合叶子早的到着必須',
 '鴨川市内宿泊也'
 ]
 }
 ],

 contact: {
 organizer: '鴨川市観光協会',
 phone: '04-7092-0086',
 website: 'https://www.kamogawa-kanko.com/',
 socialMedia: '鴨川市観光協会SNS'
 },
 // 官方数据源验证
 dataSourceUrl: 'https://hanabi.walkerplus.com/detail/ar0312e00786/',

 mapInfo: {
 hasMap: true,
 mapNote: '前原横渚海岸',
 parking: '臨時駐車場有（有料）'
 },

 weatherInfo: {
   month: '7月',
   temperature: '最高30°C，最低23°C',
   humidity: '80%',
   rainfall: '小雨决行、恶劣天气延期至翌日',
   recommendation: '海风对策必须，建议携带外套',
   rainPolicy: '小雨决行、恶劣天气延期至翌日',
   note: '海岸因天候变化需注意'
 },

 mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.7!2d140.03!3d35.64!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x602285c9b9d4a2a7%3A0x123456789!2z5Y2D6JGJ55yM!5e0!3m2!1sja!2sjp!4v1600000000000!5m2!1sja!2sjp"
}; 