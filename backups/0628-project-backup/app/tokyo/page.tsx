/**
 * 东京都活动指南页面
 * 使用RegionPageTemplate模板
 */

import { Metadata } from 'next';
import RegionPageTemplate from '@/components/RegionPageTemplate';
import { getFirstActivityFromThirdLayer } from '@/lib/data-fetcher';

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
  featuredActivities: []
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

export default async function TokyoPage() {
  // 创建配置的深拷贝
  const dynamicConfig = JSON.parse(JSON.stringify(tokyoConfig));
  
  // 尝试从各种活动类型中获取第一个真实活动
  const activityTypes = ['hanabi', 'culture', 'matsuri', 'hanami', 'illumination', 'momiji'] as const;
  
  for (const activityType of activityTypes) {
    try {
      const firstActivity = await getFirstActivityFromThirdLayer('tokyo', activityType);
      if (firstActivity) {
        // 找到真实活动，添加到featuredActivities
        dynamicConfig.featuredActivities.push({
          id: firstActivity.id || `tokyo-${activityType}`,
          title: firstActivity.title || firstActivity.name,
          description: firstActivity.description || '查看详情了解更多信息',
          emoji: activityType === 'hanabi' ? '🎆' : 
                 activityType === 'culture' ? '🎨' :
                 activityType === 'matsuri' ? '🏮' :
                 activityType === 'hanami' ? '🌸' :
                 activityType === 'illumination' ? '✨' : '🍁',
          bgColor: 'from-red-50 to-rose-100',
          detailLink: firstActivity.detailLink,
          imageUrl: firstActivity.image
        });
        break; // 找到第一个真实活动就停止
      }
    } catch (error) {
      console.log(`No ${activityType} activities found for tokyo`);
    }
  }

  return (
    <RegionPageTemplate 
      regionKey="tokyo"
      config={dynamicConfig}
    />
  );
} 