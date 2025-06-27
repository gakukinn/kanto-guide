const http = require('http');

async function testAllFields() {
  try {
    const url = 'http://localhost:3000/api/auto-import-hanami/?url=https%3A%2F%2Fwww.jalan.net%2Fevent%2Fevt_343809%2F%3FscreenId%3DOUW1702';
    
    http.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          
          console.log('🎯 完整十项字段测试结果:');
          console.log('='.repeat(50));
          
          const expected = {
            name: '葛飾納涼花火大会（かつしかのうりょうはなびたいかい）',
            address: '〒125 - 0052　東京都葛飾区柴又7-17-13地先',
            period: '2025年7月22日　打上時間/19:20～20:20　※雨天決行（荒天中止）',
            venue: '東京都　柴又野球場（江戸川河川敷）',
            access: '京成金町線「柴又駅」から徒歩10分、または北総鉄道北総線「新柴又駅」から徒歩15分、またはＪＲ常磐線・地下鉄千代田線「金町駅」もしくは京成金町線「京成金町駅」から徒歩20分',
            organizer: '葛飾納涼花火大会実行委員会（葛飾区、一般社団法人葛飾区観光協会）',
            price: '観覧無料',
            contact: '葛飾区コールセンター（はなしょうぶコール）　03-6758-2222',
            website: 'https://www.city.katsushika.lg.jp/tourism/1000064/1000065/1031830.html'
          };
          
          let correctCount = 0;
          const total = 10; // 包括坐标
          
          // 检查每个字段
          Object.keys(expected).forEach((key, index) => {
            const actual = result.parsed[key];
            const expect = expected[key];
            const isCorrect = actual && actual.includes(expect.substring(0, 20)); // 部分匹配
            
            console.log(`${index + 1}. ${key}:`);
            console.log(`   期待: ${expect}`);
            console.log(`   实际: ${actual || '(空)'}`);
            console.log(`   状态: ${isCorrect ? '✅ 正确' : '❌ 错误'}`);
            console.log('');
            
            if (isCorrect) correctCount++;
          });
          
          // 检查坐标
          const hasCoords = result.parsed.coordinates && 
                           result.parsed.coordinates.lat && 
                           result.parsed.coordinates.lng;
          console.log(`10. 谷歌地图位置:`);
          console.log(`   期待: 有效坐标`);
          console.log(`   实际: ${hasCoords ? `${result.parsed.coordinates.lat}, ${result.parsed.coordinates.lng}` : '(无)'}`);
          console.log(`   状态: ${hasCoords ? '✅ 正确' : '❌ 错误'}`);
          
          if (hasCoords) correctCount++;
          
          console.log('='.repeat(50));
          console.log(`📊 总结: ${correctCount}/${total} 项正确 (${Math.round(correctCount/total*100)}%)`);
          
          if (correctCount === total) {
            console.log('🎉 所有字段提取成功！');
          } else {
            console.log(`⚠️  还有 ${total - correctCount} 个字段需要修复`);
          }
          
        } catch (parseError) {
          console.error('解析响应出错:', parseError);
        }
      });
    }).on('error', (err) => {
      console.error('请求出错:', err);
    });
    
  } catch (error) {
    console.error('测试出错:', error);
  }
}

testAllFields(); 