const fs = require('fs');
const path = require('path');

/**
 * 分析页面描述的来源
 * 检查哪些是硬编码的，哪些来自数据库
 */

// 定义可能的硬编码描述模式
const HARDCODED_PATTERNS = [
  /精彩的花火大会活动，绚烂的烟花表演不容错过！/,
  /是一个美丽的赏花活动.*在这里可以欣赏到美丽的樱花，感受春天的浪漫气息/,
  /是一个传统的日本祭典.*这个祭典充满了传统文化的魅力/,
  /是一个精彩的红叶观赏活动.*可以欣赏到绚烂的秋叶/,
  /是一场璀璨的灯光秀活动.*可以欣赏到美丽的灯光装饰/,
  /是一场精彩的文化活动.*欢迎参与体验丰富多彩的文化内容/,
  /探索.*最精彩的活动体验/,
  /精彩的.*活动现场照片/,
  /传统的.*活动现场照片/,
  /美丽的.*活动现场照片/,
  /记录了活动的精彩瞬间/,
];

// 统计结果
const statistics = {
  totalPages: 0,
  hardcodedDescriptions: 0,
  databaseDescriptions: 0,
  emptyDescriptions: 0,
  hardcodedFiles: [],
  databaseFiles: [],
  emptyFiles: []
};

function isHardcodedDescription(description) {
  if (!description) return false;
  return HARDCODED_PATTERNS.some(pattern => pattern.test(description));
}

function analyzePageFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const relativePath = path.relative(process.cwd(), filePath);
    
    // 查找描述字段
    const descriptionMatches = content.match(/description:\s*([^,\n]+)/g);
    
    if (!descriptionMatches) {
      statistics.emptyFiles.push(relativePath);
      statistics.emptyDescriptions++;
      return;
    }
    
    let hasHardcoded = false;
    let hasDatabase = false;
    
    descriptionMatches.forEach(match => {
      // 提取描述内容
      const descContent = match.replace(/description:\s*/, '').trim();
      
      // 检查是否是数据库字段引用
      if (descContent.includes('hanabiData.description') || 
          descContent.includes('data.description') ||
          descContent.includes('activityData.description')) {
        hasDatabase = true;
      }
      // 检查是否是硬编码的描述
      else if (isHardcodedDescription(descContent)) {
        hasHardcoded = true;
      }
    });
    
    // 分类文件
    if (hasHardcoded) {
      statistics.hardcodedFiles.push(relativePath);
      statistics.hardcodedDescriptions++;
    } else if (hasDatabase) {
      statistics.databaseFiles.push(relativePath);
      statistics.databaseDescriptions++;
    } else {
      statistics.emptyFiles.push(relativePath);
      statistics.emptyDescriptions++;
    }
    
  } catch (error) {
    console.error(`分析文件时出错 ${filePath}:`, error.message);
  }
}

function scanDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);
  
  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      scanDirectory(fullPath);
    } else if (file === 'page.tsx') {
      statistics.totalPages++;
      analyzePageFile(fullPath);
    }
  });
}

function generateReport() {
  console.log('📊 页面描述来源分析报告');
  console.log('=====================================\n');
  
  console.log(`📄 总页面数: ${statistics.totalPages}`);
  console.log(`🔴 硬编码描述页面: ${statistics.hardcodedDescriptions} (${(statistics.hardcodedDescriptions/statistics.totalPages*100).toFixed(1)}%)`);
  console.log(`🟢 数据库描述页面: ${statistics.databaseDescriptions} (${(statistics.databaseDescriptions/statistics.totalPages*100).toFixed(1)}%)`);
  console.log(`⚪ 空描述页面: ${statistics.emptyDescriptions} (${(statistics.emptyDescriptions/statistics.totalPages*100).toFixed(1)}%)\n`);
  
  // 显示硬编码描述的文件
  if (statistics.hardcodedFiles.length > 0) {
    console.log('🔴 硬编码描述的页面文件:');
    statistics.hardcodedFiles.slice(0, 10).forEach((file, index) => {
      console.log(`${index + 1}. ${file}`);
    });
    if (statistics.hardcodedFiles.length > 10) {
      console.log(`   ... 还有 ${statistics.hardcodedFiles.length - 10} 个文件`);
    }
    console.log('');
  }
  
  // 显示数据库描述的文件
  if (statistics.databaseFiles.length > 0) {
    console.log('🟢 使用数据库描述的页面文件:');
    statistics.databaseFiles.slice(0, 10).forEach((file, index) => {
      console.log(`${index + 1}. ${file}`);
    });
    if (statistics.databaseFiles.length > 10) {
      console.log(`   ... 还有 ${statistics.databaseFiles.length - 10} 个文件`);
    }
    console.log('');
  }
  
  // 问题分析
  console.log('🔍 问题分析:');
  if (statistics.hardcodedDescriptions > 0) {
    console.log(`❌ 发现 ${statistics.hardcodedDescriptions} 个页面使用硬编码描述`);
    console.log('   这些描述不是来自数据库，而是在页面文件中直接写死的');
    console.log('   这可能是由以前的脚本生成的模板化描述');
  }
  
  if (statistics.databaseDescriptions > 0) {
    console.log(`✅ 有 ${statistics.databaseDescriptions} 个页面正确使用数据库描述`);
    console.log('   这些页面从数据库的description字段获取描述内容');
  }
  
  if (statistics.emptyDescriptions > 0) {
    console.log(`⚠️  有 ${statistics.emptyDescriptions} 个页面没有描述内容`);
  }
  
  console.log('\n💡 建议解决方案:');
  console.log('1. 移除所有硬编码的描述，改为使用数据库字段');
  console.log('2. 为数据库中的记录添加真实的description内容');
  console.log('3. 统一使用模板中的 data.description || \'默认描述\' 逻辑');
  console.log('4. 删除所有自动生成的模板化描述');
}

// 执行分析
console.log('🔍 开始分析页面描述来源...\n');
scanDirectory('app');
generateReport(); 