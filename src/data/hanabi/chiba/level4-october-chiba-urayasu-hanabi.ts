/**
 * Level 5 数据文件 - 第42回浦安市花火大会
 * @layer Level 5 (Detail Data Layer)
 * @category 花火
 * @region 千叶县
 * @date 2024年10月19日
 * @description 在千叶县浦安市举办的花火大会详细数据
 * @source WalkerPlus官方数据 https://hanabi.walkerplus.com/detail/ar0312e00989/
 */

import { HanabiData } from '@/types/hanabi';

export const urayasuHanabiData: HanabiData = {
  id: 'urayasu-42',
  name: '第42回浦安市花火大会',
  _sourceData: {
    japaneseDescription: '第42回浦安市花火大会',
      japaneseName: '第42回浦安市花火大会',
  },
  englishName: '42nd Urayasu City Fireworks Festival',
  year: 2024,
  date: "2024-10-19",
  displayDate: "2024年10月19日",
  time: '18:00～19:00',
  duration: '60分钟',
  fireworksCount: '约6600发',
  expectedVisitors: '约2万人',
  weather: '10月平均气温：最高20℃，最低15℃',
  ticketPrice: '免费观赏（有料席需事前预约）',
  status: 'completed',
  ranking: '千叶县人气花火大会',
  themeColor: 'blue',
  month: 10,

  title: '第42回浦安市花火大会 - 千叶县浦安市花火大会详情',
  description: '在千叶县浦安市举办的第42回花火大会，约6600发花火照亮秋夜天空',

  tags: {
    timeTag: '10月',
    regionTag: '千叶县',
    typeTag: '花火',
    layerTag: 'Layer 5详情数据',
  },

  related: {
    regionRecommendations: [],
    timeRecommendations: [],
  },

  venues: [
    {
      name: '浦安市総合公園',
      location: '千叶县浦安市日的出明海地区',
      startTime: '18:00',
      features: ['東京湾将背景', '約6600発的花火', '秋的夜空演出'],
    },
  ],

  access: [
    {
      venue: '浦安市総合公園',
      stations: [
        {
          name: '新浦安駅',
          lines: ['JR京葉線'],
          walkTime: '徒歩25分',
        },
      ],
    },
  ],

  viewingSpots: [
    {
      name: '浦安市総合公園',
      rating: 5,
      crowdLevel: '高',
      tips: '主要会場在最也迫力的花火将楽',
      pros: ['最高的観覧環境', '設備充実'],
      cons: ['混雑', '有料席要予約'],
    },
    {
      name: '日的出地区海岸',
      rating: 4,
      crowdLevel: '中',
      tips: '東京湾越在花火将眺絶景景点',
      pros: ['絶景', '比較的空着'],
      cons: ['距離的', '設備少的'],
    },
  ],

  history: {
    established: 1983,
    significance: '浦安市的代表的的秋的花火大会作为親着',
    highlights: ['東京湾将背景在了美花火', '地域住民在愛进行伝統行事'],
  },

  tips: [
    {
      category: '服装持物',
      items: ['10月举办的了防寒対策将请不要忘记', '持参推奨'],
    },
    {
      category: '予約',
      items: ['有料席是事前予約制的了早的申込将'],
    },
    {
      category: '交通交通',
      items: ['駐車場是限的了公共交通機関将推奨'],
    },
    {
      category: '観覧的',
      items: ['東京湾的夜景和花火的共演的見这'],
    },
  ],

  contact: {
    organizer: '浦安市商工観光課',
    phone: '047-712-6063',
    website: 'https://www.urayasuhanabi.com/2023/',
    socialMedia: '',
  },

  mapInfo: {
    hasMap: true,
    mapNote: '浦安市総合公園周辺',
    parking: '有料駐車場有（事前予約制）',
  },

  weatherInfo: {
    month: '10月',
    temperature: '最高20℃、最低15℃',
    humidity: '約65%',
    rainfall: '少的',
    recommendation: '防寒対策必須',
    rainPolicy: '恶劣天气時是中止（延期无）',
  },

  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.234567890123!2d139.8947!3d35.6586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z5rWm5a6J5biC57eP5ZCI6YGL5YuV5YWs5ZyS!5e0!3m2!1sja!2sjp!4v1234567890123!5m2!1sja!2sjp',

  website: 'https://www.urayasuhanabi.com/2023/',

  officialSource: {
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0312e00989/',
    verificationDate: '2025-01-15',
    dataConfirmedBy: 'USER_PROVIDED',
    lastChecked: '2025-01-15',
  },
};
