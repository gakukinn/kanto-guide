/**
 * 千叶县活动指南页面
 * 使用RegionPageTemplate模板
 */

import { Metadata } from 'next';
import RegionPageTemplate from '@/components/RegionPageTemplate';

// 千叶地区配置
const chibaConfig = {
  name: '千叶县',
  emoji: '🌊',
  bgColor: 'from-sky-50 to-cyan-100',
  themeColor: 'cyan',
  prevRegion: {
    name: '埼玉县',
    path: '/saitama',
    emoji: '🌸',
    bgColor: 'from-orange-50 to-amber-100'
  },
  nextRegion: {
    name: '神奈川县',
    path: '/kanagawa',
    emoji: '⛵',
    bgColor: 'from-blue-100 to-blue-200'
  },
  featuredActivities: [
    {
      id: 'ichikawa-hanabi',
      title: '市川市民纳凉花火大会',
      description: '江戸川河畔的盛大花火表演',
      emoji: '🎆',
      bgColor: 'from-blue-50 to-sky-100',
      detailLink: '/chiba/hanabi/ichikawa'
    },
    {
      id: 'narita-gion',
      title: '成田祗园祭',
      description: '千叶最大的传统祭典，300年历史传承',
      emoji: '🏮',
      bgColor: 'from-red-50 to-rose-100',
      detailLink: '/chiba/matsuri/narita-gion'
    },
    {
      id: 'mobara-hanami',
      title: '茂原公园樱花祭',
      description: '千叶赏樱名所，2850株樱花盛开',
      emoji: '🌸',
      bgColor: 'from-pink-50 to-rose-100',
      detailLink: '/chiba/hanami/mobara'
    },
    {
      id: 'tokyo-disneyland',
      title: '东京迪士尼度假区',
      description: '世界级主题公园的梦幻体验',
      emoji: '🏰',
      bgColor: 'from-purple-50 to-violet-100',
      detailLink: '/chiba/culture/disney'
    }
  ]
};

// SEO元数据
export const metadata: Metadata = {
  title: '千叶县活动指南 | 市川花火、成田祗园祭、迪士尼度假区',
  description: '探索千叶县的海岸魅力：市川花火大会、成田祗园祭、茂原樱花祭、东京迪士尼度假区等精彩活动。',
  keywords: [
    '千叶活动',
    '市川花火',
    '成田祗园祭',
    '茂原樱花',
    '东京迪士尼',
    '千叶海岸',
    '千叶旅游',
    '关东旅游'
  ],
  openGraph: {
    title: '千叶县活动指南 - 海岸风光与主题乐园',
    description: '探索千叶县的海岸魅力与现代娱乐',
    type: 'website',
    locale: 'zh_CN',
    siteName: '关东旅游指南'
  },
  alternates: {
    canonical: '/chiba'
  }
};

export default function ChibaPage() {
  return (
    <RegionPageTemplate 
      regionKey="chiba"
      config={chibaConfig}
    />
  );
} 