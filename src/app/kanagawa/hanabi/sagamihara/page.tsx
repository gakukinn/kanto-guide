import { Metadata } from 'next';
import HanabiDetailTemplate from '../../../../components/HanabiDetailTemplate';
import { sagamiharaHanabiData } from '../../../../data/hanabi/kanagawa/level4-sagamihara-hanabi';

// SEO元数据配置
export const metadata: Metadata = {
  title: sagamiharaHanabiData.title,
  description: sagamiharaHanabiData.description,
  keywords: '相模原花火,相模川,神奈川县花火,2025年8月,夏季花火',
  openGraph: {
    title: sagamiharaHanabiData.title,
    description: sagamiharaHanabiData.description,
    url: 'https://kanto-guide.vercel.app/kanagawa/hanabi/sagamihara',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/hanabi/sagamihara/sagamihara-main.jpg',
        width: 1200,
        height: 630,
        alt: '相模原花火大会',
      },
    ],
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: sagamiharaHanabiData.title,
    description: sagamiharaHanabiData.description,
    images: ['/images/hanabi/sagamihara/sagamihara-main.jpg'],
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
    canonical: 'https://kanto-guide.vercel.app/kanagawa/hanabi/sagamihara',
  },
};

export default function SagamiharaHanabiPage() {
  return (
    <HanabiDetailTemplate data={sagamiharaHanabiData} regionKey="kanagawa" />
  );
}
