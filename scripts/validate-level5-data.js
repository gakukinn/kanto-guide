#!/usr/bin/env node

/**
 * 第5层花火数据验证脚本
 * 检查所有level5数据文件的完整性，特别关注地图相关字段
 */

const fs = require('fs');
const path = require('path');

// 验证结果统计
const stats = {
  totalFiles: 0,
  missingOfficialSource: 0,
  missingDataIntegrityCheck: 0,
  missingDataSourceUrl: 0,
  japaneseFormatIssues: 0,
  validationErrors: []
};

// 检查文件内容
function validateFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const fileName = path.basename(filePath);
  
  // 检查官方数据源
  if (!content.includes('officialSource')) {
    stats.missingOfficialSource++;
    stats.validationErrors.push(`${fileName}: 缺少officialSource字段`);
  }
  
  // 检查数据完整性检查
  if (!content.includes('dataIntegrityCheck')) {
    stats.missingDataIntegrityCheck++;
    stats.validationErrors.push(`${fileName}: 缺少dataIntegrityCheck字段`);
  }
  
  // 检查数据源URL
  if (!content.includes('dataSourceUrl')) {
    stats.missingDataSourceUrl++;
    stats.validationErrors.push(`${fileName}: 缺少dataSourceUrl字段`);
  }
  
  // 检查日文格式
  const japanesePatterns = [
    /徒步\d+分钟/,
    /约\d+発/,
    /約\d+発/,
    /約\d+万人/
  ];
  
  japanesePatterns.forEach(pattern => {
    if (pattern.test(content)) {
      stats.japaneseFormatIssues++;
      stats.validationErrors.push(`${fileName}: 发现日文格式 "${pattern}"`);
    }
  });
}

// 主函数
function validateLevel5Files() {
  const dataDir = path.join(__dirname, '../src/data');
  const files = fs.readdirSync(dataDir)
    .filter(file => file.startsWith('level5-') && file.endsWith('.ts'));
  
  stats.totalFiles = files.length;
  
  console.log(`🔍 开始验证 ${stats.totalFiles} 个第5层数据文件...\n`);
  
  files.forEach(file => {
    validateFile(path.join(dataDir, file));
  });
  
  // 输出验证报告
  console.log('📊 验证报告:');
  console.log('========================================');
  console.log(`📁 总文件数: ${stats.totalFiles}`);
  console.log(`❌ 缺少官方数据源: ${stats.missingOfficialSource}`);
  console.log(`❌ 缺少数据完整性检查: ${stats.missingDataIntegrityCheck}`);
  console.log(`❌ 缺少数据源URL: ${stats.missingDataSourceUrl}`);
  console.log(`⚠️ 日文格式问题: ${stats.japaneseFormatIssues}`);
  
  if (stats.validationErrors.length > 0) {
    console.log('\n🔍 详细错误列表:');
    stats.validationErrors.forEach(error => console.log(` • ${error}`));
  }
  
  console.log('\n========================================');
  console.log('验证完成时间:', new Date().toLocaleString('zh-CN'));
}

// 执行验证
validateLevel5Files();

module.exports = { validateLevel5Files }; 