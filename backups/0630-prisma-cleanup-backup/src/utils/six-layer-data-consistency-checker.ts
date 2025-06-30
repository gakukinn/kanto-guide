/**
 * 六层数据一致性检查系统
 * @description 智能匹配和验证六个数据源的一致性
 * @author AI Assistant
 * @date 2025-01-14
 */

export interface DataSource {
  id: string;
  name: string;
  priority: number; // 1-6, 1最高优先级
  url?: string;
  lastChecked?: string;
  reliability: number; // 0-100%
}

export interface DataField {
  fieldName: string;
  sources: {
    [sourceId: string]: {
      value: string;
      confidence: number; // 0-100%
      lastUpdated: string;
    };
  };
  consensus?: string; // 一致性结果
  conflicts: string[]; // 冲突记录
}

export interface ConsistencyReport {
  eventId: string;
  eventName: string;
  overallConsistency: number; // 0-100%
  fields: DataField[];
  recommendations: string[];
  criticalIssues: string[];
  lastChecked: string;
}

/**
 * 六层数据源定义
 */
export const DATA_SOURCES: DataSource[] = [
  {
    id: 'official_website',
    name: '官方网站',
    priority: 1,
    reliability: 95,
  },
  {
    id: 'walkerplus',
    name: 'WalkerPlus',
    priority: 2,
    reliability: 90,
  },
  {
    id: 'project_database',
    name: '项目数据库',
    priority: 3,
    reliability: 85,
  },
  {
    id: 'three_layer_list',
    name: '三层列表',
    priority: 4,
    reliability: 80,
  },
  {
    id: 'four_layer_details',
    name: '四层详情',
    priority: 5,
    reliability: 75,
  },
  {
    id: 'seo_descriptions',
    name: 'SEO描述',
    priority: 6,
    reliability: 70,
  },
];

/**
 * WalkerPlus智能匹配器
 */
export class WalkerPlusSmartMatcher {
  private walkerPlusDatabase: Map<string, any> = new Map();
  private matchingCache: Map<string, string> = new Map();

  /**
   * 初始化WalkerPlus数据库
   */
  async initializeDatabase() {
    console.log('🔄 初始化WalkerPlus数据库...');

    // 地区代码映射
    const regionCodes = {
      tokyo: 'ar0313',
      saitama: 'ar0311',
      chiba: 'ar0312',
      kanagawa: 'ar0314',
      kitakanto: 'ar0300',
      koshinetsu: 'ar0400',
    };

    // 构建已知的WalkerPlus URL映射
    const knownMappings = await this.extractKnownMappings();
    knownMappings.forEach((url, eventId) => {
      this.matchingCache.set(eventId, url);
    });

    console.log(`✅ 已缓存 ${this.matchingCache.size} 个已知映射`);
  }

  /**
   * 从项目中提取已知的WalkerPlus映射
   */
  private async extractKnownMappings(): Promise<Map<string, string>> {
    const mappings = new Map<string, string>();

    // 这里应该扫描项目文件，提取所有已知的WalkerPlus URL
    // 基于grep搜索结果，我们已经有很多已知映射
    const knownUrls = [
      {
        id: 'sumida-hanabi',
        url: 'https://hanabi.walkerplus.com/detail/ar0313e00797/',
      },
      {
        id: 'katsushika-hanabi',
        url: 'https://hanabi.walkerplus.com/detail/ar0313e00795/',
      },
      {
        id: 'tokyo-keibajo-hanabi',
        url: 'https://hanabi.walkerplus.com/detail/ar0313e436729/',
      },
      // ... 更多映射
    ];

    knownUrls.forEach(item => {
      mappings.set(item.id, item.url);
    });

    return mappings;
  }

