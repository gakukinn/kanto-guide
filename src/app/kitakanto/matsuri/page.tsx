import MatsuriPageTemplate from '@/components/MatsuriPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '北关东传统祭典2025 - 前橋七夕まつり北关东祭典完整攻略',
  description:
    '北关东地区2025年传统祭典指南，体验前橋七夕まつり的美丽七夕文化。提供详细的举办时间、观赏地点、历史文化背景、交通方式，感受群马县前橋市千年文化传承的精髓，探索北关东独特的七夕祭典魅力与传统工艺之美。',
  keywords: [
    '北关东传统祭典',
    '前橋七夕まつり',
    '前橋祭典',
    '七夕祭り',
    '北关东祭典',
    '群马祭典',
    '群马県前橋市',
    '2025祭典',
    '关东祭典',
    '北关东旅游',
    '日本传统文化',
    '关东地区祭典',
    '传统工艺',
    '文化传承',
    '七夕文化',
  ],
  openGraph: {
    title: '北关东传统祭典2025 - 前橋七夕まつり北关东祭典完整攻略',
    description:
      '北关东地区2025年传统祭典指南，前橋七夕まつり精彩活动等您来体验。感受群马县前橋市千年文化传承的精髓。',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.kanto-travel-guide.com/kitakanto/matsuri',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/matsuri/kitakanto-matsuri.svg',
        width: 1200,
        height: 630,
        alt: '北关东传统祭典',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '北关东传统祭典2025 - 前橋七夕まつり北关东祭典完整攻略',
    description:
      '北关东地区2025年传统祭典指南，前橋七夕まつり精彩活动等您来体验。',
    images: ['/images/matsuri/kitakanto-matsuri.svg'],
  },
  alternates: {
    canonical: '/kitakanto/matsuri',
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
const kitakantoRegionConfig = {
  name: 'kitakanto',
  displayName: '北关东',
  emoji: '♨️',
  description:
    '北关东地区（群马、栃木、茨城）拥有丰富的传统祭典文化，从温泉乡的山间祭典到平原地区的农业庆典，每一个祭典都体现着北关东人民朴实的生活智慧与深厚的文化传承。',
  navigationLinks: {
    prev: { name: '神奈川祭典', url: '/kanagawa/matsuri', emoji: '⛩️' },
    next: { name: '甲信越祭典', url: '/koshinetsu/matsuri', emoji: '🏔️' },
    current: { name: '北关东活动', url: '/kitakanto' },
  },
};

// 北关东祭典事件数据 - 仅包含有详情页面的活动
const kitakantoMatsuriEvents = [
  {
    id: 'maebashi-tanabata',
    title: '前橋七夕まつり',
    _sourceData: {
      japaneseName: '前橋七夕まつり',
      japaneseDescription: '前橋七夕まつり',
    },
    englishName: 'Maebashi Tanabata Festival',
    name: '前橋七夕まつり',
    date: '2025-07-11',
    dates: '2025年7月11-13日',
    endDate: '2025-07-13',
    location: '前橋市',
    venue: '前橋市中心市街地',
    highlights: [
      '🎋 伝統的な七夕飾り',
      '🏮 前橋市中心市街地開催',
      '📅 3日間開催',
      '🌙 夜間開催（21:30まで）',
    ],
    features: [
      '🎋 伝統的な七夕飾り',
      '🏮 前橋市中心市街地開催',
      '📅 3日間開催',
      '🌙 夜間開催（21:30まで）',
    ],
    likes: 145,
    website: 'https://maebashi-tanabata.jp/',
    description:
      '前橋七夕まつりは群馬県前橋市で開催される美しい七夕祭典。前橋市中心市街地に色とりどりの七夕飾りが飾られ、伝統的な七夕文化を体験できます。夜21:30まで開催され、夜間の幻想的な雰囲気も楽しめます。',
    category: '七夕祭り',
    prefecture: '群马县',
    region: 'kitakanto',
    detailLink: '/kitakanto/matsuri/maebashi-tanabata',
  },
];

export default function KitakantoMatsuri() {
  return (
    <MatsuriPageTemplate
      region={kitakantoRegionConfig}
      events={kitakantoMatsuriEvents}
      pageTitle="北关东传统祭典活动列表"
      pageDescription="体验北关东传统文化，前橋七夕まつり等知名祭典汇聚北关东"
      regionKey="kitakanto"
      activityKey="matsuri"
    />
  );
}
