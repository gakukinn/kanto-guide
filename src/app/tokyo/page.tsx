import RegionPageTemplate from '@/components/RegionPageTemplate';
import { Metadata } from 'next';

// SEO元数据配置
export const metadata: Metadata = {
  title: '东京都花火大会祭典攻略 - 隅田川花火、三社祭完整指南',
  description:
    '东京都花火大会祭典详细指南，包含隅田川花火大会、三社祭、上野樱花节等举办时间、地点、交通方式、观赏攻略等实用信息。体验东京都最精彩的文化活动，规划完美的日本关东之旅。涵盖板桥花火大会、江戸川花火大会、神宫外苑花火大会等15个精选活动，提供详细的观赏位置、交通指南、最佳拍摄角度等专业建议。',
  keywords: [
    '东京都花火大会',
    '隅田川花火大会',
    '三社祭',
    '东京都祭典',
    '日本花火',
    '2025年花火',
    '传统文化',
    '日本旅游',
    '关东旅游',
  ],
  openGraph: {
    title: '东京都花火大会祭典攻略 - 隅田川花火、三社祭完整指南',
    description:
      '东京都花火大会祭典详细指南，包含隅田川花火大会、三社祭、上野樱花节等举办时间、地点、交通方式、观赏攻略等实用信息。体验东京都最精彩的文化活动，规划完美的日本关东之旅。',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.kanto-travel-guide.com/tokyo',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/events/tokyo-hanabi.jpg',
        width: 1200,
        height: 630,
        alt: '东京都花火大会精彩瞬间',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '东京都花火大会祭典攻略 - 隅田川花火、三社祭完整指南',
    description:
      '东京都花火大会祭典详细指南，包含隅田川花火大会、三社祭、上野樱花节等举办时间、地点、交通方式、观赏攻略等实用信息。体验东京都最精彩的文化活动，规划完美的日本关东之旅。',
    images: ['/images/events/tokyo-hanabi.jpg'],
  },
  alternates: {
    canonical: 'https://www.kanto-travel-guide.com/tokyo',
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

export default function TokyoPage() {
  return (
    <RegionPageTemplate
      regionKey="tokyo"
      config={{
        name: '东京都',
        emoji: '🗼',
        bgColor: 'from-red-50 to-rose-100',
        themeColor: 'red',
        prevRegion: {
          name: '神奈川',
          path: '/kanagawa',
          emoji: '⛵',
          bgColor: 'from-blue-100 to-blue-200',
        },
        nextRegion: {
          name: '埼玉',
          path: '/saitama',
          emoji: '🏢',
          bgColor: 'from-slate-50 to-gray-100',
        },
        featuredActivities: [
          {
            id: 'sumida-river-fireworks',
            title: '隅田川花火大会',
            description: '日本最具代表性的花火大会',
            emoji: '🎆',
            bgColor: 'from-blue-50 to-blue-100',
          },
          {
            id: 'sanja-festival',
            title: '三社祭',
            description: '浅草神社的传统大祭',
            emoji: '🎭',
            bgColor: 'from-red-50 to-red-100',
          },
          {
            id: 'ueno-cherry-blossom',
            title: '上野公园赏樱',
            description: '东京最著名的樱花观赏地',
            emoji: '🌸',
            bgColor: 'from-pink-50 to-pink-100',
          },
        ],
      }}
    />
  );
}
