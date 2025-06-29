/**
 * 埼玉县活动指南页面
 * 使用RegionPageTemplate模板
 */

import { Metadata } from 'next';
import RegionPageTemplate from '@/components/RegionPageTemplate';

// 埼玉地区配置
const saitamaConfig = {
  name: '埼玉县',
  emoji: '🌸',
  bgColor: 'from-orange-50 to-amber-100',
  themeColor: 'orange',
  prevRegion: {
    name: '东京都',
    path: '/tokyo',
    emoji: '🗼',
    bgColor: 'from-red-50 to-rose-100'
  },
  nextRegion: {
    name: '千叶县',
    path: '/chiba',
    emoji: '🌊',
    bgColor: 'from-sky-50 to-cyan-100'
  },
  featuredActivities: [
    {
      id: 'konosu-hanabi',
      title: '鸿巢花火大会',
      description: '埼玉最大规模的花火大会，四尺玉震撼演出',
      emoji: '🎆',
      bgColor: 'from-blue-50 to-sky-100',
      detailLink: '/saitama/hanabi/konosu'
    },
    {
      id: 'chichibu-matsuri',
      title: '秩父夜祭',
      description: '日本三大曳山祭之一，UNESCO无形文化遗产',
      emoji: '🏮',
      bgColor: 'from-red-50 to-rose-100',
      detailLink: '/saitama/matsuri/chichibu'
    },
    {
      id: 'omiya-hanami',
      title: '大宫公园樱花祭',
      description: '埼玉赏樱名所，1000株樱花的粉色海洋',
      emoji: '🌸',
      bgColor: 'from-pink-50 to-rose-100',
      detailLink: '/saitama/hanami/omiya'
    },
    {
      id: 'kawagoe-matsuri',
      title: '川越祭典',
      description: '小江户川越的传统山车巡游',
      emoji: '🎭',
      bgColor: 'from-purple-50 to-violet-100',
      detailLink: '/saitama/matsuri/kawagoe'
    }
  ]
};

// SEO元数据
export const metadata: Metadata = {
  title: '埼玉县活动指南 | 鸿巢花火、秩父夜祭、川越祭典',
  description: '探索埼玉县的传统魅力：鸿巢花火大会、秩父夜祭、大宫樱花祭、川越祭典等精彩活动。',
  keywords: [
    '埼玉活动',
    '鸿巢花火',
    '秩父夜祭',
    '川越祭典',
    '大宫樱花',
    '小江户',
    '埼玉旅游',
    '关东旅游'
  ],
  openGraph: {
    title: '埼玉县活动指南 - 传统文化与自然美景',
    description: '探索埼玉县的传统魅力与文化底蕴',
    type: 'website',
    locale: 'zh_CN',
    siteName: '关东旅游指南'
  },
  alternates: {
    canonical: '/saitama'
  }
};

export default function SaitamaPage() {
  return (
    <RegionPageTemplate 
      regionKey="saitama"
      config={saitamaConfig}
    />
  );
} 