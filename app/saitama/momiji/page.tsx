import UniversalStaticPageTemplate from '../../../src/components/UniversalStaticPageTemplate';

// 埼玉地区配置
const saitamaRegion = {
  name: 'saitama',
  displayName: '埼玉县',
  emoji: '🌾',
  description: '关东平原的田园风光与传统文化',
  navigationLinks: {
    prev: { name: '东京都', url: '/tokyo/momiji', emoji: '🏙️' },
    next: { name: '千叶', url: '/chiba/momiji', emoji: '🌊' },
    current: { name: '埼玉县', url: '/saitama' }
  }
};

// 空数据数组 - 等待从Walker Plus和Jalan官方数据源填入真实信息
const momijiEvents: any[] = [];

export default function SaitamaMomijiPage() {
  return (
    <UniversalStaticPageTemplate
      region={saitamaRegion}
      events={momijiEvents}
      regionKey="saitama"
      activityKey="momiji"
      activityDisplayName="红叶狩"
      activityEmoji="🍁"
    />
  );
} 