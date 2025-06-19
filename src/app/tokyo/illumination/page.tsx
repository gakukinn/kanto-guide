/**
 * 第三层页面 - 东京灯光秀名所列表
 * @layer 三层 (Category Layer)
 * @category 灯光秀
 * @region 东京
 * @description 展示东京地区所有灯光秀名所，支持时期筛选和点赞互动
 * @template IlluminationPageTemplate.tsx
 * @dataSource WalkerPlus - https://illumi.walkerplus.com/ranking/ar0313/
 */

import { Metadata } from 'next';
import IlluminationPageTemplate from '../../../components/IlluminationPageTemplate';

export const metadata: Metadata = {
  title: '东京灯光秀2025 - 六本木丸之内等精彩冬季彩灯完整攻略',
  description:
    '东京都2025年灯光秀完整指南，包含六本木Hills灯光秀、丸之内灯光秀、青之洞窟SHIBUYA、东京巨蛋城冬季彩灯等精彩景点。提供详细的点灯时间、电球数量、门票信息，助您规划完美的东京灯光秀之旅，体验璀璨冬夜的浪漫。',
  keywords: [
    '东京灯光秀',
    '六本木Hills彩灯',
    '丸之内灯光秀',
    '青之洞窟SHIBUYA',
    '东京巨蛋城灯光秀',
    '东京冬季景点',
    '2025灯光秀',
    '东京旅游',
    '日本彩灯',
    '冬季活动',
  ],
  openGraph: {
    title: '东京灯光秀2025 - 六本木丸之内等精彩冬季彩灯完整攻略',
    description:
      '东京都2025年灯光秀完整指南，精彩景点等您来体验。从六本木到丸之内，感受东京璀璨冬夜的浪漫魅力。',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.kanto-travel-guide.com/tokyo/illumination',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/illumination/tokyo-lights.svg',
        width: 1200,
        height: 630,
        alt: '东京灯光秀名所',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '东京灯光秀2025 - 六本木丸之内等精彩冬季彩灯完整攻略',
    description: '东京都2025年灯光秀完整指南，精彩景点等您来体验。',
    images: ['/images/illumination/tokyo-lights.svg'],
  },
  alternates: {
    canonical: '/tokyo/illumination',
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
    id: `tokyo-illumination-${index + 1}`,
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
    detailLink: `/tokyo/illumination/${generateSlug(item.name)}`,
    // 灯光秀特有字段
    bulbCount: formatBulbCount(item.lightBulbs),
    bulbCountNum: parseBulbCountToNumber(item.lightBulbs),
    theme: generateTheme(item.name),
    specialFeatures: generateSpecialFeatures(item.name, item.lightBulbs),
  }));
}

// 生成英文名称
function convertToEnglish(japaneseName: string): string {
  const nameMap: { [key: string]: string } = {
    '青の洞窟 SHIBUYA': 'Blue Cave SHIBUYA',
    '東京メガイルミ(大井競馬場)': 'Tokyo Mega Illumination (Oi Racecourse)',
    '丸の内イルミネーション 2024': 'Marunouchi Illumination 2024',
    'サンシャイン水族館 マリンガーデンイルミネーション':
      'Sunshine Aquarium Marine Garden Illumination',
    '六本木ヒルズ Roppongi Hills Christmas 2024 けやき坂イルミネーション':
      'Roppongi Hills Christmas Keyaki-zaka Illumination',
    '六本木ヒルズ Roppongi Hills Christmas 2024 (六本木ヒルズクリスマス2024) ウェストウォーク デコレーション':
      'Roppongi Hills Christmas West Walk Decoration',
    光の祭典2024: 'Festival of Lights 2024',
    'よみうりランド ジュエルミネーション': 'Yomiuriland Jewellumination',
    'お台場イルミネーション"YAKEI"': 'Odaiba Illumination YAKEI',
    新宿ミナミルミ: 'Shinjuku Minami Lumi',
  };

  return nameMap[japaneseName] || japaneseName;
}

// 清理地点信息
function cleanLocation(location: string): string {
  return location
    .replace('東京都・', '')
    .replace('東京都', '')
    .split(' / ')[0]
    .trim();
}

// 生成描述
function generateDescription(
  name: string,
  location: string,
  date: string,
  lightBulbs: string
): string {
  const cleanLoc = cleanLocation(location);
  const bulbInfo =
    lightBulbs !== '未知' && lightBulbs
      ? `，使用约${formatBulbCount(lightBulbs)}`
      : '';

  return `位于${cleanLoc}的${name}${bulbInfo}，${date}期间举办，是东京都内最受欢迎的灯光秀活动之一。`;
}

