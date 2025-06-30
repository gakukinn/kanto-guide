// 测试手动选择地区和活动类型功能
async function testManualSelection() {
  console.log('🎯 测试手动选择功能...\n');

  // 测试数据：让AI误识别，然后手动修正
  const testData = {
    textData: {
      name: "东京红叶祭典", // 可能被误识别为祭典，实际应该是红叶狩
      address: "〒110-0007 東京都台東区上野公园",
      period: "2025年11月下旬～12月上旬",
      venue: "東京都台東区 上野恩賜公園",
      access: "JR「上野駅」から徒歩2分",
      organizer: "上野观光联盟",
      price: "無料",
      contact: "03-3833-0030",
      website: "http://www.ueno.or.jp/"
    },
    mapData: {
      coordinates: "35.7148, 139.7737",
      mapEmbedUrl: "https://maps.google.com/maps?q=35.7148,139.7737&z=15&output=embed",
      region: "saitama" // 故意错误的地区，实际应该是tokyo
    },
    action: "check"
  };

  console.log('📝 测试场景1: AI自动识别（可能有误）');
  console.log('  活动名称:', testData.textData.name);
  console.log('  AI识别地区:', testData.mapData.region, '(错误)');
  console.log('  预期活动类型: momiji (红叶狩)');
  console.log('  预期地区: tokyo (东京都)');
  
  try {
    const response1 = await fetch('http://localhost:3004/api/auto-import-database', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testData)
    });

    const result1 = await response1.json();
    
    if (result1.success === false && result1.classification) {
      console.log('\n🤖 AI自动识别结果:');
      console.log('  活动类型:', result1.classification.type, `(${result1.classification.typeName})`);
      console.log('  置信度:', result1.classification.confidence + '%');
      console.log('  地区:', testData.mapData.region);
    }
    
    console.log('\n📝 测试场景2: 手动修正识别错误');
    
    // 手动修正：活动类型改为红叶狩，地区改为东京都
    const correctedData = {
      ...testData,
      mapData: {
        ...testData.mapData,
        region: "tokyo" // 手动修正地区
      },
      manualActivityType: "momiji", // 手动选择活动类型
      action: "create" // 直接创建，不检查重复
    };
    
    console.log('  手动修正后:');
    console.log('    活动类型: momiji (红叶狩)');
    console.log('    地区: tokyo (东京都)');
    
    const response2 = await fetch('http://localhost:3004/api/auto-import-database', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(correctedData)
    });

    const result2 = await response2.json();
    
    if (result2.success) {
      console.log('\n✅ 手动修正录入成功:');
      console.log('  活动ID:', result2.eventId);
      console.log('  活动类型:', result2.activityType, `(${result2.activityTypeName})`);
      console.log('  置信度:', result2.classification?.confidence + '%');
      console.log('  识别原因:', result2.classification?.reason);
      console.log('  地区:', result2.data?.region);
      console.log('  录入消息:', result2.message);
      
      // 验证是否录入到正确的表
      if (result2.activityType === 'momiji') {
        console.log('  ✅ 成功录入到MomijiEvent表');
      } else {
        console.log('  ❌ 录入表类型错误');
      }
    } else {
      console.log('\n❌ 手动修正录入失败:', result2);
    }
    
  } catch (error) {
    console.log('❌ 请求失败:', error.message);
  }

  console.log('\n🏁 手动选择功能测试完成!');
}

// 运行测试
testManualSelection().catch(console.error); 