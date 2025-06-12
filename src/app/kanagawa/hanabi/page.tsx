/**
 * 第三层页面 - 神奈川花火大会列表
 * @layer 三层 (Category Layer)
 * @category 花火
 * @region 神奈川
 * @description 展示神奈川地区所有花火大会，支持日期筛选和红心互动
 * @template HanabiPageTemplate.tsx
 */

import HanabiPageTemplate from '../../../components/HanabiPageTemplate';

// 神奈川花火数据（转换为模板格式）
const kanagawaHanabiEvents = [
  {
    id: 'kamakura-77',
    name: '第77回镰仓花火大会',
    japaneseName: '第77回鎌倉花火大会',
    englishName: '77th Kamakura Fireworks Festival',
    date: '2025年7月18日',
    location: '由比滨海岸',
    description: '历史悠久的镰仓花火大会，在湘南海岸展现绚烂的花火盛典',
    features: ['历史传统', '湘南海岸', '夏夜绚烂'],
    likes: 147,
    website: 'https://www.city.kamakura.kanagawa.jp/',
    fireworksCount: 2500,
    expectedVisitors: 160000,
    venue: '由比滨海岸'
  },
  {
    id: 'yokohama-night-hanabi-2025',
    name: '横浜夜间花火2025',
    japaneseName: '横浜夜の花火2025',
    englishName: 'Yokohama Night Fireworks 2025',
    date: '2025年7月5日',
    location: '横浜港红砖仓库周边',
    description: '横浜港夜空中的花火演出，展现港都独特的夜间魅力',
    features: ['港都夜景', '红砖仓库', '夜间花火'],
    likes: 151,
    website: 'https://www.city.yokohama.lg.jp/',
    fireworksCount: 150,
    expectedVisitors: undefined,
    venue: '横浜港红砖仓库周边'
  },
  {
    id: 'hakkeijima-symphony-2025',
    name: '横浜・八景岛海洋天堂「花火交响曲」',
    japaneseName: '横浜・八景島シーパラダイス「花火シンフォニア」',
    englishName: 'Yokohama Hakkeijima Sea Paradise Fireworks Symphony',
    date: '2025年7月19日',
    location: '八景岛海洋天堂',
    description: '音乐与花火的完美结合，在海洋天堂创造壮观的花火交响曲',
    features: ['花火交响曲', '音乐花火', '海洋天堂'],
    likes: 22,
    website: 'https://www.seaparadise.co.jp/',
    fireworksCount: 2500,
    expectedVisitors: undefined,
    venue: '八景岛海洋天堂'
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
