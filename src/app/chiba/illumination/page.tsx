/**
 * 第三层页面 - 千叶灯光秀名所列表
 * @layer 三层 (Category Layer)
 * @category 灯光秀
 * @region 千叶
 * @description 展示千叶地区所有灯光秀名所，支持时期筛选和点赞互动
 * @template IlluminationPageTemplate.tsx
 * @dataSource WalkerPlus - https://illumi.walkerplus.com/ranking/ar0312/
 */

import { Metadata } from 'next';
import IlluminationPageTemplate from '../../../components/IlluminationPageTemplate';

export const metadata: Metadata = {
  title: '千叶灯光秀2025 - 东京德国村迪士尼度假区等精彩冬季彩灯完整攻略',
  description:
    '千叶县2025年灯光秀完整指南，包含东京德国村ウインターイルミネーション、东京ディズニーリゾートクリスマス、森のイルミネーション、千葉ニュータウンイルミライ等精彩景点。提供详细的点灯时间、电球数量、门票信息，助您规划完美的千叶灯光秀之旅，体验璀璨冬夜的浪漫。',
  keywords: [
    '千叶灯光秀',
    '东京德国村灯光秀',
    '东京迪士尼圣诞灯光',
    '森のイルミネーション',
    '千叶ニュータウンイルミライ',
    'マザー牧场灯光秀',
    '千叶冬季景点',
    '2025灯光秀',
    '千叶旅游',
    '日本彩灯',
    '冬季活动',
  ],
  openGraph: {
    title: '千叶灯光秀2025 - 东京德国村迪士尼度假区等精彩冬季彩灯完整攻略',
    description:
      '千叶县2025年灯光秀完整指南，精彩景点等您来体验。从东京德国村到迪士尼度假区，感受千叶璀璨冬夜的浪漫魅力。',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.kanto-travel-guide.com/chiba/illumination',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/illumination/chiba-lights.svg',
        width: 1200,
        height: 630,
        alt: '千叶灯光秀名所',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '千叶灯光秀2025 - 东京德国村迪士尼度假区等精彩冬季彩灯完整攻略',
    description: '千叶县2025年灯光秀完整指南，精彩景点等您来体验。',
    images: ['/images/illumination/chiba-lights.svg'],
  },
  alternates: {
    canonical: '/chiba/illumination',
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
    id: `chiba-illumination-${index + 1}`,
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
    detailLink: `/chiba/illumination/${generateSlug(item.name)}`,
    // 灯光秀特有字段
    bulbCount: formatBulbCount(item.lightBulbs),
    bulbCountNum: parseBulbCountToNumber(item.lightBulbs),
    theme: generateTheme(item.name),
    specialFeatures: generateSpecialFeatures(item.name, item.lightBulbs),
  }));
}

// 文本清理函数
function cleanLocation(location: string): string {
  if (!location) return '千叶县内';
  // 移除多余的地区前缀
  return location.replace(/^千葉県[・·]?/, '').trim() || '千叶县内';
}

