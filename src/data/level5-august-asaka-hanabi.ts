import { HanabiData } from '@/types/hanabi';

export const asakaHanabiData: HanabiData = {
 id: 'asaka-sainatsusai-2025',
 name: '朝霞市民祭「彩夏祭」',
  japaneseName: '朝霞市民まつり「彩夏祭」',
 englishName: 'Asaka Citizens Festival "Sainatsusai"',
 year: 2025,
 month: 8,
 date: '2025年8月2日',
 time: '19:30-20:30',
 duration: '60分钟',
 fireworksCount: '约9000发',
 expectedVisitors: '约73万人',
 weather: '悪天候时中止',
 ticketPrice: '免费观赏',
 status: '开催确定',
 themeColor: 'orange',
 
 tags: {
 timeTag: '8月',
 regionTag: '埼玉',
 typeTag: '花火',
 layerTag: '详细介绍'
 
  },

 // 添加媒体展示内容
 media: [
 {
 type: 'image',
 url: '/images/hanabi/itabashi-fireworks.svg',
 title: '朝霞市民祭「彩夏祭」花火大会壮观场面',
 description: '朝霞跡地9000发花火，73万人观赏的埼玉县最大规模市民祭典'
 }
 ],
 
 venues: [
 {
 name: '朝霞中央公园陆上竞技场周边（原朝霞驻屯地跡地）',
 location: '埼玉县朝霞市',
 startTime: '19:30',
 features: [
 '开阔的跡地会场',
 '73万人观赏大规模',
 '市民参与型祭典',
 '屋台美食丰富'
 ]
 }
 ],

 access: [
 {
 venue: '朝霞中央公园陆上竞技场周边',
 stations: [
 {
 name: '北朝霞站',
 lines: ['JR武蔵野线'],
 walkTime: '步行10分钟'
 },
 {
 name: '朝霞台站',
 lines: ['東武東上線', 'JR武蔵野線'],
 walkTime: '步行15分钟'
 },
 {
 name: '朝霞站',
 lines: ['東武東上線'],
 walkTime: '步行20分钟'
 }
 ]
 }
 ],

 viewingSpots: [
 {
 name: '朝霞中央公园陆上竞技场',
 rating: 5,
 crowdLevel: '极高',
 tips: '主观赏区域，市民祭的核心会场，最佳观赏位置',
 pros: ['正面观赏', '音响效果最佳', '祭典氛围浓厚', '免费观赏'],
 cons: ['人群极度密集', '需要早到2-3小时占位', '离场时间长']
 },
 {
 name: '跡地周边高台区域',
 rating: 4,
 crowdLevel: '高',
 tips: '从周边高台观赏，可获得开阔视野',
 pros: ['视野开阔', '摄影角度佳', '相对宽敞'],
 cons: ['距离较远', '音响效果减弱', '部分区域需要付费']
 },
 {
 name: '北朝霞站周边道路',
 rating: 3,
 crowdLevel: '中',
 tips: '从稍远位置观赏，可避开最拥挤区域',
 pros: ['交通便利', '观赏后离场方便', '人群相对分散'],
 cons: ['视野受限', '花火细节不清', '祭典氛围较弱']
 }
 ],

 history: {
 established: 1979,
 significance: '朝霞市最大的市民参与型祭典，2025年迎来第46回，是埼玉县内规模最大的市民祭',
 highlights: [
 '1979年开始的46年传统',
 '埼玉县内最大规模73万人观赏',
 '市民参与型祭典的代表格',
 '原朝霞驻屯地跡地和历史的意义',
 '夏季祭典与花火的完美结合'
 ]
 },

 tips: [
 {
 category: '观赏建议',
 items: [
 '建议提前2-3小时到场占位（73万人超高人气）',
 '携带折叠椅或野餐垫，准备长时间等待',
 '准备充足的水和食物，会场屋台丰富',
 '夜间跡地较凉，准备保暖衣物'
 ]
 },
 {
 category: '交通提示',
 items: [
 '北朝霞站往返极度混雑，建议分散利用多个车站',
 '当日17:00-22:00会场周边大规模交通规制',
 '车辆入场严格禁止，推荐电车利用',
 '建议提前1小时到达，结束后等待1小时以上分散'
 ]
 },
 {
 category: '市民祭特色',
 items: [
 '白天从15:00开始各种市民活动',
 '屋台美食约100店铺参加',
 '市民参加的各种舞台表演',
 '花火前后的祭典雰围存分享受'
 ]
 },
 {
 category: '彩夏祭特色',
 items: [
 '埼玉县内最大规模73万人',
 '9000发花火连续60分钟演出',
 '市民手作的温暖祭典',
 '免费观赏的平民花火大会'
 ]
 }
 ],

 contact: {
 organizer: '朝霞市民祭「彩夏祭」实行委员会',
 phone: '048-463-2927',
 website: 'https://www.sainatsusai.jp/',
 socialMedia: '@sainatsusai_asaka'
 },

 mapInfo: {
 hasMap: true,
 mapNote: '朝霞中央公园陆上竞技场周边（原朝霞驻屯地跡地），当日17:00-22:00大规模交通规制。车辆入场禁止',
 parking: '无停车场（车辆入场禁止）'
 },

 weatherInfo: {
 month: '8月',
 temperature: '最高32°C 最低25°C',
 humidity: '75-85%',
 rainfall: '夏季雷雨可能',
 recommendation: '跡地会场夜间较凉爽，但白天极热需要中暑对策',
 rainPolicy: '悪天候时中止',
 note: '开阔的跡地会场，夜间风通良好'
 },

 specialFeatures: {
 scale: '9000发花火，60分钟连续演出',
 location: '朝霞跡地超开阔视野，埼玉县内最大规模',
 tradition: '第46回市民参与传统，温暖手作的祭典',
 atmosphere: '73万人观赏的壮观场面，市民祭独特氛围',
 collaboration: '白天祭典活动与夜间花火的完美结合'
 },

 special2025: {
 theme: '第46回彩夏祭',
 concept: '市民的心夏的祭典',
 memorial: '1979年开始的46年市民传统',
 features: [
 '埼玉县内最大规模73万人参加',
 '9000发花火60分钟精彩演出',
 '约100店铺屋台美食盛宴',
 '市民参加的各种舞台表演',
 '免费观赏的平民花火大会'
 ]
 },

 mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3235.8!2d139.59!3d35.80!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018c3c3c3c3c3c3%3A0x3c3c3c3c3c3c3c3c!2z5pyd6Ive5Lit5aSu5YWs5ZyS!5e0!3m2!1sja!2sjp!4v1600000000000!5m2!1sja!2sjp',

 // 关联推荐
 related: {
 regionRecommendations: [
 {
 id: 'todabashi-august',
 name: '第72回戸田桥花火大会',
 date: '2025年8月2日',
 location: '荒川河川敷',
 visitors: '45万人',
 link: '/august/hanabi/saitama/todabashi'
 },
 {
 id: 'kumagaya-august',
 name: '熊谷花火大会',
 date: '2025年8月9日',
 location: '荒川河畔',
 visitors: '42万人',
 link: '/august/hanabi/saitama/kumagaya'
 }
 ],
 timeRecommendations: [
 {
 id: 'itabashi-august',
 name: '第66回板桥花火大会',
 date: '2025年8月2日',
 location: '荒川河川敷',
 visitors: '57万人',
 link: '/august/hanabi/tokyo/itabashi'
 },
 {
 id: 'higashimatsuyama-august',
 name: '东松山花火大会',
 date: '2025年8月23日',
 location: '都幾川公园',
 visitors: '6万人',
 link: '/august/hanabi/saitama/higashimatsuyama'
 }
 ]
 }
}; 