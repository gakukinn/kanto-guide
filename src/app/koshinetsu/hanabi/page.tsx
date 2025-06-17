/**
 * 第三层页面 - 甲信越花火大会列表
 * @layer 三层 (Category Layer)
 * @category 花火
 * @region 甲信越
 * @description 展示甲信越地区所有花火大会，支持日期筛选和红心互动
 * @template HanabiPageTemplate.tsx
 */

import { Metadata } from 'next';
import HanabiPageTemplate from '../../../components/HanabiPageTemplate';

export const metadata: Metadata = {
  title: '甲信越花火大会2025 - 山梨长野新潟绚烂花火活动完整指南',
  description:
    '甲信越地区2025年花火大会完整指南，包含长冈祭典大花火大会、河口湖湖上祭、新潟祭典花火大会等16个精彩活动。涵盖山梨、长野、新潟三县，提供详细的时间、地点、观赏攻略，助您规划完美的甲信越花火之旅。',
  keywords: [
    '甲信越花火大会',
    '长冈祭典花火',
    '河口湖花火',
    '新潟花火',
    '山梨花火',
    '长野花火',
    '富士山花火',
    '信濃川花火',
    '2025花火',
    '甲信越旅游',
  ],
  openGraph: {
    title: '甲信越花火大会 - 2025年最新活动信息',
    description: '甲信越地区2025年花火大会完整指南，16个精彩活动等您来体验。',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.kanto-travel-guide.com/koshinetsu/hanabi',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/hanabi/koshinetsu-fireworks.svg',
        width: 1200,
        height: 630,
        alt: '甲信越花火大会',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '甲信越花火大会 - 2025年最新活动信息',
    description: '甲信越地区2025年花火大会完整指南，16个精彩活动等您来体验。',
    images: ['/images/hanabi/koshinetsu-fireworks.svg'],
  },
  alternates: {
    canonical: '/koshinetsu/hanabi',
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

// 甲信越花火数据（双字段格式 - 支持抓取数据的原始性和标准化处理）
const koshinetsuHanabiEvents = [
  {
    id: 'kawaguchiko-kojosai-2025',
    name: '河口湖湖上祭',
    _sourceData: {
      japaneseName: '河口湖湖上祭',
      japaneseDescription: '河口湖湖上祭',
    },
    englishName: 'Lake Kawaguchi Kojosai Festival',
    date: '2025年8月5日',
    location: '河口湖畔船津浜',
    description: '河口湖的夜空在彩举行大迫力的花火',
    features: ['富士山背景', '湖上花火', '大迫力'],
    likes: 52,
    website: 'https://hanabi.walkerplus.com/detail/ar0419e00681/',
    // 双字段：原始抓取格式 + 标准化数字
    fireworksCount: '1万发',
    fireworksCountNum: 10000,
    expectedVisitors: '約12万人',
    expectedVisitorsNum: 120000,
    venue: '河口湖畔船津浜',
    detailLink: '/koshinetsu/hanabi/kawaguchiko-kojosai-2025',
  },
  {
    id: 'ichikawa-shinmei-hanabi-2024',
    name: '市川三郷町故乡夏祭典　第37回「神明的花火大会」',
    _sourceData: {
      japaneseName: '市川三郷町故乡夏祭典　第37回「神明的花火大会」',
      japaneseDescription: '市川三郷町故乡夏祭典　第37回「神明的花火大会」',
    },
    englishName:
      'Ichikawamisato Hometown Summer Festival 37th Shinmei Fireworks',
    date: '2025年8月7日',
    location: '三郡橋下流笛吹川河畔',
    description: '音楽和彩举行約2万发的夜空的芸術',
    features: ['甲州', '音楽花火', '20万人'],
    likes: 62,
    website: 'https://walkerplus.com/event/ar0419e368677/',
    fireworksCount: '約2万发',
    fireworksCountNum: 20000,
    expectedVisitors: '約20万人',
    expectedVisitorsNum: 200000,
    venue: '三郡橋下流笛吹川河畔',
    detailLink: '/koshinetsu/hanabi/ichikawa-shinmei',
  },
  {
    id: 'gion-kashiwazaki-matsuri-hanabi',
    name: '祇园柏崎祭典 海的大花火大会',
    _sourceData: {
      japaneseName: '祇园柏崎祭典 海的大花火大会',
      japaneseDescription: '祇园柏崎祭典 海的大花火大会',
    },
    englishName: 'Gion Kashiwazaki Festival Sea Fireworks',
    date: '2025年7月26日',
    location: '柏崎市中央海岸美和町海滨公园一带',
    description: '尺玉100发齐放等豪华的花火大会',
    features: ['日本海', '1.6万发', '海上花火'],
    likes: 49,
    website: 'https://walkerplus.com/event/ar0415e00806/',
    fireworksCount: '1.6万发',
    fireworksCountNum: 16000,
    expectedVisitors: '約17万人',
    expectedVisitorsNum: 170000,
    venue: '柏崎市中央海岸美和町海滨公园一带',
    detailLink: '/koshinetsu/hanabi/kashiwazaki',
  },
  {
    id: 'nagaoka-matsuri-hanabi',
    name: '長岡祭典大花火大会',
    _sourceData: {
      japaneseName: '長岡祭典大花火大会',
      japaneseDescription: '長岡祭典大花火大会',
    },
    englishName: 'Nagaoka Festival Grand Fireworks',
    date: '2025年8月2日、3日',
    location: '信濃川河川敷',
    description: '复兴祈愿花火凤凰等展现大迫力',
    features: ['复兴祈愿', '凤凰', '大迫力'],
    likes: 78,
    website: 'https://walkerplus.com/event/ar0415e00806/',
    fireworksCount: '2万发',
    fireworksCountNum: 20000,
    expectedVisitors: '34.5万人',
    expectedVisitorsNum: 345000,
    venue: '信濃川河川敷',
    detailLink: '/koshinetsu/hanabi/nagaoka',
  },
  {
    id: 'nagano-ebisukou-hanabi-2025',
    name: '第119回 長野惠比寿講煙火大会',
    _sourceData: {
      japaneseName: '第119回 長野惠比寿講煙火大会',
      japaneseDescription: '第119回 長野惠比寿講煙火大会',
    },
    englishName: '119th Nagano Ebisukou Fireworks Festival',
    date: '2025年11月23日',
    location: '長野大橋西側  犀川第2緑地',
    description:
      '长野市历史悠久的秋季花火大会，拥有100多年历史，商业繁荣祈愿的传统盛典',
    features: ['信州', '晚秋', '煙火'],
    likes: 58,
    website: 'https://walkerplus.com/event/ar0420e00806/',
    fireworksCount: '1万发',
    fireworksCountNum: 10000,
    expectedVisitors: '約40万人',
    expectedVisitorsNum: 400000,
    venue: '長野大橋西側  犀川第2緑地',
    detailLink: '/koshinetsu/hanabi/nagano-ebisukou-hanabi-2025',
  },
  {
    id: 'niigata-matsuri-hanabi-2025',
    name: '新潟祭典花火大会',
    _sourceData: {
      japaneseName: '新潟祭典花火大会',
      japaneseDescription: '新潟祭典花火大会',
    },
    englishName: 'Niigata Festival Fireworks',
    date: '2025年8月10日',
    location: '新潟市中央区信濃川河畔(昭和大橋周辺)',
    description:
      '新潟祭花火大会是为期3天的新潟祭的压轴活动，华丽的花火为祭典画下完美句号',
    features: ['越后最大级', '信濃川', '都市花火'],
    likes: 45,
    website: 'https://walkerplus.com/event/ar0415e00806/',
    fireworksCount: '3000发',
    fireworksCountNum: 3000,
    expectedVisitors: '約32万人',
    expectedVisitorsNum: 320000,
    venue: '新潟市中央区信濃川河畔(昭和大橋周辺)',
    detailLink: '/koshinetsu/hanabi/niigata-matsuri-hanabi-2025',
  },
  {
    id: 'anime-classics-anison-hanabi',
    name: '动画经典 动画歌曲花火',
    _sourceData: {
      japaneseName: '动画经典 动画歌曲花火',
      japaneseDescription: '动画经典 动画歌曲花火',
    },
    englishName: 'Anime Classics Anison Fireworks',
    date: '2025年7月5日',
    location: '富士川活力体育公園 特設会場',
    description: '怀旧的名作动画和花火融合举行的特别一夜',
    features: ['动画', '音楽', '特設会場'],
    likes: 12,
    website: 'https://walkerplus.com/event/ar0419e368677/',
    fireworksCount: '1万发',
    fireworksCountNum: 10000,
    expectedVisitors: '未公布',
    expectedVisitorsNum: null,
    venue: '山梨県南巨摩郡富士川町/富士川活力体育公園 特設会場',
    detailLink: '/koshinetsu/hanabi/anime',
  },
  {
    id: 'isawa-onsen-hanabi-2025',
    name: '第61回 石和温泉花火大会',
    _sourceData: {
      japaneseName: '第61回 石和温泉花火大会',
      japaneseDescription: '第61回 石和温泉花火大会',
    },
    englishName: '61st Isawa Onsen Fireworks Festival',
    date: '2025年8月24日(日)',
    location: '山梨県笛吹市/笛吹市役所本館前 笛吹川河川敷',
    description: '石和温泉的夜空在彩举行1万发的花火和无人机表演',
    features: ['温泉地', '无人机表演', '1万发'],
    likes: 13,
    website: 'https://walkerplus.com/event/ar0419e368677/',
    fireworksCount: '1万发',
    fireworksCountNum: 10000,
    expectedVisitors: '約1.2万人',
    expectedVisitorsNum: 12000,
    venue: '山梨県笛吹市/笛吹市役所本館前 笛吹川河川敷',
    detailLink: '/koshinetsu/hanabi/isawa-onsen-hanabi-2025',
  },
  {
    id: 'agano-gozareya-hanabi-2025',
    name: '第51回 阿賀野川来吧花火',
    _sourceData: {
      japaneseName: '第51回 阿賀野川来吧花火',
      japaneseDescription: '第51回 阿賀野川来吧花火',
    },
    englishName: '51st Agano River Gozareya Fireworks',
    date: '2025年8月25日',
    location: '阿賀野川松浜橋上流側',
    description: '新潟县阿贺野市传统花火大会，第51回阿贺野川来吧花火',
    features: ['传统花火', '阿贺野川', '1070人'],
    likes: 45,
    website: 'https://walkerplus.com/event/ar0415e00806/',
    fireworksCount: '3000发',
    fireworksCountNum: 3000,
    expectedVisitors: '1070人',
    expectedVisitorsNum: 1070,
    venue: '阿賀野川松浜橋上流側',
    detailLink: '/koshinetsu/hanabi/agano-gozareya',
  },
  {
    id: 'ojiya-matsuri-hanabi-2024',
    name: '小千谷祭典大花火大会2024',
    _sourceData: {
      japaneseName: '小千谷祭典大花火大会2024',
      japaneseDescription: '小千谷祭典大花火大会2024',
    },
    englishName: 'Ojiya Festival Grand Fireworks 2024',
    date: '2024年8月24日',
    location: '信濃川河川敷(旭橋下流)',
    description: '新潟县小千谷市传统夏祭花火大会，7000发花火在信濃川河畔绽放',
    features: ['小千谷市', '7000发', '夏祭花火'],
    likes: 30,
    website: 'https://walkerplus.com/event/ar0415e00806/',
    fireworksCount: '7000发',
    fireworksCountNum: 7000,
    expectedVisitors: '約5万人',
    expectedVisitorsNum: 50000,
    venue: '信濃川河川敷(旭橋下流)',
    detailLink: '/koshinetsu/hanabi/ojiya-matsuri-hanabi',
  },
  {
    id: 'yamanakako-houkosai-hanabi',
    name: '山中湖「報湖祭」花火大会',
    _sourceData: {
      japaneseName: '山中湖「報湖祭」花火大会',
      japaneseDescription: '山中湖「報湖祭」花火大会',
    },
    englishName: 'Lake Yamanaka Houkosai Fireworks Festival',
    date: '2025年8月1日',
    location: '山梨県南都留郡山中湖村/山中湖畔',
    description: '从大正时代延续至今的历史悠久的山中湖最大花火大会',
    features: ['山中湖', '历史传统', '湖畔花火'],
    likes: 9,
    website: 'https://walkerplus.com/event/ar0419e368677/',
    fireworksCount: '1万发',
    fireworksCountNum: 10000,
    expectedVisitors: '未公布',
    expectedVisitorsNum: null,
    venue: '山梨県南都留郡山中湖村/山中湖畔',
    detailLink: '/koshinetsu/hanabi/yamanakako-houkosai-hanabi',
  },
  {
    id: 'chikuma-chikumagawa-hanabi',
    name: '第94回 信州千曲市千曲川納涼煙火大会',
    _sourceData: {
      japaneseName: '第94回 信州千曲市千曲川納涼煙火大会',
      japaneseDescription: '第94回 信州千曲市千曲川納涼煙火大会',
    },
    englishName: '94th Shinshu Chikuma City Chikumagawa Fireworks Festival',
    date: '2025年8月7日',
    location: '長野県千曲市/戸倉上山田温泉千曲川河畔(大正橋～万葉橋間)',
    description: '特大连发花火和全長約300米的尼亚加拉等充実的节目',
    features: ['特大连发花火', '尼亚加拉', '温泉地花火'],
    likes: 9,
    website: 'https://walkerplus.com/event/ar0420e00806/',
    fireworksCount: '1.5万发',
    fireworksCountNum: 15000,
    expectedVisitors: '約20万人',
    expectedVisitorsNum: 200000,
    venue: '長野県千曲市/戸倉上山田温泉千曲川河畔(大正橋～万葉橋間)',
    detailLink: '/koshinetsu/hanabi/chikuma-chikumagawa-hanabi',
  },
  {
    id: 'shinsaku-hanabi-2025',
    name: '全国新作花火挑战杯2025',
    _sourceData: {
      japaneseName: '全国新作花火挑战杯2025',
      japaneseDescription: '全国新作花火挑战杯2025',
    },
    englishName: 'National New Fireworks Challenge Cup 2025',
    date: '2025年9月6日-10月26日',
    location: '長野県諏訪市湖畔公園前諏訪湖上',
    description:
      '诹访湖举办的全国新作花火竞技大会，约30万人观赏艺术花火的创新演出',
    features: ['新作競技', '諏訪湖', '20名'],
    likes: 0,
    website: 'https://hanabi.walkerplus.com/detail/ar0420e00806/',
    fireworksCount: '2000发',
    fireworksCountNum: 2000,
    expectedVisitors: '約5万人',
    expectedVisitorsNum: 50000,
    venue: '長野県諏訪市湖畔公園前諏訪湖上',
    detailLink: '/koshinetsu/hanabi/shinsaku-hanabi-2025',
  },
  {
    id: 'asahara-jinja-aki-hanabi',
    name: '浅原神社 秋季例大祭奉納大煙火',
    _sourceData: {
      japaneseName: '浅原神社 秋季例大祭奉納大煙火',
      japaneseDescription: '浅原神社 秋季例大祭奉納大煙火',
    },
    englishName: 'Asahara Shrine Autumn Festival Fireworks',
    date: '2025年9月12日13日',
    location: '新潟県小千谷市片貝町浅原神社裏手',
    description:
      '世界最大的四尺玉花火的有名的片貝祭典、200年的伝統在誇举行奉納花火',
    features: ['四尺玉', '世界最大', '200年伝統'],
    likes: 0,
    website: 'http://katakaimachi-enkakyokai.info/',
    fireworksCount: '1.5万发',
    fireworksCountNum: 15000,
    expectedVisitors: '約20万人',
    expectedVisitorsNum: 200000,
    venue: '新潟県小千谷市片貝町浅原神社裏手',
    detailLink: '/koshinetsu/hanabi/asahara-jinja-aki-hanabi',
  },
];

// 甲信越地区配置
const koshinetsuRegionConfig = {
  name: 'koshinetsu',
  displayName: '甲信越',
  emoji: '🗻',
  description: '山岳湖泊与花火的绝美共演，感受甲信越独特的山间花火文化',
  navigationLinks: {
    prev: { name: '北关东', url: '/kitakanto/hanabi', emoji: '♨️' },
    next: { name: '东京', url: '/tokyo/hanabi', emoji: '🗼' },
    current: { name: '甲信越', url: '/koshinetsu' },
  },
};

export default function KoshinetsuHanabiPage() {
  return (
    <HanabiPageTemplate
      region={koshinetsuRegionConfig}
      events={koshinetsuHanabiEvents}
      regionKey="koshinetsu"
      activityKey="hanabi"
      pageTitle="甲信越花火大会列表"
      pageDescription="体验甲信越地区最精彩的花火大会。从富士山河口湖到诹访湖，从长冈大花火到柏崎海上花火，感受山岳湖泊的自然花火盛典"
    />
  );
}
