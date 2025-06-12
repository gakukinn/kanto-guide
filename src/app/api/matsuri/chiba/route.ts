import { NextResponse } from 'next/server';

// 添加静态导出配置
export const dynamic = 'force-static';

export async function GET() {
  try {
    const matsuriEvents = [
      {
        id: 'narita-gion-matsuri',
        name: '成田祇园祭',
        japaneseName: '成田祇園祭',
        dates: '2025年7月11日-13日',
        location: '成田山新勝寺、成田车站附近',
        description: '拥有300年以上历史的传统祭典，向成田山新勝寺的大日如来祈福五谷丰收、国泰民安、万事如愿。每年约45万人参加的盛大祭典。',
        features: [
          '10座豪华绚烂的山车、屋台与1座神轿',
          '表参道坡道的壮勇拖轿表演',
          '最终的神轿回驾总舞蹈'
        ],
        website: 'https://www.naritasan.or.jp/',
        prefecture: '千叶县',
        city: '成田市',
        category: 'traditional',
        likes: 189,
        period: 'summer',
        scale: 'large',
        historicalSignificance: '300年以上传统',
        crowdLevel: '约45万人',
        accessibility: '成田车站步行10分钟'
      },
      {
        id: 'sawara-no-taisai',
        name: '佐原大祭',
        japaneseName: '佐原の大祭',
        dates: '夏祭：2025年7月18日-20日；秋祭：2025年10月10日-12日',
        location: '千叶县香取市佐原',
        description: '约300年历史的传统祭典，联合国无形文化遗产，日本国家重要无形民俗文化财。在被称为小江户的水乡佐原老街中举行。',
        features: [
          '夏祭10台山车与秋祭14台山车',
          '高达6-7米的巨大人形台车',
          '江户时代知名人形师作品'
        ],
        website: 'https://www.city.katori.lg.jp/',
        prefecture: '千叶县',
        city: '香取市',
        category: 'traditional',
        likes: 156,
        period: 'summer-autumn',
        scale: 'large',
        historicalSignificance: '300年传统，联合国无形文化遗产',
        crowdLevel: '数万人',
        accessibility: '佐原车站步行15分钟'
      },
      {
        id: 'yaegaki-gion-matsuri',
        name: '八重垣神社祇园祭',
        japaneseName: '八重垣神社祇園祭',
        dates: '2025年8月4日-5日',
        location: '千叶县匝瑳市八日町市场车站前、八重垣神社',
        description: '超过300年历史的传统祭典，以八重垣神社为中心，附近10个町约20座神轿集合游境的夏日祭典。',
        features: [
          '女性抬神轿的特色表演',
          '沿路泼水祈福活动',
          '独特的笛子与太鼓伴奏'
        ],
        website: 'https://www.city.sosa.lg.jp/',
        prefecture: '千叶县',
        city: '匝瑳市',
        category: 'traditional',
        likes: 92,
        period: 'summer',
        scale: 'medium',
        historicalSignificance: '300年以上传统',
        crowdLevel: '数千人',
        accessibility: '八日市场车站步行5分钟'
      },
      {
        id: 'ohara-hadaka-matsuri',
        name: '大原裸祭',
        japaneseName: '大原はだか祭',
        dates: '2025年9月23日-24日',
        location: '千叶县夷隅市大原海港、大原海水浴场',
        description: '160年前就存在的祭典，裸男与猛男抬着神轿的壮勇祭典。18座神轿冲向大原海水浴场的震撼场面令人难忘。',
        features: [
          '18座神轿冲向海水浴场',
          '裸男抬神轿的壮观场面',
          '大原中央商店街游境'
        ],
        website: 'https://www.city.isumi.lg.jp/',
        prefecture: '千叶县',
        city: '夷隅市',
        category: 'traditional',
        likes: 134,
        period: 'autumn',
        scale: 'large',
        historicalSignificance: '160年传统',
        crowdLevel: '数万人',
        accessibility: '大原车站步行10分钟'
      },
      {
        id: 'katsura-minato-matsuri',
        name: '木更津港祭',
        japaneseName: '木更津港まつり',
        dates: '2025年8月16日-17日',
        location: '千叶县木更津市木更津港周边',
        description: '木更津港的夏季传统祭典，以木更津港为中心举行的热闹祭典活动，展现港町文化。',
        features: [
          '港町传统文化展示',
          '海鲜美食摊位',
          '木更津踊舞表演'
        ],
        website: 'https://www.city.kisarazu.lg.jp/',
        prefecture: '千叶县',
        city: '木更津市',
        category: 'traditional',
        likes: 78,
        period: 'summer',
        scale: 'medium',
        historicalSignificance: '港町传统祭典',
        crowdLevel: '数千人',
        accessibility: '木更津车站步行15分钟'
      }
    ];

    return NextResponse.json(matsuriEvents);
  } catch (error) {
    console.error('Error fetching matsuri events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch matsuri events' },
      { status: 500 }
    );
  }
} 