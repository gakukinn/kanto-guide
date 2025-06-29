/**
 * 神奈川县活动指南页面
 * 使用RegionPageTemplate模板
 */

import { Metadata } from 'next';
import RegionPageTemplate from '@/components/RegionPageTemplate';
import { getFirstActivityFromThirdLayer } from '@/lib/data-fetcher';

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
  featuredActivities: []
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

export default async function KanagawaPage() {
  // 创建配置的深拷贝
  const dynamicConfig = JSON.parse(JSON.stringify(kanagawaConfig));
  
  // 尝试从各种活动类型中获取第一个真实活动
  const activityTypes = ['hanabi', 'culture', 'matsuri', 'hanami', 'illumination', 'momiji'] as const;
  
  for (const activityType of activityTypes) {
    try {
      const firstActivity = await getFirstActivityFromThirdLayer('kanagawa', activityType);
      if (firstActivity) {
        // 找到真实活动，添加到featuredActivities
        dynamicConfig.featuredActivities.push({
          id: firstActivity.id || `kanagawa-${activityType}`,
          title: firstActivity.title || firstActivity.name,
          description: firstActivity.description || '查看详情了解更多信息',
          emoji: activityType === 'hanabi' ? '🎆' : 
                 activityType === 'culture' ? '🎨' :
                 activityType === 'matsuri' ? '🏮' :
                 activityType === 'hanami' ? '🌸' :
                 activityType === 'illumination' ? '✨' : '🍁',
          bgColor: 'from-blue-100 to-blue-200',
          detailLink: firstActivity.detailLink,
          imageUrl: firstActivity.image
        });
        break; // 找到第一个真实活动就停止
      }
    } catch (error) {
      console.log(`No ${activityType} activities found for kanagawa`);
    }
  }

  return (
    <RegionPageTemplate 
      regionKey="kanagawa"
      config={dynamicConfig}
    />
  );
} 