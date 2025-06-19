/**
 * 第三层页面 - 神奈川狩枫名所列表
 * @layer 三层 (Category Layer)
 * @category 狩枫
 * @region 神奈川
 * @description 展示神奈川地区所有狩枫名所，支持时期筛选和点赞互动
 * @template MomijiPageTemplate.tsx
 * @dataSource WalkerPlus - https://koyo.walkerplus.com/ranking/ar0314/
 */

import { Metadata } from 'next';
import MomijiPageTemplate from '../../../components/MomijiPageTemplate';

export const metadata: Metadata = {
  title: '神奈川狩枫名所2025 - 三溪園箱根美術館大山寺等精彩红叶观赏完整攻略',
  description:
    '神奈川县2025年狩枫名所完整指南，包含三溪園红叶、箱根美術館红叶、大山寺红叶、鶴岡八幡宮红叶、明月院红叶、丹沢湖红叶等精彩景点。提供详细的观赏时期、最佳时间、交通方式、门票信息，助您规划完美的神奈川狩枫之旅，体验日本传统秋季文化。',
  keywords: [
    '神奈川狩枫',
    '三溪園红叶',
    '箱根美術館红叶',
    '大山寺红叶',
    '鶴岡八幡宮红叶',
    '明月院红叶',
    '丹沢湖红叶',
    '鎌倉红叶',
    '箱根红叶',
    '神奈川秋季景点',
    '2025狩枫',
    '神奈川旅游',
    '日本红叶',
    '秋季活动',
  ],
  openGraph: {
    title: '神奈川狩枫名所2025 - 三溪園箱根美術館大山寺等精彩红叶观赏完整攻略',
    description:
      '神奈川县2025年狩枫名所完整指南，精彩景点等您来体验。从三溪園到箱根，感受神奈川传统秋季红叶文化。',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.kanto-travel-guide.com/kanagawa/momiji',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/momiji/kanagawa-autumn.svg',
        width: 1200,
        height: 630,
        alt: '神奈川狩枫名所',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '神奈川狩枫名所2025 - 三溪園箱根美術館大山寺等精彩红叶观赏完整攻略',
    description: '神奈川县2025年狩枫名所完整指南，精彩景点等您来体验。',
    images: ['/images/momiji/kanagawa-autumn.svg'],
  },
  alternates: {
    canonical: '/kanagawa/momiji',
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
    id: `kanagawa-momiji-${index + 1}`,
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
    detailLink: `/kanagawa/momiji/${generateSlug(item.name)}`,
  }));
}

