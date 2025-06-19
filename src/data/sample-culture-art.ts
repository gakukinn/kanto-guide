import { CultureArtData } from '../types/culture-art';

export const sampleCultureArtData: CultureArtData = {
  id: 'tokyo-art-festival-2025',
  name: '东京艺术节2025',
  englishName: 'Tokyo Art Festival 2025',
  _sourceData: {
    japaneseName: '東京アートフェスティバル2025',
    japaneseDescription: '東京で開催される国際的なアートフェスティバル',
  },
  year: 2025,
  date: '2025年7月15日-7月20日',
  displayDate: '7月15日-20日',
  time: '10:00',
  duration: '6天',
  artType: '综合艺术展览',
  expectedVisitors: '50万人',
  weather: '夏季，温暖',
  ticketPrice: '一般：3000日元，学生：2000日元',
  status: 'confirmed',
  ranking: 'A级艺术节',
  themeColor: 'purple',

  title: '东京艺术节2025 - 国际综合艺术展览',
  description:
    '东京艺术节是一场汇聚世界各地艺术家的盛大节庆，展示当代艺术的多元魅力。',

  tags: {
    timeTag: '7月',
    regionTag: '东京都',
    typeTag: '文化艺术',
    layerTag: 'Layer 4详情页',
  },

  related: {
    regionRecommendations: [
      {
        id: 'shibuya-art-week',
        name: '涩谷艺术周',
        date: '7月22日-28日',
        location: '涩谷区',
        visitors: '30万人',
        link: '/tokyo/culture-art/shibuya-art-week',
      },
      {
        id: 'ueno-museum-festival',
        name: '上野博物馆节',
        date: '8月1日-7日',
        location: '上野',
        visitors: '40万人',
        link: '/tokyo/culture-art/ueno-museum-festival',
      },
    ],
    timeRecommendations: [],
    sameMonth: ['7月艺术活动'],
    sameRegion: ['东京都艺术活动'],
    recommended: ['国际艺术节'],
  },

  dynamicData: {
    ticketing: {
      salesStart: '2025年5月1日',
      salesEnd: '2025年7月14日',
      availability: 'available',
      officialUrl: 'https://tokyo-art-festival.jp/tickets',
      priceRange: '2000-5000日元',
    },
    schedule: {
      confirmed: true,
      dateStatus: 'confirmed',
      updates: ['确认举办', '新增互动体验区'],
    },
    venueDetails: {
      capacity: 10000,
      facilities: ['停车场', '餐厅', '纪念品店', '休息区'],
      restrictions: ['禁止拍照', '禁止饮食'],
      accessibility: ['轮椅通道', '手语翻译', '盲文导览'],
    },
    performers: {
      artists: ['国际知名艺术家', '新锐创作者', '传统工艺师'],
      genres: ['现代艺术', '传统工艺', '数字艺术', '互动装置'],
      experience: '国际一流水准',
    },
    dataSources: {
      primary: '东京艺术节官方网站',
      lastSync: '2025-01-15',
      verification: true,
    },
  },

  venues: [
    {
      name: '东京国际会议中心',
      location: '东京都港区',
      startTime: '10:00',
      features: ['主展厅', '互动体验区', '工作坊空间'],
    },
    {
      name: '六本木艺术三角',
      location: '六本木',
      startTime: '11:00',
      features: ['户外展示', '街头艺术', '表演舞台'],
    },
  ],

  access: [
    {
      venue: '东京国际会议中心',
      stations: [
        {
          name: '新桥站',
          lines: ['JR山手线', 'JR东海道线', '东京地铁银座线'],
          walkTime: '10分钟',
        },
        {
          name: '汐留站',
          lines: ['JR京滨东北线', '都营大江户线'],
          walkTime: '5分钟',
        },
      ],
    },
    {
      venue: '六本木艺术三角',
      stations: [
        {
          name: '六本木站',
          lines: ['东京地铁日比谷线', '都营大江户线'],
          walkTime: '3分钟',
        },
      ],
    },
  ],

  viewingSpots: [
    {
      name: '主展厅中央区域',
      rating: 5,
      crowdLevel: '高',
      tips: '建议早上开馆时间参观，人流较少，体验更佳',
      pros: ['视野开阔', '作品丰富', '展示效果佳'],
      cons: ['人流密集', '需要排队'],
    },
    {
      name: '互动体验区',
      rating: 4,
      crowdLevel: '中',
      tips: '适合家庭和儿童参与，需要预约体验时段',
      pros: ['互动性强', '教育意义', '适合全家'],
      cons: ['需要预约', '时间有限'],
    },
    {
      name: '户外展示区',
      rating: 4,
      crowdLevel: '低',
      tips: '天气晴朗时最佳，可以拍照留念',
      pros: ['空间开阔', '拍照效果好', '人少清静'],
      cons: ['受天气影响', '作品数量有限'],
    },
  ],

  history: {
    established: 2010,
    significance:
      '东京艺术节作为亚洲最重要的国际艺术节之一，致力于推广当代艺术文化交流，是连接东西方艺术的重要桥梁。',
    highlights: [
      '2010年首次举办，吸引来自30个国家的艺术家参与',
      '2015年被评为亚洲最具影响力的艺术节',
      '2020年疫情期间开创线上展览模式',
      '累计参观人数超过500万人次',
      '促成了多项国际艺术合作项目',
    ],
  },

  tips: [
    {
      category: '参观建议',
      items: [
        '建议预留至少半天时间参观',
        '穿着舒适的鞋子，展览面积较大',
        '携带充电宝，可能需要长时间使用手机导览',
        '部分展区禁止拍照，请遵守规定',
      ],
    },
    {
      category: '交通指南',
      items: [
        '推荐使用公共交通，停车位有限',
        '周末人流较多，建议避开高峰时段',
        '可购买一日券，方便在多个场馆间移动',
      ],
    },
    {
      category: '购票须知',
      items: [
        '提前在线购票可享受优惠',
        '学生票需出示有效学生证',
        '65岁以上老人享受半价优惠',
        '儿童(12岁以下)免费入场',
      ],
    },
  ],

  contact: {
    organizer: '东京艺术节组委会',
    phone: '03-1234-5678',
    website: 'https://tokyo-art-festival.jp',
    socialMedia: '@TokyoArtFest',
    ticketUrl: 'https://tokyo-art-festival.jp/tickets',
  },

  mapInfo: {
    hasMap: true,
    mapNote: '主会场位于东京国际会议中心，分会场分布在六本木艺术三角地区',
    parking: '有收费停车场，建议使用公共交通',
  },

  weatherInfo: {
    month: '7月',
    temperature: '平均气温28℃',
    humidity: '湿度75%',
    rainfall: '梅雨季末期，偶有阵雨',
    recommendation: '室内展览为主，天气影响较小。建议携带轻便雨具。',
    indoorVenue: true,
    note: '主展厅有空调，户外展区需注意防晒',
  },

  specialFeatures: {
    artistLevel: '国际一流艺术家',
    artForm: '当代艺术、传统工艺、数字艺术',
    tradition: '融合东西方艺术传统',
    atmosphere: '国际化、多元化、创新性',
    collaboration: '与世界知名美术馆合作',
  },

  special2025: {
    theme: '数字时代的人文精神',
    concept: '探索科技与艺术的融合',
    memorial: '纪念东京艺术节15周年',
    features: [
      'AI艺术展区',
      'VR体验空间',
      '数字互动装置',
      '传统工艺数字化展示',
    ],
  },

  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.4424!2d139.7619!3d35.6584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDM5JzMwLjMiTiAxMznCsDQ1JzQyLjciRQ!5e0!3m2!1sen!2sjp!4v1600000000000!5m2!1sen!2sjp',

  media: [
    {
      type: 'image',
      url: '/images/culture-art/tokyo-art-festival-main.jpg',
      title: '东京艺术节主展厅',
      description: '2024年东京艺术节主展厅盛况',
      alt: '东京艺术节展览现场',
      caption: '国际艺术家作品展示',
    },
    {
      type: 'image',
      url: '/images/culture-art/tokyo-art-festival-interactive.jpg',
      title: '互动体验区',
      description: '观众参与数字艺术互动体验',
      alt: '艺术节互动体验',
      caption: '科技与艺术的完美结合',
    },
  ],

  month: 7,

  website: 'https://tokyo-art-festival.jp',

  officialSource: {
    sourceUrl: 'https://tokyo-art-festival.jp',
    verificationDate: '2025-01-15',
    dataConfirmedBy: 'USER_PROVIDED',
    lastChecked: '2025-01-15',
  },

  dataIntegrityCheck: {
    hasOfficialSource: true,
    userVerified: true,
    lastValidated: '2025-01-15',
  },

  dataSourceUrl: 'https://tokyo-art-festival.jp',
};
