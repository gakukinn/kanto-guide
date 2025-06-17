/**
 * 六层数据一致性检查演示
 * @description 演示如何使用WalkerPlus映射数据进行六层数据源一致性验证
 * @author AI Assistant
 * @date 2025-01-14
 */

const fs = require('fs').promises;
const path = require('path');

class SixLayerConsistencyDemo {
  constructor() {
    this.walkerPlusMappings = new Map();
    this.consistencyReports = [];
  }

  /**
   * 初始化演示
   */
  async initialize() {
    console.log('🔄 初始化六层数据一致性检查演示...');

    // 加载WalkerPlus映射数据
    await this.loadWalkerPlusMappings();

    console.log(`✅ 已加载 ${this.walkerPlusMappings.size} 个WalkerPlus映射`);
  }

  /**
   * 加载WalkerPlus映射数据
   */
  async loadWalkerPlusMappings() {
    try {
      const mappingPath = path.join(
        process.cwd(),
        'data',
        'walkerplus-url-mappings.json'
      );
      const mappingData = JSON.parse(await fs.readFile(mappingPath, 'utf8'));

      Object.entries(mappingData.mappings).forEach(([code, mapping]) => {
        this.walkerPlusMappings.set(code, mapping);
      });
    } catch (error) {
      console.error('加载WalkerPlus映射数据失败:', error.message);
    }
  }

  /**
   * 演示六层数据源一致性检查
   */
  async demonstrateConsistencyCheck() {
    console.log('\n🎯 开始六层数据一致性检查演示...');

    // 模拟项目中的花火事件数据
    const sampleEvents = [
      {
        id: 'sumida-hanabi-2025',
        name: '第48回 隅田川花火大会',
        date: '2025年7月26日',
        location: '隅田川（台东区・墨田区）',
        officialWebsite: 'https://www.sumidagawa-hanabi.com/',
        walkerPlusCode: 'ar0313e00797',
        region: '东京',
      },
      {
        id: 'katsushika-hanabi-2025',
        name: '第59回葛饰纳凉花火大会',
        date: '2025年7月22日',
        location: '葛饰区柴又野球场',
        officialWebsite: 'https://www.katsushika-hanabi.jp/',
        walkerPlusCode: 'ar0313e00795',
        region: '东京',
      },
      {
        id: 'niigata-matsuri-hanabi-2025',
        name: '新潟祭花火大会',
        date: '2025年8月10日',
        location: '新潟市信浓川河畔',
        officialWebsite: 'https://www.niigata-matsuri.com/',
        walkerPlusCode: 'ar0415e00666',
        region: '新潟',
      },
    ];

    // 对每个事件进行六层一致性检查
    for (const event of sampleEvents) {
      const report = await this.checkEventConsistency(event);
      this.consistencyReports.push(report);
    }

    // 生成综合报告
    const summaryReport = this.generateSummaryReport();
    console.log('\n📊 六层数据一致性检查完成!');
    console.log(summaryReport);

    // 保存报告
    await this.saveReports();
  }

  /**
   * 检查单个事件的六层数据一致性
   */
  async checkEventConsistency(eventData) {
    console.log(`\n🔍 检查事件: ${eventData.name}`);

    const report = {
      eventId: eventData.id,
      eventName: eventData.name,
      region: eventData.region,
      checkedAt: new Date().toISOString(),
      layers: {},
      overallScore: 0,
      issues: [],
      recommendations: [],
    };

    // 六层数据源检查
    const layers = [
      { id: 'official_website', name: '官方网站', priority: 1 },
      { id: 'walkerplus', name: 'WalkerPlus', priority: 2 },
      { id: 'project_database', name: '项目数据库', priority: 3 },
      { id: 'three_layer_list', name: '三层列表', priority: 4 },
      { id: 'four_layer_details', name: '四层详情', priority: 5 },
      { id: 'seo_descriptions', name: 'SEO描述', priority: 6 },
    ];

    for (const layer of layers) {
      const layerResult = await this.checkDataLayer(eventData, layer);
      report.layers[layer.id] = layerResult;

      console.log(
        `  ${layer.name}: ${layerResult.status} (${layerResult.score}%)`
      );
    }

    // 计算整体分数
    report.overallScore = this.calculateOverallScore(report.layers);

    // 识别问题和建议
    report.issues = this.identifyIssues(report.layers);
    report.recommendations = this.generateRecommendations(report);

    console.log(`  整体一致性: ${report.overallScore}%`);

    return report;
  }

