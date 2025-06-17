import { HanabiData } from '@/types/hanabi';

export const josoKinugawaHanabiData: HanabiData = {
  id: 'joso-kinugawa-hanabi-2025',
  name: '第58回 常総きぬ川花火大会',
  _sourceData: {
    japaneseName: '第58回 常總きぬ川花火大会',
    japaneseDescription:
      '日本屈指の名花火師の競演による茨城県常総市の代表的花火大会',
  },
  englishName: '58th Joso Kinugawa Fireworks Festival',
  year: 2025,
  date: '2025-09-20',
  displayDate: '2025年9月20日(土)',
  time: '18:05～19:45',
  duration: '約100分',
  fireworksCount: '約2万発',
  expectedVisitors: '約12万人',
  weather: '初秋気候',
  ticketPrice: 'マス席18,000円、イス席6,000円',
  status: '開催予定',
  themeColor: '#FF8C42',
  month: 9,
  walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0308e00248/',

  title: '第58回 常總きぬ川花火大会 | 2025年9月北関東花火大会',
  description:
    '第58回 常總きぬ川花火大会、日本屈指の名花火師による競演、約2万発の花火が鬼怒川夜空を彩る。茨城県常総市、2025年9月20日開催。',

  tags: {
    timeTag: '9月',
    regionTag: '北関東',
    typeTag: '花火',
    layerTag: '詳細紹介',
  },

  related: {
    timeRecommendations: [
      {
        id: 'tonegawa-hanabi',
        name: '第38回利根川大花火大会',
        date: '9月13日',
        location: '茨城県境町',
        visitors: '約30万人',
        link: '/september/hanabi/kitakanto/tonegawa-hanabi',
      },
    ],
    regionRecommendations: [
      {
        id: 'tonegawa-hanabi',
        name: '第38回利根川大花火大会',
        date: '9月13日',
        location: '茨城県境町',
        visitors: '約30万人',
        link: '/september/hanabi/kitakanto/tonegawa-hanabi',
      },
      {
        id: 'oarai-hanabi',
        name: '大洗海上花火大会2025〜千櫓祭〜',
        date: '9月27日',
        location: '茨城県大洗町',
        visitors: '約18万人',
        link: '/september/hanabi/kitakanto/oarai-hanabi',
      },
    ],
  },

  venues: [
    {
      name: '鬼怒川河畔、橋本運動公園',
      location: '茨城県常総市',
      startTime: '18:05開始、19:45終了',
      features: ['河川敷会場', '運動公園隣接', '有料席完備'],
    },
  ],

  access: [
    {
      venue: '鬼怒川河畔、橋本運動公園',
      stations: [
        {
          name: '水海道駅',
          lines: ['関東鉄道'],
          walkTime: '徒歩15分',
        },
      ],
    },
  ],

  viewingSpots: [
    {
      name: '鬼怒川河畔観覧席',
      rating: 5,
      crowdLevel: 'high',
      tips: '最高の観賞位置、有料観覧席の事前予約が必要',
      pros: ['打上場所に最も近い', '視野が開けている', '音響効果抜群'],
      cons: ['人流密集', '有料'],
    },
    {
      name: '橋本運動公園',
      rating: 4,
      crowdLevel: 'medium',
      tips: '比較的ゆったりとした観賞エリア、家族観賞に適している',
      pros: ['設備完備', '駐車便利', '家族向け'],
      cons: ['距離がやや遠い', '視角に制限'],
    },
    {
      name: '鬼怒川対岸',
      rating: 3,
      crowdLevel: 'low',
      tips: '無料観賞エリア、人が少なく静か',
      pros: ['無料観賞', '人流が少ない', '撮影角度が独特'],
      cons: ['距離が遠い', '設備に限り'],
    },
  ],

  tips: [
    {
      category: '交通案内',
      items: [
        '関東鉄道水海道駅の利用がおすすめ、徒歩15分で会場到達',
        '自動車は常磐道谷和原ICを利用、約10分で到達',
        '当日は交通規制あり、早めの出発を推奨',
        '臨時駐車場2000台、有料2000円～3000円/台',
      ],
    },
    {
      category: '観賞攻略',
      items: [
        '有料観覧席にはマス席、イス席など多種選択肢',
        '日本屈指の名花火師による競演が最大の見どころ',
        '青一色に染まる幻想的な夜空の演出',
        '白銀に輝く華やかなスターマインは必見',
      ],
    },
    {
      category: '注意事項',
      items: [
        '荒天時は延期（日程は延期決定後に告知）',
        '会場内はアルコール類・危険物持込禁止',
        '薄手の上着持参推奨、夜間気温低下',
        'ゴミは持ち帰り、環境保護にご協力',
      ],
    },
  ],

  history: {
    established: 1968,
    significance:
      '茨城県常総市の代表的花火大会として、日本屈指の名花火師による競演で知られ、伝統的花火芸術と現代技術の完璧な融合を展現する重要な文化活動。',
    highlights: [
      '第58回常總きぬ川花火大会は1968年創設の歴史ある大会',
      '名花火師の作品多様性で知名、12万人以上の観客を魅了',
      '青一色の幻想的演出と白銀スターマインが伝統特色',
      '約2万発の大規模打上げと100分間の長時間開催が魅力',
    ],
  },

  mapInfo: {
    hasMap: true,
    mapNote: '鬼怒川河畔、橋本運動公園周辺地図',
    parking: '2000台臨時駐車場、有料2000円～3000円/台',
  },

  // Google Maps 嵌入URL（桥本运动公园正确坐标：36.0274614, 139.9852845）
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3222.8!2d139.9852845!3d36.0274614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018a056e237eb91%3A0xd39416e8521d1270!2sHashimoto%20Sports%20Park!5e0!3m2!1szh-CN!2sjp!4v1642000000000!5m2!1szh-CN!2sjp',

  website: 'https://joso-hanabi.jp/',

  contact: {
    organizer: '常總きぬ川花火大会実行委員会',
    phone: '0297-23-9088',
    website: 'https://joso-hanabi.jp/',
    socialMedia: '@joso_hanabi',
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0308e00248/',
  },

  weatherInfo: {
    month: '9月',
    temperature: '初秋涼爽、日中24℃前後、夜間16℃前後',
    humidity: '適中',
    rainfall: '荒天時は延期（日程は延期決定後に告知）',
    recommendation: '薄手の上着持参推奨、防寒対策必要',
    rainPolicy: '荒天時は延期（日程は延期決定後に告知）',
  },

  specialFeatures: {
    scale: '約2万発の大規模花火大会',
    location: '鬼怒川河畔の美しい自然環境',
    tradition: '日本屈指の名花火師による競演',
    atmosphere: '100分間の長時間開催で充実の観賞体験',
    collaboration: '青一色の幻想的演出と華やかなスターマイン',
  },

  officialSource: {
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0308e00248/',
    verificationDate: '2025-01-18',
    dataConfirmedBy: 'USER_PROVIDED',
    lastChecked: '2025-01-18',
  },

  dataIntegrityCheck: {
    hasOfficialSource: true,
    userVerified: true,
    lastValidated: '2025-01-18',
  },

  dataSourceUrl: 'https://hanabi.walkerplus.com/detail/ar0308e00248/',
};
