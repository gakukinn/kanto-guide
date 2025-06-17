/**
 * 第四层页面 - 第13回沼田花火大会详情
 * @layer 四层 (Detail Layer)
 * @category 花火详情
 * @region 北关东 - 群馬県
 * @description 沼田花火大会的完整详情信息，包括花火规模、观赏地点、交通指南等
 * @template HanabiDetailTemplate.tsx
 * @dataSource WalkerPlus官方数据 (https://hanabi.walkerplus.com/detail/ar0310e40188/)
 */

import HanabiDetailTemplate from '../../../../components/HanabiDetailTemplate';
import { Metadata } from 'next';

// 第13回沼田花火大会详细数据（基于WalkerPlus官方信息）
const numataHanabiDetailData = {
  id: 'numata-hanabi-2025',
  name: '第13回 沼田花火大会',
  _sourceData: {
    japaneseName: '第13回 沼田花火大会',
    japaneseDescription: '第13回 沼田花火大会',
  },
  englishName: 'The 13th Numata Fireworks Festival',
  year: 2025,
  date: '2025年9月13日',
  time: '19:45',
  duration: '约80分钟',
  fireworksCount: '約3000発',
  expectedVisitors: '約9万人',
  weather: '8月山间温度适宜',
  ticketPrice: '免费观赏',
  status: 'scheduled',
  themeColor: 'green',
  month: 8,

  // 标签系统
  tags: {
    timeTag: '8月',
    regionTag: '群馬县',
    typeTag: '花火',
    layerTag: 'Layer 4详情页',
  },

  // 关联推荐
  related: {
    regionRecommendations: [],
    timeRecommendations: [],
  },

  // 会场信息
  venues: [
    {
      name: '利根川河川敷主要会場',
      location: '群馬県沼田市/沼田市運動公園',
      startTime: '19:45',
      features: ['河川花火', '桟敷席设置', '临时设施完备'],
    },
  ],

  // 交通指南
  access: [
    {
      venue: '利根川河川敷',
      stations: [
        {
          name: 'JR沼田駅',
          lines: ['JR上越線'],
          walkTime: '徒歩約20分',
        },
      ],
    },
  ],

  // 观赏地点推荐
  viewingSpots: [
    {
      name: '利根川河川敷主要会場',
      rating: 5,
      crowdLevel: '非常拥挤',
      tips: '最佳观赏位置，设有桟敷席',
      pros: ['正面观赏', '桟敷席设置', '临时设施完备'],
      cons: ['人流密集', '需要早到占位'],
    },
    {
      name: '河川敷上流側',
      rating: 4,
      crowdLevel: '中等拥挤',
      tips: '自由观赏区域，视野开阔',
      pros: ['自由席', '河川美景', '静的環境'],
      cons: ['距离稍远', '設施簡易'],
    },
    {
      name: '対岸观赏区域',
      rating: 3,
      crowdLevel: '轻度拥挤',
      tips: '河川对岸观赏地点',
      pros: ['距離適中', '混雑回避', '写真撮影向'],
      cons: ['需要车辆', '视野角度'],
    },
  ],

  // 历史信息
  history: {
    established: 2013,
    significance: '群馬県北部地域最大的花火大会',
    highlights: [
      '約7,000発的花火',
      '利根川河川敷的美会場',
      '群馬県北部的自然環境',
      '地域密着型的花火大会',
    ],
  },

  // 实用建议
  tips: [
    {
      category: '观赏建议',
      items: [
        '建议16:30前到达确保好位置',
        '河川敷在足元注意',
        '夜間是気温下降，携带外套',
      ],
    },
    {
      category: '交通建议',
      items: [
        '当日18:00起部分道路实施交通管制',
        '建议乘坐公共交通',
        '臨時駐車場約1500台，16:30前到达',
      ],
    },
    {
      category: '注意事项',
      items: [
        '是必持帰',
        '河川敷在的是禁止',
        '请以沼田市公式网站信息为准',
      ],
    },
  ],

  // 联系信息
  contact: {
    organizer: '沼田市観光協会',
    phone: '0278-25-8555',
    website: 'https://www.city.numata.gunma.jp/',
    socialMedia: '',
  },

  // 地图信息
  mapInfo: {
    hasMap: true,
    mapNote: '利根川河川敷主要会場',
    parking: '臨時駐車場約1500台（無料）。16:30以降混雑予想，早的来场推奨。',
  },

  // 天气信息
  weatherInfo: {
    month: '8月',
    temperature: '18-28℃',
    humidity: '70%',
    rainfall: '少雨',
    recommendation: '山间夜晚温度较低，请携带外套',
    rainPolicy: '小雨決行，荒天中止',
    note: '山間部在昼夜温差大',
  },

  // 媒体信息
  media: [
    {
      type: 'image' as const,
      url: '/images/kitakanto/hanabi/numata-hanabi-river.jpg',
      title: '利根川河川敷从見沼田花火大会',
      description: '美利根川将背景在打上的約7,000発的花火',
    },
    {
      type: 'image' as const,
      url: '/images/kitakanto/hanabi/numata-hanabi-mountains.jpg',
      title: '山々在響沼田花火大会的终章',
      description: '群馬県北部的自然豊的環境在楽花火的饗宴',
    },
  ],

  // 地图嵌入URL
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3228.123!2d139.0428!3d36.6461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDM4JzQ2LjAiTiAxMznCsDAyJzM0LjEiRQ!5e0!3m2!1sja!2sjp!4v1000000000000!5m2!1sja!2sjp',

  // 官方数据源验证
  officialSource: {
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0310e40188/',
    verificationDate: '2025-01-15',
    dataConfirmedBy: 'USER_PROVIDED' as const,
    lastChecked: '2025-01-15',
  },
};

// SEO元数据配置
export const metadata: Metadata = {
  title: 'Numata Hanabi 2025 - 北关东花火大会完整攻略',
  description:
    'Numata Hanabi 2025花火大会详细指南，2025年举办。精彩花火表演，绝佳观赏地点。包含交通方式、观赏地点、祭典活动等实用信息。',
  keywords: [
    'Numata Hanabi 2025花火',
    '北关东花火',
    '花火大会',
    '2025花火',
    '夏季花火',
    '日本祭典',
  ],
  openGraph: {
    title: 'Numata Hanabi 2025 - 北关东花火大会完整攻略',
    description:
      'Numata Hanabi 2025花火大会详细指南，2025年举办。精彩花火表演，绝佳观赏地点。包含交通方式、观赏地点、祭典活动等实用信息。...',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.kanto-travel-guide.com/kitakanto/hanabi/numata-hanabi-2025',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/hanabi/numata-hanabi-2025-fireworks.svg',
        width: 1200,
        height: 630,
        alt: 'Numata Hanabi 2025花火大会',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Numata Hanabi 2025 - 北关东花火大会完整攻略',
    description:
      'Numata Hanabi 2025花火大会详细指南，2025年举办。精彩花火表演，绝佳观赏地点。包含交通方式、观赏地点、祭典活动等实用信息。...',
    images: ['/images/hanabi/numata-hanabi-2025-fireworks.svg'],
  },
  alternates: {
    canonical: '/kitakanto/hanabi/numata-hanabi-2025',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function NumataHanabiDetailTemplate() {
  return (
    <HanabiDetailTemplate data={numataHanabiDetailData} regionKey="kitakanto" />
  );
}

// 静态生成配置
export const dynamic = 'force-static';
export const revalidate = 86400; // 24小时重新验证

