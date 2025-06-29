/**
 * 数据存储自动化决策配置
 * 目的：让AI助手自动选择数据存储格式，无需询问用户
 * 适用：非技术用户的项目管理
 */

export interface DataStorageRule {
  pattern: string;
  storageType: 'sqlite' | 'json';
  reason: string;
  autoPath: string;
}

/**
 * 自动化存储决策规则
 * AI必须按照这些规则自动选择，不得询问用户
 */
export const AUTO_STORAGE_RULES: DataStorageRule[] = [
  // 花火数据 - 复杂关系，自动选择SQLite
  {
    pattern: '*hanabi*',
    storageType: 'sqlite',
    reason:
      '花火数据包含多个关联表（基本信息、场地、交通、观赏点等），需要关系型数据库',
    autoPath: 'data/databases/{name}-hanabi-{year}.db',
  },

  // 花见数据 - 简单列表，自动选择JSON
  {
    pattern: '*hanami*',
    storageType: 'json',
    reason: '花见数据结构简单（地区→景点列表），适合JSON格式',
    autoPath: 'data/{region}-hanami.json',
  },

  // 祭典数据 - 简单列表，自动选择JSON
  {
    pattern: '*matsuri*',
    storageType: 'json',
    reason: '祭典数据结构相对简单，适合JSON格式存储',
    autoPath: 'data/{region}-matsuri.json',
  },

  // 红叶数据 - 简单列表，自动选择JSON
  {
    pattern: '*momiji*',
    storageType: 'json',
    reason: '红叶数据结构简单，适合JSON格式',
    autoPath: 'data/{region}-momiji.json',
  },

  // 夜景数据 - 简单列表，自动选择JSON
  {
    pattern: '*illumination*',
    storageType: 'json',
    reason: '夜景数据结构简单，适合JSON格式',
    autoPath: 'data/{region}-illumination.json',
  },

  // 文化艺术活动 - 简单列表，自动选择JSON
  {
    pattern: '*culture*',
    storageType: 'json',
    reason: '文化艺术活动数据结构简单，适合JSON格式存储',
    autoPath: 'data/{region}-culture-activities.json',
  },

  // 验证数据 - 复杂关系，自动选择SQLite
  {
    pattern: '*validation*',
    storageType: 'sqlite',
    reason: '验证数据需要记录详细的对比和历史信息，需要关系型数据库',
    autoPath: 'src/database/{name}-validation.db',
  },

  // 配置文件 - 自动选择JSON
  {
    pattern: '*config*',
    storageType: 'json',
    reason: '配置数据适合人类可读的JSON格式',
    autoPath: 'src/config/{name}.json',
  },
];

/**
 * 自动选择存储格式
 * @param dataName 数据名称
 * @param dataDescription 数据描述
 * @returns 自动选择的存储配置
 */
export function autoSelectStorageType(
  dataName: string,
  dataDescription?: string
): {
  storageType: 'sqlite' | 'json';
  reason: string;
  suggestedPath: string;
  rule: DataStorageRule;
} {
  const lowerName = dataName.toLowerCase();
  const lowerDesc = dataDescription?.toLowerCase() || '';

  // 匹配规则
  for (const rule of AUTO_STORAGE_RULES) {
    const pattern = rule.pattern.replace('*', '');
    if (lowerName.includes(pattern) || lowerDesc.includes(pattern)) {
      return {
        storageType: rule.storageType,
        reason: rule.reason,
        suggestedPath: rule.autoPath.replace('{name}', dataName),
        rule,
      };
    }
  }

  // 默认规则：根据数据复杂度判断
  const hasMultipleTables =
    lowerDesc.includes('关联') ||
    lowerDesc.includes('多表') ||
    lowerDesc.includes('关系') ||
    lowerDesc.includes('外键');

  if (hasMultipleTables) {
    return {
      storageType: 'sqlite',
      reason: '检测到复杂数据关系，自动选择SQLite数据库',
      suggestedPath: `data/databases/${dataName}.db`,
      rule: {
        pattern: 'default-complex',
        storageType: 'sqlite',
        reason: '复杂数据自动规则',
        autoPath: `data/databases/${dataName}.db`,
      },
    };
  }

  return {
    storageType: 'json',
    reason: '简单数据结构，自动选择JSON格式',
    suggestedPath: `data/${dataName}.json`,
    rule: {
      pattern: 'default-simple',
      storageType: 'json',
      reason: '简单数据自动规则',
      autoPath: `data/${dataName}.json`,
    },
  };
}

