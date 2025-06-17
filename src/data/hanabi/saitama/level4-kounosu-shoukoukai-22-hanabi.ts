import { HanabiData } from '../../../types/hanabi';

export const kounosuShoukoukai22HanabiData: HanabiData = {
  id: 'kounosu-shoukoukai-22',
  name: '燃！商工会青年部！！第22回 这的花火大会',
  _sourceData: {
    japaneseName: '燃！商工会青年部！！第22回 这的花火大会',
    japaneseDescription: '燃！商工会青年部！！第22回 这的花火大会',
  },
  englishName:
    '22nd Konosu Chamber of Commerce Youth Division Fireworks Festival',
  year: 2025,
  date: '2025年10月11日(土)',
  time: '17:30～20:00',
  duration: '150分',
  fireworksCount: '约2万发',
  expectedVisitors: '约60万人',
  weather: '晴天（25℃ / 18℃）',
  ticketPrice: '收费席有',
  status: 'scheduled',
  themeColor: 'red',
  month: 10,

  title: '燃！商工会青年部！！第22回 这的花火大会 | 埼玉县鸿巣市',
  description:
    '埼玉县鸿巣市的商工会青年部、「地区的振興发展和孩子们在梦想和希望的给予」和说愿望的寄托主办。大会志愿者在因此运营的。这的其他、4尺玉1发、3尺玉1发也打有、更在「日本第一的最后连发花火」和呼如果尺玉300連发在构成的表演也压轴。',

  tags: {
    timeTag: '10月',
    regionTag: '埼玉县',
    typeTag: '花火',
    layerTag: 'Layer 4詳情页',
  },

  related: {
    regionRecommendations: [],
    timeRecommendations: [],
    sameMonth: ['higashimatsuyama'],
    sameRegion: ['todabashi', 'asaka', 'kumagaya'],
    recommended: ['todabashi', 'asaka'],
  },

  venues: [
    {
      name: '糠田运动场荒川河川敷',
      location: '埼玉县鸿巣市',
      startTime: '17:30',
      features: ['大规模会场', '河川敷'],
    },
  ],

  access: [
    {
      venue: '糠田运动场荒川河川敷',
      stations: [
        {
          name: '鸿巣駅',
          lines: ['JR高崎線'],
          walkTime: '步行30分',
        },
      ],
    },
  ],

  viewingSpots: [
    {
      name: '第1会场',
      rating: 5,
      crowdLevel: '非常在拥挤',
      tips: '收费席推荐',
      pros: ['最高的视野', '气势満点'],
      cons: ['拥挤', '收费'],
    },
    {
      name: '第2会场',
      rating: 4,
      crowdLevel: '拥挤',
      tips: '相对合理',
      pros: ['性价比良好', '视野良好'],
      cons: ['稍微远'],
    },
  ],

  history: {
    established: 2002,
    significance:
      '商工会青年部在由志愿者运营的手工制作花火大会和着开始、现在在60万人訪大规模活动在成长',
    highlights: [
      '2014年在吉尼斯记录认定的世界第一重的4尺玉的发射',
      '志愿者在由全国在也罕见手工制作的大会',
      '日本第一的最后连发花火300連发',
    ],
  },

  tips: [
    {
      category: '交通',
      items: [
        'JR鸿巣駅从步行30分',
        '关越道东松山IC从约39分',
        '停车场2000台有（3000元〜/1日）',
      ],
    },
    {
      category: '观赏',
      items: ['收费席在观赏推荐', '4尺玉和300連发在压轴', '早的时间在到达推荐'],
    },
    {
      category: '注意事项',
      items: [
        '门票在事前购买',
        '停车场在早的时间在満车',
        '天气在恶劣的情况在中止有',
      ],
    },
  ],

  contact: {
    organizer: '鸿巣市商工会青年部',
    phone: '未公开',
    website: 'https://kounosuhanabi.com/',
    socialMedia: '未公开',
  },

  mapInfo: {
    hasMap: true,
    mapNote: '糠田运动场荒川河川敷',
    parking: '停车场2000台有（3000元〜/1日）',
  },

  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3226.1!2d139.5213!3d36.0641!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzZCsDAzJzUwLjgiTiAxMznCsDMxJzE2LjciRQ!5e0!3m2!1sja!2sjp!4v1000000000000!5m2!1sja!2sjp',

  weatherInfo: {
    month: '10月',
    temperature: '25℃ / 18℃',
    humidity: '60%',
    rainfall: '较少',
    recommendation: '秋的气候在观赏在适合',
    rainPolicy: '荒天中止',
    note: '夜间变冷可能性的为了外套携带推荐',
  },

  media: [
    {
      type: 'image',
      url: '/images/hanabi/kounosu-shoukoukai-22-fireworks.svg',
      title: '鸿巢商工会第22回花火大会',
      description: '约2万发花火的壮观表演',
    },
  ],
};
