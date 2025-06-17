/**
 * 第四层页面 - 第109回足利花火大会详情
 * @layer 四层 (Detail Layer)
 * @month 8月
 * @region 北关东
 * @event 第109回足利花火大会
 * @type 花火详情页面
 * @path /kitakanto/hanabi/ashikaga
 * @description 第109回足利花火大会完整详情信息，包含交通、观赏、历史等
 */

import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { ashikagaHanabiData } from '@/data/hanabi/kitakanto/level4-august-ashikaga-hanabi';
import { Metadata } from 'next';

// SEO元数据配置
export const metadata: Metadata = {
  title: 'Ashikaga - 北关东花火大会完整攻略',
  description:
    'Ashikaga花火大会详细指南，2025年举办。精彩花火表演，绝佳观赏地点。包含交通方式、观赏地点、祭典活动等实用信息。',
  keywords: [
    'Ashikaga花火',
    '北关东花火',
    '花火大会',
    '2025花火',
    '夏季花火',
    '日本祭典',
  ],
  openGraph: {
    title: 'Ashikaga - 北关东花火大会完整攻略',
    description:
      'Ashikaga花火大会详细指南，2025年举办。精彩花火表演，绝佳观赏地点。包含交通方式、观赏地点、祭典活动等实用信息。...',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.kanto-travel-guide.com/kitakanto/hanabi/ashikaga',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/hanabi/ashikaga-fireworks.svg',
        width: 1200,
        height: 630,
        alt: 'Ashikaga花火大会',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ashikaga - 北关东花火大会完整攻略',
    description:
      'Ashikaga花火大会详细指南，2025年举办。精彩花火表演，绝佳观赏地点。包含交通方式、观赏地点、祭典活动等实用信息。...',
    images: ['/images/hanabi/ashikaga-fireworks.svg'],
  },
  alternates: {
    canonical: '/kitakanto/hanabi/ashikaga',
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

export default function AshikagaHanabiPage() {
  return (
    <HanabiDetailTemplate data={ashikagaHanabiData} regionKey="kitakanto" />
  );
}

// 静态生成配置
export const dynamic = 'force-static';
export const revalidate = 86400; // 24小时重新验证
