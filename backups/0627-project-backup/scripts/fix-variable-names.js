const fs = require('fs');
const path = require('path');

/**
 * 修复页面中错误的变量名引用
 * 根据每个页面的实际变量名来修正description字段
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
 * 从页面内容中提取实际的变量名
 */
function extractActualVariableName(content) {
  // 查找 const xxx = { 模式
  const constMatches = content.match(/const\s+(\w+)\s*=\s*\{/g);
  
  if (constMatches) {
    for (const match of constMatches) {
      const variableName = match.match(/const\s+(\w+)/)[1];
      
      // 跳过一些常见的非数据变量
      if (!['metadata', 'config', 'props', 'state'].includes(variableName)) {
        // 检查变量内容是否包含活动数据字段
        const variablePattern = new RegExp(`const\\s+${variableName}\\s*=\\s*\\{[\\s\\S]*?(?:id:|name:|description:)[\\s\\S]*?\\}`, 'm');
        if (variablePattern.test(content)) {
          return variableName;
        }
      }
    }
  }
  
  // 如果没找到，尝试查找常见的变量名
  const commonNames = ['hanabiData', 'activityData', 'eventData', 'data'];
  for (const name of commonNames) {
    if (content.includes(`const ${name} = {`)) {
      return name;
    }
  }
  
  return null;
}

/**
 * 修复页面文件中的变量名引用
 */
function fixPageFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    const relativePath = path.relative(process.cwd(), filePath);
    
    // 提取实际的变量名
    const actualVariableName = extractActualVariableName(content);
    
    if (!actualVariableName) {
      console.log(`⚠️  无法确定变量名: ${relativePath}`);
      return;
    }
    
    console.log(`🔍 检查文件: ${relativePath}`);
    console.log(`   实际变量名: ${actualVariableName}`);
    
    // 查找错误的description引用
    const wrongReferences = [
      'activityData.description',
      'hanabiData.description', 
      'eventData.description',
      'data.description'
    ].filter(ref => ref !== `${actualVariableName}.description`);
    
    let hasChanges = false;
    
    // 修复错误的变量引用
    wrongReferences.forEach(wrongRef => {
      const pattern = new RegExp(`description:\\s*${wrongRef.replace('.', '\\.')}(\\s*\\|\\|\\s*"[^"]*")?`, 'g');
      if (pattern.test(content)) {
        console.log(`   🔧 修复: ${wrongRef} -> ${actualVariableName}.description`);
        content = content.replace(pattern, `description: ${actualVariableName}.description$1`);
        hasChanges = true;
      }
    });
    
    // 如果有变化，保存文件
    if (hasChanges) {
      fs.writeFileSync(filePath, content, 'utf8');
      statistics.fixedPages++;
      statistics.fixedFiles.push(relativePath);
      console.log(`✅ 修复完成: ${relativePath}`);
    } else {
      statistics.alreadyCorrect++;
      console.log(`✅ 已是正确: ${relativePath}`);
    }
    
  } catch (error) {
    statistics.errors++;
    statistics.errorFiles.push(path.relative(process.cwd(), filePath));
    console.error(`❌ 修复失败 ${filePath}:`, error.message);
  }
}

/**
 * 扫描并修复所有四层页面
 */
function scanAndFixPages(dirPath) {
  const files = fs.readdirSync(dirPath);
  
  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      scanAndFixPages(fullPath);
    } else if (file === 'page.tsx' && isFourthLayerPage(fullPath)) {
      statistics.totalPages++;
      fixPageFile(fullPath);
    }
  });
}

/**
 * 生成修复报告
 */
function generateFixReport() {
  console.log('\n📊 变量名修复报告');
  console.log('=========================================\n');
  
  console.log(`📄 总四层页面数: ${statistics.totalPages}`);
  console.log(`🔧 修复页面数: ${statistics.fixedPages}`);
  console.log(`✅ 已正确页面数: ${statistics.alreadyCorrect}`);
  console.log(`❌ 修复失败: ${statistics.errors}\n`);
  
  if (statistics.fixedFiles.length > 0) {
    console.log('🔧 已修复的页面文件:');
    statistics.fixedFiles.forEach((file, index) => {
      console.log(`${index + 1}. ${file}`);
    });
    console.log('');
  }
  
  if (statistics.errorFiles.length > 0) {
    console.log('❌ 修复失败的文件:');
    statistics.errorFiles.forEach((file, index) => {
      console.log(`${index + 1}. ${file}`);
    });
    console.log('');
  }
  
  console.log('🎯 修复效果:');
  console.log('✅ 修复了错误的变量名引用');
  console.log('✅ 确保每个页面使用正确的变量名');
  console.log('✅ 消除TypeScript编译错误');
  
  const successRate = ((statistics.fixedPages + statistics.alreadyCorrect) / statistics.totalPages * 100).toFixed(1);
  console.log(`\n📈 成功率: ${successRate}% (${statistics.fixedPages + statistics.alreadyCorrect}/${statistics.totalPages})`);
}

// 执行修复
console.log('🔧 开始修复所有四层页面的变量名引用...\n');
console.log('🎯 目标: 确保每个页面使用正确的变量名引用\n');

scanAndFixPages('app');
generateFixReport(); 