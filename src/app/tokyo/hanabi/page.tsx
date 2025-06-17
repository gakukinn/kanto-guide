/**
 * 第三层页面 - 东京花火大会列表
 * @layer 三层 (Category Layer)
 * @category 花火
 * @region 东京
 * @description 展示东京地区所有花火大会，支持日期筛选和红心互动
 * @template HanabiPageTemplate.tsx
 * @dataSource WalkerPlus - https://hanabi.walkerplus.com/launch/ar0313/
 */

import { Metadata } from 'next';
import HanabiPageTemplate from '../../../components/HanabiPageTemplate';

export const metadata: Metadata = {
  title: '东京花火大会2025 - 隅田川神宫外苑等精彩花火祭典完整攻略',
  description:
    '东京都2025年花火大会完整指南，包含隅田川花火大会、神宫外苑花火大会、板桥花火大会、江戸川花火大会等精彩活动。提供详细的举办时间、观赏地点、交通方式、门票信息，助您规划完美的东京花火之旅，体验日本传统夏日祭典文化。',
  keywords: [
    '东京花火大会',
    '隅田川花火大会',
    '神宫外苑花火大会',
    '板桥花火大会',
    '江戸川花火大会',
    '东京夏日祭典',
    '2025花火',
    '东京旅游',
    '日本花火',
    '夏季活动',
  ],
  openGraph: {
    title: '东京花火大会2025 - 隅田川神宫外苑等精彩花火祭典完整攻略',
    description:
      '东京都2025年花火大会完整指南，精彩活动等您来体验。从隅田川到神宫外苑，感受日本传统夏日祭典文化。',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.kanto-travel-guide.com/tokyo/hanabi',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/hanabi/tokyo-fireworks.svg',
        width: 1200,
        height: 630,
        alt: '东京花火大会',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '东京花火大会2025 - 隅田川神宫外苑等精彩花火祭典完整攻略',
    description: '东京都2025年花火大会完整指南，精彩活动等您来体验。',
    images: ['/images/hanabi/tokyo-fireworks.svg'],
  },
  alternates: {
    canonical: '/tokyo/hanabi',
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

// 东京花火数据（共15场活动）
// 数据统计：声明活动数量=15场，实际活动数组长度=15场 ✅ 一致
const tokyoHanabiEvents = [
  {
    id: 'tokyo-keiba-2025',
    name: '東京競馬場花火2025〜花火与J-POP BEST〜',
    _sourceData: {
      japaneseName: '東京競馬場花火2025〜花火与J-POP BEST〜',
      japaneseDescription: '東京競馬場花火2025〜花火与J-POP BEST〜',
    },
    englishName: 'Tokyo Racecourse Fireworks 2025 - Fireworks & J-POP BEST',
    date: '2025年7月2日',
    location: '東京都府中市 JRA東京競馬場',
    description:
      'J-POP音乐与花火的完美结合，在东京竞马场享受座席观赏的特色花火体验',
    features: ['座席观赏', 'J-POP', '竞马场'],
    likes: 245,
    website: 'https://www.jra.go.jp/',
    fireworksCount: '約1万4000発',
    fireworksCountNum: 14000,
    expectedVisitors: '非公表',
    expectedVisitorsNum: null,
    venue: '東京都府中市 JRA東京競馬場',
    detailLink: '/tokyo/hanabi/keibajo',
  },
  {
    id: 'sumida-river-48',
    name: '第48回 隅田川花火大会',
    _sourceData: {
      japaneseName: '第48回隅田川花火大会',
      japaneseDescription: '第48回隅田川花火大会',
    },
    englishName: '48th Sumida River Fireworks Festival',
    date: '2025年7月26日',
    location: '東京都墨田区 隅田川河川敷',
    description:
      '东京夏日最盛大的花火大会，在隅田川两岸展现约2万发花火的壮观景象',
    features: ['东京代表', '隅田川', '传统大会'],
    likes: 2850,
    website: 'https://www.sumidagawa-hanabi.com/',
    fireworksCount: '約2万発',
    fireworksCountNum: 20000,
    expectedVisitors: '約91万人',
    expectedVisitorsNum: 910000,
    venue: '東京都墨田区 隅田川河川敷',
    detailLink: '/tokyo/hanabi/sumida',
  },
  {
    id: 'katsushika-59',
    name: '第59回葛饰纳凉花火大会',
    _sourceData: {
      japaneseName: '第59回葛飾納涼花火大会',
      japaneseDescription: '第59回葛飾納涼花火大会',
    },
    englishName: '59th Katsushika Cool Evening Fireworks Festival',
    date: '2025年7月22日',
    location: '東京都葛飾区 柴又野球場',
    description: '葛饰区传统的纳凉花火大会，在江戸川河川敷展现约1万3000发花火',
    features: ['纳凉祭典', '江戸川', '夏夜清凉'],
    likes: 520,
    website: 'https://www.katsushika-hanabi.jp/',
    fireworksCount: '約1万5000発',
    fireworksCountNum: 15000,
    expectedVisitors: '約77万人',
    expectedVisitorsNum: 770000,
    venue: '東京都葛飾区 柴又野球場',
    detailLink: '/tokyo/hanabi/katsushika-noryo',
  },
  {
    id: 'edogawa-50',
    name: '第50回江戸川区花火大会',
    _sourceData: {
      japaneseName: '第50回江戸川区花火大会',
      japaneseDescription: '第50回江戸川区花火大会',
    },
    englishName: '50th Edogawa Ward Fireworks Festival',
    date: '2025年8月2日',
    location: '東京都江戸川区 江戸川河川敷',
    description: '江戸川区50周年纪念花火大会，约1万4000发花火照亮夏夜',
    features: ['50周年纪念', '大规模花火', '江戸川河畔'],
    likes: 1200,
    website: 'https://www.edogawa-hanabi.jp/',
    fireworksCount: '約1万4000発',
    fireworksCountNum: 14000,
    expectedVisitors: '約90万人',
    expectedVisitorsNum: 900000,
    venue: '東京都江戸川区 江戸川河川敷',
    detailLink: '/tokyo/hanabi/edogawa',
  },
  {
    id: 'jingu-gaien-2025',
    name: '2025 神宫外苑花火大会',
    _sourceData: {
      japaneseName: '2025神宮外苑花火大会',
      japaneseDescription: '2025神宮外苑花火大会',
    },
    englishName: '2025 Jingu Gaien Fireworks Festival',
    date: '2025年8月16日',
    location: '東京都新宿区 明治神宮外苑',
    description:
      '在都心明治神宫外苑举办的优雅花火大会，约1万发花火与都市夜景的完美融合',
    features: ['都心花火', '神宫外苑', '优雅氛围'],
    likes: 890,
    website: 'https://jinguugaienhanabi.com/',
    fireworksCount: '約1万発',
    fireworksCountNum: 10000,
    expectedVisitors: '約100万人',
    expectedVisitorsNum: 1000000,
    venue: '東京都新宿区 明治神宮外苑',
    detailLink: '/tokyo/hanabi/jingu-gaien',
  },
  {
    id: 'itabashi-66',
    name: '第66回板桥花火大会',
    _sourceData: {
      japaneseName: '第66回板桥花火大会',
      japaneseDescription: '第66回板桥花火大会',
    },
    englishName: '66th Itabashi Fireworks Festival',
    date: '2025年8月2日',
    location: '東京都板橋区 荒川河川敷',
    description: '都内最大的尺五寸玉在眼前绽放的壮观场面令人震撼',
    features: ['都内最大尺玉', '荒川河畔', '壮观花火'],
    likes: 82,
    website:
      'https://www.city.itabashi.tokyo.jp/boshuu/event/matsuri/1000315.html',
    fireworksCount: '約1万5000発',
    fireworksCountNum: 15000,
    expectedVisitors: '約57万人',
    expectedVisitorsNum: 570000,
    venue: '東京都板橋区 荒川河川敷',
    detailLink: '/tokyo/hanabi/itabashi',
  },
  {
    id: 'tamagawa-48',
    name: '第48回多摩川花火大会',
    _sourceData: {
      japaneseName: '第48回多摩川花火大会',
      japaneseDescription: '第48回多摩川花火大会',
    },
    englishName: '48th Tamagawa Fireworks Festival',
    date: '2025年8月16日',
    location: '東京都世田谷区 多摩川河川敷',
    description: '多摩川沿岸的传统花火大会，约6000发花火照亮夏夜天空',
    features: ['多摩川沿岸', '地域传统', '河川花火'],
    likes: 380,
    website: 'https://tamagawa-hanabi.jp/',
    fireworksCount: '約6000発',
    fireworksCountNum: 6000,
    expectedVisitors: '約30万人',
    expectedVisitorsNum: 300000,
    venue: '東京都世田谷区 多摩川河川敷',
    detailLink: '/tokyo/hanabi/tamagawa',
  },
  {
    id: 'setagaya-tamagawa-47',
    name: '第47回 世田谷区多摩川花火大会',
    _sourceData: {
      japaneseName: '第47回 世田谷区多摩川花火大会',
      japaneseDescription: '第47回 世田谷区多摩川花火大会',
    },
    englishName: '47th Setagaya Tamagawa Fireworks Festival',
    date: '2025年10月4日',
    location: '東京都世田谷区 二子玉川緑地運動場',
    description:
      '川崎市制記念多摩川花火大会与同時開催。秋空的下、約6000発的花火多摩川的両岸呼応',
    features: ['秋季花火', '同时开催', '音乐花火'],
    likes: 310,
    website: 'https://www.tamagawa-hanabi.com/',
    fireworksCount: '約6000発',
    fireworksCountNum: 6000,
    expectedVisitors: '約31万人',
    expectedVisitorsNum: 310000,
    venue: '東京都世田谷区 二子玉川緑地運動場',
    detailLink: '/tokyo/hanabi/setagaya-tamagawa',
  },

  {
    id: 'okutama-70th',
    name: '町制施行70周年纪念 奥多摩纳凉花火大会',
    _sourceData: {
      japaneseName: '町制施行70周年記念 奥多摩納涼花火大会',
      japaneseDescription: '町制施行70周年記念 奥多摩納涼花火大会',
    },
    englishName: '70th Anniversary Okutama Cool Evening Fireworks',
    date: '2025年8月9日',
    location: '東京都西多摩郡奥多摩町 愛宕山広場',
    description: '爱宕山山顶的花火与山影形成绝妙对比',
    features: ['70周年纪念', '山顶花火', '自然美景'],
    likes: 18,
    website: 'https://hanabi.walkerplus.com/',
    fireworksCount: '約1000発',
    fireworksCountNum: 1000,
    expectedVisitors: '約1万人',
    expectedVisitorsNum: 10000,
    venue: '東京都西多摩郡奥多摩町 愛宕山広場',
    detailLink: '/tokyo/hanabi/okutama',
  },
  {
    id: 'akishima-kujira-53',
    name: '第53回 昭岛市民鲸鱼祭梦花火',
    _sourceData: {
      japaneseName: '第53回 昭島市民鲸鱼祭 夢花火',
      japaneseDescription: '第53回 昭島市民鲸鱼祭 夢花火',
    },
    englishName: '53rd Akishima Citizen Whale Festival Dream Fireworks',
    date: '2025年8月23日',
    location: '東京都昭島市 昭島市民球場',
    description: '昭岛市鲸鱼祭的压轴花火大会，约2000发花火点亮市民之夜',
    features: ['鲸鱼祭', '市民祭典', '梦幻花火'],
    likes: 220,
    website: 'https://akishima-kujiramatsuri.jp/',
    fireworksCount: '約2000発',
    fireworksCountNum: 2000,
    expectedVisitors: '約4万5000人',
    expectedVisitorsNum: 45000,
    venue: '東京都昭島市 昭島市民球場',
    detailLink: '/tokyo/hanabi/akishima',
  },
  {
    id: 'chofu-hanabi-2025',
    name: '第40回调布花火',
    _sourceData: {
      japaneseName: '第40回 調布花火',
      japaneseDescription: '第40回 調布花火',
    },
    englishName: 'The 40th Chofu Fireworks Festival',
    date: '2025年9月20日',
    location: '東京都調布市 多摩川河川敷',
    description: '约10000发花火将调布染上绚烂色彩',
    features: ['调布传统', '多摩川', '秋季花火'],
    likes: 46,
    website: 'https://hanabi.walkerplus.com/',
    fireworksCount: '約1万発',
    fireworksCountNum: 10000,
    expectedVisitors: '約30万人',
    expectedVisitorsNum: 300000,
    venue: '東京都調布市 多摩川河川敷',
    detailLink: '/tokyo/hanabi/chofu-hanabi',
  },
  {
    id: 'kozushima-nagisa-hanabi-32',
    name: '第32回神津島渚花火大会',
    _sourceData: {
      japaneseName: '神津島村夏祭祭',
      japaneseDescription: '神津島村夏祭祭',
    },
    englishName: 'The 32nd Kozushima Nagisa Fireworks Festival',
    date: '2025年8月15日',
    location: '東京都神津島村 神津島港',
    description: '在神津島港(前浜港)桟橋举办的花火大会，747发花火点亮夜空',
    features: ['岛屿花火', '神津島', '海岛特色'],
    likes: 112,
    website: 'https://kozushima.com/',
    fireworksCount: '約750発',
    fireworksCountNum: 750,
    expectedVisitors: '約3000人',
    expectedVisitorsNum: 3000,
    venue: '東京都神津島村 神津島港',
    detailLink: '/tokyo/hanabi/kozushima',
  },
  {
    id: 'hachioji-hanabi-2025',
    name: '八王子花火大会',
    _sourceData: {
      japaneseName: '八王子花火大会',
      japaneseDescription: '八王子花火大会',
    },
    englishName: 'Hachioji Fireworks Festival',
    date: '2025年7月19日',
    location: '東京都八王子市 浅川河川敷',
    description: '迫力十足的打上花火可以享受',
    features: ['迫力花火', '富士森公园', '地域传统'],
    likes: 38,
    website: 'https://www.city.hachioji.tokyo.jp/',
    fireworksCount: '約8000発',
    fireworksCountNum: 8000,
    expectedVisitors: '約8万人',
    expectedVisitorsNum: 80000,
    venue: '東京都八王子市 浅川河川敷',
    detailLink: '/tokyo/hanabi/hachioji',
  },
  {
    id: 'tachikawa-showa-2025',
    name: '立川祭典 国営昭和記念公園花火大会',
    _sourceData: {
      japaneseName: '立川祭典 国営昭和記念公園花火大会',
      japaneseDescription: '立川祭典 国営昭和記念公園花火大会',
    },
    englishName: 'Tachikawa Festival Showa Kinen Park Fireworks',
    date: '2025年7月26日',
    location: '東京都立川市 昭和記念公園',
    description: '艺协玉等精心设计的花火可以享受',
    features: ['芸協玉', '国営公园', '趣向花火'],
    likes: 39,
    website: 'https://www.showakinen-koen.jp/',
    fireworksCount: '約5000発',
    fireworksCountNum: 5000,
    expectedVisitors: '約15万人',
    expectedVisitorsNum: 150000,
    venue: '東京都立川市 昭和記念公園',
    detailLink: '/tokyo/hanabi/tachikawa-showa',
  },

  {
    id: 'mikurajima-hanabi-2025',
    name: '御蔵島花火大会',
    _sourceData: {
      japaneseName: '御蔵島花火大会',
      japaneseDescription: '御蔵島花火大会',
    },
    englishName: 'Mikurajima Fireworks Festival',
    date: '2025年8月10日',
    location: '東京都御蔵島村 御蔵島港',
    description: '被大自然环绕的御蔵島开放感十足',
    features: ['大自然', '离岛特色', '开放感'],
    likes: 4,
    website: 'https://www.mikurasima.jp/',
    fireworksCount: '約200発',
    fireworksCountNum: 200,
    expectedVisitors: '約500人',
    expectedVisitorsNum: 500,
    venue: '東京都御蔵島村 御蔵島港',
    detailLink: '/tokyo/hanabi/mikurajima',
  },
];

// 东京地区配置
const tokyoRegionConfig = {
  name: 'tokyo',
  displayName: '东京',
  emoji: '🏙️',
  description: '从都心到多摩，感受东京多元花火文化的精彩魅力',
  navigationLinks: {
    prev: { name: '甲信越', url: '/koshinetsu/hanabi', emoji: '🏔️' },
    next: { name: '埼玉', url: '/saitama/hanabi', emoji: '🌸' },
    current: { name: '东京', url: '/tokyo' },
  },
};

export default function TokyoHanabiPage() {
  return (
    <HanabiPageTemplate
      region={tokyoRegionConfig}
      events={tokyoHanabiEvents}
      regionKey="tokyo"
      activityKey="hanabi"
      pageTitle="东京花火大会列表"
      pageDescription="从隅田川到台场，体验东京地区最精彩的花火大会，感受都市与传统的花火盛典"
    />
  );
}
