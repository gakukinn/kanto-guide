import UniversalStaticPageTemplate from '../../../src/components/UniversalStaticPageTemplate';
import { getStaticRegionActivityData } from '../../../src/lib/data-fetcher';

// 千叶地区配置
const chibaRegion = {
  name: 'chiba',
  displayName: '千叶县',
  emoji: '🌊',
  description: '太平洋海岸与房总半岛的自然魅力',
  navigationLinks: {
    prev: { name: '埼玉县', url: '/saitama/hanabi', emoji: '🌾' },
    next: { name: '神奈川', url: '/kanagawa/hanabi', emoji: '🗻' },
    current: { name: '千叶县', url: '/chiba' }
  }
};

export default async function ChibaHanabiPage() {
  // 读取千叶花火数据
  const events = await getStaticRegionActivityData('chiba', 'hanabi');
  
  return (
    <UniversalStaticPageTemplate
      region={chibaRegion}
      events={events}
      regionKey="chiba"
      activityKey="hanabi"
      activityDisplayName="花火大会"
      activityEmoji="🎆"
    />
  );
} 