  /**
   * 智能匹配项目事件到WalkerPlus页面
   */
  async smartMatch(eventData: any): Promise<string | null> {
    // 1. 检查缓存
    if (this.matchingCache.has(eventData.id)) {
      return this.matchingCache.get(eventData.id)!;
    }

    // 2. 基于标题的模糊匹配
    const titleMatch = await this.fuzzyTitleMatch(eventData.name);
    if (titleMatch) {
      this.matchingCache.set(eventData.id, titleMatch);
      return titleMatch;
    }

    // 3. 基于地点和日期的组合匹配
    const locationDateMatch = await this.locationDateMatch(eventData);
    if (locationDateMatch) {
      this.matchingCache.set(eventData.id, locationDateMatch);
      return locationDateMatch;
    }

    // 4. 降级匹配策略
    const fallbackMatch = await this.fallbackMatch(eventData);
    if (fallbackMatch) {
      this.matchingCache.set(eventData.id, fallbackMatch);
      return fallbackMatch;
    }

    console.warn(`⚠️ 无法匹配事件: ${eventData.name}`);
    return null;
  }

  private async fuzzyTitleMatch(title: string): Promise<string | null> {
    // 实现模糊标题匹配算法
    const normalizedTitle = this.normalizeTitle(title);

    // 这里应该实现与WalkerPlus数据库的模糊匹配
    // 暂时返回null，实际实现需要连接WalkerPlus API或爬虫
    return null;
  }

  private async locationDateMatch(eventData: any): Promise<string | null> {
    // 基于地点和日期的匹配
    return null;
  }

  private async fallbackMatch(eventData: any): Promise<string | null> {
    // 降级匹配策略
    return null;
  }

  private normalizeTitle(title: string): string {
    return title
      .replace(/第\d+回\s?/, '')
      .replace(/\s+/g, '')
      .toLowerCase();
  }
}

/**
 * 六层数据一致性检查器
 */
export class SixLayerConsistencyChecker {
  private matcher: WalkerPlusSmartMatcher;

  constructor() {
    this.matcher = new WalkerPlusSmartMatcher();
  }

  /**
   * 初始化检查器
   */
  async initialize() {
    await this.matcher.initializeDatabase();
  }

  /**
   * 检查单个事件的数据一致性
   */
  async checkEventConsistency(eventData: any): Promise<ConsistencyReport> {
    console.log(`🔍 检查事件一致性: ${eventData.name}`);

    const report: ConsistencyReport = {
      eventId: eventData.id,
      eventName: eventData.name,
      overallConsistency: 0,
      fields: [],
      recommendations: [],
      criticalIssues: [],
      lastChecked: new Date().toISOString(),
    };

    // 关键字段检查
    const keyFields = [
      'name',
      'date',
      'location',
      'officialWebsite',
      'googleMaps',
    ];

    for (const fieldName of keyFields) {
      const fieldReport = await this.checkFieldConsistency(
        eventData,
        fieldName
      );
      report.fields.push(fieldReport);
    }

    // 计算整体一致性
    report.overallConsistency = this.calculateOverallConsistency(report.fields);

    // 生成建议
    report.recommendations = this.generateRecommendations(report);

    // 识别关键问题
    report.criticalIssues = this.identifyCriticalIssues(report);

    return report;
  }

  /**
   * 检查单个字段的一致性
   */
  private async checkFieldConsistency(
    eventData: any,
    fieldName: string
  ): Promise<DataField> {
    const field: DataField = {
      fieldName,
      sources: {},
      conflicts: [],
    };

    // 从各个数据源收集数据
    for (const source of DATA_SOURCES) {
      const value = await this.extractFieldFromSource(
        eventData,
        fieldName,
        source
      );
      if (value) {
        field.sources[source.id] = {
          value,
          confidence: source.reliability,
          lastUpdated: new Date().toISOString(),
        };
      }
    }

    // 分析一致性
    field.consensus = this.determineConsensus(field.sources);
    field.conflicts = this.identifyConflicts(field.sources);

    return field;
  }

