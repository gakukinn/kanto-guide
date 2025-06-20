/**
 * 神奈川县花见会活动数据API
 * 路径: /api/hanami/kanagawa
 * 数据源: 真实爬取的AR0314神奈川县花见数据
 *
 * ⚠️ 商业网站重要提醒：所有数据均基于真实来源，严禁编造任何信息！
 */

import { NextResponse } from 'next/server';

// 静态生成配置
export const dynamic = 'force-static';

const kanagawaHanamiData = {
  metadata: {
    region: '神奈川县',
    regionCode: 'kanagawa',
    activity: '花见会',
    activityCode: 'hanami',
    dataSource: 'walkerplus.com',
    crawledDate: '2025-06-18',
    totalCount: 10,
    prefecture: '神奈川县',
    sourceUrl: 'https://hanami.walkerplus.com/list/ar0314/',
    lastUpdated: new Date().toISOString(),
  },
  data: [
    {
      id: 'nikaryoyosui-shukugawara-hori-sakura',
      name: '二ヶ領用水宿河原堀の桜',
      location: '川崎市多摩区',
      viewingSeason: '3月下旬～4月上旬',
      wantToVisit: 584,
      haveVisited: 582,
      description:
        '用水路沿いに咲く桜並木。川崎市多摩区の最高人気花见スポットで地域に愛される景観。',
      likes: 1166,
      category: '花见会',
      rank: 1,
      detailLink: 'https://hanami.walkerplus.com/detail/ar0314e25762/',
      sakuraVariety: 'ソメイヨシノ',
      prefecture: '神奈川县',
      peakTime: '3月下旬～4月上旬',
      features: ['🌊 用水路', '🌸 桜並木', '👥 最高人気'],
    },
    {
      id: 'kenritsu-mitsuike-park-sakura',
      name: '県立三ツ池公園の桜',
      location: '横浜市鶴見区',
      viewingSeason: '2月中旬～5月上旬',
      wantToVisit: 6,
      haveVisited: 6,
      description:
        '78品種の桜が長期間楽しめる名所。横浜市鶴見区の桜の多様性を誇る公園。',
      likes: 12,
      category: '花见会',
      rank: 2,
      detailLink: 'https://hanami.walkerplus.com/detail/ar0314e403610/',
      sakuraVariety: '78品種の桜',
      prefecture: '神奈川县',
      peakTime: '2月中旬～5月上旬',
      features: ['🌸 78品種', '📅 長期観賞', '🏞️ 多様性'],
    },
    {
      id: 'kenchoji-sakura',
      name: '建長寺の桜',
      location: '鎌倉市',
      viewingSeason: '3月下旬～4月上旬',
      wantToVisit: 38,
      haveVisited: 28,
      description:
        '鎌倉五山第一位の古刹での花見。鎌倉市の歴史と桜の美しいコラボレーション。',
      likes: 66,
      category: '花见会',
      rank: 3,
      detailLink: 'https://hanami.walkerplus.com/detail/ar0314e60429/',
      sakuraVariety: 'ソメイヨシノ',
      prefecture: '神奈川县',
      peakTime: '3月下旬～4月上旬',
      features: ['⛩️ 鎌倉五山', '🏛️ 古刹', '📿 歴史'],
    },
    {
      id: 'motosumiyoshi-shibukawa-riverside-sakura',
      name: '元住吉渋川沿いの桜',
      location: '川崎市中原区',
      viewingSeason: '3月下旬～4月上旬',
      wantToVisit: 33,
      haveVisited: 22,
      description:
        '川沿いの桜並木で都市の中の癒しスポット。川崎市中原区の住民憩いの場。',
      likes: 55,
      category: '花见会',
      rank: 4,
      detailLink: 'https://hanami.walkerplus.com/detail/ar0314e25768/',
      sakuraVariety: 'ソメイヨシノ',
      prefecture: '神奈川县',
      peakTime: '3月下旬～4月上旬',
      features: ['🌊 川沿い', '🌸 桜並木', '🏙️ 都市の癒し'],
    },
    {
      id: 'tsurugaoka-hachimangu-sakura',
      name: '鶴岡八幡宮の桜',
      location: '鎌倉市',
      viewingSeason: '3月下旬～4月上旬',
      wantToVisit: 17,
      haveVisited: 15,
      description:
        '鎌倉のシンボル的神社での神聖な花见体験。鎌倉市の代表的観光スポット。',
      likes: 32,
      category: '花见会',
      rank: 5,
      detailLink: 'https://hanami.walkerplus.com/detail/ar0314e25764/',
      sakuraVariety: 'ソメイヨシノ',
      prefecture: '神奈川县',
      peakTime: '3月下旬～4月上旬',
      features: ['⛩️ 鎌倉シンボル', '🌸 神聖', '📸 観光名所'],
    },
    {
      id: 'shonan-hiratsuka-beach-park-sakura',
      name: '湘南ひらつかビーチパークの桜',
      location: '平塚市',
      viewingSeason: '3月下旬～4月上旬',
      wantToVisit: 5,
      haveVisited: 11,
      description: '海辺で楽しむ桜の風景。平塚市の湘南の海と桜のコントラスト。',
      likes: 16,
      category: '花见会',
      rank: 6,
      detailLink: 'https://hanami.walkerplus.com/detail/ar0314e60428/',
      sakuraVariety: 'ソメイヨシノ',
      prefecture: '神奈川县',
      peakTime: '3月下旬～4月上旬',
      features: ['🌊 海辺', '🌸 桜', '🏖️ 湘南'],
    },
    {
      id: 'odawara-castle-park-sakura',
      name: '小田原城址公園の桜',
      location: '小田原市',
      viewingSeason: '3月下旬～4月上旬',
      wantToVisit: 17,
      haveVisited: 20,
      description:
        '戦国時代の面影を残す城跡での花见。小田原市の歴史ロマンと桜の共演。',
      likes: 37,
      category: '花见会',
      rank: 7,
      detailLink: 'https://hanami.walkerplus.com/detail/ar0314e60436/',
      sakuraVariety: 'ソメイヨシノ',
      prefecture: '神奈川县',
      peakTime: '3月下旬～4月上旬',
      features: ['🏯 戦国城跡', '📚 歴史ロマン', '🌸 桜'],
    },
    {
      id: 'sagami-lake-forest-park-sakura',
      name: '県立相模湖公園の桜',
      location: '相模原市緑区',
      viewingSeason: '3月下旬～4月上旬',
      wantToVisit: 5,
      haveVisited: 4,
      description:
        '湖畔で楽しむ自然豊かな花见。相模原市緑区の山間リゾート気分。',
      likes: 9,
      category: '花见会',
      rank: 8,
      detailLink: 'https://hanami.walkerplus.com/detail/ar0314e138594/',
      sakuraVariety: 'ソメイヨシノ',
      prefecture: '神奈川县',
      peakTime: '3月下旬～4月上旬',
      features: ['🏔️ 湖畔', '🌿 自然豊か', '🏖️ リゾート'],
    },
    {
      id: 'yamashita-park-sakura',
      name: '山下公園の桜',
      location: '横浜市中区',
      viewingSeason: '3月下旬～4月上旬',
      wantToVisit: 65,
      haveVisited: 64,
      description:
        '横浜港を望む海浜公園での花见。横浜市中区の港町風情と桜の融合。',
      likes: 129,
      category: '花见会',
      rank: 9,
      detailLink: 'https://hanami.walkerplus.com/detail/ar0314e25759/',
      sakuraVariety: 'ソメイヨシノ',
      prefecture: '神奈川县',
      peakTime: '3月下旬～4月上旬',
      features: ['🛳️ 横浜港', '🌊 海浜公園', '🏙️ 港町風情'],
    },
    {
      id: 'koganei-park-sakura',
      name: '小金井公園の桜',
      location: '小金井市',
      viewingSeason: '3月中旬～4月上旬',
      wantToVisit: 18,
      haveVisited: 10,
      description:
        '広大な都立公園で憩う桜。小金井市の自然豊かな大型公園での花见。',
      likes: 28,
      category: '花见会',
      rank: 10,
      detailLink: 'https://hanami.walkerplus.com/detail/ar0314e382691/',
      sakuraVariety: 'ソメイヨシノ',
      prefecture: '神奈川县',
      peakTime: '3月中旬～4月上旬',
      features: ['🏞️ 広大公園', '🌸 桜', '🌿 自然豊か'],
    },
  ],
};

export async function GET() {
  try {
    return NextResponse.json(kanagawaHanamiData);
  } catch (error) {
    console.error('获取神奈川县花见会数据时出错:', error);
    return NextResponse.json(
      { error: '获取神奈川县花见会数据失败' },
      { status: 500 }
    );
  }
}
