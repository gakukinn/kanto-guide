import { HanabiData } from '@/types/hanabi';

export const edogawaHanabiData: HanabiData = {
 id: 'edogawa-ku-hanabi-50',
 name: '第50回江戸川区花火大会',
  japaneseName: '第51回 江戸川区花火大会',

 englishName: 'The 50th Edogawa Fireworks Festival',
 year: 2025,
 month: 8,
 date: '2025年8月2日',
 time: '19:15-20:20',
 duration: '65分钟',
 fireworksCount: '约1万4000发',
 expectedVisitors: '约3万人',
 weather: '悪天候时中止',
 ticketPrice: '有料席 1人2000円起',
 status: '开催确定',
 themeColor: 'blue',
 
 tags: {
 timeTag: '8月',
 regionTag: '东京',
 typeTag: '花火',
 layerTag: '详细介绍'
 
  },

 // 添加媒体展示内容
 media: [
 {
 type: 'image',
 url: '/images/hanabi/edogawa-fireworks.svg',
 title: '第50回江戸川区花火大会壮观场面',
 description: '江戸川河川敷1万4000发花火，7个主题与BGM联动的音乐花火盛典'
 }
 ],
 
 venues: [
 {
 name: '江戸川河川敷（都立筱崎公园先）',
 location: '东京都江戸川区筱崎町',
 startTime: '19:15',
 features: [
 '河川敷开阔视野',
 '多层构造花火',
 'BGM联动演出',
 '屋台美食区域'
 ]
 }
 ],

 access: [
 {
 venue: '江戸川河川敷（都立筱崎公园先）',
 stations: [
 {
 name: '筱崎站',
 lines: ['都营地下鉄新宿线'],
 walkTime: '步行15分钟'
 },
 {
 name: '小岩站',
 lines: ['JR总武线'],
 walkTime: '步行25分钟'
 },
 {
 name: '京成江戸川站',
 lines: ['京成本线'],
 walkTime: '步行25分钟'
 },
 {
 name: '瑞江站',
 lines: ['都营地下鉄新宿线'],
 walkTime: '步行45分钟'
 }
 ]
 }
 ],

 viewingSpots: [
 {
 name: '都立筱崎公园河川敷',
 rating: 5,
 crowdLevel: '高',
 tips: '正面观赏位置，可完整体验7个主题演出和BGM联动效果',
 pros: ['正面观赏', '音响效果最佳', '多层花火迫力'],
 cons: ['人群极度密集', '需要早到2-3小时占位']
 },
 {
 name: '江戸川对岸（千叶县市川市）',
 rating: 4,
 crowdLevel: '中',
 tips: '从对岸观赏，可拍摄到完整的花火与河面倒影',
 pros: ['河面反射美景', '摄影角度佳', '人群相对分散'],
 cons: ['距离较远', '音响效果减弱', '交通不便']
 },
 {
 name: '筱崎站周边道路',
 rating: 3,
 crowdLevel: '高',
 tips: '从稍远位置观赏，可避开最拥挤区域',
 pros: ['交通便利', '可选择观赏位置', '观赏后离场方便'],
 cons: ['视野受限', '无法体验完整音响', '部分花火被遮挡']
 }
 ],

 history: {
 established: 1976,
 significance: '2025年迎来第50回纪念大会，江戸川区代表性夏季盛典',
 highlights: [
 '1976年第1回开始',
 '2025年第50回纪念',
 '创业360年宗家花火「鍵屋」担当',
 '7个主题BGM联动演出特色',
 '国内最大级「富士大仕掛」'
 ]
 },

 tips: [
 {
 category: '观赏建议',
 items: [
 '建议提前2-3小时到场占位（筱崎站混雑）',
 '携带折叠椅或野餐垫',
 '准备防虫喷雾（河川敷蚊虫较多）',
 '夜间气温下降，准备保暖衣物'
 ]
 },
 {
 category: '交通提示',
 items: [
 '筱崎站往返极度混雑，建议利用其他车站',
 '当日17:00-22:00会场周边交通规制',
 '车辆、自行车入场禁止',
 '建议提前2小时到达，结束后等待分散'
 ]
 },
 {
 category: '音乐花火特色',
 items: [
 '开场5秒1000发迫力开幕',
 '7个不同主题BGM联动演出',
 '国内最大级「富士大仕掛」',
 '压轴「怒涛金金毛」壮观'
 ]
 },
 {
 category: '50周年特色',
 items: [
 '「富士大仕掛」挑战吉尼斯世界记录',
 '花火设计公开征集採用',
 '宗家花火鍵屋特别审查',
 '自由独创花火打上'
 ]
 }
 ],

 contact: {
 organizer: '江戸川区花火大会实行委员会事务局（産业経済課内）',
 phone: '03-5662-0523',
 website: 'https://www.city.edogawa.tokyo.jp/hanabi/index.html',
 socialMedia: '@edogawa_hanabi'
 },

 mapInfo: {
 hasMap: true,
 mapNote: '江戸川河川敷（都立筱崎公园先），当日17:00-22:00会场周边交通规制实施。车辆、自行车入场禁止',
 parking: '无停车场（车辆入场禁止）'
 },

 weatherInfo: {
 month: '8月',
 temperature: '最高32°C 最低25°C',
 humidity: '75-85%',
 rainfall: '夏季雷雨可能',
 recommendation: '河川敷夜间相对凉爽，但仍需注意中暑对策',
 rainPolicy: '悪天候时中止',
 note: '江戸川河川敷，夜间河风凉爽'
 },

 specialFeatures: {
 scale: '1万4000发花火，65分钟连续演出',
 location: '江戸川河川敷开阔视野，多层构造花火',
 tradition: '创业360年宗家花火「鍵屋」担当制作',
 atmosphere: '7个主题BGM联动，音乐与花火完美融合',
 collaboration: '厚实多层构造花火与音响效果联动'
 },

 special2025: {
 theme: '第50回纪念大会',
 concept: '江戸川夜空7主题演出',
 memorial: '1976年第1回开始的50年里程碑',
 features: [
 '开场5秒1000发震撼开幕',
 '国内最大级「富士大仕掛」吉尼斯挑战',
 '压轴「怒涛金金毛」壮观演出',
 '花火设计公开征集採用',
 '异色7主题BGM联动演出'
 ]
 },

 // 关联推荐
 related: {
 regionRecommendations: [
 {
 id: 'itabashi-august',
 name: '第66回板桥花火大会',
 date: '2025年8月2日',
 location: '荒川河川敷',
 visitors: '57万人',
 link: '/august/hanabi/tokyo/itabashi'
 },
 {
 id: 'kozushima-august',
 name: '第32回神津岛渚花火大会',
 date: '2025年8月4日',
 location: '神津岛港',
 visitors: '约1000人',
 link: '/august/hanabi/tokyo/kozushima'
 }
 ],
 timeRecommendations: [
 {
 id: 'ashikaga-august',
 name: '第109回足利花火大会',
 date: '2025年8月2日',
 location: '渡良瀬川田中桥下流',
 visitors: '约45万人',
 link: '/august/hanabi/kitakanto/ashikaga'
 },
 {
 id: 'koga-august',
 name: '第20回古河花火大会',
 date: '2025年8月2日',
 location: '古河高尔夫球场',
 visitors: '约20万人',
 link: '/august/hanabi/kitakanto/koga'
 }
 ]
 },

 mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.1651234567!2d139.9345678901!3d35.7123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188559c5b8c5c5%3A0x7e4c5e5b8a2c8c8c!2z6YO96ZGf5bed5Yy65r2t5bSO6aeF!5e0!3m2!1sja!2sjp!4v1600000000000!5m2!1sja!2sjp'
}; 