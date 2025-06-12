import { HanabiData } from '@/types/hanabi';

export const niigataHanabiData: HanabiData = {
  id: 'niigata-matsuri-hanabi-2025',
  name: '新潟祭花火大会',
  japaneseName: '新潟まつり花火大会',
  englishName: 'Niigata Festival Fireworks Display',
  year: 2025,
  month: 8,
  date: '2025年8月10日(日)',
  time: '19:20-20:20',
  duration: '60分钟',
  fireworksCount: '非公开',
  expectedVisitors: '约32万人',
  weather: '荒天中止（雨天决行）',
  ticketPrice: '有料席无，协赞席有（详情请参考官方网站）',
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
      url: '/images/hanabi/niigata-fireworks.svg',
      title: '新潟祭花火大会都心花火表演',
      description: '信浓川河畔举行的新潟祭花火大会，都心部音乐与花火共演的优美景观'
    }
  ],
  
  venues: [
    {
      name: '信浓川河畔昭和大桥周边',
      location: '新潟县新潟市中央区信浓川河畔',
      startTime: '19:20',
      features: ['都心部花火', '音乐花火', '初音未来合作', '安乐堤观赏']
    }
  ],

  viewingSpots: [
    {
      name: '安乐堤',
      rating: 4.6,
      crowdLevel: 'high',
      tips: '主要观赏区域，可在信浓川沿岸的安乐堤悠闲观赏花火',
      pros: ['免费观赏区域', '视野开阔', '家庭友好'],
      cons: ['人流极多', '需要提前占位']
    },
    {
      name: '昭和大桥上流区域',
      rating: 4.4,
      crowdLevel: 'high',
      tips: '靠近打上地点的观赏区域，可感受花火的震撼力',
      pros: ['距离近', '震撼感强', '音响效果佳'],
      cons: ['极度拥挤', '需要早到']
    },
    {
      name: '万代桥周边',
      rating: 4.2,
      crowdLevel: 'medium',
      tips: '从万代桥方向观赏，可欣赏到花火与新潟市街景的融合',
      pros: ['景观独特', '相对宽松', '交通便利'],
      cons: ['距离较远', '部分视野受阻']
    }
  ],

  specialFeatures: {
    scale: '约60分钟的花火表演，新潟县内人气第1位',
    location: '信浓川河畔，新潟市中心部的都心花火',
    tradition: '新潟祭的压轴活动，3日间祭典的华丽终章',
    atmosphere: '音乐花火与初音未来合作的现代化花火体验',
    collaboration: '初音未来人气乐曲与花火的完美同步演出'
  },

  history: {
    established: 1955,
    significance: '新潟祭花火大会是新潟市代表性的夏季风物诗，作为新潟祭的压轴活动深受市民喜爱',
    highlights: ['都心部花火', '音乐花火表演', '初音未来合作', '信浓川河畔会场']
  },

  tips: [
    {
      category: '观赏建议',
      items: [
        '建议当日8:00起在安乐堤进行场地占位',
        '音乐花火是最大看点，建议关注音响效果',
        '初音未来花火程序需要确认新潟祭官方网站',
        '可携带智能手机体验AR花火演出'
      ]
    },
    {
      category: '交通提醒',
      items: [
        '推荐使用JR新潟站或JR白山站，徒步15-20分钟',
        '当日18:00-21:00实施交通管制',
        '建议使用市内有料停车场（古町、万代地区）',
        '花火结束后会场周边极度拥挤，请耐心等待疏散'
      ]
    },
    {
      category: '现场体验',
      items: [
        '新潟祭连续3日举行，可体验大民谣流、市民神舆等活动',
        '会场周边有丰富的屋台美食',
        '信浓川沿岸的街景与花火形成独特的都市花火体验',
        '荒天时中止，无延期举办'
      ]
    }
  ],

  access: [
    {
      venue: '信浓川河畔昭和大桥周边',
      stations: [
        {
          name: 'JR新潟站',
          lines: ['JR上越新干线', 'JR信越本线', 'JR白新线'],
          walkTime: '徒步20分钟'
        },
        {
          name: 'JR白山站',
          lines: ['JR越后线'],
          walkTime: '徒步15分钟'
        }
      ]
    }
  ],

  mapInfo: {
    hasMap: true,
    mapNote: '会场位于信浓川河畔昭和大桥上流，当日交通管制18:00-21:00',
    parking: '周边民间有料停车场利用（古町、万代地区等）'
  },

  weatherInfo: {
    month: '8月',
    temperature: '最高30°C，最低22°C',
    humidity: '约75%',
    rainfall: '月平均降水量约180mm',
    recommendation: '建议携带防暑用品和雨具，穿着轻便服装',
    rainPolicy: '雨天决行，荒天中止',
    note: '无延期举办，中止时无替代日程'
  },

  website: 'https://niigata-matsuri.com/',
  contact: {
    organizer: '新潟祭实行委员会',
    phone: '025-226-2608',
    website: 'https://niigata-matsuri.com/',
    socialMedia: '@niigata_matsuri'
  },

  related: {
    regionRecommendations: [
      {
        id: 'koshinetsu-aug-02-nagaoka',
        name: '长冈祭大花火大会',
        date: '8月2日、3日',
        location: '长冈市信浓川河川敷',
        visitors: '约34万5000人',
        link: '/august/hanabi/koshinetsu/nagaoka-hanabi'
      },
      {
        id: 'koshinetsu-aug-07-shinmei',
        name: '市川三郷町神明花火大会',
        date: "8月7日",
        location: '市川三郷町三郡桥下流笛吹川河畔',
        visitors: '约20万人',
        link: '/august/hanabi/koshinetsu/shinmei-hanabi'
      }
    ],
    timeRecommendations: [
      {
        id: 'koshinetsu-aug-05-kawaguchi',
        name: '河口湖湖上祭',
        date: "8月5日",
        location: '富士河口湖町河口湖畔船津浜',
        visitors: '12万人',
        link: '/august/hanabi/koshinetsu/kawaguchi-hanabi'
      }
    ]
  },

  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3175.8234567890123!2d139.0364567890123!3d37.9161234567890!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x601d8a123456789a%3A0x123456789abcdef0!2z5paw5r2f5biC5Lit5aSu5Yy65L-h5r-D5bed5rKz55Wt!5e0!3m2!1sja!2sjp!4v1234567890123!5m2!1sja!2sjp',

  dataSourceUrl: 'https://hanabi.walkerplus.com/detail/ar0415e00666/',

  officialSource: {
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0415e00666/',
    verificationDate: '2025年1月13日',
    dataConfirmedBy: 'USER_PROVIDED',
    lastChecked: '2025年1月13日'
  }
}; 