/**
 * 检查文件标识添加进度脚本
 * 统计已添加标识的文件数量和类型
 */

const fs = require('fs');
const path = require('path');

// 递归扫描目录
function scanDirectory(dir, files = []) {
  try {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // 跳过不需要的目录
        if (item.includes('node_modules') || item.includes('.git') || 
            item.includes('temp-') || item === 'admin' || item === 'test-level5') {
          continue;
        }
        scanDirectory(fullPath, files);
      } else if (item === 'page.tsx' || item.endsWith('-hanabi.ts')) {
        const relativePath = path.relative(process.cwd(), fullPath).replace(/\\/g, '/');
        files.push(relativePath);
      }
    }
  } catch (error) {
    console.error(`扫描目录错误 ${dir}:`, error.message);
  }
  
  return files;
}

// 检查文件是否有标识
function hasIdentifier(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return content.includes('@layer') && content.includes('@type');
  } catch (error) {
    return false;
  }
}

// 分析文件类型
function getFileType(filePath) {
  if (filePath.endsWith('page.tsx')) {
    const parts = filePath.split('/');
    const pathSegments = parts.filter(p => p !== 'src' && p !== 'app' && p !== 'page.tsx');
    
    if (pathSegments.length === 2 && pathSegments[1] === 'hanabi') {
      return '第三层页面';
    } else if (pathSegments.length === 3 && pathSegments[1] === 'hanabi') {
      return '第四层页面';
    } else if (pathSegments.length === 4 && pathSegments[1] === 'hanabi') {
      return '第五层页面';
    }
  } else if (filePath.endsWith('-hanabi.ts')) {
    if (filePath.includes('level4-')) {
      return '第四层数据';
    } else if (filePath.includes('level5-')) {
      return '第五层数据';
    }
  }
  
  return '其他';
}

// 主执行函数
function main() {
  console.log('🔍 检查文件标识添加进度...\n');
  
  // 扫描所有相关文件
  const allFiles = scanDirectory('./src');
  const relevantFiles = allFiles.filter(file => 
    file.includes('/hanabi/') || file.includes('-hanabi.ts')
  );
  
  console.log(`📁 发现 ${relevantFiles.length} 个相关文件\n`);
  
  // 按类型分类统计
  const stats = {
    '第三层页面': { total: 0, hasIdentifier: 0, files: [] },
    '第四层页面': { total: 0, hasIdentifier: 0, files: [] },
    '第五层页面': { total: 0, hasIdentifier: 0, files: [] },
    '第四层数据': { total: 0, hasIdentifier: 0, files: [] },
    '第五层数据': { total: 0, hasIdentifier: 0, files: [] },
    '其他': { total: 0, hasIdentifier: 0, files: [] }
  };
  
  for (const file of relevantFiles) {
    const type = getFileType(file);
    const hasId = hasIdentifier(file);
    
    stats[type].total++;
    stats[type].files.push({ file, hasId });
    
    if (hasId) {
      stats[type].hasIdentifier++;
    }
  }
  
  // 输出统计结果
  console.log('📊 标识添加进度统计:\n');
  
  let totalFiles = 0;
  let totalWithIdentifier = 0;
  
  for (const [type, data] of Object.entries(stats)) {
    if (data.total > 0) {
      const percentage = Math.round((data.hasIdentifier / data.total) * 100);
      console.log(`${type}: ${data.hasIdentifier}/${data.total} (${percentage}%)`);
      
      totalFiles += data.total;
      totalWithIdentifier += data.hasIdentifier;
      
      // 显示未添加标识的文件
      const missingFiles = data.files.filter(f => !f.hasId);
      if (missingFiles.length > 0 && missingFiles.length <= 5) {
        console.log(`  缺少标识: ${missingFiles.map(f => f.file).join(', ')}`);
      } else if (missingFiles.length > 5) {
        console.log(`  缺少标识: ${missingFiles.length} 个文件`);
      }
      console.log('');
    }
  }
  
  const overallPercentage = Math.round((totalWithIdentifier / totalFiles) * 100);
  console.log(`🎯 总体进度: ${totalWithIdentifier}/${totalFiles} (${overallPercentage}%)`);
  
  if (overallPercentage === 100) {
    console.log('🎉 所有文件都已添加标识！');
  } else {
    console.log(`📝 还需要为 ${totalFiles - totalWithIdentifier} 个文件添加标识`);
  }
}

// 执行脚本
main(); 