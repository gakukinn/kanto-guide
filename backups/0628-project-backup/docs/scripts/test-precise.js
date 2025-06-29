const http = require('http');

async function testPreciseAPI() {
  const urls = [
    'https://www.jalan.net/event/evt_343809/?screenId=OUW1702', // 葛飾納涼花火大会
    'https://www.jalan.net/event/evt_343864/?screenId=OUW1702'  // 新橋こいち祭
  ];
  
  console.log('🎯 测试精确版API - 专注核心商业信息');
  console.log('='.repeat(70));
  
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const encodedUrl = encodeURIComponent(url);
    const apiUrl = `http://localhost:3000/api/auto-import-precise/?url=${encodedUrl}`;
    
    console.log(`\n📍 测试网址 ${i + 1}: ${url}`);
    console.log('-'.repeat(70));
    
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
                console.log('\n🏢 核心商业信息验证:');
                
                // 核心信息验证
                const coreFields = {
                  '📅 日期': result.parsed.period,
                  '📍 地址': result.parsed.address,
                  '🌐 官网': result.parsed.website
                };
                
                console.log('━'.repeat(50));
                Object.entries(coreFields).forEach(([label, value]) => {
                  const status = value && value.trim() ? '✅' : '❌';
                  console.log(`${status} ${label}: ${value || '未提取'}`);
                });
                console.log('━'.repeat(50));
                
                // 其他信息
                console.log('\n📊 其他信息:');
                console.log(`   名称: ${result.parsed.name || '❌ 未提取'}`);
                console.log(`   场所: ${result.parsed.venue || '❌ 未提取'}`);
                console.log(`   交通: ${result.parsed.access ? '✅ 已提取' : '❌ 未提取'}`);
                console.log(`   主办: ${result.parsed.organizer || '❌ 未提取'}`);
                console.log(`   价格: ${result.parsed.price || '❌ 未提取'}`);
                console.log(`   联系: ${result.parsed.contact || '❌ 未提取'}`);
                console.log(`   坐标: ${result.parsed.coordinates ? '✅ 已提取' : '❌ 未提取'}`);
                
                // 核心信息质量评估
                const coreSuccess = Object.values(coreFields).filter(v => v && v.trim()).length;
                const coreScore = Math.round(coreSuccess / 3 * 100);
                
                // 总体成功率
                const allFields = ['name', 'address', 'period', 'venue', 'access', 'organizer', 'price', 'contact', 'website'];
                const totalSuccess = allFields.filter(field => result.parsed[field] && result.parsed[field].trim()).length;
                const totalScore = Math.round(totalSuccess / 9 * 100);
                
                console.log(`\n📈 核心商业信息完整度: ${coreSuccess}/3 (${coreScore}%)`);
                console.log(`📈 总体信息完整度: ${totalSuccess}/9 (${totalScore}%)`);
                
                // 质量检查
                console.log('\n🔍 质量检查:');
                if (result.parsed.address) {
                  const addressQuality = checkAddressQuality(result.parsed.address);
                  console.log(`   地址质量: ${addressQuality.score}/5 ${addressQuality.issues.length > 0 ? '⚠️ ' + addressQuality.issues.join(', ') : '✅'}`);
                }
                
                if (result.parsed.period) {
                  const dateQuality = checkDateQuality(result.parsed.period);
                  console.log(`   日期质量: ${dateQuality.score}/5 ${dateQuality.issues.length > 0 ? '⚠️ ' + dateQuality.issues.join(', ') : '✅'}`);
                }
                
                if (result.parsed.website) {
                  const websiteQuality = checkWebsiteQuality(result.parsed.website);
                  console.log(`   官网质量: ${websiteQuality.score}/5 ${websiteQuality.issues.length > 0 ? '⚠️ ' + websiteQuality.issues.join(', ') : '✅'}`);
                }
                
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
  
  console.log('\n🎯 精确版API测试完成');
}

// 地址质量检查
function checkAddressQuality(address) {
  const issues = [];
  let score = 5;
  
  if (address.includes('MAP') || address.includes('観光') || address.includes('印刷')) {
    issues.push('包含地图文本');
    score -= 2;
  }
  
  if (address.includes('Move') || address.includes('Zoom') || address.includes('Click')) {
    issues.push('包含控制文本');
    score -= 3;
  }
  
  if (!address.includes('〒')) {
    issues.push('缺少邮编');
    score -= 1;
  }
  
  if (!address.includes('都') && !address.includes('府') && !address.includes('県')) {
    issues.push('缺少都道府县');
    score -= 1;
  }
  
  return { score: Math.max(0, score), issues };
}

// 日期质量检查
function checkDateQuality(period) {
  const issues = [];
  let score = 5;
  
  if (!period.includes('2025年')) {
    issues.push('缺少年份');
    score -= 1;
  }
  
  if (!period.includes('月') || !period.includes('日')) {
    issues.push('日期格式不完整');
    score -= 2;
  }
  
  if (period.includes('\t') || period.includes('\n')) {
    issues.push('包含格式字符');
    score -= 1;
  }
  
  return { score: Math.max(0, score), issues };
}

// 官网质量检查
function checkWebsiteQuality(website) {
  const issues = [];
  let score = 5;
  
  if (!website.startsWith('http')) {
    issues.push('非HTTP链接');
    score -= 2;
  }
  
  if (website.includes('jalan.net')) {
    issues.push('是Jalan网站');
    score -= 3;
  }
  
  if (website.includes('recruit.co.jp')) {
    issues.push('非官方网站');
    score -= 2;
  }
  
  if (website.includes('.lg.jp') || website.includes('.go.jp') || website.includes('.city.')) {
    // 政府官方网站加分
    score = Math.min(5, score + 1);
  }
  
  return { score: Math.max(0, score), issues };
}

testPreciseAPI().catch(console.error); 