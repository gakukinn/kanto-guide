import { HanabiData } from '@/types/hanabi';

export const shinsakuHanabiData: HanabiData = {
  id: 'shinsaku-hanabi',
  name: '全国新作花火挑战杯2025',
  japaneseName: '全国新作花火チャレンジカップ2025',
  englishName: 'National New Fireworks Challenge Cup 2025',
  year: 2025,
  date: '2025年9月6日・13日・20日・27日（预选）、10月26日（决赛）',
  time: '预选：20:30～20:50（9/6・13）、18:30～18:50（9/20・27）、决赛：17:30～17:50',
  duration: '约20分钟',
  fireworksCount: '约400发×5回',
  expectedVisitors: '约25万人',
  weather: '9月秋季，气候宜人',
  ticketPrice: '免费',
  status: '开催预定',
  themeColor: '#FF6B35',
  title: '全国新作花火挑战杯2025',
  description: '6年来首次复活的全国新作花火竞技大会。以诹访湖为舞台，全国选拔的20名烟火师不拘泥于传统技术，以崭新发想和独创技术创作艺术性极高的新作花火竞演。通过分散方式的竞技花火决定2025年度优胜者。',
  tags: {
    timeTag: '9月',
    regionTag: '甲信越',
    typeTag: '花火',
    layerTag: '详细介绍'
  
  },
  month: 9,
  venues: [
    {
      name: '诹访湖湖畔公园前诹访湖上',
      location: '长野县诹访市湖畔公园前',
      startTime: '18:30/20:30',
      features: ['新作花火竞技', '诹访湖绝景', '艺术性花火', '烟火师竞演']
    }
  ],
  access: [
    {
      venue: '诹访湖湖畔公园前诹访湖上',
      stations: [
        {
          name: 'JR上诹访站',
          lines: ['JR中央本线'],
          walkTime: '徒步8分钟'
        }
      ]
    }
  ],
  viewingSpots: [
    {
      name: '诹访湖畔公园',
      rating: 4.5,
      crowdLevel: 'high',
      tips: '最佳观览位置，近距离感受新作花火魅力',
      pros: ['免费观览', '诹访湖绝景', '交通便利'],
      cons: ['人多拥挤', '停车困难']
    },
    {
      name: '诹访湖周边',
      rating: 4.0,
      crowdLevel: 'medium',
      tips: '稍远但可避开人群的观览点',
      pros: ['相对宽敞', '多角度观览'],
      cons: ['距离较远', '视野受限']
    }
  ],
  history: {
    established: 2019,
    significance: '全国新作花火竞技大会として2019年まで开催、6年来首次复活',
    highlights: ['新作花火竞技', '烟火师技术竞演', '诹访湖绝景会场']
  },
  tips: [
    {
      category: '开催时间',
      items: [
        '预选4回与决赛的开催时间不同需要注意',
        '9月6日・13日是20:30开始、9月20日・27日是18:30开始'
      ]
    },
    {
      category: '观览信息',
      items: [
        '观览免费、无有料席',
        '诹访湖畔自由观览'
      ]
    },
    {
      category: '准备事项',
      items: [
        '秋季夜间较冷需防寒对策',
        '雨天决行、台风直击时顺延'
      ]
    }
  ],
  contact: {
    organizer: '新作花火大会实行委员会',
    phone: '0266-52-2111',
    website: 'https://suwako-hanabi.com/shinsaku/',
    socialMedia: '@suwa_hanabi'
  },
  // 官方数据源验证
  officialSource: {
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0420e00806/',
    verificationDate: '2025-01-13',
    dataConfirmedBy: 'USER_PROVIDED' as const,
    lastChecked: '2025-01-13'
  },
  mapInfo: {
    hasMap: true,
    mapNote: '诹访湖畔公园前是最适合的观览场所',
    parking: '诹访湖活动广场免费停车场（15时以后开放）'
  },
  weatherInfo: {
    month: '9月',
    temperature: '白天25℃、夜间15℃',
    humidity: '60-70%',
    rainfall: '秋雨前线影响时有降雨',
    recommendation: '夜间较冷需要防寒对策',
    rainPolicy: '雨天举行、台风直击时顺延',
    note: '2日前17时前在官方网站发表举办信息'
  },
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3222.8!2d138.1!3d36.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDE4JzAwLjAiTiAxMzjCsDQ4JzAwLjAiRQ!5e0!3m2!1sja!2sjp!4v1234567890123!5m2!1sja!2sjp',
  website: 'https://suwako-hanabi.com/shinsaku/',
  related: {
    regionRecommendations: [
      {
        id: 'suwa-lake-hanabi',
        name: '諏訪湖祭湖上花火大会',
        date: "8月15日",
        location: '長野県諏訪市',
        visitors: '約50万人',
        link: '/august/hanabi/koshinetsu/suwa-lake-hanabi'
      },
      {
        id: 'ueda-hanabi',
        name: '信州上田大花火大会',
        date: "8月5日",
        location: '長野県上田市',
        visitors: '約30万人',
        link: '/august/hanabi/koshinetsu/ueda-hanabi'
      }
    ],
    timeRecommendations: [
      {
        id: 'asahara-hanabi',
        name: '浅原神社秋季例大祭奉納大煙火',
        date: "9月12日・13日",
        location: '新潟県小千谷市',
        visitors: '約20万人',
        link: '/september/hanabi/koshinetsu/asahara-hanabi'
      },
      {
        id: 'suzaka-hanabi',
        name: '须坂大家花火大会',
        date: "9月7日",
        location: '长野县须坂市',
        visitors: '约15万人',
        link: '/september/hanabi/koshinetsu/suzaka-hanabi'
      }
    ]
  }
}; 