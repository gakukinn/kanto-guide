const fs = require('fs');
const path = require('path');

console.log('🧹 Prisma清理计划');

// 必须保留的8个API文件（支持3个生成器）
const KEEP_APIS = [
  'activity-page-generator/route.ts',    // JL生成器 (需要修复Prisma)
  'walkerplus-page-generator/route.ts',  // WP生成器
  'walkerplus-text-parser/route.ts',     // WP生成器依赖
  'walkerplus-scraper/route.ts',         // WP生成器依赖
  'get-activity-files/route.ts',         // 三层生成器
  'get-activity-data/route.ts',          // 三层生成器依赖
  'update-region-summary/route.ts',      // 三层生成器依赖
  'delete-activity-file/route.ts'        // 三层生成器依赖
];

// 扫描所有API文件
const apiDir = 'app/api';
const allApis = [];

function scanDirectory(dir) {
  const items = fs.readdirSync(dir);
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      scanDirectory(fullPath);
    } else if (item === 'route.ts') {
      const relativePath = path.relative('app/api', fullPath);
      allApis.push(relativePath);
    }
  });
}

scanDirectory(apiDir);

console.log(`\n📊 发现${allApis.length}个API文件`);

// 分类API文件
const toKeep = [];
const toDelete = [];

allApis.forEach(api => {
  // 标准化路径分隔符
  const normalizedApi = api.replace(/\\/g, '/');
  if (KEEP_APIS.includes(normalizedApi)) {
    toKeep.push(api);
  } else {
    toDelete.push(api);
  }
});

console.log(`\n✅ 保留${toKeep.length}个API文件：`);
toKeep.forEach(api => console.log(`  - ${api}`));

console.log(`\n❌ 删除${toDelete.length}个API文件：`);
toDelete.forEach(api => console.log(`  - ${api}`));

console.log(`\n🔧 需要修复Prisma的API文件：`);
console.log(`  - activity-page-generator/route.ts (JL生成器)`);

console.log(`\n📋 清理计划：`);
console.log(`1. 修复 activity-page-generator/route.ts 的Prisma依赖`);
console.log(`2. 删除 ${toDelete.length} 个无用API文件`);
console.log(`3. 验证3个生成器正常工作`);
console.log(`4. 运行类型检查确认无错误`); 