/**
 * 北关东活动指南页面
 * 使用RegionPageTemplate模板
 */

import { Metadata } from 'next';
import RegionPageTemplate from '@/components/RegionPageTemplate';
import { getFirstActivityFromThirdLayer } from '@/lib/data-fetcher';

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
  featuredActivities: []
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

export default async function KitakantoPage() {
  // 创建配置的深拷贝
  const dynamicConfig = JSON.parse(JSON.stringify(kitakantoConfig));
  
  // 尝试从各种活动类型中获取第一个真实活动
  const activityTypes = ['hanabi', 'culture', 'matsuri', 'hanami', 'illumination', 'momiji'] as const;
  
  for (const activityType of activityTypes) {
    try {
      const firstActivity = await getFirstActivityFromThirdLayer('kitakanto', activityType);
      if (firstActivity) {
        // 找到真实活动，添加到featuredActivities
        dynamicConfig.featuredActivities.push({
          id: firstActivity.id || `kitakanto-${activityType}`,
          title: firstActivity.title || firstActivity.name,
          description: firstActivity.description || '查看详情了解更多信息',
          emoji: activityType === 'hanabi' ? '🎆' : 
                 activityType === 'culture' ? '🎨' :
                 activityType === 'matsuri' ? '🏮' :
                 activityType === 'hanami' ? '🌸' :
                 activityType === 'illumination' ? '✨' : '🍁',
          bgColor: 'from-green-50 to-emerald-100',
          detailLink: firstActivity.detailLink,
          imageUrl: firstActivity.image
        });
        break; // 找到第一个真实活动就停止
      }
    } catch (error) {
      console.log(`No ${activityType} activities found for kitakanto`);
    }
  }

  return (
    <RegionPageTemplate 
      regionKey="kitakanto"
      config={dynamicConfig}
    />
  );
} 