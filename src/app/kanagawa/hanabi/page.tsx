/**
 * 第三层页面 - 神奈川花火大会列表
 * @layer 三层 (Category Layer)
 * @category 花火
 * @region 神奈川
 * @description 展示神奈川地区所有花火大会，支持日期筛选和红心互动
 * @template HanabiPageTemplate.tsx
 */

import HanabiPageTemplate from '../../../components/HanabiPageTemplate';

// 神奈川花火数据（完整恢复所有详情页数据 - 从3个恢复到13个活动）
const kanagawaHanabiEvents = [
  {
    id: 'kamakura',
    name: '第77回 镰仓花火大会',
    japaneseName: '第77回 鎌倉花火大会',
    englishName: 'The 77th Kamakura Fireworks Festival',
    date: '2025年7月18日',
    location: '由比之滨海岸会场',
    description: '在由比之滨海岸会场举办的花火大会，约2500发花火点亮夜空',
    features: ['历史传统', '湘南海岸', '夏夜绚烂'],
    likes: 147,
    website: 'https://www.kamakura-info.jp/',
    fireworksCount: 2500,
    expectedVisitors: 160000,
    venue: '由比之滨海岸会场'
  },
  {
    id: 'seaparadise',
    name: '横滨・八景岛海洋天堂「花火交响曲」',
    japaneseName: '横浜・八景島シーパラダイス「花火シンフォニア」',
    englishName: 'Yokohama Hakkeijima Sea Paradise Fireworks Symphonia',
    date: '2025年7月19日、20日、26日',
    location: '八景岛海洋天堂',
    description: '在八景岛海洋天堂举办的花火大会，约2500发花火点亮夜空',
    features: ['花火交响曲', '音乐花火', '海洋天堂'],
    likes: 22,
    website: 'http://www.seaparadise.co.jp/',
    fireworksCount: 2500,
    expectedVisitors: undefined,
    venue: '八景岛海洋天堂'
  },
  {
    id: 'yokohama-seaparadise-hanabi',
    name: '横滨・八景岛海洋天堂「花火交响曲」（8月）',
    japaneseName: '横浜・八景島シーパラダイス「花火シンフォニア」',
    englishName: 'Yokohama Hakkeijima Sea Paradise Fireworks Symphonia (August)',
    date: '2025年8月10日、11日、17日、18日、24日、25日',
    location: '横滨八景岛海洋天堂',
    description: '在横滨八景岛海洋天堂举办的花火大会，约2500发/场花火点亮夜空',
    features: ['花火交响曲', '音乐花火', '连续演出'],
    likes: 28,
    website: 'https://www.seaparadise.co.jp/',
    fireworksCount: 2500,
    expectedVisitors: 10000,
    venue: '横滨八景岛海洋天堂'
  },
  {
    id: 'sagamiko-hanabi-2025',
    name: '第73回相模湖湖上祭花火大会',
    japaneseName: '第73回 さがみ湖湖上祭花火大会',
    englishName: '73rd Sagami Lake Festival Fireworks',
    date: '2025年8月1日',
    location: '相模湖上主会场',
    description: '在相模湖上主会场举办的花火大会，约4000发花火点亮夜空',
    features: ['湖上花火', '山间美景', '传统祭典'],
    likes: 49,
    website: 'https://www.e-sagamihara.com/event/event-737/',
    fireworksCount: 4000,
    expectedVisitors: 55000,
    venue: '相模湖上主会场'
  },
  {
    id: 'kurihama-perry-hanabi-2025',
    name: '2025久里浜佩里祭花火大会',
    japaneseName: '2025久里浜ペリー祭花火大会',
    englishName: '2025 Kurihama Perry Festival Fireworks',
    date: '2025年8月2日',
    location: '久里浜海岸主会场',
    description: '在久里浜海岸主会场举办的花火大会，约5000发花火点亮夜空',
    features: ['历史文化', '海岸花火', '佩里纪念'],
    likes: 59,
    website: 'https://perryfes.jp/',
    fireworksCount: 5000,
    expectedVisitors: 80000,
    venue: '久里浜海岸主会场'
  },
  {
    id: 'odawara-sakawa-hanabi-2025',
    name: '第36回小田原酒匂川花火大会',
    japaneseName: '第36回小田原酒匂川花火大会',
    englishName: '36th Odawara Sakawa River Fireworks Festival',
    date: '2025年8月2日',
    location: '酒匂川体育广场主会场',
    description: '在酒匂川体育广场主会场举办的花火大会，约1万发花火点亮夜空',
    features: ['大规模花火', '河川美景', '小田原特色'],
    likes: 17,
    website: 'https://www.city.odawara.kanagawa.jp/',
    fireworksCount: 10000,
    expectedVisitors: 250000,
    venue: '酒匂川体育广场主会场'
  },
  {
    id: 'southern-beach-chigasaki-hanabi-2025',
    name: '第51回南海滩茅崎花火大会',
    japaneseName: '第51回サザンビーチちがさき花火大会',
    englishName: '51st Southern Beach Chigasaki Fireworks Festival',
    date: '2025年8月2日',
    location: '南海滩茅崎主会场',
    description: '在南海滩茅崎主会场举办的花火大会，2000发花火点亮夜空',
    features: ['湘南海岸', '夏日海滩', '茅崎特色'],
    likes: 20,
    website: 'https://www.city.chigasaki.kanagawa.jp/kanko/event/event_2025.html',
    fireworksCount: 2000,
    expectedVisitors: 50000,
    venue: '南海滩茅崎主会场'
  },
  {
    id: 'atsugi-ayu-matsuri',
    name: '市制70周年記念 第79回 あつぎ鮎まつり',
    japaneseName: '市制70周年記念 第79回 あつぎ鮎まつり',
    englishName: 'Atsugi Ayu Festival',
    date: '2025年8月3日',
    location: '相模川河川敷',
    description: '在相模川河川敷举办的花火大会，约3000发花火点亮夜空',
    features: ['70周年纪念', '相模川', '传统祭典'],
    likes: 15,
    website: 'https://www.city.atsugi.kanagawa.jp/',
    fireworksCount: 3000,
    expectedVisitors: 150000,
    venue: '相模川河川敷'
  },
  {
    id: 'minato-mirai-smart-festival-2025',
    name: '港未来智能节庆2025',
    japaneseName: 'みなとみらいスマートフェスティバル2025',
    englishName: 'Minato Mirai Smart Festival 2025',
    date: '2025年8月4日',
    location: '港未来21地区',
    description: '在港未来21地区举办的花火大会，约2万发花火点亮夜空',
    features: ['智能科技', '港未来', '大规模花火'],
    likes: 20,
    website: 'https://www.city.yokohama.lg.jp/',
    fireworksCount: 20000,
    expectedVisitors: 20000,
    venue: '港未来21地区'
  },
  {
    id: 'yokohama-night-flowers-2025',
    name: '横滨夜间花火2025',
    japaneseName: '横浜ナイトフラワーズ2025',
    englishName: 'Yokohama Night Flowers 2025',
    date: '2025年8月2日、9日、16日、23日、30日',
    location: '横滨港未来21地区',
    description: '在横滨港未来21地区举办的花火大会，约150发/场花火点亮夜空',
    features: ['夜间花火', '港都夜景', '连续演出'],
    likes: 49,
    website: 'https://www.yokohamajapan.com/',
    fireworksCount: 150,
    expectedVisitors: 5000,
    venue: '横滨港未来21地区'
  },
  {
    id: 'kanazawa-matsuri-hanabi-2025',
    name: '第51回金泽祭花火大会',
    japaneseName: '第51回 金沢まつり 花火大会',
    englishName: '51st Kanazawa Festival Fireworks Display',
    date: '2025年8月30日',
    location: '海之公园',
    description: '在海之公园举办的花火大会，约3500发花火点亮夜空',
    features: ['金泽祭典', '海滨公园', '横滨南部'],
    likes: 58,
    website: 'https://www.city.yokohama.lg.jp/kanazawa/kurashi/kyodo_manabi/kyodo_shien/chiiki/kanazawamaturi/',
    fireworksCount: 3500,
    expectedVisitors: 25500,
    venue: '海之公园'
  }
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
    current: { name: '神奈川', url: '/kanagawa' }
  }
};

export default function KanagawaHanabiPage() {
  return (
    <HanabiPageTemplate
      region={kanagawaRegionConfig}
      events={kanagawaHanabiEvents}
      regionKey="kanagawa"
      activityKey="hanabi"
      pageTitle="神奈川花火大会完全指南"
      pageDescription="从镰仓到横浜，体验神奈川地区最精彩的花火大会，感受湘南海岸与港都文化的花火盛典"
    />
  );
}
