import UniversalStaticPageTemplate from '../../../src/components/UniversalStaticPageTemplate';

// 神奈川地区配置
const kanagawaRegion = {
  name: 'kanagawa',
  displayName: '神奈川县',
  emoji: '🗻',
  description: '湘南海岸与古都镰仓的历史文化',
  navigationLinks: {
    prev: { name: '千叶县', url: '/chiba/momiji', emoji: '🌊' },
    next: { name: '北关东', url: '/kitakanto/momiji', emoji: '🌸' },
    current: { name: '神奈川县', url: '/kanagawa' }
  }
};

// 空数据数组 - 等待从Walker Plus和Jalan官方数据源填入真实信息
const momijiEvents: any[] = [];

export default function KanagawaMomijiPage() {
  return (
    <UniversalStaticPageTemplate
      region={kanagawaRegion}
      events={momijiEvents}
      regionKey="kanagawa"
      activityKey="momiji"
      activityDisplayName="红叶狩"
      activityEmoji="🍁"
    />
  );
} 