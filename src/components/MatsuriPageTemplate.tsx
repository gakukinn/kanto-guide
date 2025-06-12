/**
 * 祭典页面通用模板 - PROFESSIONAL LEVEL
 * @template 第三层祭典页面通用模板
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
 * - 示例：东京祭典 = 红色系(地区) + 红色系(活动) = from-red-100 to-red-200
 * - 示例：埼玉祭典 = 橙色系(地区) + 红色系(活动) = from-orange-100 to-red-200  
 * - 示例：千叶祭典 = 蓝色系(地区) + 红色系(活动) = from-sky-100 to-red-200
 * 
 * 📋 网站内容显示规则（CONTENT_DISPLAY_RULES）:
 * ✅ 允许显示：简体汉字、繁体汉字、日文汉字
 * ✅ 允许显示：与地名相连的假名（如：新宿、渋谷等地名中的假名）
 * ❌ 禁止显示：独立的日文假名（ひらがな、カタカナ）
 * ❌ 禁止显示：非地名的假名文字
 * 🔧 AI操作要求：修改数据时必须将假名转换为汉字，保持内容准确性
 * 📝 示例：みたま祭 → 御魂祭、まつり → 祭、ほおずき → 酸浆
 * 
 * ⚠️ 商业网站重要提醒：绝对不能编造任何信息，所有内容必须基于真实可靠的数据源！
 * 
 * 📋 数据质量保证规则（DATA_QUALITY_RULES）:
 * ✅ 日期必须包含年份：2025年4月第2周日 ✓ | 4月第2周日 ❌
 * ✅ 必填字段检查：id, title, date, location必须完整
 * ✅ 自动数据修复：缺少年份时自动添加当前年份
 * ✅ 默认值填充：缺少的japaneseName、englishName等字段自动填充
 * ⚠️ AI操作规范：制作API数据时务必包含完整年份信息
 * 🔧 模板保护：模板会自动检查和修复数据质量问题
 */
'use client';

import React, { useState, useMemo, useEffect } from 'react';

// 标准配色规则定义
const COLOR_SYSTEM = {
  // 地区色配置（首页地区卡片色）
  REGION_COLORS: {
    'tokyo': 'red',      // 东京都：红色系
    'saitama': 'orange', // 埼玉县：橙色系  
    'chiba': 'sky',      // 千叶县：天蓝色系
    'kanagawa': 'blue',  // 神奈川县：蓝色系
    'kitakanto': 'green',// 北关东：绿色系
    'koshinetsu': 'purple' // 甲信越：紫色系
  },
  
  // 活动色配置（二层活动卡片色）
  ACTIVITY_COLORS: {
    'matsuri': 'red',     // 传统祭典：红色系
    'hanami': 'pink',     // 花见会：粉色系
    'hanabi': 'blue',     // 花火大会：蓝色系
    'culture': 'green',   // 文化艺术：绿色系
    'momiji': 'orange',   // 红叶狩：橙色系
    'illumination': 'purple' // 灯光秀：紫色系
  },
  
  // 生成标准配色的函数
  generateBackgroundGradient: (regionKey: string, activityKey: string = 'matsuri') => {
    const regionColor = COLOR_SYSTEM.REGION_COLORS[regionKey as keyof typeof COLOR_SYSTEM.REGION_COLORS] || 'red';
    const activityColor = COLOR_SYSTEM.ACTIVITY_COLORS[activityKey as keyof typeof COLOR_SYSTEM.ACTIVITY_COLORS] || 'red';
    
    // 如果地区色和活动色相同，使用渐变色阶
    if (regionColor === activityColor) {
      return `from-${regionColor}-100 to-${regionColor}-200`;
    }
    
    // 如果不同，地区色为主，活动色为辅
    return `from-${regionColor}-100 to-${activityColor}-200`;
  }
};

// ==================== 类型定义 ====================

// 祭典事件数据接口 - 兼容API实际数据结构
interface MatsuriEvent {
  id: string;
  title?: string;          // 可选，因为API使用name
  name?: string;           // API实际字段
  japaneseName: string;
  englishName: string;
  date?: string;           // 模板期望字段
  dates?: string;          // API实际字段
  endDate?: string;
  location: string;
  category?: string;
  highlights?: string[];   // 可选，因为API使用features
  features?: string[];     // API实际字段
  likes: number;
  website: string;
  description: string;
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
  regionKey?: string;     // 地区键（tokyo, saitama等）
  activityKey?: string;   // 活动键（matsuri, hanabi等）
}

