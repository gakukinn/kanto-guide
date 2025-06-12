/**
 * 第五层数据文件 - 2025久里浜ペリー祭花火大会详情数据
 * @layer 五层 (Detail Data)
 * @month 8月
 * @region 神奈川
 * @event 久里浜ペリー祭花火大会
 * @type 花火详情数据文件
 * @source https://hanabi.walkerplus.com/detail/ar0314e00880/
 */
import { HanabiData } from '@/types/hanabi';

export const kurihamaHanabiData: HanabiData = {
  id: 'kurihama-perry-hanabi-2025',
  name: '2025久里浜佩里祭花火大会',
  japaneseName: '2025久里浜ペリー祭花火大会',
  englishName: '2025 Kurihama Perry Festival Fireworks',
  year: 2025,
  date: '2025年8月2日（土）',
  time: '19:30～20:00',
  duration: '约30分钟',
  fireworksCount: '约5000发',
  expectedVisitors: '约8万人',
  weather: '小雨举行（恶劣天气中止・不延期）',
  ticketPrice: '无料观赏・有料席并设',
  status: '已确认举办',
  themeColor: 'red',
  month: 8,

  title: '久里滨佩里祭花火大会 2025 | 神奈川夏日花火盛典',
  description: '2025年8月2日在神奈川久里滨举办的佩里祭花火大会，约5000发花火与纪念佩里来航的文化活动，吸引约8万游客的夏日盛典。',

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
        name: '港未来智能节庆',
        date: "8月4日",
        location: '横滨港未来',
        visitors: '约2万人',
        link: '/august/hanabi/kanagawa/minatomirai'
      },
      {
        id: 'sagamiko-august',
        name: '相模湖湖上祭花火大会',
        date: "8月1日",
        location: '相模原市绿区',
        visitors: '约5万5000人',
        link: '/august/hanabi/kanagawa/sagamiko'
      },
      {
        id: 'odawara-august',
        name: '小田原酒匂川花火大会',
        date: "8月2日",
        location: '小田原市',
        visitors: '约25万人',
        link: '/august/hanabi/kanagawa/odawara'
      }
    ],
    timeRecommendations: [
      {
        id: 'kanagawa-july',
        name: '7月神奈川花火',
        date: '7月',
        location: '神奈川县各地',
        visitors: '各会场不同',
        link: '/july/hanabi/kanagawa'
      },
      {
        id: 'kanagawa-september',
        name: '9月神奈川花火',
        date: '9月',
        location: '神奈川县各地',
        visitors: '各会场不同',
        link: '/september/hanabi/kanagawa'
      }
    ]
  },

  contact: {
    organizer: '久里浜观光协会',
    phone: '046-834-1111',
    website: 'https://perryfes.jp/',
    socialMedia: '久里浜观光协会事务局'
  },

  mapInfo: {
    hasMap: true,
    mapNote: '久里浜海岸附近',
    parking: '无停车场・推荐使用公共交通'
  },

  weatherInfo: {
    month: '8月',
    temperature: '最高27°C，最低20°C',
    humidity: '70%',
    rainfall: '小雨照常举行、恶劣天气中止・不延期',
    recommendation: '海风较强，建议携带外套',
    note: '有关当日天气请确认官方网站'
  },

  venues: [
    {
      name: '久里浜海岸主会场',
      location: '神奈川县横须贺市久里浜海岸附近',
      startTime: '19:30',
      features: [
        '佩里提督上陆纪念地',
        '约5000发花火发射',
        '开国集市同时举办',
        '海岸花火观赏'
      ]
    }
  ],

  access: [
    {
      venue: '主会场',
      stations: [
        {
          name: '京急久里浜駅',
          lines: ['京浜急行电铁'],
          walkTime: '徒步15分钟'
        },
        {
          name: 'JR久里浜駅',
          lines: ['JR东海道本线'],
          walkTime: '徒步17分钟'
        }
      ]
    }
  ],

  viewingSpots: [
    {
      name: '久里浜海岸观赏区',
      rating: 5,
      crowdLevel: 'Very High',
      tips: '最佳观赏位置，海岸直接观赏花火，建议提前到场占位',
      pros: ['海岸绝景观赏', '花火在海面的倒影', '免费开放区域', '感受开国历史'],
      cons: ['人群非常密集', '需要很早到场', '海风较强', '离场时极为拥挤']
    },
    {
      name: '车站周边观赏区',
      rating: 3,
      crowdLevel: 'Medium',
      tips: '适合带小孩的家庭，交通便利但距离较远',
      pros: ['交通便利', '人群相对较少', '便于离场', '周边有便利店'],
      cons: ['距离较远', '观赏效果一般', '建筑物遮挡', '花火较小']
    },
    {
      name: '高台观赏区',
      rating: 4,
      crowdLevel: 'High',
      tips: '周边山丘高台，俯瞰式观赏角度',
      pros: ['俯瞰观赏角度', '避开人群', '摄影效果佳', '视野开阔'],
      cons: ['步行距离较远', '夜间道路较暗', '坡道较陡', '设施较少']
    }
  ],

  history: {
    established: 1853,
    significance: '纪念佩里提督黑船来航172周年的历史性花火大会',
    highlights: [
      '开国历史舞台',
      '172年纪念意义',
      '全城庆祝氛围',
      '久里浜夏日风物诗'
    ]
  },

  tips: [
    {
      category: '时间安排',
      items: [
        '从开国集市开始参加可享受节庆气氛',
        '花火时间为19:30-20:00的30分钟',
        '白天活动内容丰富'
      ]
    },
    {
      category: '观赏建议',
      items: [
        '海岸附近是最佳观赏场所',
        '花火的海面反射也是看点',
        '海风对策建议携带外套'
      ]
    },
    {
      category: '交通注意',
      items: [
        '无停车场因此必须使用公共交通',
        '京急久里浜站是最近车站',
        '佩里上陆纪念式典也可参观'
      ]
    }
  ],

  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3256.8934!2d139.6899!3d35.2456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60184e8b8c4c1234%3A0x5678901234567890!2z5LiF6YeM5rWc5rGf!5e0!3m2!1sja!2sjp!4v1634567890123"
}; 