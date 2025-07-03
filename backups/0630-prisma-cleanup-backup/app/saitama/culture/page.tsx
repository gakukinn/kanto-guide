import UniversalStaticPageTemplate from '../../../src/components/UniversalStaticPageTemplate';

// 埼玉地区配置
const saitamaRegion = {
  name: 'saitama',
  displayName: '埼玉县',
  emoji: '🌾',
  description: '关东平原的田园风光与传统文化',
  navigationLinks: {
    prev: { name: '东京都', url: '/tokyo/culture', emoji: '🏙️' },
    next: { name: '千叶', url: '/chiba/culture', emoji: '🌊' },
    current: { name: '埼玉县', url: '/saitama' }
  }
};

// 空数据数组 - 等待从Walker Plus和Jalan官方数据源填入真实信息
const cultureEvents: any[] = [];

export default function SaitamaCulturePage() {
  return (
    <UniversalStaticPageTemplate
      region={saitamaRegion}
      events={cultureEvents}
      regionKey="saitama"
      activityKey="culture"
      activityDisplayName="文化艺术"
      activityEmoji="🎨"
    />
  );
}

export const metadata = {
  title: '埼玉县文化艺术活动列表',
  description: '埼玉県内で開催される多彩な文化芸術活動をご紹介。地域の美術館、音楽事件、文化祭典など、埼玉の豊かな文化をお楽しみください。',
  keywords: '埼玉, 文化, 芸術, 美術展, 音楽会, 地域文化, 文化祭典',
  openGraph: {
    title: '埼玉县文化艺术活动列表 | 日本东部门户旅游指南',
    description: '埼玉県内で開催される多彩な文化芸術活動をご紹介。地域の美術館、音楽事件、文化祭典など、埼玉の豊かな文化をお楽しみください。',
    type: 'website',
    locale: 'ja_JP',
  },
};
