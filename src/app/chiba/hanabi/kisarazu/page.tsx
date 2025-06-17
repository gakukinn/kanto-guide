/**
 * 第四层页面 - 第78回木更津港祭详情
 * @layer 五层 (Detail Layer)
 * @month 8月
 * @region 千叶
 * @event 第78回木更津港祭
 * @type 花火详情页面
 * @path /august/hanabi/chiba/kisarazu
 * @description 第78回木更津港祭完整详情信息，包含交通、观赏、历史等
 */
import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { Metadata } from 'next';
import { kisarazuHanabiData } from '@/data/hanabi/chiba/level4-august-hanabi-kisarazu';

// SEO元数据配置
export const metadata: Metadata = {
  title: 'Kisarazu - 千叶花火大会完整攻略',
  description:
    'Kisarazu花火大会详细指南，2025年举办。精彩花火表演，绝佳观赏地点。包含交通方式、观赏地点、祭典活动等实用信息。',
  keywords: [
    'Kisarazu花火',
    '千叶花火',
    '花火大会',
    '2025花火',
    '夏季花火',
    '日本祭典',
  ],
  openGraph: {
    title: 'Kisarazu - 千叶花火大会完整攻略',
    description:
      'Kisarazu花火大会详细指南，2025年举办。精彩花火表演，绝佳观赏地点。包含交通方式、观赏地点、祭典活动等实用信息。...',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.kanto-travel-guide.com/chiba/hanabi/kisarazu',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/hanabi/kisarazu-fireworks.svg',
        width: 1200,
        height: 630,
        alt: 'Kisarazu花火大会',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kisarazu - 千叶花火大会完整攻略',
    description:
      'Kisarazu花火大会详细指南，2025年举办。精彩花火表演，绝佳观赏地点。包含交通方式、观赏地点、祭典活动等实用信息。...',
    images: ['/images/hanabi/kisarazu-fireworks.svg'],
  },
  alternates: {
    canonical: '/chiba/hanabi/kisarazu',
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

export default function KisarazuHanabiPage() {
  return <HanabiDetailTemplate data={kisarazuHanabiData} regionKey="chiba" />;
}

// 静态生成配置
export const dynamic = 'force-static';
export const revalidate = 86400; // 24小时重新验证
