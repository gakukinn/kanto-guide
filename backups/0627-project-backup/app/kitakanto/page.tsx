/**
 * 北关东活动指南页面
 * 使用RegionPageTemplate模板
 */

import { Metadata } from 'next';
import RegionPageTemplate from '@/components/RegionPageTemplate';

// 北关东地区配置
const kitakantoConfig = {
  name: '北关东',
  emoji: '♨️',
  bgColor: 'from-green-50 to-emerald-100',
  themeColor: 'green',
  prevRegion: {
    name: '神奈川县',
    path: '/kanagawa',
    emoji: '⛵',
    bgColor: 'from-blue-100 to-blue-200'
  },
  nextRegion: {
    name: '甲信越',
    path: '/koshinetsu',
    emoji: '🗻',
    bgColor: 'from-purple-50 to-violet-100'
  },
  featuredActivities: [
    {
      id: 'ashikaga-hanabi',
      title: '足利花火大会',
      description: '北关东最大规模的花火表演，25000发烟花的震撼',
      emoji: '🎆',
      bgColor: 'from-blue-50 to-sky-100',
      detailLink: '/kitakanto/hanabi/ashikaga'
    },
    {
      id: 'nikko-toshogu',
      title: '日光东照宫春季大祭',
      description: '德川家康灵庙的传统祭典，武者行列再现',
      emoji: '🏮',
      bgColor: 'from-red-50 to-rose-100',
      detailLink: '/kitakanto/matsuri/nikko-toshogu'
    },
    {
      id: 'hitachi-nemophila',
      title: '国营常陆海滨公园粉蝶花祭',
      description: '蓝色花海如梦似幻，450万株粉蝶花盛开',
      emoji: '🌸',
      bgColor: 'from-blue-50 to-indigo-100',
      detailLink: '/kitakanto/hanami/hitachi-nemophila'
    },
    {
      id: 'kusatsu-onsen',
      title: '草津温泉祭',
      description: '日本三大名汤之一的温泉文化体验',
      emoji: '♨️',
      bgColor: 'from-emerald-50 to-teal-100',
      detailLink: '/kitakanto/culture/kusatsu-onsen'
    }
  ]
};

// SEO元数据
export const metadata: Metadata = {
  title: '北关东活动指南 | 足利花火、日光东照宫、草津温泉祭',
  description: '探索北关东的自然与历史：足利花火大会、日光东照宫春季大祭、国营常陆海滨公园、草津温泉祭等精彩活动。',
  keywords: [
    '北关东活动',
    '足利花火',
    '日光东照宫',
    '草津温泉',
    '常陆海滨公园',
    '粉蝶花',
    '北关东旅游',
    '关东旅游'
  ],
  openGraph: {
    title: '北关东活动指南 - 自然美景与历史文化',
    description: '探索北关东的自然与历史魅力',
    type: 'website',
    locale: 'zh_CN',
    siteName: '关东旅游指南'
  },
  alternates: {
    canonical: '/kitakanto'
  }
};

export default function KitakantoPage() {
  return (
    <RegionPageTemplate 
      regionKey="kitakanto"
      config={kitakantoConfig}
    />
  );
} 