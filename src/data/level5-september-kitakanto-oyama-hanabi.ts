import { HanabiData } from '@/types/hanabi';

export const oyamaHanabiData: HanabiData = {
  id: 'oyama-hanabi',
  name: '第73回小山花火',
  japaneseName: '第73回 小山の花火',
  englishName: '73rd Oyama Fireworks Festival',
  year: 2025,
  date: '2025年9月23日',
  time: '18:30～',
  duration: '约90分钟',
  fireworksCount: '约2万发',
  expectedVisitors: '约43万人',
  weather: '9月下旬，建议携带轻薄外套',
  ticketPrice: '1000円～30000円',
  status: '开催确定',
  themeColor: '#FF6B6B',
  month: 9,
  
  title: '第73回小山花火',
  description: '小山市制70周年纪念特别花火大会，关东有数规模的盛大花火祭典。今年特别增加了500机无人机表演，与约2万发花火共同演绎夜空奇迹。',
  
  tags: {
    timeTag: '9月',
    regionTag: '北关东',
    typeTag: '花火',
    layerTag: '详细介绍'
  
  },
  
  venues: [
    {
      name: '观晃桥下流思川河畔',
      location: '栃木县小山市',
      startTime: '18:30',
      features: ['有料观览席', '屋台区域', '临时厕所']
    }
  ],
  
  access: [
    {
      venue: '观晃桥下流思川河畔',
      stations: [
        {
          name: 'JR小山站',
          lines: ['JR东北本线', 'JR水户线'],
          walkTime: '西口徒步8分钟'
        }
      ]
    }
  ],
  
  viewingSpots: [
    {
      name: '有料观览席',
      rating: 5,
      crowdLevel: '高',
      tips: '最佳观赏位置，提供多种席位选择',
      pros: ['近距离观赏', '座位保证', '最佳视角'],
      cons: ['需要付费', '需提前预约']
    },
    {
      name: '思川河畔无料区域',
      rating: 4,
      crowdLevel: '非常高',
      tips: '免费观赏区域，需要早到占位',
      pros: ['免费观赏', '河畔位置'],
      cons: ['需早到', '人流拥挤']
    },
    {
      name: '小山御殿广场',
      rating: 3,
      crowdLevel: '中',
      tips: '稍远但视野开阔的观赏点',
      pros: ['视野开阔', '相对宽松', '屋台区域'],
      cons: ['距离较远', '视角一般']
    }
  ],
  
  history: {
    established: 1952,
    significance: '关东地区有数规模的花火大会，今年恰逢小山市制70周年',
    highlights: [
      '市制70周年纪念特别企划',
      '500机无人机表演音乐同步演出',
      '约2万发花火的壮观规模',
      '思川河畔近距离观赏体验',
      '多样化有料席位选择',
      '传统与科技融合的新时代花火'
    ]
  },
  
  tips: [
    {
      category: '观赏建议',
      items: [
        '有料席提供最佳观赏体验，建议提前预约',
        '无料区域需要下午早些时候到达占位',
        '今年新增无人机表演，建议关注开场时间'
      ]
    },
    {
      category: '交通建议',
      items: [
        '会场周边无停车场，强烈建议使用电车',
        '建议16:00前到达会场占位',
        '大会结束后避开人流高峰'
      ]
    },
    {
      category: '其他建议',
      items: [
        '屋台营业至花火结束，可享受祭典美食',
        '携带轻薄外套应对9月夜晚凉意'
      ]
    }
  ],
  
  contact: {
    organizer: '小山夏日庆典2025实行委员会',
    phone: '0285-22-9273',
    website: 'https://www.oyamanohanabi.com/',
    socialMedia: '@oyamahanabilive'
  },
  
  mapInfo: {
    hasMap: true,
    mapNote: '观晃桥下流思川河畔',
    parking: '无专用停车场，建议使用公共交通'
  },
  
  weatherInfo: {
    month: '9月',
    temperature: '最高25℃ 最低15℃',
    humidity: '65%',
    rainfall: '秋雨前线影响',
    recommendation: '建议携带轻薄外套应对夜晚凉意'
  },
  
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3222.8!2d139.8!3d36.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDE4JzAwLjAiTiAxMznCsDQ4JzAwLjAiRQ!5e0!3m2!1sja!2sjp!4v1620000000000!5m2!1sja!2sjp',
  
  website: 'https://www.oyamanohanabi.com/',
  
  related: {
    regionRecommendations: [
      {
        id: 'oarai-hanabi',
        name: '大洗海上花火大会2025〜千櫓祭〜',
        date: "9月27日",
        location: '茨城县大洗町',
        visitors: '约18万人',
        link: '/september/hanabi/kitakanto/oarai-hanabi'
      }
    ],
    timeRecommendations: [
      {
        id: 'tone-river-hanabi',
        name: '利根川大花火大会',
        date: "9月13日",
        location: '茨城县境町',
        visitors: '约65万人',
        link: '/september/hanabi/kitakanto/tone-river-hanabi'
      }
    ]
  },
  
  officialSource: {
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0309e00890/',
    verificationDate: '2025-01-13',
    dataConfirmedBy: 'USER_PROVIDED',
    lastChecked: '2025-01-13'
  }
}; 