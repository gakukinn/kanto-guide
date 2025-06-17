/**
 * 第五层数据文件 - 第47回 世田谷区多摩川花火大会
 * @layer 五层 (Detail Layer)
 * @region 东京
 * @event 第47回 世田谷区多摩川花火大会
 * @type 花火详情数据
 */
import { HanabiData } from '@/types/hanabi';

export const hanabiData: HanabiData = {
  id: 'setagaya-tamagawa-47',
  name: '第47回 世田谷区多摩川花火大会',
  _sourceData: {
    japaneseDescription: '第47回 世田谷区多摩川花火大会',
      japaneseName: '第47回 世田谷区多摩川花火大会',
  },
  englishName: '47th Setagaya Tamagawa Fireworks Festival',
  title: '第47回世田谷区多摩川花火大会 - 东京都世田谷区花火大会详情',
  description: '在多摩川河畔举办的世田谷区传统花火大会，约6000发花火点亮秋夜',
  year: 2025,
  date: "2025-10-04",
  displayDate: "2025年10月4日",
  time: '19:00开始',
  duration: '90分钟',
  fireworksCount: '约6000发',
  expectedVisitors: '约31万人',
  weather: '夏季',
  ticketPrice: '免费观赏',
  status: '确定开催',
  themeColor: 'blue',
  month: 10,

  tags: {
    timeTag: '10月',
    regionTag: '东京',
    typeTag: '花火',
    layerTag: '详细介绍',
  },

  venues: [
    {
      name: '東京都世田谷区 二子玉川緑地運動場',
      location: '東京都世田谷区 区立二子玉川緑地運動場(二子橋上流)',
      startTime: '19:00开始',
      features: ['传统花火', '夏日祭典', '免费观赏'],
    },
  ],

  access: [
    {
      venue: '東京都世田谷区 二子玉川緑地運動場',
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
  ],

  history: {
    established: 1978,
    significance: '世田谷区传统花火大会，以多摩川河畔美景闻名',
    highlights: ['传统花火', '地区代表性活动'],
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

  related: {
    regionRecommendations: [],
    timeRecommendations: [],
  },

  contact: {
    organizer: '第47回 世田谷区多摩川花火大会实行委员会',
    phone: '03-5432-3333',
    website: 'https://tamagawa-hanabi.com/',
    socialMedia: '',
  },

  mapInfo: {
    hasMap: true,
    mapNote: '東京都世田谷区 二子玉川緑地運動場',
    parking: '请使用公共交通',
  },

  weatherInfo: {
    month: '10月',
    temperature: '25-30°C',
    humidity: '70-80%',
    rainfall: '中等',
    recommendation: '建议携带防暑用品',
    rainPolicy: '雨天决行，恶劣天气时中止',
  },

  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.316789012345!2d139.6267123!3d35.6125456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188c93c5c0f1d%3A0x9c8b4e8f1234567!2z5LqM5a2Q546J5ben57iA5Zyw6YGL5YuV5aC0!5e0!3m2!1szh!2sjp!4v1704000000000!5m2!1szh!2sjp',

  officialSource: {
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0313e355272/',
    verificationDate: '2025-01-13',
    dataConfirmedBy: 'USER_PROVIDED',
    lastChecked: '2025-01-13',
  },
};

export default hanabiData;
