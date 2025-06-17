import RegionPageTemplate from '@/components/RegionPageTemplate';
import { Metadata } from 'next';

// SEO元数据配置
export const metadata: Metadata = {
  title: '千叶县花火大会祭典攻略 - 海滨花火、传统祭典完整指南',
  description:
    '千叶县花火大会祭典详细指南，包含海滨花火大会、传统祭典等举办时间、地点、交通方式、观赏攻略等实用信息。体验千叶县最精彩的文化活动，规划完美的日本关东之旅。涵盖木更津花火大会、市川花火大会、船桥花火大会等15个精选活动，提供详细的海岸观赏位置、最佳拍摄角度、交通指南等专业建议。',
  keywords: [
    '千叶县花火大会',
    '千叶县祭典',
    '海滨花火',
    '日本花火',
    '2025年花火',
    '传统文化',
    '日本旅游',
    '关东旅游',
  ],
  openGraph: {
    title: '千叶县花火大会祭典攻略 - 海滨花火、传统祭典完整指南',
    description:
      '千叶县花火大会祭典详细指南，包含海滨花火大会、传统祭典等举办时间、地点、交通方式、观赏攻略等实用信息。体验千叶县最精彩的文化活动，规划完美的日本关东之旅。涵盖木更津花火大会、市川花火大会、船桥花火大会等15个精选活动，提供详细的海岸观赏位置、最佳拍摄角度、交通指南等专业建议。',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.kanto-travel-guide.com/chiba',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/events/chiba-hanabi.jpg',
        width: 1200,
        height: 630,
        alt: '千叶县花火大会精彩瞬间',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '千叶县花火大会祭典攻略 - 海滨花火、传统祭典完整指南',
    description:
      '千叶县花火大会祭典详细指南，包含海滨花火大会、传统祭典等举办时间、地点、交通方式、观赏攻略等实用信息。体验千叶县最精彩的文化活动，规划完美的日本关东之旅。涵盖木更津花火大会、市川花火大会、船桥花火大会等15个精选活动，提供详细的海岸观赏位置、最佳拍摄角度、交通指南等专业建议。',
    images: ['/images/events/chiba-hanabi.jpg'],
  },
  alternates: {
    canonical: 'https://www.kanto-travel-guide.com/chiba',
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

export default function ChibaPage() {
  return (
    <RegionPageTemplate
      regionKey="chiba"
      config={{
        name: '千叶县',
        emoji: '🌊',
        bgColor: 'from-sky-50 to-cyan-100',
        themeColor: 'sky',
        prevRegion: {
          name: '埼玉',
          path: '/saitama',
          emoji: '🏢',
          bgColor: 'from-orange-50 to-amber-100',
        },
        nextRegion: {
          name: '神奈川',
          path: '/kanagawa',
          emoji: '⛵',
          bgColor: 'from-blue-100 to-blue-200',
        },
        featuredActivities: [
          {
            id: 'kamogawa-hanabi',
            title: '鸭川海岸花火大会',
            description: '太平洋海岸线上的夏日烟花',
            emoji: '🎆',
            bgColor: 'from-blue-50 to-blue-100',
          },
          {
            id: 'narita-gion-festival',
            title: '成田祇园祭',
            description: '成田山新胜寺的传统祭典',
            emoji: '⛩️',
            bgColor: 'from-red-50 to-orange-100',
          },
          {
            id: 'kujukuri-beach',
            title: '九十九里海岸祭',
            description: '千叶著名海岸的夏日庆典',
            emoji: '🏖️',
            bgColor: 'from-yellow-50 to-orange-100',
          },
        ],
      }}
    />
  );
}
