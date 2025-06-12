/**
 * 第五层数据文件 - 第20回 古河花火大会详情数据
 * @layer 五层 (Detail Data)
 * @month 8月
 * @region 北关东
 * @event 古河花火大会
 * @type 花火详情数据文件
 * 数据来源：https://hanabi.walkerplus.com/detail/ar0308e01029/
 * 最后更新：2024年12月
 */
import { HanabiData } from '@/types/hanabi'

export const kogaHanabiData: HanabiData = {
  id: 'koga-august-hanabi-2025',
  name: '第20回 古河花火大会',
  japaneseName: '第20回 古河花火大会',
  englishName: '20th Koga Fireworks Festival',
  year: 2025,
  month: 8,
  date: '2025年8月2日(土)',
  time: '19:20～20:30',
  duration: '70分',
  fireworksCount: '非公表',
  expectedVisitors: '约20万人',
  weather: '晴朗，适合观赏',
  ticketPrice: '有料席1席4名最多2万2000日元等',
  status: '开催预定',
  themeColor: '#FF6B35',
  
  tags: {
    timeTag: '8月',
    regionTag: '北关东',
    typeTag: '花火',
    layerTag: '详细介绍'
  
  },

  media: [
    {
      type: 'image',
      url: '/images/hanabi/mito-fireworks-main.svg',
      title: '第20回古河花火大会',
      description: '渡良瀬川夜空的绚烂花火，三尺玉与特大宽幅星雨的华丽演出'
    }
  ],

  related: {
    regionRecommendations: [
      {
        id: 'ashikaga-august',
        name: '第109回足利花火大会',
        date: '2025年8月2日',
        location: '栃木县足利市',
        visitors: '约45万人',
        link: '/august/hanabi/kitakanto/ashikaga'
      },
      {
        id: 'toride-august',
        name: '第70回利根川大花火',
        date: '2025年8月9日',
        location: '茨城县取手市',
        visitors: '约12万人',
        link: '/august/hanabi/kitakanto/toride'
      }
    ],
    timeRecommendations: [
      {
        id: 'maebashi-august',
        name: '第69回前桥花火大会',
        date: '2025年8月9日',
        location: '群马县前桥市',
        visitors: '非公开',
        link: '/august/hanabi/kitakanto/maebashi'
      }
    ]
  },

  venues: [
    {
      name: '古河高尔夫球场',
      location: '茨城県古河市',
      startTime: '19:20',
      features: ['河川敷高尔夫球场', '自然環境观赏', '三尺玉2発打上']
    }
  ],

  access: [
    {
      venue: '主会场',
      stations: [
        { 
          name: 'JR古河站', 
          lines: ['JR东北本线'], 
          walkTime: '徒歩20分钟' 
        },
        { 
          name: '东武新古河站', 
          lines: ['东武铁道日光线'], 
          walkTime: '徒歩5分钟' 
        }
      ]
    }
  ],

  viewingSpots: [
    {
      name: '会場正面区域',
      rating: 5,
      crowdLevel: 'Very High',
      tips: '直径约650米的大轮花火观赏，特大宽幅星雨',
      pros: ['最佳观赏位置', '直径650米大轮花火', '特大宽幅星雨'],
      cons: ['人群较多', '需要早到占位', '有料席需要提前预约']
    },
    {
      name: '川土手观览席',
      rating: 4,
      crowdLevel: 'High',
      tips: '野餐垫观赏可能，自然观赏体验',
      pros: ['可铺设野餐垫', '自然观赏体验', '绢烂豪华花火絵巻'],
      cons: ['需要自备观赏用品', '河川敷地面不平', '风较大']
    }
  ],

  history: {
    established: 2006,
    significance: '第20回古河市代表性花火大会。渡良瀬川夜空展开的绚烂豪华花火絵巻深受市民喜爱。邀请野村花火工業株式会社等，以高品质节目著称。',
          highlights: ['三尺玉2発打上', '特大宽幅星雨', '野村花火工業演出']
  },

  tips: [
    {
      category: '观赏建议',
      items: [
        '会場是河川敷高尔夫球场，可在川土手铺野餐垫悠闲鑑賞',
        '直径約650米的大輪花火具有震撼规模',
        '被称为日本第一花火师的野村花火工業特别演出'
      ]
    },
    {
      category: '注意事项',
      items: [
        '恶劣天气情况下中止(无延期日)',
        '充分发挥会场特征的特大宽幅星雨是看点',
        '2000台免费停车场完备'
      ]
    },
    {
      category: '交通安排',
      items: [
        'JR古河駅徒歩20分钟，东武铁道新古河駅徒歩5分钟',
        '东北道馆林IC约20分钟(国道354号经由)',
        '夏夜建议轻装参加'
      ]
    }
  ],

  contact: {
    organizer: '古河市観光物産課内古河花火大会実行委員会',
    phone: '0280-22-5111',
    website: 'https://www.city.ibaraki-koga.lg.jp/soshiki/kanko/4_1/2025hanabi.html',
    socialMedia: '官方网站查询'
  },

  mapInfo: {
    hasMap: true,
    mapNote: '古河高尔夫球场河川敷开催。JR古河駅・东武新古河駅交通便利',
    parking: '2000台免费停车场完备'
  },

  weatherInfo: {
    month: '8月',
    temperature: '最高32°C，最低24°C',
    humidity: '75%',
    rainfall: '恶劣天气情况下中止(无延期日)',
    recommendation: '夏夜建议轻装参加'
  },

  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3215.8942!2d139.6951!3d36.1892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60203e5b4c5d2b69%3A0x8c9b7c8d9e2f1a34!2z5Y2k5rKz44K044Ko44Or44OV44Oq44Oz44Kv44K5!5e0!3m2!1sja!2sjp!4v1639123456789!5m2!1sja!2sjp'
} 