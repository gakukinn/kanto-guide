import UniversalStaticPageTemplate from '../../../src/components/UniversalStaticPageTemplate';
import { getStaticRegionActivityData } from '../../../src/lib/data-fetcher';

// 北关东地区配置
const kitakantoRegionConfig = {
  name: 'kitakanto',
  displayName: '北关东',
  emoji: '🌸',
  description: '群马栃木茨城三县的自然与传统',
  navigationLinks: {
    prev: { name: '神奈川', url: '/kanagawa/momiji', emoji: '🗻' },
    next: { name: '甲信越', url: '/koshinetsu/momiji', emoji: '🏔️' },
    current: { name: '北关东', url: '/kitakanto' },
  },
};

// 空数据数组 - 等待从Walker Plus和Jalan官方数据源填入真实信息
const momijiEvents: any[] = [];

export default async function KitakantoMomijiPage() {  // 读取kitakantomomiji数据
  const events = await getStaticRegionActivityData('kitakanto', 'momiji');
  

  return (
    <UniversalStaticPageTemplate
      region={kitakantoRegionConfig}
      events={events}
      pageTitle="北关东红叶狩列表"
      pageDescription="北关东秋季红叶狩活动完全指南"
      regionKey="kitakanto"
      activityKey="momiji"
      activityDisplayName="红叶狩"
      activityEmoji="🍁"
    />
  );
} 