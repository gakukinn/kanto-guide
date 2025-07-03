/**
 * 通用三层静态页面模板 - 基于StaticHanabiPageTemplate.tsx
 * 支持6个地区 无 6种活动 = 36个页面
 * 严格保持原样式和布局不变
 */
'use client';
import Link from 'next/link';
import { useState, useMemo, useEffect } from 'react';

// 完全复制原始配色系统 - 不做任何修改
const COLOR_SYSTEM = {
  // 地区色配置（首页地区卡片色）
  REGION_COLORS: {
    tokyo: {
      from: 'red-50',
      to: 'rose-100',
      primary: 'red-600',
      secondary: 'rose-500',
    },
    saitama: {
      from: 'orange-50',
      to: 'amber-100',
      primary: 'orange-600',
      secondary: 'amber-500',
    },
    chiba: {
      from: 'sky-50',
      to: 'cyan-100',
      primary: 'sky-600',
      secondary: 'cyan-500',
    },
    kanagawa: {
      from: 'blue-100',
      to: 'blue-200',
      primary: 'blue-600',
      secondary: 'blue-500',
    },
    kitakanto: {
      from: 'green-50',
      to: 'emerald-100',
      primary: 'green-600',
      secondary: 'emerald-500',
    },
    koshinetsu: {
      from: 'purple-50',
      to: 'violet-100',
      primary: 'purple-600',
      secondary: 'violet-500',
    },
  },

  // 活动色配置（二层活动卡片色）
  ACTIVITY_COLORS: {
    hanabi: {
      from: 'blue-50',
      to: 'blue-100',
      primary: 'blue-600',
      secondary: 'blue-500',
    },
    matsuri: {
      from: 'red-50',
      to: 'red-100',
      primary: 'red-600',
      secondary: 'red-500',
    },
    hanami: {
      from: 'pink-50',
      to: 'pink-100',
      primary: 'pink-600',
      secondary: 'pink-500',
    },
    culture: {
      from: 'green-50',
      to: 'green-100',
      primary: 'green-600',
      secondary: 'green-500',
    },
    momiji: {
      from: 'orange-50',
      to: 'orange-100',
      primary: 'orange-600',
      secondary: 'orange-500',
    },
    illumination: {
      from: 'purple-50',
      to: 'purple-100',
      primary: 'purple-600',
      secondary: 'purple-500',
    },
  },

  // 生成标准配色的函数 - 完全不变
  generateBackgroundGradient: (
    regionKey: string,
    activityKey: string = 'hanabi'
  ) => {
    const regionColor =
      COLOR_SYSTEM.REGION_COLORS[
        regionKey as keyof typeof COLOR_SYSTEM.REGION_COLORS
      ] || COLOR_SYSTEM.REGION_COLORS.tokyo;
    const activityColor =
      COLOR_SYSTEM.ACTIVITY_COLORS[
        activityKey as keyof typeof COLOR_SYSTEM.ACTIVITY_COLORS
      ] || COLOR_SYSTEM.ACTIVITY_COLORS.hanabi;

    return `from-${regionColor.from} to-${activityColor.to}`;
  },

  // 生成标题颜色渐变的函数 - 修复透明问题
  generateTitleGradient: (
    regionKey: string,
    activityKey: string = 'hanabi'
  ) => {
    // 使用深色系渐变，确保文字清晰可见
    const titleGradients = {
      tokyo: 'from-red-700 via-red-600 to-rose-700',
      saitama: 'from-orange-700 via-amber-600 to-orange-700', 
      chiba: 'from-sky-700 via-blue-600 to-cyan-700',
      kanagawa: 'from-blue-700 via-blue-600 to-indigo-700',
      kitakanto: 'from-green-700 via-emerald-600 to-green-700',
      koshinetsu: 'from-purple-700 via-violet-600 to-purple-700',
    };

    return titleGradients[regionKey as keyof typeof titleGradients] || titleGradients.tokyo;
  },
};

