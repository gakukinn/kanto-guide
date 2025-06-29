const testUrl = "https://www.walkerplus.com/event/ar0313e00854/";

async function testAPI() {
  try {
    console.log('测试API修复...');
    
    const response = await fetch('http://localhost:3000/api/walkerplus-scraper', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: testUrl })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('API响应成功！');
    console.log('标题:', data.title);
    console.log('内容简介:', data.description?.substring(0, 100) + '...');
    console.log('見どころ:', data.highlights?.substring(0, 100) + '...');
    console.log('官方网站:', data.officialWebsite);
    console.log('谷歌地图:', data.googleMapsUrl);
    
  } catch (error) {
    console.error('测试失败:', error.message);
  }
}

testAPI(); 