const fs = require('fs');
const path = require('path');

console.log('📋 列出需要修复 media type 字段的有用文件...\n');

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
        const relativePath = path.relative('.', fullPath);
        const pathParts = relativePath.split(path.sep);
        
        // 确保是六大地区下的文件
        if (pathParts.length >= 4 && pathParts[0] === 'app') {
          const region = pathParts[1];
          const activity = pathParts[2];
          const pageId = pathParts[3];
          
          // 确认是六大地区
          const validRegions = ['tokyo', 'kanagawa', 'saitama', 'chiba', 'kitakanto', 'koshinetsu'];
          if (validRegions.includes(region)) {
            files.push({
              path: fullPath,
              relativePath: relativePath,
              region: region,
              activity: activity,
              pageId: pageId,
              regionCn: getRegionChinese(region),
              activityCn: getActivityChinese(activity)
            });
          }
        }
      }
    }
  }
  
  return files;
}

function getRegionChinese(region) {
  const map = {
    'tokyo': '东京',
    'kanagawa': '神奈川',
    'saitama': '埼玉',
    'chiba': '千叶',
    'kitakanto': '北关东',
    'koshinetsu': '甲信越'
  };
  return map[region] || region;
}

function getActivityChinese(activity) {
  const map = {
    'hanabi': '花火',
    'matsuri': '祭典',
    'hanami': '花见',
    'momiji': '狩枫',
    'illumination': '灯光',
    'culture': '文艺'
  };
  return map[activity] || activity;
}

const usefulFiles = findFilesWithMediaType('app');

console.log(`📊 找到 ${usefulFiles.length} 个有用文件需要修复 media type 字段:\n`);

// 按地区分组
const filesByRegion = {};
usefulFiles.forEach(file => {
  if (!filesByRegion[file.region]) {
    filesByRegion[file.region] = [];
  }
  filesByRegion[file.region].push(file);
});

// 显示统计
Object.keys(filesByRegion).forEach(region => {
  const files = filesByRegion[region];
  const regionCn = getRegionChinese(region);
  console.log(`📍 ${regionCn}(${region}): ${files.length}个文件`);
  
  const activityGroups = {};
  files.forEach(file => {
    if (!activityGroups[file.activity]) {
      activityGroups[file.activity] = [];
    }
    activityGroups[file.activity].push(file);
  });
  
  Object.keys(activityGroups).forEach(activity => {
    const activityFiles = activityGroups[activity];
    const activityCn = getActivityChinese(activity);
    console.log(`   ${activityCn}: ${activityFiles.length}个`);
  });
  console.log('');
});

console.log('\n📋 完整文件列表:');
console.log('='.repeat(80));

let index = 1;
Object.keys(filesByRegion).sort().forEach(region => {
  const files = filesByRegion[region];
  const regionCn = getRegionChinese(region);
  
  console.log(`\n🌏 ${regionCn}地区 (${files.length}个):`);
  console.log('-'.repeat(50));
  
  files.forEach(file => {
    console.log(`${index.toString().padStart(2, ' ')}. ${file.relativePath}`);
    console.log(`    活动类型: ${file.activityCn}  页面ID: ${file.pageId}`);
    index++;
  });
});

console.log(`\n📋 总计: ${usefulFiles.length} 个有用文件需要修复`);
console.log('🔧 这些文件的 "type": "image", 需要改为 "type": "image" as const,'); 