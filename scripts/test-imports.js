// 测试导入功能
console.log('测试导入功能...');

async function testImports() {
  try {
    // 先测试数据源提取器
    console.log('🔍 测试数据源提取器导入...');
    const { extractTokyoDataSources } = await import(
      '../src/utils/data-source-extractor.js'
    );
    console.log('✅ 数据源提取器导入成功');

    const sources = await extractTokyoDataSources();
    console.log(`📊 提取到 ${sources.length} 个东京活动`);

    // 显示前3个活动的信息
    sources.slice(0, 3).forEach((source, i) => {
      console.log(`${i + 1}. ${source.name}`);
      console.log(`   - 有官网: ${source.hasOfficialWebsite ? '是' : '否'}`);
      console.log(
        `   - 有WalkerPlus: ${source.hasWalkerPlusUrl ? '是' : '否'}`
      );
    });

    console.log('\n✅ 测试完成！可以开始数据爬取');
  } catch (error) {
    console.error('❌ 导入测试失败:', error);
  }
}

testImports();
