/**
 * 第三层页面 - 东京花火大会列表
 * @layer 三层 (Category Layer)
 * @category 花火
 * @region 东京
 * @description 展示东京地区所有花火大会，支持日期筛选和红心互动
 * @template HanabiPageTemplate.tsx
 */

import HanabiPageTemplate from '../../../components/HanabiPageTemplate';

// 东京花火数据（完整恢复原始数据，转换为模板格式）
const tokyoHanabiEvents = [
  {
    id: 'tokyo-keiba-2025',
    name: '东京竞马场花火 2025 〜花火与J-POP BEST〜',
    japaneseName: '東京競馬場花火2025〜花火とJ-POP BEST〜',
    englishName: 'Tokyo Racecourse Fireworks 2025 ~Fireworks & J-POP BEST~',
    date: '2025年6月14日',
    location: '东京都・府中市/东京竞马场',
    description: 'J-POP音乐与花火的完美结合，在东京竞马场享受座席观赏的特色花火体验',
    features: ['J-POP音乐', '座席观赏', '竞马场特色'],
    likes: 180,
    website: 'https://www.jra.go.jp/',
    fireworksCount: 12000,
    expectedVisitors: 90000,
    venue: '东京都・府中市/东京竞马场'
  },
  {
    id: 'sumida-river-48',
    name: '第48回 隅田川花火大会',
    japaneseName: '第48回 隅田川花火大会',
    englishName: '48th Sumida River Fireworks Festival',
    date: '2025年7月26日',
    location: '东京都・墨田区/隅田川',
    description: '历史悠久的隅田川花火大会，在东京湾景观中展现传统花火的壮美',
    features: ['历史悠久', '东京湾景观', '传统花火'],
    likes: 420,
    website: 'https://www.city.sumida.lg.jp/',
    fireworksCount: 20000,
    expectedVisitors: 950000,
    venue: '东京都・墨田区/隅田川'
  },
  {
    id: 'katsushika-59',
    name: '第59回 葛饰纳凉花火大会',
    japaneseName: '第59回 葛飾納涼花火大会',
    englishName: '59th Katsushika Cool Evening Fireworks Festival',
    date: '2025年7月22日',
    location: '东京都・葛饰区/江户川河川敷',
    description: '在江户川河岸享受传统纳凉花火，体验地域特色的夏夜盛典',
    features: ['江户川河岸', '传统纳凉', '地域特色'],
    likes: 310,
    website: 'https://www.city.katsushika.lg.jp/',
    fireworksCount: 15000,
    expectedVisitors: 750000,
    venue: '东京都・葛饰区/江户川河川敷'
  },
  {
    id: 'edogawa-50',
    name: '第50回 江户川区花火大会',
    japaneseName: '第50回 江戸川区花火大会',
    englishName: '50th Edogawa Ward Fireworks Festival',
    date: '2025年8月2日',
    location: '东京都・江户川区/江户川河川敷',
    description: '规模最大的50周年纪念花火大会，在河川敷欣赏壮观的花火演出',
    features: ['规模最大', '50周年纪念', '河川敷观赏'],
    likes: 580,
    website: 'https://www.city.edogawa.tokyo.jp/',
    fireworksCount: 14000,
    expectedVisitors: 1390000,
    venue: '东京都・江户川区/江户川河川敷'
  },
  {
    id: 'jingu-gaien-2025',
    name: '2025 神宫外苑花火大会',
    japaneseName: '2025 神宮外苑花火大会',
    englishName: '2025 Jingu Gaien Fireworks Festival',
    date: '2025年8月16日',
    location: '东京都・新宿区/明治神宫外苑',
    description: '音乐花火祭典在明治神宫外苑，1万发花火带来感动的音乐花火体验',
    features: ['音乐花火祭典', '明治神宫外苑', '1万发感动'],
    likes: 91,
    website: 'https://jingustadiun.com/',
    fireworksCount: 10000,
    expectedVisitors: 1000000,
    venue: '东京都・新宿区/明治神宫外苑'
  },
  {
    id: 'itabashi-66',
    name: '第66回 板桥花火大会',
    japaneseName: '第66回 板橋花火大会',
    englishName: '66th Itabashi Fireworks Festival',
    date: '2025年8月2日',
    location: '东京都・板桥区/荒川河川敷',
    description: '关东最大级的传统花火大会，在荒川河畔展现壮观的花火盛典',
    features: ['关东最大级', '荒川河畔', '传统花火'],
    likes: 320,
    website: 'https://www.city.itabashi.tokyo.jp/',
    fireworksCount: 12000,
    expectedVisitors: 520000,
    venue: '东京都・板桥区/荒川河川敷'
  },
  {
    id: 'tamagawa-48',
    name: '第48回 多摩川花火大会',
    japaneseName: '第48回 多摩川花火大会',
    englishName: '48th Tamagawa Fireworks Festival',
    date: '2025年10月4日',
    location: '东京都・世田谷区/多摩川河畔',
    description: '多摩川景观中的双岸花火，与川崎合办的特色花火大会',
    features: ['多摩川景观', '川崎合办', '双岸花火'],
    likes: 285,
    website: 'https://www.city.setagaya.lg.jp/',
    fireworksCount: 6000,
    expectedVisitors: 430000,
    venue: '东京都・世田谷区/多摩川河畔'
  },
  {
    id: 'adachi-47',
    name: '第47回 足立の花火',
    japaneseName: '第47回 足立の花火',
    englishName: '47th Adachi Fireworks Festival',
    date: '2025年5月31日',
    location: '东京都・足立区/荒川河川敷(东京地铁千代田线铁桥～西新井桥间)',
    description: '夏季最早的高密度花火，1小时内绽放1万4000发的震撼花火体验',
    features: ['高密度花火', '1小时1万4000发', '夏季最早花火'],
    likes: 557,
    website: 'https://www.city.adachi.tokyo.jp/',
    fireworksCount: 14010,
    expectedVisitors: 400000,
    venue: '东京都・足立区/荒川河川敷(东京地铁千代田线铁桥～西新井桥间)'
  },
  {
    id: 'taito-shitamachi-34',
    name: '第34回 台东夏祭"下町花火"',
    japaneseName: '第34回 台東夏祭り「下町花火」',
    englishName: '34th Taito Summer Festival "Shitamachi Fireworks"',
    date: '2025年7月26日',
    location: '东京都・台东区/隅田公园',
    description: '下町风情的夏祭特色花火，在隅田公园享受传统的下町花火魅力',
    features: ['下町风情', '隅田公园', '夏祭特色'],
    likes: 180,
    website: 'https://www.city.taito.lg.jp/',
    fireworksCount: 12000,
    expectedVisitors: 100000,
    venue: '东京都・台东区/隅田公园'
  },
  {
    id: 'odaiba-romantic-5',
    name: '第5回 台场夏祭SPECIAL〜浪漫花火大会〜',
    japaneseName: '第5回 お台場夏祭りSPECIAL〜ロマンティック花火大会〜',
    englishName: '5th Odaiba Summer Festival SPECIAL ~Romantic Fireworks Festival~',
    date: '2025年8月30日',
    location: '东京都・港区/台场海滨公园',
    description: '台场夜景中的浪漫约会花火，在海上花火中享受浪漫的夏夜',
    features: ['台场夜景', '浪漫约会', '海上花火'],
    likes: 165,
    website: 'https://www.city.minato.tokyo.jp/',
    fireworksCount: 10000,
    expectedVisitors: 80000,
    venue: '东京都・港区/台场海滨公园'
  },
  {
    id: 'setagaya-tamagawa-47',
    name: '第47回 世田谷区多摩川花火大会',
    japaneseName: '第47回 世田谷区多摩川花火大会',
    englishName: '47th Setagaya Tamagawa Fireworks Festival',
    date: '2025年10月4日',
    location: '东京都・世田谷区/区立二子玉川绿地运动场(二子桥上游)',
    description: '秋空花火与多摩川两岸呼应，约6000发大花火的壮观演出',
    features: ['秋空花火', '多摩川两岸呼应', '约6000发大花火'],
    likes: 45,
    website: 'https://www.city.setagaya.lg.jp/',
    fireworksCount: 6000,
    expectedVisitors: 260000,
    venue: '东京都・世田谷区/区立二子玉川绿地运动场(二子桥上游)'
  },
  {
    id: 'kita-hanabi-11',
    name: '第11回 北区花火会',
    japaneseName: '第11回 北区花火会',
    englishName: '11th Kita Ward Fireworks Festival',
    date: '2024年9月28日',
    location: '东京都・北区/荒川河川敷・岩渊水门周边',
    description: 'RED×BLUE SPARKLE GATE主题花火，在岩渊水门周边的特色花火演出（已结束活动）',
    features: ['RED×BLUE SPARKLE GATE', '岩渊水门', '已结束活动'],
    likes: 955,
    website: 'https://www.city.kita.tokyo.jp/',
    fireworksCount: 10000,
    expectedVisitors: 50000,
    venue: '东京都・北区/荒川河川敷・岩渊水门周边'
  },
  {
    id: 'okutama-70th',
    name: '町制施行70周年纪念 奥多摩纳凉花火大会',
    japaneseName: '町制施行70周年記念 奥多摩納涼花火大会',
    englishName: 'Okutama 70th Anniversary Memorial Cool Evening Fireworks',
    date: '2025年8月9日',
    location: '东京都・西多摩郡奥多摩町/爱宕山广场',
    description: '70周年纪念的山间花火，在自然环境中享受宁静的花火之美',
    features: ['山间花火', '70周年纪念', '自然环境'],
    likes: 65,
    website: 'https://www.town.okutama.tokyo.jp/',
    fireworksCount: 1000,
    expectedVisitors: 10000,
    venue: '东京都・西多摩郡奥多摩町/爱宕山广场'
  },
  {
    id: 'akishima-kujira-53',
    name: '第53回 昭岛市民鲸鱼祭 梦花火',
    japaneseName: '第53回 昭島市民くじら祭 夢花火',
    englishName: '53rd Akishima Citizens Whale Festival Dream Fireworks',
    date: '2025年8月23日',
    location: '东京都・昭岛市/昭岛市民球场',
    description: '鲸鱼祭特色的市民活动，以梦想为主题的温馨花火大会',
    features: ['鲸鱼祭特色', '市民活动', '梦想主题'],
    likes: 75,
    website: 'https://www.city.akishima.lg.jp/',
    fireworksCount: 2000,
    expectedVisitors: 45000,
    venue: '东京都・昭岛市/昭岛市民球场'
  },
  {
    id: 'star-island-2025',
    name: 'STAR ISLAND 2025',
    japaneseName: 'STAR ISLAND 2025',
    englishName: 'STAR ISLAND 2025',
    date: '2025年5月24日',
    location: '东京都・港区/台场海滨公园',
    description: '新次元未来型娱乐的台场音乐花火，5月24-25日的创新花火体验',
    features: ['新次元未来型娱乐', '台场音乐花火', '5月24-25日'],
    likes: 400,
    website: 'https://www.star-island.jp/',
    fireworksCount: undefined,
    expectedVisitors: undefined,
    venue: '东京都・港区/台场海滨公园'
  }
];

// 东京地区配置
const tokyoRegionConfig = {
  name: 'tokyo',
  displayName: '东京',
  emoji: '🗼',
  description: '都市与传统交融的花火盛典，感受东京独特的花火文化魅力',
  navigationLinks: {
    prev: { name: '甲信越', url: '/koshinetsu/hanabi', emoji: '🗻' },
    next: { name: '埼玉', url: '/saitama/hanabi', emoji: '🌾' },
    current: { name: '东京', url: '/tokyo' }
  }
};

export default function TokyoHanabiPage() {
  return (
    <HanabiPageTemplate
      region={tokyoRegionConfig}
      events={tokyoHanabiEvents}
      regionKey="tokyo"
      activityKey="hanabi"
      pageTitle="东京花火大会完全指南"
      pageDescription="从隅田川到台场，体验东京地区最精彩的花火大会，感受都市与传统交融的花火盛典"
    />
  );
}