import UniversalStaticPageTemplate from '../../../src/components/UniversalStaticPageTemplate';
import { getStaticRegionActivityData } from '../../../src/lib/data-fetcher';

const koshinetsuRegionConfig = {
  name: 'koshinetsu',
  displayName: '甲信越',
  emoji: '🏔️',
  description: '山梨长野新潟的山岳与湖泊',
  navigationLinks: {
    prev: { name: '北关东', url: '/kitakanto/hanami', emoji: '🌸' },
    next: { name: '东京都', url: '/tokyo/hanami', emoji: '🌆' },
    current: { name: '甲信越', url: '/koshinetsu' },
  },
};

export default async function KoshinetsuHanamiPage() {  // 读取koshinetsuhanami数据
  const events = await getStaticRegionActivityData('koshinetsu', 'hanami');
  

  return (
    <UniversalStaticPageTemplate
      region={koshinetsuRegionConfig}
      events={events}
      pageTitle="甲信越花见会列表"
      pageDescription="甲信越春季花见会活动完全指南"
      regionKey="koshinetsu"
      activityKey="hanami"
      activityDisplayName="花见会"
      activityEmoji="🌸"
    />
  );
} 