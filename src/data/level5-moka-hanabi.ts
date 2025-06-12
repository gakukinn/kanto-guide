// 第53回 真岡市夏祭大花火大会详细信息
// 数据来源：Walker Plus官方 https://hanabi.walkerplus.com/detail/ar0309e00887/

import { HanabiData } from '@/types/hanabi';

export const mokaHanabiData: HanabiData = {
 id: 'moka-natsumatsuri-hanabi-2025',
 name: '真岡市夏祭大花火大会',
  japaneseName: '第53回 真岡市夏祭大花火大会',
 englishName: 'Moka Summer Festival Fireworks Display 2025',
 year: 2025,
 date: '2025年7月26日',
 time: '19:30-21:00',
 duration: '约90分钟',
 fireworksCount: '约2万发',
 expectedVisitors: '约17万人',
 weather: '夏季',
 ticketPrice: '免费入场（设有付费座席）',
 status: '雨天延期至7月28日',
 themeColor: 'purple',
 month: 7,
 
 tags: {
 timeTag: '7月',
 regionTag: '北关东',
 typeTag: '花火',
 layerTag: '详细介绍'
 
  },
 
 venues: [
 {
 name: '真岡市役所东侧五行川沿岸',
 location: '真岡市荒町5191真岡市役所东侧',
 startTime: '19:30',
 features: ['音乐与激光协演', '神轿川渡御', '五行川水面倒影', '免费观赏区域']
 }
 ],
 
 access: [
 {
 venue: '真岡市役所东侧五行川沿岸',
 stations: [
 {
 name: '真岡駅',
 lines: ['真岡鐵道真岡線'],
 walkTime: '步行约15分钟'
 },
 {
 name: '北真岡駅',
 lines: ['真岡鐵道真岡線'],
 walkTime: '步行约15分钟'
 }
 ]
 }
 ],
 
 viewingSpots: [
 {
 name: '免费观赏区',
 rating: 4,
 crowdLevel: 'high',
 tips: '五行川两岸的开放空间，建议18:00前到达确保好位置',
 pros: ['免费入场', '空间充足', '视野开阔'],
 cons: ['人流密集', '需要早到']
 },
 {
 name: '付费观赏席',
 rating: 5,
 crowdLevel: 'medium',
 tips: '设置的座席区域，详情请查询真岡市观光协会官网',
 pros: ['座席舒适', '视野绝佳', '避免拥挤'],
 cons: ['需要付费', '数量有限']
 },
 {
 name: '祭典会场',
 rating: 4,
 crowdLevel: 'high',
 tips: '真岡市役所周边祭典区域，可观赏神轿渡河仪式',
 pros: ['感受祭典氛围', '观赏神轿渡河', '多种美食'],
 cons: ['距离稍远', '噪音较大']
 }
 ],
 
 specialFeatures: {
 scale: '栃木県内第2位人气花火大会，约2万发花火',
 location: '真岡市役所东侧五行川沿岸，水面倒影美景',
 tradition: '传统神轿川渡御仪式与山车屋台游行',
 atmosphere: '90分钟连续花火与音乐激光协演'
 },
 
 history: {
 established: 1973,
 significance: '真岡市夏祭的重要组成部分，栃木県内最具影响力的花火大会之一',
 highlights: [
 '第53回历史悠久的传统花火大会',
 '音乐与激光光线协演的创新演出',
 '传统神轿川渡御的文化传承',
 '90分钟连续约2万发花火的壮观规模'
 ]
 },
 
 tips: [
 {
 category: '观赏建议',
 items: [
 '建议18:00前到达确保好观赏位置',
 '付费座席需提前预约，详情查询真岡市观光协会官网',
 '可先观赏14:30开始的祭典活动再等待花火'
 ]
 },
 {
 category: '交通提醒', 
 items: [
 '当日市役所周边道路实施交通管制',
 '提供4000台免费停车场',
 '建议利用JR宇都宮駅转巴士前往'
 ]
 },
 {
 category: '天气应对',
 items: [
 '雨天延期至7月28日19:30举办',
 '延期日也遇恶劣天气则中止',
 '建议随身携带雨具以备不时之需'
 ]
 }
 ],
 
 contact: {
 organizer: '真岡市商工观光课',
 phone: '0285-83-8135',
 website: 'https://www.moka-kankou.org/',
 socialMedia: '@moka_kankou'
 },
 // 官方数据源验证
 officialSource: {
   walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0300e00814/',
   verificationDate: '2025-01-13',
   dataConfirmedBy: 'USER_PROVIDED' as const,
    lastChecked: '2025-01-13'
 },
 
 mapInfo: {
 hasMap: true,
 mapNote: '真岡市役所东侧五行川沿岸，地理位置优越',
 parking: '4000台免费停车场，建议提前到达'
 },
 
 weatherInfo: {
 month: '7月',
 temperature: '最高31°C，最低22°C',
 humidity: '约70%',
 rainfall: '梅雨季节结束，降雨概率较低',
 recommendation: '夏季炎热，建议穿着轻便透气服装，携带防暑用品',
 rainPolicy: '雨天延期至7月28日',},
 
 related: {
 regionRecommendations: [
 {
 id: 'kitakanto-july-02',
 name: '水戸偕楽園花火大会',
 date: "7月26日",
 location: '千波公园',
 visitors: '约23万人',
 link: '/july/hanabi/kitakanto/mito-hanabi'
 },
 {
 id: 'kitakanto-july-01', 
 name: '玉村花火大会',
 date: "7月12日",
 location: '玉村町上陽地区',
 visitors: '1万2000人',
 link: '/july/hanabi/kitakanto/tamura-hanabi'
 },
 {
 id: 'kitakanto-july-04',
 name: '館林手筒花火大会',
 date: "7月26日",
 location: '館林城夢広場',
 visitors: '3万人',
 link: '/july/hanabi/kitakanto/tatebayashi-hanabi'
 }
 ],
 timeRecommendations: [
 {
 id: 'kitakanto-july-02',
 name: '水戸偕楽園花火大会',
 date: "7月26日",
 location: '千波公园',
 visitors: '约23万人',
 link: '/july/hanabi/kitakanto/mito-hanabi'
 }
 ]
 },
 
 mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3215.234!2d139.9936!3d36.4403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x601f6b6b8b8b8b8b%3A0x1!2z6Z2f5bKh5biC5b255omA!5e0!3m2!1sja!2sjp!4v1234567890123!5m2!1sja!2sjp',
 
 media: [
 {
 type: 'image' as const,
 url: '/images/hanabi/moka-fireworks-main.svg',
 title: '真岡市夏祭大花火大会 超大型花火',
 description: '五行川沿岸燃放的约2万发壮观花火秀，栃木县真岡市的夏祭'
 }
 ]
}; 