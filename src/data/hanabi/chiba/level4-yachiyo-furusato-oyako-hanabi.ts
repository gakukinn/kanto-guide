import { HanabiData } from '../../../types/hanabi';

export const yachiyoFurusatoOyakoHanabiData: HanabiData = {
  id: 'yachiyo-furusato-oyako-matsuri-50',
  name: '第50回八千代故乡亲子祭',
  _sourceData: {
    japaneseName: '第50回八千代ふるさと親子祭',
    japaneseDescription: '第50回八千代ふるさと親子祭',
  },
  englishName: '50th Yachiyo Hometown Parent-Child Festival',
  year: 2024,
  date: '2024年8月24日(周六)',
  time: '19:30~20:30',
  duration: '约60分钟',
  fireworksCount: '约8,888发',
  expectedVisitors: '约20万人',
  weather: '夏季晴朗',
  status: 'scheduled',
  ticketPrice: '免费观赏',
  themeColor: 'blue',
  month: 8,

  title: '第50回八千代故乡亲子祭 - 2024年千叶花火大会完整攻略',
  description:
    '第50回八千代故乡亲子祭是千叶县八千代市传统夏日祭典，2024年8月24日在县立八千代广域公园举行，8888发花火照亮夜空，免费观赏的亲子祭典。',

  tags: {
    timeTag: '8月',
    regionTag: '千叶县',
    typeTag: '花火',
    layerTag: 'Layer 4详情页',
  },

  related: {
    regionRecommendations: [
      {
        id: 'makuhari-beach-hanabi-2025',
        name: '幕张海滩花火节2025',
        date: '2025年8月2日',
        location: '幕张海滨公园',
        visitors: '30万人',
        link: '/chiba/hanabi/makuhari-beach-hanabi',
      },
      {
        id: 'ichikawa-41',
        name: '第41回市川市民纳凉花火大会',
        date: '2025年8月2日',
        location: '江户川河川敷',
        visitors: '49万人',
        link: '/chiba/hanabi/ichikawa',
      },
      {
        id: 'teganuma-hanabi-2025',
        name: '手贺沼花火大会2025',
        date: '2025年8月2日',
        location: '柏市手贺沼',
        visitors: '48万人',
        link: '/chiba/hanabi/teganuma',
      },
    ],
    timeRecommendations: [
      {
        id: 'sumida-river-hanabi-2024',
        name: '隅田川花火大会',
        date: '2024年7月27日',
        location: '隅田川河畔',
        visitors: '100万人',
        link: '/tokyo/hanabi/sumida',
      },
      {
        id: 'edogawa-hanabi-2024',
        name: '江户川区花火大会',
        date: '2024年8月3日',
        location: '江户川河川敷',
        visitors: '90万人',
        link: '/tokyo/hanabi/edogawa',
      },
    ],
  },

  media: [
    {
      type: 'image',
      url: '/images/hanabi/yachiyo-furusato/yachiyo-furusato-main.jpg',
      title: '第50回八千代故乡亲子祭花火大会',
      description: '8888发花火照亮八千代夜空的温馨盛典',
    },
    {
      type: 'image',
      url: '/images/hanabi/yachiyo-furusato/yachiyo-venue.jpg',
      title: '县立八千代广域公园会场',
      description: '宽阔的观赏会场，适合家庭观赏',
    },
  ],

  history: {
    established: 1975,
    significance:
      '八千代故乡亲子祭是八千代市最具代表性的夏季祭典，体现亲子和睦与地区团结精神',
    highlights: [
      '第50回纪念特别演出',
      '8888发花火的吉祥寓意',
      '近50年的悠久历史传统',
      '千叶县重要的亲子祭典文化',
    ],
  },

  venues: [
    {
      name: '县立八千代广域公园',
      location: '八千代市饭绳5-3',
      startTime: '19:30',
      features: ['广阔观赏区域', '免费入场', '家庭友好'],
    },
    {
      name: '村上桥周边',
      location: '八千代市村上周边',
      startTime: '19:30',
      features: ['河畔观赏', '良好视野', '停车便利'],
    },
  ],

  access: [
    {
      venue: '县立八千代广域公园',
      stations: [
        {
          name: '胜田台站',
          lines: ['京成本线', '东叶高速线'],
          walkTime: '步行20分钟',
        },
        {
          name: '八千代台站',
          lines: ['京成本线'],
          walkTime: '步行25分钟',
        },
      ],
    },
  ],

  mapInfo: {
    hasMap: true,
    mapNote: '位于县立八千代广域公园，从胜田台站可步行到达',
    parking: '临时停车场约1000台，建议提前到达确保停车位',
  },

  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.2!2d140.1089!3d35.7234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDQzJzI0LjIiTiAxNDDCsDA2JzMyLjAiRQ!5e0!3m2!1sja!2sjp!4v1618000000000!5m2!1sja!2sjp',

  viewingSpots: [
    {
      name: '县立八千代广域公园主会场',
      rating: 5,
      crowdLevel: '中等',
      tips: '建议提前1小时到达，选择公园北侧位置观赏效果最佳',
      pros: ['最佳观赏角度', '免费观赏', '设施完善'],
      cons: ['人群较多', '需要早到占位'],
    },
    {
      name: '村上桥河畔观赏区',
      rating: 4,
      crowdLevel: '较少',
      tips: '适合喜欢安静环境的观众，河畔风景优美',
      pros: ['人群相对较少', '河畔风景', '停车方便'],
      cons: ['距离稍远', '设施较少'],
    },
  ],

  contact: {
    organizer: '八千代故乡亲子祭实行委员会',
    phone: '047-483-1151',
    website: 'https://www.city.yachiyo.lg.jp/',
    socialMedia: '',
  },

  weatherInfo: {
    month: '8月',
    temperature: '25-30°C',
    humidity: '70-80%',
    rainfall: '中等',
    rainPolicy: '小雨决行，恶劣天气时延期或中止',
    note: '夏季夜晚，建议携带防虫喷雾和轻便外套',
    recommendation:
      '建议准备野餐垫、饮用水和防虫用品，现场人员较多请注意儿童安全',
  },

  tips: [
    {
      category: '交通',
      items: [
        '京成本线胜田台站下车，可选择步行20分钟或乘坐临时接驳巴士',
        '建议提前查询临时巴士时刻表',
      ],
    },
    {
      category: '观赏',
      items: [
        '县立八千代广域公园北侧区域视野最佳',
        '建议18:30前到达确保理想观赏位置',
      ],
    },
    {
      category: '停车',
      items: [
        '临时停车场约1000台，建议17:00前到达',
        '周边道路会有交通管制，请配合工作人员指导',
      ],
    },
    {
      category: '设施',
      items: [
        '会场设有临时洗手间、小食摊位',
        '建议自备野餐垫和饮用水，现场也有便当和饮料销售',
      ],
    },
  ],
};
