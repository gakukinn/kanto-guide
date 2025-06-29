import { HanabiData } from '@/types/hanabi';

export const motherfarmData: HanabiData = {
 id: 'motherfarm',
 name: '母亲牧場 夏夜农场',
 englishName: 'Mother Farm Summer Night Farm',
  _sourceData: {
    japaneseName: 'マザー牧場 サマーナイトファーム'
  },
  title: '母亲牧場 夏夜农场 - 7月千叶花火大会',
  description: '母亲牧場 夏夜农场详情信息，包含举办时间、地点、交通方式、观赏攻略等完整信息。',
 year: 2025,
 date: '2025年7月26日',
 time: '20:00～',
 duration: '约30分钟',
 fireworksCount: '未定',
 expectedVisitors: '未定',
 weather: '小雨举行（恶劣天气中止）',
 ticketPrice: '入園料別途必要（有料席有）',
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
 id: 'marines',
 name: 'MARINES HANABI',
 date: '2025年7月11日',
 location: 'ZOZO海洋体育场',
 visitors: '3万人',
 link: '/chiba/hanabi/marines-hanabi'
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
 id: 'sanmu',
 name: '山武市夏季嘉年华',
 date: '2025年7月26日',
 location: '蓮沼海浜公園',
 visitors: '1万9000人',
 link: '/july/hanabi/chiba/sanmu'
 },
 {
 id: 'futtsu',
 name: '富津市民花火大会',
 date: '2025年7月26日',
 location: '富津海水浴场',
 visitors: '5万人',
 link: '/july/hanabi/chiba/futtsu'
 }
 ]
 },

 venues: [
 {
 name: '母亲牧場',
 location: '富津市田倉940-3',
 startTime: '20:00',
 features: [
 '動物和的後的花火',
 '間近上大迫力的花火',
 '牧場叶子的開放感',
 '夏夜农场特別企画'
 ]
 }
 ],

 access: [
 {
 venue: '母亲牧場',
 stations: [
 { 
 name: 'JR佐貫町駅', 
 lines: ['JR内房線'], 
 walkTime: '巴士約25分' 
 },
 { 
 name: '君津IC', 
 lines: ['館山自動車道'], 
 walkTime: '車約10分' 
 }
 ]
 }
 ],

 viewingSpots: [
 {
 name: '母亲牧場主要会場',
 rating: 5,
 crowdLevel: 'Medium',
 tips: '動物和的从花火一日中楽',
 pros: ['間近的大迫力花火', '牧場的開放感', '家庭向'],
 cons: ['入園料必要', '交通和和不便', '帰路的混雑']
 },
 {
 name: '树门周辺',
 rating: 4,
 crowdLevel: 'Low',
 tips: '牧場入口付近从的観覧',
 pros: ['比較的空', '車的交通', '混雑回避'],
 cons: ['花火和和遠', '入園料別途', '雰囲気劣']
 },
 {
 name: '展望台区域',
 rating: 4,
 crowdLevel: 'Medium',
 tips: '牧場的高台从全景景观花火観賞',
 pros: ['絶景全景', '撮影地点', '開放感抜群'],
 cons: ['歩行距離長', '夜間的移動注意', '風強']
 }
 ],

 history: {
 established: 2015,
 significance: '母亲牧場的夏的特別活动',
 highlights: [
 '10年的歴史持牧場花火',
 '動物和的和花火的融合',
 '家庭向特別企画',
 '間近楽大迫力花火'
 ]
 },

 tips: [
 {
 category: '時間安排',
 items: [
 '昼間从牧場楽夜的花火',
 '動物和的時間也確保',
 '複数日程開催的都合合選択',
 '夜間的牧場内移動時間也考慮'
 ]
 },
 {
 category: '必備物品',
 items: [
 '母亲牧場入園券',
 '動物和的用着替',
 '防寒対策（夜間叶子涼）',
 '相机',
 '懐中電灯'
 ]
 },
 {
 category: '观赏建议',
 items: [
 '昼間的動物从夜的花火満喫',
 '間近上花火的迫力体感',
 '牧場叶子的開放的雰囲気',
 '夏夜农场限定企画也楽'
 ]
 },
 {
 category: '交通攻略',
 items: [
 '車的交通便利',
 'JR佐貫町駅从巴士利用也可能',
 '帰的混雑想定時間計画',
 '牧場内的移動也計画含'
 ]
 }
 ],

 contact: {
 organizer: '母亲牧場',
 phone: '0439-37-3211',
 website: 'https://www.motherfarm.co.jp/',
 socialMedia: '母亲牧場公式SNS'
 },
 // 官方数据源验证
 dataSourceUrl: 'https://hanabi.walkerplus.com/detail/ar0312e00786/',

 mapInfo: {
 hasMap: true,
 mapNote: '母亲牧場園内',
 parking: '母亲牧場駐車場（有料）'
 },

 weatherInfo: {
   month: '7月',
   temperature: '最高30°C，最低23°C',
   humidity: '80%',
   rainfall: '小雨决行、恶劣天气延期',
 recommendation: '牧場的夜叶子涼的防寒対策必須',
 rainPolicy: '小雨決行、荒天時叶子中止',
 note: '動物的体調比一部节目変更的可能性'
 
 },

 mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.7!2d140.03!3d35.64!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x602285c9b9d4a2a7%3A0x123456789!2z5Y2D6JGJ55yM!5e0!3m2!1sja!2sjp!4v1600000000000!5m2!1sja!2sjp"
}; 
