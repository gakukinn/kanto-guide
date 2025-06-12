import { HanabiData } from '../types/hanabi';

export const oaraiHanabiData: HanabiData = {
  id: 'oarai-hanabi-september',
  name: '大洗海上花火大会2025〜千櫓祭〜',
  japaneseName: '大洗海上花火大会2025〜千櫓祭〜',
  englishName: 'Oarai Marine Fireworks Festival 2025 - Senyagura Festival',
  year: 2025,
  date: '9月27日(土)',
  time: '18:00～19:30',
  duration: '约90分钟',
  fireworksCount: '约1万8000发',
  expectedVisitors: '约18万人',
  weather: '初秋凉爽',
  ticketPrice: '有料观览席',
  status: '开催预定',
  themeColor: '#4A90E2',
  month: 9,
  
  title: '大洗海上花火大会2025〜千櫓祭〜 | 2025年9月北关东花火大会',
  description: '大洗海上花火大会2025〜千櫓祭〜，内閣总理大臣赏最多21回受赏的日本一花火师野村花火工业制作，约1万8000发花火照亮大洗海岸。2025年9月27日开催。',
  
  tags: {
    timeTag: '9月',
    regionTag: '北关东',
    typeTag: '花火',
    layerTag: '详细介绍'
  
  },
  
  related: {
    regionRecommendations: [
      {
        id: 'tonegawa-hanabi',
        name: '第38回利根川大花火大会',
        date: "9月13日",
        location: '茨城县境町',
        visitors: '约30万人',
        link: '/september/hanabi/kitakanto/tonegawa-hanabi'
      },
      {
        id: 'numata-hanabi',
        name: '第13回沼田花火大会',
        date: "9月13日",
        location: '群马县沼田市',
        visitors: '5万3000人',
        link: '/september/hanabi/kitakanto/numata-hanabi'
      }
    ],
    timeRecommendations: [
      {
        id: 'tonegawa-hanabi',
        name: '第38回利根川大花火大会',
        date: "9月13日",
        location: '茨城县境町',
        visitors: '约30万人',
        link: '/september/hanabi/kitakanto/tonegawa-hanabi'
      }
    ]
  },
  

  venues: [
    {
      name: '大洗海滨公园',
      location: '茨城县东茨城郡大洗町',
      startTime: '18:00开始，19:30结束'
    }
  ],
  
  access: [
    {
      venue: '大洗海滨公园',
      stations: [
        {
          name: '大洗站',
          lines: ['鹿岛临海铁道'],
          walkTime: '徒步20分钟'
        }
      ]
    }
  ],
  
  tips: [
    {
      category: '观赏攻略',
      items: [
        '大洗海滨公园是最佳观赏地点，可近距离感受花火震撼',
        '海岸线开阔，多个角度都能欣赏到美丽花火',
        '建议提前1-2小时到达会场占据好位置',
        '有料观览席可享受更舒适的观赏体验'
      ]
    },
    {
      category: '交通指南',
      items: [
        '鹿岛临海铁道大洗站是最近车站，徒步约20分钟',
        '当日会有临时巴士运行，建议利用',
        '自驾需事前预约停车位，售完即止',
        '花火结束后交通拥堵，建议预留充足时间'
      ]
    },
    {
      category: '注意事项',
      items: [
        '荒天时延期至翌日9月28日开催',
        '海边风大，建议携带防风外套',
        '会场内禁止携带酒类和危险物品',
        '垃圾请自行带回，保护海洋环境'
      ]
    }
  ],
  
  viewingSpots: [
    {
      name: '大洗海滨公园',
      rating: 5,
      crowdLevel: 'high',
      tips: '需要提前占位，人气最高的观赏地点',
      pros: ['距离打上场所最近', '设施完善', '视野开阔'],
      cons: ['人流密集', '需要早到占位']
    },
    {
      name: '大洗海水浴场',
      rating: 4,
      crowdLevel: 'medium',
      tips: '相对宽松，适合家庭观赏',
      pros: ['海岸线观赏', '视野开阔', '相对宽松'],
      cons: ['距离稍远', '设施较少']
    },
    {
      name: '大洗港',
      rating: 3,
      crowdLevel: 'low',
      tips: '人少安静，摄影爱好者推荐',
      pros: ['人少安静', '独特角度', '停车方便'],
      cons: ['距离较远', '设施最少']
    }
  ],
  

  history: {
    established: 1950,
    significance: '作为茨城县代表性的海上花火大会，不仅展现了传统千櫓祭文化，更体现了现代花火技术的最高水准，是连接历史与未来的重要文化活动。',
    highlights: [
      '大洗海上花火大会作为千櫓祭的一环，是茨城县具有悠久历史的海上花火大会',
      '2025年适逢大洗町诞生70周年，特别邀请内閣总理大臣赏最多受赏的野村花火工业制作',
      '将花火数量从1万5000发增加到1万8000发，并安排航空自卫队蓝色冲击波展示飞行',
      '是历史上规模最大的一次开催'
    ]
  },
  
  mapInfo: {
    hasMap: true,
    mapNote: '大洗海滨公园周边地图',
    parking: '事前预约制，公式网站购买'
  },
  
  website: 'https://oarai-senyagura.com/',
  
  contact: {
    organizer: '大洗海上花火大会实行委员会',
    phone: '029-267-5111',
    website: 'https://oarai-senyagura.com/',
    socialMedia: '@oaraihanabi'
  },
  
  weatherInfo: {
    month: '9月',
    temperature: '初秋凉爽，日间22℃左右，夜间15℃左右',
    humidity: '适中',
    rainfall: '荒天时延期至翌日',
    recommendation: '海边风大，建议携带防风外套'
  }
}; 