/**
 * 第四层页面 - shirahama-ama-matsuri完整详情信息，包含交通、观赏、历史等
 * @layer 五层 (Detail Layer)
 * @month 7月
 * @region 千叶
 * @event shirahama-ama-matsuri
 * @type 花火详情页面
 * @path /july/hanabi/chiba/shirahama-ama-matsuri
 * @description shirahama-ama-matsuri完整详情信息，包含交通、观赏、历史等
 */
import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { Metadata } from 'next';
import { shirahamaData } from '@/data/hanabi/chiba/level4-july-hanabi-chiba-shirahama';

// SEO元数据配置
export const metadata: Metadata = {
  title: 'Shirahama Ama Matsuri - 千叶花火大会完整攻略',
  description:
    'Shirahama Ama Matsuri花火大会详细指南，2025年举办。精彩花火表演，绝佳观赏地点。包含交通方式、观赏地点、祭典活动等实用信息。',
  keywords: [
    'Shirahama Ama Matsuri花火',
    '千叶花火',
    '花火大会',
    '2025花火',
    '夏季花火',
    '日本祭典',
  ],
  openGraph: {
    title: 'Shirahama Ama Matsuri - 千叶花火大会完整攻略',
    description:
      'Shirahama Ama Matsuri花火大会详细指南，2025年举办。精彩花火表演，绝佳观赏地点。包含交通方式、观赏地点、祭典活动等实用信息。...',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.kanto-travel-guide.com/chiba/hanabi/shirahama-ama-matsuri',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/hanabi/shirahama-ama-matsuri-fireworks.svg',
        width: 1200,
        height: 630,
        alt: 'Shirahama Ama Matsuri花火大会',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shirahama Ama Matsuri - 千叶花火大会完整攻略',
    description:
      'Shirahama Ama Matsuri花火大会详细指南，2025年举办。精彩花火表演，绝佳观赏地点。包含交通方式、观赏地点、祭典活动等实用信息。...',
    images: ['/images/hanabi/shirahama-ama-matsuri-fireworks.svg'],
  },
  alternates: {
    canonical: '/chiba/hanabi/shirahama-ama-matsuri',
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

export default function ShirahamaAmaHanabiPage() {
  return <HanabiDetailTemplate data={shirahamaData} regionKey="chiba" />;
}

// 静态生成配置
export const dynamic = 'force-static';
export const revalidate = 86400; // 24小时重新验证
