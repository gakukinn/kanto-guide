import { HanabiData } from '@/types/hanabi';

export const mitoHanabiData: HanabiData = {
  id: 'mito-hanabi-2025',
  name: '第65回 水戸黄门祭 水戸偕楽园花火大会',
  _sourceData: {
    japaneseDescription: '第65回 水戸黄門祭典 水戸偕楽園花火大会',
      japaneseName: '第65回 水戸黄門祭典 水戸偕楽園花火大会',
  },
  englishName: 'The 65th Mito Komon Festival Kairakuen Fireworks',
  year: 2025,
  date: '2025年7月26日',
  time: '19:30～20:30',
  duration: '约60分钟',
  fireworksCount: '約5000発',
  expectedVisitors: '約20万人',
  weather: '夏季天气',
  ticketPrice: '有料观览席设置',
  status: '确定举办',
  themeColor: '#4A90E2',

  // 页面元数据
  title: '第65回 水戸黄门祭 水戸偕楽园花火大会 | 茨城县水戸市 | 关东旅游指南',
  description:
    '水戸市代表性夏季祭典的花火大会。约5000发花火在千波湖上空绽放，湖面映射美轮美奂。特大音乐烟花压轴演出。2025年7月26日开催。',

  // 标签系统
  tags: {
    timeTag: '7月',
    regionTag: '茨城县',
    typeTag: '花火',
    layerTag: 'Layer 4详情页',
  },

  // 会场信息
  venues: [
    {
      name: '千波公园(千波湖)',
      location: '茨城県水戸市/千波湖畔',
      startTime: '19:30',
      features: ['湖面花火', '倒影观赏', '市中心会场'],
    },
  ],

  // 交通信息
  access: [
    {
      venue: '千波公园',
      stations: [
        {
          name: 'JR水戸站',
          lines: ['JR常磐线', 'JR水郡线', 'JR大洗鹿岛线'],
          walkTime: '南口步行15分钟',
        },
      ],
    },
  ],

  // 观赏地点
  viewingSpots: [
    {
      name: '千波湖畔观览区',
      rating: 4.8,
      crowdLevel: '拥挤',
      tips: '可欣赏湖面倒影花火',
      pros: ['湖面倒影', '视野开阔', '近距离观赏'],
      cons: ['人流密集', '需要占位'],
    },
    {
      name: '有料观览席',
      rating: 4.5,
      crowdLevel: '适中',
      tips: '提前购买确保舒适观赏',
      pros: ['确保席位', '设施完备', '视野佳'],
      cons: ['需要付费', '座位有限'],
    },
  ],

  // 历史背景
  history: {
    established: 1961,
    significance: '水戸黄门祭的重要组成部分，茨城县代表性花火大会',
    highlights: [
      '65年历史传承',
      '水戸市代表性夏季祭典',
      '茨城县人气第4位花火大会',
      '水戸黄门祭典重要活动',
    ],
  },

  // 观赏贴士
  tips: [
    {
      category: '交通贴士',
      items: [
        'JR水戸站南口步行15分钟可达',
        '常磐自动车道水戸IC约20分钟',
        '北关东自动车道水戸南IC约20分钟',
        '大会当日交通管制，建议使用公共交通',
      ],
    },
    {
      category: '观赏贴士',
      items: [
        '湖面倒影花火为大会特色',
        '特大音乐烟花(音乐连发花火)压轴',
        '全国著名花火师创作花火近距离观赏',
        '建议提前到达确保理想观赏位置',
      ],
    },
    {
      category: '会场贴士',
      items: [
        '千波公园为市中心会场，交通便利',
        '设有有料观览席，可提前购买',
        '湖畔区域最佳观赏位置',
        '注意保护环境，垃圾请带回',
      ],
    },
  ],

  // 联系信息
  contact: {
    organizer: '水戸观光会议协会',
    phone: '029-224-0441',
    website: 'https://mitokoumon.com/koumon/',
    socialMedia: '@mitokoumon310',
  },

  // 地图信息
  mapInfo: {
    hasMap: true,
    mapNote: '千波公园(千波湖畔)',
    parking: '周边停车场有限，建议公共交通',
  },

  // 天气信息
  weatherInfo: {
    month: '7月',
    temperature: '24-29°C',
    humidity: '70-85%',
    rainfall: '梅雨季节末期',
    recommendation: '建议携带雨具和防暑用品',
    rainPolicy: '小雨举办，恶劣天气延期至次日',
  },

  // 特色功能
  specialFeatures: {
    scale: '约5000发花火',
    location: '千波湖湖面',
    tradition: '水戸黄门祭传统活动',
    atmosphere: '湖面倒影花火',
    collaboration: '音乐同步演出',
  },

  // 2025年特别企划
  special2025: {
    theme: '第65回纪念大会',
    concept: '传统与现代技术融合',
    memorial: '65周年纪念特别演出',
    features: [
      '特大音乐烟花(音乐连发花火)',
      '湖面倒影花火观赏',
      '全国著名花火师创作花火',
      '音乐同步最新技术演出',
    ],
  },

  // 地图嵌入URL
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3208.123!2d140.44123!3d36.36645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x602222222222222%3A0x1111111111111111!2z5Y2D5rOi5YWs5ZySIOiMqOWfjuecjOawtOaIuOW4guWNg-azouWbveW3nw!5e0!3m2!1sja!2sjp!4v1234567890',

  // 月份
  month: 7,

  // 关联推荐
  related: {
    regionRecommendations: [
      {
        id: 'toride-hanabi-2025',
        name: '第70回 取手利根川大花火',
        date: '2025年8月9日',
        location: '取手市',
        visitors: '约12万人',
        link: '/kitakanto/hanabi/toride-hanabi-2025',
      },
    ],
    timeRecommendations: [
      {
        id: 'tonegawa-hanabi-2025',
        name: '第38回 利根川大花火大会',
        date: '2025年8月2日',
        location: '境町',
        visitors: '约30万人',
        link: '/kitakanto/hanabi/tonegawa-hanabi-2025',
      },
    ],
  },

  // 官方数据源
  officialSource: {
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0308e00896/',
    verificationDate: '2025-06-13',
    dataConfirmedBy: 'USER_PROVIDED',
    lastChecked: '2025-06-13',
  },

  // 数据完整性检查
  dataIntegrityCheck: {
    hasOfficialSource: true,
    userVerified: true,
    lastValidated: '2025-06-13',
  },

  // 官方网站
  website: 'https://mitokoumon.com/koumon/',
};
