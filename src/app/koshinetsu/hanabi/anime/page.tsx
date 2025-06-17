/**
 * 第四层页面 - 动漫经典动画歌曲花火详情
 * @layer 四层 (Detail Layer)
 * @month 7月
 * @region 甲信越
 * @event 动漫经典动画歌曲花火
 * @type 花火详情页面
 * @path /koshinetsu/hanabi/anime
 * @description 动漫经典动画歌曲花火完整详情信息，动漫文化与花火艺术结合
 */

import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { animeClassicsData } from '@/data/hanabi/koshinetsu/level4-anime-classics-anisong-hanabi';
import { Metadata } from 'next';

// SEO元数据配置
export const metadata: Metadata = {
  title: 'Anime - 甲信越花火大会完整攻略',
  description:
    'Anime花火大会详细指南，2025年举办。精彩花火表演，绝佳观赏地点。包含交通方式、观赏地点、祭典活动等实用信息。',
  keywords: [
    'Anime花火',
    '甲信越花火',
    '花火大会',
    '2025花火',
    '夏季花火',
    '日本祭典',
  ],
  openGraph: {
    title: 'Anime - 甲信越花火大会完整攻略',
    description:
      'Anime花火大会详细指南，2025年举办。精彩花火表演，绝佳观赏地点。包含交通方式、观赏地点、祭典活动等实用信息。...',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.kanto-travel-guide.com/koshinetsu/hanabi/anime',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/hanabi/anime-fireworks.svg',
        width: 1200,
        height: 630,
        alt: 'Anime花火大会',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anime - 甲信越花火大会完整攻略',
    description:
      'Anime花火大会详细指南，2025年举办。精彩花火表演，绝佳观赏地点。包含交通方式、观赏地点、祭典活动等实用信息。...',
    images: ['/images/hanabi/anime-fireworks.svg'],
  },
  alternates: {
    canonical: '/koshinetsu/hanabi/anime',
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

export default function AnimeHanabiPage() {
  return (
    <HanabiDetailTemplate data={animeClassicsData} regionKey="koshinetsu" />
  );
}

// 静态生成配置
export const dynamic = 'force-static';
export const revalidate = 86400; // 24小时重新验证
