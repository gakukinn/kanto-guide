/**
 * 第四层页面 - 高尾山红叶详情
 * @layer 四层 (Detail Layer)
 * @category 红叶狩
 * @region 东京都
 * @description 高尾山红叶详细信息页面，包含观赏指南、交通路线、实用建议等
 * @template MomijiDetailTemplate.tsx
 * @dataSource WalkerPlus - https://koyo.walkerplus.com/detail/ar0313e13090/
 */

import { Metadata } from 'next';
import MomijiDetailTemplate from '../../../../components/MomijiDetailTemplate';

export const metadata: Metadata = {
  title: '高尾山红叶2025 - 东京都八王子市最佳观赏指南',
  description:
    '高尾山红叶2025年完整观赏指南。11月中旬～12月上旬为最佳观赏期，提供详细的登山路线、缆车信息、观赏攻略。从东京市中心出发1小时即达，体验登山途中的山间红叶美景。',
  keywords: [
    '高尾山红叶',
    '东京红叶',
    '高尾山观赏指南',
    '2025红叶狩',
    '东京八王子市',
    '高尾山缆车',
    '山岳红叶',
    '登山红叶',
    '东京秋季景点',
    '日本红叶',
  ],
  openGraph: {
    title: '高尾山红叶2025 - 东京都八王子市最佳观赏指南',
    description:
      '高尾山红叶2025年完整观赏指南。从东京市中心1小时即达，体验登山途中的山间红叶美景。',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.kanto-travel-guide.com/tokyo/momiji/mount-takao',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/momiji/mount-takao-autumn.svg',
        width: 1200,
        height: 630,
        alt: '高尾山红叶',
      },
    ],
  },
};

