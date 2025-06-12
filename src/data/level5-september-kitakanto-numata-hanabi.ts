import { HanabiData } from '@/types/hanabi';

export const numataHanabiData: HanabiData = {
  id: 'numata-hanabi',
  name: '第13回沼田花火大会',
  japaneseName: '第13回 沼田花火大会',
  englishName: '13th Numata Fireworks Festival',
  year: 2025,
  date: '2025年9月13日',
  time: '19:00～20:30',
  duration: '约90分钟',
  fireworksCount: '约1万发',
  expectedVisitors: '约8万人',
  weather: '9月秋季，气候宜人',
  ticketPrice: '有料观览席另收费',
  status: '开催预定',
  themeColor: '#E74C3C',
  title: '第13回沼田花火大会',
  description: '群马县沼田市举办的秋季花火大会。约1万发花火在利根川河畔绽放，以音乐花火和创意花火为特色。沼田城址公园的高台位置提供绝佳观赏视角，是群马县内屈指可数的大规模花火祭典。',
  tags: {
    timeTag: '9月',
    regionTag: '北关东',
    typeTag: '花火',
    layerTag: '详细介绍'
  
  },
  month: 9,
  venues: [
    {
      name: '利根川河畔沼田运动公园',
      location: '群马县沼田市下沼田町',
      startTime: '19:00',
      features: ['河畔花火', '音乐协作', '创意花火', '大型星矿']
    }
  ],
  access: [
    {
      venue: '利根川河畔沼田运动公园',
      stations: [
        {
          name: '沼田站',
          lines: ['JR上越线'],
          walkTime: '徒步约15分钟'
        }
      ]
    }
  ],
  viewingSpots: [
    {
      name: '沼田城址公园',
      rating: 5,
      crowdLevel: 'high',
      tips: '高台位置提供最佳俯瞰视角，建议提前占位',
      pros: ['绝佳俯瞰视角', '历史文化背景', '相对宽敞'],
      cons: ['需要爬坡', '距离稍远']
    },
    {
      name: '利根川河畔观览席',
      rating: 4,
      crowdLevel: 'high',
      tips: '最近距离观赏，有料席位保证观赏效果',
      pros: ['最近距离', '有料席保证', '音响效果佳'],
      cons: ['需要付费', '人数众多']
    },
    {
      name: '沼田运动公园周边',
      rating: 3,
      crowdLevel: 'medium',
      tips: '免费观赏区域，建议早到确保位置',
      pros: ['免费观赏', '停车便利', '设施完善'],
      cons: ['视角受限', '需要早到']
    }
  ],
  history: {
    established: 2013,
    significance: '沼田市为振兴地域经济和文化交流而创办的花火大会，已成为群马县北部地区的代表性秋季活动。',
    highlights: [
      '利根川河畔的壮观花火演出',
      '音乐与花火的完美融合',
      '沼田城址公园的历史背景',
      '群马县北部最大规模花火大会'
    ]
  },
  tips: [
    {
      category: '观赏建议',
      items: [
        '推荐沼田城址公园的高台观赏位置',
        '音乐花火时段不要错过',
        '建议携带折叠椅和保暖衣物'
      ]
    },
    {
      category: '交通提示',
      items: [
        'JR沼田站徒步约15分钟',
        '有临时停车场，建议早到',
        '关越道沼田IC约10分钟'
      ]
    },
    {
      category: '注意事项',
      items: [
        '9月夜间气温较低，注意保暖',
        '河畔风大，建议防风措施',
        '雨天可能中止，请确认开催状况'
      ]
    }
  ],
  contact: {
    organizer: '沼田花火大会实行委员会',
    phone: '0278-23-2111',
    website: 'https://numatahanabi.com/',
    socialMedia: '@numata_hanabi'
  },
  mapInfo: {
    hasMap: true,
    mapNote: '会场周边有详细案内图',
    parking: '临时停车场约1000台'
  },
  weatherInfo: {
    month: '9月',
    temperature: '平均气温12-22度',
    humidity: '适中',
    rainfall: '较少',
    recommendation: '秋季观赏花火的舒适时期',
    rainPolicy: '雨天中止或延期'
  },
  // 官方数据源验证
  officialSource: {
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0310e40188/',
    verificationDate: '2025-01-13',
    dataConfirmedBy: 'USER_PROVIDED' as const,
    lastChecked: '2025-01-13'
  },
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3222.8!2d139.0!3d36.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzZCsDM2JzAwLjAiTiAxMznCsDAwJzAwLjAiRQ!5e0!3m2!1sja!2sjp!4v1234567890123!5m2!1sja!2sjp',
  website: 'https://numatahanabi.com/',
  related: {
    regionRecommendations: [
      {
        id: 'numata-castle',
        name: '沼田城址公园',
        date: '通年开放',
        location: '沼田市',
        visitors: '年间20万人',
        link: '/attractions/numata-castle'
      }
    ],
    timeRecommendations: [
      {
        id: 'numata-autumn-festival',
        name: '沼田秋祭',
        date: '10月上旬',
        location: '沼田市中心部',
        visitors: '约5万人',
        link: '/autumn/numata-festival'
      }
    ]
  }
}; 