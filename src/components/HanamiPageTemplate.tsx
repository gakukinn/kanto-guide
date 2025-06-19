/**
 * 花见会页面通用模板 - PROFESSIONAL LEVEL
 * @template 第三层花见会页面通用模板
 * @scalability 支持关东全地区复用
 * @features 日期筛选、点赞系统、响应式设计、时间排序
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
 * - 背景渐变：地区主色调 + 活动辅助色调
 * - 示例：东京花见 = 红色系(地区) + 粉色系(活动) = from-red-100 to-pink-200
 * - 示例：埼玉花见 = 橙色系(地区) + 粉色系(活动) = from-orange-100 to-pink-200
 * - 示例：千叶花见 = 蓝色系(地区) + 粉色系(活动) = from-sky-100 to-pink-200
 *
 * 📋 网站内容显示规则（CONTENT_DISPLAY_RULES）:
 * ✅ 允许显示：简体汉字、繁体汉字、日文汉字
 * ✅ 允许显示：与地名相连的假名（如：新宿、渋谷等地名中的假名）
 * ❌ 禁止显示：独立的日文假名（的的、）
 * ❌ 禁止显示：非地名的假名文字
 * 🔧 AI操作要求：修改数据时必须将假名转换为汉字，保持内容准确性
 * 📝 示例：了祭 → 御魂祭、祭典 → 祭、 → 酸浆
 *
 * ⚠️ 商业网站重要提醒：绝对不能编造任何信息，所有内容必须基于真实可靠的数据源！
 *
 * 📋 数据质量保证规则（DATA_QUALITY_RULES）:
 * ✅ 日期必须包含年份：2025年4月15日 ✓ | 4月15日 ❌
 * ✅ 必填字段检查：id, name, date, location必须完整
 * ✅ 自动数据修复：缺少年份时自动添加当前年份
 * ✅ 默认值填充：缺少的japaneseName、englishName等字段自动填充
 * ⚠️ AI操作规范：制作API数据时务必包含完整年份信息
 * 🔧 模板保护：模板会自动检查和修复数据质量问题
 */
'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

// 标准配色规则定义
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
    matsuri: {
      from: 'red-50',
      to: 'red-100',
      primary: 'red-600',
      secondary: 'red-500',
    }, // 传统祭典：红色系
    hanami: {
      from: 'pink-50',
      to: 'pink-100',
      primary: 'pink-600',
      secondary: 'pink-500',
    }, // 花见会：粉色系
    hanabi: {
      from: 'blue-50',
      to: 'blue-100',
      primary: 'blue-600',
      secondary: 'blue-500',
    }, // 花火大会：蓝色系
    culture: {
      from: 'green-50',
      to: 'green-100',
      primary: 'green-600',
      secondary: 'green-500',
    }, // 文化艺术：绿色系
    momiji: {
      from: 'orange-50',
      to: 'orange-100',
      primary: 'orange-600',
      secondary: 'orange-500',
    }, // 红叶狩：橙色系
    illumination: {
      from: 'purple-50',
      to: 'purple-100',
      primary: 'purple-600',
      secondary: 'purple-500',
    }, // 灯光秀：紫色系
  },

  // 生成标准配色的函数
  generateBackgroundGradient: (
    regionKey: string,
    activityKey: string = 'hanami'
  ) => {
    const regionColor =
      COLOR_SYSTEM.REGION_COLORS[
        regionKey as keyof typeof COLOR_SYSTEM.REGION_COLORS
      ] || COLOR_SYSTEM.REGION_COLORS.tokyo;
    const activityColor =
      COLOR_SYSTEM.ACTIVITY_COLORS[
        activityKey as keyof typeof COLOR_SYSTEM.ACTIVITY_COLORS
      ] || COLOR_SYSTEM.ACTIVITY_COLORS.hanami;

    // 地区色为主，活动色为辅，创建渐变
    return `from-${regionColor.from} to-${activityColor.to}`;
  },

  // 生成标题颜色渐变的函数（地区色+活动色组合）
  generateTitleGradient: (
    regionKey: string,
    activityKey: string = 'hanami'
  ) => {
    const regionColor =
      COLOR_SYSTEM.REGION_COLORS[
        regionKey as keyof typeof COLOR_SYSTEM.REGION_COLORS
      ] || COLOR_SYSTEM.REGION_COLORS.tokyo;
    const activityColor =
      COLOR_SYSTEM.ACTIVITY_COLORS[
        activityKey as keyof typeof COLOR_SYSTEM.ACTIVITY_COLORS
      ] || COLOR_SYSTEM.ACTIVITY_COLORS.hanami;

    // 地区主色 → 地区辅色 → 活动主色，创建三色渐变
    return `from-${regionColor.primary} via-${regionColor.secondary} to-${activityColor.primary}`;
  },
};

