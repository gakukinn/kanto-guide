// 花火详情页模板配置
// 基于Walker Plus官方数据格式标准化

export interface HanabiDetailConfig {
  // 基本信息配置
  template: {
    name: string;
    version: string;
    description: string;
  };

  // 数据源配置
  dataSource: {
    official: string;
    walkerPlusFormat: boolean;
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
      name: string;
      colors: {
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
  };

  // 验证规则
  validation: {
    required: string[];
    timeFormat: RegExp;
    visitorFormat: RegExp;
  };
}

export const hanabiDetailConfig: HanabiDetailConfig = {
  template: {
    name: 'HanabiDetailTemplate',
    version: '2.0.0',
    description: '基于Walker Plus官方格式的花火大会详情页标准模板',
  },

  dataSource: {
    official: 'Walker Plus (hanabi.walkerplus.com)',
    walkerPlusFormat: true,
    requiredFields: ['name', 'date', 'time', 'location', 'description'],
    optionalFields: [
      'fireworksCount',
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
      breadcrumbPath: '/tokyo/hanabi',
      listPagePath: '/tokyo/hanabi',
      backButtonText: '返回东京花火大会列表',
    },
    saitama: {
      name: '埼玉',
      code: 'ar0311',
      breadcrumbPath: '/saitama/hanabi',
      listPagePath: '/saitama/hanabi',
      backButtonText: '返回埼玉花火大会列表',
    },
    chiba: {
      name: '千叶',
      code: 'ar0312',
      breadcrumbPath: '/chiba/hanabi',
      listPagePath: '/chiba/hanabi',
      backButtonText: '返回千叶花火大会列表',
    },
    kanagawa: {
      name: '神奈川',
      code: 'ar0314',
      breadcrumbPath: '/kanagawa/hanabi',
      listPagePath: '/kanagawa/hanabi',
      backButtonText: '返回神奈川花火大会列表',
    },
    kitakanto: {
      name: '北关东',
      code: 'ar0300',
      breadcrumbPath: '/july/hanabi/kitakanto',
      listPagePath: '/july/hanabi/kitakanto',
      backButtonText: '返回北关东花火大会列表',
    },
    koshinetsu: {
      name: '甲信越',
      code: 'ar0400',
      breadcrumbPath: '/july/hanabi/koshinetsu',
      listPagePath: '/july/hanabi/koshinetsu',
      backButtonText: '返回甲信越花火大会列表',
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
    blue: {
      name: '蓝色主题',
      colors: {
        bg50: 'bg-blue-50',
        bg100: 'bg-blue-100',
        bg200: 'bg-blue-200',
        bg500: 'bg-blue-500',
        bg600: 'bg-blue-600',
        text600: 'text-blue-600',
        text700: 'text-blue-700',
        text800: 'text-blue-800',
        border200: 'border-blue-200',
        gradientFrom: 'from-blue-100',
        gradientTo: 'to-blue-200',
      },
    },
    purple: {
      name: '紫色主题',
      colors: {
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
    },
    orange: {
      name: '橙色主题',
      colors: {
        bg50: 'bg-orange-50',
        bg100: 'bg-orange-100',
        bg200: 'bg-orange-200',
        bg500: 'bg-orange-500',
        bg600: 'bg-orange-600',
        text600: 'text-orange-600',
        text700: 'text-orange-700',
        text800: 'text-orange-800',
        border200: 'border-orange-200',
        gradientFrom: 'from-orange-100',
        gradientTo: 'to-orange-200',
      },
    },
    green: {
      name: '绿色主题',
      colors: {
        bg50: 'bg-green-50',
        bg100: 'bg-green-100',
        bg200: 'bg-green-200',
        bg500: 'bg-green-500',
        bg600: 'bg-green-600',
        text600: 'text-green-600',
        text700: 'text-green-700',
        text800: 'text-green-800',
        border200: 'border-green-200',
        gradientFrom: 'from-green-100',
        gradientTo: 'to-green-200',
      },
    },
    red: {
      name: '红色主题',
      colors: {
        bg50: 'bg-red-50',
        bg100: 'bg-red-100',
        bg200: 'bg-red-200',
        bg500: 'bg-red-500',
        bg600: 'bg-red-600',
        text600: 'text-red-600',
        text700: 'text-red-700',
        text800: 'text-red-800',
        border200: 'border-red-200',
        gradientFrom: 'from-red-100',
        gradientTo: 'to-red-200',
      },
    },
    yellow: {
      name: '黄色主题',
      colors: {
        bg50: 'bg-yellow-50',
        bg100: 'bg-yellow-100',
        bg200: 'bg-yellow-200',
        bg500: 'bg-yellow-500',
        bg600: 'bg-yellow-600',
        text600: 'text-yellow-600',
        text700: 'text-yellow-700',
        text800: 'text-yellow-800',
        border200: 'border-yellow-200',
        gradientFrom: 'from-yellow-100',
        gradientTo: 'to-yellow-200',
      },
    },
  },

  validation: {
    required: ['name', 'date', 'time', 'venues'],
    // 删除日期格式验证，支持ISO格式用于筛选器
    timeFormat: /\d{1,2}:\d{2}/, // 只要包含时间格式即可，支持多会场
    visitorFormat: /约?\d+[万千]?人?/,
  },
};

// 获取区域配置的辅助函数
export function getRegionConfig(regionKey: string) {
  return (
    hanabiDetailConfig.regions[regionKey] || hanabiDetailConfig.regions.tokyo
  );
}

// 获取主题颜色的辅助函数
export function getThemeColors(themeKey: string) {
  const theme =
    hanabiDetailConfig.themes[themeKey] || hanabiDetailConfig.themes.blue;
  return theme.colors;
}

// 验证数据格式的辅助函数
export function validateHanabiData(data: any): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // 检查必需字段
  hanabiDetailConfig.validation.required.forEach(field => {
    if (!data[field]) {
      errors.push(`缺少必需字段: ${field}`);
    }
  });

  // 日期格式验证已删除，支持ISO格式用于筛选器

  // 检查时间格式
  if (data.time && !hanabiDetailConfig.validation.timeFormat.test(data.time)) {
    errors.push(`时间格式不正确: ${data.time}`);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
