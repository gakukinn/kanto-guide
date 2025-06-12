/**
 * 第三层页面 - 埼玉花火大会列表
 * @layer 三层 (Category Layer)
 * @category 花火
 * @region 埼玉
 * @description 展示埼玉地区所有花火大会，支持日期筛选和红心互动
 * @template HanabiPageTemplate.tsx
 */

import HanabiPageTemplate from '../../../components/HanabiPageTemplate';

// 埼玉花火数据（转换为模板格式）
const saitamaHanabiEvents = [
  {
    id: 'moomin-koujou-natsu',
    name: '姆明谷湖上花火大会～夏～',
    japaneseName: 'ムーミンバレーパーク湖上花火大会～夏～',
    englishName: 'Moomin Valley Park Lake Fireworks Summer',
    date: '2025年7月5日',
    location: '姆明谷公园',
    description: '湖上花火与姆明主题的完美结合，在夏夜创造浪漫的花火体验',
    features: ['湖上花火', '姆明主题', '夏夜浪漫'],
    likes: 3,
    website: 'https://metsa-hanno.com/',
    fireworksCount: undefined,
    expectedVisitors: undefined,
    venue: '姆明谷公园'
  },
  {
    id: 'metsza-nordic-2025',
    name: '梅兹的北欧花火2025',
    japaneseName: 'メッツァの北欧花火2025',
    englishName: 'Metsa Nordic Fireworks 2025',
    date: '2025年7月12日',
    location: '梅兹池袋',
    description: '北欧风格的现代花火，在都市夜景中展现独特魅力',
    features: ['北欧风格', '现代花火', '都市夜景'],
    likes: 8,
    website: 'https://metsa-hanno.com/',
    fireworksCount: undefined,
    expectedVisitors: undefined,
    venue: '梅兹池袋'
  },
  {
    id: 'seibu-daika-matsuri',
    name: '西武园游乐园大火祭',
    japaneseName: '西武園ゆうえんち大火祭り',
    englishName: 'Seibuenchi Amusement Park Great Fire Festival',
    date: '2025年7月19日',
    location: '西武园游乐园',
    description: '音乐花火与夜间祭典的大迫力演出，体验游乐园独特的花火盛典',
    features: ['音乐花火', '夜间祭典', '大迫力演出'],
    likes: 30,
    website: 'https://www.seibu-leisure.co.jp/',
    fireworksCount: undefined,
    expectedVisitors: undefined,
    venue: '西武园游乐园'
  },
  {
    id: 'iruma-kichi-2025',
    name: '令和7年度入间基地纳凉祭～盆踊与花火之夕～',
    japaneseName: '令和7年度入間基地納涼祭～盆踊りと花火の夕べ～',
    englishName: 'Iruma Airbase Summer Festival 2025',
    date: '2025年7月23日',
    location: '航空自卫队入间基地',
    description: '在自卫队基地举办的特殊花火祭典，观赏4号玉星型烟花的壮观演出',
    features: ['自卫队基地', '4号玉', '星型烟花'],
    likes: 20,
    website: 'https://www.mod.go.jp/',
    fireworksCount: 900,
    expectedVisitors: 42000,
    venue: '航空自卫队入间基地'
  },
  {
    id: 'koshigaya-hanabi',
    name: '越谷花火大会',
    japaneseName: '越谷花火大会',
    englishName: 'Koshigaya Fireworks Festival',
    date: '2025年7月26日',
    location: '越谷市中央市民会馆葛西用水中土手',
    description: '多样花火在夏夜绚烂绽放，是越谷市民热爱的传统祭典',
    features: ['多样花火', '夏夜绚烂', '市民祭典'],
    likes: 88,
    website: 'https://www.city.koshigaya.saitama.jp/',
    fireworksCount: 5000,
    expectedVisitors: 270000,
    venue: '越谷市中央市民会馆葛西用水中土手'
  },
  {
    id: 'ogawa-tanabata-2025',
    name: '小川町七夕祭花火大会',
    japaneseName: '小川町七夕祭り花火大会',
    englishName: 'Ogawa Town Tanabata Festival Fireworks',
    date: '2025年7月26日',
    location: '小川町',
    description: '七夕花火与传统祭典结合，在山间展现独特的花火文化',
    features: ['七夕花火', '传统祭典', '山间花火'],
    likes: 25,
    website: 'https://www.town.ogawa.saitama.jp/',
    fireworksCount: undefined,
    expectedVisitors: undefined,
    venue: '小川町'
  },
  {
    id: 'saitama-yamato-2025',
    name: '令和7年度 埼玉市花火大会 大和田公园会场',
    japaneseName: '令和7年度 さいたま市花火大会 大和田公園会場',
    englishName: 'Saitama City Fireworks Festival - Owada Park Venue',
    date: '2025年7月27日',
    location: '大和田公园周边',
    description: '埼玉系列花火大会的夏季开幕，在公园环境中享受花火观赏',
    features: ['埼玉系列', '公园观赏', '夏季开幕'],
    likes: 33,
    website: 'https://www.city.saitama.jp/',
    fireworksCount: undefined,
    expectedVisitors: 90000,
    venue: '大和田公园周边'
  },
  {
    id: 'todabashi-sky-fantasia-72',
    name: '第72回 戸田橋花火大会',
    japaneseName: '第72回 戸田橋花火大会',
    englishName: '72nd Todabashi Fireworks Festival',
    date: '2025年8月2日',
    location: '国道17号戸田橋上流荒川河川敷',
    description: '双城同步的日本唯一光之竞演，规模宏大的河川敷花火盛典',
    features: ['双城同步', '日本唯一', '光之竞演'],
    likes: 75,
    website: 'https://www.city.toda.saitama.jp/',
    fireworksCount: 15000,
    expectedVisitors: 450000,
    venue: '国道17号戸田橋上流荒川河川敷'
  },
  {
    id: 'asaka-saika-matsuri',
    name: '朝霞市民祭典「彩夏祭」',
    japaneseName: '朝霞市民まつり「彩夏祭」',
    englishName: 'Asaka Citizens Festival "Saika Matsuri"',
    date: '2025年8月2日',
    location: '朝霞跡地',
    description: '祭典花火与光音共演的迫力满点演出，朝霞市最大的市民节庆',
    features: ['祭典花火', '光音共演', '迫力满点'],
    likes: 25,
    website: 'https://www.city.asaka.lg.jp/',
    fireworksCount: 9000,
    expectedVisitors: 730000,
    venue: '朝霞跡地'
  },
  {
    id: 'sayama-tanabata-2025',
    name: '狭山市入间川七夕祭纳凉花火大会',
    japaneseName: '狭山市入間川七夕まつり納涼花火大会',
    englishName: 'Sayama Iruma River Tanabata Cool Fireworks',
    date: '2025年8月2日',
    location: '入间川河川敷',
    description: '竹饰花火与七夕祭典结合，在河川敷享受传统夏日风情',
    features: ['竹饰花火', '七夕祭典', '河川敷花火'],
    likes: 6,
    website: 'https://www.city.sayama.saitama.jp/',
    fireworksCount: 2000,
    expectedVisitors: undefined,
    venue: '入间川河川敷'
  },
  {
    id: 'kumagaya-hanabi',
    name: '熊谷花火大会',
    japaneseName: '熊谷花火大会',
    englishName: 'Kumagaya Fireworks Festival',
    date: '2025年8月9日',
    location: '荒川河畔(荒川大桥下流)',
    description: '心意信息与花火共演，在荒川河畔展现壮观的花火盛典',
    features: ['心意信息', '花火共演', '荒川河畔'],
    likes: 33,
    website: 'https://www.city.kumagaya.lg.jp/',
    fireworksCount: 10000,
    expectedVisitors: 420000,
    venue: '荒川河畔(荒川大桥下流)'
  },
  {
    id: 'saitama-higashiura-2025',
    name: '令和7年度 埼玉市花火大会 东浦和 大间木公园会场',
    japaneseName: '令和7年度 さいたま市花火大会 東浦和 大間木公園会場',
    englishName: 'Saitama City Fireworks - Higashi-Urawa Omaki Park Venue',
    date: '2025年8月9日',
    location: '大间木公园周边',
    description: '埼玉系列花火大会的东浦和会场，在公园环境中观赏花火',
    features: ['埼玉系列', '东浦和', '公园花火'],
    likes: 21,
    website: 'https://www.city.saitama.jp/',
    fireworksCount: undefined,
    expectedVisitors: 60000,
    venue: '大间木公园周边'
  },
  {
    id: 'higashimatsuyama-26',
    name: '第26回 东松山花火大会',
    japaneseName: '第26回 東松山花火大会',
    englishName: '26th Higashimatsuyama Fireworks Festival',
    date: '2025年8月23日',
    location: '都几川河边公园',
    description: '近距离观赏迫力满点的河边花火，体验东松山独特的花火魅力',
    features: ['近距离观赏', '迫力满点', '河边花火'],
    likes: 80,
    website: 'https://www.city.higashimatsuyama.lg.jp/',
    fireworksCount: 5000,
    expectedVisitors: 60000,
    venue: '都几川河边公园'
  },
  {
    id: 'ina-matsuri-2025',
    name: '2025 伊奈祭',
    japaneseName: '2025 伊奈まつり',
    englishName: '2025 Ina Festival',
    date: '2025年8月23日',
    location: '伊奈町制施行记念公园',
    description: '玫瑰之町的鲜艳花火，伊奈町制施行记念公园的町祭花火',
    features: ['玫瑰之町', '鲜艳花火', '町祭花火'],
    likes: 20,
    website: 'https://www.town.ina.saitama.jp/',
    fireworksCount: undefined,
    expectedVisitors: 40000,
    venue: '伊奈町制施行记念公园'
  },
  {
    id: 'kounosu-shoukoukai-22',
    name: '燃烧吧！商工会青年部！！第22回 鸿巢花火大会',
    japaneseName: '燃えよ!商工会青年部!!第22回 こうのす花火大会',
    englishName: '22nd Konosu Fireworks Festival',
    date: '2025年10月11日',
    location: '糠田运动场及荒川河川敷',
    description: '创造世界记录的4尺玉特大花火，展现前所未有的花火壮观',
    features: ['世界记录', '4尺玉', '特大花火'],
    likes: 64,
    website: 'https://www.city.konosu.saitama.jp/',
    fireworksCount: 20000,
    expectedVisitors: 600000,
    venue: '糠田运动场及荒川河川敷'
  },
  {
    id: 'fujimi-hanabi',
    name: '富士见市民祭花火大会',
    japaneseName: '富士見市民まつり花火大会',
    englishName: 'Fujimi Citizens Festival Fireworks',
    date: '2025年8月30日',
    location: '富士见川越道路下水谷公园',
    description: '富士见市民祭的花火大会，在水谷公园享受市民节庆的花火',
    features: ['富士见市', '市民祭', '水谷公园'],
    likes: 21,
    website: 'https://www.city.fujimi.saitama.jp/',
    fireworksCount: 3000,
    expectedVisitors: 60000,
    venue: '富士见川越道路下水谷公园'
  }
];

// 埼玉地区配置
const saitamaRegionConfig = {
  name: 'saitama',
  displayName: '埼玉',
  emoji: '🌾',
  description: '田园花火与都市文化的完美融合，感受埼玉独特的花火魅力',
  navigationLinks: {
    prev: { name: '东京', url: '/tokyo/hanabi', emoji: '🗼' },
    next: { name: '千叶', url: '/chiba/hanabi', emoji: '🌊' },
    current: { name: '埼玉', url: '/saitama' }
  }
};

export default function SaitamaHanabiPage() {
  return (
    <HanabiPageTemplate
      region={saitamaRegionConfig}
      events={saitamaHanabiEvents}
      regionKey="saitama"
      activityKey="hanabi"
      pageTitle="埼玉花火大会完全指南"
      pageDescription="从姆明谷到鸿巢，体验埼玉地区最精彩的花火大会，感受田园与都市交融的花火文化"
    />
  );
} 