// ==================== 类型定义 ====================

// 花见会事件数据接口 - 支持双字段格式（原始格式 + 标准化数字）
interface HanamiEvent {
  id: string;
  title?: string; // 可选，因为API使用name
  name?: string; // API实际字段
  englishName?: string; // 英文名称

  // 内部参考字段（日文源数据）
  _sourceData?: {
    japaneseName: string;
    japaneseDescription?: string;
  };
  date?: string; // 模板期望字段
  dates?: string; // API实际字段
  endDate?: string;
  location: string;
  category?: string;
  highlights?: string[]; // 可选，因为API使用features
  features?: string[]; // API实际字段
  likes: number;
  website?: string; // 改为可选，因为不再显示官网链接
  description: string;
  // 花见会特有字段 - 双字段格式支持
  viewingSeason?: string; // 观赏季节（如"3月下旬～4月上旬"）
  peakTime?: string; // 最佳观赏时间
  expectedVisitors?: string | number; // 原始格式（如"约40万人"）或数字
  expectedVisitorsNum?: number | null; // 标准化数字（如400000），null表示未公布
  venue?: string; // 会场名称
  detailLink?: string; // 详情页面链接
  sakuraVariety?: string; // 樱花品种
  wantToVisit?: number; // 想去人数
  haveVisited?: number; // 去过人数
  prefecture?: string; // 所属县
  rank?: number; // 排名
}

interface RegionConfig {
  name: string;
  displayName: string;
  emoji: string;
  gradientColors?: string; // 可选，如果不提供将自动生成
  description: string;
  navigationLinks: {
    prev: { name: string; url: string; emoji: string };
    next: { name: string; url: string; emoji: string };
    current: { name: string; url: string };
  };
}

interface HanamiPageTemplateProps {
  region: RegionConfig;
  events: HanamiEvent[];
  pageTitle?: string;
  pageDescription?: string;
  // 新增：自动配色参数
  regionKey?: string; // 地区键（tokyo, saitama等）
  activityKey?: string; // 活动键（hanami）
}

