/**
 * 第五层数据文件 - 手贺沼花火大会2025数据
 * @layer 五层 (Detail Layer)
 * @month 8月
 * @region 千叶
 * @event 手贺沼花火大会2025
 * @type 花火详情数据
 * @source Walker Plus官方数据 (https://hanabi.walkerplus.com/detail/ar0312e00930/)
 * @description 包含完整的花火详细信息：基本信息、会场信息、交通指南、观赏攻略等
 */
import { HanabiData } from '@/types/hanabi';

export const teganumaHanabiData: HanabiData = {
 id: 'teganuma-hanabi',
 name: '手贺沼花火大会2025',
  japaneseName: '手賀沼花火大会2025',
 englishName: 'Lake Teganuma Fireworks Festival 2025',
 year: 2025,
 date: '2025年8月2日(土)',
 time: '19:00开始',
 duration: '约75分钟',
 fireworksCount: '约1万3500发',
 expectedVisitors: '约48万人',
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
 established: 1915,
 significance: '拥有百年历史的关东地区大型花火大会，手贺沼湖畔的夏季盛典',
 highlights: [
 '拥有超过110年历史的传统花火大会',
 '关东地区规模最大的花火大会之一',
 '约1万3500发的壮观花火演出',
 '手贺沼湖面倒影的美丽花火景观'
 ]
 },

 venues: [
 {
 name: '手贺沼亲水广场会场',
 location: '柏市、我孙子市手贺沼亲水广场',
 startTime: '19:00开始',
 features: [
 '手贺沼湖畔的开阔观赏空间',
 '约1万3500发的精心设计花火',
 '湖面倒影与花火的绝美景观',
 '关东地区历史悠久的传统花火大会'
 ]
 }
 ],

 access: [
 {
 venue: '手贺沼亲水广场会场',
 stations: [
 {
 name: 'JR常磐线我孙子站',
 lines: ['JR常磐线'],
 walkTime: '步行约10分钟'
 },
 {
 name: 'JR常磐线柏站',
 lines: ['JR常磐线'],
 walkTime: '步行约15分钟'
 },
 {
 name: '东武野田线柏站',
 lines: ['东武野田线'],
 walkTime: '步行约15分钟'
 }
 ]
 }
 ],

 viewingSpots: [
 {
 name: '手贺沼亲水广场观赏区',
 rating: 5,
 crowdLevel: '极高',
 tips: '最佳观赏位置，手贺沼湖面倒影绝美',
 pros: ['视野开阔', '湖面倒影美', '免费观赏'],
 cons: ['人流极其密集', '停车困难', '需要很早到达']
 },
 {
 name: '我孙子侧观赏区',
 rating: 4,
 crowdLevel: '高',
 tips: '我孙子站方向的观赏区域',
 pros: ['交通便利', '观赏角度佳', '相对宽敞'],
 cons: ['距离稍远', '需要早到占位']
 },
 {
 name: '柏侧观赏区',
 rating: 4,
 crowdLevel: '高',
 tips: '柏站方向的观赏区域',
 pros: ['多条路线可达', '观赏效果好', '设施较完善'],
 cons: ['人较多', '步行距离较长']
 }
 ],

 tips: [
 {
 category: '交通建议',
 items: [
 '建议从JR常磐线我孙子站或柏站步行前往',
 '当日会场周边会有严格交通管制，请预留充足时间',
 '强烈建议使用公共交通，会场附近停车位极其有限',
 '活动结束后人流极大，请耐心等待避免拥挤'
 ]
 },
 {
 category: '观赏攻略',
 items: [
 '湖畔观赏：最佳体验，建议17:30前到达占位',
 '可携带折叠椅、野餐垫等观赏用品',
 '夏季炎热，请携带防暑用品和充足饮用水',
 '湖畔风景优美，建议提前欣赏手贺沼的自然风光'
 ]
 },
 {
 category: '便民设施',
 items: [
 '会场设有多处临时厕所和休息区',
 '我孙子站和柏站周边有便利店和餐饮设施',
 '手贺沼亲水广场有自动售货机',
 '垃圾请分类处理，保护手贺沼的自然环境'
 ]
 }
 ],

 mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3242.567890123456!2d140.0234!3d35.8456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60189cd1234567890%3A0x1234567890abcdef!2z5omL6LO45rKo6Kan5rC06YCR5rC05pWX5Lit5Zyw!5e0!3m2!1sja!2sjp!4v1234567890123',

 media: [
 {
 type: 'image',
 url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=800&fit=crop&crop=center&auto=format&q=80',
 title: '手贺沼花火大会2025湖面花火',
 description: '手贺沼湖面上空绽放的约1万3500发花火，湖面倒影与花火交相辉映的绝美景观'
 }
 ],

 contact: {
 organizer: '手贺沼花火大会实行委员会',
 phone: '04-7185-1111',
 website: 'https://www.city.abiko.chiba.jp/',
 socialMedia: '@teganuma_hanabi'
 },

 mapInfo: {
 hasMap: true,
 mapNote: '会场位于柏市、我孙子市手贺沼亲水广场',
 parking: '停车位极其有限，强烈建议使用公共交通'
 },

 weatherInfo: {
 month: '8月',
 temperature: '28°C～34°C',
 humidity: '80%',
 rainfall: '中等',
 recommendation: '建议携带防暑用品和充足饮用水，湖畔较为开阔但需注意防晒'
 },

 related: {
 regionRecommendations: [
 {
 id: 'matsudo-hanabi',
 name: '松户花火大会2025',
 date: '2025年8月2日',
 location: '松户市古个崎河川敷体育广场',
 visitors: '约27万人',
 link: '/august/hanabi/chiba/matsudo'
 },
 {
 id: 'ichikawa-hanabi',
 name: '第41回市川市民纳凉花火大会',
 date: '2025年8月2日',
 location: '市川市江户川河川敷',
 visitors: '约49万人',
 link: '/august/hanabi/chiba/ichikawa'
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