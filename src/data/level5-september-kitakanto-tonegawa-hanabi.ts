import { HanabiData } from '../types/hanabi';

export const tonegawaHanabiData: HanabiData = {
  id: 'tonegawa-hanabi-september',
  name: '第38回利根川大花火大会',
  japaneseName: '第38回 利根川大花火大会',
  englishName: '38th Tone River Grand Fireworks Festival',
  year: 2025,
  date: '9月13日(土)',
  time: '18:30～20:30',
  duration: '约120分钟',
  fireworksCount: '约3万发',
  expectedVisitors: '约30万人',
  weather: '初秋凉爽',
  ticketPrice: '有料观览席',
  status: '开催预定',
  themeColor: '#FF6B35',
  month: 9,
  
  title: '第38回利根川大花火大会 | 2025年9月北关东花火大会',
  description: '第38回利根川大花火大会，四大花火师梦幻合作，约3万发花火照亮利根川夜空。茨城县境町河滨公园，2025年9月13日开催。',
  
  tags: {
    timeTag: '9月',
    regionTag: '北关东',
    typeTag: '花火',
    layerTag: '详细介绍'
  
  },
  
  related: {
    regionRecommendations: [
      {
        id: 'numata-hanabi',
        name: '第13回沼田花火大会',
        date: "9月13日",
        location: '群马县沼田市',
        visitors: '5万3000人',
        link: '/september/hanabi/kitakanto/numata-hanabi'
      },
      {
        id: 'joso-kinugawa-hanabi',
        name: '第58回常总绢川花火大会',
        date: "9月20日",
        location: '茨城县常总市',
        visitors: '约13万人',
        link: '/september/hanabi/kitakanto/joso-kinugawa-hanabi'
      }
    ],
    timeRecommendations: [
      {
        id: 'toride-hanabi',
        name: '第70回利根川大花火',
        date: "8月9日",
        location: '茨城县取手市',
        visitors: '约12万人',
        link: '/august/hanabi/kitakanto/toride-hanabi'
      },
      {
        id: 'ashikaga-hanabi',
        name: '第109回足利花火大会',
        date: "8月2日",
        location: '栃木县足利市',
        visitors: '约45万人',
        link: '/august/hanabi/kitakanto/ashikaga-hanabi'
      }
    ]
  },

  history: {
    established: 1988,
    significance: '茨城县境町代表性花火大会，关东地区最大规模花火盛典之一',
    highlights: [
      '第38回传统花火大会，历史悠久',
      '四大知名花火师梦幻合作演出',
      '约3万发花火的壮观规模',
      '茨城县人气第1位的花火大会'
    ]
  },

  venues: [
    {
      name: '境町河滨公园会场',
      location: '茨城县猿岛郡境町 境町河滨公园',
      startTime: '18:00开幕式开始，18:30花火开始',
      features: [
        '利根川河川敷的开阔观赏空间',
        '四大花火师竞演的精彩演出',
        '最大10号玉300米开花的震撼',
        '音乐与花火完美同步的表演'
      ]
    }
  ],

  access: [
    {
      venue: '境町河滨公园',
      stations: [
        {
          name: '古河站',
          lines: ['JR宇都宫线'],
          walkTime: '乘坐穿梭巴士'
        }
      ]
    }
  ],

  viewingSpots: [
    {
      name: '有料观览席',
      rating: 5,
      crowdLevel: '高',
      tips: '提前预约有料观览席，享受最佳观赏体验',
      pros: ['视野开阔', '音响效果佳', '设施完善'],
      cons: ['需要付费', '需要预约']
    },
    {
      name: '河川敷自由观览区',
      rating: 4,
      crowdLevel: '极高',
      tips: '免费观赏区域，需要极早到场占位',
      pros: ['免费观赏', '氛围热烈', '近距离观看'],
      cons: ['极度拥挤', '需要占位', '设施有限']
    }
  ],

  tips: [
    {
      category: '交通建议',
      items: [
        '圈央道境古河IC约10分钟，但当日可能需3小时',
        '推荐利用公共交通和穿梭巴士',
        '4000台停车位需事前预约',
        '避开交通高峰时段'
      ]
    },
    {
      category: '观赏攻略',
      items: [
        '有料观览席提供最佳观赏体验',
        '自由观览区需要提前2-3小时到场',
        '携带坐垫和保暖衣物',
        '注意河边安全'
      ]
    },
    {
      category: '会场信息',
      items: [
        '有料桟敷席内有饮食店出店',
        '会场付近也有出店预定',
        '荒天时延期至9月14日',
        '详细信息请确认公式网站'
      ]
    }
  ],

  mapInfo: {
    hasMap: true,
    mapNote: '境町河滨公园周边地图',
    parking: '4000台停车位，需事前预约'
  },

  website: 'https://www.sakai-hanabi.com/',
  
  contact: {
    organizer: '境町观光协会',
    phone: '0280-81-1319',
    website: 'https://www.sakai-hanabi.com/',
    socialMedia: ''
  },
  
  weatherInfo: {
    month: '9月',
    temperature: '初秋凉爽，日间25℃左右，夜间18℃左右',
    humidity: '适中',
    rainfall: '荒天时延期至翌日',
    recommendation: '建议携带薄外套，注意保暖'
  }
}; 