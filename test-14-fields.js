// 测试14项字段识别功能
const testText = `大会名	横浜ナイトフラワーズ2025
打ち上げ数	約2000発
打ち上げ時間	約10分間
例年の人出	約1万人
開催期間	2025年4月26日（土）～2026年3月28日（土）
開催時間	20:30～20:40
荒天の場合	荒天中止
有料席	なし
屋台など	なし
その他・全体備考	詳細はホームページにて確認
会場	横浜港臨海部
会場アクセス	みなとみらい線みなとみらい駅から徒歩5分
駐車場	なし
問い合わせ２	045-663-7267 横浜ナイトフラワーズ実行委員会運営事務局`;

async function test14Fields() {
  console.log('🧪 测试14项字段识别功能');
  console.log('===========================\\n');
  
  console.log('📝 测试文本:');
  console.log(testText);
  console.log('\\n----------------------------\\n');
  
  try {
    const response = await fetch('http://localhost:3001/api/walkerplus-text-parser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: testText }),
    });

    if (!response.ok) {
      throw new Error(`API响应错误: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    
    console.log('✅ 解析成功！');
    console.log('\\n📊 14项字段识别结果:');
    console.log('========================\\n');
    
    // 显示所有14项字段
    result.walkerFields.forEach((field, index) => {
      const fieldNumber = (index + 1).toString().padStart(2, '0');
      const isContactField = field.label === '問い合わせ';
      const emoji = isContactField ? '📞' : '📝';
      const status = field.value !== '详见官网' ? '✅' : '❌';
      
      console.log(`${fieldNumber}. ${emoji} ${field.label}: ${field.value} ${status}`);
    });
    
    console.log('\\n🎯 重点检查第14项 - 問い合わせ:');
    console.log('================================');
    const contactField = result.walkerFields.find(f => f.label === '問い合わせ');
    if (contactField) {
      console.log(`📞 問い合わせ: ${contactField.value}`);
      if (contactField.value.includes('045-663-7267')) {
        console.log('✅ 成功识别电话号码');
      }
      if (contactField.value.includes('横浜ナイトフラワーズ実行委員会運営事務局')) {
        console.log('✅ 成功识别联系机构');
      }
    }
    
    console.log('\\n📈 统计信息:');
    console.log('=============');
    const successCount = result.walkerFields.filter(f => f.value !== '详见官网').length;
    const totalCount = result.walkerFields.length;
    const successRate = Math.round((successCount / totalCount) * 100);
    
    console.log(`成功识别: ${successCount}/${totalCount} 项 (${successRate}%)`);
    console.log(`总字段数: ${totalCount} 项 (包含新增的問い合わせ字段)`);
    
    // 验证原始数据结构
    console.log('\\n🔍 原始数据验证:');
    console.log('================');
    console.log(`contactInfo字段: ${result.rawData.contactInfo || '未设置'}`);
    
  } catch (error) {
    console.error('❌ 测试失败:', error.message);
  }
}

// 运行测试
test14Fields(); 