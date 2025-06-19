/**
 * 第三层页面 - 埼玉灯光秀名所列表
 * @layer 三层 (Category Layer)
 * @category 灯光秀
 * @region 埼玉
 * @description 展示埼玉地区所有灯光秀名所，支持时期筛选和点赞互动
 * @template IlluminationPageTemplate.tsx
 * @dataSource WalkerPlus - https://illumi.walkerplus.com/ranking/ar0311/
 */

import { Metadata } from 'next';
import IlluminationPageTemplate from '../../../components/IlluminationPageTemplate';

export const metadata: Metadata = {
  title: '埼玉灯光秀2025 - 国営武蔵丘陵森林公園等精彩冬季彩灯完整攻略',
  description:
    '埼玉县2025年灯光秀完整指南，包含国営武蔵丘陵森林公園スターライトイルミネーション、イルミネーションフェスタ等精彩景点。提供详细的点灯时间、电球数量、门票信息，助您规划完美的埼玉灯光秀之旅，体验璀璨冬夜的浪漫。',
  keywords: [
    '埼玉灯光秀',
    '国営武蔵丘陵森林公園灯光秀',
    'イルミネーションフェスタ',
    '埼玉冬季景点',
    '2025灯光秀',
    '埼玉旅游',
    '日本彩灯',
    '冬季活动',
  ],
  openGraph: {
    title: '埼玉灯光秀2025 - 国営武蔵丘陵森林公園等精彩冬季彩灯完整攻略',
    description:
      '埼玉县2025年灯光秀完整指南，精彩景点等您来体验。从国営武蔵丘陵森林公園到フレサよしみ，感受埼玉璀璨冬夜的浪漫魅力。',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.kanto-travel-guide.com/saitama/illumination',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/illumination/saitama-lights.svg',
        width: 1200,
        height: 630,
        alt: '埼玉灯光秀名所',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '埼玉灯光秀2025 - 国営武蔵丘陵森林公園等精彩冬季彩灯完整攻略',
    description: '埼玉县2025年灯光秀完整指南，精彩景点等您来体验。',
    images: ['/images/illumination/saitama-lights.svg'],
  },
  alternates: {
    canonical: '/saitama/illumination',
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
    id: `saitama-illumination-${index + 1}`,
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
    detailLink: `/saitama/illumination/${generateSlug(item.name)}`,
    // 灯光秀特有字段
    bulbCount: formatBulbCount(item.lightBulbs),
    bulbCountNum: parseBulbCountToNumber(item.lightBulbs),
    theme: generateTheme(item.name),
    specialFeatures: generateSpecialFeatures(item.name, item.lightBulbs),
  }));
}

// 文本清理函数
function cleanLocation(location: string): string {
  if (!location) return '埼玉县内';
  // 移除多余的地区前缀
  return location.replace(/^埼玉県[・·]?/, '').trim() || '埼玉县内';
}

// 英文名称转换
function convertToEnglish(japaneseName: string): string {
  const nameMap: { [key: string]: string } = {
    '国営武蔵丘陵森林公園 スターライトイルミネーション':
      'Musashi Kyuryo National Government Park Starlight Illumination',
    イルミネーションフェスタ2024: 'Illumination Festa 2024',
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
  return `位于${cleanLoc}的${name}，${date}举办。${bulbInfo}营造璀璨冬夜景观，是埼玉地区不容错过的灯光秀盛典。`;
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
  if (name.includes('森林公園')) {
    features.push('自然环境中的灯光艺术');
  }
  if (name.includes('フェスタ')) {
    features.push('节庆氛围浓厚');
  }
  features.push('冬季限定活动');
  features.push('适合家庭观赏');
  return features;
}

// 主题生成
function generateTheme(name: string): string {
  if (name.includes('スターライト')) return '星光主题';
  if (name.includes('フェスタ')) return '节庆主题';
  return '冬季彩灯';
}

// 特色亮点生成
function generateSpecialFeatures(name: string, lightBulbs: string): string[] {
  const features = [];
  if (name.includes('森林公園')) {
    features.push('国营公园内的大规模灯光展示');
  }
  if (lightBulbs && lightBulbs.includes('550,000')) {
    features.push('55万球超大规模灯光');
  }
  if (name.includes('フェスタ')) {
    features.push('地方特色节庆活动');
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
  if (name.includes('武蔵丘陵森林公園')) return 'musashi-kyuryo-park';
  if (name.includes('イルミネーションフェスタ')) return 'illumination-festa';
  return name.toLowerCase().replace(/\s+/g, '-');
}

// 埼玉灯光秀数据（来源：ar0311-illumination-complete-2025-06-18T07-54-29-280Z.json）
// 数据统计：声明活动数量=2场，实际活动数组长度=2场 ✅ 一致
const crawledIlluminationData = [
  {
    name: '国営武蔵丘陵森林公園 スターライトイルミネーション',
    location: '埼玉県・比企郡滑川町 / 国営武蔵丘陵森林公園',
    date: '2024年12月13日(金)',
    time: '16:00～20:00',
    lightBulbs: '550,000',
    wantToVisit: '62',
    detailUrl: 'https://illumi.walkerplus.com/detail/ar0311e206965/',
  },
  {
    name: 'イルミネーションフェスタ2024',
    location: '埼玉県・比企郡吉見町 / フレサよしみ(吉見町民会館)',
    date: '2024年12月7日(土)',
    time: '17:00～20:00',
    lightBulbs: '80,000',
    wantToVisit: '8',
    detailUrl: 'https://illumi.walkerplus.com/detail/ar0311e52440/',
  },
];

// 转换数据为模板格式
const saitamaIlluminationEvents = transformCrawledDataToIlluminationEvents(
  crawledIlluminationData
);

// 埼玉地区配置
const saitamaRegionConfig = {
  name: 'saitama',
  displayName: '埼玉',
  emoji: '🌸',
  description: '从都市近郊到自然公园，感受埼玉璀璨灯光文化的精彩魅力',
  navigationLinks: {
    prev: { name: '东京', url: '/tokyo/illumination', emoji: '🗼' },
    next: { name: '千叶', url: '/chiba/illumination', emoji: '🌊' },
    current: { name: '埼玉', url: '/saitama' },
  },
};

export default function SaitamaIlluminationPage() {
  return (
    <IlluminationPageTemplate
      region={saitamaRegionConfig}
      events={saitamaIlluminationEvents}
      regionKey="saitama"
      activityKey="illumination"
      pageTitle="埼玉灯光秀活动列表"
      pageDescription="从国営武蔵丘陵森林公園到地方特色节庆，体验埼玉地区最精彩的灯光秀，感受都市近郊璀璨夜景的浪漫魅力"
    />
  );
}
