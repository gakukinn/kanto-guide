/**
 * 第三层页面 - 北关东花火大会列表
 * @layer 三层 (Category Layer)
 * @category 花火
 * @region 北关东
 * @description 展示北关东地区所有花火大会，支持日期筛选和红心互动
 * @template HanabiPageTemplate.tsx
 */

import HanabiPageTemplate from '../../../components/HanabiPageTemplate';

// 北关东花火数据（转换为模板格式）
const kitakantoHanabiEvents = [
  {
    id: 'mito-kairakuen',
    name: '水戸偕楽園花火大会',
    japaneseName: '水戸偕楽園花火大会',
    englishName: 'Mito Kairakuen Fireworks Festival',
    date: '2025年7月26日',
    location: '偕楽園・千波湖畔',
    description: '日本三大名园偕乐园的花火盛典，在千波湖畔展现北关东最美花火',
    features: ['三大名园', '千波湖畔', '历史名胜'],
    likes: 25,
    website: 'https://www.city.mito.lg.jp/',
    fireworksCount: undefined,
    expectedVisitors: 230000,
    venue: '偕楽園・千波湖畔'
  },
  {
    id: 'maoka-natsu-matsuri',
    name: '真冈市夏祭大花火大会',
    japaneseName: '真岡市夏祭り大花火大会',
    englishName: 'Maoka Summer Festival Grand Fireworks',
    date: '2025年7月26日',
    location: '鬼怒川河畔',
    description: '真冈市夏祭的压轴花火大会，在鬼怒川河畔绽放夏夜花火',
    features: ['夏祭压轴', '鬼怒川河畔', '传统祭典'],
    likes: 18,
    website: 'https://www.city.mooka.lg.jp/',
    fireworksCount: undefined,
    expectedVisitors: 170000,
    venue: '鬼怒川河畔'
  },
  {
    id: 'tamura-hanabi',
    name: '玉村花火大会',
    japaneseName: '玉村町花火大会',
    englishName: 'Tamura Fireworks Festival',
    date: '2025年7月12日',
    location: '利根川河川敷',
    description: '群马玉村町的传统花火大会，在利根川河畔享受北关东花火魅力',
    features: ['利根川河畔', '传统花火', '地域文化'],
    likes: 19,
    website: 'https://www.town.tamura.gunma.jp/',
    fireworksCount: undefined,
    expectedVisitors: 12000,
    venue: '利根川河川敷'
  },
  {
    id: 'tatebayashi-tedzutsu',
    name: '馆林手筒花火大会',
    japaneseName: '館林手筒花火大会',
    englishName: 'Tatebayashi Tezutsu Fireworks Festival',
    date: '2025年7月26日',
    location: '近藤沼公园',
    description: '传统手筒花火的壮观演出，体验北关东独特的花火文化',
    features: ['手筒花火', '传统技艺', '近藤沼公园'],
    likes: 11,
    website: 'https://www.city.tatebayashi.gunma.jp/',
    fireworksCount: undefined,
    expectedVisitors: 30000,
    venue: '近藤沼公园'
  }
];

// 北关东地区配置
const kitakantoRegionConfig = {
  name: 'kitakanto',
  displayName: '北关东',
  emoji: '🏔️',
  description: '山川湖泊与传统文化的花火盛典，感受北关东独特的自然花火魅力',
  navigationLinks: {
    prev: { name: '神奈川', url: '/kanagawa/hanabi', emoji: '⛩️' },
    next: { name: '甲信越', url: '/koshinetsu/hanabi', emoji: '🗻' },
    current: { name: '北关东', url: '/kitakanto' }
  }
};

export default function KitakantoHanabiPage() {
  return (
    <HanabiPageTemplate
      region={kitakantoRegionConfig}
      events={kitakantoHanabiEvents}
      regionKey="kitakanto"
      activityKey="hanabi"
      pageTitle="北关东花火大会完全指南"
      pageDescription="从水戸偕乐园到群马玉村，体验北关东地区最精彩的花火大会，感受山川湖泊的自然花火盛典"
    />
  );
} 