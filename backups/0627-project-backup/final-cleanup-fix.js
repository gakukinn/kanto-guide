const fs = require('fs');
const path = require('path');

// 最终清理修复脚本
function finalCleanupFix() {
  console.log('🧹 开始最终清理修复...');
  
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

      // 1. 修复 metadata 对象结构 - 移除多余的逗号
      content = content.replace(/export const metadata = \{([^}]*)\}\s*,\s*\{([^}]*)\}\s*,\s*\{([^}]*)\}\s*;/gs, (match, part1, part2, part3) => {
        fixes++;
        return `export const metadata = {
${part1.trim()},
  openGraph: {
${part2.trim()}
  },
  robots: {
${part3.trim()}
  }
};`;
      });

      // 2. 修复 openGraph 和 robots 对象嵌套
      content = content.replace(/export const metadata = \{([^}]*),\s*openGraph:\s*\{([^}]*)\}\s*,\s*robots:\s*\{([^}]*)\}\s*\}\s*;/gs, (match, basic, openGraph, robots) => {
        fixes++;
        return `export const metadata = {
${basic.trim()},
  openGraph: {
${openGraph.trim()}
  },
  robots: {
${robots.trim()}
  }
};`;
      });

      // 3. 修复多余的逗号和换行
      content = content.replace(/,\s*,/g, ',');
      content = content.replace(/\{\s*,/g, '{');
      content = content.replace(/,\s*\}/g, '}');

      // 4. 修复 return 语句的分号问题
      content = content.replace(/return\s*\(\s*<([^>]+)>[^<]*<\/[^>]*>\s*\)\s*;/g, (match) => {
        fixes++;
        return match.replace(/;\s*$/, '');
      });

      // 5. 修复 JSX 元素末尾的分号
      content = content.replace(/(<[^>]*\/>\s*);/g, '$1');

      // 6. 修复函数结尾的双分号
      content = content.replace(/\}\s*;\s*;/g, '}');

      // 7. 修复对象属性的语法错误
      content = content.replace(/(\w+):\s*([^,}\n]+)\s*([,}])/g, (match, key, value, ending) => {
        if (!value.trim().endsWith(',') && !value.trim().endsWith('}') && ending === ',') {
          return `${key}: ${value.trim()}${ending}`;
        }
        return match;
      });

      // 8. 修复 metadata 导出和函数定义之间的问题
      content = content.replace(/export const metadata = \{([^}]+)\}\s*;\s*,\s*export default function/gs, (match, metadataContent) => {
        fixes++;
        return `export const metadata = {
${metadataContent}
};

export default function`;
      });

      // 9. 修复数组和对象的结构问题
      content = content.replace(/\[\s*\{([^}]+)\}\s*,\s*\]/gs, (match, content) => {
        return `[{${content}}]`;
      });

      // 10. 修复 const 变量定义的问题
      content = content.replace(/,\s*const\s+(\w+)/g, (match, varName) => {
        fixes++;
        return `;\n\nconst ${varName}`;
      });

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
  
  console.log(`\n🎉 最终清理完成!`);
  console.log(`📊 修复统计:`);
  console.log(`   - 修复文件数: ${fixedFiles}`);
  console.log(`   - 总修复数: ${totalFixes}`);
  
  return { fixedFiles, totalFixes };
}

// 执行修复
if (require.main === module) {
  finalCleanupFix();
}

module.exports = { finalCleanupFix }; 