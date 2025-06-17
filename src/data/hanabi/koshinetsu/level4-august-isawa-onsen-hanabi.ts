import { HanabiData } from '@/types/hanabi';

export const isawaOnsenHanabiData: HanabiData = {
  id: 'isawa-onsen-hanabi-2025',
  name: '第61回 石和温泉花火大会',
  _sourceData: {
    japaneseName: '第61回 石和温泉花火大会',
    japaneseDescription: '第61回 石和温泉花火大会',
  },
  englishName: '61st Isawa Onsen Fireworks Festival',
  year: 2025,
  date: '2025年8月24日',
  displayDate: '2025年8月24日(日)',
  time: '19:30～21:00',
  duration: '90分钟',
  fireworksCount: '约1万发',
  expectedVisitors: '约1万2000人',
  weather: '小雨决行，恶劣天气时延期至2025年8月25日(月)',
  ticketPrice: '免费观览（无有料席）',
  status: 'scheduled',
  themeColor: '#FF6B6B',
  month: 8,

  title: '第61回 石和温泉花火大会 2025 | 甲信越花火大会',
  description:
    '2025年8月24日举办的第61回石和温泉花火大会详细信息。约1万发花火照亮笛吹川河畔，预计1万2000人观赏。90分钟精彩演出，约80店屋台。',

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
      name: '笛吹川河畔',
      location: '山梨县笛吹市石和町',
      startTime: '19:30开始，21:00结束',
    },
  ],

  access: [
    {
      venue: '笛吹川河畔',
      stations: [
        {
          name: '石和温泉站',
          lines: ['JR中央本线'],
          walkTime: '徒步约10分钟',
        },
      ],
    },
  ],

  viewingSpots: [
    {
      name: '笛吹川河畔',
      rating: 5,
      crowdLevel: 'high',
      tips: '河畔最佳观赏位置，建议早到占位',
      pros: ['河畔景色', '无遮挡视野', '免费观览'],
      cons: ['人流密集', '停车困难'],
    },
  ],

  history: {
    established: 1965,
    significance: '石和温泉地区的传统夏季祭典',
    highlights: [
      '第61回历史悠久的花火大会',
      '笛吹川河畔的夏季风物诗',
      '温泉街与花火的完美结合',
    ],
  },

  tips: [
    {
      category: '观赏建议',
      items: ['推荐早到河畔确保最佳观赏位置', '可结合温泉街观光，享受完整体验'],
    },
    {
      category: '交通停车',
      items: ['推荐使用JR石和温泉站，徒步可达', '自驾请注意交通管制和停车限制'],
    },
    {
      category: '美食体验',
      items: ['约80店屋台提供丰富美食选择', '可品尝当地特色小吃和温泉街美食'],
    },
  ],

  contact: {
    organizer: '笛吹市观光商工课',
    phone: '055-262-4111',
    website: 'https://www.fuefuki-kanko.jp/',
    socialMedia: '',
  },

  mapInfo: {
    hasMap: true,
    mapNote: '笛吹川河畔周边',
    parking: '临时停车场设置（有限）',
  },

  weatherInfo: {
    month: '8月',
    temperature: '白天30℃，夜间22℃',
    humidity: '75%',
    rainfall: '小雨决行',
    recommendation: '夏季炎热，请注意防暑降温',
    rainPolicy: '小雨决行，恶劣天气时延期至2025年8月25日(月)',
    note: '河畔观赏请注意安全',
  },

  specialFeatures: {
    scale: '约1万发花火',
    location: '笛吹川河畔的夏季风物诗',
    tradition: '第61回历史悠久的温泉街花火大会',
    atmosphere: '温泉街与花火的完美融合',
  },

  media: [
    {
      type: 'image' as const,
      url: '/images/hanabi/isawa-onsen/isawa-onsen-hanabi-main.jpg',
      title: '第61回石和温泉花火大会主会场',
      description: '笛吹川河畔绽放的1万发花火',
    },
    {
      type: 'image' as const,
      url: '/images/hanabi/isawa-onsen/isawa-onsen-hanabi-river.jpg',
      title: '笛吹川河畔花火',
      description: '河畔映照的美丽花火景色',
    },
    {
      type: 'image' as const,
      url: '/images/hanabi/isawa-onsen/isawa-onsen-hanabi-festival.jpg',
      title: '石和温泉花火祭典',
      description: '温泉街与花火的夏季祭典',
    },
  ],

  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3238.123456789!2d138.640983!3d35.646935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z44GV44Go44GG44Gu44KT44Gb44KT!5e0!3m2!1sja!2sjp!4v1642123456789!5m2!1sja!2sjp',

  website: 'https://www.fuefuki-kanko.jp/',

  officialSource: {
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0419e00682/',
    verificationDate: '2025-06-17',
    dataConfirmedBy: 'USER_PROVIDED' as const,
    lastChecked: '2025-06-17',
  },
};
