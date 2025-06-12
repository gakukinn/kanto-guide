import { HanabiData } from '@/types/hanabi';

export const ogawaTanabataHanabiData: HanabiData = {
 id: 'ogawa-tanabata-2025',
 name: '第77回小川町七夕祭花火大会',
  japaneseName: '第77回 小川町七夕まつり花火大会',
 englishName: 'Ogawa Town Tanabata Festival Fireworks 2025',
 year: 2025,
 month: 7,
 date: '2025年7月26日',
 time: '20:00-20:15',
 duration: '约15分钟',
 fireworksCount: '约200发',
 expectedVisitors: '约9万人',
 weather: '夏季晴朗',
 ticketPrice: '免费观赏',
 status: '2025年确定举办',
 themeColor: 'purple',
 
 tags: {
 timeTag: '7月',
 regionTag: '埼玉',
 typeTag: '花火',
 layerTag: '详细介绍'
 
  },
 
 venues: [
 {
 name: '小川町站周边',
 location: '埼玉县比企郡小川町',
 startTime: '20:00',
 features: ['交通便利', '观赏角度良好', '七夕竹饰装饰']
 }
 ],
 
 access: [
 {
 venue: '小川町站周边',
 stations: [
 {
 name: 'JR、东武东上线小川町站',
 lines: ['JR八高线', '东武东上线'],
 walkTime: '即到'
 }
 ]
 }
 ],
 
 viewingSpots: [
 {
 name: '车站前广场',
 rating: 4.5,
 crowdLevel: '高',
 tips: '最佳观赏位置，建议提前30分钟到达',
 pros: ['最佳观赏位置', '交通便利', '设施完善'],
 cons: ['人群较多', '需提前占位']
 },
 {
 name: '站前商店街',
 rating: 4.0,
 crowdLevel: '中',
 tips: '可体验七夕装饰氛围',
 pros: ['七夕装饰氛围浓厚', '便利设施多', '拍照背景好'],
 cons: ['视野有所遮挡', '商店影响']
 }
 ],
 
 history: {
 established: 1949,
 significance: '小川町传统七夕祭的重要组成部分，延续77年的历史传统',
 highlights: [
 '1949年开始举办',
 '结合传统七夕祭与花火表演',
 '是埼玉县具有代表性的夏季祭典'
 ]
 },
 
 tips: [
 {
 category: '观赏建议',
 items: [
 '祭典从11:00开始，可提前体验七夕祭氛围',
 '花火时间短暂，建议提前30分钟到达',
 '车站周边即可观赏，无需远行'
 ]
 },
 {
 category: '交通提示',
 items: [
 'JR和东武东上线均可到达',
 '车站出口即为祭典会场',
 '有免费停车场但建议乘坐电车'
 ]
 },
 {
 category: '祭典体验',
 items: [
 '可体验传统七夕竹饰制作',
 '观看传统舞蹈表演',
 '品尝当地特色小食'
 ]
 }
 ],
 
 contact: {
 organizer: '小川町七夕祭实行委员会',
 phone: '0493-72-0280',
 website: 'https://www.town.ogawa.saitama.jp/kanko/kanko_tokusan/ogawamachitanabatamatsuri/5267.html',
 socialMedia: '官方网站查询'
 },
 // 官方数据源验证
 officialSource: {
   walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0311e00802/',
   verificationDate: '2025-01-13',
   dataConfirmedBy: 'USER_PROVIDED' as const,
    lastChecked: '2025-01-13'
 },
 
 mapInfo: {
 hasMap: true,
 mapNote: '小川町站周边即为会场',
 parking: '有免费停车场'
 },
 
 weatherInfo: {
 month: '7月下旬',
 temperature: '28-30℃',
 humidity: '70%',
 rainfall: '少雨',
 recommendation: '建议携带扇子和水分补充用品'
 },
 
 mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3229.5!2d139.3431!3d36.0536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x601f0c8c8c8c8c8c%3A0x8c8c8c8c8c8c8c8c!2z5bCP5bed55S65bCP5bed55S65rWe!5e0!3m2!1sja!2sjp!4v1234567890123',
 
 media: [
 {
 type: 'image',
 url: '/images/hanabi-placeholder.jpg',
 title: '小川町七夕祭花火大会',
 description: '七夕祭夜空中绽放的绚丽花火'
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