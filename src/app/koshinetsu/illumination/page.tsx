'use client';

import IlluminationPageTemplate from '../../../components/IlluminationPageTemplate';

// 甲信越灯光秀真实数据（全部ar0400数据项目）
const koshinetsuIlluminationEvents = [
  {
    id: 'karuizawa-shiraito-lightup-2024',
    name: "軽井沢白糸の滝・真冬のライトアップ '24～'25",
    englishName: 'Karuizawa Shiraito Falls Winter Lightup 2024-25',
    _sourceData: {
      japaneseName: "軽井沢白糸の滝・真冬のライトアップ '24～'25",
      japaneseDescription:
        '長野県軽井沢町の白糸の滝で行われる幻想的な真冬のライトアップ',
    },
    date: '2024年12月20日(金)～2025年2月11日',
    endDate: '2025年2月11日',
    location: '長野県北佐久郡軽井沢町',
    description:
      '軽井沢の名瀑・白糸の滝を美しくライトアップする真冬の絶景イベント。氷瀑と光の競演が織りなす幻想的な世界は、軽井沢の冬の風物詩として多くの観光客を魅了しています。',
    illuminationPeriod: '12月20日～2月11日',
    bulbCount: '情報確認中',
    bulbCountNum: null,
    theme: '氷瀑ライトアップ',
    features: [
      '🏔️ 自然景観',
      '💧 滝ライトアップ',
      '✨ 軽井沢名所',
      '💖 バレンタインセッション',
    ],
    specialFeatures: [
      '自然景観',
      '滝ライトアップ',
      '軽井沢名所',
      'バレンタインセッション',
    ],
    venue: '白糸の滝',
    likes: 17,
    website: '',
    detailLink: 'https://illumi.walkerplus.com/detail/ar0420e216136/',
    category: 'ライトアップ',
  },
  {
    id: 'kashiyama-alice-illumination-2024',
    name: '樫山工業イルミネーション 2024-2025 "不思議の国のアリス"',
    englishName:
      'Kashiyama Industrial Alice in Wonderland Illumination 2024-25',
    _sourceData: {
      japaneseName: '樫山工業イルミネーション 2024-2025 "不思議の国のアリス"',
      japaneseDescription:
        '山梨県の樫山工業で開催される不思議の国のアリステーマのイルミネーション',
    },
    date: '2024年11月14日(木)～2025年2月28日',
    endDate: '2025年2月28日',
    location: '山梨県甲府市',
    description:
      '樫山工業が手がける「不思議の国のアリス」をテーマにした幻想的なイルミネーション。25万球の光でアリスの世界を再現し、訪れる人々をメルヘンな夢の世界へと誘います。',
    illuminationPeriod: '11月14日～2月28日',
    bulbCount: '250,000',
    bulbCountNum: 250000,
    theme: '不思議の国のアリス',
    features: ['🐰 アリステーマ', '💡 25万球', '📅 長期開催', '🧚 メルヘン'],
    specialFeatures: ['アリステーマ', '25万球', '長期開催', 'メルヘン'],
    venue: '樫山工業',
    likes: 6,
    website: '',
    detailLink: 'https://illumi.walkerplus.com/detail/ar0420e206232/',
    category: 'イルミネーション',
  },
  {
    id: 'tenku-night-tour-winter-2024',
    name: '天空の楽園 NIGHT TOUR(ナイトツアー) ウインター営業',
    englishName: 'Heavenly Paradise Night Tour Winter Operation',
    _sourceData: {
      japaneseName: '天空の楽園 NIGHT TOUR(ナイトツアー) ウインター営業',
      japaneseDescription: '長野県阿智村の星空ナイトツアー',
    },
    date: '2024年12月21日(土)～2025年3月30日',
    endDate: '2025年3月30日',
    location: '長野県下伊那郡阿智村',
    description:
      '日本一の星空で知られる阿智村での特別なナイトツアー。標高1400mのヘブンスそのはらで満天の星空と幻想的な光の演出を楽しめる、まさに天空の楽園体験です。',
    illuminationPeriod: '12月21日～3月30日',
    bulbCount: '情報確認中',
    bulbCountNum: null,
    theme: '天空星空体験',
    features: [
      '🌟 日本一星空',
      '🏔️ 標高1400m',
      '🌙 ナイトツアー',
      '📅 長期開催',
    ],
    specialFeatures: ['日本一星空', '標高1400m', 'ナイトツアー', '長期開催'],
    venue: 'ヘブンスそのはら',
    likes: 9,
    website: '',
    detailLink: 'https://illumi.walkerplus.com/detail/ar0420e211897/',
    category: 'ナイトツアー',
  },
  {
    id: 'wine-resort-christmas-2024',
    name: 'ワインリゾートクリスマス2024',
    englishName: 'Wine Resort Christmas 2024',
    _sourceData: {
      japaneseName: 'ワインリゾートクリスマス2024',
      japaneseDescription:
        '山梨県のワインリゾートで開催されるクリスマスイルミネーション',
    },
    date: '2024年12月1日(日)',
    endDate: '2024年12月1日',
    location: '山梨県甲州市',
    description:
      '山梨県のワインリゾートで開催される特別なクリスマスイベント。ワインの郷らしい洗練された光の演出と、クリスマスの温かい雰囲気が融合した大人のイルミネーションです。',
    illuminationPeriod: '12月1日',
    bulbCount: '情報確認中',
    bulbCountNum: null,
    theme: 'ワインリゾート',
    features: [
      '🍷 ワインテーマ',
      '🏖️ リゾート体験',
      '🍸 大人向け',
      '🍇 山梨名産',
    ],
    specialFeatures: ['ワインテーマ', 'リゾート体験', '大人向け', '山梨名産'],
    venue: 'ワインリゾート',
    likes: 19,
    website: '',
    detailLink: 'https://illumi.walkerplus.com/detail/ar0419e417125/',
    category: 'イルミネーション',
  },
  {
    id: 'karuizawa-winter-festival-2024',
    name: '軽井沢ウィンターフェスティバル2024',
    englishName: 'Karuizawa Winter Festival 2024',
    _sourceData: {
      japaneseName: '軽井沢ウィンターフェスティバル2024',
      japaneseDescription: '長野県軽井沢町で開催される冬の総合イベント',
    },
    date: '2024年11月23日(祝)～2025年2月28日',
    endDate: '2025年2月28日',
    location: '長野県北佐久郡軽井沢町',
    description:
      '軽井沢の冬を彩る総合的なイルミネーションフェスティバル。リゾート地らしい洗練された光の演出で、軽井沢の街全体が幻想的な冬の世界に変わります。',
    illuminationPeriod: '11月23日～2月28日',
    bulbCount: '情報確認中',
    bulbCountNum: null,
    theme: '軽井沢ウィンター',
    features: ['🏖️ リゾート地', '🏘️ 街全体', '📅 長期開催', '✨ 洗練演出'],
    specialFeatures: ['リゾート地', '街全体', '長期開催', '洗練演出'],
    venue: '軽井沢町内各所',
    likes: 12,
    website: '',
    detailLink: 'https://illumi.walkerplus.com/detail/ar0420e208498/',
    category: 'フェスティバル',
  },
  {
    id: 'azumino-light-pageant-2024',
    name: 'Azumino.光のページェント',
    englishName: 'Azumino Light Pageant',
    _sourceData: {
      japaneseName: 'Azumino.光のページェント',
      japaneseDescription: '長野県安曇野市で開催される光のページェント',
    },
    date: '2024年12月7日(土)～2025年1月31日',
    endDate: '2025年1月31日',
    location: '長野県安曇野市',
    description:
      '安曇野の美しい自然を背景に開催される光のページェント。15万球の光が安曇野の冬景色を彩り、北アルプスの雄大な景色と光の競演が楽しめる贅沢なイルミネーションです。',
    illuminationPeriod: '12月7日～1月31日',
    bulbCount: '150,000',
    bulbCountNum: 150000,
    theme: '安曇野光ページェント',
    features: ['🏔️ 北アルプス景色', '💡 15万球', '🌿 自然背景', '📅 長期開催'],
    specialFeatures: ['北アルプス景色', '15万球', '自然背景', '長期開催'],
    venue: '安曇野市内',
    likes: 38,
    website: '',
    detailLink: 'https://illumi.walkerplus.com/detail/ar0420e378771/',
    category: 'イルミネーション',
  },
  {
    id: 'matsumoto-illumination-2024',
    name: '松本市イルミネーション2024-2025',
    englishName: 'Matsumoto City Illumination 2024-25',
    _sourceData: {
      japaneseName: '松本市イルミネーション2024-2025',
      japaneseDescription: '長野県松本市で開催される市内イルミネーション',
    },
    date: '2024年12月14日(土)～2025年2月16日',
    endDate: '2025年2月16日',
    location: '長野県松本市',
    description:
      '国宝松本城で知られる松本市で開催される冬のイルミネーション。歴史ある街並みと現代的な光の演出が調和し、松本の冬夜を美しく彩ります。',
    illuminationPeriod: '12月14日～2月16日',
    bulbCount: '情報確認中',
    bulbCountNum: null,
    theme: '松本城下町',
    features: ['🏯 国宝松本城', '🏘️ 歴史街並み', '🌆 市内全域', '📅 長期開催'],
    specialFeatures: ['国宝松本城', '歴史街並み', '市内全域', '長期開催'],
    venue: '松本市内各所',
    likes: 11,
    website: '',
    detailLink: 'https://illumi.walkerplus.com/detail/ar0420e450307/',
    category: 'イルミネーション',
  },
];

// 甲信越地区配置
const koshinetsuRegionConfig = {
  name: 'koshinetsu',
  displayName: '甲信越',
  emoji: '⛰️',
  description:
    '山梨、長野、新潟の三県からなる甲信越地域は、日本アルプスの雄大な自然と豊かな文化が息づく魅力的なエリアです。軽井沢、安曇野、松本など名所での洗練されたイルミネーションが楽しめます。',
  navigationLinks: {
    prev: { name: '北関東', url: '/kitakanto', emoji: '🌲' },
    next: { name: '東京都', url: '/tokyo', emoji: '🏙️' },
    current: { name: '甲信越', url: '/koshinetsu' },
  },
};

export default function KoshinetsuIlluminationPage() {
  return (
    <IlluminationPageTemplate
      region={koshinetsuRegionConfig}
      events={koshinetsuIlluminationEvents}
      pageTitle="甲信越灯光秀活动列表"
      pageDescription="从轻井泽到安昙野，体验甲信越地区最精彩的灯光秀，感受山岳度假村的浪漫夜景"
      regionKey="koshinetsu"
      activityKey="illumination"
    />
  );
}
