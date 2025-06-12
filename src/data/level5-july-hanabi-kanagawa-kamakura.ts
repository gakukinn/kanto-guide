import { HanabiData } from '../types/hanabi';

export const kamakuraData: HanabiData = {
 id: 'kamakura',
 name: '第77回 镰仓花火大会',
  japaneseName: '第77回 鎌倉花火大会',

 englishName: 'The 77th Kamakura Fireworks Festival',
  title: '第77回 镰仓花火大会 - 7月神奈川花火大会',
  description: '第77回 镰仓花火大会详情信息，包含举办时间、地点、交通方式、观赏攻略等完整信息。',
 year: 2025,
 date: '2025年7月18日(金)',
 time: '19:20～20:10',
 duration: '50分钟',
 fireworksCount: '约2500发',
 expectedVisitors: '约16万人',
 weather: '小雨举行（恶劣天气取消）',
 ticketPrice: '免费观赏（有料席有）',
 status: '已确认举办',
 themeColor: 'cyan',
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
 id: 'seaparadise',
 name: '八景岛花火交响曲',
 date: '2025年7月19日',
 location: '八景岛海洋天堂',
 visitors: '非公开',
 link: '/july/hanabi/kanagawa/seaparadise'
 }
 ]
 },

 venues: [
 {
 name: '由比之滨海岸会场',
 location: '由比之滨海岸',
 startTime: '19:20',
 features: [
 '海上咲光的扇',
 '古都镰仓的历史背景',
 '由比之滨的白砂海滩',
 '江之岛的远景'
 ]
 },
 {
 name: '材木座海岸会场',
 location: '材木座海岸',
 startTime: '19:20',
 features: [
 '相对宽松的观赏环境',
 '海岸线的美丽景观',
 '镰仓山景背景',
 '家庭友好氛围'
 ]
 }
 ],

 access: [
 {
 venue: '由比之滨海岸',
 stations: [
 { 
 name: '江之電由比个浜駅', 
 lines: ['江之島電鉄線'], 
 walkTime: '徒步约5分钟' 
 },
 { 
 name: 'JR镰仓駅', 
 lines: ['JR东海道本線', 'JR横須賀線'], 
 walkTime: '徒步约15分钟' 
 }
 ]
 },
 {
 venue: '材木座海岸',
 stations: [
 { 
 name: 'JR镰仓駅', 
 lines: ['JR东海道本線', 'JR横須賀線'], 
 walkTime: '徒步约20分钟' 
 }
 ]
 }
 ],

 viewingSpots: [
 {
 name: '由比之滨海岸中央',
 rating: 5,
 crowdLevel: 'High',
 tips: '最佳观赏位置，正面观赏海上花火',
 pros: ['最佳视角', '海上花火', '古都氛围', '交通便利'],
 cons: ['人流极多', '需要早上占位', '竞争激烈']
 },
 {
 name: '材木座海岸',
 rating: 4,
 crowdLevel: 'Medium', 
 tips: '相对宽松，适合家庭观赏',
 pros: ['人流较少', '观赏舒适', '海岸散步', '停车方便'],
 cons: ['距离稍远', '角度稍逊', '花火相对较小']
 },
 {
 name: '稻村崎公园',
 rating: 4,
 crowdLevel: 'Low',
 tips: '高台观赏，可俯瞰整个海岸线',
 pros: ['高台视野', '人流极少', '江之岛远景', '拍照胜地'],
 cons: ['距离很远', '花火较小', '交通不便']
 }
 ],

 history: {
 established: 1948,
 significance: '神奈川县代表性的海滨花火大会，镰仓夏季的风物诗',
 highlights: [
 '77年历史的传统花火大会',
 '海上咲光的扇的壮观场面',
 '古都镰仓与现代花火的完美融合',
 '关东地区知名的海滨花火'
 ]
 },

 tips: [
 {
 category: '时间安排',
 items: [
 '建议上午11点前到达占位',
 '开始前2小时海岸开始拥挤',
 '花火结束后避开返程高峰',
 '可结合镰仓观光'
 ]
 },
 {
 category: '必备物品',
 items: [
 '野餐垫或折叠椅',
 '遮阳帽和防晒用品',
 '充足的饮用水',
 '便携式充电器',
 '垃圾袋（保持海岸清洁）'
 ]
 },
 {
 category: '观赏建议',
 items: [
 '由比之滨中央是最佳位置',
 '关注"海上咲光的扇"',
 '可拍摄古都与花火的组合',
 '注意海风，携带外套'
 ]
 },
 {
 category: '交通贴士',
 items: [
 '优先选择江之電由比个浜駅',
 '避开花火结束后的返程高峰',
 '可考虑在镰仓住宿一晚',
 '提前查询加班电车信息'
 ]
 }
 ],

 contact: {
 organizer: '镰仓市观光协会',
 phone: '0467-23-3050',
 website: 'https://www.kamakura-info.jp/',
 socialMedia: '@kamakura_kanko'
 },
 // 官方数据源验证
 officialSource: {
   walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0314e00792/',
   verificationDate: '2025-01-13',
   dataConfirmedBy: 'USER_PROVIDED' as const,
   lastChecked: '2025-01-13'
 },

 mapInfo: {
 hasMap: true,
 mapNote: '镰仓海岸周边观赏地图',
 parking: '临时停车场极为有限，强烈建议使用公共交通'
 },

 weatherInfo: {
 month: '7月',
 temperature: '夏季海滨气候',
 humidity: '海风较为舒适',
 rainfall: '梅雨季末期',
 recommendation: '海滨气候，注意防晒和海风',
 rainPolicy: '小雨举行，台风等恶劣天气延期',
 note: '延期信息请关注镰仓市观光协会官网'
 },

 specialFeatures: {
 scale: '2500发的中规模精品花火',
 location: '由比之滨海岸的绝美海景',
 tradition: '77年历史的古都花火传统',
 atmosphere: '古都镰仓与海滨花火的浪漫融合'
 },
 mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3250.2!2d139.62!3d35.45!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60185c0c0c0c0c0c%3A0x0c0c0c0c0c0c0c0c!2z56We5aWI5bed55yM!5e0!3m2!1sja!2sjp!4v1600000000000!5m2!1sja!2sjp',
}; 