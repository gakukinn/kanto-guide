import { HanabiData } from '@/types/hanabi';

export const saitamaOmagiHanabiData: HanabiData = {
 id: 'saitama-omagi-hanabi-2025',
 name: '埼玉市花火大会大间木公园会场',
  japaneseName: 'さいたま市花火大会 大間木公園会場',
 englishName: 'Saitama City Fireworks Festival Omagi Park Venue',
 year: 2025,
 date: '2025年8月9日',
 time: '19:00～20:30（预定）',
 duration: '约90分钟',
 fireworksCount: '未定',
 expectedVisitors: '约6万人',
 weather: '晴朗',
 ticketPrice: '免费',
 status: 'scheduled',
 themeColor: '#4f46e5',
 month: 8,

 tags: {
 timeTag: '8月',
 regionTag: '埼玉',
 typeTag: '花火',
 layerTag: '详细介绍'
 
  },

 venues: [
 {
 name: '大间木公园',
 location: '埼玉市绿区南部领辻',
 startTime: '19:00',
 features: [
 '都市公园内的花火大会',
 '家庭友好的观赏环境',
 '交通便利的市内会场',
 '绿区夏日风物诗'
 ]
 }
 ],

 access: [
 {
 venue: '大间木公园',
 stations: [
 {
 name: '东浦和站',
 lines: ['JR武蔵野线'],
 walkTime: '步行15分钟'
 }
 ]
 }
 ],

 viewingSpots: [
 {
 name: '大间木公园中央广场',
 rating: 4,
 crowdLevel: '普通',
 tips: '公园内最佳观赏位置，视野开阔',
 pros: ['正面观赏花火', '空间宽敞', '设施完善'],
 cons: ['人群较多', '需提前占位']
 },
 {
 name: '公园东侧区域',
 rating: 3,
 crowdLevel: '较少',
 tips: '侧面观赏位置，人群相对较少',
 pros: ['相对安静', '容易找到位置'],
 cons: ['视角稍偏', '部分遮挡']
 }
 ],

 history: {
 established: 2005,
 significance: '埼玉市合并后设立的代表性花火大会，体现城市发展成果',
 highlights: [
 '都市花火文化的新典范',
 '埼玉市绿区地域特色展现',
 '现代都市与传统花火的融合',
 '市民参与的地域活动'
 ]
 },

 tips: [
 {
 category: '观赏建议',
 items: [
 '建议傍晚提前到达确保观赏位置',
 '公园内设有临时休息区和饮食摊位',
 '适合全家观赏的都市花火体验',
 '注意遵守公园内的观赏规则'
 ]
 },
 {
 category: '交通建议',
 items: [
 'JR武蔵野线东浦和站最便利',
 '公园停车场台数有限，建议公共交通',
 '花火结束后会有人潮，建议稍等再离场'
 ]
 }
 ],

 contact: {
 organizer: '埼玉市观光国际交流课',
 phone: '048-813-1717',
 website: 'https://www.city.saitama.jp/',
 socialMedia: '@saitamacity'
 },

 mapInfo: {
 hasMap: true,
 mapNote: '大间木公园位于埼玉市绿区，交通便利的都市公园',
 parking: '有临时停车场设置，但台数有限，建议使用公共交通'
 },

 weatherInfo: {
 month: '8月',
 temperature: '最高33°C 最低25°C',
 humidity: '70-80%',
 rainfall: '夏季雷雨可能',
 recommendation: '防暑降温，备好雨具，选择舒适的观赏位置',
 rainPolicy: '小雨决行，荒天时中止',
 note: '都市公园内环境相对凉爽'
 },

 specialFeatures: {
 scale: '未定发数花火，约90分钟演出',
 location: '大间木公园内近距离观赏',
 tradition: '都市花火文化的现代体验',
 atmosphere: '约6万人参加的地域花火大会',
 collaboration: '公园景观与花火的完美结合'
 },

 special2025: {
 theme: '绿区夏日风物诗',
 concept: '都市公园花火盛典',
 memorial: '埼玉市花火大会20周年纪念',
 features: [
 '大间木公园改建后的首次大型花火',
 '绿区地区特色花火演出',
 '公园景观与花火的融合演出',
 '环保主题的花火设计',
 '市民参与的互动环节'
 ]
 },

 mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3238.123456789!2d139.683456!3d35.832123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018dbf12345678a%3A0x123456789abcdef0!2z5aSn6ZaT5pyo5YWs5ZyS!5e0!3m2!1sja!2sjp!4v1609459200000!5m2!1sja!2sjp',

 media: [
 {
 type: 'image' as const,
 url: '/images/hanabi/tamura-fireworks-main.svg',
 title: '埼玉市花火大会大间木公园会场',
 description: '都市公园中的现代花火盛典，绿区夏日风物诗'
 }
 ],

 related: {
 regionRecommendations: [
 {
 id: 'kumagaya-august',
 name: '熊谷花火大会',
 date: '2025年8月9日',
 location: '荒川河畔',
 visitors: '42万人',
 link: '/august/hanabi/saitama/kumagaya'
 },
 {
 id: 'todabashi-august',
 name: '戸田桥花火大会',
 date: '2025年8月2日',
 location: '荒川河川敷',
 visitors: '45万人',
 link: '/august/hanabi/saitama/todabashi'
 }
 ],
 timeRecommendations: [
 {
 id: 'asaka-august',
 name: '朝霞彩夏祭',
 date: '2025年8月2日',
 location: '朝霞跡地',
 visitors: '73万人',
 link: '/august/hanabi/saitama/asaka'
 }
 ]
 }
}; 