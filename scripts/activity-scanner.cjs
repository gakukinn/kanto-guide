/**
 * 活动扫描器 - 统计和分析所有四层花火详情页面
 * 为80多个活动的数据核对提供优先级排序
 */

const fs = require('fs');
const path = require('path');

class ActivityScanner {
  constructor() {
    this.activities = [];
    this.srcPath = path.join(__dirname, '../src/app');
  }

  /**
   * 扫描所有四层花火详情页面
   */
  scanAllActivities() {
    console.log('🔍 开始扫描所有四层花火详情页面...');

    this.scanDirectory(this.srcPath);

    console.log(`📊 扫描完成，共发现 ${this.activities.length} 个活动`);
    return this.activities;
  }

  /**
   * 递归扫描目录
   */
  scanDirectory(dirPath) {
    try {
      const items = fs.readdirSync(dirPath);

      for (const item of items) {
        const itemPath = path.join(dirPath, item);
        const stat = fs.statSync(itemPath);

        if (stat.isDirectory()) {
          this.scanDirectory(itemPath);
        } else if (item === 'page.tsx' && this.isHanabiDetailPage(itemPath)) {
          const activity = this.extractActivityInfo(itemPath);
          if (activity) {
            this.activities.push(activity);
          }
        }
      }
    } catch (error) {
      console.warn(`⚠️ 扫描目录失败: ${dirPath} - ${error.message}`);
    }
  }

  /**
   * 判断是否为四层花火详情页面
   */
  isHanabiDetailPage(filePath) {
    // 路径模式：src/app/{region}/hanabi/{event-id}/page.tsx
    const relativePath = path.relative(this.srcPath, filePath);
    const pathParts = relativePath.split(path.sep);

    // 必须是4层结构：region/hanabi/event-id/page.tsx
    if (pathParts.length !== 4) return false;
    if (pathParts[1] !== 'hanabi') return false;
    if (pathParts[3] !== 'page.tsx') return false;

    // 排除三层页面（region/hanabi/page.tsx）
    return true;
  }

