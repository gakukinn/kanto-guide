/**
 * 测试手动录入API功能
 * 模拟前端发送手动输入的数据到API
 */

const testData = {
  name: '熊谷うちわ祭',
  address: '埼玉県熊谷市',
  period: '2025年7月20日（日）～22日（火）',
  venue: '熊谷市内各所',
  access: 'JR熊谷駅から徒歩5分',
  organizer: '熊谷うちわ祭実行委員会',
  price: '無料',
  contact: '048-594-6677',
  website: 'https://www.uchiwamatsuri.com/',
  googleMaps: 'https://maps.google.com/...'
};

async function testManualImport() {
  try {
    console.log('🧪 测试手动录入API...\n');
    console.log('测试数据:', testData);
    
    const response = await fetch('http://localhost:3000/api/auto-import-hanami', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        manualData: testData,
        action: 'create'
      })
    });
    
    const result = await response.json();
    
    if (response.ok) {
      console.log('\n✅ 测试成功!');
      console.log('操作类型:', result.operationType);
      console.log('记录ID:', result.data?.id);
      console.log('消息:', result.message);
    } else {
      console.log('\n❌ 测试失败!');
      console.log('错误:', result.error);
    }
    
  } catch (error) {
    console.error('\n💥 测试异常:', error.message);
  }
}

// 运行测试
testManualImport(); 