const fs = require('fs');
const path = require('path');

console.log('🗑️ 删除无用API文件');

// 必须保留的8个API文件（支持3个生成器）
const KEEP_APIS = [
  'activity-page-generator/route.ts',    // JL生成器 (已修复)
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

// 分类API文件
const toDelete = [];

allApis.forEach(api => {
  // 标准化路径分隔符
  const normalizedApi = api.replace(/\\/g, '/');
  if (!KEEP_APIS.includes(normalizedApi)) {
    toDelete.push(api);
  }
});

console.log(`\n📊 发现${allApis.length}个API文件`);
console.log(`❌ 需要删除${toDelete.length}个API文件`);

// 删除文件
let deletedCount = 0;
let errorCount = 0;

toDelete.forEach(api => {
  try {
    // 获取目录路径
    const filePath = path.join('app/api', api);
    const dirPath = path.dirname(filePath);
    
    // 删除文件
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`✅ 删除文件: ${api}`);
      deletedCount++;
      
      // 检查目录是否为空，如果为空则删除目录
      try {
        const dirContents = fs.readdirSync(dirPath);
        if (dirContents.length === 0) {
          fs.rmdirSync(dirPath);
          console.log(`  🗂️ 删除空目录: ${path.relative('app/api', dirPath)}`);
        }
      } catch (dirError) {
        // 目录不为空或其他错误，忽略
      }
    } else {
      console.log(`⚠️ 文件不存在: ${api}`);
    }
    
  } catch (error) {
    console.error(`❌ 删除失败: ${api} - ${error.message}`);
    errorCount++;
  }
});

console.log(`\n📋 删除结果：`);
console.log(`✅ 成功删除: ${deletedCount}个文件`);
console.log(`❌ 删除失败: ${errorCount}个文件`);
console.log(`✅ 保留: ${KEEP_APIS.length}个重要API`);

if (errorCount === 0) {
  console.log('\n🎉 所有无用API文件删除完成！');
} else {
  console.log('\n⚠️ 部分文件删除失败，请检查错误信息');
} 