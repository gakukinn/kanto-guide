// 通过页面生成器API测试相似度检测功能
const fetch = require('node-fetch');

async function testPageGeneratorSimilarity() {
  console.log('🧪 测试页面生成器相似度检测功能\n');
  
  // 测试数据：与现有活动高度相似的新活动
  const testActivity = {
    name: "葛飾納涼花火大会", // 与现有活动几乎相同
    period: "2025年7月22日",
    address: "東京都葛飾区柴又7-17-13",
    venue: "柴又野球場",
    region: "tokyo",
    activityType: "hanabi",
    organizer: "葛飾区観光協会",
    price: "有料観覧席あり",
    contact: "03-6758-2222",
    website: "https://www.city.katsushika.lg.jp/",
    description: "葛飾の夏の風物詩、花火大会です。",
    access: "京成金町線「柴又駅」から徒歩10分"
  };
  
  try {
    console.log('📤 发送请求到页面生成器...');
    console.log(`   活动名称: ${testActivity.name}`);
    console.log(`   地区: ${testActivity.region}`);
    console.log(`   类型: ${testActivity.activityType}\n`);
    
    const response = await fetch('http://localhost:3000/api/activity-page-generator', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        activityType: testActivity.activityType,
        forceOverwrite: false,
        recognitionData: {
          textResult: testActivity,
          contentResult: testActivity.description,
          mapResult: null
        }
      })
    });
    
    const result = await response.json();
    
    console.log('📥 API响应:');
    console.log(`   状态: ${response.status}`);
    console.log(`   成功: ${result.success}`);
    console.log(`   冲突: ${result.isConflict || false}\n`);
    
    if (result.isConflict) {
      console.log('🎯 检测到冲突 - 相似度检测正常工作!');
      console.log(`   消息: ${result.message}`);
      
      if (result.data && result.data.similarActivities) {
        console.log(`\n📊 找到 ${result.data.similarActivities.length} 个相似活动:`);
        
        result.data.similarActivities.forEach((similar, index) => {
          console.log(`\n   相似活动 #${index + 1}:`);
          console.log(`      名称: ${similar.activity.name}`);
          console.log(`      相似度: ${(similar.similarity * 100).toFixed(1)}%`);
          console.log(`      ID: ${similar.activity.id}`);
          console.log(`      URL: ${similar.url}`);
          console.log(`      详细分析:`);
          console.log(`         名称相似度: ${(similar.similarityDetails.name * 100).toFixed(1)}%`);
          console.log(`         日期匹配: ${similar.similarityDetails.date ? '✅' : '❌'}`);
          console.log(`         地址相似: ${similar.similarityDetails.address ? '✅' : '❌'}`);
        });
        
        console.log('\n✅ 相似度检测功能正常工作！');
        console.log('💡 现在你可以在页面生成器中看到冲突解决界面了。');
      }
    } else if (result.success) {
      console.log('⚠️  没有检测到冲突，页面直接生成了');
      console.log('   这可能意味着相似度阈值太高或算法需要调整');
    } else {
      console.log('❌ 生成失败:');
      console.log(`   错误: ${result.error || result.message}`);
    }
    
  } catch (error) {
    console.error('❌ 测试失败:', error.message);
    console.log('\n💡 确保开发服务器在 localhost:3000 运行');
  }
}

testPageGeneratorSimilarity(); 