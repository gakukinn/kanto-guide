import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { Metadata } from 'next';
import { tamamuraHanabi2025Data } from '@/data/hanabi/kitakanto/tamamura-hanabi-2025';

// SEO元数据配置
export const metadata: Metadata = {
  title: 'Tamamura Hanabi 2025 - 北关东花火大会完整攻略',
  description:
    'Tamamura Hanabi 2025花火大会详细指南，2025年举办。精彩花火表演，绝佳观赏地点。包含交通方式、观赏地点、祭典活动等实用信息。',
  keywords: [
    'Tamamura Hanabi 2025花火',
    '北关东花火',
    '花火大会',
    '2025花火',
    '夏季花火',
    '日本祭典',
  ],
  openGraph: {
    title: 'Tamamura Hanabi 2025 - 北关东花火大会完整攻略',
    description:
      'Tamamura Hanabi 2025花火大会详细指南，2025年举办。精彩花火表演，绝佳观赏地点。包含交通方式、观赏地点、祭典活动等实用信息。...',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.kanto-travel-guide.com/kitakanto/hanabi/tamamura-hanabi-2025',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/hanabi/tamamura-hanabi-2025-fireworks.svg',
        width: 1200,
        height: 630,
        alt: 'Tamamura Hanabi 2025花火大会',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tamamura Hanabi 2025 - 北关东花火大会完整攻略',
    description:
      'Tamamura Hanabi 2025花火大会详细指南，2025年举办。精彩花火表演，绝佳观赏地点。包含交通方式、观赏地点、祭典活动等实用信息。...',
    images: ['/images/hanabi/tamamura-hanabi-2025-fireworks.svg'],
  },
  alternates: {
    canonical: '/kitakanto/hanabi/tamamura-hanabi-2025',
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

export default function TamamuraHanabi2025Page() {
  return (
    <HanabiDetailTemplate data={tamamuraHanabi2025Data} regionKey="kitakanto" />
  );
}

// 静态生成配置
export const dynamic = 'force-static';
export const revalidate = 86400; // 24小时重新验证
