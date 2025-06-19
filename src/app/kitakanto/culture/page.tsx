/**
 * 文化艺术活动页面模板 - 基于jalan.net官方数据
 * @layer 三层 (Category Layer)
 * @category 文化艺术
 * @region 北关东
 * @description 展示北关东地区所有文化艺术活动，基于jalan.net官方数据
 * @source 待更新 - 数据来源待确定
 * @last_updated 2025-06-18
 * ⚠️ 重要提醒：这是商业网站项目，所有数据来源于jalan.net官方网站！
 */
import CulturePageTemplate from '@/components/CulturePageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    '北关东文化艺术活动列表2025 - 茨城·栃木·群馬文化展览·艺术祭·文化体验完整攻略指南',
  description:
    '北关东地区2025年文化艺术活动完整指南，探索茨城、栃木、群馬三县的文化艺术魅力。提供详细的举办时间、观赏地点、活动特色、参与方式，体验北关东传统文化与现代艺术的融合，感受关东北部独特的文化艺术氛围。',
  keywords: [
    '北关东文化艺术',
    '茨城文化活动',
    '栃木艺术展',
    '群馬文化祭',
    '北关东艺术活动',
    '2025艺术展',
    '北关东旅游',
    '日本文化艺术',
    '关东文化',
    '文化体验',
    '创意活动',
    '传统艺术',
    '现代艺术',
  ],
  openGraph: {
    title:
      '北关东文化艺术活动列表2025 - 茨城·栃木·群馬文化展览·艺术祭·文化体验完整攻略指南',
    description:
      '北关东地区2025年文化艺术活动完整指南，探索茨城、栃木、群馬三县的文化艺术魅力。体验北关东传统文化与现代艺术的融合。',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.kanto-travel-guide.com/kitakanto/culture',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/culture/kitakanto-culture.svg',
        width: 1200,
        height: 630,
        alt: '北关东文化艺术活动',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      '北关东文化艺术活动列表2025 - 茨城·栃木·群馬文化展览·艺术祭·文化体验完整攻略指南',
    description:
      '北关东地区2025年文化艺术活动完整指南，传统文化与现代艺术的融合等您来体验。',
    images: ['/images/culture/kitakanto-culture.svg'],
  },
  alternates: {
    canonical: '/kitakanto/culture',
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

// 北关东地区配置 - 使用标准配色系统
const kitakantoRegionConfig = {
  name: 'kitakanto',
  displayName: '北关东',
  emoji: '🏔️',
  description: '传统文化与自然艺术相融合的北关东文化艺术空间',
  navigationLinks: {
    prev: { name: '神奈川文化艺术', url: '/kanagawa/culture', emoji: '⛩️' },
    next: { name: '甲信越文化艺术', url: '/koshinetsu/culture', emoji: '🗻' },
    current: { name: '北关东活动', url: '/kitakanto' },
  },
};

// 文化艺术活动事件数据（基于 jalan.net 官方数据 - 待更新）
const kitakantoCultureEvents: any[] = [
  // 数据内容待更新，暂时为空
];

export default function KitakantoCulturePage() {
  return (
    <CulturePageTemplate
      region={kitakantoRegionConfig}
      events={kitakantoCultureEvents}
      pageTitle="北关东文化艺术活动列表"
      pageDescription="探索北关东地区2025年精彩的文化艺术活动，体验传统文化与自然艺术的完美融合"
      regionKey="kitakanto"
      activityKey="culture"
    />
  );
}
