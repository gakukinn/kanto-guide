import { Metadata } from 'next';
import UniversalStaticPageTemplate from '../../../src/components/UniversalStaticPageTemplate';

// 埼玉地区配置
const saitamaRegion = {
  name: 'saitama',
  displayName: '埼玉县',
  emoji: '🌾',
  description: '关东平原的田园风光与传统文化',
  navigationLinks: {
    prev: { name: '东京都', url: '/tokyo/illumination', emoji: '🏙️' },
    next: { name: '千叶', url: '/chiba/illumination', emoji: '🌊' },
    current: { name: '埼玉县', url: '/saitama' }
  }
};

// 空数据数组 - 等待从Walker Plus和Jalan官方数据源填入真实信息
const illuminationEvents: any[] = [];

export default function SaitamaIlluminationPage() {
  return (
    <UniversalStaticPageTemplate
      region={saitamaRegion}
      events={illuminationEvents}
      regionKey="saitama"
      activityKey="illumination"
      activityDisplayName="灯光秀"
      activityEmoji="✨"
    />
  );
}

export const metadata = {
  title: '埼玉县灯光秀活动列表',
  description: '埼玉县内举办的美丽灯光秀活动介绍。埼玉冬季的光之盛典，享受浪漫时光。',
  keywords: '埼玉, 灯光秀, 光之盛典, 冬季, 约会, 夜景',
  openGraph: {
    title: '埼玉县灯光秀活动列表 | 日本东部旅游指南',
    description: '埼玉县内举办的美丽灯光秀活动介绍。埼玉冬季的光之盛典，享受浪漫时光。',
    type: 'website',
    locale: 'zh_CN',
  },
}; 