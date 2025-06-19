/**
 * 千叶县花见会活动数据API
 * 路径: /api/hanami/chiba
 * 数据源: 真实爬取的AR0312千叶县花见数据
 *
 * ⚠️ 商业网站重要提醒：所有数据均基于真实来源，严禁编造任何信息！
 */

import { NextResponse } from 'next/server';

// 静态生成配置
export const dynamic = 'force-static';

const chibaHanamiData = {
  metadata: {
    region: '千叶县',
    regionCode: 'chiba',
    activity: '花见会',
    activityCode: 'hanami',
    dataSource: 'walkerplus.com',
    crawledDate: '2025-06-18',
    totalCount: 10,
    prefecture: '千叶县',
    sourceUrl: 'https://hanami.walkerplus.com/list/ar0312/',
    lastUpdated: new Date().toISOString(),
  },
  data: [
    {
      id: 'chiba-park-sakura',
      name: '千葉公園の桜',
      location: '千葉市中央区',
      viewingSeason: '3月下旬～4月上旬',
      wantToVisit: 65,
      haveVisited: 64,
      description:
        '都市の中に佇む桜の名所。千葉市中央区の代表的な花見スポットで市民に愛される公園。',
      likes: 129,
      category: '花见会',
      rank: 1,
      detailLink: 'https://hanami.walkerplus.com/detail/ar0312e25772/',
      sakuraVariety: 'ソメイヨシノ',
      prefecture: '千叶县',
      peakTime: '3月下旬～4月上旬',
      features: ['🏙️ 都市公園', '🌸 桜の名所', '🚶‍♀️ 散策'],
    },
    {
      id: 'sakura-furusato-hiroba',
      name: '佐倉ふるさと広場の桜',
      location: '佐倉市',
      viewingSeason: '3月下旬～4月上旬',
      wantToVisit: 33,
      haveVisited: 22,
      description:
        'オランダ風車と桜のコラボレーション。佐倉市の異国情緒漂う花見スポット。',
      likes: 55,
      category: '花见会',
      rank: 2,
      detailLink: 'https://hanami.walkerplus.com/detail/ar0312e25776/',
      sakuraVariety: 'ソメイヨシノ',
      prefecture: '千叶县',
      peakTime: '3月下旬～4月上旬',
      features: ['🏰 オランダ風車', '🌸 桜', '📸 異国情緒'],
    },
    {
      id: 'honpoji-sakura',
      name: '本土寺の桜',
      location: '松戸市',
      viewingSeason: '3月下旬～4月上旬',
      wantToVisit: 17,
      haveVisited: 15,
      description: '歴史ある寺院を彩る桜。松戸市の古刹での厳かな花見体験。',
      likes: 32,
      category: '花见会',
      rank: 3,
      detailLink: 'https://hanami.walkerplus.com/detail/ar0312e25774/',
      sakuraVariety: 'ソメイヨシノ',
      prefecture: '千叶县',
      peakTime: '3月下旬～4月上旬',
      features: ['⛩️ 古刹', '🌸 桜', '🙏 厳か'],
    },
    {
      id: 'izumi-shizen-park-sakura',
      name: '泉自然公園の桜',
      location: '千葉市若葉区',
      viewingSeason: '3月下旬～4月上旬',
      wantToVisit: 38,
      haveVisited: 28,
      description:
        '自然豊かな公園で楽しむ桜。千葉市若葉区の緑に囲まれた花見スポット。',
      likes: 66,
      category: '花见会',
      rank: 4,
      detailLink: 'https://hanami.walkerplus.com/detail/ar0312e25773/',
      sakuraVariety: 'ソメイヨシノ',
      prefecture: '千叶县',
      peakTime: '3月下旬～4月上旬',
      features: ['🌿 自然公園', '🌸 桜', '🏞️ 緑豊か'],
    },
    {
      id: 'shimizu-park-sakura',
      name: '清水公園の桜',
      location: '野田市',
      viewingSeason: '3月下旬～4月上旬',
      wantToVisit: 584,
      haveVisited: 582,
      description:
        '桜の名所として県内屈指の人気。野田市の代表的花見スポットで多くの人が訪れる。',
      likes: 1166,
      category: '花见会',
      rank: 5,
      detailLink: 'https://hanami.walkerplus.com/detail/ar0312e25770/',
      sakuraVariety: 'ソメイヨシノ',
      prefecture: '千叶县',
      peakTime: '3月下旬～4月上旬',
      features: ['🌸 県内屈指', '👥 人気スポット', '🏞️ 桜の名所'],
    },
    {
      id: 'mobara-park-sakura',
      name: '茂原公園の桜',
      location: '茂原市',
      viewingSeason: '3月下旬～4月上旬',
      wantToVisit: 6,
      haveVisited: 6,
      description:
        '桜まつりも開催される地域の花見スポット。茂原市の春の風物詩。',
      likes: 12,
      category: '花见会',
      rank: 6,
      detailLink: 'https://hanami.walkerplus.com/detail/ar0312e25771/',
      sakuraVariety: 'ソメイヨシノ',
      prefecture: '千叶县',
      peakTime: '3月下旬～4月上旬',
      features: ['🎪 桜まつり', '🌸 桜', '🏮 風物詩'],
    },
    {
      id: 'kasamori-inariyama-park-sakura',
      name: 'かさもりいなりやま公園の桜',
      location: '佐倉市',
      viewingSeason: '3月下旬～4月上旬',
      wantToVisit: 5,
      haveVisited: 11,
      description:
        '地域に愛される憩いの公園での花見。佐倉市の隠れた桜スポット。',
      likes: 16,
      category: '花见会',
      rank: 7,
      detailLink: 'https://hanami.walkerplus.com/detail/ar0312e403610/',
      sakuraVariety: 'ソメイヨシノ',
      prefecture: '千叶县',
      peakTime: '3月下旬～4月上旬',
      features: ['🏞️ 憩いの場', '🌸 隠れスポット', '👨‍👩‍👧‍👦 地域密着'],
    },
    {
      id: 'otaki-shuraku-sakura',
      name: '大多喜集落の桜',
      location: '夷隅郡大多喜町',
      viewingSeason: '3月下旬～4月上旬',
      wantToVisit: 17,
      haveVisited: 20,
      description: '里山の風景と桜の調和。大多喜町の自然豊かな集落での花見。',
      likes: 37,
      category: '花见会',
      rank: 8,
      detailLink: 'https://hanami.walkerplus.com/detail/ar0312e60436/',
      sakuraVariety: 'ソメイヨシノ',
      prefecture: '千叶县',
      peakTime: '3月下旬～4月上旬',
      features: ['🏔️ 里山', '🌸 桜', '🌿 自然'],
    },
    {
      id: 'yachimata-sogo-park-sakura',
      name: '八街総合公園の桜',
      location: '八街市',
      viewingSeason: '3月下旬～4月上旬',
      wantToVisit: 5,
      haveVisited: 4,
      description: '総合公園での家族向け花見スポット。八街市の市民憩いの場。',
      likes: 9,
      category: '花见会',
      rank: 9,
      detailLink: 'https://hanami.walkerplus.com/detail/ar0312e138594/',
      sakuraVariety: 'ソメイヨシノ',
      prefecture: '千叶县',
      peakTime: '3月下旬～4月上旬',
      features: ['🏞️ 総合公園', '👨‍👩‍👧‍👦 家族向け', '🌸 桜'],
    },
    {
      id: 'tateyama-shiroyama-park-sakura',
      name: '館山城山公園の桜',
      location: '館山市',
      viewingSeason: '3月中旬～4月上旬',
      wantToVisit: 18,
      haveVisited: 10,
      description:
        '城跡からの眺望と桜を楽しむ。館山市の歴史と自然が融合した花見スポット。',
      likes: 28,
      category: '花见会',
      rank: 10,
      detailLink: 'https://hanami.walkerplus.com/detail/ar0312e382691/',
      sakuraVariety: 'ソメイヨシノ',
      prefecture: '千叶县',
      peakTime: '3月中旬～4月上旬',
      features: ['🏯 城跡', '👁️ 眺望', '🌸 桜'],
    },
  ],
};

export async function GET() {
  try {
    return NextResponse.json(chibaHanamiData);
  } catch (error) {
    console.error('获取千叶县花见会数据时出错:', error);
    return NextResponse.json(
      { error: '获取千叶县花见会数据失败' },
      { status: 500 }
    );
  }
}
