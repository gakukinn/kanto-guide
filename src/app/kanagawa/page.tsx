import RegionPageTemplate from '@/components/RegionPageTemplate';
import { Metadata } from 'next';

// SEO元数据配置
export const metadata: Metadata = {
  title: '神奈川县花火大会祭典攻略 - 横滨港祭、镰仓祭完整指南',
  description:
    '神奈川县花火大会祭典详细指南，包含横滨港祭花火、镰仓祭、湘南海岸祭等举办时间、地点、交通方式、观赏攻略等实用信息。体验神奈川县最精彩的文化活动，规划完美的日本关东之旅。涵盖横滨花火大会、镰仓花火大会、小田原花火大会等15个精选活动，提供详细的海岸观赏位置、最佳拍摄角度、交通指南等专业建议。',
  keywords: [
    '神奈川县花火大会',
    '横滨港祭',
    '镰仓祭',
    '神奈川县祭典',
    '日本花火',
    '2025年花火',
    '传统文化',
    '日本旅游',
    '关东旅游',
  ],
  openGraph: {
    title: '神奈川县花火大会祭典攻略 - 横滨港祭、镰仓祭完整指南',
    description:
      '神奈川县花火大会祭典详细指南，包含横滨港祭花火、镰仓祭、湘南海岸祭等举办时间、地点、交通方式、观赏攻略等实用信息。体验神奈川县最精彩的文化活动，规划完美的日本关东之旅。',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.kanto-travel-guide.com/kanagawa',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/events/kanagawa-hanabi.jpg',
        width: 1200,
        height: 630,
        alt: '神奈川县花火大会精彩瞬间',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '神奈川县花火大会祭典攻略 - 横滨港祭、镰仓祭完整指南',
    description:
      '神奈川县花火大会祭典详细指南，包含横滨港祭花火、镰仓祭、湘南海岸祭等举办时间、地点、交通方式、观赏攻略等实用信息。体验神奈川县最精彩的文化活动，规划完美的日本关东之旅。',
    images: ['/images/events/kanagawa-hanabi.jpg'],
  },
  alternates: {
    canonical: 'https://www.kanto-travel-guide.com/kanagawa',
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

export default function KanagawaPage() {
  return (
    <RegionPageTemplate
      regionKey="kanagawa"
      config={{
        name: '神奈川县',
        emoji: '⛵',
        bgColor: 'from-blue-100 to-blue-200',
        themeColor: 'blue',
        prevRegion: {
          name: '千叶',
          path: '/chiba',
          emoji: '🌊',
          bgColor: 'from-sky-50 to-cyan-100',
        },
        nextRegion: {
          name: '北关东',
          path: '/kitakanto',
          emoji: '🏔️',
          bgColor: 'from-green-50 to-emerald-100',
        },
        featuredActivities: [
          {
            id: 'hiratsuka-tanabata',
            title: '湘南平塚七夕祭',
            description: '神奈川県最大级的七夕祭典',
            emoji: '🎋',
            bgColor: 'from-pink-50 to-purple-100',
            detailLink: '/kanagawa/matsuri/hiratsuka-tanabata',
            imageUrl:
              '/images/kanagawa/Matsuri/Shonan Hiratsuka Tanabata Festival/Shonan Hiratsuka Tanabata Festival.jpg',
          },
          {
            id: 'yokohama-port-festival',
            title: '横浜港祭',
            description: '横滨港湾区的盛大烟花表演',
            emoji: '🎆',
            bgColor: 'from-blue-50 to-blue-100',
          },
          {
            id: 'kamakura-festival',
            title: '镰仓祭',
            description: '古都镰仓的传统祭典',
            emoji: '⛩️',
            bgColor: 'from-purple-50 to-indigo-100',
          },
        ],
      }}
    />
  );
}
