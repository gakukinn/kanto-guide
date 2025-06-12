/**
 * 第五层数据文件 - 第31回常陆那珂祭花火大会详情数据
 * @layer 五层 (Detail Data)
 * @month 8月
 * @region 北关东
 * @event 常陆那珂祭花火大会
 * @type 花火详情数据文件
 */
import { HanabiData } from '../types/hanabi';

export const hitachinakaHanabiData: HanabiData = {
 id: 'hitachinaka-august',
 name: '第31回常陆那珂祭花火大会',
  japaneseName: '第31回ひたちなか祭花火大会',
 englishName: '31st Hitachinaka Festival Fireworks',
  title: '第31回常陆那珂祭花火大会 - 8月北关东花火大会',
  description: '第31回常陆那珂祭花火大会详情信息，包含举办时间、地点、交通方式、观赏攻略等完整信息。',
 year: 2025,
 date: '2025年8月16日(土)',
 time: '19:30-20:30',
 duration: '60分钟',
 fireworksCount: '3000发',
 expectedVisitors: '非公开',
 weather: '小雨举行（恶劣天气取消）',
 ticketPrice: '免费观赏',
 status: '已确认举办',
 themeColor: 'indigo',
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
 id: 'toride-august',
 name: '第70回利根川大花火',
 date: '2025年8月9日',
 location: '茨城县取手市',
 visitors: '约12万人',
 link: '/august/hanabi/kitakanto/toride'
 },
 {
 id: 'koga-august',
 name: '第20回古河花火大会',
 date: '2025年8月2日',
 location: '茨城县古河市',
 visitors: '约20万人',
 link: '/august/hanabi/kitakanto/koga'
 }
 ],
 timeRecommendations: [
 {
 id: 'takasaki-august',
 name: '第51回高崎大花火大会',
 date: '2025年8月23日',
 location: '群马县高崎市',
 visitors: '约90万人',
 link: '/august/hanabi/kitakanto/takasaki'
 }
 ]
 },

 venues: [
 {
 name: '主会场',
 location: '陆上自卫队胜田驻屯地',
 startTime: '19:30'
 }
 ],

 access: [
 {
 venue: '主会场',
 stations: [
 { 
 name: '胜田站', 
 lines: ['JR常磐线'], 
 walkTime: '徒步约20分钟' 
 }
 ]
 }
 ],

 viewingSpots: [
 {
 name: '自卫队驻屯地主会场',
 rating: 5,
 crowdLevel: 'Medium',
 tips: '独特的自卫队驻屯地举办，安全有序',
 pros: ['独特场地', '安全有序', '设施良好'],
 cons: ['规模相对较小', '位置稍偏', '特殊场地']
 },
 {
 name: '驻屯地周边',
 rating: 3,
 crowdLevel: 'Low',
 tips: '周边观赏区域，视野有限',
 pros: ['人流较少', '较为安静', '停车便利'],
 cons: ['视野有限', '距离较远', '观赏效果一般']
 }
 ],

 history: {
 established: 1995,
 significance: '在陆上自卫队驻屯地举办的特色花火大会，30年历史的地区盛典',
 highlights: [
 '自卫队驻屯地独特场地',
 '30年传统地区盛典',
 '特色花火表演',
 '安全有序的管理'
 ]
 },

 tips: [
 {
 category: '时间安排',
 items: [
 '建议提前1小时到达',
 '注意自卫队驻屯地特殊规定',
 '关注官方举办确认信息'
 ]
 },
 {
 category: '必备物品',
 items: [
 '野餐垫或便携椅子',
 '防虫喷雾和驱蚊用品',
 '充足的饮用水和小食',
 '便携充电器'
 ]
 }
 ],

 contact: {
 organizer: '常陆那珂祭实行委员会',
 phone: '029-273-0111',
     website: 'https://hitachikaihin.jp/',
 socialMedia: '官方网站查询'
 },

 mapInfo: {
 hasMap: true,
 mapNote: '陆上自卫队胜田驻屯地',
 parking: '驻屯地内及周边临时停车场'
 },

 weatherInfo: {
 month: '8月',
 temperature: '最高30°C，最低22°C',
 humidity: '80%',
 rainfall: '小雨举行（恶劣天气取消）',
 recommendation: '海边气候湿润，请注意防潮和防蚊虫'
 },

 mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3228.5678901234567!2d140.5300000123456!3d36.4100000012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z5bi46ZmP6YKj6LKC5biC!5e0!3m2!1sja!2sjp!4v1234567890123!5m2!1sja!2sjp"
}; 