/**
 * 狩枫页面通用模板 - PROFESSIONAL LEVEL
 * @template 第三层狩枫页面通用模板
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
 * - 示例：东京狩枫 = 红色系(地区) + 橙色系(活动) = from-red-100 to-orange-200
 * - 示例：埼玉狩枫 = 橙色系(地区) + 橙色系(活动) = from-orange-100 to-orange-200
 * - 示例：千叶狩枫 = 蓝色系(地区) + 橙色系(活动) = from-sky-100 to-orange-200
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
// 🔄 纯静态页面模板 - 移除客户端交互
import Link from 'next/link';
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
    activityKey: string = 'momiji'
  ) => {
    const regionColor =
      COLOR_SYSTEM.REGION_COLORS[
        regionKey as keyof typeof COLOR_SYSTEM.REGION_COLORS
      ] || COLOR_SYSTEM.REGION_COLORS.tokyo;
    const activityColor =
      COLOR_SYSTEM.ACTIVITY_COLORS[
        activityKey as keyof typeof COLOR_SYSTEM.ACTIVITY_COLORS
      ] || COLOR_SYSTEM.ACTIVITY_COLORS.momiji;

    // 地区色为主，活动色为辅，创建渐变
    return `from-${regionColor.from} to-${activityColor.to}`;
  },

  // 生成标题颜色渐变的函数（地区色+活动色组合）
  generateTitleGradient: (
    regionKey: string,
    activityKey: string = 'momiji'
  ) => {
    const regionColor =
      COLOR_SYSTEM.REGION_COLORS[
        regionKey as keyof typeof COLOR_SYSTEM.REGION_COLORS
      ] || COLOR_SYSTEM.REGION_COLORS.tokyo;
    const activityColor =
      COLOR_SYSTEM.ACTIVITY_COLORS[
        activityKey as keyof typeof COLOR_SYSTEM.ACTIVITY_COLORS
      ] || COLOR_SYSTEM.ACTIVITY_COLORS.momiji;

    // 地区主色 → 地区辅色 → 活动主色，创建三色渐变
    return `from-${regionColor.primary} via-${regionColor.secondary} to-${activityColor.primary}`;
  },
};

// ==================== 类型定义 ====================

// 狩枫事件数据接口 - 支持双字段格式（原始格式 + 标准化数字）
interface MomijiEvent {
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
  // 狩枫特有字段 - 双字段格式支持
  viewingPeriod?: string; // 观赏期间（如"11月上旬～12月上旬"）
  peakTime?: string; // 最佳观赏时间
  expectedVisitors?: string | number; // 原始格式（如"约40万人"）或数字
  expectedVisitorsNum?: number | null; // 标准化数字（如400000），null表示未公布
  venue?: string; // 会场名称
  detailLink?: string; // 详情页面链接
}

// 地区配置接口
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
interface MomijiPageTemplateProps {
  region: RegionConfig;
  events: MomijiEvent[];
  pageTitle?: string;
  pageDescription?: string;
  // 新增：自动配色参数
  regionKey?: string; // 地区键（tokyo, saitama等）
  activityKey?: string; // 活动键（momiji）
}

export default function MomijiPageTemplate({
  region,
  events,
  pageTitle,
  pageDescription,
  regionKey = 'tokyo',
  activityKey = 'momiji',
}: MomijiPageTemplateProps) {
  // ==================== 状态管理 ====================
  const [likedEvents, setLikedEvents] = useState<Record<string, number>>({});

  // ==================== 数据验证与修复功能 ====================

  const validateAndFixEvents = (events: MomijiEvent[]): MomijiEvent[] => {
    if (!events || events.length === 0) {
      console.warn('⚠️ 未提供事件数据，返回空数组');
      return [];
    }

    const fixedEvents = events.map((event, index) => {
      const fixed = { ...event };

      // 修复必填字段
      if (!fixed.id) {
        fixed.id = `momiji-event-${index + 1}`;
        console.warn(`🔧 自动生成ID: ${fixed.id}`);
      }

      // 标准化名称字段
      if (!fixed.title && !fixed.name) {
        fixed.title = `红叶观赏活动 ${index + 1}`;
        fixed.name = fixed.title;
        console.warn(`🔧 自动生成标题: ${fixed.title}`);
      } else if (fixed.name && !fixed.title) {
        fixed.title = fixed.name;
      } else if (fixed.title && !fixed.name) {
        fixed.name = fixed.title;
      }

      // 标准化日期字段
      if (!fixed.date && !fixed.dates) {
        fixed.date = '2025年11月';
        fixed.dates = '2025年11月上旬～12月上旬';
        console.warn(`🔧 自动生成日期: ${fixed.date}`);
      } else if (fixed.dates && !fixed.date) {
        fixed.date = fixed.dates;
      } else if (fixed.date && !fixed.dates) {
        fixed.dates = fixed.date;
      }

      // 日期年份检查和修复
      if (fixed.date && !fixed.date.includes('2025')) {
        const currentYear = new Date().getFullYear();
        if (fixed.date.match(/^\d{1,2}月/)) {
          fixed.date = `${currentYear}年${fixed.date}`;
          console.warn(`🔧 自动添加年份: ${fixed.date}`);
        }
      }

      if (fixed.dates && !fixed.dates.includes('2025')) {
        const currentYear = new Date().getFullYear();
        if (fixed.dates.match(/^\d{1,2}月/)) {
          fixed.dates = `${currentYear}年${fixed.dates}`;
          console.warn(`🔧 自动添加年份到dates: ${fixed.dates}`);
        }
      }

      // 修复位置信息
      if (!fixed.location) {
        fixed.location = '关东地区';
        console.warn(`🔧 自动设置位置: ${fixed.location}`);
      }

      // 标准化特色字段
      if (!fixed.highlights && !fixed.features) {
        fixed.highlights = ['🍁 红叶观赏', '📸 拍照留念'];
        console.warn(`🔧 自动生成特色: ${fixed.highlights?.join(', ')}`);
      } else if (fixed.features && !fixed.highlights) {
        fixed.highlights = fixed.features;
      } else if (fixed.highlights && !fixed.features) {
        fixed.features = fixed.highlights;
      }

      // 修复点赞数
      if (typeof fixed.likes !== 'number' || fixed.likes < 0) {
        fixed.likes = 0;
        console.warn(`🔧 重置点赞数为: ${fixed.likes}`);
      }

      // 修复描述
      if (!fixed.description) {
        fixed.description = `体验${fixed.location}的美丽红叶，感受秋天的自然魅力。`;
        console.warn(`🔧 自动生成描述: ${fixed.description}`);
      }

      // 自动填充缺失的字段
      if (!fixed.englishName)
        fixed.englishName = fixed.title || fixed.name || '';

      return fixed;
    });

    console.log(`✅ 数据验证完成，处理了 ${fixedEvents.length} 个事件`);
    return fixedEvents;
  };

  // 验证和修复事件数据
  const validatedEvents = validateAndFixEvents(events);

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
      saitama: 'from-orange-600 via-amber-500 to-orange-600',
      chiba: 'from-sky-600 via-cyan-500 to-orange-600',
      kanagawa: 'from-blue-600 via-blue-500 to-orange-600',
      kitakanto: 'from-green-600 via-emerald-500 to-orange-600',
      koshinetsu: 'from-purple-600 via-violet-500 to-orange-600',
    };

    return gradients[regionKey as keyof typeof gradients] || gradients.tokyo;
  };

  // ==================== 导航系统 ====================

  const getRegionNavigation = () => {
    // 定义地区循环顺序：东京 → 埼玉 → 千叶 → 神奈川 → 北关东 → 甲信越 → 东京
    const regionCycle = [
      { key: 'tokyo', name: '东京都', emoji: '🗼', url: '/tokyo/momiji' },
      { key: 'saitama', name: '埼玉县', emoji: '🌸', url: '/saitama/momiji' },
      { key: 'chiba', name: '千叶县', emoji: '🌊', url: '/chiba/momiji' },
      {
        key: 'kanagawa',
        name: '神奈川县',
        emoji: '⛵',
        url: '/kanagawa/momiji',
      },
      {
        key: 'kitakanto',
        name: '北关东',
        emoji: '♨️',
        url: '/kitakanto/momiji',
      },
      {
        key: 'koshinetsu',
        name: '甲信越',
        emoji: '🗻',
        url: '/koshinetsu/momiji',
      },
    ];

    // 查找当前地区在循环中的位置
    const currentIndex = regionCycle.findIndex(
      region => region.key === regionKey
    );

    if (currentIndex === -1) {
      // 如果找不到当前地区，返回默认导航（东京为中心）
      return {
        prev: { name: '甲信越', href: '/koshinetsu/momiji', emoji: '🗻' },
        current: { name: '东京都', emoji: '🗼' },
        next: { name: '埼玉县', href: '/saitama/momiji', emoji: '🌸' },
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

  // Features自动图标处理函数 - 红叶狩专用
  const addIconToFeature = (feature: string): string => {
    // 如果已有emoji图标，直接返回
    if (/[\u{1F300}-\u{1F9FF}]/u.test(feature)) return feature;

    // 红叶狩常用关键词-图标映射表
    const iconMappings = [
      // 红叶相关
      { keywords: ['红叶', '枫叶', '紅葉', 'もみじ', 'モミジ'], icon: '🍁' },
      { keywords: ['银杏', '銀杏', 'いちょう', 'イチョウ'], icon: '🍂' },
      { keywords: ['彩叶', '変葉', '色づき'], icon: '🍃' },

      // 观赏期间
      { keywords: ['見頃', '最盛期', '盛期', '最佳观赏'], icon: '⭐' },
      { keywords: ['上旬', '中旬', '下旬'], icon: '📅' },
      { keywords: ['11月', '12月', '10月'], icon: '🗓️' },

      // 场所类型
      { keywords: ['公園', '公园', 'パーク'], icon: '🏞️' },
      { keywords: ['庭園', '庭园', 'ガーデン'], icon: '🌸' },
      { keywords: ['神社', '寺', '寺院'], icon: '⛩️' },
      { keywords: ['山', '山间', '高原', '峠'], icon: '⛰️' },
      { keywords: ['川', '河', '渓谷', '溪谷'], icon: '🌊' },
      { keywords: ['湖', '池', 'ダム'], icon: '🏔️' },

      // 人数/规模
      { keywords: ['万人', '人', '観客', '来場', '游客'], icon: '👥' },
      { keywords: ['大規模', '規模', '大型', '规模'], icon: '📏' },
      { keywords: ['名所', '有名', '著名'], icon: '🌟' },

      // 交通/便利设施
      { keywords: ['駅', '交通', '車站'], icon: '🚂' },
      { keywords: ['バス', '巴士'], icon: '🚌' },
      { keywords: ['駐車場', 'パーキング', '停车'], icon: '🅿️' },

      // 活动/体验
      { keywords: ['ライトアップ', '灯光', '点灯'], icon: '💡' },
      { keywords: ['祭', '祭典', 'フェス'], icon: '🎪' },
      { keywords: ['屋台', '露店', '出店'], icon: '🍭' },
      { keywords: ['グルメ', '食べ物', '美食'], icon: '🍜' },
      { keywords: ['温泉', 'スパ', '温泉街'], icon: '♨️' },

      // 季节特色
      { keywords: ['秋', '秋季', '秋の'], icon: '🍂' },
      { keywords: ['冬', '冬季', '冬の'], icon: '❄️' },
      { keywords: ['夕陽', '夕阳', '夕景'], icon: '🌅' },
      { keywords: ['夜景', '夜間'], icon: '🌃' },

      // 地域特色
      { keywords: ['関東', '首都圏'], icon: '🏙️' },
      { keywords: ['古都', '歴史', '由緒', '历史'], icon: '🏛️' },
      { keywords: ['自然', '大自然', 'ネイチャー'], icon: '🌿' },

      // 费用/便民
      { keywords: ['無料', '入場無料', 'フリー', '免费'], icon: '🎁' },
      { keywords: ['有料', '入場料', 'チケット', '门票'], icon: '🎫' },
      { keywords: ['散歩', '散策', '散步'], icon: '🚶' },
      { keywords: ['ハイキング', '登山', '徒步'], icon: '🥾' },
    ];

    // 遍历映射表，找到第一个匹配的关键词
    for (const mapping of iconMappings) {
      for (const keyword of mapping.keywords) {
        if (feature.includes(keyword)) {
          return `${mapping.icon} ${feature}`;
        }
      }
    }

    // 如果没有匹配到特定图标，使用默认红叶图标
    return `🍁 ${feature}`;
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return '';

    // 检查是否已经包含年份
    if (!dateString.includes('年') && !dateString.includes('2025')) {
      // 如果没有年份，自动添加
      const currentYear = new Date().getFullYear();
      return `${currentYear}年${dateString}`;
    }

    return dateString;
  };

  // ==================== 日期处理系统 ====================

  // 新增：格式化日期范围显示
  const formatDateRange = (
    eventDateStr: string | undefined,
    endDate?: string
  ) => {
    if (!eventDateStr) return '时间待定';

    // 如果有结束日期，显示范围
    if (endDate && endDate !== eventDateStr) {
      return `${formatDate(eventDateStr)} - ${formatDate(endDate)}`;
    }

    // 单个日期或范围描述
    return formatDate(eventDateStr);
  };

  // ==================== 筛选功能 ====================

  // 筛选逻辑 - 与花火模板保持一致
      // 根据日期筛选事件 - 使用统一的时间解析函数
  const filteredEvents = {
    if (!startDate && !endDate) return validatedEvents;

    return validatedEvents.filter(event => {
      // 统一字段优先级：peakTime（coloringStart） → date → dates
      const eventTimeStr = event.peakTime || event.date || event.dates || '';

      // 使用统一的时间解析函数
      const eventComparableDate = parseColoringStartToDate(eventTimeStr);

      // 如果解析失败（返回默认的最晚日期），则保留该事件
      const defaultLatestDate = new Date('2025-12-31');
      if (eventComparableDate.getTime() === defaultLatestDate.getTime())
        return true;

      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      if (start && eventComparableDate < start) return false;
      if (end && eventComparableDate > end) return false;

      return true;
    });
  };

  // ==================== 事件处理 ====================

    // ==================== 时间解析函数 ====================

  // 解析coloringStart字段，转换为标准日期格式进行排序
  const parseColoringStartToDate = (coloringStart: string): Date => {
    if (!coloringStart) return new Date('2025-12-31'); // 默认最晚时间

    // 处理复杂格式："山頂10月上旬、中腹10月中旬、山麓10月下旬" - 取最早时间
    const timeSegments = coloringStart.split(/[、，,]/);
    let earliestDate = new Date('2025-12-31');

    for (const segment of timeSegments) {
      const segmentDate = parseTimeSegment(segment.trim());
      if (segmentDate < earliestDate) {
        earliestDate = segmentDate;
      }
    }

    return earliestDate;
  };

  // 解析单个时间段
  const parseTimeSegment = (timeStr: string): Date => {
    if (!timeStr) return new Date('2025-12-31');

    // 提取年份（如果有）
    const yearMatch = timeStr.match(/(\d{4})年/);
    const year = yearMatch ? parseInt(yearMatch[1]) : 2025;

    // 提取月份
    const monthMatch = timeStr.match(/(\d{1,2})月/);
    if (!monthMatch) return new Date('2025-12-31');
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
      // 优先使用peakTime（即coloringStart），其次使用date/dates
      const coloringStartA = a.peakTime || a.date || a.dates || '';
      const coloringStartB = b.peakTime || b.date || b.dates || '';

      const dateA = parseColoringStartToDate(coloringStartA);
      const dateB = parseColoringStartToDate(coloringStartB);

      return dateA.getTime() - dateB.getTime();
    });
  }, [filteredEvents]);

  // ==================== 渲染组件 ====================

  const navigation = getRegionNavigation();

  // ==================== useEffect: 数据加载记录 ====================
  useEffect(() => {
    console.log(`🍁 狩枫页面模板加载完成`);
    console.log(`📊 地区: ${regionKey}, 活动类型: ${activityKey}`);
    console.log(`📋 事件数量: ${validatedEvents.length}`);
    console.log(`🎨 配色: ${getStandardBackgroundGradient()}`);

    // 调试：显示排序结果
    if (sortedEvents.length > 0) {
      console.log(`📅 时间排序结果 (按coloringStart):`);
      sortedEvents.forEach((event, index) => {
        const coloringStart = event.peakTime || event.date || event.dates || '';
        const parsedDate = parseColoringStartToDate(coloringStart);
        console.log(
          `${index + 1}. ${event.name}: ${coloringStart} → ${parsedDate.toISOString().split('T')[0]}`
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
              className="font-medium transition-colors hover:text-orange-600"
            >
              ⛩️ 首页
            </Link>
            <span className="text-gray-400">›</span>
            <Link
              href={`/${regionKey}` as any}
              className="font-medium transition-colors hover:text-orange-600"
            >
              {region.emoji} {region.displayName}活动
            </Link>
            <span className="text-gray-400">›</span>
            <span className="font-medium text-orange-600">🍂 红叶狩</span>
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
              {pageTitle || `${region.displayName}红叶狩`}
            </h1>
            <span className="ml-4 text-5xl">🍂</span>
          </div>

          <p className="mx-auto max-w-7xl text-lg leading-relaxed text-gray-700 md:text-xl">
            {pageDescription ||
              `体验${region.displayName}最美的红叶景色，感受${region.description}`}
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
                  
                  className="rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div className="flex flex-col items-center gap-2 sm:flex-row">
                <label className="text-sm text-gray-600">结束日期：</label>
                <input
                  type="date"
                  value={endDate}
                  
                  min={startDate}
                  className="rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                />
              </div>
              {(startDate || endDate) && (
                <button
                  }
                  className="rounded-lg bg-orange-600 px-4 py-2 text-white transition-colors hover:bg-orange-700"
                >
                  清除筛选
                </button>
              )}
              <div className="text-sm text-gray-600">
                共找到 {sortedEvents.length} 个红叶观赏地
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 红叶观赏地列表 - 与花火模板保持一致的单列大卡片布局 */}
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
                        
                        {/* VENUE - 举办地点 */}
                        <div className="mb-3 flex items-center text-base text-gray-700 md:text-lg">
                          <span className="mr-2 text-xl">📍</span>
                          <span className="font-medium">
                            {event.venue || event.location}
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
                            className="flex transform items-center gap-2 whitespace-nowrap rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-orange-800 shadow-lg transition-all duration-200 hover:scale-110 hover:bg-orange-100"
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
              探索其他地区红叶狩
            </h3>
          </div>

          {(() => {
            if (!navigation) return null;

            return (
              <div className="flex items-center justify-center space-x-4">
                {/* 上一个地区 */}
                <a
                  href={navigation.prev.href}
                  className="group flex items-center space-x-3 rounded-xl border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-red-100 p-4 shadow-lg transition-all duration-200 hover:scale-105"
                >
                  <div className="text-2xl">{navigation.prev.emoji}</div>
                  <div className="text-left">
                    <div className="text-sm text-orange-700">← 上一个</div>
                    <div className="font-bold text-orange-800 transition-colors group-hover:text-orange-900">
                      {navigation.prev.name}红叶
                    </div>
                  </div>
                </a>

                {/* 当前地区 */}
                <div className="flex items-center space-x-3 rounded-xl border-2 border-orange-300 bg-gradient-to-br from-orange-50 to-amber-100 p-4 shadow-lg">
                  <div className="text-3xl">{navigation.current.emoji}</div>
                  <div className="text-center">
                    <div className="text-sm text-orange-600">当前位置</div>
                    <div className="font-bold text-orange-600">
                      {navigation.current.name}红叶
                    </div>
                  </div>
                </div>

                {/* 下一个地区 */}
                <a
                  href={navigation.next.href}
                  className="group flex items-center space-x-3 rounded-xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-100 p-4 shadow-lg transition-all duration-200 hover:scale-105"
                >
                  <div className="text-2xl">{navigation.next.emoji}</div>
                  <div className="text-right">
                    <div className="text-sm text-amber-700">下一个 →</div>
                    <div className="font-bold text-amber-800 transition-colors group-hover:text-amber-900">
                      {navigation.next.name}红叶
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

export const fetchAndValidateMomijiData = async (
  apiUrl: string
): Promise<MomijiEvent[]> => {
  try {
    console.log(`🔄 开始获取狩枫数据: ${apiUrl}`);
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP错误: ${response.status}`);
    }

    const data = await response.json();
    console.log(`✅ 成功获取 ${data.length} 个狩枫事件`);

    // 这里可以添加数据验证逻辑
    const validatedData = data.map((event: any, index: number) => ({
      id: event.id || `momiji-${index}`,
      title: event.title || event.name || `红叶观赏活动 ${index + 1}`,
      name: event.name || event.title || `红叶观赏活动 ${index + 1}`,
      date: event.date || event.dates || '2025年11月',
      dates: event.dates || event.date || '2025年11月上旬～12月上旬',
      location: event.location || '关东地区',
      highlights: event.highlights || event.features || ['🍁 红叶观赏'],
      features: event.features || event.highlights || ['🍁 红叶观赏'],
      likes: typeof event.likes === 'number' ? event.likes : 0,
      description: event.description || '体验美丽的红叶景色。',
      category: event.category || '红叶观赏',
      viewingPeriod: event.viewingPeriod || '',
      peakTime: event.peakTime || '',
      expectedVisitors: event.expectedVisitors || '',
      venue: event.venue || '',
      detailLink: event.detailLink || '',
    }));

    return validatedData;
  } catch (error) {
    console.error('❌ 获取狩枫数据失败:', error);
    return [];
  }
};
