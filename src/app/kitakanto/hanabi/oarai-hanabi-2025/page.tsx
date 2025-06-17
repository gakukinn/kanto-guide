/**
 * 第四层页面 - 大洗海上花火大会2025详情
 * @layer 四层 (Detail Layer)
 * @category 花火详情
 * @region 北关东 - 茨城県
 * @description 大洗海上花火大会的完整详情信息，包括花火规模、观赏地点、交通指南等
 * @template HanabiDetailTemplate.tsx
 * @dataSource WalkerPlus官方数据 (https://hanabi.walkerplus.com/detail/ar0308e00860/)
 */

import { Metadata } from 'next';
import HanabiDetailTemplate from '../../../../components/HanabiDetailTemplate';
import { oaraiHanabiData } from '../../../../data/hanabi/kitakanto/level4-september-kitakanto-oarai-hanabi';

// SEO元数据配置
export const metadata: Metadata = {
  title: 'Oarai Hanabi 2025 - 北关东花火大会完整攻略',
  description:
    'Oarai Hanabi 2025花火大会详细指南，2025年举办。精彩花火表演，绝佳观赏地点。包含交通方式、观赏地点、祭典活动等实用信息。',
  keywords: [
    'Oarai Hanabi 2025花火',
    '北关东花火',
    '花火大会',
    '2025花火',
    '夏季花火',
    '日本祭典',
  ],
  openGraph: {
    title: 'Oarai Hanabi 2025 - 北关东花火大会完整攻略',
    description:
      'Oarai Hanabi 2025花火大会详细指南，2025年举办。精彩花火表演，绝佳观赏地点。包含交通方式、观赏地点、祭典活动等实用信息。...',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.kanto-travel-guide.com/kitakanto/hanabi/oarai-hanabi-2025',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/hanabi/oarai-hanabi-2025-fireworks.svg',
        width: 1200,
        height: 630,
        alt: 'Oarai Hanabi 2025花火大会',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oarai Hanabi 2025 - 北关东花火大会完整攻略',
    description:
      'Oarai Hanabi 2025花火大会详细指南，2025年举办。精彩花火表演，绝佳观赏地点。包含交通方式、观赏地点、祭典活动等实用信息。...',
    images: ['/images/hanabi/oarai-hanabi-2025-fireworks.svg'],
  },
  alternates: {
    canonical: '/kitakanto/hanabi/oarai-hanabi-2025',
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

export default function OaraiHanabiDetailTemplate() {
  return <HanabiDetailTemplate data={oaraiHanabiData} regionKey="kitakanto" />;
}

// 静态生成配置
export const dynamic = 'force-static';
export const revalidate = 86400; // 24小时重新验证

