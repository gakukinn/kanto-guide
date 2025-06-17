/**
 * 第61回 石和温泉花火大会详情页面
 * 数据来源: https://hanabi.walkerplus.com/detail/ar0419e00682/
 * 技术栈: Playwright + Cheerio + Crawlee
 * 创建时间: 2025年6月14日
 */

import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { Metadata } from 'next';
import { isawaOnsenHanabiData } from '../../../../data/hanabi/koshinetsu/level4-august-isawa-onsen-hanabi';

// SEO元数据配置
export const metadata: Metadata = {
  title: '第61回 石和温泉花火大会 2025 | 甲信越花火指南',
  description:
    '2025年8月24日举办的第61回石和温泉花火大会详细信息。约1万发花火照亮笛吹川河畔，预计1万2000人观赏。90分钟精彩演出，约80店屋台。',
  keywords: [
    '石和温泉花火大会',
    '第61回',
    '笛吹川',
    '山梨县',
    '花火大会',
    '2025',
    '甲信越',
    '温泉街',
  ],
  openGraph: {
    title: '第61回 石和温泉花火大会 2025',
    description: '约1万发花火照亮笛吹川河畔，第61回历史悠久的温泉街花火大会',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.kanto-travel-guide.com/koshinetsu/hanabi/isawa-onsen-hanabi-2025',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/hanabi/isawa-onsen/isawa-onsen-hanabi-main.jpg',
        width: 800,
        height: 600,
        alt: '第61回石和温泉花火大会主会场',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '第61回 石和温泉花火大会 2025',
    description: '约1万发花火照亮笛吹川河畔，第61回历史悠久的温泉街花火大会',
    images: ['/images/hanabi/isawa-onsen/isawa-onsen-hanabi-main.jpg'],
  },
  alternates: {
    canonical: '/koshinetsu/hanabi/isawa-onsen-hanabi-2025',
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

export default function IsawaOnsenHanabiPage() {
  return (
    <HanabiDetailTemplate data={isawaOnsenHanabiData} regionKey="koshinetsu" />
  );
}

// 静态生成配置
export const dynamic = 'force-static';
export const revalidate = 86400; // 24小时重新验证
