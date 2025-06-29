const { findFourthLayerPages } = require('./translate-all-pages.js');

console.log('🔍 正在查找四层页面...');
const pages = findFourthLayerPages();

console.log(`\n📊 找到 ${pages.length} 个四层页面:`);
pages.slice(0, 10).forEach((page, index) => {
  console.log(`   ${index + 1}. ${page}`);
});

if (pages.length > 10) {
  console.log(`   ... 还有 ${pages.length - 10} 个页面`);
}

console.log('\n✅ 测试完成'); 