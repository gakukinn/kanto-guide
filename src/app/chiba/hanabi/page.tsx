/**
 * 第三层页面 - 千叶花火大会列表
 * @layer 三层 (Category Layer)
 * @category 花火
 * @region 千叶
 * @description 展示千叶地区所有花火大会，支持日期筛选和红心互动
 * @template HanabiPageTemplate.tsx
 */

import HanabiPageTemplate from '../../../components/HanabiPageTemplate';

// 千叶花火数据（转换为模板格式）
const chibaHanabiEvents = [
  {
    id: 'kisarazu-78',
    name: '第78回 木更津港祭典',
    japaneseName: '第78回 木更津港祭り',
    englishName: '78th Kisarazu Port Festival',
    date: '2025年8月15日',
    location: '木更津市中岛公园',
    description: '港空海映的绚烂花火，千叶传统祭典的盛大庆典',
    features: ['港空海映', '绚烂花火', '传统祭典'],
    likes: 71,
    website: 'https://www.city.kisarazu.lg.jp/',
    fireworksCount: 13000,
    expectedVisitors: 284500,
    venue: '木更津市中岛公园'
  },
  {
    id: 'makuhari-beach-2025',
    name: '幕张海滩花火节2025(第47回千叶市民花火大会)',
    japaneseName: '幕張ビーチ花火フェスタ2025(第47回千葉市民花火大会)',
    englishName: 'Makuhari Beach Fireworks Festival 2025',
    date: '2025年8月2日',
    location: '幕张海滨公园、幕张展览馆停车场',
    description: '国内最大级的幕张夜空盛大花火秀，展现千叶都市之美',
    features: ['国内最大级', '幕张夜空', '盛大花火秀'],
    likes: 56,
    website: 'https://www.city.chiba.jp/',
    fireworksCount: 20000,
    expectedVisitors: 300000,
    venue: '幕张海滨公园、幕张展览馆停车场'
  },
  {
    id: 'ichikawa-41',
    name: '第41回 市川市民纳凉花火大会',
    japaneseName: '第41回 市川市民納涼花火大会',
    englishName: '41st Ichikawa Citizens Cool Fireworks Festival',
    date: '2025年8月2日',
    location: '江戸川河川敷',
    description: '7个主题魅力程序，在江户川河畔享受壮观花火演出',
    features: ['7个主题', '魅力程序', '江户川河畔'],
    likes: 40,
    website: 'https://www.city.ichikawa.lg.jp/',
    fireworksCount: 14000,
    expectedVisitors: 490000,
    venue: '江戸川河川敷'
  },
  {
    id: 'narashino-r7',
    name: '令和7年 习志野驻屯地夏祭',
    japaneseName: '令和7年 習志野駐屯地夏祭り',
    englishName: 'Narashino Garrison Summer Festival 2025',
    date: '2025年8月2日',
    location: '陆上自卫队习志野驻屯地敷地内',
    description: '自卫队驻屯地的夏祭花火，在夜空中绚烂绽放',
    features: ['自卫队驻屯地', '夏祭花火', '夜空绚烂'],
    likes: 48,
    website: 'https://www.mod.go.jp/',
    fireworksCount: 850,
    expectedVisitors: 50000,
    venue: '陆上自卫队习志野驻屯地敷地内'
  },
  {
    id: 'shirahama-ama-61',
    name: '第61回 南房总白滨海女祭',
    japaneseName: '第61回 南房総白浜海女祭り',
    englishName: '61st Minamiboso Shirahama Ama Festival',
    date: '2025年7月19日',
    location: '白滨野岛埼灯台前公园广场',
    description: '海女祭与水中花火的完美结合，体验南房总海滨盛典',
    features: ['海女祭', '水中花火', '海滨盛典'],
    likes: 11,
    website: 'https://www.city.minamiboso.chiba.jp/',
    fireworksCount: undefined,
    expectedVisitors: 25000,
    venue: '白滨野岛埼灯台前公园广场'
  },
  {
    id: 'kamogawa-2025',
    name: '鸭川市民花火大会',
    japaneseName: '鴨川市民花火大会',
    englishName: 'Kamogawa Citizens Fireworks Festival',
    date: '2025年7月29日',
    location: '前原横渚海岸',
    description: '日本渚100选的海岸花火，创造夏夜浪漫的花火体验',
    features: ['日本渚100选', '海岸花火', '夏夜浪漫'],
    likes: 15,
    website: 'https://www.city.kamogawa.lg.jp/',
    fireworksCount: 1500,
    expectedVisitors: 40000,
    venue: '前原横渚海岸'
  },
  {
    id: 'yachiyo-50',
    name: '第50回八千代故乡亲子祭',
    japaneseName: '第50回八千代ふるさと親子祭',
    englishName: '50th Yachiyo Hometown Parent-Child Festival',
    date: '2024年8月24日',
    location: '县立八千代广域公园及村上橋周边',
    description: '8888发花火照亮八千代夜空，亲子同乐的温馨祭典',
    features: ['8888发', '八千代夜空', '亲子同乐'],
    likes: 25,
    website: 'https://www.city.yachiyo.lg.jp/',
    fireworksCount: 8888,
    expectedVisitors: 200000,
    venue: '县立八千代广域公园及村上橋周边'
  },
  {
    id: 'teganuma-2025',
    name: '手贺沼花火大会2025',
    japaneseName: '手賀沼花火大会2025',
    englishName: 'Teganuma Fireworks Festival 2025',
    date: '2025年8月2日',
    location: '柏市/我孙子市手贺沼',
    description: '超级大型的各种花火，在湖畔绚烂绽放的壮观盛典',
    features: ['超级大型', '各种花火', '湖畔绚烂'],
    likes: 24,
    website: 'https://www.city.kashiwa.lg.jp/',
    fireworksCount: 13500,
    expectedVisitors: 480000,
    venue: '柏市/我孙子市手贺沼'
  },
  {
    id: 'matsudo-2025',
    name: '松戸花火大会2025',
    japaneseName: '松戸花火大会2025',
    englishName: 'Matsudo Fireworks Festival 2025',
    date: '2025年8月2日',
    location: '古崎河川敷运动广场',
    description: '传统花火与音乐花火的多彩程序，展现松戸花火之美',
    features: ['传统花火', '音乐花火', '多彩程序'],
    likes: 23,
    website: 'https://www.city.matsudo.chiba.jp/',
    fireworksCount: 10000,
    expectedVisitors: 270000,
    venue: '古崎河川敷运动广场'
  },
  {
    id: 'choshi-minato-2025',
    name: '銚子港祭花火大会',
    japaneseName: '銚子みなと祭り花火大会',
    englishName: 'Choshi Port Festival Fireworks',
    date: '2025年8月2日',
    location: '利根川河畔',
    description: '夏日盛典的8000发花火，銚子市的一大活动',
    features: ['夏日盛典', '8000发花火', '一大活动'],
    likes: 12,
    website: 'https://www.city.choshi.chiba.jp/',
    fireworksCount: 8000,
    expectedVisitors: 70000,
    venue: '利根川河畔'
  },
  {
    id: 'futtsu-10',
    name: '「东京湾口道路建设促进」第10回 富津市民花火大会',
    japaneseName: '「東京湾口道路建設促進」第10回 富津市民花火大会',
    englishName: '10th Futtsu Citizens Fireworks Festival',
    date: '2025年7月26日',
    location: '富津海水浴场',
    description: '东京湾的夕凉花火，在海滨观赏美丽的花火演出',
    features: ['东京湾', '夕凉花火', '海滨观赏'],
    likes: 24,
    website: 'https://www.city.futtsu.lg.jp/',
    fireworksCount: 5000,
    expectedVisitors: 50000,
    venue: '富津海水浴场'
  },
  {
    id: 'omigawa-126',
    name: '第126回 水乡小见川花火大会',
    japaneseName: '第126回 水郷おみがわ花火大会',
    englishName: '126th Suigo Omigawa Fireworks Festival',
    date: '2025年8月1日',
    location: '小见川大桥下游 利根川河畔',
    description: '全国匠人的尺玉竞技，展现传统花火技艺的精湛演出',
    features: ['全国匠人', '尺玉竞技', '传统技艺'],
    likes: 9,
    website: 'https://www.city.katori.lg.jp/',
    fireworksCount: 6000,
    expectedVisitors: 80000,
    venue: '小见川大桥下游 利根川河畔'
  },
  {
    id: 'oomishirasato-2025',
    name: '大网白里花火',
    japaneseName: '大網白里花火大会',
    englishName: 'Oamishirasato Fireworks Festival',
    date: '2025年7月26日',
    location: '白里海水浴场',
    description: '60分钟的水中花火，海面彩色绚烂的花火盛典',
    features: ['60分钟', '水中花火', '海面彩色'],
    likes: 10,
    website: 'https://www.city.oamishirasato.lg.jp/',
    fireworksCount: 3000,
    expectedVisitors: 28000,
    venue: '白里海水浴场'
  },
  {
    id: 'sanmu-carnival-2025',
    name: '山武市夏日嘉年华',
    japaneseName: '山武市夏のカーニバル',
    englishName: 'Sanmu City Summer Carnival',
    date: '2025年7月26日',
    location: '山武市蓮沼海滨公园',
    description: '海滨花火与夏日嘉年华的盛大节庆，体验山武夏日魅力',
    features: ['海滨花火', '夏日嘉年华', '盛大节庆'],
    likes: 7,
    website: 'https://www.city.sammu.lg.jp/',
    fireworksCount: 3000,
    expectedVisitors: 40000,
    venue: '山武市蓮沼海滨公园'
  }
];

// 千叶地区配置
const chibaRegionConfig = {
  name: 'chiba',
  displayName: '千叶',
  emoji: '🌊',
  description: '海洋花火与都市盛典的绚烂交响，感受千叶独特的花火文化',
  navigationLinks: {
    prev: { name: '埼玉', url: '/saitama/hanabi', emoji: '🌾' },
    next: { name: '神奈川', url: '/kanagawa/hanabi', emoji: '⛩️' },
    current: { name: '千叶', url: '/chiba' }
  }
};

export default function ChibaHanabiPage() {
  return (
    <HanabiPageTemplate
      region={chibaRegionConfig}
      events={chibaHanabiEvents}
      regionKey="chiba"
      activityKey="hanabi"
      pageTitle="千叶花火大会完全指南"
      pageDescription="从幕张到木更津，体验千叶地区最精彩的花火大会，感受海洋与都市交融的花火魅力"
    />
  );
} 
