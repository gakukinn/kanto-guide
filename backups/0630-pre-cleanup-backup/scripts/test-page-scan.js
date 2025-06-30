const { findPageFiles } = require('./translate-all-pages-working.js');

console.log('📂 测试页面文件扫描...');
const pageFiles = findPageFiles();
console.log(`📋 发现页面文件数量: ${pageFiles.length}`);

console.log('\n📄 前10个文件:');
pageFiles.slice(0, 10).forEach((file, i) => {
  const relativePath = file.replace(process.cwd(), '.');
  console.log(`  ${i + 1}. ${relativePath}`);
});

if (pageFiles.length > 10) {
  console.log(`  ... 还有 ${pageFiles.length - 10} 个文件`);
} 