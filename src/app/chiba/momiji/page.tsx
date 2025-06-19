/**
 * 第三层页面 - 千叶狩枫名所列表
 * @layer 三层 (Category Layer)
 * @category 狩枫
 * @region 千叶
 * @description 展示千叶地区所有狩枫名所，支持时期筛选和点赞互动
 * @template MomijiPageTemplate.tsx
 * @dataSource WalkerPlus - https://koyo.walkerplus.com/ranking/ar0312/
 */

import { Metadata } from 'next';
import MomijiPageTemplate from '../../../components/MomijiPageTemplate';

export const metadata: Metadata = {
  title: '千叶狩枫名所2025 - 本土寺養老渓谷成田山等精彩红叶观赏完整攻略',
  description:
    '千叶县2025年狩枫名所完整指南，包含本土寺红叶、養老渓谷红叶、成田山新勝寺红叶、亀山湖红叶等精彩景点。提供详细的观赏时期、最佳时间、交通方式、门票信息，助您规划完美的千叶狩枫之旅，体验日本传统秋季文化。',
  keywords: [
    '千叶狩枫',
    '本土寺红叶',
    '養老渓谷红叶',
    '成田山新勝寺红叶',
    '亀山湖红叶',
    '東漸寺红叶',
    '小松寺红叶',
    '千叶秋季景点',
    '2025狩枫',
    '千叶旅游',
    '日本红叶',
    '秋季活动',
  ],
  openGraph: {
    title: '千叶狩枫名所2025 - 本土寺養老渓谷成田山等精彩红叶观赏完整攻略',
    description:
      '千叶县2025年狩枫名所完整指南，精彩景点等您来体验。从本土寺到養老渓谷，感受千叶传统秋季红叶文化。',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.kanto-travel-guide.com/chiba/momiji',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/momiji/chiba-autumn.svg',
        width: 1200,
        height: 630,
        alt: '千叶狩枫名所',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '千叶狩枫名所2025 - 本土寺養老渓谷成田山等精彩红叶观赏完整攻略',
    description: '千叶县2025年狩枫名所完整指南，精彩景点等您来体验。',
    images: ['/images/momiji/chiba-autumn.svg'],
  },
  alternates: {
    canonical: '/chiba/momiji',
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
    id: `chiba-momiji-${index + 1}`,
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
    detailLink: `/chiba/momiji/${generateSlug(item.name)}`,
  }));
}

