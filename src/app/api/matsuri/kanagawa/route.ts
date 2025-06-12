import { NextResponse } from 'next/server';

// 添加静态导出配置
export const dynamic = 'force-static';

export async function GET() {
  try {
    const matsuriEvents = [
      {
        id: 'kamakura-matsuri',
        name: '镰仓祭',
        japaneseName: '鎌倉まつり',
        englishName: 'Kamakura Festival',
        dates: '2025年4月第2-3周日',
        location: '鹤岡八幡宫及镰仓市内',
        description: '从1959年开始延续至今的镰仓春季一大盛事，以静御前的"静之舞"为核心，展现镰仓历史文化传统的综合性祭典。',
        features: [
          '静御前的传统舞蹈表演',
          '武士行列游行巡回',
          '流镝马骑射表演',
          '野点茶道体验'
        ],
        website: 'https://www.trip-kamakura.com/',
        prefecture: '神奈川县',
        city: '镰仓市',
        category: 'traditional',
        likes: 245,
        period: 'spring',
        scale: 'large',
        historicalSignificance: '66年传统',
        crowdLevel: '约8万人',
        accessibility: '镰仓车站步行10分钟'
      },
      {
        id: 'shonan-hiratsuka-tanabata',
        name: '湘南平塚七夕祭',
        japaneseName: '湘南ひらつか七夕まつり',
        englishName: 'Shonan Hiratsuka Tanabata Festival',
        dates: '2025年7月4日-6日',
        location: '平塚市中心街',
        description: '关东三大七夕祭之一，华丽的七夕装饰和各种活动吸引众多游客，是夏季湘南地区的代表性祭典。',
        features: [
          '华丽的七夕竹饰',
          '传统艺能表演',
          '地域美食摊位',
          '夜间灯光装饰'
        ],
        website: 'https://www.tanabata-hiratsuka.com/',
        prefecture: '神奈川县',
        city: '平塚市',
        category: 'traditional',
        likes: 178,
        period: 'summer',
        scale: 'large',
        historicalSignificance: '70年以上传统',
        crowdLevel: '约130万人',
        accessibility: '平塚车站步行2分钟'
      },
      {
        id: 'chigasaki-hamaori-matsuri',
        name: '茅崎海岸滨降祭',
        japaneseName: '茅ヶ崎海岸浜降祭',
        englishName: 'Chigasaki Beach Festival',
        dates: '2025年7月海之日',
        location: '茅崎西海岸',
        description: '神轿入海的壮观场面闻名全国，是神奈川县夏季最具震撼力的海洋祭典，展现湘南海岸独特的祭典文化。',
        features: [
          '神轿冲入大海',
          '海岸线游行队伍',
          '传统囃子演奏',
          '海滨祈福仪式'
        ],
        website: 'https://www.chigasaki-kankou.org/',
        prefecture: '神奈川县',
        city: '茅崎市',
        category: 'traditional',
        likes: 156,
        period: 'summer',
        scale: 'medium',
        historicalSignificance: '200年以上传统',
        crowdLevel: '约15万人',
        accessibility: '茅崎车站步行15分钟'
      },
      {
        id: 'kanagawa-yamato-awa-odori',
        name: '神奈川大和阿波踊',
        japaneseName: '神奈川大和阿波踊り',
        englishName: 'Kanagawa Yamato Awa Odori',
        dates: '2025年7月26日-27日',
        location: '大和市中央林间',
        description: '关东地区最大规模的阿波踊祭典，各地连队云集，在夏夜中展现传统舞蹈的魅力和热情。',
        features: [
          '关东最大阿波踊',
          '全国连队参加',
          '街头舞蹈游行',
          '传统音乐演奏'
        ],
        website: 'https://www.yamatoawa.com/',
        prefecture: '神奈川县',
        city: '大和市',
        category: 'traditional',
        likes: 134,
        period: 'summer',
        scale: 'large',
        historicalSignificance: '40年传统',
        crowdLevel: '约35万人',
        accessibility: '中央林间车站步行5分钟'
      },
      {
        id: 'hakone-daimyo-gyoretsu',
        name: '箱根大名行列',
        japaneseName: '箱根大名行列',
        englishName: 'Hakone Daimyo Procession',
        dates: '2025年11月3日文化日',
        location: '箱根汤本-元箱根',
        description: '重现江户时代大名参勤交代的壮观行列，沿着东海道箱根旧街道进行，是箱根秋季的经典文化活动。',
        features: [
          '江户时代服装游行',
          '武士队列表演',
          '传统工艺展示',
          '历史文化体验'
        ],
        website: 'https://www.hakone.or.jp/',
        prefecture: '神奈川县',
        city: '箱根町',
        category: 'traditional',
        likes: 98,
        period: 'autumn',
        scale: 'medium',
        historicalSignificance: '50年以上传统',
        crowdLevel: '约4万人',
        accessibility: '箱根汤本车站步行即到'
      }
    ];

    return NextResponse.json(matsuriEvents);
  } catch (error) {
    console.error('Failed to fetch Kanagawa matsuri data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch matsuri data' },
      { status: 500 }
    );
  }
} 