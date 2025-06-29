import UniversalStaticPageTemplate from '../../../src/components/UniversalStaticPageTemplate';
import { getStaticRegionActivityData } from '../../../src/lib/data-fetcher';

const kitakantoRegionConfig = {
  name: 'kitakanto',
  displayName: '北关东',
  emoji: '🏯',
  description: '群马栃木茨城三县的自然与传统',
  navigationLinks: {
    prev: { name: '神奈川', url: '/kanagawa/hanami', emoji: '🗻' },
    next: { name: '甲信越', url: '/koshinetsu/hanami', emoji: '🏔️' },
    current: { name: '北关东', url: '/kitakanto' },
  },
};

export default async function KitakantoHanamiPage() {
  // 读取北关东花见数据
  const events = await getStaticRegionActivityData('kitakanto', 'hanami');
  
  return (
    <UniversalStaticPageTemplate
      region={kitakantoRegionConfig}
      events={events}
      pageTitle="北关东花见会列表"
      pageDescription="北关东春季花见会活动完全指南"
      regionKey="kitakanto"
      activityKey="hanami"
      activityDisplayName="花见会"
      activityEmoji="🌸"
    />
  );
} 