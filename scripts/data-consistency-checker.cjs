/**
 * 6处数据源一致性检查系统
 * 技术栈：Playwright + Cheerio + Crawlee
 * 商业要求：确保日期、地点信息在6处数据源中完全一致
 *
 * 6处数据源优先级：
 * 1. 官方网站（最高权威）
 * 2. WalkerPlus活动链接（详情页面中的链接）
 * 3. 项目数据库（已验证数据）
 * 4. 三层列表（汇总信息）
 * 5. 四层详情（详细描述）
 * 6. SEO描述（搜索优化）
 */

const { PlaywrightCrawler } = require('crawlee');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

class DataConsistencyChecker {
  constructor() {
    this.results = [];
    this.inconsistencies = [];
    this.outputDir = path.join(__dirname, '../reports/consistency-reports');

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
      /([^、。\n]+(?:県|市|町|村|区))/,
      /([^、。\n]+(?:公園|会場|広場|河川|湖|海岸|神社|寺|駅))/,
      /([^、。\n]+(?:河川敷|運動場|球場|グラウンド))/,
    ];

    for (const pattern of locationPatterns) {
      const match = text.match(pattern);
      if (match) return match[1].trim();
    }

    return text.trim();
  }

  /**
   * 从官方网站获取数据（数据源1 - 最高优先级）
   */
  async getOfficialWebsiteData(officialUrl) {
    if (!officialUrl) return null;

    try {
      const crawler = new PlaywrightCrawler({
        requestHandler: async ({ page }) => {
          await page.waitForLoadState('networkidle');
          const html = await page.content();
          const $ = cheerio.load(html);

          return {
            date: this.extractDateFromText($('body').text()),
            location: this.extractLocationFromText($('body').text()),
            source: 'official_website',
            url: officialUrl,
            extractedAt: new Date().toISOString(),
          };
        },
        maxRequestsPerCrawl: 1,
        headless: true,
      });

      const results = [];
      await crawler.run([officialUrl]);
      return results[0] || null;
    } catch (error) {
      console.error(`❌ 官方网站数据获取失败: ${error.message}`);
      return null;
    }
  }

  /**
   * 从WalkerPlus链接获取数据（数据源2 - 第二优先级）
   */
  async getWalkerPlusData(walkerPlusUrl) {
    if (!walkerPlusUrl) return null;

    try {
      const crawler = new PlaywrightCrawler({
        requestHandler: async ({ page }) => {
          await page.waitForLoadState('networkidle');
          const html = await page.content();
          const $ = cheerio.load(html);

          // 尝试从JSON-LD获取结构化数据
          let structuredData = null;
          $('script[type="application/ld+json"]').each((i, elem) => {
            try {
              const jsonData = JSON.parse($(elem).html());
              if (jsonData['@type'] === 'Event') {
                structuredData = jsonData;
              }
            } catch (e) {
              // 忽略JSON解析错误
            }
          });

          return {
            date:
              structuredData?.startDate ||
              this.extractDateFromText($('body').text()),
            location:
              structuredData?.location?.name ||
              this.extractLocationFromText($('body').text()),
            source: 'walkerplus',
            url: walkerPlusUrl,
            extractedAt: new Date().toISOString(),
            structuredData: !!structuredData,
          };
        },
        maxRequestsPerCrawl: 1,
        headless: true,
      });

      const results = [];
      await crawler.run([walkerPlusUrl]);
      return results[0] || null;
    } catch (error) {
      console.error(`❌ WalkerPlus数据获取失败: ${error.message}`);
      return null;
    }
  }

  /**
   * 从项目数据库获取数据（数据源3）
   */
  getProjectDatabaseData(eventId) {
    try {
      // 读取项目中的数据文件
      const dataFiles = [
        `src/data/hanabi/tokyo/level4-august-${eventId}-hanabi.ts`,
        `src/data/hanabi/saitama/level4-july-hanabi-${eventId}.ts`,
        `src/data/hanabi/chiba/level4-august-${eventId}-hanabi.ts`,
        // 添加更多数据文件路径
      ];

      for (const filePath of dataFiles) {
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
            source: 'project_database',
            file: filePath,
            extractedAt: new Date().toISOString(),
          };
        }
      }

      return null;
    } catch (error) {
      console.error(`❌ 项目数据库数据获取失败: ${error.message}`);
      return null;
    }
  }

  /**
   * 从三层列表获取数据（数据源4）
   */
  getThreeLayerListData(regionPath) {
    try {
      const listPagePath = `src/app/${regionPath}/hanabi/page.tsx`;

      if (fs.existsSync(listPagePath)) {
        const content = fs.readFileSync(listPagePath, 'utf8');

        // 从列表页面提取数据
        const dateMatch = content.match(/date:\s*['"`]([^'"`]+)['"`]/);
        const locationMatch = content.match(/location:\s*['"`]([^'"`]+)['"`]/);

        return {
          date: dateMatch ? dateMatch[1] : '',
          location: locationMatch ? locationMatch[1] : '',
          source: 'three_layer_list',
          file: listPagePath,
          extractedAt: new Date().toISOString(),
        };
      }

      return null;
    } catch (error) {
      console.error(`❌ 三层列表数据获取失败: ${error.message}`);
      return null;
    }
  }

  /**
   * 从四层详情获取数据（数据源5）
   */
  getFourLayerDetailData(detailPagePath) {
    try {
      if (fs.existsSync(detailPagePath)) {
        const content = fs.readFileSync(detailPagePath, 'utf8');

        // 从详情页面提取数据
        const dateMatch = content.match(/date:\s*['"`]([^'"`]+)['"`]/);
        const locationMatch = content.match(/location:\s*['"`]([^'"`]+)['"`]/);

        return {
          date: dateMatch ? dateMatch[1] : '',
          location: locationMatch ? locationMatch[1] : '',
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
   * 从SEO描述获取数据（数据源6）
   */
  getSEODescriptionData(detailPagePath) {
    try {
      if (fs.existsSync(detailPagePath)) {
        const content = fs.readFileSync(detailPagePath, 'utf8');

        // 从SEO元数据提取数据
        const descriptionMatch = content.match(
          /description:\s*['"`]([^'"`]+)['"`]/
        );

        if (descriptionMatch) {
          const description = descriptionMatch[1];
          return {
            date: this.extractDateFromText(description),
            location: this.extractLocationFromText(description),
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
   * 检查单个活动的6处数据源一致性
   */
  async checkEventConsistency(eventConfig) {
    console.log(`🔍 检查活动: ${eventConfig.name}`);

    const dataSources = [];

    // 1. 官方网站数据
    if (eventConfig.officialUrl) {
      const officialData = await this.getOfficialWebsiteData(
        eventConfig.officialUrl
      );
      if (officialData) dataSources.push(officialData);
    }

    // 2. WalkerPlus数据
    if (eventConfig.walkerPlusUrl) {
      const walkerPlusData = await this.getWalkerPlusData(
        eventConfig.walkerPlusUrl
      );
      if (walkerPlusData) dataSources.push(walkerPlusData);
    }

    // 3. 项目数据库数据
    const projectData = this.getProjectDatabaseData(eventConfig.id);
    if (projectData) dataSources.push(projectData);

    // 4. 三层列表数据
    const listData = this.getThreeLayerListData(eventConfig.regionPath);
    if (listData) dataSources.push(listData);

    // 5. 四层详情数据
    const detailData = this.getFourLayerDetailData(eventConfig.detailPagePath);
    if (detailData) dataSources.push(detailData);

    // 6. SEO描述数据
    const seoData = this.getSEODescriptionData(eventConfig.detailPagePath);
    if (seoData) dataSources.push(seoData);

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
      result.recommendations.push('请核实官方网站和WalkerPlus的日期信息');
    }

    if (result.locationConsistency.consistencyScore < 0.9) {
      result.issues.push('地点信息在多个数据源中不一致');
      result.recommendations.push('请统一地点表述格式');
    }

    return result;
  }

  /**
   * 检查特定字段的一致性
   */
  checkFieldConsistency(dataSources, fieldName) {
    const values = dataSources.map(source => source[fieldName]).filter(v => v);

    if (values.length === 0) {
      return {
        field: fieldName,
        consistencyScore: 0,
        uniqueValues: [],
        mostCommon: null,
        conflicts: [],
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
  async checkMultipleEvents(eventConfigs) {
    console.log(`🚀 开始批量检查 ${eventConfigs.length} 个活动的数据一致性`);

    const results = [];

    for (const eventConfig of eventConfigs) {
      try {
        const result = await this.checkEventConsistency(eventConfig);
        results.push(result);

        // 添加延迟避免过于频繁的请求
        await new Promise(resolve => setTimeout(resolve, 1000));
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
      `consistency-report-${timestamp}.json`
    );
    fs.writeFileSync(reportFile, JSON.stringify(report, null, 2), 'utf8');

    // 保存最新报告
    const latestReportFile = path.join(
      this.outputDir,
      'latest-consistency-report.json'
    );
    fs.writeFileSync(latestReportFile, JSON.stringify(report, null, 2), 'utf8');

    console.log(`📊 一致性报告已生成: ${reportFile}`);

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

    return recommendations;
  }

  /**
   * 显示检查结果
   */
  displayResults(report) {
    console.log('\n📊 6处数据源一致性检查报告');
    console.log('='.repeat(60));

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

    console.log(`\n🎯 重点建议:`);
    report.recommendations.forEach((rec, index) => {
      console.log(
        `   ${index + 1}. [${rec.priority.toUpperCase()}] ${rec.category}: ${rec.message}`
      );
    });

    console.log('\n' + '='.repeat(60));
    console.log('✅ 数据一致性检查完成');
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
    // 返回示例配置作为备用
    return [
      {
        id: 'numata-hanabi-2025',
        name: '第13回沼田花火大会',
        officialUrl: 'https://www.city.numata.gunma.jp/',
        walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0310e40188/',
        regionPath: 'kitakanto',
        detailPagePath: 'src/app/kitakanto/hanabi/numata-hanabi-2025/page.tsx',
      },
    ];
  }
}

// 主执行函数
async function main() {
  console.log('🎯 6处数据源一致性检查系统');
  console.log('🔧 技术栈: Playwright + Cheerio + Crawlee');
  console.log('⚠️  商业要求: 确保日期、地点信息完全一致\n');

  const checker = new DataConsistencyChecker();

  try {
    // 加载活动配置
    const eventConfigs = loadEventConfigs();
    console.log(`📋 已加载 ${eventConfigs.length} 个活动配置`);

    // 执行一致性检查
    const results = await checker.checkMultipleEvents(eventConfigs);

    // 生成报告
    const report = checker.generateReport(results);

    // 显示结果
    checker.displayResults(report);

    console.log('\n🎉 数据一致性检查任务完成!');
    console.log('💾 详细报告已保存到 reports/consistency-reports/ 目录');
  } catch (error) {
    console.error(`❌ 检查失败: ${error.message}`);
    process.exit(1);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { DataConsistencyChecker };
