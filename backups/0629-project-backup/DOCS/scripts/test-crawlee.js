const http = require('http');

async function testCrawleeAPI() {
  const urls = [
    'https://www.jalan.net/event/evt_343809/?screenId=OUW1702', // 葛飾納涼花火大会
    'https://www.jalan.net/event/evt_343864/?screenId=OUW1702'  // 新橋こいち祭
  ];
  
  console.log('🚀 测试Crawlee API');
  console.log('='.repeat(60));
  
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const encodedUrl = encodeURIComponent(url);
    const apiUrl = `http://localhost:3000/api/auto-import-crawlee/?url=${encodedUrl}`;
    
    console.log(`\n📍 测试网址 ${i + 1}: ${url}`);
    console.log('-'.repeat(60));
    
    try {
      await new Promise((resolve, reject) => {
        const startTime = Date.now();
        
        http.get(apiUrl, (res) => {
          let data = '';
          
          res.on('data', (chunk) => {
            data += chunk;
          });
          
          res.on('end', () => {
            try {
              const result = JSON.parse(data);
              const endTime = Date.now();
              const duration = endTime - startTime;
              
              console.log(`⏱️  处理时间: ${duration}ms`);
              console.log(`✅ 成功: ${result.success}`);
              
              if (result.success) {
                console.log('📊 提取结果:');
                console.log(`   名称: ${result.parsed.name || '❌ 未提取'}`);
                console.log(`   地址: ${result.parsed.address || '❌ 未提取'}`);
                console.log(`   期间: ${result.parsed.period || '❌ 未提取'}`);
                console.log(`   场所: ${result.parsed.venue || '❌ 未提取'}`);
                console.log(`   交通: ${result.parsed.access ? '✅ 已提取' : '❌ 未提取'}`);
                console.log(`   主办: ${result.parsed.organizer || '❌ 未提取'}`);
                console.log(`   价格: ${result.parsed.price || '❌ 未提取'}`);
                console.log(`   联系: ${result.parsed.contact || '❌ 未提取'}`);
                console.log(`   网站: ${result.parsed.website || '❌ 未提取'}`);
                console.log(`   坐标: ${result.parsed.coordinates || '❌ 未提取'}`);
                
                // 统计成功率
                const fields = ['name', 'address', 'period', 'venue', 'access', 'organizer', 'price', 'contact', 'website'];
                const successCount = fields.filter(field => result.parsed[field] && result.parsed[field].trim()).length;
                console.log(`📈 成功率: ${successCount}/9 (${Math.round(successCount/9*100)}%)`);
              } else {
                console.log(`❌ 错误: ${result.error}`);
                if (result.details) {
                  console.log(`   详情: ${result.details}`);
                }
              }
              
              resolve();
            } catch (parseError) {
              console.log('❌ JSON解析错误:', parseError.message);
              console.log('原始响应:', data.substring(0, 200) + '...');
              resolve();
            }
          });
        }).on('error', (err) => {
          console.log('❌ 网络错误:', err.message);
          resolve();
        });
      });
      
    } catch (error) {
      console.log('❌ 测试错误:', error.message);
    }
    
    // 两个请求之间稍作停顿
    if (i < urls.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  console.log('\n🎯 Crawlee API测试完成');
}

testCrawleeAPI().catch(console.error); 