import { HanabiData } from '@/types/hanabi';

export const minatoMiraiSmartData: HanabiData = {
  id: 'minato-mirai-smart-festival-2025',
  name: '港未来智能节庆2025',
  japaneseName: 'みなとみらいスマートフェスティバル2025',
  englishName: 'Minato Mirai Smart Festival 2025',
  year: 2025,
  month: 8,
  date: '2025年8月4日(月)',
  time: '17:30-20:00',
  duration: '约25分钟',
  fireworksCount: '约2万发',
  expectedVisitors: '约2万人（有料会场）',
  weather: '荒天时一部分内容可能变更或中止',
  ticketPrice: '有料观览席：1万-4万日元，安全对策协力金：5000日元',
  status: 'scheduled',
  themeColor: 'blue',
  
  tags: {
    timeTag: '8月',
    regionTag: '神奈川',
    typeTag: '花火',
    layerTag: '详细介绍'
  },

  media: [
    {
      type: 'image',
      url: '/images/hanabi/minato-mirai-fireworks.svg',
      title: '港未来智能节庆花火表演',
      description: '横滨港未来21地区举行的音乐花火节庆，25分钟内约2万发花火的震撼演出'
    }
  ],
  
  venues: [
    {
      name: '港未来21地区',
      location: '横滨市中区港未来21地区',
      startTime: '17:30',
      features: [
        'SDGs未来都市横滨主题活动',
        '25分钟内约2万发花火的密集演出',
        '音乐与花火的完美结合演出',
        '横滨港水面倒影的绝美景观'
      ]
    }
  ],

  access: [
    {
      venue: '港未来21地区',
      stations: [
        {
          name: '港未来站',
          lines: ['港未来线'],
          walkTime: '步行约10分钟'
        },
        {
          name: '新高岛站',
          lines: ['港未来线'],
          walkTime: '步行约10分钟'
        },
        {
          name: '樱木町站',
          lines: ['JR根岸线'],
          walkTime: '步行约15分钟'
        },
        {
          name: '横滨站',
          lines: ['JR东海道线', 'JR京滨东北线', '东急东横线', '京急本线'],
          walkTime: '步行约20分钟'
        }
      ]
    }
  ],

  viewingSpots: [
    {
      name: '临海公园',
      rating: 5,
      crowdLevel: 'high',
      tips: '主要观览会场，需要有料观览席',
      pros: ['最佳观览位置', '音乐表演会场', '有料观览席'],
      cons: ['需要提前购票', '人群拥挤']
    },
    {
      name: '杯面博物馆公园',
      rating: 4,
      crowdLevel: 'medium',
      tips: '家庭友好的观览区域，需要入场券',
      pros: ['家庭友好', '安全对策协力金5000日元'],
      cons: ['仅花火观览', '需要购票']
    },
    {
      name: '横滨锤头9号岸壁公园',
      rating: 4,
      crowdLevel: 'medium',
      tips: '海滨观览体验，有桌席选择',
      pros: ['海滨观览', '桌席选择', '特别观览体验'],
      cons: ['价格较高', '仅花火观览']
    }
  ],

  related: {
    regionRecommendations: [
      {
        id: 'kanazawa-matsuri-hanabi',
        name: '第51回金泽祭花火大会',
        date: "8月30日",
        location: '横滨市金泽区海之公园',
        visitors: '约25万5000人',
        link: '/august/hanabi/kanagawa/kanazawa-matsuri-hanabi'
      }
    ],
    timeRecommendations: [
      {
        id: 'sagami-lake-hanabi',
        name: '第73回相模湖湖上祭花火大会',
        date: "8月1日",
        location: '相模原市绿区相模湖上',
        visitors: '约5万5000人',
        link: '/august/hanabi/kanagawa/sagami-lake-hanabi'
      }
    ]
  },

  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3250.123456789!2d139.6317!3d35.4564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60185ce0e17df4dd%3A0x2ef7031d1e8fd1a7!2z5riv5rWc5riv5pyq5p2l!5e0!3m2!1sja!2sjp!4v1234567890123!5m2!1sja!2sjp',

  history: {
    established: 2019,
    significance: '横滨港未来21地区举办的现代音乐花火节庆',
    highlights: [
      'SDGs未来都市横滨主题活动',
      '短时间内约2万发花火的震撼密度',
      '音乐与花火的完美结合演出'
    ]
  },

  tips: [
    {
      category: '观览建议',
      items: [
        '所有观览区域均为有料会场',
        '建议提前购买观览席',
        '使用公共交通前往会场',
        '携带防寒用品（海风较凉）'
      ]
    },
    {
      category: '活动安排',
      items: [
        '17:30-18:30 神奈川大学管乐团演出',
        '18:30-19:00 路易斯·巴杰&阿弗罗古巴朋友爵士表演',
        '19:00-19:20 DJ帝音乐舞台',
        '19:30-19:55 天空交响乐in横滨花火表演'
      ]
    }
  ],

  contact: {
    organizer: '港未来智能节庆实行委员会',
    phone: '050-1721-6481',
    website: 'https://www.city.yokohama.lg.jp/',
    socialMedia: '@yokohama_mmsf'
  },

  mapInfo: {
    hasMap: true,
    mapNote: '港未来21地区多个观览点',
    parking: '无停车场，请使用公共交通'
  },

  weatherInfo: {
    month: '8月',
    temperature: '最高30°C，最低25°C',
    humidity: '约75%',
    rainfall: '夏季雷雨可能',
    recommendation: '携带雨具和防暑用品',
    rainPolicy: '荒天时一部分内容可能变更或中止'
  }
}; 