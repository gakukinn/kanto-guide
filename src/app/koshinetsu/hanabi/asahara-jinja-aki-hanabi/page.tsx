/**
 * 第四层页面 - 浅原神社 秋季例大祭奉納大煙火详情
 * @layer 四层 (Detail Layer)
 * @category 花火
 * @region koshinetsu
 * @description 浅原神社 秋季例大祭奉納大煙火的详细信息页面
 * @template HanabiDetailTemplate.tsx
 */

import HanabiDetailTemplate from '../../../../components/HanabiDetailTemplate';
import { Metadata } from 'next';

// 浅原神社 秋季例大祭奉納大煙火详细数据（基于WalkerPlus官方信息）
const hanabiData = {
  id: 'asahara-jinja-aki-hanabi',
  name: '浅原神社 秋季例大祭奉納大煙火',
  englishName: 'Asahara Shrine Autumn Festival Fireworks',
  year: 2025,
  month: 9,
  date: '2025年9月12日13日',
  time: '19:30～22:20',
  duration: '約2時間50分',
  location: '新潟県小千谷市片貝町浅原神社裏手',
  prefecture: '新潟県',
  city: '小千谷市',
  fireworks: '約1万5000発',
  audience: '約20万人',
  fireworksCount: '約1万5000発',
  expectedVisitors: '約20万人',
  weather: '雨天決行、荒天時翌日在延期',
  ticketPrice:
    '桟敷席：2日間共通券1(定員8人)33,000円、1日券1(定員8人)22,000円、相机席(1人)5,500円',
  status: 'scheduled',
  themeColor: 'orange',
  tags: {
    timeTag: '9月',
    regionTag: '新潟県',
    typeTag: '花火',
    layerTag: 'Layer 4詳細页',
  },
  venues: [
    {
      name: '片貝町浅原神社裏手',
      location: '新潟県小千谷市片貝町浅原神社裏手',
      startTime: '19:30',
      features: [
        '世界最大的四尺玉花火',
        '三尺玉的発祥地',
        '200年的伝統将誇奉納花火',
        '节目的大半的尺玉在構成',
        '山在反響豪快的破裂音',
      ],
    },
  ],
  access: [
    {
      venue: '片貝町浅原神社裏手',
      stations: [
        {
          name: 'JR小千谷駅',
          lines: ['片貝経由長岡行巴士'],
          walkTime: '約20分、之町下車徒歩10分',
        },
        {
          name: 'JR長岡駅',
          lines: ['片貝経由小千谷行巴士'],
          walkTime: '約30分、五町下車徒歩10分',
        },
      ],
    },
  ],
  viewingSpots: [
    {
      name: '桟敷席',
      rating: 5,
      crowdLevel: '混雑予想',
      tips: '尺玉花火的目的前在開迫力満点',
      pros: ['最高的視界', '迫力満点的四尺玉', '山在反響豪快的破裂音'],
      cons: ['混雑', '事前予約必要'],
    },
    {
      name: '相机席',
      rating: 4,
      crowdLevel: '中程度',
      tips: '三脚利用的可能的撮影専用席',
      pros: ['撮影在最適', '三脚使用可能'],
      cons: ['観覧在是不向'],
    },
  ],
  history: {
    established: 1800,
    significance:
      '三尺玉的発祥地作为知、200年的伝統将誇片貝祭典奉納大煙火',
    highlights: [
      '世界最大的四尺玉花火',
      '三尺玉的発祥地',
      '200年的伝統',
      '浅原神社的奉納煙火',
      '筒引玉送等的伝統行事',
    ],
  },
  tips: [
    {
      category: '観覧的',
      items: [
        '四尺玉的打上是両日和也22:00～',
        '桟敷席在是尺玉花火的目的前在開迫力満点',
        '花火打上場所的後的山的屏風状和的着音的反射、豪快的破裂音将楽',
        '2日連続開催在节目的大半的尺玉在構成',
      ],
    },
    {
      category: '交通交通',
      items: [
        '関越道小千谷IC从約10分',
        '関越道長岡IC从約20分',
        '長岡南越路交汇处从約10分',
        '午後在的和片貝方面是規制的遠回和的時間的',
      ],
    },
    {
      category: '駐車場情報',
      items: [
        '片貝地内無料駐車場3所（約760台）',
        '片貝地内臨時有料駐車場4所（約300台）',
        '西部線臨時無料駐車場10所',
      ],
    },
  ],
  contact: {
    organizer: '片貝町煙火協会',
    phone: '0258-84-3900',
    website: 'http://katakaimachi-enkakyokai.info/',
    socialMedia: '公式网站在確認请',
  },
  mapInfo: {
    hasMap: true,
    mapNote: '片貝町浅原神社裏手在開催',
    parking:
      '片貝地内無料駐車場3所、臨時有料駐車場4所、西部線臨時無料駐車場10所有',
  },
  weatherInfo: {
    month: '9月',
    temperature: '15-25°C',
    humidity: '60-80%',
    rainfall: '少雨',
    recommendation: '秋的夜空在映世界最大的四尺玉将楽请',
    rainPolicy: '雨天決行、荒天時翌日在延期',
    note: '秋的夜是冷了防寒対策将请不要忘记',
  },
  specialFeatures: {
    scale: '約1万5000発',
    location: '新潟県小千谷市片貝町浅原神社裏手',
    tradition:
      '三尺玉的発祥地作为知、200年的伝統将誇浅原神社的奉納煙火',
    atmosphere: '世界最大的四尺玉花火和山在反響豪快的破裂音的楽',
  },
  special2025: {
    theme:
      '四尺玉将是尺玉多数、大迫力的尺玉連発将堪能。三尺玉的発祥地作为知新潟県小千谷市片貝町在200年的伝統将誇「片貝祭典奉納大煙火」。最大的注目是世界最大和四尺玉花火的打上在、其他在是的感将生在味。',
    concept:
      '浅原神社的奉納煙火作为、伝統将重現在到的精神是引継的、老若男女問様々的思将込着花火将奉納',
    features: [
      '世界最大的四尺玉花火',
      '三尺玉的発祥地',
      '200年的伝統将誇奉納花火',
      '筒引玉送等的伝統行事',
      '节目的大半的尺玉在構成',
      '山在反響豪快的破裂音',
    ],
  },
  related: {
    regionRecommendations: [],
    timeRecommendations: [],
  },
  media: [],
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3225.123456789!2d138.79123456!3d37.31234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x601d8b8b8b8b8b8b%3A0x1234567890abcdef!2z5rWF5Y6f56We56S-IOeni-WPo-eUuuWNg-azsw!5e0!3m2!1sja!2sjp!4v1640995200000!5m2!1sja!2sjp',
  officialSource: {
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0415e00667/',
    verificationDate: '2025-06-14',
    dataConfirmedBy: 'USER_PROVIDED' as const,
    lastChecked: '2025-06-14',
  },
};

