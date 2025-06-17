/**
 * 花火链接管理器 - 一劳永逸解决链接错误问题
 * @description 自动生成、验证和管理所有花火详情页面链接
 * @author AI Assistant
 * @date 2025-06-14
 */

// 花火详情页面配置接口
interface HanabiDetailPageConfig {
  id: string;
  region: string;
  slug: string;
  officialWebsite?: string;
  walkerPlusUrl?: string;
  isActive: boolean;
  createdDate: string;
}

// 花火详情页面注册表
const HANABI_DETAIL_PAGES: HanabiDetailPageConfig[] = [
  // 甲信越地区
  {
    id: 'agano-gozareya-hanabi-2025',
    region: 'koshinetsu',
    slug: 'agano-gozareya',
    officialWebsite: 'https://hanabi.walkerplus.com/detail/ar0415e00061/',
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0415e00061/',
    isActive: true,
    createdDate: '2025-06-14',
  },
  {
    id: 'ojiya-matsuri-hanabi-2024',
    region: 'koshinetsu',
    slug: 'ojiya-matsuri-hanabi',
    officialWebsite: 'https://hanabi.walkerplus.com/detail/ar0415e00060/',
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0415e00060/',
    isActive: true,
    createdDate: '2025-06-14',
  },
  {
    id: 'yamanakako-houkosai-hanabi',
    region: 'koshinetsu',
    slug: 'yamanakako-houkosai-hanabi',
    officialWebsite: 'https://hanabi.walkerplus.com/detail/ar0419e00075/',
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0419e00075/',
    isActive: true,
    createdDate: '2025-06-14',
  },
];

/**
 * 根据花火ID自动生成详情页面链接
 */
export function generateHanabiDetailLink(hanabiId: string): string | null {
  const config = HANABI_DETAIL_PAGES.find(page => page.id === hanabiId);
  if (!config || !config.isActive) {
    return null;
  }

  return `/${config.region}/hanabi/${config.slug}`;
}

/**
 * 获取花火的官方网站链接
 */
export function getHanabiOfficialWebsite(hanabiId: string): string | null {
  const config = HANABI_DETAIL_PAGES.find(page => page.id === hanabiId);
  return config?.officialWebsite || null;
}

/**
 * 获取花火的WalkerPlus链接
 */
export function getHanabiWalkerPlusUrl(hanabiId: string): string | null {
  const config = HANABI_DETAIL_PAGES.find(page => page.id === hanabiId);
  return config?.walkerPlusUrl || null;
}

/**
 * 注册新的花火详情页面
 */
export function registerHanabiDetailPage(
  config: Omit<HanabiDetailPageConfig, 'createdDate'>
): void {
  const existingIndex = HANABI_DETAIL_PAGES.findIndex(
    page => page.id === config.id
  );

  const newConfig: HanabiDetailPageConfig = {
    ...config,
    createdDate: new Date().toISOString().split('T')[0],
  };

  if (existingIndex >= 0) {
    HANABI_DETAIL_PAGES[existingIndex] = newConfig;
  } else {
    HANABI_DETAIL_PAGES.push(newConfig);
  }
}

/**
 * 获取所有活跃的花火详情页面配置
 */
export function getAllActiveHanabiPages(): HanabiDetailPageConfig[] {
  return HANABI_DETAIL_PAGES.filter(page => page.isActive);
}

/**
 * 验证花火ID是否有对应的详情页面
 */
export function hasHanabiDetailPage(hanabiId: string): boolean {
  const config = HANABI_DETAIL_PAGES.find(page => page.id === hanabiId);
  return config?.isActive === true;
}

/**
 * 获取花火详情页面的完整配置
 */
export function getHanabiPageConfig(
  hanabiId: string
): HanabiDetailPageConfig | null {
  return HANABI_DETAIL_PAGES.find(page => page.id === hanabiId) || null;
}

/**
 * 批量验证花火事件的链接配置
 */
export function validateHanabiEvents(events: any[]): {
  valid: any[];
  invalid: any[];
  warnings: string[];
} {
  const valid: any[] = [];
  const invalid: any[] = [];
  const warnings: string[] = [];

  events.forEach(event => {
    const hasDetailPage = hasHanabiDetailPage(event.id);
    const detailLink = generateHanabiDetailLink(event.id);

    if (event.detailLink && !hasDetailPage) {
      warnings.push(
        `事件 ${event.name} (${event.id}) 设置了detailLink但没有对应的详情页面`
      );
      invalid.push(event);
    } else if (event.detailLink && event.detailLink !== detailLink) {
      warnings.push(
        `事件 ${event.name} (${event.id}) 的detailLink不匹配自动生成的链接`
      );
      invalid.push(event);
    } else if (hasDetailPage && !event.detailLink) {
      warnings.push(
        `事件 ${event.name} (${event.id}) 有详情页面但未设置detailLink`
      );
      invalid.push(event);
    } else {
      valid.push(event);
    }
  });

  return { valid, invalid, warnings };
}

/**
 * 自动修复花火事件的链接配置
 */
export function autoFixHanabiEventLinks(events: any[]): any[] {
  return events.map(event => {
    const detailLink = generateHanabiDetailLink(event.id);
    const officialWebsite = getHanabiOfficialWebsite(event.id);

    return {
      ...event,
      detailLink: detailLink || event.detailLink,
      website: officialWebsite || event.website,
    };
  });
}

/**
 * 生成链接验证报告
 */
export function generateLinkValidationReport(events: any[]): string {
  const validation = validateHanabiEvents(events);

  let report = '# 花火链接验证报告\n\n';
  report += `生成时间: ${new Date().toLocaleString('zh-CN')}\n\n`;

  report += `## 统计信息\n`;
  report += `- 总事件数: ${events.length}\n`;
  report += `- 有效事件: ${validation.valid.length}\n`;
  report += `- 问题事件: ${validation.invalid.length}\n`;
  report += `- 警告数量: ${validation.warnings.length}\n\n`;

  if (validation.warnings.length > 0) {
    report += `## 警告信息\n`;
    validation.warnings.forEach((warning, index) => {
      report += `${index + 1}. ${warning}\n`;
    });
    report += '\n';
  }

  if (validation.invalid.length > 0) {
    report += `## 问题事件详情\n`;
    validation.invalid.forEach(event => {
      report += `### ${event.name} (${event.id})\n`;
      report += `- 当前链接: ${event.detailLink || '未设置'}\n`;
      report += `- 建议链接: ${generateHanabiDetailLink(event.id) || '无详情页面'}\n`;
      report += `- 官方网站: ${getHanabiOfficialWebsite(event.id) || '未配置'}\n\n`;
    });
  }

  report += `## 活跃详情页面\n`;
  getAllActiveHanabiPages().forEach(page => {
    report += `- ${page.id}: /${page.region}/hanabi/${page.slug}\n`;
  });

  return report;
}
