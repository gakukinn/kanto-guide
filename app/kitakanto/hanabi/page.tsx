import UniversalStaticPageTemplate from '../../../src/components/UniversalStaticPageTemplate';
import { getStaticRegionActivityData } from '../../../src/lib/data-fetcher';

// 北关东地区配置
const kitakantoRegion = {
  name: 'kitakanto',
  displayName: '北关东',
  emoji: '🌸',
  description: '群马栃木茨城三县的自然与传统',
  navigationLinks: {
    prev: { name: '神奈川', url: '/kanagawa/hanabi', emoji: '🗻' },
    next: { name: '甲信越', url: '/koshinetsu/hanabi', emoji: '🏔️' },
    current: { name: '北关东', url: '/kitakanto' }
  }
};

export default async function KitakantoHanabiPage() {
  // 读取北关东花火数据
  const events = await getStaticRegionActivityData('kitakanto', 'hanabi');
  
  return (
    <UniversalStaticPageTemplate
      region={kitakantoRegion}
      events={events}
      regionKey="kitakanto"
      activityKey="hanabi"
      activityDisplayName="花火大会"
      activityEmoji="🎆"
    />
  );
} 
