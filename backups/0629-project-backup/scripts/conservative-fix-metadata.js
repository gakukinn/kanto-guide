const fs = require('fs');
const path = require('path');

/**
 * 保守修复方案：将所有metadata中的description改为空字符串
 * 这样解决作用域错误，同时保持JSX中的动态显示功能
 */

// 统计结果
const statistics = {
  totalPages: 0,
  fixedPages: 0,
  alreadyCorrect: 0,
  errors: 0,
  backupFiles: [],
  fixedFiles: [],
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
 * 创建备份文件
 */
function createBackup(filePath) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = `${filePath}.backup-${timestamp}`;
  
  try {
    fs.copyFileSync(filePath, backupPath);
    statistics.backupFiles.push(backupPath);
    return backupPath;
  } catch (error) {
    console.error(`❌ 创建备份失败: ${filePath}`, error.message);
    return null;
  }
}

/**
 * 修复metadata中的description字段
 */
function fixMetadataDescription(content) {
  // 查找并替换metadata中的description行
  // 匹配模式：description: xxxData.description || "xxx"
  const descriptionPattern = /(\s*description:\s*)[^,\n]+(\s*,?\s*)/g;
  
  // 检查是否需要修复
  const needsFix = /description:\s*\w+Data\.description/.test(content);
  
  if (!needsFix) {
    return { fixed: false, content: content, reason: '已经是正确格式' };
  }
  
  // 执行替换
  const fixedContent = content.replace(descriptionPattern, '$1""$2');
  
  return {
    fixed: true,
    content: fixedContent,
    reason: '成功修复metadata中的description字段'
  };
}

/**
 * 处理单个文件
 */
function processFile(filePath) {
  try {
    console.log(`🔍 检查文件: ${filePath}`);
    
    // 读取文件内容
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // 尝试修复
    const result = fixMetadataDescription(content);
    
    if (result.fixed) {
      // 创建备份
      const backupPath = createBackup(filePath);
      if (!backupPath) {
        statistics.errors++;
        statistics.errorFiles.push(filePath);
        return;
      }
      
      // 写入修复后的内容
      fs.writeFileSync(filePath, result.content, 'utf-8');
      
      console.log(`✅ 修复成功: ${filePath}`);
      console.log(`   备份文件: ${backupPath}`);
      console.log(`   修复原因: ${result.reason}`);
      
      statistics.fixedPages++;
      statistics.fixedFiles.push(filePath);
    } else {
      console.log(`ℹ️  无需修复: ${filePath} (${result.reason})`);
      statistics.alreadyCorrect++;
    }
    
  } catch (error) {
    console.error(`❌ 处理文件失败: ${filePath}`, error.message);
    statistics.errors++;
    statistics.errorFiles.push(filePath);
  }
}

/**
 * 扫描并处理所有四层页面
 */
function scanAndProcess() {
  console.log('🚀 开始保守修复方案：清理metadata中的description字段\n');
  
  function scanDirectory(dirPath) {
    const items = fs.readdirSync(dirPath);
    
    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        scanDirectory(fullPath);
      } else if (item === 'page.tsx' && isFourthLayerPage(fullPath)) {
        statistics.totalPages++;
        processFile(fullPath);
      }
    }
  }
  
  scanDirectory('app');
}

/**
 * 主执行函数
 */
function main() {
  try {
    scanAndProcess();
    
    console.log('\n📊 保守修复完成统计:');
    console.log(`总页面数: ${statistics.totalPages}`);
    console.log(`成功修复: ${statistics.fixedPages}`);
    console.log(`已经正确: ${statistics.alreadyCorrect}`);
    console.log(`处理错误: ${statistics.errors}`);
    console.log(`备份文件: ${statistics.backupFiles.length}`);
    
    if (statistics.fixedPages > 0) {
      console.log('\n✅ 修复的文件:');
      statistics.fixedFiles.forEach(file => console.log(`  - ${file}`));
    }
    
    if (statistics.errors > 0) {
      console.log('\n❌ 错误文件:');
      statistics.errorFiles.forEach(file => console.log(`  - ${file}`));
    }
    
    if (statistics.backupFiles.length > 0) {
      console.log('\n💾 备份文件:');
      statistics.backupFiles.forEach(file => console.log(`  - ${file}`));
      console.log('\n⚠️  如果修复有问题，可以从备份文件恢复');
    }
    
  } catch (error) {
    console.error('❌ 脚本执行失败:', error.message);
    process.exit(1);
  }
}

// 执行主函数
main(); 