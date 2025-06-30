import UniversalStaticPageTemplate from '../../../src/components/UniversalStaticPageTemplate';
import { getStaticRegionActivityData } from '../../../src/lib/data-fetcher';

const kanagawaRegionConfig = {
  name: 'kanagawa',
  displayName: '神奈川县',
  emoji: '🗻',
  description: '湘南海岸与古都镰仓的历史文化',
  navigationLinks: {
    prev: { name: '千叶县', url: '/chiba/hanami', emoji: '🌊' },
    next: { name: '北关东', url: '/kitakanto/hanami', emoji: '🌸' },
    current: { name: '神奈川县', url: '/kanagawa' },
  },
};

export default async function KanagawaHanamiPage() {  // 读取kanagawahanami数据
  const events = await getStaticRegionActivityData('kanagawa', 'hanami');
  

  return (
    <UniversalStaticPageTemplate
      region={kanagawaRegionConfig}
      events={events}
      pageTitle="神奈川县花见会列表"
      pageDescription="神奈川县春季花见会活动完全指南"
      regionKey="kanagawa"
      activityKey="hanami"
      activityDisplayName="花见会"
      activityEmoji="🌸"
    />
  );
} 