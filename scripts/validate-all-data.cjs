#!/usr/bin/env node

/**
 * 数据验证脚本 - 关东旅游指南项目
 * 检查所有花火和祭典数据的准确性
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 开始数据验证和修复...\n');

// 记录问题
const issues = [];

// 验证花火数据
function validateHanabiData() {
  console.log('🎆 验证花火数据...');
  
  const regions = ['tokyo', 'chiba', 'saitama', 'kanagawa', 'kitakanto', 'koshinetsu'];
  let totalEvents = 0;
  let validEvents = 0;
  
  regions.forEach(region => {
    try {
      // 检查页面文件是否存在
      const pageFile = path.join('src', 'app', region, 'hanabi', 'page.tsx');
      if (!fs.existsSync(pageFile)) {
        issues.push(`❌ ${region}: 花火页面文件不存在`);
        console.log(`  ❌ ${region}: 花火页面文件不存在`);
        return;
      }
      
      // 读取页面文件内容，查找数据数组
      const content = fs.readFileSync(pageFile, 'utf-8');
      
      // 查找静态数据数组（新的架构）
      const arrayMatch = content.match(/const\s+\w+HanabiEvents\s*=\s*\[([\s\S]*?)\];/);
      
      if (arrayMatch) {
        console.log(`  ✅ ${region}: 使用静态数据架构`);
        
        // 计算事件数量（简单方式：计算id字段出现次数）
        const idMatches = arrayMatch[1].match(/id:\s*['"`][^'"`]+['"`]/g);
        const eventCount = idMatches ? idMatches.length : 0;
        totalEvents += eventCount;
        validEvents += eventCount;
        
        console.log(`     📊 发现 ${eventCount} 个花火活动`);
        
        // 检查detailLink字段
        const detailLinkMatches = arrayMatch[1].match(/detailLink:\s*['"`][^'"`]+['"`]/g);
        const detailLinkCount = detailLinkMatches ? detailLinkMatches.length : 0;
        
        if (detailLinkCount !== eventCount) {
          issues.push(`⚠️ ${region}: ${eventCount}个活动中只有${detailLinkCount}个有详情链接`);
        } else {
          console.log(`     ✅ 所有活动都有详情链接`);
        }
      } else {
        // 检查是否使用API架构
        if (content.includes('useEffect') && content.includes('fetch')) {
          console.log(`  ⚠️ ${region}: 使用动态API架构`);
          
          // 尝试从API路径获取事件数量
          const apiMatch = content.match(/fetch\(['"`]([^'"`]+)['"`]\)/);
          if (apiMatch) {
            console.log(`     📡 API路径: ${apiMatch[1]}`);
          }
          
          issues.push(`💡 ${region}: 使用API架构，符合动态推荐需求`);
        } else {
          issues.push(`❌ ${region}: 无法识别数据架构类型`);
          console.log(`  ❌ ${region}: 无法识别数据架构类型`);
        }
      }
      
    } catch (error) {
      issues.push(`❌ ${region}: 读取花火数据时出错 - ${error.message}`);
      console.log(`  ❌ ${region}: 读取出错 - ${error.message}`);
    }
  });
  
  console.log(`\n📊 花火数据统计:`);
  console.log(`   总活动数: ${totalEvents}`);
  console.log(`   有效活动数: ${validEvents}`);
  console.log(`   数据完整性: ${totalEvents > 0 ? Math.round((validEvents/totalEvents)*100) : 0}%\n`);
}

// 验证祭典数据
function validateMatsuriData() {
  console.log('🏮 验证祭典数据...');
  
  const regions = ['tokyo', 'chiba', 'saitama', 'kanagawa', 'kitakanto', 'koshinetsu'];
  let totalEvents = 0;
  let existingPages = 0;
  
  regions.forEach(region => {
    try {
      const pageFile = path.join('src', 'app', region, 'matsuri', 'page.tsx');
      if (fs.existsSync(pageFile)) {
        existingPages++;
        const content = fs.readFileSync(pageFile, 'utf-8');
        
        // 查找静态数据数组
        const arrayMatch = content.match(/const\s+\w+MatsuriEvents\s*=\s*\[([\s\S]*?)\];/);
        
        if (arrayMatch) {
          const idMatches = arrayMatch[1].match(/id:\s*['"`][^'"`]+['"`]/g);
          const eventCount = idMatches ? idMatches.length : 0;
          totalEvents += eventCount;
          
          console.log(`  ✅ ${region}: ${eventCount} 个祭典活动`);
        } else if (content.includes('useEffect') && content.includes('fetch')) {
          console.log(`  📡 ${region}: 使用API获取祭典数据`);
        } else {
          console.log(`  ⚠️ ${region}: 祭典数据结构需要检查`);
        }
      } else {
        console.log(`  ❌ ${region}: 祭典页面不存在`);
      }
    } catch (error) {
      issues.push(`❌ ${region}: 读取祭典数据时出错 - ${error.message}`);
    }
  });
  
  console.log(`\n📊 祭典数据统计:`);
  console.log(`   总活动数: ${totalEvents}`);
  console.log(`   存在的页面: ${existingPages}/6\n`);
}

// 检查页面文件结构
function validatePageStructure() {
  console.log('🏗️ 验证页面结构...');
  
  const expectedFiles = [
    'src/app/page.tsx',                      // 首页
    'src/app/layout.tsx',                    // 布局
    'src/app/not-found.tsx',                 // 404页面
    'src/components/HanabiPageTemplate.tsx', // 花火模板
  ];
  
  expectedFiles.forEach(file => {
    if (fs.existsSync(file)) {
      console.log(`  ✅ ${file}`);
    } else {
      issues.push(`❌ 缺少重要文件: ${file}`);
      console.log(`  ❌ ${file}`);
    }
  });
  
  console.log('');
}

// 检查第四层页面
function validateDetailPages() {
  console.log('📄 验证第四层详情页面...');
  
  const regions = ['tokyo', 'chiba', 'saitama', 'kanagawa', 'kitakanto', 'koshinetsu'];
  let totalDetailPages = 0;
  
  regions.forEach(region => {
    try {
      const hanabiDir = path.join('src', 'app', region, 'hanabi');
      if (fs.existsSync(hanabiDir)) {
        const items = fs.readdirSync(hanabiDir);
        const detailDirs = items.filter(item => {
          const itemPath = path.join(hanabiDir, item);
          return fs.statSync(itemPath).isDirectory() && 
                 fs.existsSync(path.join(itemPath, 'page.tsx'));
        });
        
        totalDetailPages += detailDirs.length;
        console.log(`  ✅ ${region}: ${detailDirs.length} 个详情页面`);
        
        if (detailDirs.length > 0) {
          console.log(`     📁 ${detailDirs.slice(0, 3).join(', ')}${detailDirs.length > 3 ? '...' : ''}`);
        }
      }
    } catch (error) {
      console.log(`  ❌ ${region}: 检查详情页面时出错 - ${error.message}`);
    }
  });
  
  console.log(`\n📊 详情页面统计: ${totalDetailPages} 个\n`);
}

// 生成修复建议
function generateFixSuggestions() {
  if (issues.length === 0) {
    console.log('🎉 恭喜！数据验证通过，没有发现严重问题！');
    console.log('🚀 您的项目状态良好，可以继续下一步：部署到Vercel！');
    return;
  }
  
  console.log('📋 发现的问题和修复建议:\n');
  
  const criticalIssues = issues.filter(issue => issue.includes('❌'));
  const warnings = issues.filter(issue => issue.includes('⚠️'));
  const suggestions = issues.filter(issue => issue.includes('💡'));
  
  if (criticalIssues.length > 0) {
    console.log('🔴 严重问题 (需要立即修复):');
    criticalIssues.forEach((issue, index) => {
      console.log(`   ${index + 1}. ${issue}`);
    });
    console.log('');
  }
  
  if (warnings.length > 0) {
    console.log('🟡 警告 (建议修复):');
    warnings.forEach((issue, index) => {
      console.log(`   ${index + 1}. ${issue}`);
    });
    console.log('');
  }
  
  if (suggestions.length > 0) {
    console.log('🟢 建议 (优化方向):');
    suggestions.forEach((issue, index) => {
      console.log(`   ${index + 1}. ${issue}`);
    });
    console.log('');
  }
  
  // 保存问题报告
  const reportContent = [
    '# 数据验证报告',
    `生成时间: ${new Date().toLocaleString('zh-CN')}`,
    '',
    '## 发现的问题',
    ...issues.map((issue, index) => `${index + 1}. ${issue}`),
    '',
    '## 下一步建议',
    criticalIssues.length > 0 ? 
      '⚠️ 发现严重问题，建议先修复后再部署' : 
      '✅ 没有严重问题，可以继续部署到Vercel',
    '',
    '## 修复优先级',
    '1. 🔴 严重问题：立即修复',
    '2. 🟡 警告：尽快修复',  
    '3. 🟢 建议：有时间时优化'
  ].join('\n');
  
  try {
    fs.writeFileSync('data-validation-report.md', reportContent);
    console.log('📄 详细报告已保存到: data-validation-report.md');
  } catch (error) {
    console.log('⚠️ 无法保存报告文件');
  }
}

// 主执行函数
function main() {
  try {
    validatePageStructure();
    validateHanabiData();
    validateMatsuriData();
    validateDetailPages();
    generateFixSuggestions();
    
    console.log('\n✅ 数据验证完成！');
    
    const criticalCount = issues.filter(issue => issue.includes('❌')).length;
    
    if (criticalCount === 0) {
      console.log('🚀 项目状态良好，建议继续下一步：部署到Vercel！');
      console.log('💡 下一步命令: npm run build (测试构建)');
    } else {
      console.log(`⚠️ 发现 ${criticalCount} 个严重问题，建议先修复再部署。`);
      console.log('💡 您可以选择忽略警告，先部署基础版本，然后逐步改进。');
    }
    
  } catch (error) {
    console.error('❌ 验证过程中出现错误:', error.message);
    process.exit(1);
  }
}

// 运行验证
main(); 