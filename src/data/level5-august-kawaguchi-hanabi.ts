import { HanabiData } from '@/types/hanabi';

export const kawaguchiHanabiData: HanabiData = {
  id: 'kawaguchi-lake-festival-2025',
  name: '河口湖湖上祭',
  japaneseName: '河口湖湖上祭',
  englishName: 'Lake Kawaguchi Festival',
  year: 2025,
  month: 8,
  date: '2025年8月5日(火)',
  time: '19:45-20:40',
  duration: '55分钟',
  fireworksCount: '约1万发',
  expectedVisitors: '约12万人',
  weather: '小雨决行（荒天时中止，不延期）',
  ticketPrice: '免费观赏',
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
      url: '/images/hanabi/kawaguchi-lake-fireworks.svg',
      title: '河口湖湖上祭壮观场面',
      description: '雄大的富士山为背景，约1万发花火在湖面上绽放，水面倒影美轮美奂'
    }
  ],
  
  venues: [
    {
      name: '河口湖畔船津浜',
      location: '山梨县南都留郡富士河口湖町船津',
      startTime: '19:45',
      features: ['湖畔观赏', '富士山背景', '水面倒影', '免费观赏']
    }
  ],

  viewingSpots: [
    {
      name: '河口湖畔船津浜',
      rating: 5,
      crowdLevel: '高',
      tips: '湖畔最佳观赏位置，可欣赏富士山背景与湖面倒影',
      pros: ['富士山背景', '湖面倒影', '免费观赏', '视野开阔'],
      cons: ['人群密集', '需要提前占位', '夜晚较凉']
    },
    {
      name: '河口湖音乐盒之森周边',
      rating: 4,
      crowdLevel: '中',
      tips: '稍远位置观赏，人群相对较少',
      pros: ['人群较少', '交通便利', '周边设施完善'],
      cons: ['距离较远', '视野可能受限']
    }
  ],

  history: {
    established: 1917,
    significance: '从大正6年开始延续至今的河口湖夏季代表性祭典，是富士五湖夏祭中规模最大的花火大会',
    highlights: [
      '1917年大正6年开始的历史传统',
      '富士五湖夏祭中规模最大',
      '以富士山为背景的绝美花火',
      '湖面倒影形成双重花火效果',
      '音乐花火音乐与花火融合'
    ]
  },

  access: [
    {
      venue: '河口湖畔船津浜',
      stations: [
        {
          name: '富士急行线河口湖站',
          lines: ['富士急行线'],
          walkTime: '徒步15分钟'
        }
      ]
    }
  ],

  contact: {
    organizer: '富士河口湖町',
    phone: '0555-72-3168',
    website: 'https://www.town.fujikawaguchiko.lg.jp/',
    socialMedia: '@fujikawaguchiko'
  },

  mapInfo: {
    hasMap: true,
    mapNote: '河口湖畔船津浜，当日会场周边交通规制实施',
    parking: '有（当日交通规制，建议公共交通）'
  },

  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3238.1234567890123!2d138.7512345678901!3d35.5056789012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6019a123456789ab%3A0x123456789abcdef0!2z5rKz5Y-j5rmW5rmW55Wc6Iq55rSl5rWc!5e0!3m2!1sja!2sjp!4v1234567890123!5m2!1sja!2sjp',

  weatherInfo: {
    month: '8月',
    temperature: '最高28°C 最低18°C',
    humidity: '65-75%',
    rainfall: '夏季雷雨可能',
    recommendation: '8月湖畔夜晚较凉，建议携带外套。如遇雨天请准备雨具。',
    rainPolicy: '小雨决行',
    note: '荒天时中止，不延期'
  },

  tips: [
    {
      category: '观赏建议',
      items: [
        '建议提前2-3小时到场占据最佳观赏位置',
        '湖畔夜晚温度较低，请准备保暖衣物',
        '可携带野餐垫在湖畔观赏',
        '花火结束后人流较多，请耐心等待疏散'
      ]
    },
    {
      category: '交通提示',
      items: [
        '推荐使用公共交通，当日会有交通规制',
        '河口湖站往返较为拥挤',
        '建议利用富士急行线',
        '结束后等待分散再移动'
      ]
    },
    {
      category: '花火特色',
      items: [
        '以富士山为背景的绝美花火',
        '湖面倒影形成双重花火效果',
        '音乐花火音乐与花火融合',
        '终场连发花火压轴演出'
      ]
    }
  ],

  related: {
    regionRecommendations: [],
    timeRecommendations: []
  },

  dataSourceUrl: 'https://hanabi.walkerplus.com/detail/ar0419e00681/',

  officialSource: {
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0419e00681/',
    verificationDate: '2025年1月13日',
    dataConfirmedBy: 'USER_PROVIDED',
    lastChecked: '2025年1月13日'
  }
}; 