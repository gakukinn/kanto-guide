// 河口湖湖上祭2025详细信息
// 数据来源：Walker Plus官方 https://hanabi.walkerplus.com/detail/ar0419e00681/

import { HanabiData } from '@/types/hanabi';

export const fujiKawaguchiData: HanabiData = {
  id: 'kawaguchiko-kojosai-2025',
  name: '河口湖湖上祭',
  _sourceData: {
    japaneseName: '河口湖湖上祭',

    japaneseDescription: '河口湖湖上祭',
  },
  englishName: 'Kawaguchi Lake Festival',
  title: '河口湖湖上祭 - 山梨县富士河口湖町花火大会详情',
  description:
    '在富士山为背景的河口湖畔举办的湖上祭花火大会，历史悠久，约1万发花火绽放夜空',
  year: 2025,
  date: '2025-08-05',
  displayDate: '2025年8月5日',
  time: '19:45-20:40',
  duration: '约55分钟',
  fireworksCount: '约1万发',
  expectedVisitors: '12万人',
  weather: '夏季',
  ticketPrice: '免费观赏',
  status: '雨天中止',
  themeColor: 'blue',
  month: 8,

  tags: {
    timeTag: '8月',
    regionTag: '甲信越',
    typeTag: '花火',
    layerTag: '详细介绍',
  },

  related: {
    regionRecommendations: [
      {
        id: 'gion-kashiwazaki-matsuri-hanabi',
        name: '祇园柏崎祭海之大花火大会',
        date: '7月26日',
        location: '柏崎市中央海岸',
        visitors: '17万人',
        link: '/july/hanabi/koshinetsu/gion-kashiwazaki-matsuri-hanabi',
      },
      {
        id: 'anime-classics-anisong-hanabi',
        name: '动漫经典动画歌曲花火',
        date: '7月5日',
        location: '富士川生机运动公园',
        visitors: '未公布',
        link: '/july/hanabi/koshinetsu/anime-classics-anisong-hanabi',
      },
      {
        id: 'nagaoka-matsuri-hanabi',
        name: '长冈祭大花火大会',
        date: '8月2日、3日',
        location: '信浓川河川敷',
        visitors: '345000人',
        link: '/august/hanabi/koshinetsu/nagaoka-matsuri-hanabi',
      },
    ],
    timeRecommendations: [],
  },

  venues: [
    {
      name: '河口湖畔船津浜主会场',
      location: '山梨县南都留郡富士河口湖町',
      startTime: '19:45',
      features: ['最佳观赏位置', '富士山背景', '湖畔观赏'],
    },
    {
      name: '河口湖周边观赏区',
      location: '河口湖湖畔各地',
      startTime: '19:45',
      features: ['湖面倒影', '散步观赏', '摄影绝佳'],
    },
  ],

  access: [
    {
      venue: '河口湖畔船津浜',
      stations: [
        {
          name: '河口湖站',
          lines: ['富士急行线'],
          walkTime: '步行约15分钟',
        },
      ],
    },
  ],

  viewingSpots: [
    {
      name: '河口湖畔船津浜主观赏区',
      rating: 5,
      crowdLevel: '较高',
      tips: '最佳观赏位置，建议提前到达占位',
      pros: ['视野开阔', '富士山背景', '距离适中'],
      cons: ['人群较多', '需要提前占位'],
    },
    {
      name: '河口湖畔步道',
      rating: 4,
      crowdLevel: '中等',
      tips: '适合摄影，可拍摄湖面倒影',
      pros: ['湖面倒影', '相对宽敞', '散步观赏'],
      cons: ['距离稍远', '部分角度受阻'],
    },
    {
      name: '河口湖美术馆周边',
      rating: 3,
      crowdLevel: '较低',
      tips: '人少安静，适合家庭观赏',
      pros: ['人少安静', '视角独特', '停车方便'],
      cons: ['距离较远', '花火较小'],
    },
  ],

  history: {
    established: 1917,
    significance:
      '大正6年(1917年)开始的历史悠久花火大会，是富士五湖地区最大规模的夏季花火大会',
    highlights: [
      '富士山为背景的绝美花火',
      '富士五湖地区最大规模花火大会',
      '历史悠久，始于大正6年',
      '音乐剧花火、大型花火等多种花火',
    ],
  },

  tips: [
    {
      category: '交通建议',
      items: [
        '推荐使用公共交通，当日会场周边有交通管制',
        '富士急行河口湖站步行15分钟',
        '中央道河口湖IC约15分钟车程',
        '停车场2500台免费，建议提前到达',
      ],
    },
    {
      category: '观赏建议',
      items: [
        '雄大富士山背景下的约1万发花火',
        '音乐剧花火和大玉连发等多种花火',
        '水面映出的美丽倒影花火',
        '特大连发花火大玉连发等是看点',
      ],
    },
    {
      category: '注意事项',
      items: [
        '雨天中止，建议确认官方信息',
        '夏季蚊虫较多，注意防虫',
        '会场周边有温泉酒店，可安排温泉一日游',
        '当日17:00-22:00交通管制',
      ],
    },
  ],

  contact: {
    organizer: '河口湖观光协会',
    phone: '0555-72-6700',
    website: 'https://fujisan.ne.jp/pages/396/',
    socialMedia: '',
  },

  // 官方数据源验证
  officialSource: {
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0419e00681/',
    verificationDate: '2025-01-13',
    dataConfirmedBy: 'USER_PROVIDED' as const,
    lastChecked: '2025-01-13',
  },

  mapInfo: {
    hasMap: true,
    mapNote: '河口湖畔船津浜（山梨县南都留郡富士河口湖町）',
    parking: '2500台免费\n建议提前到达\n会场周边交通管制17:00-22:00',
  },

  weatherInfo: {
    month: '8月',
    temperature: '夏季适中温度',
    humidity: '湖畔较为舒适',
    rainfall: '夏季雷雨可能',
    recommendation: '建议携带轻薄外套，夜间湖畔较凉',
    rainPolicy: '雨天中止',
    note: '山区天气变化较快，注意天气预报',
  },

  specialFeatures: {
    scale: '约1万发花火，富士五湖地区最大规模',
    location: '富士山为背景的湖畔花火',
    tradition: '大正6年开始的历史悠久花火大会',
    atmosphere: '富士五湖特有的自然氛围',
  },

  special2025: {
    theme: '河口湖夏祭庆典',
    concept: '富士五湖最大花火盛典',
    memorial: '大正6年传承至今的历史花火',
    features: ['特大连发花火', '大玉连发', '音乐剧连发花火', '多种店铺出店'],
  },

  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3256.123!2d138.7634!3d35.5048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60196c4b123456789%3A0x123456789abcdef!2z5rKz5Y+j5rmW!5e0!3m2!1sja!2sjp!4v1234567890123!5m2!1sja!2sjp',
};

export default fujiKawaguchiData;