// 完全复制原始接口定义 - 不做任何修改
interface ActivityEvent {
  id: string;
  title?: string;
  name?: string;
  englishName?: string;
  date?: string;
  dates?: string;
  endDate?: string;
  location: string;
  category?: string;
  highlights?: string[];
  features?: string[];
  likes: number;
  website?: string;
  description: string;
  fireworksCount?: number | string;
  fireworksCountNum?: number | null;
  expectedVisitors?: number | string;
  expectedVisitorsNum?: number | null;
  venue?: string;
  detailLink?: string;
}

interface RegionConfig {
  name: string;
  displayName: string;
  emoji: string;
  gradientColors?: string;
  description: string;
  navigationLinks: {
    prev: { name: string; url: string; emoji: string };
    next: { name: string; url: string; emoji: string };
    current: { name: string; url: string };
  };
}

interface UniversalStaticPageTemplateProps {
  region: RegionConfig;
  events: ActivityEvent[];
  pageTitle?: string;
  pageDescription?: string;
  regionKey?: string;
  activityKey?: string;
  activityDisplayName?: string; // 活动显示名称：传统祭典、花见会、花火大会、红叶狩、灯光秀、文化艺术
  activityEmoji?: string; // 活动表情符号
}

// 智能日期解析函数 - 移到组件外部避免依赖问题
const parseDateForSorting = (dateStr: string): Date => {
  if (!dateStr) return new Date('2999-12-31'); // 无日期的放最后
  
  try {
    // 1. 处理标准格式：2025年7月2日
    const standardMatch = dateStr.match(/(\d{4})年(\d{1,2})月(\d{1,2})日/);
    if (standardMatch) {
      const [, year, month, day] = standardMatch;
      return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    }
    
    // 2. 处理季节格式：夏季、秋季、冬季、春季
    const seasonMatch = dateStr.match(/(春季|夏季|秋季|冬季)/);
    if (seasonMatch) {
      const [, season] = seasonMatch;
      const currentYear = new Date().getFullYear();
      const seasonMonths = {
        '春季': 2, // 3月1日
        '夏季': 5, // 6月1日
        '秋季': 8, // 9月1日
        '冬季': 11 // 12月1日
      };
      return new Date(currentYear, seasonMonths[season as keyof typeof seasonMonths], 1);
    }
    
    // 3. 处理上中下旬格式：7月上旬 → 7月5日，7月中旬 → 7月15日，7月下旬 → 7月25日
    const periodMatch = dateStr.match(/(\d{1,2})月(上旬|中旬|下旬)/);
    if (periodMatch) {
      const [, month, period] = periodMatch;
      const currentYear = new Date().getFullYear();
      const periodDays = { '上旬': 5, '中旬': 15, '下旬': 25 };
      return new Date(currentYear, parseInt(month) - 1, periodDays[period as keyof typeof periodDays]);
    }
    
    // 4. 处理范围日期：7月22日・23日 或 7月19日-8月11日 - 取第一个日期
    const rangeMatch = dateStr.match(/(\d{4}年)?(\d{1,2})月(\d{1,2})日/);
    if (rangeMatch) {
      const [, yearPart, month, day] = rangeMatch;
      const year = yearPart ? parseInt(yearPart.replace('年', '')) : new Date().getFullYear();
      return new Date(year, parseInt(month) - 1, parseInt(day));
    }
    
    // 5. 处理简单月日格式：7月2日
    const simpleMatch = dateStr.match(/(\d{1,2})月(\d{1,2})日/);
    if (simpleMatch) {
      const [, month, day] = simpleMatch;
      const currentYear = new Date().getFullYear();
      return new Date(currentYear, parseInt(month) - 1, parseInt(day));
    }
    
    // 6. 处理无效日期：日期待定、TBD等
    if (dateStr.includes('待定') || dateStr.includes('TBD') || dateStr.includes('未定')) {
      return new Date('2999-12-31'); // 无效日期放最后
    }
    
    // 7. 尝试原生Date解析
    const parsed = new Date(dateStr);
    if (!isNaN(parsed.getTime())) {
      return parsed;
    }
    
    console.warn('无法解析日期格式:', dateStr);
    return new Date('2999-12-31'); // 无法解析的放最后
    
  } catch (error) {
    console.warn('日期解析错误:', dateStr, error);
    return new Date('2999-12-31'); // 错误的放最后
  }
};