  /**
   * 检查单个数据层
   */
  async checkDataLayer(eventData, layer) {
    let result = {
      layerId: layer.id,
      layerName: layer.name,
      priority: layer.priority,
      status: 'unknown',
      score: 0,
      dataFound: false,
      conflicts: [],
      notes: '',
    };

    switch (layer.id) {
      case 'official_website':
        result = await this.checkOfficialWebsite(eventData, result);
        break;

      case 'walkerplus':
        result = await this.checkWalkerPlus(eventData, result);
        break;

      case 'project_database':
        result = await this.checkProjectDatabase(eventData, result);
        break;

      case 'three_layer_list':
        result = await this.checkThreeLayerList(eventData, result);
        break;

      case 'four_layer_details':
        result = await this.checkFourLayerDetails(eventData, result);
        break;

      case 'seo_descriptions':
        result = await this.checkSEODescriptions(eventData, result);
        break;
    }

    return result;
  }

  /**
   * 检查官方网站数据
   */
  async checkOfficialWebsite(eventData, result) {
    if (
      eventData.officialWebsite &&
      !eventData.officialWebsite.includes('walkerplus')
    ) {
      result.dataFound = true;
      result.status = 'available';
      result.score = 95; // 官方网站最高可信度
      result.notes = '官方网站数据可用，优先级最高';
    } else {
      result.status = 'missing';
      result.score = 0;
      result.notes = '缺少官方网站数据源';
    }

    return result;
  }

  /**
   * 检查WalkerPlus数据
   */
  async checkWalkerPlus(eventData, result) {
    if (
      eventData.walkerPlusCode &&
      this.walkerPlusMappings.has(eventData.walkerPlusCode)
    ) {
      const mapping = this.walkerPlusMappings.get(eventData.walkerPlusCode);
      result.dataFound = true;
      result.status = 'available';
      result.score = 90; // WalkerPlus高可信度
      result.notes = `WalkerPlus数据可用: ${mapping.url}`;

      // 检查名称一致性
      if (mapping.eventName && mapping.eventName !== eventData.name) {
        result.conflicts.push(
          `名称不一致: "${eventData.name}" vs "${mapping.eventName}"`
        );
        result.score -= 10;
      }
    } else {
      result.status = 'missing';
      result.score = 0;
      result.notes = 'WalkerPlus映射未找到';
    }

    return result;
  }

  /**
   * 检查项目数据库
   */
  async checkProjectDatabase(eventData, result) {
    // 模拟项目数据库检查
    result.dataFound = true;
    result.status = 'available';
    result.score = 85;
    result.notes = '项目数据库中存在该事件';

    return result;
  }

  /**
   * 检查三层列表数据
   */
  async checkThreeLayerList(eventData, result) {
    // 模拟三层列表检查
    result.dataFound = true;
    result.status = 'available';
    result.score = 80;
    result.notes = '三层列表中包含该事件';

    return result;
  }

  /**
   * 检查四层详情数据
   */
  async checkFourLayerDetails(eventData, result) {
    // 模拟四层详情检查
    result.dataFound = true;
    result.status = 'available';
    result.score = 75;
    result.notes = '四层详情页面存在';

    return result;
  }

  /**
   * 检查SEO描述数据
   */
  async checkSEODescriptions(eventData, result) {
    // 模拟SEO描述检查
    result.dataFound = true;
    result.status = 'available';
    result.score = 70;
    result.notes = 'SEO描述已优化';

    return result;
  }

  /**
   * 计算整体分数
   */
  calculateOverallScore(layers) {
    const scores = Object.values(layers).map(layer => layer.score);
    const weights = Object.values(layers).map(layer => 7 - layer.priority); // 优先级越高权重越大

    let weightedSum = 0;
    let totalWeight = 0;

    for (let i = 0; i < scores.length; i++) {
      weightedSum += scores[i] * weights[i];
      totalWeight += weights[i];
    }

    return Math.round(weightedSum / totalWeight);
  }

  /**
   * 识别问题
   */
  identifyIssues(layers) {
    const issues = [];

    Object.values(layers).forEach(layer => {
      if (layer.status === 'missing') {
        issues.push(`${layer.layerName}数据缺失`);
      }

      if (layer.conflicts.length > 0) {
        issues.push(
          `${layer.layerName}存在数据冲突: ${layer.conflicts.join(', ')}`
        );
      }

      if (layer.score < 50) {
        issues.push(`${layer.layerName}数据质量较低 (${layer.score}%)`);
      }
    });

    return issues;
  }

