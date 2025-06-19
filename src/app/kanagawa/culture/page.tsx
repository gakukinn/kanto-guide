/**
 * 文化艺术活动页面模板 - 基于jalan.net官方数据
 * @layer 三层 (Category Layer)
 * @category 文化艺术
 * @region 神奈川
 * @description 展示神奈川地区所有文化艺术活动，基于jalan.net官方数据
 * @source https://www.jalan.net/event/140000/?screenId=OUW1211
 * @last_updated 2025-06-18
 * ⚠️ 重要提醒：这是商业网站项目，所有数据来源于jalan.net官方网站！
 */
import CulturePageTemplate from '@/components/CulturePageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    '神奈川文化艺术活动列表2025 - 横浜骨董市·大学学园祭·文化展览完整攻略指南',
  description:
    '神奈川县2025年文化艺术活动完整指南，深入了解横浜骨董ワールド、慶應義塾大学七夕祭等大型知名文化艺术活动。提供详细的举办时间、观赏地点、活动特色、参与方式，体验神奈川现代文化艺术的魅力与创新，感受横浜港都文化的国际化氛围。',
  keywords: [
    '神奈川文化艺术',
    '横浜骨董ワールド',
    '慶應義塾大学七夕祭',
    '骨董市',
    '学园祭',
    '神奈川艺术活动',
    '2025艺术展',
    '神奈川旅游',
    '日本文化艺术',
    '横浜文化',
    '文化体验',
    '创意活动',
    '港都文化',
    '国际文化',
  ],
  openGraph: {
    title:
      '神奈川文化艺术活动列表2025 - 横浜骨董市·大学学园祭·文化展览完整攻略指南',
    description:
      '神奈川县2025年文化艺术活动完整指南，横浜骨董ワールド、慶應義塾大学七夕祭等大型知名文化艺术活动等您来体验。感受神奈川现代文化艺术的魅力与创新。',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.kanto-travel-guide.com/kanagawa/culture',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/culture/kanagawa-culture.svg',
        width: 1200,
        height: 630,
        alt: '神奈川文化艺术活动',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      '神奈川文化艺术活动列表2025 - 横浜骨董市·大学学园祭·文化展览完整攻略指南',
    description:
      '神奈川县2025年文化艺术活动完整指南，大型知名文化艺术活动等您来体验。',
    images: ['/images/culture/kanagawa-culture.svg'],
  },
  alternates: {
    canonical: '/kanagawa/culture',
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

// 神奈川地区配置 - 使用标准配色系统
const kanagawaRegionConfig = {
  name: 'kanagawa',
  displayName: '神奈川',
  emoji: '⛩️',
  description: '港都文化与学术传统相融合的国际化文化艺术空间',
  navigationLinks: {
    prev: { name: '千叶文化艺术', url: '/chiba/culture', emoji: '🌊' },
    next: { name: '北关东文化艺术', url: '/kitakanto/culture', emoji: '🏔️' },
    current: { name: '神奈川活动', url: '/kanagawa' },
  },
};

// 文化艺术活动事件数据（基于 jalan.net 官方数据 - 仅真实信息）
const kanagawaCultureEvents = [
  {
    id: 'yokohama-antique-world-45',
    title: '第45回横浜骨董ワールド',
    name: '第45回横浜骨董ワールド',
    date: '2025-06-21',
    dates: '2025年6月21日-22日',
    endDate: '2025-06-22',
    location: '横浜産貿ホール マリネリア展示場',
    venue: '横浜産貿ホール マリネリア展示場（横浜市中区新港2-1-1）',
    highlights: [
      '🏺 全国骨董商',
      '🎨 多彩收藏品',
      '🔍 珍贵古董',
      '🌟 昭和复古',
    ],
    features: ['🏺 全国骨董商', '🎨 多彩收藏品', '🔍 珍贵古董', '🌟 昭和复古'],
    likes: 387,
    website: 'https://www.jalan.net/event/evt_342097/',
    description:
      '全国各地的骨董商齐聚一堂的大规模骨董市，在横浜産貿ホール マリネリア展示场举办。展示玻璃、陶瓷器、古董玩具、收藏品、昭和复古用品等多种多样的骨董品。',
    category: '骨董市',
    artType: '骨董展览',
    artist: '全国各地骨董商参与',
    ticketPrice: '入场费：一般800日元，学生600日元',
    prefecture: '神奈川县',
    region: 'kanagawa',
  },
  {
    id: 'keio-tanabata-festival-36',
    title: '慶應義塾大学 第36回七夕祭',
    name: '慶應義塾大学 第36回七夕祭',
    date: '2025-07-05',
    dates: '2025年7月5日-6日',
    endDate: '2025-07-06',
    location: '慶應義塾大学 湘南藤沢キャンパス',
    venue: '慶應義塾大学 湘南藤沢キャンパス（藤沢市遠藤5322）',
    highlights: ['🎓 学术祭典', '🌟 传统文化', '🎪 学生表演', '📚 文化交流'],
    features: ['🎓 学术祭典', '🌟 传统文化', '🎪 学生表演', '📚 文化交流'],
    likes: 245,
    website: 'https://www.jalan.net/event/evt_343969/',
    description:
      '慶應義塾大学5个学园祭之一的「七夕祭」在湘南藤沢校区举办。从该校区开设初期就延续至今的传统祭典，2025年「第36回七夕祭」作为学术与文化的祭典举办。',
    category: '学园祭',
    artType: '学术文化祭',
    artist: '慶應義塾大学学生及教职员',
    ticketPrice: '入场免费',
    prefecture: '神奈川县',
    region: 'kanagawa',
  },
];

export default function KanagawaCulturePage() {
  return (
    <CulturePageTemplate
      region={kanagawaRegionConfig}
      events={kanagawaCultureEvents}
      pageTitle="神奈川文化艺术活动列表"
      pageDescription="探索神奈川县2025年精彩的文化艺术活动，体验港都文化与学术传统的完美融合"
      regionKey="kanagawa"
      activityKey="culture"
    />
  );
}
