import { HanabiData } from '@/types/hanabi';

export const suwaHanabiData: HanabiData = {
  id: 'suwa-kojyo-hanabi-2025',
  name: '第77回诏访湖祭湖上花火大会',
  japaneseName: '第77回 諏訪湖祭湖上花火大会',
  englishName: '77th Suwa Lake Festival Fireworks Display',
  year: 2025,
  month: 8,
  date: '2025年8月15日(金)',
  time: '19:00-21:00',
  duration: '120分钟',
  fireworksCount: '非公开',
  expectedVisitors: '非公开',
  weather: '雨天决行（荒天中止）',
  ticketPrice: '有料观览席：特别桌席20万日元、一般桌席16万日元等',
  status: 'scheduled',
  themeColor: 'blue',
  
  tags: {
    timeTag: '8月',
    regionTag: '甲信越',
    typeTag: '花火',
    layerTag: '详细介绍'
  },

  // 添加媒体展示内容
  media: [
    {
      type: 'image',
      url: '/images/hanabi/suwa-fireworks.svg',
      title: '诏访湖祭湖上花火大会水上花火表演',
      description: '诏访湖上举行的湖上花火大会，水上连发花火与山间回响的震撼体验'
    }
  ],
  
  venues: [
    {
      name: '诏访市湖畔公园前诏访湖上',
      location: '长野县诏访市',
      startTime: '19:00',
      features: ['湖上花火', '水上连发花火', '山间回响', '有料观览席']
    }
  ],

  contact: {
    organizer: '诏访湖祭实行委员会事务局',
    phone: '0266-52-4141',
    website: 'https://suwako-hanabi.com/kojyou/',
    socialMedia: '@suwako_hanabi'
  },

  viewingSpots: [
    {
      name: '湖畔公园桟敷席',
      rating: 4.8,
      crowdLevel: 'high',
      tips: '最佳观赏位置，可近距离欣赏湖上花火的震撼场面',
      pros: ['最佳观赏角度', '有料指定席', '设施完善'],
      cons: ['价格较高', '需要提前预约']
    },
    {
      name: '石雕公园区域',
      rating: 4.5,
      crowdLevel: 'medium',
      tips: '分为S、A、B、C四个区域，各有不同价位和观赏角度',
      pros: ['多种价位选择', '视野开阔', '相对宽敞'],
      cons: ['距离稍远', '人流较多']
    },
    {
      name: '免费观赏区域',
      rating: 4.0,
      crowdLevel: 'high',
      tips: '湖畔周边的免费观赏区域，需要提前占位',
      pros: ['免费观赏', '多个观赏点', '自由度高'],
      cons: ['人流拥挤', '需要早到', '视野受限']
    }
  ],

  specialFeatures: {
    scale: '全国屈指规模的湖上花火大会，第77回开催',
    location: '诏访湖上特设打上台，四方环山的独特地形',
    tradition: '轰与闪耀！与您共同的诏访湖花火',
    atmosphere: '水上连发花火与山间回响营造的震撼体验',
    collaboration: '湖上花火的独特魅力，传统与创新的完美结合'
  },

  history: {
    established: 1949,
    significance: '诏访湖祭湖上花火大会是长野县诏访市的传统夏季盛典，今年迎来第77回开催',
    highlights: ['水上连发花火', '湖上打上台', '山间回响效果', '全国屈指规模']
  },

  tips: [
    {
      category: '观赏建议',
      items: [
        '建议购买有料观览席以获得最佳观赏体验',
        '免费区域需要提前3-4小时到场占位',
        '湖上花火的最佳观赏角度在湖畔公园周边',
        '山间回响效果是诏访湖花火的独特魅力'
      ]
    },
    {
      category: '交通提醒',
      items: [
        'JR中央本线上诏访站徒步约10分钟到达会场',
        '当日交通拥堵严重，建议使用公共交通',
        '中央自动车道诏访IC约15分钟（通常时）',
        '临时停车场约3000台，建议事前预约'
      ]
    },
    {
      category: '会场设施',
      items: [
        '会场设有约270基厕所，28个地点',
        '有料观览席包含多种类型和价位',
        '开门时间为上午11:00预定',
        '会场内禁止携带酒类和危险物品'
      ]
    }
  ],

  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3175.8234567890123!2d138.1234567890123!3d36.0456789012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x601d8a123456789a%3A0x123456789abcdef0!2z6K-P6K6_5rmW56WW5rmW5LiK!5e0!3m2!1sja!2sjp!4v1234567890123!5m2!1sja!2sjp',

  related: {
    regionRecommendations: [
      {
        id: 'nagaoka-hanabi',
        name: '长冈祭大花火大会',
        date: '8月2日、3日',
        location: '长冈市信浓川河川敷',
        visitors: '约34万5000人',
        link: '/august/hanabi/koshinetsu/nagaoka-hanabi'
      }
    ],
    timeRecommendations: [
      {
        id: 'kawaguchi-hanabi',
        name: '河口湖湖上祭',
        date: "8月5日",
        location: '富士河口湖町河口湖畔船津浜',
        visitors: '12万人',
        link: '/august/hanabi/koshinetsu/kawaguchi-hanabi'
      }
    ]
  },

  access: [
    {
      venue: '诏访市湖畔公园前诏访湖上',
      stations: [
        {
          name: '上诏访站',
          lines: ['JR中央本线'],
          walkTime: '徒步约10分钟'
        }
      ]
    }
  ],

  mapInfo: {
    hasMap: true,
    mapNote: '诏访湖上特设打上台，湖畔公园周边为主要观赏区域',
    parking: '临时停车场约3000台，建议事前预约'
  },

  weatherInfo: {
    month: '8月',
    temperature: '最高28°C，最低18°C',
    humidity: '约70%',
    rainfall: '雨天决行（荒天中止）',
    recommendation: '建议携带雨具，关注天气预报'
  }
}; 