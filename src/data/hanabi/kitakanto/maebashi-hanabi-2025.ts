// 第69回 前橋花火大会详细信息
// 数据来源：WalkerPlus官方 https://hanabi.walkerplus.com/detail/ar0310e00917/
// 官方数据验证：2025年6月13日

import { HanabiData } from '@/types/hanabi';

export const maebashiHanabi2025Data: HanabiData = {
  id: 'maebashi-hanabi-2025',
  name: '第69回 前橋花火大会',
  _sourceData: {
    japaneseDescription: '第69回 前橋花火大会',
      japaneseName: '第69回 前橋花火大会',
  },
  englishName: 'The 69th Maebashi Fireworks Festival',
  year: 2025,
  date: '2025年8月9日',
  time: '19:10-20:10',
  duration: '约60分钟',
  fireworksCount: '約1万5000発',
  expectedVisitors: '約45万人',
  weather: '夏季',
  ticketPrice: '全席位付费（详情见官网）',
  status: 'confirmed',
  themeColor: 'purple',
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
        location: '群馬県前橋市/利根川河畔大渡桥南北河川绿地',
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
        name: '第51回 高崎大花火大会',
        date: '8月23日',
        location: '烏川和田桥上流河川敷',
        visitors: '约90万人',
        link: '/kitakanto/hanabi/takasaki-hanabi',
      },
    ],
    timeRecommendations: [],
  },

  venues: [
    {
      name: '利根川河畔大渡桥南北河川绿地',
      location: '群马县前橋市利根川河畔大渡桥南北河川绿地',
      startTime: '19:10',
      features: [
        '打上幅800米的超宽屏星雨',
        '七色变化虹色花火',
        '音乐花火演出',
        '近距离观赏的迫力体验',
      ],
    },
  ],

  access: [
    {
      venue: '会场',
      stations: [
        {
          name: 'JR前橋駅',
          lines: ['JR两毛线'],
          walkTime: '巴士约12分+徒步10分',
        },
      ],
    },
  ],

  viewingSpots: [
    {
      name: '有料观览席',
      rating: 5,
      crowdLevel: '预约制',
      tips: '全席位付费预约制，需提前购票',
      pros: ['距离近，迫力十足', '音响效果最佳', '座位保证', '最佳视野'],
      cons: ['票价较高', '需提前预约', '数量有限'],
    },
  ],

  history: {
    established: 1957,
    significance: '群马县前橋市代表性夏季花火大会，拥有69年历史传统',
    highlights: [
      '第69回历史传承',
      '打上幅800米超宽屏星雨的壮观景象',
      '七色变化的虹色花火特色演出',
      '音乐与花火完美结合的视听盛宴',
    ],
  },

  tips: [
    {
      category: '交通建议',
      items: [
        'JR前橋駅搭乘关越交通巴士（渋川駅行）约12分钟',
        '在群大病院入口停留所下车，徒步10分钟到会场',
        '自驾可利用关越自动车道前橋IC，约15分钟（国道17号经由）',
        '无免费停车场，建议使用公共交通',
      ],
    },
    {
      category: '观赏建议',
      items: [
        '所有观览席均为付费预约制，务必提前购票',
        '观览席距离打上场所很近，可感受强烈迫力',
        '注意800米宽幅的超宽屏星雨展示',
        '音乐花火部分是重点观赏内容',
      ],
    },
    {
      category: '注意事项',
      items: [
        '恶劣天气时中止举办',
        '全席位付费，详情请确认官方网站',
        '会场设有饮食店、协赞企业展位等',
        '建议提前确认最新开催信息',
      ],
    },
  ],

  contact: {
    organizer: '前橋花火大会实施委員会',
    phone: '027-235-2211',
    website: 'https://www.maebashihanabi.jp/',
    socialMedia: '@maebashi_hanabi',
  },

  // 官方数据源验证
  officialSource: {
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0310e00917/',
    verificationDate: '2025-06-13',
    dataConfirmedBy: 'USER_PROVIDED' as const,
    lastChecked: '2025-06-13',
  },

  mapInfo: {
    hasMap: true,
    mapNote: '群马县前橋市利根川河畔大渡桥南北河川绿地',
    parking: '无免费停车场\n建议使用公共交通前往',
  },

  // 谷歌地图嵌入URL - 前橋市利根川河畔大渡桥
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3223.1!2d139.0614!3d36.3972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x601f0a8b4c8e1c7%3A0x1c8e8d8e8d8e8d8e!2z5YmN5qmL5biC5Yip5qC55bed5bKy5aSn5rih5qGl5Y2X5YyX5rKz5bed57ay5Zyw!5e0!3m2!1sja!2sjp!4v1634567890123!5m2!1sja!2sjp',

  weatherInfo: {
    month: '8月',
    temperature: '夏季高温',
    humidity: '较高',
    rainfall: '夏季雷雨',
    recommendation: '建议携带雨具，注意防暑',
    rainPolicy: '恶劣天气时中止举办',
    note: '夏季高温，请注意防暑降温',
  },

  specialFeatures: {
    scale: '约1万5000发花火，60分钟连续演出',
    location: '利根川河畔举办，视野开阔',
    tradition: '69年历史的群马县代表性花火大会',
    atmosphere: '付费观览席提供的高品质观赏体验',
  },

  special2025: {
    theme: '第69回纪念',
    concept: '传统与创新的完美融合',
    memorial: '69年历史传承',
    features: [
      '打上幅800米的超宽屏星雨',
      '七色变化的虹色花火',
      '音乐花火的视听盛宴',
      '全席位付费预约制的高品质体验',
    ],
  },

  media: [
    {
      type: 'image' as const,
      url: '/images/hanabi/maebashi-hanabi-main.svg',
      title: '第69回 前橋花火大会',
      description:
        '群马县前橋市举办的传统花火大会，800米宽幅超宽屏星雨震撼演出',
    },
  ],
};
