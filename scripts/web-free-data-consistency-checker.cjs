/**
 * 无网络依赖的高精度数据一致性检查系统
 * 专注于项目内部6处数据源的准确性验证
 *
 * 解决方案：
 * 1. 避免Playwright网络爬取问题
 * 2. 专注于项目内部数据源一致性
 * 3. 提供准确的商业级数据分析
 */

const fs = require('fs');
const path = require('path');

class WebFreeDataConsistencyChecker {
  constructor() {
    this.results = [];
    this.outputDir = path.join(
      __dirname,
      '../reports/web-free-consistency-reports'
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
   * 获取官方网站链接信息（从项目文件中）
   */
  getOfficialWebsiteInfo(eventConfig) {
    try {
      // 从详情页面获取官方网站链接
      if (fs.existsSync(eventConfig.detailPagePath)) {
        const content = fs.readFileSync(eventConfig.detailPagePath, 'utf8');

        // 查找官方网站链接
        const officialLinkMatch = content.match(
          /officialWebsite:\s*['"`]([^'"`]+)['"`]/
        );
        const websiteMatch = content.match(/website:\s*['"`]([^'"`]+)['"`]/);
        const urlMatch = content.match(/url:\s*['"`]([^'"`]+)['"`]/);

        const officialUrl =
          officialLinkMatch?.[1] ||
          websiteMatch?.[1] ||
          urlMatch?.[1] ||
          eventConfig.officialUrl;

        return {
          url: officialUrl,
          source: 'official_website_link',
          file: eventConfig.detailPagePath,
          extractedAt: new Date().toISOString(),
          dataQuality: officialUrl ? 'high' : 'missing',
          status: officialUrl ? 'available' : 'not_found',
        };
      }
    } catch (error) {
      console.warn(`⚠️ 获取官方网站信息失败: ${error.message}`);
    }

    return {
      url: eventConfig.officialUrl || '',
      source: 'official_website_link',
      file: 'config',
      extractedAt: new Date().toISOString(),
      dataQuality: eventConfig.officialUrl ? 'medium' : 'missing',
      status: eventConfig.officialUrl ? 'available' : 'not_found',
    };
  }

  /**
   * 获取WalkerPlus链接信息（从项目文件中）
   */
  getWalkerPlusInfo(eventConfig) {
    try {
      // 从详情页面获取WalkerPlus链接
      if (fs.existsSync(eventConfig.detailPagePath)) {
        const content = fs.readFileSync(eventConfig.detailPagePath, 'utf8');

        // 查找WalkerPlus链接
        const walkerPlusMatch = content.match(
          /walkerplus[^'"`]*:\s*['"`]([^'"`]+)['"`]/i
        );
        const walkerMatch = content.match(
          /walker[^'"`]*:\s*['"`]([^'"`]+)['"`]/i
        );

        const walkerPlusUrl =
          walkerPlusMatch?.[1] || walkerMatch?.[1] || eventConfig.walkerPlusUrl;

        return {
          url: walkerPlusUrl,
          source: 'walkerplus_link',
          file: eventConfig.detailPagePath,
          extractedAt: new Date().toISOString(),
          dataQuality: walkerPlusUrl ? 'high' : 'missing',
          status: walkerPlusUrl ? 'available' : 'not_found',
        };
      }
    } catch (error) {
      console.warn(`⚠️ 获取WalkerPlus信息失败: ${error.message}`);
    }

    return {
      url: eventConfig.walkerPlusUrl || '',
      source: 'walkerplus_link',
      file: 'config',
      extractedAt: new Date().toISOString(),
      dataQuality: eventConfig.walkerPlusUrl ? 'medium' : 'missing',
      status: eventConfig.walkerPlusUrl ? 'available' : 'not_found',
    };
  }

  /**
   * 高精度项目内部数据获取
   */
  getInternalData(eventConfig) {
    const internalSources = [];

    try {
      // 1. 四层详情页面数据
      if (fs.existsSync(eventConfig.detailPagePath)) {
        const content = fs.readFileSync(eventConfig.detailPagePath, 'utf8');

        // 提取结构化数据
        const dateMatch = content.match(/date:\s*['"`]([^'"`]+)['"`]/);
        const locationMatch = content.match(/location:\s*['"`]([^'"`]+)['"`]/);
        const venueMatch = content.match(/name:\s*['"`]([^'"`]+)['"`]/);
        const addressMatch = content.match(/address:\s*['"`]([^'"`]+)['"`]/);

        internalSources.push({
          date: dateMatch ? dateMatch[1] : '',
          location: locationMatch
            ? locationMatch[1]
            : venueMatch
              ? venueMatch[1]
              : '',
          address: addressMatch ? addressMatch[1] : '',
          source: 'four_layer_detail',
          file: eventConfig.detailPagePath,
          extractedAt: new Date().toISOString(),
          dataQuality: 'high',
          rawData: {
            dateMatch: dateMatch?.[0],
            locationMatch: locationMatch?.[0],
            venueMatch: venueMatch?.[0],
            addressMatch: addressMatch?.[0],
          },
        });

        // 2. SEO描述数据
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
            address: '',
            source: 'seo_description',
            file: eventConfig.detailPagePath,
            extractedAt: new Date().toISOString(),
            dataQuality: 'medium',
            rawData: {
              title: title,
              description: description,
            },
          });
        }
      }

      // 3. 三层列表页面数据
      const listPagePath = `src/app/${eventConfig.regionPath}/hanabi/page.tsx`;
      if (fs.existsSync(listPagePath)) {
        const content = fs.readFileSync(listPagePath, 'utf8');
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
            address: '',
            source: 'three_layer_list',
            file: listPagePath,
            extractedAt: new Date().toISOString(),
            dataQuality: 'low',
            rawData: {
              title: title,
              description: description,
            },
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
          const addressMatch = content.match(/address:\s*['"`]([^'"`]+)['"`]/);

          internalSources.push({
            date: dateMatch ? dateMatch[1] : '',
            location: locationMatch ? locationMatch[1] : '',
            address: addressMatch ? addressMatch[1] : '',
            source: 'project_data_file',
            file: filePath,
            extractedAt: new Date().toISOString(),
            dataQuality: 'high',
            rawData: {
              dateMatch: dateMatch?.[0],
              locationMatch: locationMatch?.[0],
              addressMatch: addressMatch?.[0],
            },
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
  checkEventConsistency(eventConfig) {
    console.log(`🔍 高精度检查活动: ${eventConfig.name}`);

    const dataSources = [];

    // 1. 获取官方网站链接信息
    const officialInfo = this.getOfficialWebsiteInfo(eventConfig);
    dataSources.push(officialInfo);

    // 2. 获取WalkerPlus链接信息
    const walkerPlusInfo = this.getWalkerPlusInfo(eventConfig);
    dataSources.push(walkerPlusInfo);

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
      addressConsistency: this.checkFieldConsistency(dataSources, 'address'),
      linkAvailability: this.checkLinkAvailability(dataSources),
      overallConsistency: 'pending',
      issues: [],
      recommendations: [],
      dataQualityScore: this.calculateDataQualityScore(dataSources),
    };

    // 计算总体一致性
    const dateScore = result.dateConsistency.consistencyScore;
    const locationScore = result.locationConsistency.consistencyScore;
    const addressScore = result.addressConsistency.consistencyScore;
    const overallScore = (dateScore + locationScore + addressScore) / 3;

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
   * 检查链接可用性
   */
  checkLinkAvailability(dataSources) {
    const officialLink = dataSources.find(
      s => s.source === 'official_website_link'
    );
    const walkerPlusLink = dataSources.find(
      s => s.source === 'walkerplus_link'
    );

    return {
      officialWebsite: {
        available: officialLink?.status === 'available',
        url: officialLink?.url || '',
        quality: officialLink?.dataQuality || 'missing',
      },
      walkerPlus: {
        available: walkerPlusLink?.status === 'available',
        url: walkerPlusLink?.url || '',
        quality: walkerPlusLink?.dataQuality || 'missing',
      },
      completeness:
        ((officialLink?.status === 'available' ? 1 : 0) +
          (walkerPlusLink?.status === 'available' ? 1 : 0)) /
        2,
    };
  }

  /**
   * 计算数据质量分数
   */
  calculateDataQualityScore(dataSources) {
    const qualityWeights = {
      official_website_link: 0.9,
      walkerplus_link: 0.8,
      four_layer_detail: 0.7,
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
      } else if (source.dataQuality === 'missing') {
        weightedScore += weight * 0.1;
      }
    });

    return totalWeight > 0 ? weightedScore / totalWeight : 0;
  }

  /**
   * 生成精确建议
   */
  generatePreciseRecommendations(result, dataSources) {
    const internalSources = dataSources.filter(s =>
      [
        'four_layer_detail',
        'project_data_file',
        'seo_description',
        'three_layer_list',
      ].includes(s.source)
    );

    // 日期一致性建议
    if (result.dateConsistency.consistencyScore < 0.9) {
      result.issues.push('日期信息在多个内部数据源中不一致');

      if (result.dateConsistency.mostCommon) {
        result.recommendations.push(
          `建议统一使用日期: ${result.dateConsistency.mostCommon}`
        );
      } else {
        result.recommendations.push('需要补充准确的日期信息');
      }
    }

    // 地点一致性建议
    if (result.locationConsistency.consistencyScore < 0.9) {
      result.issues.push('地点信息在多个内部数据源中不一致');

      if (result.locationConsistency.mostCommon) {
        result.recommendations.push(
          `建议统一使用地点: ${result.locationConsistency.mostCommon}`
        );
      } else {
        result.recommendations.push('需要补充准确的地点信息');
      }
    }

    // 链接可用性建议
    if (result.linkAvailability.completeness < 1.0) {
      result.issues.push('缺少权威数据源链接');

      if (!result.linkAvailability.officialWebsite.available) {
        result.recommendations.push('需要补充官方网站链接');
      }

      if (!result.linkAvailability.walkerPlus.available) {
        result.recommendations.push('需要补充WalkerPlus链接');
      }
    }

    // 数据质量建议
    if (result.dataQualityScore < 0.7) {
      result.issues.push('数据质量较低，需要改善');
      result.recommendations.push('建议补充高质量的数据源信息');
    }
  }

  /**
   * 检查特定字段的一致性
   */
  checkFieldConsistency(dataSources, fieldName) {
    const values = dataSources
      .map(source => source[fieldName])
      .filter(
        v =>
          v &&
          v.trim().length > 0 &&
          v !== '链接记录' &&
          v !== 'available' &&
          v !== 'not_found'
      );

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
    console.log(`🚀 开始高精度批量检查 ${eventConfigs.length} 个活动`);

    const results = [];

    for (let i = 0; i < eventConfigs.length; i++) {
      const eventConfig = eventConfigs[i];
      console.log(`\n进度: ${i + 1}/${eventConfigs.length}`);

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
      hasOfficialLink: results.filter(
        r => r.linkAvailability.officialWebsite.available
      ).length,
      hasWalkerPlusLink: results.filter(
        r => r.linkAvailability.walkerPlus.available
      ).length,
      averageLinkCompleteness:
        results.reduce((sum, r) => sum + r.linkAvailability.completeness, 0) /
        results.length,
    };

    const report = {
      generatedAt: new Date().toISOString(),
      summary: stats,
      results: results,
      recommendations: this.generateGlobalRecommendations(results),
      systemInfo: {
        version: '3.0-web-free',
        approach: 'Internal data sources only',
        technicalIssuesFixed: [
          'Avoided Playwright issues',
          'Focus on internal consistency',
          'Enhanced data extraction',
        ],
      },
    };

    // 保存详细报告
    const reportFile = path.join(
      this.outputDir,
      `web-free-consistency-report-${timestamp}.json`
    );
    fs.writeFileSync(reportFile, JSON.stringify(report, null, 2), 'utf8');

    // 保存最新报告
    const latestReportFile = path.join(
      this.outputDir,
      'latest-web-free-consistency-report.json'
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

    const incompleteLinkResults = results.filter(
      r => r.linkAvailability.completeness < 1.0
    );
    if (incompleteLinkResults.length > 0) {
      recommendations.push({
        priority: 'medium',
        category: '链接完整性',
        message: `${incompleteLinkResults.length} 个活动缺少完整的外部链接`,
        affectedEvents: incompleteLinkResults.map(r => r.eventId),
      });
    }

    return recommendations;
  }

  /**
   * 显示高精度检查结果
   */
  displayResults(report) {
    console.log('\n📊 无网络依赖的高精度数据一致性检查报告');
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
      `   有官方网站链接: ${report.summary.hasOfficialLink} (${((report.summary.hasOfficialLink / report.summary.totalEvents) * 100).toFixed(1)}%)`
    );
    console.log(
      `   有WalkerPlus链接: ${report.summary.hasWalkerPlusLink} (${((report.summary.hasWalkerPlusLink / report.summary.totalEvents) * 100).toFixed(1)}%)`
    );
    console.log(
      `   平均链接完整性: ${(report.summary.averageLinkCompleteness * 100).toFixed(1)}%`
    );

    console.log(`\n🔧 技术方案:`);
    console.log(`   版本: ${report.systemInfo.version}`);
    console.log(`   方法: ${report.systemInfo.approach}`);
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
  console.log('🎯 无网络依赖的高精度数据一致性检查系统');
  console.log('🔧 专注于项目内部6处数据源的准确性验证');
  console.log('⚠️  商业要求: 确保日期、地点信息完全准确\n');

  const checker = new WebFreeDataConsistencyChecker();

  try {
    // 加载活动配置
    const eventConfigs = loadEventConfigs();
    console.log(`📋 已加载 ${eventConfigs.length} 个活动配置`);

    // 检查所有活动
    console.log(`🧪 完整模式：检查所有 ${eventConfigs.length} 个活动`);

    // 执行一致性检查
    const results = checker.checkMultipleEvents(eventConfigs);

    // 生成报告
    const report = checker.generateReport(results);

    // 显示结果
    checker.displayResults(report);

    console.log('\n🎉 高精度数据一致性检查任务完成!');
    console.log(
      '💾 详细报告已保存到 reports/web-free-consistency-reports/ 目录'
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

module.exports = { WebFreeDataConsistencyChecker };
