import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://tokyo-seasonal-guide.vercel.app'
  
  // 基础页面
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    // 所有月份页面
    {
      url: `${baseUrl}/january`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/february`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/march`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/april`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/may`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/june`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/july`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/august`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/september`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/october`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/november`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/december`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    // 花火总览页面
    {
      url: `${baseUrl}/july/hanabi`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/august/hanabi`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/september/hanabi`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ]

  // 地区页面
  const regions = ['tokyo', 'kanagawa', 'chiba', 'saitama', 'kitakanto', 'koshinetsu', 'around']
  const regionPages = regions.flatMap(region => [
    {
      url: `${baseUrl}/july/hanabi/${region}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/august/hanabi/${region}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/september/hanabi/${region}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
  ])

  // 7月详细页面
  const julyDetailPages = [
    // 东京
    'july/hanabi/tokyo/keibajo',
    'july/hanabi/tokyo/katsushika-noryo', 
    'july/hanabi/tokyo/sumida',
    'july/hanabi/tokyo/hachioji',
    'july/hanabi/tokyo/tachikawa-showa',
    'july/hanabi/tokyo/mikurajima',
    // 神奈川
    'july/hanabi/kanagawa/kamakura-hanabi',
    'july/hanabi/kanagawa/seaparadise-hanabi-symphonia',
    'july/hanabi/kanagawa/yokohama-night-flowers',
    // 千叶
    'july/hanabi/chiba/futtsu-shimin-hanabi',
    'july/hanabi/chiba/kamogawa-shimin-hanabi',
    'july/hanabi/chiba/marines-hanabi',
    'july/hanabi/chiba/mother-farm-summer-night',
    'july/hanabi/chiba/oamishirasato-hanabi',
    'july/hanabi/chiba/shirahama-ama-matsuri',
    // 埼玉
    'july/hanabi/saitama/iruma-base-2025',
    'july/hanabi/saitama/koshigaya-2025',
    'july/hanabi/saitama/metsza-nordic-2025',
    'july/hanabi/saitama/ogawa-tanabata-2025',
    'july/hanabi/saitama/saitama-owada-2025',
    'july/hanabi/saitama/seibu-en-2025',
    // 北关东
    'july/hanabi/kitakanto/mito-hanabi',
    'july/hanabi/kitakanto/moka-hanabi',
    'july/hanabi/kitakanto/tamura-hanabi',
    'july/hanabi/kitakanto/tatebayashi-hanabi',
    // 甲信越
    'july/hanabi/koshinetsu/anime-classics-anisong-hanabi',
    'july/hanabi/koshinetsu/fuji-kawaguchi-lake-hanabi',
    'july/hanabi/koshinetsu/gion-kashiwazaki-hanabi',
    'july/hanabi/koshinetsu/nojiri-lake-hanabi',
    'july/hanabi/koshinetsu/sanjo-natsumatsuri-hanabi',
    'july/hanabi/koshinetsu/suzaka-minna-hanabi'
  ]

  // 8月详细页面
  const augustDetailPages = [
    // 东京
    'august/hanabi/tokyo/akishima',
    'august/hanabi/tokyo/edogawa',
    'august/hanabi/tokyo/itabashi',
    'august/hanabi/tokyo/jingu-gaien',
    'august/hanabi/tokyo/kozushima',
    'august/hanabi/tokyo/okutama',
    // 神奈川
    'august/hanabi/kanagawa/atsugi-ayu-matsuri',
    'august/hanabi/kanagawa/kanazawa-matsuri-hanabi',
    'august/hanabi/kanagawa/kurihama',
    'august/hanabi/kanagawa/minato-mirai-smart',
    'august/hanabi/kanagawa/odawara-sakawa',
    'august/hanabi/kanagawa/sagamiko',
    'august/hanabi/kanagawa/southern-beach-chigasaki',
    'august/hanabi/kanagawa/yokohama-night-flowers',
    'august/hanabi/kanagawa/yokohama-seaparadise',
    // 千叶
    'august/hanabi/chiba/choshi-minato-hanabi',
    'august/hanabi/chiba/ichikawa',
    'august/hanabi/chiba/kisarazu',
    'august/hanabi/chiba/makuhari-beach-hanabi',
    'august/hanabi/chiba/matsudo',
    'august/hanabi/chiba/narashino',
    'august/hanabi/chiba/omigawa',
    'august/hanabi/chiba/teganuma',
    // 埼玉
    'august/hanabi/saitama/asaka',
    'august/hanabi/saitama/higashimatsuyama',
    'august/hanabi/saitama/ina',
    'august/hanabi/saitama/kumagaya',
    'august/hanabi/saitama/omagi',
    'august/hanabi/saitama/todabashi',
    // 北关东
    'august/hanabi/kitakanto/ashikaga',
    'august/hanabi/kitakanto/hitachinaka',
    'august/hanabi/kitakanto/koga',
    'august/hanabi/kitakanto/maebashi',
    'august/hanabi/kitakanto/takasaki',
    'august/hanabi/kitakanto/toride',
    // 甲信越
    'august/hanabi/koshinetsu/kawaguchi-hanabi',
    'august/hanabi/koshinetsu/nagaoka-hanabi',
    'august/hanabi/koshinetsu/niigata-hanabi',
    'august/hanabi/koshinetsu/shinmei-hanabi',
    'august/hanabi/koshinetsu/suwa-hanabi',
    'august/hanabi/koshinetsu/ueda-hanabi'
  ]

  // 9月详细页面
  const septemberDetailPages = [
    // 东京
    'september/hanabi/tokyo/chofu-hanabi',
    // 神奈川
    'september/hanabi/kanagawa/seaparadise-hanabi',
    'september/hanabi/kanagawa/yokohama-hanabi',
    // 埼玉
    'september/hanabi/saitama/metsa-hanabi',
    'september/hanabi/saitama/seibu-hanabi',
    // 北关东
    'september/hanabi/kitakanto/joso-kinugawa-hanabi',
    'september/hanabi/kitakanto/numata-hanabi',
    'september/hanabi/kitakanto/oarai-hanabi',
    'september/hanabi/kitakanto/oyama-hanabi',
    'september/hanabi/kitakanto/rindoko-hanabi',
    'september/hanabi/kitakanto/tonegawa-hanabi',
    // 甲信越
    'september/hanabi/koshinetsu/asahara-hanabi',
    'september/hanabi/koshinetsu/shinsaku-hanabi'
  ]

  // 创建详细页面的sitemap条目
  const detailPages = [...julyDetailPages, ...augustDetailPages, ...septemberDetailPages].map(path => ({
    url: `${baseUrl}/${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...regionPages, ...detailPages]
} 