  /**
   * 生成建议
   */
  generateRecommendations(report) {
    const recommendations = [];

    if (report.overallScore < 80) {
      recommendations.push('🔴 整体数据一致性较低，需要人工审核');
    }

    if (!report.layers.official_website.dataFound) {
      recommendations.push('📋 建议补充官方网站数据源');
    }

    if (!report.layers.walkerplus.dataFound) {
      recommendations.push('🔗 建议添加WalkerPlus数据源映射');
    }

    const conflictLayers = Object.values(report.layers).filter(
      l => l.conflicts.length > 0
    );
    if (conflictLayers.length > 0) {
      recommendations.push('⚠️ 发现数据冲突，建议优先使用高优先级数据源');
    }

    return recommendations;
  }

  /**
   * 生成综合报告
   */
  generateSummaryReport() {
    const totalEvents = this.consistencyReports.length;
    const avgScore =
      this.consistencyReports.reduce((sum, r) => sum + r.overallScore, 0) /
      totalEvents;

    const highQuality = this.consistencyReports.filter(
      r => r.overallScore >= 90
    ).length;
    const mediumQuality = this.consistencyReports.filter(
      r => r.overallScore >= 70 && r.overallScore < 90
    ).length;
    const lowQuality = this.consistencyReports.filter(
      r => r.overallScore < 70
    ).length;

    let report = '\n📊 六层数据一致性检查综合报告\n';
    report += '='.repeat(50) + '\n';
    report += `检查事件数: ${totalEvents}\n`;
    report += `平均一致性分数: ${avgScore.toFixed(1)}%\n\n`;

    report += '📈 质量分布:\n';
    report += `  高质量 (≥90%): ${highQuality} 个\n`;
    report += `  中等质量 (70-89%): ${mediumQuality} 个\n`;
    report += `  低质量 (<70%): ${lowQuality} 个\n\n`;

    report += '🔍 详细结果:\n';
    this.consistencyReports.forEach((eventReport, index) => {
      report += `${index + 1}. ${eventReport.eventName} (${eventReport.region})\n`;
      report += `   一致性分数: ${eventReport.overallScore}%\n`;

      if (eventReport.issues.length > 0) {
        report += `   问题: ${eventReport.issues.slice(0, 2).join(', ')}\n`;
      }

      if (eventReport.recommendations.length > 0) {
        report += `   建议: ${eventReport.recommendations[0]}\n`;
      }

      report += '\n';
    });

    return report;
  }

  /**
   * 保存报告
   */
  async saveReports() {
    try {
      const reportData = {
        metadata: {
          generatedAt: new Date().toISOString(),
          totalEvents: this.consistencyReports.length,
          version: '1.0.0',
        },
        summary: {
          averageScore:
            this.consistencyReports.reduce(
              (sum, r) => sum + r.overallScore,
              0
            ) / this.consistencyReports.length,
          highQuality: this.consistencyReports.filter(r => r.overallScore >= 90)
            .length,
          mediumQuality: this.consistencyReports.filter(
            r => r.overallScore >= 70 && r.overallScore < 90
          ).length,
          lowQuality: this.consistencyReports.filter(r => r.overallScore < 70)
            .length,
        },
        reports: this.consistencyReports,
      };

      const outputPath = path.join(
        process.cwd(),
        'data',
        'six-layer-consistency-report.json'
      );
      await fs.writeFile(
        outputPath,
        JSON.stringify(reportData, null, 2),
        'utf8'
      );

      console.log(`💾 六层一致性检查报告已保存到: ${outputPath}`);
    } catch (error) {
      console.error('保存报告失败:', error.message);
    }
  }
}

/**
 * 主函数
 */
async function main() {
  console.log('🚀 六层数据一致性检查演示启动...');

  try {
    const demo = new SixLayerConsistencyDemo();

    // 初始化
    await demo.initialize();

    // 演示一致性检查
    await demo.demonstrateConsistencyCheck();

    console.log('\n✅ 六层数据一致性检查演示完成!');
    console.log('💡 这个系统可以帮助解决WalkerPlus数据源匹配的挑战');
    console.log('🎯 通过智能映射和多层验证，确保数据的准确性和一致性');
  } catch (error) {
    console.error('❌ 演示过程中出现错误:', error);
    throw error;
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  SixLayerConsistencyDemo,
  main,
};
