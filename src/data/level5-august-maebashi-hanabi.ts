/**
 * 第五层数据文件 - 第69回前桥花火大会详情数据
 * @layer 五层 (Detail Data)
 * @month 8月
 * @region 北关东
 * @event 前桥花火大会
 * @type 花火详情数据文件
 */
import { HanabiData } from '../types/hanabi';

export const maebashiHanabiData: HanabiData = {
 id: 'maebashi-august',
 name: '第69回前桥花火大会',
  japaneseName: '第69回前橋花火大会',
 englishName: '69th Maebashi Fireworks Festival',
  title: '第69回前桥花火大会 - 8月北关东花火大会',
  description: '第69回前桥花火大会详情信息，包含举办时间、地点、交通方式、观赏攻略等完整信息。',
 year: 2025,
 date: '2025年8月9日(土)',
 time: '19:30-20:30',
 duration: '60分钟',
 fireworksCount: '约1万5000发',
 expectedVisitors: '非公开',
 weather: '小雨举行（恶劣天气取消）',
 ticketPrice: '免费观赏',
 status: '已确认举办',
 themeColor: 'purple',
 month: 8,

 tags: {
 timeTag: '8月',
 regionTag: '北关东',
 typeTag: '花火',
 layerTag: '详细介绍'
 
  },

 related: {
 regionRecommendations: [
 {
 id: 'takasaki-august',
 name: '第51回高崎大花火大会',
 date: '2025年8月23日',
 location: '群马县高崎市',
 visitors: '约90万人',
 link: '/august/hanabi/kitakanto/takasaki'
 },
 {
 id: 'toride-august',
 name: '第70回利根川大花火',
 date: '2025年8月9日',
 location: '茨城县取手市',
 visitors: '约12万人',
 link: '/august/hanabi/kitakanto/toride'
 }
 ],
 timeRecommendations: [
 {
 id: 'ashikaga-august',
 name: '第109回足利花火大会',
 date: '2025年8月2日',
 location: '栃木县足利市',
 visitors: '约45万人',
 link: '/august/hanabi/kitakanto/ashikaga'
 }
 ]
 },

 venues: [
 {
 name: '主会场',
 location: '利根川河畔大渡桥南北河川绿地',
 startTime: '19:30'
 }
 ],

 access: [
 {
 venue: '主会场',
 stations: [
 { 
 name: '前桥站', 
 lines: ['JR两毛线'], 
 walkTime: '乘坐专用巴士' 
 }
 ]
 }
 ],

 viewingSpots: [
 {
 name: '河川绿地主会场',
 rating: 5,
 crowdLevel: 'High',
 tips: '最佳观赏位置，利根川河畔美景',
 pros: ['最佳视角', '河畔景色', '设施良好'],
 cons: ['需要专用巴士', '人流较多', '早到占位']
 },
 {
 name: '大渡桥周边',
 rating: 4,
 crowdLevel: 'Medium',
 tips: '桥梁周边观赏区域，视野不错',
 pros: ['交通相对便利', '视野较好', '人流适中'],
 cons: ['距离稍远', '设施有限', '观赏角度有限']
 }
 ],

 history: {
 established: 1957,
 significance: '拥有近70年历史的群马县传统花火大会，前桥市夏季重要活动',
 highlights: [
 '近70年传统花火文化',
 '利根川河畔的绝美背景',
 '传统工艺花火技术',
 '音乐花火表演'
 ]
 },

 tips: [
 {
 category: '时间安排',
 items: [
 '建议提前了解专用巴士时间',
 '花火结束后注意返程交通',
 '关注官方举办确认信息'
 ]
 },
 {
 category: '必备物品',
 items: [
 '野餐垫或便携椅子',
 '防虫喷雾和驱蚊用品',
 '充足的饮用水和食物',
 '便携充电器和手电筒'
 ]
 }
 ],

 contact: {
 organizer: '前桥花火大会实行委员会',
 phone: '027-235-2211',
     website: 'https://www.maebashihanabi.jp/',
 socialMedia: '官方网站查询'
 },

 mapInfo: {
 hasMap: true,
 mapNote: '利根川河畔大渡桥南北河川绿地',
 parking: '专用停车场及临时停车场'
 },

 weatherInfo: {
 month: '8月',
 temperature: '最高33°C，最低22°C',
 humidity: '70%',
 rainfall: '小雨举行（恶劣天气取消）',
 recommendation: '山区气候，昼夜温差较大，请准备保暖衣物'
 },

 mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3226.3456789012345!2d139.0600000123456!3d36.3900000012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z5YmN5qmL5biC!5e0!3m2!1sja!2sjp!4v1234567890123!5m2!1sja!2sjp"
}; 