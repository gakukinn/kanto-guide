import UniversalStaticPageTemplate from '../../../src/components/UniversalStaticPageTemplate';
import { getStaticRegionActivityData } from '../../../src/lib/data-fetcher';

const tokyoRegionConfig = {
    name: 'tokyo',
    displayName: '东京都',
  emoji: '🌆',
  description: '首都圈的繁华与传统文化',
    navigationLinks: {
    prev: { name: '甲信越', url: '/koshinetsu/illumination', emoji: '🏔️' },
    next: { name: '埼玉县', url: '/saitama/illumination', emoji: '🌾' },
    current: { name: '东京都', url: '/tokyo' },
  },
};

export default async function TokyoIlluminationPage() {  // 读取tokyoillumination数据
  const events = await getStaticRegionActivityData('tokyo', 'illumination');
  

  return (
    <UniversalStaticPageTemplate
      region={tokyoRegionConfig}
      events={events}
      pageTitle="东京都灯光秀列表"
      pageDescription="东京都冬季灯光秀活动完全指南"
      regionKey="tokyo"
      activityKey="illumination"
      activityDisplayName="灯光秀"
      activityEmoji="✨"
    />
  );
} 