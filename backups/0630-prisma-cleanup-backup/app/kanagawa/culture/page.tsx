import UniversalStaticPageTemplate from '../../../src/components/UniversalStaticPageTemplate';

// 神奈川地区配置
const kanagawaRegion = {
  name: 'kanagawa',
  displayName: '神奈川县',
  emoji: '🗻',
  description: '湘南海岸与古都镰仓的历史文化',
  navigationLinks: {
    prev: { name: '千叶县', url: '/chiba/culture', emoji: '🌊' },
    next: { name: '北关东', url: '/kitakanto/culture', emoji: '🌸' },
    current: { name: '神奈川县', url: '/kanagawa' }
  }
};

// 空数据数组 - 等待从Walker Plus和Jalan官方数据源填入真实信息
const cultureEvents: any[] = [];

export default function KanagawaCulturePage() {
  return (
    <UniversalStaticPageTemplate
      region={kanagawaRegion}
      events={cultureEvents}
      regionKey="kanagawa"
      activityKey="culture"
      activityDisplayName="文化艺术"
      activityEmoji="🎨"
    />
  );
}

export const metadata = {
  title: '神奈川县文化艺术活动列表',
  description: '神奈川县内举办的精致文化艺术活动介绍。横滨镰仓的美术馆、古典音乐会、现代艺术等，享受神奈川的文化风景。',
  keywords: '神奈川, 横滨, 镰仓, 文化, 艺术, 美术馆, 古典, 现代艺术',
  openGraph: {
    title: '神奈川县文化艺术活动列表 | 日本东部门户旅游指南',
    description: '神奈川县内举办的精致文化艺术活动介绍。横滨镰仓的美术馆、古典音乐会、现代艺术等，享受神奈川的文化风景。',
    type: 'website',
    locale: 'zh_CN',
  },
}; 