export default function MatsuriPageTemplate({ 
  region, 
  events, 
  pageTitle, 
  pageDescription,
  regionKey = 'tokyo',
  activityKey = 'matsuri'
}: MatsuriPageTemplateProps) {
  
  // ==================== 状态管理 ====================
  
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [likes, setLikes] = useState<Record<string, number>>({});

  // ==================== 数据验证和修复系统 ====================
  
  const validateAndFixEvents = (events: MatsuriEvent[]): MatsuriEvent[] => {
    console.log('🔍 开始数据验证和修复...');
    
    const fixedEvents = events.map((event, index) => {
      const fixed = { ...event };
      
      // 1. 智能字段映射 - 修复标题字段不匹配问题
      if (!fixed.title && !fixed.name) {
        console.warn(`⚠️ 事件 ${index} 缺少标题字段`);
        fixed.title = `未命名祭典 ${index + 1}`;
      }
      
      // 2. 修复日期字段不匹配问题
      if (!fixed.date && !fixed.dates) {
        console.warn(`⚠️ 事件 ${index} 缺少日期字段`);
        fixed.date = '日期待定';
      }
      
      // 3. 修复年份缺失问题
      const dateStr = fixed.date || fixed.dates || '';
      if (dateStr && !dateStr.includes('年') && !dateStr.includes('2025') && !dateStr.includes('2026')) {
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
      if (typeof fixed.likes !== 'number' || isNaN(fixed.likes) || fixed.likes < 0) {
        console.warn(`⚠️ 事件 ${index} 红心数异常: ${fixed.likes}`);
        fixed.likes = Math.max(0, Math.floor(Number(fixed.likes) || 0));
      }
      
      // 6. 确保必填字段存在
      if (!fixed.location) fixed.location = '地点待定';
      if (!fixed.website) fixed.website = '#';
      if (!fixed.description) fixed.description = '详情待更新';
      if (!fixed.japaneseName) fixed.japaneseName = fixed.title || fixed.name || '';
      if (!fixed.englishName) fixed.englishName = fixed.title || fixed.name || '';
      
      return fixed;
    });
    
    console.log(`✅ 数据验证完成，处理了 ${fixedEvents.length} 个事件`);
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

  // ==================== 导航系统 ====================
  
  const getRegionNavigation = () => {
    // 导入祭典地区导航函数
    const { getMatsuriRegionNavigation } = require('../config/navigation');
    return getMatsuriRegionNavigation(regionKey);
  };

  // ==================== 文本处理工具 ====================
  
  const truncateText = (text: string, maxLength: number): string => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
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
      return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
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
    setLikes(prev => ({
      ...prev,
      [eventId]: (prev[eventId] || 0) + 1
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
    <div className={`min-h-screen bg-gradient-to-br ${getStandardBackgroundGradient()}`}>
      {/* 面包屑导航 */}
      <nav className="pt-4 pb-2">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-gray-600">
            <a href="/" className="hover:text-red-600 transition-colors font-medium">🏠 首页</a>
            <span className="text-gray-400">›</span>
            <a href={region.navigationLinks.current.url} className="hover:text-red-600 transition-colors font-medium">
              {region.emoji} {region.displayName}活动
            </a>
            <span className="text-gray-400">›</span>
            <span className="text-red-600 font-medium">🏮 传统祭典</span>
          </div>
        </div>
      </nav>

      {/* 标题区域 */}
      <section className="pt-12 pb-12 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-6">
            <span className="text-5xl mr-4">{region.emoji}</span>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 via-red-500 to-orange-600 bg-clip-text text-transparent">
              {pageTitle || `${region.displayName}传统祭典`}
            </h1>
            <span className="text-5xl ml-4">🏮</span>
          </div>
          <p className="text-lg md:text-xl text-gray-700 max-w-7xl mx-auto leading-relaxed">
            {pageDescription || `体验${region.displayName}最具传统文化魅力的祭典活动，感受${region.description}`}
          </p>
        </div>
      </section>

      {/* 日历筛选器 */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-200 rounded-2xl p-6 shadow-lg">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <label className="flex items-center text-lg font-medium text-gray-700">
                <span className="text-2xl mr-2">📅</span>
                筛选日期：
              </label>
              <div className="flex flex-col sm:flex-row gap-2 items-center">
                <label className="text-sm text-gray-600">开始日期：</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-2 items-center">
                <label className="text-sm text-gray-600">结束日期：</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
              {(startDate || endDate) && (
                <button
                  onClick={() => {
                    setStartDate('');
                    setEndDate('');
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  清除筛选
                </button>
              )}
              <div className="text-sm text-gray-600">
                共找到 {sortedEvents.length} 场传统祭典
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 传统祭典列表 */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:gap-8">
            {sortedEvents.map((event) => (
              <div
                key={event.id}
                className={`bg-gradient-to-r ${getStandardBackgroundGradient()} backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 border-2`}
              >
                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                  <div className="flex-grow">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                          {event.title || event.name}
                        </h3>
                        <p className="text-sm text-gray-500 mb-3">
                          {truncateDescription(event.description)}
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm md:text-base text-gray-700 mb-3">
                          <span className="flex items-center">
                            <span className="text-lg mr-1">📅</span>
                            {formatDateRange(event.date || (event as any).dates, event.endDate)}
                          </span>
                          <span className="flex items-center">
                            <span className="text-lg mr-1">📍</span>
                            {event.location}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {(event.highlights || event.features || []).map((highlight: string, idx: number) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-white/70 text-gray-700 rounded-full text-sm font-medium"
                            >
                              {truncateHighlight(highlight)}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => handleLike(event.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-gray-800 rounded-full hover:bg-amber-100 transform hover:scale-110 transition-all duration-200 shadow-lg border border-amber-200"
                        >
                          <span className="text-xl">❤️</span>
                          <span className="font-bold">{Math.floor(likes[event.id] || 0)}</span>
                        </button>
                        <a
                          href={event.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-all duration-200 shadow-lg border border-blue-200 whitespace-nowrap"
                        >
                          <span className="text-lg">🌐</span>
                          <span className="font-medium">官网</span>
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
      <section className="py-8 border-t border-white/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h3 className="text-lg font-bold text-gray-800">探索其他地区传统祭典</h3>
          </div>
          
          {(() => {
            const navigation = getRegionNavigation();
            if (!navigation) return null;
            
            return (
              <div className="flex items-center justify-center space-x-4">
                {/* 上一个地区 */}
                <a 
                  href={navigation.prev.href} 
                  className="group flex items-center space-x-3 bg-gradient-to-br from-cyan-50 to-blue-100 rounded-xl p-4 border-2 border-cyan-200 hover:border-cyan-300 hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  <div className="text-2xl">{navigation.prev.emoji}</div>
                  <div className="text-left">
                    <div className="text-sm text-cyan-700">← 上一个</div>
                    <div className="font-bold text-cyan-800 group-hover:text-cyan-900 transition-colors">
                      {navigation.prev.name}祭典
                    </div>
                  </div>
                </a>

                {/* 当前地区 */}
                <div className="flex items-center space-x-3 bg-gradient-to-br from-red-50 to-orange-100 rounded-xl p-4 border-2 border-red-300 shadow-lg">
                  <div className="text-3xl">{navigation.current.emoji}</div>
                  <div className="text-center">
                    <div className="text-sm text-red-600">当前位置</div>
                    <div className="font-bold text-red-600">{navigation.current.name}祭典</div>
                  </div>
                </div>

                {/* 下一个地区 */}
                <a 
                  href={navigation.next.href} 
                  className="group flex items-center space-x-3 bg-gradient-to-br from-slate-50 to-gray-100 rounded-xl p-4 border-2 border-slate-200 hover:border-slate-300 hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  <div className="text-2xl">{navigation.next.emoji}</div>
                  <div className="text-right">
                    <div className="text-sm text-slate-700">下一个 →</div>
                    <div className="font-bold text-slate-800 group-hover:text-slate-900 transition-colors">
                      {navigation.next.name}祭典
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
export const fetchAndValidateMatsuriData = async (apiUrl: string): Promise<MatsuriEvent[]> => {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`API请求失败: ${response.status}`);
    }
    
    const data = await response.json();
    
    // 确保返回数组格式
    const events = Array.isArray(data) ? data : (data.events || []);
    
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
      description: event.description || '详情待更新'
    }));
    
    console.log(`✅ 成功验证 ${validatedEvents.length} 个祭典数据`);
    return validatedEvents;
    
  } catch (error) {
    console.error('❌ 数据获取失败:', error);
    return [];
  }
}; 