// 月份配置数据接口
export interface MonthConfig {
 id: number;
 chinese: string;
 traditional: string;
 meaning: string;
 season: string;
 emoji: string;
 theme_color: string;
 weather: {
 temperature: string;
 high_temp: string;
 conditions: string;
 tip: string;
 };
 activities: {
 id: string;
 name: string;
 description: string;
 icon: string;
 color: string;
 }[];
 travel_info: {
 transport: string;
 accommodation: string;
 business_hours: string;
 tip: string;
 };
}

// 十二个月的基础配置数据 - 可以基于外部网站信息动态更新
export const monthsConfig: Record<number, MonthConfig> = {
 1: {
 id: 1,
 chinese: '一月',
 traditional: '睦月',
 meaning: '新年团聚',
 season: 'winter',
 emoji: '🎍',
 theme_color: 'blue',
 weather: {
 temperature: '5.7°C',
 high_temp: '最高10.2°C',
 conditions: '中旬到下旬特别寒冷，平均降雨量15毫米，几乎不下雪',
 tip: '出门请穿好御寒衣物，一天日照时间约6小时'
 },
 activities: [
 {
 id: 'hatsumode',
 name: '初詣参拜',
 description: '明治神宫、浅草寺新年参拜',
 icon: '⛩️',
 color: 'from-rose-100 to-white'
 },
 {
 id: 'new-year-events',
 name: '新年活动',
 description: '新年一般参贺、火节、世田谷旧货市集',
 icon: '🎌',
 color: 'from-white to-blue-100'
 },
 {
 id: 'winter-sports',
 name: '冬季赛事',
 description: '新年相扑赛事、传统祭典',
 icon: '🏟️',
 color: 'from-blue-100 to-blue-200'
 }
 ],
 travel_info: {
 transport: '正常运营',
 accommodation: '新年期间需提前预订',
 business_hours: '部分商店有新年假期',
 tip: '最推荐1月前往东京，可体验传统祭典，新年特卖折扣季'
 }
 },

 2: {
 id: 2,
 chinese: '二月',
 traditional: '如月',
 meaning: '严寒渐去',
 season: 'winter',
 emoji: '🌸',
 theme_color: 'pink',
 weather: {
 temperature: '8.0°C',
 high_temp: '最高12.5°C',
 conditions: '降水量78.5mm，晴天和阴天各占一半，几乎不下雪',
 tip: '非常适合观光，建议洋葱式穿搭'
 },
 activities: [
 {
 id: 'setsubun',
 name: '节分祭典',
 description: '大国魂神社、浅草寺、增上寺节分活动',
 icon: '👹',
 color: 'from-rose-100 to-white'
 },
 {
 id: 'plum-blossom',
 name: '梅花观赏',
 description: '先于樱花绽放的美丽梅花',
 icon: '🌸',
 color: 'from-white to-blue-100'
 },
 {
 id: 'events',
 name: '特色活动',
 description: '情人节、青梅马拉松、夜间点灯',
 icon: '💝',
 color: 'from-blue-100 to-blue-200'
 }
 ],
 travel_info: {
 transport: '正常运营',
 accommodation: '相对淡季，价格适中',
 business_hours: '正常营业',
 tip: '传统祭典和特别活动让人应接不暇，上旬还有美丽夜间点灯'
 }
 },

 3: {
 id: 3,
 chinese: '三月',
 traditional: '弥生',
 meaning: '万物复苏',
 season: 'spring',
 emoji: '🌱',
 theme_color: 'green',
 weather: {
 temperature: '9.6°C',
 high_temp: '最高14.8°C',
 conditions: '下旬气温逐渐攀升，有早晚温差，很少下雪但可能下雨',
 tip: '气候宜人，需要御寒衣物'
 },
 activities: [
 {
 id: 'sakura-hanami',
 name: '早樱花见',
 description: '月底樱花盛开，上野櫻花祭',
 icon: '🌸',
 color: 'from-rose-100 to-white'
 },
 {
 id: 'spring-events',
 name: '春季活动',
 description: '东京马拉松、花卉节、女儿节',
 icon: '🏃',
 color: 'from-white to-blue-100'
 },
 {
 id: 'flower-festivals',
 name: '花卉庆典',
 description: '离岛花卉、金龙之舞、油菜花田',
 icon: '🌺',
 color: 'from-blue-100 to-blue-200'
 }
 ],
 travel_info: {
 transport: '正常运营',
 accommodation: '樱花季前，价格开始上涨',
 business_hours: '正常营业',
 tip: '春暖花开非常适合旅游，公园庭园热闹庆祝春天到来'
 }
 },

 4: {
 id: 4,
 chinese: '四月',
 traditional: '卯月',
 meaning: '樱花盛开',
 season: 'spring',
 emoji: '🌸',
 theme_color: 'pink',
 weather: {
 temperature: '17.1°C',
 high_temp: '最高21.8°C',
 conditions: '天气持续温和舒适，适合户外散步活动，偶尔有风大日子',
 tip: '非常适合户外活动，建议带上围巾或连帽外套防风'
 },
 activities: [
 {
 id: 'sakura-festivals',
 name: '樱花祭典',
 description: '上野櫻花祭、千代田櫻花祭、隅田公園櫻花祭',
 icon: '🌸',
 color: 'from-rose-100 to-white'
 },
 {
 id: 'flower-events',
 name: '花卉庆典',
 description: '文京杜鵑花祭、高尾山春季大祭',
 icon: '🌺',
 color: 'from-white to-blue-100'
 },
 {
 id: 'traditional-arts',
 name: '传统艺能',
 description: '太太神樂、明治神宮春季大祭',
 icon: '🎭',
 color: 'from-blue-100 to-blue-200'
 }
 ],
 travel_info: {
 transport: '樱花季人流较多',
 accommodation: '樱花季价格最高，需提前预订',
 business_hours: '正常营业',
 tip: '最适合造訪東京的時期之一，櫻花讓街道煥然一新'
 }
 },

 5: {
 id: 5,
 chinese: '五月',
 traditional: '皐月',
 meaning: '新绿映眼',
 season: 'spring',
 emoji: '🌿',
 theme_color: 'green',
 weather: {
 temperature: '20.0°C',
 high_temp: '最高24.8°C',
 conditions: '气候较为温和，清爽的春季气候，晚上还有些许凉意',
 tip: '穿上牛仔裤和短袖衣服即可，建议带上一件薄外套'
 },
 activities: [
 {
 id: 'golden-week-festivals',
 name: '黄金周祭典',
 description: '暗闇祭、神田祭、鯉魚旗慶典',
 icon: '🎌',
 color: 'from-rose-100 to-white'
 },
 {
 id: 'childrens-day',
 name: '儿童节庆典',
 description: '鲤鱼旗飘扬、绿化节免费开放',
 icon: '🎏',
 color: 'from-white to-blue-100'
 },
 {
 id: 'special-events',
 name: '特色活动',
 description: '足立煙火大會、東京港祭',
 icon: '🎆',
 color: 'from-blue-100 to-blue-200'
 }
 ],
 travel_info: {
 transport: '黄金周期间拥挤',
 accommodation: '黄金周价格上涨',
 business_hours: '部分商店黄金周休息',
 tip: '黃金週長期連假，公園庭園新綠怡人，適合旅遊散步'
 }
 },

 6: {
 id: 6,
 chinese: '六月',
 traditional: '水無月',
 meaning: '雨水充沛',
 season: 'summer',
 emoji: '☔',
 theme_color: 'blue',
 weather: {
 temperature: '23.1°C',
 high_temp: '最高27.7°C',
 conditions: '梅雨季陰天雨天較多，長時間持續淅淅瀝瀝小雨，濕度高體感溫度較高',
 tip: '建議穿著透氣輕便衣物，請常備雨衣或折疊傘'
 },
 activities: [
 {
 id: 'beer-gardens',
 name: '啤酒花园',
 description: '百貨天台、台場沙灘、明治神宮外苑',
 icon: '🍺',
 color: 'from-rose-100 to-white'
 },
 {
 id: 'hydrangea-festivals',
 name: '繡球花季',
 description: '街道藍藏紫繡球花盛放、山王祭、鳥越祭',
 icon: '💙',
 color: 'from-white to-blue-100'
 },
 {
 id: 'indoor-entertainment',
 name: '室内娱乐',
 description: '東京國際短片影展、水族館、避雨活動',
 icon: '🎬',
 color: 'from-blue-100 to-blue-200'
 }
 ],
 travel_info: {
 transport: '正常运营，注意雨天延误',
 accommodation: '相对淡季，价格适中',
 business_hours: '正常营业',
 tip: '富有情調的梅雨季，室內外都有五花八門活動，非常值得一遊'
 }
 },

 7: {
 id: 7,
 chinese: '七月',
 traditional: '文月',
 meaning: '七夕文学',
 season: 'summer',
 emoji: '🌙',
 theme_color: 'blue',
 weather: {
 temperature: '28.7°C',
 high_temp: '超过30°C',
 conditions: '梅雨结束期',
 tip: '准备透气舒适的衣服，湿度偏高'
 },
 activities: [
 {
 id: 'hanabi',
 name: '花火大会',
 description: '夏夜最美的烟花盛典',
 icon: '🎆',
 color: 'from-rose-100 to-white'
 },
 {
 id: 'matsuri',
 name: '传统祭祀',
 description: '七夕节、酸浆花市、阿波舞',
 icon: '🏮',
 color: 'from-white to-blue-100'
 },
 {
 id: 'events',
 name: '特色活动',
 description: '牵牛花节、金鱼祭、风铃',
 icon: '🎪',
 color: 'from-blue-100 to-blue-200'
 }
 ],
 travel_info: {
 transport: '部分加班',
 accommodation: '提前1-2周',
 business_hours: '夏季延长',
 tip: '建议制定备选方案应对天气变化'
 }
 },

 8: {
 id: 8,
 chinese: '八月',
 traditional: '葉月',
 meaning: '绿叶茂盛',
 season: 'summer',
 emoji: '🎆',
 theme_color: 'red',
 weather: {
 temperature: '29.2°C',
 high_temp: '经常超过35°C',
 conditions: '炎热潮湿，偶有台风',
 tip: '准备轻便通风的服装，随身携带雨具防备台风豪雨'
 },
 activities: [
 {
 id: 'hanabi',
 name: '花火大会',
 description: '夏日祭典高峰期，各地烟火盛典',
 icon: '🎆',
 color: 'from-rose-100 to-white'
 },
 {
 id: 'matsuri',
 name: '夏日祭典',
 description: '盂兰盆舞、七夕祭、阿波舞',
 icon: '🏮',
 color: 'from-white to-blue-100'
 },
 {
 id: 'festivals',
 name: '特色节庆',
 description: '向日葵节、纳凉祭、元气祭',
 icon: '🌻',
 color: 'from-blue-100 to-blue-200'
 }
 ],
 travel_info: {
 transport: '夏季活动期间加班运营',
 accommodation: '暑假期间价格上涨，需提前预订',
 business_hours: '夏季延长营业时间',
 tip: '注意防暑降温，台风天气关注交通信息'
 }
 },

 9: {
 id: 9,
 chinese: '九月',
 traditional: '長月',
 meaning: '夜长昼短',
 season: 'autumn',
 emoji: '🍂',
 theme_color: 'orange',
 weather: {
 temperature: '26.7°C',
 high_temp: '最高31.2°C',
 conditions: '上旬高温潮湿，下旬转凉',
 tip: '准备薄外套和雨具，注意台风动态'
 },
 activities: [
 {
 id: 'hanabi',
 name: '花火大会',
 description: '秋夜花火盛典',
 icon: '🎆',
 color: 'from-rose-100 to-white'
 },
 {
 id: 'autumn-flowers',
 name: '秋季花卉',
 description: '胡枝子、波斯菊',
 icon: '🌾',
 color: 'from-white to-blue-100'
 },
 {
 id: 'festivals',
 name: '传统祭典',
 description: '品川驛站祭、袋祭',
 icon: '🎪',
 color: 'from-blue-100 to-blue-200'
 }
 ],
 travel_info: {
 transport: '正常运营，注意台风影响',
 accommodation: '价格回落',
 business_hours: '正常营业',
 tip: '台风多发季节，随时关注天气'
 }
 },

 10: {
 id: 10,
 chinese: '十月',
 traditional: '神無月',
 meaning: '神明聚会',
 season: 'autumn',
 emoji: '🍁',
 theme_color: 'orange',
 weather: {
 temperature: '18.9°C',
 high_temp: '最高23.7°C',
 conditions: '湿度低，适合观光',
 tip: '最适合造访东京的季节，入夜偏凉需薄外套'
 },
 activities: [
 {
 id: 'autumn-leaves',
 name: '红叶观赏',
 description: '御岳山等赏枫名所',
 icon: '🍁',
 color: 'from-rose-100 to-white'
 },
 {
 id: 'traditional-festivals',
 name: '传统祭典',
 description: '寺庙祭典、文化祭、万圣节庆典',
 icon: '🏮',
 color: 'from-white to-blue-100'
 },
 {
 id: 'arts-culture',
 name: '艺术文化',
 description: '美术活动、影展及书展',
 icon: '🎨',
 color: 'from-blue-100 to-blue-200'
 }
 ],
 travel_info: {
 transport: '正常运营',
 accommodation: '红叶季价格上涨',
 business_hours: '正常营业',
 tip: '最佳旅游时节，建议提前预订'
 }
 },

 11: {
 id: 11,
 chinese: '十一月',
 traditional: '霜月',
 meaning: '霜降时节',
 season: 'autumn',
 emoji: '🍂',
 theme_color: 'brown',
 weather: {
 temperature: '14.4°C',
 high_temp: '最高19.2°C',
 conditions: '较为干燥，平均降雨量100公厘',
 tip: '有阳光时温暖，起风或傍晚微寒，下旬建议薄外套或毛衣'
 },
 activities: [
 {
 id: 'autumn-leaves',
 name: '红叶盛期',
 description: '最佳赏枫时期，明治神宫外苑银杏',
 icon: '🍁',
 color: 'from-rose-100 to-white'
 },
 {
 id: 'tori-no-ichi',
 name: '酉市祭典',
 description: '淺草酉市，熊手吉祥物',
 icon: '🏮',
 color: 'from-white to-blue-100'
 },
 {
 id: 'ginkgo-festival',
 name: '银杏节庆',
 description: '八王子银杏节，菊花展',
 icon: '🌻',
 color: 'from-blue-100 to-blue-200'
 }
 ],
 travel_info: {
 transport: '正常运营',
 accommodation: '红叶季高峰价格',
 business_hours: '正常营业',
 tip: '红叶观赏高峰期，山区比都心冷，建议保暖衣物'
 }
 },

 12: {
 id: 12,
 chinese: '十二月',
 traditional: '師走',
 meaning: '师父也忙碌',
 season: 'winter',
 emoji: '❄️',
 theme_color: 'blue',
 weather: {
 temperature: '9.4°C',
 high_temp: '最高14.3°C',
 conditions: '天气干燥，平均降雨量20公厘，几乎不下雪',
 tip: '寒意袭人需穿大衣，手套围巾帽子建议备好'
 },
 activities: [
 {
 id: 'illumination',
 name: '霓彩灯饰',
 description: '丸之内香檳金燈飾，惠比壽巴卡拉水晶吊燈',
 icon: '✨',
 color: 'from-rose-100 to-white'
 },
 {
 id: 'new-year',
 name: '跨年活动',
 description: '明治神宫参拜，增上寺敲钟',
 icon: '🎌',
 color: 'from-white to-blue-100'
 },
 {
 id: 'winter-events',
 name: '冬季体验',
 description: '王子狐狸游行，滑冰场',
 icon: '⛸️',
 color: 'from-blue-100 to-blue-200'
 }
 ],
 travel_info: {
 transport: '年末年始时刻表变更',
 accommodation: '年末年始价格上涨',
 business_hours: '年末年始特殊营业',
 tip: '提前确认年末年始的营业时间，都内各地流光溢彩'
 }
 }
};

