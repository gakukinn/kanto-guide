/**
 * 第三层页面 - 北关东狩枫名所列表
 * @layer 三层 (Category Layer)
 * @category 狩枫
 * @region 北关东
 * @description 展示北关东地区所有狩枫名所，支持时期筛选和点赞互动
 * @template MomijiPageTemplate.tsx
 * @dataSource WalkerPlus - https://koyo.walkerplus.com/ranking/ar0300/
 */

import { Metadata } from 'next';
import MomijiPageTemplate from '../../../components/MomijiPageTemplate';

export const metadata: Metadata = {
  title: '北关东狩枫名所2025 - 谷川岳本土寺伊香保温泉等精彩红叶观赏完整攻略',
  description:
    '北关东2025年狩枫名所完整指南，包含谷川岳红叶、本土寺红叶、伊香保温泉红叶、袋田の滝红叶、日光红叶等精彩景点。提供详细的观赏时期、最佳时间、交通方式、门票信息，助您规划完美的北关东狩枫之旅，体验日本传统秋季文化。',
  keywords: [
    '北关东狩枫',
    '谷川岳红叶',
    '本土寺红叶',
    '伊香保温泉红叶',
    '袋田の滝红叶',
    '日光红叶',
    '塩原红叶',
    '北关东秋季景点',
    '2025狩枫',
    '北关东旅游',
    '日本红叶',
    '秋季活动',
  ],
  openGraph: {
    title: '北关东狩枫名所2025 - 谷川岳本土寺伊香保温泉等精彩红叶观赏完整攻略',
    description:
      '北关东2025年狩枫名所完整指南，精彩景点等您来体验。从谷川岳到本土寺，感受北关东传统秋季红叶文化。',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.kanto-travel-guide.com/kitakanto/momiji',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/momiji/kitakanto-autumn.svg',
        width: 1200,
        height: 630,
        alt: '北关东狩枫名所',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '北关东狩枫名所2025 - 谷川岳本土寺伊香保温泉等精彩红叶观赏完整攻略',
    description: '北关东2025年狩枫名所完整指南，精彩景点等您来体验。',
    images: ['/images/momiji/kitakanto-autumn.svg'],
  },
  alternates: {
    canonical: '/kitakanto/momiji',
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
    id: `kitakanto-momiji-${index + 1}`,
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
    detailLink: `/kitakanto/momiji/${generateSlug(item.name)}`,
  }));
}

