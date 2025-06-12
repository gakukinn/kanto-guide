/**
 * 第五层数据文件 - 第78回木更津港祭数据
 * @layer 五层 (Detail Layer)
 * @month 8月
 * @region 千叶
 * @event 第78回木更津港祭
 * @type 花火详情数据
 * @source Walker Plus官方数据 (https://hanabi.walkerplus.com/detail/ar0312e00916/)
 * @description 包含完整的花火详细信息：基本信息、会场信息、交通指南、观赏攻略等
 */
import { HanabiData } from '@/types/hanabi';

export const kisarazuHanabiData: HanabiData = {
 id: 'kisarazu-hanabi',
 name: '第78回木更津港祭',
  japaneseName: '第78回 木更津港まつり',
 englishName: '78th Kisarazu Port Festival',
 year: 2025,
 date: '2025年8月15日(金)',
 time: '19:30开始',
 duration: '约90分钟',
 fireworksCount: '约1万3000发',
 expectedVisitors: '约28万4500人',
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
 established: 1948,
 significance: '拥有77年历史的千叶县传统港祭，东京湾畔的夏季盛典',
 highlights: [
 '拥有超过75年历史的传统港祭',
 '千叶县内规模最大的花火大会之一',
 '约1万3000发的壮观花火演出',
 '东京湾畔的美丽花火景观'
 ]
 },

 venues: [
 {
 name: '中之岛公园会场',
 location: '木更津市中之岛公园',
 startTime: '19:30开始',
 features: [
 '东京湾畔的开阔观赏空间',
 '约1万3000发的精心设计花火',
 '港湾与花火的绝美景观',
 '千叶县历史悠久的传统港祭'
 ]
 }
 ],

 access: [
 {
 venue: '中之岛公园会场',
 stations: [
 {
 name: 'JR内房线木更津站',
 lines: ['JR内房线'],
 walkTime: '步行约10分钟'
 },
 {
 name: '木更津金田IC',
 lines: ['高速公路'],
 walkTime: '车程约15分钟'
 }
 ]
 }
 ],

 viewingSpots: [
 {
 name: '中之岛公园观赏区',
 rating: 5,
 crowdLevel: '极高',
 tips: '最佳观赏位置，东京湾港湾景观绝美',
 pros: ['视野开阔', '港湾景观美', '免费观赏'],
 cons: ['人流极其密集', '停车困难', '需要很早到达']
 },
 {
 name: '木更津港周边观赏区',
 rating: 4,
 crowdLevel: '高',
 tips: '港湾周边的观赏区域',
 pros: ['港湾风景佳', '观赏角度好', '相对宽敞'],
 cons: ['距离稍远', '需要早到占位']
 },
 {
 name: '木更津站周边观赏区',
 rating: 4,
 crowdLevel: '高',
 tips: '车站附近的观赏区域',
 pros: ['交通便利', '观赏效果好', '设施较完善'],
 cons: ['人较多', '步行距离适中']
 }
 ],

 tips: [
 {
 category: '交通建议',
 items: [
 '建议从JR内房线木更津站步行前往',
 '当日会场周边会有严格交通管制，请预留充足时间',
 '强烈建议使用公共交通，会场附近停车位极其有限',
 '活动结束后人流极大，请耐心等待避免拥挤'
 ]
 },
 {
 category: '观赏攻略',
 items: [
 '港湾观赏：最佳体验，建议18:00前到达占位',
 '可携带折叠椅、野餐垫等观赏用品',
 '夏季炎热，请携带防暑用品和充足饮用水',
 '港湾风景优美，建议提前欣赏东京湾的海景'
 ]
 },
 {
 category: '便民设施',
 items: [
 '会场设有多处临时厕所和休息区',
 '木更津站周边有便利店和餐饮设施',
 '中之岛公园有自动售货机',
 '垃圾请分类处理，保护港湾的海洋环境'
 ]
 }
 ],

 mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3242.567890123456!2d139.9234!3d35.3756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60189cd1234567890%3A0x1234567890abcdef!2z5pyo5pu05rSl5Lit5LmL5bO25YWs5ZyS!5e0!3m2!1sja!2sjp!4v1234567890123',

 media: [
 {
 type: 'image',
 url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=800&fit=crop&crop=center&auto=format&q=80',
 title: '第78回木更津港祭东京湾花火',
 description: '东京湾畔中之岛公园上空绽放的约1万3000发花火，港湾与花火交相辉映的绝美景观'
 }
 ],

 contact: {
 organizer: '木更津港祭实行委员会',
 phone: '0438-23-8118',
 website: 'https://www.city.kisarazu.lg.jp/',
 socialMedia: '@kisarazu_hanabi'
 },

 mapInfo: {
 hasMap: true,
 mapNote: '会场位于木更津市中之岛公园',
 parking: '停车位极其有限，强烈建议使用公共交通'
 },

 weatherInfo: {
 month: '8月',
 temperature: '28°C～34°C',
 humidity: '80%',
 rainfall: '中等',
 recommendation: '建议携带防暑用品和充足饮用水，港湾较为开阔但需注意防晒'
 },

 related: {
 regionRecommendations: [
 {
 id: 'teganuma-hanabi',
 name: '手贺沼花火大会2025',
 date: '2025年8月2日',
 location: '柏市、我孙子市手贺沼',
 visitors: '48万人',
 link: '/august/hanabi/chiba/teganuma'
 },
 {
 id: 'matsudo-hanabi',
 name: '松户花火大会2025',
 date: '2025年8月2日',
 location: '松户市古个崎河川敷体育广场',
 visitors: '约27万人',
 link: '/august/hanabi/chiba/matsudo'
 }
 ],
 timeRecommendations: [
 {
 id: 'makuhari-beach-hanabi',
 name: '幕张海滩花火节2025(第47回千叶市民花火大会)',
 date: '2025年8月2日',
 location: '千叶市美浜区幕张海滨公园',
 visitors: '约30万人',
 link: '/august/hanabi/chiba/makuhari-beach-hanabi'
 }
 ]
 }
}; 