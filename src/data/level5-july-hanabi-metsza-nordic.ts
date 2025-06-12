import { HanabiData } from '@/types/hanabi';

export const metszaNordicHanabiData: HanabiData = {
 id: 'metsza-nordic-2025',
 name: '梅兹塔北欧花火2025',
  japaneseName: 'メッツァの北欧花火2025',
 englishName: 'Metsa Nordic Fireworks 2025',
 year: 2025,
 month: 7,
 date: '2025年7月12日',
 time: '19:40～约15分钟',
 duration: '约15分钟',
 fireworksCount: '非公开',
 expectedVisitors: '非公开',
 weather: '夏季',
 ticketPrice: '1650日元起',
 status: '确定举办',
 themeColor: 'green',
 
 tags: {
 timeTag: '7月',
 regionTag: '埼玉',
 typeTag: '花火',
 layerTag: '详细介绍'
 
  },
 
 venues: [
 {
 name: '梅兹塔',
 location: '埼玉县饭能市',
 startTime: '19:40',
 features: ['湖畔花火', '音乐同步', '北欧主题', '倒影观赏']
 }
 ],
 
 access: [
 {
 venue: '梅兹塔',
 stations: [
 {
 name: '西武池袋线饭能站',
 lines: ['西武池袋线'],
 walkTime: '巴士13分钟至梅兹塔(旧宫泽湖)下车'
 }
 ]
 }
 ],
 
 viewingSpots: [
 {
 name: '有料席',
 rating: 5,
 crowdLevel: '中等',
 tips: '1650日元起，湖畔绝佳位置，音乐同步观赏',
 pros: ['视野开阔', '舒适观赏', '倒影美景'],
 cons: ['需要预约', '有料观赏']
 },
 {
 name: '一般观赏区',
 rating: 4,
 crowdLevel: '较高',
 tips: '免费观赏，梅兹塔村庄内观赏',
 pros: ['免费观赏', '北欧氛围'],
 cons: ['位置受限', '人员较多']
 }
 ],
 
 history: {
 established: 2018,
 significance: '北欧8个国家大使馆推荐音乐背景的湖畔花火',
 highlights: ['音乐与花火完美同步', '湖面倒影观赏', '北欧主题体验']
 },
 
 tips: [
 {
 category: '观赏建议',
 items: [
 '建议提前到达体验北欧村庄氛围',
 '湖面倒影为观赏亮点之一',
 '携带野餐垫享受户外观赏'
 ]
 },
 {
 category: '交通提示',
 items: [
 '建议使用公共交通避免拥堵',
 '停车费土日祝为1500日元',
 '有料席需提前在官网预约'
 ]
 },
 {
 category: '北欧体验',
 items: [
 '可游览姆明谷乐园体验北欧文化',
 '梅兹塔村庄有北欧风格商店餐厅',
 '适合家庭亲子游体验'
 ]
 }
 ],
 
 contact: {
 organizer: '株式会社梅兹塔',
 phone: '详见官网',
 website: 'https://metsa-hanno.com/',
 socialMedia: '详见官网'
 },
 // 官方数据源验证
 officialSource: {
   walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0311e00804/',
   verificationDate: '2025-01-13',
   dataConfirmedBy: 'USER_PROVIDED' as const,
    lastChecked: '2025-01-13'
 },
 
 mapInfo: {
 hasMap: true,
 mapNote: '埼玉县饭能市宫泽327-6 梅兹塔',
 parking: '1000台 土日祝1500日元'
 },
 
 mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3227.6!2d139.3336!3d35.8567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018e2c7a7b8f123%3A0x789abc123def456!2z44Oh44OD44C444O844CA77yI5aKr546J44Kr5p2R77yJ!5e0!3m2!1sja!2sjp!4v1640000000000!5m2!1sja!2sjp',
 
 weatherInfo: {
 month: '7月',
 temperature: '28-30°C',
 humidity: '70%',
 rainfall: '梅雨后期',
 recommendation: '防暑用品、水分补充、防虫用品'
 },
 
 media: [
 {
 type: 'image',
 url: '/images/hanabi-placeholder.jpg',
 title: '梅兹塔北欧花火',
 description: '夜空与湖面交相辉映的北欧花火'
 }
 ],
 
 related: {
 regionRecommendations: [
 {
 id: 'seibu-en-2025',
 name: '西武园游乐园大火祭',
 date: '2025年7月19日',
 location: '西武园游乐园',
 visitors: '非公开',
 link: '/july/hanabi/saitama/seibu-en-2025'
 }
 ],
 timeRecommendations: [
 {
 id: 'iruma-base-2025',
 name: '入间基地纳凉祭',
 date: '2025年7月23日',
 location: '入间基地',
 visitors: '4万2000人',
 link: '/july/hanabi/saitama/iruma-base-2025'
 }
 ]
 }
}; 