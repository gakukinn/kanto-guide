/**
 * 第三层页面 - 甲信越花火大会列表
 * @layer 三层 (Category Layer)
 * @category 花火
 * @region 甲信越
 * @description 展示甲信越地区所有花火大会，支持日期筛选和红心互动
 * @template HanabiPageTemplate.tsx
 */

import HanabiPageTemplate from '../../../components/HanabiPageTemplate';

// 甲信越花火数据（转换为模板格式）
const koshinetsuHanabiEvents = [
  {
    id: 'gion-kashiwazaki',
    name: '祇园柏崎祭海之大花火大会',
    japaneseName: '祇園柏崎まつり海の大花火大会',
    englishName: 'Gion Kashiwazaki Festival Great Sea Fireworks',
    date: '2025年7月26日',
    location: '新潟县柏崎市中央海岸一带',
    description: '日本三大花火大会之一，在日本海展现最壮观的海上花火盛典',
    features: ['三大花火大会', '日本海', '超大规模'],
    likes: 21,
    website: 'https://www.city.kashiwazaki.lg.jp/',
    fireworksCount: 16000,
    expectedVisitors: 170000,
    venue: '新潟县柏崎市中央海岸一带'
  },
  {
    id: 'fujisan-kawaguchiko',
    name: '富士山・河口湖山开花火大会',
    japaneseName: '富士山・河口湖山開き花火大会',
    englishName: 'Mount Fuji Kawaguchiko Mountain Opening Fireworks',
    date: '2025年7月5日',
    location: '山梨县河口湖畔',
    description: '富士山下的绚烂花火，在河口湖畔欣赏山与湖的壮美花火演出',
    features: ['富士山景', '河口湖畔', '山开纪念'],
    likes: 10,
    website: 'https://www.town.fujikawaguchiko.lg.jp/',
    fireworksCount: 2000,
    expectedVisitors: undefined,
    venue: '山梨县河口湖畔'
  },
  {
    id: 'suwako-hanabi',
    name: '第38回须坂大家花火大会',
    japaneseName: '第38回須坂みんなの花火大会',
    englishName: '38th Suzaka Citizens Fireworks Festival',
    date: '2025年7月19日',
    location: '长野县须坂市百々川绿地公园',
    description: '市民共同参与的温馨花火大会，展现甲信越地域文化魅力',
    features: ['市民参与', '百々川绿地', '地域文化'],
    likes: 8,
    website: 'https://www.city.suzaka.lg.jp/',
    fireworksCount: undefined,
    expectedVisitors: undefined,
    venue: '长野县须坂市百々川绿地公园'
  },
  {
    id: 'anime-classic-hanabi',
    name: '动漫经典动画歌曲花火',
    japaneseName: 'アニメクラシック アニソン花火',
    englishName: 'Anime Classic Animation Song Fireworks',
    date: '2025年7月5日',
    location: '山梨县笛吹市',
    description: '动漫歌曲与花火的完美结合，创造独特的音乐花火体验',
    features: ['动漫歌曲', '音乐花火', '创新演出'],
    likes: 7,
    website: 'https://www.city.fuefuki.yamanashi.jp/',
    fireworksCount: 10000,
    expectedVisitors: undefined,
    venue: '山梨县笛吹市'
  },
  {
    id: 'misato-20th-hanabi',
    name: '三条市合并20周年纪念花火大会',
    japaneseName: '三条市合併20周年記念花火大会',
    englishName: 'Sanjo City 20th Anniversary Memorial Fireworks',
    date: '2025年7月12日',
    location: '新潟县三条市信浓川河畔',
    description: '三条市合并20周年的纪念花火大会，在信浓川畔庆祝历史时刻',
    features: ['20周年纪念', '信浓川畔', '历史意义'],
    likes: 5,
    website: 'https://www.city.sanjo.niigata.jp/',
    fireworksCount: undefined,
    expectedVisitors: undefined,
    venue: '新潟县三条市信浓川河畔'
  },
  {
    id: 'nojiriko-101',
    name: '第101回野尻湖花火大会',
    japaneseName: '第101回野尻湖花火大会',
    englishName: '101st Nojiriko Lake Fireworks Festival',
    date: '2025年7月26日',
    location: '长野县信濃町野尻湖畔',
    description: '历史悠久的野尻湖花火大会，在湖畔展现传统与现代的花火魅力',
    features: ['101回历史', '野尻湖畔', '传统花火'],
    likes: 5,
    website: 'https://www.town.shinano.lg.jp/',
    fireworksCount: undefined,
    expectedVisitors: undefined,
    venue: '长野县信濃町野尻湖畔'
  }
];

// 甲信越地区配置
const koshinetsuRegionConfig = {
  name: 'koshinetsu',
  displayName: '甲信越',
  emoji: '🗻',
  description: '山岳湖泊与花火的绝美共演，感受甲信越独特的山间花火文化',
  navigationLinks: {
    prev: { name: '北关东', url: '/kitakanto/hanabi', emoji: '🏔️' },
    next: { name: '东京', url: '/tokyo/hanabi', emoji: '🗼' },
    current: { name: '甲信越', url: '/koshinetsu' }
  }
};

export default function KoshinetsuHanabiPage() {
  return (
    <HanabiPageTemplate
      region={koshinetsuRegionConfig}
      events={koshinetsuHanabiEvents}
      regionKey="koshinetsu"
      activityKey="hanabi"
      pageTitle="甲信越花火大会完全指南"
      pageDescription="从祇园柏崎到富士河口湖，体验甲信越地区最精彩的花火大会，感受山岳湖泊的自然花火盛典"
    />
  );
} 