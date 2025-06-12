import { HanabiData } from '../types/hanabi';

export const marinesData: HanabiData = {
 id: 'marines',
 name: 'MARINES HANABI (海洋队花火)',
  japaneseName: 'マリーンズ花火ナイター',

 englishName: 'Marines Hanabi',
  title: 'MARINES HANABI (海洋队花火) - 7月千叶花火大会',
  description: 'MARINES HANABI (海洋队花火)详情信息，包含举办时间、地点、交通方式、观赏攻略等完整信息。',
 year: 2025,
 date: '2025年7月11日(金)～8月11日(祝)的特定日',
 time: '試合後約20:00～',
 duration: '约20分钟',
 fireworksCount: '300発',
 expectedVisitors: '约3万人',
 weather: '野球開催時同様',
 ticketPrice: '野球観戦券必要',
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
 },
 {
 id: 'kamogawa',
 name: '鸭川市民花火大会',
 date: '2025年7月29日',
 location: '前原横渚海岸',
 visitors: '4万人',
 link: '/july/hanabi/chiba/kamogawa'
 }
 ],
 timeRecommendations: [
 {
 id: 'sumida',
 name: '隅田川花火大会',
 date: '2025年7月26日',
 location: '隅田川',
 visitors: '91万人',
 link: '/july/hanabi/tokyo/sumida'
 },
 {
 id: 'edogawa',
 name: '江戸川花火大会',
 date: '2025年7月26日',
 location: '江戸川河川敷',
 visitors: '90万人',
 link: '/july/hanabi/tokyo/edogawa'
 },
 {
 id: 'motherfarm',
 name: '母亲牧場花火',
 date: '7月26-27日',
 location: '母亲牧場',
 visitors: '未定',
 link: '/july/hanabi/chiba/motherfarm'
 }
 ]
 },

 venues: [
 {
 name: 'ZOZO海洋体育场',
 location: '千葉市美浜区美浜1',
 startTime: '試合後約20:00',
 features: [
 '野球観戦和花火的合作',
 '全垒打級的花火体験',
 '体育场从的特別眺望',
 '海洋队粉丝和的一体感'
 ]
 }
 ],

 access: [
 {
 venue: 'ZOZO海洋体育场',
 stations: [
 { 
 name: 'JR海浜幕張駅', 
 lines: ['JR京葉線'], 
 walkTime: '徒歩約15分' 
 },
 { 
 name: '海浜幕張駅', 
 lines: ['東京地铁東西線（直通）'], 
 walkTime: '徒歩約15分' 
 }
 ]
 }
 ],

 viewingSpots: [
 {
 name: 'ZOZO海洋体育场内野席',
 rating: 5,
 crowdLevel: 'High',
 tips: '野球観戦和花火同時楽特等席',
 pros: ['野球和花火的双重体験', '体育场設備', '一体感抜群'],
 cons: ['票券購入必要', '混雑激', '席比見方差']
 },
 {
 name: 'ZOZO海洋体育场外野席',
 rating: 4,
 crowdLevel: 'Medium',
 tips: '比休闲楽外野席',
 pros: ['比較的安価', '自由雰囲気', '花火角度良好'],
 cons: ['票券必要', '席確保競争', '試合展開左右']
 },
 {
 name: '幕張海浜公園',
 rating: 3,
 crowdLevel: 'Low',
 tips: '体育场外从遠望無料地点',
 pros: ['無料観賞可能', '芝生放松', '駐車場有'],
 cons: ['花火遠', '音聞', '雰囲気欠']
 }
 ],

 history: {
 established: 2010,
 significance: '千葉乐天海洋队的夏的風物詩',
 highlights: [
 '15年的歴史持体育场花火',
 '野球和花火的融合娱乐',
 '千葉的夏的新楽方',
 '全垒打級的演出'
 ]
 },

 tips: [
 {
 category: '時間安排',
 items: [
 '野球観戦票券的事前購入必須',
 '試合終了後的花火的終了時間不定',
 '複数日程从選択可能',
 '帰的電車時刻余裕持'
 ]
 },
 {
 category: '必備物品',
 items: [
 '野球観戦票券',
 '海洋队商品（任意）',
 '応援用具',
 '飲物（体育场内販売有）',
 '相机（撮影规则確認）'
 ]
 },
 {
 category: '观赏建议',
 items: [
 '野球観戦从花火通楽',
 '全垒打級的花火演出注目',
 '海洋队粉丝和的一体感味',
 '体育场叶子的特別感'
 ]
 },
 {
 category: '交通攻略',
 items: [
 'JR京葉線海浜幕張駅利用',
 '試合開催日的混雑想定',
 '花火終了後的帰宅高峰注意',
 '幕張区域観光和套装也可能'
 ]
 }
 ],

 contact: {
 organizer: '千葉乐天海洋队',
 phone: '03-5682-6341',
 website: 'https://www.marines.co.jp/',
 socialMedia: '海洋队公式SNS'
 },
 // 官方数据源验证
 dataSourceUrl: 'https://hanabi.walkerplus.com/detail/ar0312e00786/',

 mapInfo: {
 hasMap: true,
 mapNote: 'ZOZO海洋体育场',
 parking: '体育场駐車場有（有料）'
 },

 weatherInfo: {
   month: '7月',
   temperature: '最高30°C，最低23°C',
   humidity: '80%',
   rainfall: '小雨决行、恶劣天气延期',
   recommendation: '野球观战准备同样',
   rainPolicy: '野球开催准',
   note: '体育场内天候影响有限'
 },

 mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.7!2d140.03!3d35.64!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x602285c9b9d4a2a7%3A0x123456789!2z5Y2D6JGJ55yM!5e0!3m2!1sja!2sjp!4v1600000000000!5m2!1sja!2sjp"
}; 