import { HanabiData } from '@/types/hanabi';

export const itabashiHanabiData: HanabiData = {
 id: 'itabashi-hanabi-2025',
   name: '第66回板桥花火大会',
   englishName: '66th Itabashi Fireworks Festival',
 year: 2025,
 month: 8,
 date: '2025年8月2日',
 time: '19:00-20:30',
 duration: '90分钟',
 fireworksCount: '约1万5000发',
 expectedVisitors: '约57万人',
 weather: '少雨决行，荒天时顺延无',
 ticketPrice: '有料席约3万4千人分',
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
 url: '/images/hanabi/itabashi-fireworks.jpg',
       title: '第66回板桥花火大会壮观场面',
 description: '荒川河川敷1万5000发花火，与戸田桥花火大会同时举办的关东最大规模花火盛典'
 }
 ],
 
 venues: [
 {
 name: '荒川河川敷（板桥区侧）',
 location: '东京都板桥区荒川河川敷',
 startTime: '19:00',
 features: [
 '河川敷开阔视野',
 '都内最大尺五寸玉',
 '与戸田桥花火同时举办',
 '57万人观赏规模'
 ]
 }
 ],

 access: [
 {
 venue: '荒川河川敷（板桥区侧）',
 stations: [
 {
 name: '浮间舟渡站',
 lines: ['JR埼京线'],
 walkTime: '步行20分钟'
 },
 {
 name: '高岛平站',
 lines: ['都营地下鉄三田线'],
 walkTime: '步行20分钟'
 },
 {
 name: '西台站',
 lines: ['都营地下鉄三田线'],
 walkTime: '步行20分钟'
 },
 {
 name: '莲根站',
 lines: ['都营地下鉄三田线'],
 walkTime: '步行20分钟'
 }
 ]
 }
 ],

 viewingSpots: [
 {
 name: '荒川河川敷（板桥区侧）',
 rating: 5,
 crowdLevel: '高',
 tips: '主会场正面观赏位置，可体验都内最大尺五寸玉的震撼',
 pros: ['正面观赏', '都内最大尺五寸玉', '57万人规模壮观'],
 cons: ['人群极度密集', '需要早到占位']
 },
 {
 name: '荒川河川敷（戸田市侧）',
 rating: 4,
 crowdLevel: '中',
 tips: '从对岸观赏，可同时观看板桥和戸田桥两个花火大会',
 pros: ['双重花火体验', '摄影角度佳', '人群相对分散'],
 cons: ['距离较远', '音响效果减弱']
 },
 {
 name: '浮间舟渡站周边',
 rating: 3,
 crowdLevel: '高',
 tips: '从稍远位置观赏，可避开最拥挤区域',
 pros: ['交通便利', '可选择观赏位置', '观赏后离场方便'],
 cons: ['视野受限', '无法体验完整震撼', '部分花火被遮挡']
 }
 ],

 history: {
 established: 1959,
 significance: '2025年迎来第66回，板桥区代表性夏季盛典，与戸田桥花火大会同时举办',
 highlights: [
 '1959年第1回开始',
 '2025年第66回',
 '与戸田桥花火大会同时举办',
 '关东最大规模57万人观赏',
 '都内最大尺五寸玉震撼演出'
 ]
 },

 tips: [
 {
 category: '观赏建议',
 items: [
 '建议提前2-3小时到场占位',
 '携带折叠椅或野餐垫',
 '准备防虫喷雾（河川敷蚊虫较多）',
 '夜间气温下降，准备保暖衣物'
 ]
 },
 {
 category: '交通提示',
 items: [
 '各车站往返极度混雑，建议分散利用',
 '当日会场周边交通规制实施',
 '车辆入场禁止',
 '建议提前2小时到达，结束后等待分散'
 ]
 },
 {
 category: '花火特色',
 items: [
 '都内最大尺五寸玉目前开放',
 '日本全国花火竞技会优秀花火师「芸术玉」',
         '5个场所同时打上宽幅星雷',
        '终章「天空的尼亚加拉」壮观'
 ]
 },
 {
 category: '2025年特色',
 items: [
         '博洛尼亚市友好都市交流20周年纪念花火',
        '质量并重的宽幅星雷升级',
        '开场・终章迫力演出',
 '与戸田桥花火的双重震撼体验'
 ]
 }
 ],

 contact: {
 organizer: '板桥区观光协会',
 phone: '03-3579-2255',
 website: 'https://itabashihanabi.jp/',
 socialMedia: '@itabashihanabi'
 },

   mapInfo: {
    hasMap: true,
    mapNote: '荒川河川敷（板桥区侧），当日会场周边交通规制实施。车辆入场禁止',
    parking: '无停车场（车辆入场禁止）'
  },

  // 地图嵌入URL
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3238.1!2d139.6!3d35.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188c5b8c5c5c5c%3A0x7e4c5e5b8a2c8c8c!2z6I2J5bed5Yy66I2J5bed!5e0!3m2!1sja!2sjp!4v1600000000000!5m2!1sja!2sjp',

 weatherInfo: {
 month: '8月',
 temperature: '最高32°C 最低25°C',
 humidity: '75-85%',
 rainfall: '夏季雷雨可能',
 recommendation: '河川敷夜间相对凉爽，但仍需注意中暑对策',
 rainPolicy: '少雨决行，荒天时顺延无',
 note: '荒川河川敷，夜间河风凉爽'
 },

 specialFeatures: {
 scale: '1万5000发花火，90分钟连续演出',
 location: '荒川河川敷开阔视野，57万人观赏规模',
 tradition: '第66回传统花火大会，与戸田桥花火同时举办',
 atmosphere: '关东最大规模双花火盛典',
 collaboration: '板桥区与戸田市跨界合作花火演出'
 },

 special2025: {
     theme: '第66回板桥花火大会',
 concept: '荒川夜空双花火盛典',
 memorial: '1959年第1回开始的66年传统',
 features: [
 '都内最大尺五寸玉目前开放震撼',
 '日本全国花火竞技会优秀花火师「芸术玉」',
         '终章「天空的尼亚加拉」壮观演出',
        '博洛尼亚市友好都市交流20周年纪念花火',
        '5个场所同时打上宽幅星雷升级'
 ]
 },

   // 关联推荐
  related: {
    regionRecommendations: [
      {
        id: 'edogawa-hanabi-2025',
        name: '第50回江户川区花火大会',
        date: '2025年8月2日',
        location: '江户川河川敷',
        visitors: '3万人',
        link: '/august/hanabi/tokyo/edogawa'
      },
      {
        id: 'jingu-gaien-hanabi-2025',
        name: '2025 神宫外苑花火大会',
        date: '2025年8月16日',
        location: '明治神宮外苑',
        visitors: '100万人',
        link: '/august/hanabi/tokyo/jingu-gaien'
      }
    ],
    timeRecommendations: [
      {
        id: 'kozushima-hanabi-2025',
        name: '第32回神津島渚花火大会',
        date: '2025年8月4日',
        location: '神津島港桟橋',
        visitors: '1000人',
        link: '/august/hanabi/tokyo/kozushima'
      },
      {
        id: 'okutama-hanabi-2025',
        name: '町制施行70周年纪念 奥多摩纳凉花火大会',
        date: '2025年8月9日',
        location: '愛宕山広場',
        visitors: '1万人',
        link: '/august/hanabi/tokyo/okutama'
      }
    ],
    sameMonth: ["江户川花火大会", "神津岛渚花火大会", "奥多摩纳凉花火大会"]
  }
};