import { Metadata } from 'next';
import UniversalStaticPageTemplate from '../../../src/components/UniversalStaticPageTemplate';

// 千叶地区配置
const chibaRegion = {
  name: 'chiba',
  displayName: '千叶县',
  emoji: '🌊',
  description: '太平洋海岸与房总半岛的自然魅力',
  navigationLinks: {
    prev: { name: '埼玉县', url: '/saitama/illumination', emoji: '🌾' },
    next: { name: '神奈川', url: '/kanagawa/illumination', emoji: '🗻' },
    current: { name: '千叶县', url: '/chiba' }
  }
};

// 空数据数组 - 等待从Walker Plus和Jalan官方数据源填入真实信息
const illuminationEvents: any[] = [];

export default function ChibaIlluminationPage() {
  return (
    <UniversalStaticPageTemplate
      region={chibaRegion}
      events={illuminationEvents}
      regionKey="chiba"
      activityKey="illumination"
      activityDisplayName="灯光秀"
      activityEmoji="✨"
    />
  );
}

export const metadata: Metadata = {
  title: '千叶县灯光秀活动列表',
  description: '千叶县内举办的美丽灯光秀活动介绍。千叶冬季的光之盛典，享受浪漫时光。',
  keywords: '千叶, 灯光秀, 光之盛典, 冬季, 约会, 夜景',
  openGraph: {
    title: '千叶县灯光秀活动列表 | 日本东部旅游指南',
    description: '千叶县内举办的美丽灯光秀活动介绍。千叶冬季的光之盛典，享受浪漫时光。',
    type: 'website',
    locale: 'zh_CN',
  },
}; 
