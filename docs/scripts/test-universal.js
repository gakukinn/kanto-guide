const http = require('http');

async function testUniversalExtraction() {
  const urls = [
    'https://www.jalan.net/event/evt_343809/?screenId=OUW1702', // 葛飾納涼花火大会
    'https://www.jalan.net/event/evt_343864/?screenId=OUW1702'  // 新橋こいち祭
  ];
  
  console.log('🔍 测试通用提取系统');
  console.log('='.repeat(60));
  
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const encodedUrl = encodeURIComponent(url);
    const apiUrl = `http://localhost:3000/api/auto-import-hanami/?url=${encodedUrl}`;
    
    console.log(`\n📍 测试网址 ${i + 1}: ${url}`);
    console.log('-'.repeat(60));
    
    try {
      await new Promise((resolve, reject) => {
        http.get(apiUrl, (res) => {
          let data = '';
          
          res.on('data', (chunk) => {
            data += chunk;
          });
          
          res.on('end', () => {
            try {
              const result = JSON.parse(data);
              
              if (result.error) {
                console.log('❌ 错误:', result.error);
                resolve();
                return;
              }
              
              console.log('✅ 提取结果:');
              console.log('名称:', result.parsed.name || '❌ 未提取到');
              console.log('地址:', result.parsed.address || '❌ 未提取到');
              console.log('期间:', result.parsed.period || '❌ 未提取到');
              console.log('场所:', result.parsed.venue || '❌ 未提取到');
              console.log('交通:', result.parsed.access || '❌ 未提取到');
              console.log('主催:', result.parsed.organizer || '❌ 未提取到');
              console.log('料金:', result.parsed.price || '❌ 未提取到');
              console.log('联系:', result.parsed.contact || '❌ 未提取到');
              console.log('网站:', result.parsed.website || '❌ 未提取到');
              console.log('坐标:', result.parsed.coordinates ? 
                `${result.parsed.coordinates.lat}, ${result.parsed.coordinates.lng}` : 
                '❌ 未提取到');
              
              // 统计成功率
              const fields = [
                result.parsed.name,
                result.parsed.address,
                result.parsed.period,
                result.parsed.venue,
                result.parsed.access,
                result.parsed.organizer,
                result.parsed.price,
                result.parsed.contact,
                result.parsed.website,
                result.parsed.coordinates
              ];
              
              const successCount = fields.filter(field => field && field !== '').length;
              const successRate = (successCount / 10 * 100).toFixed(1);
              
              console.log(`\n📊 成功率: ${successCount}/10 (${successRate}%)`);
              
              resolve();
            } catch (parseError) {
              console.log('❌ JSON解析错误:', parseError.message);
              resolve();
            }
          });
        }).on('error', (err) => {
          console.log('❌ 请求错误:', err.message);
          resolve();
        });
      });
      
      // 等待一下再测试下一个
      if (i < urls.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      
    } catch (error) {
      console.log('❌ 测试错误:', error.message);
    }
  }
  
  console.log('\n🎯 测试完成');
}

testUniversalExtraction().catch(console.error); 