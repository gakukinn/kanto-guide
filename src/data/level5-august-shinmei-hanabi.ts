import { HanabiData } from '@/types/hanabi';

export const shinmeiHanabiData: HanabiData = {
  id: 'shinmei-hanabi-2025',
  name: '市川三郷町故乡夏日祭第37回神明花火大会',
  japaneseName: '市川三郷町ふるさと夏まつり 第37回「神明の花火大会」',
  englishName: 'Ichikawamisato Hometown Summer Festival 37th Shinmei Fireworks',
  year: 2025,
  month: 8,
  date: '2025年8月7日(木)',
  time: '19:15-21:00',
  duration: '105分钟',
  fireworksCount: '约2万发',
  expectedVisitors: '约20万人',
  weather: '荒天中止（雨天决行）',
  ticketPrice: '有料观览席：VIP席10万日元、丸桌椅席6万日元等',
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
      url: '/images/hanabi/shinmei-fireworks.svg',
      title: '神明花火大会音乐花火表演',
      description: '三郡桥下流笛吹川河畔举行的约2万发花火，音乐与花火完美同步的视听盛宴'
    }
  ],
  
  venues: [
    {
      name: '三郡桥下流笛吹川河畔',
      location: '山梨县西八代郡市川三郷町',
      startTime: '19:15',
      features: ['河川敷观赏', '音乐花火', '约80店铺出店', '有料观览席']
    }
  ],

  viewingSpots: [
    {
      name: '三郡桥下流笛吹川河畔',
      rating: 4.7,
      crowdLevel: 'high',
      tips: '主要观赏区域，可欣赏到约2万发花火与音乐完美同步的表演',
      pros: ['免费观赏区域', '视野开阔', '音响效果佳'],
      cons: ['人流极多', '需要提前占位']
    },
    {
      name: 'VIP席',
      rating: 4.9,
      crowdLevel: 'low',
      tips: '2人沙发席，最佳观赏位置，10万日元/席',
      pros: ['最佳观赏位置', '舒适座椅', '专属服务'],
      cons: ['价格昂贵', '需要提前预约']
    },
    {
      name: '丸桌椅席',
      rating: 4.6,
      crowdLevel: 'medium',
      tips: '4人席，适合家庭观赏，6万日元/席',
      pros: ['家庭友好', '桌椅舒适', '良好视野'],
      cons: ['价格较高', '需要预约']
    }
  ],

  specialFeatures: {
    scale: '约2万发花火，山梨县内最大级规模',
    location: '三郡桥下流笛吹川河畔，开阔的河川敷会场',
    tradition: '第37回开催，8月7日花火之日的传统大会',
    atmosphere: '音乐与花火完美同步的视听融合演出',
    collaboration: '约80店铺出店，美食与花火的双重享受'
  },

  history: {
    established: 1988,
    significance: '神明花火大会是山梨县市川三郷町的传统夏季盛典，今年迎来第37回开催',
    highlights: ['音乐同步花火', '山梨县内最大规模', '三郡桥下流会场', '约80店铺出店']
  },

  tips: [
    {
      category: '观赏建议',
      items: [
        '建议提前3-4小时到场占据最佳观赏位置',
        '三郡桥下流笛吹川河畔地面平坦，可携带野餐垫观赏',
        '有料观览席需要提前预约，VIP席10万日元可容纳2人',
        '音乐花火是最大看点，建议关注音响效果'
      ]
    },
    {
      category: '交通提醒',
      items: [
        '观览者专用停车场约1500台，建议早到或使用公共交通',
        'JR身延线市川大门站徒步约10分钟到达会场',
        '当日14:30起部分道路交通管制至22:00',
        '花火结束后会场周边极度拥挤，建议提前规划返程路线'
      ]
    },
    {
      category: '现场体验',
      items: [
        '约80店铺出店，可品尝各种祭典美食',
        '音乐与花火完美同步，建议携带耳机或音响设备',
        '大会后半段的大规模连发花火是最大看点',
        '会场周边有临时厕所，但排队时间较长'
      ]
    }
  ],

  access: [
    {
      venue: '三郡桥下流笛吹川河畔',
      stations: [
        {
          name: '市川大门站',
          lines: ['JR身延线'],
          walkTime: '徒步约10分钟'
        }
      ]
    }
  ],

  mapInfo: {
    hasMap: true,
    mapNote: '会场位于三郡桥下流笛吹川河畔，开阔的河川敷地形',
    parking: '会场周边无料停车场约1500台，20个地点分散设置'
  },

  weatherInfo: {
    month: '8月',
    temperature: '最高32°C，最低24°C',
    humidity: '约75%',
    rainfall: '月平均降水量约150mm',
    recommendation: '建议携带防暑用品和雨具，穿着轻便服装',
    rainPolicy: '雨天决行，荒天中止',
    note: '前日17:00判定委员会决定是否举办'
  },

  website: 'https://www.town.ichikawamisato.yamanashi.jp/shinmei/',
  contact: {
    organizer: '市川三郷町神明花火大会实行委员会',
    phone: '055-272-1101',
    website: 'https://www.town.ichikawamisato.yamanashi.jp/shinmei/',
    socialMedia: '@shinmeinohanabi'
  },

  related: {
    regionRecommendations: [
      {
        id: 'koshinetsu-aug-05-kawaguchi',
        name: '河口湖湖上祭',
        date: "8月5日",
        location: '富士河口湖町河口湖畔船津浜',
        visitors: '12万人',
        link: '/august/hanabi/koshinetsu/kawaguchi-hanabi'
      },
      {
        id: 'koshinetsu-aug-05-ueda',
        name: '信州上田大花火大会',
        date: "8月5日",
        location: '上田市千曲川河川敷',
        visitors: '约8万人',
        link: '/august/hanabi/koshinetsu/ueda-hanabi'
      }
    ],
    timeRecommendations: [
      {
        id: 'koshinetsu-aug-02-nagaoka',
        name: '长冈祭大花火大会',
        date: '8月2日、3日',
        location: '长冈市信浓川河川敷',
        visitors: '约34万5000人',
        link: '/august/hanabi/koshinetsu/nagaoka-hanabi'
      }
    ]
  },

  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3175.8234567890123!2d138.4851234567890!3d35.6762345678901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x601d8a123456789a%3A0x123456789abcdef0!2z5LiJ6YOh5qmL5LiL5rWB56yb5ZC55bed5rKz55Wt!5e0!3m2!1sja!2sjp!4v1234567890123!5m2!1sja!2sjp'
}; 