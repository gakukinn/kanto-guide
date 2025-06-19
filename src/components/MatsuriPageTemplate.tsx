/**
 * 传统祭典页面通用模板 - PROFESSIONAL LEVEL
 * @template 第三层传统祭典页面通用模板
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
 * - 背景渐变：地区主色调 + 活动辅助色调
 * - 示例：东京祭典 = 红色系(地区) + 红色系(活动) = from-red-100 to-red-200
 * - 示例：埼玉祭典 = 橙色系(地区) + 红色系(活动) = from-orange-100 to-red-200
 * - 示例：千叶祭典 = 蓝色系(地区) + 红色系(活动) = from-sky-100 to-red-200
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
 * ✅ 日期必须包含年份：2025年8月15日 ✓ | 8月15日 ❌
 * ✅ 必填字段检查：id, name, date, location必须完整
 * ✅ 自动数据修复：缺少年份时自动添加当前年份
 * ✅ 默认值填充：缺少的japaneseName、englishName等字段自动填充
 * ⚠️ AI操作规范：制作API数据时务必包含完整年份信息
 * 🔧 模板保护：模板会自动检查和修复数据质量问题
 */
'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { getMatsuriRegionNavigation } from '../config/navigation';

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
    activityKey: string = 'matsuri'
  ) => {
    const regionColor =
      COLOR_SYSTEM.REGION_COLORS[
        regionKey as keyof typeof COLOR_SYSTEM.REGION_COLORS
      ] || COLOR_SYSTEM.REGION_COLORS.tokyo;
    const activityColor =
      COLOR_SYSTEM.ACTIVITY_COLORS[
        activityKey as keyof typeof COLOR_SYSTEM.ACTIVITY_COLORS
      ] || COLOR_SYSTEM.ACTIVITY_COLORS.matsuri;

    // 地区色为主，活动色为辅，创建渐变
    return `from-${regionColor.from} to-${activityColor.to}`;
  },

  // 生成标题颜色渐变的函数（地区色+活动色组合）
  generateTitleGradient: (
    regionKey: string,
    activityKey: string = 'matsuri'
  ) => {
    const regionColor =
      COLOR_SYSTEM.REGION_COLORS[
        regionKey as keyof typeof COLOR_SYSTEM.REGION_COLORS
      ] || COLOR_SYSTEM.REGION_COLORS.tokyo;
    const activityColor =
      COLOR_SYSTEM.ACTIVITY_COLORS[
        activityKey as keyof typeof COLOR_SYSTEM.ACTIVITY_COLORS
      ] || COLOR_SYSTEM.ACTIVITY_COLORS.matsuri;

    // 地区主色 → 地区辅色 → 活动主色，创建三色渐变
    return `from-${regionColor.primary} via-${regionColor.secondary} to-${activityColor.primary}`;
  },
};

// ==================== 类型定义 ====================

