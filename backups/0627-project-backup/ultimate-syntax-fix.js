const fs = require('fs');
const path = require('path');

// 最终语法修复脚本 - 处理剩余的常见错误
function ultimateSyntaxFix() {
  console.log('🔧 开始最终语法修复...');
  
  const appDir = './app';
  let fixedFiles = 0;
  let totalFixes = 0;

  function processDirectory(dirPath) {
    const items = fs.readdirSync(dirPath);
    
    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        processDirectory(fullPath);
      } else if (item === 'page.tsx') {
        const fixed = fixFile(fullPath);
        if (fixed > 0) {
          fixedFiles++;
          totalFixes += fixed;
          console.log(`✅ 修复 ${fullPath}: ${fixed} 个问题`);
        }
      }
    }
  }

  function fixFile(filePath) {
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      const originalContent = content;
      let fixes = 0;

      // 1. 修复 export default function 前的语法错误
      content = content.replace(/(\n|^)(\s*)export default function/g, (match, newline, spaces) => {
        fixes++;
        return `${newline}${spaces}export default function`;
      });

      // 2. 修复对象内缺少逗号的问题
      content = content.replace(/(\w+:\s*[^,}\n]+)(\n\s*)(\w+:)/g, (match, prop1, newline, prop2) => {
        if (!prop1.endsWith(',')) {
          fixes++;
          return `${prop1},${newline}${prop2}`;
        }
        return match;
      });

      // 3. 修复 metadata 对象结构错误
      content = content.replace(/export const metadata\s*=\s*\{([^}]+)\}\s*;?\s*export default function/gs, (match, metadataContent) => {
        fixes++;
        return `export const metadata = {
${metadataContent}
};

export default function`;
      });

      // 4. 修复函数参数和返回类型错误
      content = content.replace(/function\s+(\w+)\([^)]*\):\s*[^{]+\s*\{/g, (match) => {
        fixes++;
        const funcName = match.match(/function\s+(\w+)/)[1];
        return `function ${funcName}() {`;
      });

      // 5. 修复模板字符串错误
      content = content.replace(/title:\s*`([^`]*)\$\{[^}]*\|\|[^}]*\}([^`]*)`/g, (match, before, after) => {
        fixes++;
        return `title: '${before.replace(/\$\{[^}]*\|\|[^}]*\}/g, '活动详情')}${after}'`;
      });

      // 6. 修复对象属性后缺少逗号
      content = content.replace(/(\w+:\s*'[^']*')\s*(\n\s*)(\w+:)/g, (match, prop1, newline, prop2) => {
        if (!prop1.endsWith(',')) {
          fixes++;
          return `${prop1},${newline}${prop2}`;
        }
        return match;
      });

      // 7. 修复数组结构错误
      content = content.replace(/\[\s*\{([^}]+)\}\s*\]/gs, (match, arrayContent) => {
        if (!arrayContent.includes(',') && arrayContent.includes('\n')) {
          fixes++;
          return match.replace(/(\w+:\s*[^,}\n]+)(\n)/g, '$1,$2');
        }
        return match;
      });

      // 8. 修复 return 语句错误
      content = content.replace(/return\s*<([^>]+)>/g, (match, component) => {
        if (!match.includes('(')) {
          fixes++;
          return `return (
    <${component}>`;
        }
        return match;
      });

      // 9. 修复缺少分号的问题
      content = content.replace(/(\}\s*)(\n\s*export)/g, (match, closing, exportStatement) => {
        fixes++;
        return `${closing};${exportStatement}`;
      });

      // 10. 修复双分号问题
      content = content.replace(/\)\s*;\s*;/g, ');');

      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        return fixes;
      }
      return 0;
    } catch (error) {
      console.error(`❌ 处理文件 ${filePath} 时出错:`, error.message);
      return 0;
    }
  }

  processDirectory(appDir);
  
  console.log(`\n🎉 最终修复完成!`);
  console.log(`📊 修复统计:`);
  console.log(`   - 修复文件数: ${fixedFiles}`);
  console.log(`   - 总修复数: ${totalFixes}`);
  
  return { fixedFiles, totalFixes };
}

// 执行修复
if (require.main === module) {
  ultimateSyntaxFix();
}

module.exports = { ultimateSyntaxFix }; 