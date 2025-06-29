/**
 * 第四层详情页面 - 三社祭
 * @layer 四层 (Detail Layer)
 * @category 祭典
 * @region 东京
 * @description 浅草最大规模的传统祭典三社祭的详细信息页面
 */

const sanjaMatsuriDetail = {
  // 基本信息
  id: 'sanja-matsuri',
  name: '三社祭',
  _sourceData: {
    japaneseDescription: '三社祭',
      japaneseName: '三社祭',
  },
  englishName: 'Sanja Matsuri',

  // 时间地点
  date: '2025年5月17日',
  dates: '2025年5月17-18日',
  startDate: '2025-05-17',
  endDate: '2025-05-18',
  duration: '2天',

  // 地理信息
  location: '浅草神社',
  venue: '浅草神社（台东区浅草2-3-1）',
  address: '東京都台東区浅草2-3-1',
  prefecture: '东京都',
  region: 'tokyo',

  // 活动详情
  description:
    '浅草最大规模的传统祭典，以勇壮的神轿担抬和热烈的祭典氛围闻名。每年吸引数十万游客参与，是体验江户文化的绝佳机会。',
  fullDescription:
    '三社祭是浅草神社的年度例大祭，起源于江户时代初期，已有约400年历史。祭典最大的特色是勇壮的神轿担抬，约100座神轿在浅草一带游行，气势雄壮。与神田祭、山王祭合称为江户三大祭，但三社祭以其热烈奔放的氛围和市民参与度最高而独树一帜。',

  // 特色亮点
  highlights: ['🎌 浅草代表', '💪 勇壮神轿', '🎯 年度盛典', '🎊 传统舞蹈'],
  features: ['勇壮神轿担抬', '热烈祭典氛围', '江户文化体验', '市民参与度高'],

  // 规模信息
  expectedVisitors: 180000,
  scale: '大型',
  category: '神社祭典',
  type: '传统祭典',

  // 联系信息
  website: 'https://www.asakusajinja.jp/',
  phone: '03-3844-1575',
  socialMedia: '@asakusajinja',

  // 活动日程
  schedule: [
    {
      date: '2025年5月17日',
      events: [
        { time: '06:00', activity: '大行列' },
        { time: '14:00', activity: '各町神轿联合渡御' },
        { time: '15:00', activity: '更舞奉納' },
        { time: '16:00', activity: '白鹭的舞奉納' },
      ],
    },
    {
      date: '2025年5月18日',
      events: [
        { time: '06:00', activity: '宮出' },
        { time: '10:00', activity: '各町神轿渡御' },
        { time: '15:00', activity: '宮入' },
        { time: '19:00', activity: '还御' },
      ],
    },
  ],

  // 交通信息
  access: {
    train: [
      '東京地铁銀座線 浅草駅 徒歩7分',
      '都営地下鉄浅草線 浅草駅 A4出口 徒歩7分',
      '東武 浅草駅 徒歩7分',
      '如果 浅草駅 徒歩10分',
    ],
    car: '首都高速6号向島線 駒形IC',
    parking: '周辺临时停车场开放',
  },

  // 费用信息
  cost: {
    admission: '免费',
    parking: '临时停车场 1日1000日元',
    food: '仲見世通美食 300-2000日元',
  },

  // 注意事项
  notes: [
    '神轿渡御期间交通管制严格',
    '人流极其密集，注意安全',
    '建议穿着舒适的鞋子',
    '可在仲見世通品尝传统小食',
  ],

  // SEO和元数据
  meta: {
    title: '三社祭 - 浅草最大祭典 | 东京传统祭典指南',
    description:
      '三社祭是浅草神社的年度盛大祭典，以勇壮的神轿担抬和热烈氛围闻名。浅草三社祭的完整攻略，包含时间安排、观赏地点、交通指南等。',
    keywords: [
      '三社祭',
      '浅草祭典',
      '浅草神社',
      '神轿担抬',
      '江户三大祭',
      '东京祭典',
    ],
  },

  // 相关活动推荐
  relatedEvents: [
    {
      id: 'kanda-matsuri',
      name: '神田祭',
      date: '2025年5月10-11日',
      link: '/tokyo/matsuri/kanda',
    },
    {
      id: 'sensoji-hozuki-ichi',
      name: '浅草寺酸浆市',
      date: '2025年7月9-10日',
      link: '/tokyo/matsuri/hozuki-ichi',
    },
  ],

  // 图片资源
  images: [
    {
      url: '/images/matsuri/sanja-matsuri-1.jpg',
      alt: '三社祭神轿担抬',
      caption: '勇壮的神轿担抬是三社祭最大看点',
    },
    {
      url: '/images/matsuri/sanja-matsuri-2.jpg',
      alt: '浅草神社境内',
      caption: '浅草神社境内的热烈祭典氛围',
    },
  ],

  // 观赏要点
  viewingTips: [
    {
      location: '浅草神社境内',
      bestTime: '宮出宮入时间',
      description: '最接近感受神轿威力的地点',
    },
    {
      location: '仲見世通',
      bestTime: '神轿渡御时间',
      description: '传统商店街与祭典的完美结合',
    },
    {
      location: '雷門前',
      bestTime: '大行列时间',
      description: '浅草象征性景点前的庄严仪式',
    },
  ],

  // 更新信息
  lastUpdated: '2025-06-14',
  dataSource: '浅草神社公式网站',
  verified: true,
  priority: '最高',
};

export default sanjaMatsuriDetail;
