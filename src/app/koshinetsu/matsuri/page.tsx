import MatsuriPageTemplate from '@/components/MatsuriPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    '甲信越传统祭典2025 - 信州诹访大社祭山梨大神社祭新潟祭典等山间祭典完整攻略',
  description:
    '甲信越地区2025年传统祭典完整指南，体验信州诹访大社祭的庄严神事、山梨大神社祭的传统仪式、新潟祭典的雪国文化等8个精彩传统活动。涵盖长野、山梨、新潟三县，提供详细的举办时间、观赏地点、历史文化背景、交通方式，感受甲信越地区深厚的山岳文化与雪国民俗传统之美。',
  keywords: [
    '甲信越传统祭典',
    '信州诹访大社祭',
    '山梨大神社祭',
    '新潟祭典',
    '甲信越祭典',
    '长野祭典',
    '山梨祭典',
    '新潟祭典',
    '2025祭典',
    '甲信越地区',
    '山岳文化',
    '雪国民俗',
    '日本传统文化',
    '诹访大社',
    '信州文化',
  ],
  openGraph: {
    title:
      '甲信越传统祭典2025 - 信州诹访大社祭山梨大神社祭新潟祭典等山间祭典完整攻略',
    description:
      '甲信越地区2025年传统祭典完整指南，信州诹访大社祭、山梨大神社祭、新潟祭典等8个精彩活动等您来体验。感受甲信越地区深厚的山岳文化与雪国民俗传统。',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.kanto-travel-guide.com/koshinetsu/matsuri',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/matsuri/koshinetsu-matsuri.svg',
        width: 1200,
        height: 630,
        alt: '甲信越传统祭典',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      '甲信越传统祭典2025 - 信州诹访大社祭山梨大神社祭新潟祭典等山间祭典完整攻略',
    description:
      '甲信越地区2025年传统祭典完整指南，诹访大社祭、新潟祭典等8个精彩活动等您来体验。',
    images: ['/images/matsuri/koshinetsu-matsuri.svg'],
  },
  alternates: {
    canonical: '/koshinetsu/matsuri',
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

export default function KoshinetsuMatsuriPage() {
  // 静态祭典数据 - 只保留有详情链接的祭典活动
  const matsuriEvents = [
    {
      id: 'matsumoto-castle-taiko',
      title: '第37回国宝松本城太鼓まつり',
      _sourceData: {
        japaneseName:
          '第37回国宝松本城太鼓まつり（こくほうまつもとじょうたいこまつり）',
        japaneseDescription: '第37回国宝松本城太鼓まつり',
      },
      englishName: 'The 37th National Treasure Matsumoto Castle Taiko Festival',
      date: '2025年7月26日～27日',
      location: '長野県松本市 国宝松本城二の丸御殿跡',
      category: '太鼓祭り',
      highlights: [
        '国宝松本城を舞台',
        '全国各地からの出演団体',
        '大迫力の太鼓演奏',
        '入場無料',
        'プロゲストとの合同演奏',
      ],
      likes: 150,
      website: 'https://visitmatsumoto.com/',
      description:
        '国宝松本城を舞台に開催される太鼓まつり。全国各地から集まった出演団体による迫力ある太鼓演奏が披露され、プロゲストとの合同演奏のフィナーレは圧巻です。',
      detailLink: '/koshinetsu/matsuri/matsumoto-castle-taiko',
    },
  ];

  const regionConfig = {
    name: '甲信越',
    displayName: '甲信越',
    emoji: '🗻',
    gradientColors: 'from-purple-100 to-blue-200',
    description: '山岳信仰与花火文化的圣地',
    navigationLinks: {
      prev: { name: '北关东', url: '/kitakanto/matsuri', emoji: '♨️' },
      next: { name: '东京', url: '/tokyo/matsuri', emoji: '🗼' },
      current: { name: '甲信越活动', url: '/koshinetsu' },
    },
  };

  return (
    <MatsuriPageTemplate
      region={regionConfig}
      events={matsuriEvents}
      pageTitle="甲信越传统祭典活动列表"
      pageDescription="甲信越地区融合山岳信仰与花火文化，从御柱祭到长冈花火，感受千年传承的祭典魅力。"
      regionKey="koshinetsu"
      activityKey="matsuri"
    />
  );
}
