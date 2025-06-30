const { processFile, findFourthLayerPages } = require('./translate-all-pages.js');

async function testSingleTranslation() {
  console.log('🧪 测试单个页面翻译...');
  
  // 获取第一个四层页面进行测试
  const pages = findFourthLayerPages();
  if (pages.length === 0) {
    console.log('❌ 未找到四层页面');
    return;
  }
  
  const testPage = pages[0];
  console.log(`\n📄 测试页面: ${testPage}`);
  
  try {
    console.log('\n🔄 开始测试翻译...');
    const result = await processFile(testPage);
    
    if (result) {
      console.log('\n✅ 测试成功：页面已翻译并更新');
    } else {
      console.log('\n✅ 测试成功：页面无需翻译');
    }
    
  } catch (error) {
    console.error('\n❌ 测试失败:', error);
  }
}

testSingleTranslation(); 