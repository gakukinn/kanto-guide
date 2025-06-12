import { HanabiData } from '../types/hanabi';

export const yokohamaHanabiData: HanabiData = {
  id: 'yokohama-night-flowers-2025',
  name: '横浜夜间花火2025',
  japaneseName: '横浜ナイトフラワーズ2025',
  englishName: 'Yokohama Night Flowers 2025',
  year: 2025,
  date: "9月6日・14日",
  time: '19:00～19:05',
  duration: '约5分钟',
  fireworksCount: '约150发',
  expectedVisitors: '非公开',
  weather: '晴朗',
  ticketPrice: '免费观览',
  status: '开催预定',
  themeColor: '#1E88E5',
  month: 9,
  
  title: '横浜夜间花火2025 | 2025年9月神奈川花火大会',
  description: '横浜夜间花火2025，年间通年开催的短时间花火。横浜港湾美景与花火的完美融合，每月定期开催。2025年9月6日・14日开催。',
  
  tags: {
    timeTag: '9月',
    regionTag: '神奈川',
    typeTag: '花火',
    layerTag: '详细介绍'
  
  },
  
  related: {
    regionRecommendations: [
      {
        id: 'kamakura-hanabi-2025',
        name: '第77回镰仓花火大会',
        date: "7月18日",
        location: '由比滨海岸',
        visitors: '约16万人',
        link: '/july/hanabi/kanagawa/kamakura-hanabi'
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
  
  venues: [
    {
      name: '横浜港（新港码头・大栈桥）',
      location: '神奈川县横浜市中区',
      startTime: '19:00',
      features: ['港湾景观', '短时间花火', '免费观览', '交通便利']
    }
  ],
  
  viewingSpots: [
    {
      name: '大栈桥国际客船码头',
      rating: 5,
      crowdLevel: 'high',
      tips: '最佳观赏位置，视野开阔，可欣赏港湾全景。建议提前到达占位',
      pros: ['视野最佳', '交通便利', '设施完善'],
      cons: ['人流较多', '需提前到达']
    },
    {
      name: '新港中央广场',
      rating: 4,
      crowdLevel: 'medium',
      tips: '宽敞的观赏空间，适合家庭观览。周边有餐饮设施',
      pros: ['空间宽敞', '设施齐全', '适合家庭'],
      cons: ['距离稍远', '部分视角受限']
    },
    {
      name: '山下公园',
      rating: 4,
      crowdLevel: 'medium',
      tips: '经典的横浜观光地，可同时享受公园散步和花火观赏',
      pros: ['环境优美', '观光价值高', '停留舒适'],
      cons: ['观赏角度有限', '人流密集']
    }
  ],
  
  access: [
    {
      venue: '横浜港（新港码头・大栈桥）',
      stations: [
        {
          name: '马车道站',
          lines: ['港未来线'],
          walkTime: '徒步10分钟（新港码头）'
        },
        {
          name: '日本大通站',
          lines: ['港未来线'],
          walkTime: '徒步7分钟（大栈桥）'
        },
        {
          name: '关内站',
          lines: ['JR根岸线'],
          walkTime: '徒步15分钟'
        }
      ]
    }
  ],
  

  
  tips: [
    {
      category: '观赏准备',
      items: ['建议提前30分钟到达，确保最佳观赏位置', '携带轻便座椅或野餐垫，提高观赏舒适度']
    },
    {
      category: '注意事项',
      items: ['注意保暖，海边夜晚较凉', '关注官方网站，确认当日开催信息']
    },
    {
      category: '观光建议',
      items: ['可结合横浜观光，白天游览后晚上观赏花火']
    }
  ],
  
  history: {
    established: 2019,
    significance: '横浜夜间花火始于2019年，作为横浜港湾地区活性化的一环而开始',
    highlights: ['全年定期开催的新型花火活动', '旨在为横浜港增添更多魅力', '与传统夏季花火大会的差异化']
  },
  
  contact: {
    organizer: '横浜夜间花火实行委员会',
    phone: '045-663-7267',
    website: 'https://www.yokohama-sparkling-twilight.com/',
    socialMedia: ''
  },
  
  mapInfo: {
    hasMap: true,
    mapNote: '横浜港新港码头・大栈桥周边',
    parking: '周边有付费停车场，建议使用公共交通'
  },
  
  weatherInfo: {
    month: '9月',
    temperature: '18-23°C',
    humidity: '65-75%',
    rainfall: '中等',
    recommendation: '建议携带薄外套，海边夜晚较凉',
    rainPolicy: '荒天中止',
    note: '秋季海风较强，注意保暖'
  },
  
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3250.2!2d139.6917!3d35.4437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60185ce0e17df5d7%3A0x2ef2d2b4b8a8b8a8!2z5aSn5qCn5qmL5Zu96Zqb5a6i6Iiq6Iir56K66aKt!5e0!3m2!1sja!2sjp!4v1642000000000!5m2!1sja!2sjp',
  
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
      salesStart: '',
      salesEnd: '',
      availability: 'available'
    },
    venueDetails: {
      facilities: ['洗手间', '餐饮设施', '观光设施'],
      restrictions: ['荒天中止', '交通管制可能']
    },
    dataSources: {
      primary: 'Walker Plus',
      lastSync: '2025-01-13',
      verification: true
    }
  }
}; 