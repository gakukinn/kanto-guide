import { Metadata } from 'next';
import HanabiDetailTemplate from '../../../../components/HanabiDetailTemplate';
import { asahiIiokaYouYuFestivalData } from '../../../../data/hanabi/chiba/level4-asahi-iioka-you-yu-hanabi';

// SEO元数据配置
export const metadata: Metadata = {
  title: asahiIiokaYouYuFestivalData.title,
  description: asahiIiokaYouYuFestivalData.description,
  keywords:
    '旭市YOU遊节庆,飯岡海岸,千叶县花火,海浜花火大会,2025年10月,免费观赏',
  openGraph: {
    title: asahiIiokaYouYuFestivalData.title,
    description: asahiIiokaYouYuFestivalData.description,
    url: 'https://kanto-guide.vercel.app/chiba/hanabi/asahi-iioka-you-yu',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/hanabi/asahi-iioka-1.jpg',
        width: 1200,
        height: 630,
        alt: '旭市YOU遊节庆海浜花火大会',
      },
    ],
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: asahiIiokaYouYuFestivalData.title,
    description: asahiIiokaYouYuFestivalData.description,
    images: ['/images/hanabi/asahi-iioka-1.jpg'],
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
    canonical: 'https://kanto-guide.vercel.app/chiba/hanabi/asahi-iioka-you-yu',
  },
};

export default function AsahiIiokaYouYuFestivalPage() {
  return (
    <HanabiDetailTemplate
      data={asahiIiokaYouYuFestivalData}
      regionKey="chiba"
    />
  );
}

// 静态生成配置
export const dynamic = 'force-static';
export const revalidate = 86400; // 24小时重新验证
