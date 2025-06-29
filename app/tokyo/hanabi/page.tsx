import UniversalStaticPageTemplate from '../../../src/components/UniversalStaticPageTemplate';
import { getStaticRegionActivityData } from '../../../src/lib/data-fetcher';

// 东京地区配置
const tokyoRegion = {
  name: 'tokyo',
  displayName: '东京都',
  emoji: '🌆',
  description: '首都圈的繁华与传统文化',
  navigationLinks: {
    prev: { name: '甲信越', url: '/koshinetsu/hanabi', emoji: '🏔️' },
    next: { name: '埼玉县', url: '/saitama/hanabi', emoji: '🌾' },
    current: { name: '东京都', url: '/tokyo' }
  }
};

// 获取东京花火数据的异步函数
async function getTokyoHanabiEvents() {
  try {
    const events = await getStaticRegionActivityData('tokyo', 'hanabi');
    return events;
  } catch (error) {
    console.error('获取东京花火数据失败:', error);
    return [];
  }
}

export default async function TokyoHanabiPage() {
  // 在服务端获取数据
  const hanabiEvents = await getTokyoHanabiEvents();

  return (
    <UniversalStaticPageTemplate
      region={tokyoRegion}
      events={hanabiEvents}
      regionKey="tokyo"
      activityKey="hanabi"
      activityDisplayName="花火大会"
      activityEmoji="🎆"
    />
  );
} 
