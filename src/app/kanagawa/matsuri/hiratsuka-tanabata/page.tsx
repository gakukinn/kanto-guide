import MatsuriDetailTemplate from '@/components/MatsuriDetailTemplate';
import { MatsuriEvent } from '@/utils/matsuri-data-validator';
import { Metadata } from 'next';

// SEO元数据配置
export const metadata: Metadata = {
  title: '湘南平塚七夕祭详情 - 神奈川县传统祭典完整攻略',
  description:
    '湘南ひらつか七夕まつり详细介绍，2025年7月4日-6日在神奈川县平塚市举办。包含举办时间、地点、交通方式、观赏攻略等实用信息。体验神奈川县最具特色的七夕祭典，感受传统文化魅力。',
  keywords: [
    '湘南平塚七夕祭',
    '湘南ひらつか七夕まつり',
    '神奈川县祭典',
    '平塚市活动',
    '七夕祭典',
    '传统文化',
    '日本祭典',
    '关东旅游',
    '神奈川旅游',
  ],
  openGraph: {
    title: '湘南平塚七夕祭详情 - 神奈川县传统祭典完整攻略',
    description:
      '湘南ひらつか七夕まつり详细介绍，2025年7月4日-6日在神奈川县平塚市举办。包含举办时间、地点、交通方式、观赏攻略等实用信息。',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.kanto-travel-guide.com/kanagawa/matsuri/hiratsuka-tanabata',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/kanagawa/Matsuri/Shonan Hiratsuka Tanabata Festival/Shonan Hiratsuka Tanabata Festival.jpg',
        width: 1200,
        height: 630,
        alt: '湘南平塚七夕祭精彩瞬间',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '湘南平塚七夕祭详情 - 神奈川县传统祭典完整攻略',
    description:
      '湘南ひらつか七夕まつり详细介绍，2025年7月4日-6日在神奈川县平塚市举办。包含举办时间、地点、交通方式、观赏攻略等实用信息。',
    images: [
      '/images/kanagawa/Matsuri/Shonan Hiratsuka Tanabata Festival/Shonan Hiratsuka Tanabata Festival.jpg',
    ],
  },
  alternates: {
    canonical:
      'https://www.kanto-travel-guide.com/kanagawa/matsuri/hiratsuka-tanabata',
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

// 湘南平塚七夕祭数据
const hiratsukatanabataData: MatsuriEvent = {
  id: 'evt_343917',
  title: '湘南平塚七夕祭',
  japaneseName: '湘南ひらつか七夕まつり',
  englishName: 'Shonan Hiratsuka Tanabata Festival',
  date: '2025年7月4日～6日',
  location: '〒254-0043 神奈川県平塚市紅谷町',
  venue: 'ＪＲ平塚駅北口商店街を中心とする市内各所',
  access: 'ＪＲ東海道本線「平塚駅」から徒歩2分',
  organizer: '湘南ひらつか七夕まつり実行委員会',
  contact:
    '湘南ひらつか七夕まつり実行委員会（平塚市商業観光課内）　0463-35-8107',
  googleMapsUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3248.2!2d139.3491813!3d35.3273838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60185c3e5b1b7f4d%3A0x9c5a5c5a5c5a5c5a!2zSVLlubPloJPlnYzpqIQ!5e0!3m2!1sja!2sjp!4v1750327613634!5m2!1sja!2sjp',
  category: '七夕祭り',
  schedule: '七夕まつり終了時間/20:00（最終日は19:00）',
  highlights: [
    '華やかな七夕装飾',
    '湘南地区最大級の七夕祭り',
    '商店街を彩る竹飾り',
    '地域住民参加型イベント',
    '約500店舗の出店',
  ],
  likes: 1250,
  website: 'https://www.jalan.net/event/evt_343917/',
  description: `湘南ひらつか七夕まつりは、神奈川県平塚市で毎年7月に開催される湘南地区最大級の七夕祭りです。
    
ＪＲ平塚駅北口商店街を中心とする市内各所が、色とりどりの美しい七夕装飾で彩られ、約500店舗が出店する賑やかなお祭りです。

【開催概要】
・開催期間：2025年7月4日（金）～6日（日）
・開催時間：20:00まで（最終日は19:00）
・開催場所：ＪＲ平塚駅北口商店街を中心とする市内各所
・主催：湘南ひらつか七夕まつり実行委員会

【見どころ】
1. 華やかな七夕装飾：商店街を彩る美しい竹飾りと色とりどりの短冊
2. 地域参加型イベント：地域住民が一体となって作り上げる手作り感
3. 豊富な出店：約500店舗が出店する賑やかな屋台グルメ
4. アクセス良好：JR平塚駅から徒歩2分の好立地

【交通アクセス】
・ＪＲ東海道本線「平塚駅」から徒歩2分
・駅からすぐの商店街が会場のため、電車でのアクセスが便利

湘南の夏の風物詩として親しまれているこの七夕祭りで、日本の伝統文化を存分にお楽しみください。`,
  media: [
    {
      type: 'image',
      url: '/images/kanagawa/Matsuri/Shonan Hiratsuka Tanabata Festival/Shonan Hiratsuka Tanabata Festival.jpg',
      title: '華やかな七夕装飾',
      alt: '湘南平塚七夕祭の華やかな装飾',
      description: '商店街を彩る美しい七夕装飾',
    },
    {
      type: 'image',
      url: '/images/kanagawa/Matsuri/Shonan Hiratsuka Tanabata Festival/Shonan Hiratsuka Tanabata Festival.webp',
      title: '色とりどりの竹飾り',
      alt: '色とりどりの竹飾り',
      description: '地域住民手作りの竹飾りと短冊',
    },
    {
      type: 'image',
      url: '/images/kanagawa/Matsuri/Shonan Hiratsuka Tanabata Festival/Shonan Hiratsuka Tanabata Festival.jpeg',
      title: '賑わう会場の様子',
      alt: '賑わう会場の様子',
      description: '多くの人で賑わう平塚駅北口商店街',
    },
  ],
};

export default function HiratsukatanabataPage() {
  return (
    <MatsuriDetailTemplate data={hiratsukatanabataData} regionKey="kanagawa" />
  );
}
