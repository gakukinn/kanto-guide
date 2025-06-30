import UniversalStaticPageTemplate from '../../../src/components/UniversalStaticPageTemplate';
import { getStaticRegionActivityData } from '../../../src/lib/data-fetcher';

// 埼玉地区配置
const saitamaRegion = {
  name: 'saitama',
  displayName: '埼玉县',
  emoji: '🌾',
  description: '田园风光与传统文化',
  navigationLinks: {
    prev: { name: '东京都', url: '/tokyo/hanabi', emoji: '🌆' },
    next: { name: '千叶县', url: '/chiba/hanabi', emoji: '🌊' },
    current: { name: '埼玉县', url: '/saitama' }
  }
};

// 获取埼玉花火数据的异步函数
async function getSaitamaHanabiEvents() {
  try {
    const events = await getStaticRegionActivityData('saitama', 'hanabi');
    return events;
  } catch (error) {
    console.error('获取埼玉花火数据失败:', error);
    return [];
  }
}

export default async function SaitamaHanabiPage() {
  // 在服务端获取数据
  const hanabiEvents = await getSaitamaHanabiEvents();

  return (
    <UniversalStaticPageTemplate
      region={saitamaRegion}
      events={hanabiEvents}
      regionKey="saitama"
      activityKey="hanabi"
      activityDisplayName="花火大会"
      activityEmoji="🎆"
    />
  );
} 
