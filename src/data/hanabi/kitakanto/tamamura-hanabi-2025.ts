// 田园梦花火2025 第35回 玉村花火大会详细信息
// 数据来源：WalkerPlus官方 https://hanabi.walkerplus.com/detail/ar0310e00986/
// 官方数据验证：2025年6月13日

import { HanabiData } from '@/types/hanabi';

export const tamamuraHanabi2025Data: HanabiData = {
  id: 'tamamura-hanabi-2025',
  name: '田园梦花火2025 第35回 玉村花火大会',
  _sourceData: {
    japaneseDescription: '田園夢花火2025 第35回 玉村花火大会',
      japaneseName: '田園夢花火2025 第35回 玉村花火大会',
  },
  englishName: 'Tamamura Fireworks Festival 2025',
  year: 2025,
  date: '2025年8月23日',
  time: '19:40-20:30',
  duration: '约50分钟',
  fireworksCount: '約3000発',
  expectedVisitors: '約2万人',
  weather: '夏季',
  ticketPrice: '免费入场',
  status: 'confirmed',
  themeColor: 'green',
  month: 8,

  tags: {
    timeTag: '8月',
    regionTag: '北关东',
    typeTag: '花火',
    layerTag: '详细介绍',
  },

  related: {
    regionRecommendations: [
      {
        id: 'kitakanto-august-01',
        name: '水戸偕楽園花火大会',
        date: '8月26日',
        location: '群馬県玉村町/上陽地区（上陽小学校西側）',
        visitors: '约23万人',
        link: '/kitakanto/hanabi/mito-hanabi',
      },
      {
        id: 'kitakanto-august-02',
        name: '真岡市夏祭大花火大会',
        date: '8月26日',
        location: '真岡市役所东侧五行川沿岸',
        visitors: '约17万人',
        link: '/kitakanto/hanabi/moka-hanabi',
      },
      {
        id: 'kitakanto-august-03',
        name: '館林手筒花火大会',
        date: '8月26日',
        location: '館林城夢广场',
        visitors: '3万人',
        link: '/kitakanto/hanabi/tatebayashi-hanabi',
      },
    ],
    timeRecommendations: [],
  },

  venues: [
    {
      name: '特别观览空间',
      location: '群马县玉村町上陽地区（上陽小学校西側）',
      startTime: '19:40',
      features: ['付费观赏区域', '最佳视野', '专属空间'],
    },
    {
      name: '一般观览区域',
      location: '群马县玉村町上陽地区',
      startTime: '19:40',
      features: ['免费观赏', '田园风光', '开阔视野'],
    },
  ],

  access: [
    {
      venue: '会场',
      stations: [
        {
          name: '新町駅',
          lines: ['JR高崎線'],
          walkTime: '巴士约25分+徒步20分',
        },
        {
          name: '高崎駅',
          lines: ['JR高崎線'],
          walkTime: '巴士约35分+徒步20分',
        },
      ],
    },
  ],

  viewingSpots: [
    {
      name: '特别观览空间',
      rating: 5,
      crowdLevel: '适中',
      tips: '最佳观赏位置，需提前购票',
      pros: ['距离近，迫力十足', '专属区域，较为宽敞', '视野绝佳'],
      cons: ['票价较高', '需提前预约', '数量有限'],
    },
    {
      name: '一般观览区域',
      rating: 4,
      crowdLevel: '适中',
      tips: '免费观赏区域，建议提前占位',
      pros: ['免费入场', '田园风光', '开阔视野', '停车便利'],
      cons: ['需早到占位', '设施相对简单'],
    },
  ],

  history: {
    established: 1990,
    significance:
      '群马县内最早开催的花火大会，享有"群马的夏天，玉村的花火"的美誉',
    highlights: [
      '第35回的历史传承',
      '田园地带特色花火大会',
      '地方传统夏祭文化',
      '四重芯菊花火的精彩展示',
    ],
  },

  tips: [
    {
      category: '交通建议',
      items: [
        '建议利用临时停车场',
        '提前确认巴士时刻表',
        '避开高峰时段离场',
        '关越自动车道前桥IC约15分钟车程',
      ],
    },
    {
      category: '观赏建议',
      items: [
        '田园地带视野开阔，多个位置都可观赏',
        '特别观览空间观赏效果最佳',
        '建议携带坐垫或椅子',
        '注意四重芯菊花火的精彩瞬间',
      ],
    },
    {
      category: '注意事项',
      items: [
        '雨天照常举办，恶劣天气中止',
        '无延期日期安排',
        '注意防蚊虫叮咬',
        '停车场约500台（免费）',
      ],
    },
  ],

  contact: {
    organizer: '玉村花火实行委员会',
    phone: '0270-64-7711',
    website: 'https://www.town.tamamura.lg.jp/',
    socialMedia: '',
  },

  // 官方数据源验证
  officialSource: {
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0310e00986/',
    verificationDate: '2025-06-13',
    dataConfirmedBy: 'USER_PROVIDED' as const,
    lastChecked: '2025-06-13',
  },

  mapInfo: {
    hasMap: true,
    mapNote: '群马县玉村町上陽地区，上陽小学校西側',
    parking: '约500台（免费）\n临时停车场设置',
  },

  // 谷歌地图嵌入URL - 玉村町上陽地区上陽小学校西侧
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3221.4!2d139.1141!3d36.3089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x601f1ab8d8c8e1c7%3A0x1c8e8d8e8d8e8d8e!2z44CSMzcwLTExMDEg576k6aas55yM5L2Q5p2R55S66Z2Y6Zm944Kk5Zyw5Yy65LiK6Zm954K6!5e0!3m2!1sja!2sjp!4v1634567890123!5m2!1sja!2sjp',

  weatherInfo: {
    month: '8月',
    temperature: '夏季高温',
    humidity: '较高',
    rainfall: '夏季雷雨',
    recommendation: '建议携带雨具，注意防暑',
    rainPolicy: '雨天决行，恶劣天气中止（延期日无）',
    note: '夏季高温，请注意防暑降温',
  },

  specialFeatures: {
    scale: '3000发花火，约2万人规模',
    location: '田园地带举办，视野开阔',
    tradition: '群马县内最早开催的传统花火大会',
    atmosphere: '乡村夏祭的温馨氛围',
  },

  special2025: {
    theme: '田园梦花火',
    concept: '第35回纪念大会',
    memorial: '35年传统的延续',
    features: [
      '四色层"四重芯菊"花火',
      '宽屏连发花火精彩演出',
      '持续临时停车制度',
      '特别观览空间设置',
    ],
  },

  media: [
    {
      type: 'image' as const,
      url: '/images/hanabi/tamamura-hanabi-main.svg',
      title: '田园梦花火2025 第35回 玉村花火大会',
      description: '群马县玉村町举办的传统花火大会，田园风光下的夏季盛典',
    },
  ],
};
