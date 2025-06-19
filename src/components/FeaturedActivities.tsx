import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface FeaturedActivity {
  id: string;
  title: string;
  description: string;
  emoji: string;
  bgColor: string;
  detailLink?: string; // 添加详情页面链接
  imageUrl?: string; // 添加真实图片URL
}

interface FeaturedActivitiesProps {
  region: string;
  activities: FeaturedActivity[];
}

// 根据记忆中的自动化配置规则，花火数据应该使用SQLite（复杂关系数据）
// 隅田川花火大会对应的四层页面链接配置
const getActivityDetailLink = (region: string, activityId: string): string => {
  // 根据地区和活动ID自动生成页面链接
  const linkMapping = {
    // 东京活动 - 只有隅田川花火有四层页面，其他指向三层页面
    'sumida-river-fireworks': `/tokyo/hanabi/sumida`,
    'sanja-festival': `/tokyo/matsuri`,
    'ueno-cherry-blossom': `/tokyo/hanami`,

    // 埼玉活动 - 指向三层页面
    'omiya-hanabi': `/saitama/hanabi`,
    'kawagoe-festival': `/saitama/matsuri`,
    'chichibu-yomatsuri': `/saitama/matsuri`,
    'honjo-gion-matsuri': `/saitama/Matsuri/Honjo Gion Festival`,

    // 千叶活动 - 指向三层页面
    'kamogawa-hanabi': `/chiba/hanabi`,
    'narita-gion-festival': `/chiba/matsuri/narita-gion-festival`,
    'kujukuri-beach': `/chiba/matsuri`,

    // 神奈川活动 - 指向三层页面
    'hiratsuka-tanabata': `/kanagawa/matsuri/hiratsuka-tanabata`,
    'yokohama-port-festival': `/kanagawa/hanabi`,
    'kamakura-festival': `/kanagawa/matsuri`,
    'shonan-beach-festival': `/kanagawa/matsuri`,

    // 北关东活动 - 指向三层页面
    'tsuchiura-hanabi': `/kitakanto/hanabi`,
    'kusatsu-onsen': `/kitakanto/culture`,
    'ashikaga-flower-park': `/kitakanto/hanami`,

    // 甲信越活动 - 指向三层页面
    'nagaoka-hanabi': `/koshinetsu/hanabi`,
    'matsumoto-castle-festival': `/koshinetsu/matsuri`,
    'fuji-kawaguchi-hanabi': `/koshinetsu/hanabi`,
  };

  return linkMapping[activityId as keyof typeof linkMapping] || `/${region}`;
};

// 获取对应的活动图片URL（与四层页面媒体对应）
// 使用四层目录结构：地区/活动类型/具体活动/图片文件
const getActivityImageUrl = (activityId: string): string | undefined => {
  const imageMapping = {
    // 东京活动图片
    'sumida-river-fireworks':
      '/images/tokyo/hanabi/sumida/sumida-hanabi-main.jpg (1).png',
    'sanja-festival': '/images/tokyo/matsuri/sanja/main.jpg',
    'ueno-cherry-blossom': '/images/tokyo/hanami/ueno/main.jpg',

    // 埼玉活动图片
    'omiya-hanabi': '/images/saitama/hanabi/omiya/main.jpg',
    'kawagoe-festival': '/images/saitama/matsuri/kawagoe/main.jpg',
    'chichibu-yomatsuri': '/images/saitama/matsuri/chichibu/main.jpg',
    'honjo-gion-matsuri':
      '/images/saitama/Matsuri/Honjo Gion Festival/Honjo Gion Festival (1).jpg',

    // 千叶活动图片
    'kamogawa-hanabi': '/images/chiba/hanabi/kamogawa/main.jpg',
    'narita-gion-festival':
      '/images/chiba/Matsuri/Narita Gion Festival/Narita Gion Festival (1).jpg',
    'kujukuri-beach': '/images/chiba/matsuri/kujukuri/main.jpg',

    // 神奈川活动图片
    'hiratsuka-tanabata':
      '/images/kanagawa/Matsuri/Shonan Hiratsuka Tanabata Festival/Shonan Hiratsuka Tanabata Festival.jpg',
    'yokohama-port-festival': '/images/kanagawa/hanabi/yokohama/main.jpg',
    'kamakura-festival': '/images/kanagawa/matsuri/kamakura/main.jpg',
    'shonan-beach-festival': '/images/kanagawa/matsuri/shonan/main.jpg',

    // 北关东活动图片
    'maebashi-tanabata':
      '/images/kitakanto/Matsuri/Maebashi Tanabata Festival/Maebashi Tanabata Festival (1).jpg',
    'tsuchiura-hanabi': '/images/kitakanto/hanabi/tsuchiura/main.jpg',
    'kusatsu-onsen': '/images/kitakanto/culture/kusatsu/main.jpg',
    'ashikaga-flower-park': '/images/kitakanto/hanami/ashikaga/main.jpg',

    // 甲信越活动图片
    'matsumoto-castle-taiko':
      '/images/koshinetsu/Matsuri/Matsumoto%20Castle%20Taiko%20Festival/Matsumoto%20Castle%20Taiko%20Festival%20(1).jpg',
    'nagaoka-hanabi': '/images/koshinetsu/hanabi/nagaoka/main.jpg',
    'fuji-kawaguchi-hanabi': '/images/koshinetsu/hanabi/kawaguchi/main.jpg',
  };

  return imageMapping[activityId as keyof typeof imageMapping];
};

