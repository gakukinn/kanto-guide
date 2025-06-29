const fs = require('fs');
const path = require('path');

// 智能逗号修复脚本
function smartCommaFix() {
  console.log('🎯 开始智能逗号修复...');
  
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

      // 1. 修复对象开头的多余逗号
      content = content.replace(/\{\s*,\s*/g, '{\n  ');
      
      // 2. 修复对象属性前的多余逗号
      content = content.replace(/,\s*(\w+):/g, (match, property) => {
        // 检查前面是否已经有合适的逗号或开括号
        return `\n  ${property}:`;
      });

      // 3. 修复连续的逗号
      content = content.replace(/,\s*,/g, ',');

      // 4. 修复对象结尾前的多余逗号
      content = content.replace(/,\s*\}/g, '\n}');

      // 5. 修复 JSX 元素末尾的分号
      content = content.replace(/\/>\s*;/g, '/>');

      // 6. 修复 return 语句末尾的分号
      content = content.replace(/return\s*\(\s*<[^>]*>[^<]*<\/[^>]*>\s*\)\s*;/g, (match) => {
        return match.replace(/;\s*$/, '');
      });

      // 7. 修复简单 JSX 返回的分号
      content = content.replace(/return\s*<[^>]*\/>\s*;/g, (match) => {
        return match.replace(/;\s*$/, '');
      });

      // 8. 修复函数定义后的多余逗号
      content = content.replace(/export default function\s+(\w+)\(\)\s*\{\s*,/g, (match, funcName) => {
        fixes++;
        return `export default function ${funcName}() {\n  `;
      });

      // 9. 修复数组中的多余逗号
      content = content.replace(/\[\s*,/g, '[');
      content = content.replace(/,\s*\]/g, ']');

      // 10. 修复对象属性值后缺少逗号的问题
      content = content.replace(/(\w+:\s*'[^']*')\s*\n\s*(\w+:)/g, '$1,\n  $2');
      content = content.replace(/(\w+:\s*\d+)\s*\n\s*(\w+:)/g, '$1,\n  $2');
      content = content.replace(/(\w+:\s*true|false)\s*\n\s*(\w+:)/g, '$1,\n  $2');

      // 统计实际修复次数
      if (content !== originalContent) {
        const changes = originalContent.split('\n').length - content.split('\n').length;
        fixes = Math.abs(changes) + 1;
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
  
  console.log(`\n🎉 智能逗号修复完成!`);
  console.log(`📊 修复统计:`);
  console.log(`   - 修复文件数: ${fixedFiles}`);
  console.log(`   - 总修复数: ${totalFixes}`);
  
  return { fixedFiles, totalFixes };
}

// 执行修复
if (require.main === module) {
  smartCommaFix();
}

module.exports = { smartCommaFix }; 