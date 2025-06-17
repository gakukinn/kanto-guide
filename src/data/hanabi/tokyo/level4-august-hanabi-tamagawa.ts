import { HanabiData } from '@/types/hanabi';

export const tamagawaHanabiData: HanabiData = {
  id: 'tamagawa-hanabi-2025',
  name: '第48回多摩川花火大会',
  _sourceData: {
    japaneseDescription: '第47回 世田谷区多摩川花火大会',
      japaneseName: '第47回 世田谷区多摩川花火大会',
  },
  englishName: '47th Setagaya Tamagawa Fireworks Festival',
  year: 2025,
  date: '2025年8月16日',
  time: '18:00～19:00',
  duration: '约1小时',
  fireworksCount: '约6000发',
  expectedVisitors: '约30万人',
  weather: '秋季凉爽',
  ticketPrice: '免费观看',
  status: '已确认举办',
  themeColor: '#FF6B6B',
  month: 10,

  tags: {
    timeTag: '10月',
    regionTag: '东京都',
    typeTag: '花火',
    layerTag: 'Layer 4详情页',
  },

  related: {
    regionRecommendations: [
      {
        id: 'sumida-river-hanabi',
        name: '隅田川花火大会',
        date: '2025年7月下旬',
        location: '東京都世田谷区 多摩川河川敷',
        visitors: '约90万人',
        link: '/tokyo/hanabi/sumida',
      },
    ],
    timeRecommendations: [
      {
        id: 'jingu-gaien-hanabi',
        name: '神宫外苑花火大会',
        date: '2025年8月中旬',
        location: '明治神宫外苑',
        visitors: '约100万人',
        link: '/tokyo/hanabi/jingu-gaien',
      },
    ],
  },

  venues: [
    {
      name: '区立二子玉川绿地运动场',
      location: '东京都世田谷区玉川3丁目（二子桥上游）',
      startTime: '18:00',
      features: ['多摩川河畔', '开阔视野', '舞台活动', '食品摊位'],
    },
  ],

  access: [
    {
      venue: '区立二子玉川绿地运动场',
      stations: [
        {
          name: '二子玉川站',
          lines: ['田园都市线', '大井町线'],
          walkTime: '步行15分钟',
        },
      ],
    },
  ],

  viewingSpots: [
    {
      name: '会场内观赏区',
      rating: 5,
      crowdLevel: '高',
      tips: '最佳观赏位置，建议提前到达',
      pros: ['最佳视角', '音响效果佳', '免费'],
      cons: ['人群密集', '需要提前占位'],
    },
    {
      name: '二子玉川公园',
      rating: 4,
      crowdLevel: '中',
      tips: '适合家庭观赏的宽敞区域',
      pros: ['空间较大', '设施完善'],
      cons: ['距离稍远', '视角一般'],
    },
  ],

  history: {
    established: 1978,
    significance: '世田谷区传统秋季花火大会，以多摩川河畔美景闻名',
    highlights: ['秋季特色花火', '历史悠久', '地区代表性活动'],
  },

  tips: [
    {
      category: '观赏准备',
      items: ['携带便携椅子', '准备保暖衣物'],
    },
    {
      category: '交通提醒',
      items: ['建议提前1-2小时到达', '使用公共交通'],
    },
  ],

  contact: {
    organizer: '世田谷区',
    phone: '03-5432-3333',
    website: 'https://www.tamagawa-hanabi.com/',
    socialMedia: '',
  },

  mapInfo: {
    hasMap: true,
    mapNote: '会场位于多摩川沿岸，视野开阔',
    parking: '无专用停车场，建议公共交通',
  },

  weatherInfo: {
    month: '10月',
    temperature: '15-20℃',
    humidity: '中等',
    rainfall: '较少',
    recommendation: '秋季凉爽，建议携带保暖衣物',
    rainPolicy: '雨天顺延至次日同时间举行',
  },

  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.316!2d139.6267!3d35.6125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188c93c5c0f1d%3A0x9c8b4e8f1234567!2z5Yy655Sw6LC35bee5pWo5aC05YW45a2Q546J5bed57iA5Zyw6YGL5YuV5aC0!5e0!3m2!1szh!2sjp!4v1704000000000!5m2!1szh!2sjp',

  officialSource: {
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0313e355272/',
    verificationDate: '2025-01-13',
    dataConfirmedBy: 'USER_PROVIDED',
    lastChecked: '2025-01-13',
  },

  description:
    '秋季夜空中的音与光艺术盛宴。世田谷区传统花火大会，沿多摩川河畔举办，搭配舞台表演和各类美食摊位，为观众带来完整的节庆体验。',
};
