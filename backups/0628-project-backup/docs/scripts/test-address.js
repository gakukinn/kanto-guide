const http = require('http');

async function testAddressExtraction() {
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
          
          console.log('地址提取结果:');
          console.log('================');
          console.log('实际地址:', JSON.stringify(result.parsed.address, null, 2));
          console.log('================');
          console.log('期待地址: "〒125 - 0052　東京都葛飾区柴又7-17-13地先"');
          console.log('================');
          
          // 检查是否包含地图控制文本
          const hasMapControls = result.parsed.address.includes('Move left') || 
                                result.parsed.address.includes('Move right') ||
                                result.parsed.address.includes('Zoom in');
          
          console.log('是否包含地图控制文本:', hasMapControls ? '是' : '否');
          
          if (hasMapControls) {
            console.log('❌ 地址提取失败：包含地图控制文本');
          } else {
            console.log('✅ 地址提取成功：干净的地址信息');
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

testAddressExtraction(); 