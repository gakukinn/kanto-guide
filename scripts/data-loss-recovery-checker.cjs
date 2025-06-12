#!/usr/bin/env node

/**
 * 数据丢失检测和恢复验证工具
 * 检测重构前后的数据完整性，防止商业网站数据丢失
 */

const fs = require('fs');
const path = require('path');

// 颜色输出函数
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function colorize(text, color) {
  return `${colors[color]}${text}${colors.reset}`;
}

// 扫描详情页目录
function scanDetailDirectories(region) {
  const hanabiPath = path.join('src', 'app', region, 'hanabi');
  if (!fs.existsSync(hanabiPath)) return [];
  
  const items = fs.readdirSync(hanabiPath);
  return items.filter(item => {
    const itemPath = path.join(hanabiPath, item);
    return fs.statSync(itemPath).isDirectory() && 
           fs.existsSync(path.join(itemPath, 'page.tsx'));
  });
}

// 扫描主页面数据
function scanMainPageData(region) {
  const pagePath = path.join('src', 'app', region, 'hanabi', 'page.tsx');
  if (!fs.existsSync(pagePath)) return [];
  
  try {
    const content = fs.readFileSync(pagePath, 'utf8');
    const matches = content.match(/id:\s*['"](.*?)['"]/g) || [];
    return matches.map(match => match.match(/id:\s*['"](.*?)['"]/)[1]);
  } catch (error) {
    console.error(`读取 ${pagePath} 失败:`, error.message);
    return [];
  }
}

// 检查地区数据完整性
function checkRegionIntegrity(region) {
  console.log(colorize(`\n📊 检查 ${region.toUpperCase()} 地区数据完整性`, 'cyan'));
  
  const detailDirs = scanDetailDirectories(region);
  const mainPageIds = scanMainPageData(region);
  
  console.log(colorize(`详情页目录数量: ${detailDirs.length}`, 'blue'));
  console.log(colorize(`主页面活动数量: ${mainPageIds.length}`, 'blue'));
  
  const integrity = {
    region,
    detailDirsCount: detailDirs.length,
    mainPageIdsCount: mainPageIds.length,
    detailDirs,
    mainPageIds,
    hasDataLoss: Math.abs(detailDirs.length - mainPageIds.length) > 0,
    lossAmount: Math.abs(detailDirs.length - mainPageIds.length)
  };
  
  if (integrity.hasDataLoss) {
    console.log(colorize(`⚠️  发现数据不一致！差异: ${integrity.lossAmount}`, 'red'));
    if (detailDirs.length > mainPageIds.length) {
      console.log(colorize(`缺失主页面数据: ${detailDirs.length - mainPageIds.length} 个`, 'yellow'));
    } else {
      console.log(colorize(`缺失详情页面: ${mainPageIds.length - detailDirs.length} 个`, 'yellow'));
    }
  } else {
    console.log(colorize(`✅ 数据完整`, 'green'));
  }
  
  return integrity;
}

// 生成修复建议
function generateRecoveryPlan(integrityResults) {
  console.log(colorize('\n🔧 数据恢复建议', 'magenta'));
  
  const totalDataLoss = integrityResults.reduce((sum, result) => sum + result.lossAmount, 0);
  
  if (totalDataLoss === 0) {
    console.log(colorize('✅ 所有地区数据完整，无需修复', 'green'));
    return;
  }
  
  console.log(colorize(`\n总计数据丢失: ${totalDataLoss} 项`, 'red'));
  
  integrityResults.forEach(result => {
    if (result.hasDataLoss) {
      console.log(colorize(`\n📍 ${result.region.toUpperCase()} 地区修复计划:`, 'yellow'));
      
      if (result.detailDirsCount > result.mainPageIdsCount) {
        console.log(`- 需要恢复主页面数据: ${result.detailDirsCount - result.mainPageIdsCount} 个`);
        console.log(`- 已有详情页: ${result.detailDirs.join(', ')}`);
        console.log(`- 建议: 检查原始备份文件，恢复缺失的活动数据到主页面`);
      } else {
        console.log(`- 需要创建详情页: ${result.mainPageIdsCount - result.detailDirsCount} 个`);
        console.log(`- 主页面已有: ${result.mainPageIds.join(', ')}`);
        console.log(`- 建议: 为缺失的活动创建详情页目录和文件`);
      }
    }
  });
  
  // GitHub恢复建议
  console.log(colorize('\n📋 GitHub版本控制补救措施:', 'cyan'));
  console.log('1. 立即创建备份分支: git checkout -b data-recovery-backup');
  console.log('2. 提交当前状态: git add . && git commit -m "数据丢失检测点"');
  console.log('3. 创建修复分支: git checkout -b fix-data-loss');
  console.log('4. 逐步恢复数据，每个地区提交一次');
  console.log('5. 完成后合并: git checkout master && git merge fix-data-loss');
}

// 主函数
function main() {
  console.log(colorize('🚨 商业网站数据丢失检测工具', 'bold'));
  console.log(colorize('严格遵循铁律：不能编造、删减或擅自修改任何信息', 'red'));
  
  const regions = ['tokyo', 'saitama', 'chiba', 'kanagawa', 'kitakanto', 'koshinetsu'];
  const results = [];
  
  regions.forEach(region => {
    const integrity = checkRegionIntegrity(region);
    results.push(integrity);
  });
  
  // 生成总结报告
  console.log(colorize('\n📈 数据完整性总结', 'bold'));
  
  const totalDetailDirs = results.reduce((sum, r) => sum + r.detailDirsCount, 0);
  const totalMainPageIds = results.reduce((sum, r) => sum + r.mainPageIdsCount, 0);
  const problemRegions = results.filter(r => r.hasDataLoss);
  
  console.log(`总详情页数量: ${totalDetailDirs}`);
  console.log(`总主页面活动数量: ${totalMainPageIds}`);
  console.log(`问题地区数量: ${problemRegions.length}/${regions.length}`);
  
  if (problemRegions.length > 0) {
    console.log(colorize('\n❌ 发现严重数据丢失问题！', 'red'));
    console.log(colorize('这违反了商业网站铁律，必须立即修复！', 'red'));
  } else {
    console.log(colorize('\n✅ 所有地区数据完整', 'green'));
  }
  
  generateRecoveryPlan(results);
  
  // 生成JSON报告
  const report = {
    timestamp: new Date().toISOString(),
    totalRegions: regions.length,
    problemRegions: problemRegions.length,
    totalDataLoss: results.reduce((sum, r) => sum + r.lossAmount, 0),
    details: results
  };
  
  fs.writeFileSync('data-integrity-report.json', JSON.stringify(report, null, 2));
  console.log(colorize('\n📄 详细报告已保存到: data-integrity-report.json', 'blue'));
}

if (require.main === module) {
  main();
}

module.exports = { checkRegionIntegrity, scanDetailDirectories, scanMainPageData }; 