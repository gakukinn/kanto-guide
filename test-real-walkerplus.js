// 测试真实的WalkerPlus页面：横浜ナイトフラワーズ2025
const testUrl = 'https://hanabi.walkerplus.com/detail/ar0314e541039/'; // 横浜ナイトフラワーズ2025

async function testRealWalkerplusPage() {
  console.log('🧪 测试真实WalkerPlus页面三重爬取功能');
  console.log('==========================================\\n');
  
  console.log(`📍 测试URL: ${testUrl}`);
  console.log('页面信息: 横浜ナイトフラワーズ2025');
  console.log('预期内容:');
  console.log('🏷️ 标题: 横浜ナイトフラワーズ2025');
  console.log('📝 描述: 应该包含年间花火、横浜港等信息');
  console.log('🎯 見どころ: 应该包含横浜港臨海部等特色');
  console.log('-------------------------------------------\\n');
  
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
    
    console.log('✅ 三重爬取成功结果：');
    console.log(`⏱️  耗时： ${endTime - startTime}ms`);
    console.log('=====================================');
    console.log(`🏷️  活动名称： ${result.name}`);
    console.log(`📝 内容简介： ${result.description}`);
    console.log(`👀 见どころ： ${result.highlights}`);
    console.log(`🌐 官方网站： ${result.officialWebsite}`);
    console.log(`🗺️  谷歌地图： ${result.googleMapUrl}`);
    
    console.log('\\n=====================================');
    console.log('📊 三重爬取详细分析：');
    console.log('=====================================');
    
    // 分析每个字段的获取情况
    const fields = [
      { name: '活动名称', value: result.name, weight: 20 },
      { name: '内容简介', value: result.description, weight: 25 },
      { name: '见どころ', value: result.highlights, weight: 20 },
      { name: '官方网站', value: result.officialWebsite, weight: 20 },
      { name: '地图嵌入', value: result.googleMapUrl, weight: 15 }
    ];
    
    let totalScore = 0;
    let successCount = 0;
    
    console.log('🔍 数据来源分析：');
    fields.forEach(field => {
      const isSuccess = field.value && field.value !== '未识别' && field.value !== '未获取';
      if (isSuccess) {
        totalScore += field.weight;
        successCount++;
        console.log(`- ${field.name}： ✅ 获取成功`);
      } else {
        console.log(`- ${field.name}： ❌ 获取失败`);
      }
    });
    
    console.log('\\n=====================================');
    console.log('📋 数据质量评估：');
    console.log('=====================================');
    fields.forEach(field => {
      const isSuccess = field.value && field.value !== '未识别' && field.value !== '未获取';
      const status = isSuccess ? '✅' : '❌';
      console.log(`- ${field.name}: ${status} (${field.weight}分)`);
    });
    
    const successRate = (successCount / fields.length * 100).toFixed(1);
    console.log(`\\n🎯 总体质量评分: ${totalScore}/100分`);
    console.log(`📊 字段成功率: ${successRate}% (${successCount}/${fields.length})`);
    
    if (totalScore >= 80) {
      console.log('🎉 三重爬取质量: 优秀');
    } else if (totalScore >= 60) {
      console.log('👍 三重爬取质量: 良好');
    } else {
      console.log('⚠️  三重爬取质量: 需要改进');
    }
    
    // 特别检查官网和地图
    console.log('\\n🔍 重点检查:');
    if (result.officialWebsite && result.officialWebsite !== '未识别') {
      console.log(`🌐  官方网站: ${result.officialWebsite}`);
      console.log('   ✅ 官网获取成功');
    } else {
      console.log('🌐  官方网站: 未识别');
      console.log('   ❌ 官网获取失败');
    }
    
    if (result.googleMapUrl && result.googleMapUrl !== '未获取') {
      console.log(`🗺️  谷歌地图: ${result.googleMapUrl}`);
      console.log('   ✅ 地图获取成功');
    } else {
      console.log('🗺️  谷歌地图: 未获取');
      console.log('   ❌ 地图获取失败');
    }
    
    console.log(`\\n📊 总体成功率: ${successRate}% (${successCount}/${fields.length})`);
    
    const officialSuccess = result.officialWebsite && result.officialWebsite !== '未识别';
    const mapSuccess = result.googleMapUrl && result.googleMapUrl !== '未获取';
    console.log(`🔍 官网: ${officialSuccess ? '✅' : '❌'} | 地图: ${mapSuccess ? '✅' : '❌'}`);
    
    if (successRate >= 80) {
      console.log('🎉 测试完全通过！');
    } else if (successRate >= 60) {
      console.log('✅ 测试基本通过，但仍有优化空间');
    } else {
      console.log('⚠️  测试未完全通过，需要进一步优化');
    }

  } catch (error) {
    console.error('❌ 测试失败:', error.message);
    console.log('\\n🔧 可能的问题：');
    console.log('1. 确保开发服务器正在运行 (npm run dev)');
    console.log('2. 检查API端点是否正确');
    console.log('3. 检查网络连接');
  }
}

// 运行测试
testRealWalkerplusPage(); 