export default function HanamiPageTemplate({
  region,
  events,
  pageTitle,
  pageDescription,
  regionKey = 'tokyo',
  activityKey = 'hanami',
}: HanamiPageTemplateProps) {
  // ==================== 状态管理 ====================
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [likedEvents, setLikedEvents] = useState<Record<string, number>>({});

  // ==================== 数据验证和修复 ====================

  const validateAndFixEvents = (events: HanamiEvent[]): HanamiEvent[] => {
    const currentYear = new Date().getFullYear();

    return events.map((event, index) => {
      // 修复必填字段
      const fixedEvent: HanamiEvent = {
        ...event,
        id: event.id || `hanami-${index}`,
        name: event.name || event.title || `花见活动 ${index + 1}`,
        title: event.title || event.name || `花见活动 ${index + 1}`,
        location: event.location || '关东地区',
        description: event.description || '体验美丽的樱花盛开景色。',
        likes: typeof event.likes === 'number' ? event.likes : 0,
        wantToVisit:
          typeof event.wantToVisit === 'number' ? event.wantToVisit : 0,
        haveVisited:
          typeof event.haveVisited === 'number' ? event.haveVisited : 0,
      };

      // 修复日期字段 - 确保包含年份
      const dateField = event.date || event.dates || '';
      if (dateField && !dateField.includes(`${currentYear}`)) {
        // 如果日期不包含年份，添加当前年份
        if (dateField.match(/\d+月/)) {
          fixedEvent.date = `${currentYear}年${dateField}`;
          fixedEvent.dates = `${currentYear}年${dateField}`;
        } else {
          fixedEvent.date = dateField;
          fixedEvent.dates = dateField;
        }
      } else {
        fixedEvent.date = dateField;
        fixedEvent.dates = dateField;
      }

      // 修复观赏季节字段
      if (!fixedEvent.viewingSeason && dateField) {
        // 从日期字段提取观赏季节
        const seasonMatch = dateField.match(
          /(\d+月[上中下旬]*[～〜~-]*\d*月*[上中下旬]*)/
        );
        if (seasonMatch) {
          fixedEvent.viewingSeason = seasonMatch[1];
        }
      }

      // 填充默认值
      fixedEvent.category = fixedEvent.category || '花见会';
      fixedEvent.highlights = fixedEvent.highlights ||
        fixedEvent.features || ['🌸 樱花观赏'];
      fixedEvent.features = fixedEvent.features ||
        fixedEvent.highlights || ['🌸 樱花观赏'];

      return fixedEvent;
    });
  };

  const validatedEvents = useMemo(() => {
    return validateAndFixEvents(events);
  }, [events]);

  // ==================== 日期筛选逻辑 ====================

  const filteredEvents = useMemo(() => {
    if (!startDate && !endDate) return validatedEvents;

    return validatedEvents.filter(event => {
      const eventDate = event.peakTime || event.date || event.dates || '';
      if (!eventDate) return false;

      // 解析事件日期（支持多种格式）
      const eventDateObj = parseViewingSeasonToDate(eventDate);
      if (!eventDateObj) return false;

      const startDateObj = startDate ? new Date(startDate) : null;
      const endDateObj = endDate ? new Date(endDate) : null;

      if (startDateObj && eventDateObj < startDateObj) return false;
      if (endDateObj && eventDateObj > endDateObj) return false;

      return true;
    });
  }, [validatedEvents, startDate, endDate]);

  // ==================== 配色系统 ====================

  const getStandardBackgroundGradient = () => {
    return COLOR_SYSTEM.generateBackgroundGradient(regionKey, activityKey);
  };

  const getTitleGradient = () => {
    return COLOR_SYSTEM.generateTitleGradient(regionKey, activityKey);
  };

  // ==================== 导航系统 ====================

  const getRegionNavigation = () => {
    // 关东地区循环导航顺序
    const regionOrder = [
      { key: 'tokyo', name: '东京都', emoji: '🗼' },
      { key: 'saitama', name: '埼玉县', emoji: '🌸' },
      { key: 'chiba', name: '千叶县', emoji: '🌊' },
      { key: 'kanagawa', name: '神奈川县', emoji: '⛩️' },
      { key: 'kitakanto', name: '北关东', emoji: '🏔️' },
      { key: 'koshinetsu', name: '甲信越', emoji: '🗻' },
    ];

    const currentIndex = regionOrder.findIndex(r => r.key === regionKey);
    if (currentIndex === -1) {
      console.warn(`未找到地区键: ${regionKey}`);
      return null;
    }

    const prevIndex =
      (currentIndex - 1 + regionOrder.length) % regionOrder.length;
    const nextIndex = (currentIndex + 1) % regionOrder.length;

    return {
      prev: {
        name: regionOrder[prevIndex].name,
        emoji: regionOrder[prevIndex].emoji,
        href: `/${regionOrder[prevIndex].key}/hanami`,
      },
      current: {
        name: regionOrder[currentIndex].name,
        emoji: regionOrder[currentIndex].emoji,
        href: `/${regionOrder[currentIndex].key}/hanami`,
      },
      next: {
        name: regionOrder[nextIndex].name,
        emoji: regionOrder[nextIndex].emoji,
        href: `/${regionOrder[nextIndex].key}/hanami`,
      },
    };
  };

  // ==================== 工具函数 ====================

  const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const truncateHighlight = (highlight: string): string => {
    return truncateText(highlight, 20);
  };

  const truncateDescription = (description: string): string => {
    return truncateText(description, 100);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';

    // 如果已经是中文格式，直接返回
    if (dateString.includes('年') || dateString.includes('月')) {
      return dateString;
    }

    // 尝试解析并格式化日期
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;

      return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
    } catch {
      return dateString;
    }
  };

  const formatDateRange = (eventDateStr: string, endDate?: string) => {
    if (!eventDateStr) return '';

    // 如果已经包含范围标识符，直接返回
    if (
      eventDateStr.includes('～') ||
      eventDateStr.includes('〜') ||
      eventDateStr.includes('-')
    ) {
      return eventDateStr;
    }

    const formattedStart = formatDate(eventDateStr);

    if (endDate) {
      const formattedEnd = formatDate(endDate);
      return `${formattedStart} ～ ${formattedEnd}`;
    }

    return formattedStart;
  };

  const handleLike = (eventId: string) => {
    setLikedEvents(prev => ({
      ...prev,
      [eventId]: (prev[eventId] || 0) + 1,
    }));
  };

  const parseViewingSeasonToDate = (viewingSeason: string): Date => {
    const currentYear = new Date().getFullYear();

    // 默认返回当前年份4月1日（樱花季的典型开始时间）
    let year = currentYear;

    // 提取年份
    const yearMatch = viewingSeason.match(/(\d{4})年/);
    if (yearMatch) {
      year = parseInt(yearMatch[1]);
    }

    // 提取开始时间
    const timeSegments = viewingSeason.split(/[～〜~-]/);
    const startTimeStr = timeSegments[0].trim();

    return parseTimeSegment(startTimeStr, year);
  };

  const parseTimeSegment = (
    timeStr: string,
    year: number = new Date().getFullYear()
  ): Date => {
    // 提取月份
    const monthMatch = timeStr.match(/(\d{1,2})月/);
    if (!monthMatch) return new Date(year, 3, 1); // 默认4月1日
    const month = parseInt(monthMatch[1]);

    // 处理上中下旬
    let day = 15; // 默认中旬
    if (timeStr.includes('上旬')) {
      day = 5;
    } else if (timeStr.includes('中旬')) {
      day = 15;
    } else if (timeStr.includes('下旬')) {
      day = 25;
    } else {
      // 提取具体日期
      const dayMatch = timeStr.match(/(\d{1,2})日/);
      if (dayMatch) {
        day = parseInt(dayMatch[1]);
      }
    }

    return new Date(year, month - 1, day);
  };

  // ==================== 排序后的事件列表 ====================

  const sortedEvents = useMemo(() => {
    return [...filteredEvents].sort((a, b) => {
      // 优先使用peakTime（即观赏最佳时间），其次使用date/dates
      const viewingSeasonA =
        a.peakTime || a.viewingSeason || a.date || a.dates || '';
      const viewingSeasonB =
        b.peakTime || b.viewingSeason || b.date || b.dates || '';

      const dateA = parseViewingSeasonToDate(viewingSeasonA);
      const dateB = parseViewingSeasonToDate(viewingSeasonB);

      return dateA.getTime() - dateB.getTime();
    });
  }, [filteredEvents]);

  // ==================== 渲染组件 ====================

  const navigation = getRegionNavigation();

  // ==================== useEffect: 数据加载记录 ====================
  useEffect(() => {
    console.log(`🌸 花见会页面模板加载完成`);
    console.log(`📊 地区: ${regionKey}, 活动类型: ${activityKey}`);
    console.log(`📋 事件数量: ${validatedEvents.length}`);
    console.log(`🎨 配色: ${getStandardBackgroundGradient()}`);

    // 调试：显示排序结果
    if (sortedEvents.length > 0) {
      console.log(`📅 时间排序结果 (按观赏季节):`);
      sortedEvents.forEach((event, index) => {
        const viewingSeason =
          event.peakTime ||
          event.viewingSeason ||
          event.date ||
          event.dates ||
          '';
        const parsedDate = parseViewingSeasonToDate(viewingSeason);
        console.log(
          `${index + 1}. ${event.name}: ${viewingSeason} → ${parsedDate.toISOString().split('T')[0]}`
        );
      });
    }

    // 调试：显示筛选器状态
    if (startDate || endDate) {
      console.log(`🔍 日期筛选器状态:`);
      console.log(`开始日期: ${startDate || '未设置'}`);
      console.log(`结束日期: ${endDate || '未设置'}`);
      console.log(
        `筛选后事件数量: ${filteredEvents.length}/${validatedEvents.length}`
      );
    }
  }, [regionKey, activityKey, validatedEvents.length, sortedEvents]);

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
              className="font-medium transition-colors hover:text-pink-600"
            >
              🏠 首页
            </Link>
            <span className="text-gray-400">›</span>
            <a
              href={region.navigationLinks.current.url}
              className="font-medium transition-colors hover:text-pink-600"
            >
              {region.emoji} {region.displayName}活动
            </a>
            <span className="text-gray-400">›</span>
            <span className="font-medium text-pink-600">🌸 花见会</span>
          </div>
        </div>
      </nav>

      {/* 主标题区域 */}
      <section className="pb-12 pt-12 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-center">
            <span className="mr-4 text-5xl">{region.emoji}</span>
            <h1
              className={`bg-gradient-to-r text-4xl font-bold md:text-5xl ${getTitleGradient()} bg-clip-text text-transparent`}
            >
              {pageTitle || `${region.displayName}花见会`}
            </h1>
            <span className="ml-4 text-5xl">🌸</span>
          </div>

          <p className="mx-auto max-w-7xl text-lg leading-relaxed text-gray-700 md:text-xl">
            {pageDescription ||
              `体验${region.displayName}最美的樱花盛开景色，感受${region.description}`}
          </p>
        </div>
      </section>

      {/* 日期筛选器 - 与狩枫模板保持一致 */}
      <section className="py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div
            className={`bg-gradient-to-r ${getStandardBackgroundGradient()} rounded-2xl border-2 border-white/30 p-6 shadow-lg`}
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
                  onChange={e => setStartDate(e.target.value)}
                  className="rounded-lg border border-gray-300 px-4 py-2 focus:border-pink-500 focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div className="flex flex-col items-center gap-2 sm:flex-row">
                <label className="text-sm text-gray-600">结束日期：</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={e => setEndDate(e.target.value)}
                  min={startDate}
                  className="rounded-lg border border-gray-300 px-4 py-2 focus:border-pink-500 focus:ring-2 focus:ring-pink-500"
                />
              </div>
              {(startDate || endDate) && (
                <button
                  onClick={() => {
                    setStartDate('');
                    setEndDate('');
                  }}
                  className="rounded-lg bg-pink-600 px-4 py-2 text-white transition-colors hover:bg-pink-700"
                >
                  清除筛选
                </button>
              )}
              <div className="text-sm text-gray-600">
                共找到 {sortedEvents.length} 个花见景点
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 花见景点列表 - 与狩枫模板保持一致的单列大卡片布局 */}
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:gap-8">
            {sortedEvents.map(event => (
              <div
                key={event.id}
                className={`bg-gradient-to-r ${getStandardBackgroundGradient()} transform rounded-3xl border-2 border-white/40 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl md:p-8`}
              >
                <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center">
                  <div className="flex-grow">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      <div>
                        <h3 className="mb-2 text-xl font-bold text-gray-800 md:text-2xl">
                          {event.title || event.name}
                        </h3>
                        <p className="mb-3 text-sm text-gray-500">
                          {truncateDescription(event.description)}
                        </p>
                        <div className="mb-3 flex flex-wrap gap-4 text-sm text-gray-700 md:text-base">
                          <span className="flex items-center">
                            <span className="mr-1 text-lg">📅</span>
                            {event.viewingSeason ||
                              formatDateRange(
                                event.date || event.dates || '',
                                event.endDate
                              )}
                          </span>
                          <span className="flex items-center">
                            <span className="mr-1 text-lg">📍</span>
                            {event.location}
                          </span>
                          {event.sakuraVariety && (
                            <span className="flex items-center">
                              <span className="mr-1 text-lg">🌸</span>
                              {event.sakuraVariety}
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {(event.highlights || event.features || []).map(
                            (feature: string, idx: number) => (
                              <span
                                key={idx}
                                className="rounded-full bg-white/70 px-3 py-1 text-sm font-medium text-gray-700"
                              >
                                {truncateHighlight(feature)}
                              </span>
                            )
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col items-center gap-3">
                        <button
                          onClick={() => handleLike(event.id)}
                          className="flex transform items-center gap-2 rounded-full border border-pink-200 bg-pink-50 px-4 py-2 text-gray-800 shadow-lg transition-all duration-200 hover:scale-110 hover:bg-pink-100"
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
                            className="flex transform items-center gap-2 whitespace-nowrap rounded-full border border-pink-200 bg-pink-50 px-4 py-2 text-pink-800 shadow-lg transition-all duration-200 hover:scale-110 hover:bg-pink-100"
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
              探索其他地区花见会
            </h3>
          </div>

          {(() => {
            if (!navigation) return null;

            return (
              <div className="flex items-center justify-center space-x-4">
                {/* 上一个地区 */}
                <a
                  href={navigation.prev.href}
                  className="group flex items-center space-x-3 rounded-xl border-2 border-pink-200 bg-gradient-to-br from-pink-50 to-red-100 p-4 shadow-lg transition-all duration-200 hover:scale-105"
                >
                  <div className="text-2xl">{navigation.prev.emoji}</div>
                  <div className="text-left">
                    <div className="text-sm text-pink-700">← 上一个</div>
                    <div className="font-bold text-pink-800 transition-colors group-hover:text-pink-900">
                      {navigation.prev.name}花见
                    </div>
                  </div>
                </a>

                {/* 当前地区 */}
                <div className="flex items-center space-x-3 rounded-xl border-2 border-pink-300 bg-gradient-to-br from-pink-50 to-pink-100 p-4 shadow-lg">
                  <div className="text-3xl">{navigation.current.emoji}</div>
                  <div className="text-center">
                    <div className="text-sm text-pink-600">当前位置</div>
                    <div className="font-bold text-pink-600">
                      {navigation.current.name}花见
                    </div>
                  </div>
                </div>

                {/* 下一个地区 */}
                <a
                  href={navigation.next.href}
                  className="group flex items-center space-x-3 rounded-xl border-2 border-rose-200 bg-gradient-to-br from-rose-50 to-pink-100 p-4 shadow-lg transition-all duration-200 hover:scale-105"
                >
                  <div className="text-2xl">{navigation.next.emoji}</div>
                  <div className="text-right">
                    <div className="text-sm text-rose-700">下一个 →</div>
                    <div className="font-bold text-rose-800 transition-colors group-hover:text-rose-900">
                      {navigation.next.name}花见
                    </div>
                  </div>
                </a>
              </div>
            );
          })()}
        </div>
      </section>
    </div>
  );
}

// ==================== 数据验证导出功能 ====================

export const fetchAndValidateHanamiData = async (
  apiUrl: string
): Promise<HanamiEvent[]> => {
  try {
    console.log(`🔄 开始获取花见会数据: ${apiUrl}`);
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP错误: ${response.status}`);
    }

    const data = await response.json();
    console.log(`✅ 成功获取 ${data.length} 个花见会事件`);

    // 这里可以添加数据验证逻辑
    const validatedData = data.map((event: any, index: number) => ({
      id: event.id || `hanami-${index}`,
      title: event.title || event.name || `花见活动 ${index + 1}`,
      name: event.name || event.title || `花见活动 ${index + 1}`,
      date: event.date || event.dates || '2025年4月',
      dates: event.dates || event.date || '2025年4月上旬～下旬',
      location: event.location || '关东地区',
      highlights: event.highlights || event.features || ['🌸 樱花观赏'],
      features: event.features || event.highlights || ['🌸 樱花观赏'],
      likes: typeof event.likes === 'number' ? event.likes : 0,
      description: event.description || '体验美丽的樱花盛开景色。',
      category: event.category || '花见会',
      viewingSeason: event.viewingSeason || '',
      peakTime: event.peakTime || '',
      expectedVisitors: event.expectedVisitors || '',
      venue: event.venue || '',
      detailLink: event.detailLink || '',
      sakuraVariety: event.sakuraVariety || '',
      wantToVisit:
        typeof event.wantToVisit === 'number' ? event.wantToVisit : 0,
      haveVisited:
        typeof event.haveVisited === 'number' ? event.haveVisited : 0,
      prefecture: event.prefecture || '',
      rank: typeof event.rank === 'number' ? event.rank : 0,
    }));

    return validatedData;
  } catch (error) {
    console.error('❌ 获取花见会数据失败:', error);
    return [];
  }
};
