const fs = require('fs');
const path = require('path');

console.log('🔍 分析有用和无用的页面文件...\n');

function findFilesWithMediaType(dir, files = []) {
  const entries = fs.readdirSync(dir);
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      findFilesWithMediaType(fullPath, files);
    } else if (entry === 'page.tsx') {
      const content = fs.readFileSync(fullPath, 'utf8');
      
      // 检查是否包含 "type": "image", 但不包含 as const
      if (content.includes('"type": "image",') && !content.includes('"type": "image" as const,')) {
        files.push({
          path: fullPath,
          relativePath: path.relative('.', fullPath),
          region: fullPath.split(path.sep)[1] || 'unknown',
          activity: fullPath.split(path.sep)[2] || 'unknown',
          pageId: fullPath.split(path.sep)[3] || 'unknown'
        });
      }
    }
  }
  
  return files;
}

// 定义无用文件的模式
const uselessPatterns = [
  'matsuri-event',
  'hanami-event', 
  /^activity-event-/,    // activity-event-开头的
  /^activity-2025-/,     // activity-2025-开头的
  'kawaguchiko-herb-festival'  // 看起来像测试的
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

const allFiles = findFilesWithMediaType('app');

// 分类文件
const usefulFiles = allFiles.filter(file => !isUselessFile(file.pageId));
const uselessFiles = allFiles.filter(file => isUselessFile(file.pageId));

console.log(`📊 文件分类统计:`);
console.log(`- 总计文件: ${allFiles.length}个`);
console.log(`- ✅ 有用文件: ${usefulFiles.length}个`);
console.log(`- ❌ 无用文件: ${uselessFiles.length}个\n`);

console.log('❌ 无用文件列表:');
uselessFiles.sort((a, b) => a.relativePath.localeCompare(b.relativePath))
  .forEach((file, index) => {
    console.log(`${index + 1}. ${file.relativePath}`);
  });

console.log('\n✅ 有用文件列表:');
usefulFiles.sort((a, b) => a.relativePath.localeCompare(b.relativePath))
  .forEach((file, index) => {
    console.log(`${index + 1}. ${file.relativePath}`);
  });

// 按地区统计有用文件
const usefulByRegion = {};
usefulFiles.forEach(file => {
  if (!usefulByRegion[file.region]) usefulByRegion[file.region] = [];
  usefulByRegion[file.region].push(file);
});

console.log('\n📍 有用文件按地区分布:');
Object.keys(usefulByRegion).sort().forEach(region => {
  const regionFiles = usefulByRegion[region];
  console.log(`- ${region}: ${regionFiles.length}个文件`);
  
  // 按活动类型分组
  const byActivity = {};
  regionFiles.forEach(file => {
    if (!byActivity[file.activity]) byActivity[file.activity] = [];
    byActivity[file.activity].push(file);
  });
  
  Object.keys(byActivity).sort().forEach(activity => {
    console.log(`  └─ ${activity}: ${byActivity[activity].length}个`);
  });
});

console.log(`\n🎯 建议操作:`);
console.log(`1. 删除 ${uselessFiles.length} 个无用测试文件`);
console.log(`2. 修复 ${usefulFiles.length} 个有用文件的 media type 字段`);
console.log(`3. 这样可以节省 ${Math.round((uselessFiles.length / allFiles.length) * 100)}% 的修复工作量`); 