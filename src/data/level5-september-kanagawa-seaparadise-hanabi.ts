import { HanabiData } from '../types/hanabi';

export const seaparadiseHanabiData: HanabiData = {
  id: 'seaparadise-hanabi-symphonia-september',
  name: '横浜・八景岛海洋天堂「花火交响曲」',
  japaneseName: '横浜・八景島シーパラダイス「花火シンフォニア」',
  englishName: 'Yokohama Hakkeijima Sea Paradise Fireworks Symphonia',
  year: 2025,
  date: "9月13日・14日",
  time: '20:30～20:40',
  duration: '10分钟',
  fireworksCount: '约2500发',
  expectedVisitors: '非公开',
  weather: '初秋凉爽',
  ticketPrice: '需要入园门票',
  status: '开催预定',
  themeColor: '#4FC3F7',
  month: 9,
  
  title: '横浜・八景岛海洋天堂「花火交响曲」| 2025年9月神奈川花火大会',
  description: '横浜・八景岛海洋天堂「花火交响曲」，音乐与花火完美同步的海洋主题花火秀。初秋海风中感受2500发花火的震撼演出。2025年9月13日・14日开催。',
  
  tags: {
    timeTag: '9月',
    regionTag: '神奈川',
    typeTag: '花火',
    layerTag: '详细介绍'
  
  },
  
  related: {
    regionRecommendations: [
      {
        id: 'yokohama-night-flowers',
        name: '横浜夜间花火2025',
        date: "9月6日・14日",
        location: '横浜港',
        visitors: '非公开',
        link: '/september/hanabi/kanagawa/yokohama-hanabi'
      }
    ],
    timeRecommendations: [
      {
        id: 'seaparadise-july',
        name: '八景岛花火交响曲（7月）',
        date: '7月19日・20日・26日',
        location: '八景岛海洋天堂',
        visitors: '非公开',
        link: '/july/hanabi/kanagawa/seaparadise'
      },
      {
        id: 'seaparadise-august',
        name: '八景岛花火交响曲（8月）',
        date: '8月2日・9日・10日・16日・23日',
        location: '八景岛海洋天堂',
        visitors: '非公开',
        link: '/august/hanabi/kanagawa/yokohama-seaparadise'
      }
    ],
    sameMonth: [
      '/september/hanabi/kanagawa/yokohama-hanabi'
    ],
    sameRegion: [
      '/september/hanabi/kanagawa/yokohama-hanabi'
    ],
    recommended: [
      '/july/hanabi/kanagawa/seaparadise',
      '/august/hanabi/kanagawa/yokohama-seaparadise'
    ]
  },
  
  venues: [
    {
      name: '横浜八景岛海洋天堂',
      location: '神奈川县横浜市金泽区八景岛',
      startTime: '20:30',
      features: ['海岛夜景', '音乐花火', '初秋海风', '亲子友好']
    }
  ],
  
  access: [
    {
      venue: '横浜八景岛海洋天堂',
      stations: [
        {
          name: '八景岛站',
          lines: ['横浜新都市交通金泽海岸线'],
          walkTime: '徒步即达'
        },
        {
          name: '新杉田站',
          lines: ['JR根岸线', 'JR京滨东北线'],
          walkTime: '转乘金泽海岸线'
        },
        {
          name: '金泽八景站',
          lines: ['京急本线'],
          walkTime: '转乘金泽海岸线'
        }
      ]
    }
  ],
  
  viewingSpots: [
    {
      name: '八景岛园区内海边',
      rating: 5,
      crowdLevel: '中',
      tips: '建议提前入园，选择靠海一侧观赏。初秋夜晚较凉，注意保暖',
      pros: ['音乐与花火同步', '初秋海风凉爽', '海岛独特氛围'],
      cons: ['需购门票', '人流量大']
    },
    {
      name: '观览车上观赏',
      rating: 4,
      crowdLevel: '低',
      tips: '从高空俯瞰花火，别有一番风味',
      pros: ['独特视角', '避开人群', '浪漫体验'],
      cons: ['需额外付费', '观赏时间有限']
    }
  ],
  
  history: {
    established: 1993,
    significance: '横浜夏秋季代表性花火活动，融合音乐与花火的独特体验',
    highlights: ['音乐花火', '海岛夜景', '跨季节开催', '亲子活动']
  },
  
  tips: [
    {
      category: '观赏建议',
      items: ['建议提前购票入园', '初秋夜晚较凉，携带外套', '可结合白天的海洋馆游览']
    },
    {
      category: '季节特色',
      items: ['9月海风凉爽舒适', '避开夏季高温人潮', '初秋夜空更加清澈']
    },
    {
      category: '交通贴士',
      items: ['金泽海岸线是唯一交通方式', '花火结束后注意末班车时间', '可考虑在附近住宿']
    }
  ],
  
  contact: {
    organizer: '横浜八景岛海洋天堂',
    phone: '045-788-8888',
    website: 'https://www.seaparadise.co.jp/2025summer_hanabi/index.html',
    socialMedia: 'https://twitter.com/_seaparadise_'
  },
  
  mapInfo: {
    hasMap: true,
    mapNote: '园区内多处可观赏，主推荐海边区域',
    parking: '园区设有大型停车场（4000台，1500円～/日）'
  },
  
  weatherInfo: {
    month: '9月',
    temperature: '20-25℃',
    humidity: '65%',
    rainfall: '低',
    recommendation: '初秋海岛气候，夜晚较凉注意保暖',
    rainPolicy: '荒天时中止',
    note: '海边气候，注意防风'
  },
  
  specialFeatures: {
    scale: '中型',
    location: '海岛乐园',
    tradition: '音乐花火',
    atmosphere: '家庭友好',
    collaboration: '园区联动'
  },
  
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3248.1234567890123!2d139.619!3d35.337!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60185b0e00000001%3A0x0000000000000000!2z5qiq5rWc44Gu44Kk44Oz44K544Kv44O844K444Kn44O844K544Kv44O844K5!5e0!3m2!1szh-CN!2sjp!4v1234567890',
  website: 'https://www.seaparadise.co.jp/2025summer_hanabi/index.html'
}; 