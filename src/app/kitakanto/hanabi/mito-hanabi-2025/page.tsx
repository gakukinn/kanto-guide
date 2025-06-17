import { Metadata } from 'next';
import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { mitoHanabiData } from '@/data/hanabi/kitakanto/mito-hanabi-2025';

export const metadata: Metadata = {
  title: mitoHanabiData.title,
  description: mitoHanabiData.description,
  keywords:
    '水戸花火大会, 茨城县花火, 千波湖花火, 水戸黄门祭, 关东花火大会, 2025年花火',
  openGraph: {
    title: mitoHanabiData.title,
    description: mitoHanabiData.description,
    url: 'https://kanto-guide.vercel.app/kitakanto/hanabi/mito-hanabi-2025',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/hanabi/mito-hanabi-main.svg',
        width: 1200,
        height: 630,
        alt: '第65回 水戸黄门祭 水戸偕楽园花火大会',
      },
    ],
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: mitoHanabiData.title,
    description: mitoHanabiData.description,
    images: ['/images/hanabi/mito-hanabi-main.svg'],
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
    canonical:
      'https://kanto-guide.vercel.app/kitakanto/hanabi/mito-hanabi-2025',
  },
};

export default function MitoHanabiPage() {
  return <HanabiDetailTemplate data={mitoHanabiData} regionKey="kitakanto" />;
}
