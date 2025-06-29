const fs = require('fs');
const path = require('path');

/**
 * 验证所有四层页面的描述字段清理结果
 * 确保所有页面都使用数据库字段格式
 */

// 统计结果
const statistics = {
  totalPages: 0,
  correctFormat: 0,
  stillHardcoded: 0,
  noDescription: 0,
  correctFiles: [],
  hardcodedFiles: [],
  noDescriptionFiles: []
};

// 定义正确的格式模式
const CORRECT_PATTERNS = [
  /description:\s*hanabiData\.description\s*\|\|\s*""/,
  /description:\s*activityData\.description\s*\|\|\s*""/,
  /description:\s*data\.description\s*\|\|\s*""/,
  /description:\s*[a-zA-Z]+Data\.description\s*\|\|\s*""/
];

// 定义硬编码模式（应该已经被清理）
const HARDCODED_PATTERNS = [
  /description:\s*"[^"]*精彩的[^"]*活动[^"]*"/,
  /description:\s*"[^"]*美丽的[^"]*活动[^"]*"/,
  /description:\s*"[^"]*传统的[^"]*祭典[^"]*"/,
  /description:\s*"[^"]*璀璨的灯光秀[^"]*"/,
  /description:\s*"[^"]*红叶观赏[^"]*"/,
  /description:\s*"[^"]*文化活动[^"]*"/
];

/**
 * 检查是否是四层页面
 */
function isFourthLayerPage(filePath) {
  const relativePath = path.relative('app', filePath);
  const pathParts = relativePath.split(path.sep);
  
  // 四层页面格式：region/activity/detail/page.tsx
  return pathParts.length === 4 && pathParts[3] === 'page.tsx';
}

/**
 * 验证页面文件的描述格式
 */
function verifyPageFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const relativePath = path.relative(process.cwd(), filePath);
    
    // 检查是否有description字段
    const hasDescription = /description:\s*/.test(content);
    
    if (!hasDescription) {
      statistics.noDescription++;
      statistics.noDescriptionFiles.push(relativePath);
      console.log(`⚪ 无描述字段: ${relativePath}`);
      return;
    }
    
    // 检查是否使用正确格式
    const isCorrectFormat = CORRECT_PATTERNS.some(pattern => pattern.test(content));
    
    if (isCorrectFormat) {
      statistics.correctFormat++;
      statistics.correctFiles.push(relativePath);
      console.log(`✅ 格式正确: ${relativePath}`);
      return;
    }
    
    // 检查是否仍有硬编码
    const isHardcoded = HARDCODED_PATTERNS.some(pattern => pattern.test(content));
    
    if (isHardcoded) {
      statistics.stillHardcoded++;
      statistics.hardcodedFiles.push(relativePath);
      console.log(`❌ 仍有硬编码: ${relativePath}`);
      
      // 显示具体的硬编码内容
      const descriptionMatch = content.match(/description:\s*"[^"]*"/);
      if (descriptionMatch) {
        console.log(`   内容: ${descriptionMatch[0]}`);
      }
    } else {
      // 其他格式（可能是空字符串或其他）
      statistics.noDescription++;
      statistics.noDescriptionFiles.push(relativePath);
      console.log(`⚪ 其他格式: ${relativePath}`);
      
      // 显示具体格式
      const descriptionMatch = content.match(/description:\s*[^,\n}]*/);
      if (descriptionMatch) {
        console.log(`   格式: ${descriptionMatch[0]}`);
      }
    }
    
  } catch (error) {
    console.error(`❌ 读取失败 ${filePath}:`, error.message);
  }
}

/**
 * 扫描并验证所有四层页面
 */
function scanAndVerifyPages(dirPath) {
  const files = fs.readdirSync(dirPath);
  
  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      scanAndVerifyPages(fullPath);
    } else if (file === 'page.tsx' && isFourthLayerPage(fullPath)) {
      statistics.totalPages++;
      verifyPageFile(fullPath);
    }
  });
}

/**
 * 生成验证报告
 */
function generateVerificationReport() {
  console.log('\n📊 四层页面描述字段验证报告');
  console.log('=========================================\n');
  
  console.log(`📄 总四层页面数: ${statistics.totalPages}`);
  console.log(`✅ 使用正确格式: ${statistics.correctFormat} (${(statistics.correctFormat/statistics.totalPages*100).toFixed(1)}%)`);
  console.log(`❌ 仍有硬编码: ${statistics.stillHardcoded} (${(statistics.stillHardcoded/statistics.totalPages*100).toFixed(1)}%)`);
  console.log(`⚪ 无描述字段: ${statistics.noDescription} (${(statistics.noDescription/statistics.totalPages*100).toFixed(1)}%)\n`);
  
  if (statistics.stillHardcoded > 0) {
    console.log('❌ 仍有硬编码的页面:');
    statistics.hardcodedFiles.forEach((file, index) => {
      console.log(`${index + 1}. ${file}`);
    });
    console.log('');
  }
  
  if (statistics.noDescriptionFiles.length > 0) {
    console.log('⚪ 无描述字段或其他格式的页面:');
    statistics.noDescriptionFiles.slice(0, 10).forEach((file, index) => {
      console.log(`${index + 1}. ${file}`);
    });
    if (statistics.noDescriptionFiles.length > 10) {
      console.log(`... 还有 ${statistics.noDescriptionFiles.length - 10} 个文件`);
    }
    console.log('');
  }
  
  console.log('🎯 验证结果:');
  if (statistics.stillHardcoded === 0) {
    console.log('✅ 所有硬编码描述已成功清理');
  } else {
    console.log(`❌ 还有 ${statistics.stillHardcoded} 个页面需要进一步清理`);
  }
  
  if (statistics.correctFormat === statistics.totalPages) {
    console.log('✅ 所有页面都使用正确的数据库字段格式');
  } else {
    console.log(`⚠️  有 ${statistics.totalPages - statistics.correctFormat} 个页面未使用标准格式`);
  }
  
  const cleanupSuccess = statistics.stillHardcoded === 0;
  console.log(`\n🏆 清理任务状态: ${cleanupSuccess ? '✅ 完全成功' : '⚠️ 需要进一步处理'}`);
}

// 执行验证
console.log('🔍 开始验证所有四层页面的描述字段格式...\n');
console.log('🎯 检查目标: 确保所有页面使用 data.description || "" 格式\n');

scanAndVerifyPages('app');
generateVerificationReport(); 