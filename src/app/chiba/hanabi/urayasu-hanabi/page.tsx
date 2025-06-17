/**
 * 第四层页面 - 第42回浦安市花火大会详情
 * @layer 四层 (Detail Layer)
 * @category 花火详情
 * @region 千叶
 * @description 第42回浦安市花火大会的完整详细信息
 * @template HanabiDetailTemplate.tsx
 */

import { Metadata } from 'next';
import HanabiDetailTemplate from '../../../../components/HanabiDetailTemplate';
import { urayasuHanabiData } from '../../../../data/hanabi/chiba/level4-october-chiba-urayasu-hanabi';

// SEO元数据配置
export const metadata: Metadata = {
  title: '第42回浦安市花火大会 - 千叶花火大会完整攻略',
  description:
    '第42回浦安市花火大会详细指南，2025年10月19日举办。约6600发花火照亮东京湾夜空，包含交通方式、观赏地点、有料席信息等实用攻略。',
  keywords: [
    '浦安市花火大会',
    '千叶花火',
    '花火大会',
    '2025花火',
    '秋季花火',
    '日本祭典',
  ],
  openGraph: {
    title: '第42回浦安市花火大会 - 千叶花火大会完整攻略',
    description:
      '第42回浦安市花火大会详细指南，2025年10月19日举办。约6600发花火照亮东京湾夜空，包含交通方式、观赏地点、有料席信息等实用攻略。',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.kanto-travel-guide.com/chiba/hanabi/urayasu-hanabi',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/hanabi/urayasu-hanabi-fireworks.svg',
        width: 1200,
        height: 630,
        alt: '第42回浦安市花火大会',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '第42回浦安市花火大会 - 千叶花火大会完整攻略',
    description:
      '第42回浦安市花火大会详细指南，2025年10月19日举办。约6600发花火照亮东京湾夜空，包含交通方式、观赏地点、有料席信息等实用攻略。',
    images: ['/images/hanabi/urayasu-hanabi-fireworks.svg'],
  },
  alternates: {
    canonical: '/chiba/hanabi/urayasu-hanabi',
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

export default function UrayasuHanabiPage() {
  return <HanabiDetailTemplate data={urayasuHanabiData} regionKey="chiba" />;
}

// 静态生成配置
export const dynamic = 'force-static';
export const revalidate = 86400; // 24小时重新验证
