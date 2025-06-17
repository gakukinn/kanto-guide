import { HanabiData } from '../../../types/hanabi';

export const yokohamaKaisaiHanabiData: HanabiData = {
  id: 'yokohama-kaisai-hanabi',
  name: '横滨开港祭花火大会',
  _sourceData: {
    japaneseName: '横浜開港祭花火大会',
    japaneseDescription: '横浜開港祭花火大会',
  },
  englishName: 'Yokohama Port Opening Festival Fireworks',
  year: 2025,
  date: '2025年6月1日',
  time: '19:30～20:00',
  duration: '30分钟',
  fireworksCount: '约3000发',
  expectedVisitors: '约15万人',
  weather: '初夏，温暖舒适',
  status: 'scheduled',
  ticketPrice: '免费观赏',
  themeColor: 'blue',
  month: 6,

  title: '横滨开港祭花火大会 - 2025年海港花火完整攻略',
  description:
    '横滨开港祭花火大会详细指南，2025年6月1日举办。在横滨港欣赏海上花火，红砖仓库周边最佳观赏位置，包含交通方式、观赏地点等实用信息。',

  tags: {
    timeTag: '6月',
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
      url: '/images/hanabi/yokohama-kaisai/yokohama-kaisai-main.jpg',
      title: '横滨开港祭花火大会主会场',
      description: '横滨港上空绚烂绽放的花火',
    },
    {
      type: 'image',
      url: '/images/hanabi/yokohama-kaisai/yokohama-kaisai-harbor.jpg',
      title: '横滨港花火观赏',
      description: '红砖仓库周边的最佳观赏位置',
    },
  ],

  history: {
    established: 1981,
    significance: '横滨开港祭的重要组成部分，庆祝横滨港开港的历史',
    highlights: [
      '作为横滨开港祭的压轴活动',
      '在横滨港上空举办的海上花火',
      '红砖仓库等历史建筑为背景',
      '横滨港夜景与花火的完美结合',
    ],
  },

  venues: [
    {
      name: '横滨港',
      location: '神奈川県横浜市中区新港',
      startTime: '19:30',
      features: [
        '海上花火表演',
        '红砖仓库周边观赏',
        '港口夜景背景',
        '横滨地标建筑群',
      ],
    },
  ],

  access: [
    {
      venue: '红砖仓库周边',
      stations: [
        {
          name: '樱木町站',
          lines: ['JR根岸线', '横滨市营地下铁'],
          walkTime: '步行约15分钟',
        },
        {
          name: '关内站',
          lines: ['JR根岸线'],
          walkTime: '步行约15分钟',
        },
        {
          name: '马车道站',
          lines: ['横滨高速铁道'],
          walkTime: '步行约5分钟',
        },
      ],
    },
  ],

  mapInfo: {
    hasMap: true,
    mapNote: '神奈川県横浜市中区新港',
    parking: '周边有付费停车场\n建议使用公共交通',
  },

  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3250.1!2d139.7024!3d35.4532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDI3JzExLjYiTiAxMznCsDQyJzA4LjciRQ!5e0!3m2!1sja!2sjp!4v1618000000000!5m2!1sja!2sjp',

  viewingSpots: [
    {
      name: '红砖仓库周边',
      rating: 4.5,
      crowdLevel: '拥挤',
      tips: '最佳观赏位置，建议提前占位',
      pros: ['绝佳视野', '历史建筑背景', '交通便利'],
      cons: ['人流众多', '需要提前占位'],
    },
    {
      name: '山下公园',
      rating: 4.0,
      crowdLevel: '中等',
      tips: '公园内观赏，环境舒适',
      pros: ['环境优美', '设施完善', '适合家庭'],
      cons: ['距离稍远', '视野可能受限'],
    },
  ],

  contact: {
    organizer: '横滨开港祭协议会',
    phone: '045-681-2353',
    website: 'https://www.kaikosai.com/',
    socialMedia: '@yokohama_kaikosai',
  },

  weatherInfo: {
    month: '6月',
    temperature: '20-25°C',
    humidity: '70-80%',
    rainfall: '梅雨季节，可能有雨',
    rainPolicy: '雨天中止',
    note: '初夏时节，温暖舒适但可能有雨',
    recommendation:
      '建议携带雨具，关注天气预报。由于是海港地区，晚间可能有海风，建议携带薄外套。',
  },

  tips: [
    {
      category: '观赏建议',
      items: [
        '19:00前到达红砖仓库周边占位',
        '携带雨具应对梅雨季节',
        '海风较大，注意保暖',
      ],
    },
    {
      category: '交通建议',
      items: ['使用公共交通前往', '花火结束后人流较多，建议稍作等待'],
    },
    {
      category: '特色体验',
      items: [
        '结合横滨港夜景观赏',
        '可在红砖仓库购买纪念品',
        '体验横滨港的浪漫氛围',
      ],
    },
  ],
};