// 为特定活动添加额外信息（时间地点等）
const getEnhancedActivityTitle = (
  title: string,
  activityId: string
): string => {
  const enhancements = {
    // 东京活动
    'sumida-river-fireworks': '隅田川花火大会 - 7月26日 隅田川两岸',
    'sanja-festival': '三社祭 - 5月17-18日 浅草神社',
    'ueno-cherry-blossom': '上野公园赏樱 - 3月下旬-4月上旬 上野公园',

    // 埼玉活动
    'omiya-hanabi': '大宫花火大会 - 8月2日 大宫公园',
    'kawagoe-festival': '川越祭 - 10月18-19日 川越市区',
    'chichibu-yomatsuri': '秩父夜祭 - 12月2-3日 秩父神社',
    'honjo-gion-matsuri': '本庄祇園まつり - 7月12-13日 本庄市街地',

    // 千叶活动
    'kamogawa-hanabi': '鸭川海岸花火大会 - 8月9日 鸭川海岸',
    'narita-gion-festival': '成田祇园祭 - 7月4-6日 成田山新胜寺',
    'kujukuri-beach': '九十九里海岸祭 - 8月3日 九十九里海岸',

    // 神奈川活动
    'hiratsuka-tanabata': '湘南平塚七夕祭 - 7月4-6日 平塚駅北口商店街',
    'yokohama-port-festival': '横浜港祭 - 6月7日 横滨港未来21',
    'kamakura-festival': '镰仓祭 - 4月第2・第3周日 鹤冈八幡宫',
    'shonan-beach-festival': '湘南海岸祭 - 7月27日 湘南海岸',

    // 北关东活动
    'maebashi-tanabata': '前橋七夕まつり - 7月11-13日 前橋市中心市街地',
    'tsuchiura-hanabi': '土浦全国花火競技大会 - 10月5日 桜川畔',
    'kusatsu-onsen': '草津温泉 - 全年开放 群马县草津町',
    'ashikaga-flower-park': '足利花卉公园 - 4月下旬-5月上旬 足利市',

    // 甲信越活动
    'matsumoto-castle-taiko':
      '第37回国宝松本城太鼓まつり - 7月26日～27日 国宝松本城二の丸御殿跡',
    'nagaoka-hanabi': '长冈大花火 - 8月2-3日 信濃川河川敷',
    'fuji-kawaguchi-hanabi': '河口湖湖上祭 - 8月5日 河口湖畔',
  };

  return enhancements[activityId as keyof typeof enhancements] || title;
};

