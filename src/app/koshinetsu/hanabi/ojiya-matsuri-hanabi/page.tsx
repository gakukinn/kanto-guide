/**
 * 第四层页面 - 令和7年度 小千谷祭典大花火大会详情
 * @layer 四层 (Detail Layer)
 * @category 花火
 * @region 甲信越
 * @description 令和7年度 小千谷祭典大花火大会的详细信息页面
 * @template HanabiDetailTemplate.tsx
 */

import HanabiDetailTemplate from '../../../../components/HanabiDetailTemplate';
import { Metadata } from 'next';

// 令和7年度 小千谷祭典大花火大会详细数据（基于WalkerPlus官方信息）
const ojiyaMatsuriHanabiData = {
  // 基本信息
  id: 'ojiya-matsuri-hanabi-2025',
  name: '小千谷祭典大花火大会',
  _sourceData: {
    japaneseName: '令和7年度 小千谷祭典大花火大会',
    japaneseDescription: '令和7年度 小千谷祭典大花火大会',
  },
  englishName: 'Ojiya Festival Fireworks Display',
  year: 2024,
  month: 8,

  // 时间信息
  date: '2024年8月24日',
  time: '19:15～21:00',
  duration: '約105分',

  // 花火信息
  fireworksCount: '約7000発',
  expectedVisitors: '約5万人',
  weather: '夏季晴朗',
  ticketPrice: '有料席有（詳細是公式网站在確認请）',
  status: 'scheduled',
  themeColor: 'red',

  // 标签系统
  tags: {
    timeTag: '8月',
    regionTag: '新潟県',
    typeTag: '花火',
    layerTag: 'Layer 4詳細页',
  },

  // 会场信息
  venues: [
    {
      name: '信濃川河川敷',
      location: '新潟県小千谷市',
      startTime: '19:15',
      features: ['河川敷', '大規模花火', '音楽花火'],
    },
  ],

  // 交通信息
  access: [
    {
      venue: '信濃川河川敷',
      stations: [
        {
          name: 'JR小千谷駅',
          lines: ['JR上越線'],
          walkTime: '徒歩10分',
        },
      ],
    },
  ],

  // 观赏地点
  viewingSpots: [
    {
      name: '信濃川河川敷主要会場',
      rating: 5,
      crowdLevel: '非常在混雑',
      tips: '早的場所取的必要是',
      pros: ['最高的視界', '音楽和的同期', '大迫力'],
      cons: ['非常在混雑', '早朝从的場所取必要'],
    },
  ],

  // 历史信息
  history: {
    established: 1950,
    significance: '小千谷市的夏的風物詩作为親伝統的的花火大会',
    highlights: [
      '約7000発的大規模花火',
      '音楽和花火的合作',
      '信濃川将舞台在了美演出',
      '地域的絆将深夏祭',
      '新潟県内在也有数的規模',
    ],
  },

  // 贴士
  tips: [
    {
      category: '観覧的',
      items: [
        '早的場所取将勧（午前中从）',
        '音楽和花火的合作的見这',
        '信濃川的水面在映花火也美',
        '約7000発的大規模花火将楽请',
      ],
    },
    {
      category: '交通交通',
      items: [
        'JR小千谷駅从徒歩10分',
        '関越自動車道小千谷IC从約10分',
        '公共交通機関的利用将勧',
        '当日是交通規制的有',
      ],
    },
    {
      category: '持参推奨品',
      items: [
        '',
        '虫除',
        '飲物軽食',
        '懐中電灯',
        '雨具（天候不良時）',
      ],
    },
  ],

  // 联系信息
  contact: {
    organizer: '小千谷祭典実行委員会',
    phone: '詳細是公式网站在確認请',
    website: 'https://hanabi.walkerplus.com/detail/ar0415e00060/',
    socialMedia: '公式SNS在最新情報将確認请',
  },

  // 地图信息
  mapInfo: {
    hasMap: true,
    mapNote: '信濃川河川敷在開催',
    parking: '臨時駐車場有（有料台数限定）',
  },

  // 天气信息
  weatherInfo: {
    month: '8月',
    temperature: '25-30°C',
    humidity: '70-80%',
    rainfall: '少雨',
    recommendation: '夏的夜空在映花火将楽请',
    rainPolicy: '雨天時是翌日在延期',
    note: '熱中症対策将请不要忘记',
  },

  // 特殊功能
  specialFeatures: {
    scale: '約7000発的大規模花火大会',
    location: '信濃川河川敷',
    tradition: '小千谷市的夏的風物詩',
    atmosphere: '音楽和花火的合作',
  },

  // 2025年特别企划
  special2025: {
    theme: '令和7年度記念',
    concept: '地域的絆将深夏祭',
    features: [
      '約7000発的大規模花火',
      '音楽和花火的合作',
      '信濃川将舞台在了美演出',
      '地域的伝統和革新的融合',
      '家族在楽夏的思出',
    ],
  },

  // 关联推荐
  related: {
    regionRecommendations: [],
    timeRecommendations: [],
  },

  // 媒体内容
  media: [
    {
      type: 'image' as const,
      url: 'https://ms-cache.walkerplus.com/qrcode/hanabi/detail/event/0415/00060.png',
      title: '令和7年度 小千谷祭典大花火大会',
      description: '信濃川河川敷在開催約7000発的大規模花火大会',
    },
  ],

  // 地图嵌入URL（小千谷市信濃川河川敷）
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3141.234!2d138.7947!3d37.3131!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDE4JzQ3LjIiTiAxMzjCsDQ3JzQxLjAiRQ!5e0!3m2!1sja!2sjp!4v1234567890123',

  // 官方数据源验证
  officialSource: {
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0415e00060/',
    verificationDate: '2025-06-14',
    dataConfirmedBy: 'USER_PROVIDED' as const,
    lastChecked: '2025-06-14',
  },
};

