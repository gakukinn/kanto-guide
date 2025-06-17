/**
 * 数据准确性分析工具
 * 基于无网络依赖检查结果，提供具体的修正建议
 *
 * 商业要求：确保信息准确性是基本前提
 */

const fs = require('fs');
const path = require('path');

class DataAccuracyAnalyzer {
  constructor() {
    this.reportPath = path.join(
      __dirname,
      '../reports/web-free-consistency-reports/latest-web-free-consistency-report.json'
    );
    this.outputDir = path.join(__dirname, '../reports/accuracy-analysis');

    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  /**
   * 加载最新的一致性检查报告
   */
  loadConsistencyReport() {
    try {
      const reportData = fs.readFileSync(this.reportPath, 'utf8');
      return JSON.parse(reportData);
    } catch (error) {
      console.error(`❌ 读取报告失败: ${error.message}`);
      return null;
    }
  }

  /**
   * 分析数据准确性问题
   */
  analyzeAccuracyIssues(report) {
    const analysis = {
      criticalIssues: [],
      highPriorityIssues: [],
      mediumPriorityIssues: [],
      summary: {
        totalEvents: report.summary.totalEvents,
        poorConsistency: report.summary.poorConsistency,
        fairConsistency: report.summary.fairConsistency,
        criticalCount: 0,
        highPriorityCount: 0,
        mediumPriorityCount: 0,
      },
    };

    report.results.forEach(result => {
      const issues = this.categorizeEventIssues(result);

      if (issues.critical.length > 0) {
        analysis.criticalIssues.push({
          eventId: result.eventId,
          eventName: result.eventName,
          issues: issues.critical,
          recommendations: this.generateSpecificRecommendations(
            result,
            'critical'
          ),
        });
        analysis.summary.criticalCount++;
      }

      if (issues.high.length > 0) {
        analysis.highPriorityIssues.push({
          eventId: result.eventId,
          eventName: result.eventName,
          issues: issues.high,
          recommendations: this.generateSpecificRecommendations(result, 'high'),
        });
        analysis.summary.highPriorityCount++;
      }

      if (issues.medium.length > 0) {
        analysis.mediumPriorityIssues.push({
          eventId: result.eventId,
          eventName: result.eventName,
          issues: issues.medium,
          recommendations: this.generateSpecificRecommendations(
            result,
            'medium'
          ),
        });
        analysis.summary.mediumPriorityCount++;
      }
    });

    return analysis;
  }

  /**
   * 分类活动的问题
   */
  categorizeEventIssues(result) {
    const issues = {
      critical: [],
      high: [],
      medium: [],
    };

    // 关键问题：数据一致性极差
    if (result.overallConsistency === 'poor') {
      if (result.dateConsistency.consistencyScore < 0.5) {
        issues.critical.push({
          type: 'date_inconsistency',
          description: '日期信息严重不一致',
          details: {
            consistencyScore: result.dateConsistency.consistencyScore,
            conflicts: result.dateConsistency.conflicts,
            mostCommon: result.dateConsistency.mostCommon,
          },
        });
      }

      if (result.locationConsistency.consistencyScore < 0.5) {
        issues.critical.push({
          type: 'location_inconsistency',
          description: '地点信息严重不一致',
          details: {
            consistencyScore: result.locationConsistency.consistencyScore,
            conflicts: result.locationConsistency.conflicts,
            mostCommon: result.locationConsistency.mostCommon,
          },
        });
      }
    }

    // 高优先级问题：数据质量较低
    if (result.dataQualityScore < 0.7) {
      issues.high.push({
        type: 'low_data_quality',
        description: '数据质量较低',
        details: {
          score: result.dataQualityScore,
          missingHighQualitySources: this.identifyMissingQualitySources(result),
        },
      });
    }

    // 中等优先级问题：链接问题
    if (result.linkAvailability.completeness < 1.0) {
      issues.medium.push({
        type: 'incomplete_links',
        description: '外部链接不完整',
        details: {
          completeness: result.linkAvailability.completeness,
          missingLinks: this.identifyMissingLinks(result),
        },
      });
    }

    return issues;
  }

  /**
   * 识别缺失的高质量数据源
   */
  identifyMissingQualitySources(result) {
    const missing = [];

    const hasOfficialData = result.dataSources.some(
      s => s.source === 'official_website_link' && s.status === 'available'
    );

    const hasWalkerPlusData = result.dataSources.some(
      s => s.source === 'walkerplus_link' && s.status === 'available'
    );

    if (!hasOfficialData) {
      missing.push('official_website');
    }

    if (!hasWalkerPlusData) {
      missing.push('walkerplus');
    }

    return missing;
  }

  /**
   * 识别缺失的链接
   */
  identifyMissingLinks(result) {
    const missing = [];

    if (!result.linkAvailability.officialWebsite.available) {
      missing.push('official_website');
    }

    if (!result.linkAvailability.walkerPlus.available) {
      missing.push('walkerplus');
    }

    return missing;
  }

  /**
   * 生成具体的修正建议
   */
  generateSpecificRecommendations(result, priority) {
    const recommendations = [];

    if (priority === 'critical') {
      // 关键问题的具体修正建议
      if (result.dateConsistency.consistencyScore < 0.9) {
        const detailSource = result.dataSources.find(
          s => s.source === 'four_layer_detail'
        );
        if (detailSource && detailSource.date) {
          recommendations.push({
            action: 'update_date_consistency',
            description: `统一所有数据源的日期为: ${detailSource.date}`,
            files: this.getFilesToUpdate(result, 'date'),
            priority: 'immediate',
          });
        }
      }

      if (result.locationConsistency.consistencyScore < 0.9) {
        const detailSource = result.dataSources.find(
          s => s.source === 'four_layer_detail'
        );
        if (detailSource && detailSource.location) {
          recommendations.push({
            action: 'update_location_consistency',
            description: `统一所有数据源的地点为: ${detailSource.location}`,
            files: this.getFilesToUpdate(result, 'location'),
            priority: 'immediate',
          });
        }
      }
    }

    if (priority === 'high') {
      // 高优先级问题的建议
      recommendations.push({
        action: 'verify_external_sources',
        description: '核实官方网站和WalkerPlus的最新信息',
        urls: [
          result.linkAvailability.officialWebsite.url,
          result.linkAvailability.walkerPlus.url,
        ].filter(url => url && url.length > 0),
        priority: 'within_24_hours',
      });
    }

    return recommendations;
  }

  /**
   * 获取需要更新的文件列表
   */
  getFilesToUpdate(result, field) {
    const files = [];

    result.dataSources.forEach(source => {
      if (source.file && source.file !== 'config') {
        files.push({
          path: source.file,
          source: source.source,
          currentValue: source[field] || '',
          needsUpdate: true,
        });
      }
    });

    return files;
  }

  /**
   * 生成修正计划
   */
  generateCorrectionPlan(analysis) {
    const plan = {
      immediate: [],
      within24Hours: [],
      within1Week: [],
      summary: {
        totalActions: 0,
        immediateActions: 0,
        urgentActions: 0,
        plannedActions: 0,
      },
    };

    // 处理关键问题
    analysis.criticalIssues.forEach(issue => {
      issue.recommendations.forEach(rec => {
        if (rec.priority === 'immediate') {
          plan.immediate.push({
            eventId: issue.eventId,
            eventName: issue.eventName,
            action: rec.action,
            description: rec.description,
            files: rec.files || [],
            estimatedTime: '15-30分钟',
          });
          plan.summary.immediateActions++;
        }
      });
    });

    // 处理高优先级问题
    analysis.highPriorityIssues.forEach(issue => {
      issue.recommendations.forEach(rec => {
        if (rec.priority === 'within_24_hours') {
          plan.within24Hours.push({
            eventId: issue.eventId,
            eventName: issue.eventName,
            action: rec.action,
            description: rec.description,
            urls: rec.urls || [],
            estimatedTime: '30-60分钟',
          });
          plan.summary.urgentActions++;
        }
      });
    });

    // 处理中等优先级问题
    analysis.mediumPriorityIssues.forEach(issue => {
      plan.within1Week.push({
        eventId: issue.eventId,
        eventName: issue.eventName,
        issues: issue.issues.map(i => i.description),
        estimatedTime: '15-30分钟',
      });
      plan.summary.plannedActions++;
    });

    plan.summary.totalActions =
      plan.summary.immediateActions +
      plan.summary.urgentActions +
      plan.summary.plannedActions;

    return plan;
  }

  /**
   * 生成详细的分析报告
   */
  generateAnalysisReport(analysis, plan) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

    const report = {
      generatedAt: new Date().toISOString(),
      analysis: analysis,
      correctionPlan: plan,
      businessImpact: this.assessBusinessImpact(analysis),
      nextSteps: this.generateNextSteps(plan),
    };

    // 保存报告
    const reportFile = path.join(
      this.outputDir,
      `accuracy-analysis-${timestamp}.json`
    );
    fs.writeFileSync(reportFile, JSON.stringify(report, null, 2), 'utf8');

    const latestReportFile = path.join(
      this.outputDir,
      'latest-accuracy-analysis.json'
    );
    fs.writeFileSync(latestReportFile, JSON.stringify(report, null, 2), 'utf8');

    console.log(`📊 数据准确性分析报告已生成: ${reportFile}`);

    return report;
  }

