/**
 * 东京都活动指南页面
 * 使用RegionPageTemplate模板
 */

import { Metadata } from 'next';
import RegionPageTemplate from '@/components/RegionPageTemplate';

// 东京地区配置
const tokyoConfig = {
  name: '东京都',
  emoji: '🗼',
  bgColor: 'from-red-50 to-rose-100',
  themeColor: 'red',
  prevRegion: {
    name: '甲信越',
    path: '/koshinetsu',
    emoji: '🗻',
    bgColor: 'from-purple-50 to-violet-100'
  },
  nextRegion: {
    name: '埼玉县',
    path: '/saitama',
    emoji: '🌸',
    bgColor: 'from-orange-50 to-amber-100'
  },
  featuredActivities: [
    {
      id: 'sumida-hanabi',
      title: '隅田川花火大会',
      description: '东京最著名的花火大会，超过95万观众的夏日盛典',
      emoji: '🎆',
      bgColor: 'from-blue-50 to-sky-100',
      detailLink: '/tokyo/hanabi/sumida'
    },
    {
      id: 'kanda-matsuri',
      title: '神田祭',
      description: '江户三大祭之一，传统神轿巡游的文化盛宴',
      emoji: '🏮',
      bgColor: 'from-red-50 to-rose-100',
      detailLink: '/tokyo/matsuri/kanda'
    },
    {
      id: 'ueno-hanami',
      title: '上野公园樱花祭',
      description: '东京最知名的赏樱胜地，春日樱花满开',
      emoji: '🌸',
      bgColor: 'from-pink-50 to-rose-100',
      detailLink: '/tokyo/hanami/ueno'
    },
    {
      id: 'tokyo-illumination',
      title: '东京站灯光秀',
      description: '冬季璀璨灯光装饰，梦幻都市夜景',
      emoji: '✨',
      bgColor: 'from-purple-50 to-violet-100',
      detailLink: '/tokyo/illumination/station'
    }
  ]
};

// SEO元数据
export const metadata: Metadata = {
  title: '东京都活动指南 | 花火大会、祭典、樱花、文化活动完整攻略',
  description: '详见官网',
  keywords: [
    '东京活动',
    '东京花火大会',
    '东京祭典',
    '东京樱花',
    '隅田川花火',
    '神田祭',
    '上野公园',
    '东京旅游',
    '关东旅游'
  ],
  openGraph: {
    title: '东京都活动指南 - 花火大会、祭典、樱花完整攻略',
    description: '探索东京都最精彩的活动体验，从传统祭典到现代文化',
    type: 'website',
    locale: 'zh_CN',
    siteName: '关东旅游指南'
  },
  alternates: {
    canonical: '/tokyo'
  }
};

export default function TokyoPage() {
  return (
    <RegionPageTemplate 
      regionKey="tokyo"
      config={tokyoConfig}
    />
  );
} 