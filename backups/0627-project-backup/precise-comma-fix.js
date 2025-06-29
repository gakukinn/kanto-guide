const fs = require('fs');
const path = require('path');

// 精确逗号修复脚本
function preciseCommaFix() {
  console.log('🎯 开始精确逗号修复...');
  
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

      // 1. 修复对象属性之间缺少逗号的问题
      // 匹配：属性值结束后跟换行和下一个属性，中间缺少逗号
      content = content.replace(/(\w+:\s*'[^']*')\s*\n\s*(\w+:)/g, '$1,\n  $2');
      content = content.replace(/(\w+:\s*"[^"]*")\s*\n\s*(\w+:)/g, '$1,\n  $2');
      content = content.replace(/(\w+:\s*\d+)\s*\n\s*(\w+:)/g, '$1,\n  $2');
      content = content.replace(/(\w+:\s*(?:true|false))\s*\n\s*(\w+:)/g, '$1,\n  $2');
      
      // 2. 修复数组结束后缺少逗号
      content = content.replace(/(\])\s*\n\s*(\w+:)/g, '$1,\n  $2');
      
      // 3. 修复对象结束后缺少逗号
      content = content.replace(/(\})\s*\n\s*(\w+:)/g, '$1,\n  $2');

      // 4. 修复 JSX 元素末尾的分号
      content = content.replace(/\/>\s*;/g, '/>');
      content = content.replace(/(<\/[^>]*>)\s*;/g, '$1');

      // 5. 修复 return 语句末尾的分号
      content = content.replace(/return\s*\(\s*<[^>]*>[^<]*<\/[^>]*>\s*\)\s*;/g, (match) => {
        return match.replace(/;\s*$/, '');
      });

      // 6. 修复简单 JSX 返回的分号
      content = content.replace(/return\s*<[^>]*\/>\s*;/g, (match) => {
        return match.replace(/;\s*$/, '');
      });

      // 统计修复次数
      if (content !== originalContent) {
        // 简单计算修复次数
        const originalCommas = (originalContent.match(/,/g) || []).length;
        const newCommas = (content.match(/,/g) || []).length;
        fixes = Math.abs(newCommas - originalCommas) + 1;
        
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
  
  console.log(`\n🎉 精确逗号修复完成!`);
  console.log(`📊 修复统计:`);
  console.log(`   - 修复文件数: ${fixedFiles}`);
  console.log(`   - 总修复数: ${totalFixes}`);
  
  return { fixedFiles, totalFixes };
}

// 执行修复
if (require.main === module) {
  preciseCommaFix();
}

module.exports = { preciseCommaFix }; 