import { HanabiData } from '@/types/hanabi';

export const rindokoHanabiData: HanabiData = {
  id: 'rindoko-hanabi',
  name: '第31回りんどう湖花火大会',
  japaneseName: '第31回 りんどう湖花火大会',
  englishName: '31st Rindoko Lake Fireworks Festival',
  year: 2025,
  date: '2025年9月14日・21日',
  time: '18:30～19:00',
  duration: '约30分钟',
  fireworksCount: '约3000发',
  expectedVisitors: '约3万人',
  weather: '9月秋季，气候宜人',
  ticketPrice: '观览席另收费，需牧场入场费',
  status: '开催预定',
  themeColor: '#4A90E2',
  title: '第31回りんどう湖花火大会',
  description: '那须高原りんどう湖家庭牧场每年举办的湖上花火大会。约3000发花火在30分钟内一气呵成，将那须夜空和りんどう湖染成绚烂色彩。湖泊独有的水中・水上花火和音乐协作花火是最大看点。',
  tags: {
    timeTag: '9月',
    regionTag: '北关东',
    typeTag: '花火',
    layerTag: '详细介绍'
  
  },
  month: 9,
  venues: [
    {
      name: '那须高原りんどう湖家庭牧场',
      location: '栃木县那须郡那须町那须高原',
      startTime: '18:30',
      features: ['湖上花火', '水中花火', '音乐协作', '牧场设施']
    }
  ],
  access: [
    {
      venue: '那须高原りんどう湖家庭牧场',
      stations: [
        {
          name: '那须盐原站',
          lines: ['东北新干线', 'JR东北本线'],
          walkTime: '开车约30分钟'
        }
      ]
    }
  ],
  viewingSpots: [
    {
      name: '湖畔观览席',
      rating: 5,
      crowdLevel: 'high',
      tips: '建议提前预约有料观览席，湖面倒影花火是最大看点',
      pros: ['最佳观赏位置', '可欣赏湖面倒影', '有料席保证'],
      cons: ['需要额外费用', '人数较多']
    },
    {
      name: '牧场内自由观览区',
      rating: 4,
      crowdLevel: 'medium',
      tips: '可以在牧场内自由选择观赏位置，建议早点到达',
      pros: ['自由选择位置', '可享受牧场设施', '相对宽松'],
      cons: ['需要早到占位', '视角可能受限']
    }
  ],
  history: {
    established: 1995,
    significance: '那须高原代表性的湖上花火大会，以水中花火和音乐协作为特色，在自然环境中享受花火之美。',
    highlights: [
      '湖面映照的幻想水中・水上花火',
      '音乐同步的特别演出花火',
      '真上绽放的大迫力星矿',
      '那须高原的自然环境体验'
    ]
  },
  tips: [
    {
      category: '观赏建议',
      items: [
        '推荐选择湖畔位置观赏水中花火',
        '音乐协作花火时段不要错过',
        '可以提前在牧场内游玩'
      ]
    },
    {
      category: '交通提示',
      items: [
        '建议自驾前往，有2000台停车位',
        '从那须盐原站开车约30分钟',
        '东北道那须IC约10分钟'
      ]
    }
  ],
  contact: {
    organizer: '那须高原りんどう湖家庭牧场',
    phone: '0287-76-3111',
    website: 'https://www.rindo.co.jp/',
    socialMedia: '@rindoko_official'
  },
  // 官方数据源验证
  officialSource: {
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0309e00579/',
    verificationDate: '2025-01-13',
    dataConfirmedBy: 'USER_PROVIDED' as const,
    lastChecked: '2025-01-13'
  },
  mapInfo: {
    hasMap: true,
    mapNote: '牧场内有详细地图指引',
    parking: '2000台停车位，有料'
  },
  weatherInfo: {
    month: '9月',
    temperature: '平均气温15-25度',
    humidity: '适中',
    rainfall: '较少',
    recommendation: '秋季观赏花火的最佳时期',
    rainPolicy: '雨天中止'
  },
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3222.8!2d139.9!3d37.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDAwJzAwLjAiTiAxMznCsDU0JzAwLjAiRQ!5e0!3m2!1sja!2sjp!4v1234567890123!5m2!1sja!2sjp',
  website: 'https://www.rindo.co.jp/',
  related: {
    regionRecommendations: [
      {
        id: 'nasu-animal-kingdom',
        name: '那须动物王国',
        date: '通年开放',
        location: '那须町',
        visitors: '年间50万人',
        link: '/attractions/nasu-animal-kingdom'
      }
    ],
    timeRecommendations: [
      {
        id: 'nasu-autumn-leaves',
        name: '那须高原红叶',
        date: '10月中旬-11月上旬',
        location: '那须高原',
        visitors: '约10万人',
        link: '/autumn/nasu-kouyou'
      }
    ]
  }
}; 