// 生成特色标签
function generateFeatures(
  location: string,
  lightBulbs: string,
  name: string
): string[] {
  const features = ['璀璨灯光'];

  // 根据地点添加特色
  if (location.includes('六本木') || location.includes('ヒルズ'))
    features.push('都市景观');
  if (location.includes('公園') || location.includes('園'))
    features.push('公园灯光');
  if (location.includes('水族館')) features.push('水族馆主题');
  if (location.includes('競馬場') || location.includes('遊園地'))
    features.push('主题乐园');
  if (location.includes('駅') || location.includes('街道'))
    features.push('街道装饰');

  // 根据电球数添加特色
  const bulbNum = parseBulbCountToNumber(lightBulbs);
  if (bulbNum && bulbNum >= 1000000) features.push('大规模灯光');
  if (bulbNum && bulbNum >= 5000000) features.push('超大规模');

  // 根据名称添加特色
  if (name.includes('クリスマス') || name.includes('Christmas'))
    features.push('圣诞主题');
  if (name.includes('青') || name.includes('Blue')) features.push('蓝色主题');
  if (name.includes('ジュエル')) features.push('宝石主题');

  return features.slice(0, 3); // 最多3个特色
}

// 格式化电球数显示
function formatBulbCount(lightBulbs: string): string {
  if (!lightBulbs || lightBulbs === '未知') return '';

  // 如果已经包含中文单位，直接返回
  if (lightBulbs.includes('万') || lightBulbs.includes('球')) {
    return lightBulbs;
  }

  // 处理纯数字格式
  const num = parseBulbCountToNumber(lightBulbs);
  if (num) {
    if (num >= 10000) {
      return `约${(num / 10000).toFixed(0)}万球`;
    } else {
      return `约${num.toLocaleString()}球`;
    }
  }

  return lightBulbs;
}

// 解析电球数为数字
function parseBulbCountToNumber(lightBulbs: string): number | null {
  if (!lightBulbs || lightBulbs === '未知') return null;

  // 移除逗号并提取数字
  const numberStr = lightBulbs.replace(/,/g, '').match(/\d+/);
  if (numberStr) {
    return parseInt(numberStr[0]);
  }

  return null;
}

// 生成主题
function generateTheme(name: string): string {
  if (name.includes('クリスマス') || name.includes('Christmas'))
    return '圣诞主题';
  if (name.includes('青') || name.includes('Blue')) return '蓝色主题';
  if (name.includes('ジュエル')) return '宝石主题';
  if (name.includes('マリン')) return '海洋主题';
  if (name.includes('光の祭典')) return '光之祭典';

  return '冬季彩灯';
}

// 生成特殊亮点
function generateSpecialFeatures(name: string, lightBulbs: string): string[] {
  const features: string[] = [];

  if (name.includes('洞窟')) features.push('沉浸式体验');
  if (name.includes('競馬場')) features.push('赛马场规模');
  if (name.includes('水族館')) features.push('水中灯光');
  if (name.includes('ヒルズ')) features.push('高层建筑');

  const bulbNum = parseBulbCountToNumber(lightBulbs);
  if (bulbNum && bulbNum >= 5000000) features.push('超大规模展示');

  return features;
}

// 生成URL slug
function generateSlug(name: string): string {
  const slugMap: { [key: string]: string } = {
    '青の洞窟 SHIBUYA': 'blue-cave-shibuya',
    '東京メガイルミ(大井競馬場)': 'tokyo-mega-illumination',
    '丸の内イルミネーション 2024': 'marunouchi-illumination',
    'サンシャイン水族館 マリンガーデンイルミネーション':
      'sunshine-aquarium-marine-garden',
    '六本木ヒルズ Roppongi Hills Christmas 2024 けやき坂イルミネーション':
      'roppongi-hills-keyaki-zaka',
    '六本木ヒルズ Roppongi Hills Christmas 2024 (六本木ヒルズクリスマス2024) ウェストウォーク デコレーション':
      'roppongi-hills-west-walk',
    光の祭典2024: 'festival-of-lights',
    'よみうりランド ジュエルミネーション': 'yomiuriland-jewellumination',
    'お台場イルミネーション"YAKEI"': 'odaiba-yakei',
    新宿ミナミルミ: 'shinjuku-minami-lumi',
  };

  return slugMap[name] || name.toLowerCase().replace(/[^a-z0-9]/g, '-');
}

