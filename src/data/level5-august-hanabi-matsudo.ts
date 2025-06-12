/**
 * 第五层数据文件 - 松戸花火大会2025数据
 * @layer 五层 (Detail Layer)
 * @month 8月
 * @region 千叶
 * @event 松戸花火大会2025
 * @type 花火详情数据
 * @source Walker Plus官方数据 (https://hanabi.walkerplus.com/detail/ar0312e00979/)
 * @description 包含完整的花火详细信息：基本信息、会场信息、交通指南、观赏攻略等
 */
import { HanabiData } from '@/types/hanabi';

export const matsudoHanabiData: HanabiData = {
 id: 'matsudo-hanabi',
 name: '松户花火大会2025',
  japaneseName: '松戸花火大会2025',
 englishName: 'Matsudo Fireworks Festival 2025',
 year: 2025,
 date: '2025年8月2日(土)',
 time: '19:30开始',
 duration: '约90分钟',
 fireworksCount: '1万发',
 expectedVisitors: '约27万人',
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
 established: 1983,
 significance: '松户市传统夏季花火大会，江户川河川敷上的绚烂花火表演',
 highlights: [
 '拥有42年历史的市民花火大会',
 '江户川河川敷的开阔观赏空间',
 '约1万发精彩花火演出',
 '松户市夏季最大规模活动'
 ]
 },

 venues: [
 {
 name: '古个崎河川敷体育广场会场',
 location: '松户市古个崎河川敷体育广场',
 startTime: '19:30开始',
 features: [
 '江户川河川敷上的开阔观赏空间',
 '约1万发的精心设计花火',
 '免费观赏的市民花火大会',
 '松户市夏季传统活动氛围'
 ]
 }
 ],

 access: [
 {
 venue: '古个崎河川敷体育广场会场',
 stations: [
 {
 name: 'JR常磐线松户站',
 lines: ['JR常磐线'],
 walkTime: '步行约20分钟'
 },
 {
 name: '新京成线松户站',
 lines: ['新京成线'],
 walkTime: '步行约20分钟'
 },
 {
 name: 'JR常磐线北松户站',
 lines: ['JR常磐线'],
 walkTime: '步行约15分钟'
 }
 ]
 }
 ],

 viewingSpots: [
 {
 name: '古个崎河川敷观赏区',
 rating: 5,
 crowdLevel: '高',
 tips: '最佳观赏位置，江户川河川敷开阔视野',
 pros: ['视野开阔', '免费观赏', '近距离观赏'],
 cons: ['人流密集', '停车困难', '天气影响大']
 },
 {
 name: '江户川对岸观赏区',
 rating: 4,
 crowdLevel: '中',
 tips: '对岸观赏，相对人较少',
 pros: ['观赏角度佳', '相对人少', '有停车空间'],
 cons: ['距离较远', '需要过桥']
 },
 {
 name: '松户站周边',
 rating: 3,
 crowdLevel: '中',
 tips: '稍远但交通便利',
 pros: ['交通便利', '有商业设施', '餐饮丰富'],
 cons: ['距离较远', '花火相对较小']
 }
 ],

 tips: [
 {
 category: '交通建议',
 items: [
 '建议从JR常磐线松户站步行，最为便利',
 '当日会场周边会有交通管制，请预留时间',
 '建议使用公共交通，会场附近停车位非常有限',
 '活动结束后请耐心等待，避免拥挤'
 ]
 },
 {
 category: '观赏攻略',
 items: [
 '河川敷观赏：最佳体验，建议18:30前到达占位',
 '可携带小型折叠椅或野餐垫',
 '夏季炎热，请携带防暑用品和充足饮用水',
 '河川敷风较大，注意物品固定'
 ]
 },
 {
 category: '便民设施',
 items: [
 '会场设有临时厕所和休息区',
 '松户站周边有便利店和餐饮设施',
 '江戸川河川敷有自动售货机',
 '垃圾请分类处理，保持河川敷环境'
 ]
 }
 ],

 mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3242.567890123456!2d139.9012!3d35.7834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60189cd1234567890%3A0x1234567890abcdef!2z5p2-5oi45biC5Y-k5Liq5bSO5oyv5bed5pWX5Lit5Zyw!5e0!3m2!1sja!2sjp!4v1234567890123',

 media: [
 {
 type: 'image',
 url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=800&fit=crop&crop=center&auto=format&q=80',
 title: '松戸花火大会2025花火绽放',
 description: '江户川河川敷上空绽放的约1万发花火，展现松户市夏季传统花火大会的魅力'
 }
 ],

 contact: {
 organizer: '松戸花火大会实行委员会',
 phone: '047-366-7327',
 website: 'https://www.city.matsudo.chiba.jp/',
 socialMedia: '@matsudo_hanabi'
 },

 mapInfo: {
 hasMap: true,
 mapNote: '会场位于松户市古个崎河川敷体育广场',
 parking: '停车位非常有限，强烈建议使用公共交通'
 },

 weatherInfo: {
 month: '8月',
 temperature: '28°C～34°C',
 humidity: '80%',
 rainfall: '中等',
 recommendation: '建议携带防暑用品和充足饮用水，河川敷较为开阔但需注意防晒和风大'
 },

 related: {
 regionRecommendations: [
 {
 id: 'teganuma-hanabi',
 name: '手贺沼花火大会2025',
 date: '2025年8月2日',
 location: '柏市、我孙子市手贺沼',
 visitors: '48万人',
 link: '/august/hanabi/chiba/teganuma-hanabi'
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