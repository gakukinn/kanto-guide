import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { Metadata } from 'next';
import { yamanakakoHanabiData } from '../../../../data/hanabi/koshinetsu/level4-august-yamanakako-houkosai-hanabi';

// SEO元数据配置
export const metadata: Metadata = {
  title: '山中湖「報湖祭」花火大会 2025 | 甲信越花火指南',
  description:
    '2025年8月1日举办的山中湖「報湖祭」花火大会的详细信息。大正时代延续至今的历史花火大会，以富士山为背景的1万发花火照亮湖面。交通、观赏到完全指南。',
  keywords: [
    '山中湖',
    '報湖祭',
    '花火大会',
    '2025',
    '富士山',
    '湖上花火',
    '山梨县',
    '南都留郡山中湖村',
  ],
  openGraph: {
    title: '山中湖「報湖祭」花火大会 2025',
    description:
      '以富士山为背景的1万发花火照亮湖面，自大正时代延续的历史花火大会',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.kanto-travel-guide.com/koshinetsu/hanabi/yamanakako-houkosai-hanabi',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/hanabi/yamanakako-houkosai/yamanakako-houkosai-main.jpg',
        width: 800,
        height: 600,
        alt: '山中湖報湖祭花火大会主会场',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '山中湖「報湖祭」花火大会 2025',
    description:
      '以富士山为背景的1万发花火照亮湖面，自大正时代延续的历史花火大会',
    images: ['/images/hanabi/yamanakako-houkosai/yamanakako-houkosai-main.jpg'],
  },
  alternates: {
    canonical: '/koshinetsu/hanabi/yamanakako-houkosai-hanabi',
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

export default function YamanakakoHoukosaiHanabiPage() {
  return (
    <HanabiDetailTemplate data={yamanakakoHanabiData} regionKey="koshinetsu" />
  );
}

// 静态生成配置
export const dynamic = 'force-static';
export const revalidate = 86400; // 24小时重新验证
