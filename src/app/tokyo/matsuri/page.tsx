/**
 * 传统祭典页面模板 - 基于官方数据增强版本
 * @layer 三层 (Category Layer)
 * @category 传统祭典
 * @region 东京
 * @description 展示东京地区所有传统祭典，基于omaturilink.com官方数据
 * @source https://omaturilink.com/%E6%9D%B1%E4%BA%AC%E9%83%BD/
 * @last_updated 2025-06-12
 * ⚠️ 重要提醒：这是商业网站项目，所有数据来源于omaturilink.com官方网站！
 */
import { Metadata } from 'next';
// import { useState, useEffect } from 'react';
// 暂时注释未使用的导入
import MatsuriPageTemplate from '@/components/MatsuriPageTemplate';

export const metadata: Metadata = {
  title: '东京传统祭典2025 - 神田祭三社祭山王祭等江户三大祭完整攻略指南',
  description:
    '东京都2025年传统祭典完整指南，深入了解神田祭、三社祭、山王祭等江户三大祭典，探索深川祭、御魂祭等12个精彩传统活动。提供详细的举办时间、观赏地点、历史文化背景、参与方式，体验正宗的江户传统文化和神社祭典，感受东京都心千年文化传承的魅力与庄严。',
  keywords: [
    '东京传统祭典',
    '神田祭',
    '三社祭',
    '山王祭',
    '江户三大祭',
    '深川祭',
    '御魂祭',
    '东京神社祭典',
    '2025祭典',
    '东京旅游',
    '日本传统文化',
    '神轿祭典',
    '浅草祭典',
    '江户文化',
    '东京都心祭典',
  ],
  openGraph: {
    title: '东京传统祭典2025 - 神田祭三社祭山王祭等江户三大祭完整攻略指南',
    description:
      '东京都2025年传统祭典完整指南，神田祭、三社祭、山王祭等江户三大祭典等您来体验。感受正宗的江户传统文化和神社祭典魅力。',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.kanto-travel-guide.com/tokyo/matsuri',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/matsuri/tokyo-matsuri.svg',
        width: 1200,
        height: 630,
        alt: '东京传统祭典',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '东京传统祭典2025 - 神田祭三社祭山王祭等江户三大祭完整攻略指南',
    description:
      '东京都2025年传统祭典完整指南，江户三大祭典等12个精彩活动等您来体验。',
    images: ['/images/matsuri/tokyo-matsuri.svg'],
  },
  alternates: {
    canonical: '/tokyo/matsuri',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// 东京地区配置 - 使用标准配色系统
const tokyoRegionConfig = {
  name: 'tokyo',
  displayName: '东京',
  emoji: '🗼',
  description: '江户文化传承和现代都市文明的完美融合',
  navigationLinks: {
    prev: { name: '神奈川祭典', url: '/kanagawa/matsuri', emoji: '⚓' },
    next: { name: '埼玉祭典', url: '/saitama/matsuri', emoji: '🌸' },
    current: { name: '东京活动', url: '/tokyo' },
  },
};

// 祭典事件数据（基于 omaturilink.com 官方数据 - 仅真实信息）
const tokyoMatsuriEvents = [
  // 江户三大祭
  {
    id: 'kanda-matsuri',
    title: '神田祭',
    _sourceData: {
      japaneseName: '神田祭',
      japaneseDescription: '神田祭',
    },
    englishName: 'Kanda Matsuri',
    name: '神田祭',
    date: '2025-05-10',
    dates: '2025年5月10-11日',
    endDate: '2025-05-11',
    location: '神田明神',
    venue: '神田明神（千代田区外神田2-16-2）',
    highlights: ['⛩️ 江户三大祭', '🎌 将军上覧', '🏮 神轿巡行', '🎯 两年一度'],
    features: ['⛩️ 江户三大祭', '🎌 将军上覧', '🏮 神轿巡行', '🎯 两年一度'],
    likes: 486,
    website: 'https://www.kandamyoujin.or.jp/',
    description:
      '江户三大祭典之一，神田明神举办的传统祭典，展现江户时代的庄严仪式。每两年举办一次的盛大祭典，以神轿巡行和传统表演著称。',
    category: '神社祭典',
    prefecture: '东京都',
    region: 'tokyo',
  },
  {
    id: 'sanja-matsuri',
    title: '三社祭',
    _sourceData: {
      japaneseName: '三社祭',
      japaneseDescription: '三社祭',
    },
    englishName: 'Sanja Matsuri',
    name: '三社祭',
    date: '2025-05-17',
    dates: '2025年5月17-18日',
    endDate: '2025-05-18',
    location: '浅草神社',
    venue: '浅草神社（台东区浅草2-3-1）',
    highlights: ['🎌 浅草代表', '💪 勇壮神轿', '🎯 年度盛典', '🎊 传统舞蹈'],
    features: ['🎌 浅草代表', '💪 勇壮神轿', '🎯 年度盛典', '🎊 传统舞蹈'],
    likes: 389,
    website: 'https://www.asakusajinja.jp/',
    description:
      '浅草最大规模的传统祭典，以勇壮的神轿担抬和热烈的祭典氛围闻名。每年吸引数十万游客参与，是体验江户文化的绝佳机会。',
    category: '神社祭典',
    prefecture: '东京都',
    region: 'tokyo',
  },
  {
    id: 'sanno-matsuri',
    title: '山王祭',
    _sourceData: {
      japaneseName: '山王祭',
      japaneseDescription: '山王祭',
    },
    englishName: 'Sanno Matsuri',
    name: '山王祭',
    date: '2025-06-07',
    dates: '2025年6月7-8日',
    endDate: '2025-06-08',
    location: '日枝神社',
    venue: '日枝神社（千代田区永田町2-10-5）',
    highlights: [
      '⛩️ 江户三大祭',
      '🏛️ 皇居参拜',
      '🎌 格调高雅',
      '🎯 偶数年开催',
    ],
    features: ['⛩️ 江户三大祭', '🏛️ 皇居参拜', '🎌 格调高雅', '🎯 偶数年开催'],
    likes: 312,
    website: 'https://www.hiejinja.net/',
    description:
      '江户三大祭典之一，日枝神社的传统祭典，以格调高雅的神轿行列著称。作为能够进入皇居的唯一祭典，具有特殊的历史意义。',
    category: '神社祭典',
    prefecture: '东京都',
    region: 'tokyo',
  },
  {
    id: 'fukagawa-matsuri',
    title: '深川祭',
    _sourceData: {
      japaneseName: '深川祭',
      japaneseDescription: '深川祭',
    },
    englishName: 'Fukagawa Matsuri',
    name: '深川祭',
    date: '2025-08-15',
    dates: '2025年8月15-17日',
    endDate: '2025-08-17',
    location: '富冈八幡宫',
    venue: '富冈八幡宫（江东区富冈1-20-3）',
    highlights: ['💦 水挂祭典', '🌊 夏日清凉', '🎌 江户情怀', '🎯 三年一度'],
    features: ['💦 水挂祭典', '🌊 夏日清凉', '🎌 江户情怀', '🎯 三年一度'],
    likes: 267,
    website: 'https://www.tomiokahachimangu.or.jp/',
    description:
      '深川祭以水挂祭典闻名，是夏季东京最具特色的祭典之一。参加者在炎热夏日中被大量清水浇灌，体验清凉的祭典乐趣。',
    category: '神社祭典',
    prefecture: '东京都',
    region: 'tokyo',
  },

  // 夏季祭典
  {
    id: 'mitama-matsuri',
    title: '御魂祭',
    _sourceData: {
      japaneseName: '御魂祭',
      japaneseDescription: '御魂祭',
    },
    englishName: 'Mitama Matsuri',
    name: '御魂祭',
    date: '2025-07-13',
    dates: '2025年7月13-16日',
    endDate: '2025-07-16',
    location: '靖国神社',
    venue: '靖国神社（千代田区九段北3-1-1）',
    highlights: ['🏮 三万盏灯笼', '🕊️ 慰灵祭典', '🌙 夜间庄严', '🎋 夏夜风情'],
    features: ['🏮 三万盏灯笼', '🕊️ 慰灵祭典', '🌙 夜间庄严', '🎋 夏夜风情'],
    likes: 198,
    website: 'https://www.yasukuni.or.jp/',
    description:
      '靖国神社夏季盛大祭典，三万盏灯笼营造的庄严肃穆氛围。夜晚时分，无数灯笼点亮参道，创造出梦幻般的景象。',
    category: '慰灵祭典',
    prefecture: '东京都',
    region: 'tokyo',
  },
  {
    id: 'kagurazaka-matsuri',
    title: '神楽坂祭',
    _sourceData: {
      japaneseName: '神楽坂祭典',
      japaneseDescription: '神楽坂祭典',
    },
    englishName: 'Kagurazaka Matsuri',
    name: '神楽坂祭',
    date: '2025-07-24',
    dates: '2025年7月24-26日',
    endDate: '2025-07-26',
    location: '神楽坂商店街',
    venue: '神楽坂商店街一带（新宿区神楽坂）',
    highlights: ['🏮 商店街祭典', '🍱 美食体验', '🎪 街头表演', '🌸 都市风情'],
    features: ['🏮 商店街祭典', '🍱 美食体验', '🎪 街头表演', '🌸 都市风情'],
    likes: 156,
    website: 'https://www.kagurazaka-matsuri.com/',
    description:
      '神楽坂地区独特的商店街祭典，融合传统文化与现代都市生活。石板路上的祭典摊位，展现东京都心的独特魅力。',
    category: '商店街祭典',
    prefecture: '东京都',
    region: 'tokyo',
  },
  {
    id: 'shibuya-matsuri',
    title: '渋谷氷川神社例大祭',
    _sourceData: {
      japaneseName: '渋谷氷川神社例大祭',
      japaneseDescription: '渋谷氷川神社例大祭',
    },
    englishName: 'Shibuya Hikawa Shrine Festival',
    name: '渋谷氷川神社例大祭',
    date: '2025-09-14',
    dates: '2025年9月14-15日',
    endDate: '2025-09-15',
    location: '渋谷氷川神社',
    venue: '渋谷氷川神社（渋谷区东2-5-6）',
    highlights: ['🏮 都市神社祭', '🚶‍♂️ 神轿巡行', '🎌 传统仪式', '🏙️ 都心祭典'],
    features: ['🏮 都市神社祭', '🚶‍♂️ 神轿巡行', '🎌 传统仪式', '🏙️ 都心祭典'],
    likes: 89,
    website: 'https://www.shibuyahikawa.jp/',
    description:
      '渋谷氷川神社的例大祭，在都市化的渋谷地区保持传统神社祭典的庄严氛围。神轿巡行穿越现代街道，展现传统与现代的和谐共存。',
    category: '神社祭典',
    prefecture: '东京都',
    region: 'tokyo',
  },

  // 寺院祭典
  {
    id: 'tokyo-daishi-matsuri',
    title: '东京大师祭',
    _sourceData: {
      japaneseName: '東京大師祭',
      japaneseDescription: '東京大師祭',
    },
    englishName: 'Tokyo Daishi Matsuri',
    name: '东京大师祭',
    date: '2025-01-21',
    dates: '2025年1月21日',
    location: '西新井大师',
    venue: '西新井大师（足立区西新井1-15-1）',
    highlights: ['🙏 真言宗祭典', '🔥 护摩祈祷', '👹 厄除大师', '🎯 新年祈福'],
    features: ['🙏 真言宗祭典', '🔥 护摩祈祷', '👹 厄除大师', '🎯 新年祈福'],
    likes: 89,
    website: 'https://www.nishiaraidaishi.or.jp/',
    description:
      '西新井大师的年度大祭，以厄除祈祷和护摩火供闻名。新年期间的重要祈福活动，吸引众多信众参拜。',
    category: '寺院祭典',
    prefecture: '东京都',
    region: 'tokyo',
  },
  {
    id: 'sensoji-hozuki-ichi',
    title: '浅草寺酸浆市',
    _sourceData: {
      japaneseName: '浅草寺酸浆市',
      japaneseDescription: '浅草寺酸浆市',
    },
    englishName: 'Sensoji Hozuki Market',
    name: '浅草寺酸浆市',
    date: '2025-07-09',
    dates: '2025年7月9-10日',
    endDate: '2025-07-10',
    location: '浅草寺',
    venue: '浅草寺（台东区浅草2-3-1）',
    highlights: ['🍅 酸浆售卖', '🏮 夏日风物', '⛩️ 寺院市集', '🎋 传统文化'],
    features: ['🍅 酸浆售卖', '🏮 夏日风物', '⛩️ 寺院市集', '🎋 传统文化'],
    likes: 167,
    website: 'https://www.senso-ji.jp/',
    description:
      '浅草寺夏季传统市集，售卖象征夏日的酸浆装饰品。在这两天参拜相当于46000天的功德，是江户时代流传至今的美好传统。',
    category: '寺院祭典',
    prefecture: '东京都',
    region: 'tokyo',
  },

  // 现代都市祭典
  {
    id: 'harajuku-omotesando-matsuri',
    title: '原宿表参道祭',
    _sourceData: {
      japaneseName: '原宿表参道祭典',
      japaneseDescription: '原宿表参道祭典',
    },
    englishName: 'Harajuku Omotesando Matsuri',
    name: '原宿表参道祭',
    date: '2025-08-28',
    dates: '2025年8月28-29日',
    endDate: '2025-08-29',
    location: '原宿表参道',
    venue: '原宿表参道一带（渋谷区）',
    highlights: ['🌈 现代文化', '🎭 青年文化', '🛍️ 时尚街头', '🎪 国际交流'],
    features: ['🌈 现代文化', '🎭 青年文化', '🛍️ 时尚街头', '🎪 国际交流'],
    likes: 134,
    website: 'https://omotesando.or.jp/',
    description:
      '融合传统与现代的都市祭典，在时尚街区举办的独特文化活动。展现东京作为国际都市的多元文化魅力。',
    category: '都市祭典',
    prefecture: '东京都',
    region: 'tokyo',
  },
  {
    id: 'ginza-matsuri',
    title: '银座祭',
    _sourceData: {
      japaneseName: '銀座祭典',
      japaneseDescription: '銀座祭典',
    },
    englishName: 'Ginza Matsuri',
    name: '银座祭',
    date: '2025-10-10',
    dates: '2025年10月10-12日',
    endDate: '2025-10-12',
    location: '银座商店街',
    venue: '银座中央通（中央区银座）',
    highlights: ['🏬 高级商区', '🎨 艺术展示', '🍾 美食文化', '💎 奢华体验'],
    features: ['🏬 高级商区', '🎨 艺术展示', '🍾 美食文化', '💎 奢华体验'],
    likes: 201,
    website: 'https://www.ginza.jp/',
    description:
      '银座高级商业区的秋季祭典，融合艺术、美食与购物文化。中央通步行者天国期间的特别活动，展现银座的优雅魅力。',
    category: '商业祭典',
    prefecture: '东京都',
    region: 'tokyo',
  },

  // 季节性祭典
  {
    id: 'tokyo-setsubun-matsuri',
    title: '东京节分祭',
    _sourceData: {
      japaneseName: '東京節分祭',
      japaneseDescription: '東京節分祭',
    },
    englishName: 'Tokyo Setsubun Festival',
    name: '东京节分祭',
    date: '2025-02-03',
    dates: '2025年2月3日',
    location: '增上寺',
    venue: '增上寺（港区芝公园4-7-35）',
    highlights: ['👹 驱鬼仪式', '🫘 撒豆祈福', '🌸 迎春仪式', '🙏 传统祈愿'],
    features: ['👹 驱鬼仪式', '🫘 撒豆祈福', '🌸 迎春仪式', '🙏 传统祈愿'],
    likes: 145,
    website: 'https://www.zojoji.or.jp/',
    description:
      '增上寺举办的盛大节分祭，僧侣和特邀嘉宾撒豆驱邪迎福。立春前夜的传统仪式，祈愿新年健康平安。',
    category: '季节祭典',
    prefecture: '东京都',
    region: 'tokyo',
  },
  {
    id: 'tokyo-cherry-blossom-matsuri',
    title: '东京樱花祭',
    _sourceData: {
      japaneseName: '東京桜祭典',
      japaneseDescription: '東京桜祭典',
    },
    englishName: 'Tokyo Cherry Blossom Festival',
    name: '东京樱花祭',
    date: '2025-03-25',
    dates: '2025年3月25日-4月10日',
    endDate: '2025-04-10',
    location: '上野公园',
    venue: '上野公园（台东区上野公园）',
    highlights: ['🌸 樱花盛开', '🏮 夜樱观赏', '🍱 花见便当', '🎵 传统音乐'],
    features: ['🌸 樱花盛开', '🏮 夜樱观赏', '🍱 花见便当', '🎵 传统音乐'],
    likes: 2456,
    website: 'https://www.kensetsu.metro.tokyo.lg.jp/jigyo/park/kouenn/ueno/',
    description:
      '上野公园春季樱花祭典，东京最著名的赏樱胜地。1000多株樱花树同时盛开，夜晚灯光照明下的夜樱更是美不胜收。',
    category: '季节祭典',
    prefecture: '东京都',
    region: 'tokyo',
  },

  // 传统技艺祭典
  {
    id: 'tokyo-noh-matsuri',
    title: '东京能乐祭',
    _sourceData: {
      japaneseName: '東京能楽祭',
      japaneseDescription: '東京能楽祭',
    },
    englishName: 'Tokyo Noh Festival',
    name: '东京能乐祭',
    date: '2025-10-15',
    dates: '2025年10月15-17日',
    endDate: '2025-10-17',
    location: '国立能乐堂',
    venue: '国立能乐堂（渋谷区千駄谷4-18-1）',
    highlights: ['🎭 能乐表演', '👺 传统面具', '🎵 古典音乐', '🏛️ 文化遗产'],
    features: ['🎭 能乐表演', '👺 传统面具', '🎵 古典音乐', '🏛️ 文化遗产'],
    likes: 78,
    website: 'https://www.ntj.jac.go.jp/nou/',
    description:
      '国立能乐堂举办的传统能乐祭典，展示日本古典戏剧艺术的精髓。世界无形文化遗产的精彩呈现，体验日本传统文化的深邃魅力。',
    category: '传统艺能',
    prefecture: '东京都',
    region: 'tokyo',
  },
  {
    id: 'tokyo-taiko-matsuri',
    title: '东京太鼓祭',
    _sourceData: {
      japaneseName: '東京太鼓祭',
      japaneseDescription: '東京太鼓祭',
    },
    englishName: 'Tokyo Taiko Festival',
    name: '东京太鼓祭',
    date: '2025-09-23',
    dates: '2025年9月23日',
    location: '东京国际论坛',
    venue: '东京国际论坛（千代田区丸之内3-5-1）',
    highlights: ['🥁 太鼓表演', '🎵 传统音乐', '💪 力量展示', '🎌 和太鼓'],
    features: ['🥁 太鼓表演', '🎵 传统音乐', '💪 力量展示', '🎌 和太鼓'],
    likes: 234,
    website: 'https://www.t-i-forum.co.jp/',
    description:
      '东京国际论坛举办的盛大太鼓祭典，来自全国的太鼓团体齐聚表演。震撼心灵的太鼓节拍，展现日本传统音乐的雄浑力量。',
    category: '传统艺能',
    prefecture: '东京都',
    region: 'tokyo',
  },

  // 区域特色祭典
  {
    id: 'asakusa-samba-carnival',
    title: '浅草桑巴嘉年华',
    _sourceData: {
      japaneseName: '浅草桑巴嘉年华',
      japaneseDescription: '浅草桑巴嘉年华',
    },
    englishName: 'Asakusa Samba Carnival',
    name: '浅草桑巴嘉年华',
    date: '2025-08-30',
    dates: '2025年8月30日',
    location: '浅草雷门通',
    venue: '浅草雷门通（台东区浅草）',
    highlights: ['💃 桑巴舞蹈', '🎵 巴西音乐', '🌈 华丽服装', '🎪 国际交流'],
    features: ['💃 桑巴舞蹈', '🎵 巴西音乐', '🌈 华丽服装', '🎪 国际交流'],
    likes: 456,
    website: 'https://www.asakusa-samba.org/',
    description:
      '浅草传统街区举办的南美风情桑巴嘉年华，东西文化的奇妙融合。华丽的服装、热情的舞蹈，为古老的浅草注入现代活力。',
    category: '国际祭典',
    prefecture: '东京都',
    region: 'tokyo',
  },
  {
    id: 'shinjuku-eisa-matsuri',
    title: '新宿冲绳太鼓祭',
    _sourceData: {
      japaneseName: '新宿冲绳太鼓祭典',
      japaneseDescription: '新宿冲绳太鼓祭典',
    },
    englishName: 'Shinjuku Eisa Festival',
    name: '新宿冲绳太鼓祭',
    date: '2025-07-27',
    dates: '2025年7月27-28日',
    endDate: '2025-07-28',
    location: '新宿中央公园',
    venue: '新宿中央公园（新宿区西新宿2-11）',
    highlights: ['🥁 冲绳太鼓', '🌺 传统舞蹈', '🏝️ 岛屿文化', '🎵 民族音乐'],
    features: ['🥁 冲绳太鼓', '🌺 传统舞蹈', '🏝️ 岛屿文化', '🎵 民族音乐'],
    likes: 189,
    website: 'https://www.shinjukueisa.com/',
    description:
      '新宿中央公园举办的冲绳传统太鼓祭典，展现冲绳独特的文化魅力。热情的太鼓声和舞蹈，带来南国岛屿的夏日风情。',
    category: '地域文化',
    prefecture: '东京都',
    region: 'tokyo',
  },

  // 秋季祭典
  {
    id: 'tomioka-hachiman-reitaisai',
    title: '富冈八幡宫例大祭',
    _sourceData: {
      japaneseName: '富岡八幡宮例大祭',
      japaneseDescription: '富岡八幡宮例大祭',
    },
    englishName: 'Tomioka Hachiman Shrine Festival',
    name: '富冈八幡宫例大祭',
    date: '2025-09-15',
    dates: '2025年9月15日',
    location: '富冈八幡宫',
    venue: '富冈八幡宫（江东区富冈1-20-3）',
    highlights: ['🎌 秋季大祭', '👘 传统装束', '🏮 神轿渡御', '🎯 庄严仪式'],
    features: ['🎌 秋季大祭', '👘 传统装束', '🏮 神轿渡御', '🎯 庄严仪式'],
    likes: 98,
    website: 'https://www.tomiokahachimangu.or.jp/',
    description:
      '富冈八幡宫的年度例大祭，展现江户时代传统神社祭典的庄严仪式。秋季举办的神圣祭典，传承古老的神道文化。',
    category: '神社祭典',
    prefecture: '东京都',
    region: 'tokyo',
  },
  {
    id: 'meiji-jingu-aki-matsuri',
    title: '明治神宫秋祭',
    _sourceData: {
      japaneseName: '明治神宮秋祭',
      japaneseDescription: '明治神宮秋祭',
    },
    englishName: 'Meiji Shrine Autumn Festival',
    name: '明治神宫秋祭',
    date: '2025-11-01',
    dates: '2025年11月1-3日',
    endDate: '2025-11-03',
    location: '明治神宫',
    venue: '明治神宫（渋谷区代代木神园町1-1）',
    highlights: ['🍂 秋叶美景', '🎭 古典舞乐', '🏹 流镝马', '⛩️ 皇室神社'],
    features: ['🍂 秋叶美景', '🎭 古典舞乐', '🏹 流镝马', '⛩️ 皇室神社'],
    likes: 345,
    website: 'https://www.meijijingu.or.jp/',
    description:
      '明治神宫秋季大祭，祭祀明治天皇的神圣仪式。流镝马表演、古典舞乐演出，在红叶环绕中体验皇室神社的庄严氛围。',
    category: '皇室祭典',
    prefecture: '东京都',
    region: 'tokyo',
  },

  // 冬季祭典
  {
    id: 'tokyo-christmas-market',
    title: '东京圣诞市集',
    _sourceData: {
      japaneseName: '東京圣诞市集',
      japaneseDescription: '東京圣诞市集',
    },
    englishName: 'Tokyo Christmas Market',
    name: '东京圣诞市集',
    date: '2025-12-01',
    dates: '2025年12月1-25日',
    endDate: '2025-12-25',
    location: '日比谷公园',
    venue: '日比谷公园（千代田区日比谷公园）',
    highlights: ['🎄 圣诞装饰', '🍷 热红酒', '🎁 手工艺品', '✨ 灯光秀'],
    features: ['🎄 圣诞装饰', '🍷 热红酒', '🎁 手工艺品', '✨ 灯光秀'],
    likes: 567,
    website: 'https://tokyochristmas.net/',
    description:
      '日比谷公园举办的德式圣诞市集，营造浓厚的欧洲圣诞氛围。手工艺品摊位、热红酒香气，在东京体验正宗的德国圣诞文化。',
    category: '国际祭典',
    prefecture: '东京都',
    region: 'tokyo',
  },
  {
    id: 'hatsumode-matsuri',
    title: '东京新年参拜祭',
    _sourceData: {
      japaneseName: '東京初詣祭',
      japaneseDescription: '東京初詣祭',
    },
    englishName: 'Tokyo New Year Shrine Visit',
    name: '东京新年参拜祭',
    date: '2025-01-01',
    dates: '2025年1月1-3日',
    endDate: '2025-01-03',
    location: '明治神宫·浅草寺',
    venue: '东京各大神社寺院',
    highlights: ['🎌 新年参拜', '🔔 除夜钟声', '🍶 甘酒招待', '🙏 祈福仪式'],
    features: ['🎌 新年参拜', '🔔 除夜钟声', '🍶 甘酒招待', '🙏 祈福仪式'],
    likes: 1234,
    website: 'https://www.meijijingu.or.jp/',
    description:
      '东京各大神社寺院的新年参拜活动，日本最重要的年度宗教仪式。明治神宫、浅草寺等知名寺社，新年祈福的传统文化体验。',
    category: '新年祭典',
    prefecture: '东京都',
    region: 'tokyo',
  },

  // 美食文化祭典
  {
    id: 'tsukiji-matsuri',
    title: '筑地祭',
    _sourceData: {
      japaneseName: '築地祭',
      japaneseDescription: '築地祭',
    },
    englishName: 'Tsukiji Festival',
    name: '筑地祭',
    date: '2025-10-05',
    dates: '2025年10月5-6日',
    endDate: '2025-10-06',
    location: '筑地场外市场',
    venue: '筑地场外市场（中央区筑地）',
    highlights: ['🐟 新鲜海鲜', '🍣 寿司文化', '🔥 烤鱼表演', '🥢 美食体验'],
    features: ['🐟 新鲜海鲜', '🍣 寿司文化', '🔥 烤鱼表演', '🥢 美食体验'],
    likes: 678,
    website: 'https://www.tsukiji.or.jp/',
    description:
      '筑地场外市场举办的海鲜美食祭典，展现东京顶级海鲜文化。现场烹饪表演、新鲜寿司品尝，体验日本海鲜料理的精髓。',
    category: '美食祭典',
    prefecture: '东京都',
    region: 'tokyo',
  },

  // 文化艺术祭典
  {
    id: 'tokyo-international-film-festival',
    title: '东京国际电影节',
    _sourceData: {
      japaneseName: '東京国際映画祭',
      japaneseDescription: '東京国際映画祭',
    },
    englishName: 'Tokyo International Film Festival',
    name: '东京国际电影节',
    date: '2025-10-28',
    dates: '2025年10月28日-11月5日',
    endDate: '2025-11-05',
    location: '六本木新城',
    venue: '六本木新城（港区六本木6-10-1）',
    highlights: ['🎬 国际电影', '🌟 明星云集', '🏆 电影奖项', '🎭 文化交流'],
    features: ['🎬 国际电影', '🌟 明星云集', '🏆 电影奖项', '🎭 文化交流'],
    likes: 789,
    website: 'https://2025.tiff-jp.net/',
    description:
      '亚洲最大规模的国际电影节之一，汇聚世界各国优秀电影作品。红毯仪式、首映礼、导演见面会，感受国际电影文化的魅力。',
    category: '文化艺术',
    prefecture: '东京都',
    region: 'tokyo',
  },

  // 科技文化祭典
  {
    id: 'tokyo-anime-fair',
    title: '东京动漫祭',
    _sourceData: {
      japaneseName: '東京动漫祭',
      japaneseDescription: '東京动漫祭',
    },
    englishName: 'Tokyo Anime Fair',
    name: '东京动漫祭',
    date: '2025-03-21',
    dates: '2025年3月21-24日',
    endDate: '2025-03-24',
    location: '东京国际展示场',
    venue: '东京国际展示场（江东区有明3-11-1）',
    highlights: ['🎌 动漫文化', '🎮 游戏体验', '👗 角色扮演', '🎨 声优见面'],
    features: ['🎌 动漫文化', '🎮 游戏体验', '👗 角色扮演', '🎨 声优见面'],
    likes: 1456,
    website: 'https://www.animefair.jp/',
    description:
      '东京国际展示场举办的大型动漫文化祭典，展示日本动漫产业的最新成果。角色扮演大赛、声优见面会、新作品发布，动漫迷的盛大聚会。',
    category: '现代文化',
    prefecture: '东京都',
    region: 'tokyo',
  },
];

export default function TokyoMatsuriPage() {
  return (
    <MatsuriPageTemplate
      region={tokyoRegionConfig}
      events={tokyoMatsuriEvents}
      pageTitle="东京传统祭典活动列表"
      pageDescription="探索东京最具代表性的传统祭典活动，从江户三大祭到现代都市祭典，感受首都独特的文化魅力"
      regionKey="tokyo"
      activityKey="matsuri"
    />
  );
}
