import { Metadata } from 'next';
import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { kogaHanabiData } from '@/data/hanabi/kitakanto/koga-hanabi-2025';

export const metadata: Metadata = {
  title: kogaHanabiData.title,
  description: kogaHanabiData.description,
  keywords:
    '古河花火大会, 茨城县花火, 三尺玉, 渡良瀬川花火, 关东花火大会, 2025年花火',
  openGraph: {
    title: kogaHanabiData.title,
    description: kogaHanabiData.description,
    url: 'https://kanto-guide.vercel.app/kitakanto/hanabi/koga-hanabi-2025',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/hanabi/koga-hanabi-main.svg',
        width: 1200,
        height: 630,
        alt: '第20回 古河花火大会',
      },
    ],
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: kogaHanabiData.title,
    description: kogaHanabiData.description,
    images: ['/images/hanabi/koga-hanabi-main.svg'],
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
      'https://kanto-guide.vercel.app/kitakanto/hanabi/koga-hanabi-2025',
  },
};

export default function KogaHanabiPage() {
  return <HanabiDetailTemplate data={kogaHanabiData} regionKey="kitakanto" />;
}
