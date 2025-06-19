/**
 * 第三层页面 - 甲信越狩枫名所列表
 * @layer 三层 (Category Layer)
 * @category 狩枫
 * @region 甲信越
 * @description 展示甲信越地区所有狩枫名所，支持时期筛选和点赞互动
 * @template MomijiPageTemplate.tsx
 * @dataSource WalkerPlus - https://koyo.walkerplus.com/ranking/ar0400/
 */

import { Metadata } from 'next';
import MomijiPageTemplate from '../../../components/MomijiPageTemplate';

export const metadata: Metadata = {
  title: '甲信越狩枫名所2025 - 苗場ドラゴンドラ河口湖等精彩红叶观赏完整攻略',
  description:
    '甲信越地区2025年狩枫名所完整指南，包含苗場ドラゴンドラ红叶、栂池自然園红叶、河口湖红叶、美ケ原高原红叶等精彩景点。提供详细的观赏时期、最佳时间、交通方式、门票信息，助您规划完美的甲信越狩枫之旅，体验日本传统秋季文化。',
  keywords: [
    '甲信越狩枫',
    '苗場ドラゴンドラ红叶',
    '栂池自然園红叶',
    '河口湖红叶',
    '美ケ原高原红叶',
    '甲信越秋季景点',
    '2025狩枫',
    '甲信越旅游',
    '日本红叶',
    '秋季活动',
  ],
  openGraph: {
    title: '甲信越狩枫名所2025 - 苗場ドラゴンドラ河口湖等精彩红叶观赏完整攻略',
    description:
      '甲信越地区2025年狩枫名所完整指南，精彩景点等您来体验。从苗場ドラゴンドラ到河口湖，感受日本传统秋季红叶文化。',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.kanto-travel-guide.com/koshinetsu/momiji',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/momiji/koshinetsu-autumn.svg',
        width: 1200,
        height: 630,
        alt: '甲信越狩枫名所',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '甲信越狩枫名所2025 - 苗場ドラゴンドラ河口湖等精彩红叶观赏完整攻略',
    description: '甲信越地区2025年狩枫名所完整指南，精彩景点等您来体验。',
    images: ['/images/momiji/koshinetsu-autumn.svg'],
  },
  alternates: {
    canonical: '/koshinetsu/momiji',
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

// 狩枫数据转换器 - 将爬虫数据转换为MomijiPageTemplate格式
function transformCrawledDataToMomijiEvents(crawledData: any[]): any[] {
  return crawledData.map((item, index) => ({
    id: `koshinetsu-momiji-${index + 1}`,
    name: item.name,
    englishName: convertToEnglish(item.name),
    _sourceData: {
      japaneseName: item.name,
      japaneseDescription: item.name,
    },
    // 狩枫特有的日期字段映射
    viewingPeriod: item.bestViewing || '情報確認中', // 例年の紅葉見頃
    peakTime: item.coloringStart || '情報確認中', // 例年の色づき始め
    location: item.location,
    description: generateDescription(
      item.name,
      item.location,
      item.bestViewing
    ),
    features: generateFeatures(item.name),
    likes: parseInt(item.wantToVisit) || 0,
    website: item.detailUrl || '',
    venue: item.location,
    detailLink: `/koshinetsu/momiji/${generateSlug(item.name)}`,
  }));
}

// 生成英文名称
function convertToEnglish(japaneseName: string): string {
  const nameMap: { [key: string]: string } = {
    苗場ドラゴンドラの紅葉: 'Naeba Dragon Gondola Autumn Leaves',
    栂池自然園の紅葉: 'Tsugaike Nature Park Autumn Leaves',
    河口湖の紅葉: 'Lake Kawaguchi Autumn Leaves',
    美ケ原高原の紅葉: 'Utsukushigahara Plateau Autumn Leaves',
    高瀬渓谷の紅葉: 'Takase Valley Autumn Leaves',
    乗鞍岳の紅葉: 'Mount Norikura Autumn Leaves',
    '上高地(大正池、河童橋周辺)の紅葉':
      'Kamikochi (Taisho Pond, Kappa Bridge) Autumn Leaves',
    奥只見湖の紅葉: 'Lake Okutadami Autumn Leaves',
    松川渓谷の紅葉: 'Matsukawa Valley Autumn Leaves',
    '弥彦公園(もみじ谷)の紅葉': 'Yahiko Park (Momiji Valley) Autumn Leaves',
  };

  return (
    nameMap[japaneseName] || japaneseName.replace('の紅葉', ' Autumn Leaves')
  );
}

// 生成描述
function generateDescription(
  name: string,
  location: string,
  viewingPeriod: string
): string {
  const locationDesc = location.replace('甲信越内・', '');
  return `位于${locationDesc}的${name.replace('の紅葉', '')}，${viewingPeriod}为最佳观赏期，是甲信越地区著名的红叶观赏胜地。`;
}

// 获取真实特色描述（基于WalkerPlus网站爬取的数据）
function generateFeatures(name: string): string[] {
  const realFeaturesMap: { [key: string]: string[] } = {
    苗場ドラゴンドラの紅葉: [
      '🚡 日本最長のゴンドラで楽しむ空中紅葉散歩',
      '🚠 空中散步',
      '🌈 全景观赏',
    ],
    栂池自然園の紅葉: [
      '🏔️ 北アルプスの絶景と草紅葉の美しいコントラスト',
      '⛰️ 阿尔卑斯',
      '🌿 草红叶',
    ],
    河口湖の紅葉: [
      '🗻 富士山を望む湖畔の紅葉名所',
      '🌊 湖畔风光',
      '⛰️ 富士山景',
    ],
    美ケ原高原の紅葉: [
      '🌾 360度のパノラマ高原で楽しむ黄金色の草紅葉',
      '🌅 全景高原',
      '🌾 草原红叶',
    ],
    高瀬渓谷の紅葉: [
      '💎 エメラルドグリーンの湖と紅葉の絶景コントラスト',
      '💚 翡翠绿湖',
      '🎨 色彩对比',
    ],
    乗鞍岳の紅葉: [
      '🚌 標高2700mから望む雲上の紅葉パノラマ',
      '☁️ 云上红叶',
      '🏔️ 高山景观',
    ],
    '上高地(大正池、河童橋周辺)の紅葉': [
      '🌉 穂高連峰を背景にした渓谷美と紅葉の調和',
      '🏔️ 穗高连峰',
      '🌊 溪谷美',
    ],
    奥只見湖の紅葉: [
      '⛵ 遊覧船から楽しむ山紅葉に囲まれた神秘の湖',
      '🚢 游览船',
      '🌲 山林红叶',
    ],
    松川渓谷の紅葉: [
      '♨️ 温泉街を彩る渓谷沿いの美しい紅葉回廊',
      '♨️ 温泉街',
      '🌿 红叶回廊',
    ],
    '弥彦公園(もみじ谷)の紅葉': [
      '🍁 新潟屈指の紅葉名所で楽しむもみじ谷の絶景',
      '🌺 红叶名所',
      '🏞️ 红叶谷',
    ],
  };

  return (
    realFeaturesMap[name] || ['🍁 红叶观赏', '🏔️ 甲信越景点', '🍂 秋季名所']
  );
}

// 生成URL slug
function generateSlug(name: string): string {
  const slugMap: { [key: string]: string } = {
    苗場ドラゴンドラの紅葉: 'naeba-dragon-gondola',
    栂池自然園の紅葉: 'tsugaike-nature-park',
    河口湖の紅葉: 'lake-kawaguchi',
    美ケ原高原の紅葉: 'utsukushigahara-plateau',
    高瀬渓谷の紅葉: 'takase-valley',
    乗鞍岳の紅葉: 'mount-norikura',
    '上高地(大正池、河童橋周辺)の紅葉': 'kamikochi-taisho-pond-kappa-bridge',
    奥只見湖の紅葉: 'lake-okutadami',
    松川渓谷の紅葉: 'matsukawa-valley',
    '弥彦公園(もみじ谷)の紅葉': 'yahiko-park-momiji-valley',
  };

  return slugMap[name] || name.toLowerCase().replace(/[^a-z0-9]/g, '-');
}

// 甲信越狩枫数据（来源：ar0400-momiji-complete-2025-06-18T05-47-23-519Z.json）
// 数据统计：声明活动数量=10场，实际活动数组长度=10场 ✅ 一致
const crawledMomijiData = [
  {
    name: '苗場ドラゴンドラの紅葉',
    location: '甲信越内',
    coloringStart: '山頂10月上旬、中腹10月中旬、山麓10月下旬',
    bestViewing: '2024年10月5日(土)～11月4日(振休)',
    wantToVisit: '1345',
    detailUrl: 'https://koyo.walkerplus.com/detail/ar0415e12614/',
  },
  {
    name: '栂池自然園の紅葉',
    location: '甲信越内',
    coloringStart: '9月中旬',
    bestViewing: '9月下旬～10月中旬',
    wantToVisit: '127',
    detailUrl: 'https://koyo.walkerplus.com/detail/ar0420e12595/',
  },
  {
    name: '河口湖の紅葉',
    location: '甲信越内',
    coloringStart: '10月下旬',
    bestViewing: '11月上旬～11月下旬',
    wantToVisit: '335',
    detailUrl: 'https://koyo.walkerplus.com/detail/ar0419e13079/',
  },
  {
    name: '美ケ原高原の紅葉',
    location: '甲信越内',
    coloringStart: '10月上旬',
    bestViewing: '10月中旬～10月下旬',
    wantToVisit: '52',
    detailUrl: 'https://koyo.walkerplus.com/detail/ar0420e12930/',
  },
  {
    name: '高瀬渓谷の紅葉',
    location: '甲信越内',
    coloringStart: '10月上旬',
    bestViewing: '10月中旬～11月上旬',
    wantToVisit: '20',
    detailUrl: 'https://koyo.walkerplus.com/detail/ar0420e12558/',
  },
  {
    name: '乗鞍岳の紅葉',
    location: '甲信越内',
    coloringStart: '9月下旬',
    bestViewing: '9月下旬～10月上旬',
    wantToVisit: '24',
    detailUrl: 'https://koyo.walkerplus.com/detail/ar0420e13162/',
  },
  {
    name: '上高地(大正池、河童橋周辺)の紅葉',
    location: '甲信越内',
    coloringStart: '10月上旬',
    bestViewing: '10月中旬～10月下旬',
    wantToVisit: '17',
    detailUrl: 'https://koyo.walkerplus.com/detail/ar0420e13025/',
  },
  {
    name: '奥只見湖の紅葉',
    location: '甲信越内',
    coloringStart: '10月中旬',
    bestViewing: '10月中旬～11月上旬',
    wantToVisit: '93',
    detailUrl: 'https://koyo.walkerplus.com/detail/ar0415e13265/',
  },
  {
    name: '松川渓谷の紅葉',
    location: '甲信越内',
    coloringStart: '10月上旬',
    bestViewing: '10月中旬～11月上旬',
    wantToVisit: '18',
    detailUrl: 'https://koyo.walkerplus.com/detail/ar0420e154596/',
  },
  {
    name: '弥彦公園(もみじ谷)の紅葉',
    location: '甲信越内',
    coloringStart: '10月中旬',
    bestViewing: '10月中旬～11月中旬',
    wantToVisit: '26',
    detailUrl: 'https://koyo.walkerplus.com/detail/ar0415e13277/',
  },
];

// 转换数据为模板格式
const koshinetsuMomijiEvents =
  transformCrawledDataToMomijiEvents(crawledMomijiData);

// 甲信越地区配置
const koshinetsuRegionConfig = {
  name: 'koshinetsu',
  displayName: '甲信越',
  emoji: '🏔️',
  description: '从苗場到河口湖，感受甲信越多元红叶文化的精彩魅力',
  navigationLinks: {
    prev: { name: '北关东', url: '/kitakanto/momiji', emoji: '🌿' },
    next: { name: '东京', url: '/tokyo/momiji', emoji: '🍁' },
    current: { name: '甲信越', url: '/koshinetsu' },
  },
};

export default function KoshinetsuMomijiPage() {
  return (
    <MomijiPageTemplate
      region={koshinetsuRegionConfig}
      events={koshinetsuMomijiEvents}
      regionKey="koshinetsu"
      activityKey="momiji"
      pageTitle="甲信越狩枫名所列表"
      pageDescription="从苗場ドラゴンドラ到河口湖美ケ原高原，体验甲信越地区最精彩的红叶名所，感受高原与湖泊的秋季盛景"
    />
  );
}