  /**
   * 评估商业影响
   */
  assessBusinessImpact(analysis) {
    const impact = {
      severity: 'medium',
      affectedEvents:
        analysis.summary.criticalCount + analysis.summary.highPriorityCount,
      potentialIssues: [],
      recommendedActions: [],
    };

    if (analysis.summary.criticalCount > 0) {
      impact.severity = 'high';
      impact.potentialIssues.push('用户可能获得错误的日期或地点信息');
      impact.potentialIssues.push('影响用户体验和网站可信度');
      impact.recommendedActions.push('立即修正关键数据不一致问题');
    }

    if (analysis.summary.highPriorityCount > 0) {
      impact.potentialIssues.push('缺少权威数据源验证');
      impact.recommendedActions.push('24小时内核实外部数据源');
    }

    return impact;
  }

  /**
   * 生成下一步行动计划
   */
  generateNextSteps(plan) {
    const steps = [];

    if (plan.summary.immediateActions > 0) {
      steps.push({
        step: 1,
        action: '立即修正关键数据不一致',
        description: `修正 ${plan.summary.immediateActions} 个关键问题`,
        timeframe: '立即执行',
        priority: 'critical',
      });
    }

    if (plan.summary.urgentActions > 0) {
      steps.push({
        step: steps.length + 1,
        action: '核实外部数据源',
        description: `验证 ${plan.summary.urgentActions} 个活动的官方信息`,
        timeframe: '24小时内',
        priority: 'high',
      });
    }

    if (plan.summary.plannedActions > 0) {
      steps.push({
        step: steps.length + 1,
        action: '完善数据完整性',
        description: `改善 ${plan.summary.plannedActions} 个活动的数据质量`,
        timeframe: '1周内',
        priority: 'medium',
      });
    }

    return steps;
  }

