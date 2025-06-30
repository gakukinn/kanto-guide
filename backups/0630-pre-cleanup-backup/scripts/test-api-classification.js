// 测试API分类功能
const http = require('http');

const testData = {
  textData: {
    name: '葛飾納涼花火大会（かつしかのうりょうはなびたいかい）',
    address: '〒125-0000 東京都葛飾区',
    period: '2025年7月26日',
    venue: '葛飾区',
    access: '京成線',
    organizer: '葛飾区',
    price: '無料',
    contact: '03-1234-5678',
    website: 'https://example.com'
  },
  mapData: {
    mapEmbedUrl: 'https://maps.google.com/embed?...',
    coordinates: { lat: 35.7, lng: 139.8 },
    region: 'tokyo'
  },
  action: 'check'
};

async function testApiClassification() {
  try {
    console.log('=== 测试API分类功能 ===\n');
    console.log('发送测试数据:', JSON.stringify(testData, null, 2));
    
    const postData = JSON.stringify(testData);
    
    const options = {
      hostname: 'localhost',
      port: 3006,
      path: '/api/auto-import-database',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };
    
    const req = http.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          
          console.log('\n=== API响应结果 ===');
          console.log('状态码:', res.statusCode);
          console.log('响应数据:', JSON.stringify(result, null, 2));
          
          if (result.classification) {
            console.log('\n=== 分类结果 ===');
            console.log('活动类型:', result.classification.type);
            console.log('类型名称:', result.classification.typeName);
            console.log('置信度:', result.classification.confidence);
          }
        } catch (error) {
          console.error('解析响应失败:', error.message);
          console.log('原始响应:', data);
        }
      });
    });
    
    req.on('error', (error) => {
      console.error('请求失败:', error.message);
    });
    
    req.write(postData);
    req.end();
    
  } catch (error) {
    console.error('测试失败:', error.message);
  }
}

testApiClassification(); 