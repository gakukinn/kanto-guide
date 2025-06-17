import { HanabiData } from '../../../types/hanabi';

export const sayamaTanabataHanabiData: HanabiData = {
  id: 'sayama-tanabata-hanabi',
  name: '狭山市入間川七夕祭り花火大会',
  _sourceData: {
    japaneseName: '狭山市入間川七夕祭り花火大会',
    japaneseDescription: '狭山市入間川七夕祭り花火大会',
  },
  englishName: 'Sayama Iruma River Tanabata Festival Fireworks',
  year: 2025,
  date: '2025年8月2日(土)',
  time: '19:30～20:30',
  duration: '60分钟',
  fireworksCount: '约3000发',
  expectedVisitors: '约15万人',
  weather: '夏季炎热',
  status: 'scheduled',
  ticketPrice: '免费观赏',
  themeColor: 'purple',
  month: 8,

  title: '狭山市入間川七夕祭り花火大会 - 埼玉县狭山市入间川七夕花火详情',
  description:
    '2025年8月2日在埼玉县狭山市入間川河川敷举办的七夕祭り花火大会。约3000发花火照亮夏夜，结合七夕传统文化的特色花火祭典。',

  tags: {
    timeTag: '8月',
    regionTag: '埼玉县',
    typeTag: '花火',
    layerTag: 'Layer 4详情页',
  },

  related: {
    regionRecommendations: [],
    timeRecommendations: [],
  },

  venues: [
    {
      name: '入間川河川敷',
      location: '埼玉県狭山市入間川河川敷',
      startTime: '19:30',
      features: [
        '河川敷会场',
        '七夕装饰与花火的结合',
        '传统祭典氛围',
        '家族向け活动',
      ],
    },
  ],

  access: [
    {
      venue: '入間川河川敷',
      stations: [
        {
          name: '狭山市駅',
          lines: ['西武新宿線'],
          walkTime: '步行约15分钟',
        },
        {
          name: '新狭山駅',
          lines: ['西武新宿線'],
          walkTime: '步行约20分钟',
        },
      ],
    },
  ],

  viewingSpots: [
    {
      name: '入間川河川敷主会场',
      rating: 4.5,
      crowdLevel: '拥挤',
      tips: '最佳观赏位置，建议提前到达',
      pros: ['距离近', '视野开阔', '祭典氛围浓厚'],
      cons: ['人流密集', '需要早到占位'],
    },
    {
      name: '河川敷上流側',
      rating: 4.0,
      crowdLevel: '中等',
      tips: '相对人少的观赏区域',
      pros: ['人流较少', '安静环境', '适合家族'],
      cons: ['距离稍远', '设施简单'],
    },
  ],

  history: {
    established: 1985,
    significance: '狭山市传统的七夕祭り与花火的结合，体现地方文化特色',
    highlights: [
      '七夕装饰与花火的美丽结合',
      '狭山市夏季代表性活动',
      '入間川河川敷的自然环境',
      '地域密着型的传统祭典',
    ],
  },

  tips: [
    {
      category: '观赏建议',
      items: [
        '18:00前到达确保好位置',
        '可以同时欣赏七夕装饰',
        '适合全家一起参加',
      ],
    },
    {
      category: '交通建议',
      items: [
        '建议使用西武新宿線',
        '当日会有交通管制',
        '停车场有限，建议电车出行',
      ],
    },
    {
      category: '特色体验',
      items: ['七夕祭り的传统文化体验', '各种摊位和美食', '适合拍照留念'],
    },
  ],

  contact: {
    organizer: '狭山市観光協会',
    phone: '04-2953-1111',
    website: 'https://www.city.sayama.saitama.jp/',
    socialMedia: '',
  },

  mapInfo: {
    hasMap: true,
    mapNote: '埼玉県狭山市入間川河川敷',
    parking: '臨時駐車場有り（数量限定）',
  },

  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3235.2!2d139.4123!3d35.8567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDUxJzI0LjEiTiAxMznCsDI0JzQ0LjMiRQ!5e0!3m2!1sja!2sjp!4v1000000000000!5m2!1sja!2sjp',

  weatherInfo: {
    month: '8月',
    temperature: '28-35°C',
    humidity: '75%',
    rainfall: '夏季雷雨可能',
    recommendation: '夏季炎热，注意防暑降温',
    rainPolicy: '小雨決行，荒天中止',
    note: '河川敷夜晚较凉爽',
  },

  media: [
    {
      type: 'image',
      url: '/images/hanabi/sayama-tanabata-1.jpg',
      title: '狭山市入間川七夕祭り花火大会',
      description: '七夕装饰与花火的美丽结合',
    },
  ],
};
