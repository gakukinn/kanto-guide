import { writeFile } from 'fs/promises';
import { DataSourceExtractor } from '../src/utils/data-source-extractor';

async function main() {
  try {
    console.log('🚀 启动东京区域数据源提取任务...');

    const extractor = new DataSourceExtractor();
    // 只设置东京区域
    (extractor as any).regions = ['tokyo'];

    const report = await extractor.extract();

    console.log('\n✅ 东京区域数据提取完成！');
    console.log(`📊 东京总计发现 ${report.regionBreakdown.tokyo || 0} 个活动`);

    // 保存详细结果到文件
    const reportJson = JSON.stringify(report, null, 2);
    await writeFile('tokyo-data-source-extraction-report.json', reportJson);
    console.log(
      '📄 详细报告已保存到: tokyo-data-source-extraction-report.json'
    );

    // 详细显示东京的活动
    console.log('\n📋 东京活动详情:');
    const tokyoActivities = report.activities.filter(a => a.region === 'tokyo');
    tokyoActivities.forEach((activity, index) => {
      const sources = [];
      if (activity.hasOfficialWebsite) sources.push('官网');
      if (activity.hasWalkerPlusUrl) sources.push('WalkerPlus');
      const sourcesText =
        sources.length > 0 ? `[${sources.join(', ')}]` : '[无外部源]';

      console.log(
        `${index + 1}. ${activity.name} (${activity.id}) ${sourcesText}`
      );
      if (activity.officialWebsite) {
        console.log(`   官网: ${activity.officialWebsite}`);
      }
      if (activity.walkerPlusUrl) {
        console.log(`   WalkerPlus: ${activity.walkerPlusUrl}`);
      }
      console.log(
        `   时间: ${activity.currentData.date} ${activity.currentData.time}`
      );
      console.log(`   地点: ${activity.currentData.location}`);
      console.log('');
    });
  } catch (error) {
    console.error('❌ 东京区域数据提取失败:', error);
    process.exit(1);
  }
}

main();
