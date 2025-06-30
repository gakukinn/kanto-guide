const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🗑️ 删除无用测试文件到回收站...\n');

// 定义无用文件的模式
const uselessPatterns = [
  'matsuri-event',
  'hanami-event', 
  /^activity-event-/,
  /^activity-2025-/,
  'kawaguchiko-herb-festival'
];

function isUselessFile(pageId) {
  return uselessPatterns.some(pattern => {
    if (typeof pattern === 'string') {
      return pageId === pattern;
    } else {
      return pattern.test(pageId);
    }
  });
}

function findUselessFiles(dir, files = []) {
  const entries = fs.readdirSync(dir);
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      // 检查是否是无用的页面目录
      const pageFile = path.join(fullPath, 'page.tsx');
      if (fs.existsSync(pageFile)) {
        const pageId = path.basename(fullPath);
        if (isUselessFile(pageId)) {
          files.push({
            path: fullPath,
            relativePath: path.relative('.', fullPath),
            pageId: pageId
          });
        }
      } else {
        // 继续递归查找
        findUselessFiles(fullPath, files);
      }
    }
  }
  
  return files;
}

// Windows PowerShell 删除到回收站的函数
function moveToRecycleBin(dirPath) {
  try {
    const absolutePath = path.resolve(dirPath);
    // 使用PowerShell的COM对象将目录移动到回收站
    const psCommand = `
      Add-Type -AssemblyName Microsoft.VisualBasic;
      [Microsoft.VisualBasic.FileIO.FileSystem]::DeleteDirectory('${absolutePath}', 'OnlyErrorDialogs', 'SendToRecycleBin')
    `;
    
    execSync(`powershell -Command "${psCommand}"`, { stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(`❌ 删除失败: ${dirPath}`, error.message);
    return false;
  }
}

const uselessFiles = findUselessFiles('app');

console.log(`📊 找到 ${uselessFiles.length} 个无用测试文件目录:\n`);

uselessFiles.forEach((file, index) => {
  console.log(`${index + 1}. ${file.relativePath}`);
});

console.log(`\n🗑️ 开始删除到回收站...`);

let successCount = 0;
let failCount = 0;

uselessFiles.forEach((file, index) => {
  console.log(`\n[${index + 1}/${uselessFiles.length}] 删除: ${file.relativePath}`);
  
  if (moveToRecycleBin(file.path)) {
    console.log(`✅ 成功移动到回收站`);
    successCount++;
  } else {
    console.log(`❌ 删除失败`);
    failCount++;
  }
});

console.log(`\n📊 删除结果:`);
console.log(`✅ 成功删除: ${successCount} 个`);
console.log(`❌ 删除失败: ${failCount} 个`);

if (successCount > 0) {
  console.log(`\n🎉 已将 ${successCount} 个无用测试文件移动到回收站！`);
  console.log(`�� 如需恢复，可以从回收站还原`);
} 