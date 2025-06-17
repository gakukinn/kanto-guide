/**
 * 第三层页面 - 神奈川花火大会列表
 * @layer 三层 (Category Layer)
 * @category 花火
 * @region 神奈川
 * @description 展示神奈川地区所有花火大会，支持日期筛选和红心互动
 * @template HanabiPageTemplate.tsx
 */

import { Metadata } from 'next';
import HanabiPageTemplate from '../../../components/HanabiPageTemplate';

export const metadata: Metadata = {
  title: '神奈川花火大会2025 - 横滨开港祭镰仓相模湖等14场精彩花火祭典完整攻略',
  description:
    '神奈川地区2025年花火大会完整指南，包含横滨开港祭花火、镰仓花火大会、相模湖湖上祭等14个精彩活动。提供详细的时间、地点、观赏攻略，助您规划完美的神奈川花火之旅。',
  keywords: [
    '神奈川花火大会',
    '横滨开港祭花火',
    '镰仓花火大会',
    '相模湖花火',
    '神奈川旅游',
    '2025花火',
    '关东花火',
    '夏日祭典',
    '日本花火',
    '神奈川观光',
  ],
  openGraph: {
    title:
      '神奈川花火大会2025 - 横滨开港祭镰仓相模湖等14场精彩花火祭典完整攻略',
    description:
      '神奈川地区2025年花火大会完整指南，横滨开港祭花火、镰仓花火大会等14个精彩活动等您来体验。',
    type: 'website',
    url: 'https://www.kanto-travel-guide.com/kanagawa/hanabi',
    siteName: '关东旅游指南',
    images: [
      {
        url: 'https://www.kanto-travel-guide.com/images/kanagawa-hanabi-og.jpg',
        width: 1200,
        height: 630,
        alt: '神奈川花火大会2025',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      '神奈川花火大会2025 - 横滨开港祭镰仓相模湖等14场精彩花火祭典完整攻略',
    description:
      '神奈川地区2025年花火大会完整指南，横滨开港祭花火、镰仓花火大会等14个精彩活动等您来体验。',
    images: [
      'https://www.kanto-travel-guide.com/images/kanagawa-hanabi-twitter.jpg',
    ],
  },
  alternates: {
    canonical: 'https://www.kanto-travel-guide.com/kanagawa/hanabi',
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

// 神奈川花火数据（根据WalkerPlus官方数据更新）
const kanagawaHanabiEvents = [
  {
    id: 'kamakura-hanabi-2025',
    name: '第77回鎌倉花火大会',
    _sourceData: {
      japaneseName: '第77回鎌倉花火大会',
      japaneseDescription: '第77回鎌倉花火大会',
    },
    englishName: 'The 77th Kamakura Fireworks Festival',
    date: '2025年7月18日',
    location: '神奈川县镰仓市 由比滨海岸材木座海岸',
    description: '海上绽放的光之扇，在镰仓度过特别的夏夜',
    features: ['历史传统', '湘南海岸', '夏夜绚烂'],
    likes: 186,
    fireworksCount: '約2500发',
    fireworksCountNum: 2500,
    expectedVisitors: '約16万人',
    expectedVisitorsNum: 160000,
    venue: '神奈川县镰仓市 由比滨海岸材木座海岸',
    website: 'https://hanabi.walkerplus.com/detail/ar0314e00875/',
    detailLink: '/kanagawa/hanabi/kamakura',
  },
  {
    id: 'yokohama-kaikou-matsuri',
    name: '第44回横浜开港祭"光束奇观 in 港湾"',
    _sourceData: {
      japaneseName: '第44回 横浜開港祭「光束奇观 in 港湾」',
      japaneseDescription: '第44回 横浜開港祭「光束奇观 in 港湾」',
    },
    englishName: '44th Yokohama Port Festival "Beam Spectacle in Harbor"',
    date: '2025年6月2日',
    location: '神奈川县横浜市中区 临港公园海上',
    description: '2500发大型花火在横浜港上空华丽绽放',
    features: ['開港祭', '横浜港', '歷史記念'],
    likes: 237,
    fireworksCount: '約6000发',
    fireworksCountNum: 6000,
    expectedVisitors: '約80万人',
    expectedVisitorsNum: 800000,
    venue: '神奈川县横浜市中区 临港公园海上',
    website: 'https://hanabi.walkerplus.com/detail/ar0314e00876/',
    detailLink: '/kanagawa/hanabi/yokohama-kaikosai',
  },
  {
    id: 'seaparadise',
    name: '横浜八景岛海上乐园"花火交响曲"',
    _sourceData: {
      japaneseName: '横浜八景島海洋天堂「花火交响乐」',
      japaneseDescription: '横浜八景島海洋天堂「花火交响乐」',
    },
    englishName: 'Yokohama Hakkeijima Sea Paradise Fireworks Symphonia',
    date: '2025年7月19日、20日、26日',
    location: '神奈川县横浜市金沢区 横浜八景岛海上乐园',
    description: '在八景岛海上乐园举办的花火大会，约2500发花火点亮夜空',
    features: ['花火交響曲', '音樂花火', '海上乐园'],
    likes: 22,
    fireworksCount: '約2500发',
    fireworksCountNum: 2500,
    expectedVisitors: '未公布',
    expectedVisitorsNum: null,
    venue: '神奈川县横浜市金沢区 横浜八景岛海上乐园',
    website: 'https://hanabi.walkerplus.com/detail/ar0314e01077/',
    detailLink: '/kanagawa/hanabi/seaparadise-hanabi-symphonia',
  },
  {
    id: 'yokohama-seaparadise-hanabi',
    name: '横浜八景岛海上乐园"花火交响曲"（8月）',
    _sourceData: {
      japaneseName: '横浜八景島海洋天堂「花火交响乐」',
      japaneseDescription: '横浜八景島海洋天堂「花火交响乐」',
    },
    englishName:
      'Yokohama Hakkeijima Sea Paradise Fireworks Symphonia (August)',
    date: '2025年8月10日、11日、17日、18日、24日、25日',
    location: '神奈川县横浜市金沢区 横浜八景岛海上乐园',
    description: '在横浜八景島海上乐园舉辦的花火大會，約2500发/場花火點亮夜空',
    features: ['花火交響曲', '音樂花火', '連續演出'],
    likes: 28,
    fireworksCount: '約2500发/場',
    fireworksCountNum: 2500,
    expectedVisitors: '約1万人',
    expectedVisitorsNum: 10000,
    venue: '神奈川县横浜市金沢区 横浜八景岛海上乐园',
    website: 'https://hanabi.walkerplus.com/detail/ar0314e01077/',
    detailLink: '/kanagawa/hanabi/yokohama-seaparadise',
  },
  {
    id: 'sagamiko-hanabi-2025',
    name: '第73回相模湖湖上祭花火大会',
    _sourceData: {
      japaneseName: '第73回 相模湖湖上祭花火大会',
      japaneseDescription: '第73回 相模湖湖上祭花火大会',
    },
    englishName: '73rd Sagami Lake Festival Fireworks',
    date: '2025年8月1日',
    location: '神奈川县相模原市绿区 相模湖上',
    description: '在相模湖丰富的自然环境中，花火豪华地装点夜空',
    features: ['湖上花火', '山間美景', '傳統祭典'],
    likes: 13,
    fireworksCount: '約4000发',
    fireworksCountNum: 4000,
    expectedVisitors: '約5万5000人',
    expectedVisitorsNum: 55000,
    venue: '神奈川县相模原市绿区 相模湖上',
    website: 'https://hanabi.walkerplus.com/detail/ar0314e00877/',
    detailLink: '/kanagawa/hanabi/sagamiko',
  },
  {
    id: 'kurihama-perry-hanabi-2025',
    name: '横须贺开国花火大会2024',
    _sourceData: {
      japaneseName: '这開国花火大会2024',
      japaneseDescription: '这開国花火大会2024',
    },
    englishName: 'Yokosuka Kaikoku Fireworks Festival 2024',
    date: '2024年10月19日',
    location: '神奈川县横须贺市 海风公园',
    description: '佩里登陆172周年，纪念开国的动态花火复活',
    features: ['歷史文化', '海岸花火', '佩里紀念'],
    likes: 60,
    fireworksCount: '約1万发',
    fireworksCountNum: 10000,
    expectedVisitors: '約8万人',
    expectedVisitorsNum: 80000,
    venue: '神奈川县横须贺市 海风公园',
    website: 'https://hanabi.walkerplus.com/detail/ar0314e00878/',
    detailLink: '/kanagawa/hanabi/kurihama',
  },
  {
    id: 'odawara-sakawa-hanabi-2025',
    name: '第36回小田原酒匂川花火大会',
    _sourceData: {
      japaneseName: '第36回 小田原酒匂川花火大会',
      japaneseDescription: '第36回 小田原酒匂川花火大会',
    },
    englishName: '36th Odawara Sakawa River Fireworks Festival',
    date: '2025年8月2日',
    location: '神奈川县小田原市 酒匂川体育广场',
    description: '娱乐性很强的花火表演',
    features: ['大規模花火', '河川美景', '小田原特色'],
    likes: 24,
    fireworksCount: '約1万发',
    fireworksCountNum: 10000,
    expectedVisitors: '約25万人',
    expectedVisitorsNum: 250000,
    venue: '神奈川县小田原市 酒匂川体育广场',
    website: 'https://hanabi.walkerplus.com/detail/ar0314e00879/',
    detailLink: '/kanagawa/hanabi/odawara-sakawa',
  },
  {
    id: 'southern-beach-chigasaki-hanabi-2025',
    name: '第51回南滩茅崎花火大会',
    _sourceData: {
      japaneseName: '第51回南海滩茅崎花火大会',
      japaneseDescription: '第51回南海滩茅崎花火大会',
    },
    englishName: '51st Southern Beach Chigasaki Fireworks Festival',
    date: '2025年8月2日',
    location: '神奈川县茅崎市 南滩茅崎',
    description: '水中出現的"孔雀花火"展開羽翼',
    features: ['湘南海岸', '夏日海灘', '茅崎特色'],
    likes: 20,
    fireworksCount: '約2000发',
    fireworksCountNum: 2000,
    expectedVisitors: '約5万人',
    expectedVisitorsNum: 50000,
    venue: '神奈川县茅崎市 南滩茅崎',
    website: 'https://hanabi.walkerplus.com/detail/ar0314e00880/',
    detailLink: '/kanagawa/hanabi/southern-beach-chigasaki',
  },
  {
    id: 'atsugi-ayu-matsuri',
    name: '市制70周年記念 第79回厚木香鱼祭',
    _sourceData: {
      japaneseName: '市制70周年記念 第79回 鮎祭典',
      japaneseDescription: '市制70周年記念 第79回 鮎祭典',
    },
    englishName: 'Atsugi Ayu Festival',
    date: '2025年8月2日',
    location: '神奈川县厚木市 相模川河川敷(三川合流点)',
    description: '壓軸登場的大瀑布花火',
    features: ['70周年紀念', '相模川', '傳統祭典'],
    likes: 15,
    fireworksCount: '約1万发',
    fireworksCountNum: 10000,
    expectedVisitors: '約28万人',
    expectedVisitorsNum: 280000,
    venue: '神奈川县厚木市 相模川河川敷(三川合流点)',
    website: 'https://hanabi.walkerplus.com/detail/ar0314e00243/',
    detailLink: '/kanagawa/hanabi/atsugi-ayu-matsuri',
  },
  {
    id: 'minato-mirai-smart-festival-2025',
    name: '港未来智能节日2025',
    _sourceData: {
      japaneseName: '港未来智能节庆 2025',
      japaneseDescription: '港未来智能节庆 2025',
    },
    englishName: 'Minato Mirai Smart Festival 2025',
    date: '2025年8月4日',
    location:
      '神奈川县横浜市中区 港未来21地区 临海公园、杯面博物馆公园、横浜锤头9号码头公园、抗震泊位等',
    description: '装点横浜港未来夜空的光之花',
    features: ['智能科技', '港未來', '大規模花火'],
    likes: 391,
    fireworksCount: '約2万发',
    fireworksCountNum: 20000,
    expectedVisitors: '約2万人',
    expectedVisitorsNum: 20000,
    venue: '神奈川县横浜市中区/港未来21地区',
    website: 'https://hanabi.walkerplus.com/detail/ar0314e356531/',
    detailLink: '/kanagawa/hanabi/minato-mirai-smart',
  },
  {
    id: 'yokohama-night-flowers-2025',
    name: '横浜夜花2025',
    _sourceData: {
      japaneseName: '横浜夜花2025',
      japaneseDescription: '横浜夜花2025',
    },
    englishName: 'Yokohama Night Flowers 2025',
    date: '2025年8月2日、9日、16日、23日、30日',
    location: '神奈川县横浜市中区/港未来21地区',
    description: '在横浜港未來21地區舉辦的花火大會，約150发/場花火點亮夜空',
    features: ['夜間花火', '港都夜景', '連續演出'],
    likes: 49,
    fireworksCount: '約150发/場',
    fireworksCountNum: 150,
    expectedVisitors: '約5000人/場',
    expectedVisitorsNum: 5000,
    venue: '神奈川县横浜市中区/港未来21地区',
    website: 'https://hanabi.walkerplus.com/detail/ar0314e541039/',
    detailLink: '/kanagawa/hanabi/yokohama-night-flowers',
  },
  {
    id: 'kawasaki-tamagawa-hanabi',
    name: '第84回 川崎市制記念多摩川花火大会',
    _sourceData: {
      japaneseName: '第84回 川崎市制記念多摩川花火大会',
      japaneseDescription: '第84回 川崎市制記念多摩川花火大会',
    },
    englishName: '84th Kawasaki City Memorial Tama River Fireworks Festival',
    date: '2025年10月4日',
    location: '神奈川县川崎市高津区/多摩川河川敷',
    description: '秋的風物詩和的了、伝統花火大会',
    features: ['秋花火', '多摩川', '川崎市制'],
    likes: 28,
    fireworksCount: '約6000发',
    fireworksCountNum: 6000,
    expectedVisitors: '約30万人',
    expectedVisitorsNum: 300000,
    venue: '神奈川县川崎市高津区/多摩川河川敷',
    website: 'https://hanabi.walkerplus.com/detail/ar0314e00881/',
    detailLink: '/kanagawa/hanabi/kawasaki-tamagawa',
  },
  {
    id: 'kanazawa-matsuri-hanabi-2025',
    name: '第51回 金沢祭典 花火大会',
    _sourceData: {
      japaneseName: '第51回 金沢祭典 花火大会',
      japaneseDescription: '第51回 金沢祭典 花火大会',
    },
    englishName: '51st Kanazawa Festival Fireworks Display',
    date: '2025年8月30日',
    location: '神奈川县横浜市金沢区/海的公園',
    description: '横浜的夜空在打的特大连珠花火',
    features: ['金澤祭典', '海濱公園', '横濱南部'],
    likes: 169,
    fireworksCount: '約3500发',
    fireworksCountNum: 3500,
    expectedVisitors: '約25万5000人',
    expectedVisitorsNum: 255000,
    venue: '神奈川县横浜市金沢区/海的公園',
    website: 'https://hanabi.walkerplus.com/detail/ar0314e00882/',
    detailLink: '/kanagawa/hanabi/kanazawa-matsuri-hanabi',
  },
  {
    id: 'yokohama-hanabi-september',
    name: '横浜夜間花火2025（9月）',
    _sourceData: {
      japaneseName: '横浜夜間花火2025',
      japaneseDescription: '横浜夜間花火2025',
    },
    englishName: 'Yokohama Night Fireworks 2025 (September)',
    date: '2025年9月6日14日',
    location: '神奈川县横浜市中区/横浜港',
    description: '在横浜港舉辦的夜間花火，短時間花火演出展現港都魅力',
    features: ['夜間花火', '港灣美景', '初秋花火'],
    likes: 25,
    fireworksCount: '約150发',
    fireworksCountNum: 150,
    expectedVisitors: '約5000人',
    expectedVisitorsNum: 5000,
    venue: '神奈川县横浜市中区/横浜港',
    website: 'https://hanabi.walkerplus.com/detail/ar0314e541039/',
    detailLink: '/kanagawa/hanabi/yokohama-hanabi',
  },
  {
    id: 'seaparadise-hanabi-symphonia-september',
    name: '横浜八景島海上乐园「花火交响曲」（9月）',
    _sourceData: {
      japaneseName: '横浜八景島海洋天堂「花火交响乐」',
      japaneseDescription: '横浜八景島海洋天堂「花火交响乐」',
    },
    englishName:
      'Yokohama Hakkeijima Sea Paradise Fireworks Symphonia (September)',
    date: '2025年9月13日14日',
    location: '神奈川县横浜市金沢区/横浜八景島海上乐园',
    description: '秋日海上乐园的花火交響曲，音樂與花火的完美融合',
    features: ['秋季花火', '海上乐园', '音樂花火'],
    likes: 25,
    fireworksCount: '約2500发',
    fireworksCountNum: 2500,
    expectedVisitors: '約1万人',
    expectedVisitorsNum: 10000,
    venue: '神奈川县横浜市金沢区/横浜八景島海上乐园',
    website: 'https://hanabi.walkerplus.com/detail/ar0314e01077/',
    detailLink: '/kanagawa/hanabi/seaparadise-hanabi-sep',
  },
];

// 神奈川地区配置
const kanagawaRegionConfig = {
  name: 'kanagawa',
  displayName: '神奈川',
  emoji: '⛩️',
  description: '湘南海岸与港都文化的完美融合，感受神奈川独特的花火魅力',
  navigationLinks: {
    prev: { name: '千叶', url: '/chiba/hanabi', emoji: '🌊' },
    next: { name: '北关东', url: '/kitakanto/hanabi', emoji: '🏔️' },
    current: { name: '神奈川', url: '/kanagawa' },
  },
};

export default function KanagawaHanabiPage() {
  return (
    <HanabiPageTemplate
      region={kanagawaRegionConfig}
      events={kanagawaHanabiEvents}
      regionKey="kanagawa"
      activityKey="hanabi"
      pageTitle="神奈川花火大会列表"
      pageDescription="从镰仓到横浜，体验神奈川地区最精彩的花火大会，感受湘南海岸与港都文化的花火盛典"
    />
  );
}
