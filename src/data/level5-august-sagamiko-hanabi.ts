/**
 * 第五层数据文件 - 第73回相模湖湖上祭花火大会详情数据
 * @layer 五层 (Detail Data)
 * @month 8月
 * @region 神奈川
 * @event 相模湖湖上祭花火大会
 * @type 花火详情数据文件
 */
import { HanabiData } from '@/types/hanabi';

export const sagamikoHanabiData: HanabiData = {
  id: 'sagamiko-hanabi-2025',
  name: '第73回相模湖湖上祭花火大会',
  japaneseName: '第73回 さがみ湖湖上祭花火大会',
  englishName: '73rd Sagami Lake Festival Fireworks',
  title: '第73回相模湖湖上祭花火大会 - 8月神奈川花火大会',
  description: '第73回相模湖湖上祭花火大会详情信息，包含举办时间、地点、交通方式、观赏攻略等完整信息。',
  year: 2025,
  date: '2025年8月1日（金）',
  time: '19:30～20:40',
  duration: '约70分钟',
  fireworksCount: '约4000发',
  expectedVisitors: '约5万5000人',
  weather: '小雨举行（恶劣天气中止）',
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
        id: 'minatomirai-august',
        name: '港未来智能节庆2025',
        date: '2025年8月4日',
        location: '神奈川县横滨市',
        visitors: '约2万人',
        link: '/august/hanabi/kanagawa/minatomirai'
      },
      {
        id: 'odawara-august',
        name: '第36回小田原酒匂川花火大会',
        date: '2025年8月2日',
        location: '神奈川县小田原市',
        visitors: '约25万人',
        link: '/august/hanabi/kanagawa/odawara'
      }
    ],
    timeRecommendations: [
      {
        id: 'sagamiko-july',
        name: '相模湖夏季祭典',
        date: '2025年7月中旬',
        location: '神奈川县相模原市',
        visitors: '约3万人',
        link: '/july/hanabi/kanagawa/sagamiko'
      }
    ]
  },

  contact: {
    organizer: '相模湖观光协会',
    phone: '042-684-2633',
    website: 'https://www.e-sagamihara.com/event/event-737/',
    socialMedia: '官方网站查询'
  },

  mapInfo: {
    hasMap: true,
    mapNote: '相模湖上会场',
    parking: '788台停车场（相模湖公园138台 2000日元，临时停车场650台 1000日元）'
  },

  weatherInfo: {
    month: '8月',
    temperature: '最高30°C，最低25°C',
    humidity: '75%',
    rainfall: '小雨举行（恶劣天气中止）',
    recommendation: '夏季山湖地带，注意夜间湖风较凉'
  },

  venues: [
    {
      name: '相模湖上主会场',
      location: '相模湖上',
      startTime: '19:30',
      features: [
        '距离相模湖站步行10分钟',
        '湖上花火独特演出',
        '788台停车场',
        '山湖环绕优美环境'
      ]
    }
  ],

  access: [
    {
      venue: '主会场',
      stations: [
        {
          name: 'JR相模湖站',
          lines: ['JR中央本线'],
          walkTime: '步行10分钟'
        }
      ]
    }
  ],

  viewingSpots: [
    {
      name: '相模湖公园观赏区',
      rating: 5,
      crowdLevel: 'Very High',
      tips: '最佳观赏位置，距离花火最近，建议提前2小时到场占位',
      pros: ['距离打上场所最近', '湖上花火迫力十足', '免费开放区域', '视野开阔'],
      cons: ['人群密集', '需要早到占位', '离场时拥挤']
    },
    {
      name: '湖畔散步道观赏区',
      rating: 4,
      crowdLevel: 'Medium',
      tips: '适合想要安静观赏的游客，沿湖步道多个观赏点',
      pros: ['观赏角度多样', '人群相对较少', '环境优美', '便于移动'],
      cons: ['距离较远', '部分位置有遮挡', '照明较少']
    },
    {
      name: '万力大桥观赏区',
      rating: 4,
      crowdLevel: 'High',
      tips: '桥上俯瞰湖上花火的独特视角，注意安全',
      pros: ['独特俯瞰角度', '较高视点', '摄影效果佳', '湖面倒影美景'],
      cons: ['桥上空间有限', '安全需注意', '17:00后交通管制']
    }
  ],

  history: {
    established: 1948,
    significance: '创始于昭和23年，2025年第73回，历史77年的传统湖上花火大会',
    highlights: [
      '历史77年传统',
      '湖上花火特色',
      '山湖环抱美景',
      '相模湖代表庆典'
    ]
  },

  tips: [
    {
      category: '时间安排',
      items: [
        '建议提前2小时到场占位',
        '17:00后会场周边交通管制',
        '湖上花火演出是最大看点'
      ]
    },
    {
      category: '观赏建议',
      items: [
        '相模湖公园观赏效果最佳',
        '湖畔散步道提供多个观赏点',
        '携带垫子和饮料更舒适'
      ]
    },
    {
      category: '交通停车',
      items: [
        '推荐使用JR中央本线',
        '停车场有限建议早到',
        '小雨天气照常举行'
      ]
    }
  ],

  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3246.123!2d139.224!3d35.613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z55u45qih5rmW!5e0!3m2!1sja!2sjp!4v1629876543210!5m2!1sja!2sjp"
}; 