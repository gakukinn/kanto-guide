/**
 * 第四层页面 - oamishirasato-hanabi详情
 * @layer 五层 (Detail Layer)
 * @month 7月
 * @region 千叶
 * @event oamishirasato-hanabi
 * @type 花火详情页面
 * @path /july/hanabi/chiba/oamishirasato-hanabi
 * @description oamishirasato-hanabi完整详情信息，包含交通、观赏、历史等
 */
import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { Metadata } from 'next';
import { oamishirasatoData } from '@/data/hanabi/chiba/level4-july-hanabi-chiba-oamishirasato';

// SEO元数据配置
export const metadata: Metadata = {
  title: 'Oamishirasato Hanabi - 千叶花火大会完整攻略',
  description:
    'Oamishirasato Hanabi花火大会详细指南，2025年举办。精彩花火表演，绝佳观赏地点。包含交通方式、观赏地点、祭典活动等实用信息。',
  keywords: [
    'Oamishirasato Hanabi花火',
    '千叶花火',
    '花火大会',
    '2025花火',
    '夏季花火',
    '日本祭典',
  ],
  openGraph: {
    title: 'Oamishirasato Hanabi - 千叶花火大会完整攻略',
    description:
      'Oamishirasato Hanabi花火大会详细指南，2025年举办。精彩花火表演，绝佳观赏地点。包含交通方式、观赏地点、祭典活动等实用信息。...',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.kanto-travel-guide.com/chiba/hanabi/oamishirasato-hanabi',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/hanabi/oamishirasato-hanabi-fireworks.svg',
        width: 1200,
        height: 630,
        alt: 'Oamishirasato Hanabi花火大会',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oamishirasato Hanabi - 千叶花火大会完整攻略',
    description:
      'Oamishirasato Hanabi花火大会详细指南，2025年举办。精彩花火表演，绝佳观赏地点。包含交通方式、观赏地点、祭典活动等实用信息。...',
    images: ['/images/hanabi/oamishirasato-hanabi-fireworks.svg'],
  },
  alternates: {
    canonical: '/chiba/hanabi/oamishirasato-hanabi',
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

export default function OamishirasatoHanabiPage() {
  return <HanabiDetailTemplate data={oamishirasatoData} regionKey="chiba" />;
}

// 静态生成配置
export const dynamic = 'force-static';
export const revalidate = 86400; // 24小时重新验证
