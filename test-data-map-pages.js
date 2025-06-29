// 测试data.html和map.html页面的爬取功能
const testUrl = 'https://hanabi.walkerplus.com/detail/ar0310e00917/'; // 前橋花火大会

async function testDataMapPages() {
  console.log('🧪 测试data.html和map.html页面爬取功能');
  console.log('=====================================\n');
  
  console.log(`📍 测试URL: ${testUrl}`);
  console.log('预期结果:');
  console.log('🌐 官方网站: https://www.maebashihanabi.jp/');
  console.log('🗺️ 地图: 应该包含谷歌地图');
  console.log('-----------------------------------\n');
  
  try {
    const startTime = Date.now();
    
    const response = await fetch('http://localhost:3001/api/walkerplus-scraper', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: testUrl }),
    });

    if (!response.ok) {
      throw new Error(`API响应错误: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    const endTime = Date.now();
    
    console.log('✅ 爬取结果:');
    console.log(`⏱️  耗时: ${endTime - startTime}ms`);
    console.log(`🏷️  标题: ${result.name || '未识别'}`);
    console.log(`📝  描述: ${(result.description || '未识别').substring(0, 100)}...`);
    console.log(`🎯  見どころ: ${(result.highlights || '未识别').substring(0, 80)}...`);
    
    // 重点检查官网和地图
    console.log('\n🔍 重点检查:');
    console.log(`🌐  官方网站: ${result.website || '未识别'}`);
    
    if (result.website && result.website !== '未识别') {
      console.log('   ✅ 官网获取成功！');
      if (result.website === 'https://www.maebashihanabi.jp/') {
        console.log('   🎯 官网URL完全正确！');
      } else {
        console.log('   ⚠️  官网URL与预期不同');
      }
    } else {
      console.log('   ❌ 官网获取失败');
    }
    
    console.log(`🗺️  谷歌地图: ${result.mapUrl || '未获取'}`);
    
    if (result.mapUrl && result.mapUrl !== '未识别') {
      console.log('   ✅ 地图获取成功！');
      console.log(`   📍 地图URL: ${result.mapUrl}`);
    } else {
      console.log('   ❌ 地图获取失败');
    }
    
    // 评估质量
    const fields = [result.name, result.description, result.highlights, result.website, result.mapUrl];
    const successCount = fields.filter(field => field && field !== '未识别').length;
    const successRate = (successCount / fields.length * 100).toFixed(1);
    
    console.log(`\n📊 总体成功率: ${successRate}% (${successCount}/5)`);
    
    // 详细状态
    const websiteStatus = result.website && result.website !== '未识别' ? '✅' : '❌';
    const mapStatus = result.mapUrl && result.mapUrl !== '未识别' ? '✅' : '❌';
    console.log(`🔍 官网: ${websiteStatus} | 地图: ${mapStatus}`);
    
    if (successRate >= 80) {
      console.log('🎉 测试通过！data.html和map.html爬取功能正常');
    } else {
      console.log('⚠️  测试未完全通过，需要进一步优化');
    }
    
  } catch (error) {
    console.error('❌ 测试失败:', error.message);
  }
}

testDataMapPages(); 