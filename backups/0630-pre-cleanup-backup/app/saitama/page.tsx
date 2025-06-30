/**
 * 埼玉县活动指南页面
 * 使用RegionPageTemplate模板
 */

import { Metadata } from 'next';
import RegionPageTemplate from '@/components/RegionPageTemplate';
import { getFirstActivityFromThirdLayer } from '@/lib/data-fetcher';

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
  featuredActivities: []
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

export default async function SaitamaPage() {
  // 创建配置的深拷贝
  const dynamicConfig = JSON.parse(JSON.stringify(saitamaConfig));
  
  // 尝试从各种活动类型中获取第一个真实活动
  const activityTypes = ['hanabi', 'culture', 'matsuri', 'hanami', 'illumination', 'momiji'] as const;
  
  for (const activityType of activityTypes) {
    try {
      const firstActivity = await getFirstActivityFromThirdLayer('saitama', activityType);
      if (firstActivity) {
        // 找到真实活动，添加到featuredActivities
        dynamicConfig.featuredActivities.push({
          id: firstActivity.id || `saitama-${activityType}`,
          title: firstActivity.title || firstActivity.name,
          description: firstActivity.description || '查看详情了解更多信息',
          emoji: activityType === 'hanabi' ? '🎆' : 
                 activityType === 'culture' ? '🎨' :
                 activityType === 'matsuri' ? '🏮' :
                 activityType === 'hanami' ? '🌸' :
                 activityType === 'illumination' ? '✨' : '🍁',
          bgColor: 'from-orange-50 to-amber-100',
          detailLink: firstActivity.detailLink,
          imageUrl: firstActivity.image
        });
        break; // 找到第一个真实活动就停止
      }
    } catch (error) {
      console.log(`No ${activityType} activities found for saitama`);
    }
  }

  return (
    <RegionPageTemplate 
      regionKey="saitama"
      config={dynamicConfig}
    />
  );
} 