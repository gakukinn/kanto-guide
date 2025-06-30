import StructuredData from '@/components/StructuredData';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  ),
  title: {
    default: '关东旅游指南 - 花火大会、祭典活动完整攻略',
    template: '%s | 关东旅游指南',
  },
  description:
    '专业的关东地区旅游指南，提供最新的花火大会、祭典活动信息。包含东京、神奈川、千叶、埼玉、北关东、甲信越地区的详细活动攻略，助您规划完美的日本关东之旅。',
  keywords: [
    '关东旅游',
    '花火大会',
    '祭典活动',
    '东京旅游',
    '神奈川旅游',
    '千叶旅游',
    '埼玉旅游',
    '北关东旅游',
    '甲信越旅游',
    '日本旅游攻略',
    '2025花火大会',
    '日本祭典',
  ],
  authors: [{ name: '关东旅游指南团队' }],
  creator: '关东旅游指南',
  publisher: '关东旅游指南',
  category: '旅游',
  classification: '旅游指南',
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
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    siteName: '关东旅游指南',
    title: '关东旅游指南 - 花火大会、祭典活动完整攻略',
    description:
      '专业的关东地区旅游指南，提供最新的花火大会、祭典活动信息。包含东京、神奈川、千叶、埼玉、北关东、甲信越地区的详细活动攻略。',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '关东旅游指南 - 专业日本关东地区旅游信息',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '关东旅游指南 - 花火大会、祭典活动完整攻略',
    description:
      '专业的关东地区旅游指南，提供最新的花火大会、祭典活动信息。包含详细活动攻略，助您规划完美的日本关东之旅。',
    images: ['/og-image.jpg'],
    creator: '@kantoguide',
    site: '@kantoguide',
  },
  verification: {
    // Google Search Console 验证码 - 部署时需要替换为实际值
    // google: process.env.GOOGLE_VERIFICATION_CODE,
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  },
  other: {
    'theme-color': '#3b82f6',
    'msapplication-TileColor': '#3b82f6',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <head>
        {/* 组织结构化数据 */}
        <StructuredData type="organization" data={{}} />

        {/* 网站结构化数据 */}
        <StructuredData
          type="website"
          data={{
            name: '关东旅游指南',
            url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
            description:
              '专业的关东地区旅游指南，提供最新的花火大会、祭典活动信息',
            publisher: {
              name: '关东旅游指南团队',
              type: 'Organization',
            },
            sameAs: [
              'https://twitter.com/kantoguide',
              'https://facebook.com/kantoguide',
            ],
          }}
        />

        {/* 字体由Google Fonts自动加载 */}

        {/* 预连接到外部域名 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* 网站图标 */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
