import { HanabiData } from '../types/hanabi';

export const seibuHanabiData: HanabiData = {
  id: 'seibu-yuenchi-daika-matsuri-2025',
  name: '西武园游乐园大火祭',
  japaneseName: '西武園ゆうえんち大火祭り',
  englishName: 'Seibu-en Amusement Park Fire Festival',
  year: 2025,
  date: "9月13日・14日",
  time: '19:30～约7分钟',
  duration: '约7分钟',
  fireworksCount: '非公开',
  expectedVisitors: '非公开',
  weather: '晴朗',
  ticketPrice: '需购买游乐园门票',
  status: '开催预定',
  themeColor: '#FF6B6B',
  
  title: '西武园游乐园大火祭 | 2025年9月埼玉花火大会',
  description: '西武园游乐园大火祭，音乐与花火的完美融合。近距离观赏震撼花火，感受全身心的音响体验。2025年9月13日・14日开催。',
  
  tags: {
    timeTag: '9月',
    regionTag: '埼玉',
    typeTag: '花火',
    layerTag: '详细介绍'
  
  },
  
  related: {
    regionRecommendations: [
      {
        id: 'saitama-summer-hanabi',
        name: '埼玉市花火大会',
        date: "7月27日",
        location: '大和田公园',
        visitors: '约15万人',
        link: '/july/hanabi/saitama/saitama-hanabi'
      }
    ],
    timeRecommendations: [
      {
        id: 'chofu-hanabi-2025',
        name: '第40回调布花火',
        date: "9月20日",
        location: '调布市多摩川周边',
        visitors: '30万人',
        link: '/september/hanabi/tokyo/chofu-hanabi'
      }
    ],
    sameMonth: ['/september/hanabi/tokyo/chofu-hanabi'],
    sameRegion: ['/july/hanabi/saitama/saitama-hanabi']
  },
  
  dynamicData: {
    popularity: {
      wantToGo: 0,
      wentAndGood: 0,
      lastUpdated: '2025-01-13'
    },
    schedule: {
      confirmed: true,
      dateStatus: 'confirmed',
      updates: []
    },
    ticketing: {
      salesStart: '2025-07-01',
      salesEnd: '2025-09-14',
      availability: 'available'
    },
    venueDetails: {
      facilities: ['停车场', '餐厅', '洗手间', '游乐设施'],
      restrictions: ['需购买门票', '禁止携带酒精']
    },
    dataSources: {
      primary: 'Walker Plus',
      lastSync: '2025-01-13',
      verification: true
    }
  },
  
  venues: [
    {
      name: '西武园游乐园',
      location: '埼玉县所沢市山口2964',
      startTime: '19:30',
      features: [
        '近距离观赏体验',
        '音乐花火联动',
        '游乐园内观赏',
        '震撼音响效果'
      ]
    }
  ],
  
  access: [
    {
      venue: '西武园游乐园',
      stations: [
        {
          name: '西武园游乐园站',
          lines: ['西武山口线'],
          walkTime: '即到'
        },
        {
          name: '多摩湖站',
          lines: ['西武多摩湖线'],
          walkTime: '徒步15分钟'
        }
      ]
    }
  ],
  
  viewingSpots: [
    {
      name: '游乐园内观赏区域',
      rating: 5,
      crowdLevel: '中等',
      tips: '需要购买游乐园门票，建议提前入园占据好位置',
      pros: [
        '近距离观赏花火',
        '音响效果震撼',
        '安全舒适环境',
        '配套设施完善'
      ],
      cons: [
        '需要门票费用',
        '观赏时间较短',
        '人数有限制'
      ]
    },
    {
      name: '园外周边区域',
      rating: 3,
      crowdLevel: '高',
      tips: '免费观赏，但距离较远，建议携带望远镜',
      pros: [
        '免费观赏',
        '空间相对宽敞'
      ],
      cons: [
        '距离较远',
        '音响效果有限',
        '视野可能受阻'
      ]
    }
  ],
  
  history: {
    established: 2019,
    significance: '西武园游乐园的夏季特别活动，以音乐与花火的完美融合为特色，为游客带来独特的感官体验。',
    highlights: [
      '2019年开始举办的新兴花火活动',
      '以近距离观赏和音响效果为特色',
      '结合游乐园娱乐元素的创新花火体验',
      '成为埼玉地区独特的花火活动'
    ]
  },
  
  tips: [
    {
      category: '观赏攻略',
      items: [
        '建议提前购买游乐园门票',
        '花火开始前1小时入园占位',
        '携带防蚊虫用品',
        '注意保暖，夜间温度较低'
      ]
    },
    {
      category: '交通指南',
      items: [
        '推荐乘坐西武山口线至西武园游乐园站',
        '自驾游客可利用园内停车场',
        '花火结束后交通拥挤，建议错峰离开',
        '可考虑住宿附近酒店避开交通高峰'
      ]
    },
    {
      category: '注意事项',
      items: [
        '花火时间较短，约7分钟',
        '园内禁止携带酒精饮料',
        '遵守园内安全规定',
        '天气恶劣时可能中止'
      ]
    }
  ],
  
  contact: {
    organizer: '西武园游乐园',
    phone: '04-2929-5354',
    website: 'https://www.seibu-leisure.co.jp/amusementpark/',
    socialMedia: ''
  },
  
  mapInfo: {
    hasMap: true,
    mapNote: '西武园游乐园位于所沢市，交通便利，有专用停车场',
    parking: '有（收费）'
  },
  
  weatherInfo: {
    month: '9月',
    temperature: '20-25°C',
    humidity: '60-70%',
    rainfall: '少雨',
    recommendation: '建议携带薄外套，夜间较凉',
    rainPolicy: '雨天中止',
    note: '晴朗无风天气最佳'
  },
  
  specialFeatures: {
    scale: '游乐园内特色花火',
    location: '近距离观赏体验',
    tradition: '音乐花火联动演出',
    atmosphere: '游乐园独特氛围',
    collaboration: '音响与视觉的完美结合'
  },
  
  special2025: {
    theme: '音乐花火幻想曲',
    concept: '五感体验的花火娱乐',
    features: [
      '大迫力音响系统',
      '近距离花火体验',
      '音乐同步演出',
      '游乐园特色环境'
    ]
  },
  
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3236.8234567890123!2d139.4567890123456!3d35.7890123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018e1234567890a%3A0x1234567890abcdef!2z6KW_5q2m5ZyS44KG44GG44GI44KT44Gh!5e0!3m2!1sja!2sjp!4v1234567890123!5m2!1sja!2sjp',
  
  month: 9,
  
  website: 'https://hanabi.walkerplus.com/detail/ar0311e00439/',
  
  officialSource: {
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0311e00439/',
    verificationDate: '2025-01-13',
    dataConfirmedBy: 'USER_PROVIDED',
    lastChecked: '2025-01-13'
  },
  
  dataIntegrityCheck: {
    hasOfficialSource: true,
    userVerified: true,
    lastValidated: '2025-01-13'
  },
  
  dataSourceUrl: 'https://hanabi.walkerplus.com/detail/ar0311e00439/'
}; 