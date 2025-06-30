import UniversalStaticPageTemplate from '../../../src/components/UniversalStaticPageTemplate';

// 千叶地区配置
const chibaRegion = {
  name: 'chiba',
  displayName: '千叶县',
  emoji: '🌊',
  description: '太平洋海岸与房总半岛的自然魅力',
  navigationLinks: {
    prev: { name: '埼玉县', url: '/saitama/momiji', emoji: '🌾' },
    next: { name: '神奈川', url: '/kanagawa/momiji', emoji: '🗻' },
    current: { name: '千叶县', url: '/chiba' }
  }
};

// 空数据数组 - 等待从Walker Plus和Jalan官方数据源填入真实信息
const momijiEvents: any[] = [];

export default function ChibaMomijiPage() {
  return (
    <UniversalStaticPageTemplate
      region={chibaRegion}
      events={momijiEvents}
      regionKey="chiba"
      activityKey="momiji"
      activityDisplayName="红叶狩"
      activityEmoji="🍁"
    />
  );
} 