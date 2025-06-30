const fs = require('fs');
const path = require('path');

/**
 * 安全修复变量作用域错误
 * 将在声明前使用的变量引用移到正确位置或使用正确格式
 */

// 统计结果
const statistics = {
  totalPages: 0,
  scopeErrors: 0,
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
 * 检测并修复作用域错误
 */
function fixScopeErrors(content) {
  // 查找 metadata 部分的 description 行
  const metadataMatch = content.match(/(export\s+const\s+metadata\s*=\s*\{[\s\S]*?description:\s*)([^,\n]+)([\s\S]*?\})/);
  
  if (!metadataMatch) {
    return { fixed: false, content: content, reason: '未找到metadata结构' };
  }
  
  const [fullMatch, beforeDescription, descriptionValue, afterDescription] = metadataMatch;
  
  // 检查是否使用了未声明的变量
  if (descriptionValue.includes('activityData.description')) {
    // 检查 activityData 是在 metadata 之后定义的
    const metadataIndex = content.indexOf('export const metadata');
    const activityDataIndex = content.indexOf('const activityData');
    
    if (activityDataIndex > metadataIndex || activityDataIndex === -1) {
      // 需要修复：将 activityData.description 改为空字符串，让页面依赖JSX中的实际数据
      const newDescriptionValue = '""';
      const newMetadata = beforeDescription + newDescriptionValue + afterDescription;
      const newContent = content.replace(fullMatch, newMetadata);
      
      return { 
        fixed: true, 
        content: newContent, 
        reason: `修复作用域错误: ${descriptionValue.trim()} -> ${newDescriptionValue}` 
      };
    }
  }
  
  // 检查其他可能的作用域问题
  const problematicPatterns = [
    /hanabiData\.description/,
    /eventData\.description/,
    /matsuri.*Data\.description/,
    /hanami.*Data\.description/
  ];
  
  for (const pattern of problematicPatterns) {
    if (pattern.test(descriptionValue)) {
      const variableName = descriptionValue.match(/(\w+)\.description/)?.[1];
      if (variableName) {
        const variableIndex = content.indexOf(`const ${variableName}`);
        const metadataIndex = content.indexOf('export const metadata');
        
        if (variableIndex > metadataIndex || variableIndex === -1) {
          const newDescriptionValue = '""';
          const newMetadata = beforeDescription + newDescriptionValue + afterDescription;
          const newContent = content.replace(fullMatch, newMetadata);
          
          return { 
            fixed: true, 
            content: newContent, 
            reason: `修复作用域错误: ${descriptionValue.trim()} -> ${newDescriptionValue}` 
          };
        }
      }
    }
  }
  
  return { fixed: false, content: content, reason: '无作用域错误' };
}

/**
 * 修复单个页面文件
 */
function fixPageFile(filePath) {
  try {
    console.log(`\n🔧 检查文件: ${filePath}`);
    
    const content = fs.readFileSync(filePath, 'utf8');
    
    const result = fixScopeErrors(content);
    
    if (result.fixed) {
      // 先创建备份
      const backupPath = filePath + '.backup.' + Date.now();
      fs.writeFileSync(backupPath, content, 'utf8');
      
      // 写入修复后的内容
      fs.writeFileSync(filePath, result.content, 'utf8');
      
      console.log(`✅ ${result.reason}`);
      console.log(`📁 备份文件: ${backupPath}`);
      
      statistics.fixedPages++;
      statistics.fixedFiles.push(filePath);
    } else {
      console.log(`✅ ${result.reason}`);
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
  console.log('🚨 开始安全修复变量作用域错误...\n');
  
  try {
    // 找到所有页面文件
    const allPageFiles = findAllPageFiles('app');
    
    // 筛选四层页面
    const fourthLayerPages = allPageFiles.filter(isFourthLayerPage);
    
    statistics.totalPages = fourthLayerPages.length;
    console.log(`📊 找到 ${statistics.totalPages} 个四层页面\n`);
    
    // 先测试一个文件
    if (fourthLayerPages.length > 0) {
      console.log('🧪 先测试修复一个文件...');
      fixPageFile(fourthLayerPages[0]);
      
      console.log('\n⏸️  测试完成，请检查修复结果。');
      console.log('如果修复正确，请运行 node scripts/safe-fix-scope-errors.js --batch 来修复所有文件');
      console.log('如果修复不正确，可以从备份文件恢复');
      
      return;
    }
    
    // 如果指定了 --batch 参数，则批量处理
    if (process.argv.includes('--batch')) {
      console.log('📦 开始批量修复...\n');
      
      // 处理所有页面
      fourthLayerPages.forEach(fixPageFile);
      
      // 输出统计结果
      console.log('\n' + '='.repeat(50));
      console.log('📊 修复完成统计');
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
      
      console.log('\n🎉 批量修复任务完成！');
    }
    
  } catch (error) {
    console.error('❌ 执行失败:', error.message);
    process.exit(1);
  }
}

// 执行主函数
main(); 