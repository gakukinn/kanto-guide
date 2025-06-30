import UniversalStaticPageTemplate from '../../../src/components/UniversalStaticPageTemplate';
import { getStaticRegionActivityData } from '../../../src/lib/data-fetcher';

// 甲信越地区配置
const koshinetsuRegionConfig = {
  name: 'koshinetsu',
  displayName: '甲信越',
  emoji: '🏔️',
  description: '山梨长野新潟的山岳与湖泊',
  navigationLinks: {
    prev: { name: '北关东', url: '/kitakanto/hanabi', emoji: '🌸' },
    next: { name: '东京都', url: '/tokyo/hanabi', emoji: '🌆' },
    current: { name: '甲信越', url: '/koshinetsu' },
  },
};

export default async function KoshinetsuHanabiPage() {  // 读取koshinetsuhanabi数据
  const events = await getStaticRegionActivityData('koshinetsu', 'hanabi');
  

  return (
    <UniversalStaticPageTemplate
      region={koshinetsuRegionConfig}
      events={events}
      regionKey="koshinetsu"
      activityKey="hanabi"
      activityDisplayName="花火大会"
      activityEmoji="🎆"
    />
  );
} 