// 生成英文名称
function convertToEnglish(japaneseName: string): string {
  const nameMap: { [key: string]: string } = {
    伊香保温泉の紅葉: 'Ikaho Onsen Autumn Leaves',
    本土寺の紅葉: 'Hondoji Temple Autumn Leaves',
    谷川岳の紅葉: 'Tanigawadake Mountain Autumn Leaves',
    袋田の滝の紅葉: 'Fukuroda Falls Autumn Leaves',
    '日光(いろは坂)の紅葉': 'Nikko Irohazaka Autumn Leaves',
    '日光(中禅寺湖湖畔)の紅葉': 'Nikko Chuzenji Lake Autumn Leaves',
    塩原の紅葉: 'Shiobara Autumn Leaves',
    '世界遺産 日光の社寺(日光東照宮・日光山輪王寺・日光二荒山神社)の紅葉':
      'Nikko World Heritage Shrines Autumn Leaves',
    '湯西川温泉(平家の里)の紅葉':
      'Yunishigawa Onsen Heike no Sato Autumn Leaves',
    那須平成の森の紅葉: 'Nasu Heisei no Mori Autumn Leaves',
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
  return `位于${location}的${name.replace('の紅葉', '')}，${viewingPeriod}为最佳观赏期，是北关东地区著名的红叶观赏胜地。`;
}

// 获取真实特色描述（基于WalkerPlus网站爬取的数据）
function generateFeatures(name: string): string[] {
  const realFeaturesMap: { [key: string]: string[] } = {
    伊香保温泉の紅葉: [
      '🎭 ライトアップに映える紅葉の取り合わせが美しい',
      '♨️ 温泉地の红叶',
      '🍁 传统观赏地',
    ],
    本土寺の紅葉: [
      '🌸 約1000本のモミジが境内を彩る',
      '⛩️ 寺院红叶',
      '🍂 红叶名所',
    ],
    谷川岳の紅葉: [
      '⛰️ 切り立った岩肌に紅葉のコントラストが映える',
      '🏔️ 山岳红叶',
      '🍁 壮丽景观',
    ],
    袋田の滝の紅葉: [
      '💧 日本屈指の名瀑が艶やかな紅葉に染まる',
      '🌊 瀑布红叶',
      '🍂 日本名瀑',
    ],
    '日光(いろは坂)の紅葉': [
      '🚗 山裾の紅葉を車中から楽しめる日光の名所',
      '🛣️ 车窗观赏',
      '🍁 日光名所',
    ],
    '日光(中禅寺湖湖畔)の紅葉': [
      '🏞️ 日光を代表する美しい湖と紅葉を楽しめる景勝地',
      '🌊 湖畔红叶',
      '🍂 景胜地',
    ],
    塩原の紅葉: [
      '🌉 温泉が点在する渓谷の吊り橋から眺める紅葉美',
      '♨️ 温泉红叶',
      '🍁 溪谷风光',
    ],
    '世界遺産 日光の社寺(日光東照宮・日光山輪王寺・日光二荒山神社)の紅葉': [
      '🏛️ 日光の古社名刹で世界遺産＆紅葉散策',
      '🌸 世界遗产',
      '⛩️ 古社名刹',
    ],
    '湯西川温泉(平家の里)の紅葉': [
      '🏮 平家落人伝説の伝わる温泉地の紅葉',
      '♨️ 温泉红叶',
      '📿 历史传说',
    ],
    那須平成の森の紅葉: [
      '🌲 紅葉の森を散策し、紅葉を愛でる',
      '🚶‍♂️ 森林散策',
      '🍂 自然体验',
    ],
  };

  return (
    realFeaturesMap[name] || ['🍁 红叶观赏', '⛰️ 北关东景点', '🍂 秋季名所']
  );
}

// 生成URL slug
function generateSlug(name: string): string {
  const slugMap: { [key: string]: string } = {
    伊香保温泉の紅葉: 'ikaho-onsen',
    本土寺の紅葉: 'hondoji-temple',
    谷川岳の紅葉: 'tanigawadake',
    袋田の滝の紅葉: 'fukuroda-falls',
    '日光(いろは坂)の紅葉': 'nikko-irohazaka',
    '日光(中禅寺湖湖畔)の紅葉': 'nikko-chuzenji-lake',
    塩原の紅葉: 'shiobara',
    '世界遺産 日光の社寺(日光東照宮・日光山輪王寺・日光二荒山神社)の紅葉':
      'nikko-world-heritage-shrines',
    '湯西川温泉(平家の里)の紅葉': 'yunishigawa-onsen-heike',
    那須平成の森の紅葉: 'nasu-heisei-forest',
  };

  return slugMap[name] || name.toLowerCase().replace(/[^a-z0-9]/g, '-');
}

// 北关东狩枫数据（来源：ar0300-momiji-complete-2025-06-18T05-43-16-050Z.json）
// 数据统计：声明活动数量=10场，实际活动数组长度=10场 ✅ 一致
const crawledMomijiData = [
  {
    name: '伊香保温泉の紅葉',
    location: '北関東内',
    coloringStart: '10月中旬',
    bestViewing: '10月下旬～11月上旬',
    wantToVisit: '103',
    detailUrl: 'https://koyo.walkerplus.com/detail/ar0310e154488/',
  },
  {
    name: '本土寺の紅葉',
    location: '北関東内',
    coloringStart: '11月中旬',
    bestViewing: '11月下旬',
    wantToVisit: '125',
    detailUrl: 'https://koyo.walkerplus.com/detail/ar0312e13255/',
  },
  {
    name: '谷川岳の紅葉',
    location: '北関東内',
    coloringStart: '10月上旬',
    bestViewing: '9月下旬～10月上旬',
    wantToVisit: '178',
    detailUrl: 'https://koyo.walkerplus.com/detail/ar0310e12824/',
  },
  {
    name: '袋田の滝の紅葉',
    location: '北関東内',
    coloringStart: '10月下旬',
    bestViewing: '11月上旬～11月中旬',
    wantToVisit: '105',
    detailUrl: 'https://koyo.walkerplus.com/detail/ar0308e13083/',
  },
  {
    name: '日光(いろは坂)の紅葉',
    location: '北関東内',
    coloringStart: '10月中旬',
    bestViewing: '10月中旬～11月上旬',
    wantToVisit: '62',
    detailUrl: 'https://koyo.walkerplus.com/detail/ar0309e12983/',
  },
  {
    name: '日光(中禅寺湖湖畔)の紅葉',
    location: '北関東内',
    coloringStart: '10月中旬',
    bestViewing: '10月中旬～11月上旬',
    wantToVisit: '26',
    detailUrl: 'https://koyo.walkerplus.com/detail/ar0309e13029/',
  },
  {
    name: '塩原の紅葉',
    location: '北関東内',
    coloringStart: '10月中旬',
    bestViewing: '10月下旬～11月中旬',
    wantToVisit: '73',
    detailUrl: 'https://koyo.walkerplus.com/detail/ar0309e12844/',
  },
  {
    name: '世界遺産 日光の社寺(日光東照宮・日光山輪王寺・日光二荒山神社)の紅葉',
    location: '北関東内',
    coloringStart: '10月下旬',
    bestViewing: '11月上旬～11月中旬',
    wantToVisit: '13',
    detailUrl: 'https://koyo.walkerplus.com/detail/ar0309e13068/',
  },
  {
    name: '湯西川温泉(平家の里)の紅葉',
    location: '北関東内',
    coloringStart: '10月中旬',
    bestViewing: '10月中旬～11月中旬',
    wantToVisit: '15',
    detailUrl: 'https://koyo.walkerplus.com/detail/ar0309e154477/',
  },
  {
    name: '那須平成の森の紅葉',
    location: '北関東内',
    coloringStart: '10月下旬',
    bestViewing: '10月下旬',
    wantToVisit: '8',
    detailUrl: 'https://koyo.walkerplus.com/detail/ar0309e394016/',
  },
];

// 转换数据为模板格式
const kitakantoMomijiEvents =
  transformCrawledDataToMomijiEvents(crawledMomijiData);

// 北关东地区配置
const kitakantoRegionConfig = {
  name: 'kitakanto',
  displayName: '北关东',
  emoji: '⛰️',
  description: '从谷川岳到本土寺，感受北关东红叶文化的精彩魅力',
  navigationLinks: {
    prev: { name: '神奈川', url: '/kanagawa/momiji', emoji: '🗻' },
    next: { name: '甲信越', url: '/koshinetsu/momiji', emoji: '🏔️' },
    current: { name: '北关东', url: '/kitakanto' },
  },
};

export default function KitakantoMomijiPage() {
  return (
    <MomijiPageTemplate
      region={kitakantoRegionConfig}
      events={kitakantoMomijiEvents}
      regionKey="kitakanto"
      activityKey="momiji"
      pageTitle="北关东狩枫名所列表"
      pageDescription="从谷川岳到本土寺伊香保温泉，体验北关东地区最精彩的红叶名所，感受传统秋季盛景"
    />
  );
}
