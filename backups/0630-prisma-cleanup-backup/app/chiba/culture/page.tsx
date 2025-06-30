import UniversalStaticPageTemplate from '../../../src/components/UniversalStaticPageTemplate';

// 千叶地区配置
const chibaRegion = {
  name: 'chiba',
  displayName: '千叶县',
  emoji: '🌊',
  description: '太平洋海岸与房总半岛的自然魅力',
  navigationLinks: {
    prev: { name: '埼玉县', url: '/saitama/culture', emoji: '🌾' },
    next: { name: '神奈川', url: '/kanagawa/culture', emoji: '🗻' },
    current: { name: '千叶县', url: '/chiba' }
  }
};

// 空数据数组 - 等待从Walker Plus和Jalan官方数据源填入真实信息
const cultureEvents: any[] = [];

export default function ChibaCulturePage() {
  return (
    <UniversalStaticPageTemplate
      region={chibaRegion}
      events={cultureEvents}
      regionKey="chiba"
      activityKey="culture"
      activityDisplayName="文化艺术"
      activityEmoji="🎨"
    />
  );
}

export const metadata = {
  title: '千叶县文化艺术活动列表',
  description: '千叶县文化艺术活动指南，包含海边美术馆、音乐节、地域文化事件等活动信息。',
  keywords: '千叶, 文化, 艺术, 美术馆, 音乐节, 地域活动, 文化设施',
  openGraph: {
    title: '千叶县文化艺术活动列表 | 日本东部门户旅游指南',
    description: '千叶县文化艺术活动指南，包含海边美术馆、音乐节、地域文化事件等活动信息。',
    type: 'website',
    locale: 'zh_CN',
  },
}; 