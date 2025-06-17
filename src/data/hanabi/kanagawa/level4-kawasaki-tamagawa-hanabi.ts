import { HanabiData } from '../../../types/hanabi';

export const kawasaiTamagawaHanabiData: HanabiData = {
  id: 'kawasaki-tamagawa-hanabi',
  name: '第84回 川崎市制記念多摩川花火大会',
  _sourceData: {
    japaneseName: '第84回 川崎市制記念多摩川花火大会',
    japaneseDescription: '第84回 川崎市制記念多摩川花火大会',
  },
  englishName: '84th Kawasaki City Memorial Tama River Fireworks Festival',
  year: 2025,
  date: '2025年10月4日',
  time: '18:00～19:00',
  duration: '60分钟',
  fireworksCount: '约6000发',
  expectedVisitors: '约30万人',
  weather: '秋季，气温较低',
  status: 'scheduled',
  ticketPrice: '免费观赏',
  themeColor: 'teal',
  month: 10,

  title: '第84回川崎市制記念多摩川花火大会 - 神奈川县川崎市多摩川花火详情',
  description:
    '2025年10月4日在神奈川县川崎市多摩川河川敷举办的第84回川崎市制記念多摩川花火大会。约6000发花火照亮秋夜，30万观众共同观赏的盛大花火祭典。',

  tags: {
    timeTag: '10月',
    regionTag: '神奈川县',
    typeTag: '花火',
    layerTag: 'Layer 4详情页',
  },

  related: {
    regionRecommendations: [],
    timeRecommendations: [],
  },

  media: [
    {
      type: 'image',
      url: '/images/hanabi/kawasaki-tamagawa/kawasaki-tamagawa-main.jpg',
      title: '川崎市制記念多摩川花火大会主会场',
      description: '多摩川河川敷上绚烂绽放的花火',
    },
    {
      type: 'image',
      url: '/images/hanabi/kawasaki-tamagawa/kawasaki-tamagawa-crowd.jpg',
      title: '多摩川花火大会观众席',
      description: '30万观众共同观赏的盛大场面',
    },
    {
      type: 'image',
      url: '/images/hanabi/kawasaki-tamagawa/kawasaki-tamagawa-autumn.jpg',
      title: '川崎多摩川花火大会秋季举办',
      description: '秋の風物詩和的了、伝統花火大会',
    },
  ],

  history: {
    established: 1929,
    significance: '川崎市制记念的传统花火大会，秋季风物诗',
    highlights: [
      '自1929年开始举办，历史悠久',
      '2018年起改为秋季举办，成为秋季风物诗',
      '与东京都世田谷区"多摩川花火大会"同时举办',
      '北见方会场可同时观赏两大会花火',
      '特殊效果和音乐同步的"花火幻象"是看点',
    ],
  },

  venues: [
    {
      name: '川崎会场',
      location: '神奈川県川崎市高津区多摩川河川敷',
      startTime: '18:00',
      features: [
        '主要花火打上会场',
        '可同时观赏世田谷区花火',
        '北见方会场有料协赞席',
        '音乐同步花火"花火幻象"',
        '特殊效果组合的迫力花火',
      ],
    },
  ],

  access: [
    {
      venue: '川崎会场',
      stations: [
        {
          name: '二子新地站',
          lines: ['东急田园都市线'],
          walkTime: '步行约15分钟',
        },
        {
          name: '高津站',
          lines: ['东急田园都市线'],
          walkTime: '步行约25分钟',
        },
      ],
    },
    {
      venue: '上野毛会场（世田谷区侧）',
      stations: [
        {
          name: '上野毛站',
          lines: ['东急大井町线'],
          walkTime: '步行约8分钟',
        },
        {
          name: '二子玉川站',
          lines: ['东急田园都市线', '东急大井町线'],
          walkTime: '步行约9分钟',
        },
      ],
    },
  ],

  mapInfo: {
    hasMap: true,
    mapNote: '神奈川県川崎市高津区多摩川河川敷',
    parking: '无专用停车场\n建议使用公共交通',
  },

  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3242.6!2d139.6261!3d35.6031!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDM2JzExLjIiTiAxMznCsDM3JzM0LjAiRQ!5e0!3m2!1sja!2sjp!4v1618000000000!5m2!1sja!2sjp',

  viewingSpots: [
    {
      name: '北见方会場（有料協賛席）',
      rating: 4.5,
      crowdLevel: '中等',
      tips: '需要购买有料协赞席券，可同时观赏川崎世田谷两大会花火',
      pros: ['最佳观赏位置', '座席保证', '同时观赏两大会'],
      cons: ['需要付费', '座席数量有限'],
    },
    {
      name: '多摩川河川敷（川崎侧）',
      rating: 4.0,
      crowdLevel: '拥挤',
      tips: '免费观赏区域，建议提前占位',
      pros: ['免费观赏', '距离较近', '氛围热烈'],
      cons: ['非常拥挤', '需要提前占位', '视野可能受限'],
    },
    {
      name: '二子橋周辺',
      rating: 3.5,
      crowdLevel: '拥挤',
      tips: '桥梁周边观赏，但人流众多',
      pros: ['位置便利', '交通方便'],
      cons: ['极度拥挤', '视野有限', '移动困难'],
    },
  ],

  contact: {
    organizer: '川崎市',
    phone: '044-200-3939（）',
    website: 'https://www.city.kawasaki.jp/280/page/0000117559.html',
    socialMedia: '@kawasaki_city',
  },

  weatherInfo: {
    month: '10月',
    temperature: '15-20°C',
    humidity: '60-70%',
    rainfall: '较少',
    rainPolicy: '荒天中止（无延期）',
    note: '秋季举办，气温较低请注意保暖',
    recommendation:
      '建议提前确认天气预报，秋季昼夜温差较大，请注意保暖。由于是传统大型花火大会，建议提前规划交通路线。',
  },

  tips: [
    {
      category: '观赏建议',
      items: [
        '17:30前到达会场占位',
        '秋季举办，注意保暖措施',
        '有料协赞席可提前享受更好观赏体验',
      ],
    },
    {
      category: '交通建议',
      items: ['建议使用公共交通前往', '约30万观众，建议避开高峰时段离场'],
    },
    {
      category: '特色体验',
      items: ['可同时观赏川崎世田谷两大会花火', '音乐同步的"花火幻象"不容错过'],
    },
  ],
};
