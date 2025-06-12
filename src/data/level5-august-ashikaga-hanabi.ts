/**
 * 第五层数据文件 - 第109回足利花火大会详情数据
 * @layer 五层 (Detail Data)
 * @month 8月
 * @region 北关东
 * @event 足利花火大会
 * @type 花火详情数据文件
 */
import { HanabiData } from '@/types/hanabi';

export const ashikagaHanabiData: HanabiData = {
  id: 'ashikaga-hanabi-2025',
  name: '第109回足利花火大会',
  japaneseName: '第109回 足利花火大会',
  englishName: '109th Ashikaga Fireworks Festival',
  title: '第109回足利花火大会 - 8月北关东花火大会',
  description: '历史122年的传统花火大会，在渡良瀬川河川敷举办，约2万发花火照亮足利夜空，是关东地区屈指可数的大型花火盛典。',
  year: 2025,
  date: '2025年8月2日（土）',
  time: '19:15～20:50',
  duration: '约95分钟',
  fireworksCount: '约2万发',
  expectedVisitors: '约45万人',
  weather: '小雨举行（恶劣天气延期至3日）',
  ticketPrice: '无料观赏・有料观览席并设',
  status: '已确认举办',
  themeColor: 'orange',
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
        id: 'takasaki-august',
        name: '第51回高崎大花火大会',
        date: '2025年8月23日',
        location: '群马县高崎市',
        visitors: '约90万人',
        link: '/august/hanabi/kitakanto/takasaki'
      },
      {
        id: 'maebashi-august',
        name: '第69回前桥花火大会',
        date: '2025年8月9日',
        location: '群马县前桥市',
        visitors: '约23万人',
        link: '/august/hanabi/kitakanto/maebashi'
      }
    ],
    timeRecommendations: [
      {
        id: 'ashikaga-july',
        name: '足利夏季祭典',
        date: '2025年7月中旬',
        location: '栃木县足利市',
        visitors: '约15万人',
        link: '/july/hanabi/kitakanto/ashikaga'
      }
    ]
  },

  contact: {
    organizer: '足利花火大会实行委员会',
    phone: '0284-21-1354',
    website: 'https://www.city.ashikaga.tochigi.jp/industory/000061/000326/p007200.html',
    socialMedia: '官方网站查询'
  },

  mapInfo: {
    hasMap: true,
    mapNote: '渡良瀬川田中桥下流河川敷',
    parking: '约8100台免费停车场（17:30-21:30交通管制）'
  },

  weatherInfo: {
    month: '8月',
    temperature: '最高33°C，最低25°C',
    humidity: '70%',
    rainfall: '小雨举行（恶劣天气延期至3日）',
    recommendation: '夏季炎热，请注意防暑降温'
  },

  venues: [
    {
      name: '渡良瀬川河川敷主会场',
      location: '渡良瀬川田中桥下流河川敷',
      startTime: '19:15',
      features: [
        '距离车站步行5分钟',
        '河川敷开阔视野',
        '约8100台停车场',
        '市中心便利交通'
      ]
    }
  ],

  access: [
    {
      venue: '主会场',
      stations: [
        {
          name: 'JR足利站',
          lines: ['JR両毛线'],
          walkTime: '南口步行5分钟'
        },
        {
          name: '东武足利市站',
          lines: ['东武伊势崎线'],
          walkTime: '步行10分钟'
        }
      ]
    }
  ],

  viewingSpots: [
    {
      name: '河川敷主观赏区',
      rating: 5,
      crowdLevel: 'Very High',
      tips: '最佳观赏位置，距离花火最近，建议提前到场占位',
      pros: ['距离打上场所最近', '迫力十足的大玉观赏', '免费开放区域', '视野开阔'],
      cons: ['人群密集', '需要早到占位', '离场时拥挤']
    },
    {
      name: '车站前观赏区',
      rating: 3,
      crowdLevel: 'Medium',
      tips: '适合带小孩的家庭，交通便利',
      pros: ['交通便利', '适合短时间观赏', '人群相对较少', '便于离场'],
      cons: ['距离较远', '观赏效果一般', '高建筑物遮挡']
    },
    {
      name: '田中桥观赏区',
      rating: 4,
      crowdLevel: 'High',
      tips: '注意桥上安全，摄影效果佳',
      pros: ['独特观赏角度', '较高视点', '摄影效果佳', '人群适中'],
      cons: ['桥上空间有限', '安全需注意', '风较大']
    }
  ],

  history: {
    established: 1903,
    significance: '创始于明治36年，2025年第109回，历史122年的传统花火大会',
    highlights: [
      '历史122年传统',
      '市中心开催特色',
      '关东屈指花火大会',
      '足利最活跃庆典'
    ]
  },

  tips: [
    {
      category: '时间安排',
      items: [
        '建议提前1小时到场占位',
        '17:30后会场周边交通管制',
        '大瀑布花火是最大看点'
      ]
    },
    {
      category: '观赏建议',
      items: [
        '河川敷主会场观赏效果最佳',
        '车站前也能观赏到花火',
        '携带垫子和饮料更舒适'
      ]
    },
    {
      category: '交通停车',
      items: [
        '停车场免费但数量有限',
        '推荐使用公共交通',
        '小雨天气照常举行'
      ]
    }
  ],

  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3235.123!2d139.449!3d36.337!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDIwJzEzLjIiTiAxMznCsDI2JzU2LjQiRQ!5e0!3m2!1sja!2sjp!4v1629876543210!5m2!1sja!2sjp"
}; 