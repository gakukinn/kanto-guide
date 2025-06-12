import { HanabiData } from '@/types/hanabi';

export const chofuHanabiData: HanabiData = {
  id: 'chofu-hanabi-2025',
  name: '第40回调布花火',
  japaneseName: '第40回 調布花火',
  englishName: 'The 40th Chofu Fireworks Festival',
  title: '第40回调布花火 - 2025年9月东京花火大会',
  description: '第40回调布花火详情信息，包含举办时间、地点、交通方式、观赏攻略等完整信息。',
  year: 2025,
  date: '2025年9月20日(土)',
  time: '18:15～19:15',
  duration: '60分钟',
  fireworksCount: '约12000发',
  expectedVisitors: '35万人',
  weather: '荒天时中止',
  ticketPrice: '有料席：4,500-65,000日元',
  status: '已确认举办',
  themeColor: 'orange',
  month: 9,

  // 标签系统
  tags: {
    timeTag: '9月',
    regionTag: '东京',
    typeTag: '花火',
    layerTag: '详细介绍'
  
  },

  // 关联推荐
  related: {
    regionRecommendations: [
      {
        id: 'setagaya-tamagawa',
        name: '世田谷区多摩川花火大会',
        date: "2025年9月20日",
        location: '二子玉川绿地运动场',
        visitors: '26万人',
        link: '/october/hanabi/tokyo/setagaya-tamagawa'
      }
    ],
    timeRecommendations: [
      {
        id: 'setagaya-tamagawa',
        name: '世田谷区多摩川花火大会',
        date: "10月4日",
        location: '二子玉川绿地运动场',
        visitors: '26万人',
        link: '/october/hanabi/tokyo/setagaya-tamagawa'
      }
    ]
  },

  venues: [
    {
      name: '布田会场',
      location: '调布市多摩川布田地区',
      startTime: '18:15',
      features: [
        '主要观览会场',
        '设有多种有料席',
        '京王线布田站步行20分钟',
        '调布站步行25分钟'
      ]
    },
    {
      name: '京王多摩川会场',
      location: '调布市多摩川京王多摩川地区',
      startTime: '18:15',
      features: [
        '靠近打上地点',
        '观览效果极佳',
        '京王相模原线京王多摩川站步行10分钟',
        '调布站步行20分钟'
      ]
    },
    {
      name: '电通大操场会场',
      location: '调布市电气通信大学操场',
      startTime: '18:15',
      features: [
        '大学操场内观览',
        '相对宽敞',
        '京王相模原线京王多摩川站步行15分钟',
        '京王线调布站东口步行20分钟'
      ]
    }
  ],

  access: [
    {
      venue: '布田会场',
      stations: [
        { 
          name: '京王线布田站', 
          lines: ['京王线'], 
          walkTime: '步行20分钟' 
        },
        { 
          name: '京王线调布站', 
          lines: ['京王线'], 
          walkTime: '步行25分钟' 
        }
      ]
    },
    {
      venue: '京王多摩川会场',
      stations: [
        { 
          name: '京王相模原线京王多摩川站', 
          lines: ['京王相模原线'], 
          walkTime: '步行10分钟' 
        },
        { 
          name: '京王线调布站', 
          lines: ['京王线'], 
          walkTime: '步行20分钟' 
        }
      ]
    },
    {
      venue: '电通大操场会场',
      stations: [
        { 
          name: '京王相模原线京王多摩川站', 
          lines: ['京王相模原线'], 
          walkTime: '步行15分钟' 
        },
        { 
          name: '京王线调布站东口', 
          lines: ['京王线'], 
          walkTime: '步行20分钟' 
        }
      ]
    }
  ],

  viewingSpots: [
    {
      name: '布田会场有料席',
      rating: 5,
      crowdLevel: '非常拥挤',
      tips: '建议购买有料席确保观览位置',
      pros: ['观览效果绝佳', '设施完善', '多种席位选择'],
      cons: ['价格较高', '需要提前预约', '人流密集']
    },
    {
      name: '京王多摩川会场',
      rating: 5,
      crowdLevel: '非常拥挤',
      tips: '距离打上地点最近，震撼力十足',
      pros: ['距离最近', '震撼效果', '交通便利'],
      cons: ['极度拥挤', '席位有限', '噪音较大']
    },
    {
      name: '电通大操场会场',
      rating: 4,
      crowdLevel: '拥挤',
      tips: '相对宽敞，适合家庭观览',
      pros: ['相对宽敞', '适合家庭', '设施良好'],
      cons: ['距离稍远', '观览角度有限', '需要步行']
    },
    {
      name: '多摩川河岸免费区域',
      rating: 3,
      crowdLevel: '极度拥挤',
      tips: '免费区域，建议下午早些时候到达',
      pros: ['免费观览', '自然环境', '空间开阔'],
      cons: ['极度拥挤', '需要早到', '设施有限']
    }
  ],

  history: {
    established: 1985,
    significance: '多摩地区代表性的花火大会，以音乐与花火的完美融合闻名',
    highlights: [
      '40年历史的传统花火大会',
      '以"大玉50连发"和"花火幻想曲"著称',
      '多摩川雄大自然背景下的绝美花火',
      '每年吸引约30万人观览的大型活动'
    ]
  },

  tips: [
    {
      category: '时间安排',
      items: [
        '开会式18:00开始，花火18:15打上',
        '持续60分钟的精彩演出',
        '建议提前2-3小时到达占位',
        '结束后人流密集，建议错峰离场'
      ]
    },
    {
      category: '必备物品',
      items: [
        '野餐垫或折叠椅',
        '防寒衣物（9月夜晚较凉）',
        '手电筒或手机照明',
        '饮料和小食',
        '垃圾袋（保护环境）'
      ]
    },
    {
      category: '观赏建议',
      items: [
        '推荐购买有料席获得最佳观览体验',
        '大玉50连发是必看亮点',
        '花火幻想曲音乐协奏不容错过',
        '多摩川夜景与花火的完美结合'
      ]
    },
    {
      category: '交通攻略',
      items: [
        '建议使用京王线前往各会场',
        '当日交通管制，不推荐开车',
        '结束后电车非常拥挤，建议耐心等待',
        '可考虑在调布站周边用餐后再返回'
      ]
    }
  ],

  contact: {
    organizer: '调布市花火实行委员会',
    phone: '042-481-7311',
    website: 'https://hanabi.csa.gr.jp/',
    socialMedia: '调布花火官方SNS'
  },

  mapInfo: {
    hasMap: true,
    mapNote: '多摩川沿岸多个会场，建议提前确认观览位置',
    parking: '无停车场，建议使用公共交通'
  },

  weatherInfo: {
    month: '9月',
    temperature: '18-25°C',
    humidity: '65%',
    rainfall: '较少',
    recommendation: '建议携带薄外套，夜晚气温下降注意保暖',
    rainPolicy: '荒天时中止',
    note: '秋季天气稳定，适合观览花火'
  },

  specialFeatures: {
    scale: '约1万发的大规模花火大会',
    location: '多摩川雄大自然背景下的绝美会场',
    tradition: '40年历史传承的地区代表性花火大会',
    atmosphere: '音乐与花火完美融合的艺术盛典',
    collaboration: '大玉50连发与花火幻想曲的震撼演出'
  },

  special2025: {
    theme: '第40回纪念大会',
    concept: '传统与创新的完美融合',
    memorial: '40周年特别纪念演出',
    features: [
      '40周年纪念特别节目',
      '传统大玉50连发升级版',
      '全新花火幻想曲曲目',
      '匠人花火玉特别展示'
    ]
  },

  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3244.123456789!2d139.5436!3d35.6517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDM5JzA2LjEiTiAxMznCsDMyJzM3LjAiRQ!5e0!3m2!1sja!2sjp!4v1234567890123!5m2!1sja!2sjp',

  // 官方数据源验证
  dataSourceUrl: 'https://hanabi.walkerplus.com/detail/ar0313e00881/'
}; 