import UniversalStaticPageTemplate from '../../../src/components/UniversalStaticPageTemplate';
import { getStaticRegionActivityData } from '../../../src/lib/data-fetcher';

// 埼玉地区配置
const saitamaRegion = {
  name: 'saitama',
  displayName: '埼玉县',
  emoji: '🌾',
  description: '关东平原的田园风光与传统文化',
  navigationLinks: {
    prev: { name: '东京都', url: '/tokyo/hanami', emoji: '🌆' },
    next: { name: '千叶县', url: '/chiba/hanami', emoji: '🌊' },
    current: { name: '埼玉县', url: '/saitama' }
  }
};

// 获取埼玉花见数据的异步函数
async function getSaitamaHanamiEvents() {
  try {
    const events = await getStaticRegionActivityData('saitama', 'hanami');
    return events;
  } catch (error) {
    console.error('获取埼玉花见数据失败:', error);
    return [];
  }
}

export default async function SaitamaHanamiPage() {
  // 在服务端获取数据
  const hanamiEvents = await getSaitamaHanamiEvents();

  return (
    <UniversalStaticPageTemplate
      region={saitamaRegion}
      events={hanamiEvents}
      pageTitle="埼玉县花见会列表"
      pageDescription="埼玉县春季花见会活动完全指南"
      regionKey="saitama"
      activityKey="hanami"
      activityDisplayName="花见会"
      activityEmoji="🌸"
    />
  );
} 