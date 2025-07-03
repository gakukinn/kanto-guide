// 测试手动活动类型选择功能

async function testManualActivityType() {
  console.log('🧪 测试手动活动类型选择功能\n');

  // 模拟用户数据
  const testData = {
    textData: {
      name: '第91回水戸のあじさい祭典',
      address: '〒310-0052　茨城県水戸市松本町13-19',
      period: '2025年6月7日～29日　※事件により異なる',
      venue: '水戸市　保和苑及び周辺史跡',
      access: 'ＪＲ「水戸駅」北口7番乗り場から「栄町経由大工町・渡里行」の茨城交通バス約15分「保和苑入口」～徒歩4分、または常磐自動車道「水戸IC」から国道50号入口工事による約20分',
      organizer: '',
      price: '無料',
      contact: '事務局（水戸市産業経済部観光課）　029-224-1111　（代表）',
      website: 'https://www.city.mito.lg.jp/site/kankouinfo/94415.html'
    },
    mapData: {
      coordinates: { lat: 36.391576, lng: 140.455102 },
      coordsSource: 'Google Maps link',
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d140.455102!3d36.391576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750657009786!5m2!1sja!2sjp'
    },
    action: 'check',
    manualActivityType: 'hanami' // 🔥 用户手动选择花见会
  };

  try {
    console.log('发送测试数据到API...');
    console.log('手动选择的活动类型:', testData.manualActivityType);
    
    const response = await fetch('http://localhost:3000/api/auto-import-database', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testData)
    });

    const result = await response.json();
    
    console.log('\n📊 API返回结果:');
    console.log('成功:', result.success);
    console.log('分类信息:', result.classification);
    
    if (result.classification) {
      console.log('\n🎯 分类结果验证:');
      console.log('最终活动类型:', result.classification.type);
      console.log('活动类型名称:', result.classification.typeName);
      console.log('置信度:', result.classification.confidence + '%');
      console.log('原因:', result.classification.reason);
      
      // 验证结果
      if (result.classification.type === 'hanami') {
        console.log('\n✅ 测试通过：手动选择的花见会被正确识别！');
      } else {
        console.log('\n❌ 测试失败：期望 hanami，实际', result.classification.type);
      }
    }
    
    if (result.hasDuplicates) {
      console.log('\n📋 重复数据信息:');
      console.log('重复数量:', result.duplicates?.length || 0);
      console.log('消息:', result.message);
    }
    
  } catch (error) {
    console.log('❌ 测试失败:', error.message);
  }
}

// 运行测试
testManualActivityType(); 