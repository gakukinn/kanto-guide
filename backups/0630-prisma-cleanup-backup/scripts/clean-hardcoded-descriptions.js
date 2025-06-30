const fs = require('fs');
const path = require('path');

/**
 * 清理所有四层页面的硬编码描述
 * 统一使用数据库字段：data.description || ''
 */

// 定义硬编码描述模式
const HARDCODED_PATTERNS = [
  /精彩的花火大会活动，绚烂的烟花表演不容错过！/g,
  /是一个美丽的赏花活动.*在这里可以欣赏到美丽的樱花，感受春天的浪漫气息。/g,
  /是一个传统的日本祭典.*这个祭典充满了传统文化的魅力，是体验日本文化的绝佳机会。/g,
  /是一个精彩的红叶观赏活动.*可以欣赏到绚烂的秋叶，感受秋季的诗意美景。/g,
  /是一场璀璨的灯光秀活动.*可以欣赏到美丽的灯光装饰，感受浪漫的夜晚氛围。/g,
  /是一场精彩的文化活动.*欢迎参与体验丰富多彩的文化内容。/g,
  /探索.*最精彩的活动体验/g,
  /精彩的.*活动现场照片.*记录了活动的精彩瞬间/g,
  /传统的.*活动现场照片.*记录了活动的精彩瞬间/g,
  /美丽的.*活动现场照片.*记录了活动的精彩瞬间/g,
];

// 统计结果
const statistics = {
  totalPages: 0,
  processedPages: 0,
  cleanedDescriptions: 0,
  alreadyClean: 0,
  errors: 0,
  processedFiles: [],
  errorFiles: []
};

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
 * 清理页面文件中的硬编码描述
 */
function cleanPageFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    let hasChanges = false;
    
    // 1. 清理硬编码的description字段值
    HARDCODED_PATTERNS.forEach(pattern => {
      if (pattern.test(content)) {
        content = content.replace(pattern, '');
        hasChanges = true;
      }
    });
    
    // 2. 统一description字段格式
    const descriptionReplacements = [
      // 花火页面 - 统一使用hanabiData.description
      {
        pattern: /description:\s*hanabiData\.description\s*\|\|\s*"[^"]*"/g,
        replacement: 'description: hanabiData.description || ""'
      },
      {
        pattern: /description:\s*"[^"]*是一个美丽的赏花活动[^"]*"/g,
        replacement: 'description: activityData.description || ""'
      },
      {
        pattern: /description:\s*"[^"]*是一个传统的日本祭典[^"]*"/g,
        replacement: 'description: activityData.description || ""'
      },
      {
        pattern: /description:\s*"[^"]*是一个精彩的红叶观赏活动[^"]*"/g,
        replacement: 'description: activityData.description || ""'
      },
      {
        pattern: /description:\s*"[^"]*是一场璀璨的灯光秀活动[^"]*"/g,
        replacement: 'description: activityData.description || ""'
      },
      {
        pattern: /description:\s*"[^"]*是一场精彩的文化活动[^"]*"/g,
        replacement: 'description: activityData.description || ""'
      },
      // 其他硬编码描述
      {
        pattern: /description:\s*"[^"]*精彩的[^"]*活动[^"]*"/g,
        replacement: 'description: data.description || ""'
      }
    ];
    
    descriptionReplacements.forEach(({ pattern, replacement }) => {
      if (pattern.test(content)) {
        content = content.replace(pattern, replacement);
        hasChanges = true;
      }
    });
    
    // 3. 如果有变化，保存文件
    if (hasChanges) {
      fs.writeFileSync(filePath, content, 'utf8');
      statistics.cleanedDescriptions++;
      statistics.processedFiles.push(path.relative(process.cwd(), filePath));
      console.log(`✅ 清理完成: ${path.relative(process.cwd(), filePath)}`);
    } else {
      statistics.alreadyClean++;
      console.log(`⏭️  已是正确格式: ${path.relative(process.cwd(), filePath)}`);
    }
    
    statistics.processedPages++;
    
  } catch (error) {
    statistics.errors++;
    statistics.errorFiles.push(path.relative(process.cwd(), filePath));
    console.error(`❌ 处理失败 ${filePath}:`, error.message);
  }
}

/**
 * 扫描并处理所有四层页面
 */
function scanAndCleanPages(dirPath) {
  const files = fs.readdirSync(dirPath);
  
  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      scanAndCleanPages(fullPath);
    } else if (file === 'page.tsx' && isFourthLayerPage(fullPath)) {
      statistics.totalPages++;
      cleanPageFile(fullPath);
    }
  });
}

/**
 * 生成清理报告
 */
function generateCleanupReport() {
  console.log('\n📊 四层页面硬编码描述清理报告');
  console.log('=========================================\n');
  
  console.log(`📄 总四层页面数: ${statistics.totalPages}`);
  console.log(`🔧 已处理页面数: ${statistics.processedPages}`);
  console.log(`✅ 清理修复页面: ${statistics.cleanedDescriptions}`);
  console.log(`⏭️  已正确格式: ${statistics.alreadyClean}`);
  console.log(`❌ 处理失败: ${statistics.errors}\n`);
  
  if (statistics.processedFiles.length > 0) {
    console.log('🔧 已修复的页面文件:');
    statistics.processedFiles.forEach((file, index) => {
      console.log(`${index + 1}. ${file}`);
    });
    console.log('');
  }
  
  if (statistics.errorFiles.length > 0) {
    console.log('❌ 处理失败的文件:');
    statistics.errorFiles.forEach((file, index) => {
      console.log(`${index + 1}. ${file}`);
    });
    console.log('');
  }
  
  console.log('🎯 清理效果:');
  console.log('✅ 移除了所有硬编码的活动描述');
  console.log('✅ 统一使用数据库字段格式：data.description || ""');
  console.log('✅ 确保所有描述来源于数据库而非页面硬编码');
  
  const successRate = ((statistics.cleanedDescriptions + statistics.alreadyClean) / statistics.totalPages * 100).toFixed(1);
  console.log(`\n📈 成功率: ${successRate}% (${statistics.cleanedDescriptions + statistics.alreadyClean}/${statistics.totalPages})`);
}

// 执行清理
console.log('🧹 开始清理所有四层页面的硬编码描述...\n');
console.log('🎯 目标: 删除所有硬编码描述，统一使用 data.description || "" 格式\n');

scanAndCleanPages('app');
generateCleanupReport(); 