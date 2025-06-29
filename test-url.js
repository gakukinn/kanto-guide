async function testUrls() {
  const baseUrl = "https://www.walkerplus.com/event/ar0313e00854";
  const urls = [
    baseUrl + "/",
    baseUrl + "/data.html", 
    baseUrl + "/map.html"
  ];

  for (const url of urls) {
    try {
      console.log(`测试URL: ${url}`);
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'ja,en-US;q=0.7,en;q=0.3',
          'Cache-Control': 'no-cache'
        }
      });
      console.log(`状态: ${response.status}`);
      
      if (response.ok) {
        const text = await response.text();
        console.log(`内容长度: ${text.length} 字符`);
        console.log(`标题: ${text.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1] || '未找到'}`);
      }
      console.log('---');
    } catch (error) {
      console.error(`错误: ${error.message}`);
      console.log('---');
    }
  }
}

testUrls(); 