/**
 * 文化艺术活动页面模板 - 基于jalan.net官方数据
 * @layer 三层 (Category Layer)
 * @category 文化艺术
 * @region 千叶
 * @description 展示千叶地区所有文化艺术活动，基于jalan.net官方数据
 * @source https://www.jalan.net/event/120000/?screenId=OUW1701
 * @last_updated 2025-06-18
 * ⚠️ 重要提醒：这是商业网站项目，所有数据来源于jalan.net官方网站！
 */
import CulturePageTemplate from '@/components/CulturePageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '千叶文化艺术活动列表2025 - 户外展览·手办祭典·创意活动完整攻略指南',
  description:
    '千叶县2025年文化艺术活动完整指南，深入了解TOKYO OUTDOOR SHOW、ワンダーフェスティバル等大型知名文化艺术活动。提供详细的举办时间、观赏地点、活动特色、参与方式，体验千叶现代文化艺术的魅力与创新，感受幕张メッセ国际级展会文化。',
  keywords: [
    '千叶文化艺术',
    'TOKYO OUTDOOR SHOW',
    'ワンダーフェスティバル',
    '户外展览',
    '手办祭典',
    '千叶艺术活动',
    '2025艺术展',
    '千叶旅游',
    '日本文化艺术',
    '幕张メッセ',
    '文化体验',
    '创意活动',
    '造形艺术',
    '现代艺术',
  ],
  openGraph: {
    title: '千叶文化艺术活动列表2025 - 户外展览·手办祭典·创意活动完整攻略指南',
    description:
      '千叶县2025年文化艺术活动完整指南，TOKYO OUTDOOR SHOW、ワンダーフェスティバル等大型知名文化艺术活动等您来体验。感受千叶现代文化艺术的魅力与创新。',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.kanto-travel-guide.com/chiba/culture',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/culture/chiba-culture.svg',
        width: 1200,
        height: 630,
        alt: '千叶文化艺术活动',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '千叶文化艺术活动列表2025 - 户外展览·手办祭典·创意活动完整攻略指南',
    description:
      '千叶县2025年文化艺术活动完整指南，大型知名文化艺术活动等您来体验。',
    images: ['/images/culture/chiba-culture.svg'],
  },
  alternates: {
    canonical: '/chiba/culture',
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

// 千叶地区配置 - 使用标准配色系统
const chibaRegionConfig = {
  name: 'chiba',
  displayName: '千叶',
  emoji: '🌊',
  description: '国际级展会文化与创新艺术活动的融合地',
  navigationLinks: {
    prev: { name: '埼玉文化艺术', url: '/saitama/culture', emoji: '🌾' },
    next: { name: '神奈川文化艺术', url: '/kanagawa/culture', emoji: '⛩️' },
    current: { name: '千叶活动', url: '/chiba' },
  },
};

// 文化艺术活动事件数据（基于 jalan.net 官方数据 - 仅真实信息）
const chibaCultureEvents = [
  {
    id: 'tokyo-outdoor-show-2025',
    title: 'TOKYO OUTDOOR SHOW 2025',
    name: 'TOKYO OUTDOOR SHOW 2025',
    date: '2025-06-27',
    dates: '2025年6月27日-29日',
    endDate: '2025-06-29',
    location: '幕张メッセ 国际展示场 展示厅1・2・3',
    venue: '幕张メッセ（千叶市美浜区中瀬2-1）',
    highlights: ['🏕️ 国内最大级', '🌿 自然友好', '🎯 户外体验', '🌍 环保理念'],
    features: ['🏕️ 国内最大级', '🌿 自然友好', '🎯 户外体验', '🌍 环保理念'],
    likes: 512,
    website: 'https://www.jalan.net/event/evt_334704/',
    description:
      '国内最大级的室内户外活动「TOKYO OUTDOOR SHOW」在幕张メッセ举办。以「自然友好，享受自然。通过户外活动享受更加多样化的生活。」为主题的大型展览活动。',
    category: '户外展览',
    artType: '户外展览',
    artist: '多家户外品牌及创作者参与',
    ticketPrice: '入场费：当日1500日元，提前购买1200日元',
    prefecture: '千叶县',
    region: 'chiba',
  },
  {
    id: 'wonder-festival-2025-summer',
    title: 'ワンダーフェスティバル2025［夏］',
    name: 'ワンダーフェスティバル2025［夏］',
    date: '2025-07-27',
    dates: '2025年7月27日',
    endDate: '2025-07-27',
    location: '幕张メッセ 国际展示场 1～8厅',
    venue: '幕张メッセ（千叉市美浜区中瀬2-1）',
    highlights: ['🎭 世界最大级', '🔨 造形艺术', '🎨 手作文化', '🏆 专业展示'],
    features: ['🎭 世界最大级', '🔨 造形艺术', '🎨 手作文化', '🏆 专业展示'],
    likes: 823,
    website: 'https://www.jalan.net/event/evt_343684/',
    description:
      '世界最大级的造形・手办祭典「ワンダーフェスティバル」在幕张メッセ国际展示场1～8厅举办。无论专业还是业余，都可以带着制作的造形物品来展示、销售的创作活动。',
    category: '手办祭典',
    artType: '造形艺术',
    artist: '专业及业余造形创作者',
    ticketPrice: '入场费：当日2500日元，提前购买2200日元',
    prefecture: '千叶县',
    region: 'chiba',
  },
];

export default function ChibaCulturePage() {
  return (
    <CulturePageTemplate
      region={chibaRegionConfig}
      events={chibaCultureEvents}
      pageTitle="千叶文化艺术活动列表"
      pageDescription="探索千叶县2025年精彩的文化艺术活动，体验国际级展会文化与创新艺术的完美融合"
      regionKey="chiba"
      activityKey="culture"
    />
  );
}
