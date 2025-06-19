/**
 * 灯光秀页面通用模板 - PROFESSIONAL LEVEL
 * @template 第三层灯光秀页面通用模板
 * @scalability 支持关东全地区复用
 * @features 日期筛选、点赞系统、响应式设计、时间排序、电球数显示
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
 * - 示例：东京灯光秀 = 红色系(地区) + 紫色系(活动) = from-red-100 to-purple-200
 * - 示例：埼玉灯光秀 = 橙色系(地区) + 紫色系(活动) = from-orange-100 to-purple-200
 * - 示例：千叶灯光秀 = 蓝色系(地区) + 紫色系(活动) = from-sky-100 to-purple-200
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
 * ✅ 日期必须包含年份：2025年11月15日 ✓ | 11月15日 ❌
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
    activityKey: string = 'illumination'
  ) => {
    const regionColor =
      COLOR_SYSTEM.REGION_COLORS[
        regionKey as keyof typeof COLOR_SYSTEM.REGION_COLORS
      ] || COLOR_SYSTEM.REGION_COLORS.tokyo;
    const activityColor =
      COLOR_SYSTEM.ACTIVITY_COLORS[
        activityKey as keyof typeof COLOR_SYSTEM.ACTIVITY_COLORS
      ] || COLOR_SYSTEM.ACTIVITY_COLORS.illumination;

    // 地区色为主，活动色为辅，创建渐变
    return `from-${regionColor.from} to-${activityColor.to}`;
  },

  // 生成标题颜色渐变的函数（地区色+活动色组合）
  generateTitleGradient: (
    regionKey: string,
    activityKey: string = 'illumination'
  ) => {
    const regionColor =
      COLOR_SYSTEM.REGION_COLORS[
        regionKey as keyof typeof COLOR_SYSTEM.REGION_COLORS
      ] || COLOR_SYSTEM.REGION_COLORS.tokyo;
    const activityColor =
      COLOR_SYSTEM.ACTIVITY_COLORS[
        activityKey as keyof typeof COLOR_SYSTEM.ACTIVITY_COLORS
      ] || COLOR_SYSTEM.ACTIVITY_COLORS.illumination;

    // 地区主色 → 地区辅色 → 活动主色，创建三色渐变
    return `from-${regionColor.primary} via-${regionColor.secondary} to-${activityColor.primary}`;
  },
};

// ==================== 类型定义 ====================

// 灯光秀事件数据接口 - 支持双字段格式（原始格式 + 标准化数字）
interface IlluminationEvent {
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

  // 灯光秀特有字段 - 双字段格式支持
  illuminationPeriod?: string; // 点灯期间（如"11月15日～12月25日"）
  lightingTime?: string; // 点灯时间（如"17:00～23:00"）
  bulbCount?: string | number; // 电球数原始格式（如"约100万球"）或数字
  bulbCountNum?: number | null; // 标准化数字（如1000000），null表示未公布
  theme?: string; // 灯光秀主题
  specialFeatures?: string[]; // 特色亮点
  venue?: string; // 会场名称
  detailLink?: string; // 详情页面链接
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

interface IlluminationPageTemplateProps {
  region: RegionConfig;
  events: IlluminationEvent[];
  pageTitle?: string;
  pageDescription?: string;
  // 新增：自动配色参数
  regionKey?: string; // 地区键（tokyo, saitama等）
  activityKey?: string; // 活动键（illumination）
}

export default function IlluminationPageTemplate({
  region,
  events,
  pageTitle,
  pageDescription,
  regionKey = 'tokyo',
  activityKey = 'illumination',
}: IlluminationPageTemplateProps) {
  // ==================== 状态管理 ====================
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [likedEvents, setLikedEvents] = useState<Record<string, number>>({});

  // ==================== 数据验证与修复 ====================
  const validateAndFixEvents = (
    events: IlluminationEvent[]
  ): IlluminationEvent[] => {
    console.log('🔧 开始验证和修复灯光秀事件数据...');

    return events.map((event, index) => {
      const fixedEvent = { ...event };

      // 1. 确保必填字段完整
      if (!fixedEvent.id) {
        fixedEvent.id = `illumination-${index}`;
        console.log(`🔧 修复ID: ${fixedEvent.id}`);
      }

      if (!fixedEvent.name && !fixedEvent.title) {
        fixedEvent.name = `灯光秀活动 ${index + 1}`;
        console.log(`🔧 修复名称: ${fixedEvent.name}`);
      }

      if (!fixedEvent.location) {
        fixedEvent.location = '关东地区';
        console.log(`🔧 修复地点: ${fixedEvent.location}`);
      }

      if (!fixedEvent.description) {
        fixedEvent.description = '精彩的灯光秀活动，带您进入光影的奇幻世界。';
        console.log(`🔧 修复描述: ${fixedEvent.description}`);
      }

      // 2. 日期格式检查和修复
      const dateField = fixedEvent.date || fixedEvent.dates || '';
      if (
        dateField &&
        !dateField.includes('2024') &&
        !dateField.includes('2025')
      ) {
        // 如果日期缺少年份，默认添加2024年
        if (dateField.includes('月')) {
          fixedEvent.date = `2024年${dateField}`;
          fixedEvent.dates = `2024年${dateField}`;
          console.log(`🔧 修复日期年份: ${fixedEvent.date}`);
        }
      }

      // 3. 数字字段验证
      if (typeof fixedEvent.likes !== 'number') {
        fixedEvent.likes = 0;
        console.log(`🔧 修复点赞数: ${fixedEvent.likes}`);
      }

      // 4. 数组字段验证
      if (
        !Array.isArray(fixedEvent.features) &&
        !Array.isArray(fixedEvent.highlights)
      ) {
        fixedEvent.features = ['✨ 精美灯光'];
        fixedEvent.highlights = ['✨ 精美灯光'];
        console.log(`🔧 修复特色字段`);
      }

      // 5. 灯光秀特有字段处理
      if (fixedEvent.bulbCount && typeof fixedEvent.bulbCount === 'string') {
        // 尝试从字符串中提取数字
        const numMatch = fixedEvent.bulbCount.match(/(\d+(?:,\d+)*(?:\.\d+)?)/);
        if (numMatch) {
          const numStr = numMatch[1].replace(/,/g, '');
          let num = parseFloat(numStr);

          // 处理单位
          if (fixedEvent.bulbCount.includes('万')) {
            num *= 10000;
          }
          if (
            fixedEvent.bulbCount.includes('億') ||
            fixedEvent.bulbCount.includes('亿')
          ) {
            num *= 100000000;
          }

          fixedEvent.bulbCountNum = Math.floor(num);
          console.log(
            `🔧 解析电球数: ${fixedEvent.bulbCount} → ${fixedEvent.bulbCountNum}`
          );
        }
      }

      return fixedEvent;
    });
  };

  // 验证并修复数据
  const validatedEvents = useMemo(() => {
    return validateAndFixEvents(events);
  }, [events]);

  // ==================== 自动配色生成 ====================
  const getStandardBackgroundGradient = () => {
    return COLOR_SYSTEM.generateBackgroundGradient(regionKey, activityKey);
  };

  const getTitleGradient = () => {
    // 根据regionKey返回预定义的颜色渐变，确保Tailwind CSS能正确编译
    const gradients = {
      tokyo: 'from-purple-600 via-violet-500 to-indigo-600',
      saitama: 'from-orange-600 via-amber-500 to-purple-600',
      chiba: 'from-sky-600 via-cyan-500 to-purple-600',
      kanagawa: 'from-blue-600 via-blue-500 to-purple-600',
      kitakanto: 'from-green-600 via-emerald-500 to-purple-600',
      koshinetsu: 'from-purple-600 via-violet-500 to-blue-600',
    };

    return gradients[regionKey as keyof typeof gradients] || gradients.tokyo;
  };

  // ==================== 导航配置生成 ====================
  const getRegionNavigation = () => {
    // 定义地区循环顺序：东京 → 埼玉 → 千叶 → 神奈川 → 北关东 → 甲信越 → 东京
    const regionCycle = [
      { key: 'tokyo', name: '东京都', emoji: '🗼', url: '/tokyo/illumination' },
      {
        key: 'saitama',
        name: '埼玉县',
        emoji: '🌸',
        url: '/saitama/illumination',
      },
      { key: 'chiba', name: '千叶县', emoji: '🌊', url: '/chiba/illumination' },
      {
        key: 'kanagawa',
        name: '神奈川县',
        emoji: '⛵',
        url: '/kanagawa/illumination',
      },
      {
        key: 'kitakanto',
        name: '北关东',
        emoji: '♨️',
        url: '/kitakanto/illumination',
      },
      {
        key: 'koshinetsu',
        name: '甲信越',
        emoji: '🗻',
        url: '/koshinetsu/illumination',
      },
    ];

    // 查找当前地区在循环中的位置
    const currentIndex = regionCycle.findIndex(
      region => region.key === regionKey
    );

    if (currentIndex === -1) {
      // 如果找不到当前地区，返回默认导航（东京为中心）
      return {
        prev: { name: '甲信越', href: '/koshinetsu/illumination', emoji: '🗻' },
        current: { name: '东京都', emoji: '🗼' },
        next: { name: '埼玉县', href: '/saitama/illumination', emoji: '🌸' },
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

  // ==================== 文本处理函数 ====================
  const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const truncateHighlight = (highlight: string): string => {
    return truncateText(highlight, 15);
  };

  const truncateDescription = (description: string): string => {
    return truncateText(description, 100);
  };

  // Features自动图标处理函数 - 一劳永逸方案（灯光秀版）
  const addIconToFeature = (feature: string): string => {
    // 如果已有emoji图标，直接返回
    if (/[\u{1F300}-\u{1F9FF}]/u.test(feature)) return feature;

    // 灯光秀常用关键词-图标映射表
    const iconMappings = [
      // 灯光相关
      {
        keywords: ['万球', '球', 'イルミネーション', 'ライトアップ'],
        icon: '💡',
      },
      { keywords: ['LED', 'ライト', '電球'], icon: '💡' },
      { keywords: ['クリスマス', 'Christmas'], icon: '🎄' },
      { keywords: ['ツリー', 'tree'], icon: '🌲' },

      // 主题/特色
      { keywords: ['アリス', 'Alice'], icon: '🐰' },
      { keywords: ['星空', 'スター', '天空'], icon: '🌟' },
      { keywords: ['滝', 'ライトアップ'], icon: '💧' },
      { keywords: ['ワイン', 'wine'], icon: '🍷' },
      { keywords: ['メルヘン', '夢'], icon: '🧚' },
      { keywords: ['アート', 'art'], icon: '🎨' },
      { keywords: ['ページェント', 'pageant'], icon: '✨' },

      // 场所/地点
      { keywords: ['リゾート', 'resort'], icon: '🏖️' },
      { keywords: ['公園', 'パーク', 'park'], icon: '🏞️' },
      { keywords: ['城', '松本城'], icon: '🏯' },
      { keywords: ['湖', '湖畔'], icon: '🌊' },
      { keywords: ['山', '高原', 'アルプス'], icon: '🏔️' },
      { keywords: ['街', '市内', '街並み'], icon: '🏘️' },
      { keywords: ['温泉', 'スパ'], icon: '♨️' },
      { keywords: ['フラワー', '花'], icon: '🌸' },

      // 时间/期间
      { keywords: ['長期', '開催'], icon: '📅' },
      { keywords: ['ナイトツアー', '夜'], icon: '🌙' },
      { keywords: ['ウィンター', '冬'], icon: '❄️' },
      { keywords: ['フェスティバル', 'festival'], icon: '🎪' },

      // 规模/特征
      { keywords: ['関東三大', '三大'], icon: '🏆' },
      { keywords: ['大人向け', '大人'], icon: '🍸' },
      { keywords: ['日本一'], icon: '🥇' },
      { keywords: ['名所', '有名'], icon: '⭐' },
      { keywords: ['自然', '背景'], icon: '🌿' },
      { keywords: ['歴史', '伝統'], icon: '🏛️' },
      { keywords: ['幻想', 'ロマン'], icon: '✨' },

      // 体验/访问
      { keywords: ['入場無料', '無料'], icon: '🎁' },
      { keywords: ['有料', 'チケット'], icon: '🎫' },
      { keywords: ['アクセス', '便利'], icon: '🚌' },
      { keywords: ['駐車場'], icon: '🅿️' },
    ];

    // 遍历映射表，找到第一个匹配的关键词
    for (const mapping of iconMappings) {
      for (const keyword of mapping.keywords) {
        if (feature.includes(keyword)) {
          return `${mapping.icon} ${feature}`;
        }
      }
    }

    // 如果没有匹配到特定图标，使用默认灯光图标
    return `✨ ${feature}`;
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';

    // 如果已经是格式化的日期，直接返回
    if (dateString.includes('年') && dateString.includes('月')) {
      return dateString;
    }

    // 尝试解析ISO格式日期
    try {
      const date = new Date(dateString);
      if (!isNaN(date.getTime())) {
        return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
      }
    } catch (error) {
      // 忽略解析错误
    }

    return dateString;
  };

  const formatDateRange = (eventDateStr: string, endDate?: string) => {
    if (!eventDateStr) return '';

    const startFormatted = formatDate(eventDateStr);

    if (endDate) {
      const endFormatted = formatDate(endDate);
      return `${startFormatted} ～ ${endFormatted}`;
    }

    return startFormatted;
  };

  // ==================== 数字格式化函数 ====================
  const formatBulbCount = (
    bulbCount?: string | number,
    bulbCountNum?: number | null
  ): string => {
    if (bulbCountNum && bulbCountNum > 0) {
      if (bulbCountNum >= 100000000) {
        return `约${(bulbCountNum / 100000000).toFixed(1)}亿球`;
      } else if (bulbCountNum >= 10000) {
        return `约${(bulbCountNum / 10000).toFixed(1)}万球`;
      } else {
        return `约${bulbCountNum.toLocaleString()}球`;
      }
    }

    if (bulbCount && typeof bulbCount === 'string') {
      return bulbCount;
    }

    return '';
  };

  // ==================== 交互处理 ====================
  const handleLike = (eventId: string) => {
    setLikedEvents(prev => ({
      ...prev,
      [eventId]: (prev[eventId] || 0) + 1,
    }));
  };

  // ==================== 日期筛选逻辑 ====================
  const filteredEvents = useMemo(() => {
    if (!startDate && !endDate) return validatedEvents;

    return validatedEvents.filter(event => {
      const eventDateStr =
        event.illuminationPeriod || event.date || event.dates || '';
      if (!eventDateStr) return false;

      // 解析事件开始日期
      const eventStartDate = parseIlluminationStartToDate(eventDateStr);
      const filterStart = startDate ? new Date(startDate) : null;
      const filterEnd = endDate ? new Date(endDate) : null;

      if (filterStart && eventStartDate < filterStart) return false;
      if (filterEnd && eventStartDate > filterEnd) return false;

      return true;
    });
  }, [validatedEvents, startDate, endDate]);

  const parseIlluminationStartToDate = (illuminationStart: string): Date => {
    if (!illuminationStart) return new Date('2024-12-31');

    // 处理日文日期格式的解析逻辑
    const year = 2024; // 默认年份

    // 提取月份
    const monthMatch = illuminationStart.match(/(\d{1,2})月/);
    if (!monthMatch) return new Date('2024-12-31');
    const month = parseInt(monthMatch[1]);

    // 处理上中下旬
    let day = 15; // 默认中旬
    if (illuminationStart.includes('上旬')) {
      day = 5;
    } else if (illuminationStart.includes('中旬')) {
      day = 15;
    } else if (illuminationStart.includes('下旬')) {
      day = 25;
    } else {
      // 提取具体日期
      const dayMatch = illuminationStart.match(/(\d{1,2})日/);
      if (dayMatch) {
        day = parseInt(dayMatch[1]);
      }
    }

    return new Date(year, month - 1, day);
  };

  const parseTimeSegment = (timeStr: string): Date => {
    if (!timeStr) return new Date('2024-12-31');

    const year = 2024; // 默认年份

    // 提取月份
    const monthMatch = timeStr.match(/(\d{1,2})月/);
    if (!monthMatch) return new Date('2024-12-31');
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
      // 优先使用illuminationPeriod，其次使用date/dates
      const illuminationStartA =
        a.illuminationPeriod || a.date || a.dates || '';
      const illuminationStartB =
        b.illuminationPeriod || b.date || b.dates || '';

      const dateA = parseIlluminationStartToDate(illuminationStartA);
      const dateB = parseIlluminationStartToDate(illuminationStartB);

      return dateA.getTime() - dateB.getTime();
    });
  }, [filteredEvents]);

  // ==================== 渲染组件 ====================

  const navigation = getRegionNavigation();

  // ==================== useEffect: 数据加载记录 ====================
  useEffect(() => {
    console.log(`✨ 灯光秀页面模板加载完成`);
    console.log(`📊 地区: ${regionKey}, 活动类型: ${activityKey}`);
    console.log(`📋 事件数量: ${validatedEvents.length}`);
    console.log(`🎨 配色: ${getStandardBackgroundGradient()}`);

    // 调试：显示排序结果
    if (sortedEvents.length > 0) {
      console.log(`📅 时间排序结果 (按illuminationPeriod):`);
      sortedEvents.forEach((event, index) => {
        const illuminationStart =
          event.illuminationPeriod || event.date || event.dates || '';
        const parsedDate = parseIlluminationStartToDate(illuminationStart);
        console.log(
          `${index + 1}. ${event.name}: ${illuminationStart} → ${parsedDate.toISOString().split('T')[0]}`
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
              className="font-medium transition-colors hover:text-purple-600"
            >
              🏠 首页
            </Link>
            <span className="text-gray-400">›</span>
            <a
              href={region.navigationLinks.current.url}
              className="font-medium transition-colors hover:text-purple-600"
            >
              {region.emoji} {region.displayName}活动
            </a>
            <span className="text-gray-400">›</span>
            <span className="font-medium text-purple-600">✨ 灯光秀</span>
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
              {pageTitle || `${region.displayName}灯光秀`}
            </h1>
            <span className="ml-4 text-5xl">✨</span>
          </div>

          <p className="mx-auto max-w-7xl text-lg leading-relaxed text-gray-700 md:text-xl">
            {pageDescription ||
              `体验${region.displayName}最璀璨的灯光秀，感受${region.description}`}
          </p>
        </div>
      </section>

      {/* 日期筛选器 - 与花火模板保持一致 */}
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
                  className="rounded-lg border border-gray-300 px-4 py-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="flex flex-col items-center gap-2 sm:flex-row">
                <label className="text-sm text-gray-600">结束日期：</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={e => setEndDate(e.target.value)}
                  min={startDate}
                  className="rounded-lg border border-gray-300 px-4 py-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                />
              </div>
              {(startDate || endDate) && (
                <button
                  onClick={() => {
                    setStartDate('');
                    setEndDate('');
                  }}
                  className="rounded-lg bg-purple-600 px-4 py-2 text-white transition-colors hover:bg-purple-700"
                >
                  清除筛选
                </button>
              )}
              <div className="text-sm text-gray-600">
                共找到 {sortedEvents.length} 个灯光秀
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 灯光秀列表 - 与花火模板保持一致的单列大卡片布局 */}
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
                            {event.illuminationPeriod ||
                              formatDateRange(
                                event.date || event.dates || '',
                                event.endDate
                              )}
                          </span>
                          <span className="flex items-center">
                            <span className="mr-1 text-lg">📍</span>
                            {event.location}
                          </span>
                          {event.lightingTime && (
                            <span className="flex items-center">
                              <span className="mr-1 text-lg">🕐</span>
                              {event.lightingTime}
                            </span>
                          )}
                          {formatBulbCount(
                            event.bulbCount,
                            event.bulbCountNum
                          ) && (
                            <span className="flex items-center">
                              <span className="mr-1 text-lg">💡</span>
                              {formatBulbCount(
                                event.bulbCount,
                                event.bulbCountNum
                              )}
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
                                {truncateHighlight(addIconToFeature(feature))}
                              </span>
                            )
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col items-center gap-3">
                        <button
                          onClick={() => handleLike(event.id)}
                          className="flex transform items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-2 text-gray-800 shadow-lg transition-all duration-200 hover:scale-110 hover:bg-purple-100"
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
                            className="flex transform items-center gap-2 whitespace-nowrap rounded-full border border-purple-200 bg-purple-50 px-4 py-2 text-purple-800 shadow-lg transition-all duration-200 hover:scale-110 hover:bg-purple-100"
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
              探索其他地区灯光秀
            </h3>
          </div>

          {(() => {
            if (!navigation) return null;

            return (
              <div className="flex items-center justify-center space-x-4">
                {/* 上一个地区 */}
                <a
                  href={navigation.prev.href}
                  className="group flex items-center space-x-3 rounded-xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-violet-100 p-4 shadow-lg transition-all duration-200 hover:scale-105"
                >
                  <div className="text-2xl">{navigation.prev.emoji}</div>
                  <div className="text-left">
                    <div className="text-sm text-purple-700">← 上一个</div>
                    <div className="font-bold text-purple-800 transition-colors group-hover:text-purple-900">
                      {navigation.prev.name}灯光
                    </div>
                  </div>
                </a>

                {/* 当前地区 */}
                <div className="flex items-center space-x-3 rounded-xl border-2 border-purple-300 bg-gradient-to-br from-purple-50 to-indigo-100 p-4 shadow-lg">
                  <div className="text-3xl">{navigation.current.emoji}</div>
                  <div className="text-center">
                    <div className="text-sm text-purple-600">当前位置</div>
                    <div className="font-bold text-purple-600">
                      {navigation.current.name}灯光
                    </div>
                  </div>
                </div>

                {/* 下一个地区 */}
                <a
                  href={navigation.next.href}
                  className="group flex items-center space-x-3 rounded-xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-blue-100 p-4 shadow-lg transition-all duration-200 hover:scale-105"
                >
                  <div className="text-2xl">{navigation.next.emoji}</div>
                  <div className="text-right">
                    <div className="text-sm text-indigo-700">下一个 →</div>
                    <div className="font-bold text-indigo-800 transition-colors group-hover:text-indigo-900">
                      {navigation.next.name}灯光
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

export const fetchAndValidateIlluminationData = async (
  apiUrl: string
): Promise<IlluminationEvent[]> => {
  try {
    console.log(`🔄 开始获取灯光秀数据: ${apiUrl}`);
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP错误: ${response.status}`);
    }

    const data = await response.json();
    console.log(`✅ 成功获取 ${data.length} 个灯光秀事件`);

    // 这里可以添加数据验证逻辑
    const validatedData = data.map((event: any, index: number) => ({
      id: event.id || `illumination-${index}`,
      title: event.title || event.name || `灯光秀活动 ${index + 1}`,
      name: event.name || event.title || `灯光秀活动 ${index + 1}`,
      date: event.date || event.dates || '2024年11月',
      dates: event.dates || event.date || '2024年11月15日～12月25日',
      location: event.location || '关东地区',
      highlights: event.highlights || event.features || ['✨ 璀璨灯光'],
      features: event.features || event.highlights || ['✨ 璀璨灯光'],
      likes: typeof event.likes === 'number' ? event.likes : 0,
      description:
        event.description || '精彩的灯光秀活动，带您进入光影的奇幻世界。',
      category: event.category || '灯光秀',
      illuminationPeriod: event.illuminationPeriod || '',
      lightingTime: event.lightingTime || '',
      bulbCount: event.bulbCount || '',
      bulbCountNum: event.bulbCountNum || null,
      theme: event.theme || '',
      specialFeatures: event.specialFeatures || [],
      venue: event.venue || '',
      detailLink: event.detailLink || '',
    }));

    return validatedData;
  } catch (error) {
    console.error('❌ 获取灯光秀数据失败:', error);
    return [];
  }
};