  /**
   * 显示分析结果
   */
  displayAnalysis(report) {
    console.log('\n📊 数据准确性分析报告');
    console.log('='.repeat(80));

    console.log(`\n🚨 问题概览:`);
    console.log(`   关键问题: ${report.analysis.summary.criticalCount} 个活动`);
    console.log(
      `   高优先级问题: ${report.analysis.summary.highPriorityCount} 个活动`
    );
    console.log(
      `   中等优先级问题: ${report.analysis.summary.mediumPriorityCount} 个活动`
    );

    console.log(`\n📋 修正计划:`);
    console.log(
      `   立即执行: ${report.correctionPlan.summary.immediateActions} 项任务`
    );
    console.log(
      `   24小时内: ${report.correctionPlan.summary.urgentActions} 项任务`
    );
    console.log(
      `   1周内: ${report.correctionPlan.summary.plannedActions} 项任务`
    );

    console.log(`\n💼 商业影响:`);
    console.log(`   严重程度: ${report.businessImpact.severity.toUpperCase()}`);
    console.log(`   受影响活动: ${report.businessImpact.affectedEvents} 个`);

    console.log(`\n🎯 下一步行动:`);
    report.nextSteps.forEach(step => {
      console.log(
        `   ${step.step}. [${step.priority.toUpperCase()}] ${step.action}`
      );
      console.log(`      ${step.description} (${step.timeframe})`);
    });

    if (report.correctionPlan.immediate.length > 0) {
      console.log(`\n🚨 立即需要修正的问题:`);
      report.correctionPlan.immediate.forEach((item, index) => {
        console.log(`   ${index + 1}. ${item.eventName}`);
        console.log(`      问题: ${item.description}`);
        console.log(`      预计时间: ${item.estimatedTime}`);
      });
    }

    console.log('\n' + '='.repeat(80));
    console.log('✅ 数据准确性分析完成');
  }
}

// 主执行函数
async function main() {
  console.log('🎯 数据准确性分析工具');
  console.log('📊 基于无网络依赖检查结果，提供具体修正建议');
  console.log('⚠️  商业要求: 信息准确性是基本前提\n');

  const analyzer = new DataAccuracyAnalyzer();

  try {
    // 加载一致性检查报告
    const consistencyReport = analyzer.loadConsistencyReport();
    if (!consistencyReport) {
      console.error('❌ 无法加载一致性检查报告');
      return;
    }

    console.log(
      `📋 已加载 ${consistencyReport.summary.totalEvents} 个活动的检查结果`
    );

    // 分析准确性问题
    const analysis = analyzer.analyzeAccuracyIssues(consistencyReport);

    // 生成修正计划
    const plan = analyzer.generateCorrectionPlan(analysis);

    // 生成分析报告
    const report = analyzer.generateAnalysisReport(analysis, plan);

    // 显示结果
    analyzer.displayAnalysis(report);

    console.log('\n🎉 数据准确性分析任务完成!');
    console.log('💾 详细报告已保存到 reports/accuracy-analysis/ 目录');
  } catch (error) {
    console.error(`❌ 分析失败: ${error.message}`);
    process.exit(1);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { DataAccuracyAnalyzer };
