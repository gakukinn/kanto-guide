const http = require('http');

// 您提供的河口湖测试文本
const testText = `名称	河口湖ハーブフェスティバル（かわぐちこハーブフェスティバル）
所在地	〒401 - 0305　山梨県富士河口湖町大石2585

観光MAP
印刷用MAP
開催期間	2025年6月21日～7月21日　 9:00～17:00
開催場所	山梨県富士河口湖町　河口湖畔　大石公園
交通アクセス	富士急行「河口湖駅」から河口湖周遊バス約30分「河口湖自然生活館」下車
主催	河口湖ハーブフェスティバル実行委員会
料金	無料
問合せ先	河口湖ハーブフェスティバル実行委員会（富士河口湖町観光課内）　0555-72-3168
ホームページ	https://fujisan.ne.jp/pages/380/`;

async function testTextParsing() {
  console.log('🎯 测试文本解析API - 验证复制粘贴方式的精确性');
  console.log('='.repeat(80));
  
  const postData = JSON.stringify({ text: testText });
  
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/auto-import-text/',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };
  
  try {
    await new Promise((resolve, reject) => {
      const startTime = Date.now();
      
      const req = http.request(options, (res) => {
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
              // 期待的正确结果
              const expected = {
                name: '河口湖ハーブフェスティバル（かわぐちこハーブフェスティバル）',
                address: '〒401 - 0305　山梨県富士河口湖町大石2585',
                period: '2025年6月21日～7月21日　 9:00～17:00',
                venue: '山梨県富士河口湖町　河口湖畔　大石公園',
                access: '富士急行「河口湖駅」から河口湖周遊バス約30分「河口湖自然生活館」下車',
                organizer: '河口湖ハーブフェスティバル実行委員会',
                price: '無料',
                contact: '河口湖ハーブフェスティバル実行委員会（富士河口湖町観光課内）　0555-72-3168',
                website: 'https://fujisan.ne.jp/pages/380/'
              };
              
              console.log('\n🏢 核心商业信息验证:');
              console.log('━'.repeat(60));
              
              // 逐项对比
              const fields = [
                { key: 'name', label: '📝 名称' },
                { key: 'address', label: '📍 地址' },
                { key: 'period', label: '📅 日期' },
                { key: 'venue', label: '🏢 场所' },
                { key: 'access', label: '🚌 交通' },
                { key: 'organizer', label: '👥 主办' },
                { key: 'price', label: '💰 价格' },
                { key: 'contact', label: '📞 联系' },
                { key: 'website', label: '🌐 官网' }
              ];
              
              let correctCount = 0;
              
              fields.forEach(field => {
                const actual = result.parsed[field.key] || '';
                const expect = expected[field.key] || '';
                const isCorrect = actual === expect;
                
                if (isCorrect) correctCount++;
                
                const status = isCorrect ? '✅' : '❌';
                console.log(`${status} ${field.label}:`);
                console.log(`   期待: "${expect}"`);
                console.log(`   实际: "${actual}"`);
                
                if (!isCorrect) {
                  console.log(`   差异: ${getDifference(expect, actual)}`);
                }
                console.log('');
              });
              
              console.log('━'.repeat(60));
              const accuracy = Math.round(correctCount / fields.length * 100);
              console.log(`📈 总体准确率: ${correctCount}/${fields.length} (${accuracy}%)`);
              
              // 质量评估
              console.log('\n🔍 质量评估:');
              if (accuracy === 100) {
                console.log('🎉 完美！文本解析达到100%准确率');
              } else if (accuracy >= 90) {
                console.log('👍 优秀！准确率超过90%');
              } else if (accuracy >= 70) {
                console.log('⚠️  良好，但需要改进');
              } else {
                console.log('❌ 需要大幅改进');
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
      });
      
      req.on('error', (err) => {
        console.log('❌ 网络错误:', err.message);
        resolve();
      });
      
      req.write(postData);
      req.end();
    });
    
  } catch (error) {
    console.log('❌ 测试错误:', error.message);
  }
  
  console.log('\n🎯 文本解析测试完成');
}

// 计算差异
function getDifference(expected, actual) {
  if (!expected && !actual) return '都为空';
  if (!expected) return '期待为空，实际有值';
  if (!actual) return '实际为空，期待有值';
  
  if (expected.length !== actual.length) {
    return `长度不同 (期待:${expected.length}, 实际:${actual.length})`;
  }
  
  // 查找第一个不同的字符
  for (let i = 0; i < expected.length; i++) {
    if (expected[i] !== actual[i]) {
      return `第${i+1}个字符不同 (期待:'${expected[i]}', 实际:'${actual[i]}')`;
    }
  }
  
  return '内容相同但可能有隐藏字符';
}

testTextParsing().catch(console.error); 