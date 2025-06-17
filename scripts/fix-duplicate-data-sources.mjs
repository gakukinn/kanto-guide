#!/usr/bin/env node
/**
 * 修复双重数据源问题脚本
 *
 * 商业项目数据一致性修复工具
 * - 识别页面内嵌数据与数据文件的冲突
 * - 统一数据源到数据文件模式
 * - 确保信息准确性和维护性
 */

import fs from 'fs';
import { glob } from 'glob';
import path from 'path';

// 配置
const CONFIG = {
  pagesDir: 'src/app',
  dataDir: 'src/data/hanabi',
  backupDir: 'backup/data-migration',
  logFile: 'reports/data-source-migration.json',
};

// 创建备份目录
function ensureBackupDir() {
  if (!fs.existsSync(CONFIG.backupDir)) {
    fs.mkdirSync(CONFIG.backupDir, { recursive: true });
  }
}

// 扫描页面内嵌数据
function scanPageEmbeddedData() {
  console.log('🔍 扫描页面内嵌数据...');

  const pageFiles = glob.sync(`${CONFIG.pagesDir}/**/hanabi/*/page.tsx`);
  const embeddedDataPages = [];

  for (const pageFile of pageFiles) {
    const content = fs.readFileSync(pageFile, 'utf8');

    // 检查是否包含内嵌数据定义
    if (
      content.includes('const ') &&
      content.includes('HanabiData') &&
      content.includes(' = {')
    ) {
      const dataMatch = content.match(/const\s+(\w+).*?:\s*HanabiData\s*=\s*{/);
      if (dataMatch) {
        embeddedDataPages.push({
          file: pageFile,
          dataConstName: dataMatch[1],
          relativePath: path.relative(process.cwd(), pageFile),
        });
      }
    }
  }

  console.log(`📊 发现 ${embeddedDataPages.length} 个页面使用内嵌数据`);
  return embeddedDataPages;
}

// 扫描数据文件
function scanDataFiles() {
  console.log('🔍 扫描数据文件...');

  const dataFiles = glob.sync(`${CONFIG.dataDir}/**/*.ts`);
  const dataFileMap = {};

  for (const dataFile of dataFiles) {
    const content = fs.readFileSync(dataFile, 'utf8');
    const exportMatch = content.match(
      /export\s+const\s+(\w+).*?:\s*HanabiData/
    );

    if (exportMatch) {
      const exportName = exportMatch[1];
      const region = path.dirname(dataFile).split(path.sep).pop();

      dataFileMap[region] = dataFileMap[region] || [];
      dataFileMap[region].push({
        file: dataFile,
        exportName,
        relativePath: path.relative(process.cwd(), dataFile),
      });
    }
  }

  console.log(`📊 发现 ${Object.keys(dataFileMap).length} 个地区的数据文件`);
  return dataFileMap;
}

// 匹配页面与数据文件
function matchPageToDataFile(pagePath, dataFileMap) {
  // 从路径提取地区信息
  const pathParts = pagePath.split(path.sep);
  const regionIndex = pathParts.findIndex(part =>
    [
      'tokyo',
      'kanagawa',
      'chiba',
      'saitama',
      'kitakanto',
      'koshinetsu',
    ].includes(part)
  );

  if (regionIndex === -1) return null;

  const region = pathParts[regionIndex];
  const eventName = pathParts[pathParts.length - 2]; // 倒数第二个是事件名

  // 查找匹配的数据文件
  if (dataFileMap[region]) {
    for (const dataFile of dataFileMap[region]) {
      if (
        dataFile.file.includes(eventName) ||
        dataFile.exportName.toLowerCase().includes(eventName.toLowerCase())
      ) {
        return dataFile;
      }
    }
  }

  return null;
}

// 生成修复建议
function generateFixSuggestions() {
  console.log('💡 生成修复建议...');

  const embeddedPages = scanPageEmbeddedData();
  const dataFiles = scanDataFiles();
  const suggestions = [];

  for (const page of embeddedPages) {
    const matchedDataFile = matchPageToDataFile(page.relativePath, dataFiles);

    suggestions.push({
      page: page.relativePath,
      issue: 'EMBEDDED_DATA',
      severity: 'HIGH',
      description: '页面使用内嵌数据，违反单一数据源原则',
      suggestion: matchedDataFile
        ? `使用数据文件: ${matchedDataFile.relativePath}`
        : '需要创建对应的数据文件',
      action: matchedDataFile ? 'CONVERT_TO_IMPORT' : 'CREATE_DATA_FILE',
      matchedDataFile: matchedDataFile,
      embeddedDataConst: page.dataConstName,
    });
  }

  return suggestions;
}

// 生成报告
function generateReport(suggestions) {
  console.log('📊 生成修复报告...');

  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalPages: suggestions.length,
      highSeverity: suggestions.filter(s => s.severity === 'HIGH').length,
      autoFixable: suggestions.filter(s => s.action === 'CONVERT_TO_IMPORT')
        .length,
      needsManualWork: suggestions.filter(s => s.action === 'CREATE_DATA_FILE')
        .length,
    },
    details: suggestions,
    recommendations: [
      '立即修复所有EMBEDDED_DATA问题',
      '建立数据验证流程',
      '设置CI检查防止未来出现双重数据源',
      '为缺失数据文件的页面创建对应数据文件',
    ],
  };

  // 确保报告目录存在
  const reportDir = path.dirname(CONFIG.logFile);
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }

  fs.writeFileSync(CONFIG.logFile, JSON.stringify(report, null, 2));
  console.log(`📋 报告已保存: ${CONFIG.logFile}`);

  return report;
}

// 主函数
async function main() {
  console.log('🚀 开始修复双重数据源问题...');
  console.log('='.repeat(50));

  ensureBackupDir();

  const suggestions = generateFixSuggestions();
  const report = generateReport(suggestions);

  console.log('\n📊 修复概览:');
  console.log(`- 发现问题页面: ${report.summary.totalPages}`);
  console.log(`- 高优先级: ${report.summary.highSeverity}`);
  console.log(`- 可自动修复: ${report.summary.autoFixable}`);
  console.log(`- 需手动处理: ${report.summary.needsManualWork}`);

  console.log('\n🎯 分析完成！请查看报告文件了解详情。');

  // 显示详细建议
  if (suggestions.length > 0) {
    console.log('\n🔍 发现的问题页面:');
    suggestions.forEach((suggestion, index) => {
      console.log(`${index + 1}. ${suggestion.page}`);
      console.log(`   问题: ${suggestion.description}`);
      console.log(`   建议: ${suggestion.suggestion}`);
      console.log(`   操作: ${suggestion.action}`);
      console.log('');
    });
  }
}

// 错误处理
process.on('uncaughtException', error => {
  console.error('❌ 发生错误:', error.message);
  process.exit(1);
});

main().catch(console.error);
