// 测试当前API状态
async function testAPI() {
  try {
    console.log('测试API状态...');
    
    // 测试服务器是否运行
    const healthResponse = await fetch('http://localhost:3000', {
      method: 'GET'
    });
    
    console.log('服务器状态:', healthResponse.status);
    
    if (!healthResponse.ok) {
      console.error('服务器未运行');
      return;
    }
    
    // 使用一个简单的测试URL（可能不存在，但可以检查API逻辑）
    const testUrl = "https://www.walkerplus.com/event/test123/";
    
    console.log('测试API调用...');
    const response = await fetch('http://localhost:3000/api/walkerplus-scraper', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: testUrl })
    });

    const responseText = await response.text();
    console.log('API响应状态:', response.status);
    
    if (response.status === 500) {
      console.log('API响应内容:', responseText);
      
      // 解析错误信息
      try {
        const errorData = JSON.parse(responseText);
        console.log('错误详情:', errorData.error);
      } catch (e) {
        console.log('无法解析错误响应');
      }
    } else {
      console.log('API调用成功或返回其他状态');
      console.log('响应内容:', responseText);
    }
    
  } catch (error) {
    console.error('测试失败:', error.message);
  }
}

testAPI(); 