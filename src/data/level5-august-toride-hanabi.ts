/**
 * 第五层数据文件 - 第70回利根川大花火详情数据
 * @layer 五层 (Detail Data)
 * @month 8月
 * @region 北关东
 * @event 利根川大花火
 * @type 花火详情数据文件
 */
import { HanabiData } from '../types/hanabi';

export const torideHanabiData: HanabiData = {
 id: 'toride-august',
 name: '第70回利根川大花火',
  japaneseName: '第70回利根川大花火大会',
 englishName: '70th Tonegawa Fireworks Festival',
  title: '第70回利根川大花火 - 8月北关东花火大会',
  description: '第70回利根川大花火详情信息，包含举办时间、地点、交通方式、观赏攻略等完整信息。',
 year: 2025,
 date: '2025年8月9日(土)',
 time: '19:30-20:30',
 duration: '60分钟',
 fireworksCount: '约1万发',
 expectedVisitors: '约12万人',
 weather: '小雨举行（恶劣天气取消）',
 ticketPrice: '免费观赏',
 status: '已确认举办',
 themeColor: 'green',
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
 id: 'koga-august',
 name: '第20回古河花火大会',
 date: '2025年8月2日',
 location: '茨城县古河市',
 visitors: '约20万人',
 link: '/august/hanabi/kitakanto/koga'
 },
 {
 id: 'hitachinaka-august',
 name: '第31回常陆那珂祭花火大会',
 date: '2025年8月16日',
 location: '茨城县常陆那珂市',
 visitors: '非公开',
 link: '/august/hanabi/kitakanto/hitachinaka'
 }
 ],
 timeRecommendations: [
 {
 id: 'maebashi-august',
 name: '第69回前桥花火大会',
 date: '2025年8月9日',
 location: '群马县前桥市',
 visitors: '非公开',
 link: '/august/hanabi/kitakanto/maebashi'
 }
 ]
 },

 venues: [
 {
 name: '主会场',
 location: '取手绿地运动公园',
 startTime: '19:30'
 }
 ],

 access: [
 {
 venue: '主会场',
 stations: [
 { 
 name: '取手站', 
 lines: ['关东铁道常总线'], 
 walkTime: '徒步约5分钟' 
 }
 ]
 }
 ],

 viewingSpots: [
 {
 name: '绿地运动公园主会场',
 rating: 5,
 crowdLevel: 'Very High',
 tips: '最佳观赏位置，视野开阔',
 pros: ['最佳视角', '设施完备', '交通便利'],
 cons: ['人流量大', '需要早到占位', '竞争激烈']
 },
 {
 name: '利根川河岸',
 rating: 4,
 crowdLevel: 'High',
 tips: '河岸观赏区域，景色优美',
 pros: ['河岸美景', '空间较大', '氛围良好'],
 cons: ['距离稍远', '设施有限', '需要早到']
 }
 ],

 history: {
 established: 1956,
 significance: '拥有70年历史的利根川传统花火大会，取手市夏季重要盛典',
 highlights: [
 '70年传统花火文化传承',
 '利根川河畔的绝美景色',
 '音乐同步花火表演',
 '茨城县重要的夏季活动'
 ]
 },

 tips: [
 {
 category: '时间安排',
 items: [
 '建议下午5点前到达占位',
 '关注音乐同步花火时间',
 '确认天气状况和举办信息'
 ]
 },
 {
 category: '必备物品',
 items: [
 '野餐垫或便携椅子',
 '防虫喷雾和驱蚊用品',
 '充足的饮用水和小食',
 '便携充电器和手电筒'
 ]
 }
 ],

 contact: {
 organizer: '取手市观光协会',
 phone: '0297-74-2141',
     website: 'https://www.toride-kankou.net/page/page000028.html',
 socialMedia: '官方网站查询'
 },

 mapInfo: {
 hasMap: true,
 mapNote: '取手绿地运动公园',
 parking: '临时停车场及周边停车场'
 },

 weatherInfo: {
 month: '8月',
 temperature: '最高31°C，最低23°C',
 humidity: '78%',
 rainfall: '小雨举行（恶劣天气取消）',
 recommendation: '夏季炎热潮湿，请注意防暑和防蚊虫'
 },

 mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3225.2345678901234!2d140.0500000123456!3d35.9000000012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z5Y+W5omL57ay5Zyw6YGL5YuV5YWs5ZyS!5e0!3m2!1sja!2sjp!4v1234567890123!5m2!1sja!2sjp"
}; 