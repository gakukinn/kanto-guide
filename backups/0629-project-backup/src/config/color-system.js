// 关东地区统一配色系统
// 规则：页面背景 = 地区色 + 活动色渐变
// 地区色：来自各地区页面的快速导航卡片背景色（2层）
// 活动色：来自各地区页面的活动卡片背景色（2层）

export const REGION_COLORS = {
  // 关东核心地区 - 基于实际地区页面配色
  tokyo: {
    name: '东京',
    emoji: '🗼',
    regionColor: 'from-red-50 to-rose-100', // 东京地区色（来自tokyo/page.tsx）
    activityColor: 'from-blue-50 to-blue-100', // 花火活动色（来自花火卡片）
    pageBackground: 'from-red-50 to-blue-50', // 组合：东京色 + 花火色
    textColor: 'red',
    borderColor: 'red-200',
  },

  saitama: {
    name: '埼玉',
    emoji: '🏢',
    regionColor: 'from-slate-50 to-gray-100', // 埼玉地区色（来自saitama/page.tsx）
    activityColor: 'from-blue-50 to-blue-100', // 花火活动色
    pageBackground: 'from-slate-50 to-blue-50', // 组合：埼玉色 + 花火色
    textColor: 'slate',
    borderColor: 'slate-200',
  },

  chiba: {
    name: '千叶',
    emoji: '🌊',
    regionColor: 'from-sky-50 to-cyan-100', // 千叶地区色（来自chiba/page.tsx）
    activityColor: 'from-blue-50 to-blue-100', // 花火活动色
    pageBackground: 'from-sky-50 to-blue-50', // 组合：千叶色 + 花火色
    textColor: 'sky',
    borderColor: 'sky-200',
  },

  kanagawa: {
    name: '神奈川',
    emoji: '⛵',
    regionColor: 'from-blue-100 to-blue-200', // 神奈川地区色（来自kanagawa/page.tsx）
    activityColor: 'from-blue-50 to-blue-100', // 花火活动色
    pageBackground: 'from-blue-100 to-blue-50', // 组合：神奈川色 + 花火色
    textColor: 'blue',
    borderColor: 'blue-200',
  },

  gunma: {
    name: '群马',
    emoji: '♨️',
    regionColor: 'from-orange-100 to-orange-200', // 群马地区色
    activityColor: 'from-blue-50 to-blue-100', // 花火活动色
    pageBackground: 'from-orange-100 to-blue-50', // 组合：群马色 + 花火色
    textColor: 'orange',
    borderColor: 'orange-200',
  },

  tochigi: {
    name: '栃木',
    emoji: '🥟',
    regionColor: 'from-green-100 to-green-200', // 栃木地区色
    activityColor: 'from-blue-50 to-blue-100', // 花火活动色
    pageBackground: 'from-green-100 to-blue-50', // 组合：栃木色 + 花火色
    textColor: 'green',
    borderColor: 'green-200',
  },

  ibaraki: {
    name: '茨城',
    emoji: '🌻',
    regionColor: 'from-yellow-100 to-yellow-200', // 茨城地区色
    activityColor: 'from-blue-50 to-blue-100', // 花火活动色
    pageBackground: 'from-yellow-100 to-blue-50', // 组合：茨城色 + 花火色
    textColor: 'yellow',
    borderColor: 'yellow-200',
  },
};

// 活动类型配色
export const ACTIVITY_COLORS = {
  hanabi: {
    name: '花火大会',
    emoji: '🎆',
    color: 'from-blue-50 to-blue-100',
    textColor: 'blue',
    borderColor: 'blue-200',
  },
  festival: {
    name: '祭典',
    emoji: '🏮',
    color: 'from-purple-50 to-purple-100',
    textColor: 'purple',
    borderColor: 'purple-200',
  },
  seasonal: {
    name: '季节活动',
    emoji: '🌸',
    color: 'from-pink-50 to-pink-100',
    textColor: 'pink',
    borderColor: 'pink-200',
  },
};

// 获取地区配色
export function getRegionColors(regionKey) {
  const config = REGION_COLORS[regionKey];
  if (!config) {
    console.warn(`未找到地区配色: ${regionKey}`);
    return REGION_COLORS.tokyo; // 默认使用东京配色
  }
  return config;
}

// 获取活动页面背景色（地区色 + 活动色组合）
export function getActivityPageBackground(regionKey, activityType = 'hanabi') {
  const regionConfig = getRegionColors(regionKey);
  const activityConfig = ACTIVITY_COLORS[activityType];

  // 返回预定义的组合背景色
  return regionConfig.pageBackground;
}

// 获取活动卡片配色
export function getActivityCardColors(activityType = 'hanabi') {
  const config = ACTIVITY_COLORS[activityType];
  return {
    background: config.color,
    textColor: config.textColor,
    borderColor: config.borderColor,
  };
}

// 验证配色一致性
export function validateColorConsistency() {
  const errors = [];

  Object.entries(REGION_COLORS).forEach(([key, config]) => {
    // 检查必要属性
    const requiredFields = [
      'name',
      'emoji',
      'regionColor',
      'activityColor',
      'pageBackground',
      'textColor',
      'borderColor',
    ];
    requiredFields.forEach(field => {
      if (!config[field]) {
        errors.push(`${key} 缺少 ${field} 配置`);
      }
    });

    // 检查背景色组合是否符合规则：地区色起始 + 活动色结束
    // 地区色起始：from-red-50 to-rose-100 → red-50
    const regionStartMatch = config.regionColor.match(/from-([^-\s]+-\d+)/);
    // 活动色结束：from-blue-50 to-blue-100 → blue-50（取活动色的结束色）
    const activityEndMatch = config.activityColor.match(/to-([^-\s]+-\d+)/);

    if (regionStartMatch && activityEndMatch) {
      const regionStart = regionStartMatch[1];
      const activityEnd = activityEndMatch[1];
      const expectedBg = `from-${regionStart} to-${activityEnd}`;

      // 页面背景应该是：地区色起始 + 活动色结束
      if (config.pageBackground !== expectedBg) {
        errors.push(
          `${key} 背景色组合错误: 期望 ${expectedBg}, 实际 ${config.pageBackground}`
        );
      }
    }
  });

  return errors;
}

// 生成样式类名
export function generateStyleClasses(regionKey, activityType = 'hanabi') {
  const regionConfig = getRegionColors(regionKey);
  const activityConfig = getActivityCardColors(activityType);

  return {
    pageBackground: `bg-gradient-to-br ${regionConfig.pageBackground}`,
    regionCard: `bg-gradient-to-br ${regionConfig.regionColor} border-2 border-${regionConfig.borderColor}/60`,
    activityCard: `bg-gradient-to-r ${activityConfig.background} border-2 border-${activityConfig.borderColor}`,
    textPrimary: `text-${regionConfig.textColor}-600`,
    textSecondary: `text-${regionConfig.textColor}-700`,
    border: `border-${regionConfig.borderColor}`,
    hover: `hover:text-${regionConfig.textColor}-600`,
    focus: `focus:ring-${regionConfig.textColor}-500 focus:border-${regionConfig.textColor}-500`,
    button: `bg-${regionConfig.textColor}-500 hover:bg-${regionConfig.textColor}-600`,
  };
}
