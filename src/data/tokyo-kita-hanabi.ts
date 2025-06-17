import { HanabiData } from '@/types/hanabi';

const kitaHanabiData: HanabiData = {
  id: 'tokyo-kita-hanabi-2024',
  name: '第11回北区花火会',
  englishName: '11th Kita-ku Fireworks Festival',
  _sourceData: {
    japaneseName: '第11回 北区花火会'
  },
  year: 2024,
  date: '2024年9月28日(土)',
  time: '18:30～19:30',
  duration: '1小时',
  fireworksCount: '约1000发',
  expectedVisitors: '约1万人',
  weather: '秋季晴朗',
  ticketPrice: '免费',
  status: '已确认',
  themeColor: 'blue',
  month: 9,
  website: 'https://hanabi-kita.com/',
  tags: {
    timeTag: '九月',
    regionTag: '东京都',
    typeTag: '花火',
    layerTag: 'Layer 5详情页'
  },
  venues: [
    {
      name: '荒川河川敷主会场',
      location: '荒川河川敷・岩淵水门周边',
      startTime: '18:30',
      features: ['河川敷观赏', '岩淵水门背景']
    }
  ],
  access: [
    {
      venue: '荒川河川敷・岩淵水门周边',
      stations: [
        {
          name: '赤羽岩渊站',
          lines: ['东京地铁南北线'],
          walkTime: '15分钟'
        },
        {
          name: '志茂站',
          lines: ['东京地铁南北线'],
          walkTime: '15分钟'
        },
        {
          name: '赤羽站',
          lines: ['JR京浜东北线'],
          walkTime: '20分钟'
        },
        {
          name: '北赤羽站',
          lines: ['JR埼京线'],
          walkTime: '25分钟'
        }
      ]
    }
  ],
  viewingSpots: [
    {
      name: '河川敷观赏区',
      rating: 5,
      crowdLevel: '中等',
      tips: '建议携带防寒衣物，早到确保观赏位置',
      pros: ['视野绝佳', '距离适中', '氛围良好'],
      cons: ['需早到占位', '设施较少']
    },
    {
      name: '岩淵水门附近',
      rating: 4,
      crowdLevel: '密集',
      tips: '注意安全，遵守围栏指示',
      pros: ['背景独特', '拍照效果好'],
      cons: ['空间有限', '人流较密集']
    }
  ],
  history: {
    established: 2014,
    significance: '北区市民参与型的地区花火大会',
    highlights: [
      '荒川河川敷的自然环境',
      '岩淵水门的独特背景',
      '地区社区共同参与'
    ]
  },
  tips: [
    {
      category: '交通指南',
      items: [
        '建议使用公共交通前往会场',
        '赤羽岩渊站和志茂站为最近车站',
        '花火大会结束后电车可能拥挤，请耐心等待'
      ]
    },
    {
      category: '观赏建议',
      items: [
        '建议提前1-2小时到达会场确保观赏位置',
        '携带折叠椅或野餐垫增加舒适度',
        '九月天气转凉，建议携带保暖衣物'
      ]
    },
    {
      category: '注意事项',
      items: [
        '会场内禁止饮酒',
        '请勿在河川敷内生火',
        '垃圾请自行带回，保护环境'
      ]
    }
  ],
  contact: {
    organizer: '北区花火会实行委员会事务局',
    phone: '03-6319-3973',
    website: 'https://hanabi-kita.com/',
    socialMedia: 'info@hanabi-kita.com'
  },
  mapInfo: {
    hasMap: true,
    mapNote: '荒川河川敷・岩淵水门周边',
    parking: '无停车场，建议使用公共交通'
  },
  weatherInfo: {
    month: '九月',
    temperature: '20-25℃',
    humidity: '60%',
    rainfall: '秋季少雨',
    recommendation: '建议携带薄外套',
    rainPolicy: '如遇恶劣天气可能中止或延期'
  },
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3237.123456789!2d139.7245678!3d35.7890123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDQ3JzIwLjQiTiAxMznCsDQzJzI4LjQiRQ!5e0!3m2!1sen!2sjp!4v1234567890123!5m2!1sen!2sjp',
  related: {
    regionRecommendations: [],
    timeRecommendations: []
  },
  officialSource: {
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0313e322754/',
    verificationDate: '2024-01-13',
    dataConfirmedBy: 'USER_PROVIDED',
    lastChecked: '2024-01-13'
  }
};

export default kitaHanabiData; 