const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🗑️ 删除无用测试文件到回收站...\n');

// 根据之前分析结果，定义所有无用文件的完整路径
const uselessFiles = [
  'app/chiba/hanami/matsuri-event',
  'app/chiba/matsuri/matsuri-event',
  'app/kanagawa/hanami/hanami-event',
  'app/kanagawa/hanami/matsuri-event',
  'app/kanagawa/matsuri/matsuri-event',
  'app/kitakanto/hanami/hanami-event',
  'app/kitakanto/hanami/matsuri-event',
  'app/kitakanto/matsuri/matsuri-event',
  'app/koshinetsu/hanami/hanami-event',
  'app/koshinetsu/hanami/matsuri-event',
  'app/koshinetsu/matsuri/matsuri-event',
  'app/koshinetsu/hanabi/kawaguchiko-herb-festival',
  'app/saitama/hanami/matsuri-event',
  'app/saitama/matsuri/matsuri-event',
  'app/tokyo/hanami/matsuri-event',
  'app/tokyo/matsuri/matsuri-event'
];

// 还有一些activity-event和activity-2025开头的，让我搜索一下
function findAllUselessFiles() {
  const foundFiles = [];
  
  // 添加已知的固定文件
  uselessFiles.forEach(filePath => {
    if (fs.existsSync(filePath) && fs.existsSync(path.join(filePath, 'page.tsx'))) {
      foundFiles.push(filePath);
    }
  });
  
  // 搜索activity-event-*和activity-2025-*模式的文件
  function searchDirectory(dir) {
    if (!fs.existsSync(dir)) return;
    
    const entries = fs.readdirSync(dir);
    for (const entry of entries) {
      const fullPath = path.join(dir, entry);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // 检查是否是测试活动目录
        if (entry.startsWith('activity-event-') || 
            entry.startsWith('activity-2025-') ||
            entry === 'matsuri-event' ||
            entry === 'hanami-event' ||
            entry === 'kawaguchiko-herb-festival') {
          
          const pageFile = path.join(fullPath, 'page.tsx');
          if (fs.existsSync(pageFile)) {
            foundFiles.push(fullPath);
          }
        } else {
          // 继续递归搜索
          searchDirectory(fullPath);
        }
      }
    }
  }
  
  searchDirectory('app');
  return foundFiles;
}

// Windows PowerShell 删除到回收站的函数
function moveToRecycleBin(dirPath) {
  try {
    const absolutePath = path.resolve(dirPath);
    // 使用PowerShell的COM对象将目录移动到回收站
    const psCommand = `Add-Type -AssemblyName Microsoft.VisualBasic; [Microsoft.VisualBasic.FileIO.FileSystem]::DeleteDirectory('${absolutePath}', 'OnlyErrorDialogs', 'SendToRecycleBin')`;
    
    execSync(`powershell -NoProfile -Command "${psCommand}"`, { stdio: 'pipe' });
    return true;
  } catch (error) {
    console.error(`❌ 删除失败: ${dirPath} - ${error.message}`);
    return false;
  }
}

const allUselessFiles = findAllUselessFiles();

console.log(`📊 找到 ${allUselessFiles.length} 个无用测试文件目录:\n`);

allUselessFiles.forEach((file, index) => {
  console.log(`${index + 1}. ${file}`);
});

if (allUselessFiles.length === 0) {
  console.log('✅ 没有找到无用文件，可能已经清理过了');
  process.exit(0);
}

console.log(`\n🗑️ 开始删除到回收站...`);

let successCount = 0;
let failCount = 0;

allUselessFiles.forEach((filePath, index) => {
  console.log(`\n[${index + 1}/${allUselessFiles.length}] 删除: ${filePath}`);
  
  if (moveToRecycleBin(filePath)) {
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