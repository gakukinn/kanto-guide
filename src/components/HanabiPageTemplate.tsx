/**
 * 花火页面通用模板 - PROFESSIONAL LEVEL
 * @template 第三层花火页面通用模板
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
 * - 示例：东京花火 = 红色系(地区) + 蓝色系(活动) = from-red-100 to-blue-200
 * - 示例：埼玉花火 = 橙色系(地区) + 蓝色系(活动) = from-orange-100 to-blue-200
 * - 示例：千叶花火 = 蓝色系(地区) + 蓝色系(活动) = from-sky-100 to-blue-200
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
 * ✅ 日期必须包含年份：2025年7月26日 ✓ | 7月26日 ❌
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

    // 地区色为主，活动色为辅，创建渐变
    return `from-${regionColor.from} to-${activityColor.to}`;
  },

  // 生成标题颜色渐变的函数（地区色+活动色组合）
  generateTitleGradient: (
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

    // 地区主色 → 地区辅色 → 活动主色，创建三色渐变
    return `from-${regionColor.primary} via-${regionColor.secondary} to-${activityColor.primary}`;
  },
};

// ==================== 类型定义 ====================

// 花火事件数据接口 - 支持双字段格式（原始格式 + 标准化数字）
interface HanabiEvent {
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
  // 花火特有字段 - 双字段格式支持
  fireworksCount?: number | string; // 原始格式（如"1万発"）或数字
  fireworksCountNum?: number | null; // 标准化数字（如10000），null表示未公布
  expectedVisitors?: number | string; // 原始格式（如"約12万人"）或数字
  expectedVisitorsNum?: number | null; // 标准化数字（如120000），null表示未公布
  venue?: string; // 会场名称
  detailLink?: string; // 详情页面链接
}

// 地区配置接口 - 支持自动配色生成
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

// 模板Props接口 - 新增自动配色支持
interface HanabiPageTemplateProps {
  region: RegionConfig;
  events: HanabiEvent[];
  pageTitle?: string;
  pageDescription?: string;
  // 新增：自动配色参数
  regionKey?: string; // 地区键（tokyo, saitama等）
  activityKey?: string; // 活动键（hanabi）
}

export default function HanabiPageTemplate({
  region,
  events,
  pageTitle,
  pageDescription,
  regionKey = 'tokyo',
  activityKey = 'hanabi',
}: HanabiPageTemplateProps) {
  // ==================== 状态管理 ====================

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [likes, setLikes] = useState<Record<string, number>>({});

  // ==================== 数据验证和修复系统 ====================

  const validateAndFixEvents = (events: HanabiEvent[]): HanabiEvent[] => {
    console.log('🔍 开始花火数据验证和修复...');

    const fixedEvents = events.map((event, index) => {
      const fixed = { ...event };

      // 1. 智能字段映射 - 修复标题字段不匹配问题
      if (!fixed.title && !fixed.name) {
        console.warn(`⚠️ 花火事件 ${index} 缺少标题字段`);
        fixed.title = `未命名花火大会 ${index + 1}`;
      }

      // 2. 修复日期字段不匹配问题
      if (!fixed.date && !fixed.dates) {
        console.warn(`⚠️ 花火事件 ${index} 缺少日期字段`);
        fixed.date = '日期待定';
      }

      // 3. 修复年份缺失问题
      const dateStr = fixed.date || fixed.dates || '';
      if (
        dateStr &&
        !dateStr.includes('年') &&
        !dateStr.includes('2025') &&
        !dateStr.includes('2026')
      ) {
        const currentYear = new Date().getFullYear();
        if (dateStr.match(/\d{1,2}月\d{1,2}日/)) {
          fixed.date = `${currentYear}年${dateStr}`;
          console.log(`✅ 自动添加年份: ${fixed.date}`);
        }
      }

      // 4. 修复特色字段不匹配问题
      if (!fixed.highlights && fixed.features) {
        fixed.highlights = fixed.features;
      } else if (!fixed.highlights && !fixed.features) {
        fixed.highlights = [];
      }

      // 5. 修复红心数问题
      if (
        typeof fixed.likes !== 'number' ||
        isNaN(fixed.likes) ||
        fixed.likes < 0
      ) {
        console.warn(`⚠️ 花火事件 ${index} 红心数异常: ${fixed.likes}`);
        fixed.likes = Math.max(0, Math.floor(Number(fixed.likes) || 0));
      }

      // 6. 确保必填字段存在
      if (!fixed.location) fixed.location = '地点待定';
      if (!fixed.website) fixed.website = '#';
      if (!fixed.description) fixed.description = '详情待更新';
      if (!fixed._sourceData?.japaneseName) {
        if (!fixed._sourceData) fixed._sourceData = { japaneseName: '' };
        fixed._sourceData.japaneseName = fixed.title || fixed.name || '';
      }
      if (!fixed.englishName)
        fixed.englishName = fixed.title || fixed.name || '';

      return fixed;
    });

    console.log(`✅ 花火数据验证完成，处理了 ${fixedEvents.length} 个事件`);
    return fixedEvents;
  };

  // 验证和修复事件数据
  const validatedEvents = useMemo(() => validateAndFixEvents(events), [events]);

  // ==================== 配色系统 ====================

  const getStandardBackgroundGradient = () => {
    // 如果手动指定了gradientColors，优先使用
    if (region.gradientColors) {
      return region.gradientColors;
    }

    // 否则使用标准配色系统自动生成
    return COLOR_SYSTEM.generateBackgroundGradient(regionKey, activityKey);
  };

  const getTitleGradient = () => {
    // 根据regionKey返回预定义的颜色渐变，确保Tailwind CSS能正确编译
    const gradients = {
      tokyo: 'from-red-600 via-rose-500 to-orange-600',
      saitama: 'from-orange-600 via-amber-500 to-red-600',
      chiba: 'from-sky-600 via-cyan-500 to-blue-600',
      kanagawa: 'from-blue-600 via-blue-500 to-cyan-600',
      kitakanto: 'from-green-600 via-emerald-500 to-blue-600',
      koshinetsu: 'from-purple-600 via-violet-500 to-blue-600',
    };

    return gradients[regionKey as keyof typeof gradients] || gradients.tokyo;
  };

  // ==================== 导航系统 ====================

  const getRegionNavigation = () => {
    // 定义地区循环顺序：东京 → 埼玉 → 千叶 → 神奈川 → 北关东 → 甲信越 → 东京
    const regionCycle = [
      { key: 'tokyo', name: '东京都', emoji: '🗼', url: '/tokyo/hanabi' },
      { key: 'saitama', name: '埼玉县', emoji: '🌸', url: '/saitama/hanabi' },
      { key: 'chiba', name: '千叶县', emoji: '🌊', url: '/chiba/hanabi' },
      {
        key: 'kanagawa',
        name: '神奈川县',
        emoji: '⛵',
        url: '/kanagawa/hanabi',
      },
      {
        key: 'kitakanto',
        name: '北关东',
        emoji: '♨️',
        url: '/kitakanto/hanabi',
      },
      {
        key: 'koshinetsu',
        name: '甲信越',
        emoji: '🗻',
        url: '/koshinetsu/hanabi',
      },
    ];

    // 查找当前地区在循环中的位置
    const currentIndex = regionCycle.findIndex(
      region => region.key === regionKey
    );

    if (currentIndex === -1) {
      // 如果找不到当前地区，返回默认导航（东京为中心）
      return {
        prev: { name: '甲信越', href: '/koshinetsu/hanabi', emoji: '🗻' },
        current: { name: '东京都', emoji: '🗼' },
        next: { name: '埼玉县', href: '/saitama/hanabi', emoji: '🌸' },
      };
    }

    // 计算上一个和下一个地区的索引（循环）
    const prevIndex =
      (currentIndex - 1 + regionCycle.length) % regionCycle.length;
    const nextIndex = (currentIndex + 1) % regionCycle.length;

    const prevRegion = regionCycle[prevIndex];
    const currentRegion = regionCycle[currentIndex];
    const nextRegion = regionCycle[nextIndex];

    return {
      prev: {
        name: prevRegion.name,
        href: prevRegion.url,
        emoji: prevRegion.emoji,
      },
      current: { name: currentRegion.name, emoji: currentRegion.emoji },
      next: {
        name: nextRegion.name,
        href: nextRegion.url,
        emoji: nextRegion.emoji,
      },
    };
  };

  // ==================== 文本处理工具 ====================

  const truncateText = (text: string, maxLength: number): string => {
    if (!text) return '';
    return text.length > maxLength
      ? text.substring(0, maxLength) + '...'
      : text;
  };

  const truncateHighlight = (highlight: string): string => {
    return truncateText(highlight, 15);
  };

  const truncateDescription = (description: string): string => {
    return truncateText(description, 100);
  };

  // ==================== 日期处理系统 ====================

  const formatDate = (dateString: string) => {
    if (!dateString) return '日期待定';

    // 如果已经包含年份，直接返回
    if (dateString.includes('年')) {
      return dateString;
    }

    // 尝试解析标准日期格式
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      return `${date.getFullYear()}年${
        date.getMonth() + 1
      }月${date.getDate()}日`;
    }

    // 如果缺少年份，自动添加当前年份
    const currentYear = new Date().getFullYear();
    if (dateString.match(/\d{1,2}月\d{1,2}日/)) {
      return `${currentYear}年${dateString}`;
    }

    // 其他格式保持原样
    return dateString;
  };

  const formatDateRange = (eventDateStr: string, endDate?: string) => {
    if (!eventDateStr) return '日期待定';

    try {
      // 处理ISO格式的多日期 (逗号分隔)
      if (eventDateStr.includes(',')) {
        const isoDateParts = eventDateStr.split(',');
        const formattedDates: string[] = [];

        for (const part of isoDateParts) {
          const trimmedPart = part.trim();
          if (trimmedPart.match(/^\d{4}-\d{2}-\d{2}$/)) {
            const date = new Date(trimmedPart);
            if (!isNaN(date.getTime())) {
              // 转换为中文格式：YYYY年MM月DD日
              const year = date.getFullYear();
              const month = date.getMonth() + 1;
              const day = date.getDate();
              formattedDates.push(`${year}年${month}月${day}日`);
            }
          }
        }

        if (formattedDates.length > 0) {
          // 如果日期较多，简化显示
          if (formattedDates.length > 3) {
            return `${formattedDates[0]} 等${formattedDates.length}天`;
          } else {
            return formattedDates.join('、');
          }
        }
      }

      // 处理单个ISO格式日期
      if (eventDateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
        const date = new Date(eventDateStr);
        if (!isNaN(date.getTime())) {
          const year = date.getFullYear();
          const month = date.getMonth() + 1;
          const day = date.getDate();
          return `${year}年${month}月${day}日`;
        }
      }

      // 对于其他格式，使用原有逻辑
      const formattedStart = formatDate(eventDateStr);
      if (endDate) {
        const formattedEnd = formatDate(endDate);
        return `${formattedStart} - ${formattedEnd}`;
      }
      return formattedStart;
    } catch (error) {
      console.warn('日期格式化错误:', error);
      return eventDateStr;
    }
  };

  // ==================== 筛选系统 ====================

  const filteredEvents = useMemo(() => {
    if (!startDate && !endDate) return validatedEvents;

    return validatedEvents.filter(event => {
      const eventDateStr = event.date || event.dates || '';
      if (!eventDateStr) return true;

      try {
        // 解析多种日期格式
        const parseEventDates = (dateStr: string): Date[] => {
          const dates: Date[] = [];

          // 处理ISO格式的多日期 (逗号分隔)
          if (dateStr.includes(',')) {
            const isoDateParts = dateStr.split(',');
            for (const part of isoDateParts) {
              const trimmedPart = part.trim();
              if (trimmedPart.match(/^\d{4}-\d{2}-\d{2}$/)) {
                const date = new Date(trimmedPart);
                if (!isNaN(date.getTime())) {
                  dates.push(date);
                }
              }
            }
            if (dates.length > 0) return dates;
          }

          // 处理单个ISO格式日期
          if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
            const date = new Date(dateStr);
            if (!isNaN(date.getTime())) {
              return [date];
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
            const date = new Date(yearNum, monthNum, day);
            if (!isNaN(date.getTime())) {
              return [date];
            }
          }

          // 处理"第X个星期Y"格式
          const weekMatch = dateStr.match(
            /(\d{4})年(\d{1,2})月第(\d)个?([星期周]([一二三四五六日天]|[六末]))/
          );
          if (weekMatch) {
            const [, year, month, weekNum] = weekMatch;
            const yearNum = parseInt(year);
            const monthNum = parseInt(month) - 1;
            const weekNumber = parseInt(weekNum);

            // 计算该月第X个星期的大致日期
            const approximateDay = weekNumber * 7;
            const date = new Date(yearNum, monthNum, approximateDay);
            if (!isNaN(date.getTime())) {
              return [date];
            }
          }

          // 处理简化的"X月第Y个周Z"格式
          const simpleWeekMatch = dateStr.match(
            /(\d{1,2})月第([一二三四])个?([星期周]([一二三四五六日天]|[六末]))/
          );
          if (simpleWeekMatch) {
            const [, month, weekNumChinese] = simpleWeekMatch;
            const currentYear = new Date().getFullYear();
            const monthNum = parseInt(month) - 1;

            // 中文数字转换
            const chineseToNumber: Record<string, number> = {
              一: 1,
              二: 2,
              三: 3,
              四: 4,
            };
            const weekNumber = chineseToNumber[weekNumChinese] || 1;

            const approximateDay = weekNumber * 7;
            const date = new Date(currentYear, monthNum, approximateDay);
            if (!isNaN(date.getTime())) {
              return [date];
            }
          }

          // 匹配 "YYYY年MM月DD日" 格式
          const yearMatch = dateStr.match(/(\d{4})年(\d{1,2})月(\d{1,2})日/);
          if (yearMatch) {
            const [, year, month, day] = yearMatch;
            const date = new Date(
              parseInt(year),
              parseInt(month) - 1,
              parseInt(day)
            );
            if (!isNaN(date.getTime())) {
              return [date];
            }
          }

          // 匹配 "MM月DD日" 格式，自动添加当前年份
          const monthMatch = dateStr.match(/(\d{1,2})月(\d{1,2})日/);
          if (monthMatch) {
            const [, month, day] = monthMatch;
            const currentYear = new Date().getFullYear();
            const date = new Date(
              currentYear,
              parseInt(month) - 1,
              parseInt(day)
            );
            if (!isNaN(date.getTime())) {
              return [date];
            }
          }

          // 尝试标准日期解析
          const standardDate = new Date(dateStr);
          if (!isNaN(standardDate.getTime())) {
            return [standardDate];
          }

          return [];
        };

        const eventDates = parseEventDates(eventDateStr);
        if (eventDates.length === 0) return true; // 无法解析的日期保留显示

        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        // 对于多日期活动，只要有任何一个日期在筛选范围内就显示
        for (const eventDate of eventDates) {
          let dateInRange = true;

          if (start && eventDate < start) {
            dateInRange = false;
          }
          if (end && eventDate > end) {
            dateInRange = false;
          }

          // 如果找到一个在范围内的日期，就显示这个活动
          if (dateInRange) {
            return true;
          }
        }

        return false; // 所有日期都不在筛选范围内
      } catch (error) {
        console.warn('筛选日期处理错误:', error);
        return true; // 出错时保留显示
      }
    });
  }, [validatedEvents, startDate, endDate]);

  // ==================== 点赞系统 ====================

  const handleLike = (eventId: string) => {
    setLikes(prev => ({
      ...prev,
      [eventId]: (prev[eventId] || 0) + 1,
    }));
  };

  // 初始化点赞数据
  useEffect(() => {
    const initialLikes: Record<string, number> = {};
    validatedEvents.forEach(event => {
      initialLikes[event.id] = event.likes || 0;
    });
    setLikes(initialLikes);
  }, [validatedEvents]);

  // ==================== 排序系统 ====================

  // 按时间排序 - 修复语法错误，使用useMemo避免无限循环
  const sortedEvents = useMemo(() => {
    return filteredEvents.sort((a, b) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

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

        // 删除复杂的"第X个星期Y"格式解析，简化逻辑

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

  // ==================== 渲染组件 ====================

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
              className="font-medium transition-colors hover:text-blue-600"
            >
              🏠 首页
            </Link>
            <span className="text-gray-400">›</span>
            <a
              href={region.navigationLinks.current.url}
              className="font-medium transition-colors hover:text-blue-600"
            >
              {region.emoji} {region.displayName}活动
            </a>
            <span className="text-gray-400">›</span>
            <span className="font-medium text-blue-600">🎆 花火大会</span>
          </div>
        </div>
      </nav>

      {/* 标题区域 */}
      <section className="pb-12 pt-12 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-center">
            <span className="mr-4 text-5xl">{region.emoji}</span>
            <h1
              className={`bg-gradient-to-r text-4xl font-bold md:text-5xl ${getTitleGradient()} bg-clip-text text-transparent`}
            >
              {pageTitle || `${region.displayName}花火大会`}
            </h1>
            <span className="ml-4 text-5xl">🎆</span>
          </div>

          <p className="mx-auto max-w-7xl text-lg leading-relaxed text-gray-700 md:text-xl">
            {pageDescription ||
              `体验${region.displayName}最精彩的花火大会，感受${region.description}`}
          </p>
        </div>
      </section>

      {/* 日历筛选器 */}
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
                  className="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col items-center gap-2 sm:flex-row">
                <label className="text-sm text-gray-600">结束日期：</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={e => setEndDate(e.target.value)}
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
                共找到 {sortedEvents.length} 场花火大会
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 花火大会列表 */}
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
                            {formatDateRange(
                              event.date || (event as any).dates,
                              event.endDate
                            )}
                          </span>
                          <span className="flex items-center">
                            <span className="mr-1 text-lg">📍</span>
                            {event.location}
                          </span>
                          {event.fireworksCount && (
                            <span className="flex items-center">
                              <span className="mr-1 text-lg">🎆</span>
                              {event.fireworksCount}发
                            </span>
                          )}
                          {event.expectedVisitors && (
                            <span className="flex items-center">
                              <span className="mr-1 text-lg">👥</span>
                              {typeof event.expectedVisitors === 'number'
                                ? `${event.expectedVisitors.toLocaleString()}人`
                                : event.expectedVisitors}
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {(event.highlights || event.features || []).map(
                            (highlight: string, idx: number) => (
                              <span
                                key={idx}
                                className="rounded-full bg-white/70 px-3 py-1 text-sm font-medium text-gray-700"
                              >
                                {truncateHighlight(highlight)}
                              </span>
                            )
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col items-center gap-3">
                        <button
                          onClick={() => handleLike(event.id)}
                          className="flex transform items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-gray-800 shadow-lg transition-all duration-200 hover:scale-110 hover:bg-amber-100"
                        >
                          <span className="text-xl">❤️</span>
                          <span className="font-bold">
                            {Math.floor(likes[event.id] || 0)}
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
              探索其他地区花火大会
            </h3>
          </div>

          {(() => {
            const navigation = getRegionNavigation();
            if (!navigation) return null;

            return (
              <div className="flex items-center justify-center space-x-4">
                {/* 上一个地区 */}
                <a
                  href={navigation.prev.href}
                  className="group flex items-center space-x-3 rounded-xl border-2 border-cyan-200 bg-gradient-to-br from-cyan-50 to-blue-100 p-4 shadow-lg transition-all duration-200 hover:scale-105"
                >
                  <div className="text-2xl">{navigation.prev.emoji}</div>
                  <div className="text-left">
                    <div className="text-sm text-cyan-700">← 上一个</div>
                    <div className="font-bold text-cyan-800 transition-colors group-hover:text-cyan-900">
                      {navigation.prev.name}花火
                    </div>
                  </div>
                </a>

                {/* 当前地区 */}
                <div className="flex items-center space-x-3 rounded-xl border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-indigo-100 p-4 shadow-lg">
                  <div className="text-3xl">{navigation.current.emoji}</div>
                  <div className="text-center">
                    <div className="text-sm text-blue-600">当前位置</div>
                    <div className="font-bold text-blue-600">
                      {navigation.current.name}花火
                    </div>
                  </div>
                </div>

                {/* 下一个地区 */}
                <a
                  href={navigation.next.href}
                  className="group flex items-center space-x-3 rounded-xl border-2 border-slate-200 bg-gradient-to-br from-slate-50 to-gray-100 p-4 shadow-lg transition-all duration-200 hover:scale-105"
                >
                  <div className="text-2xl">{navigation.next.emoji}</div>
                  <div className="text-right">
                    <div className="text-sm text-slate-700">下一个 →</div>
                    <div className="font-bold text-slate-800 transition-colors group-hover:text-slate-900">
                      {navigation.next.name}花火
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

// ==================== 导出工具函数 ====================

/**
 * 获取标准数据并验证
 * 用于页面组件中获取和验证API数据
 */
export const fetchAndValidateHanabiData = async (
  apiUrl: string
): Promise<HanabiEvent[]> => {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`API请求失败: ${response.status}`);
    }

    const data = await response.json();

    // 确保返回数组格式
    const events = Array.isArray(data) ? data : data.events || [];

    // 基础验证
    const validatedEvents = events.map((event: any, index: number) => ({
      id: event.id || `hanabi-${index}`,
      name: event.name || event.title || `花火大会 ${index + 1}`,
      title: event.title || event.name || `花火大会 ${index + 1}`,
      japaneseName: event.japaneseName || event.name || event.title || '',
      englishName: event.englishName || event.name || event.title || '',
      dates: event.dates || event.date || '日期待定',
      date: event.date || event.dates || '日期待定',
      location: event.location || '地点待定',
      features: event.features || event.highlights || [],
      highlights: event.highlights || event.features || [],
      likes: Math.max(0, Math.floor(Number(event.likes) || 0)),
      website: event.website || undefined,
      description: event.description || '详情待更新',
      fireworksCount: event.fireworksCount || null,
      expectedVisitors: event.expectedVisitors || null,
      venue: event.venue || event.location || '会场待定',
    }));

    console.log(`✅ 花火数据获取成功，共 ${validatedEvents.length} 个事件`);
    return validatedEvents;
  } catch (error) {
    console.error('花火数据获取失败:', error);
    return [];
  }
};
