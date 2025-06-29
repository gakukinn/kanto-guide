// 简单的优先级重复检查测试
async function simplePriorityTest() {
  console.log('🎯 简单优先级测试...\n');

  // 测试数据：市川三郷町花火大会
  const testData = {
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

  console.log('📝 测试数据:');
  console.log('  名称:', testData.textData.name);
  console.log('  电话:', testData.textData.contact);
  console.log('  官网:', testData.textData.website);
  console.log('  地址:', testData.textData.address);
  console.log('');

  try {
    console.log('🔍 发送重复检查请求...');
    const response = await fetch('http://localhost:3000/api/auto-import-database', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testData)
    });

    const result = await response.json();
    console.log('📨 API响应:', result.success ? '成功' : '失败');
    
    if (result.success && result.duplicates) {
      console.log(`\n⚠️  检测到 ${result.duplicates.length} 个重复数据:`);
      result.duplicates.forEach((dup, index) => {
        console.log(`\n  重复数据 ${index + 1}:`);
        console.log(`    活动名称: ${dup.name}`);
        console.log(`    优先级: ${dup.priority} (${dup.matchReason})`);
        console.log(`    相似度详情:`);
        console.log(`      - 名称: ${dup.similarity.name}%`);
        console.log(`      - 地址: ${dup.similarity.address}%`);
        console.log(`      - 日期: ${dup.similarity.date}%`);
        console.log(`      - 电话: ${dup.similarity.contact}%`);
        console.log(`      - 官网: ${dup.similarity.website}%`);
      });
    } else if (result.success && !result.duplicates) {
      console.log('\n✅ 无重复数据，可以录入');
      
      // 如果没有重复，尝试录入
      console.log('\n📝 尝试录入数据...');
      const createData = { ...testData, action: "create" };
      const createResponse = await fetch('http://localhost:3000/api/auto-import-database', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(createData)
      });
      
      const createResult = await createResponse.json();
      if (createResult.success) {
        console.log(`✅ 录入成功！活动ID: ${createResult.eventId}`);
      } else {
        console.log('❌ 录入失败:', createResult.error);
      }
    } else {
      console.log('\n❌ 检测失败:', result.error);
    }
  } catch (error) {
    console.log('\n❌ 请求失败:', error.message);
  }
}

// 运行测试
simplePriorityTest().catch(console.error); 