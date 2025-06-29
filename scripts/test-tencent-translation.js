const crypto = require('crypto');
const https = require('https');
require('dotenv').config({ path: '.env.local' });

// 测试用的日文文本
const testTexts = [
  "東京高円寺阿波おどり",
  "第41回 市川市民納涼花火大会", 
  "ＪＲ中央本線「高円寺駅」下車"
];

// 腾讯云API签名算法
function sign(secretKey, message) {
  return crypto.createHmac('sha256', secretKey).update(message).digest('hex');
}

function getSignature(secretKey, date, service, request) {
  const kDate = sign(secretKey, date);
  const kService = sign(kDate, service);
  const kSigning = sign(kService, 'tc3_request');
  return sign(kSigning, request);
}

// 腾讯云翻译API调用
async function tencentTranslate(text) {
  const secretId = process.env.TENCENT_SECRET_ID;
  const secretKey = process.env.TENCENT_SECRET_KEY;
  
  if (!secretId || !secretKey) {
    console.log('❌ 未找到腾讯云API密钥');
    console.log('💡 请在.env.local中添加:');
    console.log('   TENCENT_SECRET_ID=your_secret_id');
    console.log('   TENCENT_SECRET_KEY=your_secret_key');
    return false;
  }

  console.log(`🧪 测试翻译: "${text}"`);

  return new Promise((resolve) => {
    try {
      const service = 'tmt';
      const host = 'tmt.tencentcloudapi.com';
      const action = 'TextTranslate';
      const version = '2018-03-21';
      const region = 'ap-beijing';
      
      const timestamp = Math.floor(Date.now() / 1000);
      const date = new Date(timestamp * 1000).toISOString().substr(0, 10);
      
      // 请求参数
      const payload = JSON.stringify({
        SourceText: text,
        Source: 'ja',
        Target: 'zh',
        ProjectId: 0
      });
      
      // 构建请求
      const hashedRequestPayload = crypto.createHash('sha256').update(payload).digest('hex');
      const httpRequestMethod = 'POST';
      const canonicalUri = '/';
      const canonicalQueryString = '';
      const canonicalHeaders = `content-type:application/json; charset=utf-8\nhost:${host}\nx-tc-action:${action.toLowerCase()}\n`;
      const signedHeaders = 'content-type;host;x-tc-action';
      
      const canonicalRequest = `${httpRequestMethod}\n${canonicalUri}\n${canonicalQueryString}\n${canonicalHeaders}\n${signedHeaders}\n${hashedRequestPayload}`;
      
      const algorithm = 'TC3-HMAC-SHA256';
      const hashedCanonicalRequest = crypto.createHash('sha256').update(canonicalRequest).digest('hex');
      const credentialScope = `${date}/${service}/tc3_request`;
      const stringToSign = `${algorithm}\n${timestamp}\n${credentialScope}\n${hashedCanonicalRequest}`;
      
      const signature = getSignature(secretKey, date, service, stringToSign);
      const authorization = `${algorithm} Credential=${secretId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;
      
      const options = {
        hostname: host,
        method: 'POST',
        path: '/',
        headers: {
          'Authorization': authorization,
          'Content-Type': 'application/json; charset=utf-8',
          'Host': host,
          'X-TC-Action': action,
          'X-TC-Timestamp': timestamp,
          'X-TC-Version': version,
          'X-TC-Region': region
        }
      };
      
      const req = https.request(options, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          try {
            const response = JSON.parse(data);
            
            if (response.Response.TargetText) {
              const translation = response.Response.TargetText;
              console.log(`✅ 翻译成功: "${text}" → "${translation}"`);
              resolve(true);
            } else if (response.Response.Error) {
              console.log(`❌ API错误: ${response.Response.Error.Message}`);
              console.log(`💡 错误码: ${response.Response.Error.Code}`);
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

      req.write(payload);
      req.end();
      
    } catch (error) {
      console.log(`❌ 请求构建失败: ${error.message}`);
      resolve(false);
    }
  });
}

// 主测试函数
async function runTests() {
  console.log('🚀 开始测试腾讯云翻译API...\n');
  
  // 检查API密钥
  const secretId = process.env.TENCENT_SECRET_ID;
  const secretKey = process.env.TENCENT_SECRET_KEY;
  
  if (!secretId || !secretKey) {
    console.log('❌ 错误：未找到腾讯云API密钥');
    console.log('💡 请在.env.local文件中添加:');
    console.log('   TENCENT_SECRET_ID=你的SecretId');
    console.log('   TENCENT_SECRET_KEY=你的SecretKey');
    console.log('');
    console.log('🔗 获取密钥地址: https://console.cloud.tencent.com/cam/capi');
    return;
  }
  
  console.log(`🔑 找到SecretId: ${secretId.substring(0, 10)}...`);
  console.log('');

  let successCount = 0;
  
  // 测试每个文本
  for (const text of testTexts) {
    const success = await tencentTranslate(text);
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
    console.log('\n🎉 太棒了！腾讯云翻译API工作正常！');
    console.log('📝 接下来我们可以开始批量翻译页面了。');
    console.log('💰 当前使用免费额度（100万字符/月），完全够用！');
  } else if (successCount > 0) {
    console.log('\n⚠️ 部分成功，可能有配额或权限限制');
  } else {
    console.log('\n❌ 翻译测试失败');
    console.log('💡 请检查API密钥是否正确，或稍后重试');
  }
}

// 运行测试
runTests().catch(console.error); 