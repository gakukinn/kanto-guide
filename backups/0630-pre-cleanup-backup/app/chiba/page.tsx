/**
 * 千叶县活动指南页面
 * 使用RegionPageTemplate模板
 */

import { Metadata } from 'next';
import RegionPageTemplate from '@/components/RegionPageTemplate';
import { getFirstActivityFromThirdLayer } from '@/lib/data-fetcher';

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
  featuredActivities: []
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

export default async function ChibaPage() {
  // 创建配置的深拷贝
  const dynamicConfig = JSON.parse(JSON.stringify(chibaConfig));
  
  // 尝试从各种活动类型中获取第一个真实活动
  const activityTypes = ['hanabi', 'culture', 'matsuri', 'hanami', 'illumination', 'momiji'] as const;
  
  for (const activityType of activityTypes) {
    try {
      const firstActivity = await getFirstActivityFromThirdLayer('chiba', activityType);
      if (firstActivity) {
        // 找到真实活动，添加到featuredActivities
        dynamicConfig.featuredActivities.push({
          id: firstActivity.id || `chiba-${activityType}`,
          title: firstActivity.title || firstActivity.name,
          description: firstActivity.description || '查看详情了解更多信息',
          emoji: activityType === 'hanabi' ? '🎆' : 
                 activityType === 'culture' ? '🎨' :
                 activityType === 'matsuri' ? '🏮' :
                 activityType === 'hanami' ? '🌸' :
                 activityType === 'illumination' ? '✨' : '🍁',
          bgColor: 'from-sky-50 to-cyan-100',
          detailLink: firstActivity.detailLink,
          imageUrl: firstActivity.image
        });
        break; // 找到第一个真实活动就停止
      }
    } catch (error) {
      console.log(`No ${activityType} activities found for chiba`);
    }
  }

  return (
    <RegionPageTemplate 
      regionKey="chiba"
      config={dynamicConfig}
    />
  );
} 