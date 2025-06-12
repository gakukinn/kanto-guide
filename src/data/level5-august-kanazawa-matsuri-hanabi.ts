import { HanabiData } from '@/types/hanabi';

export const kanazawaMatsurihanabiData: HanabiData = {
  id: 'kanazawa-matsuri-hanabi-2025',
  name: '第51回金泽祭花火大会',
  japaneseName: '第51回 金沢まつり 花火大会',
  englishName: '51st Kanazawa Festival Fireworks Display',
  year: 2025,
  month: 8,
  date: '2025年8月30日(土)',
  time: '19:00-20:00',
  duration: '60分钟',
  fireworksCount: '约3500发',
  expectedVisitors: '约25万5000人',
  weather: '荒天时中止，无顺延',
  ticketPrice: '入场免费',
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
      url: '/images/hanabi/kanazawa-matsuri-fireworks.svg',
      title: '金泽祭花火大会海上花火表演',
      description: '横滨市金泽区海之公园举行的花火大会，八景岛、海之公园、野岛环绕的海上花火'
    }
  ],
  
  venues: [
    {
      name: '海之公园',
      location: '横滨市金泽区海之公园',
      startTime: '19:00',
      features: [
        '入场免费的海上花火大会',
        '60分钟约3500发花火连续打上',
        '多样化星形花火连续演出',
        '特大星形花火装饰压轴'
      ]
    }
  ],

  access: [
    {
      venue: '海之公园',
      stations: [
        {
          name: '海之公园南口站',
          lines: ['横滨海岸线'],
          walkTime: '步行即到'
        },
        {
          name: '海之公园柴口站',
          lines: ['横滨海岸线'],
          walkTime: '步行即到'
        },
        {
          name: '新杉田站',
          lines: ['JR根岸线'],
          walkTime: '换乘横滨海岸线'
        },
        {
          name: '金泽八景站',
          lines: ['京急本线'],
          walkTime: '换乘横滨海岸线'
        },
        {
          name: '金泽文库站',
          lines: ['京急本线'],
          walkTime: '步行约20分钟'
        }
      ]
    }
  ],

  viewingSpots: [
    {
      name: '海之公园砂滩',
      rating: 5,
      crowdLevel: 'high',
      tips: '主要观览区域，可坐在砂滩上观赏',
      pros: ['入场免费', '砂滩观览', '视野开阔', '家庭友好'],
      cons: ['人群拥挤', '需要早到占位']
    },
    {
      name: '海之公园芝生广场',
      rating: 4,
      crowdLevel: 'high',
      tips: '公园内芝生区域，适合家庭观览',
      pros: ['芝生观览', '舒适环境', '入场免费'],
      cons: ['人群较多', '视野可能受限']
    },
    {
      name: '野岛公园',
      rating: 3,
      crowdLevel: 'medium',
      tips: '稍远但人群相对较少的观览点',
      pros: ['人群较少', '自然环境好'],
      cons: ['距离较远', '花火较小']
    }
  ],

  related: {
    regionRecommendations: [
      {
        id: 'minato-mirai-smart-festival',
        name: '港未来智能节庆2025',
        date: "8月4日",
        location: '横滨市中区港未来21地区',
        visitors: '约2万人',
        link: '/august/hanabi/kanagawa/minato-mirai-smart'
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

  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3250.123456789!2d139.6317!3d35.3564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60185ce0e17df4dd%3A0x2ef7031d1e8fd1a7!2z5rW35LmL5YWs5ZyS!5e0!3m2!1sja!2sjp!4v1234567890123!5m2!1sja!2sjp',

  history: {
    established: 1974,
    significance: '横滨市金泽区代表性的夏季祭典花火大会',
    highlights: [
      '入场免费的大规模海上花火大会',
      '八景岛、海之公园、野岛环绕的独特地形',
      '多样化星形花火连续演出'
    ]
  },

  tips: [
    {
      category: '观览建议',
      items: [
        '前日开始禁止占位',
        '建议使用公共交通前往',
        '海之公园内全面禁烟',
        '禁止携带宠物入场'
      ]
    },
    {
      category: '注意事项',
      items: [
        '当日18:30-21:00周边道路交通管制',
        '禁止驾车、摩托车、自行车前往',
        '垃圾请自行带回',
        '建议提前到达确保观览位置'
      ]
    }
  ],

  contact: {
    organizer: '金泽祭实行委员会',
    phone: '045-788-7801',
    website: 'https://www.city.yokohama.lg.jp/kanazawa/kurashi/kyodo_manabi/kyodo_shien/chiiki/kanazawamaturi/',
    socialMedia: '@yokohama_KNZW'
  },

  mapInfo: {
    hasMap: true,
    mapNote: '海之公园多个观览点',
    parking: '无停车场，请使用公共交通'
  },

  weatherInfo: {
    month: '8月',
    temperature: '最高30°C，最低25°C',
    humidity: '约75%',
    rainfall: '夏季雷雨可能',
    recommendation: '携带雨具和防暑用品',
    rainPolicy: '荒天时中止，无顺延'
  }
}; 