// SEO元数据配置
export const metadata: Metadata = {
  title: 'Ojiya Matsuri Hanabi - 甲信越花火大会完整攻略',
  description:
    'Ojiya Matsuri Hanabi花火大会详细指南，2025年举办。精彩花火表演，绝佳观赏地点。包含交通方式、观赏地点、祭典活动等实用信息。',
  keywords: [
    'Ojiya Matsuri Hanabi花火',
    '甲信越花火',
    '花火大会',
    '2025花火',
    '夏季花火',
    '日本祭典',
  ],
  openGraph: {
    title: 'Ojiya Matsuri Hanabi - 甲信越花火大会完整攻略',
    description:
      'Ojiya Matsuri Hanabi花火大会详细指南，2025年举办。精彩花火表演，绝佳观赏地点。包含交通方式、观赏地点、祭典活动等实用信息。...',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.kanto-travel-guide.com/koshinetsu/hanabi/ojiya-matsuri-hanabi',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/hanabi/ojiya-matsuri-hanabi-fireworks.svg',
        width: 1200,
        height: 630,
        alt: 'Ojiya Matsuri Hanabi花火大会',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ojiya Matsuri Hanabi - 甲信越花火大会完整攻略',
    description:
      'Ojiya Matsuri Hanabi花火大会详细指南，2025年举办。精彩花火表演，绝佳观赏地点。包含交通方式、观赏地点、祭典活动等实用信息。...',
    images: ['/images/hanabi/ojiya-matsuri-hanabi-fireworks.svg'],
  },
  alternates: {
    canonical: '/koshinetsu/hanabi/ojiya-matsuri-hanabi',
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

export default function OjiyaMatsuriHanabiDetailTemplate() {
  return (
    <HanabiDetailTemplate
      data={ojiyaMatsuriHanabiData}
      regionKey="koshinetsu"
    />
  );
}

// 静态生成配置
export const dynamic = 'force-static';
export const revalidate = 86400; // 24小时重新验证

