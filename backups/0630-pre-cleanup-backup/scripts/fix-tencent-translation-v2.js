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

async function tencentTranslate(text, retryCount = 0) {
  console.log(`\n🔧 调试腾讯云翻译API (尝试 ${retryCount + 1}/3)...`);
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

  // 请求体
  const payload = {
    SourceText: text,
    Source: 'ja',
    Target: 'zh',
    ProjectId: 0
  };
  const payloadString = JSON.stringify(payload);

  // 第1步：拼接规范请求串
  const hashedRequestPayload = crypto.createHash('sha256').update(payloadString, 'utf8').digest('hex');

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

  // 第2步：拼接待签名字符串
  const credentialScope = `${date}/${service}/tc3_request`;
  const hashedCanonicalRequest = crypto.createHash('sha256').update(canonicalRequest, 'utf8').digest('hex');
  
  const stringToSign = [
    algorithm,
    timestamp,
    credentialScope,
    hashedCanonicalRequest
  ].join('\n');

  // 第3步：计算签名
  const secretDate = sha256(date, 'TC3' + TENCENT_SECRET_KEY);
  const secretService = sha256(service, secretDate);
  const secretSigning = sha256('tc3_request', secretService);
  const signature = sha256(stringToSign, secretSigning);

  // 第4步：拼接Authorization
  const authorization = `${algorithm} Credential=${TENCENT_SECRET_ID}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

  // 增强的HTTPS配置
  const agent = new https.Agent({
    keepAlive: true,
    timeout: 30000,
    keepAliveMsecs: 30000,
    maxSockets: 1,
    maxFreeSockets: 1,
    scheduling: 'fifo'
  });

  // 发送请求
  const options = {
    hostname: endpoint,
    port: 443,
    method: 'POST',
    path: '/',
    timeout: 30000,
    agent: agent,
    headers: {
      'Authorization': authorization,
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': Buffer.byteLength(payloadString),
      'Host': endpoint,
      'X-TC-Action': action,
      'X-TC-Timestamp': timestamp.toString(),
      'X-TC-Version': version,
      'X-TC-Region': region,
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Accept': 'application/json',
      'Accept-Encoding': 'gzip, deflate',
      'Connection': 'keep-alive'
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      console.log(`📡 响应状态码: ${res.statusCode}`);
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          if (response.Response && response.Response.TargetText) {
            console.log(`✅ 翻译成功: "${response.Response.TargetText}"`);
            resolve(response.Response.TargetText);
          } else if (response.Response && response.Response.Error) {
            console.error(`❌ 翻译错误: ${response.Response.Error.Message}`);
            console.error(`❌ 错误码: ${response.Response.Error.Code}`);
            reject(new Error(`${response.Response.Error.Code}: ${response.Response.Error.Message}`));
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

    // 错误处理和重试机制
    req.on('error', async (e) => {
      console.error(`❌ 请求失败 (尝试 ${retryCount + 1}/3):`, e.message);
      
      // 重试条件
      if (retryCount < 2 && (
        e.code === 'ECONNRESET' || 
        e.code === 'ENOTFOUND' || 
        e.code === 'ECONNREFUSED' ||
        e.code === 'ETIMEDOUT'
      )) {
        console.log(`🔄 等待3秒后重试...`);
        await new Promise(resolve => setTimeout(resolve, 3000));
        try {
          const result = await tencentTranslate(text, retryCount + 1);
          resolve(result);
        } catch (retryError) {
          reject(retryError);
        }
      } else {
        reject(e);
      }
    });

    req.on('timeout', () => {
      console.error(`❌ 请求超时`);
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.setTimeout(30000);
    req.write(payloadString);
    req.end();
  });
}

// 检查网络连通性
async function checkNetwork() {
  console.log('🌐 检查网络连通性...');
  
  return new Promise((resolve) => {
    const options = {
      hostname: 'tmt.tencentcloudapi.com',
      port: 443,
      method: 'HEAD',
      timeout: 10000
    };

    const req = https.request(options, (res) => {
      console.log(`✅ 网络连通性正常 (状态码: ${res.statusCode})`);
      resolve(true);
    });

    req.on('error', (e) => {
      console.log(`❌ 网络连通性问题: ${e.message}`);
      resolve(false);
    });

    req.on('timeout', () => {
      console.log(`❌ 网络连接超时`);
      req.destroy();
      resolve(false);
    });

    req.setTimeout(10000);
    req.end();
  });
}

// 执行测试
async function main() {
  console.log('🔧 调试腾讯云翻译API签名问题 (增强版)');
  console.log('=' .repeat(60));

  if (!TENCENT_SECRET_ID || !TENCENT_SECRET_KEY) {
    console.error('❌ 缺少腾讯云API密钥');
    return;
  }

  // 检查网络
  const networkOk = await checkNetwork();
  if (!networkOk) {
    console.error('❌ 网络连接有问题，请检查网络设置');
    return;
  }

  try {
    const result = await tencentTranslate(testText);
    console.log('\n🎉 调试成功！API工作正常');
    console.log(`📝 翻译结果: "${result}"`);
    
    // 如果成功，更新主翻译脚本
    console.log('\n🔄 API测试成功，准备更新主翻译脚本...');
    
  } catch (error) {
    console.error('\n❌ 调试失败:', error.message);
    
    // 分析可能的问题
    if (error.message.includes('AuthFailure')) {
      console.log('\n💡 建议检查事项:');
      console.log('1. 验证腾讯云API密钥是否正确');
      console.log('2. 确认API密钥有翻译服务权限');
      console.log('3. 检查账户是否有足够余额');
    } else if (error.message.includes('ECONNRESET') || error.message.includes('timeout')) {
      console.log('\n💡 建议检查事项:');
      console.log('1. 网络连接是否稳定');
      console.log('2. 防火墙是否阻止了HTTPS连接');
      console.log('3. 代理设置是否正确');
    }
  }
}

main(); 