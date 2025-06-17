import RegionPageTemplate from '@/components/RegionPageTemplate';
import { Metadata } from 'next';

// SEO元数据配置
export const metadata: Metadata = {
  title: '埼玉县花火大会祭典攻略 - 都市近郊花火、传统祭典完整指南',
  description:
    '埼玉县花火大会祭典详细指南，包含都市近郊花火大会、传统祭典等举办时间、地点、交通方式、观赏攻略等实用信息。体验埼玉县最精彩的文化活动，规划完美的日本关东之旅。涵盖大宫花火大会、川越祭、秩父夜祭等13个精选活动，提供详细的观赏位置、交通指南、最佳拍摄角度等专业建议。',
  keywords: [
    '埼玉县花火大会',
    '埼玉县祭典',
    '都市近郊花火',
    '日本花火',
    '2025年花火',
    '传统文化',
    '日本旅游',
    '关东旅游',
  ],
  openGraph: {
    title: '埼玉县花火大会祭典攻略 - 都市近郊花火、传统祭典完整指南',
    description:
      '埼玉县花火大会祭典详细指南，包含都市近郊花火大会、传统祭典等举办时间、地点、交通方式、观赏攻略等实用信息。体验埼玉县最精彩的文化活动，规划完美的日本关东之旅。涵盖大宫花火大会、川越祭、秩父夜祭等13个精选活动，提供详细的观赏位置、交通指南、最佳拍摄角度等专业建议。',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.kanto-travel-guide.com/saitama',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/events/saitama-hanabi.jpg',
        width: 1200,
        height: 630,
        alt: '埼玉县花火大会精彩瞬间',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '埼玉县花火大会祭典攻略 - 都市近郊花火、传统祭典完整指南',
    description:
      '埼玉县花火大会祭典详细指南，包含都市近郊花火大会、传统祭典等举办时间、地点、交通方式、观赏攻略等实用信息。体验埼玉县最精彩的文化活动，规划完美的日本关东之旅。涵盖大宫花火大会、川越祭、秩父夜祭等13个精选活动，提供详细的观赏位置、交通指南、最佳拍摄角度等专业建议。',
    images: ['/images/events/saitama-hanabi.jpg'],
  },
  alternates: {
    canonical: 'https://www.kanto-travel-guide.com/saitama',
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

export default function SaitamaPage() {
  return (
    <RegionPageTemplate
      regionKey="saitama"
      config={{
        name: '埼玉县',
        emoji: '🏢',
        bgColor: 'from-orange-50 to-amber-100',
        themeColor: 'orange',
        prevRegion: {
          name: '东京',
          path: '/tokyo',
          emoji: '🗼',
          bgColor: 'from-red-50 to-rose-100',
        },
        nextRegion: {
          name: '千叶',
          path: '/chiba',
          emoji: '🌊',
          bgColor: 'from-sky-50 to-cyan-100',
        },
        featuredActivities: [
          {
            id: 'omiya-hanabi',
            title: '大宫花火大会',
            description: '大宫市的传统夏日烟花节',
            emoji: '🎆',
            bgColor: 'from-blue-50 to-blue-100',
          },
          {
            id: 'kawagoe-festival',
            title: '川越祭',
            description: '小江户川越的传统祭典',
            emoji: '🏰',
            bgColor: 'from-purple-50 to-indigo-100',
          },
          {
            id: 'chichibu-yomatsuri',
            title: '秩父夜祭',
            description: '秩父地区的传统文化祭',
            emoji: '🎭',
            bgColor: 'from-orange-50 to-red-100',
          },
        ],
      }}
    />
  );
}
