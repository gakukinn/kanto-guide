/**
 * 第四层详情页面 - 神田祭
 * @layer 四层 (Detail Layer)
 * @category 祭典
 * @region 东京
 * @description 江户三大祭之一神田祭的详细信息页面
 */

const kandaMatsuriDetail = {
  // 基本信息
  id: 'kanda-matsuri',
  name: '神田祭',
  _sourceData: {
    japaneseDescription: '神田祭',
      japaneseName: '神田祭',
  },
  englishName: 'Kanda Matsuri',

  // 时间地点
  date: '2025年5月10日',
  dates: '2025年5月10-11日',
  startDate: '2025-05-10',
  endDate: '2025-05-11',
  duration: '2天',

  // 地理信息
  location: '神田明神',
  venue: '神田明神（千代田区外神田2-16-2）',
  address: '東京都千代田区外神田2-16-2',
  prefecture: '东京都',
  region: 'tokyo',

  // 活动详情
  description:
    '江户三大祭典之一，神田明神举办的传统祭典，展现江户时代的庄严仪式。每两年举办一次的盛大祭典，以神轿巡行和传统表演著称。',
  fullDescription:
    '神田祭是江户三大祭典之一，始于江户时代，具有400多年的历史传统。作为神田明神的例大祭，每两年举办一次的本祭以其盛大的神轿巡行和庄严的神道仪式闻名。祭典期间，约100座神轿从神田明神出发，穿过东京都心，展现江户文化的深厚底蕴。',

  // 特色亮点
  highlights: ['⛩️ 江户三大祭', '🎌 将军上覧', '🏮 神轿巡行', '🎯 两年一度'],
  features: ['江户三大祭之一', '神轿巡行', '传统神道仪式', '历史文化体验'],

  // 规模信息
  expectedVisitors: 300000,
  scale: '大型',
  category: '神社祭典',
  type: '传统祭典',

  // 联系信息
  website: 'https://www.kandamyoujin.or.jp/',
  phone: '03-3254-0753',
  socialMedia: '@kandamyoujin',

  // 活动日程
  schedule: [
    {
      date: '2025年5月10日',
      events: [
        { time: '08:00', activity: '神幸祭準備' },
        { time: '10:00', activity: '神幸祭出発式' },
        { time: '11:00', activity: '神轿巡行开始' },
        { time: '15:00', activity: '附祭' },
        { time: '18:00', activity: '神轿帰還' },
      ],
    },
    {
      date: '2025年5月11日',
      events: [
        { time: '09:00', activity: '神轿入宮' },
        { time: '10:00', activity: '例大祭执行' },
        { time: '14:00', activity: '神轿宮入' },
        { time: '16:00', activity: '奉納芸能' },
      ],
    },
  ],

  // 交通信息
  access: {
    train: [
      'JR中央線総武線 御茶水駅 聖橋口徒歩5分',
      '東京地铁丸内線 御茶水駅 1番出口徒歩5分',
      '東京地铁千代田線 新御茶水駅 B1出口徒歩5分',
    ],
    car: '首都高速都心環状線 神田橋IC錦町IC',
    parking: '周辺有料停车场',
  },

  // 费用信息
  cost: {
    admission: '免费',
    parking: '周边收费停车场 30分钟200-300日元',
    food: '祭典美食摊位 500-1500日元',
  },

  // 注意事项
  notes: [
    '神轿巡行路线可能造成交通管制',
    '祭典期间人流密集，请注意安全',
    '建议提前查看当年具体日程安排',
    '本祭为两年一度，2025年为本祭年',
  ],

  // SEO和元数据
  meta: {
    title: '神田祭 - 江户三大祭之一 | 东京传统祭典指南',
    description:
      '神田祭是江户三大祭典之一，每两年举办的盛大神轿巡行活动。神田明神例大祭的完整攻略，包含日程、交通、观赏要点等详细信息。',
    keywords: [
      '神田祭',
      '江户三大祭',
      '神田明神',
      '神轿巡行',
      '东京祭典',
      '传统文化',
    ],
  },

  // 相关活动推荐
  relatedEvents: [
    {
      id: 'sanja-matsuri',
      name: '三社祭',
      date: '2025年5月17-18日',
      link: '/tokyo/matsuri/sanja',
    },
    {
      id: 'sanno-matsuri',
      name: '山王祭',
      date: '2025年6月7-17日',
      link: '/tokyo/matsuri/sanno',
    },
  ],

  // 图片资源
  images: [
    {
      url: '/images/matsuri/kanda-matsuri-1.jpg',
      alt: '神田祭神轿巡行',
      caption: '神田祭的盛大神轿巡行场面',
    },
    {
      url: '/images/matsuri/kanda-matsuri-2.jpg',
      alt: '神田明神境内',
      caption: '神田明神本殿在祭典仪式',
    },
  ],

  // 更新信息
  lastUpdated: '2025-06-14',
  dataSource: '神田明神公式网站',
  verified: true,
  priority: '最高',
};

export default kandaMatsuriDetail;
