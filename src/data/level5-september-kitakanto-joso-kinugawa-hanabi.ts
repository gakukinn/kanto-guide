import { HanabiData } from '../types/hanabi';

export const josoKinugawaHanabiData: HanabiData = {
  id: 'joso-kinugawa-hanabi-september',
  name: '第58回常总绹川花火大会',
  japaneseName: '第58回 常總きぬ川花火大会',
  englishName: '58th Joso Kinugawa Fireworks Festival',
  year: 2025,
  date: '9月20日(土)',
  time: '18:30～19:50',
  duration: '约80分钟',
  fireworksCount: '约1万3000发',
  expectedVisitors: '约13万人',
  weather: '初秋凉爽',
  ticketPrice: '有料观览席',
  status: '开催预定',
  themeColor: '#FF8C42',
  month: 9,
  
  title: '第58回常总绹川花火大会 | 2025年9月北关东花火大会',
  description: '第58回常总绹川花火大会，日本代表花火师作品竞演，约1万3000发花火照亮鬼怒川夜空。茨城县常总市，2025年9月20日开催。',
  
  tags: {
    timeTag: '9月',
    regionTag: '北关东',
    typeTag: '花火',
    layerTag: '详细介绍'
  
  },
  
  related: {
    timeRecommendations: [
      {
        id: 'tonegawa-hanabi',
        name: '第38回利根川大花火大会',
        date: "9月13日",
        location: '茨城县境町',
        visitors: '约30万人',
        link: '/september/hanabi/kitakanto/tonegawa-hanabi'
      }
    ],
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
        id: 'oarai-hanabi',
        name: '大洗海上花火大会2025〜千櫓祭〜',
        date: "9月27日",
        location: '茨城县大洗町',
        visitors: '约18万人',
        link: '/september/hanabi/kitakanto/oarai-hanabi'
      }
    ]
  },
  
  venues: [
    {
      name: '鬼怒川河畔、桥本运动公园',
      location: '茨城县常总市',
      startTime: '18:30开始，19:50结束'
    }
  ],
  
  access: [
    {
      venue: '鬼怒川河畔、桥本运动公园',
      stations: [
        {
          name: '水海道站',
          lines: ['关东铁道'],
          walkTime: '徒步15分钟'
        }
      ]
    }
  ],
  
  viewingSpots: [
    {
      name: '鬼怒川河畔观览席',
      rating: 5,
      crowdLevel: 'high',
      tips: '最佳观赏位置，需要提前预约有料观览席',
      pros: ['距离打上场所最近', '视野开阔', '音响效果最佳'],
      cons: ['人流密集', '需要付费']
    },
    {
      name: '桥本运动公园',
      rating: 4,
      crowdLevel: 'medium',
      tips: '相对宽松的观赏区域，适合家庭观赏',
      pros: ['设施完善', '停车便利', '适合家庭'],
      cons: ['距离稍远', '视角有限']
    },
    {
      name: '鬼怒川对岸',
      rating: 3,
      crowdLevel: 'low',
      tips: '免费观赏区域，人少安静',
      pros: ['免费观赏', '人流较少', '摄影角度独特'],
      cons: ['距离较远', '设施有限']
    }
  ],
  
  tips: [
    {
      category: '交通指南',
      items: [
        '推荐使用关东铁道水海道站，徒步15分钟到达会场',
        '自驾可利用常磐道谷和原IC，约10分钟到达',
        '当日会有交通管制，建议提前出发',
        '临时停车场2000台，有料2000日元/台'
      ]
    },
    {
      category: '观赏攻略',
      items: [
        '有料观览席包括马斯席、椅子席、双人席等多种选择',
        '200米纳亚加拉富士开幕花火不容错过',
        '内閣总理大臣赏受赏者的音乐星矿是最大看点',
        '日本烟火艺术协会的严选艺术玉值得期待'
      ]
    },
    {
      category: '注意事项',
      items: [
        '荒天时延期至翌日同时刻',
        '会场内禁止携带酒类和危险物品',
        '建议携带薄外套，夜间气温较低',
        '垃圾请带回，保护环境'
      ]
    }
  ],
  
  history: {
    established: 1968,
    significance: '作为茨城县常总市的代表性花火大会，以日本屈指可数的名花火师竞演而闻名，是展现传统花火艺术与现代技术完美融合的重要文化活动。',
    highlights: [
      '第58回常总绹川花火大会历史悠久，始于1968年',
      '以有名花火店的作品多样性而知名，吸引10万人以上观众',
      '内閣总理大臣赏受赏的音乐星矿和火焰艺术竞赛是传统特色',
      '200米纳亚加拉富士开幕花火和超级星矿竞演内容丰富多彩'
    ]
  },
  
  mapInfo: {
    hasMap: true,
    mapNote: '鬼怒川河畔、桥本运动公园周边地图',
    parking: '2000台临时停车场，有料2000日元/台'
  },
  
  website: 'https://joso-hanabi.jp/',
  
  contact: {
    organizer: '常总绹川花火大会实行委员会',
    phone: '0297-23-9088',
    website: 'https://joso-hanabi.jp/',
    socialMedia: '@joso_hanabi'
  },
  
  weatherInfo: {
    month: '9月',
    temperature: '初秋凉爽，日间24℃左右，夜间16℃左右',
    humidity: '适中',
    rainfall: '荒天时延期至翌日',
    recommendation: '建议携带薄外套，注意保暖'
  }
}; 