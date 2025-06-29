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

// 修复语法错误
function fixSyntaxErrors(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  
  // 修复 metadata 语法错误
  // 1. 修复 }; 后面跟着 , 的错误
  content = content.replace(/^export const metadata = \{[^}]*\};,$/gm, (match) => {
    return match.replace('};,', '};');
  });
  
  // 2. 修复多行的语法错误模式
  content = content.replace(/\};,\s*\],\s*\},\s*\},/g, '};');
  
  // 3. 修复 openGraph 对象语法
  content = content.replace(/openGraph:\s*\{[^}]*\},\s*\},/g, (match) => {
    return match.replace(/\},\s*\},$/, '}');
  });
  
  // 4. 修复 robots 对象语法
  content = content.replace(/robots:\s*\{[^}]*\},\s*\}/g, (match) => {
    return match.replace(/\},\s*\}$/, '}');
  });
  
  // 5. 完全重写有问题的 metadata 导出
  if (content.includes('export const metadata') && content.includes('};,')) {
    // 提取基本信息
    const titleMatch = content.match(/title:\s*['"](.*?)['"],?/);
    const descriptionMatch = content.match(/description:\s*['"](.*?)['"],?/);
    
    const title = titleMatch ? titleMatch[1] : '活动详情 - 日本东部六地区旅游指南';
    const description = descriptionMatch ? descriptionMatch[1] : '精彩活动等您体验';
    
    // 替换整个 metadata 导出
    const metadataRegex = /export const metadata = \{[\s\S]*?\};/;
    const newMetadata = `export const metadata = {
  title: '${title}',
  description: '${description}',
  openGraph: {
    title: '${title}',
    description: '${description}',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};`;
    
    content = content.replace(metadataRegex, newMetadata);
  }
  
  // 6. 修复其他常见语法错误
  content = content.replace(/\],\s*\},\s*\},/g, ']');
  content = content.replace(/\},\s*\},\s*\}/g, '}');
  content = content.replace(/;\s*,/g, ';');
  
  // 7. 清理多余的逗号和分号
  content = content.replace(/,\s*\}/g, '}');
  content = content.replace(/;\s*\]/g, ']');
  
  // 8. 修复函数定义后的语法错误
  content = content.replace(/export default async function[^{]*\{[\s\S]*?\n\}/g, (match) => {
    // 移除函数内的语法错误
    return match.replace(/\};,/g, '};').replace(/\],\s*\},/g, ']');
  });
  
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
      const wasFixed = fixSyntaxErrors(filePath);
      if (wasFixed) {
        console.log(`✅ 修复语法错误: ${filePath}`);
        fixedCount++;
      }
    } catch (error) {
      console.error(`❌ 错误处理 ${filePath}:`, error.message);
      errorCount++;
    }
  });
  
  console.log(`\n语法修复完成:`);
  console.log(`- 成功修复: ${fixedCount} 个文件`);
  console.log(`- 错误: ${errorCount} 个文件`);
}

main(); 