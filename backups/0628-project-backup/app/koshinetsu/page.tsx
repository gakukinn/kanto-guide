/**
 * 甲信越活动指南页面
 * 使用RegionPageTemplate模板
 */

import { Metadata } from 'next';
import RegionPageTemplate from '@/components/RegionPageTemplate';
import { getFirstActivityFromThirdLayer } from '@/lib/data-fetcher';

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
  featuredActivities: []
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

export default async function KoshinetsuPage() {
  // 创建配置的深拷贝
  const dynamicConfig = JSON.parse(JSON.stringify(koshinetsuConfig));
  
  // 尝试从各种活动类型中获取第一个真实活动
  const activityTypes = ['hanabi', 'culture', 'matsuri', 'hanami', 'illumination', 'momiji'] as const;
  
  for (const activityType of activityTypes) {
    try {
      const firstActivity = await getFirstActivityFromThirdLayer('koshinetsu', activityType);
      if (firstActivity) {
        // 找到真实活动，添加到featuredActivities
        dynamicConfig.featuredActivities.push({
          id: firstActivity.id || `koshinetsu-${activityType}`,
          title: firstActivity.title || firstActivity.name,
          description: firstActivity.description || '查看详情了解更多信息',
          emoji: activityType === 'hanabi' ? '🎆' : 
                 activityType === 'culture' ? '🎨' :
                 activityType === 'matsuri' ? '🏮' :
                 activityType === 'hanami' ? '🌸' :
                 activityType === 'illumination' ? '✨' : '🍁',
          bgColor: 'from-purple-50 to-violet-100',
          detailLink: firstActivity.detailLink,
          imageUrl: firstActivity.image
        });
        break; // 找到第一个真实活动就停止
      }
    } catch (error) {
      console.log(`No ${activityType} activities found for koshinetsu`);
    }
  }

  return (
    <RegionPageTemplate 
      regionKey="koshinetsu"
      config={dynamicConfig}
    />
  );
} 