// 根据地区获取背景色和边框色
const getRegionColors = (region: string) => {
  const regionColors = {
    // 东京都：红色系
    东京都: {
      bgColor: 'from-red-50 to-rose-100',
      borderColor: 'border-red-200',
    },
    东京: {
      bgColor: 'from-red-50 to-rose-100',
      borderColor: 'border-red-200',
    },
    // 埼玉县：橙色系
    埼玉县: {
      bgColor: 'from-orange-50 to-amber-100',
      borderColor: 'border-orange-200',
    },
    埼玉: {
      bgColor: 'from-orange-50 to-amber-100',
      borderColor: 'border-orange-200',
    },
    // 千叶县：天蓝色系
    千叶县: {
      bgColor: 'from-sky-50 to-cyan-100',
      borderColor: 'border-sky-200',
    },
    千叶: {
      bgColor: 'from-sky-50 to-cyan-100',
      borderColor: 'border-sky-200',
    },
    // 神奈川县：蓝色系
    神奈川县: {
      bgColor: 'from-blue-100 to-blue-200',
      borderColor: 'border-blue-200',
    },
    神奈川: {
      bgColor: 'from-blue-100 to-blue-200',
      borderColor: 'border-blue-200',
    },
    // 北关东：绿色系
    北关东: {
      bgColor: 'from-green-50 to-emerald-100',
      borderColor: 'border-green-200',
    },
    // 甲信越：紫色系
    甲信越: {
      bgColor: 'from-purple-50 to-violet-100',
      borderColor: 'border-purple-200',
    },
  };

  return (
    regionColors[region as keyof typeof regionColors] || {
      bgColor: 'from-red-50 to-blue-100',
      borderColor: 'border-red-200',
    }
  );
};

export default function FeaturedActivities({
  region,
  activities,
}: FeaturedActivitiesProps) {
  const [imageError, setImageError] = useState(false);

  // 只取第一个活动
  const featuredActivity = activities[0];

  if (!featuredActivity) {
    return null;
  }

  // 获取详情页面链接
  const detailLink =
    featuredActivity.detailLink ||
    getActivityDetailLink(region, featuredActivity.id);

  // 获取图片URL（优先使用提供的imageUrl，否则使用映射表）
  const imageUrl =
    featuredActivity.imageUrl || getActivityImageUrl(featuredActivity.id);

  // 获取地区颜色配置
  const regionColors = getRegionColors(region);

  return (
    <section className="bg-gradient-to-b from-white/40 to-white/20 py-12 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 单个热门活动展示 - 大尺寸展示 */}
        <div className="mx-auto max-w-6xl">
          {/* 图片展示区域 - 采用四层页面样式 */}
          <div className="mb-8 rounded-3xl border-2 border-red-200 bg-white/40 p-6 shadow-2xl backdrop-blur-sm">
            {/* 16:9 图片展示区域 */}
            <div
              className={`relative aspect-video bg-gradient-to-br ${featuredActivity.bgColor} overflow-hidden rounded-2xl`}
            >
              {/* 根据是否有图片选择展示内容 */}
              {imageUrl && !imageError ? (
                // 显示真实图片（与四层页面对应）
                <>
                  <Image
                    src={imageUrl}
                    alt={featuredActivity.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
                    className="object-cover filter transition-all duration-700 hover:scale-105 hover:brightness-110"
                    loading="lazy"
                    quality={90}
                    onError={() => setImageError(true)}
                  />
                  {/* 图片上的渐变蒙版 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"></div>
                </>
              ) : (
                // 回退到emoji展示
                <>
                  {/* 背景装饰效果 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent"></div>

                  {/* 中央emoji内容区域 */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      {/* 大号emoji展示 */}
                      <div className="mb-4 transform text-9xl drop-shadow-2xl filter transition-all duration-500 hover:scale-110 hover:brightness-110">
                        {featuredActivity.emoji}
                      </div>

                      {/* 装饰线条 */}
                      <div className="mx-auto h-1 w-32 rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"></div>
                    </div>
                  </div>
                </>
              )}

              {/* 左下角装饰 */}
              <div className="absolute bottom-4 left-4">
                <span className="rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-gray-800 shadow-lg backdrop-blur-sm">
                  热门推荐
                </span>
              </div>
            </div>
          </div>

          {/* 文字内容区域 - 采用地区背景色 */}
          <div
            className={`mb-12 transform rounded-3xl border-2 ${regionColors.borderColor} bg-gradient-to-r ${regionColors.bgColor} p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl`}
          >
            <div className="flex items-center justify-between">
              {/* 活动标题 - 左侧 */}
              <h3 className="text-2xl font-bold text-gray-800 md:text-3xl lg:text-4xl">
                {getEnhancedActivityTitle(
                  featuredActivity.title,
                  featuredActivity.id
                )}
              </h3>

              {/* 查看详情按钮 - 右侧 */}
              <Link
                href={detailLink}
                className="inline-flex items-center space-x-2 whitespace-nowrap rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-purple-700 hover:shadow-xl"
              >
                <span>查看详情</span>
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
