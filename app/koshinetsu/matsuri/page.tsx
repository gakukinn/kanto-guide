import UniversalStaticPageTemplate from '../../../src/components/UniversalStaticPageTemplate';
import { getStaticRegionActivityData } from '../../../src/lib/data-fetcher';

// 甲信越地区配置
const koshinetsuRegion = {
  name: 'koshinetsu',
  displayName: '甲信越',
  emoji: '🏔️',
  description: '日本阿尔卑斯山脉的壮丽自然与传统文化',
  navigationLinks: {
    prev: { name: '北关东', url: '/kitakanto/matsuri', emoji: '🌄' },
    next: { name: '东京都', url: '/tokyo/matsuri', emoji: '🏙️' },
    current: { name: '甲信越', url: '/koshinetsu' }
  }
};

// 获取甲信越祭典数据的异步函数
async function getKoshinetsuMatsuriEvents() {
  try {
    const events = await getStaticRegionActivityData('koshinetsu', 'matsuri');
    return events;
  } catch (error) {
    console.error('获取甲信越祭典数据失败:', error);
    return [];
  }
}

export default async function KoshinetsuMatsuriPage() {
  // 在服务端获取数据
  const matsuriEvents = await getKoshinetsuMatsuriEvents();

  return (
    <UniversalStaticPageTemplate
      region={koshinetsuRegion}
      events={matsuriEvents}
      regionKey="koshinetsu"
      activityKey="matsuri"
      activityDisplayName="传统祭典"
      activityEmoji="🏮"
    />
  );
}