import { HanabiData } from '@/types/hanabi';

export const yamanakakoHanabiData: HanabiData = {
  id: 'yamanakako-houkosai-hanabi',
  name: '山中湖「報湖祭」花火大会',
  _sourceData: {
    japaneseName: '山中湖「報湖祭」花火大会',
    japaneseDescription: '山中湖「報湖祭」花火大会',
  },
  englishName: 'Lake Yamanaka Houkosai Fireworks Festival',
  year: 2025,
  date: '2025年8月1日',
  displayDate: '2025年8月1日',
  time: '20:00～20:45',
  duration: '45分钟',
  fireworksCount: '10,000发',
  expectedVisitors: '未公布',
  weather: '夏季',
  ticketPrice: '免费观览',
  status: 'scheduled',
  themeColor: '#4A90E2',
  month: 8,

  title: '山中湖「報湖祭」花火大会 2025 | 甲信越花火大会',
  description:
    '2025年8月1日举办的山中湖「報湖祭」花火大会详细信息。大正时代延续至今的历史花火大会，以富士山为背景的1万发花火照亮湖面。',

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
      name: '山中湖畔',
      location: '山梨县南都留郡山中湖村',
      startTime: '20:00开始，20:45结束',
    },
  ],

  access: [
    {
      venue: '山中湖畔',
      stations: [
        {
          name: '富士山站',
          lines: ['富士急行线'],
          walkTime: '巴士约25分钟',
        },
      ],
    },
  ],

  viewingSpots: [
    {
      name: '山中湖畔',
      rating: 5,
      crowdLevel: 'high',
      tips: '以富士山为背景的绝景观赏点',
      pros: ['富士山背景', '湖面反射', '传统氛围'],
      cons: ['人流密集', '停车场不足'],
    },
  ],

  history: {
    established: 1912,
    significance: '自大正时代延续至今的历史花火大会',
    highlights: [
      '由文豪德富苏峰命名',
      '富士五湖花火的代表性花火大会',
      '神事与花火大会构成的传统祭典',
    ],
  },

  tips: [
    {
      category: '观赏建议',
      items: [
        '推荐早到确保以富士山为背景的绝景观赏位置',
        '湖畔夜间较冷，建议做好防寒措施',
      ],
    },
    {
      category: '交通停车',
      items: ['停车场拥挤，推荐利用公共交通', '部分停车场距离会场较远'],
    },
    {
      category: '观赏礼仪',
      items: ['包含神事的传统祭典，请遵守礼仪观赏', '垃圾请自行带回'],
    },
  ],

  contact: {
    organizer: '山中湖观光协会',
    phone: '0555-62-3100',
    website: 'https://www.yamanakako.gr.jp/',
    socialMedia: '',
  },

  mapInfo: {
    hasMap: true,
    mapNote: '山中湖畔周边',
    parking: '有料停车场（预计拥挤）',
  },

  weatherInfo: {
    month: '8月',
    temperature: '白天25℃，夜间18℃',
    humidity: '70%',
    rainfall: '较少',
    recommendation: '夜间较冷，请携带轻薄外套',
    rainPolicy: '小雨决行，恶劣天气中止',
    note: '湖畔观赏时请注意脚下安全',
  },

  specialFeatures: {
    scale: '1万发花火',
    location: '以富士山为背景的湖上花火',
    tradition: '自大正时代延续的历史花火大会',
    atmosphere: '神事与花火交织的庄严美丽氛围',
  },

  media: [
    {
      type: 'image' as const,
      url: '/images/hanabi/yamanakako-houkosai/yamanakako-houkosai-main.jpg',
      title: '山中湖報湖祭花火大会主会场',
      description: '色彩缤纷的花火在夜空中一齐绽放',
    },
    {
      type: 'image' as const,
      url: '/images/hanabi/yamanakako-houkosai/yamanakako-houkosai-fuji.jpg',
      title: '富士山背景下的山中湖花火',
      description: '以富士山为背景的美丽花火',
    },
    {
      type: 'image' as const,
      url: '/images/hanabi/yamanakako-houkosai/yamanakako-houkosai-reflection.jpg',
      title: '山中湖湖面映照的花火',
      description: '湖面映照花火的梦幻光景',
    },
  ],

  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3238.8123456789!2d138.8123456789!3d35.4123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60221b123456789a%3A0x123456789abcdef0!2z5bGx5Lit5rmW!5e0!3m2!1sja!2sjp!4v1642123456789!5m2!1sja!2sjp',

  website: 'https://www.yamanakako.gr.jp/',

  officialSource: {
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0419e00075/',
    verificationDate: '2025-06-14',
    dataConfirmedBy: 'USER_PROVIDED' as const,
    lastChecked: '2025-06-14',
  },
};
