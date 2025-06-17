/**
 * 第四层页面 - kamakura-hanabi详情
 * @layer 五层 (Detail Layer)
 * @month 7月
 * @region 神奈川
 * @event kamakura-hanabi
 * @type 花火详情页面
 * @path /july/hanabi/kanagawa/kamakura-hanabi
 * @description kamakura-hanabi完整详情信息，包含交通、观赏、历史等
 */
import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { Metadata } from 'next';
import { kamakuraData } from '@/data/hanabi/kanagawa/level4-july-hanabi-kanagawa-kamakura';

// SEO元数据配置
export const metadata: Metadata = {
  title: 'Kamakura - 神奈川花火大会完整攻略',
  description:
    'Kamakura花火大会详细指南，2025年举办。精彩花火表演，绝佳观赏地点。包含交通方式、观赏地点、祭典活动等实用信息。',
  keywords: [
    'Kamakura花火',
    '神奈川花火',
    '花火大会',
    '2025花火',
    '夏季花火',
    '日本祭典',
  ],
  openGraph: {
    title: 'Kamakura - 神奈川花火大会完整攻略',
    description:
      'Kamakura花火大会详细指南，2025年举办。精彩花火表演，绝佳观赏地点。包含交通方式、观赏地点、祭典活动等实用信息。...',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.kanto-travel-guide.com/kanagawa/hanabi/kamakura',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/hanabi/kamakura-fireworks.svg',
        width: 1200,
        height: 630,
        alt: 'Kamakura花火大会',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kamakura - 神奈川花火大会完整攻略',
    description:
      'Kamakura花火大会详细指南，2025年举办。精彩花火表演，绝佳观赏地点。包含交通方式、观赏地点、祭典活动等实用信息。...',
    images: ['/images/hanabi/kamakura-fireworks.svg'],
  },
  alternates: {
    canonical: '/kanagawa/hanabi/kamakura',
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

export default function KamakuraHanabiPage() {
  return <HanabiDetailTemplate data={kamakuraData} regionKey="kanagawa" />;
}

// 静态生成配置
export const dynamic = 'force-static';
export const revalidate = 86400; // 24小时重新验证
