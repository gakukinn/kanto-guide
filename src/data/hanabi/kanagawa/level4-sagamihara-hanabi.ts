import { HanabiData } from '../../../types/hanabi';

export const sagamiharaHanabiData: HanabiData = {
  id: 'sagamihara-hanabi',
  name: '相模原花火大会',
  _sourceData: {
    japaneseName: '相模原花火大会',
    japaneseDescription: '相模原花火大会',
  },
  englishName: 'Sagamihara Fireworks Festival',
  year: 2025,
  date: '2025年8月16日',
  time: '19:00～20:30',
  duration: '90分钟',
  fireworksCount: '约8000发',
  expectedVisitors: '約20万人',
  weather: '夏季，炎热',
  status: 'scheduled',
  ticketPrice: '免费观赏',
  themeColor: 'green',
  month: 8,

  title: '相模原花火大会 - 2025年相模川花火完整攻略',
  description:
    '相模原花火大会详细指南，2025年8月16日举办。在相模川河畔欣赏夏季花火，约8000发花火的盛大表演，包含交通方式、观赏地点等实用信息。',

  tags: {
    timeTag: '8月',
    regionTag: '神奈川县',
    typeTag: '花火',
    layerTag: 'Layer 4详情页',
  },

  related: {
    regionRecommendations: [],
    timeRecommendations: [],
  },

  media: [
    {
      type: 'image',
      url: '/images/hanabi/sagamihara/sagamihara-main.jpg',
      title: '相模原花火大会主会场',
      description: '相模川河畔绚烂绽放的花火',
    },
    {
      type: 'image',
      url: '/images/hanabi/sagamihara/sagamihara-river.jpg',
      title: '相模川花火观赏',
      description: '河川敷上的最佳观赏位置',
    },
  ],

  history: {
    established: 1951,
    significance: '相模原市的夏季传统活动，相模川流域的代表性花火大会',
    highlights: [
      '自1951年开始举办的传统花火大会',
      '在相模川河畔举办的河川花火',
      '约8000发花火的盛大规模',
      '相模原市民夏季的重要活动',
      '90分钟的长时间花火表演',
    ],
  },

  venues: [
    {
      name: '相模川河川敷',
      location: '神奈川県相模原市中央区水郷田名',
      startTime: '19:00',
      features: [
        '河川花火表演',
        '宽广的观赏空间',
        '免费观赏区域',
        '长时间花火表演',
      ],
    },
  ],

  access: [
    {
      venue: '相模川河川敷',
      stations: [
        {
          name: '上溝站',
          lines: ['JR相模线'],
          walkTime: '步行约15分钟',
        },
        {
          name: '番田站',
          lines: ['JR相模线'],
          walkTime: '步行约20分钟',
        },
      ],
    },
  ],

  mapInfo: {
    hasMap: true,
    mapNote: '神奈川県相模原市中央区水郷田名',
    parking: '临时停车场设置\n建议使用公共交通',
  },

  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3244.8!2d139.3644!3d35.5756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDM0JzMyLjIiTiAxMznCsDIxJzUxLjgiRQ!5e0!3m2!1sja!2sjp!4v1618000000000!5m2!1sja!2sjp',

  viewingSpots: [
    {
      name: '相模川河川敷（右岸）',
      rating: 4.5,
      crowdLevel: '拥挤',
      tips: '最佳观赏位置，建议提前占位',
      pros: ['绝佳视野', '距离适中', '免费观赏'],
      cons: ['人流众多', '需要提前占位'],
    },
    {
      name: '相模川河川敷（左岸）',
      rating: 4.0,
      crowdLevel: '中等',
      tips: '相对宽松的观赏位置',
      pros: ['人流较少', '视野良好', '停车便利'],
      cons: ['距离稍远', '设施较少'],
    },
    {
      name: '田名向原公园',
      rating: 3.5,
      crowdLevel: '较少',
      tips: '公园内观赏，适合家庭',
      pros: ['环境舒适', '设施完善', '适合家庭'],
      cons: ['距离较远', '视野可能受限'],
    },
  ],

  contact: {
    organizer: '相模原市观光协会',
    phone: '042-771-5800',
    website: 'https://www.sagamihara-kanko.jp/',
    socialMedia: '@sagamihara_city',
  },

  weatherInfo: {
    month: '8月',
    temperature: '26-32°C',
    humidity: '70-80%',
    rainfall: '夏季雷雨可能',
    rainPolicy: '恶劣天气中止',
    note: '夏季炎热，河川敷较为凉爽',
    recommendation:
      '夏季炎热，建议做好防暑措施，携带充足水分。河川敷晚间较为凉爽，但仍需注意防晒。关注天气预报，避免雷雨天气。',
  },

  tips: [
    {
      category: '观赏建议',
      items: [
        '18:00前到达河川敷占位',
        '夏季炎热，注意防暑降温',
        '携带折叠椅和野餐垫',
        '90分钟长时间表演，可准备零食',
      ],
    },
    {
      category: '交通建议',
      items: ['JR相模线直达', '设有临时停车场', '花火结束后人流较多'],
    },
    {
      category: '特色体验',
      items: [
        '体验河川花火的魅力',
        '欣赏长达90分钟的表演',
        '感受相模原市民的夏季传统',
        '在河川敷享受野餐乐趣',
      ],
    },
  ],
};
