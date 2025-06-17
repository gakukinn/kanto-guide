import { HanabiData } from '@/types/hanabi';

export const torideHanabiData: HanabiData = {
  id: 'toride-hanabi-2025',
  name: '第70回 取手利根川大花火',
  _sourceData: {
    japaneseDescription: '第70回 和在利根川大花火',
      japaneseName: '第70回 和在利根川大花火',
  },
  englishName: 'The 70th Toride Tonegawa Great Fireworks',
  year: 2025,
  date: '2025年8月9日(土)',
  time: '19:00～20:20',
  duration: '约80分钟',
  fireworksCount: '约1万发',
  expectedVisitors: '约12万人',
  weather: '夏季天气',
  ticketPrice: '1000日元起',
  status: '确定举办',
  themeColor: '#FF6B6B',

  // 页面元数据
  title: '第70回 取手利根川大花火 | 茨城县取手市 | 关东旅游指南',
  description:
    '大利根桥开通70周年纪念花火大会。约1万发花火与无人机演出的梦幻合作，在取手绿地运动公园举办。2025年8月9日开催。',

  // 标签系统
  tags: {
    timeTag: '8月',
    regionTag: '茨城县',
    typeTag: '花火',
    layerTag: 'Layer 4详情页',
  },

  // 会场信息
  venues: [
    {
      name: '取手绿地运动公园',
      location: '茨城县取手市取手1丁目地先',
      startTime: '19:00',
      features: ['河川敷会场', '近距离观赏', '免费停车场'],
    },
  ],

  // 交通信息
  access: [
    {
      venue: '取手绿地运动公园',
      stations: [
        {
          name: 'JR取手站',
          lines: ['JR常磐线'],
          walkTime: '东口步行5分钟',
        },
      ],
    },
  ],

  // 观赏地点
  viewingSpots: [
    {
      name: '有料观览区域',
      rating: 4.5,
      crowdLevel: '拥挤',
      tips: '提前购票确保席位',
      pros: ['视野开阔', '设施完备'],
      cons: ['需要付费', '人流密集'],
    },
    {
      name: '自由观览区域',
      rating: 4.0,
      crowdLevel: '非常拥挤',
      tips: '前日下午3点后可占位',
      pros: ['免费观览', '自由度高'],
      cons: ['需要占位', '视野受限'],
    },
  ],

  // 历史背景
  history: {
    established: 1955,
    significance: '为纪念大利根桥开通而始办的传统花火大会',
    highlights: ['70年历史传承', '大利根桥开通纪念', '取手市最大规模花火大会'],
  },

  // 观赏贴士
  tips: [
    {
      category: '交通贴士',
      items: [
        'JR取手站东口步行5分钟可达',
        '建议使用公共交通，避免停车场拥堵',
        '大会当日车站周边交通管制',
      ],
    },
    {
      category: '观赏贴士',
      items: [
        '无人机演出约15分钟，不容错过',
        '音乐花火是大会亮点',
        '河川敷会场可近距离感受花火魅力',
      ],
    },
    {
      category: '购票贴士',
      items: [
        '7月1日上午10:00开始销售',
        'CN预售指南在线购买',
        '桌席包含餐饮，性价比高',
      ],
    },
  ],

  // 联系信息
  contact: {
    organizer: '取手市观光协会',
    phone: '0297-74-2141',
    website: 'https://www.toride-kankou.net/page/page000095.html',
    socialMedia: '@toride_kankou',
  },

  // 地图信息
  mapInfo: {
    hasMap: true,
    mapNote: '取手绿地运动公园(利根川河川敷)',
    parking: '免费停车场(数量有限)',
  },

  // 天气信息
  weatherInfo: {
    month: '8月',
    temperature: '25-30°C',
    humidity: '70-80%',
    rainfall: '雷雨可能',
    recommendation: '建议携带雨具和防暑用品',
    rainPolicy: '小雨举办，恶劣天气延期至次日',
  },

  // 特色功能
  specialFeatures: {
    scale: '约1万发花火',
    location: '利根川河川敷',
    tradition: '70年历史传承',
    atmosphere: '近距离观赏体验',
  },

  // 2025年特别企划
  special2025: {
    theme: '大利根桥开通70周年纪念',
    concept: '传统与创新的融合',
    memorial: '70周年纪念特别演出',
    features: [
      '无人机光影秀约15分钟',
      '音乐同步花火演出',
      '70周年纪念烟花',
      '特别纪念商品发售',
    ],
  },

  // 地图嵌入URL
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3227.123!2d140.02456!3d35.9167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6022169a5b5b5b5b%3A0x5b5b5b5b5b5b5b5b!2z5Y-W5omL57eR5Zyw6YGL5Yqo5YWs5ZySIOWPluaJi-W4guWPluaJi--8keS4gemWie-8kemHjOWFiA!5e0!3m2!1sja!2sjp!4v1234567890',

  // 月份
  month: 8,

  // 关联推荐
  related: {
    regionRecommendations: [
      {
        id: 'mito-komon-hanabi-2025',
        name: '水戸黄门祭 水戸偕楽园花火大会',
        date: '2025年7月26日',
        location: '水戸市',
        visitors: '约25万人',
        link: '/kitakanto/hanabi/mito-komon-hanabi-2025',
      },
    ],
    timeRecommendations: [
      {
        id: 'maebashi-hanabi-2025',
        name: '前桥花火大会',
        date: '2025年8月9日',
        location: '前桥市',
        visitors: '约40万人',
        link: '/kitakanto/hanabi/maebashi-hanabi-2025',
      },
    ],
  },

  // 官方数据源
  officialSource: {
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0308e00914/',
    verificationDate: '2025-06-13',
    dataConfirmedBy: 'USER_PROVIDED',
    lastChecked: '2025-06-13',
  },
};
