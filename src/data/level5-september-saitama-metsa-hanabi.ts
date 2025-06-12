import { HanabiData } from '../types/hanabi';

export const metsaHanabiData: HanabiData = {
  id: 'metsa-nordic-hanabi-2025',
  name: '梅兹塔北欧花火2025',
  japaneseName: 'メッツァの北欧花火2025',
  englishName: 'Metsa Nordic Fireworks 2025',
  year: 2025,
  date: '9月13日・14日・20日・21日',
  time: '19:00～约15分钟',
  duration: '约15分钟',
  fireworksCount: '非公开',
  expectedVisitors: '非公开',
  weather: '晴朗',
  ticketPrice: '1650円～',
  status: '开催预定',
  themeColor: '#4A90E2',
  month: 9,
  
  title: '梅兹塔北欧花火2025 | 2025年9月埼玉花火大会',
  description: '梅兹塔北欧花火2025，北欧8国大使馆推荐音乐与花火的完美融合。湖畔花火，各国国旗色彩演出。2025年9月13日・14日・20日・21日开催。',
  
  tags: {
    timeTag: '9月',
    regionTag: '埼玉',
    typeTag: '花火',
    layerTag: '详细介绍'
  
  },
  
  related: {
    regionRecommendations: [
      {
        id: 'seibu-yuenchi-hanabi',
        name: '西武园游乐园大火祭',
        date: "9月13日・14日",
        location: '西武园游乐园',
        visitors: '非公开',
        link: '/september/hanabi/saitama/seibu-hanabi'
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
    ]
  },

  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3238.8!2d139.3!3d35.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDQ4JzAwLjAiTiAxMznCsDE4JzAwLjAiRQ!5e0!3m2!1sja!2sjp!4v1620000000000!5m2!1sja!2sjp',

  venues: [
    {
      name: '梅兹塔村',
      location: '埼玉县飯能市宮沢327-6',
      startTime: '19:00',
      features: ['湖畔观览', '北欧主题', '特别观览席', '餐饮设施']
    }
  ],

  access: [
    {
      venue: '梅兹塔村',
      stations: [
        {
          name: '飯能站',
          lines: ['西武池袋线'],
          walkTime: '巴士约13分钟'
        }
      ]
    }
  ],

  viewingSpots: [
    {
      name: '桟橋观览席',
      rating: 5,
      crowdLevel: 'high',
      tips: '湖面最前列，真上花火的大迫力体验。需要穿着救生衣等安全装备',
      pros: ['最佳观赏位置', '近距离体验', '专用座席'],
      cons: ['需要安全装备', '价格较高']
    },
    {
      name: '丘上观览席',
      rating: 4,
      crowdLevel: 'medium',
      tips: '安静的丘陵上，迫力满点的花火观赏。视野开阔，适合摄影',
      pros: ['视野开阔', '适合摄影', '相对安静'],
      cons: ['距离稍远', '需要步行']
    },
    {
      name: '船甲板观览席',
      rating: 4,
      crowdLevel: 'medium',
      tips: '开放空间的特等席，感受夜风的舒适。通风良好，观赏体验佳',
      pros: ['开放空间', '通风良好', '舒适体验'],
      cons: ['可能受风影响', '座位有限']
    }
  ],

  history: {
    established: 2024,
    significance: '国内最大级北欧生活方式体验设施的花火大会',
    highlights: [
      '北欧8国大使馆后援',
      '各国国旗色彩的花火演出',
      '湖畔花火的独特体验',
      '北欧音乐与花火的融合'
    ]
  },

  tips: [
    {
      category: '观览建议',
      items: [
        '桟橋观览席需穿着救生衣',
        '建议提前购买特别观览席',
        '湖畔夜间温度较低，注意保暖',
        '可享受附赠的礼品券购物'
      ]
    },
    {
      category: '交通指南',
      items: [
        '从飯能站北口乘坐巴士约13分钟',
        '自驾可利用狭山日高IC约12分钟',
        '停车场1000台，土日祝日1500円',
        '建议提前确认巴士时刻表'
      ]
    },
    {
      category: '注意事项',
      items: [
        '小雨决行，强风荒天中止',
        '禁止携带椅子等物品',
        '部分观览席禁止宠物同伴',
        '预告无通知可能变更打上时间'
      ]
    }
  ],

  contact: {
    organizer: '株式会社梅兹塔',
    phone: '04-2929-5354',
    website: 'https://metsa-hanno.com/event/37842',
    socialMedia: '@Metsa_Official'
  },

  mapInfo: {
    hasMap: true,
    mapNote: '梅兹塔村位于宮沢湖畔，交通便利',
    parking: '1000台，土日祝日1500円'
  },

  weatherInfo: {
    month: '9月',
    temperature: '18-25°C',
    humidity: '60-70%',
    rainfall: '少雨',
    recommendation: '建议携带薄外套，夜间较凉',
    rainPolicy: '小雨决行，强风荒天中止',
    note: '湖畔夜间温度较低，注意保暖'
  },

  specialFeatures: {
    scale: '北欧8国大使馆后援的国际性花火大会',
    location: '宮沢湖畔的独特湖上花火',
    tradition: '结合北欧音乐文化的创新演出',
    atmosphere: '北欧生活方式体验与花火的完美融合'
  },

  special2025: {
    theme: '北欧8国音乐花火',
    concept: '各国国旗色彩的花火演出',
    features: [
      '大使馆推荐音乐BGM',
      '湖面倒影的双重美景',
      '多种特别观览席选择',
      '礼品券附赠服务'
    ]
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
      salesStart: '2025-06-07',
      salesEnd: '2025-09-21',
      availability: 'available'
    },
    venueDetails: {
      facilities: ['停车场', '餐厅', '洗手间', '商店', '特别观览席'],
      restrictions: ['需购买观览席', '部分区域禁止宠物']
    },
    dataSources: {
      primary: 'Walker Plus',
      lastSync: '2025-01-13',
      verification: true
    }
  },

  website: 'https://metsa-hanno.com/event/37842',

  officialSource: {
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0311e471906/',
    verificationDate: '2025-01-13',
    dataConfirmedBy: 'USER_PROVIDED',
    lastChecked: '2025-01-13'
  },

  dataIntegrityCheck: {
    hasOfficialSource: true,
    userVerified: true,
    lastValidated: '2025-01-13'
  },

  dataSourceUrl: 'https://hanabi.walkerplus.com/detail/ar0311e471906/'
}; 