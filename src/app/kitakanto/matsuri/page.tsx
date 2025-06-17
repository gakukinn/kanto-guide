import MatsuriPageTemplate from '@/components/MatsuriPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '北关东传统祭典2025 - 宇都宫祭高崎祭水户梅祭等北关东祭典完整攻略',
  description:
    '北关东地区2025年传统祭典完整指南，体验宇都宫祭的热闹氛围、高崎祭的达摩文化、水户梅祭的早春美景等10个精彩传统活动。提供详细的举办时间、观赏地点、历史文化背景、交通方式，感受群马栃木茨城三县千年文化传承的精髓，探索北关东独特的祭典魅力与传统工艺之美。',
  keywords: [
    '北关东传统祭典',
    '宇都宫祭',
    '高崎祭',
    '水户梅祭',
    '北关东祭典',
    '群马祭典',
    '栃木祭典',
    '茨城祭典',
    '2025祭典',
    '关东祭典',
    '北关东旅游',
    '日本传统文化',
    '关东地区祭典',
    '传统工艺',
    '文化传承',
  ],
  openGraph: {
    title: '北关东传统祭典2025 - 宇都宫祭高崎祭水户梅祭等北关东祭典完整攻略',
    description:
      '北关东地区2025年传统祭典完整指南，宇都宫祭、高崎祭、水户梅祭等10个精彩活动等您来体验。感受群马栃木茨城三县千年文化传承的精髓。',
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
    title: '北关东传统祭典2025 - 宇都宫祭高崎祭水户梅祭等北关东祭典完整攻略',
    description:
      '北关东地区2025年传统祭典完整指南，宇都宫祭、高崎祭等10个精彩活动等您来体验。',
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

// 北关东祭典事件数据（基于 omaturilink.com 官方数据）
const kitakantoMatsuriEvents = [
  {
    id: 'utsunomiya-matsuri',
    title: '宇都宫祭',
    _sourceData: {
      japaneseName: '宇都宮祭典',
      japaneseDescription: '宇都宮祭典',
    },
    englishName: 'Utsunomiya Festival',
    name: '宇都宫祭',
    date: '2025-08-09',
    dates: '2025年8月9-10日',
    endDate: '2025-08-10',
    location: '宇都宫市',
    venue: '宇都宫市中心街区',
    highlights: ['🎌 山车巡游', '🥟 饺子祭典', '🎭 传统表演', '🎆 夏日庆典'],
    features: ['🎌 山车巡游', '🥟 饺子祭典', '🎭 传统表演', '🎆 夏日庆典'],
    likes: 287,
    website: 'https://www.city.utsunomiya.tochigi.jp/',
    description:
      '宇都宫祭是栃木县最具代表性的夏日祭典，以山车巡游和饺子祭典闻名。作为"饺子之都"的宇都宫，在祭典期间展示着独特的美食文化与传统艺能。',
    category: '夏日祭典',
    prefecture: '栃木县',
    region: 'kitakanto',
  },
  {
    id: 'takasaki-matsuri',
    title: '高崎祭',
    _sourceData: {
      japaneseName: '高崎祭典',
      japaneseDescription: '高崎祭典',
    },
    englishName: 'Takasaki Festival',
    name: '高崎祭',
    date: '2025-08-02',
    dates: '2025年8月2-3日',
    endDate: '2025-08-03',
    location: '高崎市',
    venue: '高崎市中心商店街',
    highlights: ['🪆 达摩文化', '🎌 传统工艺', '🏮 夏日祭典', '🎭 民俗表演'],
    features: ['🪆 达摩文化', '🎌 传统工艺', '🏮 夏日祭典', '🎭 民俗表演'],
    likes: 234,
    website: 'https://www.city.takasaki.gunma.jp/',
    description:
      '高崎祭展现群马县独特的达摩文化，高崎达摩是日本最著名的传统工艺品之一。祭典期间可以体验达摩制作工艺，感受群马人民的传统智慧。',
    category: '传统工艺',
    prefecture: '群马县',
    region: 'kitakanto',
  },
  {
    id: 'mito-ume-matsuri',
    title: '水户梅祭',
    _sourceData: {
      japaneseName: '水戸的梅祭典',
      japaneseDescription: '水戸的梅祭典',
    },
    englishName: 'Mito Plum Festival',
    name: '水户梅祭',
    date: '2025-02-15',
    dates: '2025年2月15日-3月31日',
    endDate: '2025-03-31',
    location: '水户市',
    venue: '偕乐园',
    highlights: ['🌸 梅花盛开', '🏞️ 偕乐园', '🌱 早春风景', '📸 摄影胜地'],
    features: ['🌸 梅花盛开', '🏞️ 偕乐园', '🌱 早春风景', '📸 摄影胜地'],
    likes: 356,
    website: 'https://www.city.mito.lg.jp/',
    description:
      '水户梅祭在日本三大名园之一的偕乐园举行，拥有约100品种3000株梅花。早春时节梅花盛开，是茨城县迎接春天的最美祭典。',
    category: '花祭',
    prefecture: '茨城县',
    region: 'kitakanto',
  },
];

export default function KitakantoMatsuri() {
  return (
    <MatsuriPageTemplate
      region={kitakantoRegionConfig}
      events={kitakantoMatsuriEvents}
      pageTitle="北关东传统祭典"
      pageDescription="体验北关东三县的传统文化，宇都宫祭、高崎祭、水户梅祭等知名祭典汇聚北关东"
      regionKey="kitakanto"
      activityKey="matsuri"
    />
  );
}
