import { HanabiData } from '@/types/hanabi';

export const futtsuHanabiData: HanabiData = {
 id: 'futtsu-shimin-hanabi',
 name: '富津市民花火大会',
  japaneseName: '「東京湾口道路建設促進」第10回 富津市民花火大会',
   englishName: '10th Futtsu Citizens Fireworks Festival',
 year: 2025,
 month: 7,
 date: '2025年7月26日',
 time: '19:15-20:15',
 duration: '60分钟',
 fireworksCount: '5000发',
 expectedVisitors: '约5万人',
 weather: '晴雨举办',
 ticketPrice: '免费入场',
 status: '开催确定',
 themeColor: 'blue',
 
 tags: {
 timeTag: '7月',
 regionTag: '千叶',
 typeTag: '花火',
 layerTag: '详细介绍'
 
  },

 // 添加媒体展示内容
 media: [
 {
 type: 'image',
 url: '/images/hanabi/futtsu-fireworks.svg',
 title: '富津市民花火大会精彩瞬间',
 description: '东京湾富津海水浴场5000发花火，水中花火与海面反射的绝美景色'
 }
 ],
 
 venues: [
 {
 name: '富津海水浴场',
 location: '千叶县富津市富津2280',
 startTime: '19:15',
 features: [
 '海水浴场设施',
 '更衣室完备',
 '停车场1500台',
 '屋台美食区域'
 ]
 }
 ],

 access: [
 {
 venue: '富津海水浴场',
 stations: [
 {
 name: '青堀站',
 lines: ['JR内房线'],
 walkTime: '巴士约15分钟'
 }
 ]
 }
 ],

 viewingSpots: [
 {
 name: '富津海水浴场特等席',
 rating: 5,
 crowdLevel: '高',
 tips: '在海水浴场正面观赏，近距离感受花火与海风的夏日组合',
 pros: ['正面观赏', '近距离迫力', '海风凉爽'],
 cons: ['人群密集', '需要早到占位']
 },
 {
 name: '海岸堤防观赏点',
 rating: 4,
 crowdLevel: '中',
 tips: '从稍高的位置俯瞰花火全景，可同时欣赏海面反射',
 pros: ['全景视野', '海面反射', '摄影最佳'],
 cons: ['距离稍远', '风力较强']
 },
 {
 name: '富津岬灯台周边',
 rating: 4,
 crowdLevel: '低',
 tips: '从东京湾岬角位置观赏，独特的海岸线背景',
 pros: ['海岬风景', '灯台景观', '独特角度'],
 cons: ['步行距离较远', '夜间照明不足']
 }
 ],

 history: {
 established: 2015,
 significance: '2015年发足的市民手制花火大会，传承60年前先人梦想的「富津花火大会」精神',
 highlights: [
 '2015年市民手制花火大会开始',
 '2025年迎来第10回纪念',
 '「东京湾口道路建设促进」冠名',
 '地域市民梦想与希望的象征'
 ]
 },

 tips: [
 {
 category: '观赏建议',
 items: [
 '建议提前1-2小时到场占位',
 '海风较强，请准备防风外套',
 '夜间气温下降，建议携带保暖衣物'
 ]
 },
 {
 category: '交通提示',
 items: [
 '当日16:00-22:00会场周边实施交通管制',
 '推荐利用公共交通前往',
 '停车场数量有限，建议早到'
 ]
 },
 {
 category: '安全注意',
 items: [
 '预计约5万人到场，请注意人群安全',
 '海岸区域注意脚下安全',
 '携带儿童请勿脱离视线'
 ]
 },
 {
 category: '携带物品',
 items: [
 '携带防虫喷雾',
 '准备饮用水防中暑',
 '危险物品一律禁止携带',
 '玻璃制品禁止'
 ]
 }
 ],

 contact: {
 organizer: '富津市民花火大会事务局（富津市商工观光课内）',
 phone: '0439-80-1291',
 website: 'https://futtsu-hanabi.com/',
 socialMedia: '@futtsu_hanabi'
 },
 // 官方数据源验证
 officialSource: {
   walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0312e00785/',
   verificationDate: '2025-01-13',
   dataConfirmedBy: 'USER_PROVIDED' as const,
    lastChecked: '2025-01-13'
 },

 mapInfo: {
 hasMap: true,
 mapNote: '富津海水浴场，设有1500台免费停车场。当日16:00-22:00会场周边实施交通管制',
 parking: '1500台免费停车'
 },

 weatherInfo: {
 month: '7月',
 temperature: '最高28°C 最低22°C',
 humidity: '70-80%',
 rainfall: '夏季雷雨可能',
 recommendation: '海风较强，建议准备防风外套和保暖衣物',
 rainPolicy: '荒天时中止',},

 specialFeatures: {
 scale: '5000发花火，60分钟连续演出',
 location: '东京湾富津海水浴场，海面反射绝美',
 tradition: '传承60年前富津花火大会精神',
 atmosphere: '市民手制，地域梦想与希望的体现',
 collaboration: '花火与激光光线音响的完美演出'
 },

 special2025: {
 theme: '第10回纪念大会',
 concept: '东京湾口道路建设促进',
 memorial: '2015年开始到2025年的10年里程碑',
 features: [
 '水中花火与尺玉必见',
 '2尺玉水上花火东京湾内唯一',
 '花火与激光光线音响演出',
 '水陆明星雷壮观景象'
 ]
 },

 mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.6!2d139.8!3d35.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDE4JzAwLjAiTiAxMznCsDQ4JzAwLjAiRQ!5e0!3m2!1sja!2sjp!4v1600000000000!5m2!1sja!2sjp',

 related: {
 regionRecommendations: [
 {
 id: 'kamogawa-shimin-hanabi',
 name: '鸭川市民花火大会',
 date: '2025年7月29日',
 location: '前原横渚海岸',
 visitors: '4万人',
 link: '/july/hanabi/chiba/kamogawa-shimin-hanabi'
 },
 {
 id: 'oamishirasato-hanabi',
 name: '大网白里花火大会',
 date: '2025年7月26日',
 location: '白里海水浴场',
 visitors: '2万8000人',
 link: '/july/hanabi/chiba/oamishirasato-hanabi'
 }
 ],
 timeRecommendations: [
 {
 id: 'edogawa-hanabi',
 name: '江户川区花火大会',
 date: '8月上旬',
 location: '江户川河川敷',
 visitors: '90万人',
 link: '/august/hanabi/tokyo/edogawa-hanabi'
 }
 ]
 }
}; 