import MatsuriPageTemplate from '@/components/MatsuriPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    '神奈川传统祭典2025 - 镰仓祭湘南平塚七夕祭小田原梅祭等神奈川祭典完整攻略',
  description:
    '神奈川县2025年传统祭典完整指南，体验镰仓祭的古都文化、湘南平塚七夕祭的海滨风情、小田原梅祭的早春美景等15个精彩传统活动。提供详细的举办时间、观赏地点、历史文化背景、交通方式，感受湘南地区千年文化传承的精髓，探索神奈川独特的祭典魅力与海洋文化之美。',
  keywords: [
    '神奈川传统祭典',
    '镰仓祭',
    '湘南平塚七夕祭',
    '小田原梅祭',
    '神奈川祭典',
    '古都祭典',
    '海滨祭典',
    '梅祭',
    '2025祭典',
    '关东祭典',
    '神奈川旅游',
    '日本传统文化',
    '湘南地区祭典',
    '海洋文化',
    '文化传承',
  ],
  openGraph: {
    title:
      '神奈川传统祭典2025 - 镰仓祭湘南平塚七夕祭小田原梅祭等神奈川祭典完整攻略',
    description:
      '神奈川县2025年传统祭典完整指南，镰仓祭、湘南平塚七夕祭、小田原梅祭等15个精彩活动等您来体验。感受湘南地区千年文化传承的精髓。',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.kanto-travel-guide.com/kanagawa/matsuri',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/matsuri/kanagawa-matsuri.svg',
        width: 1200,
        height: 630,
        alt: '神奈川传统祭典',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      '神奈川传统祭典2025 - 镰仓祭湘南平塚七夕祭小田原梅祭等神奈川祭典完整攻略',
    description:
      '神奈川县2025年传统祭典完整指南，镰仓祭、湘南平塚七夕祭等15个精彩活动等您来体验。',
    images: ['/images/matsuri/kanagawa-matsuri.svg'],
  },
  alternates: {
    canonical: '/kanagawa/matsuri',
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

// 地区配置 - 使用标准配色系统
const kanagawaRegionConfig = {
  name: 'kanagawa',
  displayName: '神奈川',
  emoji: '⛩️',
  description:
    '神奈川县融合了古都文化与现代海滨风情，从镰仓的古刹祭典到湘南的海洋庆典，每一个祭典都展现着神奈川独特的文化魅力与历史传承。',
  navigationLinks: {
    prev: { name: '东京祭典', url: '/tokyo/matsuri', emoji: '🏮' },
    next: { name: '千叶祭典', url: '/chiba/matsuri', emoji: '🌸' },
    current: { name: '神奈川活动', url: '/kanagawa' },
  },
};

// 神奈川祭典事件数据（基于 omaturilink.com 官方数据）
const kanagawaMatsuriEvents = [
  {
    id: 'kamakura-matsuri',
    title: '镰仓祭',
    _sourceData: {
      japaneseName: '鎌倉祭典',
      japaneseDescription: '鎌倉祭典',
    },
    englishName: 'Kamakura Festival',
    name: '镰仓祭',
    date: '2025-04-13',
    dates: '2025年4月13-21日',
    endDate: '2025-04-21',
    location: '镰仓市',
    venue: '鹤冈八幡宫',
    highlights: ['🏛️ 鹤冈八幡宫', '🌸 樱花季节', '⚔️ 武士文化', '🏺 古都风情'],
    features: ['🏛️ 鹤冈八幡宫', '🌸 樱花季节', '⚔️ 武士文化', '🏺 古都风情'],
    likes: 456,
    website: 'https://www.city.kamakura.kanagawa.jp/',
    description:
      '镰仓祭在樱花盛开的季节举行，以鹤冈八幡宫为中心展开的传统祭典。古都镰仓的武士文化与佛教传统在此融合，展现日本历史文化的深厚底蕴。',
    category: '古都祭典',
    prefecture: '神奈川县',
    region: 'kanagawa',
  },
  {
    id: 'hiratsuka-tanabata',
    title: '湘南平塚七夕祭',
    _sourceData: {
      japaneseName: '湘南平塚七夕祭典',
      japaneseDescription: '湘南平塚七夕祭典',
    },
    englishName: 'Shonan Hiratsuka Tanabata Festival',
    name: '湘南平塚七夕祭',
    date: '2025-07-04',
    dates: '2025年7月4-6日',
    endDate: '2025-07-06',
    location: '平塚市',
    venue: '平塚市中心商店街',
    highlights: ['🎋 七夕装饰', '🌊 湘南海滨', '🎨 竹饰艺术', '🌟 夏日庆典'],
    features: ['🎋 七夕装饰', '🌊 湘南海滨', '🎨 竹饰艺术', '🌟 夏日庆典'],
    likes: 378,
    website: 'https://www.hiratsuka-tanabata.com/',
    description:
      '湘南平塚七夕祭是关东地区最大规模的七夕祭典，华丽的竹饰装饰覆盖整个商店街。夏日海滨城市的浪漫氛围与传统七夕文化完美结合。',
    category: '七夕祭典',
    prefecture: '神奈川县',
    region: 'kanagawa',
  },
  {
    id: 'odawara-ume-matsuri',
    title: '小田原梅祭',
    _sourceData: {
      japaneseName: '小田原梅祭典',
      japaneseDescription: '小田原梅祭典',
    },
    englishName: 'Odawara Plum Festival',
    name: '小田原梅祭',
    date: '2025-02-01',
    dates: '2025年2月1日-3月2日',
    endDate: '2025-03-02',
    location: '小田原市',
    venue: '曾我梅林',
    highlights: ['🌸 梅花盛开', '🏔️ 富士山景', '🌱 早春风景', '📸 摄影胜地'],
    features: ['🌸 梅花盛开', '🏔️ 富士山景', '🌱 早春风景', '📸 摄影胜地'],
    likes: 298,
    website: 'https://www.city.odawara.kanagawa.jp/',
    description:
      '小田原梅祭在早春时节举行，曾我梅林的梅花与远山的富士山构成绝美景色。这是神奈川县迎接春天的传统祭典，梅花香气弥漫整个山谷。',
    category: '花祭',
    prefecture: '神奈川县',
    region: 'kanagawa',
  },
];

export default function KanagawaMatsuri() {
  return (
    <MatsuriPageTemplate
      region={kanagawaRegionConfig}
      events={kanagawaMatsuriEvents}
      pageTitle="神奈川传统祭典"
      pageDescription="体验神奈川古都文化与海滨风情，镰仓祭、湘南平塚七夕祭等知名祭典汇聚神奈川"
      regionKey="kanagawa"
      activityKey="matsuri"
    />
  );
}
