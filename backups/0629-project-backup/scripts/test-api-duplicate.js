// 测试API重复检查功能
const testData = {
  textData: {
    name: "雪の大谷ウォーク",
    address: "〒930-1414 富山県立山町室堂",
    period: "2025年4月15日～11月30日",
    venue: "富山県立山町室堂",
    access: "立山駅からバス",
    organizer: "立山黒部貫光",
    price: "無料",
    contact: "076-481-1500",
    website: "http://www.tateyama.co.jp/"
  },
  mapData: {
    coordinates: "36.5705, 137.6147",
    mapEmbedUrl: "https://maps.google.com/maps?q=36.5705,137.6147&z=15&output=embed",
    region: "koshinetsu"
  },
  action: "check"
};

async function testApiDuplicateCheck() {
  try {
    console.log('🧪 测试API重复检查功能...\n');
    console.log('发送的测试数据:');
    console.log(JSON.stringify(testData, null, 2));
    
    const response = await fetch('http://localhost:3000/api/auto-import-database', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });
    
    const result = await response.json();
    
    console.log('\n🔍 API响应结果:');
    console.log('状态码:', response.status);
    console.log('响应内容:', JSON.stringify(result, null, 2));
    
    if (result.hasDuplicates) {
      console.log('\n✅ 重复检查成功！发现重复数据:');
      result.duplicates.forEach((dup, index) => {
        console.log(`\n重复数据 ${index + 1}:`);
        console.log(`  名称: ${dup.name}`);
        console.log(`  地址: ${dup.address}`);
        console.log(`  相似度: 名称${dup.similarity.name}%, 地址${dup.similarity.address}%, 日期${dup.similarity.date}%`);
      });
    } else {
      console.log('\n❌ 重复检查失败！没有检测到重复数据');
      console.log('可能的原因:');
      console.log('1. 相似度计算有问题');
      console.log('2. 数据库中没有匹配的数据');
      console.log('3. 阈值设置过高');
    }
    
  } catch (error) {
    console.error('❌ 测试失败:', error.message);
  }
}

testApiDuplicateCheck(); 