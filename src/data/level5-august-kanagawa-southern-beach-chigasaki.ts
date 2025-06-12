/**
 * 第五层数据文件 - 第51回南海滩茅崎花火大会详情数据
 * @layer 五层 (Detail Data)
 * @month 8月
 * @region 神奈川
 * @event 南海滩茅崎花火大会
 * @type 花火详情数据文件
 */
import { HanabiData } from '../types/hanabi';

export const eventData: HanabiData = {
  id: 'southern-beach-chigasaki-hanabi-2025',
  name: '第51回南海滩茅崎花火大会',
  japaneseName: '第51回サザンビーチちがさき花火大会',
  englishName: '51st Southern Beach Chigasaki Fireworks Festival',
  title: '第51回南海滩茅崎花火大会 - 8月神奈川花火大会',
  description: '在茅崎市南海滩茅崎海水浴场举办的海滨花火大会，约2000发花火与湘南海岸的美景相映成辉，是神奈川县湘南地区的夏季风物诗。',
  year: 2025,
  date: '2025年8月2日（土）',
  time: '19:30～20:00',
  duration: '约30分钟',
  fireworksCount: '2000发（预定）',
  expectedVisitors: '5万人',
  weather: '小雨举行（恶劣天气中止）',
  ticketPrice: '无料观赏',
  status: '已确认举办',
  themeColor: 'blue',
  month: 8,

  tags: {
    timeTag: '8月',
    regionTag: '神奈川',
    typeTag: '花火',
    layerTag: '详细介绍'
  
  },

  related: {
    regionRecommendations: [
      {
        id: 'kamakura-august',
        name: '镰仓花火大会',
        date: '2025年8月中旬',
        location: '神奈川县镰仓市',
        visitors: '约16万人',
        link: '/august/hanabi/kanagawa/kamakura'
      }
    ],
    timeRecommendations: [
      {
        id: 'chigasaki-july',
        name: '茅崎海岸夏季祭典',
        date: '2025年7月中旬',
        location: '神奈川县茅崎市',
        visitors: '约3万人',
        link: '/july/hanabi/kanagawa/chigasaki'
      }
    ]
  },

  contact: {
    organizer: '茅崎市观光协会',
    phone: '0467-84-0377',
    website: 'https://www.city.chigasaki.kanagawa.jp/kanko/event/event_2025.html',
    socialMedia: '茅崎市观光协会'
  },

  mapInfo: {
    hasMap: true,
    mapNote: '南海滩茅崎（茅崎海水浴场）',
    parking: '周边有收费停车场（数量有限）'
  },

  weatherInfo: {
    month: '8月',
    temperature: '最高30°C，最低23°C',
    humidity: '80%',
    rainfall: '小雨举行（恶劣天气中止）',
    recommendation: '海滨地区，注意防晒和补水'
  },

  venues: [
    {
      name: '南海滩茅崎主会场',
      location: '茅崎市中海岸4丁目12986-1',
      startTime: '19:30',
      features: [
        '距离车站步行20分钟',
        '湘南海岸美景',
        '海水浴场设施',
        '夏季海滨风情'
      ]
    }
  ],

  access: [
    {
      venue: '主会场',
      stations: [
        {
          name: 'JR茅崎站',
          lines: ['JR东海道本线'],
          walkTime: '南口步行20分钟'
        }
      ]
    }
  ],

  viewingSpots: [
    {
      name: '南海滩茅崎海水浴场',
      rating: 5,
      crowdLevel: 'High',
      tips: '最佳观赏位置，可在海滩上观赏海上花火',
      pros: ['海上花火迫力', '湘南海岸美景', '免费观赏', '夏季海滨体验'],
      cons: ['人群密集', '需要早到占位', '沙滩环境']
    },
    {
      name: '茅崎海岸公园',
      rating: 4,
      crowdLevel: 'Medium',
      tips: '稍高位置观赏，视野开阔',
      pros: ['视野开阔', '公园设施', '相对舒适', '便于离场'],
      cons: ['距离稍远', '观赏效果一般']
    }
  ],

  history: {
    established: 1975,
    significance: '创始于昭和50年，2025年第51回，茅崎市代表性夏季海滨花火大会',
    highlights: [
      '历史50年传统',
      '湘南海岸特色',
      '海上花火的美丽',
      '茅崎夏季风物诗'
    ]
  },

  tips: [
    {
      category: '时间安排',
      items: [
        '建议提前1小时到场占位',
        '18:00后会场周边交通管制',
        '海上花火是最大看点'
      ]
    },
    {
      category: '观赏建议',
      items: [
        '海水浴场观赏效果最佳',
        '可以体验海水浴后观赏花火',
        '携带沙滩垫和饮料'
      ]
    },
    {
      category: '交通停车',
      items: [
        '周边停车场数量有限',
        '推荐使用公共交通',
        '小雨天气照常举行'
      ]
    }
  ],

  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3251.456!2d139.403!3d35.324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDE5JzI2LjQiTiAxMznCsDI0JzEwLjgiRQ!5e0!3m2!1sja!2sjp!4v1629876543210!5m2!1sja!2sjp"
}; 