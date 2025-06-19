/**
 * 第三层页面 - 埼玉狩枫名所列表
 * @layer 三层 (Category Layer)
 * @category 狩枫
 * @region 埼玉
 * @description 展示埼玉地区所有狩枫名所，支持时期筛选和点赞互动
 * @template MomijiPageTemplate.tsx
 * @dataSource WalkerPlus - https://koyo.walkerplus.com/ranking/ar0311/
 */

import { Metadata } from 'next';
import MomijiPageTemplate from '../../../components/MomijiPageTemplate';

export const metadata: Metadata = {
  title: '埼玉狩枫名所2025 - メッツァ長瀞嵐山渓谷等精彩红叶观赏完整攻略',
  description:
    '埼玉县2025年狩枫名所完整指南，包含メッツァ(ムーミンバレーパーク)红叶、長瀞红叶、嵐山渓谷红叶、国営武蔵丘陵森林公園等精彩景点。提供详细的观赏时期、最佳时间、交通方式、门票信息，助您规划完美的埼玉狩枫之旅，体验日本传统秋季文化。',
  keywords: [
    '埼玉狩枫',
    'メッツァ红叶',
    'ムーミンバレーパーク红叶',
    '長瀞红叶',
    '嵐山渓谷红叶',
    '国営武蔵丘陵森林公園红叶',
    '埼玉秋季景点',
    '2025狩枫',
    '埼玉旅游',
    '日本红叶',
    '秋季活动',
  ],
  openGraph: {
    title: '埼玉狩枫名所2025 - メッツァ長瀞嵐山渓谷等精彩红叶观赏完整攻略',
    description:
      '埼玉县2025年狩枫名所完整指南，精彩景点等您来体验。从メッツァ到長瀞，感受埼玉传统秋季红叶文化。',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.kanto-travel-guide.com/saitama/momiji',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/momiji/saitama-autumn.svg',
        width: 1200,
        height: 630,
        alt: '埼玉狩枫名所',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '埼玉狩枫名所2025 - メッツァ長瀞嵐山渓谷等精彩红叶观赏完整攻略',
    description: '埼玉县2025年狩枫名所完整指南，精彩景点等您来体验。',
    images: ['/images/momiji/saitama-autumn.svg'],
  },
  alternates: {
    canonical: '/saitama/momiji',
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
    id: `saitama-momiji-${index + 1}`,
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
    detailLink: `/saitama/momiji/${generateSlug(item.name)}`,
  }));
}

