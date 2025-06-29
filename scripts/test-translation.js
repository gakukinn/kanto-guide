const https = require('https');
require('dotenv').config({ path: '.env.local' });

// 测试用的日文文本
const testTexts = [
  "東京高円寺阿波おどり",
  "第41回 市川市民納涼花火大会", 
  "ＪＲ中央本線「高円寺駅」下車"
];

// 使用Google Translate API测试翻译
async function testGoogleTranslate(text) {
  const apiKey = process.env.GOOGLE_API_KEY;
  
  if (!apiKey) {
    console.log('❌ 未找到GOOGLE_API_KEY');
    return false;
  }

  console.log(`🧪 测试翻译: "${text}"`);
  
  return new Promise((resolve) => {
    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
    const postData = JSON.stringify({
      q: text,
      source: 'ja',
      target: 'zh',
      format: 'text'
    });

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(url, options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          
          if (response.data && response.data.translations) {
            const translation = response.data.translations[0].translatedText;
            console.log(`✅ 翻译成功: "${text}" → "${translation}"`);
            resolve(true);
          } else if (response.error) {
            console.log(`❌ API错误: ${response.error.message}`);
            console.log(`💡 错误详情: ${JSON.stringify(response.error, null, 2)}`);
            resolve(false);
          } else {
            console.log(`❌ 未知响应: ${data}`);
            resolve(false);
          }
        } catch (error) {
          console.log(`❌ 解析响应失败: ${error.message}`);
          console.log(`📄 原始响应: ${data}`);
          resolve(false);
        }
      });
    });

    req.on('error', (error) => {
      console.log(`❌ 请求失败: ${error.message}`);
      resolve(false);
    });

    req.write(postData);
    req.end();
  });
}

// 主测试函数
async function runTests() {
  console.log('🚀 开始测试Google Translate API...\n');
  
  // 检查API密钥
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    console.log('❌ 错误：未找到GOOGLE_API_KEY环境变量');
    console.log('💡 请检查.env.local文件');
    return;
  }
  
  console.log(`🔑 找到API密钥: ${apiKey.substring(0, 10)}...`);
  console.log('');

  let successCount = 0;
  
  // 测试每个文本
  for (const text of testTexts) {
    const success = await testGoogleTranslate(text);
    if (success) successCount++;
    console.log(''); // 空行分隔
    
    // 避免API频率限制
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  // 总结结果
  console.log('📊 测试结果总结:');
  console.log(`✅ 成功: ${successCount}/${testTexts.length}`);
  console.log(`❌ 失败: ${testTexts.length - successCount}/${testTexts.length}`);
  
  if (successCount === testTexts.length) {
    console.log('\n🎉 太棒了！您的API密钥可以用于翻译！');
    console.log('📝 接下来我们可以开始批量翻译页面了。');
  } else if (successCount > 0) {
    console.log('\n⚠️ 部分成功，可能有配额或权限限制');
    console.log('💡 建议：可以继续，但可能需要调整API设置');
  } else {
    console.log('\n❌ 翻译测试失败');
    console.log('💡 建议：');
    console.log('   1. 检查API密钥是否启用了Translation API');
    console.log('   2. 或者改用腾讯云翻译（免费100万字符）');
    console.log('   3. 或者申请新的Google Translate API密钥');
  }
}

// 运行测试
runTests().catch(console.error); 