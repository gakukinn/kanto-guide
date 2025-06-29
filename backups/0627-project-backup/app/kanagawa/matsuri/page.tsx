import UniversalStaticPageTemplate from '../../../src/components/UniversalStaticPageTemplate';
import { getStaticRegionActivityData } from '../../../src/lib/data-fetcher';

// 神奈川地区配置
const kanagawaRegion = {
  name: 'kanagawa',
  displayName: '神奈川县',
  emoji: '⛰️',
  description: '富士山麓与湘南海岸的自然与文化',
  navigationLinks: {
    prev: { name: '千叶县', url: '/chiba/matsuri', emoji: '🌊' },
    next: { name: '北关东', url: '/kitakanto/matsuri', emoji: '🌄' },
    current: { name: '神奈川县', url: '/kanagawa' }
  }
};

// 获取神奈川祭典数据的异步函数
async function getKanagawaMatsuriEvents() {
  try {
    const events = await getStaticRegionActivityData('kanagawa', 'matsuri');
    return events;
  } catch (error) {
    console.error('获取神奈川祭典数据失败:', error);
    return [];
  }
}

export default async function KanagawaMatsuriPage() {
  // 在服务端获取数据
  const matsuriEvents = await getKanagawaMatsuriEvents();

  return (
    <UniversalStaticPageTemplate
      region={kanagawaRegion}
      events={matsuriEvents}
      regionKey="kanagawa"
      activityKey="matsuri"
      activityDisplayName="传统祭典"
      activityEmoji="🏮"
    />
  );
}