  /**
   * 从指定数据源提取字段值
   */
  private async extractFieldFromSource(
    eventData: any,
    fieldName: string,
    source: DataSource
  ): Promise<string | null> {
    switch (source.id) {
      case 'official_website':
        return this.extractFromOfficialWebsite(eventData, fieldName);

      case 'walkerplus':
        return this.extractFromWalkerPlus(eventData, fieldName);

      case 'project_database':
        return eventData[fieldName] || null;

      case 'three_layer_list':
        return this.extractFromThreeLayer(eventData, fieldName);

      case 'four_layer_details':
        return this.extractFromFourLayer(eventData, fieldName);

      case 'seo_descriptions':
        return this.extractFromSEO(eventData, fieldName);

      default:
        return null;
    }
  }

  private async extractFromOfficialWebsite(
    eventData: any,
    fieldName: string
  ): Promise<string | null> {
    // 实现官方网站数据提取
    if (
      eventData.contact?.website &&
      !eventData.contact.website.includes('walkerplus')
    ) {
      // 这里应该实现官方网站爬虫
      return `官方网站数据-${fieldName}`;
    }
    return null;
  }

  private async extractFromWalkerPlus(
    eventData: any,
    fieldName: string
  ): Promise<string | null> {
    const walkerPlusUrl = await this.matcher.smartMatch(eventData);
    if (walkerPlusUrl) {
      // 这里应该实现WalkerPlus数据提取
      return `WalkerPlus数据-${fieldName}`;
    }
    return null;
  }

  private extractFromThreeLayer(
    eventData: any,
    fieldName: string
  ): string | null {
    // 从三层列表数据提取
    return null;
  }

  private extractFromFourLayer(
    eventData: any,
    fieldName: string
  ): string | null {
    // 从四层详情数据提取
    return null;
  }

  private extractFromSEO(eventData: any, fieldName: string): string | null {
    // 从SEO描述提取
    return null;
  }

  /**
   * 确定字段的一致性结果
   */
  private determineConsensus(sources: { [key: string]: any }): string {
    const values = Object.values(sources).map(s => s.value);
    const valueCounts = new Map<string, number>();

    values.forEach(value => {
      valueCounts.set(value, (valueCounts.get(value) || 0) + 1);
    });

    // 返回出现次数最多的值
    let maxCount = 0;
    let consensus = '';

    valueCounts.forEach((count, value) => {
      if (count > maxCount) {
        maxCount = count;
        consensus = value;
      }
    });

    return consensus;
  }

  /**
   * 识别数据冲突
   */
  private identifyConflicts(sources: { [key: string]: any }): string[] {
    const conflicts: string[] = [];
    const values = Object.values(sources);

    for (let i = 0; i < values.length; i++) {
      for (let j = i + 1; j < values.length; j++) {
        if (values[i].value !== values[j].value) {
          conflicts.push(
            `${Object.keys(sources)[i]} vs ${Object.keys(sources)[j]}: "${values[i].value}" vs "${values[j].value}"`
          );
        }
      }
    }

    return conflicts;
  }

  /**
   * 计算整体一致性分数
   */
  private calculateOverallConsistency(fields: DataField[]): number {
    if (fields.length === 0) return 0;

    const consistencyScores = fields.map(field => {
      const sourceCount = Object.keys(field.sources).length;
      const conflictCount = field.conflicts.length;

      if (sourceCount === 0) return 0;
      if (conflictCount === 0) return 100;

      return Math.max(0, 100 - (conflictCount / sourceCount) * 50);
    });

    return Math.round(
      consistencyScores.reduce((a, b) => a + b, 0) / consistencyScores.length
    );
  }

