const fs = require('fs');
const path = require('path');

console.log('🔍 查找所有需要修复 media type 字段的文件...\n');

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

const problematicFiles = findFilesWithMediaType('app');

console.log(`📊 统计结果:`);
console.log(`- 总计需要修复的文件: ${problematicFiles.length}个\n`);

// 按地区分组
const byRegion = {};
problematicFiles.forEach(file => {
  if (!byRegion[file.region]) byRegion[file.region] = [];
  byRegion[file.region].push(file);
});

console.log('📍 按地区分布:');
Object.keys(byRegion).sort().forEach(region => {
  const regionFiles = byRegion[region];
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

console.log('\n📋 完整文件列表:');
problematicFiles.sort((a, b) => a.relativePath.localeCompare(b.relativePath))
  .forEach((file, index) => {
    console.log(`${index + 1}. ${file.relativePath}`);
  });

console.log(`\n💡 建议:`);
console.log(`1. 先确认哪些文件是有用的（对应真实活动）`);
console.log(`2. 删除无用的测试或重复文件`); 
console.log(`3. 批量修复剩余有用文件的 media type 字段`);
console.log(`4. 这样可以避免浪费时间修复无用文件`); 