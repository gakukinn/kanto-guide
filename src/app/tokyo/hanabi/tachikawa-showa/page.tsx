import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { tachikawaShowaHanabiData } from '@/data/level5-july-hanabi-tachikawa-showa';
import { Metadata } from 'next';

// SEO元数据配置
export const metadata: Metadata = {
  title: 'Tachikawa Showa - 东京花火大会完整攻略',
  description:
    'Tachikawa Showa花火大会详细指南，2025年举办。精彩花火表演，绝佳观赏地点。包含交通方式、观赏地点、祭典活动等实用信息。',
  keywords: [
    'Tachikawa Showa花火',
    '东京花火',
    '花火大会',
    '2025花火',
    '夏季花火',
    '日本祭典',
  ],
  openGraph: {
    title: 'Tachikawa Showa - 东京花火大会完整攻略',
    description:
      'Tachikawa Showa花火大会详细指南，2025年举办。精彩花火表演，绝佳观赏地点。包含交通方式、观赏地点、祭典活动等实用信息。...',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.kanto-travel-guide.com/tokyo/hanabi/tachikawa-showa',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/hanabi/tachikawa-showa-fireworks.svg',
        width: 1200,
        height: 630,
        alt: 'Tachikawa Showa花火大会',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tachikawa Showa - 东京花火大会完整攻略',
    description:
      'Tachikawa Showa花火大会详细指南，2025年举办。精彩花火表演，绝佳观赏地点。包含交通方式、观赏地点、祭典活动等实用信息。...',
    images: ['/images/hanabi/tachikawa-showa-fireworks.svg'],
  },
  alternates: {
    canonical: '/tokyo/hanabi/tachikawa-showa',
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

export default function TachikawaShowaHanabiPage() {
  return <HanabiDetailTemplate data={tachikawaShowaHanabiData} regionKey="tokyo" />;
}

// 静态生成配置
export const dynamic = 'force-static';
export const revalidate = 86400; // 24小时重新验证

