/**
 * 东京都花见会页面 - 三层页面
 * 路径: /tokyo/hanami
 * 使用: HanamiPageTemplate模板
 * 数据源: 真实爬取的AR0313东京都花见数据
 *
 * ⚠️ 商业网站重要提醒：所有数据均基于真实来源，严禁编造任何信息！
 */

import HanamiPageTemplate from '@/components/HanamiPageTemplate';

// 基于真实爬取数据的东京都花见景点
const tokyoHanamiEvents = [
  {
    id: 'roppongi-hills-mouri-sakura',
    name: '六本木ヒルズ 毛利庭園・六本木さくら坂の桜',
    location: '港区',
    viewingSeason: '3月下旬～4月上旬',
    wantToVisit: 16,
    haveVisited: 12,
    description:
      '歴史ある桜と近代的なビル群のコラボレーション。港区の都心で楽しめる優雅な花見スポット。',
    likes: 28,
    category: '花见会',
    rank: 1,
    detailLink: 'https://hanami.walkerplus.com/detail/ar0313e25848/',
    sakuraVariety: 'ソメイヨシノ',
    prefecture: '东京都',
    peakTime: '3月下旬～4月上旬',
    features: ['🌸 歴史庭園', '🏢 都心ビル群', '🌃 夜桜'],
  },
  {
    id: 'toyama-park-sakura',
    name: '戸山公園の桜',
    location: '新宿区',
    viewingSeason: '3月下旬～4月上旬',
    wantToVisit: 13,
    haveVisited: 18,
    description:
      '山手線内で一番標高の高い箱根山から桜を臨む。新宿区の隠れた花見名所。',
    likes: 31,
    category: '花见会',
    rank: 2,
    detailLink: 'https://hanami.walkerplus.com/detail/ar0313e60564/',
    sakuraVariety: 'ソメイヨシノ',
    prefecture: '东京都',
    peakTime: '3月下旬～4月上旬',
    features: ['🏔️ 箱根山', '🌸 山桜', '👨‍👩‍👧‍👦 家族向け'],
  },
  {
    id: 'meguro-river-sakura',
    name: '目黒川の桜',
    location: '目黒区',
    viewingSeason: '3月下旬～4月上旬',
    wantToVisit: 173,
    haveVisited: 118,
    description:
      '川沿いの両岸にソメイヨシノが咲き競う。東京で最も人気の花見スポットの一つ。',
    likes: 291,
    category: '花见会',
    rank: 3,
    detailLink: 'https://hanami.walkerplus.com/detail/ar0313e25849/',
    sakuraVariety: 'ソメイヨシノ',
    prefecture: '东京都',
    peakTime: '3月下旬～4月上旬',
    features: ['🌊 川沿い桜並木', '🌸 ソメイヨシノ', '📸 撮影スポット'],
  },
  {
    id: 'sumida-kyu-nakagawa-park-sakura',
    name: '墨田区立旧中川水辺公園の桜',
    location: '墨田区',
    viewingSeason: '2月中旬～4月上旬',
    wantToVisit: 61,
    haveVisited: 54,
    description:
      '早咲きから遅咲きまで9種約260本の桜が楽しめる。長期間花見を楽しめるスポット。',
    likes: 115,
    category: '花见会',
    rank: 4,
    detailLink: 'https://hanami.walkerplus.com/detail/ar0313e380311/',
    sakuraVariety: '9種類の桜',
    prefecture: '东京都',
    peakTime: '2月中旬～4月上旬',
    features: ['🌸 9種類の桜', '📅 長期観賞', '🌊 水辺'],
  },
  {
    id: 'chidorigafuchi-ryokudo-sakura',
    name: '千鳥ヶ淵緑道の桜',
    location: '千代田区',
    viewingSeason: '3月下旬～4月上旬',
    wantToVisit: 268,
    haveVisited: 231,
    description:
      '皇居のお濠に枝ぶりの良い桜が咲き誇る。東京を代表する桜の名所。',
    likes: 499,
    category: '花见会',
    rank: 5,
    detailLink: 'https://hanami.walkerplus.com/detail/ar0313e25833/',
    sakuraVariety: 'ソメイヨシノ',
    prefecture: '东京都',
    peakTime: '3月下旬～4月上旬',
    features: ['🏯 皇居お濠', '🚣‍♂️ ボート', '🌸 名所'],
  },
  {
    id: 'kama-no-fuchi-park-sakura',
    name: '釜の淵公園の桜',
    location: '青梅市',
    viewingSeason: '3月下旬～4月上旬',
    wantToVisit: 4,
    haveVisited: 3,
    description:
      '名所として知られる壮麗な桜並木。青梅市の自然豊かな花見スポット。',
    likes: 7,
    category: '花见会',
    rank: 6,
    detailLink: 'https://hanami.walkerplus.com/detail/ar0313e219195/',
    sakuraVariety: 'ソメイヨシノ',
    prefecture: '东京都',
    peakTime: '3月下旬～4月上旬',
    features: ['🌸 桜並木', '🏞️ 自然公園', '🚶‍♂️ 散策'],
  },
  {
    id: 'sumida-park-sakura',
    name: '隅田公園の桜',
    location: '墨田区',
    viewingSeason: '3月中旬～4月上旬',
    wantToVisit: 60,
    haveVisited: 53,
    description:
      '8代将軍・徳川吉宗が造った桜の名所。歴史ある由緒正しい花見スポット。',
    likes: 113,
    category: '花见会',
    rank: 7,
    detailLink: 'https://hanami.walkerplus.com/detail/ar0313e25818/',
    sakuraVariety: 'ソメイヨシノ',
    prefecture: '东京都',
    peakTime: '3月中旬～4月上旬',
    features: ['🏛️ 歴史名所', '👑 徳川吉宗', '🌸 伝統'],
  },
  {
    id: 'kotsukawa-sakura',
    name: '乞田川の桜',
    location: '多摩市',
    viewingSeason: '3月下旬～4月上旬',
    wantToVisit: 6,
    haveVisited: 16,
    description:
      '乞田川の両側に500本以上の桜が咲き誇る。多摩市の川沿い桜並木。',
    likes: 22,
    category: '花见会',
    rank: 8,
    detailLink: 'https://hanami.walkerplus.com/detail/ar0313e25854/',
    sakuraVariety: 'ソメイヨシノ',
    prefecture: '东京都',
    peakTime: '3月下旬～4月上旬',
    features: ['🌊 川沿い', '🌸 500本の桜', '🚶‍♀️ 散歩道'],
  },
  {
    id: 'rikugien-sakura',
    name: '六義園の桜',
    location: '文京区',
    viewingSeason: '3月下旬～4月上旬',
    wantToVisit: 72,
    haveVisited: 70,
    description:
      '流れ落ちる滝のようなしだれ桜は必見。文京区の日本庭園での風雅な花見。',
    likes: 142,
    category: '花见会',
    rank: 9,
    detailLink: 'https://hanami.walkerplus.com/detail/ar0313e26443/',
    sakuraVariety: 'しだれ桜',
    prefecture: '东京都',
    peakTime: '3月下旬～4月上旬',
    features: ['🏯 日本庭園', '🌸 しだれ桜', '💡 ライトアップ'],
  },
  {
    id: 'shinjuku-gyoen-sakura',
    name: '新宿御苑の桜',
    location: '新宿区',
    viewingSeason: '2月中旬～4月中旬',
    wantToVisit: 73,
    haveVisited: 72,
    description:
      '高層ビルと桜のコラボは都心ならでは。新宿区の皇室庭園での格式高い花見。',
    likes: 145,
    category: '花见会',
    rank: 10,
    detailLink: 'https://hanami.walkerplus.com/detail/ar0313e25816/',
    sakuraVariety: '多品種の桜',
    prefecture: '东京都',
    peakTime: '2月中旬～4月中旬',
    features: ['🏢 都心ビル群', '👑 皇室庭園', '🌸 多品種桜'],
  },
];

const regionConfig = {
  name: 'tokyo',
  displayName: '东京都',
  emoji: '🗼',
  description: '日本首都的魅力花见景点',
  navigationLinks: {
    prev: { name: '甲信越', url: '/koshinetsu/hanami', emoji: '⛰️' },
    next: { name: '埼玉县', url: '/saitama/hanami', emoji: '🌸' },
    current: { name: '东京都', url: '/tokyo' },
  },
};

export default function TokyoHanamiPage() {
  return (
    <HanamiPageTemplate
      region={regionConfig}
      events={tokyoHanamiEvents}
      regionKey="tokyo"
      activityKey="hanami"
      pageTitle="东京都花见会活动列表"
      pageDescription="🗼东京都花见会🌸 体验首都最美樱花盛开景色，感受都市与自然交融的春日浪漫。"
    />
  );
}
