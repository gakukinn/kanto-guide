import { Metadata } from 'next';
import HanabiDetailTemplate from '../../../../components/HanabiDetailTemplate';
import { kawasaiTamagawaHanabiData } from '../../../../data/hanabi/kanagawa/level4-kawasaki-tamagawa-hanabi';

// SEO元数据配置
export const metadata: Metadata = {
  title: kawasaiTamagawaHanabiData.title,
  description: kawasaiTamagawaHanabiData.description,
  keywords:
    '川崎多摩川花火,川崎市制記念,多摩川河川敷,神奈川县花火,2025年10月,免费观赏',
  openGraph: {
    title: kawasaiTamagawaHanabiData.title,
    description: kawasaiTamagawaHanabiData.description,
    url: 'https://kanto-guide.vercel.app/kanagawa/hanabi/kawasaki-tamagawa',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/hanabi/kawasaki-tamagawa/kawasaki-tamagawa-main.jpg',
        width: 1200,
        height: 630,
        alt: '第84回川崎市制記念多摩川花火大会',
      },
    ],
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: kawasaiTamagawaHanabiData.title,
    description: kawasaiTamagawaHanabiData.description,
    images: ['/images/hanabi/kawasaki-tamagawa/kawasaki-tamagawa-main.jpg'],
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
      'https://kanto-guide.vercel.app/kanagawa/hanabi/kawasaki-tamagawa',
  },
};

export default function KawasakiTamagawaHanabiPage() {
  return (
    <HanabiDetailTemplate
      data={kawasaiTamagawaHanabiData}
      regionKey="kanagawa"
    />
  );
}

// 静态生成配置
export const dynamic = 'force-static';
export const revalidate = 86400; // 24小时重新验证
