import { HanabiData } from '@/types/hanabi';

export const nagaokaHanabiData: HanabiData = {
  id: 'nagaoka-matsuri-hanabi-2025',
  name: '长冈祭大花火大会',
  japaneseName: '長岡まつり大花火大会',
  englishName: 'Nagaoka Festival Grand Fireworks',
  year: 2025,
  month: 8,
  date: '2025年8月2日、3日',
  time: '19:20-21:10',
  duration: '110分钟',
  fireworksCount: '非公开',
  expectedVisitors: '约34万5000人',
  weather: '小雨决行（打上场所冠水或强风时延期或中止）',
  ticketPrice: '有料席详情请确认官方网站',
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
      url: '/images/hanabi/nagaoka-fireworks.svg',
      title: '长冈祭大花火大会壮观场面',
      description: '信浓川河川敷举行的日本三大花火大会之一，复兴祈愿花火凤凰震撼人心'
    }
  ],
  
  venues: [
    {
      name: '信浓川河川敷',
      location: '新潟县长冈市信浓川河川敷',
      startTime: '19:20',
      features: [
        '开花幅约650米的正三尺玉',
        '开花幅约2公里的复兴祈愿凤凰花火',
        '信浓川两岸观览席设置',
        '尺玉多用演出'
      ]
    }
  ],

  access: [
    {
      venue: '信浓川河川敷',
      stations: [
        {
          name: 'JR长冈站',
          lines: ['JR上越新干线', 'JR信越本线'],
          walkTime: '徒步30分钟'
        }
      ]
    }
  ],

  viewingSpots: [
    {
      name: '信浓川右岸观览席',
      rating: 5,
      crowdLevel: '高',
      tips: '正面观赏位置，可完整体验正三尺玉和凤凰花火的震撼',
      pros: ['正面观赏', '音响效果最佳', '尺玉迫力满点'],
      cons: ['人群极度密集', '需要提前购买有料席']
    },
    {
      name: '信浓川左岸观览席',
      rating: 5,
      crowdLevel: '高',
      tips: '从对岸观赏，可拍摄到完整的花火与河面倒影',
      pros: ['河面反射美景', '摄影角度佳', '双方向观赏特色'],
      cons: ['距离较远', '有料席需要预约']
    },
    {
      name: '长冈站周边',
      rating: 3,
      crowdLevel: '中',
      tips: '从稍远位置观赏，可避开最拥挤区域',
      pros: ['交通便利', '观赏后离场方便'],
      cons: ['视野受限', '无法体验完整音响效果']
    }
  ],

  history: {
    established: 1946,
    significance: '长冈空袭死难者慰灵与复兴尽力先人感谢、恒久和平愿望等长冈市民特别想法的花火大会',
    highlights: [
      '1946年战后复兴祈愿开始',
      '日本三大花火大会之一',
      '复兴祈愿花火凤凰诞生',
      '正三尺玉开花幅650米',
      '信浓川两岸观览特色'
    ]
  },

  tips: [
    {
      category: '观赏建议',
      items: [
        '建议购买有料席确保观赏位置',
        '携带折叠椅或野餐垫',
        '准备防虫喷雾',
        '夜间气温下降，准备保暖衣物'
      ]
    },
    {
      category: '交通提示',
      items: [
        'JR长冈站往返极度混雑',
        '当日会场周边交通规制',
        '建议利用公共交通',
        '结束后等待分散再移动'
      ]
    },
    {
      category: '花火特色',
      items: [
        '正三尺玉开花幅约650米',
        '复兴祈愿凤凰开花幅约2公里',
        '尺玉多用演出稀有',
        '信浓川两岸双方向观赏'
      ]
    },
    {
      category: '2025年特色',
      items: [
        '长冈空袭慰灵复兴祈愿',
        '恒久和平愿望传达',
        '长冈市民特别想法体现',
        '度重苦难克服象征'
      ]
    }
  ],

  contact: {
    organizer: '一般财团法人 长冈花火财团',
    phone: '0570-00-8283',
    website: 'https://nagaokamatsuri.com/',
    socialMedia: '@nagaoka_hanabi'
  },

  mapInfo: {
    hasMap: true,
    mapNote: '信浓川河川敷，当日会场周边交通规制实施',
    parking: '有（详情请确认官方网站）'
  },

  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3175.8234567890123!2d138.8512345678901!3d37.4456789012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5ff7a123456789ab%3A0x123456789abcdef0!2z6ZW35bKh5biC5L-h5r-D5bed5rKz5bed5pW7!5e0!3m2!1sja!2sjp!4v1234567890123!5m2!1sja!2sjp',

  weatherInfo: {
    month: '8月',
    temperature: '最高30°C 最低22°C',
    humidity: '70-80%',
    rainfall: '夏季雷雨可能',
    recommendation: '河川敷夜间相对凉爽，但仍需注意中暑对策',
    rainPolicy: '小雨决行（打上场所冠水或强风时延期或中止）',
    note: '信浓川河川敷，夜间河风凉爽'
  },

  specialFeatures: {
    scale: '日本三大花火大会之一，110分钟连续演出',
    location: '信浓川河川敷开阔视野，两岸观览特色',
    tradition: '1946年战后复兴祈愿开始的历史传统',
    atmosphere: '慰灵与复兴祈愿，恒久和平愿望',
    collaboration: '正三尺玉与复兴祈愿凤凰的震撼演出'
  },

  special2025: {
    theme: '复兴祈愿与恒久和平',
    concept: '长冈空袭慰灵与先人感谢',
    memorial: '度重苦难克服的长冈市民特别想法',
    features: [
      '正三尺玉开花幅约650米',
      '复兴祈愿凤凰开花幅约2公里',
      '信浓川两岸双方向观赏',
      '尺玉多用演出稀有体验',
      '长冈市民特别想法传达'
    ]
  },

  related: {
    regionRecommendations: [],
    timeRecommendations: []
  },

  dataSourceUrl: 'https://hanabi.walkerplus.com/detail/ar0415e00665/',

  officialSource: {
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0415e00665/',
    verificationDate: '2025年1月13日',
    dataConfirmedBy: 'USER_PROVIDED',
    lastChecked: '2025年1月13日'
  }
}; 