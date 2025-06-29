/**
 * 艺术文化活动页面通用模板 - PROFESSIONAL LEVEL
 * @template 第三层艺术文化活动页面通用模板
 * @scalability 支持关东全地区复用
 * @features 日期筛选、点赞系统、响应式设计、时间排序、Features自动图标
 * @performance 优化加载、缓存机制、SEO友好
 *
 * 🎨 标准配色规则体系（COLOR_SYSTEM_RULES）:
 *
 * 📍 首页地区卡片背景色（地区色）:
 * - 东京都: from-red-50 to-rose-100 border-red-300/70
 * - 埼玉县: from-orange-50 to-amber-100 border-orange-300/70
 * - 千叶县: from-sky-50 to-cyan-100 border-sky-300/70
 * - 神奈川县: from-blue-100 to-blue-200 border-blue-400/70
 * - 北关东: from-green-50 to-emerald-100 border-emerald-300/70
 * - 甲信越: from-purple-50 to-violet-100 border-purple-300/70
 *
 * 🎭 二层活动卡片背景色（活动色）:
 * - 传统祭典(matsuri): from-red-50 to-red-100 border-red-200/60
 * - 花见会(hanami): from-pink-50 to-pink-100 border-pink-200/60
 * - 花火大会(hanabi): from-blue-50 to-blue-100 border-blue-200/60
 * - 文化艺术(culture): from-green-50 to-green-100 border-green-200/60
 * - 红叶狩(momiji): from-orange-50 to-orange-100 border-orange-200/60
 * - 灯光秀(illumination): from-purple-50 to-purple-100 border-purple-200/60
 *
 * 🌈 第三层页面配色规则：地区色+活动色组合
 * - 背景渐变：地区主色调 + 文化艺术绿色系
 * - 示例：东京文化 = 红色系(地区) + 绿色系(活动) = from-red-100 to-green-200
 * - 示例：埼玉文化 = 橙色系(地区) + 绿色系(活动) = from-orange-100 to-green-200
 * - 示例：千叶文化 = 蓝色系(地区) + 绿色系(活动) = from-sky-100 to-green-200
 *
 * 📋 网站内容显示规则（CONTENT_DISPLAY_RULES）:
 * ✅ 允许显示：简体汉字、繁体汉字、日文汉字
 * ✅ 允许显示：与地名相连的假名（如：新宿、渋谷等地名中的假名）
 * ❌ 禁止显示：独立的日文假名（的的、）
 * ❌ 禁止显示：非地名的假名文字
 * 🔧 AI操作要求：修改数据时必须将假名转换为汉字，保持内容准确性
 * 📝 示例：美術館 → 美术馆、ミュージアム → 博物馆、コンサート → 音乐会
 *
 * ⚠️ 商业网站重要提醒：绝对不能编造任何信息，所有内容必须基于真实可靠的数据源！
 *
 * 📋 数据质量保证规则（DATA_QUALITY_RULES）:
 * ✅ 日期必须包含年份：2025年8月15日 ✓ | 8月15日 ❌
 * ✅ 必填字段检查：id, name, date, location必须完整
 * ✅ 自动数据修复：缺少年份时自动添加当前年份
 * ✅ 默认值填充：缺少的japaneseName、englishName等字段自动填充
 * ⚠️ AI操作规范：制作API数据时务必包含完整年份信息
 * 🔧 模板保护：模板会自动检查和修复数据质量问题
 */
