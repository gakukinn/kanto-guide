// 地区页面公共配置
export const regionConfigs = {
  tokyo: {
    name: '东京都',
    emoji: '🗼',
    bgColor: 'from-red-50 to-rose-100',
    themeColor: 'red',
    prevRegion: { name: '甲信越', path: '/koshinetsu', emoji: '🗻', bgColor: 'from-purple-50 to-violet-100' },
    nextRegion: { name: '埼玉县', path: '/saitama', emoji: '🌸', bgColor: 'from-orange-50 to-amber-100' }
  },
  saitama: {
    name: '埼玉县',
    emoji: '🌸',
    bgColor: 'from-orange-50 to-amber-100',
    themeColor: 'orange',
    prevRegion: { name: '东京都', path: '/tokyo', emoji: '🗼', bgColor: 'from-red-50 to-rose-100' },
    nextRegion: { name: '千叶县', path: '/chiba', emoji: '🌊', bgColor: 'from-sky-50 to-cyan-100' }
  },
  chiba: {
    name: '千叶县',
    emoji: '🌊',
    bgColor: 'from-sky-50 to-cyan-100',
    themeColor: 'cyan',
    prevRegion: { name: '埼玉县', path: '/saitama', emoji: '🌸', bgColor: 'from-orange-50 to-amber-100' },
    nextRegion: { name: '神奈川县', path: '/kanagawa', emoji: '⛵', bgColor: 'from-blue-100 to-blue-200' }
  },
  kanagawa: {
    name: '神奈川县',
    emoji: '⛵',
    bgColor: 'from-blue-100 to-blue-200',
    themeColor: 'blue',
    prevRegion: { name: '千叶县', path: '/chiba', emoji: '🌊', bgColor: 'from-sky-50 to-cyan-100' },
    nextRegion: { name: '北关东', path: '/kitakanto', emoji: '♨️', bgColor: 'from-green-50 to-emerald-100' }
  },
  kitakanto: {
    name: '北关东',
    emoji: '♨️',
    bgColor: 'from-green-50 to-emerald-100',
    themeColor: 'green',
    prevRegion: { name: '神奈川县', path: '/kanagawa', emoji: '⛵', bgColor: 'from-blue-100 to-blue-200' },
    nextRegion: { name: '甲信越', path: '/koshinetsu', emoji: '🗻', bgColor: 'from-purple-50 to-violet-100' }
  },
  koshinetsu: {
    name: '甲信越',
    emoji: '🗻',
    bgColor: 'from-purple-50 to-violet-100',
    themeColor: 'purple',
    prevRegion: { name: '北关东', path: '/kitakanto', emoji: '♨️', bgColor: 'from-green-50 to-emerald-100' },
    nextRegion: { name: '东京都', path: '/tokyo', emoji: '🗼', bgColor: 'from-red-50 to-rose-100' }
  }
};

// 活动类型emoji映射
export const activityEmojiMapping = {
  hanabi: '🎆',
  culture: '🎨',
  matsuri: '🏮',
  hanami: '🌸',
  illumination: '✨',
  momiji: '🍁'
};

// 活动类型优先级（按数据丰富程度排序）
export const activityTypesPriority = ['hanabi', 'matsuri', 'hanami', 'culture', 'illumination', 'momiji'] as const;

// SEO配置模板
export const seoTemplates = {
  tokyo: {
    title: '东京都活动指南 | 花火大会、祭典、樱花、文化活动完整攻略',
    description: '探索东京都最精彩的活动体验，从传统祭典到现代文化',
    keywords: ['东京活动', '东京花火大会', '东京祭典', '东京樱花', '隅田川花火', '神田祭', '上野公园', '东京旅游', '关东旅游']
  },
  saitama: {
    title: '埼玉县活动指南 | 鸿巢花火、秩父夜祭、川越祭典',
    description: '探索埼玉县的传统魅力：鸿巢花火大会、秩父夜祭、大宫樱花祭、川越祭典等精彩活动',
    keywords: ['埼玉活动', '鸿巢花火', '秩父夜祭', '川越祭典', '大宫樱花', '小江户', '埼玉旅游', '关东旅游']
  },
  chiba: {
    title: '千叶县活动指南 | 市川花火、成田祗园祭、迪士尼度假区',
    description: '探索千叶县的海岸魅力：市川花火大会、成田祗园祭、茂原樱花祭、东京迪士尼度假区等精彩活动',
    keywords: ['千叶活动', '市川花火', '成田祗园祭', '茂原樱花', '东京迪士尼', '千叶海岸', '千叶旅游', '关东旅游']
  },
  kanagawa: {
    title: '神奈川县活动指南 | 镰仓花火、横滨文化节、江之岛灯光秀',
    description: '探索神奈川县的海滨魅力：镰仓花火大会、横滨红砖文化节、江之岛灯光秀、箱根红叶祭等精彩活动',
    keywords: ['神奈川活动', '镰仓花火', '横滨文化节', '江之岛灯光', '箱根红叶', '湘南海岸', '神奈川旅游', '关东旅游']
  },
  kitakanto: {
    title: '北关东活动指南 | 足利花火、日光东照宫、草津温泉祭',
    description: '探索北关东的自然与历史：足利花火大会、日光东照宫春季大祭、国营常陆海滨公园、草津温泉祭等精彩活动',
    keywords: ['北关东活动', '足利花火', '日光东照宫', '草津温泉', '常陆海滨公园', '粉蝶花', '北关东旅游', '关东旅游']
  },
  koshinetsu: {
    title: '甲信越活动指南 | 长冈花火、飞騨高山祭、河口湖樱花祭',
    description: '探索甲信越的山岳美景：长冈祭大花火大会、飞騨高山祭、河口湖樱花祭、松本城月见祭等精彩活动',
    keywords: ['甲信越活动', '长冈花火', '飞騨高山祭', '河口湖樱花', '松本城', '富士山', '甲信越旅游', '中部旅游']
  }
};

export type RegionKey = keyof typeof regionConfigs; 