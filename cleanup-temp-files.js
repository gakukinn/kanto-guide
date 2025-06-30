const fs = require('fs');
const path = require('path');

console.log('🧹 清理项目临时文件');

// 需要删除的临时文件列表
const tempFiles = [
  // Prisma清理脚本文件
  'delete-unused-apis.js',
  'fix-jl-generator.js', 
  'prisma-cleanup-plan.js',
  'cleanup-prisma.js',
  'fix-prisma-imports.js',
  'prisma-cleanup-report.md',
  
  // 测试文件
  'test-walkerplus-generator.js',
  'test-14-fields.js',
  'test-real-walkerplus.js',
  'test-data-map-pages.js',
  'test-current-api.js',
  'test-valid-url.js',
  'test-url.js',
  'test-detailed.js',
  'test-api-fix.js',
  'test-delete-demo.txt',
  'test_content.txt',
  'translation-prompt.txt',
  
  // 数据库恢复相关临时文件
  'db_hex_dump.txt',
  'recovered_data_freelist.sql', 
  'recovered_database.db',
  'recovered_data.sql',
  'sqlite-tools.zip',
  'check-all-data.js',
  'direct-data-check.js',
  'schema-check.js',
  'hex-db-check.js',
  'raw-db-check.js',
  'check-current-data.js',
  'check-kurihama.js',
  'save-jalan-data.js',
  'restore-from-backup.js',
  'restore-layer2.bat',
  
  // 其他临时文件
  'fix-syntax-errors.cjs',
  'transform.ts'
];

// 需要删除的临时目录
const tempDirs = [
  'sqlite-tools',
  'undark',
  '.venv'
];

let deletedFiles = 0;
let deletedDirs = 0;
let errors = 0;

console.log('\n📄 删除临时文件:');
tempFiles.forEach(file => {
  try {
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
      console.log(`✅ 删除文件: ${file}`);
      deletedFiles++;
    } else {
      console.log(`⚠️ 文件不存在: ${file}`);
    }
  } catch (error) {
    console.error(`❌ 删除失败: ${file} - ${error.message}`);
    errors++;
  }
});

console.log('\n📂 删除临时目录:');
tempDirs.forEach(dir => {
  try {
    if (fs.existsSync(dir)) {
      fs.rmSync(dir, { recursive: true, force: true });
      console.log(`✅ 删除目录: ${dir}`);
      deletedDirs++;
    } else {
      console.log(`⚠️ 目录不存在: ${dir}`);
    }
  } catch (error) {
    console.error(`❌ 删除失败: ${dir} - ${error.message}`);
    errors++;
  }
});

console.log('\n📋 清理结果:');
console.log(`✅ 删除文件: ${deletedFiles}个`);
console.log(`✅ 删除目录: ${deletedDirs}个`);
console.log(`❌ 错误: ${errors}个`);

if (errors === 0) {
  console.log('\n🎉 项目临时文件清理完成！');
  console.log('💡 建议运行 npm audit fix 修复安全漏洞');
} else {
  console.log('\n⚠️ 部分文件删除失败，请检查错误信息');
} 