  /**
   * 提取活动信息
   */
  extractActivityInfo(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const relativePath = path.relative(this.srcPath, filePath);
      const pathParts = relativePath.split(path.sep);

      const region = pathParts[0];
      const eventId = pathParts[2];

      // 提取基本信息
      const nameMatch = content.match(/name:\s*['"`]([^'"`]+)['"`]/);
      const dateMatch = content.match(/date:\s*['"`]([^'"`]+)['"`]/);
      const locationMatch = content.match(/location:\s*['"`]([^'"`]+)['"`]/);

      // 提取外部链接
      const officialWebsiteMatch = content.match(
        /website:\s*['"`]([^'"`]+)['"`]/
      );
      const walkerPlusMatch = content.match(
        /walkerPlusUrl:\s*['"`]([^'"`]+)['"`]/
      );

      // 提取SEO信息
      const titleMatch = content.match(/title:\s*['"`]([^'"`]+)['"`]/);
      const descriptionMatch = content.match(
        /description:\s*['"`]([^'"`]+)['"`]/
      );

      // 计算优先级分数
      const priority = this.calculatePriority({
        hasName: !!nameMatch,
        hasDate: !!dateMatch,
        hasLocation: !!locationMatch,
        hasOfficialWebsite: !!officialWebsiteMatch,
        hasWalkerPlus: !!walkerPlusMatch,
        hasSEO: !!(titleMatch && descriptionMatch),
        region: region,
      });

      return {
        id: eventId,
        name: nameMatch ? nameMatch[1] : `未知活动-${eventId}`,
        region: region,
        filePath: filePath,
        relativePath: relativePath,
        data: {
          date: dateMatch ? dateMatch[1] : '',
          location: locationMatch ? locationMatch[1] : '',
          officialWebsite: officialWebsiteMatch ? officialWebsiteMatch[1] : '',
          walkerPlusUrl: walkerPlusMatch ? walkerPlusMatch[1] : '',
          seoTitle: titleMatch ? titleMatch[1] : '',
          seoDescription: descriptionMatch ? descriptionMatch[1] : '',
        },
        priority: priority,
        completeness: this.calculateCompleteness({
          hasName: !!nameMatch,
          hasDate: !!dateMatch,
          hasLocation: !!locationMatch,
          hasOfficialWebsite: !!officialWebsiteMatch,
          hasWalkerPlus: !!walkerPlusMatch,
          hasSEO: !!(titleMatch && descriptionMatch),
        }),
      };
    } catch (error) {
      console.warn(`⚠️ 提取活动信息失败: ${filePath} - ${error.message}`);
      return null;
    }
  }

  /**
   * 计算优先级分数（越高越优先）
   */
  calculatePriority(factors) {
    let score = 0;

    // 基础数据完整性
    if (factors.hasName) score += 10;
    if (factors.hasDate) score += 20;
    if (factors.hasLocation) score += 20;

    // 外部数据源可用性
    if (factors.hasOfficialWebsite) score += 25;
    if (factors.hasWalkerPlus) score += 25;

    // SEO完整性
    if (factors.hasSEO) score += 10;

    // 地区权重（重要地区优先）
    const regionWeights = {
      tokyo: 15,
      kanagawa: 12,
      saitama: 10,
      chiba: 10,
      kitakanto: 8,
      koshinetsu: 8,
    };
    score += regionWeights[factors.region] || 5;

    return score;
  }

  /**
   * 计算数据完整性百分比
   */
  calculateCompleteness(factors) {
    const totalFactors = 6;
    let completedFactors = 0;

    if (factors.hasName) completedFactors++;
    if (factors.hasDate) completedFactors++;
    if (factors.hasLocation) completedFactors++;
    if (factors.hasOfficialWebsite) completedFactors++;
    if (factors.hasWalkerPlus) completedFactors++;
    if (factors.hasSEO) completedFactors++;

    return Math.round((completedFactors / totalFactors) * 100);
  }

  /**
   * 按优先级排序活动
   */
  sortByPriority() {
    this.activities.sort((a, b) => {
      // 首先按优先级分数排序
      if (b.priority !== a.priority) {
        return b.priority - a.priority;
      }

      // 相同优先级按完整性排序
      if (b.completeness !== a.completeness) {
        return b.completeness - a.completeness;
      }

      // 最后按名称排序
      return a.name.localeCompare(b.name);
    });

    return this.activities;
  }

  /**
   * 按地区分组
   */
  groupByRegion() {
    const groups = {};

    this.activities.forEach(activity => {
      if (!groups[activity.region]) {
        groups[activity.region] = [];
      }
      groups[activity.region].push(activity);
    });

    return groups;
  }

  /**
   * 生成处理顺序建议
   */
  generateProcessingOrder() {
    const sorted = this.sortByPriority();

    const order = {
      immediate: [], // 高优先级，数据完整
      urgent: [], // 高优先级，数据不完整
      normal: [], // 中等优先级
      later: [], // 低优先级
    };

    sorted.forEach(activity => {
      if (activity.priority >= 90 && activity.completeness >= 80) {
        order.immediate.push(activity);
      } else if (activity.priority >= 80) {
        order.urgent.push(activity);
      } else if (activity.priority >= 60) {
        order.normal.push(activity);
      } else {
        order.later.push(activity);
      }
    });

    return order;
  }

  /**
   * 显示扫描结果
   */
  displayResults() {
    console.log('\n📊 活动扫描结果统计');
    console.log('='.repeat(60));

    console.log(`\n📈 总体统计:`);
    console.log(`   总活动数: ${this.activities.length}`);

    // 按地区统计
    const regionGroups = this.groupByRegion();
    console.log(`\n🗺️ 按地区分布:`);
    Object.entries(regionGroups).forEach(([region, activities]) => {
      console.log(`   ${region}: ${activities.length} 个活动`);
    });

    // 按完整性统计
    const completenessStats = {
      high: this.activities.filter(a => a.completeness >= 80).length,
      medium: this.activities.filter(
        a => a.completeness >= 60 && a.completeness < 80
      ).length,
      low: this.activities.filter(a => a.completeness < 60).length,
    };

    console.log(`\n📋 数据完整性分布:`);
    console.log(`   高完整性 (≥80%): ${completenessStats.high} 个`);
    console.log(`   中等完整性 (60-79%): ${completenessStats.medium} 个`);
    console.log(`   低完整性 (<60%): ${completenessStats.low} 个`);

    // 处理顺序建议
    const order = this.generateProcessingOrder();
    console.log(`\n🎯 建议处理顺序:`);
    console.log(
      `   立即处理: ${order.immediate.length} 个 (高优先级+高完整性)`
    );
    console.log(`   紧急处理: ${order.urgent.length} 个 (高优先级)`);
    console.log(`   正常处理: ${order.normal.length} 个 (中等优先级)`);
    console.log(`   延后处理: ${order.later.length} 个 (低优先级)`);

    // 显示前10个高优先级活动
    console.log(`\n🔝 前10个高优先级活动:`);
    const top10 = this.sortByPriority().slice(0, 10);
    top10.forEach((activity, index) => {
      console.log(`   ${index + 1}. ${activity.name} (${activity.region})`);
      console.log(
        `      优先级: ${activity.priority}, 完整性: ${activity.completeness}%`
      );
    });
  }

  /**
   * 保存扫描结果
   */
  saveResults() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const outputDir = path.join(__dirname, '../reports/activity-scan');

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const report = {
      generatedAt: new Date().toISOString(),
      totalActivities: this.activities.length,
      activities: this.sortByPriority(),
      regionGroups: this.groupByRegion(),
      processingOrder: this.generateProcessingOrder(),
      statistics: {
        byRegion: Object.entries(this.groupByRegion()).map(
          ([region, activities]) => ({
            region,
            count: activities.length,
            avgPriority: Math.round(
              activities.reduce((sum, a) => sum + a.priority, 0) /
                activities.length
            ),
            avgCompleteness: Math.round(
              activities.reduce((sum, a) => sum + a.completeness, 0) /
                activities.length
            ),
          })
        ),
        byCompleteness: {
          high: this.activities.filter(a => a.completeness >= 80).length,
          medium: this.activities.filter(
            a => a.completeness >= 60 && a.completeness < 80
          ).length,
          low: this.activities.filter(a => a.completeness < 60).length,
        },
      },
    };

    const reportFile = path.join(outputDir, `activity-scan-${timestamp}.json`);
    fs.writeFileSync(reportFile, JSON.stringify(report, null, 2), 'utf8');

    const latestReportFile = path.join(outputDir, 'latest-activity-scan.json');
    fs.writeFileSync(latestReportFile, JSON.stringify(report, null, 2), 'utf8');

    console.log(`\n💾 扫描结果已保存: ${reportFile}`);

    return report;
  }
}

// 主执行函数
async function main() {
  console.log('🎯 活动扫描器 - 为80多个活动数据核对提供优先级排序');
  console.log('📋 扫描所有四层花火详情页面\n');

  const scanner = new ActivityScanner();

  try {
    // 扫描所有活动
    scanner.scanAllActivities();

    // 显示结果
    scanner.displayResults();

    // 保存结果
    const report = scanner.saveResults();

    console.log('\n🎉 活动扫描任务完成!');
    console.log('💡 建议按照优先级顺序进行数据核对');
  } catch (error) {
    console.error(`❌ 扫描失败: ${error.message}`);
    process.exit(1);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { ActivityScanner };
