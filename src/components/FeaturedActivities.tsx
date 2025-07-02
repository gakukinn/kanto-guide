// 🔄 纯静态页面组件 - 移除客户端交互
import Image from 'next/image';
import Link from 'next/link';

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
    'honjo-gion-matsuri': '本庄祇園祭典 - 7月12-13日 本庄市街地',

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
    'maebashi-tanabata': '前橋七夕祭典 - 7月11-13日 前橋市中心市街地',
    'tsuchiura-hanabi': '土浦全国花火競技大会 - 10月5日 桜川畔',
    'kusatsu-onsen': '草津温泉 - 全年开放 群马县草津町',
    'ashikaga-flower-park': '足利花卉公园 - 4月下旬-5月上旬 足利市',

    // 甲信越活动
    'matsumoto-castle-taiko':
      '第37回国宝松本城太鼓祭典 - 7月26日～27日 国宝松本城二の丸御殿跡',
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
    // 神奈川：蓝色系
    神奈川: {
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
  // 🔄 静态版本 - 移除所有状态管理
  // 所有动画和交互效果改为CSS静态样式

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
          {/* 图片展示区域 - 采用四层页面样式 + 增强动画 */}
          <div className="mb-8 rounded-3xl border-2 border-red-200 bg-white/40 p-2 md:p-6 shadow-2xl backdrop-blur-sm transform translate-y-0 opacity-100 scale-100 hover:shadow-3xl hover:-translate-y-2 hover:rotate-1 transition-all duration-300">
            {/* 16:9 图片展示区域 + 动画增强 */}
            <div
              className={`relative aspect-video bg-gradient-to-br ${featuredActivity.bgColor} overflow-hidden rounded-2xl group cursor-pointer`}
            >
              {/* 动画背景装饰 */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* 闪烁光效 - 静态版本 */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform -translate-x-full hover:translate-x-full transition-transform duration-1000"></div>

              {/* 根据是否有图片选择展示内容 - 静态版本 */}
              {imageUrl ? (
                // 显示真实图片（与四层页面对应）+ 增强动画
                <>
                  <Image
                    src={imageUrl}
                    alt={featuredActivity.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
                    className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110 group-hover:contrast-105"
                    loading="lazy"
                    quality={90}
                  />
                  
                  {/* 动态图片蒙版 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 group-hover:from-black/30 group-hover:to-black/10 transition-all duration-500"></div>
                  
                  {/* 悬停时的装饰性粒子效果 */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/60 rounded-full animate-ping"></div>
                    <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-yellow-300/80 rounded-full animate-pulse delay-300"></div>
                    <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-blue-300/70 rounded-full animate-bounce delay-500"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-pink-300/80 rounded-full animate-pulse delay-700"></div>
                  </div>
                </>
              ) : (
                // 回退到emoji展示 + 增强动画
                <>
                  {/* 背景装饰效果 + 动画 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent group-hover:from-black/5 transition-all duration-500"></div>

                  {/* 旋转装饰环 */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute w-32 h-32 border-2 border-white/20 rounded-full animate-spin-slow"></div>
                    <div className="absolute w-24 h-24 border border-white/30 rounded-full animate-spin-slow-reverse"></div>
                  </div>

                  {/* 中央emoji内容区域 + 增强动画 */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center relative z-10">
                      {/* 大号emoji展示 + 多重动画 */}
                      <div className="mb-4 transform text-9xl drop-shadow-2xl filter transition-all duration-500 group-hover:scale-125 group-hover:brightness-110 group-hover:rotate-12 animate-float">
                        {featuredActivity.emoji}
                      </div>

                      {/* 动态装饰线条 */}
                      <div className="mx-auto h-1 w-32 rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 transform transition-all duration-500 group-hover:w-40 group-hover:h-1.5 group-hover:shadow-lg"></div>
                      
                      {/* 额外的装饰点 */}
                      <div className="flex justify-center mt-2 space-x-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-200"></div>
                        <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse delay-400"></div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* 左下角装饰 + 动画增强 */}
              <div className="absolute bottom-4 left-4 transform transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1">
                <span className="rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-gray-800 shadow-lg backdrop-blur-sm relative overflow-hidden">
                  <span className="relative z-10">🎆 热门推荐</span>
                  {/* 闪光效果 */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform transition-transform duration-1000 group-hover:translate-x-full -translate-x-full"></div>
                </span>
              </div>

              {/* 右上角装饰性图标 */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                  <svg className="w-6 h-6 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* 文字内容区域 - 采用地区背景色 + 动画增强 */}
          <div
            className={`mb-12 transform rounded-3xl border-2 ${regionColors.borderColor} bg-gradient-to-r ${regionColors.bgColor} p-8 shadow-xl backdrop-blur-sm transition-all duration-700 ease-out relative overflow-hidden translate-y-0 opacity-100 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20`}
          >
            {/* 背景动画装饰 */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="flex items-center justify-between relative z-10">
              {/* 活动标题 - 左侧 + 动画 */}
              <h3 className="text-2xl font-bold text-gray-800 md:text-3xl lg:text-4xl transform transition-all duration-300 hover:text-blue-600 hover:scale-105 whitespace-nowrap overflow-hidden text-ellipsis">
                {getEnhancedActivityTitle(
                  featuredActivity.title,
                  featuredActivity.id
                )}
              </h3>

              {/* 查看详情按钮 - 右侧 + 增强动画 */}
              <Link
                href={detailLink as any}
                className="group inline-flex items-center justify-center whitespace-nowrap rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 md:px-8 md:py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-110 hover:from-blue-600 hover:to-purple-700 hover:shadow-2xl hover:shadow-blue-500/30 relative overflow-hidden"
              >
                {/* 按钮闪光效果 */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 transition-transform duration-1000 group-hover:translate-x-full translate-x-[-200%]"></div>
                
                {/* 手机端：只显示文字，居中 */}
                <span className="relative z-10 transition-transform duration-200 group-hover:scale-105 block md:hidden">
                  查看
                </span>
                
                {/* 桌面端：文字+图标，间距布局 */}
                <div className="hidden md:flex items-center space-x-2">
                  <span className="relative z-10 transition-transform duration-200 group-hover:scale-105">
                    查看详情
                  </span>
                  <svg
                    className="h-5 w-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110"
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
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// 添加自定义动画类到全局CSS中
// 可以通过添加CSS类来支持这些动画
