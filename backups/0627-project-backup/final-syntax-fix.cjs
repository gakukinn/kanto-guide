const fs = require('fs');
const path = require('path');

// 递归获取所有页面文件
function getAllPageFiles(dir, files = []) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      getAllPageFiles(fullPath, files);
    } else if (item === 'page.tsx') {
      files.push(fullPath);
    }
  }
  
  return files;
}

// 最终语法修复
function finalSyntaxFix(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  
  // 1. 修复 robots 对象中的语法错误
  content = content.replace(/'max-snippet': -1\}\]\},/g, "'max-snippet': -1,\n    },\n  },");
  content = content.replace(/'max-snippet': -1\}\};/g, "'max-snippet': -1,\n    },\n  },\n};");
  
  // 2. 修复 breadcrumb 中的分号错误
  content = content.replace(/current: \{ name: '[^']*', url: '[^']*' \};/g, (match) => {
    return match.replace('};', '}');
  });
  
  // 3. 修复函数定义语法错误
  content = content.replace(/export default async function ([^(]+)\(\) \{/g, 'export default async function $1() {');
  
  // 4. 修复 const 声明语法错误
  content = content.replace(/const ([^:]+): ([^=]+) = /g, 'const $1: $2 = ');
  
  // 5. 修复数组结尾的语法错误
  content = content.replace(/\]\};/g, '];');
  
  // 6. 修复对象结尾的语法错误
  content = content.replace(/\}\]\}\};/g, '}');
  
  // 7. 修复 TypeScript 类型注解
  content = content.replace(/function ([^(]+)\(([^)]+): ([^)]+)\): ([^{]+) \{/g, 'function $1($2: $3): $4 {');
  
  // 8. 清理多余的大括号和分号
  content = content.replace(/\}\}\};/g, '}');
  content = content.replace(/\}\];/g, '}');
  
  // 9. 修复特定的语法模式
  content = content.replace(/\{ \[key: string\]: string \}/g, '{ [key: string]: string }');
  
  // 10. 修复函数返回类型语法
  content = content.replace(/\): any\[\] \{/g, '): any[] {');
  
  // 只有内容真正改变时才写入文件
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }
  
  return false;
}

// 主执行函数
function main() {
  const appDir = path.join(__dirname, 'app');
  const pageFiles = getAllPageFiles(appDir);
  
  console.log(`找到 ${pageFiles.length} 个页面文件`);
  
  let fixedCount = 0;
  let errorCount = 0;
  
  pageFiles.forEach(filePath => {
    try {
      const wasFixed = finalSyntaxFix(filePath);
      if (wasFixed) {
        console.log(`✅ 最终修复: ${filePath}`);
        fixedCount++;
      }
    } catch (error) {
      console.error(`❌ 错误处理 ${filePath}:`, error.message);
      errorCount++;
    }
  });
  
  console.log(`\n最终修复完成:`);
  console.log(`- 成功修复: ${fixedCount} 个文件`);
  console.log(`- 错误: ${errorCount} 个文件`);
}

main(); 