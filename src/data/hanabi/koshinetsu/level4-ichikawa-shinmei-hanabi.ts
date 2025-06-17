import { HanabiData } from '../../../types/hanabi';

export const ichikawaShinmeiHanabiData: HanabiData = {
  id: 'ichikawa-shinmei-hanabi-2024',
  name: '市川三郷町故乡夏日祭 第37届神明花火大会',
  _sourceData: {
    japaneseName: '市川三郷町ふるさと夏まつり　第37回「神明の花火大会」',
    japaneseDescription: '市川三郷町ふるさと夏まつり　第37回「神明の花火大会」',
  },
  englishName:
    'Ichikawamisato Furusato Summer Festival 37th Shinmei Fireworks Festival',
  year: 2025,
  date: '2025年8月7日',
  time: '19:30~21:00',
  duration: '约90分钟',
  fireworksCount: '约20,000发',
  expectedVisitors: '200000人',
  weather: '夏季高温，建议防暑',
  status: 'scheduled',
  ticketPrice: '免费观赏',
  themeColor: 'red',
  month: 8,

  title: '市川三郷町故乡夏日祭 第37届神明花火大会 - 2025年甲信越花火完整攻略',
  description:
    '市川三郷町故乡夏日祭第37届神明花火大会是山梨县最具代表性的花火大会之一。约20,000发花火的壮观规模，连续90分钟精彩表演，免费观赏的大型花火盛典。',

  tags: {
    timeTag: '8月',
    regionTag: '山梨县',
    typeTag: '花火',
    layerTag: 'Layer 4详情页',
  },

  related: {
    regionRecommendations: [
      {
        id: 'kawaguchiko-kojosai-2025',
        name: '河口湖湖上祭花火大会',
        date: '2025年8月5日',
        location: '河口湖畔',
        visitors: '约10万人',
        link: '/koshinetsu/hanabi/kawaguchiko-kojosai-2025',
      },
    ],
    timeRecommendations: [
      {
        id: 'nagaoka-hanabi-2025',
        name: '长冈祭大花火大会',
        date: '2025年8月2日-3日',
        location: '新潟县长冈市',
        visitors: '约100万人',
        link: '/koshinetsu/hanabi/nagaoka',
      },
    ],
  },

  media: [
    {
      type: 'image',
      url: '/images/hanabi/ichikawa-shinmei/ichikawa-shinmei-main.jpg',
      title: '市川三郷町故乡夏日祭 第37届神明花火大会',
      description: '约20,000发花火照亮山梨夜空的壮观盛典',
    },
    {
      type: 'image',
      url: '/images/hanabi/ichikawa-shinmei/ichikawa-shinmei-venue.jpg',
      title: '神明花火大会会场',
      description: '市川三郷町中心区域的观赏会场',
    },
  ],

  history: {
    established: 1988,
    significance: '市川三郷町的传统夏日祭典，已有37年历史',
    highlights: [
      '山梨县代表性花火大会',
      '关东地区知名度高',
      '免费观赏传统',
      '约20,000发花火的大规模演出',
      '90分钟连续精彩表演',
    ],
  },

  venues: [
    {
      name: '神明花火大会会场',
      location: '山梨县西八代郡市川三郷町',
      startTime: '19:30',
      features: ['免费观赏', '大型停车场', '临时设施'],
    },
  ],

  access: [
    {
      venue: '神明花火大会会场',
      stations: [
        {
          name: '市川大门站',
          lines: ['JR身延线'],
          walkTime: '步行约15分钟',
        },
      ],
    },
  ],

  mapInfo: {
    hasMap: true,
    mapNote: '会场位于市川三郷町中心区域',
    parking: '有临时停车场\n约3000台\n免费',
  },

  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3277.5!2d138.4897!3d35.6581!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDM5JzI5LjIiTiAxMznCsDI5JzIzLjAiRQ!5e0!3m2!1sja!2sjp!4v1618000000000!5m2!1sja!2sjp',

  viewingSpots: [
    {
      name: '会场正面观赏区',
      rating: 5,
      crowdLevel: '非常拥挤',
      tips: '建议提前2小时到达占位',
      pros: ['最佳观赏角度', '完整视野', '免费观赏'],
      cons: ['人流密集', '需要长时间等待'],
    },
  ],

  contact: {
    organizer: '市川三郷町观光协会',
    phone: '055-272-1101',
    website: 'https://www.town.ichikawamisato.yamanashi.jp/',
    socialMedia: '',
  },

  weatherInfo: {
    month: '8月',
    temperature: '最高32°C，最低24°C',
    humidity: '70-80%',
    rainfall: '夏季雷雨可能',
    rainPolicy: '小雨举行，大雨中止',
    note: '请提前确认天气预报',
    recommendation: '建议携带雨具和防暑用品',
  },

  tips: [
    {
      category: '交通建议',
      items: ['建议使用公共交通', '有免费接驳巴士', '避开高峰时段'],
    },
    {
      category: '观赏建议',
      items: ['携带防暑用品', '准备雨具', '提前占位'],
    },
    {
      category: '特色体验',
      items: [
        '体验山梨县传统花火文化',
        '欣赏约20,000发花火的壮观演出',
        '享受90分钟连续精彩表演',
        '感受市川三郷町的夏日祭典氛围',
      ],
    },
  ],
};
