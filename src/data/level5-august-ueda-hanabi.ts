import { HanabiData } from '@/types/hanabi';

export const uedaHanabiData: HanabiData = {
  id: 'ueda-shinshu-hanabi-2025',
  name: '上田市诞生20周年纪念第38回信州上田大花火大会',
  japaneseName: '上田市誕生20周年記念 第38回 信州上田大花火大会',
  englishName: 'Ueda City 20th Anniversary 38th Shinshu Ueda Grand Fireworks',
  year: 2025,
  month: 8,
  date: '2025年8月5日(火)',
  time: '19:00-20:30',
  duration: '90分钟',
  fireworksCount: '约8000发',
  expectedVisitors: '约8万人',
  weather: '小雨决行（荒天时中止）',
  ticketPrice: '有料桟敷席1万9800日元',
  status: 'scheduled',
  themeColor: 'blue',
  
  tags: {
    timeTag: '8月',
    regionTag: '甲信越',
    typeTag: '花火',
    layerTag: '详细介绍'
  },

  // 添加媒体展示内容
  media: [
    {
      type: 'image',
      url: '/images/hanabi/ueda-fireworks.svg',
      title: '信州上田大花火大会壮观场面',
      description: '千曲川河川敷举行的约8000发花火，三家烟火制作公司技术竞演精彩纷呈'
    }
  ],
  
  venues: [
    {
      name: '千曲川河川敷',
      location: '长野县上田市常田1丁目',
      startTime: '19:00',
      features: ['河川敷观赏', '三家烟火公司竞演', '音乐花火', '有料桟敷席']
    }
  ],

  access: [
    {
      venue: '千曲川河川敷',
      stations: [
        {
          name: 'JR北陆新干线上田站',
          lines: ['JR北陆新干线', '信浓铁道', '上田电铁'],
          walkTime: '徒步5分钟'
        }
      ]
    }
  ],

  weatherInfo: {
    month: '8月',
    temperature: '最高30°C 最低20°C',
    humidity: '70-80%',
    rainfall: '夏季雷雨可能',
    recommendation: '8月夏季炎热，建议携带防暑用品和饮用水。如遇雨天请准备雨具。',
    rainPolicy: '小雨决行',
    note: '荒天时中止，不延期'
  },

  viewingSpots: [
    {
      name: '千曲川右岸河川敷',
      rating: 4.5,
      crowdLevel: 'high',
      tips: '主要观赏区域，可欣赏到约8000发花火的壮观场面',
      pros: ['免费观赏区域', '视野开阔', '河川敷平坦'],
      cons: ['人流较多', '需要提前占位']
    },
    {
      name: '有料桟敷席',
      rating: 4.8,
      crowdLevel: 'medium',
      tips: '千曲川右岸河川敷鲤西码头小屋横的付费观赏席',
      pros: ['1桟敷席4人程度', '最佳观赏位置', '座位舒适'],
      cons: ['需要预约', '费用较高']
    },
    {
      name: '有料站立观赏区域',
      rating: 4.2,
      crowdLevel: 'low',
      tips: '新设立的付费站立观赏区域，适合摄影',
      pros: ['站立观赏', '摄影友好', '70名限定'],
      cons: ['需要站立', '需要预约']
    }
  ],

  specialFeatures: {
    scale: '约8000发花火，三家烟火制作公司技术竞演',
    location: '千曲川河川敷，上田市中心部的绝佳观赏位置',
    tradition: '第38回开催，上田市诞生20周年纪念特别企划',
    atmosphere: '音乐花火与连发花火营造的震撼视听体验',
    collaboration: '三家烟火制作公司技术竞演，展现各自独特创造力'
  },

  history: {
    established: 1987,
    significance: '信州上田大花火大会是长野县上田市的传统夏季盛典，今年迎来第38回开催',
    highlights: ['三家烟火公司竞演', '音乐花火表演', '千曲川河川敷会场', '上田市诞生20周年纪念']
  },

  tips: [
    {
      category: '观赏建议',
      items: [
        '建议提前2-3小时到场占据最佳观赏位置',
        '千曲川河川敷地面平坦，可携带野餐垫观赏',
        '有料桟敷席需要提前预约，1桟敷席可容纳4人程度',
        '新设有料站立观赏区域适合摄影爱好者'
      ]
    },
    {
      category: '交通提醒',
      items: [
        '观览者专用停车场无，强烈建议使用公共交通',
        'JR北陆新干线上田站徒步5分钟即可到达',
        '当日会场周边实施交通规制，请注意绕行',
        '花火结束后人流较多，请耐心等待疏散'
      ]
    }
  ],

  contact: {
    organizer: '信州上田大花火大会实行委员会',
    phone: '0268-22-4500',
    website: 'https://www.ucci.or.jp/',
    socialMedia: '@ueda_hanabi'
  },

  mapInfo: {
    hasMap: true,
    mapNote: '千曲川河川敷，当日会场周边交通规制实施',
    parking: '观览者专用停车场无，建议使用公共交通'
  },

  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3175.8234567890123!2d138.2512345678901!3d36.4056789012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x601d8a123456789a%3A0x123456789abcdef0!2z5LiK55Sw5biC5bi45pWw5bed5rKz5bed5pW7!5e0!3m2!1sja!2sjp!4v1234567890123!5m2!1sja!2sjp',

  related: {
    regionRecommendations: [],
    timeRecommendations: []
  },

  dataSourceUrl: 'https://hanabi.walkerplus.com/detail/ar0420e00685/',

  officialSource: {
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0420e00685/',
    verificationDate: '2025年1月13日',
    dataConfirmedBy: 'USER_PROVIDED',
    lastChecked: '2025年1月13日'
  }
}; 