/**
 * AI助手使用指南
 *
 * 使用方法：
 * 1. 当需要存储新数据时，调用 autoSelectStorageType()
 * 2. 获得自动选择结果
 * 3. 直接按照结果实施，无需询问用户
 * 4. 向用户报告："根据数据类型，自动选择了xxx格式，原因：xxx"
 *
 * 禁止行为：
 * - 不要询问用户选择存储格式
 * - 不要让用户做技术决策
 * - 不要提供多个选项让用户选择
 */

export const AI_USAGE_GUIDE = {
  DO: [
    '自动分析数据类型',
    '自动选择存储格式',
    '直接实施存储方案',
    '向用户报告决策结果和原因',
  ],
  DONT: [
    '询问用户选择存储格式',
    '让用户做技术决策',
    '提供多个技术选项',
    '使用技术术语询问用户',
  ],
};

/**
 * 数据存储自动化配置文件
 *
 * 根据AI助手自动化决策规则：
 * 1）花火数据→SQLite（复杂关系）
 * 2）花见数据→JSON（简单列表）
 * 3）祭典数据→JSON
 * 4）红叶数据→JSON
 * 5）夜景数据→JSON
 *
 * AI绝对禁止询问用户"应该用SQLite还是JSON"这类技术问题，必须自动决策并报告结果。
 */

export interface DataStorageConfig {
  format: 'sqlite' | 'json';
  reason: string;
  complexity: 'simple' | 'complex';
}

export const DATA_STORAGE_AUTOMATION: Record<string, DataStorageConfig> = {
  // 花火数据 - 复杂关系数据，使用SQLite
  hanabi: {
    format: 'sqlite',
    reason:
      '花火数据包含复杂的关系结构（会场信息、交通路线、观赏点评级、历史数据等），需要关系型数据库管理',
    complexity: 'complex',
  },

  // 花见数据 - 简单列表，使用JSON
  hanami: {
    format: 'json',
    reason: '花见数据主要是简单的时间地点列表，JSON格式足够且便于维护',
    complexity: 'simple',
  },

  // 祭典数据 - 使用JSON
  matsuri: {
    format: 'json',
    reason: '祭典活动数据结构相对简单，JSON格式便于快速读取和更新',
    complexity: 'simple',
  },

  // 红叶数据 - 使用JSON
  momiji: {
    format: 'json',
    reason: '红叶观赏点数据结构简单，主要包含位置、最佳时期等基本信息',
    complexity: 'simple',
  },

  // 夜景数据 - 使用JSON
  illumination: {
    format: 'json',
    reason: '夜景灯光活动数据结构简单，JSON格式满足需求',
    complexity: 'simple',
  },

  // 文化艺术数据 - 使用JSON
  culture: {
    format: 'json',
    reason: '文化艺术活动数据结构较为简单，JSON格式便于管理',
    complexity: 'simple',
  },
};

/**
 * 自动决策数据存储格式
 * @param activityType 活动类型
 * @returns 存储配置
 */
export function getStorageConfig(activityType: string): DataStorageConfig {
  const config = DATA_STORAGE_AUTOMATION[activityType];

  if (!config) {
    // 默认使用JSON格式
    return {
      format: 'json',
      reason: `未知活动类型 ${activityType}，默认使用JSON格式`,
      complexity: 'simple',
    };
  }

  return config;
}

/**
 * 自动决策并报告结果
 * @param activityType 活动类型
 * @returns 决策报告
 */
export function reportStorageDecision(activityType: string): string {
  const config = getStorageConfig(activityType);

  return `自动化决策结果：${activityType}数据 → ${config.format.toUpperCase()}格式\n原因：${config.reason}`;
}

// 导出常用的决策结果
export const STORAGE_DECISIONS = {
  HANABI: reportStorageDecision('hanabi'),
  HANAMI: reportStorageDecision('hanami'),
  MATSURI: reportStorageDecision('matsuri'),
  MOMIJI: reportStorageDecision('momiji'),
  ILLUMINATION: reportStorageDecision('illumination'),
  CULTURE: reportStorageDecision('culture'),
};
