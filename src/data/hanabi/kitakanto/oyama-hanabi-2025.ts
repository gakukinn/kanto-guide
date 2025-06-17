// 第73回 小山的花火详细信息
// 数据来源：WalkerPlus官方 https://hanabi.walkerplus.com/detail/ar0309e00890/
// 官方数据验证：2025年6月13日

import { HanabiData } from '@/types/hanabi';

export const oyamaHanabi2025Data: HanabiData = {
  id: 'oyama-hanabi-2025',
  name: '第73回 小山花火大会',
  _sourceData: {
    japaneseDescription: '第73回 小山的花火',
      japaneseName: '第73回 小山的花火',
  },
  englishName: 'The 73rd Oyama Fireworks Festival',
  year: 2025,
  date: '2025年9月23日',
  time: '18:30～20:30',
  duration: '约2小时',
  fireworksCount: '約2万発',
  expectedVisitors: '約43万人',
  weather: '秋季',
  ticketPrice: '有料席1000円～30000円',
  status: 'confirmed',
  themeColor: 'gold',
  month: 7,

  tags: {
    timeTag: '9月',
    regionTag: '北关东',
    typeTag: '花火',
    layerTag: '详细介绍',
  },

  related: {
    regionRecommendations: [
      {
        id: 'kitakanto-september-01',
        name: '利根川大花火大会',
        date: '9月13日',
        location: '栃木県小山市/観晃橋下流思川河畔',
        visitors: '约30万人',
        link: '/kitakanto/hanabi/tonegawa-daihana',
      },
      {
        id: 'kitakanto-september-02',
        name: '第109回 足利花火大会',
        date: '8月2日',
        location: '渡良瀬川田中桥下流',
        visitors: '约45万人',
        link: '/kitakanto/hanabi/ashikaga',
      },
      {
        id: 'kitakanto-september-03',
        name: '真岡市夏祭大花火大会',
        date: '7月26日',
        location: '真岡市役所东侧五行川沿岸',
        visitors: '约17万人',
        link: '/kitakanto/hanabi/moka',
      },
    ],
    timeRecommendations: [],
  },

  venues: [
    {
      name: '观晃桥下流 思川河畔',
      location: '栃木县小山市观晃桥下流 思川河畔',
      startTime: '18:30',
      features: [
        '清流思川河畔举办',
        '关东有数规模的花火大会',
        '小山市制70周年纪念',
        '新增无人机演出500机',
      ],
    },
  ],

  access: [
    {
      venue: '会场',
      stations: [
        {
          name: 'JR小山駅西口',
          lines: ['JR东北新干线', 'JR宇都宫线', 'JR水户线'],
          walkTime: '徒步8分',
        },
      ],
    },
  ],

  viewingSpots: [
    {
      name: '有料观览席',
      rating: 5,
      crowdLevel: '预约制',
      tips: '多种席位类型，从1000円到30000円',
      pros: ['距离近迫力十足', '座位保证', '视野极佳', '避免拥挤'],
      cons: ['需要付费', '需提前预约', '热门席位快速售罄'],
    },
    {
      name: '无料观览区域',
      rating: 3,
      crowdLevel: '非常拥挤',
      tips: '白鸥大学侧等区域设有无料观览区',
      pros: ['免费观赏', '氛围热烈'],
      cons: ['非常拥挤', '需要早到占位', '视野可能受限'],
    },
  ],

  history: {
    established: 1953,
    significance: '栃木县小山市的代表性花火大会，拥有73年历史传统',
    highlights: [
      '第73回历史传承',
      '小山市制70周年纪念特别企划',
      '清流思川河畔的关东有数规模花火大会',
      '新增无人机演出「无人机表演」500机夜空绘画',
    ],
  },

  tips: [
    {
      category: '交通建议',
      items: [
        'JR小山駅西口徒步8分钟到会场',
        '无停车场，强烈建议使用公共交通',
        '新干线宇都宫线水户线均可到达小山駅',
        '大会当日车站周边及会场非常拥挤，请预留充足时间',
      ],
    },
    {
      category: '观赏建议',
      items: [
        '有料席位从1000円到30000円不等，建议提前购买',
        '无料观览区域会非常拥挤，需要早到占位',
        '注意70周年纪念特别企划内容',
        '新增无人机演出500机是重点观赏内容',
      ],
    },
    {
      category: '注意事项',
      items: [
        '雨天决行、恶劣天气時中止',
        '会场设有饮食摊位（市役所第3停车场等）',
        '9月下旬气温较凉，建议携带外套',
        '约43万人参加，请注意人群安全',
      ],
    },
  ],

  contact: {
    organizer: '小山夏季节庆2024実行委員会',
    phone: '0285-22-9273',
    website: 'https://www.oyamanohanabi.com/',
    socialMedia: '@oyama_hanabi',
  },

  // 官方数据源验证
  officialSource: {
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0309e00890/',
    verificationDate: '2025-06-13',
    dataConfirmedBy: 'USER_PROVIDED' as const,
    lastChecked: '2025-06-13',
  },

  mapInfo: {
    hasMap: true,
    mapNote: '栃木县小山市观晃桥下流 思川河畔',
    parking: '无停车场\n请使用公共交通前往',
  },

  // 谷歌地图嵌入URL - 小山市观晃桥下流思川河畔
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3234.2!2d139.8056!3d36.3145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x601f47c8d8e1c7%3A0x1c8e8d8e8d8e8d8e!2z5bCP5bGx5biC6Kaz5pmD5qmL5LiL5rWB5oCd5bed5rKz55Wt!5e0!3m2!1sja!2sjp!4v1634567890123!5m2!1sja!2sjp',

  weatherInfo: {
    month: '9月',
    temperature: '秋季温和',
    humidity: '适中',
    rainfall: '秋季少雨',
    recommendation: '9月下旬气温较凉，建议携带外套',
    rainPolicy: '雨天决行、恶劣天气時中止',
    note: '秋季夜晚较凉，请注意保暖',
  },

  specialFeatures: {
    scale: '约2万发花火，关东地区有数规模',
    location: '清流思川河畔举办，视野开阔',
    tradition: '73年历史的栃木县代表性花火大会',
    atmosphere: '小山市制70周年纪念特别企划',
  },

  special2025: {
    theme: '小山市制70周年纪念',
    concept:
      '小山夏季节庆2024「天在願将 希望的花火！～make history～」',
    memorial: '市制70周年特别纪念',
    features: [
      '约2万发花火的华丽规模',
      '新增无人机演出「无人机表演」500机',
      '清流思川河畔的关东有数规模',
      '多种有料观览席完善设置',
      '天在願将 希望的花火主题演出',
    ],
  },

  media: [
    {
      type: 'image' as const,
      url: '/images/hanabi/oyama-hanabi-main.svg',
      title: '第73回 小山花火大会',
      description:
        '栃木县小山市举办的传统花火大会，清流思川河畔的关东有数规模演出',
    },
  ],
};
