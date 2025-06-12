const fs = require('fs');
const path = require('path');

// 第五层页面质量检查
function validateLevel5Pages() {
  console.log('🔍 开始第五层页面质量检查...\n');
  
  const issues = [];
  const dataDir = path.join(__dirname, '../src/data');
  const appDir = path.join(__dirname, '../src/app/august/hanabi/tokyo');
  
  // 1. 检查数据文件完整性
  console.log('📄 检查数据文件...');
  const level5Files = fs.readdirSync(dataDir)
    .filter(file => file.startsWith('level5-august-') && file.endsWith('-hanabi.ts'))
    .filter(file => !file.includes('hanabi-tokyo')); // 排除重复文件
  
  console.log(`发现 ${level5Files.length} 个第五层数据文件`);
  
  level5Files.forEach(file => {
    const filePath = path.join(dataDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // 检查必需字段
    const requiredFields = [
      'mapEmbedUrl',
      'date: \'2025年8月',
      'media:',
      'venues:',
      'access:',
      'viewingSpots:',
      'specialFeatures:',
      'special2025:'
    ];
    
    requiredFields.forEach(field => {
      if (!content.includes(field)) {
        issues.push(`❌ ${file}: 缺少字段 ${field}`);
      }
    });
    
    // 检查日期格式
    if (!content.match(/date:\s*['"]2025年8月\d+日['"]/)) {
      issues.push(`❌ ${file}: 日期格式不正确，应为"2025年8月X日"`);
    }
    
    // 检查图片路径
    if (content.includes('.jpg') && !content.includes('.svg')) {
      issues.push(`⚠️ ${file}: 仍使用.jpg图片，建议使用.svg`);
    }
  });
  
  // 2. 检查页面文件存在性
  console.log('\n📱 检查页面文件...');
  const pageLocations = ['itabashi', 'edogawa', 'kozushima', 'okutama', 'jingu-gaien', 'akishima'];
  
  pageLocations.forEach(location => {
    const pagePath = path.join(appDir, location, 'page.tsx');
    if (!fs.existsSync(pagePath)) {
      issues.push(`❌ 缺少页面文件: /august/hanabi/tokyo/${location}/page.tsx`);
    } else {
      const pageContent = fs.readFileSync(pagePath, 'utf8');
      
      // 检查页面是否正确导入数据
      const expectedImport = `level5-august-${location}-hanabi`;
      if (!pageContent.includes(expectedImport)) {
        issues.push(`❌ ${location}/page.tsx: 数据导入路径可能不正确`);
      }
      
      // 检查是否有metadata导出（会导致编译错误）
      if (pageContent.includes('export const metadata')) {
        issues.push(`⚠️ ${location}/page.tsx: 包含metadata导出，可能导致编译错误`);
      }
    }
  });
  
  // 3. 检查第四层链接一致性
  console.log('\n🔗 检查第四层链接...');
  const level4Path = path.join(dataDir, 'level4-august-tokyo-hanabi.ts');
  if (fs.existsSync(level4Path)) {
    const level4Content = fs.readFileSync(level4Path, 'utf8');
    
    pageLocations.forEach(location => {
      const expectedLink = `/august/hanabi/tokyo/${location}`;
      if (!level4Content.includes(expectedLink)) {
        issues.push(`❌ 第四层数据缺少链接: ${expectedLink}`);
      }
    });
  }
  
  // 4. 输出检查结果
  console.log('\n📊 质量检查结果:');
  
  if (issues.length === 0) {
    console.log('✅ 所有检查通过！第五层页面质量优秀。');
  } else {
    console.log(`发现 ${issues.length} 个问题:`);
    issues.forEach(issue => console.log(`  ${issue}`));
  }
  
  // 5. 生成优化建议
  console.log('\n💡 优化建议:');
  console.log('1. 确保所有页面包含完整的观赏攻略信息');
  console.log('2. 统一使用SVG格式的花火图片');
  console.log('3. 添加更多实用的交通和住宿建议');
  console.log('4. 考虑添加实时更新功能');
  
  return issues;
}

// 生成页面性能分析
function analyzePagePerformance() {
  console.log('\n⚡ 页面性能分析...');
  
  const recommendations = {
    images: {
      current: 'SVG格式占位符',
      recommendation: '考虑添加真实花火照片（WebP格式）',
      priority: 'medium'
    },
    content: {
      current: '详细的花火信息',
      recommendation: '添加用户评价和历史回顾',
      priority: 'low'
    },
    interactivity: {
      current: '基本展示功能',
      recommendation: '添加收藏、分享功能',
      priority: 'high'
    },
    seo: {
      current: '基本SEO优化',
      recommendation: '添加针对性关键词优化',
      priority: 'high'
    }
  };
  
  Object.entries(recommendations).forEach(([area, info]) => {
    console.log(`📈 ${area}:`);
    console.log(`   当前: ${info.current}`);
    console.log(`   建议: ${info.recommendation}`);
    console.log(`   优先级: ${info.priority}`);
  });
  
  return recommendations;
}

// 主执行函数
function runQualityCheck() {
  console.log('🚀 启动第五层页面质量检查系统...\n');
  
  try {
    const issues = validateLevel5Pages();
    const recommendations = analyzePagePerformance();
    
    console.log('\n🎯 检查完成！');
    
    // 返回检查结果
    return {
      issues,
      recommendations,
      status: issues.length === 0 ? 'excellent' : 'needs_improvement'
    };
  } catch (error) {
    console.error('❌ 质量检查过程中出现错误:', error);
    return { error: error.message };
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  runQualityCheck();
}

module.exports = { runQualityCheck, validateLevel5Pages, analyzePagePerformance }; 