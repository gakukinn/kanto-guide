/**
 * ar0400地区花火大会信息整理脚本
 * 从抓取的数据中提取核心信息：标题、日期、地点、观众数、花火数
 */

import fs from 'fs';

// 读取抓取的数据
const dataFile = 'walkerplus-ar0400-hanabi-2025-06-14T03-21-16-272Z.json';
const rawData = JSON.parse(fs.readFileSync(dataFile, 'utf8'));

console.log('🎆 甲信越地区（ar0400）花火大会信息整理');
console.log('=' .repeat(80));

// 过滤出真正的花火大会（有具体日期和地点的）
const realHanabiEvents = rawData.events.filter(event => 
  event.date !== '日期待确认' && 
  event.location !== 'ar0400地区' &&
  !event.title.includes('花火特集') &&
  !event.title.includes('カレンダー') &&
  !event.title.includes('ランキング') &&
  !event.title.includes('トピックス') &&
  event.title.includes('花火') || event.title.includes('煙火')
);

console.log(`📊 找到 ${realHanabiEvents.length} 个具体的花火大会\n`);

// 创建整理后的数据结构
const organizedData = realHanabiEvents.map((event, index) => {
  return {
    序号: index + 1,
    标题: event.title,
    日期: event.date,
    地点: event.location,
    观众数: event.expectedVisitors ? `${event.expectedVisitors.toLocaleString()}人` : '未知',
    花火数: event.fireworksCount ? `${event.fireworksCount}发` : '未知',
    详情链接: event.sourceUrl
  };
});

// 按观众数排序（从多到少）
organizedData.sort((a, b) => {
  const visitorsA = parseInt(a.观众数.replace(/[^\d]/g, '')) || 0;
  const visitorsB = parseInt(b.观众数.replace(/[^\d]/g, '')) || 0;
  return visitorsB - visitorsA;
});

// 显示表格
console.log('📋 甲信越地区花火大会详细信息表：\n');

organizedData.forEach(event => {
  console.log(`${event.序号}. ${event.标题}`);
  console.log(`   📅 日期: ${event.日期}`);
  console.log(`   📍 地点: ${event.地点}`);
  console.log(`   👥 观众数: ${event.观众数}`);
  console.log(`   🎆 花火数: ${event.花火数}`);
  console.log(`   🔗 链接: ${event.详情链接}`);
  console.log('');
});

// 保存整理后的数据
const summaryData = {
  region: '甲信越地区（ar0400）',
  source: 'WalkerPlus',
  scrapedAt: rawData.scrapedAt,
  totalEvents: organizedData.length,
  technology: 'Playwright + Cheerio',
  events: organizedData
};

const summaryFilename = `ar0400-hanabi-summary-${new Date().toISOString().split('T')[0]}.json`;
fs.writeFileSync(summaryFilename, JSON.stringify(summaryData, null, 2), 'utf8');

console.log(`💾 整理后的数据已保存到: ${summaryFilename}`);

// 统计信息
console.log('\n📊 统计信息:');
console.log(`总花火大会数: ${organizedData.length}个`);

const withVisitors = organizedData.filter(e => e.观众数 !== '未知');
console.log(`有观众数据: ${withVisitors.length}个`);

const withFireworks = organizedData.filter(e => e.花火数 !== '未知');
console.log(`有花火数据: ${withFireworks.length}个`);

// 最大观众数
if (withVisitors.length > 0) {
  const maxVisitors = Math.max(...withVisitors.map(e => parseInt(e.观众数.replace(/[^\d]/g, ''))));
  const maxEvent = withVisitors.find(e => parseInt(e.观众数.replace(/[^\d]/g, '')) === maxVisitors);
  console.log(`最大观众数: ${maxEvent.标题} - ${maxEvent.观众数}`);
}

// 创建CSV格式
const csvHeader = '序号,标题,日期,地点,观众数,花火数,详情链接\n';
const csvContent = organizedData.map(event => 
  `${event.序号},"${event.标题}","${event.日期}","${event.地点}","${event.观众数}","${event.花火数}","${event.详情链接}"`
).join('\n');

const csvFilename = `ar0400-hanabi-summary-${new Date().toISOString().split('T')[0]}.csv`;
fs.writeFileSync(csvFilename, csvHeader + csvContent, 'utf8');

console.log(`📊 CSV格式数据已保存到: ${csvFilename}`);

console.log('\n✅ 数据整理完成！');
console.log('🎯 您现在拥有了甲信越地区花火大会的完整信息，包括：');
console.log('   - 标题（花火大会名称）');
console.log('   - 日期（举办时间）');
console.log('   - 地点（具体位置）');
console.log('   - 观众数（预计参与人数）');
console.log('   - 花火数（烟花发数）');
console.log('   - 详情链接（WalkerPlus官方页面）');

export { organizedData, summaryData }; 