// 英文名称转换
function convertToEnglish(japaneseName: string): string {
  const nameMap: { [key: string]: string } = {
    '東京ドイツ村 ウインターイルミネーション 2024-2025':
      'Tokyo German Village Winter Illumination 2024-2025',
    森のイルミネーション2024: 'Forest Illumination 2024',
    '千葉ニュータウン イルミライ★INZAI': 'Chiba New Town Illuminight INZAI',
    '東京ディズニーリゾート(R)のクリスマス(東京ディズニーランド)':
      'Tokyo Disney Resort Christmas (Tokyo Disneyland)',
    'マザー牧場 イルミネーション 光の花園 2024-2025':
      'Mother Farm Illumination Garden of Light 2024-2025',
    'イオンモール幕張新都心 クリスマスイルミネーション':
      'AEON Mall Makuhari New City Christmas Illumination',
    '2025もばら冬の七夕まつり': '2025 Mobara Winter Tanabata Festival',
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
  return `位于${cleanLoc}的${name}，${date}举办。${bulbInfo}营造璀璨冬夜景观，是千叶地区不容错过的灯光秀盛典。`;
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
  if (name.includes('ドイツ村')) {
    features.push('德国村主题乐园灯光');
  }
  if (name.includes('ディズニー')) {
    features.push('迪士尼魔法圣诞');
  }
  if (name.includes('森の')) {
    features.push('自然森林环境');
  }
  if (name.includes('ニュータウン')) {
    features.push('现代新城灯光');
  }
  if (name.includes('マザー牧場')) {
    features.push('牧场风情灯光');
  }
  features.push('冬季限定活动');
  features.push('适合家庭观赏');
  return features;
}

// 主题生成
function generateTheme(name: string): string {
  if (name.includes('ドイツ村')) return '德国村冬季主题';
  if (name.includes('ディズニー')) return '迪士尼圣诞主题';
  if (name.includes('森の')) return '森林自然主题';
  if (name.includes('七夕')) return '七夕浪漫主题';
  if (name.includes('マザー牧場')) return '牧场田园主题';
  return '冬季彩灯';
}

// 特色亮点生成
function generateSpecialFeatures(name: string, lightBulbs: string): string[] {
  const features = [];
  if (name.includes('ドイツ村')) {
    features.push('関東三大イルミネーション之一');
  }
  if (lightBulbs && lightBulbs.includes('3,000,000')) {
    features.push('300万球超大规模灯光');
  }
  if (name.includes('ディズニー')) {
    features.push('迪士尼官方圣诞装饰');
  }
  if (name.includes('ニュータウン')) {
    features.push('最新LED技术应用');
  }
  if (name.includes('マザー牧場')) {
    features.push('牧场动物与灯光结合');
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
  if (name.includes('ドイツ村')) return 'tokyo-german-village';
  if (name.includes('ディズニー')) return 'tokyo-disney-resort';
  if (name.includes('森のイルミネーション')) return 'forest-illumination';
  if (name.includes('ニュータウン')) return 'chiba-new-town';
  if (name.includes('マザー牧場')) return 'mother-farm';
  if (name.includes('イオンモール')) return 'aeon-mall-makuhari';
  if (name.includes('もばら')) return 'mobara-tanabata';
  return name.toLowerCase().replace(/\s+/g, '-');
}

// 千叶灯光秀数据（来源：ar0312-illumination-complete-2025-06-18T07-54-53-554Z.json）
// 数据统计：声明活动数量=7场，实际活动数组长度=7场 ✅ 一致
const crawledIlluminationData = [
  {
    name: '2025もばら冬の七夕まつり',
    location: '千葉県・茂原市 / 豊田川沿い県道長生茂原自転車道',
    date: '2025年1月19日(日)',
    time: '17:00～21:00',
    lightBulbs: '情報確認中',
    wantToVisit: '4',
    detailUrl: 'https://illumi.walkerplus.com/detail/ar0312e378933/',
  },
  {
    name: '東京ドイツ村 ウインターイルミネーション 2024-2025',
    location: '千葉県・袖ケ浦市 / 東京ド',
    date: '2024年11月1日(金)～2025年4月6日',
    time: '20:00(最終入園 19:30) 行ってみたい：27 行ってよかった：17 電球数：3,000,000',
    lightBulbs: '3,000,000',
    wantToVisit: '27',
    detailUrl: 'https://illumi.walkerplus.com/detail/ar0312e17438/',
  },
  {
    name: '森のイルミネーション2024',
    location: '千葉県・市原市 / いちはらクオードの森',
    date: '2024年11月16日(土)',
    time: '17:00～20:00',
    lightBulbs: '300,000',
    wantToVisit: '70',
    detailUrl: 'https://illumi.walkerplus.com/detail/ar0312e331225/',
  },
  {
    name: '千葉ニュータウン イルミライ★INZAI',
    location: '千葉県・印西市 / 北総線 千葉ニュータウン中央駅周辺',
    date: '2024年11月30日(土)～2025年1月26日',
    time: '17:00～21:00',
    lightBulbs: '600,000',
    wantToVisit: '350',
    detailUrl: 'https://illumi.walkerplus.com/detail/ar0312e325037/',
  },
  {
    name: '東京ディズニーリゾート(R)のクリスマス(東京ディズニーランド)',
    location: '千葉県・浦安市 / 東京ディズニー',
    date: '2024年11月15日(金)',
    time: '情報確認中',
    lightBulbs: '情報確認中',
    wantToVisit: '4',
    detailUrl: 'https://illumi.walkerplus.com/detail/ar0312e17495/',
  },
  {
    name: 'マザー牧場 イルミネーション 光の花園 2024-2025',
    location: '千葉県・富津市 / マザー牧場',
    date: '2024年11月2日(土)～2025年2月24日',
    time: '16:00～19:30',
    lightBulbs: '情報確認中',
    wantToVisit: '3',
    detailUrl: 'https://illumi.walkerplus.com/detail/ar0312e17531/',
  },
  {
    name: 'イオンモール幕張新都心 クリスマスイルミネーション',
    location: '千葉県・千葉市美浜区 /',
    date: '2024年11月8日(金)～2025年1月31日',
    time: '17:00～21:00',
    lightBulbs: '情報確認中',
    wantToVisit: '35',
    detailUrl: 'https://illumi.walkerplus.com/detail/ar0312e331212/',
  },
];

// 转换数据为模板格式
const chibaIlluminationEvents = transformCrawledDataToIlluminationEvents(
  crawledIlluminationData
);

// 千叶地区配置
const chibaRegionConfig = {
  name: 'chiba',
  displayName: '千叶',
  emoji: '🌊',
  description: '从德国村到迪士尼，感受千叶璀璨灯光文化的精彩魅力',
  navigationLinks: {
    prev: { name: '埼玉', url: '/saitama/illumination', emoji: '🌸' },
    next: { name: '神奈川', url: '/kanagawa/illumination', emoji: '⛵' },
    current: { name: '千叶', url: '/chiba' },
  },
};

export default function ChibaIlluminationPage() {
  return (
    <IlluminationPageTemplate
      region={chibaRegionConfig}
      events={chibaIlluminationEvents}
      regionKey="chiba"
      activityKey="illumination"
      pageTitle="千叶灯光秀活动列表"
      pageDescription="从东京德国村到迪士尼度假区，体验千叶地区最精彩的灯光秀，感受海滨新城璀璨夜景的浪漫魅力"
    />
  );
}
