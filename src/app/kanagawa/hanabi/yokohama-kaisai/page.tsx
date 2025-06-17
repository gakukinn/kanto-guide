import { Metadata } from 'next';
import HanabiDetailTemplate from '../../../../components/HanabiDetailTemplate';
import { yokohamaKaisaiHanabiData } from '../../../../data/hanabi/kanagawa/level4-yokohama-kaisai-hanabi';

// SEO元数据配置
export const metadata: Metadata = {
  title: yokohamaKaisaiHanabiData.title,
  description: yokohamaKaisaiHanabiData.description,
  keywords: '横滨开港祭花火,横滨港,红砖仓库,神奈川县花火,2025年6月,海港花火',
  openGraph: {
    title: yokohamaKaisaiHanabiData.title,
    description: yokohamaKaisaiHanabiData.description,
    url: 'https://kanto-guide.vercel.app/kanagawa/hanabi/yokohama-kaisai',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/hanabi/yokohama-kaisai/yokohama-kaisai-main.jpg',
        width: 1200,
        height: 630,
        alt: '横滨开港祭花火大会',
      },
    ],
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: yokohamaKaisaiHanabiData.title,
    description: yokohamaKaisaiHanabiData.description,
    images: ['/images/hanabi/yokohama-kaisai/yokohama-kaisai-main.jpg'],
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
  alternates: {
    canonical: 'https://kanto-guide.vercel.app/kanagawa/hanabi/yokohama-kaisai',
  },
};

export default function YokohamaKaisaiHanabiPage() {
  return (
    <HanabiDetailTemplate
      data={yokohamaKaisaiHanabiData}
      regionKey="kanagawa"
    />
  );
}
