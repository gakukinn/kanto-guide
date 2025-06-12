import { HanabiData } from '@/types/hanabi';

export const tachikawaShowaHanabiData: HanabiData = {
 id: 'tachikawa-showa-kinen-hanabi',
 name: '立川祭国营昭和纪念公园花火大会',
  japaneseName: '第67回 立川まつり国営昭和記念公園花火大会',

 englishName: 'Tachikawa Festival Showa Kinen Park Fireworks',
 year: 2025,
 date: '2025年7月26日(土)',
 time: '19:15开场，20:15结束',
 duration: '60分钟',
 fireworksCount: '5000发',
 expectedVisitors: '32万2575人',
 weather: '夏季夜间，适宜观赏',
 ticketPrice: '有料席另行收费',
 status: '开催予定',
 themeColor: '#FF6B6B',
 month: 7,

 tags: {
 timeTag: '7月',
 regionTag: '东京',
 typeTag: '花火',
 layerTag: '详细介绍'
 
  },

 related: {
 regionRecommendations: [
 {
 id: 'sumida',
 name: '第48回隅田川花火大会',
 date: '2025年7月26日',
 location: '隅田川两岸',
 visitors: '约91万人',
 link: '/july/hanabi/tokyo/sumida-hanabi'
 }
 ],
 timeRecommendations: [
 {
 id: 'hachioji-hanabi',
 name: '八王子花火大会',
 date: '2025年7月26日',
 location: '富士森公园',
 visitors: '约9万人',
 link: '/july/hanabi/tokyo/hachioji-hanabi'
 }
 ]
 },

 history: {
 established: 1977,
 significance: '立川市代表性夏季花火传统',
 highlights: [
 '立川夏季的风物诗活动',
 '都内罕见的大型花火展示',
 '艺协玉等精心设计花火',
 '国营公园内的特殊观赏体验'
 ]
 },

 venues: [
 {
 name: '国营昭和纪念公园',
 location: '东京都立川市绿町3173',
 startTime: '19:15开场，20:15结束',
 features: [
 '都内罕见的尺玉大迫力花火',
 '一尺五寸玉等巨型花火',
 '艺协玉花火职人竞技入赏作品',
 '广阔芝生观赏区域开放感十足'
 ]
 }
 ],

 access: [
 {
 venue: '国营昭和纪念公园',
 stations: [
 {
 name: '立川站',
 lines: ['JR中央线', 'JR南武线', 'JR青梅线'],
 walkTime: '步行约15分钟'
 },
 {
 name: '西立川站',
 lines: ['JR青梅线'],
 walkTime: '步行约2分钟'
 },
 {
 name: '立川北站',
 lines: ['多摩都市单轨电车'],
 walkTime: '步行约13分钟'
 }
 ]
 }
 ],

 viewingSpots: [
 {
 name: '有料观览席（大家的原野）',
 rating: 5,
 crowdLevel: '高',
 tips: '国营昭和纪念公园内芝生区域，视野最佳',
 pros: ['视野绝佳', '座位保证', '开放感十足'],
 cons: ['需要购票', '价格较高']
 },
 {
 name: '昭和纪念公园免费观览区',
 rating: 4,
 crowdLevel: '高',
 tips: '18时后入园免费，但需早到占位',
 pros: ['免费入园', '公园内观赏', '设施完善'],
 cons: ['人流密集', '需早到占位', '视野可能受限']
 },
 {
 name: '立川站周边高楼观赏',
 rating: 3,
 crowdLevel: '中',
 tips: '可从远距离观赏，但缺乏临场感',
 pros: ['交通便利', '人流较少', '商业设施完善'],
 cons: ['距离较远', '观赏效果一般', '缺乏花火音响效果']
 }
 ],

 tips: [
 {
 category: '交通建议',
 items: [
 '推荐使用JR立川站，交通最为便利',
 '西立川站距离最近但班次较少，请确认末班车时间',
 '当日会场周边交通管制，严禁自驾前往'
 ]
 },
 {
 category: '观赏建议',
 items: [
 '有料席在"大家的原野"芝生区，建议提前购买',
 '免费观览区18时后入园免费，但需早到占位',
 '携带野餐垫和折叠椅提升观赏舒适度'
 ]
 },
 {
 category: '实用建议',
 items: [
 '公园内设施完善，有餐厅和商店',
 '建议携带防虫喷雾和饮用水',
 '花火结束后会有大量人流，建议稍等再离开'
 ]
 }
 ],

 contact: {
 organizer: '立川祭国营昭和纪念公园花火大会实行委员会',
 phone: '042-527-2700',
 website: 'https://hanabi.tokyo-tachikawa.org/',
 socialMedia: '@tachikawahanabi'
 },
 // 官方数据源验证
 officialSource: {
   walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0313e00798/',
   verificationDate: '2025-01-13',
   dataConfirmedBy: 'USER_PROVIDED' as const,
    lastChecked: '2025-01-13'
 },

 mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.234567890123!2d139.4087!3d35.6973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188c0000000000%3A0x1234567890abcdef!2z5Zu96JCl5pit5ZKM6KiY5b-15YWs5ZyS!5e0!3m2!1sja!2sjp!4v1234567890123',

 media: [
 {
 type: 'image',
 url: 'https://images.unsplash.com/photo-1595364009305-e2b36ad9c0a4?w=800&h=800&fit=crop&crop=center&auto=format&q=80',
 title: '立川祭国营昭和纪念公园花火大会精彩瞬间',
 description: '都内罕见的尺玉和一尺五寸玉大迫力花火在昭和纪念公园广阔夜空中绽放，呈现艺协玉等精心设计的花火艺术'
 }
 ],

 mapInfo: {
 hasMap: true,
 mapNote: '会场位于国营昭和纪念公园，广阔的芝生观赏区域',
 parking: '当日交通管制，请使用公共交通'
 },

 weatherInfo: {
 month: '7月',
 temperature: '夏季高温，建议轻便服装',
 humidity: '湿度较高，注意防暑',
 rainfall: '少雨决行，荒天时不顺延',
 recommendation: '公园开放区域，注意防风'
 },


}; 