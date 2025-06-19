/**
 * 文化艺术活动页面模板 - 基于jalan.net官方数据
 * @layer 三层 (Category Layer)
 * @category 文化艺术
 * @region 甲信越
 * @description 展示甲信越地区所有文化艺术活动，基于jalan.net官方数据
 * @source 待更新 - 数据来源待确定
 * @last_updated 2025-06-18
 * ⚠️ 重要提醒：这是商业网站项目，所有数据来源于jalan.net官方网站！
 */
import CulturePageTemplate from '@/components/CulturePageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    '甲信越文化艺术活动列表2025 - 山梨·長野·新潟文化展览·艺术祭·文化体验完整攻略指南',
  description:
    '甲信越地区2025年文化艺术活动完整指南，探索山梨、長野、新潟三县的文化艺术魅力。提供详细的举办时间、观赏地点、活动特色、参与方式，体验甲信越传统文化与山岳艺术的融合，感受中部高原独特的文化艺术氛围。',
  keywords: [
    '甲信越文化艺术',
    '山梨文化活动',
    '長野艺术展',
    '新潟文化祭',
    '甲信越艺术活动',
    '2025艺术展',
    '甲信越旅游',
    '日本文化艺术',
    '山岳文化',
    '文化体验',
    '创意活动',
    '传统艺术',
    '高原艺术',
  ],
  openGraph: {
    title:
      '甲信越文化艺术活动列表2025 - 山梨·長野·新潟文化展览·艺术祭·文化体验完整攻略指南',
    description:
      '甲信越地区2025年文化艺术活动完整指南，探索山梨、長野、新潟三县的文化艺术魅力。体验甲信越传统文化与山岳艺术的融合。',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.kanto-travel-guide.com/koshinetsu/culture',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/culture/koshinetsu-culture.svg',
        width: 1200,
        height: 630,
        alt: '甲信越文化艺术活动',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      '甲信越文化艺术活动列表2025 - 山梨·長野·新潟文化展览·艺术祭·文化体验完整攻略指南',
    description:
      '甲信越地区2025年文化艺术活动完整指南，传统文化与山岳艺术的融合等您来体验。',
    images: ['/images/culture/koshinetsu-culture.svg'],
  },
  alternates: {
    canonical: '/koshinetsu/culture',
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

// 甲信越地区配置 - 使用标准配色系统
const koshinetsuRegionConfig = {
  name: 'koshinetsu',
  displayName: '甲信越',
  emoji: '🗻',
  description: '传统文化与山岳艺术相融合的甲信越文化艺术空间',
  navigationLinks: {
    prev: { name: '北关东文化艺术', url: '/kitakanto/culture', emoji: '🏔️' },
    next: { name: '東京文化艺术', url: '/tokyo/culture', emoji: '🌸' },
    current: { name: '甲信越活动', url: '/koshinetsu' },
  },
};

// 文化艺术活动事件数据（基于 jalan.net 官方数据 - 待更新）
const koshinetsuCultureEvents: any[] = [
  // 数据内容待更新，暂时为空
];

export default function KoshinetsuCulturePage() {
  return (
    <CulturePageTemplate
      region={koshinetsuRegionConfig}
      events={koshinetsuCultureEvents}
      pageTitle="甲信越文化艺术活动列表"
      pageDescription="探索甲信越地区2025年精彩的文化艺术活动，体验传统文化与山岳艺术的完美融合"
      regionKey="koshinetsu"
      activityKey="culture"
    />
  );
}