// 获取月份路径的辅助函数
export const getMonthPath = (monthId: number): string => {
 const monthPaths: Record<number, string> = {
 1: 'january', 2: 'february', 3: 'march', 4: 'april',
 5: 'may', 6: 'june', 7: 'july', 8: 'august',
 9: 'september', 10: 'october', 11: 'november', 12: 'december'
 };
 return monthPaths[monthId] || `month-${monthId}`;
};

// 获取导航月份的辅助函数
export const getNavigationMonths = (currentMonth: number) => {
 const prevMonth = currentMonth === 1 ? 12 : currentMonth - 1;
 const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;
 
 const monthNames: Record<number, string> = {
 1: '一月', 2: '二月', 3: '三月', 4: '四月',
 5: '五月', 6: '六月', 7: '七月', 8: '八月',
 9: '九月', 10: '十月', 11: '十一月', 12: '十二月'
 };
 
 return {
 prev: { id: prevMonth, name: monthNames[prevMonth] },
 next: { id: nextMonth, name: monthNames[nextMonth] }
 };
};

// 基于外部数据源更新月份配置的函数
export const updateMonthFromExternalSource = async (monthId: number, externalData: any): Promise<MonthConfig> => {
 const baseConfig = monthsConfig[monthId];
 if (!baseConfig) {
 throw new Error(`Month ${monthId} not found`);
 }

 return {
 ...baseConfig,
 weather: {
 ...baseConfig.weather,
 ...externalData.weather
 },
 activities: externalData.activities || baseConfig.activities,
 travel_info: {
 ...baseConfig.travel_info,
 ...externalData.travel_info
 }
 };
}; 