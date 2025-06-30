import UniversalStaticPageTemplate from '../../../src/components/UniversalStaticPageTemplate';
import { getStaticRegionActivityData } from '../../../src/lib/data-fetcher';

// 东京地区配置
const tokyoRegion = {
  name: 'tokyo',
  displayName: '东京都',
  emoji: '🏙️',
  description: '传统与现代交融的日本首都',
  navigationLinks: {
    prev: { name: '甲信越', url: '/koshinetsu/matsuri', emoji: '🏔️' },
    next: { name: '埼玉', url: '/saitama/matsuri', emoji: '🌾' },
    current: { name: '东京都', url: '/tokyo' }
  }
};

// 获取东京祭典数据的异步函数
async function getTokyoMatsuriEvents() {
  try {
    const events = await getStaticRegionActivityData('tokyo', 'matsuri');
    return events;
  } catch (error) {
    console.error('获取东京祭典数据失败:', error);
    return [];
  }
}

export default async function TokyoMatsuriPage() {
  // 在服务端获取数据
  const matsuriEvents = await getTokyoMatsuriEvents();

  return (
    <UniversalStaticPageTemplate
      region={tokyoRegion}
      events={matsuriEvents}
      regionKey="tokyo"
      activityKey="matsuri"
      activityDisplayName="传统祭典"
      activityEmoji="🏮"
    />
  );
} 