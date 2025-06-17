import { HanabiData } from '@/types/hanabi';

export const ichikawaShinmeiHanabiData: HanabiData = {
  id: 'ichikawa-shinmei-hanabi-2024',
  name: '市川三郷町故乡夏祭典　第37回「神明的花火大会」',
  _sourceData: {
    japaneseDescription: '市川三郷町和夏祭典　第37回「神明的花火大会」',
      japaneseName: '市川三郷町和夏祭典　第37回「神明的花火大会」',
  },
  englishName: 'Ichikawamisato Hometown Summer Festival 37th Shinmei Fireworks',
  year: 2025,
  date: '2025年8月7日',
  time: '19:15～21:00',
  duration: '85分',
  fireworksCount: '約2万発',
  expectedVisitors: '約20万人',
  weather: '雨天决行、恶劣天气時翌日在延期',
  ticketPrice: '有料観覧席有',
  status: '举办予定',
  themeColor: '#FF6B35',
  title: '市川三郷町故乡夏祭典　第37回「神明的花火大会」',
  description:
    '音楽和彩約2万発的夜空的芸術。性的节目構成的特徴的在、音楽和花火的在見者在感動将与山梨県内的大規模的花火大会。',
  tags: {
    timeTag: '8月',
    regionTag: '甲信越',
    typeTag: '花火',
    layerTag: '详细介绍',
  },
  month: 8,
  venues: [
    {
      name: '三郡橋下流笛吹川河畔',
      location: '山梨県西八代郡市川三郷町 三郡橋下流笛吹川河畔',
      startTime: '19:15',
      features: ['音楽花火', '性节目', '約2万発的大規模花火'],
    },
  ],
  access: [
    {
      venue: '三郡橋下流笛吹川河畔',
      stations: [
        {
          name: 'JR市川大門駅',
          lines: ['JR身延線'],
          walkTime: '徒歩10分',
        },
      ],
    },
  ],
  viewingSpots: [
    {
      name: '有料観覧席',
      rating: 5,
      crowdLevel: 'high',
      tips: '音楽和花火的将最高的位置在楽',
      pros: ['最佳視角', '音響設備完善', '座席舒適'],
      cons: ['需要預約', '價格較高'],
    },
    {
      name: '無料観覧区域',
      rating: 4,
      crowdLevel: 'high',
      tips: '早的場所取的必要',
      pros: ['無料観覧', '自由度高'],
      cons: ['人群擁擠', '場所取競争激烈'],
    },
  ],
  history: {
    established: 1988,
    significance: '山梨県内的大規模花火大会、音楽和花火的融合',
    highlights: [
      '約2万発的大規模花火',
      '性的节目構成',
      '音楽和花火的',
      '山梨県内最大級的規模',
    ],
  },
  tips: [
    {
      category: '観賞時機',
      items: [
        '音楽和花火的的最大的見这',
        '性的节目構成将楽',
      ],
    },
    {
      category: '票務信息',
      items: ['有料観覧席是事前予約制', '無料観覧区域是早的場所取的必要'],
    },
    {
      category: '準備事項',
      items: ['夏的夜間在也虫除対策将', '会場周辺是交通規制有'],
    },
  ],
  mapInfo: {
    hasMap: true,
    mapNote: '三郡橋下流笛吹川河畔在举办',
    parking: '4000台無料、有料事前予約有',
  },
  weatherInfo: {
    month: '8月',
    temperature: '日間30°C，夜間25°C',
    humidity: '70-80%',
    rainfall: '夏季雷雨可能',
    recommendation: '雨天决行、恶劣天气時翌日在延期',
  },
  contact: {
    organizer: '市川三郷町故乡夏祭典実行委員会',
    phone: '055-272-1101',
    website: 'https://www.town.ichikawamisato.yamanashi.jp/shinmei/',
    socialMedia: '@shinmeinohanabi',
  },
  // 官方数据源验证
  officialSource: {
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0419e00910/',
    verificationDate: '2025-06-14',
    dataConfirmedBy: 'USER_PROVIDED' as const,
    lastChecked: '2025-06-14',
  },
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3222.8!2d138.5!3d35.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDM2JzAwLjAiTiAxMzjCsDMwJzAwLjAiRQ!5e0!3m2!1sja!2sjp!4v1234567890123!5m2!1sja!2sjp',
  website: 'https://www.town.ichikawamisato.yamanashi.jp/shinmei/',
  related: {
    regionRecommendations: [
      {
        id: 'kawaguchiko-kojosai-2025',
        name: '河口湖湖上祭',
        date: '8月5日',
        location: '山梨県河口湖',
        visitors: '約12万人',
        link: '/koshinetsu/hanabi/kawaguchiko-kojosai-2025',
      },
    ],
    timeRecommendations: [
      {
        id: 'nagaoka-matsuri-hanabi',
        name: '長岡祭典大花火大会',
        date: '8月2日',
        location: '新潟県長岡市',
        visitors: '約100万人',
        link: '/koshinetsu/hanabi/nagaoka',
      },
    ],
  },
};
