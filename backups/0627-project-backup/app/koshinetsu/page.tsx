/**
 * 甲信越活动指南页面
 * 使用RegionPageTemplate模板
 */

import { Metadata } from 'next';
import RegionPageTemplate from '@/components/RegionPageTemplate';

// 甲信越地区配置
const koshinetsuConfig = {
  name: '甲信越',
  emoji: '🗻',
  bgColor: 'from-purple-50 to-violet-100',
  themeColor: 'purple',
  prevRegion: {
    name: '北关东',
    path: '/kitakanto',
    emoji: '♨️',
    bgColor: 'from-green-50 to-emerald-100'
  },
  nextRegion: {
    name: '东京都',
    path: '/tokyo',
    emoji: '🗼',
    bgColor: 'from-red-50 to-rose-100'
  },
  featuredActivities: [
    {
      id: 'nagaoka-hanabi',
      title: '长冈祭大花火大会',
      description: '日本三大花火大会之一，复兴祈愿花火的感动',
      emoji: '🎆',
      bgColor: 'from-blue-50 to-sky-100',
      detailLink: '/koshinetsu/hanabi/nagaoka'
    },
    {
      id: 'takayama-matsuri',
      title: '飞騨高山祭',
      description: '日本三大美祭之一，华丽山车的艺术盛宴',
      emoji: '🏮',
      bgColor: 'from-red-50 to-rose-100',
      detailLink: '/koshinetsu/matsuri/takayama'
    },
    {
      id: 'yoshino-hanami',
      title: '河口湖樱花祭',
      description: '富士山下的樱花胜地，山湖樱花的绝美组合',
      emoji: '🌸',
      bgColor: 'from-pink-50 to-rose-100',
      detailLink: '/koshinetsu/hanami/kawaguchiko'
    },
    {
      id: 'matsumoto-castle',
      title: '松本城月见祭',
      description: '国宝松本城的中秋赏月文化活动',
      emoji: '🏰',
      bgColor: 'from-indigo-50 to-purple-100',
      detailLink: '/koshinetsu/culture/matsumoto-castle'
    }
  ]
};

// SEO元数据
export const metadata: Metadata = {
  title: '甲信越活动指南 | 长冈花火、飞騨高山祭、河口湖樱花祭',
  description: '探索甲信越的山岳美景：长冈祭大花火大会、飞騨高山祭、河口湖樱花祭、松本城月见祭等精彩活动。',
  keywords: [
    '甲信越活动',
    '长冈花火',
    '飞騨高山祭',
    '河口湖樱花',
    '松本城',
    '富士山',
    '甲信越旅游',
    '中部旅游'
  ],
  openGraph: {
    title: '甲信越活动指南 - 山岳美景与传统文化',
    description: '探索甲信越的山岳美景与文化传承',
    type: 'website',
    locale: 'zh_CN',
    siteName: '关东旅游指南'
  },
  alternates: {
    canonical: '/koshinetsu'
  }
};

export default function KoshinetsuPage() {
  return (
    <RegionPageTemplate 
      regionKey="koshinetsu"
      config={koshinetsuConfig}
    />
  );
} 