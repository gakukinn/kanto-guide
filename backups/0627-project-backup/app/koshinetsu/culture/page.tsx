import UniversalStaticPageTemplate from '../../../src/components/UniversalStaticPageTemplate';

// 甲信越地区配置
const koshinetsuRegion = {
  name: 'koshinetsu',
  displayName: '甲信越',
  emoji: '🏔️',
  description: '山梨长野新潟的山岳与湖泊',
  navigationLinks: {
    prev: { name: '北关东', url: '/kitakanto/culture', emoji: '🌸' },
    next: { name: '东京都', url: '/tokyo/culture', emoji: '🌆' },
    current: { name: '甲信越', url: '/koshinetsu' }
  }
};

// 空数据数组 - 等待从Walker Plus和Jalan官方数据源填入真实信息
const cultureEvents: any[] = [];

export default function KoshinetsuCulturePage() {
  return (
    <UniversalStaticPageTemplate
      region={koshinetsuRegion}
      events={cultureEvents}
      regionKey="koshinetsu"
      activityKey="culture"
      activityDisplayName="文化艺术"
      activityEmoji="🎨"
    />
  );
}

export const metadata = {
  title: '甲信越文化艺术活动列表',
  description: '甲信越地域举办的山岳文化与传统工艺活动介绍。山梨・长野・新潟的传统工艺、山岳文化、历史遗迹探访。',
  keywords: '甲信越, 山梨, 长野, 新潟, 传统工艺, 山岳文化, 历史遗迹, 地域传统',
  openGraph: {
    title: '甲信越文化艺术活动列表 | 日本东部旅游指南',
    description: '甲信越地域举办的山岳文化与传统工艺活动介绍。山梨・长野・新潟的传统工艺、山岳文化、历史遗迹探访。',
    type: 'website',
    locale: 'zh_CN',
  },
}; 