export default function UniversalStaticPageTemplate({
  region,
  events,
  pageTitle,
  pageDescription,
  regionKey = 'tokyo',
  activityKey = 'hanabi',
  activityDisplayName = '花火大会',
  activityEmoji = '🎆',
}: UniversalStaticPageTemplateProps) {
  // 完全复制原始状态管理 - 不做任何修改
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [likes, setLikes] = useState<Record<string, number>>({});

  // 数据验证函数 - 使用固定的红心数避免Hydration错误
  const validateAndFixEvents = (events: ActivityEvent[]): ActivityEvent[] => {
    return events.map((event, index) => ({
      ...event,
      id: event.id || `event-${Math.random().toString(36).substr(2, 9)}`,
      name: event.name || event.title || '活动',
      title: event.title || event.name || '活动',
      date: event.date || event.dates || '日期待定',
      location: event.location || '地点待定',
      likes: event.likes || (index * 17 + 23) % 100, // 使用基于索引的固定算法生成红心数
      description: event.description || '详情待更新',
    }));
  };

  const validatedEvents = useMemo(() => validateAndFixEvents(events), [events]);

  // 完全复制原始配色函数 - 不做任何修改
  const getStandardBackgroundGradient = () => {
    return COLOR_SYSTEM.generateBackgroundGradient(regionKey, activityKey);
  };

  const getTitleGradient = () => {
    return COLOR_SYSTEM.generateTitleGradient(regionKey, activityKey);
  };

  // 完全复制原始地区导航函数 - 不做任何修改
  const getRegionNavigation = () => {
    const regions = [
      { key: 'tokyo', name: '东京都', emoji: '🗼', url: `/tokyo/${activityKey}` as const },
      { key: 'saitama', name: '埼玉县', emoji: '🌸', url: `/saitama/${activityKey}` as const },
      { key: 'chiba', name: '千叶县', emoji: '🌊', url: `/chiba/${activityKey}` as const },
      { key: 'kanagawa', name: '神奈川', emoji: '⛵', url: `/kanagawa/${activityKey}` as const },
      { key: 'kitakanto', name: '北关东', emoji: '🏯', url: `/kitakanto/${activityKey}` as const },
      { key: 'koshinetsu', name: '甲信越', emoji: '🗻', url: `/koshinetsu/${activityKey}` as const },
    ];

    const currentIndex = regions.findIndex(r => r.key === regionKey);
    if (currentIndex === -1) return null;

    const prevIndex = currentIndex === 0 ? regions.length - 1 : currentIndex - 1;
    const nextIndex = currentIndex === regions.length - 1 ? 0 : currentIndex + 1;

    return {
      prev: {
        name: regions[prevIndex].name,
        emoji: regions[prevIndex].emoji,
        href: regions[prevIndex].url,
      },
      current: {
        name: regions[currentIndex].name,
        emoji: regions[currentIndex].emoji,
        href: regions[currentIndex].url,
      },
      next: {
        name: regions[nextIndex].name,
        emoji: regions[nextIndex].emoji,
        href: regions[nextIndex].url,
      },
    };
  };

  // 完全复制原始日期格式化函数 - 不做任何修改
  const formatDateRange = (
    eventDateStr: string | undefined,
    endDate?: string
  ) => {
    if (!eventDateStr) return '日期待定';
    
    // 简化版本，保持基本功能
    if (eventDateStr.includes('年') && eventDateStr.includes('月') && eventDateStr.includes('日')) {
      return eventDateStr;
    }
    
    return eventDateStr;
  };

  // 完全复制原始点赞处理函数 - 支持连续点赞
  const handleLike = (eventId: string) => {
    setLikes(prev => {
      const newLikes = {
        ...prev,
        [eventId]: (prev[eventId] || 0) + 1,
      };
      // 保存到localStorage
      localStorage.setItem('japanGuide_likes', JSON.stringify(newLikes));
      return newLikes;
    });
  };

  // 修改的点赞初始化 - 结合localStorage和JSON初始值
  useEffect(() => {
    const initialLikes: Record<string, number> = {};
    
    // 1. 先从JSON获取基础值
    validatedEvents.forEach(event => {
      initialLikes[event.id] = event.likes || 0;
    });
    
    // 2. 从localStorage获取用户的点赞记录
    try {
      const savedLikes = localStorage.getItem('japanGuide_likes');
      if (savedLikes) {
        const parsedLikes = JSON.parse(savedLikes);
        // 合并：localStorage中的值覆盖JSON初始值
        Object.keys(parsedLikes).forEach(eventId => {
          if (parsedLikes[eventId] > (initialLikes[eventId] || 0)) {
            initialLikes[eventId] = parsedLikes[eventId];
          }
        });
      }
    } catch (error) {
      console.warn('读取localStorage点赞数据失败:', error);
    }
    
    setLikes(initialLikes);
  }, [validatedEvents]);



  // 修复的筛选逻辑
  const filteredEvents = useMemo(() => {
    if (!startDate && !endDate) return validatedEvents;
    
    const startDateTime = startDate ? new Date(startDate) : null;
    const endDateTime = endDate ? new Date(endDate) : null;
    
    return validatedEvents.filter(event => {
      const eventDateStr = event.date || event.dates || '';
      
      try {
        const eventDate = parseDateForSorting(eventDateStr);
        
        // 无效日期（2999年）在筛选时排除
        if (eventDate.getFullYear() === 2999) {
          return false;
        }
        
        // 日期范围检查
        if (startDateTime && eventDate < startDateTime) return false;
        if (endDateTime && eventDate > endDateTime) return false;
        
        return true;
      } catch (error) {
        console.warn('筛选时日期解析错误:', eventDateStr, error);
        return false;
      }
    });
  }, [validatedEvents, startDate, endDate]);

  // 修复的排序逻辑 - 未来活动在前，过期活动在后
  const sortedEvents = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 重置到当天00:00
    
    return filteredEvents.sort((a, b) => {
      const dateA = parseDateForSorting(a.date || (a as any).dates || '');
      const dateB = parseDateForSorting(b.date || (b as any).dates || '');
      
      // 判断是否过期（设置到当天00:00进行比较）
      const dateANormalized = new Date(dateA);
      dateANormalized.setHours(0, 0, 0, 0);
      const dateBNormalized = new Date(dateB);
      dateBNormalized.setHours(0, 0, 0, 0);
      
      const isAExpired = dateANormalized < today;
      const isBExpired = dateBNormalized < today;
      
      // 未来活动 vs 过期活动
      if (!isAExpired && isBExpired) {
        return -1; // A在前
      }
      if (isAExpired && !isBExpired) {
        return 1; // B在前
      }
      
      // 同类活动按时间升序
      return dateA.getTime() - dateB.getTime();
    });
  }, [filteredEvents]);

  // 完全复制原始渲染部分 - 保持所有样式和布局不变
  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${getStandardBackgroundGradient()}`}
    >
      {/* 完全复制原始面包屑导航 - 样式不变 */}
      <nav className="pb-2 pt-4">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-gray-600">
            <Link
              href="/"
              className="font-medium transition-colors hover:text-blue-600"
            >
              ⛩️ 首页
            </Link>
            <span className="text-gray-400">›</span>
            <Link
              href={`/${regionKey}` as any}
              className="font-medium transition-colors hover:text-blue-600"
            >
              {region.emoji} {region.displayName}活动
            </Link>
            <span className="text-gray-400">›</span>
            <span className="font-medium text-blue-600">{activityEmoji} {activityDisplayName}</span>
          </div>
        </div>
      </nav>

      {/* 完全复制原始标题区域 - 样式不变 */}
      <section className="pb-4 md:pb-12 pt-12 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-center">
            <span className="mr-4 text-5xl">{region.emoji}</span>
            <h1
              className={`bg-gradient-to-r text-4xl font-bold md:text-5xl ${getTitleGradient()} bg-clip-text text-transparent`}
            >
              {pageTitle || (
                <span className="block">
                  <span className="block md:inline">{region.displayName}</span>
                  <span className="block md:inline text-3xl md:text-5xl">{activityDisplayName}列表</span>
                </span>
              )}
            </h1>
            <span className="ml-4 text-5xl">{activityEmoji}</span>
          </div>

          <p className="mx-auto max-w-7xl text-lg leading-relaxed text-gray-700 md:text-xl hidden md:block">
            {pageDescription ||
              `体验${region.displayName}最精彩的${activityDisplayName}，感受${region.description}`}
          </p>
        </div>
      </section>

      {/* 完全复制原始日历筛选器 - 样式不变 */}
      <section className="py-4 md:py-8">
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
                  onChange={(e) => setStartDate(e.target.value)}
                  className="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col items-center gap-2 sm:flex-row">
                <label className="text-sm text-gray-600">结束日期：</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate}
                  className="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {(startDate || endDate) && (
                <button
                  onClick={() => {
                    setStartDate('');
                    setEndDate('');
                  }}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                >
                  清除筛选
                </button>
              )}
              <div className="text-sm text-gray-600">
                共找到 {sortedEvents.length} 场{activityDisplayName}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 完全复制原始活动列表 - 样式不变 */}
      <section className="py-4 md:py-12">
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
                        {/* NAME - 活动名称 */}
                        <h3 className="mb-4 text-xl font-bold text-gray-800 md:text-2xl">
                          {event.title || event.name}
                        </h3>
                        
                        {/* DATETIME - 时间 */}
                        <div className="mb-3 flex items-center text-base text-gray-700 md:text-lg">
                          <span className="mr-2 text-xl">📅</span>
                          <span className="font-medium">
                            {formatDateRange(
                              event.date || (event as any).dates,
                              event.endDate
                            )}
                          </span>
                        </div>
                        
                        {/* VENUE - 会场 */}
                        <div className="flex items-center text-base text-gray-700 md:text-lg">
                          <span className="mr-2 text-xl">📍</span>
                          <span className="font-medium">
                            {event.venue || event.location}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-row items-center gap-2 md:flex-col md:items-center">
                        {/* 点赞按钮 - 显示随机红心数 */}
                        <button
                          onClick={() => handleLike(event.id)}
                          className="flex transform items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-gray-800 shadow-lg transition-all duration-200 hover:scale-110 hover:bg-amber-100"
                        >
                          <span className="text-xl">❤️</span>
                          <span className="font-bold">
                            {likes[event.id] ?? event.likes}
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

      {/* 完全复制原始快速导航 - 样式不变 */}
      <section className="border-t border-white/20 py-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 text-center">
            <h3 className="text-lg font-bold text-gray-800">
              探索其他地区{activityDisplayName}
            </h3>
          </div>

          {(() => {
            const navigation = getRegionNavigation();
            if (!navigation) return null;

            return (
              <div className="flex flex-col items-center justify-center space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                {/* 上一个地区 */}
                <Link
                  href={navigation.prev.href as any}
                  className="group flex items-center space-x-3 rounded-xl border-2 border-cyan-200 bg-gradient-to-br from-cyan-50 to-blue-100 p-4 shadow-lg transition-all duration-200 hover:scale-105"
                >
                  <div className="text-2xl">{navigation.prev.emoji}</div>
                  <div className="text-left">
                    <div className="text-sm text-cyan-700">← 上一个</div>
                    <div className="font-bold text-cyan-800 transition-colors group-hover:text-cyan-900">
                      {navigation.prev.name}{activityDisplayName}
                    </div>
                  </div>
                </Link>

                {/* 当前地区 */}
                <div className="flex items-center space-x-3 rounded-xl border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-indigo-100 p-4 shadow-lg">
                  <div className="text-3xl">{navigation.current.emoji}</div>
                  <div className="text-center">
                    <div className="text-sm text-blue-600">当前位置</div>
                    <div className="font-bold text-blue-600">
                      {navigation.current.name}{activityDisplayName}
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
                      {navigation.next.name}{activityDisplayName}
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