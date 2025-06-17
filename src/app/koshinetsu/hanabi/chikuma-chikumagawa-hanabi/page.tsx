/**
 * 第四层页面 - 第94回 信州千曲市千曲川納涼煙火大会详情
 * @layer 四层 (Detail Layer)
 * @category 花火
 * @region koshinetsu
 * @description 第94回 信州千曲市千曲川納涼煙火大会的详细信息页面
 * @template HanabiDetailTemplate.tsx
 */

import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { Metadata } from 'next';
import { chikumaChikumagawaHanabiData } from '../../../../data/hanabi/koshinetsu/level4-august-chikuma-chikumagawa-hanabi';

// SEO元数据配置
export const metadata: Metadata = {
  title: '第94回 信州千曲市千曲川納涼煙火大会 2025 | 甲信越花火指南',
  description:
    '2025年8月7日举办的第94回信州千曲市千曲川納涼煙火大会详细信息。约1万发花火照亮千曲川夜空，预计6万5000人观赏。90分钟精彩演出，户仓上山田温泉河畔举行。',
  keywords: [
    '千曲川納涼煙火大会',
    '第94回',
    '信州千曲市',
    '长野县',
    '花火大会',
    '2025',
    '甲信越',
    '户仓上山田温泉',
  ],
  openGraph: {
    title: '第94回 信州千曲市千曲川納涼煙火大会 2025',
    description: '约1万发花火照亮千曲川夜空，第94回历史悠久的信州传统花火大会',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.kanto-travel-guide.com/koshinetsu/hanabi/chikuma-chikumagawa-hanabi',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/hanabi/chikuma-chikumagawa/chikuma-chikumagawa-hanabi-main.jpg',
        width: 800,
        height: 600,
        alt: '第94回信州千曲市千曲川納涼煙火大会主会场',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '第94回 信州千曲市千曲川納涼煙火大会 2025',
    description: '约1万发花火照亮千曲川夜空，第94回历史悠久的信州传统花火大会',
    images: [
      '/images/hanabi/chikuma-chikumagawa/chikuma-chikumagawa-hanabi-main.jpg',
    ],
  },
  alternates: {
    canonical: '/koshinetsu/hanabi/chikuma-chikumagawa-hanabi',
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

export default function ChikumaChikumagawaHanabiPage() {
  return (
    <HanabiDetailTemplate
      data={chikumaChikumagawaHanabiData}
      regionKey="koshinetsu"
    />
  );
}

// 静态生成配置
export const dynamic = 'force-static';
export const revalidate = 86400; // 24小时重新验证
