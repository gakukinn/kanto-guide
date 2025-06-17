import { writeFile } from 'fs/promises';
import { crawlTokyoData } from '../src/utils/data-crawler-tokyo';
import { DataSourceExtractor } from '../src/utils/data-source-extractor';

async function main() {
  try {
    console.log('🚀 启动东京区域阶段2数据爬取任务...');

    // 阶段1：提取东京活动数据源
    console.log('\n📊 阶段1：提取东京活动数据源');
    const extractor = new DataSourceExtractor();
    (extractor as any).regions = ['tokyo'];
    const extractionReport = await extractor.extract();

    const tokyoActivities = extractionReport.activities.filter(
      a => a.region === 'tokyo'
    );
    console.log(`✅ 提取到${tokyoActivities.length}个东京活动`);

    // 阶段2：爬取外部数据源
    console.log('\n📊 阶段2：爬取外部数据源');
    const crawlReport = await crawlTokyoData(tokyoActivities);

    // 生成完整报告
    const fullReport = {
      extraction: extractionReport,
      crawling: crawlReport,
      generatedAt: new Date().toISOString(),
    };

    // 保存报告
    const reportJson = JSON.stringify(fullReport, null, 2);
    await writeFile('tokyo-phase2-crawl-report.json', reportJson);

    // 打印摘要
    console.log('\n📊 === 阶段2完成：东京数据爬取报告 ===');
    console.log(`总活动数: ${crawlReport.totalActivities}`);
    console.log(`爬取官网: ${crawlReport.crawledOfficialSites} 个`);
    console.log(`爬取WalkerPlus: ${crawlReport.crawledWalkerPlus} 个`);
    console.log(`成功爬取: ${crawlReport.successfulCrawls} 个`);
    console.log(`失败爬取: ${crawlReport.failedCrawls} 个`);
    console.log(
      `成功率: ${((crawlReport.successfulCrawls / (crawlReport.crawledOfficialSites + crawlReport.crawledWalkerPlus)) * 100).toFixed(1)}%`
    );

    console.log('\n📄 详细报告已保存到: tokyo-phase2-crawl-report.json');

    // 显示失败的爬取
    if (crawlReport.failedCrawls > 0) {
      console.log('\n❌ 失败的爬取:');
      crawlReport.crawlResults
        .filter(r => !r.success)
        .forEach(result => {
          console.log(
            `  - ${result.activityName} (${result.source}): ${result.error}`
          );
        });
    }

    // 显示数据一致性分析
    console.log('\n🔍 数据一致性分析:');
    const activitiesWithBothSources = tokyoActivities.filter(
      a => a.hasOfficialWebsite && a.hasWalkerPlusUrl
    );
    console.log(`需要对比验证的活动: ${activitiesWithBothSources.length} 个`);

    activitiesWithBothSources.forEach(activity => {
      const officialResult = crawlReport.crawlResults.find(
        r => r.activityId === activity.id && r.source === 'official'
      );
      const walkerResult = crawlReport.crawlResults.find(
        r => r.activityId === activity.id && r.source === 'walkerplus'
      );

      if (officialResult?.success && walkerResult?.success) {
        console.log(`  ✅ ${activity.name}: 两个数据源都爬取成功`);
      } else {
        console.log(`  ⚠️ ${activity.name}: 数据源爬取不完整`);
      }
    });
  } catch (error) {
    console.error('❌ 东京数据爬取失败:', error);
    process.exit(1);
  }
}

main();
