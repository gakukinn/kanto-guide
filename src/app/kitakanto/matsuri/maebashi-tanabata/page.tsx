import MatsuriDetailTemplate from '@/components/MatsuriDetailTemplate';
import { MatsuriEvent } from '@/utils/matsuri-data-validator';
import { Metadata } from 'next';

// 基于爬取数据的前橋七夕まつり详情
const maebashiTanabataData: MatsuriEvent = {
  id: 'maebashi-tanabata',
  title: '前橋七夕まつり',
  japaneseName: '前橋七夕まつり',
  englishName: 'Maebashi Tanabata Festival',
  date: '2025年7月11日～13日',
  endDate: '2025-07-13',
  location: '前橋市',
  category: '七夕祭り',
  highlights: [
    '🎋 伝統的な七夕飾り',
    '🏮 前橋市中心市街地開催',
    '📅 3日間開催',
    '🌙 夜間開催（21:30まで）',
  ],
  likes: 145,
  website: 'https://maebashi-tanabata.jp/',
  description:
    '前橋七夕まつりの開催期間：2025年7月11日～13日。じゃらんnetでは前橋七夕まつりへの口コミや投稿写真をご紹介。前橋七夕まつりへのアクセス情報や混雑状況などもご確認頂けます。前橋七夕まつり周辺のホテル/観光スポット/ご当地グルメ/イベント情報も充実。',

  // 从爬取数据中提取的详细信息
  address: '群馬県前橋市千代田町',
  schedule: '2025年7月11日～13日　10:00～21:30',
  venue: '前橋市　前橋市中心市街地',
  access:
    'ＪＲ「前橋駅」から徒歩10分、または関越自動車道「前橋IC」から車約10分',
  organizer: '前橋七夕まつり実施委員会',
  contact:
    '前橋七夕まつり実施委員会事務局（前橋市まちづくり公社内）　027-289-5565',
  googleMapsUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3225.7!2d139.072396!3d36.388833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDIzJzE5LjgiTiAxMznCsDA0JzIwLjYiRQ!5e0!3m2!1sja!2sjp!4v1750338645000!5m2!1sja!2sjp',

  // 媒体内容
  media: [
    {
      type: 'image' as const,
      url: '/images/kitakanto/Matsuri/Maebashi Tanabata Festival/Maebashi Tanabata Festival (1).jpg',
      title: '前橋七夕まつり会場風景',
      description: '前橋七夕まつりの美しい七夕飾りの風景',
      alt: '前橋七夕まつり会場風景',
      caption: '前橋七夕まつりの美しい七夕飾り',
    },
    {
      type: 'image' as const,
      url: '/images/kitakanto/Matsuri/Maebashi Tanabata Festival/Maebashi Tanabata Festival (2).jpg',
      title: '前橋七夕まつり夜景',
      description: '夜間に輝く前橋七夕まつりの幻想的な風景',
      alt: '前橋七夕まつり夜景',
      caption: '夜間開催の美しい七夕飾り（21:30まで）',
    },
    {
      type: 'image' as const,
      url: '/images/kitakanto/Matsuri/Maebashi Tanabata Festival/Maebashi Tanabata Festival (3).jpg',
      title: '前橋市中心市街地の七夕祭り',
      description: '前橋市中心市街地で開催される七夕まつりの賑わい',
      alt: '前橋市中心市街地の七夕祭り',
      caption: '前橋市中心市街地での七夕まつりの様子',
    },
  ],
};

export const metadata: Metadata = {
  title: '前橋七夕まつり2025 - 群馬県前橋市の伝統七夕祭典 | 関東旅游指南',
  description:
    '2025年7月11日～13日開催の前橋七夕まつり完全ガイド。前橋市中心市街地で行われる美しい七夕飾りと伝統文化を体験。アクセス方法、開催場所、主催者情報など詳細な観光情報をご紹介。群馬県北関東地区最大級の七夕祭典の魅力を発見しよう。',
  keywords: [
    '前橋七夕まつり',
    '前橋祭典',
    '群馬県祭典',
    '七夕祭り',
    '北関東祭典',
    '前橋市',
    '2025年祭典',
    '関東祭典',
    '日本传统文化',
    '七夕文化',
    '群馬観光',
    '前橋観光',
    '夏祭り',
    '伝統祭典',
  ],
  openGraph: {
    title: '前橋七夕まつり2025 - 群馬県前橋市の伝統七夕祭典',
    description:
      '2025年7月11日～13日開催。前橋市中心市街地で美しい七夕飾りを楽しめる群馬県最大級の七夕祭典。',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.kanto-travel-guide.com/kitakanto/matsuri/maebashi-tanabata',
    siteName: '関東旅游指南',
    images: [
      {
        url: '/images/kitakanto/Matsuri/Maebashi Tanabata Festival/Maebashi Tanabata Festival (1).jpg',
        width: 1200,
        height: 630,
        alt: '前橋七夕まつり',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '前橋七夕まつり2025 - 群馬県前橋市の伝統七夕祭典',
    description:
      '2025年7月11日～13日開催。前橋市中心市街地で美しい七夕飾りを楽しめる七夕祭典。',
    images: [
      '/images/kitakanto/Matsuri/Maebashi Tanabata Festival/Maebashi Tanabata Festival (1).jpg',
    ],
  },
  alternates: {
    canonical: '/kitakanto/matsuri/maebashi-tanabata',
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

export default function MaebashiTanabataPage() {
  return (
    <MatsuriDetailTemplate data={maebashiTanabataData} regionKey="kitakanto" />
  );
}
