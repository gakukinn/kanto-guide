/**
 * 第三层页面 - 神奈川灯光秀名所列表
 * @layer 三层 (Category Layer)
 * @category 灯光秀
 * @region 神奈川
 * @description 展示神奈川地区所有灯光秀名所，支持时期筛选和点赞互动
 * @template IlluminationPageTemplate.tsx
 * @dataSource WalkerPlus - https://illumi.walkerplus.com/ranking/ar0314/
 */

import { Metadata } from 'next';
import IlluminationPageTemplate from '../../../components/IlluminationPageTemplate';

export const metadata: Metadata = {
  title:
    '神奈川灯光秀2025 - 相模湖イルミリオン江之島湘南宝石等精彩冬季彩灯完整攻略',
  description:
    '神奈川县2025年灯光秀完整指南，包含相模湖イルミリオン（600万球）、湘南宝石江之島灯光、横滨红港未来、宮ヶ瀬湖畔巨型圣诞树等精彩景点。提供详细的点灯时间、电球数量、门票信息，助您规划完美的神奈川灯光秀之旅，体验璀璨冬夜的浪漫。',
  keywords: [
    '神奈川灯光秀',
    '相模湖イルミリオン',
    '江之島湘南宝石',
    '横滨红港未来灯光',
    '宮ヶ瀬湖畔圣诞树',
    '松田きらきらフェスタ',
    '神奈川冬季景点',
    '2025灯光秀',
    '神奈川旅游',
    '日本彩灯',
    '冬季活动',
  ],
  openGraph: {
    title:
      '神奈川灯光秀2025 - 相模湖イルミリオン江之島湘南宝石等精彩冬季彩灯完整攻略',
    description:
      '神奈川县2025年灯光秀完整指南，精彩景点等您来体验。从相模湖到江之島，感受神奈川璀璨冬夜的浪漫魅力。',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.kanto-travel-guide.com/kanagawa/illumination',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/illumination/kanagawa-lights.svg',
        width: 1200,
        height: 630,
        alt: '神奈川灯光秀名所',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      '神奈川灯光秀2025 - 相模湖イルミリオン江之島湘南宝石等精彩冬季彩灯完整攻略',
    description: '神奈川县2025年灯光秀完整指南，精彩景点等您来体验。',
    images: ['/images/illumination/kanagawa-lights.svg'],
  },
  alternates: {
    canonical: '/kanagawa/illumination',
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

// 灯光秀数据转换器 - 将爬虫数据转换为IlluminationPageTemplate格式
function transformCrawledDataToIlluminationEvents(crawledData: any[]): any[] {
  return crawledData.map((item, index) => ({
    id: `kanagawa-illumination-${index + 1}`,
    name: item.name,
    englishName: convertToEnglish(item.name),
    _sourceData: {
      japaneseName: item.name,
      japaneseDescription: item.name,
    },
    // 灯光秀特有的日期字段映射
    illuminationPeriod: item.date || '期间确认中', // 点灯期间
    lightingTime: item.time || '时间确认中', // 点灯时间
    location: cleanLocation(item.location),
    description: generateDescription(
      item.name,
      item.location,
      item.date,
      item.lightBulbs
    ),
    features: generateFeatures(item.location, item.lightBulbs, item.name),
    likes: parseInt(item.wantToVisit) || 0,
    website: item.detailUrl || '',
    venue: cleanLocation(item.location),
    detailLink: `/kanagawa/illumination/${generateSlug(item.name)}`,
    // 灯光秀特有字段
    bulbCount: formatBulbCount(item.lightBulbs),
    bulbCountNum: parseBulbCountToNumber(item.lightBulbs),
    theme: generateTheme(item.name),
    specialFeatures: generateSpecialFeatures(item.name, item.lightBulbs),
  }));
}

// 文本清理函数
function cleanLocation(location: string): string {
  if (!location) return '神奈川县内';
  // 移除多余的地区前缀
  return location.replace(/^神奈川県[・·]?/, '').trim() || '神奈川县内';
}

// 英文名称转换
function convertToEnglish(japaneseName: string): string {
  const nameMap: { [key: string]: string } = {
    'さがみ湖イルミリオン さがみ湖 MORI MORI':
      'Sagamiko Illumillion Sagamiko MORI MORI',
    'よこはまコスモワールド「大観覧車 光のアート」':
      'Yokohama Cosmoworld Giant Ferris Wheel Light Art',
    '湘南の宝石～江の島を彩る光と色の祭典～':
      'Shonan Jewel - Enoshima Light and Color Festival',
    クイーンズスクエア横浜クリスマス2024:
      "Queen's Square Yokohama Christmas 2024",
    'InterContinental Christmas 2024 (インターコンチネンタル クリスマス 2024)':
      'InterContinental Christmas 2024',
    '宮ヶ瀬湖畔園地・水の郷地域 ジャンボクリスマスツリーの点灯':
      'Miyagase Lakeside Park Giant Christmas Tree Illumination',
    'TOKYU DEPARTMENT STORE 2024 CHRISTMAS(東急百貨店2024クリスマス) たまプラーザ店':
      'Tokyu Department Store 2024 Christmas Tamaplaza',
    '第22回 松田きらきらフェスタ': '22nd Matsuda Kirakira Festival',
    '東戸塚ミュージックライト2024-2025':
      'Higashi-Totsuka Music Light 2024-2025',
    'ホテルニューグランドのクリスマス 2024': 'Hotel New Grand Christmas 2024',
  };
  return nameMap[japaneseName] || japaneseName;
}

// 描述生成函数
function generateDescription(
  name: string,
  location: string,
  date: string,
  lightBulbs: string
): string {
  const cleanLoc = cleanLocation(location);
  const bulbInfo =
    lightBulbs && lightBulbs !== '情報確認中' ? `约${lightBulbs}球灯光` : '';
  return `位于${cleanLoc}的${name}，${date}举办。${bulbInfo}营造璀璨冬夜景观，是神奈川地区不容错过的灯光秀盛典。`;
}

// 特色功能生成
function generateFeatures(
  location: string,
  lightBulbs: string,
  name: string
): string[] {
  const features = [];
  if (lightBulbs && lightBulbs !== '情報確認中') {
    features.push(`${lightBulbs}球璀璨灯光`);
  }
  if (name.includes('さがみ湖')) {
    features.push('関東最大规模灯光秀');
  }
  if (name.includes('江の島')) {
    features.push('湘南海岸绝景灯光');
  }
  if (name.includes('横浜') || name.includes('コスモワールド')) {
    features.push('港湾都市夜景');
  }
  if (name.includes('宮ヶ瀬')) {
    features.push('巨型圣诞树灯光');
  }
  if (name.includes('松田')) {
    features.push('富士山背景灯光');
  }
  if (name.includes('ホテル')) {
    features.push('豪华酒店圣诞装饰');
  }
  features.push('冬季限定活动');
  features.push('适合家庭观赏');
  return features;
}

// 主题生成
function generateTheme(name: string): string {
  if (name.includes('さがみ湖')) return '関東最大イルミネーション';
  if (name.includes('江の島')) return '湘南海岸浪漫主题';
  if (name.includes('コスモワールド')) return '摩天轮光艺术';
  if (name.includes('宮ヶ瀬')) return '巨型圣诞树';
  if (name.includes('横浜')) return '港湾都市圣诞';
  if (name.includes('松田')) return '富士山景观主题';
  return '冬季彩灯';
}

// 特色亮点生成
function generateSpecialFeatures(name: string, lightBulbs: string): string[] {
  const features = [];
  if (name.includes('さがみ湖')) {
    features.push('関東最大600万球灯光秀');
  }
  if (lightBulbs && lightBulbs.includes('6,000,000')) {
    features.push('600万球超大规模灯光');
  }
  if (name.includes('江の島')) {
    features.push('湘南宝石品牌认证');
  }
  if (name.includes('コスモワールド')) {
    features.push('摩天轮光艺术表演');
  }
  if (name.includes('宮ヶ瀬')) {
    features.push('高30米巨型圣诞树');
  }
  if (name.includes('松田')) {
    features.push('富士山绝景配景');
  }
  if (name.includes('InterContinental')) {
    features.push('五星级酒店豪华装饰');
  }
  return features;
}

// 电球数格式化
function formatBulbCount(lightBulbs: string): string {
  if (!lightBulbs || lightBulbs === '情報確認中') return '未公布';
  return `约${lightBulbs}球`;
}

// 电球数数值转换
function parseBulbCountToNumber(lightBulbs: string): number | null {
  if (!lightBulbs || lightBulbs === '情報確認中') return null;
  const numStr = lightBulbs.replace(/[^\d]/g, '');
  return numStr ? parseInt(numStr) : null;
}

// URL slug生成
function generateSlug(name: string): string {
  if (name.includes('さがみ湖')) return 'sagamiko-illumillion';
  if (name.includes('コスモワールド')) return 'yokohama-cosmoworld';
  if (name.includes('江の島')) return 'enoshima-shonan-jewel';
  if (name.includes('クイーンズスクエア')) return 'queens-square-yokohama';
  if (name.includes('InterContinental')) return 'intercontinental-christmas';
  if (name.includes('宮ヶ瀬')) return 'miyagase-christmas-tree';
  if (name.includes('東急百貨店')) return 'tokyu-tamaplaza';
  if (name.includes('松田')) return 'matsuda-kirakira-festa';
  if (name.includes('東戸塚')) return 'higashi-totsuka-music-light';
  if (name.includes('ニューグランド')) return 'hotel-new-grand';
  return name.toLowerCase().replace(/\s+/g, '-');
}

// 神奈川灯光秀数据（来源：ar0314-illumination-complete-2025-06-18T07-55-02-201Z.json）
// 数据统计：声明活动数量=10场，实际活动数组长度=10场 ✅ 一致
const crawledIlluminationData = [
  {
    name: 'さがみ湖イルミリオン さがみ湖 MORI MORI',
    location: '神奈川県・相模原市緑区 / さがみ湖MORI MORI',
    date: '2024年11月16日(土)～2025年5月11日',
    time: '16:00～21:00',
    lightBulbs: '6,000,000',
    wantToVisit: '77',
    detailUrl: 'https://illumi.walkerplus.com/detail/ar0314e17464/',
  },
  {
    name: 'よこはまコスモワールド「大観覧車 光のアート」',
    location: '神奈川県・横浜市中区 / よこはまコスモワールド',
    date: '情報確認中',
    time: '情報確認中',
    lightBulbs: '情報確認中',
    wantToVisit: '8',
    detailUrl: 'https://illumi.walkerplus.com/detail/ar0314e450297/',
  },
  {
    name: '湘南の宝石～江の島を彩る光と色の祭典～',
    location: '神奈川県・藤沢市 / 江の島サムエル・コッキング苑',
    date: '2024年11月23日(祝)～2025年2月28日',
    time: '17:00～20:00',
    lightBulbs: '情報確認中',
    wantToVisit: '22',
    detailUrl: 'https://illumi.walkerplus.com/detail/ar0314e127375/',
  },
  {
    name: 'クイーンズスクエア横浜クリスマス2024',
    location: '神奈川県・横浜市西区 / ク',
    date: '2024年11月5日(火)',
    time: '16:00・17:00・18:00・19:00・20:00・21:00 行ってみたい：2 行ってよかった：3',
    lightBulbs: '情報確認中',
    wantToVisit: '2',
    detailUrl: 'https://illumi.walkerplus.com/detail/ar0314e17385/',
  },
  {
    name: 'InterContinental Christmas 2024 (インターコンチネンタル クリスマス 2024)',
    location: '神奈川県・横浜市西区 / ヨコハマ グ',
    date: '2024年11月8日(金)',
    time: '情報確認中',
    lightBulbs: '情報確認中',
    wantToVisit: '2',
    detailUrl: 'https://illumi.walkerplus.com/detail/ar0314e17473/',
  },
  {
    name: '宮ヶ瀬湖畔園地・水の郷地域 ジャンボクリスマスツリーの点灯',
    location: '神奈川県・愛甲郡清川村 / 宮ヶ瀬湖畔園地・水の郷地域',
    date: '2024年11月23日(祝)',
    time: '17:00～22:00',
    lightBulbs: '710,000',
    wantToVisit: '16',
    detailUrl: 'https://illumi.walkerplus.com/detail/ar0314e17484/',
  },
  {
    name: 'TOKYU DEPARTMENT STORE 2024 CHRISTMAS(東急百貨店2024クリスマス) たまプラーザ店',
    location: '神奈川県・横浜市青葉区 / 東急百貨店たまプ',
    date: '2024年11月7日(木)',
    time: '10:00～20:00',
    lightBulbs: '9,800',
    wantToVisit: '1',
    detailUrl: 'https://illumi.walkerplus.com/detail/ar0314e18456/',
  },
  {
    name: '第22回 松田きらきらフェスタ',
    location: '神奈川県・足柄上郡松田町 / 西平畑公園',
    date: '2024年11月30日(土)～2024年12月29日',
    time: '17:00～21:00',
    lightBulbs: '240,000',
    wantToVisit: '20',
    detailUrl: 'https://illumi.walkerplus.com/detail/ar0314e19235/',
  },
  {
    name: '東戸塚ミュージックライト2024-2025',
    location: '神奈川県・横浜市戸塚区 / モレ',
    date: '2024年10月26日(土)～2025年2月14日',
    time: '17:00～24:00',
    lightBulbs: '100,000',
    wantToVisit: '12',
    detailUrl: 'https://illumi.walkerplus.com/detail/ar0314e330082/',
  },
  {
    name: 'ホテルニューグランドのクリスマス 2024',
    location: '神奈川県・横浜市中区 / ホテルニューグ',
    date: '2024年11月30日(土)',
    time: '23:30 行ってみたい：4 行ってよかった：3 電球数：15,000',
    lightBulbs: '15,000',
    wantToVisit: '4',
    detailUrl: 'https://illumi.walkerplus.com/detail/ar0314e450150/',
  },
];

// 转换数据为模板格式
const kanagawaIlluminationEvents = transformCrawledDataToIlluminationEvents(
  crawledIlluminationData
);

// 神奈川地区配置
const kanagawaRegionConfig = {
  name: 'kanagawa',
  displayName: '神奈川',
  emoji: '⛵',
  description: '从相模湖到江之島，感受神奈川璀璨灯光文化的精彩魅力',
  navigationLinks: {
    prev: { name: '千叶', url: '/chiba/illumination', emoji: '🌊' },
    next: { name: '北关东', url: '/kitakanto/illumination', emoji: '♨️' },
    current: { name: '神奈川', url: '/kanagawa' },
  },
};

export default function KanagawaIlluminationPage() {
  return (
    <IlluminationPageTemplate
      region={kanagawaRegionConfig}
      events={kanagawaIlluminationEvents}
      regionKey="kanagawa"
      activityKey="illumination"
      pageTitle="神奈川灯光秀活动列表"
      pageDescription="从相模湖600万球超大灯光秀到江之島湘南宝石，体验神奈川地区最精彩的灯光秀，感受港湾都市璀璨夜景的浪漫魅力"
    />
  );
}
