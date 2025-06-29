const fs = require('fs');
const path = require('path');

/**
 * 修复模板组件的description属性传递问题
 * 为HanabiDetailTemplate组件添加description属性
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
 * 修复模板组件的description属性
 */
function fixTemplateDescriptionProp(content) {
  // 查找模板组件调用模式
  const templatePatterns = [
    // HanabiDetailTemplate
    {
      pattern: /(<HanabiDetailTemplate\s+data=\{(\w+)\}\s+regionKey=\{[^}]+\}\s*\/>)/g,
      replacement: (match, fullMatch, dataVar) => {
        return `<HanabiDetailTemplate 
        data={${dataVar}}
        description={${dataVar}.description || ""}
        regionKey={regionkey}
      />`;
      }
    },
    // 多行格式的HanabiDetailTemplate
    {
      pattern: /(<HanabiDetailTemplate\s+data=\{(\w+)\}\s+regionKey=\{[^}]+\}\s*>)/g,
      replacement: (match, fullMatch, dataVar) => {
        return `<HanabiDetailTemplate 
        data={${dataVar}}
        description={${dataVar}.description || ""}
        regionKey={regionkey}
      >`;
      }
    }
  ];

  let fixedContent = content;
  let hasChanges = false;

  for (const { pattern, replacement } of templatePatterns) {
    const matches = content.match(pattern);
    if (matches) {
      fixedContent = fixedContent.replace(pattern, replacement);
      hasChanges = true;
    }
  }

  return { fixed: hasChanges, content: fixedContent };
}

/**
 * 处理单个页面文件
 */
function processPageFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // 检查是否需要修复
    const needsFix = content.includes('<HanabiDetailTemplate') && 
                    !content.includes('description={');
    
    if (!needsFix) {
      statistics.alreadyCorrect++;
      return { success: true, reason: '已经正确' };
    }

    // 创建备份
    const backupPath = createBackup(filePath);
    if (!backupPath) {
      statistics.errors++;
      return { success: false, reason: '备份失败' };
    }

    // 修复内容
    const { fixed, content: fixedContent } = fixTemplateDescriptionProp(content);
    
    if (!fixed) {
      statistics.alreadyCorrect++;
      return { success: true, reason: '未找到需要修复的模板' };
    }

    // 写入修复后的内容
    fs.writeFileSync(filePath, fixedContent, 'utf8');
    
    statistics.fixedPages++;
    statistics.fixedFiles.push(filePath);
    
    return { success: true, reason: '修复成功' };
    
  } catch (error) {
    statistics.errors++;
    statistics.errorFiles.push({ file: filePath, error: error.message });
    return { success: false, reason: error.message };
  }
}

/**
 * 主函数
 */
function main() {
  console.log('🔧 开始修复模板组件的description属性传递问题...\n');
  
  const appDir = path.join(process.cwd(), 'app');
  
  if (!fs.existsSync(appDir)) {
    console.error('❌ app目录不存在');
    return;
  }

  // 递归查找所有四层页面
  function findPageFiles(dir) {
    const files = [];
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        files.push(...findPageFiles(fullPath));
      } else if (item === 'page.tsx' && isFourthLayerPage(fullPath)) {
        files.push(fullPath);
      }
    }
    
    return files;
  }

  const pageFiles = findPageFiles(appDir);
  statistics.totalPages = pageFiles.length;
  
  console.log(`📊 找到 ${pageFiles.length} 个四层页面文件`);
  
  // 处理每个页面文件
  for (const filePath of pageFiles) {
    const relativePath = path.relative(process.cwd(), filePath);
    const result = processPageFile(filePath);
    
    if (result.success) {
      if (result.reason === '修复成功') {
        console.log(`✅ ${relativePath} - ${result.reason}`);
      }
    } else {
      console.log(`❌ ${relativePath} - ${result.reason}`);
    }
  }

  // 输出统计结果
  console.log('\n📊 修复完成统计:');
  console.log(`总页面数: ${statistics.totalPages}`);
  console.log(`成功修复: ${statistics.fixedPages}`);
  console.log(`已经正确: ${statistics.alreadyCorrect}`);
  console.log(`处理错误: ${statistics.errors}`);
  console.log(`备份文件: ${statistics.backupFiles.length}`);
  
  if (statistics.fixedFiles.length > 0) {
    console.log('\n✅ 修复的文件:');
    statistics.fixedFiles.forEach(file => {
      console.log(`  - ${path.relative(process.cwd(), file)}`);
    });
  }
  
  if (statistics.errorFiles.length > 0) {
    console.log('\n❌ 错误文件:');
    statistics.errorFiles.forEach(({ file, error }) => {
      console.log(`  - ${path.relative(process.cwd(), file)}: ${error}`);
    });
  }
  
  console.log('\n🎉 模板组件description属性修复完成！');
}

// 执行主函数
main(); 