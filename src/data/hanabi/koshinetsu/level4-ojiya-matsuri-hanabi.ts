import { HanabiData } from '../../../types/hanabi';

export const ojiyaMatsuriHanabiData: HanabiData = {
  id: 'ojiya-matsuri-hanabi',
  name: '小千谷祭り花火大会',
  _sourceData: {
    japaneseName: '小千谷祭り花火大会',
    japaneseDescription: '小千谷祭り花火大会',
  },
  englishName: 'Ojiya Festival Fireworks Display',
  year: 2025,
  date: '2025年8月25日',
  time: '19:30～21:00',
  duration: '90分钟',
  fireworksCount: '约4000发',
  expectedVisitors: '约20万人',
  weather: '夏季温暖',
  status: 'scheduled',
  ticketPrice: '免费观赏',
  themeColor: 'orange',
  month: 8,

  title: '小千谷祭り花火大会 - 新潟县小千谷市信濃川花火详情',
  description:
    '2025年8月25日在新潟县小千谷市信濃川河畔举办的小千谷祭り花火大会。约4000发花火照亮夏夜，20万观众共同观赏的传统花火祭典。',

  tags: {
    timeTag: '8月',
    regionTag: '新潟县',
    typeTag: '花火',
    layerTag: 'Layer 4详情页',
  },

  related: {
    regionRecommendations: [],
    timeRecommendations: [],
  },

  venues: [
    {
      name: '信濃川河畔',
      location: '新潟県小千谷市信濃川河畔',
      startTime: '19:30',
      features: [
        '信濃川河畔会场',
        '传统祭典氛围',
        '河川花火的美景',
        '地域文化体验',
      ],
    },
  ],

  access: [
    {
      venue: '信濃川河畔',
      stations: [
        {
          name: '小千谷駅',
          lines: ['JR上越線'],
          walkTime: '步行约10分钟',
        },
      ],
    },
  ],

  viewingSpots: [
    {
      name: '信濃川河畔主会场',
      rating: 4.5,
      crowdLevel: '拥挤',
      tips: '最佳观赏位置，河川花火的绝佳视角',
      pros: ['河川美景', '视野开阔', '祭典氛围'],
      cons: ['人流密集', '需要早到'],
    },
    {
      name: '河川敷上流側',
      rating: 4.0,
      crowdLevel: '中等',
      tips: '相对安静的观赏区域',
      pros: ['人流较少', '自然环境', '拍照绝佳'],
      cons: ['距离稍远', '设施有限'],
    },
  ],

  history: {
    established: 1950,
    significance: '小千谷市传统的夏祭り，体现信濃川流域的文化特色',
    highlights: [
      '信濃川河畔的美丽会场',
      '小千谷市夏季代表活动',
      '传统祭典与花火的结合',
      '地域密着型的文化活动',
    ],
  },

  tips: [
    {
      category: '观赏建议',
      items: [
        '18:30前到达确保好位置',
        '河畔夜晚较凉，建议携带外套',
        '可以体验传统祭典文化',
      ],
    },
    {
      category: '交通建议',
      items: [
        'JR上越線小千谷駅最为便利',
        '当日会有临时交通管制',
        '停车场有限，建议公共交通',
      ],
    },
    {
      category: '特色体验',
      items: ['信濃川河畔的自然美景', '传统祭典的文化体验', '地方美食和特产'],
    },
  ],

  contact: {
    organizer: '小千谷市観光協会',
    phone: '0258-83-3512',
    website: 'https://www.city.ojiya.niigata.jp/',
    socialMedia: '',
  },

  mapInfo: {
    hasMap: true,
    mapNote: '新潟県小千谷市信濃川河畔',
    parking: '臨時駐車場有り（無料）',
  },

  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3201.4!2d138.7967!3d37.3123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDE4JzQ0LjMiTiAxMzjCsDQ3JzQ4LjEiRQ!5e0!3m2!1sja!2sjp!4v1000000000000!5m2!1sja!2sjp',

  weatherInfo: {
    month: '8月',
    temperature: '25-32°C',
    humidity: '70%',
    rainfall: '夏季雷雨可能',
    recommendation: '夏季温暖，河畔夜晚较凉爽',
    rainPolicy: '小雨決行，荒天中止',
    note: '河畔风较大，注意保暖',
  },

  media: [
    {
      type: 'image',
      url: '/images/hanabi/ojiya-matsuri-1.jpg',
      title: '小千谷祭り花火大会',
      description: '信濃川河畔绽放的传统花火',
    },
  ],
};
