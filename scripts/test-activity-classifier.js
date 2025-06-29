// 测试活动分类识别功能
async function testActivityClassifier() {
  console.log('🎯 测试活动分类识别功能...\\n');

  // 测试数据1: 花火大会
  const testData1 = {
    textData: {
      name: "市川三郷町ふるさと夏まつり「神明の花火大会」",
      address: "〒409-3606 山梨県市川三郷町高田682",
      period: "2025年8月7日 19:15～21:00",
      venue: "山梨県市川三郷町 三郡橋下流笛吹川河畔",
      access: "JR身延線「市川大門駅」から徒歩10分",
      organizer: "市川三郷町ふるさと夏まつり実行委員会",
      price: "有料観覧席あり",
      contact: "055-272-1101",
      website: "http://www.town.ichikawamisato.yamanashi.jp/shinmei/"
    },
    mapData: {
      coordinates: "35.6762, 138.6503",
      mapEmbedUrl: "https://maps.google.com/maps?q=35.6762,138.6503&z=15&output=embed",
      region: "koshinetsu"
    },
    action: "check"
  };

  // 测试数据2: 传统祭典
  const testData2 = {
    textData: {
      name: "本庄祇園祭",
      address: "〒367-0051 埼玉県本庄市本庄1-1",
      period: "2025年7月14日～15日",
      venue: "埼玉県本庄市 本庄駅周辺",
      access: "JR高崎線「本庄駅」から徒歩5分",
      organizer: "本庄祇園祭実行委員会",
      price: "無料",
      contact: "0495-25-1111",
      website: "http://www.honjo-matsuri.jp/"
    },
    mapData: {
      coordinates: "36.2449, 139.1906",
      mapEmbedUrl: "https://maps.google.com/maps?q=36.2449,139.1906&z=15&output=embed",
      region: "saitama"
    },
    action: "check"
  };

  // 测试数据3: 花见会
  const testData3 = {
    textData: {
      name: "上野恩賜公園桜まつり",
      address: "〒110-0007 東京都台東区上野公園",
      period: "2025年3月下旬～4月上旬",
      venue: "東京都台東区 上野恩賜公園",
      access: "JR「上野駅」から徒歩2分",
      organizer: "上野観光連盟",
      price: "無料",
      contact: "03-3833-0030",
      website: "http://www.ueno.or.jp/"
    },
    mapData: {
      coordinates: "35.7148, 139.7737",
      mapEmbedUrl: "https://maps.google.com/maps?q=35.7148,139.7737&z=15&output=embed",
      region: "tokyo"
    },
    action: "check"
  };

  const testCases = [
    { name: "花火大会", data: testData1, expected: "hanabi" },
    { name: "传统祭典", data: testData2, expected: "matsuri" },
    { name: "花见会", data: testData3, expected: "hanami" }
  ];

  for (const testCase of testCases) {
    console.log(`📝 测试 ${testCase.name}:`);
    console.log(`  活动名称: ${testCase.data.textData.name}`);
    
    try {
      const response = await fetch('http://localhost:3004/api/auto-import-database', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testCase.data)
      });

      const result = await response.json();
      
      if (result.success === false && result.classification) {
        const classification = result.classification;
        console.log(`  ✅ 分类识别成功:`);
        console.log(`    类型: ${classification.type} (${classification.typeName})`);
        console.log(`    置信度: ${classification.confidence}%`);
        console.log(`    预期类型: ${testCase.expected}`);
        console.log(`    匹配结果: ${classification.type === testCase.expected ? '✅ 正确' : '❌ 错误'}`);
      } else if (result.success === true && result.classification) {
        const classification = result.classification;
        console.log(`  ✅ 分类识别并录入成功:`);
        console.log(`    类型: ${result.activityType} (${result.activityTypeName})`);
        console.log(`    置信度: ${classification.confidence}%`);
        console.log(`    预期类型: ${testCase.expected}`);
        console.log(`    匹配结果: ${result.activityType === testCase.expected ? '✅ 正确' : '❌ 错误'}`);
        console.log(`    录入消息: ${result.message}`);
      } else {
        console.log(`  ❌ 分类识别失败:`, result);
      }
      
    } catch (error) {
      console.log(`  ❌ 请求失败:`, error.message);
    }
    
    console.log('');
  }

  console.log('🏁 活动分类识别测试完成!');
}

// 运行测试
testActivityClassifier().catch(console.error); 