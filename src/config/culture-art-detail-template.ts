// 文化艺术详情页模板配置
// 基于官方数据格式标准化

export interface CultureArtDetailConfig {
  // 基本信息配置
  template: {
    name: string;
    version: string;
    description: string;
  };

  // 数据源配置
  dataSource: {
    official: string;
    requiredFields: string[];
    optionalFields: string[];
  };

  // 区域配置
  regions: {
    [key: string]: {
      name: string;
      code: string;
      breadcrumbPath: string;
      listPagePath: string;
      backButtonText: string;
    };
  };

  // 布局配置
  layout: {
    maxWidth: string;
    sections: string[];
    responsive: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
  };

  // 颜色主题配置
  themes: {
    [key: string]: {
      bg50: string;
      bg100: string;
      bg200: string;
      bg500: string;
      bg600: string;
      text600: string;
      text700: string;
      text800: string;
      border200: string;
      gradientFrom: string;
      gradientTo: string;
    };
  };

  // 验证规则
  validation: {
    required: string[];
    timeFormat: RegExp;
    visitorFormat: RegExp;
  };
}

export const cultureArtDetailConfig: CultureArtDetailConfig = {
  template: {
    name: 'CultureArtDetailTemplate',
    version: '1.0.0',
    description: '文化艺术活动详情页标准模板',
  },

  dataSource: {
    official: '官方文化艺术机构',
    requiredFields: ['name', 'date', 'time', 'location', 'description'],
    optionalFields: [
      'artType',
      'expectedVisitors',
      'ticketPrice',
      'access',
      'viewingSpots',
    ],
  },

  regions: {
    tokyo: {
      name: '东京',
      code: 'ar0313',
      breadcrumbPath: '/tokyo/culture-art',
      listPagePath: '/tokyo/culture-art',
      backButtonText: '返回东京文化艺术活动列表',
    },
    saitama: {
      name: '埼玉',
      code: 'ar0311',
      breadcrumbPath: '/saitama/culture-art',
      listPagePath: '/saitama/culture-art',
      backButtonText: '返回埼玉文化艺术活动列表',
    },
    chiba: {
      name: '千叶',
      code: 'ar0312',
      breadcrumbPath: '/chiba/culture-art',
      listPagePath: '/chiba/culture-art',
      backButtonText: '返回千叶文化艺术活动列表',
    },
    kanagawa: {
      name: '神奈川',
      code: 'ar0314',
      breadcrumbPath: '/kanagawa/culture-art',
      listPagePath: '/kanagawa/culture-art',
      backButtonText: '返回神奈川文化艺术活动列表',
    },
    kitakanto: {
      name: '北关东',
      code: 'ar0300',
      breadcrumbPath: '/july/culture-art/kitakanto',
      listPagePath: '/july/culture-art/kitakanto',
      backButtonText: '返回北关东文化艺术活动列表',
    },
    koshinetsu: {
      name: '甲信越',
      code: 'ar0400',
      breadcrumbPath: '/july/culture-art/koshinetsu',
      listPagePath: '/july/culture-art/koshinetsu',
      backButtonText: '返回甲信越文化艺术活动列表',
    },
  },

  layout: {
    maxWidth: 'max-w-6xl',
    sections: [
      'hero',
      'basic-info',
      'tabs-navigation',
      'content-area',
      'recommendations',
    ],
    responsive: {
      mobile: 'px-4',
      tablet: 'sm:px-6',
      desktop: 'lg:px-8',
    },
  },

  themes: {
    purple: {
      bg50: 'bg-purple-50',
      bg100: 'bg-purple-100',
      bg200: 'bg-purple-200',
      bg500: 'bg-purple-500',
      bg600: 'bg-purple-600',
      text600: 'text-purple-600',
      text700: 'text-purple-700',
      text800: 'text-purple-800',
      border200: 'border-purple-200',
      gradientFrom: 'from-purple-100',
      gradientTo: 'to-purple-200',
    },
    indigo: {
      bg50: 'bg-indigo-50',
      bg100: 'bg-indigo-100',
      bg200: 'bg-indigo-200',
      bg500: 'bg-indigo-500',
      bg600: 'bg-indigo-600',
      text600: 'text-indigo-600',
      text700: 'text-indigo-700',
      text800: 'text-indigo-800',
      border200: 'border-indigo-200',
      gradientFrom: 'from-indigo-100',
      gradientTo: 'to-indigo-200',
    },
    emerald: {
      bg50: 'bg-emerald-50',
      bg100: 'bg-emerald-100',
      bg200: 'bg-emerald-200',
      bg500: 'bg-emerald-500',
      bg600: 'bg-emerald-600',
      text600: 'text-emerald-600',
      text700: 'text-emerald-700',
      text800: 'text-emerald-800',
      border200: 'border-emerald-200',
      gradientFrom: 'from-emerald-100',
      gradientTo: 'to-emerald-200',
    },
    rose: {
      bg50: 'bg-rose-50',
      bg100: 'bg-rose-100',
      bg200: 'bg-rose-200',
      bg500: 'bg-rose-500',
      bg600: 'bg-rose-600',
      text600: 'text-rose-600',
      text700: 'text-rose-700',
      text800: 'text-rose-800',
      border200: 'border-rose-200',
      gradientFrom: 'from-rose-100',
      gradientTo: 'to-rose-200',
    },
    amber: {
      bg50: 'bg-amber-50',
      bg100: 'bg-amber-100',
      bg200: 'bg-amber-200',
      bg500: 'bg-amber-500',
      bg600: 'bg-amber-600',
      text600: 'text-amber-600',
      text700: 'text-amber-700',
      text800: 'text-amber-800',
      border200: 'border-amber-200',
      gradientFrom: 'from-amber-100',
      gradientTo: 'to-amber-200',
    },
    teal: {
      bg50: 'bg-teal-50',
      bg100: 'bg-teal-100',
      bg200: 'bg-teal-200',
      bg500: 'bg-teal-500',
      bg600: 'bg-teal-600',
      text600: 'text-teal-600',
      text700: 'text-teal-700',
      text800: 'text-teal-800',
      border200: 'border-teal-200',
      gradientFrom: 'from-teal-100',
      gradientTo: 'to-teal-200',
    },
  },

  validation: {
    required: ['name', 'date', 'time', 'artType'],
    timeFormat: /^\d{1,2}:\d{2}$/,
    visitorFormat: /^[\d,]+人?$/,
  },
};

// 获取区域配置
export function getRegionConfig(regionKey: string) {
  return (
    cultureArtDetailConfig.regions[regionKey] ||
    cultureArtDetailConfig.regions.tokyo
  );
}

// 获取主题颜色
export function getThemeColors(themeKey: string) {
  return (
    cultureArtDetailConfig.themes[themeKey] ||
    cultureArtDetailConfig.themes.purple
  );
}

// 验证文化艺术数据
export function validateCultureArtData(data: any): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  const config = cultureArtDetailConfig;

  // 检查必需字段
  config.validation.required.forEach(field => {
    if (!data[field]) {
      errors.push(`缺少必需字段: ${field}`);
    }
  });

  // 检查时间格式
  if (data.time && !config.validation.timeFormat.test(data.time)) {
    errors.push('时间格式不正确，应为 HH:MM 格式');
  }

  // 检查预期参观者格式
  if (
    data.expectedVisitors &&
    !config.validation.visitorFormat.test(data.expectedVisitors)
  ) {
    errors.push('预期参观者格式不正确');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
