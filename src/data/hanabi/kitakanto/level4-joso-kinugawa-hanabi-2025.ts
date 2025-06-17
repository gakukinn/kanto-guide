import { HanabiData } from '../../../types/hanabi';

export const josoKinugawaHanabiData: HanabiData = {
  id: 'joso-kinugawa-hanabi-2025',
  name: '第58回 常総绢川花火大会',
  _sourceData: {
    japaneseName: '第58回 常總きぬ川花火大会',
    japaneseDescription:
      '日本屈指の名花火師の競演による茨城県常總市の代表的花火大会',
  },
  englishName: '58th Joso Kinugawa Fireworks Festival',
  year: 2025,
  date: '2025年9月20日(土)',
  time: '18:05～19:45',
  duration: '约100分',
  fireworksCount: '约2万发',
  expectedVisitors: '约12万人',
  weather: '初秋气候',
  status: 'scheduled',
  ticketPrice: '席位18,000円、椅子席6,000円',
  themeColor: 'orange',
  month: 9,

  title: '第58回 常總绢川花火大会 | 2025年9月北关东花火大会',
  description:
    '第58回常总绢川花火大会，日本屈指的名花火师による竞演，约2万发的花火在鬼怒川夜空中绽放。茨城县常总市，2025年9月20日开催。',

  tags: {
    timeTag: '9月',
    regionTag: '北关东',
    typeTag: '花火',
    layerTag: 'Layer 4详情页',
  },

  related: {
    timeRecommendations: [
      {
        id: 'tonegawa-hanabi',
        name: '第38回利根川大花火大会',
        date: '9月13日',
        location: '茨城县境町',
        visitors: '约30万人',
        link: '/september/hanabi/kitakanto/tonegawa-hanabi',
      },
    ],
    regionRecommendations: [
      {
        id: 'tonegawa-hanabi',
        name: '第38回利根川大花火大会',
        date: '9月13日',
        location: '茨城县境町',
        visitors: '约30万人',
        link: '/september/hanabi/kitakanto/tonegawa-hanabi',
      },
      {
        id: 'oarai-hanabi',
        name: '大洗海上花火大会2025〜千樱祭〜',
        date: '9月27日',
        location: '茨城县大洗町',
        visitors: '约18万人',
        link: '/september/hanabi/kitakanto/oarai-hanabi',
      },
    ],
  },

  media: [
    {
      type: 'image',
      url: '/images/hanabi/joso-kinugawa/joso-kinugawa-main.jpg',
      title: '第58回 常總绢川花火大会',
      description: '鬼怒川河畔绚烂绽放的约2万发花火',
    },
    {
      type: 'image',
      url: '/images/hanabi/joso-kinugawa/joso-kinugawa-venue.jpg',
      title: '鬼怒川河畔、桥本运动公园会场',
      description: '河川敷会场和运动公园邻接的观赏区域',
    },
  ],

  history: {
    established: 1968,
    significance:
      '茨城县常总市的代表性花火大会，以日本屈指的名花火师的竞演闻名，传统花火艺术与现代技术完美融合的重要文化活动。',
    highlights: [
      '第58回常总绢川花火大会是1968年创设的历史悠久大会',
      '名花火师的作品多样性知名，12万人以上的观客魅力',
      '青一色的幻想演出和白银连发花火是传统特色',
      '约2万发的大规模打上和100分间的长时间开催魅力',
    ],
  },

  venues: [
    {
      name: '鬼怒川河畔、桥本运动公园',
      location: '茨城县常总市',
      startTime: '18:05',
      features: ['河川敷会场', '运动公园邻接', '有料席完备'],
    },
  ],

  access: [
    {
      venue: '鬼怒川河畔、桥本运动公园',
      stations: [
        {
          name: '水海道站',
          lines: ['关东铁道'],
          walkTime: '徒步15分',
        },
      ],
    },
  ],

  mapInfo: {
    hasMap: true,
    mapNote: '鬼怒川河畔、桥本运动公园周边地图',
    parking: '2000台临时停车场，有料2000円～3000円/台',
  },

  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3222.8!2d139.9852845!3d36.0274614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018a056e237eb91%3A0xd39416e8521d1270!2sHashimoto%20Sports%20Park!5e0!3m2!1szh-CN!2sjp!4v1642000000000!5m2!1szh-CN!2sjp',

  viewingSpots: [
    {
      name: '鬼怒川河畔观览席',
      rating: 5,
      crowdLevel: '拥挤',
      tips: '最高的观赏位置，有料观览席的事前预约必要',
      pros: ['打上场所最近', '视野开阔', '音响效果绝佳'],
      cons: ['人流密集', '有料'],
    },
    {
      name: '桥本运动公园',
      rating: 4,
      crowdLevel: '中等',
      tips: '比较宽松的观赏区域，家族观赏适合',
      pros: ['设备完备', '停车方便', '家族向'],
      cons: ['距离稍远', '视角有限制'],
    },
    {
      name: '鬼怒川对岸',
      rating: 3,
      crowdLevel: '较少',
      tips: '免费观赏区域，人少安静',
      pros: ['免费观赏', '人流少', '摄影角度独特'],
      cons: ['距离远', '设施有限'],
    },
  ],

  contact: {
    organizer: '常总绢川花火大会实行委员会',
    phone: '0297-23-9088',
    website: 'https://joso-hanabi.jp/',
    socialMedia: '@joso_hanabi',
  },

  weatherInfo: {
    month: '9月',
    temperature: '初秋凉爽，日中24℃前后，夜间16℃前后',
    humidity: '适中',
    rainfall: '恶天时延期',
    rainPolicy: '恶天时延期（日程延期决定后告知）',
    note: '夜间气温下降，建议携带薄外套',
    recommendation: '薄外套持参推荐，防寒对策必要',
  },

  tips: [
    {
      category: '交通指南',
      items: [
        '关东铁道水海道站的利用推荐，徒步15分到达会场',
        '汽车利用常磐道谷和原IC，约10分到达',
        '当日有交通管制，早出发推荐',
        '临时停车场2000台，有料2000円～3000円/台',
      ],
    },
    {
      category: '观赏攻略',
      items: [
        '有料观览席有席位、椅子席等多种选择',
        '日本屈指的名花火师的竞演是最大看点',
        '青一色染上幻想夜空的演出',
        '白银辉煌华丽连发花火必看',
      ],
    },
    {
      category: '注意事项',
      items: [
        '恶天时延期（日程延期决定后告知）',
        '会场内酒类・危险物持入禁止',
        '薄外套持参推荐，夜间气温下降',
        '垃圾持回，环境保护协力',
      ],
    },
  ],
};
