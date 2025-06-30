import { Metadata } from 'next';
import UniversalStaticPageTemplate from '../../../src/components/UniversalStaticPageTemplate';

// 神奈川地区配置
const kanagawaRegion = {
  name: 'kanagawa',
  displayName: '神奈川县',
  emoji: '🗻',
  description: '湘南海岸与古都镰仓的历史文化',
  navigationLinks: {
    prev: { name: '千叶县', url: '/chiba/illumination', emoji: '🌊' },
    next: { name: '北关东', url: '/kitakanto/illumination', emoji: '🌸' },
    current: { name: '神奈川县', url: '/kanagawa' }
  }
};

// 空数据数组 - 等待从Walker Plus和Jalan官方数据源填入真实信息
const illuminationEvents: any[] = [];

export default function KanagawaIlluminationPage() {
  return (
    <UniversalStaticPageTemplate
      region={kanagawaRegion}
      events={illuminationEvents}
      regionKey="kanagawa"
      activityKey="illumination"
      activityDisplayName="灯光秀"
      activityEmoji="✨"
    />
  );
}

export const metadata: Metadata = {
  title: '神奈川县灯光秀活动列表',
  description: '神奈川县内举办的美丽灯光秀活动介绍。神奈川冬季的光之盛典，享受浪漫时光。',
  keywords: '神奈川, 灯光秀, 光之盛典, 冬季, 约会, 夜景',
  openGraph: {
    title: '神奈川县灯光秀活动列表 | 日本东部旅游指南',
    description: '神奈川县内举办的美丽灯光秀活动介绍。神奈川冬季的光之盛典，享受浪漫时光。',
    type: 'website',
    locale: 'zh_CN',
  },
}; 
