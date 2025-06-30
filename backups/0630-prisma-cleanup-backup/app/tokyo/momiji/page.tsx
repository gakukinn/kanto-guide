import UniversalStaticPageTemplate from '../../../src/components/UniversalStaticPageTemplate';

// 东京地区配置
const tokyoRegion = {
  name: 'tokyo',
  displayName: '东京都',
  emoji: '🌆',
  description: '首都圈的繁华与传统文化',
  navigationLinks: {
    prev: { name: '甲信越', url: '/koshinetsu/momiji', emoji: '🏔️' },
    next: { name: '埼玉县', url: '/saitama/momiji', emoji: '🌾' },
    current: { name: '东京都', url: '/tokyo' }
  }
};

// 空数据数组 - 等待从Walker Plus和Jalan官方数据源填入真实信息
const momijiEvents: any[] = [];

export default function TokyoMomijiPage() {
  return (
    <UniversalStaticPageTemplate
      region={tokyoRegion}
      events={momijiEvents}
      regionKey="tokyo"
      activityKey="momiji"
      activityDisplayName="红叶狩"
      activityEmoji="🍁"
    />
  );
} 