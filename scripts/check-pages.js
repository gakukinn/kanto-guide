#!/usr/bin/env node
/**
 * 🔍 四层花火页面检查脚本
 * 运行命令: node scripts/check-pages.js
 */

const fs = require('fs');
const path = require('path');

// 页面配置
const LEVEL4_PAGES = [
  // 七月页面
  { path: 'src/app/july/hanabi/tokyo', dataFile: 'src/data/level4-july-tokyo-hanabi.ts', region: '东京' },
  { path: 'src/app/july/hanabi/saitama', dataFile: 'src/data/level4-july-saitama-hanabi.ts', region: '埼玉' },
  { path: 'src/app/july/hanabi/chiba', dataFile: 'src/data/level4-july-chiba-hanabi.ts', region: '千叶' },
  { path: 'src/app/july/hanabi/kanagawa', dataFile: 'src/data/level4-july-kanagawa-hanabi.ts', region: '神奈川' },
  { path: 'src/app/july/hanabi/kitakanto', dataFile: 'src/data/level4-july-kitakanto-hanabi.ts', region: '北关东' },
  { path: 'src/app/july/hanabi/koshinetsu', dataFile: 'src/data/level4-july-koshinetsu-hanabi.ts', region: '甲信越' },
  
  // 八月页面
  { path: 'src/app/august/hanabi/tokyo', dataFile: 'src/data/level4-august-tokyo-hanabi.ts', region: '东京' },
  { path: 'src/app/august/hanabi/saitama', dataFile: 'src/data/level4-august-saitama-hanabi.ts', region: '埼玉' },
  { path: 'src/app/august/hanabi/chiba', dataFile: 'src/data/level4-august-chiba-hanabi.ts', region: '千叶' },
  { path: 'src/app/august/hanabi/kanagawa', dataFile: 'src/data/level4-august-kanagawa-hanabi.ts', region: '神奈川' },
  { path: 'src/app/august/hanabi/kitakanto', dataFile: 'src/data/level4-august-kitakanto-hanabi.ts', region: '北关东' },
  { path: 'src/app/august/hanabi/koshinetsu', dataFile: 'src/data/level4-august-koshinetsu-hanabi.ts', region: '甲信越' }
];

function checkPageExists(pagePath) {
  const pageFile = path.join(pagePath, 'page.tsx');
  return fs.existsSync(pageFile);
}

function checkDataFileExists(dataFilePath) {
  return fs.existsSync(dataFilePath);
}

function analyzeDataFile(dataFilePath) {
  if (!fs.existsSync(dataFilePath)) {
    return { exists: false, events: 0, issues: ['文件不存在'] };
  }

  try {
    const content = fs.readFileSync(dataFilePath, 'utf8');
    const issues = [];
    
    // 检查内容
    if (!content.includes('export const regionInfo')) {
      issues.push('缺少regionInfo配置');
    }
    
    if (!content.includes('export const monthInfo')) {
      issues.push('缺少monthInfo配置');
    }

    // 计算事件数量
    const eventMatches = content.match(/{\s*id:/g);
    const eventCount = eventMatches ? eventMatches.length : 0;

    // 检查日文字符
    const japaneseRegex = /[\u3040-\u309F\u30A0-\u30FF]/;
    if (japaneseRegex.test(content)) {
      const lines = content.split('\n');
      lines.forEach((line, index) => {
        if (japaneseRegex.test(line) && line.includes('name:')) {
          issues.push(`第${index + 1}行包含日文字符: ${line.trim().substring(0, 50)}...`);
        }
      });
    }

    return {
      exists: true,
      events: eventCount,
      issues,
      hasRegionInfo: content.includes('export const regionInfo'),
      hasMonthInfo: content.includes('export const monthInfo')
    };
    
  } catch (error) {
    return { exists: true, events: 0, issues: [`文件读取错误: ${error.message}`] };
  }
}

function main() {
  console.log('🔍 开始检查四层花火页面...\n');
  
  let totalPages = 0;
  let passedPages = 0;
  let totalIssues = 0;

  LEVEL4_PAGES.forEach(pageConfig => {
    totalPages++;
    const { path: pagePath, dataFile, region } = pageConfig;
    
    console.log(`📄 检查 ${region} 花火页面:`);
    console.log(`   页面路径: ${pagePath}`);
    console.log(`   数据文件: ${dataFile}`);
    
    const issues = [];
    
    // 检查页面文件
    if (!checkPageExists(pagePath)) {
      issues.push('❌ 页面文件 page.tsx 不存在');
    } else {
      console.log('   ✅ 页面文件存在');
    }
    
    // 检查数据文件
    const dataAnalysis = analyzeDataFile(dataFile);
    if (!dataAnalysis.exists) {
      issues.push('❌ 数据文件不存在');
    } else {
      console.log(`   ✅ 数据文件存在 (${dataAnalysis.events}个事件)`);
      
      if (!dataAnalysis.hasRegionInfo) {
        issues.push('❌ 缺少regionInfo配置');
      }
      
      if (!dataAnalysis.hasMonthInfo) {
        issues.push('❌ 缺少monthInfo配置');
      }
      
      if (dataAnalysis.events === 0) {
        issues.push('❌ 没有花火事件数据');
      }
      
      dataAnalysis.issues.forEach(issue => {
        issues.push(`❌ ${issue}`);
      });
    }
    
    // 输出结果
    if (issues.length === 0) {
      console.log('   🎉 检查通过！\n');
      passedPages++;
    } else {
      console.log('   需要修复的问题:');
      issues.forEach(issue => console.log(`      ${issue}`));
      console.log('');
      totalIssues += issues.length;
    }
  });

  // 总结报告
  console.log('📊 检查总结报告');
  console.log('=====================================');
  console.log(`总页面数: ${totalPages}`);
  console.log(`通过检查: ${passedPages} ✅`);
  console.log(`需要修复: ${totalPages - passedPages} ❌`);
  console.log(`总问题数: ${totalIssues}`);
  console.log(`通过率: ${Math.round((passedPages / totalPages) * 100)}%`);
  
  if (passedPages === totalPages) {
    console.log('\n🎉 恭喜！所有四层花火页面都通过了检查！');
  } else {
    console.log('\n🔧 请修复上述问题后重新检查');
  }
}

main(); 