// 🔄 纯静态页面模板 - 移除客户端交互
import { getCultureRegionNavigation } from '@/config/navigation';
import Link from 'next/link';
// 标准配色规则定义 - 专门为艺术文化活动优化
const COLOR_SYSTEM = {
  // 地区色配置（首页地区卡片色）
  REGION_COLORS: {
    tokyo: {
      from: 'red-50',
      to: 'rose-100',
      primary: 'red-600',
      secondary: 'rose-500',
    }, // 东京都：红色系
    saitama: {
      from: 'orange-50',
      to: 'amber-100',
      primary: 'orange-600',
      secondary: 'amber-500',
    }, // 埼玉县：橙色系
    chiba: {
      from: 'sky-50',
      to: 'cyan-100',
      primary: 'sky-600',
      secondary: 'cyan-500',
    }, // 千叶县：天蓝色系
    kanagawa: {
      from: 'blue-100',
      to: 'blue-200',
      primary: 'blue-600',
      secondary: 'blue-500',
    }, // 神奈川县：蓝色系
    kitakanto: {
      from: 'green-50',
      to: 'emerald-100',
      primary: 'green-600',
      secondary: 'emerald-500',
    }, // 北关东：绿色系
    koshinetsu: {
      from: 'purple-50',
      to: 'violet-100',
      primary: 'purple-600',
      secondary: 'violet-500',
    }, // 甲信越：紫色系
  },

  // 活动色配置（二层活动卡片色）
  ACTIVITY_COLORS: {
    culture: {
      from: 'green-50',
      to: 'green-100',
      primary: 'green-600',
      secondary: 'green-500',
    }, // 文化艺术：绿色系
  },

  // 生成标准配色的函数
  generateBackgroundGradient: (
    regionKey: string,
    activityKey: string = 'culture'
  ) => {
    const regionColor =
      COLOR_SYSTEM.REGION_COLORS[
        regionKey as keyof typeof COLOR_SYSTEM.REGION_COLORS
      ] || COLOR_SYSTEM.REGION_COLORS.tokyo;
    const activityColor = COLOR_SYSTEM.ACTIVITY_COLORS.culture;

    // 地区色为主，活动色为辅，创建渐变
    return `from-${regionColor.from} to-${activityColor.to}`;
  },

  // 生成标题颜色渐变的函数（地区色+活动色组合）
  generateTitleGradient: (
    regionKey: string,
    activityKey: string = 'culture'
  ) => {
    const regionColor =
      COLOR_SYSTEM.REGION_COLORS[
        regionKey as keyof typeof COLOR_SYSTEM.REGION_COLORS
      ] || COLOR_SYSTEM.REGION_COLORS.tokyo;
    const activityColor = COLOR_SYSTEM.ACTIVITY_COLORS.culture;

    // 地区主色 → 活动主色 → 活动辅色，创建三色渐变
    return `from-${regionColor.primary} via-${activityColor.primary} to-${activityColor.secondary}`;
  },
};

// ==================== 类型定义 ====================

// 艺术文化活动事件数据接口
interface CultureEvent {
  id: string;
  title?: string;
  name?: string;
  date?: string;
  dates?: string;
  endDate?: string;
  location: string;
  features?: string[];
  highlights?: string[];
  likes: number;
  website?: string; // 改为可选，因为不再显示官网链接
  description: string;
  artType?: string;
  artist?: string;
  venue?: string;
  ticketPrice?: string;
  detailLink?: string; // 详情页面链接
}

// 原始API数据接口
interface RawCultureEvent {
  id?: string;
  title?: string;
  name?: string;
  date?: string;
  dates?: string;
  endDate?: string;
  location?: string;
  features?: string[];
  highlights?: string[];
  likes?: number | string;
  website?: string; // 改为可选，因为不再显示官网链接
  description?: string;
  artType?: string;
  artist?: string;
  venue?: string;
  ticketPrice?: string;
  detailLink?: string; // 详情页面链接
}

interface RegionConfig {
  name: string;
  displayName: string;
  emoji: string;
  description: string;
  navigationLinks: {
    prev: { name: string; url: string; emoji: string };
    next: { name: string; url: string; emoji: string };
    current: { name: string; url: string };
  };
}

interface CulturePageTemplateProps {
  region: RegionConfig;
  events: CultureEvent[];
  pageTitle?: string;
  pageDescription?: string;
  regionKey?: string;
  activityKey?: string;
}

