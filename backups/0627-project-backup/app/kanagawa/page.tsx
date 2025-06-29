/**
 * 神奈川县活动指南页面
 * 使用RegionPageTemplate模板
 */

import { Metadata } from 'next';
import RegionPageTemplate from '@/components/RegionPageTemplate';

// 神奈川地区配置
const kanagawaConfig = {
  name: '神奈川县',
  emoji: '⛵',
  bgColor: 'from-blue-100 to-blue-200',
  themeColor: 'blue',
  prevRegion: {
    name: '东京都',
    path: '/tokyo',
    emoji: '🗼',
    bgColor: 'from-red-50 to-rose-100'
  },
  nextRegion: {
    name: '北关东',
    path: '/kitakanto',
    emoji: '♨️',
    bgColor: 'from-green-50 to-emerald-100'
  },
  featuredActivities: [
    {
      id: 'kamakura-hanabi',
      title: '镰仓花火大会',
      description: '古都镰仓的海滨花火，历史与现代的完美融合',
      emoji: '🎆',
      bgColor: 'from-blue-50 to-sky-100',
      detailLink: '/kanagawa/hanabi/kamakura'
    },
    {
      id: 'yokohama-akarenga',
      title: '横滨红砖文化节',
      description: '港口城市的国际文化艺术节庆',
      emoji: '🎨',
      bgColor: 'from-red-50 to-rose-100',
      detailLink: '/kanagawa/culture/akarenga'
    },
    {
      id: 'enoshima-illumination',
      title: '江之岛灯光秀',
      description: '湘南海岸的浪漫灯光装饰',
      emoji: '✨',
      bgColor: 'from-purple-50 to-violet-100',
      detailLink: '/kanagawa/illumination/enoshima'
    },
    {
      id: 'hakone-momiji',
      title: '箱根红叶祭',
      description: '温泉之乡的秋日红叶盛宴',
      emoji: '🍁',
      bgColor: 'from-orange-50 to-amber-100',
      detailLink: '/kanagawa/momiji/hakone'
    }
  ]
};

// SEO元数据
export const metadata: Metadata = {
  title: '神奈川县活动指南 | 镰仓花火、横滨文化节、江之岛灯光秀',
  description: '探索神奈川县的海滨魅力：镰仓花火大会、横滨红砖文化节、江之岛灯光秀、箱根红叶祭等精彩活动。',
  keywords: [
    '神奈川活动',
    '镰仓花火',
    '横滨文化节',
    '江之岛灯光',
    '箱根红叶',
    '湘南海岸',
    '神奈川旅游',
    '关东旅游'
  ],
  openGraph: {
    title: '神奈川县活动指南 - 海滨文化与历史古都',
    description: '探索神奈川县的海滨魅力与文化底蕴',
    type: 'website',
    locale: 'zh_CN',
    siteName: '关东旅游指南'
  },
  alternates: {
    canonical: '/kanagawa'
  }
};

export default function KanagawaPage() {
  return (
    <RegionPageTemplate 
      regionKey="kanagawa"
      config={kanagawaConfig}
    />
  );
} 