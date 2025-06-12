/**
 * 第五层数据文件 - 第41回市川市民纳凉花火大会数据
 * @layer 五层 (Detail Layer)
 * @month 8月
 * @region 千叶
 * @event 第41回市川市民纳凉花火大会
 * @type 花火详情数据
 * @source Walker Plus官方数据 (https://hanabi.walkerplus.com/detail/ar0312e01102/)
 * @description 包含完整的花火详细信息：基本信息、会场信息、交通指南、观赏攻略等
 */
import { HanabiData } from '@/types/hanabi';

export const ichikawaHanabiData: HanabiData = {
 id: 'ichikawa-hanabi',
 name: '第41回市川市民纳凉花火大会',
  japaneseName: '第41回 市川市民納涼花火大会',
 englishName: '41st Ichikawa Citizens Cool Evening Fireworks Festival',
 year: 2025,
 date: '2025年8月2日(土)',
 time: '19:15开始',
 duration: '约90分钟',
 fireworksCount: '约1万4000发',
 expectedVisitors: '约49万人',
 weather: '夏季高温',
 ticketPrice: '免费观赏',
 status: '开催预定',
 themeColor: '#4A90E2',
 month: 8,
 
 tags: {
 timeTag: '8月',
 regionTag: '千叶',
 typeTag: '花火',
 layerTag: '详细介绍'
 
  },

 history: {
 established: 1984,
 significance: '市川市传统夏季祭典，江户川河畔的大型花火盛会',
 highlights: [
 '拥有41年历史的传统市民花火大会',
 '江户川河川敷的壮观水上花火',
 '约1万4000发花火的盛大演出',
 '千叶県最大规模的夏季花火祭典之一'
 ]
 },

 venues: [
 {
 name: '江户川河川敷会场',
 location: '市川市江户川河川敷',
 startTime: '19:15开始',
 features: [
 '江户川上空的壮观花火表演',
 '开阔的河川敷观赏区域',
 '约1万4000发的大规模花火演出',
 '关东地区屈指可数的大型花火大会'
 ]
 }
 ],

 access: [
 {
 venue: '江户川河川敷会场',
 stations: [
 {
 name: 'JR总武线市川站',
 lines: ['JR总武线'],
 walkTime: '步行约15分钟'
 },
 {
 name: '京成本线市川真间站',
 lines: ['京成本线'],
 walkTime: '步行约10分钟'
 },
 {
 name: '都营新宿线本八幡站',
 lines: ['都营新宿线'],
 walkTime: '步行约15分钟'
 }
 ]
 }
 ],

 viewingSpots: [
 {
 name: '江户川河川敷观赏区',
 rating: 5,
 crowdLevel: '极高',
 tips: '最佳观赏位置，建议16:00前到达占位',
 pros: ['视野开阔', '免费观赏', '花火规模盛大'],
 cons: ['人流极其密集', '需很早到达', '交通拥挤']
 },
 {
 name: '市川桥周边',
 rating: 4,
 crowdLevel: '高',
 tips: '稍远但相对人较少',
 pros: ['观赏角度佳', '交通便利', '有商业设施'],
 cons: ['距离较远', '部分视野受限']
 },
 {
 name: '对岸东京侧',
 rating: 3,
 crowdLevel: '中',
 tips: '从东京侧观赏角度不同',
 pros: ['人相对较少', '观赏角度独特', '交通选择多'],
 cons: ['距离较远', '花火相对较小', '需跨河']
 }
 ],

 tips: [
 {
 category: '交通建议',
 items: [
 '建议从市川真间站步行最为便利',
 '当日各站周边会极度拥挤，请预留充足时间',
 '有收费停车场，但强烈建议使用公共交通',
 '散场时人流密集，请耐心等待并注意安全'
 ]
 },
 {
 category: '观赏攻略',
 items: [
 '河川敷观赏区：最佳视野，建议16:00前到达占位',
 '必须携带野餐垫或折叠椅，地面会较硬',
 '夏季河边蚊虫较多，请携带防蚊用品',
 '会场周边有临时摊位，可购买食物饮料'
 ]
 },
 {
 category: '便民设施',
 items: [
 '会场设有多处临时厕所',
 '市川站周边有丰富的餐饮和购物设施',
 '可在观赏前在车站附近用餐',
 '垃圾请分类处理，保护河川环境'
 ]
 }
 ],

 mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.123456789!2d139.9234!3d35.7234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018861234567890%3A0x1234567890abcdef!2z5biC5bed5biC5rGf5oi45bed5bed5pW39Y2V!5e0!3m2!1sja!2sjp!4v1234567890123',

 media: [
 {
 type: 'image',
 url: 'https://images.unsplash.com/photo-1548142813-c9e7e4e89a1e?w=800&h=800&fit=crop&crop=center&auto=format&q=80',
 title: '第41回市川市民纳凉花火大会江户川绽放',
 description: '江户川河川敷上空绽放的约1万4000发花火，为千叶县最大规模的夏季花火盛典'
 }
 ],

 contact: {
 organizer: '市川市民纳凉花火大会实行委员会',
 phone: '047-712-8571',
 website: 'https://www.city.ichikawa.lg.jp/',
 socialMedia: '@ichikawa_hanabi'
 },

 mapInfo: {
 hasMap: true,
 mapNote: '会场位于江户川河川敷，毗邻市川市中心',
 parking: '有收费停车场，但强烈建议使用公共交通'
 },

 weatherInfo: {
 month: '8月',
 temperature: '27°C～33°C',
 humidity: '85%',
 rainfall: '中等',
 recommendation: '建议携带防暑用品和充足饮用水，河边夜晚较凉爽但仍需防蚊'
 },

 related: {
 regionRecommendations: [
 {
 id: 'makuhari-beach-hanabi',
 name: '幕张海滩花火节2025(第47回千叶市民花火大会)',
 date: '2025年8月2日',
 location: '千叶市美浜区幕张海滨公园',
 visitors: '约30万人',
 link: '/august/hanabi/chiba/makuhari-beach-hanabi'
 },
 {
 id: 'choshi-minato-hanabi',
 name: '铫子港祭花火大会',
 date: '2025年8月2日',
 location: '铫子市利根川河畔',
 visitors: '约7万人',
 link: '/august/hanabi/chiba/choshi-minato-hanabi'
 }
 ],
 timeRecommendations: [
 {
 id: 'narashino-hanabi',
 name: '令和7年习志野驻屯地夏祭',
 date: '2025年8月2日',
 location: '船桥市陆上自卫队习志野驻屯地',
 visitors: '约5万人',
 link: '/august/hanabi/chiba/narashino'
 }
 ]
 }
}; 