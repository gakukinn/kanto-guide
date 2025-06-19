/**
 * 第三层页面 - 东京狩枫名所列表
 * @layer 三层 (Category Layer)
 * @category 狩枫
 * @region 东京
 * @description 展示东京地区所有狩枫名所，支持时期筛选和点赞互动
 * @template MomijiPageTemplate.tsx
 * @dataSource WalkerPlus - https://koyo.walkerplus.com/ranking/ar0313/
 */

import { Metadata } from 'next';
import MomijiPageTemplate from '../../../components/MomijiPageTemplate';

export const metadata: Metadata = {
  title: '东京狩枫名所2025 - 高尾山昭和记念公园等精彩红叶观赏完整攻略',
  description:
    '东京都2025年狩枫名所完整指南，包含高尾山红叶、国营昭和记念公园红叶、奥多摩红叶、明治神宫外苑银杏等精彩景点。提供详细的观赏时期、最佳时间、交通方式、门票信息，助您规划完美的东京狩枫之旅，体验日本传统秋季文化。',
  keywords: [
    '东京狩枫',
    '高尾山红叶',
    '昭和记念公园红叶',
    '奥多摩红叶',
    '明治神宫外苑银杏',
    '东京秋季景点',
    '2025狩枫',
    '东京旅游',
    '日本红叶',
    '秋季活动',
  ],
  openGraph: {
    title: '东京狩枫名所2025 - 高尾山昭和记念公园等精彩红叶观赏完整攻略',
    description:
      '东京都2025年狩枫名所完整指南，精彩景点等您来体验。从高尾山到昭和记念公园，感受日本传统秋季红叶文化。',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.kanto-travel-guide.com/tokyo/momiji',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/momiji/tokyo-autumn.svg',
        width: 1200,
        height: 630,
        alt: '东京狩枫名所',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '东京狩枫名所2025 - 高尾山昭和记念公园等精彩红叶观赏完整攻略',
    description: '东京都2025年狩枫名所完整指南，精彩景点等您来体验。',
    images: ['/images/momiji/tokyo-autumn.svg'],
  },
  alternates: {
    canonical: '/tokyo/momiji',
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
    id: `tokyo-momiji-${index + 1}`,
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
    detailLink: `/tokyo/momiji/${generateSlug(item.name)}`,
  }));
}

