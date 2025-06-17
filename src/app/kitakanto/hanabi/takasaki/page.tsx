/**
 * 第四层页面 - 第51回高崎大花火大会详情
 * @layer 四层 (Detail Layer)
 * @month 8月
 * @region 北关东
 * @event 第51回高崎大花火大会
 * @type 花火详情页面
 * @path /kitakanto/hanabi/takasaki
 * @description 第51回高崎大花火大会完整详情信息，群马县最大花火大会
 */

import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { takasakiHanabiData } from '@/data/hanabi/kitakanto/level4-august-takasaki-hanabi';
import { Metadata } from 'next';

// SEO元数据配置
export const metadata: Metadata = {
  title: 'Takasaki - 北关东花火大会完整攻略',
  description:
    'Takasaki花火大会详细指南，2025年举办。精彩花火表演，绝佳观赏地点。包含交通方式、观赏地点、祭典活动等实用信息。',
  keywords: [
    'Takasaki花火',
    '北关东花火',
    '花火大会',
    '2025花火',
    '夏季花火',
    '日本祭典',
  ],
  openGraph: {
    title: 'Takasaki - 北关东花火大会完整攻略',
    description:
      'Takasaki花火大会详细指南，2025年举办。精彩花火表演，绝佳观赏地点。包含交通方式、观赏地点、祭典活动等实用信息。...',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.kanto-travel-guide.com/kitakanto/hanabi/takasaki',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/hanabi/takasaki-fireworks.svg',
        width: 1200,
        height: 630,
        alt: 'Takasaki花火大会',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Takasaki - 北关东花火大会完整攻略',
    description:
      'Takasaki花火大会详细指南，2025年举办。精彩花火表演，绝佳观赏地点。包含交通方式、观赏地点、祭典活动等实用信息。...',
    images: ['/images/hanabi/takasaki-fireworks.svg'],
  },
  alternates: {
    canonical: '/kitakanto/hanabi/takasaki',
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

export default function TakasakiHanabiPage() {
  return (
    <HanabiDetailTemplate data={takasakiHanabiData} regionKey="kitakanto" />
  );
}

// 静态生成配置
export const dynamic = 'force-static';
export const revalidate = 86400; // 24小时重新验证
