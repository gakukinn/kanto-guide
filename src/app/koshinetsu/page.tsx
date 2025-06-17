/**
 * 第二层页面 - 甲信越地区活动（新潟、长野、山梨）
 */

import RegionPageTemplate from '@/components/RegionPageTemplate';
import { Metadata } from 'next';

// SEO元数据配置
export const metadata: Metadata = {
  title: '甲信越花火大会祭典攻略 - 新潟长野山梨三县完整指南',
  description:
    '甲信越花火大会祭典详细指南，包含新潟县、长野县、山梨县花火大会、传统祭典等举办时间、地点、交通方式、观赏攻略等实用信息。体验甲信越最精彩的文化活动，规划完美的日本关东之旅。涵盖长冈大花火、松本城太鼓祭、富士河口湖花火大会等14个精选活动，提供详细的观赏位置、交通指南、最佳拍摄角度等专业建议。',
  keywords: [
    '甲信越花火大会',
    '新潟县花火',
    '长野县花火',
    '山梨县花火',
    '甲信越祭典',
    '日本花火',
    '2025年花火',
    '传统文化',
    '日本旅游',
    '关东旅游',
  ],
  openGraph: {
    title: '甲信越花火大会祭典攻略 - 新潟长野山梨三县完整指南',
    description:
      '甲信越花火大会祭典详细指南，包含新潟县、长野县、山梨县花火大会、传统祭典等举办时间、地点、交通方式、观赏攻略等实用信息。体验甲信越最精彩的文化活动，规划完美的日本关东之旅。涵盖长冈大花火、松本城太鼓祭、富士河口湖花火大会等14个精选活动，提供详细的观赏位置、交通指南、最佳拍摄角度等专业建议。',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.kanto-travel-guide.com/koshinetsu',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/events/koshinetsu-hanabi.jpg',
        width: 1200,
        height: 630,
        alt: '甲信越花火大会精彩瞬间',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '甲信越花火大会祭典攻略 - 新潟长野山梨三县完整指南',
    description:
      '甲信越花火大会祭典详细指南，包含新潟县、长野县、山梨县花火大会、传统祭典等举办时间、地点、交通方式、观赏攻略等实用信息。体验甲信越最精彩的文化活动，规划完美的日本关东之旅。涵盖长冈大花火、松本城太鼓祭、富士河口湖花火大会等14个精选活动，提供详细的观赏位置、交通指南、最佳拍摄角度等专业建议。',
    images: ['/images/events/koshinetsu-hanabi.jpg'],
  },
  alternates: {
    canonical: 'https://www.kanto-travel-guide.com/koshinetsu',
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

export default function KoshinetsuPage() {
  return (
    <RegionPageTemplate
      regionKey="koshinetsu"
      config={{
        name: '甲信越',
        emoji: '⛰️',
        bgColor: 'from-purple-50 to-violet-100',
        themeColor: 'purple',
        prevRegion: {
          name: '北关东',
          path: '/kitakanto',
          emoji: '🏔️',
          bgColor: 'from-green-50 to-emerald-100',
        },
        nextRegion: {
          name: '东京',
          path: '/tokyo',
          emoji: '🗼',
          bgColor: 'from-red-50 to-rose-100',
        },
        featuredActivities: [
          // 新潟县主要活动
          {
            id: 'nagaoka-hanabi',
            title: '长冈大花火',
            description: '日本三大花火大会之一',
            emoji: '🎆',
            bgColor: 'from-red-50 to-orange-100',
          },
          // 长野县主要活动
          {
            id: 'matsumoto-castle-festival',
            title: '松本城太鼓祭',
            description: '国宝松本城的传统祭典',
            emoji: '🏯',
            bgColor: 'from-blue-50 to-indigo-100',
          },
          // 山梨县主要活动
          {
            id: 'fuji-kawaguchi-hanabi',
            title: '富士河口湖花火大会',
            description: '富士山下的绚烂烟花',
            emoji: '🗻',
            bgColor: 'from-pink-50 to-purple-100',
          },
        ],
      }}
    />
  );
}
