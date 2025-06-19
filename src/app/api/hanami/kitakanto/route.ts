/**
 * 北关东花见会活动数据API
 * 路径: /api/hanami/kitakanto
 * 数据源: 真实爬取的北关东三县合并花见数据（茨城AR0308+栃木AR0309+群马AR0310）
 *
 * ⚠️ 商业网站重要提醒：所有数据均基于真实来源，严禁编造任何信息！
 */

import { NextResponse } from 'next/server';

// 静态生成配置
export const dynamic = 'force-static';

const kitaKantoHanamiData = {
  metadata: {
    region: '北关东',
    regionCode: 'kitakanto',
    activity: '花见会',
    activityCode: 'hanami',
    dataSource: 'walkerplus.com',
    crawledDate: '2025-06-18',
    totalCount: 6,
    prefectures: ['茨城县', '栃木县', '群马县'],
    sourceUrls: [
      'https://hanami.walkerplus.com/list/ar0308/',
      'https://hanami.walkerplus.com/list/ar0309/',
      'https://hanami.walkerplus.com/list/ar0310/',
    ],
    lastUpdated: new Date().toISOString(),
  },
  data: [
    {
      id: 'uga-kannon-sakura',
      name: '雨引観音の桜',
      location: '茨城県桜川市',
      viewingSeason: '4月上旬～4月中旬',
      wantToVisit: 38,
      haveVisited: 28,
      description:
        '茨城県内でも指折りの桜の名所。桜川市の山間に佇む観音堂を彩る美しい桜。',
      likes: 66,
      category: '花见会',
      rank: 1,
      detailLink: 'https://hanami.walkerplus.com/detail/ar0308e60429/',
      sakuraVariety: 'ソメイヨシノ',
      prefecture: '茨城县',
      peakTime: '4月上旬～4月中旬',
      features: ['⛩️ 観音堂', '🌸 名所', '🏔️ 山間'],
    },
    {
      id: 'ryugasaki-shidare-zakura',
      name: '龍ケ崎のしだれ桜',
      location: '茨城県龍ケ崎市',
      viewingSeason: '3月下旬～4月上旬',
      wantToVisit: 33,
      haveVisited: 22,
      description:
        '見事なしだれ桜で知られる龍ケ崎市の隠れた名所。春の訪れを告げる美しい景観。',
      likes: 55,
      category: '花见会',
      rank: 2,
      detailLink: 'https://hanami.walkerplus.com/detail/ar0308e25768/',
      sakuraVariety: 'しだれ桜',
      prefecture: '茨城县',
      peakTime: '3月下旬～4月上旬',
      features: ['🌸 しだれ桜', '💎 隠れた名所', '🌅 春の訪れ'],
    },
    {
      id: 'kashinomori-park-sakura',
      name: 'かしの森公園の桜',
      location: '栃木県芳賀郡',
      viewingSeason: '3月下旬～4月上旬',
      wantToVisit: 17,
      haveVisited: 15,
      description:
        '栃木県芳賀郡の自然豊かな公園での花見。地域に愛される憩いのスポット。',
      likes: 32,
      category: '花见会',
      rank: 3,
      detailLink: 'https://hanami.walkerplus.com/detail/ar0309e25764/',
      sakuraVariety: 'ソメイヨシノ',
      prefecture: '栃木县',
      peakTime: '3月下旬～4月上旬',
      features: ['🌿 自然豊か', '🏞️ 公園', '👨‍👩‍👧‍👦 憩いの場'],
    },
    {
      id: 'ohirasan-sakura',
      name: '太平山の桜',
      location: '栃木県栃木市',
      viewingSeason: '3月下旬～4月上旬',
      wantToVisit: 5,
      haveVisited: 11,
      description:
        '栃木市の太平山で楽しむ山桜。眺望と桜を同時に楽しめる絶景スポット。',
      likes: 16,
      category: '花见会',
      rank: 4,
      detailLink: 'https://hanami.walkerplus.com/detail/ar0309e60428/',
      sakuraVariety: '山桜',
      prefecture: '栃木县',
      peakTime: '3月下旬～4月上旬',
      features: ['🏔️ 山桜', '👁️ 眺望', '🌅 絶景'],
    },
    {
      id: 'takasaki-castle-site-park-sakura',
      name: '高崎城址公園の桜',
      location: '群馬県高崎市',
      viewingSeason: '3月下旬～4月上旬',
      wantToVisit: 17,
      haveVisited: 20,
      description:
        '群馬県高崎市の城跡公園での歴史ロマンあふれる花見。桜と歴史の調和。',
      likes: 37,
      category: '花见会',
      rank: 5,
      detailLink: 'https://hanami.walkerplus.com/detail/ar0310e60436/',
      sakuraVariety: 'ソメイヨシノ',
      prefecture: '群马县',
      peakTime: '3月下旬～4月上旬',
      features: ['🏯 城跡', '📚 歴史ロマン', '🌸 桜'],
    },
    {
      id: 'akagi-nanmen-senbon-zakura',
      name: '赤城南面千本桜',
      location: '群馬県前橋市',
      viewingSeason: '4月上旬～4月中旬',
      wantToVisit: 584,
      haveVisited: 582,
      description:
        '群馬県を代表する桜の名所。前橋市の赤城山南面に咲き誇る千本桜の壮観。',
      likes: 1166,
      category: '花见会',
      rank: 6,
      detailLink: 'https://hanami.walkerplus.com/detail/ar0310e25762/',
      sakuraVariety: 'ソメイヨシノ',
      prefecture: '群马县',
      peakTime: '4月上旬～4月中旬',
      features: ['🌸 千本桜', '🏔️ 赤城山', '👑 県代表名所'],
    },
  ],
};

export async function GET() {
  try {
    return NextResponse.json(kitaKantoHanamiData);
  } catch (error) {
    console.error('获取北关东花见会数据时出错:', error);
    return NextResponse.json(
      { error: '获取北关东花见会数据失败' },
      { status: 500 }
    );
  }
}
