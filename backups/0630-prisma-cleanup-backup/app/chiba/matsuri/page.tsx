import UniversalStaticPageTemplate from '../../../src/components/UniversalStaticPageTemplate';
import { getStaticRegionActivityData } from '../../../src/lib/data-fetcher';

// 千叶地区配置
const chibaRegion = {
  name: 'chiba',
  displayName: '千叶县',
  emoji: '🌊',
  description: '太平洋海岸与房总半岛的自然魅力',
  navigationLinks: {
    prev: { name: '埼玉县', url: '/saitama/matsuri', emoji: '🌾' },
    next: { name: '神奈川', url: '/kanagawa/matsuri', emoji: '⛰️' },
    current: { name: '千叶县', url: '/chiba' }
  }
};

// 获取千叶祭典数据的异步函数
async function getChibaMatsuriEvents() {
  try {
    const events = await getStaticRegionActivityData('chiba', 'matsuri');
    return events;
  } catch (error) {
    console.error('获取千叶祭典数据失败:', error);
    return [];
  }
}

export default async function ChibaMatsuriPage() {
  // 在服务端获取数据
  const matsuriEvents = await getChibaMatsuriEvents();

  return (
    <UniversalStaticPageTemplate
      region={chibaRegion}
      events={matsuriEvents}
      regionKey="chiba"
      activityKey="matsuri"
      activityDisplayName="传统祭典"
      activityEmoji="🏮"
    />
  );
}