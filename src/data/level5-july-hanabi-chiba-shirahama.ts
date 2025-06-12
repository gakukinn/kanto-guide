import { HanabiData } from '../types/hanabi';

export const shirahamaData: HanabiData = {
 id: 'shirahama',
 name: '第61回 南房総白浜海女祭典',
  japaneseName: '第61回南房総白浜海女まつり',

 englishName: 'Shirahama Ama Festival',
  title: '第61回 南房総白浜海女祭典 - 7月千叶花火大会',
  description: '第61回 南房総白浜海女祭典详情信息，包含举办时间、地点、交通方式、观赏攻略等完整信息。',
 year: 2025,
 date: '2025年7月19日(土)、20日(日)',
 time: '各日19:00～',
 duration: '各日约60分钟',
 fireworksCount: '水中花火（非公開）',
 expectedVisitors: '2万5000人',
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
 id: 'kamogawa',
 name: '鸭川市民花火大会',
 date: '2025年7月29日',
 location: '前原横渚海岸',
 visitors: '4万人',
 link: '/july/hanabi/chiba/kamogawa'
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
 id: 'sumida',
 name: '隅田川花火大会',
 date: '2025年7月26日',
 location: '隅田川',
 visitors: '91万人',
 link: '/july/hanabi/tokyo/sumida'
 },
 {
 id: 'katsushika',
 name: '葛飾納涼花火大会',
 date: '2025年7月22日',
 location: '葛飾区',
 visitors: '77万人',
 link: '/july/hanabi/tokyo/katsushika'
 },
 {
 id: 'kamogawa',
 name: '鸭川市民花火大会',
 date: "7月29日",
 location: '前原横渚海岸',
 visitors: '4万人',
 link: '/july/hanabi/chiba/kamogawa'
 }
 ]
 },

 venues: [
 {
 name: '白浜野島埼灯台前公園広場',
 location: '南房総市白浜町白浜',
 startTime: '19:00',
 features: [
 '水中花火的迫力体験',
 '海女文化和的融合',
 '房総半島最南端',
 '伝統的海女祭典'
 ]
 }
 ],

 access: [
 {
 venue: '白浜野島埼灯台前公園広場',
 stations: [
 { 
 name: 'JR館山駅', 
 lines: ['JR内房線'], 
 walkTime: '巴士約30分' 
 }
 ]
 }
 ],

 viewingSpots: [
 {
 name: '白浜野島埼灯台前公園',
 rating: 5,
 crowdLevel: 'Medium',
 tips: '海女祭典的主要会場、水中花火見哪里',
 pros: ['水中花火的迫力', '海女文化体験', '比較的観賞'],
 cons: ['交通和和不便', '宿泊施設限定', '天候的影響受和']
 },
 {
 name: '白浜海岸',
 rating: 4,
 crowdLevel: 'Low',
 tips: '海岸線从的花火観賞',
 pros: ['広々和空間', '波音和的合作', '浪漫'],
 cons: ['施設少', '夜間的安全注意', '砂浜歩行']
 }
 ],

 history: {
 established: 1964,
 significance: '房総半島的伝統的海女文化継承祭',
 highlights: [
 '61回的歴史持伝統祭',
 '海女文化的保存和継承',
 '水中花火的迫力演出',
 '房総半島最南端的開催'
 ]
 },

 tips: [
 {
 category: '時間安排',
 items: [
 '2日間開催的予定合選択',
 '海女祭典的他活动也楽',
 '夕方早現地到達推奨',
 '巴士的最終時刻要確認'
 ]
 },
 {
 category: '必備物品',
 items: [
 '防寒対策（海風的因为）',
 '虫除喷雾',
 '野餐垫',
 '懐中電灯',
 '飲食物（現地購入可能）'
 ]
 },
 {
 category: '观赏建议',
 items: [
 '水中花火的时机注目',
 '海女文化的実演也見学',
 '房総的海的幸美食堪能',
 '灯台和的合作撮影'
 ]
 },
 {
 category: '交通攻略',
 items: [
 'JR館山駅从巴士利用',
 '車的交通也可能',
 '宿泊叶子館山市内',
 '帰的巴士時刻要事前確認'
 ]
 }
 ],

 contact: {
 organizer: '南房総市観光協会',
 phone: '0470-33-1091',
 website: 'https://www.mboso-etoko.jp/',
 socialMedia: '公式Facebook'
 },
 // 官方数据源验证
 officialSource: {
   walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0312e00791/',
   verificationDate: '2025-01-13',
   dataConfirmedBy: 'USER_PROVIDED' as const,
   lastChecked: '2025-01-13'
 },

 mapInfo: {
 hasMap: true,
 mapNote: '白浜野島埼灯台前公園広場',
 parking: '臨時駐車場有（有料）'
 },

 weatherInfo: {
 month: '7月',
 temperature: '夏季海岸气候',
 humidity: '海风较为舒适',
 rainfall: '梅雨季末期',
 recommendation: '海風因为薄手的羽織必須',
 rainPolicy: '小雨決行、荒天時叶子延期',
 note: '海沿的因为天候変化注意'
 },
 mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.7!2d140.03!3d35.64!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x602285c9b9d4a2a7%3A0x123456789!2z5Y2D6JGJ55yM!5e0!3m2!1sja!2sjp!4v1600000000000!5m2!1sja!2sjp',
}; 