// 传统祭典事件数据接口 - 支持双字段格式（原始格式 + 标准化数字）
interface MatsuriEvent {
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
  // 祭典特有字段 - 双字段格式支持
  duration?: string; // 祭典持续时间（如"3天"）
  festivalType?: string; // 祭典类型（如"夏祭"、"秋祭"）
  expectedVisitors?: number | string; // 原始格式（如"約5万人"）或数字
  expectedVisitorsNum?: number | null; // 标准化数字（如50000），null表示未公布
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
interface MatsuriPageTemplateProps {
  region: RegionConfig;
  events: MatsuriEvent[];
  pageTitle?: string;
  pageDescription?: string;
  // 新增：自动配色参数
  regionKey?: string; // 地区键（tokyo, saitama等）
  activityKey?: string; // 活动键（matsuri）
}

export default function MatsuriPageTemplate({
  region,
  events,
  pageTitle,
  pageDescription,
  regionKey = 'tokyo',
  activityKey = 'matsuri',
}: MatsuriPageTemplateProps) {
  // ==================== 状态管理 ====================

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [likedEvents, setLikedEvents] = useState<Record<string, number>>({});

  // ==================== 数据验证和修复系统 ====================

  const validateAndFixEvents = (events: MatsuriEvent[]): MatsuriEvent[] => {
    console.log('🔍 开始祭典数据验证和修复...');

    // 数组安全检查
    if (!Array.isArray(events)) {
      console.warn('⚠️ 传入的events不是数组，返回空数组');
      return [];
    }

    const fixedEvents = events.map((event, index) => {
      const fixed = { ...event };

      // 1. 智能字段映射 - 修复标题字段不匹配问题
      if (!fixed.title && !fixed.name) {
        console.warn(`⚠️ 祭典 ${index} 缺少标题字段`);
        fixed.title = `未命名祭典 ${index + 1}`;
        fixed.name = fixed.title;
      }

      // 统一标题字段
      if (fixed.name && !fixed.title) fixed.title = fixed.name;
      if (fixed.title && !fixed.name) fixed.name = fixed.title;

      // 2. 修复日期字段不匹配问题
      if (!fixed.date && !fixed.dates) {
        console.warn(`⚠️ 祭典 ${index} 缺少日期字段`);
        fixed.date = '日期待定';
      }

      // 统一日期字段
      if (fixed.dates && !fixed.date) fixed.date = fixed.dates;
      if (fixed.date && !fixed.dates) fixed.dates = fixed.date;

      // 3. 修复年份缺失问题
      const dateStr = fixed.date || fixed.dates || '';
      if (
        dateStr &&
        !dateStr.includes('年') &&
        !dateStr.includes('2025') &&
        !dateStr.includes('2024') &&
        dateStr.match(/\d{1,2}月/)
      ) {
        const currentYear = new Date().getFullYear();
        fixed.date = `${currentYear}年${dateStr}`;
        fixed.dates = fixed.date;
        console.log(`🔧 自动添加年份: ${dateStr} → ${fixed.date}`);
      }

      // 4. 修复highlights/features字段不匹配问题
      if (!fixed.highlights && !fixed.features) {
        fixed.highlights = [];
        fixed.features = [];
      }

      // 统一特色字段（highlights优先）
      if (fixed.features && !fixed.highlights) {
        fixed.highlights = [...fixed.features];
      }
      if (fixed.highlights && !fixed.features) {
        fixed.features = [...fixed.highlights];
      }

      // 5. 修复点赞数格式
      if (typeof fixed.likes !== 'number' || fixed.likes < 0) {
        fixed.likes = Math.max(0, Math.floor(Number(fixed.likes) || 0));
      }

      // 6. 修复网站链接
      if (!fixed.website) {
        fixed.website = '#';
      }

      // 7. 补充英文名称
      if (!fixed.englishName) {
        fixed.englishName = fixed.title || fixed.name || '';
      }

      return fixed;
    });

    console.log(`✅ 祭典数据验证完成，处理了 ${fixedEvents.length} 个事件`);
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
    return COLOR_SYSTEM.generateTitleGradient(regionKey, activityKey);
  };

  // 获取卡片背景色 - 基于地区色和活动色组合
  const getCardBackgroundGradient = () => {
    const regionColor =
      COLOR_SYSTEM.REGION_COLORS[
        regionKey as keyof typeof COLOR_SYSTEM.REGION_COLORS
      ] || COLOR_SYSTEM.REGION_COLORS.tokyo;
    const activityColor =
      COLOR_SYSTEM.ACTIVITY_COLORS[
        activityKey as keyof typeof COLOR_SYSTEM.ACTIVITY_COLORS
      ] || COLOR_SYSTEM.ACTIVITY_COLORS.matsuri;

    // 卡片使用更浅的地区色 + 活动色渐变，并保持透明度
    return `bg-gradient-to-br from-${regionColor.from} to-${activityColor.from}/80`;
  };

  // 获取卡片边框色
  const getCardBorderColor = () => {
    const activityColor =
      COLOR_SYSTEM.ACTIVITY_COLORS[
        activityKey as keyof typeof COLOR_SYSTEM.ACTIVITY_COLORS
      ] || COLOR_SYSTEM.ACTIVITY_COLORS.matsuri;

    return `border-${activityColor.primary.split('-')[0]}-200`;
  };

  // ==================== 导航系统 ====================

  const getRegionNavigation = () => {
    return getMatsuriRegionNavigation(regionKey);
  };

  const navigation = useMemo(() => getRegionNavigation(), [regionKey]);

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

  // Features自动图标处理函数 - 传统祭典专用
  const addIconToFeature = (feature: string): string => {
    // 如果已有emoji图标，直接返回
    if (/[\u{1F300}-\u{1F9FF}]/u.test(feature)) return feature;

    // 传统祭典常用关键词-图标映射表
    const iconMappings = [
      // 祭典类型
      { keywords: ['祭典', '祭', '例祭', 'まつり'], icon: '🏮' },
      { keywords: ['神輿', '御輿', '神轿', '抬神轿'], icon: '⛩️' },
      { keywords: ['山車', '花車', '山车', '花车'], icon: '🚗' },
      { keywords: ['踊り', '舞踊', '舞蹈', '表演'], icon: '🎭' },
      { keywords: ['太鼓', '鼓', '打鼓'], icon: '🥁' },

      // 季节特色
      { keywords: ['春祭', '春の', '桜祭'], icon: '🌸' },
      { keywords: ['夏祭', '夏の', '夏季'], icon: '🌻' },
      { keywords: ['秋祭', '秋の', '収穫'], icon: '🍂' },
      { keywords: ['冬祭', '冬の', '雪祭'], icon: '❄️' },

      // 人数/规模
      { keywords: ['万人', '人', '観客', '来場'], icon: '👥' },
      { keywords: ['大規模', '規模', '大型'], icon: '📏' },

      // 会场/场地
      { keywords: ['神社', '寺', '寺院'], icon: '⛩️' },
      { keywords: ['会場', '会场', '広場', '公園'], icon: '🏞️' },
      { keywords: ['商店街', '参道'], icon: '🏪' },
      { keywords: ['川', '河', '海', '湖'], icon: '🌊' },
      { keywords: ['駅', '交通'], icon: '🚂' },

      // 美食/设施
      { keywords: ['屋台', '露店', '出店', '縁日'], icon: '🍭' },
      { keywords: ['グルメ', '食べ物', '飲食', '美食'], icon: '🍜' },
      { keywords: ['地酒', '日本酒', 'ビール'], icon: '🍶' },

      // 传统文化
      { keywords: ['伝統', '歴史', '由緒', '文化'], icon: '🏛️' },
      { keywords: ['芸能', '芸術', '技艺'], icon: '🎨' },
      { keywords: ['工芸', '手作り', '工艺'], icon: '🎯' },

      // 地域特色
      { keywords: ['関東', '首都圏'], icon: '🏙️' },
      { keywords: ['温泉', 'スパ', '温泉街'], icon: '♨️' },
      { keywords: ['山', '山間', '高原'], icon: '⛰️' },
      { keywords: ['海岸', '浜', 'ビーチ'], icon: '🏖️' },

      // 体验特色
      { keywords: ['無料', '入場無料', 'フリー'], icon: '🎁' },
      { keywords: ['有料', '入場料', 'チケット'], icon: '🎫' },
      { keywords: ['駐車場', 'パーキング'], icon: '🅿️' },
      { keywords: ['アクセス', '便利'], icon: '🚌' },

      // 特殊活动
      { keywords: ['花火', '打上げ'], icon: '🎆' },
      { keywords: ['燈籠', '提灯', '灯笼'], icon: '🏮' },
      { keywords: ['獅子舞', '狮子舞'], icon: '🦁' },
    ];

    // 遍历映射表，找到第一个匹配的关键词
    for (const mapping of iconMappings) {
      for (const keyword of mapping.keywords) {
        if (feature.includes(keyword)) {
          return `${mapping.icon} ${feature}`;
        }
      }
    }

    // 如果没有匹配到特定图标，使用默认祭典图标
    return `🏮 ${feature}`;
  };

  // 日期处理函数
  const formatDate = (dateString: string | undefined) => {
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

  const formatDateRange = (
    eventDateStr: string | undefined,
    endDate?: string
  ) => {
    if (!eventDateStr) return '日期待定';

    try {
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
        // 智能日期提取
        const extractDate = (dateStr: string): Date | null => {
          // 匹配 "YYYY年MM月DD日" 格式
          const yearMatch = dateStr.match(/(\d{4})年(\d{1,2})月(\d{1,2})日/);
          if (yearMatch) {
            const [, year, month, day] = yearMatch;
            return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
          }

          // 匹配 "MM月DD日" 格式，自动添加当前年份
          const monthMatch = dateStr.match(/(\d{1,2})月(\d{1,2})日/);
          if (monthMatch) {
            const [, month, day] = monthMatch;
            const currentYear = new Date().getFullYear();
            return new Date(currentYear, parseInt(month) - 1, parseInt(day));
          }

          // 尝试标准日期解析
          const standardDate = new Date(dateStr);
          return isNaN(standardDate.getTime()) ? null : standardDate;
        };

        const eventDate = extractDate(eventDateStr);
        if (!eventDate) return true; // 无法解析的日期保留显示

        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        if (start && eventDate < start) return false;
        if (end && eventDate > end) return false;

        return true;
      } catch (error) {
        console.warn('筛选日期处理错误:', error);
        return true; // 出错时保留显示
      }
    });
  }, [validatedEvents, startDate, endDate]);

  // ==================== 点赞系统 ====================

  const handleLike = (eventId: string) => {
    setLikedEvents(prev => ({
      ...prev,
      [eventId]: (prev[eventId] || 0) + 1,
    }));
  };

  // ==================== 时间排序系统 ====================

  const sortedEvents = useMemo(() => {
    return filteredEvents.sort((a, b) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // 获取事件日期字符串（兼容多种字段名）
      const dateStrA = a.date || a.dates || '';
      const dateStrB = b.date || b.dates || '';

      // 提取可比较的日期
      const extractComparableDate = (dateStr: string): Date => {
        const dateMatch = dateStr.match(/(\d{4})年(\d{1,2})月(\d{1,2})日/);
        if (dateMatch) {
          const [, year, month, day] = dateMatch;
          return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        }

        const monthMatch = dateStr.match(/(\d{4})年(\d{1,2})月/);
        if (monthMatch) {
          const [, year, month] = monthMatch;
          return new Date(parseInt(year), parseInt(month) - 1, 1);
        }

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
              className="font-medium transition-colors hover:text-red-600"
            >
              🏠 首页
            </Link>
            <span className="text-gray-400">›</span>
            <Link
              href={region.navigationLinks.current.url}
              className="font-medium transition-colors hover:text-red-600"
            >
              {region.emoji} {region.displayName}活动
            </Link>
            <span className="text-gray-400">›</span>
            <span className="font-medium text-red-600">🏮 传统祭典</span>
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
              {pageTitle || `${region.displayName || ''}传统祭典活动列表`}
            </h1>
            <span className="ml-4 text-5xl">🏮</span>
          </div>

          <p className="mx-auto max-w-7xl text-lg leading-relaxed text-gray-700 md:text-xl">
            {pageDescription ||
              `体验${region.displayName || ''}最具传统文化魅力的祭典活动，感受${region.description || ''}`}
          </p>
        </div>
      </section>

      {/* 日期筛选器 - 与红叶狩模板保持一致 */}
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
                  className="rounded-lg border border-gray-300 px-4 py-2 focus:border-red-500 focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="flex flex-col items-center gap-2 sm:flex-row">
                <label className="text-sm text-gray-600">结束日期：</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={e => setEndDate(e.target.value)}
                  min={startDate}
                  className="rounded-lg border border-gray-300 px-4 py-2 focus:border-red-500 focus:ring-2 focus:ring-red-500"
                />
              </div>
              {(startDate || endDate) && (
                <button
                  onClick={() => {
                    setStartDate('');
                    setEndDate('');
                  }}
                  className="rounded-lg bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
                >
                  清除筛选
                </button>
              )}
              <div className="text-sm text-gray-600">
                共找到 {sortedEvents.length} 个祭典活动
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 祭典列表 */}
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
                        <p className="mb-3 text-sm text-gray-500">
                          {truncateDescription(event.description)}
                        </p>
                        <div className="mb-3 flex flex-wrap gap-4 text-sm text-gray-700 md:text-base">
                          <span className="flex items-center">
                            <span className="mr-1 text-lg">📅</span>
                            {formatDateRange(
                              event.date || event.dates,
                              event.endDate
                            )}
                          </span>
                          <span className="flex items-center">
                            <span className="mr-1 text-lg">📍</span>
                            {event.location}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {(event.features || event.highlights || []).map(
                            (feature: string, idx: number) => (
                              <span
                                key={idx}
                                className="rounded-full bg-white/70 px-3 py-1 text-sm font-medium text-gray-700"
                              >
                                {truncateHighlight(addIconToFeature(feature))}
                              </span>
                            )
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col items-center gap-3">
                        <button
                          onClick={() => handleLike(event.id)}
                          className="flex transform items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-gray-800 shadow-lg transition-all duration-200 hover:scale-110 hover:bg-red-100"
                        >
                          <span className="text-xl">❤️</span>
                          <span className="font-bold">
                            {Math.floor(
                              (event.likes || 0) + (likedEvents[event.id] || 0)
                            )}
                          </span>
                        </button>

                        <a
                          href={event.detailLink || `#${event.id}`}
                          className="flex transform items-center gap-2 whitespace-nowrap rounded-full border border-red-200 bg-red-50 px-4 py-2 text-red-800 shadow-lg transition-all duration-200 hover:scale-110 hover:bg-red-100"
                        >
                          <span className="font-bold">查看详情</span>
                        </a>
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
              探索其他地区传统祭典
            </h3>
          </div>

          {(() => {
            if (!navigation) return null;

            return (
              <div className="flex items-center justify-center space-x-4">
                {/* 上一个地区 */}
                <Link
                  href={navigation.prev.href}
                  className="group flex items-center space-x-3 rounded-xl border-2 border-cyan-200 bg-gradient-to-br from-cyan-50 to-blue-100 p-4 shadow-lg transition-all duration-200 hover:scale-105"
                >
                  <div className="text-2xl">{navigation.prev.emoji}</div>
                  <div className="text-left">
                    <div className="text-sm text-cyan-700">← 上一个</div>
                    <div className="font-bold text-cyan-800 transition-colors group-hover:text-cyan-900">
                      {navigation.prev.name}祭典
                    </div>
                  </div>
                </Link>

                {/* 当前地区 */}
                <div className="flex items-center space-x-3 rounded-xl border-2 border-red-300 bg-gradient-to-br from-red-50 to-orange-100 p-4 shadow-lg">
                  <div className="text-3xl">{navigation.current.emoji}</div>
                  <div className="text-center">
                    <div className="text-sm text-red-600">当前位置</div>
                    <div className="font-bold text-red-600">
                      {navigation.current.name}祭典
                    </div>
                  </div>
                </div>

                {/* 下一个地区 */}
                <Link
                  href={navigation.next.href}
                  className="group flex items-center space-x-3 rounded-xl border-2 border-slate-200 bg-gradient-to-br from-slate-50 to-gray-100 p-4 shadow-lg transition-all duration-200 hover:scale-105"
                >
                  <div className="text-2xl">{navigation.next.emoji}</div>
                  <div className="text-right">
                    <div className="text-sm text-slate-700">下一个 →</div>
                    <div className="font-bold text-slate-800 transition-colors group-hover:text-slate-900">
                      {navigation.next.name}祭典
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

// ==================== 导出工具函数 ====================

/**
 * 获取标准数据并验证
 * 用于页面组件中获取和验证API数据
 */
export const fetchAndValidateMatsuriData = async (
  apiUrl: string
): Promise<MatsuriEvent[]> => {
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
      id: event.id || `event-${index}`,
      name: event.name || event.title || `祭典 ${index + 1}`,
      title: event.title || event.name || `祭典 ${index + 1}`,
      japaneseName: event.japaneseName || event.name || event.title || '',
      englishName: event.englishName || event.name || event.title || '',
      dates: event.dates || event.date || '日期待定',
      date: event.date || event.dates || '日期待定',
      location: event.location || '地点待定',
      features: event.features || event.highlights || [],
      highlights: event.highlights || event.features || [],
      likes: Math.max(0, Math.floor(Number(event.likes) || 0)),
      website: event.website || '#',
      description: event.description || '详情待更新',
    }));

    console.log(`✅ 成功验证 ${validatedEvents.length} 个祭典数据`);
    return validatedEvents;
  } catch (error) {
    console.error('❌ 数据获取失败:', error);
    return [];
  }
};
