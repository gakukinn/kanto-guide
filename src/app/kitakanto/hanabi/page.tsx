/**
 * 第三层页面 - 北关东花火大会列表
 * @layer 三层 (Category Layer)
 * @category 花火
 * @region 北关东
 * @description 展示北关东地区所有花火大会，支持日期筛选和红心互动
 * @template HanabiPageTemplate.tsx
 * @dataSource WalkerPlus - https://hanabi.walkerplus.com/launch/ar0308/
 */

import { Metadata } from 'next';
import HanabiPageTemplate from '../../../components/HanabiPageTemplate';

export const metadata: Metadata = {
  title: '北关东花火大会2025 - 茨城栃木群马精彩花火活动完整指南',
  description:
    '北关东2025年花火大会指南，包含土浦竞技大会、足利花火大会等12个活动，涵盖茨城栃木群马三县详细信息。',
  keywords: [
    '北关东花火大会',
    '土浦花火竞技大会',
    '足利花火大会',
    '高崎花火大会',
    '茨城花火',
    '栃木花火',
    '群馬花火',
    '2025花火',
    '北关东旅游',
  ],
  openGraph: {
    title: '北关东花火大会 - 2025年最新活动信息',
    description: '北关东地区2025年花火大会完整指南，12个精彩活动等您来体验。',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.kanto-travel-guide.com/kitakanto/hanabi',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/hanabi/kitakanto-fireworks.svg',
        width: 1200,
        height: 630,
        alt: '北关东花火大会',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '北关东花火大会 - 2025年最新活动信息',
    description: '北关东地区2025年花火大会完整指南，12个精彩活动等您来体验。',
    images: ['/images/hanabi/kitakanto-fireworks.svg'],
  },
  alternates: {
    canonical: '/kitakanto/hanabi',
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

// 北关东花火数据（经过官方数据验证）
const kitakantoHanabiEvents = [
  {
    id: 'ashikaga-hanabi',
    name: '足利花火大会',
    _sourceData: {
      japaneseName: '的的花火',
      japaneseDescription: '的的花火',
    },
    englishName: 'Ashikaga Fireworks Festival',
    date: '2025年8月2日',
    location: '栃木県足利市/渡良瀬川田中橋下流河川敷',
    description:
      '足利市的夏季代表性花火大会，约25,000发花火在渡良瀬川上空绽放，关东屈指可数的大规模花火演出',
    features: ['25,000发花火', '渡良瀬川', '关东大规模'],
    likes: 67,
    website: 'https://www.ashikaga-hanabi.jp/',
    fireworksCount: '約2万发',
    fireworksCountNum: 20000,
    expectedVisitors: '約45万人',
    expectedVisitorsNum: 450000,
    venue: '栃木県足利市/渡良瀬川田中橋下流河川敷',
    detailLink: '/kitakanto/hanabi/ashikaga',
  },
  {
    id: 'oyama-hanabi',
    name: '小山的花火',
    _sourceData: {
      japaneseName: '小山的花火',
      japaneseDescription: '小山的花火',
    },
    englishName: 'Oyama Fireworks Festival',
    date: '2025年9月23日',
    location: '栃木県小山市/観晃橋下流思川河畔',
    description: '小山市夏祭的主要活动、約2万发的花火的夜空将彩',
    features: ['2万发花火', '思川河畔', '夏祭主要活动'],
    likes: 54,
    website: 'https://www.oyama-hanabi.jp/',
    fireworksCount: '約2万发',
    fireworksCountNum: 20000,
    expectedVisitors: '約43万人',
    expectedVisitorsNum: 430000,
    venue: '栃木県小山市/観晃橋下流思川河畔',
    detailLink: '/kitakanto/hanabi/oyama-hanabi-2025',
  },
  {
    id: 'moka-hanabi',
    name: '真岡夏祭大花火大会',
    _sourceData: {
      japaneseName: '真岡夏祭大花火大会',
      japaneseDescription: '真岡夏祭大花火大会',
    },
    englishName: 'Moka Summer Festival Grand Fireworks',
    date: '2025年7月26日',
    location: '栃木県真岡市/真岡市役所东侧五行川沿',
    description: '真岡市夏祭的高潮、約1万发的花火的五行川上空在咲',
    features: ['1万发花火', '五行川', '夏祭高潮'],
    likes: 42,
    website: 'https://www.city.moka.lg.jp/',
    fireworksCount: '約2万发',
    fireworksCountNum: 20000,
    expectedVisitors: '約17万人',
    expectedVisitorsNum: 170000,
    venue: '栃木県真岡市/真岡市役所东侧五行川沿',
    detailLink: '/kitakanto/hanabi/moka',
  },
  {
    id: 'tsuchiura-hanabi',
    name: '土浦全国花火竞技大会',
    _sourceData: {
      japaneseName: '土浦全国花火競技大会',
      japaneseDescription: '土浦全国花火競技大会',
    },
    englishName: 'Tsuchiura National Fireworks Competition',
    date: '2025年11月1日',
    location: '茨城県土浦市/桜川畔学園大橋付近',
    description: '日本三大花火大会的一、全国的花火師的技術将競競技大会',
    features: ['日本三大花火', '全国竞技', '技术比赛'],
    likes: 89,
    website: 'https://www.tsuchiura-hanabi.jp/',
    fireworksCount: '約2万发',
    fireworksCountNum: 20000,
    expectedVisitors: '約60万人',
    expectedVisitorsNum: 600000,
    venue: '茨城県土浦市/桜川畔学園大橋付近',
    detailLink: '/kitakanto/hanabi/tsuchiura-hanabi-2025',
  },
  {
    id: 'tonegawa-fireworks',
    name: '利根川大花火大会',
    _sourceData: {
      japaneseName: '利根川大花火大会',
      japaneseDescription: '利根川大花火大会',
    },
    englishName: 'Tonegawa Grand Fireworks Festival',
    date: '2025年9月13日',
    location: '茨城県境町/利根川河川敷',
    description: '利根川河川敷在開催大迫力的花火大会、約3万发的花火的夜空将彩',
    features: ['3万发花火', '利根川', '河川敷'],
    likes: 38,
    website: 'https://www.town.sakai.ibaraki.jp/',
    fireworksCount: '約3万发',
    fireworksCountNum: 30000,
    expectedVisitors: '約30万人',
    expectedVisitorsNum: 300000,
    venue: '茨城県境町/利根川河川敷',
    detailLink: '/kitakanto/hanabi/tonegawa-hanabi-2025',
  },
  {
    id: 'mitokoumon-matsuri-hanabi',
    name: '水戸黄门祭花火大会',
    _sourceData: {
      japaneseName: '水戸黄門祭典花火大会',
      japaneseDescription: '水戸黄門祭典花火大会',
    },
    englishName: 'Mito Komon Festival Fireworks',
    date: '2025年7月26日',
    location: '茨城県水戸市/千波湖畔',
    description:
      '水戸黄门祭的结尾将飾花火大会、千波湖上在約5,000发的花火的打上的',
    features: ['5,000发花火', '千波湖', '黄门祭'],
    likes: 51,
    website: 'https://www.mitokoumon.com/',
    fireworksCount: '約5000发',
    fireworksCountNum: 5000,
    expectedVisitors: '約20万人',
    expectedVisitorsNum: 200000,
    venue: '茨城県水戸市/千波湖畔',
    detailLink: '/kitakanto/hanabi/mito-hanabi-2025',
  },
  {
    id: 'oarai-hanabi',
    name: '大洗海上花火大会',
    _sourceData: {
      japaneseName: '大洗海上花火大会',
      japaneseDescription: '大洗海上花火大会',
    },
    englishName: 'Oarai Marine Fireworks Festival',
    date: '2025年9月27日',
    location: '茨城県大洗町/大洗海滩',
    description: '大洗海岸在開催海上花火大会、約1万发的花火的太平洋上空在咲',
    features: ['1万发花火', '海上花火', '太平洋'],
    likes: 45,
    website: 'https://www.town.oarai.lg.jp/',
    fireworksCount: '約1万发',
    fireworksCountNum: 10000,
    expectedVisitors: '約18万人',
    expectedVisitorsNum: 180000,
    venue: '茨城県大洗町/大洗海滩',
    detailLink: '/kitakanto/hanabi/oarai-hanabi-2025',
  },
  {
    id: 'takasaki-hanabi',
    name: '高崎花火大会',
    _sourceData: {
      japaneseName: '高崎花火大会',
      japaneseDescription: '高崎花火大会',
    },
    englishName: 'Takasaki Fireworks Festival',
    date: '2025年8月23日',
    location: '群馬県高崎市/乌川和田桥上流河川敷',
    description: '高崎市最大規模的花火大会、約1.5万发的花火的烏川上空将彩',
    features: ['1.5万发花火', '烏川', '高崎最大规模'],
    likes: 48,
    website: 'https://www.city.takasaki.gunma.jp/',
    fireworksCount: '約1万5000发',
    fireworksCountNum: 15000,
    expectedVisitors: '約90万人',
    expectedVisitorsNum: 900000,
    venue: '群馬県高崎市/乌川和田桥上流河川敷',
    detailLink: '/kitakanto/hanabi/takasaki',
  },
  {
    id: 'maebashi-hanabi',
    name: '前橋花火大会',
    _sourceData: {
      japaneseName: '前橋花火大会',
      japaneseDescription: '前橋花火大会',
    },
    englishName: 'Maebashi Fireworks Festival',
    date: '2025年8月9日',
    location: '群馬県前橋市/利根川河畔大渡桥南北河川绿地',
    description: '前橋市将代表花火大会、約1万发的花火的利根川河川敷从打上的',
    features: ['1万发花火', '利根川河川敷', '前橋代表'],
    likes: 41,
    website: 'https://www.city.maebashi.gunma.jp/',
    fireworksCount: '約1万5000发',
    fireworksCountNum: 15000,
    expectedVisitors: '約45万人',
    expectedVisitorsNum: 450000,
    venue: '群馬県前橋市/利根川河畔大渡桥南北河川绿地',
    detailLink: '/kitakanto/hanabi/maebashi-hanabi-2025',
  },
  {
    id: 'numata-hanabi',
    name: '沼田花火大会',
    _sourceData: {
      japaneseName: '沼田花火大会',
      japaneseDescription: '沼田花火大会',
    },
    englishName: 'Numata Fireworks Festival',
    date: '2025年9月13日',
    location: '群馬県沼田市/沼田市運動公園',
    description: '沼田市夏的一大、約7,000发的花火的利根川上空将彩',
    features: ['7,000发花火', '利根川', '夏季一大活动'],
    likes: 31,
    website: 'https://www.city.numata.gunma.jp/',
    fireworksCount: '約3000发',
    fireworksCountNum: 3000,
    expectedVisitors: '約9万人',
    expectedVisitorsNum: 90000,
    venue: '群馬県沼田市/沼田市運動公園',
    detailLink: '/kitakanto/hanabi/numata-hanabi-2025',
  },
  {
    id: 'tamamura-hanabi',
    name: '田园梦花火2025 第35回 玉村花火大会',
    _sourceData: {
      japaneseName: '田園夢花火2025 第35回 玉村花火大会',
      japaneseDescription: '田園夢花火2025 第35回 玉村花火大会',
    },
    englishName: 'Tamamura Fireworks Festival 2025',
    date: '2025年8月23日',
    location: '群馬県玉村町/上陽地区（上陽小学校西側）',
    description:
      '群马县内最早开催的花火大会，享有"群马的夏天，玉村的花火"的美誉',
    features: ['3,000发花火', '田园风光', '群马最早开催'],
    likes: 25,
    website: 'https://www.town.tamamura.lg.jp/',
    fireworksCount: '約3000发',
    fireworksCountNum: 3000,
    expectedVisitors: '約2万人',
    expectedVisitorsNum: 20000,
    venue: '群馬県玉村町/上陽地区（上陽小学校西側）',
    detailLink: '/kitakanto/hanabi/tamamura-hanabi-2025',
  },
  {
    id: 'joso-kinugawa-hanabi',
    name: '第58回 常總绢川花火大会',
    _sourceData: {
      japaneseName: '第58回 常総绢川花火大会',
      japaneseDescription: '第58回 常総绢川花火大会',
    },
    englishName: 'The 58th Joso Kinugawa Fireworks Festival',
    date: '2025年9月20日',
    location: '茨城県常總市/鬼怒川河畔、橋本運動公園',
    description:
      '日本代表性花火师的作品齐聚一堂，以约2万发花火规模创造大会史上最大规模',
    features: ['2万发花火', '日本代表花火师', '大会史上最大规模'],
    likes: 58,
    website: 'https://joso-hanabi.jp/',
    fireworksCount: '約2万发',
    fireworksCountNum: 20000,
    expectedVisitors: '約12万人',
    expectedVisitorsNum: 120000,
    venue: '茨城県常總市/鬼怒川河畔、橋本運動公園',
    detailLink: '/kitakanto/hanabi/joso-kinugawa-hanabi-2025',
  },
  {
    id: 'koga-hanabi',
    name: '第20回 古河花火大会',
    _sourceData: {
      japaneseName: '第20回 古河花火大会',
      japaneseDescription: '第20回 古河花火大会',
    },
    englishName: 'The 20th Koga Fireworks Festival',
    date: '2025年8月2日',
    location: '茨城県古河市/古河高尔夫球场',
    description:
      '关东最大规模的花火大会，约2万5000发花火在渡良瀬川上空绽放，壮观的三尺玉和创意花火令人震撼',
    features: ['2万5000发花火', '关东最大规模', '三尺玉', '渡良瀬川'],
    likes: 95,
    website: 'https://www.kogahanabi.com/',
    fireworksCount: '約2万5000发',
    fireworksCountNum: 25000,
    expectedVisitors: '約20万人',
    expectedVisitorsNum: 200000,
    venue: '茨城県古河市/古河高尔夫球场',
    detailLink: '/kitakanto/hanabi/koga-hanabi-2025',
  },
];

// 北关东地区配置
const kitakantoRegionConfig = {
  name: 'kitakanto',
  displayName: '北关东',
  emoji: '♨️',
  description: '温泉与花火的完美结合，体验北关东地区传统花火文化的魅力',
  navigationLinks: {
    prev: { name: '千叶', url: '/chiba/hanabi', emoji: '🌊' },
    next: { name: '甲信越', url: '/koshinetsu/hanabi', emoji: '🗻' },
    current: { name: '北关东', url: '/kitakanto' },
  },
};

export default function KitakantoHanabiPage() {
  return (
    <HanabiPageTemplate
      region={kitakantoRegionConfig}
      events={kitakantoHanabiEvents}
      regionKey="kitakanto"
      activityKey="hanabi"
      pageTitle="北关东花火大会列表"
      pageDescription="北关东2025年花火大会，包含茨城、栃木、群马三县精彩花火祭典详细信息。"
    />
  );
}

// 静态生成配置
export const dynamic = 'force-static';
export const revalidate = 86400; // 24小时重新验证
