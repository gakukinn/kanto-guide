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
    id: 'sawara-taisai',
    title: '佐原大祭',
    _sourceData: {
      japaneseName: '佐原大祭',
      japaneseDescription: '佐原大祭',
    },
    englishName: 'Sawara Grand Festival',
    name: '佐原大祭',
    date: '2025-07-12',
    dates: '2025年7月12-14日',
    endDate: '2025-07-14',
    location: '香取市佐原',
    venue: '佐原市街地',
    highlights: ['🚗 山车巡游', '🎭 传统艺能', '🏛️ 江户风情', '🌊 利根川'],
    features: ['🚗 山车巡游', '🎭 传统艺能', '🏛️ 江户风情', '🌊 利根川'],
    likes: 389,
    website: 'https://www.city.katori.lg.jp/',
    description:
      '佐原大祭是千叶县最著名的传统祭典，以精美的山车和传统艺能表演闻名。在保留江户时代风貌的佐原老街中，华丽的山车穿行其间，重现历史的辉煌。',
    category: '山车祭典',
    prefecture: '千叶县',
    region: 'chiba',
  },
  {
    id: 'mobara-tanabata',
    title: '茂原七夕祭',
    _sourceData: {
      japaneseName: '茂原七夕祭典',
      japaneseDescription: '茂原七夕祭典',
    },
    englishName: 'Mobara Tanabata Festival',
    name: '茂原七夕祭',
    date: '2025-07-25',
    dates: '2025年7月25-27日',
    endDate: '2025-07-27',
    location: '茂原市',
    venue: '茂原市中心商店街',
    highlights: ['🎋 七夕装饰', '🌟 竹饰艺术', '🎨 手工艺品', '🌃 夜间灯饰'],
    features: ['🎋 七夕装饰', '🌟 竹饰艺术', '🎨 手工艺品', '🌃 夜间灯饰'],
    likes: 267,
    website: 'https://www.city.mobara.chiba.jp/',
    description:
      '茂原七夕祭以华丽的竹饰装饰闻名，整个商店街都被五彩斑斓的七夕装饰覆盖。夏夜中灯火辉煌的竹饰在微风中摇曳，创造出梦幻般的夏日风情。',
    category: '七夕祭典',
    prefecture: '千叶县',
    region: 'chiba',
  },
  {
    id: 'naritasan-matsuri',
    title: '成田山祭',
    _sourceData: {
      japaneseName: '成田山祭',
      japaneseDescription: '成田山祭',
    },
    englishName: 'Naritasan Festival',
    name: '成田山祭',
    date: '2025-04-28',
    dates: '2025年4月28-30日',
    endDate: '2025-04-30',
    location: '成田市',
    venue: '成田山新胜寺',
    highlights: [
      '🏯 成田山新胜寺',
      '🙏 宗教仪式',
      '🎌 传统表演',
      '🌸 春季祭典',
    ],
    features: ['🏯 成田山新胜寺', '🙏 宗教仪式', '🎌 传统表演', '🌸 春季祭典'],
    likes: 324,
    website: 'https://www.naritasan.or.jp/',
    description:
      '成田山祭在著名的成田山新胜寺举行，是一场庄严的宗教祭典。春天的樱花季节中，传统的宗教仪式与文化表演相结合，展现日本深厚的佛教文化传统。',
    category: '宗教祭典',
    prefecture: '千叶县',
    region: 'chiba',
  },
];

export default function ChibaMatsuri() {
  return (
    <MatsuriPageTemplate
      region={chibaRegionConfig}
      events={chibaMatsuriEvents}
      pageTitle="千叶传统祭典"
      pageDescription="探索千叶县的传统祭典文化，佐原大祭、茂原七夕祭等知名祭典汇聚千叶"
      regionKey="chiba"
      activityKey="matsuri"
    />
  );
}
