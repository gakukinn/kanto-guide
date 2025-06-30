import { Metadata } from 'next';
import { getFirstActivityFromThirdLayer } from '@/lib/data-fetcher';
import { 
  regionConfigs, 
  activityEmojiMapping, 
  activityTypesPriority, 
  seoTemplates,
  RegionKey 
} from '@/config/regionPageConfig';

// 获取地区页面的完整配置（包含动态活动数据）
export async function getRegionPageConfig(regionKey: RegionKey) {
  const baseConfig = regionConfigs[regionKey];
  const dynamicConfig = {
    ...baseConfig,
    featuredActivities: [] as any[]
  };

  // 尝试从各种活动类型中获取第一个真实活动
  for (const activityType of activityTypesPriority) {
    try {
      const firstActivity = await getFirstActivityFromThirdLayer(regionKey, activityType);
      if (firstActivity) {
        dynamicConfig.featuredActivities.push({
          id: firstActivity.id || `${regionKey}-${activityType}`,
          title: firstActivity.title || firstActivity.name,
          description: firstActivity.description || '查看详情了解更多信息',
          emoji: activityEmojiMapping[activityType],
          bgColor: baseConfig.bgColor,
          detailLink: firstActivity.detailLink,
          imageUrl: firstActivity.image
        });
        break; // 找到第一个真实活动就停止
      }
    } catch (error) {
      console.log(`No ${activityType} activities found for ${regionKey}`);
    }
  }

  return dynamicConfig;
}

// 生成地区页面的SEO元数据
export function generateRegionMetadata(regionKey: RegionKey): Metadata {
  const seoConfig = seoTemplates[regionKey];
  const regionConfig = regionConfigs[regionKey];
  
  return {
    title: seoConfig.title,
    description: seoConfig.description,
    keywords: seoConfig.keywords,
    openGraph: {
      title: seoConfig.title,
      description: seoConfig.description,
      type: 'website',
      locale: 'zh_CN',
      siteName: '关东旅游指南'
    },
    alternates: {
      canonical: `/${regionKey}`
    }
  };
} 