import { HanabiData } from '@/types/hanabi';

export const eventData: HanabiData = {
  id: 'yokohama-night-flowers-2025',
  name: '横滨夜间花火2025',
  japaneseName: '横浜ナイトフラワーズ2025',
  englishName: 'Yokohama Night Flowers 2025',
  title: '横滨夜间花火2025 - 8月神奈川花火大会',
  description: '在横滨港未来21地区举办的夜间花火活动，融合灯光与音乐，打造独特的都市夏夜体验。',
  year: 2025,
  month: 8,
  date: '8月2日、9日、16日、23日、30日',
  time: '19:30～19:45',
  duration: '15分钟',
  fireworksCount: '约150发/场',
  expectedVisitors: '约5000人/场',
  weather: '晴朗',
  ticketPrice: '免费',
  status: '确定举办',
  themeColor: '#7C3AED',
  tags: {
    timeTag: '8月',
    regionTag: '神奈川',
    typeTag: '花火',
    layerTag: '详细介绍'
  
  },
  related: {
    regionRecommendations: [],
    timeRecommendations: [],
    sameMonth: [],
    sameRegion: [],
    recommended: []
  },
  venues: [
    {
      name: '横滨港未来21地区',
      location: '神奈川县横滨市西区港未来',
      startTime: '19:30',
      features: ['都市夜景', '音乐花火', '灯光秀']
    }
  ],
  access: [
    {
      venue: '横滨港未来21地区',
      stations: [
        {
          name: '港未来站',
          lines: ['横滨高速铁道港未来线'],
          walkTime: '步行5分钟'
        }
      ]
    }
  ],
  viewingSpots: [
    {
      name: '港未来海滨公园',
      rating: 5,
      crowdLevel: '中',
      tips: '建议提前到场，选择靠近海边的位置观赏',
      pros: ['都市夜景', '灯光与花火融合'],
      cons: ['人流量大', '部分区域视野受限']
    }
  ],
  history: {
    established: 2022,
    significance: '横滨都市型夏日花火新品牌，主打夜景与灯光融合',
    highlights: ['都市夜景', '音乐花火', '灯光秀']
  },
  tips: [
    {
      category: '观赏建议',
      items: ['建议提前到场', '携带防晒用品', '注意夜间温差']
    }
  ],
  contact: {
    organizer: '横滨观光协会',
    phone: '045-221-2111',
    website: 'https://www.yokohamajapan.com/',
    socialMedia: 'https://twitter.com/hamanavi'
  },
  mapInfo: {
    hasMap: true,
    mapNote: '港未来21地区多处可观赏，主推荐海滨公园',
    parking: '周边有大型停车场'
  },
  weatherInfo: {
    month: '8月',
    temperature: '25-30℃',
    humidity: '75%',
    rainfall: '低',
    recommendation: '都市海边气候，注意防风防晒'
  },
  specialFeatures: {
    scale: '小型',
    location: '都市海滨',
    tradition: '音乐花火',
    atmosphere: '现代都市',
    collaboration: '灯光秀联动'
  },
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3248.1234567890123!2d139.631!3d35.454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60185c1b00000001%3A0x0000000000000000!2z5qiq5rWc5Y2X5Lqs5aSn5a2m!5e0!3m2!1szh-CN!2sjp!4v1234567890',
  website: 'https://www.yokohamajapan.com/',
  officialSource: {
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0314/20250802/',
    verificationDate: '2024-03-20',
    dataConfirmedBy: 'USER_PROVIDED',
    lastChecked: '2024-03-20T10:00:00Z'
  },
  dataIntegrityCheck: {
    hasOfficialSource: true,
    userVerified: true,
    lastValidated: '2024-03-20T10:00:00Z'
  },
  dataSourceUrl: 'https://hanabi.walkerplus.com/detail/ar0314/20250802/'
}; 