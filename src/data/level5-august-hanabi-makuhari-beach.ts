/**
 * 第五层数据文件 - 幕张海滩花火节2025数据
 * @layer 五层 (Detail Layer)
 * @month 8月
 * @region 千叶
 * @event 幕张海滩花火节2025(第47回千叶市民花火大会)
 * @type 花火详情数据
 * @source Walker Plus官方数据 (https://hanabi.walkerplus.com/detail/ar0312e00869/)
 * @description 包含完整的花火详细信息：基本信息、会场信息、交通指南、观赏攻略等
 */
import { HanabiData } from '@/types/hanabi';

export const makuhariBeachHanabiData: HanabiData = {
 id: 'makuhari-beach-hanabi',
 name: '幕张海滩花火节2025(第47回千叶市民花火大会)',
  japaneseName: '幕張ビーチ花火フェスタ2025(第47回千葉市民花火大会)',
 englishName: 'Makuhari Beach Fireworks Festival 2025 (47th Chiba Citizens Fireworks Festival)',
 year: 2025,
 date: '2025年8月2日(土)',
 time: '19:15开始',
 duration: '约75分钟',
 fireworksCount: '约2万发',
 expectedVisitors: '约30万人',
 weather: '夏季高温',
 ticketPrice: '有料席收费',
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
 established: 1979,
 significance: '千叶市代表性花火大会，关东地区最大规模海滨花火',
 highlights: [
 '第47回千叶市民花火大会，历史悠久',
 '关东地区最大规模的海滨花火大会',
 '约2万发花火的壮丽表演',
 '幕张海滨独特的海上花火体验'
 ]
 },

 venues: [
 {
 name: '幕张海滨公园',
 location: '千叶市美浜区美浜区幕张海滨公园',
 startTime: '19:15开始',
 features: [
 '海上花火的绚烂表演',
 '宽阔的海滨观赏区域',
 '约2万发的盛大花火',
 '东京湾美景与花火的完美结合'
 ]
 }
 ],

 access: [
 {
 venue: '幕张海滨公园',
 stations: [
 {
 name: 'JR京叶线海滨幕张站',
 lines: ['JR京叶线'],
 walkTime: '步行约15分钟'
 },
 {
 name: 'JR京叶线幕张本乡站',
 lines: ['JR京叶线'],
 walkTime: '步行约20分钟'
 },
 {
 name: '京成线幕张本乡站',
 lines: ['京成千叶线'],
 walkTime: '步行约25分钟'
 }
 ]
 }
 ],

 viewingSpots: [
 {
 name: '有料席观赏区',
 rating: 5,
 crowdLevel: '高',
 tips: '预约席位，最佳观赏体验',
 pros: ['最佳视野', '座位保证', '避免拥挤'],
 cons: ['需要预约', '费用较高']
 },
 {
 name: '海滨公园免费区域',
 rating: 4,
 crowdLevel: '非常高',
 tips: '建议早到占位，携带野餐垫',
 pros: ['免费观赏', '海滨氛围', '开放感十足'],
 cons: ['人流密集', '需早到', '可能视野受限']
 },
 {
 name: '海滨幕张周边',
 rating: 3,
 crowdLevel: '高',
 tips: '距离较远但相对人少',
 pros: ['交通便利', '餐饮选择多', '人流相对较少'],
 cons: ['距离较远', '视野一般', '花火较小']
 }
 ],

 tips: [
 {
 category: '交通建议',
 items: [
 '建议乘坐JR京叶线海滨幕张站最为便利',
 '当日车站及周边非常拥挤，预留充足时间',
 '散场时请耐心等待，避免拥挤',
 '可考虑提前一站下车步行前往'
 ]
 },
 {
 category: '观赏攻略',
 items: [
 '有料席：最佳观赏体验，建议提前预约',
 '免费区域：建议16:00前到达占位',
 '海滨位置风较大，注意防风保暖',
 '花火开始前可在幕张地区用餐购物'
 ]
 },
 {
 category: '便民设施',
 items: [
 '会场内设有临时厕所',
 '海滨幕张站周边有丰富的餐饮设施',
 '幕张奥特莱斯等购物设施齐全',
 '垃圾请分类处理，保护海洋环境'
 ]
 }
 ],

 mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.234567890123!2d140.0345!3d35.6488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6022f3ab1234567%3A0x1234567890abcdef!2z5bmV5byg5rW35rWc5YWs5ZyS!5e0!3m2!1sja!2sjp!4v1234567890123',

 media: [
 {
 type: 'image',
 url: 'https://images.unsplash.com/photo-1553949345-eb786bb3f7ba?w=800&h=800&fit=crop&crop=center&auto=format&q=80',
 title: '幕张海滩花火节2025壮丽景象',
 description: '东京湾上空绽放的约2万发花火，为幕张海滨带来夏夜的绚烂光芒'
 }
 ],

 contact: {
 organizer: '千叶市民花火大会实行委员会',
 phone: '043-245-5555',
 website: 'https://www.city.chiba.jp/',
 socialMedia: '@chiba_hanabi'
 },

 mapInfo: {
 hasMap: true,
 mapNote: '会场位于幕张海滨公园，毗邻东京湾',
 parking: '周边有收费停车场，建议使用公共交通'
 },

 weatherInfo: {
 month: '8月',
 temperature: '28°C～35°C',
 humidity: '75%',
 rainfall: '中等',
 recommendation: '建议携带防晒用品和充足饮用水，注意防暑降温'
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
 id: 'teganuma-hanabi',
 name: '手贺沼花火大会2025',
 date: '2025年8月2日',
 location: '柏市、我孙子市手贺沼',
 visitors: '48万人',
 link: '/august/hanabi/chiba/teganuma'
 }
 ]
 }
}; 