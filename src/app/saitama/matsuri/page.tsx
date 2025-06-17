import MatsuriPageTemplate from '@/components/MatsuriPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '埼玉传统祭典2025 - 川越祭秩父夜祭春日部大凧祭等关东祭典完整攻略',
  description:
    '埼玉县2025年传统祭典完整指南，体验川越祭的山车巡游、秩父夜祭的璀璨花车、春日部大凧祭的壮观风筝等15个精彩传统活动。提供详细的举办时间、观赏地点、历史文化背景、交通方式，感受关东地区千年文化传承的精髓，探索埼玉独特的祭典魅力与传统工艺之美。',
  keywords: [
    '埼玉传统祭典',
    '川越祭',
    '秩父夜祭',
    '春日部大凧祭',
    '埼玉祭典',
    '山车祭典',
    '花车祭典',
    '风筝祭典',
    '2025祭典',
    '关东祭典',
    '埼玉旅游',
    '日本传统文化',
    '关东地区祭典',
    '传统工艺',
    '文化传承',
  ],
  openGraph: {
    title: '埼玉传统祭典2025 - 川越祭秩父夜祭春日部大凧祭等关东祭典完整攻略',
    description:
      '埼玉县2025年传统祭典完整指南，川越祭、秩父夜祭、春日部大凧祭等15个精彩活动等您来体验。感受关东地区千年文化传承的精髓。',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.kanto-travel-guide.com/saitama/matsuri',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/matsuri/saitama-matsuri.svg',
        width: 1200,
        height: 630,
        alt: '埼玉传统祭典',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '埼玉传统祭典2025 - 川越祭秩父夜祭春日部大凧祭等关东祭典完整攻略',
    description:
      '埼玉县2025年传统祭典完整指南，川越祭、秩父夜祭等15个精彩活动等您来体验。',
    images: ['/images/matsuri/saitama-matsuri.svg'],
  },
  alternates: {
    canonical: '/saitama/matsuri',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// 地区配置 - 使用标准配色系统
const saitamaRegionConfig = {
  name: 'saitama',
  displayName: '埼玉',
  emoji: '🏮',
  description:
    '从江户时代传承至今的传统祭典，在埼玉各地盛大举行。山车巡游、传统表演、地方特色，尽在埼玉祭典中感受关东地区深厚的文化底蕴。',
  navigationLinks: {
    prev: { name: '千叶祭典', url: '/chiba/matsuri', emoji: '🌸' },
    next: { name: '群马祭典', url: '/gunma/matsuri', emoji: '⛩️' },
    current: { name: '埼玉活动', url: '/saitama' },
  },
};

// 埼玉祭典事件数据（基于 omaturilink.com 官方数据）
const saitamaMatsuriEvents = [
  {
    id: 'kawagoe-matsuri',
    title: '川越祭',
    _sourceData: {
      japaneseName: '川越祭',
      japaneseDescription: '川越祭',
    },
    englishName: 'Kawagoe Festival',
    name: '川越祭',
    date: '2025-10-18',
    dates: '2025年10月18-19日',
    endDate: '2025-10-19',
    location: '川越市',
    venue: '川越市中心街区',
    highlights: ['🚗 山车巡游', '🏮 江户风情', '🎭 传统艺能', '🏛️ 小江户'],
    features: ['🚗 山车巡游', '🏮 江户风情', '🎭 传统艺能', '🏛️ 小江户'],
    likes: 412,
    website: 'https://www.city.kawagoe.saitama.jp/',
    description:
      '川越祭以精美的山车巡游闻名，被称为"小江户"的川越市保留着江户时代的街道风貌。华丽的山车在古老街道中穿行，重现江户时代的繁华景象。',
    category: '山车祭典',
    prefecture: '埼玉县',
    region: 'saitama',
  },
  {
    id: 'chichibu-yomatsuri',
    title: '秩父夜祭',
    _sourceData: {
      japaneseName: '秩父夜祭',
      japaneseDescription: '秩父夜祭',
    },
    englishName: 'Chichibu Night Festival',
    name: '秩父夜祭',
    date: '2025-12-02',
    dates: '2025年12月2-3日',
    endDate: '2025-12-03',
    location: '秩父市',
    venue: '秩父神社周边',
    highlights: ['🎆 夜间花车', '❄️ 冬季祭典', '🏮 灯笼装饰', '🎌 日本三大祭'],
    features: ['🎆 夜间花车', '❄️ 冬季祭典', '🏮 灯笼装饰', '🎌 日本三大祭'],
    likes: 358,
    website: 'https://www.chichibu-matsuri.jp/',
    description:
      '秩父夜祭是日本三大美祭之一，以夜晚点灯的华丽花车著称。12月寒冬中举行的盛大祭典，花车在雪景中巡行，营造出梦幻般的氛围。',
    category: '花车祭典',
    prefecture: '埼玉县',
    region: 'saitama',
  },
  {
    id: 'kasukabe-tako-matsuri',
    title: '春日部大凧祭',
    _sourceData: {
      japaneseName: '春日部大凧祭',
      japaneseDescription: '春日部大凧祭',
    },
    englishName: 'Kasukabe Giant Kite Festival',
    name: '春日部大凧祭',
    date: '2025-05-03',
    dates: '2025年5月3-5日',
    endDate: '2025-05-05',
    location: '春日部市',
    venue: '江户川河畔',
    highlights: ['🪁 巨型风筝', '🌊 江户川河畔', '🎨 传统工艺', '👨‍👩‍👧‍👦 家族活动'],
    features: ['🪁 巨型风筝', '🌊 江户川河畔', '🎨 传统工艺', '👨‍👩‍👧‍👦 家族活动'],
    likes: 245,
    website: 'https://www.city.kasukabe.lg.jp/',
    description:
      '春日部大凧祭在江户川河畔举行，展示巨型传统风筝的精湛工艺。春风中飞舞的各色大凧，是黄金周期间关东地区的独特风景。',
    category: '传统工艺',
    prefecture: '埼玉县',
    region: 'saitama',
  },
];

export default function SaitamaMatsuri() {
  return (
    <MatsuriPageTemplate
      region={saitamaRegionConfig}
      events={saitamaMatsuriEvents}
      pageTitle="埼玉传统祭典"
      pageDescription="体验千年文化传承的精彩祭典，川越祭、秩父夜祭等知名祭典汇聚埼玉"
      regionKey="saitama"
      activityKey="matsuri"
    />
  );
}
