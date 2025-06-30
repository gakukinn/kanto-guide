import UniversalStaticPageTemplate from '../../../src/components/UniversalStaticPageTemplate';

// 甲信越地区配置
const koshinetsuRegion = {
  name: 'koshinetsu',
  displayName: '甲信越',
  emoji: '🏔️',
  description: '山梨长野新潟的山岳与湖泊',
  navigationLinks: {
    prev: { name: '北关东', url: '/kitakanto/momiji', emoji: '🌸' },
    next: { name: '东京都', url: '/tokyo/momiji', emoji: '🌆' },
    current: { name: '甲信越', url: '/koshinetsu' }
  }
};

// 空数据数组 - 等待从Walker Plus和Jalan官方数据源填入真实信息
const momijiEvents: any[] = [];

export default function KoshinetsuMomijiPage() {
  return (
    <UniversalStaticPageTemplate
      region={koshinetsuRegion}
      events={momijiEvents}
      regionKey="koshinetsu"
      activityKey="momiji"
      activityDisplayName="红叶狩"
      activityEmoji="🍁"
    />
  );
} 