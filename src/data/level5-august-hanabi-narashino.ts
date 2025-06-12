/**
 * 第五层数据文件 - 令和7年习志野驻屯地夏祭数据
 * @layer 五层 (Detail Layer)
 * @month 8月
 * @region 千叶
 * @event 令和7年习志野驻屯地夏祭
 * @type 花火详情数据
 * @source Walker Plus官方数据 (https://hanabi.walkerplus.com/detail/ar0312e07621/)
 * @description 包含完整的花火详细信息：基本信息、会场信息、交通指南、观赏攻略等
 */
import { HanabiData } from '@/types/hanabi';

export const narashinoHanabiData: HanabiData = {
 id: 'narashino-hanabi',
 name: '令和7年习志野驻屯地夏祭',
  japaneseName: '令和7年 習志野駐屯地夏まつり',
 englishName: 'Reiwa 7 Narashino Garrison Summer Festival',
 year: 2025,
 date: '2025年8月2日(土)',
 time: '17:00开始',
 duration: '约180分钟',
 fireworksCount: '约850发',
 expectedVisitors: '约5万人',
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
 established: 1990,
 significance: '陆上自卫队习志野驻屯地传统夏季祭典，展现军民交流与花火文化',
 highlights: [
 '拥有35年历史的自卫队夏季祭典',
 '驻屯地内的独特花火体验',
 '约850发精彩花火演出',
 '军民交流的特色活动'
 ]
 },

 venues: [
 {
 name: '习志野驻屯地会场',
 location: '船桥市陆上自卫队习志野驻屯地',
 startTime: '17:00开始',
 features: [
 '自卫队驻屯地内的特殊花火体验',
 '开放式的驻屯地活动区域',
 '约850发的精心设计花火',
 '军民交流的独特活动氛围'
 ]
 }
 ],

 access: [
 {
 venue: '习志野驻屯地会场',
 stations: [
 {
 name: 'JR总武线津田沼站',
 lines: ['JR总武线'],
 walkTime: '步行约20分钟'
 },
 {
 name: '新京成线前原站',
 lines: ['新京成线'],
 walkTime: '步行约10分钟'
 },
 {
 name: '东叶高速线船桥日大前站',
 lines: ['东叶高速线'],
 walkTime: '步行约15分钟'
 }
 ]
 }
 ],

 viewingSpots: [
 {
 name: '驻屯地内观赏区',
 rating: 5,
 crowdLevel: '高',
 tips: '最佳观赏位置，体验驻屯地内花火',
 pros: ['独特体验', '免费观赏', '近距离观赏'],
 cons: ['入场管制', '人流密集', '活动时间长']
 },
 {
 name: '驻屯地正门周边',
 rating: 4,
 crowdLevel: '中',
 tips: '门外观赏，相对人较少',
 pros: ['观赏角度佳', '相对人少', '交通便利'],
 cons: ['距离较远', '视野有限']
 },
 {
 name: '前原站周边',
 rating: 3,
 crowdLevel: '中',
 tips: '稍远但交通便利',
 pros: ['交通便利', '有商业设施', '停车相对容易'],
 cons: ['距离较远', '花火相对较小']
 }
 ],

 tips: [
 {
 category: '交通建议',
 items: [
 '建议从新京成线前原站步行最为便利',
 '当日驻屯地周边会有交通管制，请预留时间',
 '建议使用公共交通，停车位有限',
 '活动结束后请耐心等待，避免拥挤'
 ]
 },
 {
 category: '观赏攻略',
 items: [
 '驻屯地内观赏：独特体验，建议16:00前到达',
 '可携带小型折叠椅或野餐垫',
 '夏季炎热，请携带防暑用品和充足饮用水',
 '驻屯地内有临时摊位和展示活动'
 ]
 },
 {
 category: '便民设施',
 items: [
 '驻屯地内设有临时厕所和休息区',
 '前原站周边有便利店和餐饮设施',
 '可体验自卫队装备展示等特色活动',
 '垃圾请分类处理，保持驻屯地环境'
 ]
 }
 ],

 mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3242.567890123456!2d140.0234!3d35.6945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60228cd1234567890%3A0x1234567890abcdef!2z6Imv5b-X6YeO6am_5bGv5Zyw!5e0!3m2!1sja!2sjp!4v1234567890123',

 media: [
 {
 type: 'image',
 url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=800&fit=crop&crop=center&auto=format&q=80',
 title: '令和7年习志野驻屯地夏祭花火绽放',
 description: '陆上自卫队习志野驻屯地上空绽放的约850发花火，展现军民交流的独特魅力'
 }
 ],

 contact: {
 organizer: '陆上自卫队习志野驻屯地',
 phone: '047-466-2141',
 website: 'https://www.mod.go.jp/',
 socialMedia: '@narashino_camp'
 },

 mapInfo: {
 hasMap: true,
 mapNote: '会场位于陆上自卫队习志野驻屯地内',
 parking: '停车位有限，建议使用公共交通'
 },

 weatherInfo: {
 month: '8月',
 temperature: '28°C～34°C',
 humidity: '80%',
 rainfall: '中等',
 recommendation: '建议携带防暑用品和充足饮用水，驻屯地内较为开阔但需注意防晒'
 },

 related: {
 regionRecommendations: [
 {
 id: 'ichikawa-hanabi',
 name: '第41回市川市民纳凉花火大会',
 date: '2025年8月2日',
 location: '市川市江户川河川敷',
 visitors: '约49万人',
 link: '/august/hanabi/chiba/ichikawa'
 },
 {
 id: 'makuhari-beach-hanabi',
 name: '幕张海滩花火节2025(第47回千叶市民花火大会)',
 date: '2025年8月2日',
 location: '千叶市美浜区幕张海滨公园',
 visitors: '约30万人',
 link: '/august/hanabi/chiba/makuhari-beach-hanabi'
 }
 ],
 timeRecommendations: [
 {
 id: 'choshi-minato-hanabi',
 name: '铫子港祭花火大会',
 date: '2025年8月2日',
 location: '铫子市利根川河畔',
 visitors: '约7万人',
 link: '/august/hanabi/chiba/choshi-minato-hanabi'
 }
 ]
 }
}; 