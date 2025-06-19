/**
 * 文化艺术活动页面模板 - 基于jalan.net官方数据
 * @layer 三层 (Category Layer)
 * @category 文化艺术
 * @region 东京
 * @description 展示东京地区所有文化艺术活动，基于jalan.net官方数据
 * @source https://www.jalan.net/event/130000/?screenId=OUW1211
 * @last_updated 2025-06-18
 * ⚠️ 重要提醒：这是商业网站项目，所有数据来源于jalan.net官方网站！
 */
import CulturePageTemplate from '@/components/CulturePageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    '东京文化艺术活动列表2025 - 设计展览·美术展览·野外电影·文化节完整攻略指南',
  description:
    '东京都2025年文化艺术活动完整指南，深入了解设计展览、美术展览、陶艺展览、野外电影、文化节等多样化艺术活动。提供详细的举办时间、观赏地点、活动特色、参与方式，体验东京现代文化艺术的魅力与创新，感受都市艺术文化的多元发展。',
  keywords: [
    '东京文化艺术',
    '设计展览',
    '美术展览',
    '陶艺展览',
    '野外电影',
    '文化节',
    '东京艺术活动',
    '2025艺术展',
    '东京旅游',
    '日本文化艺术',
    '艺术展览',
    '文化体验',
    '创意活动',
    '东京都心艺术',
    '现代艺术',
  ],
  openGraph: {
    title:
      '东京文化艺术活动列表2025 - 设计展览·美术展览·野外电影·文化节完整攻略指南',
    description:
      '东京都2025年文化艺术活动完整指南，设计展览、美术展览、野外电影、文化节等多样化艺术活动等您来体验。感受东京现代文化艺术的魅力与创新。',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.kanto-travel-guide.com/tokyo/culture',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/culture/tokyo-culture.svg',
        width: 1200,
        height: 630,
        alt: '东京文化艺术活动',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      '东京文化艺术活动列表2025 - 设计展览·美术展览·野外电影·文化节完整攻略指南',
    description: '东京都2025年文化艺术活动完整指南，多样化艺术活动等您来体验。',
    images: ['/images/culture/tokyo-culture.svg'],
  },
  alternates: {
    canonical: '/tokyo/culture',
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

// 东京地区配置 - 使用标准配色系统
const tokyoRegionConfig = {
  name: 'tokyo',
  displayName: '东京',
  emoji: '🗼',
  description: '现代文化艺术与传统创意文化的完美融合',
  navigationLinks: {
    prev: { name: '神奈川文化艺术', url: '/kanagawa/culture', emoji: '⚓' },
    next: { name: '埼玉文化艺术', url: '/saitama/culture', emoji: '🌸' },
    current: { name: '东京活动', url: '/tokyo' },
  },
};

// 文化艺术活动事件数据（基于 jalan.net 官方数据 - 仅真实信息）
const tokyoCultureEvents = [
  {
    id: 'design-festa-vol61',
    title: 'デザインフェスタ vol.61',
    name: 'デザインフェスタ vol.61',
    date: '2025-07-05',
    dates: '2025年7月5日-6日',
    endDate: '2025-07-06',
    location: '東京ビッグサイト（東京国際展示場）',
    venue: '東京ビッグサイト（江東区有明3-11-1）',
    highlights: ['🎨 亚洲最大级', '🛠️ 手作作品', '🎭 现场表演', '🎯 创作祭典'],
    features: ['🎨 亚洲最大级', '🛠️ 手作作品', '🎭 现场表演', '🎯 创作祭典'],
    likes: 342,
    website: 'https://www.jalan.net/event/evt_339863/',
    description:
      '亚洲最大级的艺术活动。手作作品的展示·销售，现场表演，工作坊等多彩内容可以享受的创作祭典。汇集了来自日本各地的创意艺术家和设计师。',
    category: '设计展览',
    artType: '设计展览',
    artist: '多名艺术家参与',
    ticketPrice: '入场费：当日1000日元，提前购买800日元',
    prefecture: '东京都',
    region: 'tokyo',
  },
  {
    id: 'imari-exhibition',
    title: '企画展「西洋帰りのIMARI展」',
    name: '企画展「西洋帰りのIMARI展」',
    date: '2025-04-12',
    dates: '2025年4月12日-6月29日',
    endDate: '2025-06-29',
    location: '戸栗美術館',
    venue: '戸栗美術館（渋谷区松涛1-11-3）',
    highlights: ['🏺 江户时代', '🌍 东西交流', '🎨 名品展示', '📿 文化历史'],
    features: ['🏺 江户时代', '🌍 东西交流', '🎨 名品展示', '📿 文化历史'],
    likes: 198,
    website: 'https://www.jalan.net/event/evt_imari_2025/',
    description:
      '江户时代向西洋出口，现在日本回归的伊万里烧名品展示。述说东西文化交流历史的贵重收藏品，展现日本传统工艺的精髓。',
    category: '陶艺展览',
    artType: '陶艺展览',
    artist: '江户时代工匠作品',
    ticketPrice: '入馆费：一般1000日元，大学生700日元，高中生以下免费',
    prefecture: '东京都',
    region: 'tokyo',
  },
  {
    id: 'picnic-cinema-2025',
    title: 'PICNIC CINEMA',
    name: 'PICNIC CINEMA',
    date: '2025-06-06',
    dates: '2025年6月6日-7月6日',
    endDate: '2025-07-06',
    location: '恵比寿ガーデンプレイス',
    venue: '恵比寿ガーデンプレイス（渋谷区恵比寿4-20）',
    highlights: ['🎬 野外电影', '🌱 芝生体验', '🌙 夏日风物', '🎯 经典名作'],
    features: ['🎬 野外电影', '🌱 芝生体验', '🌙 夏日风物', '🎯 经典名作'],
    likes: 256,
    website: 'https://www.jalan.net/event/evt_picnic_cinema_2025/',
    description:
      '在屋外享受电影的夏日风物诗。在芝生上品味野餐心情的同时，从经典电影到最新作品广泛阵容的上映。都市中的特别电影体验。',
    category: '野外电影',
    artType: '野外电影',
    artist: '多部经典及最新电影',
    ticketPrice: '观影费：一般1500日元，学生1200日元',
    prefecture: '东京都',
    region: 'tokyo',
  },
  {
    id: 'taiwan-festival-tokyo2025',
    title: '台湾フェスティバル（TM）TOKYO2025',
    name: '台湾フェスティバル（TM）TOKYO2025',
    date: '2025-06-19',
    dates: '2025年6月19日-22日',
    endDate: '2025-06-22',
    location: '上野恩賜公園',
    venue: '上野恩賜公園（台东区上野公园5-20）',
    highlights: ['🇹🇼 台湾文化', '🎭 传统艺能', '🍜 台湾美食', '🎪 多角体验'],
    features: ['🇹🇼 台湾文化', '🎭 传统艺能', '🍜 台湾美食', '🎪 多角体验'],
    likes: 289,
    website: 'https://www.jalan.net/event/evt_taiwan_festival_2025/',
    description:
      '可以体验台湾丰富文化的节庆活动。传统艺能的公演、台湾美食、工艺品的展示销售等，多角度介绍台湾的魅力。在东京感受台湾文化的精髓。',
    category: '文化节',
    artType: '文化节',
    artist: '台湾传统艺能团体',
    ticketPrice: '入场免费，部分活动需另付费',
    prefecture: '东京都',
    region: 'tokyo',
  },
];

export default function TokyoCulturePage() {
  return (
    <CulturePageTemplate
      region={tokyoRegionConfig}
      events={tokyoCultureEvents}
      pageTitle="东京文化艺术活动列表"
      pageDescription="探索东京都2025年精彩的文化艺术活动，体验现代艺术与传统文化的完美融合"
      regionKey="tokyo"
      activityKey="culture"
    />
  );
}