// 生成英文名称
function convertToEnglish(japaneseName: string): string {
  const nameMap: { [key: string]: string } = {
    国営昭和記念公園の紅葉: 'Showa Kinen Park Autumn Leaves',
    高尾山の紅葉: 'Takao-san Autumn Leaves',
    明治神宮外苑の紅葉: 'Meiji Jingu Gaien Autumn Leaves',
    '奥多摩(奥多摩湖畔)の紅葉': 'Okutama Lake Autumn Leaves',
    小石川後楽園の紅葉: 'Koishikawa Korakuen Garden Autumn Leaves',
    大田黒公園の紅葉: 'Otaguro Park Autumn Leaves',
    東京都庭園美術館の紅葉: 'Tokyo Metropolitan Teien Art Museum Autumn Leaves',
    靖国神社の紅葉: 'Yasukuni Shrine Autumn Leaves',
    文京区立肥後細川庭園の紅葉: 'Higo Hosokawa Garden Autumn Leaves',
    芝公園の紅葉: 'Shiba Park Autumn Leaves',
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
  const locationDesc = location.replace('東京都・', '');
  return `位于${locationDesc}的${name.replace('の紅葉', '')}，${viewingPeriod}为最佳观赏期，是东京都内著名的红叶观赏胜地。`;
}

// 获取真实特色描述（基于WalkerPlus网站爬取的数据）
function generateFeatures(name: string): string[] {
  const realFeaturesMap: { [key: string]: string[] } = {
    国営昭和記念公園の紅葉: [
      '🌼 四季を通じて楽しめる都市部の大型公園',
      '🚶‍♂️ 散策道',
      '🌸 国营公园',
    ],
    文京区立肥後細川庭園の紅葉: [
      '🏮 日本庭園の美しい紅葉ライトアップ',
      '🌃 夜间点灯',
      '🏛️ 日式庭园',
    ],
    靖国神社の紅葉: [
      '⛩️ 都心の神社で楽しむ紅葉と歴史',
      '🙏 神社参拜',
      '🏙️ 都心景点',
    ],
    小石川後楽園の紅葉: [
      '🌊 池泉回遊式庭園で楽しむ四季の美',
      '🐟 池泉庭园',
      '🍂 回游式',
    ],
    高尾山の紅葉: [
      '🚡 ケーブルカーで楽しむ山の紅葉',
      '🚞 缆车观景',
      '⛰️ 山岳红叶',
    ],
    芝公園の紅葉: [
      '🗼 東京タワーを背景にした紅葉風景',
      '🌇 东京塔',
      '📷 拍照胜地',
    ],
    東京都庭園美術館の紅葉: [
      '🎨 アート建築と紅葉の美しい調和',
      '🏛️ 艺术建筑',
      '🎭 文化艺术',
    ],
    大田黒公園の紅葉: [
      '🎵 音楽家ゆかりの公園で楽しむ秋の調べ',
      '🎼 音乐文化',
      '🍂 文化公园',
    ],
    明治神宮外苑の紅葉: [
      '🌳 都心のイチョウ並木が織りなす黄金回廊',
      '🍂 银杏大道',
      '✨ 黄金色',
    ],
    '奥多摩(奥多摩湖畔)の紅葉': [
      '🏞️ 都内屈指の大自然で楽しむ湖畔の紅葉',
      '🌊 湖畔风光',
      '🌲 大自然',
    ],
  };

  return realFeaturesMap[name] || ['🍁 红叶观赏', '🏙️ 东京景点', '🍂 秋季名所'];
}

// 生成URL slug
function generateSlug(name: string): string {
  const slugMap: { [key: string]: string } = {
    国営昭和記念公園の紅葉: 'showa-kinen-park',
    高尾山の紅葉: 'takao-san',
    明治神宮外苑の紅葉: 'meiji-jingu-gaien',
    '奥多摩(奥多摩湖畔)の紅葉': 'okutama-lake',
    小石川後楽園の紅葉: 'koishikawa-korakuen',
    大田黒公園の紅葉: 'otaguro-park',
    東京都庭園美術館の紅葉: 'teien-art-museum',
    靖国神社の紅葉: 'yasukuni-shrine',
    文京区立肥後細川庭園の紅葉: 'higo-hosokawa-garden',
    芝公園の紅葉: 'shiba-park',
  };

  return slugMap[name] || name.toLowerCase().replace(/[^a-z0-9]/g, '-');
}

// 东京狩枫数据（来源：tokyo-momiji-complete-2025-06-18T04-03-46-460Z.json）
// 数据统计：声明活动数量=10场，实际活动数组长度=10场 ✅ 一致
const crawledMomijiData = [
  {
    name: '国営昭和記念公園の紅葉',
    location: '東京都・立川市',
    coloringStart: '10月下旬',
    bestViewing: '10月下旬～11月下旬',
    wantToVisit: '78',
    detailUrl: 'https://koyo.walkerplus.com/detail/ar0313e13052/',
  },
  {
    name: '文京区立肥後細川庭園の紅葉',
    location: '東京都・文京区',
    coloringStart: '11月中旬',
    bestViewing: '11月下旬～12月上旬',
    wantToVisit: '7',
    detailUrl: 'https://koyo.walkerplus.com/detail/ar0313e372630/',
  },
  {
    name: '靖国神社の紅葉',
    location: '東京都・千代田区',
    coloringStart: '11月中旬',
    bestViewing: '11月下旬～12月上旬',
    wantToVisit: '12',
    detailUrl: 'https://koyo.walkerplus.com/detail/ar0313e154522/',
  },
  {
    name: '小石川後楽園の紅葉',
    location: '東京都・文京区',
    coloringStart: '11月中旬',
    bestViewing: '11月下旬～12月上旬',
    wantToVisit: '40',
    detailUrl: 'https://koyo.walkerplus.com/detail/ar0313e12666/',
  },
  {
    name: '高尾山の紅葉',
    location: '東京都・八王子市',
    coloringStart: '11月中旬',
    bestViewing: '11月中旬～12月上旬',
    wantToVisit: '43',
    detailUrl: 'https://koyo.walkerplus.com/detail/ar0313e13090/',
  },
  {
    name: '芝公園の紅葉',
    location: '東京都・港区',
    coloringStart: '11月中旬',
    bestViewing: '11月下旬～12月下旬',
    wantToVisit: '12',
    detailUrl: 'https://koyo.walkerplus.com/detail/ar0313e154517/',
  },
  {
    name: '東京都庭園美術館の紅葉',
    location: '東京都・港区',
    coloringStart: '11月中旬',
    bestViewing: '12月上旬',
    wantToVisit: '22',
    detailUrl: 'https://koyo.walkerplus.com/detail/ar0313e154523/',
  },
  {
    name: '大田黒公園の紅葉',
    location: '東京都・杉並区',
    coloringStart: '11月下旬',
    bestViewing: '11月下旬～12月上旬',
    wantToVisit: '56',
    detailUrl: 'https://koyo.walkerplus.com/detail/ar0313e372631/',
  },
  {
    name: '明治神宮外苑の紅葉',
    location: '東京都・新宿区',
    coloringStart: '11月中旬',
    bestViewing: '11月中旬～12月上旬',
    wantToVisit: '26',
    detailUrl: 'https://koyo.walkerplus.com/detail/ar0313e12672/',
  },
  {
    name: '奥多摩(奥多摩湖畔)の紅葉',
    location: '東京都・西多摩郡奥多摩町',
    coloringStart: '奥多摩湖10月中旬',
    bestViewing: '10月下旬～11月中旬',
    wantToVisit: '98',
    detailUrl: 'https://koyo.walkerplus.com/detail/ar0313e12825/',
  },
];

// 转换数据为模板格式
const tokyoMomijiEvents = transformCrawledDataToMomijiEvents(crawledMomijiData);

// 东京地区配置
const tokyoRegionConfig = {
  name: 'tokyo',
  displayName: '东京',
  emoji: '🍁',
  description: '从都心到多摩，感受东京多元红叶文化的精彩魅力',
  navigationLinks: {
    prev: { name: '甲信越', url: '/koshinetsu/momiji', emoji: '🏔️' },
    next: { name: '埼玉', url: '/saitama/momiji', emoji: '🌸' },
    current: { name: '东京', url: '/tokyo' },
  },
};

export default function TokyoMomijiPage() {
  return (
    <MomijiPageTemplate
      region={tokyoRegionConfig}
      events={tokyoMomijiEvents}
      regionKey="tokyo"
      activityKey="momiji"
      pageTitle="东京狩枫名所列表"
      pageDescription="从高尾山到昭和记念公园，体验东京地区最精彩的红叶名所，感受都市与自然的秋季盛景"
    />
  );
}