// 生成英文名称
function convertToEnglish(japaneseName: string): string {
  const nameMap: { [key: string]: string } = {
    三溪園の紅葉: 'Sankeien Garden Autumn Leaves',
    箱根美術館の紅葉: 'Hakone Art Museum Autumn Leaves',
    日本大通りの紅葉: 'Nihon Odori Avenue Autumn Leaves',
    一条恵観山荘の紅葉: 'Ichijo Ekan Sanso Autumn Leaves',
    生田緑地の紅葉: 'Ikuta Ryokuchi Park Autumn Leaves',
    '大山寺・大山阿夫利神社下社の紅葉':
      'Oyamadera Temple & Afuri Shrine Autumn Leaves',
    丹沢湖の紅葉: 'Tanzawa Lake Autumn Leaves',
    鶴岡八幡宮の紅葉: 'Tsurugaoka Hachimangu Shrine Autumn Leaves',
    明月院の紅葉: 'Meigetsuin Temple Autumn Leaves',
    根岸森林公園の紅葉: 'Negishi Forest Park Autumn Leaves',
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
  const locationDesc = location.replace('神奈川県・', '');
  return `位于${locationDesc}的${name.replace('の紅葉', '')}，${viewingPeriod}为最佳观赏期，是神奈川县内著名的红叶观赏胜地。`;
}

// 获取真实特色描述（基于WalkerPlus网站爬取的数据）
function generateFeatures(name: string): string[] {
  const realFeaturesMap: { [key: string]: string[] } = {
    三溪園の紅葉: [
      '🏮 歴史的建造物と紅葉が織りなす和の情緒',
      '🏛️ 历史建筑',
      '🌸 和式情趣',
    ],
    箱根美術館の紅葉: [
      '🎨 美術館の庭園で楽しむアートと紅葉の融合',
      '🖼️ 艺术庭园',
      '🎭 文化艺术',
    ],
    日本大通りの紅葉: [
      '🌳 横浜の歴史ある大通りを彩る紅葉並木',
      '🏛️ 历史大道',
      '🍂 街道红叶',
    ],
    一条恵観山荘の紅葉: [
      '🏯 茅葺屋根の古民家と紅葉の美しい調和',
      '🏠 古民家',
      '🌾 茅草屋顶',
    ],
    生田緑地の紅葉: [
      '🌳 都市部の緑地で楽しむ四季の自然美',
      '🌿 城市绿地',
      '🚶‍♂️ 自然散策',
    ],
    '大山寺・大山阿夫利神社下社の紅葉': [
      '⛩️ 参道を彩る紅葉と神聖な雰囲気',
      '🙏 神社参拜',
      '🍂 参道红叶',
    ],
    鶴岡八幡宮の紅葉: [
      '🌸 鎌倉を代表する古社で楽しむ歴史と紅葉',
      '⛩️ 古社名刹',
      '🏛️ 镰仓文化',
    ],
    明月院の紅葉: [
      '🔵 あじさい寺として有名な禅寺の秋の風情',
      '🌺 紫阳花寺',
      '🧘‍♂️ 禅寺氛围',
    ],
    丹沢湖の紅葉: ['🏞️ 湖面に映る山々の紅葉美', '🌊 湖面倒影', '⛰️ 山湖美景'],
    根岸森林公園の紅葉: [
      '🐎 競馬場跡地の緑地で楽しむ都市オアシス',
      '🌳 城市绿洲',
      '🏞️ 森林公园',
    ],
  };

  return (
    realFeaturesMap[name] || ['🍁 红叶观赏', '🗻 神奈川景点', '🍂 秋季名所']
  );
}

// 生成URL slug
function generateSlug(name: string): string {
  const slugMap: { [key: string]: string } = {
    三溪園の紅葉: 'sankeien-garden',
    箱根美術館の紅葉: 'hakone-art-museum',
    日本大通りの紅葉: 'nihon-odori-avenue',
    一条恵観山荘の紅葉: 'ichijo-ekan-sanso',
    生田緑地の紅葉: 'ikuta-ryokuchi-park',
    '大山寺・大山阿夫利神社下社の紅葉': 'oyamadera-afuri-shrine',
    丹沢湖の紅葉: 'tanzawa-lake',
    鶴岡八幡宮の紅葉: 'tsurugaoka-hachimangu',
    明月院の紅葉: 'meigetsuin-temple',
    根岸森林公園の紅葉: 'negishi-forest-park',
  };

  return slugMap[name] || name.toLowerCase().replace(/[^a-z0-9]/g, '-');
}

// 神奈川狩枫数据（来源：ar0314-momiji-complete-2025-06-18T05-40-59-165Z.json）
// 数据统计：声明活动数量=10场，实际活动数组长度=10场 ✅ 一致
const crawledMomijiData = [
  {
    name: '三溪園の紅葉',
    location: '神奈川県・横浜市中区',
    coloringStart: '11月中旬',
    bestViewing: '11月中旬～12月中旬',
    wantToVisit: '78',
    detailUrl: 'https://koyo.walkerplus.com/detail/ar0314e123975/',
  },
  {
    name: '箱根美術館の紅葉',
    location: '神奈川県・足柄下郡箱根町',
    coloringStart: '11月上旬',
    bestViewing: '11月上旬～11月下旬',
    wantToVisit: '34',
    detailUrl: 'https://koyo.walkerplus.com/detail/ar0314e154535/',
  },
  {
    name: '日本大通りの紅葉',
    location: '神奈川県・横浜市中区',
    coloringStart: '11月中旬',
    bestViewing: '11月中旬～12月上旬',
    wantToVisit: '10',
    detailUrl: 'https://koyo.walkerplus.com/detail/ar0314e373603/',
  },
  {
    name: '一条恵観山荘の紅葉',
    location: '神奈川県・鎌倉市',
    coloringStart: '11月中旬',
    bestViewing: '11月中旬～12月中旬',
    wantToVisit: '15',
    detailUrl: 'https://koyo.walkerplus.com/detail/ar0314e478572/',
  },
  {
    name: '生田緑地の紅葉',
    location: '神奈川県・川崎市多摩区',
    coloringStart: '11月上旬',
    bestViewing: '11月中旬～12月中旬',
    wantToVisit: '22',
    detailUrl: 'https://koyo.walkerplus.com/detail/ar0314e154539/',
  },
  {
    name: '大山寺・大山阿夫利神社下社の紅葉',
    location: '神奈川県・伊勢原市',
    coloringStart: '11月上旬～11月中旬',
    bestViewing: '11月中旬～11月下旬',
    wantToVisit: '100',
    detailUrl: 'https://koyo.walkerplus.com/detail/ar0314e12675/',
  },
  {
    name: '丹沢湖の紅葉',
    location: '神奈川県・足柄上郡山北町',
    coloringStart: '11月上旬',
    bestViewing: '11月上旬～11月下旬',
    wantToVisit: '50',
    detailUrl: 'https://koyo.walkerplus.com/detail/ar0314e13171/',
  },
  {
    name: '鶴岡八幡宮の紅葉',
    location: '神奈川県・鎌倉市',
    coloringStart: '11月中旬',
    bestViewing: '11月下旬～12月上旬',
    wantToVisit: '10',
    detailUrl: 'https://koyo.walkerplus.com/detail/ar0314e154526/',
  },
  {
    name: '明月院の紅葉',
    location: '神奈川県・鎌倉市',
    coloringStart: '11月中旬',
    bestViewing: '11月下旬～12月中旬',
    wantToVisit: '20',
    detailUrl: 'https://koyo.walkerplus.com/detail/ar0314e322957/',
  },
  {
    name: '根岸森林公園の紅葉',
    location: '神奈川県・横浜市中区',
    coloringStart: '11月上旬〜12月上旬',
    bestViewing: '11月上旬～12月上旬',
    wantToVisit: '11',
    detailUrl: 'https://koyo.walkerplus.com/detail/ar0314e393173/',
  },
];

// 转换数据为模板格式
const kanagawaMomijiEvents =
  transformCrawledDataToMomijiEvents(crawledMomijiData);

// 神奈川地区配置
const kanagawaRegionConfig = {
  name: 'kanagawa',
  displayName: '神奈川',
  emoji: '🗻',
  description: '从三溪園到箱根，感受神奈川多元红叶文化的精彩魅力',
  navigationLinks: {
    prev: { name: '千叶', url: '/chiba/momiji', emoji: '🌊' },
    next: { name: '北关东', url: '/kitakanto/momiji', emoji: '⛰️' },
    current: { name: '神奈川', url: '/kanagawa' },
  },
};

export default function KanagawaMomijiPage() {
  return (
    <MomijiPageTemplate
      region={kanagawaRegionConfig}
      events={kanagawaMomijiEvents}
      regionKey="kanagawa"
      activityKey="momiji"
      pageTitle="神奈川狩枫名所列表"
      pageDescription="从三溪園到箱根美術館大山寺，体验神奈川地区最精彩的红叶名所，感受古都鎌倉与箱根温泉的秋季盛景"
    />
  );
}
