import { writeFile } from 'fs/promises';
import { extractDataSources } from '../src/utils/data-source-extractor';

async function main() {
  try {
    console.log('🚀 启动数据源提取任务...');

    const report = await extractDataSources();

    console.log('\n✅ 阶段1执行完成！');
    console.log(`📊 总计发现 ${report.totalActivities} 个活动`);

    // 保存详细结果到文件
    const reportJson = JSON.stringify(report, null, 2);
    await writeFile('data-source-extraction-report.json', reportJson);
    console.log('📄 详细报告已保存到: data-source-extraction-report.json');
  } catch (error) {
    console.error('❌ 数据源提取失败:', error);
    process.exit(1);
  }
}

main();
