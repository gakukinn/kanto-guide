import UniversalStaticPageTemplate from '../../../src/components/UniversalStaticPageTemplate';
import { getStaticRegionActivityData } from '../../../src/lib/data-fetcher';

// 埼玉地区配置
const saitamaRegion = {
  name: 'saitama',
  displayName: '埼玉县',
  emoji: '🌾',
  description: '关东平原的田园风光与传统文化',
  navigationLinks: {
    prev: { name: '东京都', url: '/tokyo/matsuri', emoji: '🏙️' },
    next: { name: '千叶', url: '/chiba/matsuri', emoji: '🌊' },
    current: { name: '埼玉县', url: '/saitama' }
  }
};

// 获取埼玉祭典数据的异步函数
async function getSaitamaMatsuriEvents() {
  try {
    const events = await getStaticRegionActivityData('saitama', 'matsuri');
    return events;
  } catch (error) {
    console.error('获取埼玉祭典数据失败:', error);
    return [];
  }
}

export default async function SaitamaMatsuriPage() {
  // 在服务端获取数据
  const matsuriEvents = await getSaitamaMatsuriEvents();

  return (
    <UniversalStaticPageTemplate
      region={saitamaRegion}
      events={matsuriEvents}
      regionKey="saitama"
      activityKey="matsuri"
      activityDisplayName="传统祭典"
      activityEmoji="🏮"
    />
  );
}