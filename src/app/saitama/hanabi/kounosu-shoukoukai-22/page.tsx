import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { Metadata } from 'next';

// SEO元数据配置
export const metadata: Metadata = {
  title: 'Kounosu Shoukoukai 22 - 埼玉花火大会完整攻略',
  description:
    'Kounosu Shoukoukai 22花火大会详细指南，2025年举办。精彩花火表演，绝佳观赏地点。包含交通方式、观赏地点、祭典活动等实用信息。',
  keywords: [
    'Kounosu Shoukoukai 22花火',
    '埼玉花火',
    '花火大会',
    '2025花火',
    '夏季花火',
    '日本祭典',
  ],
  openGraph: {
    title: 'Kounosu Shoukoukai 22 - 埼玉花火大会完整攻略',
    description:
      'Kounosu Shoukoukai 22花火大会详细指南，2025年举办。精彩花火表演，绝佳观赏地点。包含交通方式、观赏地点、祭典活动等实用信息。...',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.kanto-travel-guide.com/saitama/hanabi/kounosu-shoukoukai-22',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/hanabi/kounosu-shoukoukai-22-fireworks.svg',
        width: 1200,
        height: 630,
        alt: 'Kounosu Shoukoukai 22花火大会',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kounosu Shoukoukai 22 - 埼玉花火大会完整攻略',
    description:
      'Kounosu Shoukoukai 22花火大会详细指南，2025年举办。精彩花火表演，绝佳观赏地点。包含交通方式、观赏地点、祭典活动等实用信息。...',
    images: ['/images/hanabi/kounosu-shoukoukai-22-fireworks.svg'],
  },
  alternates: {
    canonical: '/saitama/hanabi/kounosu-shoukoukai-22',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function KounosuShoukoukai22Page() {
  const data = {
    id: 'kounosu-shoukoukai-22',
    name: '燃！商工会青年部！！第22回 这的花火大会',
    _sourceData: {
      japaneseName: '燃！商工会青年部！！第22回 这的花火大会',
      japaneseDescription: '燃！商工会青年部！！第22回 这的花火大会',
    },
    englishName:
      '22nd Konosu Chamber of Commerce Youth Division Fireworks Festival',
    year: 2025,
    date: '2025年10月11日(土)',
    time: '17:30～20:00',
    duration: '150分',
    fireworksCount: '约2万发',
    expectedVisitors: '约60万人',
    weather: '晴天（25℃ / 18℃）',
    ticketPrice: '收费席有',
    status: 'scheduled',
    themeColor: 'red',
    month: 10,
    title: '燃！商工会青年部！！第22回 这的花火大会 | 埼玉县鸿巣市',
    description:
      '埼玉县鸿巣市的商工会青年部、「地区的振興发展和孩子们在梦想和希望的给予」和说愿望的寄托主办。大会志愿者在因此运营的。这的其他、4尺玉1发、3尺玉1发也打有、更在「日本第一的最后连发花火」和呼如果尺玉300連发在构成的表演也压轴。',
    ticketInfo: {
      available: true,
      types: [
        {
          name: '第1会场 蓝色席位升席',
          price: '23,000元（4人席）',
          description: '第1会场的升席门票',
        },
        {
          name: '第1会场 椅子席',
          price: '14,000元（2人席）',
          description: '第1会场的椅子席门票',
        },
        {
          name: '第2会场 蓝色席位升席',
          price: '22,000元（5人席）',
          description: '第2会场的升席门票',
        },
        {
          name: '第2会场 椅子席',
          price: '5,000元（1人席）',
          description: '第2会场的椅子席门票',
        },
      ],
      salesInfo: '门票在着2024年7月1日开始销售',
      notes: [],
    },
    contact: {
      organizer: '鸿巣市商工会青年部',
      phone: '未公开',
      website: 'https://kounosuhanabi.com/',
      socialMedia: '未公开',
    },
    facilities: {
      parking: true,
      foodStalls: true,
      restrooms: true,
      wheelchairAccess: false,
      firstAid: true,
    },
    weatherInfo: {
      month: '10月',
      temperature: '25℃ / 18℃',
      humidity: '60%',
      rainfall: '较少',
      recommendation: '秋的气候在观赏在适合',
      note: '夜间变冷可能性的为了外套携带推荐',
    },
    tags: {
      timeTag: '10月',
      regionTag: '埼玉县',
      typeTag: '花火',
      layerTag: 'Layer 4詳情页',
    },
    related: {
      regionRecommendations: [],
      timeRecommendations: [],
      sameMonth: ['higashimatsuyama'],
      sameRegion: ['todabashi', 'asaka', 'kumagaya'],
      recommended: ['todabashi', 'asaka'],
    },
    venues: [
      {
        name: '糠田运动场荒川河川敷',
        location: '埼玉县鸿巣市',
        startTime: '17:30',
        features: ['大规模会场', '河川敷'],
      },
    ],
    access: [
      {
        venue: '糠田运动场荒川河川敷',
        stations: [
          {
            name: '鸿巣駅',
            lines: ['JR高崎線'],
            walkTime: '步行30分',
          },
        ],
      },
    ],
    viewingSpots: [
      {
        name: '第1会场',
        rating: 5,
        crowdLevel: '非常在拥挤',
        tips: '收费席推荐',
        pros: ['最高的视野', '气势満点'],
        cons: ['拥挤', '收费'],
      },
      {
        name: '第2会场',
        rating: 4,
        crowdLevel: '拥挤',
        tips: '相对合理',
        pros: ['性价比良好', '视野良好'],
        cons: ['稍微远'],
      },
    ],
    history: {
      established: 2002,
      significance:
        '商工会青年部在由志愿者运营的手工制作花火大会和着开始、现在在60万人訪大规模活动在成长',
      highlights: [
        '2014年在吉尼斯记录认定的世界第一重的4尺玉的发射',
        '志愿者在由全国在也罕见手工制作的大会',
        '日本第一的最后连发花火300連发',
      ],
    },
    tips: [
      {
        category: '交通',
        items: [
          'JR鸿巣駅从步行30分',
          '关越道东松山IC从约39分',
          '停车场2000台有（3000元〜/1日）',
        ],
      },
      {
        category: '观赏',
        items: [
          '收费席的提前购买的强烈推荐',
          '往年30分提前举办在注意',
          '交通管制16:30～预定',
        ],
      },
    ],
    mapInfo: {
      hasMap: true,
      mapNote: '糠田运动场荒川河川敷周边',
      parking: '2000台（3000元〜/1日、部分赞助者免费）',
    },
    specialFeatures: {
      scale: '约60万人的观众和约2万发的花火',
      location: '荒川河川敷的广阔的会场',
      tradition: '商工会青年部在由手工制作的大会',
      atmosphere: '志愿者精神充满温馨的氛围',
      collaboration: '地区居民和的合作在由运营',
    },
    special2025: {
      theme: '地区振興和孩子们的梦想',
      concept: '手工制作的温暖和世界记录的气势的融合',
      features: [
        '吉尼斯记录4尺玉的发射',
        '日本第一的最后连发花火300連发',
        '志愿者在由心的这也了运营',
      ],
    },
    media: [
      {
        type: 'image' as const,
        url: '/images/hanabi/kounosu-hero.jpg',
        title: '4尺玉的气势的发射',
        description: '吉尼斯记录在认定了世界第一重的4尺玉的瞬间',
        alt: '燃！商工会青年部！！第22回 这的花火大会 4尺玉',
      },
      {
        type: 'image' as const,
        url: '/images/hanabi/kounosu-finale.jpg',
        title: '最后连发花火的壮观的终场',
        description: '日本第一和称的尺玉300連发的终场',
        alt: '这的花火大会最后连发花火',
      },
    ],
    website: 'https://kounosuhanabi.com/',
    officialSource: {
      walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0311e000000060/',
      verificationDate: '2025年1月',
      dataConfirmedBy: 'USER_PROVIDED' as const,
      lastChecked: '2025年1月',
    },
    dataIntegrityCheck: {
      hasOfficialSource: true,
      userVerified: true,
      lastValidated: '2025年1月',
    },

    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3230.5!2d139.52!3d36.06!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018f1f1f1f1f1f1%3A0xf1f1f1f1f1f1f1f1!2z57Si55Sw6YGL5YuV5aC0!5e0!3m2!1sja!2sjp!4v1600000000000!5m2!1sja!2sjp',
  };

  return <HanabiDetailTemplate data={data} regionKey="saitama" />;
}

// 静态生成配置
export const dynamic = 'force-static';
export const revalidate = 86400; // 24小时重新验证
