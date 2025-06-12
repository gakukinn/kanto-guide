import { HanabiData } from '@/types/hanabi';

export const kumagayaHanabiData: HanabiData = {
 id: 'kumagaya-hanabi-2025',
 name: '熊谷花火大会',
  japaneseName: '熊谷花火大会',
 englishName: 'Kumagaya Fireworks Festival',
 year: 2025,
 month: 8,
 date: '2025年8月9日',
 time: '19:00-21:00',
 duration: '120分钟',
 fireworksCount: '约1万发',
 expectedVisitors: '约42万人',
 weather: '悪天候时中止',
 ticketPrice: '有料席 2000円起',
 status: '开催确定',
 themeColor: 'red',
 
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
 url: '/images/hanabi/tamura-fireworks-main.svg',
 title: '熊谷花火大会壮观场面',
 description: '荒川河畔1万发花火，42万人观赏的埼玉县传统花火盛典'
 }
 ],
 
 venues: [
 {
 name: '荒川河畔（荒川大橋下流）',
 location: '埼玉县熊谷市',
 startTime: '19:00',
 features: [
 '荒川河畔开阔视野',
 '42万人观赏大规模',
 '传统花火大会',
 '120分钟长时间演出'
 ]
 }
 ],

 access: [
 {
 venue: '荒川河畔（荒川大橋下流）',
 stations: [
 {
 name: '熊谷站',
 lines: ['JR高崎线', 'JR上越新干线'],
 walkTime: '步行30分钟'
 },
 {
 name: '石原站',
 lines: ['秩父铁道'],
 walkTime: '步行20分钟'
 }
 ]
 }
 ],

 viewingSpots: [
 {
 name: '荒川河畔左岸（熊谷市侧）',
 rating: 5,
 crowdLevel: '极高',
 tips: '主观赏区域，最佳观赏位置，可欣赏完整的花火演出',
 pros: ['正面观赏', '音响效果最佳', '花火迫力最大', '传统氛围浓厚'],
 cons: ['人群极度密集', '需要早到3-4小时占位', '离场时间很长']
 },
 {
 name: '荒川河畔右岸',
 rating: 4,
 crowdLevel: '高',
 tips: '对岸观赏，可拍摄到花火与河面倒影的美景',
 pros: ['河面倒影美丽', '摄影角度佳', '相对宽敞'],
 cons: ['距离较远', '音响效果减弱', '交通不便']
 },
 {
 name: '熊谷站周边高台',
 rating: 3,
 crowdLevel: '中',
 tips: '从稍远位置观赏，可避开河畔的极度拥挤',
 pros: ['交通便利', '观赏后离场方便', '视野开阔'],
 cons: ['距离很远', '花火细节不清', '氛围较弱']
 }
 ],

 history: {
 established: 1948,
 significance: '熊谷市代表性夏季祭典，拥有77年历史传统，是埼玉县北部最大规模的花火大会',
 highlights: [
 '1948年开始的77年传统',
 '埼玉县北部最大规模42万人观赏',
 '荒川河畔和绝佳立地',
 '120分钟超长时间演出',
 '1万发花火连续打上'
 ]
 },

 tips: [
 {
 category: '观赏建议',
 items: [
 '建议提前3-4小时到场占位（42万人超高人气）',
 '携带折叠椅或野餐垫，准备长时间等待',
 '准备充足的水和食物，120分钟长时间演出',
 '夜间河畔较凉，准备保暖衣物'
 ]
 },
 {
 category: '交通提示',
 items: [
 '熊谷站往返极度混雑，建议利用秩父铁道分散',
 '当日17:00-22:30会场周边大规模交通规制',
 '车辆入场严格禁止，推荐电车利用',
 '建议提前2小时到达，结束后等待1小时以上分散'
 ]
 },
 {
 category: '花火特色',
 items: [
 '开场大型连发花火连发',
 '中盤連続花火的迫力演出',
 '终章大玉连发壮观',
 '120分钟超长时间存分享受'
 ]
 },
 {
 category: '77年传统特色',
 items: [
 '埼玉县北部最大规模',
 '荒川河畔的伝統花火',
 '42万人集夏的風物詩',
 '地域密着型的温暖花火大会'
 ]
 }
 ],

 contact: {
 organizer: '熊谷花火大会实行委员会',
 phone: '048-527-0002',
 website: 'https://www.kumagayahanabi.com/',
 socialMedia: '@kumagaya_hanabi'
 },

 mapInfo: {
 hasMap: true,
 mapNote: '荒川河畔（荒川大橋下流），当日17:00-22:30大规模交通规制。车辆入场禁止',
 parking: '无停车场（车辆入场禁止）'
 },

 weatherInfo: {
 month: '8月',
 temperature: '最高35°C 最低26°C',
 humidity: '75-85%',
 rainfall: '夏季雷雨可能',
 recommendation: '熊谷市日本最热地区之一，白天需要严格的中暑对策，夜间河畔相对凉爽',
 rainPolicy: '悪天候时中止',
 note: '荒川河畔，夜间河风凉爽但白天极其炎热'
 },

 specialFeatures: {
 scale: '1万发花火，120分钟超长演出',
 location: '荒川河畔开阔视野，埼玉县北部最大规模',
 tradition: '77年传统延续，地域密着型花火大会',
 atmosphere: '42万人观赏的壮观场面，传统夏祭氛围',
 collaboration: '荒川河畔和自然环境与花火艺术的完美融合'
 },

 special2025: {
 theme: '熊谷夏祭传统继承',
 concept: '荒川夜空传统花火',
 memorial: '1948年开始的77年传统',
 features: [
 '埼玉县北部最大规模42万人',
 '1万发花火120分钟连续演出',
 '荒川河畔绝佳观赏环境',
 '77年传统継承与发展',
 '地域密着型温暖花火大会'
 ]
 },

 mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3220.5!2d139.39!3d36.15!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x601f0a0a0a0a0a0a%3A0xa0a0a0a0a0a0a0a0!2z54aK6LC35biC!5e0!3m2!1sja!2sjp!4v1600000000000!5m2!1sja!2sjp',

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
 id: 'asaka-august',
 name: '朝霞市民祭「彩夏祭」',
 date: '2025年8月2日',
 location: '朝霞跡地',
 visitors: '73万人',
 link: '/august/hanabi/saitama/asaka'
 }
 ],
 timeRecommendations: [
 {
 id: 'saitama-omagi-august',
 name: '埼玉市花火大会大间木公园会场',
 date: '2025年8月9日',
 location: '大間木公園',
 visitors: '6万人',
 link: '/august/hanabi/saitama/omagi'
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