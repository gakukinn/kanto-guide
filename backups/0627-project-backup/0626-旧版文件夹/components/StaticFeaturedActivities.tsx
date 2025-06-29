// 🔄 纯静态页面组件 - 完全静态版本
import Image from 'next/image';
import Link from 'next/link';

interface FeaturedActivity {
  id: string;
  title: string;
  description: string;
  emoji: string;
  bgColor: string;
  detailLink?: string;
  imageUrl?: string;
}

interface StaticFeaturedActivitiesProps {
  region: string;
  activities: FeaturedActivity[];
}

// 获取活动详情链接
const getActivityDetailLink = (region: string, activityId: string): string => {
  const linkMapping = {
    'sumida-river-fireworks': `/tokyo/hanabi/sumida`,
    'sanja-festival': `/tokyo/matsuri`,
    'ueno-cherry-blossom': `/tokyo/hanami`,
    'omiya-hanabi': `/saitama/hanabi`,
    'kawagoe-festival': `/saitama/matsuri`,
    'kamogawa-hanabi': `/chiba/hanabi`,
    'hiratsuka-tanabata': `/kanagawa/matsuri/hiratsuka-tanabata`,
    'tsuchiura-hanabi': `/kitakanto/hanabi`,
    'nagaoka-hanabi': `/koshinetsu/hanabi`,
  };
  return linkMapping[activityId as keyof typeof linkMapping] || `/${region}`;
};

// 获取活动图片URL
const getActivityImageUrl = (activityId: string): string | undefined => {
  const imageMapping = {
    'sumida-river-fireworks': '/images/tokyo/hanabi/sumida/sumida-hanabi-main.jpg (1).png',
    'sanja-festival': '/images/tokyo/matsuri/sanja/main.jpg',
    'omiya-hanabi': '/images/saitama/hanabi/omiya/main.jpg',
    'kamogawa-hanabi': '/images/chiba/hanabi/kamogawa/main.jpg',
    'hiratsuka-tanabata': '/images/kanagawa/Matsuri/Shonan Hiratsuka Tanabata Festival/Shonan Hiratsuka Tanabata Festival.jpg',
    'tsuchiura-hanabi': '/images/kitakanto/hanabi/tsuchiura/main.jpg',
    'nagaoka-hanabi': '/images/koshinetsu/hanabi/nagaoka/main.jpg',
  };
  return imageMapping[activityId as keyof typeof imageMapping];
};

// 获取增强标题
const getEnhancedActivityTitle = (title: string, activityId: string): string => {
  const enhancements = {
    'sumida-river-fireworks': '隅田川花火大会 - 7月26日 隅田川两岸',
    'sanja-festival': '三社祭 - 5月17-18日 浅草神社',
    'omiya-hanabi': '大宫花火大会 - 8月2日 大宫公园',
    'kamogawa-hanabi': '鸭川海岸花火大会 - 8月9日 鸭川海岸',
    'hiratsuka-tanabata': '湘南平塚七夕祭 - 7月4-6日 平塚駅北口商店街',
    'tsuchiura-hanabi': '土浦全国花火競技大会 - 10月5日 桜川畔',
    'nagaoka-hanabi': '长冈大花火 - 8月2-3日 信濃川河川敷',
  };
  return enhancements[activityId as keyof typeof enhancements] || title;
};

// 获取地区颜色
const getRegionColors = (region: string) => {
  const regionColors = {
    东京: { bgColor: 'from-red-50 to-rose-100', borderColor: 'border-red-200' },
    埼玉: { bgColor: 'from-orange-50 to-amber-100', borderColor: 'border-orange-200' },
    千叶: { bgColor: 'from-sky-50 to-cyan-100', borderColor: 'border-sky-200' },
    神奈川: { bgColor: 'from-blue-100 to-blue-200', borderColor: 'border-blue-200' },
    北关东: { bgColor: 'from-green-50 to-emerald-100', borderColor: 'border-green-200' },
    甲信越: { bgColor: 'from-purple-50 to-violet-100', borderColor: 'border-purple-200' },
  };
  return regionColors[region as keyof typeof regionColors] || regionColors.东京;
};

export default function StaticFeaturedActivities({
  region,
  activities,
}: StaticFeaturedActivitiesProps) {
  // 只取第一个活动
  const featuredActivity = activities[0];

  if (!featuredActivity) {
    return null;
  }

  // 获取详情页面链接
  const detailLink = featuredActivity.detailLink || getActivityDetailLink(region, featuredActivity.id);
  
  // 获取图片URL
  const imageUrl = featuredActivity.imageUrl || getActivityImageUrl(featuredActivity.id);
  
  // 获取地区颜色配置
  const regionColors = getRegionColors(region);

  return (
    <section className="bg-gradient-to-b from-white/40 to-white/20 py-12 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* 图片展示区域 - 静态版本 */}
          <div className="mb-8 rounded-3xl border-2 border-red-200 bg-white/40 p-6 shadow-2xl backdrop-blur-sm transform translate-y-0 opacity-100 scale-100 hover:shadow-3xl hover:-translate-y-2 transition-all duration-300">
            {/* 16:9 图片展示区域 */}
            <div className={`relative aspect-video bg-gradient-to-br ${featuredActivity.bgColor} overflow-hidden rounded-2xl group cursor-pointer`}>
              {/* 动画背景装饰 */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* 闪烁光效 - 静态版本 */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform -translate-x-full hover:translate-x-full transition-transform duration-1000"></div>

              {/* 根据是否有图片选择展示内容 */}
              {imageUrl ? (
                // 显示真实图片
                <>
                  <Image
                    src={imageUrl}
                    alt={featuredActivity.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
                    className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                    loading="lazy"
                    quality={90}
                  />
                  {/* 图片蒙版 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 group-hover:from-black/30 group-hover:to-black/10 transition-all duration-500"></div>
                </>
              ) : (
                // 回退到emoji展示
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent group-hover:from-black/5 transition-all duration-500"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center relative z-10">
                      <div className="mb-4 transform text-9xl drop-shadow-2xl filter transition-all duration-500 group-hover:scale-125">
                        {featuredActivity.emoji}
                      </div>
                      <div className="mx-auto h-1 w-32 rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"></div>
                    </div>
                  </div>
                </>
              )}

              {/* 左下角装饰 */}
              <div className="absolute bottom-4 left-4 transform transition-all duration-300 group-hover:scale-110">
                <span className="rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-gray-800 shadow-lg backdrop-blur-sm">
                  🎆 热门推荐
                </span>
              </div>

              {/* 右上角装饰性图标 */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* 文字内容区域 */}
          <div className={`mb-12 transform rounded-3xl border-2 ${regionColors.borderColor} bg-gradient-to-r ${regionColors.bgColor} p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl`}>
            <div className="flex items-center justify-between">
              {/* 活动标题 - 左侧 */}
              <h3 className="text-2xl font-bold text-gray-800 md:text-3xl lg:text-4xl transition-all duration-300 hover:text-blue-600">
                {getEnhancedActivityTitle(featuredActivity.title, featuredActivity.id)}
              </h3>

              {/* 查看详情按钮 - 右侧 */}
              <Link
                href={detailLink as any}
                className="group inline-flex items-center space-x-2 whitespace-nowrap rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-110 hover:from-blue-600 hover:to-purple-700 hover:shadow-2xl"
              >
                <span className="transition-transform duration-200 group-hover:scale-105">查看详情</span>
                <svg
                  className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
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