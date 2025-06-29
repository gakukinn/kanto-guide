// 测试优先级重复检查系统
async function testPriorityDuplicateCheck() {
  console.log('🎯 测试优先级重复检查系统...\n');

  // 测试数据1: 电话号码相同（优先级1）
  const testData1 = {
    textData: {
      name: "测试活动A",
      address: "〒100-0001 东京都千代田区千代田1-1",
      period: "2025年7月15日",
      venue: "测试会场A",
      access: "JR东京站",
      organizer: "测试主办方A",
      price: "免费",
      contact: "03-1234-5678", // 🔥 相同电话
      website: "http://test-a.com"
    },
    mapData: {
      coordinates: "35.6762, 139.6503",
      mapEmbedUrl: "https://maps.google.com/maps?q=35.6762,139.6503&z=15&output=embed",
      region: "tokyo"
    },
    action: "check"
  };

  // 测试数据2: 官网相同（优先级2）
  const testData2 = {
    textData: {
      name: "测试活动B",
      address: "〒200-0001 东京都立川市曙町1-1",
      period: "2025年8月20日",
      venue: "测试会场B",
      access: "JR立川站",
      organizer: "测试主办方B",
      price: "1000円",
      contact: "042-9999-8888",
      website: "http://www.tateyama.co.jp/" // 🔥 相同官网（与雪の大谷数据相同）
    },
    mapData: {
      coordinates: "35.6985, 139.4134",
      mapEmbedUrl: "https://maps.google.com/maps?q=35.6985,139.4134&z=15&output=embed",
      region: "tokyo"
    },
    action: "check"
  };

  // 测试数据3: 地址相同（优先级3）
  const testData3 = {
    textData: {
      name: "测试活动C",
      address: "〒930-1414 富山県立山町室堂", // 🔥 相同地址（与雪の大谷数据相同）
      period: "2025年9月10日",
      venue: "测试会场C",
      access: "立山駅からバス",
      organizer: "测试主办方C",
      price: "免费",
      contact: "076-9999-1111",
      website: "http://test-c.com"
    },
    mapData: {
      coordinates: "36.5705, 137.6147",
      mapEmbedUrl: "https://maps.google.com/maps?q=36.5705,137.6147&z=15&output=embed",
      region: "koshinetsu"
    },
    action: "check"
  };

  const testCases = [
    { data: testData1, name: "电话号码相同测试" },
    { data: testData2, name: "官网相同测试" },
    { data: testData3, name: "地址相同测试" }
  ];

  for (const testCase of testCases) {
    console.log(`\n🧪 ${testCase.name}:`);
    console.log('发送数据:', {
      name: testCase.data.textData.name,
      contact: testCase.data.textData.contact,
      website: testCase.data.textData.website,
      address: testCase.data.textData.address
    });

    try {
      const response = await fetch('http://localhost:3000/api/auto-import-database', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testCase.data)
      });

      const result = await response.json();
      
      if (result.success && result.duplicates) {
        console.log(`✅ 检测到 ${result.duplicates.length} 个重复数据:`);
        result.duplicates.forEach((dup, index) => {
          console.log(`  重复${index + 1}:`);
          console.log(`    优先级: ${dup.priority} (${dup.matchReason})`);
          console.log(`    活动名称: ${dup.name}`);
          console.log(`    相似度: 名称${dup.similarity.name}% 地址${dup.similarity.address}% 日期${dup.similarity.date}% 电话${dup.similarity.contact}% 官网${dup.similarity.website}%`);
        });
      } else if (result.success && !result.duplicates) {
        console.log('❌ 未检测到重复数据');
      } else {
        console.log('❌ 检测失败:', result.error);
      }
    } catch (error) {
      console.log('❌ 请求失败:', error.message);
    }
  }
}

// 运行测试
testPriorityDuplicateCheck().catch(console.error); 