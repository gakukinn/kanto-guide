/**
 * 第四层页面 - todabashi完整详情信息，包含交通、观赏、历史等
 * @layer 五层 (Detail Layer)
 * @month 8月
 * @region 埼玉
 * @event todabashi
 * @type 花火详情页面
 * @path /august/hanabi/saitama/todabashi
 * @description todabashi完整详情信息，包含交通、观赏、历史等
 */

import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { Metadata } from 'next';
import { todabashiHanabiData } from '@/data/hanabi/saitama/level4-august-todabashi-hanabi';

// SEO元数据配置
export const metadata: Metadata = {
  title: 'Todabashi - 埼玉花火大会完整攻略',
  description:
    'Todabashi花火大会详细指南，2025年举办。精彩花火表演，绝佳观赏地点。包含交通方式、观赏地点、祭典活动等实用信息。',
  keywords: [
    'Todabashi花火',
    '埼玉花火',
    '花火大会',
    '2025花火',
    '夏季花火',
    '日本祭典',
  ],
  openGraph: {
    title: 'Todabashi - 埼玉花火大会完整攻略',
    description:
      'Todabashi花火大会详细指南，2025年举办。精彩花火表演，绝佳观赏地点。包含交通方式、观赏地点、祭典活动等实用信息。...',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.kanto-travel-guide.com/saitama/hanabi/todabashi',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/hanabi/todabashi-fireworks.svg',
        width: 1200,
        height: 630,
        alt: 'Todabashi花火大会',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Todabashi - 埼玉花火大会完整攻略',
    description:
      'Todabashi花火大会详细指南，2025年举办。精彩花火表演，绝佳观赏地点。包含交通方式、观赏地点、祭典活动等实用信息。...',
    images: ['/images/hanabi/todabashi-fireworks.svg'],
  },
  alternates: {
    canonical: '/saitama/hanabi/todabashi',
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

export default function TodabashiHanabiPage() {
  return (
    <HanabiDetailTemplate data={todabashiHanabiData} regionKey="saitama" />
  );
}

// 静态生成配置
export const dynamic = 'force-static';
export const revalidate = 86400; // 24小时重新验证
