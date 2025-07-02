import { Metadata } from 'next';
import UniversalStaticPageTemplate from '../../../src/components/UniversalStaticPageTemplate';

// 北关东地区配置
const kitakantoRegion = {
  name: 'kitakanto',
  displayName: '北关东',
  emoji: '🌸',
  description: '群马栃木茨城三县的自然与传统',
  navigationLinks: {
    prev: { name: '神奈川', url: '/kanagawa/illumination', emoji: '🗻' },
    next: { name: '甲信越', url: '/koshinetsu/illumination', emoji: '🏔️' },
    current: { name: '北关东', url: '/kitakanto' }
  }
};

// 空数据数组 - 等待从Walker Plus和Jalan官方数据源填入真实信息
const illuminationEvents: any[] = [];

export default function KitakantoIlluminationPage() {
  return (
    <UniversalStaticPageTemplate
      region={kitakantoRegion}
      events={illuminationEvents}
      regionKey="kitakanto"
      activityKey="illumination"
      activityDisplayName="灯光秀"
      activityEmoji="✨"
    />
  );
}

export const metadata: Metadata = {
  title: '北关东灯光秀活动列表',
  description: '北关东内举办的美丽灯光秀活动介绍。北关东冬季的光之盛典，享受浪漫时光。',
  keywords: '北关东, 灯光秀, 光之盛典, 冬季, 约会, 夜景',
  openGraph: {
    title: '北关东灯光秀活动列表 | 日本东部旅游指南',
    description: '北关东内举办的美丽灯光秀活动介绍。北关东冬季的光之盛典，享受浪漫时光。',
    type: 'website',
    locale: 'zh_CN',
  },
}; 