// 东京灯光秀数据（来源：ar0313-illumination-complete-2025-06-18T06-53-34-155Z.json）
// 数据统计：声明活动数量=10场，实际活动数组长度=10场 ✅ 一致
const crawledIlluminationData = [
  {
    name: '青の洞窟 SHIBUYA',
    location: '東京都・渋谷区 / 渋谷公園通りから代々木公園ケヤキ並木',
    date: '2024年12月6日(金)～25日(水)',
    time: '15:00～22:00、イルミネーションは17:00より点灯 雨天等、諸般の事情により、開催時間や実施内容は変更になる可能性あり',
    lightBulbs: '600,000',
    wantToVisit: '194',
    detailUrl: 'https://illumi.walkerplus.com/detail/ar0313e165714/',
  },
  {
    name: '東京メガイルミ(大井競馬場)',
    location: '東京都・品川区 / 大井競馬場',
    date: '2024年11月2日(土)～2025年1月12日(日)',
    time: '原則16:30～21:00 (最終入場時間は20:00) 詳細は公式サイト等を確認',
    lightBulbs: '未知',
    wantToVisit: '1640',
    detailUrl: 'https://illumi.walkerplus.com/detail/ar0313e323872/',
  },
  {
    name: '丸の内イルミネーション 2024',
    location: '東京都・千代田区 / 丸の内仲通り、東京駅前周辺、ほか',
    date: '2024年11月14日(木)～2025年2月16日(日)',
    time: '情報確認中',
    lightBulbs: '820,000',
    wantToVisit: '219',
    detailUrl: 'https://illumi.walkerplus.com/detail/ar0313e17371/',
  },
  {
    name: 'サンシャイン水族館 マリンガーデンイルミネーション',
    location: '東京都・豊島区 / サンシャ',
    date: '通年',
    time: '日没～営業終了まで点灯。 夜間特別営業に合わせ、18:15～21:00は特別バーションに変わる場合あり。最終入場は終了1時間前まで',
    lightBulbs: '23,500',
    wantToVisit: '9',
    detailUrl: 'https://illumi.walkerplus.com/detail/ar0313e17432/',
  },
  {
    name: '六本木ヒルズ Roppongi Hills Christmas 2024 けやき坂イルミネーション',
    location: '東京都・港区 / 六本木ヒルズ',
    date: '2024年11月7日(木)～12月25日(水)',
    time: '17:00～23:00',
    lightBulbs: '900,000',
    wantToVisit: '74',
    detailUrl: 'https://illumi.walkerplus.com/detail/ar0313e17503/',
  },
  {
    name: '六本木ヒルズ Roppongi Hills Christmas 2024 (六本木ヒルズクリスマス2024) ウェストウォーク デコレーション',
    location: '東京都・港区 / 六本木ヒルズ',
    date: '2024年11月中旬～12月25日(水)',
    time: '11:00～23:00',
    lightBulbs: '未知',
    wantToVisit: '8',
    detailUrl: 'https://illumi.walkerplus.com/detail/ar0313e17367/',
  },
  {
    name: '光の祭典2024',
    location: '東京都・足立区 / 元渕江公園',
    date: '2024年11月30日(土)',
    time: '17:00～21:00 竹ノ塚駅前および竹の塚けやき大通りは22:00まで',
    lightBulbs: '350,000',
    wantToVisit: '55',
    detailUrl: 'https://illumi.walkerplus.com/detail/ar0313e17384/',
  },
  {
    name: 'よみうりランド ジュエルミネーション',
    location: '東京都・稲城市 / よみうり',
    date: '2024年10月24日(木)～2025年4月6日(日)',
    time: '16:00～20:30 ※休園日・営業時間の詳細は公式サイトをご確認ください',
    lightBulbs: '6,500,000',
    wantToVisit: '264',
    detailUrl: 'https://illumi.walkerplus.com/detail/ar0313e17494/',
  },
  {
    name: 'お台場イルミネーション"YAKEI"',
    location: '東京都・港区 / デックス東京ビーチ',
    date: '通年',
    time: '点灯時間 日没～24:00 点灯時間を変更している場合があります。詳細は公式サイトをご確認ください',
    lightBulbs: '未知',
    wantToVisit: '22',
    detailUrl: 'https://illumi.walkerplus.com/detail/ar0313e17523/',
  },
  {
    name: '新宿ミナミルミ',
    location: '東京都・渋谷区 / 新宿サザンテ',
    date: '2024年11月15日(金)～2025年2月14日(金)',
    time: '17:00～24:00 (12月以降16:30～) 一部点灯時間が異なる',
    lightBulbs: '未知',
    wantToVisit: '14',
    detailUrl: 'https://illumi.walkerplus.com/detail/ar0313e125429/',
  },
];

// 转换数据为模板格式
const tokyoIlluminationEvents = transformCrawledDataToIlluminationEvents(
  crawledIlluminationData
);

// 东京地区配置
const tokyoRegionConfig = {
  name: 'tokyo',
  displayName: '东京',
  emoji: '🗼',
  description: '从都心到郊外，感受东京璀璨灯光文化的精彩魅力',
  navigationLinks: {
    prev: { name: '甲信越', url: '/koshinetsu/illumination', emoji: '🏔️' },
    next: { name: '神奈川', url: '/kanagawa/illumination', emoji: '🌊' },
    current: { name: '东京', url: '/tokyo' },
  },
};

export default function TokyoIlluminationPage() {
  return (
    <IlluminationPageTemplate
      region={tokyoRegionConfig}
      events={tokyoIlluminationEvents}
      regionKey="tokyo"
      activityKey="illumination"
      pageTitle="东京灯光秀活动列表"
      pageDescription="从六本木Hills到丸之内，体验东京地区最精彩的灯光秀，感受都市璀璨夜景的浪漫魅力"
    />
  );
}
