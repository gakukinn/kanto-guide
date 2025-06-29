const crypto = require('crypto');
const https = require('https');
require('dotenv').config({ path: '.env.local' });

// 腾讯云API配置
const TENCENT_SECRET_ID = process.env.TENCENT_SECRET_ID;
const TENCENT_SECRET_KEY = process.env.TENCENT_SECRET_KEY;

// 测试文本
const testText = "東京高円寺阿波おどり";

// 正确的腾讯云API v3签名算法
function sha256(message, secret = '') {
  return crypto.createHmac('sha256', secret).update(message, 'utf8').digest('hex');
}

function getDate(timestamp) {
  const date = new Date(timestamp * 1000);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

async function tencentTranslate(text) {
  console.log(`\n🔧 调试腾讯云翻译API...`);
  console.log(`📝 待翻译文本: "${text}"`);

  const endpoint = 'tmt.tencentcloudapi.com';
  const service = 'tmt';
  const region = 'ap-beijing';
  const action = 'TextTranslate';
  const version = '2018-03-21';
  const algorithm = 'TC3-HMAC-SHA256';
  
  // 当前时间戳
  const timestamp = Math.floor(Date.now() / 1000);
  const date = getDate(timestamp);
  
  console.log(`⏰ 时间戳: ${timestamp}`);
  console.log(`📅 日期: ${date}`);

  // 请求体
  const payload = {
    SourceText: text,
    Source: 'ja',
    Target: 'zh',
    ProjectId: 0
  };
  const payloadString = JSON.stringify(payload);
  console.log(`📦 请求体: ${payloadString}`);

  // 第1步：拼接规范请求串
  const hashedRequestPayload = crypto.createHash('sha256').update(payloadString, 'utf8').digest('hex');
  console.log(`🔐 请求体哈希: ${hashedRequestPayload}`);

  const httpRequestMethod = 'POST';
  const canonicalUri = '/';
  const canonicalQueryString = '';
  const canonicalHeaders = `content-type:application/json; charset=utf-8\nhost:${endpoint}\nx-tc-action:${action.toLowerCase()}\n`;
  const signedHeaders = 'content-type;host;x-tc-action';

  const canonicalRequest = [
    httpRequestMethod,
    canonicalUri,
    canonicalQueryString,
    canonicalHeaders,
    signedHeaders,
    hashedRequestPayload
  ].join('\n');

  console.log(`📝 规范请求串:\n${canonicalRequest}`);

  // 第2步：拼接待签名字符串
  const credentialScope = `${date}/${service}/tc3_request`;
  const hashedCanonicalRequest = crypto.createHash('sha256').update(canonicalRequest, 'utf8').digest('hex');
  
  const stringToSign = [
    algorithm,
    timestamp,
    credentialScope,
    hashedCanonicalRequest
  ].join('\n');

  console.log(`✍️ 待签名字符串:\n${stringToSign}`);

  // 第3步：计算签名
  const secretDate = sha256(date, 'TC3' + TENCENT_SECRET_KEY);
  const secretService = sha256(service, secretDate);
  const secretSigning = sha256('tc3_request', secretService);
  const signature = sha256(stringToSign, secretSigning);

  console.log(`🔏 签名: ${signature}`);

  // 第4步：拼接Authorization
  const authorization = `${algorithm} Credential=${TENCENT_SECRET_ID}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;
  console.log(`🎫 Authorization: ${authorization}`);

  // 发送请求
  const options = {
    hostname: endpoint,
    method: 'POST',
    path: '/',
    headers: {
      'Authorization': authorization,
      'Content-Type': 'application/json; charset=utf-8',
      'Host': endpoint,
      'X-TC-Action': action,
      'X-TC-Timestamp': timestamp.toString(),
      'X-TC-Version': version,
      'X-TC-Region': region
    }
  };

  console.log(`🌐 请求头:`, options.headers);

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      console.log(`📡 响应状态码: ${res.statusCode}`);
      console.log(`📡 响应头:`, res.headers);
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        console.log(`📥 原始响应: ${data}`);
        
        try {
          const response = JSON.parse(data);
          if (response.Response && response.Response.TargetText) {
            console.log(`✅ 翻译成功: "${response.Response.TargetText}"`);
            resolve(response.Response.TargetText);
          } else if (response.Response && response.Response.Error) {
            console.error(`❌ 翻译错误: ${response.Response.Error.Message}`);
            console.error(`❌ 错误码: ${response.Response.Error.Code}`);
            reject(new Error(response.Response.Error.Message));
          } else {
            console.error(`❌ 意外的响应格式:`, response);
            reject(new Error('Unexpected response format'));
          }
        } catch (e) {
          console.error(`❌ 解析JSON失败:`, e);
          console.error(`❌ 原始数据:`, data);
          reject(e);
        }
      });
    });

    req.on('error', (e) => {
      console.error(`❌ 请求失败:`, e);
      reject(e);
    });

    req.write(payloadString);
    req.end();
  });
}

// 执行测试
async function main() {
  console.log('🔧 调试腾讯云翻译API签名问题');
  console.log('=' .repeat(50));

  if (!TENCENT_SECRET_ID || !TENCENT_SECRET_KEY) {
    console.error('❌ 缺少腾讯云API密钥');
    return;
  }

  try {
    const result = await tencentTranslate(testText);
    console.log('\n🎉 调试成功！API工作正常');
    console.log(`📝 翻译结果: "${result}"`);
  } catch (error) {
    console.error('\n❌ 调试失败:', error.message);
  }
}

main(); 