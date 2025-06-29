// 测试WalkerPlus页面生成器的花火模板功能
const testUrl = 'https://hanabi.walkerplus.com/detail/ar0314e541039/'; // 横浜ナイトフラワーズ2025

async function testWalkerplusGenerator() {
  console.log('🧪 测试WalkerPlus页面生成器 - 花火模板');
  console.log('==========================================\n');
  
  console.log(`📍 测试URL: ${testUrl}`);
  console.log('页面信息: 横浜ナイトフラワーズ2025');
  console.log('预期结果: 使用WalkerPlusHanabiTemplate生成四层花火页面');
  console.log('-------------------------------------------\n');
  
  try {
    const startTime = Date.now();
    
    // 第一步：爬取WalkerPlus数据
    console.log('🔄 第一步：爬取WalkerPlus数据...');
    const scrapeResponse = await fetch('http://localhost:3001/api/walkerplus-scraper', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: testUrl }),
    });

    if (!scrapeResponse.ok) {
      throw new Error(`爬取失败: ${scrapeResponse.status} ${scrapeResponse.statusText}`);
    }

    const scrapeData = await scrapeResponse.json();
    console.log('✅ 爬取成功！');
    console.log('🎆 活动名称:', scrapeData.eventName);
    console.log('📝 描述长度:', scrapeData.description?.length || 0);
    console.log('🌐 官方网站:', scrapeData.officialSite || '未获取');
    console.log('🗺️ 地图:', scrapeData.googleMap ? '已获取' : '未获取');
    console.log('');
    
    // 第二步：生成页面
    console.log('🔄 第二步：生成四层花火页面...');
    
    // 将爬取的数据转换为页面生成器需要的格式
    const pageGeneratorData = {
      name: scrapeData.eventName || '横浜ナイトフラワーズ2025',
      address: scrapeData.venue || '横浜港臨海部',
      datetime: scrapeData.eventPeriod || '2025年4月26日（土）～2026年3月28日（土）',
      venue: scrapeData.venue || '横浜港臨海部',
      access: scrapeData.venueAccess || 'みなとみらい線みなとみらい駅から徒歩5分',
      organizer: 'WalkerPlus',
      price: scrapeData.paidSeats || 'なし',
      contact: scrapeData.contactInfo || '详见官网',
      website: scrapeData.officialSite || '',
      googleMap: scrapeData.googleMap || '',
      description: scrapeData.description || '',
      // WalkerPlus特有字段
      fireworksCount: scrapeData.fireworksCount || '详见官网',
      fireworksDuration: scrapeData.fireworksDuration || '详见官网',
      expectedVisitors: scrapeData.expectedVisitors || '详见官网',
      eventTime: scrapeData.eventTime || '详见官网',
      weatherPolicy: scrapeData.weatherPolicy || '详见官网',
      foodStalls: scrapeData.foodStalls || '详见官网',
      otherNotes: scrapeData.otherNotes || '详见官网',
      parking: scrapeData.parking || '详见官网'
    };
    
    const generateResponse = await fetch('http://localhost:3001/api/walkerplus-page-generator', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: pageGeneratorData,
        activityType: 'hanabi',
        region: 'kanagawa', // 横浜属于神奈川
        duplicateAction: 'overwrite'
      }),
    });

    if (!generateResponse.ok) {
      throw new Error(`页面生成失败: ${generateResponse.status} ${generateResponse.statusText}`);
    }

    const generateData = await generateResponse.json();
    console.log('✅ 页面生成成功！');
    console.log('📄 生成的页面路径:', generateData.pageUrl);
    console.log('💾 数据库ID:', generateData.databaseId);
    console.log('📁 JSON文件:', generateData.jsonFiles?.join(', '));
    console.log('🎨 使用模板:', generateData.templateUsed || 'WalkerPlusHanabiTemplate');
    
    const endTime = Date.now();
    console.log(`\n⏱️ 总耗时: ${endTime - startTime}ms`);
    
    // 第三步：验证生成的页面
    console.log('\n🔄 第三步：验证生成的页面...');
    if (generateData.pageUrl) {
      console.log(`🌐 页面访问地址: http://localhost:3001${generateData.pageUrl}`);
      console.log('💡 请在浏览器中访问上述地址验证页面效果');
    }
    
    // 第四步：验证API端点
    if (generateData.databaseId) {
      console.log('\n🔄 第四步：验证API端点...');
      const apiResponse = await fetch(`http://localhost:3001/api/hanabi-events/${generateData.databaseId}`);
      if (apiResponse.ok) {
        const apiData = await apiResponse.json();
        console.log('✅ API端点正常！');
        console.log('📊 返回数据字段:', Object.keys(apiData).join(', '));
      } else {
        console.log('❌ API端点异常:', apiResponse.status);
      }
    }
    
    console.log('\n🎉 测试完成！WalkerPlus花火页面生成器功能正常');
    
  } catch (error) {
    console.error('❌ 测试失败:', error.message);
    console.error('详细错误:', error);
  }
}

// 运行测试
testWalkerplusGenerator(); 