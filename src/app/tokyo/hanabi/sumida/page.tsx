/**
 * 第四层页面 - 隅田川花火大会详情
 * @layer 四层 (Detail Layer)
 * @month 7月
 * @region 东京
 * @event 隅田川花火大会
 * @type 花火详情页面
 * @path /july/hanabi/tokyo/sumida
 * @description 隅田川花火大会完整详情信息，包含交通、观赏、历史等
 */

import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { sumidaData } from '@/data/level4-tokyo-hanabi-sumida';
import { Metadata } from 'next';

// SEO元数据配置
export const metadata: Metadata = {
  title: 'Sumida - 东京花火大会完整攻略',
  description:
    'Sumida花火大会详细指南，2025年举办。精彩花火表演，绝佳观赏地点。包含交通方式、观赏地点、祭典活动等实用信息。',
  keywords: [
    'Sumida花火',
    '东京花火',
    '花火大会',
    '2025花火',
    '夏季花火',
    '日本祭典',
  ],
  openGraph: {
    title: 'Sumida - 东京花火大会完整攻略',
    description:
      'Sumida花火大会详细指南，2025年举办。精彩花火表演，绝佳观赏地点。包含交通方式、观赏地点、祭典活动等实用信息。...',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.kanto-travel-guide.com/tokyo/hanabi/sumida',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/hanabi/sumida-fireworks.svg',
        width: 1200,
        height: 630,
        alt: 'Sumida花火大会',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sumida - 东京花火大会完整攻略',
    description:
      'Sumida花火大会详细指南，2025年举办。精彩花火表演，绝佳观赏地点。包含交通方式、观赏地点、祭典活动等实用信息。...',
    images: ['/images/hanabi/sumida-fireworks.svg'],
  },
  alternates: {
    canonical: '/tokyo/hanabi/sumida',
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

export default function SumidaHanabiPage() {
  return <HanabiDetailTemplate data={sumidaData} regionKey="tokyo" />;
}

// 静态生成配置
export const dynamic = 'force-static';
export const revalidate = 86400; // 24小时重新验证
