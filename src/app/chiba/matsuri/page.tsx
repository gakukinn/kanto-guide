import MatsuriPageTemplate from '@/components/MatsuriPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '千叶传统祭典2025 - 佐原大祭茂原七夕祭成田山祭等千叶祭典完整攻略',
  description:
    '千叶县2025年传统祭典完整指南，体验佐原大祭的山车巡游、茂原七夕祭的华丽装饰、成田山祭的庄严仪式等12个精彩传统活动。提供详细的举办时间、观赏地点、历史文化背景、交通方式，感受关东地区千年文化传承的精髓，探索千叶独特的祭典魅力与传统艺能之美。',
  keywords: [
    '千叶传统祭典',
    '佐原大祭',
    '茂原七夕祭',
    '成田山祭',
    '千叶祭典',
    '山车祭典',
    '七夕祭典',
    '成田山',
    '2025祭典',
    '关东祭典',
    '千叶旅游',
    '日本传统文化',
    '关东地区祭典',
    '传统艺能',
    '文化传承',
  ],
  openGraph: {
    title: '千叶传统祭典2025 - 佐原大祭茂原七夕祭成田山祭等千叶祭典完整攻略',
    description:
      '千叶县2025年传统祭典完整指南，佐原大祭、茂原七夕祭、成田山祭等12个精彩活动等您来体验。感受关东地区千年文化传承的精髓。',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.kanto-travel-guide.com/chiba/matsuri',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/matsuri/chiba-matsuri.svg',
        width: 1200,
        height: 630,
        alt: '千叶传统祭典',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '千叶传统祭典2025 - 佐原大祭茂原七夕祭成田山祭等千叶祭典完整攻略',
    description:
      '千叶县2025年传统祭典完整指南，佐原大祭、茂原七夕祭等12个精彩活动等您来体验。',
    images: ['/images/matsuri/chiba-matsuri.svg'],
  },
  alternates: {
    canonical: '/chiba/matsuri',
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

// 地区配置 - 使用标准配色系统
const chibaRegionConfig = {
  name: 'chiba',
  displayName: '千叶',
  emoji: '🌸',
  description:
    '千叶县拥有丰富的传统祭典文化，从江户时代传承至今的佐原大祭、成田山的庄严仪式、茂原七夕祭的华丽装饰，每一个祭典都承载着深厚的历史文化底蕴。',
  navigationLinks: {
    prev: { name: '神奈川祭典', url: '/kanagawa/matsuri', emoji: '⛩️' },
    next: { name: '埼玉祭典', url: '/saitama/matsuri', emoji: '🏮' },
    current: { name: '千叶活动', url: '/chiba' },
  },
};

// 千叶祭典事件数据（基于 omaturilink.com 官方数据）
const chibaMatsuriEvents = [
  {
    id: 'narita-gion-festival',
    title: '成田祇园祭',
    _sourceData: {
      japaneseName: '成田祇園祭',
      japaneseDescription: '成田祇園祭',
    },
    englishName: 'Narita Gion Festival',
    name: '成田祇园祭',
    date: '2025-07-04',
    dates: '2025年7月4-6日',
    endDate: '2025-07-06',
    location: '成田市',
    venue: '成田山新勝寺とその周辺',
    highlights: [
      '🏮 祇园会祭礼',
      '⛩️ 奥之院开帐',
      '🚗 山车巡游',
      '🎭 传统表演',
      '🙏 40万人参加',
      '📿 300年历史',
    ],
    features: [
      '🏮 祇园会祭礼',
      '⛩️ 奥之院开帐',
      '🚗 山车巡游',
      '🎭 传统表演',
      '🙏 40万人参加',
      '📿 300年历史',
    ],
    likes: 420,
    website: 'https://www.nrtk.jp/enjoy/shikisaisai/gion-festival.html',
    description:
      '成田祇园祭是为供养成田山新勝寺奥之院大日如来而举行的历史悠久的夏祭。以约300年历史的"成田山祇园会"为中心，豪华绚烂的御舆和10台山车在市内巡游3天，传统舞蹈与囃子竞演热闹非凡，每年吸引40万人以上观赏。',
    category: '祇园祭',
    prefecture: '千叶县',
    region: 'chiba',
    detailLink: '/chiba/matsuri/narita-gion-festival',
  },
];

export default function ChibaMatsuri() {
  return (
    <MatsuriPageTemplate
      region={chibaRegionConfig}
      events={chibaMatsuriEvents}
      pageTitle="千叶传统祭典活动列表"
      pageDescription="探索千叶县的传统祭典文化，佐原大祭、茂原七夕祭等知名祭典汇聚千叶"
      regionKey="chiba"
      activityKey="matsuri"
    />
  );
}
