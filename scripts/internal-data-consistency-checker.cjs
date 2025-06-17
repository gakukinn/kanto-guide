/**
 * 项目内部6处数据源一致性检查系统
 * 专注于检查项目内部文件中的数据一致性
 * 商业要求：确保日期、地点信息在6处数据源中完全一致
 *
 * 6处数据源：
 * 1. 官方网站链接（记录在页面中）
 * 2. WalkerPlus链接（记录在页面中）
 * 3. 项目数据库（data文件）
 * 4. 三层列表（汇总信息）
 * 5. 四层详情（详细描述）
 * 6. SEO描述（搜索优化）
 */

const fs = require('fs');
const path = require('path');

class InternalDataConsistencyChecker {
  constructor() {
    this.results = [];
    this.outputDir = path.join(
      __dirname,
      '../reports/internal-consistency-reports'
    );

    // 确保输出目录存在
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  /**
   * 提取日期信息的标准化方法
   */
  extractDateFromText(text) {
    if (!text) return '';

    const datePatterns = [
      /\d{4}年\d{1,2}月\d{1,2}日/, // 2025年8月15日
      /\d{1,2}月\d{1,2}日/, // 8月15日
      /\d{4}-\d{2}-\d{2}/, // 2025-08-15
      /\d{1,2}\/\d{1,2}/, // 8/15
      /\d{4}年\d{1,2}月\d{1,2}日\(\w\)/, // 2025年8月15日(土)
      /\d{1,2}月\d{1,2}日-\d{1,2}日/, // 8月15日-16日
    ];

    for (const pattern of datePatterns) {
      const match = text.match(pattern);
      if (match) {
        return match[0];
      }
    }

    return text.trim();
  }

  /**
   * 提取地点信息的标准化方法
   */
  extractLocationFromText(text) {
    if (!text) return '';

    const locationPatterns = [
      /([^、。\n]+(?:県|市|町|村|区)[^、。\n]*)/,
      /([^、。\n]+(?:公園|会場|広場|河川|湖|海岸|神社|寺|駅)[^、。\n]*)/,
      /([^、。\n]+(?:河川敷|運動場|球場|グラウンド)[^、。\n]*)/,
    ];

    for (const pattern of locationPatterns) {
      const match = text.match(pattern);
      if (match) return match[1].trim();
    }

    return text.trim();
  }

  /**
   * 从四层详情页面获取数据
   */
  getFourLayerDetailData(detailPagePath) {
    try {
      if (fs.existsSync(detailPagePath)) {
        const content = fs.readFileSync(detailPagePath, 'utf8');

        // 提取各种数据
        const dateMatch = content.match(/date:\s*['"`]([^'"`]+)['"`]/);
        const locationMatch = content.match(/location:\s*['"`]([^'"`]+)['"`]/);
        const venueMatch = content.match(/name:\s*['"`]([^'"`]+)['"`]/);

        // 提取官方网站和WalkerPlus链接
        const officialUrlMatch = content.match(
          /website:\s*['"`]([^'"`]+)['"`]/
        );
        const walkerPlusMatch = content.match(
          /walkerPlusUrl:\s*['"`]([^'"`]+)['"`]/
        );

        return {
          date: dateMatch ? dateMatch[1] : '',
          location: locationMatch
            ? locationMatch[1]
            : venueMatch
              ? venueMatch[1]
              : '',
          officialUrl: officialUrlMatch ? officialUrlMatch[1] : '',
          walkerPlusUrl: walkerPlusMatch ? walkerPlusMatch[1] : '',
          source: 'four_layer_detail',
          file: detailPagePath,
          extractedAt: new Date().toISOString(),
        };
      }

      return null;
    } catch (error) {
      console.error(`❌ 四层详情数据获取失败: ${error.message}`);
      return null;
    }
  }

  /**
   * 从SEO描述获取数据
   */
  getSEODescriptionData(detailPagePath) {
    try {
      if (fs.existsSync(detailPagePath)) {
        const content = fs.readFileSync(detailPagePath, 'utf8');

        // 从SEO元数据提取数据
        const descriptionMatch = content.match(
          /description:\s*['"`]([^'"`]+)['"`]/
        );
        const titleMatch = content.match(/title:\s*['"`]([^'"`]+)['"`]/);

        if (descriptionMatch || titleMatch) {
          const description = descriptionMatch ? descriptionMatch[1] : '';
          const title = titleMatch ? titleMatch[1] : '';
          const combinedText = `${title} ${description}`;

          return {
            date: this.extractDateFromText(combinedText),
            location: this.extractLocationFromText(combinedText),
            source: 'seo_description',
            file: detailPagePath,
            extractedAt: new Date().toISOString(),
          };
        }
      }

      return null;
    } catch (error) {
      console.error(`❌ SEO描述数据获取失败: ${error.message}`);
      return null;
    }
  }

  /**
   * 从三层列表获取数据
   */
  getThreeLayerListData(regionPath) {
    try {
      const listPagePath = `src/app/${regionPath}/hanabi/page.tsx`;

      if (fs.existsSync(listPagePath)) {
        const content = fs.readFileSync(listPagePath, 'utf8');

        // 从列表页面提取数据
        const descriptionMatch = content.match(
          /description:\s*['"`]([^'"`]+)['"`]/
        );

        if (descriptionMatch) {
          const description = descriptionMatch[1];
          return {
            date: this.extractDateFromText(description),
            location: this.extractLocationFromText(description),
            source: 'three_layer_list',
            file: listPagePath,
            extractedAt: new Date().toISOString(),
          };
        }
      }

      return null;
    } catch (error) {
      console.error(`❌ 三层列表数据获取失败: ${error.message}`);
      return null;
    }
  }

  /**
   * 从项目数据文件获取数据
   */
  getProjectDataFileData(eventId, regionPath) {
    try {
      // 可能的数据文件路径
      const possiblePaths = [
        `src/data/hanabi/${regionPath}/level4-august-${eventId}-hanabi.ts`,
        `src/data/hanabi/${regionPath}/level4-july-hanabi-${eventId}.ts`,
        `src/data/hanabi/${regionPath}/level4-september-${eventId}-hanabi.ts`,
        `src/data/hanabi/${regionPath}/level4-october-${eventId}-hanabi.ts`,
        `src/data/hanabi/${regionPath}/${eventId}-data.ts`,
      ];

      for (const filePath of possiblePaths) {
        if (fs.existsSync(filePath)) {
          const content = fs.readFileSync(filePath, 'utf8');

          // 提取日期和地点信息
          const dateMatch = content.match(/date:\s*['"`]([^'"`]+)['"`]/);
          const locationMatch = content.match(
            /location:\s*['"`]([^'"`]+)['"`]/
          );

          return {
            date: dateMatch ? dateMatch[1] : '',
            location: locationMatch ? locationMatch[1] : '',
            source: 'project_data_file',
            file: filePath,
            extractedAt: new Date().toISOString(),
          };
        }
      }

      return null;
    } catch (error) {
      console.error(`❌ 项目数据文件获取失败: ${error.message}`);
      return null;
    }
  }

  /**
   * 检查单个活动的数据一致性
   */
  checkEventConsistency(eventConfig) {
    console.log(`🔍 检查活动: ${eventConfig.name}`);

    const dataSources = [];

    // 1. 四层详情数据（包含官方网站和WalkerPlus链接信息）
    const detailData = this.getFourLayerDetailData(eventConfig.detailPagePath);
    if (detailData) {
      dataSources.push(detailData);

      // 记录官方网站和WalkerPlus链接
      if (detailData.officialUrl) {
        dataSources.push({
          date: '链接记录',
          location: '链接记录',
          url: detailData.officialUrl,
          source: 'official_website_link',
          file: eventConfig.detailPagePath,
          extractedAt: new Date().toISOString(),
        });
      }

      if (detailData.walkerPlusUrl) {
        dataSources.push({
          date: '链接记录',
          location: '链接记录',
          url: detailData.walkerPlusUrl,
          source: 'walkerplus_link',
          file: eventConfig.detailPagePath,
          extractedAt: new Date().toISOString(),
        });
      }
    }

    // 2. SEO描述数据
    const seoData = this.getSEODescriptionData(eventConfig.detailPagePath);
    if (seoData) dataSources.push(seoData);

    // 3. 三层列表数据
    const listData = this.getThreeLayerListData(eventConfig.regionPath);
    if (listData) dataSources.push(listData);

    // 4. 项目数据文件数据
    const projectData = this.getProjectDataFileData(
      eventConfig.id,
      eventConfig.regionPath
    );
    if (projectData) dataSources.push(projectData);

    // 分析一致性
    const consistencyResult = this.analyzeConsistency(eventConfig, dataSources);

    return consistencyResult;
  }

  /**
   * 分析数据一致性
   */
  analyzeConsistency(eventConfig, dataSources) {
    const result = {
      eventId: eventConfig.id,
      eventName: eventConfig.name,
      totalSources: dataSources.length,
      dataSources: dataSources,
      dateConsistency: this.checkFieldConsistency(dataSources, 'date'),
      locationConsistency: this.checkFieldConsistency(dataSources, 'location'),
      overallConsistency: 'pending',
      issues: [],
      recommendations: [],
      hasOfficialWebsite: dataSources.some(
        s => s.source === 'official_website_link'
      ),
      hasWalkerPlusLink: dataSources.some(s => s.source === 'walkerplus_link'),
    };

    // 计算总体一致性
    const dateScore = result.dateConsistency.consistencyScore;
    const locationScore = result.locationConsistency.consistencyScore;
    const overallScore = (dateScore + locationScore) / 2;

    if (overallScore >= 0.9) {
      result.overallConsistency = 'excellent';
    } else if (overallScore >= 0.7) {
      result.overallConsistency = 'good';
    } else if (overallScore >= 0.5) {
      result.overallConsistency = 'fair';
    } else {
      result.overallConsistency = 'poor';
    }

    // 生成问题和建议
    if (result.dateConsistency.consistencyScore < 0.9) {
      result.issues.push('日期信息在多个数据源中不一致');
      result.recommendations.push('请核实四层详情页面和SEO描述中的日期信息');
    }

    if (result.locationConsistency.consistencyScore < 0.9) {
      result.issues.push('地点信息在多个数据源中不一致');
      result.recommendations.push('请统一地点表述格式');
    }

    if (!result.hasOfficialWebsite) {
      result.issues.push('缺少官方网站链接');
      result.recommendations.push('请添加官方网站链接以提高数据权威性');
    }

    if (!result.hasWalkerPlusLink) {
      result.issues.push('缺少WalkerPlus链接');
      result.recommendations.push('请添加WalkerPlus链接以便数据验证');
    }

    return result;
  }

  /**
   * 检查特定字段的一致性
   */
  checkFieldConsistency(dataSources, fieldName) {
    // 过滤掉链接记录和空值
    const values = dataSources
      .filter(source => source[fieldName] && source[fieldName] !== '链接记录')
      .map(source => source[fieldName])
      .filter(v => v && v.trim().length > 0);

    if (values.length === 0) {
      return {
        field: fieldName,
        consistencyScore: 0,
        uniqueValues: [],
        mostCommon: null,
        conflicts: [],
        totalValues: 0,
      };
    }

    // 统计值的出现频率
    const valueCount = {};
    values.forEach(value => {
      valueCount[value] = (valueCount[value] || 0) + 1;
    });

    const uniqueValues = Object.keys(valueCount);
    const mostCommon = uniqueValues.reduce((a, b) =>
      valueCount[a] > valueCount[b] ? a : b
    );

    // 计算一致性分数
    const consistencyScore = valueCount[mostCommon] / values.length;

    // 识别冲突
    const conflicts =
      uniqueValues.length > 1 ? uniqueValues.filter(v => v !== mostCommon) : [];

    return {
      field: fieldName,
      consistencyScore,
      uniqueValues,
      mostCommon,
      conflicts,
      totalValues: values.length,
    };
  }

  /**
   * 批量检查多个活动
   */
  checkMultipleEvents(eventConfigs) {
    console.log(
      `🚀 开始批量检查 ${eventConfigs.length} 个活动的内部数据一致性`
    );

    const results = [];

    for (const eventConfig of eventConfigs) {
      try {
        const result = this.checkEventConsistency(eventConfig);
        results.push(result);
      } catch (error) {
        console.error(
          `❌ 检查活动 ${eventConfig.name} 时出错: ${error.message}`
        );
      }
    }

    return results;
  }

  /**
   * 生成一致性报告
   */
  generateReport(results) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

    // 统计信息
    const stats = {
      totalEvents: results.length,
      excellentConsistency: results.filter(
        r => r.overallConsistency === 'excellent'
      ).length,
      goodConsistency: results.filter(r => r.overallConsistency === 'good')
        .length,
      fairConsistency: results.filter(r => r.overallConsistency === 'fair')
        .length,
      poorConsistency: results.filter(r => r.overallConsistency === 'poor')
        .length,
      hasOfficialWebsite: results.filter(r => r.hasOfficialWebsite).length,
      hasWalkerPlusLink: results.filter(r => r.hasWalkerPlusLink).length,
    };

    const report = {
      generatedAt: new Date().toISOString(),
      summary: stats,
      results: results,
      recommendations: this.generateGlobalRecommendations(results),
    };

    // 保存详细报告
    const reportFile = path.join(
      this.outputDir,
      `internal-consistency-report-${timestamp}.json`
    );
    fs.writeFileSync(reportFile, JSON.stringify(report, null, 2), 'utf8');

    // 保存最新报告
    const latestReportFile = path.join(
      this.outputDir,
      'latest-internal-consistency-report.json'
    );
    fs.writeFileSync(latestReportFile, JSON.stringify(report, null, 2), 'utf8');

    console.log(`📊 内部一致性报告已生成: ${reportFile}`);

    return report;
  }

  /**
   * 生成全局建议
   */
  generateGlobalRecommendations(results) {
    const recommendations = [];

    const poorResults = results.filter(r => r.overallConsistency === 'poor');
    if (poorResults.length > 0) {
      recommendations.push({
        priority: 'high',
        category: '数据质量',
        message: `${poorResults.length} 个活动的数据一致性较差，需要立即修正`,
        affectedEvents: poorResults.map(r => r.eventId),
      });
    }

    const dateIssues = results.filter(
      r => r.dateConsistency.consistencyScore < 0.9
    );
    if (dateIssues.length > 0) {
      recommendations.push({
        priority: 'high',
        category: '日期一致性',
        message: `${dateIssues.length} 个活动存在日期不一致问题`,
        affectedEvents: dateIssues.map(r => r.eventId),
      });
    }

    const locationIssues = results.filter(
      r => r.locationConsistency.consistencyScore < 0.9
    );
    if (locationIssues.length > 0) {
      recommendations.push({
        priority: 'medium',
        category: '地点一致性',
        message: `${locationIssues.length} 个活动存在地点表述不一致问题`,
        affectedEvents: locationIssues.map(r => r.eventId),
      });
    }

    const missingOfficial = results.filter(r => !r.hasOfficialWebsite);
    if (missingOfficial.length > 0) {
      recommendations.push({
        priority: 'medium',
        category: '官方网站链接',
        message: `${missingOfficial.length} 个活动缺少官方网站链接`,
        affectedEvents: missingOfficial.map(r => r.eventId),
      });
    }

    const missingWalkerPlus = results.filter(r => !r.hasWalkerPlusLink);
    if (missingWalkerPlus.length > 0) {
      recommendations.push({
        priority: 'low',
        category: 'WalkerPlus链接',
        message: `${missingWalkerPlus.length} 个活动缺少WalkerPlus链接`,
        affectedEvents: missingWalkerPlus.map(r => r.eventId),
      });
    }

    return recommendations;
  }

  /**
   * 显示检查结果
   */
  displayResults(report) {
    console.log('\n📊 项目内部6处数据源一致性检查报告');
    console.log('='.repeat(70));

    console.log(`\n📈 总体统计:`);
    console.log(`   总活动数: ${report.summary.totalEvents}`);
    console.log(
      `   优秀一致性: ${report.summary.excellentConsistency} (${((report.summary.excellentConsistency / report.summary.totalEvents) * 100).toFixed(1)}%)`
    );
    console.log(
      `   良好一致性: ${report.summary.goodConsistency} (${((report.summary.goodConsistency / report.summary.totalEvents) * 100).toFixed(1)}%)`
    );
    console.log(
      `   一般一致性: ${report.summary.fairConsistency} (${((report.summary.fairConsistency / report.summary.totalEvents) * 100).toFixed(1)}%)`
    );
    console.log(
      `   较差一致性: ${report.summary.poorConsistency} (${((report.summary.poorConsistency / report.summary.totalEvents) * 100).toFixed(1)}%)`
    );

    console.log(`\n🔗 链接完整性:`);
    console.log(
      `   有官方网站链接: ${report.summary.hasOfficialWebsite} (${((report.summary.hasOfficialWebsite / report.summary.totalEvents) * 100).toFixed(1)}%)`
    );
    console.log(
      `   有WalkerPlus链接: ${report.summary.hasWalkerPlusLink} (${((report.summary.hasWalkerPlusLink / report.summary.totalEvents) * 100).toFixed(1)}%)`
    );

    console.log(`\n🎯 重点建议:`);
    report.recommendations.forEach((rec, index) => {
      console.log(
        `   ${index + 1}. [${rec.priority.toUpperCase()}] ${rec.category}: ${rec.message}`
      );
    });

    // 显示具体问题活动
    const problemEvents = report.results.filter(
      r => r.overallConsistency === 'poor'
    );
    if (problemEvents.length > 0) {
      console.log(`\n⚠️  需要立即修正的活动:`);
      problemEvents.forEach((event, index) => {
        console.log(`   ${index + 1}. ${event.eventName} (${event.eventId})`);
        event.issues.forEach(issue => {
          console.log(`      - ${issue}`);
        });
      });
    }

    console.log('\n' + '='.repeat(70));
    console.log('✅ 项目内部数据一致性检查完成');
  }
}

// 读取活动配置文件
function loadEventConfigs() {
  try {
    const configPath = path.join(__dirname, 'event-configs.json');
    const configData = fs.readFileSync(configPath, 'utf8');
    return JSON.parse(configData);
  } catch (error) {
    console.error(`❌ 读取配置文件失败: ${error.message}`);
    return [];
  }
}

// 主执行函数
async function main() {
  console.log('🎯 项目内部6处数据源一致性检查系统');
  console.log('🔧 专注于项目内部文件数据一致性检查');
  console.log('⚠️  商业要求: 确保日期、地点信息完全一致\n');

  const checker = new InternalDataConsistencyChecker();

  try {
    // 加载活动配置
    const eventConfigs = loadEventConfigs();
    console.log(`📋 已加载 ${eventConfigs.length} 个活动配置`);

    // 执行一致性检查
    const results = checker.checkMultipleEvents(eventConfigs);

    // 生成报告
    const report = checker.generateReport(results);

    // 显示结果
    checker.displayResults(report);

    console.log('\n🎉 项目内部数据一致性检查任务完成!');
    console.log(
      '💾 详细报告已保存到 reports/internal-consistency-reports/ 目录'
    );
  } catch (error) {
    console.error(`❌ 检查失败: ${error.message}`);
    process.exit(1);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { InternalDataConsistencyChecker };
