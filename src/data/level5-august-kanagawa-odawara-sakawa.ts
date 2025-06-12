/**
 * 第五层数据文件 - 第36回小田原酒匂川花火大会详情数据
 * @layer 五层 (Detail Data)
 * @month 8月
 * @region 神奈川
 * @event 小田原酒匂川花火大会
 * @type 花火详情数据文件
 */
import { HanabiData } from '../types/hanabi';

export const eventData: HanabiData = {
  id: 'odawara-sakawa-hanabi-2025',
  name: '第36回小田原酒匂川花火大会',
  japaneseName: '第36回小田原酒匂川花火大会',
  englishName: '36th Odawara Sakawa River Fireworks Festival',
  title: '第36回小田原酒匂川花火大会 - 8月神奈川花火大会',
  description: '在小田原市酒匂川体育广场举办的传统花火大会，约1万发花火照亮酒匂川夜空，是神奈川县西部地区的重要夏季活动。',
  year: 2025,
  date: '2025年8月2日（土）',
  time: '19:10～20:30',
  duration: '约80分钟',
  fireworksCount: '约1万发',
  expectedVisitors: '约25万人',
  weather: '小雨举行（恶劣天气延期至3日）',
  ticketPrice: '无料观赏・有料观览席并设',
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
        id: 'odawara-july',
        name: '小田原夏季祭典',
        date: '2025年7月中旬',
        location: '神奈川县小田原市',
        visitors: '约10万人',
        link: '/july/hanabi/kanagawa/odawara'
      }
    ]
  },

  contact: {
    organizer: '小田原酒匂川花火大会实行委员会',
    phone: '0465-23-1373',
    website: 'https://www.city.odawara.kanagawa.jp/',
    socialMedia: '小田原市公式网站'
  },

  mapInfo: {
    hasMap: true,
    mapNote: '酒匂川体育广场及周边河川敷',
    parking: '约3000台临时停车场'
  },

  weatherInfo: {
    month: '8月',
    temperature: '最高32°C，最低24°C',
    humidity: '75%',
    rainfall: '小雨举行（恶劣天气延期至3日）',
    recommendation: '夏季炎热，请注意防暑降温'
  },

  venues: [
    {
      name: '酒匂川体育广场主会场',
      location: '小田原市酒匂川体育广场',
      startTime: '19:10',
      features: [
        '距离车站步行20分钟',
        '河川敷开阔视野',
        '约3000台停车场',
        '小田原城下町风情'
      ]
    }
  ],

  access: [
    {
      venue: '主会场',
      stations: [
        {
          name: 'JR小田原站',
          lines: ['JR东海道本线'],
          walkTime: '东口步行20分钟'
        },
        {
          name: '小田急小田原站',
          lines: ['小田急小田原线'],
          walkTime: '步行20分钟'
        }
      ]
    }
  ],

  viewingSpots: [
    {
      name: '酒匂川河川敷主观赏区',
      rating: 5,
      crowdLevel: 'Very High',
      tips: '最佳观赏位置，距离花火最近，建议提前到场占位',
      pros: ['距离打上场所最近', '迫力十足的大玉观赏', '免费开放区域', '视野开阔'],
      cons: ['人群密集', '需要早到占位', '离场时拥挤']
    },
    {
      name: '小田原城址公园观赏区',
      rating: 3,
      crowdLevel: 'Medium',
      tips: '可同时欣赏小田原城和花火，独特体验',
      pros: ['历史文化体验', '独特观赏角度', '人群相对较少', '便于离场'],
      cons: ['距离较远', '观赏效果一般', '部分视野遮挡']
    }
  ],

  history: {
    established: 1990,
    significance: '创始于平成2年，2025年第36回，小田原市代表性夏季花火大会',
    highlights: [
      '历史35年传统',
      '酒匂川河川敷特色',
      '神奈川县西部最大花火大会',
      '小田原城下町夏季风物诗'
    ]
  },

  tips: [
    {
      category: '时间安排',
      items: [
        '建议提前1小时到场占位',
        '17:00后会场周边交通管制',
        '水中花火是最大看点'
      ]
    },
    {
      category: '观赏建议',
      items: [
        '河川敷主会场观赏效果最佳',
        '小田原城址公园也能观赏到花火',
        '携带垫子和饮料更舒适'
      ]
    },
    {
      category: '交通停车',
      items: [
        '临时停车场约3000台',
        '推荐使用公共交通',
        '小雨天气照常举行'
      ]
    }
  ],

  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3256.789!2d139.156!3d35.256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDE1JzIxLjYiTiAxMznCsDA5JzIxLjYiRQ!5e0!3m2!1sja!2sjp!4v1629876543210!5m2!1sja!2sjp"
}; 