  /**
   * 生成改进建议
   */
  private generateRecommendations(report: ConsistencyReport): string[] {
    const recommendations: string[] = [];

    if (report.overallConsistency < 80) {
      recommendations.push('🔴 数据一致性较低，需要人工验证');
    }

    const conflictFields = report.fields.filter(f => f.conflicts.length > 0);
    if (conflictFields.length > 0) {
      recommendations.push(
        `⚠️ 发现 ${conflictFields.length} 个字段存在冲突，建议优先使用官方网站数据`
      );
    }

    const missingOfficialData = report.fields.filter(
      f => !f.sources.official_website
    );
    if (missingOfficialData.length > 0) {
      recommendations.push('📋 建议补充官方网站数据源');
    }

    return recommendations;
  }

  /**
   * 识别关键问题
   */
  private identifyCriticalIssues(report: ConsistencyReport): string[] {
    const issues: string[] = [];

    // 检查关键字段是否缺失
    const criticalFields = ['name', 'date', 'location'];
    criticalFields.forEach(fieldName => {
      const field = report.fields.find(f => f.fieldName === fieldName);
      if (!field || Object.keys(field.sources).length === 0) {
        issues.push(`❌ 关键字段 ${fieldName} 缺失数据`);
      }
    });

    // 检查数据冲突
    report.fields.forEach(field => {
      if (field.conflicts.length > 2) {
        issues.push(`⚠️ 字段 ${field.fieldName} 存在多个数据源冲突`);
      }
    });

    return issues;
  }

  /**
   * 批量检查多个事件
   */
  async checkMultipleEvents(events: any[]): Promise<ConsistencyReport[]> {
    console.log(`🔍 开始批量检查 ${events.length} 个事件...`);

    const reports: ConsistencyReport[] = [];

    for (const event of events) {
      try {
        const report = await this.checkEventConsistency(event);
        reports.push(report);

        // 添加延迟避免过于频繁的请求
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`检查事件 ${event.name} 时出错:`, error);
      }
    }

    return reports;
  }

  /**
   * 生成一致性检查报告
   */
  generateConsistencyReport(reports: ConsistencyReport[]): string {
    let report = '# 六层数据一致性检查报告\n\n';
    report += `生成时间: ${new Date().toLocaleString('zh-CN')}\n`;
    report += `检查事件数: ${reports.length}\n\n`;

    // 统计信息
    const avgConsistency =
      reports.reduce((sum, r) => sum + r.overallConsistency, 0) /
      reports.length;
    const highConsistency = reports.filter(
      r => r.overallConsistency >= 90
    ).length;
    const mediumConsistency = reports.filter(
      r => r.overallConsistency >= 70 && r.overallConsistency < 90
    ).length;
    const lowConsistency = reports.filter(
      r => r.overallConsistency < 70
    ).length;

    report += `## 📊 统计概览\n`;
    report += `- 平均一致性: ${avgConsistency.toFixed(1)}%\n`;
    report += `- 高一致性 (≥90%): ${highConsistency} 个\n`;
    report += `- 中等一致性 (70-89%): ${mediumConsistency} 个\n`;
    report += `- 低一致性 (<70%): ${lowConsistency} 个\n\n`;

    // 详细报告
    report += `## 📋 详细检查结果\n\n`;
    reports.forEach((eventReport, index) => {
      report += `### ${index + 1}. ${eventReport.eventName}\n`;
      report += `- 一致性分数: ${eventReport.overallConsistency}%\n`;

      if (eventReport.criticalIssues.length > 0) {
        report += `- 关键问题:\n`;
        eventReport.criticalIssues.forEach(issue => {
          report += `  - ${issue}\n`;
        });
      }

      if (eventReport.recommendations.length > 0) {
        report += `- 建议:\n`;
        eventReport.recommendations.forEach(rec => {
          report += `  - ${rec}\n`;
        });
      }

      report += '\n';
    });

    return report;
  }
}

/**
 * 快速一致性检查函数
 */
export async function quickConsistencyCheck(events: any[]): Promise<void> {
  const checker = new SixLayerConsistencyChecker();
  await checker.initialize();

  const reports = await checker.checkMultipleEvents(events);
  const reportText = checker.generateConsistencyReport(reports);

  console.log(reportText);
}
