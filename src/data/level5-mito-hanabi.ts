// 第65回 水戸黄門祭典 水戸偕楽園花火大会详细信息
// 数据来源：Walker Plus官方 https://hanabi.walkerplus.com/detail/ar0308e00896/

import { HanabiData } from '@/types/hanabi';

export const mitoHanabiData: HanabiData = {
 id: 'mito-kairakuen-hanabi-2025',
 name: '水戸偕楽園花火大会',
  japaneseName: '第65回 水戸黄門まつり 水戸偕楽園花火大会',
 englishName: 'Mito Kairakuen Fireworks Festival 2025',
 year: 2025,
 date: '2025年7月26日',
 time: '19:30-20:30',
 duration: '约60分钟',
 fireworksCount: '约5000发',
 expectedVisitors: '约23万人',
 weather: '夏季',
 ticketPrice: '免费入场（设有付费座席）',
 status: '雨天延期至7月27日',
 themeColor: 'blue',
 month: 7,
 
 tags: {
 timeTag: '7月',
 regionTag: '北关东',
 typeTag: '花火',
 layerTag: '详细介绍'
 
  },
 
 related: {
 regionRecommendations: [
 {
 id: 'kitakanto-july-01',
 name: '玉村花火大会',
 date: "7月12日",
 location: '玉村町上陽地区',
 visitors: '1万2000人',
 link: '/july/hanabi/kitakanto/tamura-hanabi'
 },
 {
 id: 'kitakanto-july-03',
 name: '真冈市夏祭大花火大会',
 date: "7月26日",
 location: '真冈市',
 visitors: '约17万人',
 link: '/july/hanabi/kitakanto/moka-hanabi'
 },
 {
 id: 'kitakanto-july-04',
 name: '馆林手筒花火大会',
 date: "7月26日",
 location: '馆林市',
 visitors: '3万人',
 link: '/july/hanabi/kitakanto/tatebayashi-hanabi'
 }
 ],
 timeRecommendations: [
 {
 id: 'tokyo-july-01',
 name: '东京竞马场花火',
 date: "7月2日",
 location: '东京竞马场',
 visitors: '约3万人',
 link: '/july/hanabi/tokyo'
 },
 {
 id: 'kanagawa-july-01',
 name: '镰仓花火大会',
 date: "7月18日",
 location: '由比之浜海岸',
 visitors: '约16万人',
 link: '/july/hanabi/kanagawa'
 }
 ]
 },
 
 venues: [
 {
 name: '千波公园主会场',
 location: '茨城県水戸市千波町',
 startTime: '19:30',
 features: [
 '千波湖湖面倒影花火',
 '特大音乐连发花火',
 '全国著名花火师创作花火',
 '水戸黄門祭典传统活动'
 ]
 }
 ],
 
 access: [
 {
 venue: '千波公园',
 stations: [
 {
 name: '水戸駅',
 lines: ['JR常磐線'],
 walkTime: '徒步约15分钟'
 }
 ]
 }
 ],
 
 viewingSpots: [
 {
 name: '千波公园主会场',
 rating: 5,
 crowdLevel: '高',
 tips: '最佳观赏位置，建议提前占位',
 pros: ['正面观赏角度', '湖面倒影效果', '音响效果最佳'],
 cons: ['人流最集中', '需要早到占位']
 },
 {
 name: '千波湖东岸',
 rating: 4,
 crowdLevel: '中',
 tips: '相对宽松的观赏区域',
 pros: ['人群较少', '倒影观赏', '拍摄角度多样'],
 cons: ['步行距离稍远']
 },
 {
 name: '偕楽園周边',
 rating: 4,
 crowdLevel: '中',
 tips: '结合历史名园的特色观赏点',
 pros: ['历史文化氛围', '独特观赏角度', '避开主要人群'],
 cons: ['需要一定徒步距离']
 }
 ],
 
 history: {
 established: 1961,
 significance: '水戸黄門祭典的重要構成要素和65年的歴史持花火大会',
 highlights: [
 '茨城県代表夏的風物詩',
 '千波湖的美湖面和花火的合作反射',
 '全国从集花火師競演',
 '音楽和同步特大连发花火'
 ]
 },
 
 tips: [
 {
 category: '交通建议',
 items: [
 '千波湖周边容易拥堵，建议使用水戸駅周边停车场',
 '推荐使用公共交通前往会场',
 '活动结束后疏散需要时间，请耐心等待'
 ]
 },
 {
 category: '观赏建议',
 items: [
 '湖畔风较大，建议携带外套',
 '最佳拍摄点在千波公园主会场东侧',
 '携带折叠椅或垫子提高观赏舒适度'
 ]
 },
 {
 category: '注意事项',
 items: [
 '雨天活动将延期至次日同一时间举行',
 '会场内禁止携带酒精饮料',
 '注意湖边安全，避免落水'
 ]
 }
 ],
 
 contact: {
 organizer: '水戸観光会议協会',
 phone: '029-224-0441',
 website: 'https://mitokoumon.com/koumon/',
 socialMedia: '@mitokoumon310'
 },
 // 官方数据源验证
 officialSource: {
   walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0300e00813/',
   verificationDate: '2025-01-13',
   dataConfirmedBy: 'USER_PROVIDED' as const,
    lastChecked: '2025-01-13'
 },
 
 mapInfo: {
 hasMap: true,
 mapNote: '千波公园位于水戸市中心，从水戸駅徒步可达',
 parking: '千波湖周边设有无料停车场，建议使用水戸駅周边收费停车场'
 },
 
 weatherInfo: {
 month: '7月',
 temperature: '最高30°C / 最低20°C',
 humidity: '70-80%',
 rainfall: '梅雨季节末期，偶有阵雨',
 recommendation: '建议携带雨具和薄外套',
 rainPolicy: '雨天延期至7月27日19:30举行',},
 
 specialFeatures: {
 scale: '茨城県最大规模的夏季花火大会',
 location: '千波湖湖面倒影花火的独特景观',
 tradition: '水戸黄門祭典65年历史传统',
 atmosphere: '都市与自然融合的观赏环境',
 collaboration: '全国著名花火师创作竞演'
 },
 
 mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3222.8!2d140.46!3d36.36!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDE4JzAwLjAiTiAxNDDCsDI3JzAwLjAiRQ!5e0!3m2!1sja!2sjp!4v1234567890123!5m2!1sja!2sjp',
 
 media: [
 {
 type: 'image' as const,
 url: '/images/hanabi/mito-fireworks-main.svg',
 title: '水戸偕楽園花火大会 大型菊花火',
 description: '千波湖畔映大型菊花火，茨城県水戸市的夏的風物詩'
 }
 ]
}; 