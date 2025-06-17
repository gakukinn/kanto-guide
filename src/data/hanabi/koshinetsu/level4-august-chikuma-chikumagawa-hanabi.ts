import { HanabiData } from '@/types/hanabi';

export const chikumaChikumagawaHanabiData: HanabiData = {
  id: 'chikuma-chikumagawa-hanabi',
  name: '第94回 信州千曲市千曲川納涼煙火大会',
  _sourceData: {
    japaneseName: '第94回 信州千曲市千曲川納涼煙火大会',
    japaneseDescription: '第94回 信州千曲市千曲川納涼煙火大会',
  },
  englishName:
    '94th Shinshu Chikuma City Chikumagawa Cool Evening Fireworks Festival',
  year: 2025,
  date: '2025年8月7日',
  displayDate: '2025年8月7日(木)',
  time: '19:30～21:00',
  duration: '约90分钟',
  fireworksCount: '约1万发',
  expectedVisitors: '约6万5000人',
  weather: '小雨决行，恶劣天气中止',
  ticketPrice: '有料席（详细未定）',
  status: 'scheduled',
  themeColor: '#87CEEB',
  month: 8,

  title: '第94回 信州千曲市千曲川納涼煙火大会 2025 | 甲信越花火大会',
  description:
    '2025年8月7日举办的第94回信州千曲市千曲川納涼煙火大会详细信息。约1万发花火照亮千曲川夜空，预计6万5000人观赏。90分钟精彩演出，户仓上山田温泉河畔举行。',

  tags: {
    timeTag: '8月',
    regionTag: '甲信越',
    typeTag: '花火',
    layerTag: '详细介绍',
  },

  related: {
    regionRecommendations: [],
    timeRecommendations: [],
  },

  venues: [
    {
      name: '千曲川河畔',
      location: '户仓上山田温泉千曲川河畔(大正桥～万叶桥间)',
      startTime: '19:30开始，21:00结束',
    },
  ],

  access: [
    {
      venue: '千曲川河畔',
      stations: [
        {
          name: '户仓站',
          lines: ['信浓铁道'],
          walkTime: '徒步15分钟',
        },
      ],
    },
  ],

  viewingSpots: [
    {
      name: '千曲川河畔',
      rating: 5,
      crowdLevel: 'very_high',
      tips: '第94回历史悠久的传统花火大会，建议早到',
      pros: ['河畔景色', '温泉街氛围', '历史悠久'],
      cons: ['人流极多', '停车困难'],
    },
  ],

  history: {
    established: 1932,
    significance: '信州千曲市传统的夏季纳凉花火大会',
    highlights: [
      '第94回历史悠久的花火大会',
      '千曲川河畔的夏季风物诗',
      '户仓上山田温泉街的传统祭典',
    ],
  },

  tips: [
    {
      category: '观赏建议',
      items: ['推荐早到河畔确保最佳观赏位置', '可结合户仓上山田温泉住宿体验'],
    },
    {
      category: '交通停车',
      items: [
        '信浓铁道户仓站徒步15分钟',
        '1100台有料・无料停车场',
        '上信越道坂城IC约8分钟，长野道更埴IC约15分钟',
      ],
    },
    {
      category: '美食体验',
      items: ['会场设有屋台，可品尝当地美食', '温泉街有丰富的餐饮选择'],
    },
  ],

  contact: {
    organizer: '千曲川納涼煙火大会实行委员会事务局',
    phone: '026-261-0300',
    website: 'https://www.chikuma-hanabi.jp/',
    socialMedia: '',
  },

  mapInfo: {
    hasMap: true,
    mapNote: '户仓上山田温泉千曲川河畔',
    parking: '1100台有料・无料停车场',
  },

  weatherInfo: {
    month: '8月',
    temperature: '白天28℃，夜间20℃',
    humidity: '75%',
    rainfall: '小雨决行',
    recommendation: '夏季炎热，请注意防暑降温',
    rainPolicy: '小雨决行，恶劣天气中止',
    note: '河畔观赏请注意安全',
  },

  specialFeatures: {
    scale: '约1万发花火',
    location: '千曲川河畔的纳凉花火大会',
    tradition: '第94回历史悠久的信州传统花火大会',
    atmosphere: '温泉街与花火的完美融合',
  },

  media: [
    {
      type: 'image' as const,
      url: '/images/hanabi/chikuma-chikumagawa/chikuma-chikumagawa-hanabi-main.jpg',
      title: '第94回信州千曲市千曲川納涼煙火大会主会场',
      description: '千曲川河畔绽放的1万发花火',
    },
    {
      type: 'image' as const,
      url: '/images/hanabi/chikuma-chikumagawa/chikuma-chikumagawa-hanabi-river.jpg',
      title: '千曲川河畔花火',
      description: '河畔映照的美丽花火景色',
    },
    {
      type: 'image' as const,
      url: '/images/hanabi/chikuma-chikumagawa/chikuma-chikumagawa-hanabi-onsen.jpg',
      title: '户仓上山田温泉街花火',
      description: '温泉街与花火的夏季祭典',
    },
  ],

  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3238.123456789!2d138.146028!3d36.483485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z44Gq44GM44Gw44Gw44GX!5e0!3m2!1sja!2sjp!4v1642123456789!5m2!1sja!2sjp',

  website: 'https://www.chikuma-hanabi.jp/',

  officialSource: {
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0420e00911/',
    verificationDate: '2025-06-17',
    dataConfirmedBy: 'USER_PROVIDED' as const,
    lastChecked: '2025-06-17',
  },
};
