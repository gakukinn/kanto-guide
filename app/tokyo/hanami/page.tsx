import UniversalStaticPageTemplate from '../../../src/components/UniversalStaticPageTemplate';
import { getStaticRegionActivityData } from '../../../src/lib/data-fetcher';

const tokyoRegionConfig = {
  name: 'tokyo',
  displayName: '东京都',
  emoji: '🌆',
  description: '首都圈的繁华与传统文化',
  navigationLinks: {
    prev: { name: '甲信越', url: '/koshinetsu/hanami', emoji: '🏔️' },
    next: { name: '埼玉县', url: '/saitama/hanami', emoji: '🌾' },
    current: { name: '东京都', url: '/tokyo' },
  },
};

// 获取东京花见数据的异步函数
async function getTokyoHanamiEvents() {
  try {
    const events = await getStaticRegionActivityData('tokyo', 'hanami');
    return events;
  } catch (error) {
    console.error('获取东京花见数据失败:', error);
    return [];
  }
}

export default async function TokyoHanamiPage() {
  // 在服务端获取数据
  const hanamiEvents = await getTokyoHanamiEvents();

  return (
    <UniversalStaticPageTemplate
      region={tokyoRegionConfig}
      events={hanamiEvents}
      pageTitle="东京都花见会列表"
      pageDescription="东京都春季花见会活动完全指南"
      regionKey="tokyo"
      activityKey="hanami"
      activityDisplayName="花见会"
      activityEmoji="🌸"
    />
  );
} 