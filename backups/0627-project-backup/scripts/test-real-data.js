// 使用真实花火大会数据测试优先级重复检查系统
async function testRealData() {
  console.log('🎯 使用真实数据测试优先级重复检查系统...\n');

  // 测试数据1: 市川三郷町花火大会
  const testData1 = {
    textData: {
      name: "市川三郷町ふるさと夏まつり「神明の花火大会」",
      address: "〒409-3606 山梨県市川三郷町高田682",
      period: "2025年8月7日 19:15～21:00",
      venue: "山梨県市川三郷町 三郡橋下流笛吹川河畔",
      access: "JR身延線「市川大門駅」から徒歩10分",
      organizer: "市川三郷町ふるさと夏まつり実行委員会",
      price: "有料観覧席あり/ダイナミックVIP席10万円、ダイナミックリクライニング席2万円、通常席4000円～",
      contact: "055-272-1101", // 🔥 电话号码
      website: "http://www.town.ichikawamisato.yamanashi.jp/shinmei/" // 🔥 官网
    },
    mapData: {
      coordinates: "35.6762, 138.6503",
      mapEmbedUrl: "https://maps.google.com/maps?q=35.6762,138.6503&z=15&output=embed",
      region: "koshinetsu"
    },
    action: "check"
  };

  // 测试数据2: 笛吹川县下纳凉花火大会
  const testData2 = {
    textData: {
      name: "山梨市制施行20周年記念事業 笛吹川県下納涼花火大会",
      address: "〒405-0018 山梨県山梨市上神内川",
      period: "2025年7月26日 19:30～21:00",
      venue: "山梨県山梨市 笛吹川万力大橋下流",
      access: "JR中央本線「山梨市駅」から徒歩3分",
      organizer: "笛吹川県下納涼花火大会山梨市実行委員会",
      price: "有料観覧席なし",
      contact: "0553-22-1111", // 🔥 电话号码
      website: "https://www.city.yamanashi.yamanashi.jp/soshiki/17/" // 🔥 官网
    },
    mapData: {
      coordinates: "35.6985, 138.7134",
      mapEmbedUrl: "https://maps.google.com/maps?q=35.6985,138.7134&z=15&output=embed",
      region: "koshinetsu"
    },
    action: "check"
  };

  const testCases = [
    { data: testData1, name: "市川三郷町花火大会" },
    { data: testData2, name: "笛吹川县下纳凉花火大会" }
  ];

  // 第一轮测试：检查重复（应该没有重复）
  console.log('=== 第一轮测试：检查是否有重复数据 ===');
  for (const testCase of testCases) {
    console.log(`\n🧪 测试: ${testCase.name}`);
    console.log('关键信息:', {
      name: testCase.data.textData.name.substring(0, 30) + '...',
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
        console.log(`⚠️  检测到 ${result.duplicates.length} 个重复数据:`);
        result.duplicates.forEach((dup, index) => {
          console.log(`  重复${index + 1}: ${dup.name}`);
          console.log(`    优先级: ${dup.priority} (${dup.matchReason})`);
          console.log(`    相似度: 名称${dup.similarity.name}% 地址${dup.similarity.address}% 日期${dup.similarity.date}% 电话${dup.similarity.contact}% 官网${dup.similarity.website}%`);
        });
      } else if (result.success && !result.duplicates) {
        console.log('✅ 无重复数据，可以录入');
      } else {
        console.log('❌ 检测失败:', result.error);
      }
    } catch (error) {
      console.log('❌ 请求失败:', error.message);
    }
  }

  // 第二轮测试：录入数据
  console.log('\n=== 第二轮测试：录入数据到数据库 ===');
  for (const testCase of testCases) {
    console.log(`\n📝 录入: ${testCase.name}`);
    
    try {
      const createData = { ...testCase.data, action: "create" };
      const response = await fetch('http://localhost:3000/api/auto-import-database', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(createData)
      });

      const result = await response.json();
      
      if (result.success) {
        console.log(`✅ 录入成功，活动ID: ${result.eventId}`);
      } else {
        console.log('❌ 录入失败:', result.error);
      }
    } catch (error) {
      console.log('❌ 录入请求失败:', error.message);
    }
  }

  // 第三轮测试：再次检查重复（应该能检测到重复）
  console.log('\n=== 第三轮测试：重复数据检测验证 ===');
  
  // 创建一个与第一个花火大会相同电话的测试数据
  const duplicatePhoneTest = {
    textData: {
      name: "测试活动：相同电话号码",
      address: "〒100-0001 东京都测试区测试町1-1",
      period: "2025年9月15日",
      venue: "测试会场",
      access: "测试站",
      organizer: "测试主办方",
      price: "免费",
      contact: "055-272-1101", // 🔥 与市川三郷町相同的电话
      website: "http://test.com"
    },
    mapData: {
      coordinates: "35.6762, 139.6503",
      mapEmbedUrl: "https://maps.google.com/maps?q=35.6762,139.6503&z=15&output=embed",
      region: "tokyo"
    },
    action: "check"
  };

  console.log('\n🧪 测试相同电话号码检测:');
  console.log('测试电话:', duplicatePhoneTest.textData.contact);
  
  try {
    const response = await fetch('http://localhost:3000/api/auto-import-database', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(duplicatePhoneTest)
    });

    const result = await response.json();
    
    if (result.success && result.duplicates) {
      console.log(`🎉 成功检测到 ${result.duplicates.length} 个重复数据:`);
      result.duplicates.forEach((dup, index) => {
        console.log(`  重复${index + 1}: ${dup.name}`);
        console.log(`    优先级: ${dup.priority} (${dup.matchReason}) 🔥`);
        console.log(`    电话相似度: ${dup.similarity.contact}%`);
      });
    } else {
      console.log('❌ 未检测到重复数据（可能有问题）');
    }
  } catch (error) {
    console.log('❌ 测试失败:', error.message);
  }
}

// 运行测试
testRealData().catch(console.error); 