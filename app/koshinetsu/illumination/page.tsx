import { Metadata } from 'next';
import UniversalStaticPageTemplate from '../../../src/components/UniversalStaticPageTemplate';

// 甲信越地区配置
const koshinetsuRegion = {
  name: 'koshinetsu',
  displayName: '甲信越',
  emoji: '🏔️',
  description: '山梨长野新潟的山岳与湖泊',
  navigationLinks: {
    prev: { name: '北关东', url: '/kitakanto/illumination', emoji: '🌸' },
    next: { name: '东京都', url: '/tokyo/illumination', emoji: '🌆' },
    current: { name: '甲信越', url: '/koshinetsu' }
  }
};

// 空数据数组 - 等待从Walker Plus和Jalan官方数据源填入真实信息
const illuminationEvents: any[] = [];

export default function KoshinetsuIlluminationPage() {
  return (
    <UniversalStaticPageTemplate
      region={koshinetsuRegion}
      events={illuminationEvents}
      regionKey="koshinetsu"
      activityKey="illumination"
      activityDisplayName="灯光秀"
      activityEmoji="✨"
    />
  );
}

export const metadata: Metadata = {
  title: '甲信越灯光秀活动列表',
  description: '甲信越内举办的美丽灯光秀活动介绍。甲信越冬季的光之盛典，享受浪漫时光。',
  keywords: '甲信越, 灯光秀, 光之盛典, 冬季, 约会, 夜景',
  openGraph: {
    title: '甲信越灯光秀活动列表 | 日本东部旅游指南',
    description: '甲信越内举办的美丽灯光秀活动介绍。甲信越冬季的光之盛典，享受浪漫时光。',
    type: 'website',
    locale: 'zh_CN',
  },
}; 