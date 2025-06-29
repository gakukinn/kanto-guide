const fs = require('fs');
const path = require('path');

// 高级最终修复脚本
function advancedFinalFix() {
  console.log('🚀 开始高级最终修复...');
  
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

      // 1. 修复数组内对象的语法
      content = content.replace(/(\{[^}]*)\s*\n\s*(\w+:)/g, (match, objStart, prop) => {
        if (!objStart.includes(',') && objStart.includes(':')) {
          fixes++;
          return `${objStart},\n  ${prop}`;
        }
        return match;
      });

      // 2. 修复对象内嵌套对象的逗号
      content = content.replace(/(\w+:\s*\{[^}]*\})\s*\n\s*(\w+:)/g, '$1,\n  $2');

      // 3. 修复数组结束后的逗号
      content = content.replace(/(\])\s*\n\s*(\w+:)/g, '$1,\n  $2');

      // 4. 修复字符串值后的逗号
      content = content.replace(/(\w+:\s*'[^']*')\s*\n\s*(\w+:)/g, '$1,\n  $2');
      content = content.replace(/(\w+:\s*"[^"]*")\s*\n\s*(\w+:)/g, '$1,\n  $2');

      // 5. 修复数字值后的逗号
      content = content.replace(/(\w+:\s*\d+)\s*\n\s*(\w+:)/g, '$1,\n  $2');

      // 6. 修复布尔值后的逗号
      content = content.replace(/(\w+:\s*(?:true|false))\s*\n\s*(\w+:)/g, '$1,\n  $2');

      // 7. 修复模板字符串后的逗号
      content = content.replace(/(\w+:\s*`[^`]*`)\s*\n\s*(\w+:)/g, '$1,\n  $2');

      // 8. 修复函数调用后的逗号
      content = content.replace(/(\w+:\s*\w+\([^)]*\))\s*\n\s*(\w+:)/g, '$1,\n  $2');

      // 9. 修复 const 变量定义的分号
      content = content.replace(/(\})\s*,\s*\n\s*const\s+/g, '$1;\n\nconst ');

      // 10. 修复 export const 后的分号
      content = content.replace(/(\})\s*,\s*\n\s*export\s+const\s+/g, '$1;\n\nexport const ');

      // 11. 修复函数定义前的分号
      content = content.replace(/(\})\s*,\s*\n\s*function\s+/g, '$1;\n\nfunction ');
      content = content.replace(/(\})\s*,\s*\n\s*export\s+default\s+function\s+/g, '$1;\n\nexport default function ');

      // 12. 修复 JSX 返回语句
      content = content.replace(/return\s*\(\s*<([^>]+)>[^<]*<\/\1>\s*\)\s*;/g, (match) => {
        fixes++;
        return match.replace(/;\s*$/, '');
      });

      // 13. 修复简单的 JSX 返回
      content = content.replace(/return\s*<([^>\/]+)\/>\s*;/g, (match) => {
        fixes++;
        return match.replace(/;\s*$/, '');
      });

      // 14. 修复对象结尾的多余逗号
      content = content.replace(/,\s*\n\s*\}/g, '\n}');

      // 15. 修复数组结尾的多余逗号  
      content = content.replace(/,\s*\n\s*\]/g, '\n]');

      // 16. 修复函数参数的语法
      content = content.replace(/function\s+(\w+)\s*\(\s*\)\s*\{\s*,/g, (match, funcName) => {
        fixes++;
        return `function ${funcName}() {\n  `;
      });

      // 17. 修复 map 函数的语法
      content = content.replace(/\.map\(\s*\(\s*(\w+)(?:\s*,\s*(\w+))?\s*\)\s*=>\s*\(\s*\{/g, (match, param1, param2) => {
        fixes++;
        return param2 ? `.map((${param1}, ${param2}) => ({` : `.map((${param1}) => ({`;
      });

      // 18. 修复对象展开语法
      content = content.replace(/(\w+:\s*\{\s*\.\.\.)/g, (match, start) => {
        return start.replace(':', ': {');
      });

      // 统计修复次数
      if (content !== originalContent) {
        const linesDiff = Math.abs(originalContent.split('\n').length - content.split('\n').length);
        fixes = Math.max(fixes, linesDiff + 1);
        
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
  
  console.log(`\n🎉 高级最终修复完成!`);
  console.log(`📊 修复统计:`);
  console.log(`   - 修复文件数: ${fixedFiles}`);
  console.log(`   - 总修复数: ${totalFixes}`);
  
  return { fixedFiles, totalFixes };
}

// 执行修复
if (require.main === module) {
  advancedFinalFix();
}

module.exports = { advancedFinalFix }; 