// 模拟用户在页面上的完整操作流程
async function simulateUserInput() {
  console.log('🎭 模拟用户输入流程...\n');

  // 1. 模拟文本识别
  console.log('步骤1: 文本识别九项信息');
  const textInput = `名称  市川三郷町ふるさと夏祭典　「神明の花火大会」（いちかわみさとちょうふるさとなつ祭典　しんめいのはなびたいかい）
所在地  〒409-3606　山梨県西八代郡市川三郷町高田682
開催期間        2025年8月7日　19:15～21:00　※雨天決行、荒天時は8日または9日に順延
開催場所        山梨県市川三郷町　三郡橋下笛吹川河畔
交通アクセス    JR身延線「市川大門駅」から徒歩15分
主催    市川三郷町ふるさと夏祭典実行委員会
問合せ先        市川三郷町商工会　055-272-3231
ホームページ    http://www.town.ichikawamisato.yamanashi.jp/shinmei/`;

  const textResponse = await fetch('http://localhost:3000/api/auto-import-text', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: textInput })
  });

  const textResult = await textResponse.json();
  console.log('文本识别结果:', textResult.success ? '✅ 成功' : '❌ 失败');
  
  if (!textResult.success) {
    console.log('文本识别失败，停止测试');
    return;
  }

  // 2. 模拟地图识别（使用一个简单的坐标）
  console.log('\n步骤2: 地图坐标识别');
  const mapResult = {
    success: true,
    coordinates: { lat: 35.56107, lng: 138.48328 },
    mapEmbedUrl: 'https://maps.google.com/maps?q=35.56107,138.48328&z=15&output=embed',
    coordsSource: 'Google Maps link',
    region: 'koshinetsu'
  };
  console.log('地图识别结果: ✅ 成功');

  // 3. 模拟数据库录入（检查重复）
  console.log('\n步骤3: 检查重复数据');
  const checkResponse = await fetch('http://localhost:3000/api/auto-import-database', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      textData: textResult,
      mapData: mapResult,
      action: 'check'
    })
  });

  const checkResult = await checkResponse.json();
  console.log('重复检查结果:', JSON.stringify(checkResult, null, 2));

  if (checkResult.hasDuplicates) {
    console.log('\n🎯 发现重复数据！这时应该显示对话框');
    console.log('重复数据数量:', checkResult.duplicates.length);
    checkResult.duplicates.forEach((dup, index) => {
      console.log(`重复数据 ${index + 1}: ${dup.name} (相似度: 名称${dup.similarity.name}%, 地址${dup.similarity.address}%, 日期${dup.similarity.date}%)`);
    });

    // 4. 模拟用户选择覆盖
    console.log('\n步骤4: 模拟用户选择覆盖数据');
    const overwriteResponse = await fetch('http://localhost:3000/api/auto-import-database', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        textData: textResult,
        mapData: mapResult,
        action: 'overwrite'
      })
    });

    const overwriteResult = await overwriteResponse.json();
    console.log('覆盖结果:', overwriteResult.success ? '✅ 成功' : '❌ 失败');
    console.log('覆盖详情:', JSON.stringify(overwriteResult, null, 2));
  } else {
    console.log('\n📝 没有发现重复数据，直接录入');
    console.log('录入结果:', checkResult.success ? '✅ 成功' : '❌ 失败');
  }
}

simulateUserInput().catch(console.error); 