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

// 终极语法修复
function ultimateSyntaxFix(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  
  // 1. 修复函数定义前的语法错误
  content = content.replace(/^(\w+);$/gm, '// $1');
  
  // 2. 修复 const 声明语法错误
  content = content.replace(/^(\w+)\s+const\s+(\w+)/gm, 'const $2');
  
  // 3. 修复 export 语句前的语法错误
  content = content.replace(/^(\w+)\s+export\s+/gm, 'export ');
  
  // 4. 修复 metadata 对象中的双重结束符
  content = content.replace(/\}\};/g, '};');
  
  // 5. 修复模板字符串中的中文字符语法错误
  content = content.replace(/\}：\$\{/g, '}。${');
  content = content.replace(/\}，\$\{/g, '}，${');
  
  // 6. 修复 return 语句语法
  content = content.replace(/^\s*return\s+realFeaturesMap\[name\]\s*\|\|\s*\[/gm, '  return realFeaturesMap[name] || [');
  
  // 7. 修复 JSX 语法错误
  content = content.replace(/^\s*return\s*\(\s*$/gm, '  return (');
  content = content.replace(/^\s*<(\w+)/gm, '    <$1');
  content = content.replace(/^\s*\/>/gm, '    />');
  content = content.replace(/^\s*\);\s*$/gm, '  );');
  
  // 8. 修复对象定义语法
  content = content.replace(/^(\w+)\s+const\s+(\w+)\s*=\s*\{/gm, 'const $2 = {');
  content = content.replace(/^(\w+)\s+const\s+(\w+)\s*=\s*\[/gm, 'const $2 = [');
  
  // 9. 修复函数参数语法
  content = content.replace(/function\s+(\w+)\s*\(\s*\)\s*\{/g, 'function $1() {');
  
  // 10. 修复 metadata 中的 canonical 语法错误
  content = content.replace(/canonical:\s*'([^']*)'}\};/g, "canonical: '$1',\n  },\n};");
  
  // 11. 修复数组和对象结束符
  content = content.replace(/\]\s*;/g, '];');
  content = content.replace(/\}\s*;/g, '};');
  
  // 12. 修复 Google Maps URL 中的换行问题
  content = content.replace(/('https:\/\/www\.google\.com\/maps\/embed[^']*)\n\s*([^']*')/g, '$1$2');
  
  // 13. 修复模板字符串中的特殊字符
  content = content.replace(/\$\{([^}]+)\}：/g, '${$1}：');
  content = content.replace(/\$\{([^}]+)\}，/g, '${$1}，');
  content = content.replace(/\$\{([^}]+)\}。/g, '${$1}。');
  
  // 14. 修复函数定义语法错误
  content = content.replace(/^(\w+)\s+(export\s+default\s+async\s+function\s+\w+\(\)\s*\{)/gm, '$2');
  
  // 15. 修复变量声明语法错误
  content = content.replace(/^(\w+)\s+(const\s+\w+\s*=)/gm, '$2');
  
  // 16. 确保所有函数都正确关闭
  const lines = content.split('\n');
  let braceCount = 0;
  let inFunction = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (line.includes('export default async function')) {
      inFunction = true;
      braceCount = 0;
    }
    
    if (inFunction) {
      const openBraces = (line.match(/\{/g) || []).length;
      const closeBraces = (line.match(/\}/g) || []).length;
      braceCount += openBraces - closeBraces;
      
      if (braceCount === 0 && line.trim() === '}') {
        inFunction = false;
      }
    }
  }
  
  // 17. 修复特定的语法模式
  content = content.replace(/\s*\]\s*;\s*$/gm, '\n];');
  content = content.replace(/\s*\}\s*;\s*$/gm, '\n};');
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ 修复了 ${path.relative(process.cwd(), filePath)}`);
    return true;
  }
  
  return false;
}

// 主执行函数
function main() {
  console.log('🚀 开始终极语法修复...\n');
  
  const appDir = path.join(process.cwd(), 'app');
  const pageFiles = getAllPageFiles(appDir);
  
  let fixedCount = 0;
  
  for (const filePath of pageFiles) {
    if (ultimateSyntaxFix(filePath)) {
      fixedCount++;
    }
  }
  
  console.log(`\n🎉 终极语法修复完成！`);
  console.log(`📊 处理了 ${pageFiles.length} 个文件，修复了 ${fixedCount} 个文件`);
}

main(); 