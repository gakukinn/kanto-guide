/**
 * 第二层页面 - 北关东地区活动（群马、栃木、茨城）
 */

import RegionPageTemplate from '@/components/RegionPageTemplate';
import { Metadata } from 'next';

// SEO元数据配置
export const metadata: Metadata = {
  title: '北关东花火大会祭典攻略 - 群马栃木茨城三县完整指南',
  description:
    '北关东花火大会祭典详细指南，包含群马县、栃木县、茨城县花火大会、传统祭典等举办时间、地点、交通方式、观赏攻略等实用信息。体验北关东最精彩的文化活动，规划完美的日本关东之旅。涵盖土浦花火競技大会、足利花卉公园、草津温泉祭等13个精选活动，提供详细的观赏位置、交通指南、最佳拍摄角度等专业建议。',
  keywords: [
    '北关东花火大会',
    '群马县花火',
    '栃木县花火',
    '茨城县花火',
    '北关东祭典',
    '日本花火',
    '2025年花火',
    '传统文化',
    '日本旅游',
    '关东旅游',
  ],
  openGraph: {
    title: '北关东花火大会祭典攻略 - 群马栃木茨城三县完整指南',
    description:
      '北关东花火大会祭典详细指南，包含群马县、栃木县、茨城县花火大会、传统祭典等举办时间、地点、交通方式、观赏攻略等实用信息。体验北关东最精彩的文化活动，规划完美的日本关东之旅。涵盖土浦花火競技大会、足利花卉公园、草津温泉祭等13个精选活动，提供详细的观赏位置、交通指南、最佳拍摄角度等专业建议。',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.kanto-travel-guide.com/kitakanto',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/events/kitakanto-hanabi.jpg',
        width: 1200,
        height: 630,
        alt: '北关东花火大会精彩瞬间',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '北关东花火大会祭典攻略 - 群马栃木茨城三县完整指南',
    description:
      '北关东花火大会祭典详细指南，包含群马县、栃木县、茨城县花火大会、传统祭典等举办时间、地点、交通方式、观赏攻略等实用信息。体验北关东最精彩的文化活动，规划完美的日本关东之旅。涵盖土浦花火競技大会、足利花卉公园、草津温泉祭等13个精选活动，提供详细的观赏位置、交通指南、最佳拍摄角度等专业建议。',
    images: ['/images/events/kitakanto-hanabi.jpg'],
  },
  alternates: {
    canonical: 'https://www.kanto-travel-guide.com/kitakanto',
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

export default function KitakantoPage() {
  return (
    <RegionPageTemplate
      regionKey="kitakanto"
      config={{
        name: '北关东',
        emoji: '🏔️',
        bgColor: 'from-green-50 to-emerald-100',
        themeColor: 'emerald',
        prevRegion: {
          name: '神奈川',
          path: '/kanagawa',
          emoji: '⛵',
          bgColor: 'from-blue-100 to-blue-200',
        },
        nextRegion: {
          name: '甲信越',
          path: '/koshinetsu',
          emoji: '⛰️',
          bgColor: 'from-purple-50 to-violet-100',
        },
        featuredActivities: [
          // 最具代表性的三个活动
          {
            id: 'tsuchiura-hanabi',
            title: '土浦全国花火競技大会',
            description: '日本三大花火大会之一',
            emoji: '🎆',
            bgColor: 'from-blue-50 to-blue-100',
          },
          {
            id: 'kusatsu-onsen',
            title: '草津温泉',
            description: '日本三大名汤之一',
            emoji: '♨️',
            bgColor: 'from-orange-50 to-red-100',
          },
          {
            id: 'ashikaga-flower-park',
            title: '足利花卉公园',
            description: '世界著名的紫藤花祭',
            emoji: '🌸',
            bgColor: 'from-purple-50 to-indigo-100',
          },
        ],
      }}
    />
  );
}
