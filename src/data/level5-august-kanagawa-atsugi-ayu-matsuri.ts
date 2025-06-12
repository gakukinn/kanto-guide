import { HanabiData } from '@/types/hanabi';

export const eventData: HanabiData = {
  id: 'atsugi-ayu-matsuri',
  name: '市制70周年記念 第79回 あつぎ鮎まつり',
  japaneseName: '市制70周年記念 第79回 あつぎ鮎まつり',
  englishName: 'Atsugi Ayu Festival',
  title: '市制70周年記念 第79回 あつぎ鮎まつり - 8月神奈川花火大会',
  description: '在厚木市相模川河畔举办的盛大花火大会。约3000发花火点亮夜空，展现厚木市的夏日风情。',
  year: 2025,
  month: 8,
  date: "8月3日",
  time: '19:00-20:30',
  duration: '90分钟',
  fireworksCount: '约3000发',
  expectedVisitors: '约15万人',
  weather: '晴朗',
  ticketPrice: '免费',
  status: '已确认',
  themeColor: '#FF6B6B',
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
      name: '相模川河川敷',
      location: '厚木市相模川河川敷',
      startTime: '19:00',
      features: ['临时厕所', '饮食摊位', '急救站']
    }
  ],
  access: [
    {
      venue: '相模川河川敷',
      stations: [
        {
          name: '本厚木站',
          lines: ['JR小田急线'],
          walkTime: '15分钟'
        }
      ]
    }
  ],
  viewingSpots: [
    {
      name: '相模川河川敷',
      rating: 4.5,
      crowdLevel: '高',
      tips: '建议携带野餐垫和防蚊用品',
      pros: ['视野开阔', '交通便利'],
      cons: ['人流量大', '需要提前占位']
    },
    {
      name: '厚木市文化会馆',
      rating: 4.0,
      crowdLevel: '中',
      tips: '需要提前预约',
      pros: ['视野好', '设施完善'],
      cons: ['位置有限', '需要预约']
    }
  ],
  history: {
    established: 1946,
    significance: '庆祝厚木市制70周年的特别花火大会',
    highlights: ['70周年纪念特别花火', '鲇祭特色活动']
  },
  tips: [
    {
      category: '交通',
      items: ['建议提前2-3小时到达会场', '会场周边设有临时停车场']
    },
    {
      category: '装备',
      items: ['携带野餐垫', '准备防蚊用品', '带上垃圾袋']
    },
    {
      category: '安全',
      items: ['注意保管随身物品', '遵守会场秩序', '保持环境整洁']
    }
  ],
  contact: {
    organizer: '厚木市观光协会',
    phone: '046-225-2711',
    website: 'https://www.city.atsugi.kanagawa.jp/',
    socialMedia: 'https://twitter.com/atsugicity'
  },
  mapInfo: {
    hasMap: true,
    mapNote: '会场位于相模川河川敷，从本厚木站徒步15分钟可达',
    parking: '会场周边设有临时停车场，建议提前预约'
  },
  weatherInfo: {
    month: '8月',
    temperature: '25-30℃',
    humidity: '65%',
    rainfall: '10%',
    recommendation: '建议携带遮阳伞和防晒用品',
    rainPolicy: '小雨照常举行，大雨可能延期',
    note: '请关注官方最新天气信息'
  },
  specialFeatures: {
    scale: '大型',
    location: '相模川河畔',
    tradition: '鲇祭特色',
    atmosphere: '夏日祭典',
    collaboration: '70周年纪念'
  },
  special2025: {
    theme: '70周年纪念',
    concept: '传统与现代的融合',
    memorial: '厚木市制70周年',
    features: ['特别花火表演', '鲇祭特色活动']
  },
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3248.1234567890123!2d139.375!3d35.4375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDI2JzE1LjAiTiAxMznCsDIyJzMwLjAiRQ!5e0!3m2!1sja!2sjp!4v1234567890',
  website: 'https://www.city.atsugi.kanagawa.jp/'
}; 