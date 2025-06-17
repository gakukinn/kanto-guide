/**
 * 第四层页面 - 第51回 阿賀野川来吧花火详情
 * @layer 四层 (Detail Layer)
 * @category 花火
 * @region 甲信越
 * @description 第51回 阿賀野川来吧花火的详细信息页面
 * @template HanabiDetailTemplate.tsx
 */

import HanabiDetailTemplate from '../../../../components/HanabiDetailTemplate';
import { Metadata } from 'next';

// 第51回 阿賀野川来吧花火详细数据（基于WalkerPlus官方信息）
const aganoGozareyaHanabiData = {
  // 基本信息
  id: 'agano-gozareya-hanabi-2025',
  name: '第51回 阿賀野川来吧花火',
  _sourceData: {
    japaneseName: '第51回 阿賀野川来吧花火',
    japaneseDescription: '第51回 阿賀野川来吧花火',
  },
  englishName: '51st Agano River Gozareya Fireworks Festival',
  year: 2025,

  // 时间信息
  date: '2025年8月25日',
  time: '19:30～20:00',
  duration: '30分钟',

  // 花火信息
  fireworksCount: '約3000発',
  expectedVisitors: '約1070人',
  weather: '夏季晴朗',
  ticketPrice: '有料席有（詳細是未定）',
  status: 'scheduled',
  themeColor: 'red',
  month: 8,

  // 标签系统
  tags: {
    timeTag: '8月',
    regionTag: '新潟県',
    typeTag: '花火',
    layerTag: 'Layer 4詳細页',
  },

  // 会场信息
  venues: [
    {
      name: '阿賀野川松浜橋上流側',
      location: '新潟県新潟市北区',
      startTime: '19:30',
      features: ['河川敷', '花鳥風月', '2尺玉'],
    },
  ],

  // 交通信息
  access: [
    {
      venue: '阿賀野川松浜橋上流側',
      stations: [
        {
          name: 'JR新崎駅',
          lines: ['JR白新線'],
          walkTime: '徒歩30分',
        },
      ],
    },
  ],

  // 观赏地点
  viewingSpots: [
    {
      name: '河川敷主要会場',
      rating: 5,
      crowdLevel: '混雑',
      tips: '终章的花鳥風月特别是必見',
      pros: ['最高的視界', '音楽和的同期'],
      cons: ['混雑', '早的場所取必要'],
    },
  ],

  // 历史信息
  history: {
    established: 51,
    significance: '未来的子也了在誇花火大会将創',
    highlights: [
      '超特大连发花火的花鳥風月',
      '2尺玉的大迫力',
      '小学生花火5作品',
      '连发花火',
      '公式YouTube现场中継',
    ],
  },

  // 贴士
  tips: [
    {
      category: '観覧的',
      items: [
        '终章的花鳥風月特别是必見',
        '公式YouTube现场中継也有',
        '小学生花火在也注目',
      ],
    },
    {
      category: '交通交通',
      items: [
        'JR新崎駅从徒歩30分',
        '日本海東北道新潟空港IC从約10分',
        '公共交通機関的利用将勧',
      ],
    },
  ],

  // 联系信息
  contact: {
    organizer: '来吧花火協賛会',
    phone: '詳細是公式网站在確認请',
    website: 'https://hanabi.walkerplus.com/detail/ar0415e00061/',
    socialMedia: 'YouTube公式',
  },

  // 地图信息
  mapInfo: {
    hasMap: true,
    mapNote: '阿賀野川松浜橋上流側在開催',
    parking: '有料席有（詳細是未定）',
  },

  // 天气信息
  weatherInfo: {
    month: '8月',
    temperature: '25-30°C',
    humidity: '70-80%',
    rainfall: '少雨',
    recommendation: '夏的夜空在映花火将楽请',
    rainPolicy: '雨天時是翌日在延期',
    note: '熱中症対策将请不要忘记',
  },

  // 特殊功能
  specialFeatures: {
    scale: '約6000発的花火',
    location: '阿賀野川河川敷',
    tradition: '第51回目的伝統花火大会',
    atmosphere: '家族在楽温雰囲気',
  },

  // 2025年特别企划
  special2025: {
    theme: '誇～和一人的心根在咲花将。这从也～',
    concept: '未来的子也了在誇花火大会将創',
    features: [
      '超特大连发花火的花鳥風月',
      '2尺玉的大迫力',
      '小学生花火5作品',
      '连发花火',
      '公式YouTube现场中継',
    ],
  },

  // 关联推荐
  related: {
    regionRecommendations: [],
    timeRecommendations: [],
  },

  // 媒体内容
  media: [
    {
      type: 'image' as const,
      url: 'https://image.walkerplus.com/wpimg/walkertouch/wtd/images/l2/73675.jpg',
      title: '第51回 阿賀野川来吧花火',
      description: '見了十分的約6000発的花火的打上的',
    },
  ],

  // 地图嵌入URL
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3141.234!2d139.2394!3d37.9161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDU0JzU4LjAiTiAxMznCsDE0JzIxLjgiRQ!5e0!3m2!1sja!2sjp!4v1234567890123',

  // 官方数据源验证
  officialSource: {
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0415e00061/',
    verificationDate: '2025-06-14',
    dataConfirmedBy: 'USER_PROVIDED' as const,
    lastChecked: '2025-06-14',
  },
};

// 导航配置
const navigationConfig = {
  region: '甲信越',
  category: '花火',
  breadcrumbs: [
    { name: '', url: '/' },
    { name: '甲信越', url: '/koshinetsu' },
    { name: '花火大会', url: '/koshinetsu/hanabi' },
    {
      name: '第51回 阿賀野川来吧花火',
      url: '/koshinetsu/hanabi/agano-gozareya',
    },
  ],
};

export default function AganoGozareyaHanabiDetailTemplate() {
  return (
    <HanabiDetailTemplate
      data={aganoGozareyaHanabiData}
      regionKey="koshinetsu"
    />
  );
}

export const metadata: Metadata = {
  title: '第51回阿贺野川来吧花火大会 - 甲信越花火大会 | 关东旅游指南',
  description:
    '第51回阿贺野川来吧花火大会是新潟县阿贺野市传统夏日祭典，已有51年历史。约4,000发花火在阿贺野川河畔绽放，免费观赏的地域传统花火盛典。',
  keywords:
    '阿贺野川, 来吧花火, 新潟县花火, 甲信越花火, 日本花火大会, 免费花火',
};