// 生成英文名称
function convertToEnglish(japaneseName: string): string {
  const nameMap: { [key: string]: string } = {
    'メッツァ(メッツァビレッジ・ムーミンバレーパーク)の紅葉':
      'Metsa Moomin Valley Park Autumn Leaves',
    天覧山の紅葉: 'Tenranzan Mountain Autumn Leaves',
    鳥居観音の紅葉: 'Torii Kannon Autumn Leaves',
    長瀞の紅葉: 'Nagatoro Autumn Leaves',
    嵐山渓谷の紅葉: 'Ranzan Valley Autumn Leaves',
    国営武蔵丘陵森林公園の紅葉:
      'Musashi Kyuryo National Forest Park Autumn Leaves',
    熊谷スポーツ文化公園の紅葉: 'Kumagaya Sports Culture Park Autumn Leaves',
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
  const locationDesc = location.replace('埼玉県・', '');
  return `位于${locationDesc}的${name.replace('の紅葉', '')}，${viewingPeriod}为最佳观赏期，是埼玉县内著名的红叶观赏胜地。`;
}

// 获取真实特色描述（基于WalkerPlus网站爬取的数据）
function generateFeatures(name: string): string[] {
  const realFeaturesMap: { [key: string]: string[] } = {
    'メッツァ(メッツァビレッジ・ムーミンバレーパーク)の紅葉': [
      '🏠 ムーミンの世界観と紅葉のコラボレーション',
      '🎪 主题乐园',
      '🌸 北欧风情',
    ],
    天覧山の紅葉: [
      '⛰️ 手軽にハイキングを楽しめる身近な山の紅葉',
      '🥾 轻松登山',
      '🌿 近郊山岳',
    ],
    鳥居観音の紅葉: [
      '🙏 白い巨大観音像と紅葉の荘厳な風景',
      '🗾 观音像',
      '🍂 庄严氛围',
    ],
    長瀞の紅葉: [
      '🚢 岩畳と長瀞川の清流に映える紅葉美',
      '🌊 溪流风光',
      '🪨 岩石景观',
    ],
    嵐山渓谷の紅葉: [
      '🌉 関東の嵐山と呼ばれる渓谷美',
      '🍂 关东岚山',
      '🏞️ 溪谷美景',
    ],
    国営武蔵丘陵森林公園の紅葉: [
      '🌲 広大な森林公園で楽しむ四季の自然',
      '🚴‍♂️ 森林公园',
      '🌳 国营公园',
    ],
    熊谷スポーツ文化公園の紅葉: [
      '⚽ スポーツ施設と紅葉のコントラスト',
      '🏟️ 体育公园',
      '🍂 运动文化',
    ],
  };

  return realFeaturesMap[name] || ['🍁 红叶观赏', '🌸 埼玉景点', '🍂 秋季名所'];
}

// 生成URL slug
function generateSlug(name: string): string {
  const slugMap: { [key: string]: string } = {
    'メッツァ(メッツァビレッジ・ムーミンバレーパーク)の紅葉':
      'metsa-moomin-valley',
    天覧山の紅葉: 'tenranzan',
    鳥居観音の紅葉: 'torii-kannon',
    長瀞の紅葉: 'nagatoro',
    嵐山渓谷の紅葉: 'ranzan-valley',
    国営武蔵丘陵森林公園の紅葉: 'musashi-kyuryo-park',
    熊谷スポーツ文化公園の紅葉: 'kumagaya-sports-park',
  };

  return slugMap[name] || name.toLowerCase().replace(/[^a-z0-9]/g, '-');
}

// 埼玉狩枫数据（来源：saitama-momiji-complete-2025-06-18T05-35-37-529Z.json）
// 数据统计：声明活动数量=7场，实际活动数组长度=7场 ✅ 一致
const crawledMomijiData = [
  {
    name: 'メッツァ(メッツァビレッジ・ムーミンバレーパーク)の紅葉',
    location: '埼玉県・飯能市',
    coloringStart: '11月上旬',
    bestViewing: '11月中旬～12月中旬',
    wantToVisit: '68',
    detailUrl: 'https://koyo.walkerplus.com/detail/ar0311e392865/',
  },
  {
    name: '天覧山の紅葉',
    location: '埼玉県・飯能市',
    coloringStart: '11月中旬',
    bestViewing: '11月下旬～12月上旬',
    wantToVisit: '6',
    detailUrl: 'https://koyo.walkerplus.com/detail/ar0311e12653/',
  },
  {
    name: '鳥居観音の紅葉',
    location: '埼玉県・飯能市',
    coloringStart: '10月中旬',
    bestViewing: '11月上旬～11月中旬',
    wantToVisit: '36',
    detailUrl: 'https://koyo.walkerplus.com/detail/ar0311e12655/',
  },
  {
    name: '長瀞の紅葉',
    location: '埼玉県・秩父郡長瀞町',
    coloringStart: '10月下旬',
    bestViewing: '11月上旬～11月下旬',
    wantToVisit: '17',
    detailUrl: 'https://koyo.walkerplus.com/detail/ar0311e13177/',
  },
  {
    name: '嵐山渓谷の紅葉',
    location: '埼玉県・比企郡嵐山町',
    coloringStart: '11月中旬',
    bestViewing: '11月中旬～12月上旬',
    wantToVisit: '52',
    detailUrl: 'https://koyo.walkerplus.com/detail/ar0311e154493/',
  },
  {
    name: '国営武蔵丘陵森林公園の紅葉',
    location: '埼玉県・比企郡滑川町',
    coloringStart: '11月中旬',
    bestViewing: '11月中旬～11月下旬',
    wantToVisit: '54',
    detailUrl: 'https://koyo.walkerplus.com/detail/ar0311e154497/',
  },
  {
    name: '熊谷スポーツ文化公園の紅葉',
    location: '埼玉県・熊谷市',
    coloringStart: '11月中旬',
    bestViewing: '11月上旬～11月下旬',
    wantToVisit: '5',
    detailUrl: 'https://koyo.walkerplus.com/detail/ar0311e372623/',
  },
];

// 转换数据为模板格式
const saitamaMomijiEvents =
  transformCrawledDataToMomijiEvents(crawledMomijiData);

// 埼玉地区配置
const saitamaRegionConfig = {
  name: 'saitama',
  displayName: '埼玉',
  emoji: '🌸',
  description: '从メッツァ到長瀞，感受埼玉多彩红叶文化的精彩魅力',
  navigationLinks: {
    prev: { name: '东京', url: '/tokyo/momiji', emoji: '🍁' },
    next: { name: '千叶', url: '/chiba/momiji', emoji: '🌊' },
    current: { name: '埼玉', url: '/saitama' },
  },
};

export default function SaitamaMomijiPage() {
  return (
    <MomijiPageTemplate
      region={saitamaRegionConfig}
      events={saitamaMomijiEvents}
      regionKey="saitama"
      activityKey="momiji"
      pageTitle="埼玉狩枫名所列表"
      pageDescription="从メッツァムーミンバレーパーク到長瀞嵐山渓谷，体验埼玉地区最精彩的红叶名所，感受自然与文化的秋季盛景"
    />
  );
}
