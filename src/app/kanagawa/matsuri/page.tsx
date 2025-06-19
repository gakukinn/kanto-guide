import MatsuriPageTemplate from '@/components/MatsuriPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '神奈川传统祭典2025 - 湘南平塚七夕祭详细攻略',
  description:
    '神奈川县2025年传统祭典指南，重点介绍湘南ひらつか七夕まつり这一湘南地区最大級的七夕祭典。提供详细的举办时间、观赏地点、交通方式、活动内容，感受湘南地区夏日祭典的魅力与传统文化之美。',
  keywords: [
    '神奈川传统祭典',
    '镰仓祭',
    '湘南平塚七夕祭',
    '小田原梅祭',
    '神奈川祭典',
    '古都祭典',
    '海滨祭典',
    '梅祭',
    '2025祭典',
    '关东祭典',
    '神奈川旅游',
    '日本传统文化',
    '湘南地区祭典',
    '海洋文化',
    '文化传承',
  ],
  openGraph: {
    title: '神奈川传统祭典2025 - 湘南平塚七夕祭详细攻略',
    description:
      '神奈川县2025年传统祭典指南，湘南ひらつか七夕まつり湘南地区最大級の七夕祭典详细介绍。感受湘南地区夏日祭典的魅力与传统文化之美。',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.kanto-travel-guide.com/kanagawa/matsuri',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/matsuri/kanagawa-matsuri.svg',
        width: 1200,
        height: 630,
        alt: '神奈川传统祭典',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '神奈川传统祭典2025 - 湘南平塚七夕祭详细攻略',
    description:
      '神奈川县2025年传统祭典指南，湘南ひらつか七夕まつり湘南地区最大級の七夕祭典详细介绍。',
    images: ['/images/matsuri/kanagawa-matsuri.svg'],
  },
  alternates: {
    canonical: '/kanagawa/matsuri',
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
const kanagawaRegionConfig = {
  name: 'kanagawa',
  displayName: '神奈川',
  emoji: '⛩️',
  description:
    '神奈川县湘南地区举办着关东地区最大級の七夕祭典，湘南ひらつか七夕まつり以其华丽的竹饰装饰和传统文化魅力吸引着众多游客，展现着神奈川独特的夏日祭典风情。',
  navigationLinks: {
    prev: { name: '东京祭典', url: '/tokyo/matsuri', emoji: '🏮' },
    next: { name: '千叶祭典', url: '/chiba/matsuri', emoji: '🌸' },
    current: { name: '神奈川活动', url: '/kanagawa' },
  },
};

// 神奈川祭典事件数据（仅包含有四层详情页面的活动）
const kanagawaMatsuriEvents = [
  {
    id: 'hiratsuka-tanabata',
    title: '湘南平塚七夕祭',
    _sourceData: {
      japaneseName: '湘南ひらつか七夕まつり',
      japaneseDescription: '湘南ひらつか七夕まつり',
    },
    englishName: 'Shonan Hiratsuka Tanabata Festival',
    name: '湘南平塚七夕祭',
    date: '2025-07-04',
    dates: '2025年7月4-6日',
    endDate: '2025-07-06',
    location: '神奈川県平塚市',
    venue: 'ＪＲ平塚駅北口商店街を中心とする市内各所',
    highlights: [
      '🎋 华やかな七夕装飾',
      '🌊 湘南地区最大級',
      '🎨 商店街を彩る竹飾り',
      '🌟 約500店舗の出店',
    ],
    features: [
      '🎋 华やかな七夕装飾',
      '🌊 湘南地区最大級',
      '🎨 商店街を彩る竹飾り',
      '🌟 約500店舗の出店',
    ],
    likes: 1250,
    website: 'https://www.jalan.net/event/evt_343917/',
    description:
      '湘南ひらつか七夕まつりは神奈川県平塚市で毎年7月に開催される湘南地区最大級の七夕祭りです。ＪＲ平塚駅北口商店街を中心とする市内各所が色とりどりの美しい七夕装飾で彩られ、約500店舗が出店する賑やかなお祭りです。',
    category: '七夕祭り',
    prefecture: '神奈川県',
    region: 'kanagawa',
    detailLink: '/kanagawa/matsuri/hiratsuka-tanabata',
    organizer: '湘南ひらつか七夕まつり実行委員会',
    contact:
      '湘南ひらつか七夕まつり実行委員会（平塚市商業観光課内）　0463-35-8107',
    access: 'ＪＲ東海道本線「平塚駅」から徒歩2分',
    schedule: '七夕まつり終了時間/20:00（最終日は19:00）',
  },
];

export default function KanagawaMatsuri() {
  return (
    <MatsuriPageTemplate
      region={kanagawaRegionConfig}
      events={kanagawaMatsuriEvents}
      pageTitle="神奈川传统祭典活动列表"
      pageDescription="体验神奈川湘南地区最大級の七夕祭典，湘南ひらつか七夕まつり华丽竹饰装饰与传统文化魅力"
      regionKey="kanagawa"
      activityKey="matsuri"
    />
  );
}
