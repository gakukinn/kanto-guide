/**
 * 第五层数据文件 - 东京竞马场花火2025数据
 * @layer 五层 (Detail Layer)
 * @month 7月
 * @region 东京
 * @event 东京竞马场花火2025
 * @type 花火详情数据
 * @source Walker Plus官方数据
 * @description 包含完整的花火详细信息：基本信息、会场信息、交通指南、观赏攻略等
 */
import { HanabiData } from '@/types/hanabi';

export const keibajoData: HanabiData = {
  id: 'tokyo-keibajo-hanabi',
  name: '东京竞马场花火 2025 〜花火与J-POP BEST〜',
  _sourceData: {
    japaneseDescription:
      'Tokyo Racecourse Fireworks 2025 〜花火和聴了 J-POP BEST〜',
    japaneseName: 'Tokyo Racecourse Fireworks 2025 〜花火和聴了 J-POP BEST〜',
  },
  englishName: 'Tokyo Racecourse Fireworks 2025 - J-POP BEST',
  year: 2025,
  date: '2025-07-02',
  displayDate: '2025年7月2日',
  time: '19:30开始',
  duration: '70分钟',
  fireworksCount: '约14000发',
  expectedVisitors: '非公表',
  weather: '7月',
  ticketPrice: '有料席',
  status: '确定开催',
  themeColor: 'purple',
  month: 7,

  tags: {
    timeTag: '7月',
    regionTag: '东京',
    typeTag: '花火',
    layerTag: '详细介绍',
  },

  venues: [
    {
      name: 'JRA东京竞马场',
      location: '東京都府中市 JRA東京競馬場',
      startTime: '17:00开场，19:30花火开始',
      features: [
        '全席指定席制',
        '观览席距离花火仅100米',
        '音乐与花火完美同步',
        'J-POP主题演出',
      ],
    },
  ],

  access: [
    {
      venue: 'JRA东京竞马场',
      stations: [
        {
          name: '府中竞马正门前站',
          lines: ['京王线'],
          walkTime: '步行约2分钟',
        },
        {
          name: '东府中站',
          lines: ['京王线'],
          walkTime: '步行约10分钟',
        },
        {
          name: '府中本町站',
          lines: ['JR南武线', 'JR武藏野线'],
          walkTime: '步行约15分钟',
        },
      ],
    },
  ],

  viewingSpots: [
    {
      name: '高级席位',
      rating: 5,
      crowdLevel: 'Controlled',
      tips: '最佳观赏体验，专用设施完备',
      pros: ['专用入场口', '专用洗手间', '专用饮料区', '最佳视角'],
      cons: ['价格最高(11000円)', '需提前预约'],
    },
    {
      name: '座位票S席',
      rating: 4,
      crowdLevel: 'Controlled',
      tips: '性价比较高的指定席位',
      pros: ['指定座席', '视野良好', '相对实惠'],
      cons: ['需购票(8800円)', '距离稍远'],
    },
    {
      name: '座位票A席',
      rating: 4,
      crowdLevel: 'Controlled',
      tips: '经济实惠的指定席选择',
      pros: ['指定座席', '完整体验', '价格合理'],
      cons: ['需购票(7700円)', '视角一般'],
    },
    {
      name: '草坪区域票',
      rating: 3,
      crowdLevel: 'Medium',
      tips: '最多4名观赏，含野餐垫配发',
      pros: ['空间自由', '适合家庭', '野餐垫提供'],
      cons: ['需购票(35000円)', '距离较远'],
    },
  ],

  history: {
    established: 2018,
    significance: '日本最高峰的花火娱乐体验',
    highlights: [
      '东京都人气排名第1位',
      '观览席距离花火仅100米的震撼体验',
      '音乐与花火完美同步的艺术表演',
      '2025年主题：J-POP BEST昭和100年纪念',
    ],
  },

  tips: [
    {
      category: '时间安排',
      items: [
        '17:00开场，建议提前到达',
        '19:30花火正式开始，20:40结束',
        '终演后有规制退场，请耐心等待',
        '当日12:00通过官网和SNS发表开催决定',
      ],
    },
    {
      category: '必备物品',
      items: [
        '门票（全席指定席制）',
        '身份证件确认',
        '轻便雨具（夏季天气变化）',
        '舒适的观赏服装',
        '充电宝和手机',
      ],
    },
    {
      category: '观赏建议',
      items: [
        '感受J-POP与花火的完美融合',
        '体验观览席100米距离的震撼',
        '聆听昭和100年纪念名曲',
        '享受全席指定席的舒适观赏',
      ],
    },
    {
      category: '交通贴士',
      items: [
        '强烈推荐京王线府中竞马正门前站',
        '避免自驾，会场无停车场',
        '终演后电车可能拥挤',
        '提前确认末班车时间',
      ],
    },
  ],

  contact: {
    organizer: '东京竞马场花火实行委员会',
    phone: '03-3962-8881',
    website: 'https://hanabitokyo.com/',
    socialMedia: '@tokyokeibajo_hanabi',
  },
  // 官方数据源验证
  officialSource: {
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0313e436729/',
    verificationDate: '2025-01-13',
    dataConfirmedBy: 'USER_PROVIDED' as const,
    lastChecked: '2025-01-13',
  },

  mapInfo: {
    hasMap: true,
    mapNote: 'JRA东京竞马场详细地图',
    parking: '× 会场无停车场，请使用公共交通',
  },

  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.123456789!2d139.4812345!3d35.6656789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018f123456789ab%3A0x123456789abcdef0!2z5p2x5Lqs56uL6LSs5aC0!5e0!3m2!1szh-CN!2sjp!4v1698836200000!5m2!1szh-CN!2sjp',

  weatherInfo: {
    month: '7月',
    temperature: '25-30°C',
    humidity: '70-80%',
    rainfall: '中等',
    recommendation: '夏季炎热，建议携带防暑用品和雨具',
    rainPolicy: '雨天决行，恶劣天气时中止',
  },

  specialFeatures: {
    scale: '1万4000发、70分钟',
    location: 'JRA东京竞马场',
    tradition: '日本最高峰花火娱乐',
    atmosphere: 'J-POP音乐花火盛典',
    collaboration: '2025年主题：昭和100年纪念',
  },

  special2025: {
    theme: 'J-POP BEST',
    concept: '昭和100年纪念，誰也知名曲与花火共演',
    memorial: '昭和100年特别企划',
    features: [
      '约2公里競馬場舞台大規模花火',
      '音楽和同步花火演出',
      '観覧席从100米的至近距離',
      '全席指定席鑑賞',
    ],
  },

  media: [
    {
      type: 'image',
      url: '/images/tokyo/hanabi/keibajo/xinrumingyue_imagine_prompt_A_high-resolution_photograph_of_a_3dcfd8d4-709a-4c41-8c90-32cb53103215_0.png',
      title: '东京竞马场花火 2025 - 主会场夜景',
      description: 'JRA东京竞马场的绚烂花火表演，J-POP音乐与花火的完美融合',
    },
    {
      type: 'image',
      url: '/images/tokyo/hanabi/keibajo/xinrumingyue_imagine_prompt_A_high-resolution_photograph_of_a_3dcfd8d4-709a-4c41-8c90-32cb53103215_1.png',
      title: '东京竞马场花火 2025 - 观赏体验',
      description: '距离仅100米的震撼观赏体验，全席指定席的舒适环境',
    },
    {
      type: 'image',
      url: '/images/tokyo/hanabi/keibajo/xinrumingyue_imagine_prompt_A_high-resolution_photograph_of_a_3dcfd8d4-709a-4c41-8c90-32cb53103215_2.png',
      title: '东京竞马场花火 2025 - 花火盛典',
      description: '昭和100年纪念特别企划，约1万4000发花火的壮观表演',
    },
    {
      type: 'image',
      url: '/images/tokyo/hanabi/keibajo/xinrumingyue_imagine_prompt_A_high-resolution_photograph_of_a_3dcfd8d4-709a-4c41-8c90-32cb53103215_3.png',
      title: '东京竞马场花火 2025 - 特别演出',
      description: '昭和100年纪念J-POP BEST特别演出，音乐与花火的艺术结合',
    },
  ],

  related: {
    regionRecommendations: [
      {
        id: 'katsushika-noryo-hanabi',
        name: '第59回葛饰纳凉花火大会',
        date: '2025-07-22',
        location: '葛饰区',
        visitors: '约77万人',
        link: '/july/hanabi/tokyo/katsushika',
      },
      {
        id: 'sumida',
        name: '第48回隅田川花火大会',
        date: '2025-07-26',
        location: '墨田区',
        visitors: '约91万人',
        link: '/july/hanabi/tokyo/sumida',
      },
      {
        id: 'tachikawa-showa-kinen-hanabi',
        name: '立川昭和纪念公园花火大会',
        date: '2025-07-26',
        location: '立川市',
        visitors: '32万人',
        link: '/july/hanabi/tokyo/tachikawa',
      },
    ],
    timeRecommendations: [
      {
        id: 'kamakura-hanabi',
        name: '第77回镰仓花火大会',
        date: '2025-07-18',
        location: '神奈川县镰仓市',
        visitors: '约16万人',
        link: '/july/hanabi/kanagawa/kamakura',
      },
      {
        id: 'yokohama-nightflowers',
        name: '横滨夜间花火2025',
        date: '2025-07-05',
        location: '神奈川县横滨市',
        visitors: '约3万人',
        link: '/july/hanabi/kanagawa/nightflowers',
      },
      {
        id: 'futtsu-hanabi',
        name: '富津市民花火大会',
        date: '2025-07-26',
        location: '千叶县富津市',
        visitors: '约5万人',
        link: '/july/hanabi/chiba/futtsu',
      },
    ],
  },
};
