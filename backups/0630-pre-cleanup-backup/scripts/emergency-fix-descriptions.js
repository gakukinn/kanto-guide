const fs = require('fs');
const path = require('path');

/**
 * 紧急修复错误的变量名引用
 * 将错误的 activityData.description 改回正确的变量名
 */

// 统计结果
const statistics = {
  totalPages: 0,
  fixedPages: 0,
  alreadyCorrect: 0,
  errors: 0,
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
 * 从页面内容中找到正确的变量名
 */
function findCorrectVariableName(content) {
  // 查找 const xxx = { 这样的模式，找到数据变量
  const constMatches = content.match(/const\s+(\w+)\s*=\s*\{[^}]*name:/g);
  
  if (constMatches && constMatches.length > 0) {
    // 提取变量名
    const match = constMatches[0].match(/const\s+(\w+)/);
    if (match) {
      return match[1];
    }
  }
  
  // 如果没找到，尝试查找包含数据的常量
  const allConstMatches = content.match(/const\s+(\w+)\s*=\s*\{/g);
  if (allConstMatches) {
    for (const match of allConstMatches) {
      const variableName = match.match(/const\s+(\w+)/)[1];
      
      // 检查这个变量后面是否有看起来像数据的属性
      const variablePattern = new RegExp(`${variableName}\\s*=\\s*\\{[^}]*(?:name|title|id|description):`);
      if (variablePattern.test(content)) {
        return variableName;
      }
    }
  }
  
  return null;
}

/**
 * 修复单个页面文件
 */
function fixPageFile(filePath) {
  try {
    console.log(`\n🔧 处理文件: ${filePath}`);
    
    const content = fs.readFileSync(filePath, 'utf8');
    
    // 检查是否有错误的 activityData.description
    if (!content.includes('activityData.description')) {
      console.log(`✅ 文件已正确，无需修复`);
      statistics.alreadyCorrect++;
      return;
    }
    
    // 找到正确的变量名
    const correctVariableName = findCorrectVariableName(content);
    
    if (!correctVariableName) {
      console.log(`❌ 无法确定正确的变量名`);
      statistics.errors++;
      statistics.errorFiles.push(filePath);
      return;
    }
    
    console.log(`📝 找到正确的变量名: ${correctVariableName}`);
    
    // 替换错误的 activityData.description
    let newContent = content.replace(
      /activityData\.description/g,
      `${correctVariableName}.description`
    );
    
    // 检查是否有修改
    if (newContent !== content) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`✅ 修复完成: activityData.description -> ${correctVariableName}.description`);
      statistics.fixedPages++;
      statistics.fixedFiles.push(filePath);
    } else {
      console.log(`✅ 文件已正确，无需修复`);
      statistics.alreadyCorrect++;
    }
    
  } catch (error) {
    console.error(`❌ 处理文件失败: ${filePath}`, error.message);
    statistics.errors++;
    statistics.errorFiles.push(filePath);
  }
}

/**
 * 递归查找所有页面文件
 */
function findAllPageFiles(dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      files.push(...findAllPageFiles(fullPath));
    } else if (entry.name === 'page.tsx') {
      files.push(fullPath);
    }
  }
  
  return files;
}

/**
 * 主执行函数
 */
function main() {
  console.log('🚨 开始紧急修复错误的变量名引用...\n');
  
  try {
    // 找到所有页面文件
    const allPageFiles = findAllPageFiles('app');
    
    // 筛选四层页面
    const fourthLayerPages = allPageFiles.filter(isFourthLayerPage);
    
    statistics.totalPages = fourthLayerPages.length;
    console.log(`📊 找到 ${statistics.totalPages} 个四层页面\n`);
    
    // 处理每个页面
    fourthLayerPages.forEach(fixPageFile);
    
    // 输出统计结果
    console.log('\n' + '='.repeat(50));
    console.log('📊 紧急修复完成统计');
    console.log('='.repeat(50));
    console.log(`总页面数: ${statistics.totalPages}`);
    console.log(`成功修复: ${statistics.fixedPages}`);
    console.log(`已经正确: ${statistics.alreadyCorrect}`);
    console.log(`处理错误: ${statistics.errors}`);
    
    if (statistics.fixedFiles.length > 0) {
      console.log('\n✅ 已修复的文件:');
      statistics.fixedFiles.forEach(file => {
        console.log(`  - ${file}`);
      });
    }
    
    if (statistics.errorFiles.length > 0) {
      console.log('\n❌ 处理失败的文件:');
      statistics.errorFiles.forEach(file => {
        console.log(`  - ${file}`);
      });
    }
    
    console.log('\n🎉 紧急修复任务完成！');
    
  } catch (error) {
    console.error('❌ 执行失败:', error.message);
    process.exit(1);
  }
}

// 执行主函数
main(); 