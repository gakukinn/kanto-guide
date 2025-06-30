import UniversalStaticPageTemplate from '../../../src/components/UniversalStaticPageTemplate';
import { getStaticRegionActivityData } from '../../../src/lib/data-fetcher';

const chibaRegionConfig = {
  name: 'chiba',
  displayName: '千叶县',
  emoji: '🌊',
  description: '太平洋海岸与房总半岛的自然魅力',
  navigationLinks: {
    prev: { name: '埼玉县', url: '/saitama/hanami', emoji: '🌾' },
    next: { name: '神奈川', url: '/kanagawa/hanami', emoji: '🗻' },
    current: { name: '千叶县', url: '/chiba' },
  },
};

export default async function ChibaHanamiPage() {  // 读取chibahanami数据
  const events = await getStaticRegionActivityData('chiba', 'hanami');
  

  return (
    <UniversalStaticPageTemplate
      region={chibaRegionConfig}
      events={events}
      pageTitle="千叶县花见会列表"
      pageDescription="千叶县春季花见会活动完全指南"
      regionKey="chiba"
      activityKey="hanami"
      activityDisplayName="花见会"
      activityEmoji="🌸"
    />
  );
} 