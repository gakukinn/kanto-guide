import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { Metadata } from 'next';
import { kurihamaHanabiData } from '@/data/hanabi/kanagawa/level4-august-kurihama-hanabi';

// SEO元数据配置
export const metadata: Metadata = {
  title: 'Kurihama - 神奈川花火大会完整攻略',
  description:
    'Kurihama花火大会详细指南，2025年举办。精彩花火表演，绝佳观赏地点。包含交通方式、观赏地点、祭典活动等实用信息。',
  keywords: [
    'Kurihama花火',
    '神奈川花火',
    '花火大会',
    '2025花火',
    '夏季花火',
    '日本祭典',
  ],
  openGraph: {
    title: 'Kurihama - 神奈川花火大会完整攻略',
    description:
      'Kurihama花火大会详细指南，2025年举办。精彩花火表演，绝佳观赏地点。包含交通方式、观赏地点、祭典活动等实用信息。...',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.kanto-travel-guide.com/kanagawa/hanabi/kurihama',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/hanabi/kurihama-fireworks.svg',
        width: 1200,
        height: 630,
        alt: 'Kurihama花火大会',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kurihama - 神奈川花火大会完整攻略',
    description:
      'Kurihama花火大会详细指南，2025年举办。精彩花火表演，绝佳观赏地点。包含交通方式、观赏地点、祭典活动等实用信息。...',
    images: ['/images/hanabi/kurihama-fireworks.svg'],
  },
  alternates: {
    canonical: '/kanagawa/hanabi/kurihama',
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

export default function KurihamaHanabiPage() {
  return (
    <HanabiDetailTemplate data={kurihamaHanabiData} regionKey="kanagawa" />
  );
}

// 静态生成配置
export const dynamic = 'force-static';
export const revalidate = 86400; // 24小时重新验证