// 生成英文名称
function convertToEnglish(japaneseName: string): string {
  const nameMap: { [key: string]: string } = {
    本土寺の紅葉: 'Hondoji Temple Autumn Leaves',
    養老渓谷の紅葉: 'Yoro Valley Autumn Leaves',
    '成田山新勝寺 成田山公園の紅葉':
      'Naritasan Shinshoji Temple Park Autumn Leaves',
    小松寺の紅葉: 'Komatsumji Temple Autumn Leaves',
    亀山湖の紅葉: 'Kameyama Lake Autumn Leaves',
    東漸寺の紅葉: 'Tōzenji Temple Autumn Leaves',
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
  const locationDesc = location.replace('千葉県・', '');
  return `位于${locationDesc}的${name.replace('の紅葉', '')}，${viewingPeriod}为最佳观赏期，是千叶县内著名的红叶观赏胜地。`;
}

// 获取真实特色描述（基于WalkerPlus网站爬取的数据）
function generateFeatures(name: string): string[] {
  const realFeaturesMap: { [key: string]: string[] } = {
    本土寺の紅葉: [
      '🌸 約1000本のモミジが境内を彩る',
      '⛩️ 寺院红叶',
      '🍂 红叶名所',
    ],
    養老渓谷の紅葉: [
      '🌊 渓谷美と紅葉の絶景コンビネーション',
      '🏞️ 溪谷风光',
      '🌿 自然美景',
    ],
    '成田山新勝寺 成田山公園の紅葉': [
      '⛩️ 歴史ある名刹で楽しむ境内の紅葉',
      '🙏 历史名刹',
      '🏛️ 文化遗产',
    ],
    小松寺の紅葉: [
      '🌺 山里の古刹で楽しむ静寂な紅葉',
      '⛩️ 山中古寺',
      '🧘‍♂️ 静谧氛围',
    ],
    亀山湖の紅葉: ['🌊 湖面に映る紅葉美', '🚣‍♂️ 湖泊风光', '🍂 湖光山色'],
    東漸寺の紅葉: [
      '🌸 浄土宗の古刹で楽しむ秋の風情',
      '⛩️ 净土宗',
      '🍂 古刹风情',
    ],
  };

  return realFeaturesMap[name] || ['🍁 红叶观赏', '🌊 千叶景点', '🍂 秋季名所'];
}

// 生成URL slug
function generateSlug(name: string): string {
  const slugMap: { [key: string]: string } = {
    本土寺の紅葉: 'hondoji-temple',
    養老渓谷の紅葉: 'yoro-valley',
    '成田山新勝寺 成田山公園の紅葉': 'naritasan-shinshoji-park',
    小松寺の紅葉: 'komatsumji-temple',
    亀山湖の紅葉: 'kameyama-lake',
    東漸寺の紅葉: 'tozenji-temple',
  };

  return slugMap[name] || name.toLowerCase().replace(/[^a-z0-9]/g, '-');
}

// 千叶狩枫数据（来源：chiba-momiji-complete-2025-06-18T05-38-00-280Z.json）
// 数据统计：声明活动数量=6场，实际活动数组长度=6场 ✅ 一致
const crawledMomijiData = [
  {
    name: '本土寺の紅葉',
    location: '千葉県・松戸市',
    coloringStart: '11月中旬',
    bestViewing: '11月下旬',
    wantToVisit: '125',
    detailUrl: 'https://koyo.walkerplus.com/detail/ar0312e13255/',
  },
  {
    name: '養老渓谷の紅葉',
    location: '千葉県・夷隅郡大多喜町',
    coloringStart: '11月中旬',
    bestViewing: '11月下旬～12月上旬',
    wantToVisit: '82',
    detailUrl: 'https://koyo.walkerplus.com/detail/ar0312e13014/',
  },
  {
    name: '成田山新勝寺 成田山公園の紅葉',
    location: '千葉県・成田市',
    coloringStart: '11月中旬',
    bestViewing: '11月中旬～11月下旬',
    wantToVisit: '25',
    detailUrl: 'https://koyo.walkerplus.com/detail/ar0312e12657/',
  },
  {
    name: '小松寺の紅葉',
    location: '千葉県・南房総市',
    coloringStart: '11月中旬',
    bestViewing: '11月下旬～12月上旬',
    wantToVisit: '8',
    detailUrl: 'https://koyo.walkerplus.com/detail/ar0312e13012/',
  },
  {
    name: '亀山湖の紅葉',
    location: '千葉県・君津市',
    coloringStart: '11月中旬',
    bestViewing: '11月中旬～12月上旬',
    wantToVisit: '47',
    detailUrl: 'https://koyo.walkerplus.com/detail/ar0312e13257/',
  },
  {
    name: '東漸寺の紅葉',
    location: '千葉県・松戸市',
    coloringStart: '11月下旬',
    bestViewing: '11月下旬～12月上旬',
    wantToVisit: '29',
    detailUrl: 'https://koyo.walkerplus.com/detail/ar0312e448708/',
  },
];

// 转换数据为模板格式
const chibaMomijiEvents = transformCrawledDataToMomijiEvents(crawledMomijiData);

// 千叶地区配置
const chibaRegionConfig = {
  name: 'chiba',
  displayName: '千叶',
  emoji: '🌊',
  description: '从本土寺到養老渓谷，感受千叶多元红叶文化的精彩魅力',
  navigationLinks: {
    prev: { name: '埼玉', url: '/saitama/momiji', emoji: '🌸' },
    next: { name: '神奈川', url: '/kanagawa/momiji', emoji: '🗻' },
    current: { name: '千叶', url: '/chiba' },
  },
};

export default function ChibaMomijiPage() {
  return (
    <MomijiPageTemplate
      region={chibaRegionConfig}
      events={chibaMomijiEvents}
      regionKey="chiba"
      activityKey="momiji"
      pageTitle="千叶狩枫名所列表"
      pageDescription="从本土寺到養老渓谷成田山，体验千叶地区最精彩的红叶名所，感受寺院文化与自然的秋季盛景"
    />
  );
}
