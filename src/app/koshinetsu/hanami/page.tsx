/**
 * 甲信越花见会页面 - 三层页面
 * 路径: /koshinetsu/hanami
 * 使用: HanamiPageTemplate模板
 * 数据源: 真实爬取的AR0400甲信越排行榜数据（山梨3个+长野5个+新潟2个=10个景点）
 *
 * ⚠️ 商业网站重要提醒：所有数据均基于真实来源，严禁编造任何信息！
 */

import HanamiPageTemplate from '@/components/HanamiPageTemplate';

// 基于真实爬取数据的甲信越花见景点
const koshinetsuHanamiEvents = [
  {
    id: 'koshinetsu-hanami-25973',
    name: '山高神代桜',
    location: '山梨県・北杜市',
    viewingSeason: '3月下旬',
    wantToVisit: 447,
    haveVisited: 452,
    description:
      '日本最古・最大級のエドヒガンザクラとして国の天然記念物に指定されている樹齢約2000年の巨桜。',
    likes: 899,
    category: '花见会',
    rank: 1,
    detailLink: 'https://hanami.walkerplus.com/detail/ar0419e25973/',
    sakuraVariety: 'エドヒガン',
    prefecture: '山梨县',
    peakTime: '3月下旬',
    features: ['🌸 天然記念物', '🌸 エドヒガン', '⏰ 樹齢2000年'],
  },
  {
    id: 'koshinetsu-hanami-60571',
    name: '弘法山古墳の桜',
    location: '長野県・松本市',
    viewingSeason: '4月上旬～4月中旬',
    wantToVisit: 69,
    haveVisited: 61,
    description:
      '4000本の桜が山全体を桜色に染め上げる絶景スポット。古墳と桜の美しいコントラストが楽しめる。',
    likes: 130,
    category: '花见会',
    rank: 2,
    detailLink: 'https://hanami.walkerplus.com/detail/ar0420e60571/',
    sakuraVariety: 'ソメイヨシノ',
    prefecture: '长野县',
    peakTime: '4月上旬～4月中旬',
    features: ['🏛️ 古墳', '🌸 4000本桜', '🏔️ 山全体'],
  },
  {
    id: 'koshinetsu-hanami-60570',
    name: '光城山の桜',
    location: '長野県・安曇野市',
    viewingSeason: '4月上旬〜4月中旬',
    wantToVisit: 35,
    haveVisited: 29,
    description:
      '咲き上がる光景が「昇り竜」に例えられる名所。山頂から麓へと続く桜並木が圧巻。',
    likes: 64,
    category: '花见会',
    rank: 3,
    detailLink: 'https://hanami.walkerplus.com/detail/ar0420e60570/',
    sakuraVariety: 'ソメイヨシノ',
    prefecture: '长野县',
    peakTime: '4月上旬〜4月中旬',
    features: ['🐉 昇り竜', '🌸 桜並木', '🏔️ 山頂麓'],
  },
  {
    id: 'koshinetsu-hanami-25978',
    name: '国宝 松本城の桜',
    location: '長野県・松本市',
    viewingSeason: '3月下旬～4月上旬',
    wantToVisit: 24,
    haveVisited: 23,
    description:
      '国宝に美しく映える桜の絶景スポット。黒い天守閣と桜のコントラストが見事。',
    likes: 47,
    category: '花见会',
    rank: 4,
    detailLink: 'https://hanami.walkerplus.com/detail/ar0420e25978/',
    sakuraVariety: 'ソメイヨシノ',
    prefecture: '长野县',
    peakTime: '3月下旬～4月上旬',
    features: ['🏯 国宝', '🌸 城樱', '⚫ 黒天守閣'],
  },
  {
    id: 'koshinetsu-hanami-25961',
    name: '身延山久遠寺の桜',
    location: '山梨県・南巨摩郡身延町',
    viewingSeason: '3月下旬～4月上旬',
    wantToVisit: 445,
    haveVisited: 440,
    description:
      '樹齢400年のしだれ桜が咲く日蓮宗総本山。歴史ある寺院と古桜の厳かな美しさ。',
    likes: 885,
    category: '花见会',
    rank: 5,
    detailLink: 'https://hanami.walkerplus.com/detail/ar0419e25961/',
    sakuraVariety: 'しだれ桜',
    prefecture: '山梨县',
    peakTime: '3月下旬～4月上旬',
    features: ['⛩️ 日蓮宗総本山', '🌸 しだれ桜', '⏰ 樹齢400年'],
  },
  {
    id: 'koshinetsu-hanami-60211',
    name: '妙了寺の桜',
    location: '山梨県・南アルプス市',
    viewingSeason: '3月下旬～4月上旬',
    wantToVisit: 18,
    haveVisited: 8,
    description:
      '火災を逃れた樹齢100年超のしだれ桜が見事。静寂な寺院に響く桜の美しさ。',
    likes: 26,
    category: '花见会',
    rank: 6,
    detailLink: 'https://hanami.walkerplus.com/detail/ar0419e60211/',
    sakuraVariety: 'しだれ桜',
    prefecture: '山梨县',
    peakTime: '3月下旬～4月上旬',
    features: ['⛩️ 静寂寺院', '🌸 しだれ桜', '🔥 火災を逃れた'],
  },
  {
    id: 'koshinetsu-hanami-25998',
    name: '大西公園の桜',
    location: '長野県・下伊那郡大鹿村',
    viewingSeason: '4月上旬～4月中旬',
    wantToVisit: 7,
    haveVisited: 6,
    description:
      '赤石岳を背景に大西公園の桜が咲き誇る山間の隠れた名所。自然豊かな環境での花見。',
    likes: 13,
    category: '花见会',
    rank: 7,
    detailLink: 'https://hanami.walkerplus.com/detail/ar0420e25998/',
    sakuraVariety: 'ソメイヨシノ',
    prefecture: '长野县',
    peakTime: '4月上旬～4月中旬',
    features: ['🏞️ 隠れた名所', '🏔️ 赤石岳背景', '🌿 自然豊か'],
  },
  {
    id: 'koshinetsu-hanami-60180',
    name: '光前寺のしだれ桜',
    location: '長野県・駒ヶ根市',
    viewingSeason: '4月上旬～4月中旬',
    wantToVisit: 27,
    haveVisited: 23,
    description:
      '幽玄なる春宵一刻値千金の夜桜。ライトアップされたしだれ桜が幻想的な美しさを演出。',
    likes: 50,
    category: '花见会',
    rank: 8,
    detailLink: 'https://hanami.walkerplus.com/detail/ar0420e60180/',
    sakuraVariety: 'しだれ桜',
    prefecture: '长野县',
    peakTime: '4月上旬～4月中旬',
    features: ['⛩️ 古寺', '🌙 夜桜ライトアップ', '✨ 幻想的'],
  },
  {
    id: 'koshinetsu-hanami-25901',
    name: '大河津分水桜並木',
    location: '新潟県・燕市',
    viewingSeason: '4月上旬～4月中旬',
    wantToVisit: 6,
    haveVisited: 6,
    description:
      '「日本さくら名所100選」に数えられる見事な桜並木。信濃川沿いの桜トンネルが美しい。',
    likes: 12,
    category: '花见会',
    rank: 9,
    detailLink: 'https://hanami.walkerplus.com/detail/ar0415e25901/',
    sakuraVariety: 'ソメイヨシノ',
    prefecture: '新潟县',
    peakTime: '4月上旬～4月中旬',
    features: ['🌸 名所100選', '🌉 桜トンネル', '🌊 信濃川沿い'],
  },
  {
    id: 'koshinetsu-hanami-60124',
    name: '湯沢中央公園の桜',
    location: '新潟県・南魚沼郡湯沢町',
    viewingSeason: '4月中旬～5月上旬',
    wantToVisit: 8,
    haveVisited: 9,
    description:
      '公園の中で楽しめる桜はゴールデンウイークが見頃。雪国ならではの遅咲きの桜。',
    likes: 17,
    category: '花见会',
    rank: 10,
    detailLink: 'https://hanami.walkerplus.com/detail/ar0415e60124/',
    sakuraVariety: 'ソメイヨシノ',
    prefecture: '新潟县',
    peakTime: '4月中旬～5月上旬',
    features: ['🏞️ 公園', '❄️ 雪国桜', '🌸 GW見頃'],
  },
];

const regionConfig = {
  name: 'koshinetsu',
  displayName: '甲信越',
  emoji: '⛰️',
  description: '山梨・長野・新潟の美しい花見景点',
  navigationLinks: {
    prev: { name: '北关东', url: '/kitakanto/hanami', emoji: '🏔️' },
    next: { name: '东京都', url: '/tokyo/hanami', emoji: '🗼' },
    current: { name: '甲信越', url: '/koshinetsu' },
  },
};

export default function KoshinetsuHanamiPage() {
  return (
    <HanamiPageTemplate
      region={regionConfig}
      events={koshinetsuHanamiEvents}
      regionKey="koshinetsu"
      activityKey="hanami"
      pageTitle="甲信越花见会活动列表"
      pageDescription="⛰️甲信越花见会🌸 体验山梨・長野・新潟最美樱花盛开，感受信州高原的春日浪漫。"
    />
  );
}
