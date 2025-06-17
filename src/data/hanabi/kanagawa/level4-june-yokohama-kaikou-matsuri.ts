import { HanabiData } from '@/types/hanabi';

export const yokohamaKaikouMatsuriData: HanabiData = {
  id: 'yokohama-kaikou-matsuri',
  name: '第43回横滨开港祭',
  _sourceData: {
    japaneseDescription: '第43回横滨开港祭',
      japaneseName: '第43回横滨开港祭',
  },
  englishName: '43rd Yokohama Port Opening Festival',
  year: 2025,
  date: '2025年6月1日-2日',
  time: '19:20~20:00',
  duration: '约40分钟',
  fireworksCount: '约6000发',
  expectedVisitors: '约75万人',
  weather: '初夏晴朗',
  ticketPrice: '免费观赏',
  status: '确定举办',
  themeColor: '#4FC3F7',
  month: 6,

  tags: {
    timeTag: '6月',
    regionTag: '神奈川',
    typeTag: '花火',
    layerTag: 'Layer 4详情页',
  },

  venues: [
    {
      name: '未来港21地区',
      location: '神奈川县横滨市西区未来港21',
      startTime: '19:20',
      features: ['海上花火', '都市夜景', '未来港景观', '交通便利'],
    },
  ],

  access: [
    {
      venue: '未来港21地区',
      stations: [
        {
          name: '桜木町站',
          lines: ['JR根岸线', 'JR京浜东北线', '横滨市营地下铁蓝线'],
          walkTime: '步行10分钟',
        },
        {
          name: '未来港未来站',
          lines: ['未来港未来线'],
          walkTime: '步行5分钟',
        },
        {
          name: '马车道站',
          lines: ['未来港未来线', '横滨市营地下铁蓝线'],
          walkTime: '步行8分钟',
        },
      ],
    },
  ],

  viewingSpots: [
    {
      name: '红砖仓库周边',
      rating: 5,
      crowdLevel: '极高',
      tips: '最佳观赏位置，需要提前占位',
      pros: ['绝佳视角', '历史建筑背景', '设施完善'],
      cons: ['人群极多', '需要早到'],
    },
    {
      name: '象鼻公园',
      rating: 4.8,
      crowdLevel: '极高',
      tips: '海边观赏的经典位置',
      pros: ['海景视角', '开阔视野', '象征性地点'],
      cons: ['非常拥挤', '风较大'],
    },
    {
      name: '未来港中央大道',
      rating: 4.5,
      crowdLevel: '高',
      tips: '沿路都有观赏点',
      pros: ['选择多样', '交通便利', '美食丰富'],
      cons: ['视角受限', '部分位置收费'],
    },
  ],

  history: {
    established: 1983,
    significance: '纪念横滨开港的重要祭典，横滨最大的市民节庆',
    highlights: [
      '43年历史的传统祭典',
      '横滨开港纪念的重要活动',
      '关东地区最大规模的市民祭典之一',
      '海上花火与都市夜景的完美结合',
    ],
  },

  tips: [
    {
      category: '观赏建议',
      items: [
        '6000发花火与横滨港湾夜景的梦幻组合',
        '建议提前3-4小时到达确保观赏位置',
        '携带防风外套，海边风较大',
        '注意防晒，白天活动较多',
      ],
    },
    {
      category: '交通提示',
      items: [
        '多条线路可达，建议分散使用不同车站',
        '节庆期间周边道路会交通管制',
        '建议使用公共交通，停车场有限',
        '返程时各站都会非常拥挤',
      ],
    },
    {
      category: '节庆体验',
      items: [
        '白天有各种舞台表演和活动',
        '红砖仓库和象鼻公园都有特色摊位',
        '可以体验横滨的历史文化',
        '未来港21地区的现代都市魅力',
      ],
    },
    {
      category: '安全须知',
      items: [
        '恶劣天气时花火可能中止',
        '人流极大，注意人身安全',
        '海边注意防风防寒',
        '遵守会场规则和工作人员指导',
      ],
    },
  ],

  contact: {
    organizer: '横滨开港祭协会',
    phone: '045-681-6040',
    website: 'https://www.kaikosai.com/',
    socialMedia: '@yokohama_kaikosai',
  },

  mapInfo: {
    hasMap: true,
    mapNote: '未来港21地区，多个观赏点可选',
    parking: '周边停车场有限，建议公共交通',
  },

  weatherInfo: {
    month: '6月上旬',
    temperature: '20-25℃',
    humidity: '65-75%',
    rainfall: '梅雨前期，偶有阵雨',
    recommendation: '初夏服装，携带轻便雨具和防风外套',
    rainPolicy: '恶劣天气时花火中止',
    note: '海边较为凉爽，注意保暖',
  },

  specialFeatures: {
    scale: '横滨最大的市民祭典',
    location: '未来港21的现代都市海景',
    tradition: '43年历史的开港纪念祭典',
    atmosphere: '国际都市的现代祭典',
  },

  special2025: {
    theme: '第43回纪念',
    concept: '开港精神的传承与未来',
    features: [
      '6000发海上花火的壮观演出',
      '40分钟精彩连续节目',
      '横滨港湾的绝美夜景背景',
      '国际都市的现代祭典体验',
    ],
  },

  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3250.1!2d139.6917!3d35.4530!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60185ce6dbe22349%3A0x3b9b3b3b3b3b3b3b!2z5pyq5p2l5riv!5e0!3m2!1sja!2sjp!4v1234567890123!5m2!1sja!2sjp',

  officialSource: {
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0314e00851/',
    verificationDate: '2025-01-16',
    dataConfirmedBy: 'USER_PROVIDED',
    lastChecked: '2025-01-16',
  },

  description:
    '横滨最大的市民祭典，纪念横滨开港的重要节庆。在未来港21地区举办，6000发海上花火与现代都市夜景交相辉映，吸引约75万人参与，是感受横滨国际都市魅力的绝佳机会。',

  related: {
    regionRecommendations: [
      {
        id: 'kanazawa-matsuri-hanabi-2025',
        name: '金沢祭典花火大会',
        date: '2025-08-23',
        location: '横滨市金沢区',
        visitors: '约20万人',
        link: '/kanagawa/hanabi/kanazawa-matsuri',
      },
    ],
    timeRecommendations: [
      {
        id: 'sagamiko-hanabi-2025',
        name: '相模湖花火大会',
        date: '2025-08-01',
        location: '相模原市',
        visitors: '约15万人',
        link: '/kanagawa/hanabi/sagamiko',
      },
    ],
  },
};