// 高尾山红叶数据
const mountTakaoMomijiData = {
  id: 'tokyo-momiji-2',
  name: '高尾山红叶',
  englishName: 'Mount Takao Autumn Leaves',
  _sourceData: {
    japaneseName: '高尾山の紅葉',
    japaneseDescription: '高尾山の紅葉',
  },
  viewingPeriod: '11月中旬～12月上旬',
  peakTime: '11月中旬～11月下旬',
  coloringStart: '10月下旬',
  expectedVisitors: '每日约3000人',
  location: '东京都八王子市',
  description:
    '高尾山位于东京都八王子市，海拔599米，是距离东京市中心最近的登山胜地。每年秋季，山间红叶层层叠叠，从山脚到山顶呈现出不同的色彩变化，是东京地区最受欢迎的红叶观赏地之一。',
  themeColor: 'orange',
  status: 'confirmed',
  ticketPrice: '缆车往返1000日元',
  contact: {
    organizer: '高尾登山電鉄株式会社',
    phone: '042-661-4151',
    website: 'https://www.takaotozan.co.jp/',
  },
  mapInfo: {
    parking:
      '高尾山口站附近有收费停车场\n薬王院参道有临时停车场\n建议使用公共交通',
  },
  weatherInfo: {
    rainPolicy: '雨天缆车正常运行，但建议确认天气',
    note: '山上气温比市区低5-8度，请注意保暖',
    recommendation: '建议选择晴朗天气前往，可远眺富士山',
  },
  venues: [
    {
      name: '高尾山薬王院',
      location: '東京都八王子市高尾町2177',
      startTime: '早上7:00～下午5:00',
      features: [
        '古刹与红叶的庄严美景',
        '天狗传说与秋季祭典',
        '御护身符与红叶纪念品',
      ],
    },
    {
      name: '高尾山山顶展望台',
      location: '高尾山山顶（海拔599m）',
      startTime: '日出～日落',
      features: [
        '360度全景红叶观赏',
        '远眺富士山与丹沢山系',
        '关东平原一望无际',
      ],
    },
    {
      name: '一丁平',
      location: '高尾山～陣馬山縦走路',
      startTime: '全天开放',
      features: [
        '桜並木の紅葉が美しい',
        '縦走登山の中継点',
        'ベンチでの休憩スポット',
      ],
    },
  ],
  access: [
    {
      venue: '高尾山口站',
      stations: [
        {
          name: '京王高尾山口站',
          lines: ['京王高尾線'],
          walkTime: '徒步1分钟至缆车站',
        },
        {
          name: 'JR高尾站',
          lines: ['JR中央線'],
          walkTime: '转乘京王線至高尾山口站',
        },
      ],
    },
  ],
  viewingSpots: [
    {
      name: '缆车沿线',
      crowdLevel: '较拥挤',
      tips: '缆车上可欣赏沿途红叶变化，建议购买往返票',
      pros: ['轻松到达', '沿途景色优美', '适合老人小孩'],
      cons: ['排队时间长', '费用较高', '人多拥挤'],
    },
    {
      name: '1号路登山道',
      crowdLevel: '中等',
      tips: '最受欢迎的登山路线，道路平缓适合初学者',
      pros: ['道路平缓', '设施完善', '安全性高'],
      cons: ['人流较多', '缺乏挑战性'],
    },
    {
      name: '6号路琵琶滝道',
      crowdLevel: '较少',
      tips: '通过瀑布和溪流，可体验不同的红叶景观',
      pros: ['人少安静', '瀑布美景', '自然原始'],
      cons: ['路面湿滑', '需要一定体力', '标识较少'],
    },
    {
      name: '稲荷山コース',
      crowdLevel: '中等',
      tips: '登山感较强，可欣赏多样的红叶植被',
      pros: ['登山体验佳', '红叶种类丰富', '视野开阔'],
      cons: ['比较陡峭', '需要2-3小时', '体力要求高'],
    },
  ],
  tips: [
    {
      category: '最佳观赏时间',
      items: [
        '早上8:00-10:00人流较少，拍照效果好',
        '下午2:00-4:00阳光角度最佳',
        '避开周末和节假日，选择工作日前往',
        '11月中下旬为最佳观赏期',
      ],
    },
    {
      category: '装备建议',
      items: [
        '穿着防滑登山鞋或运动鞋',
        '携带保暖衣物，山上比山下冷5-8度',
        '带上雨具，山区天气变化快',
        '准备充足的饮水和简单食物',
      ],
    },
    {
      category: '摄影技巧',
      items: [
        '利用早晨和傍晚的侧光拍摄',
        '寻找前景和背景的层次感',
        '薬王院的建筑与红叶形成对比',
        '山顶可拍摄富士山与红叶的合影',
      ],
    },
    {
      category: '交通贴士',
      items: [
        '建议使用高尾山折扣乘车券',
        '避开周末早高峰，建议早出发',
        '返程时注意末班车时间',
        '自驾请提前预约停车位',
      ],
    },
    {
      category: '注意事项',
      items: [
        '遵守登山礼仪，不要大声喧哗',
        '不要采摘红叶和植物',
        '注意山火防范，禁止吸烟',
        '携带垃圾下山，保护环境',
      ],
    },
  ],
  history: {
    significance: '关东地区最具代表性的红叶观赏名山',
    established: '1967',
    highlights: [
      '海拔599米，从東京都心1小时可达',
      '拥有1200年历史的薬王院',
      '天狗传说的神秘色彩',
      '每年吸引约260万登山客',
      '被指定为明治の森高尾国定公园',
    ],
  },
  media: {
    images: [
      {
        url: '/images/momiji/mount-takao-cable-car.jpg',
        alt: '高尾山缆车与红叶',
        caption: '高尾山缆车沿线的红叶美景',
      },
      {
        url: '/images/momiji/mount-takao-temple.jpg',
        alt: '薬王院红叶',
        caption: '薬王院古刹与红叶的庄严美景',
      },
      {
        url: '/images/momiji/mount-takao-summit.jpg',
        alt: '高尾山山顶红叶',
        caption: '山顶展望台的360度红叶全景',
      },
    ],
    videos: [
      {
        url: '/videos/momiji/mount-takao-autumn.mp4',
        title: '高尾山红叶空中散步',
        thumbnail: '/images/momiji/mount-takao-video-thumb.jpg',
      },
    ],
  },
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3248.8977359162324!2d139.24416431525818!3d35.625021280204616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6019077c72b14c71%3A0x10e7c8e9d82f3ac!2z6auY5bC-5bGx!5e0!3m2!1sja!2sjp!4v1635000000000!5m2!1sja!2sjp',
};

export default function MountTakaoMomijiDetailPage() {
  return <MomijiDetailTemplate data={mountTakaoMomijiData} regionKey="tokyo" />;
}
