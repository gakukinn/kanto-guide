import { HanabiData } from '../types/hanabi';

export const jinguYakyujoHanabiData: HanabiData = {
  id: 'jingu-yakyujo-hanabi',
  name: '夏休み神宫花火夜场',
  englishName: 'Summer Vacation! Jingu Baseball Stadium Fireworks',
  _sourceData: {
    japaneseName: '夏休み！ 神宮花火ナイター'
  },
  year: 2025,
  date: '2025年7月19日-8月31日特定日',
  time: '每场比赛第5局下半场结束后（约2分钟）',
  duration: '约2分钟',
  fireworksCount: '每场约300发',
  expectedVisitors: '约3万人',
  weather: '夏季炎热多湿',
  ticketPrice: '需购买比赛门票',
  status: '已确认举办',
  themeColor: '#FF6B6B',
  month: 7,

  tags: {
    timeTag: '7月',
    regionTag: '东京都',
    typeTag: '花火',
    layerTag: 'Layer 4详情页'
  },

  venues: [
    {
      name: '明治神宫野球场',
      location: '东京都新宿区霞丘町3-1',
      startTime: '每场比赛第5局下半场结束后',
      features: ['球场座席', '屋顶看台', '内野座席', '外野座席', '特别包厢']
    }
  ],

  access: [
    {
      venue: '明治神宫野球场',
      stations: [
        {
          name: '外苑前站',
          lines: ['东京地铁'],
          walkTime: '步行5分钟'
        },
        {
          name: '信濃町站',
          lines: ['JR中央·总武线'],
          walkTime: '步行12分钟'
        },
        {
          name: '国立竞技场站',
          lines: ['都营地下铁大江户线'],
          walkTime: '步行12分钟'
        },
        {
          name: '千驮谷站',
          lines: ['JR中央·总武线'],
          walkTime: '步行15分钟'
        }
      ]
    }
  ],

  viewingSpots: [
    {
      name: '球场内座席',
      rating: 5,
      crowdLevel: '极高',
      tips: '最佳观赏位置，需要比赛门票',
      pros: ['视野最佳', '现场氛围', '设施完善'],
      cons: ['需要门票', '人数众多', '价格较高']
    },
    {
      name: '外苑前站周边',
      rating: 3,
      crowdLevel: '中等',
      tips: '免费观赏区域，距离较远',
      pros: ['免费观赏', '交通便利', '人数适中'],
      cons: ['距离较远', '视野受限', '周边设施少']
    },
    {
      name: '神宫外苑',
      rating: 4,
      crowdLevel: '中等',
      tips: '公园内的观赏点，环境优美',
      pros: ['环境优美', '免费入场', '绿色空间'],
      cons: ['视野有限', '设施简单', '夜间较暗']
    }
  ],

  history: {
    established: 2000,
    significance: '东京燕子队主场的特色花火活动',
    highlights: [
      '野球与花火的完美结合',
      '每场比赛后的精彩演出',
      '明治神宫野球场的独特传统'
    ]
  },

  tips: [
    {
      category: '购票建议',
      items: [
        '建议提前购买比赛门票获得最佳观赏体验',
        '可选择内野座席获得更好视野',
        '团体票价格更优惠'
      ]
    },
    {
      category: '时间安排',
      items: [
        '花火表演时间较短，请注意时间安排',
        '建议提前到达熟悉会场环境',
        '关注比赛进度，不要错过花火时间'
      ]
    },
    {
      category: '防暑准备',
      items: [
        '夏季天气炎热，请做好防暑准备',
        '携带充足的饮水',
        '准备防晒用品'
      ]
    },
    {
      category: '会场规则',
      items: [
        '球场内禁止携带危险物品',
        '禁止外带酒类',
        '拍照时请注意不要影响其他观众'
      ]
    }
  ],

  contact: {
    organizer: '东京燕子队',
    phone: '0570-03-5589',
    website: 'https://www.yakult-swallows.co.jp/',
    socialMedia: '@TokyoYakultSwallows'
  },

  mapInfo: {
    hasMap: true,
    mapNote: '明治神宫野球场位于新宿区，交通便利',
    parking: '无专用停车场，建议使用公共交通'
  },

  weatherInfo: {
    month: '7-8月',
    temperature: '25-35°C',
    humidity: '70-80%',
    rainfall: '中等（梅雨季节后）',
    recommendation: '携带防暑用品和雨具',
    rainPolicy: '恶劣天气可能导致比赛和花火表演取消',
    note: '夏季高温多湿，请注意防暑'
  },

  specialFeatures: {
    scale: '中等规模',
    location: '都市中心球场',
    tradition: '野球文化结合',
    atmosphere: '热烈竞技氛围'
  },

  special2025: {
    theme: '夏休み特别企划',
    concept: '野球与花火的梦幻结合',
    features: [
      '每场比赛后的花火表演',
      '短时间内的密集发放',
      '球场独特的观赏体验'
    ]
  },

  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.316!2d139.7156!3d35.6759!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188d3151b37b5d%3A0x25bd5f1c95e9c5b3!2z5piO5rK75pWl5a6u6YeO55CD5aC0!5e0!3m2!1szh!2sjp!4v1704000000000!5m2!1szh!2sjp',

  related: {
    regionRecommendations: [
      {
        id: 'tokyo-keiba-2025',
        name: '东京竞马场花火2025',
        date: '2025年7月22日',
        location: '府中市',
        visitors: '约10万人',
                 link: '/tokyo/hanabi/keibajo'
      },
      {
        id: 'sumida-river-48',
        name: '第48回隅田川花火大会',
        date: '2025年7月27日',
        location: '隅田川',
        visitors: '约95万人',
                 link: '/tokyo/hanabi/sumida'
      }
    ],
    timeRecommendations: [
      {
        id: 'edogawa-50',
        name: '第50回江戸川区花火大会',
        date: '2025年8月3日',
        location: '江戸川',
        visitors: '约52万人',
        link: '/august/hanabi/tokyo/edogawa'
      }
    ]
  },

  website: 'https://www.yakult-swallows.co.jp/',
  dataSourceUrl: 'https://hanabi.walkerplus.com/detail/ar0313e01074/',

  officialSource: {
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0313e01074/',
    verificationDate: '2025-01-13',
    dataConfirmedBy: 'USER_PROVIDED',
    lastChecked: '2025-01-13'
  },

  dataIntegrityCheck: {
    hasOfficialSource: true,
    userVerified: true,
    lastValidated: '2025-01-13'
  }
}; 