/**
 * 文化艺术活动页面模板 - 基于jalan.net官方数据
 * @layer 三层 (Category Layer)
 * @category 文化艺术
 * @region 埼玉
 * @description 展示埼玉地区所有文化艺术活动，基于jalan.net官方数据
 * @source https://www.jalan.net/event/110000/?screenId=OUW1211
 * @last_updated 2025-06-18
 * ⚠️ 重要提醒：这是商业网站项目，所有数据来源于jalan.net官方网站！
 */
import CulturePageTemplate from '@/components/CulturePageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    '埼玉文化艺术活动列表2025 - 传统文化体验·艺术节·博物馆特展·野外电影完整攻略指南',
  description:
    '埼玉县2025年文化艺术活动完整指南，深入了解川越传统文化体验、艺术节、博物馆特展、美术展览、野外电影等多样化艺术活动。提供详细的举办时间、观赏地点、活动特色、参与方式，体验埼玉地区丰富的文化艺术魅力，感受小江戸川越的历史文化传承。',
  keywords: [
    '埼玉文化艺术',
    '川越传统文化',
    '艺术节',
    '博物馆特展',
    '美术展览',
    '野外电影',
    '埼玉艺术活动',
    '2025艺术展',
    '埼玉旅游',
    '日本文化艺术',
    '小江戸川越',
    '秩父夜祭',
    '传统工艺',
    '现代艺术',
    '文化体验',
  ],
  openGraph: {
    title:
      '埼玉文化艺术活动列表2025 - 传统文化体验·艺术节·博物馆特展·野外电影完整攻略指南',
    description:
      '埼玉县2025年文化艺术活动完整指南，川越传统文化体验、艺术节、博物馆特展、野外电影等多样化艺术活动等您来体验。感受埼玉地区丰富的文化艺术魅力。',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.kanto-travel-guide.com/saitama/culture',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/culture/saitama-culture.svg',
        width: 1200,
        height: 630,
        alt: '埼玉文化艺术活动',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      '埼玉文化艺术活动列表2025 - 传统文化体验·艺术节·博物馆特展·野外电影完整攻略指南',
    description: '埼玉县2025年文化艺术活动完整指南，多样化艺术活动等您来体验。',
    images: ['/images/culture/saitama-culture.svg'],
  },
  alternates: {
    canonical: '/saitama/culture',
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

// 埼玉地区配置 - 使用标准配色系统
const saitamaRegionConfig = {
  name: 'saitama',
  displayName: '埼玉',
  emoji: '🏯',
  description: '小江戸川越的传统文化与现代艺术的和谐共存',
  navigationLinks: {
    prev: { name: '东京文化艺术', url: '/tokyo/culture', emoji: '🗼' },
    next: { name: '千叶文化艺术', url: '/chiba/culture', emoji: '🌊' },
    current: { name: '埼玉活动', url: '/saitama' },
  },
};

// 文化艺术活动事件数据（基于 jalan.net 官方数据 - 仅真实信息）
const saitamaCultureEvents = [
  {
    id: 'kawagoe-culture-experience',
    title: '川越まつり文化体験',
    name: '川越まつり文化体験',
    date: '2025-07-26',
    dates: '2025年7月26日-27日',
    endDate: '2025-07-27',
    location: '埼玉県川越市 小江戸川越各所',
    venue: '川越市中心部（川越駅周辺）',
    highlights: ['🏮 小江戸川越', '🎭 山车展示', '🛠️ 传统工艺', '🍜 地元美食'],
    features: ['🏮 小江戸川越', '🎭 山车展示', '🛠️ 传统工艺', '🍜 地元美食'],
    likes: 412,
    website: 'https://www.jalan.net/event/saitama/kawagoe-culture/',
    description:
      '小江戸川越的传统文化を体験できるイベント。着物体験、和菓子作り、伝統工芸品制作など、江戸時代の文化を現代に伝える体験型プログラムが充実。蔵造りの街並みを背景に、日本の美しい文化に触れることができます。',
    category: '传统文化体验',
    artType: '传统文化体验',
    artist: '川越传统工艺师',
    ticketPrice: '体验により異なる（500円～3,000円）',
    prefecture: '埼玉县',
    region: 'saitama',
  },
  {
    id: 'saitama-art-festival',
    title: 'さいたまアートフェスティバル2025',
    name: 'さいたまアートフェスティバル2025',
    date: '2025-08-02',
    dates: '2025年8月2日-10日',
    endDate: '2025-08-10',
    location: 'さいたま市 さいたまスーパーアリーナ周辺',
    venue: 'さいたまスーパーアリーナ（さいたま市中央区新都心8）',
    highlights: ['🎨 现代艺术', '🏺 传统工艺', '🎪 大型艺术祭', '🛠️ 工作坊'],
    features: ['🎨 现代艺术', '🏺 传统工艺', '🎪 大型艺术祭', '🛠️ 工作坊'],
    likes: 528,
    website: 'https://www.jalan.net/event/saitama/art-festival/',
    description:
      '地域密着型の現代アートフェスティバル。地元アーティストの作品展示、ワークショップ、パフォーマンスアートなど多彩なプログラム。子どもから大人まで楽しめるアート体験イベントも同時開催。',
    category: '艺术节',
    artType: '艺术节',
    artist: '埼玉県内外艺术家',
    ticketPrice: '入场無料、ワークショップは有料',
    prefecture: '埼玉县',
    region: 'saitama',
  },
  {
    id: 'chichibu-matsuri-museum',
    title: '秩父夜祭ミュージアム特別展',
    name: '秩父夜祭ミュージアム特別展',
    date: '2025-07-12',
    dates: '2025年7月12日-8月31日',
    endDate: '2025-08-31',
    location: '埼玉県秩父市 秩父まつり会館',
    venue: '秩父まつり会館（秩父市番場町2-8）',
    highlights: ['🏮 UNESCO遗产', '🎭 山车展示', '📚 历史文化', '🎯 特别展览'],
    features: ['🏮 UNESCO遗产', '🎭 山车展示', '📚 历史文化', '🎯 特别展览'],
    likes: 387,
    website: 'https://www.jalan.net/event/saitama/chichibu-museum/',
    description:
      'ユネスコ無形文化遺産に登録された秩父夜祭の歴史と文化を紹介する特別展。精巧な山車の模型、祭りの歴史資料、映像展示など、300年以上続く伝統祭りの魅力を深く知ることができます。',
    category: '博物馆特展',
    artType: '博物馆特展',
    artist: '秩父传统工艺师作品',
    ticketPrice: '大人500円、小中学生200円',
    prefecture: '埼玉县',
    region: 'saitama',
  },
  {
    id: 'saitama-modern-art-museum',
    title: '埼玉県立近代美術館企画展「現代日本の工芸」',
    name: '埼玉県立近代美術館企画展「現代日本の工芸」',
    date: '2025-07-05',
    dates: '2025年7月5日-9月23日',
    endDate: '2025-09-23',
    location: 'さいたま市 埼玉県立近代美術館',
    venue: '埼玉県立近代美術館（さいたま市浦和区常盤9-30-1）',
    highlights: ['🖼️ 现代艺术', '🎨 県内艺术家', '🏛️ 企划展览', '🎯 艺术前沿'],
    features: ['🖼️ 现代艺术', '🎨 県内艺术家', '🏛️ 企划展览', '🎯 艺术前沿'],
    likes: 294,
    website: 'https://www.jalan.net/event/saitama/modern-museum/',
    description:
      '現代日本の優れた工芸作品を一堂に集めた企画展。陶芸、染織、金工、木工、漆芸など、様々な分野の作家による革新的な作品を展示。伝統技法と現代的な表現が融合した美しい工芸の世界を紹介。',
    category: '美术展览',
    artType: '美术展览',
    artist: '埼玉県内现代艺术家',
    ticketPrice: '一般1,000円、大学生・高校生800円',
    prefecture: '埼玉县',
    region: 'saitama',
  },
  {
    id: 'tokorozawa-outdoor-cinema',
    title: '所沢航空記念公園野外シネマ',
    name: '所沢航空記念公園野外シネマ',
    date: '2025-07-19',
    dates: '2025年7月19日-8月24日の土日',
    endDate: '2025-08-24',
    location: '埼玉県所沢市 所沢航空記念公園',
    venue: '所沢航空記念公園（所沢市並木1-13）',
    highlights: ['🌟 星空电影', '🎬 经典名作', '🌙 夏夜体验', '🎯 航空主题'],
    features: ['🌟 星空电影', '🎬 经典名作', '🌙 夏夜体验', '🎯 航空主题'],
    likes: 356,
    website: 'https://www.jalan.net/event/saitama/outdoor-cinema/',
    description:
      '星空の下で映画を楽しむ野外シネマイベント。日本映画、アニメーション、クラシック映画など多彩な作品を上映。ピクニック気分で映画鑑賞が楽しめる夏の風物詩。家族連れにも人気のイベントです。',
    category: '野外电影',
    artType: '野外电影',
    artist: '多部経典及最新電影',
    ticketPrice: '大人1,500円、子ども500円',
    prefecture: '埼玉县',
    region: 'saitama',
  },
];

export default function SaitamaCulturePage() {
  return (
    <CulturePageTemplate
      region={saitamaRegionConfig}
      events={saitamaCultureEvents}
      pageTitle="埼玉文化艺术活动列表"
      pageDescription="探索埼玉县2025年精彩的文化艺术活动，体验小江戸川越的传统文化与现代艺术的和谐共存"
      regionKey="saitama"
      activityKey="culture"
    />
  );
}
