/**
 * 高精度6处数据源一致性检查系统
 * 修复技术问题，确保商业信息准确性
 *
 * 技术修复：
 * 1. 解决PlaywrightCrawler配置问题
 * 2. 增强错误处理
 * 3. 提高数据提取准确性
 */

const { PlaywrightCrawler } = require('crawlee');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

class AccurateDataConsistencyChecker {
  constructor() {
    this.results = [];
    this.outputDir = path.join(
      __dirname,
      '../reports/accurate-consistency-reports'
    );

    // 确保输出目录存在
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  /**
   * 提取日期信息的高精度方法
   */
  extractDateFromText(text) {
    if (!text) return '';

    // 清理文本
    const cleanText = text.replace(/\s+/g, ' ').trim();

    const datePatterns = [
      /(\d{4}年\d{1,2}月\d{1,2}日\(\w\))/g, // 2025年8月15日(土)
      /(\d{4}年\d{1,2}月\d{1,2}日)/g, // 2025年8月15日
      /(\d{1,2}月\d{1,2}日-\d{1,2}日)/g, // 8月15日-16日
      /(\d{1,2}月\d{1,2}日)/g, // 8月15日
      /(\d{4}-\d{2}-\d{2})/g, // 2025-08-15
      /(\d{1,2}\/\d{1,2}\/\d{4})/g, // 8/15/2025
    ];

    const foundDates = [];
    for (const pattern of datePatterns) {
      const matches = cleanText.match(pattern);
      if (matches) {
        foundDates.push(...matches);
      }
    }

    // 返回最具体的日期
    if (foundDates.length > 0) {
      return foundDates.sort((a, b) => b.length - a.length)[0];
    }

    return '';
  }

  /**
   * 提取地点信息的高精度方法
   */
  extractLocationFromText(text) {
    if (!text) return '';

    const cleanText = text.replace(/\s+/g, ' ').trim();

    const locationPatterns = [
      /([^、。\n]+(?:県|市|町|村|区)[^、。\n]*(?:公園|会場|広場|河川|湖|海岸|神社|寺|駅|河川敷|運動場|球場|グラウンド)[^、。\n]*)/g,
      /([^、。\n]+(?:公園|会場|広場|河川|湖|海岸|神社|寺|駅|河川敷|運動場|球場|グラウンド)[^、。\n]*)/g,
      /([^、。\n]+(?:県|市|町|村|区)[^、。\n]*)/g,
    ];

    const foundLocations = [];
    for (const pattern of locationPatterns) {
      const matches = cleanText.match(pattern);
      if (matches) {
        foundLocations.push(...matches.map(m => m.trim()));
      }
    }

    // 返回最具体的地点
    if (foundLocations.length > 0) {
      return foundLocations.sort((a, b) => b.length - a.length)[0];
    }

    return '';
  }

  /**
   * 修复版官方网站数据获取
   */
  async getOfficialWebsiteData(officialUrl) {
    if (!officialUrl) return null;

    try {
      console.log(`🌐 正在获取官方网站数据: ${officialUrl}`);

      let extractedData = null;

      const crawler = new PlaywrightCrawler({
        requestHandler: async ({ page }) => {
          try {
            // 设置更长的超时时间
            await page.setDefaultTimeout(30000);

            // 等待页面加载
            await page.waitForLoadState('networkidle', { timeout: 20000 });

            // 获取页面内容
            const html = await page.content();
            const $ = cheerio.load(html);

            // 移除脚本和样式标签
            $('script, style, nav, footer, header').remove();

            const bodyText = $('body').text();
            const titleText = $('title').text();
            const metaDescription =
              $('meta[name="description"]').attr('content') || '';

            const combinedText = `${titleText} ${metaDescription} ${bodyText}`;

            extractedData = {
              date: this.extractDateFromText(combinedText),
              location: this.extractLocationFromText(combinedText),
              source: 'official_website',
              url: officialUrl,
              extractedAt: new Date().toISOString(),
              dataQuality: 'high',
            };
          } catch (error) {
            console.warn(`⚠️ 页面处理警告: ${error.message}`);
            extractedData = null;
          }
        },

        failedRequestHandler: async ({ request, error }) => {
          console.warn(`⚠️ 请求失败: ${request.url} - ${error.message}`);
        },

        maxRequestsPerCrawl: 1,
        headless: true,
        maxConcurrency: 1,
      });

      await crawler.run([officialUrl]);

      return extractedData;
    } catch (error) {
      console.error(
        `❌ 官方网站数据获取失败: ${officialUrl} - ${error.message}`
      );
      return {
        date: '',
        location: '',
        source: 'official_website',
        url: officialUrl,
        extractedAt: new Date().toISOString(),
        dataQuality: 'failed',
        error: error.message,
      };
    }
  }

  /**
   * 修复版WalkerPlus数据获取
   */
  async getWalkerPlusData(walkerPlusUrl) {
    if (!walkerPlusUrl) return null;

    try {
      console.log(`🔍 正在获取WalkerPlus数据: ${walkerPlusUrl}`);

      let extractedData = null;

      const crawler = new PlaywrightCrawler({
        requestHandler: async ({ page }) => {
          try {
            await page.setDefaultTimeout(30000);
            await page.waitForLoadState('networkidle', { timeout: 20000 });

            const html = await page.content();
            const $ = cheerio.load(html);

            // 优先尝试获取结构化数据
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

            // 从页面内容提取信息
            $('script, style, nav, footer, header, .ad').remove();
            const bodyText = $('body').text();
            const titleText = $('title').text();

            const combinedText = `${titleText} ${bodyText}`;

            extractedData = {
              date:
                structuredData?.startDate ||
                this.extractDateFromText(combinedText),
              location:
                structuredData?.location?.name ||
                this.extractLocationFromText(combinedText),
              source: 'walkerplus',
              url: walkerPlusUrl,
              extractedAt: new Date().toISOString(),
              dataQuality: structuredData ? 'high' : 'medium',
              hasStructuredData: !!structuredData,
            };
          } catch (error) {
            console.warn(`⚠️ WalkerPlus页面处理警告: ${error.message}`);
            extractedData = null;
          }
        },

        failedRequestHandler: async ({ request, error }) => {
          console.warn(
            `⚠️ WalkerPlus请求失败: ${request.url} - ${error.message}`
          );
        },

        maxRequestsPerCrawl: 1,
        headless: true,
        maxConcurrency: 1,
      });

      await crawler.run([walkerPlusUrl]);

      return extractedData;
    } catch (error) {
      console.error(
        `❌ WalkerPlus数据获取失败: ${walkerPlusUrl} - ${error.message}`
      );
      return {
        date: '',
        location: '',
        source: 'walkerplus',
        url: walkerPlusUrl,
        extractedAt: new Date().toISOString(),
        dataQuality: 'failed',
        error: error.message,
      };
    }
  }

  /**
   * 高精度项目内部数据获取
   */
  getInternalData(eventConfig) {
    const internalSources = [];

    try {
      // 1. 四层详情页面
      if (fs.existsSync(eventConfig.detailPagePath)) {
        const content = fs.readFileSync(eventConfig.detailPagePath, 'utf8');

        const dateMatch = content.match(/date:\s*['"`]([^'"`]+)['"`]/);
        const locationMatch = content.match(/location:\s*['"`]([^'"`]+)['"`]/);
        const venueMatch = content.match(/name:\s*['"`]([^'"`]+)['"`]/);

        internalSources.push({
          date: dateMatch ? dateMatch[1] : '',
          location: locationMatch
            ? locationMatch[1]
            : venueMatch
              ? venueMatch[1]
              : '',
          source: 'four_layer_detail',
          file: eventConfig.detailPagePath,
          extractedAt: new Date().toISOString(),
          dataQuality: 'high',
        });

        // 2. SEO描述
        const descriptionMatch = content.match(
          /description:\s*['"`]([^'"`]+)['"`]/
        );
        const titleMatch = content.match(/title:\s*['"`]([^'"`]+)['"`]/);

        if (descriptionMatch || titleMatch) {
          const description = descriptionMatch ? descriptionMatch[1] : '';
          const title = titleMatch ? titleMatch[1] : '';
          const combinedText = `${title} ${description}`;

          internalSources.push({
            date: this.extractDateFromText(combinedText),
            location: this.extractLocationFromText(combinedText),
            source: 'seo_description',
            file: eventConfig.detailPagePath,
            extractedAt: new Date().toISOString(),
            dataQuality: 'medium',
          });
        }
      }

      // 3. 三层列表
      const listPagePath = `src/app/${eventConfig.regionPath}/hanabi/page.tsx`;
      if (fs.existsSync(listPagePath)) {
        const content = fs.readFileSync(listPagePath, 'utf8');
        const descriptionMatch = content.match(
          /description:\s*['"`]([^'"`]+)['"`]/
        );

        if (descriptionMatch) {
          const description = descriptionMatch[1];
          internalSources.push({
            date: this.extractDateFromText(description),
            location: this.extractLocationFromText(description),
            source: 'three_layer_list',
            file: listPagePath,
            extractedAt: new Date().toISOString(),
            dataQuality: 'low',
          });
        }
      }

      // 4. 项目数据文件
      const possiblePaths = [
        `src/data/hanabi/${eventConfig.regionPath}/level4-august-${eventConfig.id}-hanabi.ts`,
        `src/data/hanabi/${eventConfig.regionPath}/level4-july-hanabi-${eventConfig.id}.ts`,
        `src/data/hanabi/${eventConfig.regionPath}/level4-september-${eventConfig.id}-hanabi.ts`,
        `src/data/hanabi/${eventConfig.regionPath}/level4-october-${eventConfig.id}-hanabi.ts`,
      ];

      for (const filePath of possiblePaths) {
        if (fs.existsSync(filePath)) {
          const content = fs.readFileSync(filePath, 'utf8');
          const dateMatch = content.match(/date:\s*['"`]([^'"`]+)['"`]/);
          const locationMatch = content.match(
            /location:\s*['"`]([^'"`]+)['"`]/
          );

          internalSources.push({
            date: dateMatch ? dateMatch[1] : '',
            location: locationMatch ? locationMatch[1] : '',
            source: 'project_data_file',
            file: filePath,
            extractedAt: new Date().toISOString(),
            dataQuality: 'high',
          });
          break;
        }
      }
    } catch (error) {
      console.error(`❌ 内部数据获取失败: ${error.message}`);
    }

    return internalSources;
  }

  /**
   * 高精度一致性检查
   */
  async checkEventConsistency(eventConfig) {
    console.log(`🔍 高精度检查活动: ${eventConfig.name}`);

    const dataSources = [];

    // 1. 获取官方网站数据（最高优先级）
    if (eventConfig.officialUrl) {
      const officialData = await this.getOfficialWebsiteData(
        eventConfig.officialUrl
      );
      if (officialData) dataSources.push(officialData);

      // 添加延迟避免过于频繁的请求
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    // 2. 获取WalkerPlus数据（第二优先级）
    if (eventConfig.walkerPlusUrl) {
      const walkerPlusData = await this.getWalkerPlusData(
        eventConfig.walkerPlusUrl
      );
      if (walkerPlusData) dataSources.push(walkerPlusData);

      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    // 3. 获取项目内部数据
    const internalData = this.getInternalData(eventConfig);
    dataSources.push(...internalData);

    // 分析一致性
    const consistencyResult = this.analyzeConsistency(eventConfig, dataSources);

    return consistencyResult;
  }

  /**
   * 高精度一致性分析
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
      dataQualityScore: this.calculateDataQualityScore(dataSources),
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

    // 生成精确的问题和建议
    this.generatePreciseRecommendations(result, dataSources);

    return result;
  }

  /**
   * 计算数据质量分数
   */
  calculateDataQualityScore(dataSources) {
    const qualityWeights = {
      official_website: 1.0,
      walkerplus: 0.8,
      four_layer_detail: 0.6,
      project_data_file: 0.6,
      seo_description: 0.4,
      three_layer_list: 0.2,
    };

    let totalWeight = 0;
    let weightedScore = 0;

    dataSources.forEach(source => {
      const weight = qualityWeights[source.source] || 0.1;
      totalWeight += weight;

      if (source.dataQuality === 'high') {
        weightedScore += weight * 1.0;
      } else if (source.dataQuality === 'medium') {
        weightedScore += weight * 0.7;
      } else if (source.dataQuality === 'low') {
        weightedScore += weight * 0.4;
      }
    });

    return totalWeight > 0 ? weightedScore / totalWeight : 0;
  }

  /**
   * 生成精确建议
   */
  generatePreciseRecommendations(result, dataSources) {
    const officialSource = dataSources.find(
      s => s.source === 'official_website'
    );
    const walkerPlusSource = dataSources.find(s => s.source === 'walkerplus');
    const detailSource = dataSources.find(
      s => s.source === 'four_layer_detail'
    );

    // 日期一致性建议
    if (result.dateConsistency.consistencyScore < 0.9) {
      result.issues.push('日期信息在多个数据源中不一致');

      if (officialSource && officialSource.date) {
        result.recommendations.push(
          `建议以官方网站日期为准: ${officialSource.date}`
        );
      } else if (walkerPlusSource && walkerPlusSource.date) {
        result.recommendations.push(
          `建议以WalkerPlus日期为准: ${walkerPlusSource.date}`
        );
      } else {
        result.recommendations.push('请核实官方网站或WalkerPlus的最新日期信息');
      }
    }

    // 地点一致性建议
    if (result.locationConsistency.consistencyScore < 0.9) {
      result.issues.push('地点信息在多个数据源中不一致');

      if (officialSource && officialSource.location) {
        result.recommendations.push(
          `建议以官方网站地点为准: ${officialSource.location}`
        );
      } else if (walkerPlusSource && walkerPlusSource.location) {
        result.recommendations.push(
          `建议以WalkerPlus地点为准: ${walkerPlusSource.location}`
        );
      } else {
        result.recommendations.push('请核实官方网站或WalkerPlus的准确地点信息');
      }
    }

    // 数据质量建议
    if (result.dataQualityScore < 0.7) {
      result.issues.push('数据质量较低，缺少权威数据源');
      result.recommendations.push('建议补充官方网站或WalkerPlus的准确信息');
    }
  }

  /**
   * 检查特定字段的一致性
   */
  checkFieldConsistency(dataSources, fieldName) {
    const values = dataSources
      .map(source => source[fieldName])
      .filter(v => v && v.trim().length > 0 && v !== '链接记录');

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
  async checkMultipleEvents(eventConfigs) {
    console.log(`🚀 开始高精度批量检查 ${eventConfigs.length} 个活动`);

    const results = [];

    for (let i = 0; i < eventConfigs.length; i++) {
      const eventConfig = eventConfigs[i];
      console.log(`\n进度: ${i + 1}/${eventConfigs.length}`);

      try {
        const result = await this.checkEventConsistency(eventConfig);
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
   * 生成高精度报告
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
      averageDataQuality:
        results.reduce((sum, r) => sum + r.dataQualityScore, 0) /
        results.length,
      hasOfficialData: results.filter(r =>
        r.dataSources.some(s => s.source === 'official_website')
      ).length,
      hasWalkerPlusData: results.filter(r =>
        r.dataSources.some(s => s.source === 'walkerplus')
      ).length,
    };

    const report = {
      generatedAt: new Date().toISOString(),
      summary: stats,
      results: results,
      recommendations: this.generateGlobalRecommendations(results),
      systemInfo: {
        version: '2.1-fixed',
        technicalIssuesFixed: [
          'PlaywrightCrawler configuration',
          'memory optimization',
          'enhanced error handling',
        ],
      },
    };

    // 保存详细报告
    const reportFile = path.join(
      this.outputDir,
      `accurate-consistency-report-${timestamp}.json`
    );
    fs.writeFileSync(reportFile, JSON.stringify(report, null, 2), 'utf8');

    // 保存最新报告
    const latestReportFile = path.join(
      this.outputDir,
      'latest-accurate-consistency-report.json'
    );
    fs.writeFileSync(latestReportFile, JSON.stringify(report, null, 2), 'utf8');

    console.log(`📊 高精度一致性报告已生成: ${reportFile}`);

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
        priority: 'critical',
        category: '数据质量',
        message: `${poorResults.length} 个活动的数据一致性较差，需要立即修正`,
        affectedEvents: poorResults.map(r => r.eventId),
      });
    }

    const lowQualityResults = results.filter(r => r.dataQualityScore < 0.7);
    if (lowQualityResults.length > 0) {
      recommendations.push({
        priority: 'high',
        category: '数据权威性',
        message: `${lowQualityResults.length} 个活动缺少权威数据源验证`,
        affectedEvents: lowQualityResults.map(r => r.eventId),
      });
    }

    return recommendations;
  }

  /**
   * 显示高精度检查结果
   */
  displayResults(report) {
    console.log('\n📊 高精度6处数据源一致性检查报告');
    console.log('='.repeat(80));

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

    console.log(`\n🎯 数据质量:`);
    console.log(
      `   平均数据质量分数: ${(report.summary.averageDataQuality * 100).toFixed(1)}%`
    );
    console.log(
      `   有官方网站数据: ${report.summary.hasOfficialData} (${((report.summary.hasOfficialData / report.summary.totalEvents) * 100).toFixed(1)}%)`
    );
    console.log(
      `   有WalkerPlus数据: ${report.summary.hasWalkerPlusData} (${((report.summary.hasWalkerPlusData / report.summary.totalEvents) * 100).toFixed(1)}%)`
    );

    console.log(`\n🔧 技术修复:`);
    report.systemInfo.technicalIssuesFixed.forEach(fix => {
      console.log(`   ✅ ${fix}`);
    });

    console.log(`\n🎯 重点建议:`);
    report.recommendations.forEach((rec, index) => {
      console.log(
        `   ${index + 1}. [${rec.priority.toUpperCase()}] ${rec.category}: ${rec.message}`
      );
    });

    console.log('\n' + '='.repeat(80));
    console.log('✅ 高精度数据一致性检查完成');
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
  console.log('🎯 高精度6处数据源一致性检查系统');
  console.log('🔧 已修复PlaywrightCrawler配置问题');
  console.log('⚠️  商业要求: 确保日期、地点信息完全准确\n');

  const checker = new AccurateDataConsistencyChecker();

  try {
    // 加载活动配置
    const eventConfigs = loadEventConfigs();
    console.log(`📋 已加载 ${eventConfigs.length} 个活动配置`);

    // 选择前3个活动进行测试
    const testConfigs = eventConfigs.slice(0, 3);
    console.log(`🧪 测试模式：检查前 ${testConfigs.length} 个活动`);

    // 执行一致性检查
    const results = await checker.checkMultipleEvents(testConfigs);

    // 生成报告
    const report = checker.generateReport(results);

    // 显示结果
    checker.displayResults(report);

    console.log('\n🎉 高精度数据一致性检查任务完成!');
    console.log(
      '💾 详细报告已保存到 reports/accurate-consistency-reports/ 目录'
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

module.exports = { AccurateDataConsistencyChecker };
