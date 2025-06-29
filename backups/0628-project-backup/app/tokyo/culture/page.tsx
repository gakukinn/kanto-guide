import UniversalStaticPageTemplate from '../../../src/components/UniversalStaticPageTemplate';
import { getStaticRegionActivityData } from '../../../src/lib/data-fetcher';

const tokyoRegionConfig = {
  name: 'tokyo',
  displayName: '东京都',
  emoji: '🌆',
  description: '首都圈的繁华与传统文化',
  navigationLinks: {
    prev: { name: '甲信越', url: '/koshinetsu/culture', emoji: '🏔️' },
    next: { name: '埼玉县', url: '/saitama/culture', emoji: '🌾' },
    current: { name: '东京都', url: '/tokyo' },
  },
};

export default async function TokyoCulturePage() {  // 读取tokyoculture数据
  const events = await getStaticRegionActivityData('tokyo', 'culture');
  

  return (
    <UniversalStaticPageTemplate
      region={tokyoRegionConfig}
      events={events}
      pageTitle="东京都文化艺术列表"
      pageDescription="东京都文化艺术活动完全指南"
      regionKey="tokyo"
      activityKey="culture"
      activityDisplayName="文化艺术"
      activityEmoji="🎨"
    />
  );
} 