const http = require('http');
const https = require('https');

async function testFixedAPI() {
  const testUrl = 'https://www.jalan.net/event/evt_343809/?screenId=OUW1702';
  const apiUrl = `http://localhost:3000/api/auto-import-hanami?url=${encodeURIComponent(testUrl)}`;
  
  console.log('🧪 测试修复后的API...');
  console.log('📍 测试URL:', testUrl);
  console.log('');
  
  // 期待的正确数据（基于网页内容）
  const expected = {
    name: '葛飾納涼花火大会（かつしかのうりょうはなびたいかい）',
    address: '〒125 - 0052　東京都葛飾区柴又7-17-13地先',
    period: '2025年7月22日　最終時間/19:20～20:20　雨天中止（小雨決行）',
    venue: '江戸川河川敷（柴又野球場）',
    access: 'ＪＲ常磐線「柴又駅」から徒歩10分、または北総線北総鉄道「新柴又駅」から徒歩15分、または京成金町線・常磐線「金町駅」または東武伊勢崎線「堀切菖蒲園駅」から徒歩20分',
    organizer: '葛飾納涼花火大会実行委員会',
    price: '観覧無料',
    contact: '03-6758-2222',
    website: 'http://www.katsushika-hanabi.com/',
  };
  
  return new Promise((resolve, reject) => {
    console.log('⏳ 发送API请求...');
    
    function makeRequest(url, redirectCount = 0) {
      if (redirectCount > 5) {
        console.log('❌ 重定向次数过多');
        resolve();
        return;
      }
      
      const req = http.get(url, (res) => {
        let data = '';
        
        console.log('📊 HTTP状态码:', res.statusCode);
        
        // 处理重定向
        if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 308) {
          const location = res.headers.location;
          console.log('🔄 重定向到:', location);
          
          if (location) {
            let redirectUrl;
            if (location.startsWith('http')) {
              redirectUrl = location;
            } else {
              redirectUrl = `http://localhost:3000${location}`;
            }
            makeRequest(redirectUrl, redirectCount + 1);
            return;
          }
        }
        
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          try {
            if (res.statusCode !== 200) {
              console.log('❌ API请求失败');
              console.log('响应内容:', data);
              resolve();
              return;
            }
            
            const result = JSON.parse(data);
            
            if (!result.success) {
              console.log('❌ API返回错误:', result.error);
              resolve();
              return;
            }
            
            console.log('✅ API请求成功');
            console.log('');
            
            // 逐项检查十个字段
            const parsed = result.parsed;
            let correctCount = 0;
            
            console.log('📋 十项信息对比检查:');
            console.log('='.repeat(80));
            
            // 1. 名称检查
            console.log('1️⃣ 名称:');
            console.log('   期待:', expected.name);
            console.log('   实际:', parsed.name || '未提取到');
            const nameCorrect = parsed.name && parsed.name.includes('葛飾納涼花火大会') && parsed.name.includes('かつしかのうりょうはなびたいかい');
            console.log('   结果:', nameCorrect ? '✅ 正确' : '❌ 错误');
            if (nameCorrect) correctCount++;
            console.log('');
            
            // 2. 所在地检查
            console.log('2️⃣ 所在地:');
            console.log('   期待:', expected.address);
            console.log('   实际:', parsed.address || '未提取到');
            const addressCorrect = parsed.address && parsed.address.includes('東京都葛飾区柴又7-17-13地先');
            console.log('   结果:', addressCorrect ? '✅ 正确' : '❌ 错误');
            if (addressCorrect) correctCount++;
            console.log('');
            
            // 3. 開催期間检查
            console.log('3️⃣ 開催期間:');
            console.log('   期待:', expected.period);
            console.log('   实际:', parsed.period || '未提取到');
            const periodCorrect = parsed.period && parsed.period.includes('2025年7月22日');
            console.log('   结果:', periodCorrect ? '✅ 正确' : '❌ 错误');
            if (periodCorrect) correctCount++;
            console.log('');
            
            // 4. 開催場所检查
            console.log('4️⃣ 開催場所:');
            console.log('   期待:', expected.venue);
            console.log('   实际:', parsed.venue || '未提取到');
            const venueCorrect = parsed.venue && parsed.venue.includes('江戸川河川敷');
            console.log('   结果:', venueCorrect ? '✅ 正确' : '❌ 错误');
            if (venueCorrect) correctCount++;
            console.log('');
            
            // 5. 交通アクセス检查
            console.log('5️⃣ 交通アクセス:');
            console.log('   期待:', expected.access);
            console.log('   实际:', parsed.access || '未提取到');
            const accessCorrect = parsed.access && parsed.access.includes('柴又駅') && !parsed.access.includes('じゃらんパック');
            console.log('   结果:', accessCorrect ? '✅ 正确' : '❌ 错误');
            if (accessCorrect) correctCount++;
            console.log('');
            
            // 6. 主催检查
            console.log('6️⃣ 主催:');
            console.log('   期待:', expected.organizer);
            console.log('   实际:', parsed.organizer || '未提取到');
            const organizerCorrect = parsed.organizer && parsed.organizer.includes('実行委員会');
            console.log('   结果:', organizerCorrect ? '✅ 正确' : '❌ 错误');
            if (organizerCorrect) correctCount++;
            console.log('');
            
            // 7. 料金检查
            console.log('7️⃣ 料金:');
            console.log('   期待:', expected.price);
            console.log('   实际:', parsed.price || '未提取到');
            const priceCorrect = parsed.price && parsed.price.includes('観覧無料');
            console.log('   结果:', priceCorrect ? '✅ 正确' : '❌ 错误');
            if (priceCorrect) correctCount++;
            console.log('');
            
            // 8. 問合せ先检查
            console.log('8️⃣ 問合せ先:');
            console.log('   期待:', expected.contact);
            console.log('   实际:', parsed.contact || '未提取到');
            const contactCorrect = parsed.contact && parsed.contact.includes('03-6758-2222');
            console.log('   结果:', contactCorrect ? '✅ 正确' : '❌ 错误');
            if (contactCorrect) correctCount++;
            console.log('');
            
            // 9. ホームページ检查
            console.log('9️⃣ ホームページ:');
            console.log('   期待:', expected.website);
            console.log('   实际:', parsed.website || '未提取到');
            const websiteCorrect = parsed.website && parsed.website.includes('katsushika-hanabi.com');
            console.log('   结果:', websiteCorrect ? '✅ 正确' : '❌ 错误');
            if (websiteCorrect) correctCount++;
            console.log('');
            
            // 10. 谷歌地图位置检查
            console.log('🔟 谷歌地图位置:');
            console.log('   实际坐标:', parsed.coordinates ? `${parsed.coordinates.lat}, ${parsed.coordinates.lng}` : '未提取到');
            console.log('   坐标来源:', parsed.coordsSource || '无');
            const coordsCorrect = parsed.coordinates && parsed.coordinates.lat && parsed.coordinates.lng;
            console.log('   结果:', coordsCorrect ? '✅ 正确' : '❌ 错误');
            if (coordsCorrect) correctCount++;
            console.log('');
            
            // 总结
            console.log('='.repeat(80));
            console.log(`🎯 总体结果: ${correctCount}/10 项正确`);
            
            if (correctCount === 10) {
              console.log('🎉 完美！所有十项信息都正确提取！');
            } else if (correctCount >= 8) {
              console.log('✅ 很好！大部分信息正确提取');
            } else if (correctCount >= 5) {
              console.log('⚠️  一般，还需要改进');
            } else {
              console.log('❌ 需要大幅改进');
            }
            
            resolve();
            
          } catch (error) {
            console.log('❌ 解析响应失败:', error.message);
            console.log('原始响应:', data);
            resolve();
          }
        });
        
      }).on('error', (error) => {
        console.log('❌ 请求失败:', error.message);
        resolve();
      });
      
      // 设置超时
      req.setTimeout(120000, () => {
        console.log('❌ 请求超时');
        req.destroy();
        resolve();
      });
    }
    
    makeRequest(apiUrl);
  });
}

testFixedAPI().then(() => {
  console.log('🏁 测试完成');
}).catch(console.error); 