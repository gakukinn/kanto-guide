import { HanabiData } from '@/types/hanabi';

export const kogaHanabiData: HanabiData = {
  id: 'koga-hanabi-2025',
  name: '第20回 古河花火大会',
  _sourceData: {
    japaneseDescription: '第20回 古河花火大会',
      japaneseName: '第20回 古河花火大会',
  },
  englishName: 'The 20th Koga Fireworks Festival',
  year: 2025,
  date: '2025年8月2日',
  time: '19:20～20:30',
  duration: '约70分钟',
  fireworksCount: '約2万5000発',
  expectedVisitors: '約20万人',
  weather: '夏季天气',
  ticketPrice: '2,500日元起',
  status: '确定举办',
  themeColor: '#FF6B35',

  // 页面元数据
  title: '第20回 古河花火大会 | 茨城县古河市 | 关东旅游指南',
  description:
    '渡良瀬川河川敷举办的古河花火大会。直径约650米三尺玉大轮花火为特色，在古河高尔夫球场会场展开绚烂花火画卷。2025年8月2日开催。',

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
      name: '古河高尔夫球场',
      location: '茨城県古河市/古河高尔夫球场',
      startTime: '19:20',
      features: ['三尺玉2发打上', '特大宽屏星雷', '野村花火工业制作'],
    },
  ],

  // 交通信息
  access: [
    {
      venue: '古河高尔夫球场',
      stations: [
        {
          name: 'JR古河站',
          lines: ['JR东日本'],
          walkTime: '步行20分钟',
        },
        {
          name: '东武新古河站',
          lines: ['东武铁道'],
          walkTime: '步行5分钟',
        },
      ],
    },
  ],

  // 观赏地点
  viewingSpots: [
    {
      name: '本部前堤防斜面席',
      rating: 4.8,
      crowdLevel: '高',
      tips: '需要提前预约，6月9日起开始销售',
      pros: ['最佳观赏位置', '1.8m×1.8m蓝色坐垫席', '4人席22,000日元'],
      cons: ['需要付费', '预约必要'],
    },
    {
      name: 'Fairway SS席',
      rating: 4.5,
      crowdLevel: '中',
      tips: '最高级观赏席，体验最佳',
      pros: ['躺椅席', '1人席28,600日元', '特别观赏体验'],
      cons: ['价格较高', '数量有限'],
    },
    {
      name: '停车场席',
      rating: 4.0,
      crowdLevel: '中',
      tips: '适合家族观赏，儿童免费',
      pros: ['2,500日元门票', '大人1名带儿童1名免费', '性价比高'],
      cons: ['视野一般', '设施简单'],
    },
  ],

  // 历史背景
  history: {
    established: 2005,
    significance: '古河市代表性夏季花火盛典',
    highlights: ['20年历史传承', '三尺玉传统', '古河市最大规模花火大会'],
  },

  // 观赏贴士
  tips: [
    {
      category: '交通贴士',
      items: [
        'JR古河站步行20分钟，东武新古河站步行5分钟',
        '建议使用新古河站，距离会场最近',
        '花火大会当日17:00～22:00江户町通周边实施交通管制',
      ],
    },
    {
      category: '观赏贴士',
      items: [
        '三尺玉2发打上是最大亮点',
        '特大宽屏星雷展现超宽视野演出',
        '18:00开场，建议提前到达确保好位置',
      ],
    },
    {
      category: '购票贴士',
      items: [
        '有料席6月9日起开始销售',
        '本部前堤防斜面席22,000日元/4人席',
        '停车场席2,500日元，儿童免费',
      ],
    },
  ],

  // 联系信息
  contact: {
    organizer: '古河花火大会实行委员会',
    phone: '0280-22-5111',
    website:
      'https://www.city.ibaraki-koga.lg.jp/soshiki/kanko/4_1/2025hanabi.html',
    socialMedia: '@koga_city',
  },

  // 地图信息
  mapInfo: {
    hasMap: true,
    mapNote: '古河高尔夫球场(渡良瀬川河川敷)',
    parking: '2000台无料停车场',
  },

  // 天气信息
  weatherInfo: {
    month: '8月',
    temperature: '25-30°C',
    humidity: '70-80%',
    rainfall: '雷雨可能',
    recommendation: '建议携带雨具和防暑用品',
    rainPolicy: '恶劣天气中止(无延期日)',
  },

  // 特色功能
  specialFeatures: {
    scale: '直径约650米三尺玉',
    location: '渡良瀬川河川敷',
    tradition: '20年历史传承',
    atmosphere: '高尔夫球场独特会场',
  },

  // 2025年特别企划
  special2025: {
    theme: '第20回纪念大会',
    concept: '三尺玉与特大宽屏星雷',
    memorial: '20周年纪念演出',
    features: [
      '三尺玉2发特别打上',
      '特大宽屏星雷演出',
      '野村花火工业制作',
      '20周年纪念企划',
    ],
  },

  // 地图嵌入URL
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3227.123!2d139.7045!3d36.1850!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6022169a5b5b5b5b%3A0x5b5b5b5b5b5b5b5b!2z5Y-k5rKz55yM5Y-k5rKz5biC!5e0!3m2!1sja!2sjp!4v1234567890',

  // 月份
  month: 8,

  // 关联推荐
  related: {
    regionRecommendations: [
      {
        id: 'mito-hanabi-2025',
        name: '水戸黄门祭 水戸偕楽园花火大会',
        date: '2025年7月26日',
        location: '水戸市',
        visitors: '约20万人',
        link: '/kitakanto/hanabi/mito-hanabi-2025',
      },
    ],
    timeRecommendations: [
      {
        id: 'ashikaga-hanabi-2025',
        name: '足利花火大会',
        date: '2025年8月2日',
        location: '足利市',
        visitors: '约45万人',
        link: '/kitakanto/hanabi/ashikaga',
      },
    ],
  },

  // 官方数据源
  officialSource: {
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0308e01029/',
    verificationDate: '2025-06-13',
    dataConfirmedBy: 'USER_PROVIDED',
    lastChecked: '2025-06-13',
  },
};
