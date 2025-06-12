import { HanabiData } from '../types/hanabi';

export const oamishirasatoData: HanabiData = {
 id: 'oamishirasato',
 name: '和的花火',
  japaneseName: 'おおあみしらさとの花火',

 englishName: 'Oamishirasato Fireworks',
  title: '和的花火 - 7月千叶花火大会',
  description: '和的花火详情信息，包含举办时间、地点、交通方式、观赏攻略等完整信息。',
 year: 2025,
 date: '2025年7月26日(土)',
 time: '19:30～20:30',
 duration: '60分钟',
 fireworksCount: '3000発',
 expectedVisitors: '2万8000人',
 weather: '小雨举行（恶劣天气延期）',
 ticketPrice: '免费观赏（有料席另售）',
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
 id: 'sanmu',
 name: '山武市夏季嘉年华',
 date: '2025年7月26日',
 location: '蓮沼海浜公園',
 visitors: '1万9000人',
 link: '/july/hanabi/chiba/sanmu'
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
 id: 'futtsu',
 name: '富津市民花火大会',
 date: "7月26日",
 location: '富津海水浴场',
 visitors: '5万人',
 link: '/july/hanabi/chiba/futtsu'
 }
 ]
 },

 venues: [
 {
 name: '白里海水浴場',
 location: '大網白里市白里',
 startTime: '19:30',
 features: [
 '60分間的花火壮观',
 '海面彩水中连发花火',
 '砂浜从的大迫力花火',
 '海岸楽夏的夜'
 ]
 }
 ],

 access: [
 {
 venue: '白里海水浴場',
 stations: [
 { 
 name: 'JR大網駅', 
 lines: ['JR外房線'], 
 walkTime: '巴士約20分' 
 },
 { 
 name: 'JR茂原駅', 
 lines: ['JR外房線'], 
 walkTime: '巴士約25分' 
 }
 ]
 }
 ],

 viewingSpots: [
 {
 name: '白里海水浴場主要会場',
 rating: 5,
 crowdLevel: 'High',
 tips: '水中连发花火見哪里的中心会場',
 pros: ['水中花火的迫力', '海面反射美', '砂浜'],
 cons: ['混雑激', '砂汚', '駐車場満車']
 },
 {
 name: '白里海岸北側',
 rating: 4,
 crowdLevel: 'Medium',
 tips: '少離比較的空',
 pros: ['人混避', '全体的眺望', '車的交通'],
 cons: ['花火和和遠', '設備少', '夜間的移動注意']
 },
 {
 name: '白里神社周辺',
 rating: 3,
 crowdLevel: 'Low',
 tips: '花火遠从眺静吗地点',
 pros: ['静吗環境', '地元的雰囲気', '駐車和'],
 cons: ['花火小見', '音聞', '雰囲気欠']
 }
 ],

 history: {
 established: 1990,
 significance: '大網白里市的夏的風物詩和定着海岸花火大会',
 highlights: [
 '35年的歴史持地域密着型花火大会',
 '水中连发花火的美',
 '60分間的充実节目',
 '海水浴場的夏祭文化'
 ]
 },

 tips: [
 {
 category: '時間安排',
 items: [
 '海水浴也楽的早的到着',
 '60分間的充実节目',
 '夕方从場所取開始',
 '花火終了後的混雑想定帰路計画'
 ]
 },
 {
 category: '必備物品',
 items: [
 '野餐垫（砂浜用）',
 '日焼止',
 '飲物（多）',
 '虫除喷雾',
 '懐中電灯'
 ]
 },
 {
 category: '观赏建议',
 items: [
 '水中连发花火的时机注目',
 '海面反射和花火的合作楽',
 '砂浜座迫力体感',
 '60分間的多彩节目満喫'
 ]
 },
 {
 category: '交通攻略',
 items: [
 'JR外房線交通',
 '巴士的時刻表事前確認',
 '車的場合叶子早的到着必須',
 '帰的混雑対策立放置'
 ]
 }
 ],

 contact: {
 organizer: '大網白里市商工観光課',
 phone: '0475-70-0356',
 website: 'https://www.city.oamishirasato.lg.jp/',
 socialMedia: '大網白里市公式SNS'
 },
 // 官方数据源验证
 dataSourceUrl: 'https://hanabi.walkerplus.com/detail/ar0312e00786/',

 mapInfo: {
 hasMap: true,
 mapNote: '白里海水浴場',
 parking: '臨時駐車場有（有料）'
 },

 weatherInfo: {
   month: '7月',
   temperature: '最高30°C，最低23°C',
   humidity: '80%',
   rainfall: '小雨决行、恶劣天气延期',
 recommendation: '海風対策和日焼対策必須',
 rainPolicy: '小雨決行、荒天時叶子翌日延期',
 note: '海水浴場的因为更衣室等設備充実'
 
 },

 mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.7!2d140.03!3d35.64!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x602285c9b9d4a2a7%3A0x123456789!2z5Y2D6JGJ55yM!5e0!3m2!1sja!2sjp!4v1600000000000!5m2!1sja!2sjp"
}; 