import { HanabiData } from '@/types/hanabi';

export const irumaBaseHanabiData: HanabiData = {
 id: 'iruma-base-2025',
 name: '入间基地纳凉祭~盆踊与花火之夜',
  japaneseName: '令和7年度入間基地納涼祭～盆踊りと花火の夕べ～',
 englishName: 'Iruma Air Base Summer Festival - Bon Dance and Fireworks Evening',
 year: 2025,
 date: '2025年7月23日(水)',
 time: '花火打上20:20～20:50',
 duration: '约30分钟',
 fireworksCount: '约900发',
 expectedVisitors: '4万2000人',
 weather: '夏季温暖',
 ticketPrice: '免费入场',
 status: '开催预定',
 themeColor: '#2E5984',
 month: 7,

 tags: {
 timeTag: '7月',
 regionTag: '埼玉',
 typeTag: '花火',
 layerTag: '详细介绍'
 
  },

 history: {
 established: 1950,
 significance: '航空自卫队入间基地举办的传统夏祭',
 highlights: [
 '全日本唯一在现役军事基地举办的花火大会',
 '传统盆踊与现代花火的完美结合',
 '军事飞机背景下的独特花火体验',
 '地域居民与自卫队员共同参与的交流活动'
 ]
 },

 venues: [
 {
 name: '航空自卫队入间基地',
 location: '埼玉县狭山市稲荷山2-3',
 startTime: '17:30开门',
 features: [
 '基地内特殊环境',
 '军机背景观赏',
 '盆踊参与体验',
 '自卫队文化体验'
 ]
 }
 ],

 access: [
 {
 venue: '航空自卫队入间基地',
 stations: [
 {
 name: '稲荷山公园站',
 lines: ['西武稲荷山线'],
 walkTime: '约10分钟(稲荷山门)'
 },
 {
 name: '入间市站',
 lines: ['西武池袋线'],
 walkTime: '约15分钟(正门)'
 }
 ]
 }
 ],

 viewingSpots: [
 {
 name: '主会场观赏区',
 rating: 5,
 crowdLevel: '非常拥挤',
 tips: '建议携带小垫子，避免占用过大空间。17:30开门后立即入场。',
 pros: ['近距离观赏花火', '可参与盆踊体验', '设施完善'],
 cons: ['人群拥挤', '需要早到占位', '空间受限']
 },
 {
 name: '稲荷山门周边',
 rating: 3,
 crowdLevel: '普通',
 tips: '携带望远镜效果更佳。19:30前到达较好。',
 pros: ['视野开阔', '人群相对较少', '交通便利'],
 cons: ['距离较远', '观赏效果一般', '无设施']
 },
 {
 name: '正门周边',
 rating: 3,
 crowdLevel: '较少',
 tips: '注意不要妨碍交通，选择安全地点观赏。20:00前到达。',
 pros: ['人群较少', '适合家庭', '安全性好'],
 cons: ['距离较远', '视角受限', '设施不足']
 }
 ],

 tips: [
 {
 category: '交通须知',
 items: [
 '基地内无停车场，严禁开车或摩托车前往',
 '建议使用电车+步行方式前往',
 '自行车可停放在指定区域(稲荷山门约100台，正门约500台)',
 '避免在开门前17:30排队等候'
 ]
 },
 {
 category: '入场指南',
 items: [
 '17:30开门，建议准时到达',
 '携带身份证件以备检查',
 '禁止携带酒类、危险物品',
 '大型行李和垫子受限制'
 ]
 },
 {
 category: '观赏体验',
 items: [
 '可参与传统盆踊体验',
 '观赏自卫队装备展示',
 '品尝军事基地特色美食',
 '与自卫队员互动交流'
 ]
 },
 {
 category: '安全注意',
 items: [
 '遵守基地内安全规定',
 '听从工作人员指挥',
 '注意儿童安全管理',
 '紧急情况下有序撤离'
 ]
 }
 ],

 contact: {
 organizer: '航空自卫队入间基地',
 phone: '04-2953-6131',
 website: 'https://www.mod.go.jp/asdf/iruma/',
 socialMedia: ''
 },
 // 官方数据源验证
 officialSource: {
   walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0311e00805/',
   verificationDate: '2025-01-13',
   dataConfirmedBy: 'USER_PROVIDED' as const,
    lastChecked: '2025-01-13'
 },

 mapInfo: {
 hasMap: true,
 mapNote: '基地内地图在入场时发放',
 parking: '无停车场，禁止开车前往'
 },

 weatherInfo: {
 month: '7月',
 temperature: '最高30°C，最低22°C',
 humidity: '高湿度，约80%',
 rainfall: '梅雨季节后期，偶有阵雨',
 recommendation: '建议穿着轻便透气服装，携带防虫喷雾',
 rainPolicy: '荒天时延期至7月24日，24日也荒天则中止',},

 mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3235.0123456789!2d139.4123456!3d35.8234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018e6a1234567%3A0x1234567890abcdef!2s%E8%88%AA%E7%A9%BA%E8%87%AA%E8%A1%9B%E9%9A%8A%E5%85%A5%E9%96%93%E5%9F%BA%E5%9C%B0!5e0!3m2!1sja!2sjp!4v1234567890123!5m2!1sja!2sjp',

 media: [
 {
 type: 'video',
 url: '/videos/iruma-base-hanabi.mp4',
 title: '入间基地花火大会精彩片段',
 description: '军事基地背景下的独特花火体验'
 },
 {
 type: 'image',
 url: '/images/iruma-base-hanabi-1.jpg',
 title: '基地内花火观赏',
 description: '在现役军事基地内观赏花火的珍贵体验'
 },
 {
 type: 'image',
 url: '/images/iruma-base-hanabi-2.jpg',
 title: '盆踊与花火',
 description: '传统盆踊与现代花火的完美结合'
 }
 ],

 related: {
 regionRecommendations: [
 {
 id: 'koshigaya-2025',
 name: '越谷花火大会',
 date: '2025年7月26日',
 location: '越谷市',
 visitors: '27万人',
 link: '/july/hanabi/saitama/koshigaya-2025'
 },
 {
 id: 'seibu-en-2025',
 name: '西武园游乐园大火祭',
 date: '2025年7月19日',
 location: '所泽市',
 visitors: '非公开',
 link: '/july/hanabi/saitama/seibu-en-2025'
 }
 ],
 timeRecommendations: [
 {
 id: 'ogawa-tanabata-2025',
 name: '小川町七夕祭花火大会',
 date: '2025年7月26日',
 location: '小川町',
 visitors: '约9万人',
 link: '/july/hanabi/saitama/ogawa-tanabata-2025'
 }
 ]
 }
}; 