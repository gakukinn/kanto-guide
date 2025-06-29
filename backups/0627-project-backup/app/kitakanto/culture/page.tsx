import UniversalStaticPageTemplate from '../../../src/components/UniversalStaticPageTemplate';

// 北关东地区配置
const kitakantoRegion = {
  name: 'kitakanto',
  displayName: '北关东',
  emoji: '🌸',
  description: '群马栃木茨城三县的自然与传统',
  navigationLinks: {
    prev: { name: '神奈川县', url: '/kanagawa/culture', emoji: '🗻' },
    next: { name: '甲信越', url: '/koshinetsu/culture', emoji: '🏔️' },
    current: { name: '北关东', url: '/kitakanto' }
  }
};

// 空数据数组 - 等待从Walker Plus和Jalan官方数据源填入真实信息
const cultureEvents: any[] = [];

export default function KitakantoCulturePage() {
  return (
    <UniversalStaticPageTemplate
      region={kitakantoRegion}
      events={cultureEvents}
      regionKey="kitakanto"
      activityKey="culture"
      activityDisplayName="文化艺术"
      activityEmoji="🎨"
    />
  );
}

export const metadata = {
  title: '北关东文化艺术活动列表',
  description: '北关东地域举办的传统与现代融合的文化艺术活动介绍。群马・栃木・茨城的文化遗产、民俗艺能、地域艺术。',
  keywords: '北关东, 群马, 栃木, 茨城, 文化遗产, 民俗艺能, 地域艺术, 传统文化',
  openGraph: {
    title: '北关东文化艺术活动列表 | 日本东部旅游指南',
    description: '北关东地域举办的传统与现代融合的文化艺术活动介绍。群马・栃木・茨城的文化遗产、民俗艺能、地域艺术。',
    type: 'website',
    locale: 'zh_CN',
  },
}; 