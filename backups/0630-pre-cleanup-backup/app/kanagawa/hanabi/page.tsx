import UniversalStaticPageTemplate from '../../../src/components/UniversalStaticPageTemplate';
import { getStaticRegionActivityData } from '../../../src/lib/data-fetcher';

// 神奈川地区配置
const kanagawaRegion = {
  name: 'kanagawa',
  displayName: '神奈川县',
  emoji: '🗻',
  description: '湘南海岸与古都镰仓的历史文化',
  navigationLinks: {
    prev: { name: '千叶县', url: '/chiba/hanabi', emoji: '🌊' },
    next: { name: '北关东', url: '/kitakanto/hanabi', emoji: '🌸' },
    current: { name: '神奈川县', url: '/kanagawa' }
  }
};

export default async function KanagawaHanabiPage() {
  // 读取神奈川花火数据
  const events = await getStaticRegionActivityData('kanagawa', 'hanabi');
  
  return (
    <UniversalStaticPageTemplate
      region={kanagawaRegion}
      events={events}
      regionKey="kanagawa"
      activityKey="hanabi"
      activityDisplayName="花火大会"
      activityEmoji="🎆"
    />
  );
} 
