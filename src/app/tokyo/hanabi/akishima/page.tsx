/**
 * 第四层页面 - 昭岛完整详情信息，包含交通、观赏、历史等
 * @layer 四层 (Detail Layer)
 * @month 8月
 * @region 东京
 * @event 昭岛
 * @type 花火详情页面
 * @path /august/hanabi/tokyo/akishima
 * @description 昭岛完整详情信息，包含交通、观赏、历史等
 */

import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { akishimaHanabiData } from '@/data/level5-august-akishima-hanabi';
import { Metadata } from 'next';

// SEO元数据配置
export const metadata: Metadata = {
  title: '昭岛市民鲸鱼祭梦花火 - 东京花火大会完整攻略',
  description:
    '昭岛市民鲸鱼祭梦花火详细指南，2025年8月23日举办。约2000发花火，昭岛市民球场。包含交通方式、观赏地点、祭典活动等实用信息。',
  keywords: [
    '昭岛花火',
    '昭岛市民鲸鱼祭',
    '梦花火',
    '东京花火',
    '花火大会',
    '2025花火',
    '夏季花火',
    '日本祭典',
  ],
  openGraph: {
    title: '昭岛市民鲸鱼祭梦花火 - 东京花火大会完整攻略',
    description:
      '昭岛市民鲸鱼祭梦花火详细指南，2025年8月23日举办。约2000发花火，昭岛市民球场。包含交通方式、观赏地点、祭典活动等实用信息。',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.kanto-travel-guide.com/tokyo/hanabi/akishima',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/hanabi/akishima-fireworks.svg',
        width: 1200,
        height: 630,
        alt: '昭岛市民鲸鱼祭梦花火',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '昭岛市民鲸鱼祭梦花火 - 东京花火大会完整攻略',
    description:
      '昭岛市民鲸鱼祭梦花火详细指南，2025年8月23日举办。约2000发花火，昭岛市民球场。包含交通方式、观赏地点、祭典活动等实用信息。',
    images: ['/images/hanabi/akishima-fireworks.svg'],
  },
  alternates: {
    canonical: '/tokyo/hanabi/akishima',
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

export default function AkishimaHanabiPage() {
  return <HanabiDetailTemplate data={akishimaHanabiData} regionKey="tokyo" />;
}

// 静态生成配置
export const dynamic = 'force-static';
export const revalidate = 86400; // 24小时重新验证

