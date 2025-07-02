import UniversalStaticPageTemplate from '../../../src/components/UniversalStaticPageTemplate';
import { getStaticRegionActivityData } from '../../../src/lib/data-fetcher';

// 北关东地区配置
const kitakantoRegion = {
  name: 'kitakanto',
  displayName: '北关东',
  emoji: '🌄',
  description: '群马、栃木、茨城三县的山川与传统',
  navigationLinks: {
    prev: { name: '神奈川', url: '/kanagawa/matsuri', emoji: '⛰️' },
    next: { name: '甲信越', url: '/koshinetsu/matsuri', emoji: '🏔️' },
    current: { name: '北关东', url: '/kitakanto' }
  }
};

// 获取北关东祭典数据的异步函数
async function getKitakantoMatsuriEvents() {
  try {
    const events = await getStaticRegionActivityData('kitakanto', 'matsuri');
    return events;
  } catch (error) {
    console.error('获取北关东祭典数据失败:', error);
    return [];
  }
}

export default async function KitakantoMatsuriPage() {
  // 在服务端获取数据
  const matsuriEvents = await getKitakantoMatsuriEvents();

  return (
    <UniversalStaticPageTemplate
      region={kitakantoRegion}
      events={matsuriEvents}
      regionKey="kitakanto"
      activityKey="matsuri"
      activityDisplayName="传统祭典"
      activityEmoji="🏮"
    />
  );
}