/**
 * 第四层页面 - 长冈祭大花火大会详情
 * @layer 四层 (Detail Layer)
 * @month 8月
 * @region 甲信越
 * @event 长冈祭大花火大会
 * @type 花火详情页面
 * @path /koshinetsu/hanabi/nagaoka
 * @description 长冈祭大花火大会完整详情信息，日本三大花火大会之一
 */
import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { Metadata } from 'next';
import { nagaokaHanabiData } from '@/data/hanabi/koshinetsu/level4-august-nagaoka-hanabi';

// SEO元数据配置
export const metadata: Metadata = {
  title: 'Nagaoka - 甲信越花火大会完整攻略',
  description:
    'Nagaoka花火大会详细指南，2025年举办。精彩花火表演，绝佳观赏地点。包含交通方式、观赏地点、祭典活动等实用信息。',
  keywords: [
    'Nagaoka花火',
    '甲信越花火',
    '花火大会',
    '2025花火',
    '夏季花火',
    '日本祭典',
  ],
  openGraph: {
    title: 'Nagaoka - 甲信越花火大会完整攻略',
    description:
      'Nagaoka花火大会详细指南，2025年举办。精彩花火表演，绝佳观赏地点。包含交通方式、观赏地点、祭典活动等实用信息。...',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.kanto-travel-guide.com/koshinetsu/hanabi/nagaoka',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/hanabi/nagaoka-fireworks.svg',
        width: 1200,
        height: 630,
        alt: 'Nagaoka花火大会',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nagaoka - 甲信越花火大会完整攻略',
    description:
      'Nagaoka花火大会详细指南，2025年举办。精彩花火表演，绝佳观赏地点。包含交通方式、观赏地点、祭典活动等实用信息。...',
    images: ['/images/hanabi/nagaoka-fireworks.svg'],
  },
  alternates: {
    canonical: '/koshinetsu/hanabi/nagaoka',
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

export default function NagaokaHanabiPage() {
  return (
    <HanabiDetailTemplate data={nagaokaHanabiData} regionKey="koshinetsu" />
  );
}

// 静态生成配置
export const dynamic = 'force-static';
export const revalidate = 86400; // 24小时重新验证
