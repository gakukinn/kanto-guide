/**
 * 第五层数据文件 - 第51回高崎大花火大会详情数据
 * @layer 五层 (Detail Data)
 * @month 8月
 * @region 北关东
 * @event 高崎大花火大会
 * @type 花火详情数据文件
 */
import { HanabiData } from '@/types/hanabi';

export const takasakiHanabiData: HanabiData = {
  id: 'takasaki-hanabi-2025',
  name: '第51回高崎大花火大会',
  japaneseName: '第51回 高崎大花火大会',
  englishName: '51st Takasaki Grand Fireworks Festival',
  title: '第51回高崎大花火大会 - 8月北关东花火大会',
  description: '第51回高崎大花火大会详情信息，包含举办时间、地点、交通方式、观赏攻略等完整信息。',
  year: 2025,
  date: '2025年8月23日（土）',
  time: '19:30～20:20',
  duration: '约50分钟',
  fireworksCount: '约1万5000发',
  expectedVisitors: '约90万人（祭り全体）',
  weather: '小雨举行（恶劣天气延期至24日）',
  ticketPrice: '有料・无料观览席并设',
  status: '已确认举办',
  themeColor: 'red',
  month: 8,

  tags: {
    timeTag: '8月',
    regionTag: '北关东',
    typeTag: '花火',
    layerTag: '详细介绍'
  
  },

  related: {
    regionRecommendations: [
      {
        id: 'maebashi-august',
        name: '第69回前桥花火大会',
        date: '2025年8月9日',
        location: '群马县前桥市',
        visitors: '约23万人',
        link: '/august/hanabi/kitakanto/maebashi'
      },
      {
        id: 'ashikaga-august',
        name: '第109回足利花火大会',
        date: '2025年8月2日',
        location: '栃木县足利市',
        visitors: '约45万人',
        link: '/august/hanabi/kitakanto/ashikaga'
      }
    ],
    timeRecommendations: [
      {
        id: 'koga-august',
        name: '第74回古河花火大会',
        date: '2025年8月2日',
        location: '茨城县古河市',
        visitors: '约55万人',
        link: '/august/hanabi/kitakanto/koga'
      }
    ]
  },

  venues: [
    {
      name: '烏川和田橋上流河川敷',
      location: '群马县高崎市烏川和田橋上流河川敷',
      startTime: '19:30',
      features: ['观览席', '屋台', '临时洗手间']
    }
  ],

  access: [
    {
      venue: '主会场',
      stations: [
        {
          name: '高崎站',
          lines: ['JR高崎线', 'JR上越线', 'JR信越本线'],
          walkTime: '西口步行15分钟'
        }
      ]
    }
  ],

  viewingSpots: [
    {
      name: '烏川河川敷主会场',
      rating: 5,
      crowdLevel: 'Very High',
      tips: '距离打上场地最近，可体验大迫力花火，夜空一面绽放景象震撼',
      pros: ['超近距离观赏', '50分钟超高速花火', '可同时观赏高崎祭'],
      cons: ['人流量极大', '需要极早到达', '无专用停车场']
    },
    {
      name: '和田桥周边',
      rating: 4,
      crowdLevel: 'High',
      tips: '视野开阔的观赏地点，适合摄影',
      pros: ['视野开阔', '适合摄影', '相对便利'],
      cons: ['距离稍远', '人流较多', '设施有限']
    }
  ],

  history: {
    established: 1975,
    significance: '作为高崎祭初日的花火大会，历史悠久，是北关东地区最大级别的花火大会之一',
    highlights: [
      '50分钟内打上约1万5000发的超高速体验',
      '与高崎祭、高崎山车祭同时举办',
      '独有的巨大达摩神轿和创作达摩神轿',
      '山车、神轿、花火的精彩竞演'
    ]
  },

  tips: [
    {
      category: '观赏建议',
      items: [
        '打上场所与观览席距离很近，可以体验大迫力的花火',
        '建议提前到达，现场会非常拥挤',
        '可以同时观赏高崎祭的山车和神轿表演'
      ]
    },
    {
      category: '交通指南',
      items: [
        'JR高崎站西口步行15分钟',
        '关越道高崎IC或前桥IC约25分钟',
        '上信越道藤冈IC或吉井IC约25分钟',
        '无专用停车场，建议使用公共交通'
      ]
    }
  ],

  contact: {
    organizer: '高崎祭实行委员会（高崎观光协会内）',
    phone: '027-330-5333',
    website: 'https://www.takasaki-matsuri.jp/',
    socialMedia: '官方网站查询'
  },

  mapInfo: {
    hasMap: true,
    mapNote: '烏川和田橋上流河川敷',
    parking: '无专用停车场'
  },

  weatherInfo: {
    month: '8月',
    temperature: '最高约30°C，最低约18°C',
    humidity: '夏季湿润',
    rainfall: '2025年8月24日（日）延期',
    recommendation: '夏季夜晚，建议携带薄外套，做好防暑准备'
  },

  specialFeatures: {
    scale: '北关东地区最大级别，约1万5000发',
    location: '烏川河川敷，距离观览席极近',
    tradition: '50年历史的高崎祭花火大会',
    atmosphere: '山车、神轿、花火竞演的热闹祭典',
    collaboration: '与高崎祭、高崎山车祭同时举办'
  },

  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3222.8!2d139.01!3d36.32!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z6auY5bSO5biC!5e0!3m2!1sja!2sjp!4v1620000000000!5m2!1sja!2sjp'
};

export default takasakiHanabiData; 