// SEO元数据配置
export const metadata: Metadata = {
  title: 'Asahara Jinja Aki Hanabi - 甲信越花火大会完整攻略',
  description:
    'Asahara Jinja Aki Hanabi花火大会详细指南，2025年举办。精彩花火表演，绝佳观赏地点。包含交通方式、观赏地点、祭典活动等实用信息。',
  keywords: [
    'Asahara Jinja Aki Hanabi花火',
    '甲信越花火',
    '花火大会',
    '2025花火',
    '夏季花火',
    '日本祭典',
  ],
  openGraph: {
    title: 'Asahara Jinja Aki Hanabi - 甲信越花火大会完整攻略',
    description:
      'Asahara Jinja Aki Hanabi花火大会详细指南，2025年举办。精彩花火表演，绝佳观赏地点。包含交通方式、观赏地点、祭典活动等实用信息。...',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.kanto-travel-guide.com/koshinetsu/hanabi/asahara-jinja-aki-hanabi',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/hanabi/asahara-jinja-aki-hanabi-fireworks.svg',
        width: 1200,
        height: 630,
        alt: 'Asahara Jinja Aki Hanabi花火大会',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Asahara Jinja Aki Hanabi - 甲信越花火大会完整攻略',
    description:
      'Asahara Jinja Aki Hanabi花火大会详细指南，2025年举办。精彩花火表演，绝佳观赏地点。包含交通方式、观赏地点、祭典活动等实用信息。...',
    images: ['/images/hanabi/asahara-jinja-aki-hanabi-fireworks.svg'],
  },
  alternates: {
    canonical: '/koshinetsu/hanabi/asahara-jinja-aki-hanabi',
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

export default function AsaharaJinjaAkiHanabiDetailTemplate() {
  return <HanabiDetailTemplate data={hanabiData} regionKey="koshinetsu" />;
}

// 静态生成配置
export const dynamic = 'force-static';
export const revalidate = 86400; // 24小时重新验证

