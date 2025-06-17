/**
 * 第四层页面 - 铫子港祭花火大会详情
 * @layer 五层 (Detail Layer)
 * @month 8月
 * @region 千叶
 * @event 铫子港祭花火大会
 * @type 花火详情页面
 * @path /august/hanabi/chiba/choshi-minato-hanabi
 * @description 铫子港祭花火大会完整详情信息，包含交通、观赏、历史等
 */
import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { choshiMinatoHanabiData } from '@/data/hanabi/chiba/level4-august-hanabi-choshi-minato';
import { Metadata } from 'next';

// SEO元数据配置
export const metadata: Metadata = {
  title: 'Choshi Minato Hanabi - 千叶花火大会完整攻略',
  description:
    'Choshi Minato Hanabi花火大会详细指南，2025年举办。精彩花火表演，绝佳观赏地点。包含交通方式、观赏地点、祭典活动等实用信息。',
  keywords: [
    'Choshi Minato Hanabi花火',
    '千叶花火',
    '花火大会',
    '2025花火',
    '夏季花火',
    '日本祭典',
  ],
  openGraph: {
    title: 'Choshi Minato Hanabi - 千叶花火大会完整攻略',
    description:
      'Choshi Minato Hanabi花火大会详细指南，2025年举办。精彩花火表演，绝佳观赏地点。包含交通方式、观赏地点、祭典活动等实用信息。...',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.kanto-travel-guide.com/chiba/hanabi/choshi-minato-hanabi',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/hanabi/choshi-minato-hanabi-fireworks.svg',
        width: 1200,
        height: 630,
        alt: 'Choshi Minato Hanabi花火大会',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Choshi Minato Hanabi - 千叶花火大会完整攻略',
    description:
      'Choshi Minato Hanabi花火大会详细指南，2025年举办。精彩花火表演，绝佳观赏地点。包含交通方式、观赏地点、祭典活动等实用信息。...',
    images: ['/images/hanabi/choshi-minato-hanabi-fireworks.svg'],
  },
  alternates: {
    canonical: '/chiba/hanabi/choshi-minato-hanabi',
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

export default function ChoshiMinatoHanabiPage() {
  return (
    <HanabiDetailTemplate data={choshiMinatoHanabiData} regionKey="chiba" />
  );
}

// 静态生成配置
export const dynamic = 'force-static';
export const revalidate = 86400; // 24小时重新验证
