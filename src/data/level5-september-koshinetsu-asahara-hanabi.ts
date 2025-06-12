import { HanabiData } from '@/types/hanabi';

export const asaharaHanabiData: HanabiData = {
  id: 'asahara-hanabi',
  name: '浅原神社秋季例大祭奉納大煙火',
  japaneseName: '浅原神社 秋季例大祭奉納大煙火',
  englishName: 'Asahara Shrine Autumn Festival Fireworks',
  year: 2025,
  date: '2025年9月12日・13日',
  time: '19:30～22:20',
  duration: '约170分钟',
  fireworksCount: '约1万5000发',
  expectedVisitors: '约20万人',
  weather: '9月秋季，气候宜人',
  ticketPrice: '有料观览席另收费',
  status: '开催预定',
  themeColor: '#FF6B35',
  title: '浅原神社秋季例大祭奉納大煙火',
  description: '三尺玉发祥地新潟县小千谷市片貝町举办的200年传统花火祭典。世界最大四尺玉花火的震撼打上，配合山间回响的豪快破裂音，是日本屈指可数的大规模花火竞技大会。',
  tags: {
    timeTag: '9月',
    regionTag: '甲信越',
    typeTag: '花火',
    layerTag: '详细介绍'
  
  },
  month: 9,
  venues: [
    {
      name: '片貝町浅原神社裏手',
      location: '新潟县小千谷市片貝町',
      startTime: '19:30',
      features: ['四尺玉花火', '三尺玉发祥地', '尺玉连发', '山间回响']
    }
  ],
  access: [
    {
      venue: '片貝町浅原神社裏手',
      stations: [
        {
          name: 'JR小千谷站',
          lines: ['JR上越线'],
          walkTime: '片貝经由长冈行巴士约20分钟'
        },
        {
          name: 'JR长冈站',
          lines: ['JR上越线'],
          walkTime: '片貝经由小千谷行巴士约30分钟'
        }
      ]
    }
  ],
  viewingSpots: [
    {
      name: '有料观览席',
      rating: 5,
      crowdLevel: 'high',
      tips: '最佳观赏位置，近距离感受四尺玉震撼',
      pros: ['最佳视角', '设施完善', '安全舒适'],
      cons: ['需要预约', '价格较高']
    },
    {
      name: '浅原神社境内',
      rating: 4,
      crowdLevel: 'high',
      tips: '传统祭典氛围浓厚的观赏地点',
      pros: ['传统氛围', '免费观赏', '神社设施'],
      cons: ['人群拥挤', '视角受限']
    },
    {
      name: '片貝町周边',
      rating: 3,
      crowdLevel: 'medium',
      tips: '稍远但可避开人群的观赏点',
      pros: ['人群较少', '停车方便'],
      cons: ['距离较远', '视角一般']
    }
  ],
  history: {
    established: 1825,
    significance: '三尺玉发祥地，200年传统花火祭典',
    highlights: [
      '世界最大四尺玉花火的发源地',
      '三尺玉技术的传承与发展',
      '片貝町煙火協会的传统工艺'
    ]
  },
  tips: [
    {
      category: '观赏时机',
      items: [
        '四尺玉打上时间为两日均22:00～，不可错过',
        '山间回响的破裂音是最大特色，建议提前到场'
      ]
    },
    {
      category: '票务信息',
      items: [
        '有料席需提前预约，当日券数量有限',
        '传统行事筒引和玉送也值得观赏'
      ]
    },
    {
      category: '准备事项',
      items: [
        '秋季夜间较凉，建议携带保暖衣物',
        '会场周边交通管制，建议使用公共交通'
      ]
    }
  ],
  mapInfo: {
    hasMap: true,
    mapNote: '会场位于片貝町浅原神社裏手',
    parking: '临时停车场设置，建议使用公共交通'
  },
  weatherInfo: {
    month: '9月',
    temperature: '日间25°C，夜间15°C',
    humidity: '60-70%',
    rainfall: '秋季降雨较少',
    recommendation: '夜间较凉，建议携带保暖衣物'
  },
  contact: {
    organizer: '片貝町煙火協会',
    phone: '0258-84-3900',
    website: 'https://www.city.ojiya.niigata.jp/',
    socialMedia: '@katakaimachi_hanabi'
  },
  // 官方数据源验证
  officialSource: {
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0415e00667/',
    verificationDate: '2025-01-13',
    dataConfirmedBy: 'USER_PROVIDED' as const,
    lastChecked: '2025-01-13'
  },
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3222.8!2d138.8!3d37.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDE4JzAwLjAiTiAxMzjCsDQ4JzAwLjAiRQ!5e0!3m2!1sja!2sjp!4v1234567890123!5m2!1sja!2sjp',
  website: 'https://www.city.ojiya.niigata.jp/',
  related: {
    regionRecommendations: [
      {
        id: 'nagaoka-hanabi',
        name: '长冈花火大会',
        date: "8月2日・3日",
        location: '新潟县长冈市',
        visitors: '约100万人',
        link: '/august/hanabi/koshinetsu/nagaoka-hanabi'
      },
      {
        id: 'kashiwazaki-hanabi',
        name: '柏崎海之大花火大会',
        date: "7月26日",
        location: '新潟县柏崎市',
        visitors: '约20万人',
        link: '/july/hanabi/koshinetsu/kashiwazaki-hanabi'
      }
    ],
    timeRecommendations: [
      {
        id: 'niigata-matsuri-hanabi',
        name: '新潟祭花火大会',
        date: "8月10日",
        location: '新潟县新潟市',
        visitors: '约75万人',
        link: '/august/hanabi/koshinetsu/niigata-matsuri-hanabi'
      },
      {
        id: 'sakihana-hanabi',
        name: '咲花温泉水中花火大会',
        date: "8月25日",
        location: '新潟县五泉市',
        visitors: '约3万人',
        link: '/august/hanabi/koshinetsu/sakihana-hanabi'
      }
    ]
  }
}; 