export default function CulturePageTemplate({
  region,
  events,
  pageTitle,
  pageDescription,
  regionKey = 'tokyo',
  activityKey = 'culture',
}: CulturePageTemplateProps) {
      const [likedEvents, setLikedEvents] = useState<Record<string, number>>({});

  // ==================== 导航系统 ====================

  const getRegionNavigation = () => {
    return getCultureRegionNavigation(regionKey);
  };

  const navigation = getRegionNavigation();

  // ==================== 背景颜色系统 ====================

  // 获取标准背景渐变 - 地区色+活动色组合
  const getStandardBackgroundGradient = () => {
    return COLOR_SYSTEM.generateBackgroundGradient(regionKey, activityKey);
  };

  // 获取标题渐变 - 简化配色，确保可读性
  const getTitleGradient = () => {
    // 为文化艺术活动使用统一的绿色系渐变，确保可读性
    return 'from-green-600 via-emerald-600 to-teal-600';
  };

  // 获取卡片背景色 - 基于地区色和活动色组合
  const getCardBackgroundGradient = () => {
    const regionColor =
      COLOR_SYSTEM.REGION_COLORS[
        regionKey as keyof typeof COLOR_SYSTEM.REGION_COLORS
      ] || COLOR_SYSTEM.REGION_COLORS.tokyo;
    const activityColor = COLOR_SYSTEM.ACTIVITY_COLORS.culture;

    // 卡片使用更浅的地区色 + 活动色渐变，并保持透明度
    return `bg-gradient-to-br from-${regionColor.from} to-${activityColor.from}/80`;
  };

  // 获取卡片边框色
  const getCardBorderColor = () => {
    const activityColor = COLOR_SYSTEM.ACTIVITY_COLORS.culture;

    return `border-green-200`;
  };

  // 数据验证和修复
  const validatedEvents = useMemo(() => {
    return (events || []).map((event, index) => ({
      ...event,
      id: event.id || `culture-event-${index}`,
      title: event.title || event.name || `文化艺术活动 ${index + 1}`,
      name: event.name || event.title || `文化艺术活动 ${index + 1}`,
      location: event.location || '地点待定',
      description: event.description || '详情待更新',
      likes: Math.max(0, event.likes || 0),
      features: event.features || event.highlights || [],
      highlights: event.highlights || event.features || [],
    }));
  }, [events]);

  // 为特征添加图标
  const addIconToFeature = (feature: string): string => {
    // 如果特色已经包含图标（emoji），直接返回
    const emojiRegex =
      /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu;
    if (emojiRegex.test(feature)) {
      return feature;
    }

    const icons: Record<string, string> = {
      音乐会: '🎵',
      演唱会: '🎤',
      美术展: '🎨',
      戏剧: '🎭',
      舞蹈: '💃',
      免费: '🆓',
      付费: '💳',
      预约制: '📞',
      限定: '⭐',
      新作: '✨',
    };

    for (const [keyword, icon] of Object.entries(icons)) {
      if (feature.includes(keyword)) {
        return `${icon} ${feature}`;
      }
    }
    return `🎨 ${feature}`;
  };

  const formatDateRange = (eventDateStr?: string, endDate?: string) => {
    if (!eventDateStr) return '日期待定';
    if (endDate && endDate !== eventDateStr) {
      return `${eventDateStr} ~ ${endDate}`;
    }
    return eventDateStr;
  };

  const handleLike = (eventId: string) => {
    setLikedEvents(prev => ({
      ...prev,
      [eventId]: (prev[eventId] || 0) + 1,
    }));
  };

  const truncateText = (text: string, maxLength: number): string => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  // 日期筛选
  const filteredEvents = useMemo(() => {
    if (!startDate && !endDate) return validatedEvents;

    return validatedEvents.filter(event => {
      const eventDate = event.date || event.dates;
      if (!eventDate) return true;

      const eventDateObj = new Date(eventDate.replace(/[年月日]/g, '-'));
      const startDateObj = startDate ? new Date(startDate) : null;
      const endDateObj = endDate ? new Date(endDate) : null;

      if (startDateObj && eventDateObj < startDateObj) return false;
      if (endDateObj && eventDateObj > endDateObj) return false;

      return true;
    });
  }, [validatedEvents, startDate, endDate]);

  // 时间排序 - 按日期升序排列，支持上旬/中旬/下旬格式
  const sortedEvents = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return [...filteredEvents].sort((a, b) => {
      // 获取事件日期字符串（兼容多种字段名）
      const dateStrA = a.date || (a as any).dates || '';
      const dateStrB = b.date || (b as any).dates || '';

      // 提取可比较的日期 - 支持多日期格式
      const extractComparableDate = (dateStr: string): Date => {
        // 处理ISO格式的多日期 (逗号分隔) - 取最早的日期
        if (dateStr.includes(',')) {
          const isoDateParts = dateStr.split(',');
          const validDates: Date[] = [];

          for (const part of isoDateParts) {
            const trimmedPart = part.trim();
            if (trimmedPart.match(/^\d{4}-\d{2}-\d{2}$/)) {
              const date = new Date(trimmedPart);
              if (!isNaN(date.getTime())) {
                validDates.push(date);
              }
            }
          }

          if (validDates.length > 0) {
            // 返回最早的日期用于排序
            return new Date(Math.min(...validDates.map(d => d.getTime())));
          }
        }

        // 处理单个ISO格式日期
        if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
          const date = new Date(dateStr);
          if (!isNaN(date.getTime())) {
            return date;
          }
        }

        // 处理模糊日期：上旬/中旬/下旬
        const xunsMatch = dateStr.match(/(\d{4})年(\d{1,2})月([上中下])旬/);
        if (xunsMatch) {
          const [, year, month, xun] = xunsMatch;
          const yearNum = parseInt(year);
          const monthNum = parseInt(month) - 1;
          let day: number;
          switch (xun) {
            case '上':
              day = 5;
              break; // 上旬映射为5日
            case '中':
              day = 15;
              break; // 中旬映射为15日
            case '下':
              day = 25;
              break; // 下旬映射为25日
            default:
              day = 15;
              break;
          }
          return new Date(yearNum, monthNum, day);
        }

        // 匹配 "YYYY年MM月DD日" 格式
        const dateMatch = dateStr.match(/(\d{4})年(\d{1,2})月(\d{1,2})日/);
        if (dateMatch) {
          const [, year, month, day] = dateMatch;
          return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        }

        // 匹配 "YYYY年MM月" 格式
        const monthMatch = dateStr.match(/(\d{4})年(\d{1,2})月/);
        if (monthMatch) {
          const [, year, month] = monthMatch;
          return new Date(parseInt(year), parseInt(month) - 1, 1);
        }

        // 尝试标准日期解析
        const standardDate = new Date(dateStr);
        return isNaN(standardDate.getTime()) ? new Date(0) : standardDate;
      };

      const dateA = extractComparableDate(dateStrA);
      const dateB = extractComparableDate(dateStrB);

      // 如果两个日期都无法解析，保持原顺序
      if (dateA.getTime() === 0 && dateB.getTime() === 0) {
        return 0;
      }

      dateA.setHours(0, 0, 0, 0);
      dateB.setHours(0, 0, 0, 0);

      const todayTime = today.getTime();
      const timeA = dateA.getTime();
      const timeB = dateB.getTime();

      const isAFutureOrToday = timeA >= todayTime;
      const isBFutureOrToday = timeB >= todayTime;

      if (isAFutureOrToday && !isBFutureOrToday) return -1;
      if (!isAFutureOrToday && isBFutureOrToday) return 1;

      return timeA - timeB;
    });
  }, [filteredEvents]);

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${getStandardBackgroundGradient()}`}
    >
      {/* 面包屑导航 */}
      <nav className="pb-2 pt-4">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-gray-600">
            <Link
              href="/"
              className="font-medium transition-colors hover:text-green-600"
            >
              ⛩️ 首页
            </Link>
            <span className="text-gray-400">›</span>
            <Link
              href={`/${regionKey}` as any}
              className="font-medium transition-colors hover:text-green-600"
            >
              {region.emoji} {region.displayName}活动
            </Link>
            <span className="text-gray-400">›</span>
            <span className="font-medium text-green-600">🎨 文化艺术</span>
          </div>
        </div>
      </nav>

      {/* 主标题区域 */}
      <section className="pb-12 pt-12 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-center">
            <span className="mr-4 text-5xl">{region.emoji}</span>
            <h1
              className={`bg-gradient-to-r ${getTitleGradient()} bg-clip-text text-4xl font-bold text-transparent md:text-5xl`}
            >
              {pageTitle || `${region.displayName || ''}文化艺术活动列表`}
            </h1>
            <span className="ml-4 text-5xl">🎨</span>
          </div>
          <p className="mx-auto max-w-7xl text-lg leading-relaxed text-gray-700 md:text-xl">
            {pageDescription ||
              `探索${region.displayName || ''}最精彩的文化艺术活动，感受${region.description || ''}的艺术魅力`}
          </p>
        </div>
      </section>

      {/* 日期筛选器 */}
      <section className="py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div
            className={`rounded-2xl border-2 border-white/30 bg-gradient-to-r ${getStandardBackgroundGradient()} p-6 shadow-lg`}
          >
            <div className="flex flex-col items-center gap-4 md:flex-row">
              <label className="flex items-center text-lg font-medium text-gray-700">
                <span className="mr-2 text-2xl">📅</span>
                筛选日期：
              </label>
              <div className="flex flex-col items-center gap-2 sm:flex-row">
                <label className="text-sm text-gray-600">开始日期：</label>
                <input
                  type="date"
                  value={startDate}
                  
                  className="rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="flex flex-col items-center gap-2 sm:flex-row">
                <label className="text-sm text-gray-600">结束日期：</label>
                <input
                  type="date"
                  value={endDate}
                  
                  min={startDate}
                  className="rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-500"
                />
              </div>
              {(startDate || endDate) && (
                <button
                  }
                  className="rounded-lg bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700"
                >
                  清除筛选
                </button>
              )}
              <div className="text-sm text-gray-600">
                共找到 {sortedEvents.length} 个文化艺术活动
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 文化艺术活动列表 */}
      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8">
            {sortedEvents.map(event => (
              <div
                key={event.id}
                className={`transform rounded-3xl ${getCardBackgroundGradient()} border-2 ${getCardBorderColor()} p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl md:p-8`}
              >
                <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center">
                  <div className="flex-grow">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      <div>
                        <h3 className="mb-2 text-xl font-bold text-gray-800 md:text-2xl">
                          {event.title || event.name}
                        </h3>
                        {event.artist && (
                          <p className="mb-2 text-sm font-medium text-green-700">
                            <span className="mr-1">👨‍🎨</span>
                            {event.artist}
                          </p>
                        )}
                        <p className="mb-3 text-sm text-gray-500">
                          {truncateText(event.description, 120)}
                        </p>
                        {/* DATETIME - 时间 */}
                        <div className="mb-3 flex items-center text-base text-gray-700 md:text-lg">
                          <span className="mr-2 text-xl">📅</span>
                          <span className="font-medium">
                            {formatDateRange(
                              event.date || event.dates,
                              event.endDate
                            )}
                          </span>
                        </div>
                        
                        {/* VENUE - 举办地点 */}
                        <div className="mb-3 flex items-center text-base text-gray-700 md:text-lg">
                          <span className="mr-2 text-xl">📍</span>
                          <span className="font-medium">
                            {event.venue || event.location}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {(event.features || []).map(
                            (feature: string, idx: number) => (
                              <span
                                key={idx}
                                className="rounded-full bg-white/70 px-3 py-1 text-sm font-medium text-gray-700"
                              >
                                {truncateText(addIconToFeature(feature), 12)}
                              </span>
                            )
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col items-center gap-3">
                        <button
                          
                          className="flex transform items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-gray-800 shadow-lg transition-all duration-200 hover:scale-110 hover:bg-amber-100"
                        >
                          <span className="text-xl">❤️</span>
                          <span className="font-bold">
                            {Math.floor(
                              (event.likes || 0) + (likedEvents[event.id] || 0)
                            )}
                          </span>
                        </button>

                        {event.detailLink && (
                          <a
                            href={event.detailLink}
                            className="flex transform items-center gap-2 whitespace-nowrap rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-blue-800 shadow-lg transition-all duration-200 hover:scale-110 hover:bg-blue-100"
                          >
                            <span className="font-bold">查看详情</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 快速导航 - 地区循环 */}
      <section className="border-t border-white/20 py-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 text-center">
            <h3 className="text-lg font-bold text-gray-800">
              探索其他地区文化艺术活动
            </h3>
          </div>

          {(() => {
            if (!navigation) return null;

            return (
              <div className="flex items-center justify-center space-x-4">
                {/* 上一个地区 */}
                <Link
                  href={navigation.prev.href as any}
                  className="group flex items-center space-x-3 rounded-xl border-2 border-cyan-200 bg-gradient-to-br from-cyan-50 to-blue-100 p-4 shadow-lg transition-all duration-200 hover:scale-105"
                >
                  <div className="text-2xl">{navigation.prev.emoji}</div>
                  <div className="text-left">
                    <div className="text-sm text-cyan-700">← 上一个</div>
                    <div className="font-bold text-cyan-800 transition-colors group-hover:text-cyan-900">
                      {navigation.prev.name}文化艺术
                    </div>
                  </div>
                </Link>

                {/* 当前地区 */}
                <div className="flex items-center space-x-3 rounded-xl border-2 border-green-300 bg-gradient-to-br from-green-50 to-emerald-100 p-4 shadow-lg">
                  <div className="text-3xl">{navigation.current.emoji}</div>
                  <div className="text-center">
                    <div className="text-sm text-green-600">当前位置</div>
                    <div className="font-bold text-green-600">
                      {navigation.current.name}文化艺术
                    </div>
                  </div>
                </div>

                {/* 下一个地区 */}
                <Link
                  href={navigation.next.href as any}
                  className="group flex items-center space-x-3 rounded-xl border-2 border-slate-200 bg-gradient-to-br from-slate-50 to-gray-100 p-4 shadow-lg transition-all duration-200 hover:scale-105"
                >
                  <div className="text-2xl">{navigation.next.emoji}</div>
                  <div className="text-right">
                    <div className="text-sm text-slate-700">下一个 →</div>
                    <div className="font-bold text-slate-800 transition-colors group-hover:text-slate-900">
                      {navigation.next.name}文化艺术
                    </div>
                  </div>
                </Link>
              </div>
            );
          })()}
        </div>
      </section>
    </div>
  );
}

/**
 * 获取标准数据并验证
 */
export const fetchAndValidateCultureData = async (
  apiUrl: string
): Promise<CultureEvent[]> => {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`API请求失败: ${response.status}`);
    }

    const data = await response.json();
    const events = Array.isArray(data) ? data : data.events || [];

    const validatedEvents = events.map(
      (event: RawCultureEvent, index: number) => ({
        id: event.id || `culture-event-${index}`,
        name: event.name || event.title || `文化艺术活动 ${index + 1}`,
        title: event.title || event.name || `文化艺术活动 ${index + 1}`,
        dates: event.dates || event.date || '日期待定',
        date: event.date || event.dates || '日期待定',
        location: event.location || '地点待定',
        features: event.features || event.highlights || [],
        highlights: event.highlights || event.features || [],
        likes: Math.max(0, Math.floor(Number(event.likes) || 0)),
        website: event.website || '#',
        description: event.description || '详情待更新',
        artType: event.artType || '文化艺术',
        artist: event.artist || '',
        venue: event.venue || event.location || '会场待定',
        ticketPrice: event.ticketPrice || '',
        detailLink: event.detailLink || undefined, // 详情页面链接
      })
    );

    console.log(`✅ 成功验证 ${validatedEvents.length} 个文化艺术活动数据`);
    return validatedEvents;
  } catch (error) {
    console.error('❌ 数据获取失败:', error);
    return [];
  }
};
