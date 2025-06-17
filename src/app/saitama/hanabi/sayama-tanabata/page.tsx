/**
 * 第四层页面 - sayama-tanabata完整详情信息，包含交通、观赏、历史等
 * @layer 五层 (Detail Layer)
 * @month 8月
 * @region 埼玉
 * @event sayama-tanabata
 * @type 花火详情页面
 * @path /august/hanabi/saitama/sayama-tanabata
 * @description sayama-tanabata完整详情信息，包含交通、观赏、历史等
 */
import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { Metadata } from 'next';

const sayamaTanabataHanabiData = {
  id: 'sayama-tanabata-2025',
  name: '狭山市入间川七夕祭纳凉花火大会',
  _sourceData: {
    japaneseName: '狭山市入間川七夕祭典納涼花火大会',
    japaneseDescription: '狭山市入間川七夕祭典納涼花火大会',
  },
  englishName: 'Sayama Iruma River Tanabata Cool Fireworks',
  year: 2025,
  month: 8,
  date: '2025-08-02',
  time: '19:30～20:00',
  duration: '约30分钟',
  fireworksCount: '約2000発',
  expectedVisitors: '未公布',
  weather: '夏季温暖',
  ticketPrice: '免费观赏',
  status: '开催预定',
  themeColor: '#8B5CF6',

  tags: {
    timeTag: '8月',
    regionTag: '埼玉',
    typeTag: '花火',
    layerTag: '详细介绍',
  },

  venues: [
    {
      name: '入间川河川敷',
      location: '埼玉县狭山市',
      startTime: '19:30',
      features: ['河川敷花火', '七夕祭典', '竹饰装饰', '传统夏祭'],
    },
  ],

  access: [
    {
      venue: '入间川河川敷',
      stations: [
        {
          name: '狭山市站',
          lines: ['西武新宿线'],
          walkTime: '步行15分钟',
        },
      ],
    },
  ],

  viewingSpots: [
    {
      name: '入间川河川敷主会场',
      rating: 4,
      crowdLevel: '中等',
      tips: '河川敷开阔视野，建议携带折叠椅或垫子',
      pros: ['河川敷开阔', '七夕装饰美丽', '交通便利'],
      cons: ['蚊虫较多', '无遮阴设施'],
    },
  ],

  history: {
    established: 1950,
    significance: '狭山市传统七夕祭与花火的结合活动',
    highlights: [
      '七夕竹饰与花火的美丽结合',
      '入间川河畔的传统夏祭',
      '地域居民参与的温馨活动',
    ],
  },

  tips: [
    {
      category: '观赏建议',
      items: [
        '建议18:00前到达占据好位置',
        '携带防蚊虫用品，河边蚊虫较多',
        '可提前观赏七夕竹饰装饰',
        '准备折叠椅或野餐垫享受河畔观赏',
      ],
    },
    {
      category: '交通指南',
      items: [
        '西武新宿线狭山市站步行15分钟',
        '会场周边有交通管制，建议公共交通',
        '返程时车站可能拥挤，建议稍等再离场',
      ],
    },
  ],

  contact: {
    organizer: '狭山市观光协会',
    phone: '04-2953-1111',
    website: 'https://www.city.sayama.saitama.jp/',
    socialMedia: '',
  },

  officialSource: {
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0311e00806/',
    verificationDate: '2025-01-15',
    dataConfirmedBy: 'USER_PROVIDED' as const,
    lastChecked: '2025-01-15',
  },

  mapInfo: {
    hasMap: true,
    mapNote: '入间川河川敷，狭山市站步行15分钟',
    parking: '有限停车位，建议公共交通',
  },

  weatherInfo: {
    month: '8月',
    temperature: '最高32°C 最低25°C',
    humidity: '约75%',
    rainfall: '夏季雷雨可能',
    recommendation: '携带防暑用品和防蚊虫用品',
    rainPolicy: '小雨决行，大雨中止',
  },

  specialFeatures: {
    scale: '約2000発花火，30分钟演出',
    location: '入间川河川敷开阔观赏环境',
    tradition: '七夕祭与花火的传统结合',
    atmosphere: '地域密着型温馨夏祭',
    collaboration: '竹饰装饰与花火的美丽结合',
  },

  special2025: {
    theme: '七夕纳凉花火',
    concept: '传统七夕与现代花火的融合',
    features: [
      '七夕竹饰装饰观赏',
      '約2000発连续花火演出',
      '入间川河畔美丽环境',
      '地域居民参与型夏祭',
    ],
  },

  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3234.8!2d139.4123!3d35.8456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018c1a1234567%3A0x1234567890abcdef!2z5YWl6ZaT5bed5rKz5bed5pW7!5e0!3m2!1sja!2sjp!4v1234567890123!5m2!1sja!2sjp',

  media: [
    {
      type: 'image' as const,
      url: '/images/hanabi-placeholder.jpg',
      title: '狭山市入间川七夕祭花火大会',
      description: '七夕竹饰与河川敷花火的美丽结合',
    },
  ],

  related: {
    regionRecommendations: [
      {
        id: 'todabashi-august',
        name: '第72回戸田桥花火大会',
        date: '2025-08-02',
        location: '荒川河川敷',
        visitors: '45万人',
        link: '/august/hanabi/saitama/todabashi',
      },
      {
        id: 'asaka-august',
        name: '朝霞市民祭「彩夏祭」',
        date: '2025-08-02',
        location: '朝霞跡地',
        visitors: '73万人',
        link: '/august/hanabi/saitama/asaka',
      },
    ],
    timeRecommendations: [
      {
        id: 'kumagaya-august',
        name: '熊谷花火大会',
        date: '2025-08-09',
        location: '荒川河畔',
        visitors: '42万人',
        link: '/august/hanabi/saitama/kumagaya',
      },
    ],
  },
};

// SEO元数据配置
export const metadata: Metadata = {
  title: 'Sayama Tanabata - 埼玉花火大会完整攻略',
  description:
    'Sayama Tanabata花火大会详细指南，2025年举办。精彩花火表演，绝佳观赏地点。包含交通方式、观赏地点、祭典活动等实用信息。',
  keywords: [
    'Sayama Tanabata花火',
    '埼玉花火',
    '花火大会',
    '2025花火',
    '夏季花火',
    '日本祭典',
  ],
  openGraph: {
    title: 'Sayama Tanabata - 埼玉花火大会完整攻略',
    description:
      'Sayama Tanabata花火大会详细指南，2025年举办。精彩花火表演，绝佳观赏地点。包含交通方式、观赏地点、祭典活动等实用信息。...',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.kanto-travel-guide.com/saitama/hanabi/sayama-tanabata',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/hanabi/sayama-tanabata-fireworks.svg',
        width: 1200,
        height: 630,
        alt: 'Sayama Tanabata花火大会',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sayama Tanabata - 埼玉花火大会完整攻略',
    description:
      'Sayama Tanabata花火大会详细指南，2025年举办。精彩花火表演，绝佳观赏地点。包含交通方式、观赏地点、祭典活动等实用信息。...',
    images: ['/images/hanabi/sayama-tanabata-fireworks.svg'],
  },
  alternates: {
    canonical: '/saitama/hanabi/sayama-tanabata',
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

export default function SayamaTanabataHanabiPage() {
  return (
    <HanabiDetailTemplate data={sayamaTanabataHanabiData} regionKey="saitama" />
  );
}

// 静态生成配置
export const dynamic = 'force-static';
export const revalidate = 86400; // 24小时重新验证
