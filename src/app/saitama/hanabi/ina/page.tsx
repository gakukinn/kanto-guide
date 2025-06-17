/**
 * 第四层页面 - 伊奈花火大会详情
 * @layer 五层 (Detail Layer)
 * @month 8月
 * @region 埼玉
 * @event ina
 * @type 花火详情页面
 * @path /august/hanabi/saitama/ina
 * @description 伊奈花火大会完整详情信息，包含交通、观赏、历史等
 */
import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { Metadata } from 'next';
import { inaHanabiData } from '@/data/hanabi/saitama/level4-august-ina-hanabi';

// SEO元数据配置
export const metadata: Metadata = {
  title: 'Ina - 埼玉花火大会完整攻略',
  description:
    'Ina花火大会详细指南，2025年举办。精彩花火表演，绝佳观赏地点。包含交通方式、观赏地点、祭典活动等实用信息。',
  keywords: [
    'Ina花火',
    '埼玉花火',
    '花火大会',
    '2025花火',
    '夏季花火',
    '日本祭典',
  ],
  openGraph: {
    title: 'Ina - 埼玉花火大会完整攻略',
    description:
      'Ina花火大会详细指南，2025年举办。精彩花火表演，绝佳观赏地点。包含交通方式、观赏地点、祭典活动等实用信息。...',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.kanto-travel-guide.com/saitama/hanabi/ina',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/hanabi/ina-fireworks.svg',
        width: 1200,
        height: 630,
        alt: 'Ina花火大会',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ina - 埼玉花火大会完整攻略',
    description:
      'Ina花火大会详细指南，2025年举办。精彩花火表演，绝佳观赏地点。包含交通方式、观赏地点、祭典活动等实用信息。...',
    images: ['/images/hanabi/ina-fireworks.svg'],
  },
  alternates: {
    canonical: '/saitama/hanabi/ina',
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

export default function InaHanabiPage() {
  return <HanabiDetailTemplate data={inaHanabiData} regionKey="saitama" />;
}

// 静态生成配置
export const dynamic = 'force-static';
export const revalidate = 86400; // 24小时重新验证
