const crypto = require('crypto');
const https = require('https');
require('dotenv').config({ path: '.env.local' });

// 腾讯云API配置
const TENCENT_SECRET_ID = process.env.TENCENT_SECRET_ID;
const TENCENT_SECRET_KEY = process.env.TENCENT_SECRET_KEY;

// 测试文本
const testText = "東京高円寺阿波おどり";

// 严格按照腾讯云API v3文档的签名算法
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
  console.log(`\n🔧 严格按照官方文档调试腾讯云翻译API...`);
  console.log(`📝 待翻译文本: "${text}"`);

  const service = 'tmt';
  const version = '2018-03-21';
  const action = 'TextTranslate';
  const region = 'ap-beijing';
  const endpoint = 'tmt.tencentcloudapi.com';
  const algorithm = 'TC3-HMAC-SHA256';
  
  // 获取当前时间戳 (注意：必须是UTC时间)
  const timestamp = Math.floor(Date.now() / 1000);
  const date = getDate(timestamp);
  
  console.log(`⏰ 时间戳: ${timestamp} (${new Date(timestamp * 1000).toISOString()})`);
  console.log(`📅 日期: ${date}`);

  // 步骤1：拼接规范请求串
  const httpRequestMethod = 'POST';
  const canonicalUri = '/';
  const canonicalQueryString = '';
  
  // 请求体
  const payload = JSON.stringify({
    SourceText: text,
    Source: 'ja',
    Target: 'zh',
    ProjectId: 0
  });
  
  const hashedRequestPayload = crypto.createHash('sha256').update(payload, 'utf8').digest('hex').toLowerCase();
  console.log(`🔐 请求体哈希: ${hashedRequestPayload}`);

  // 规范化请求头 (注意顺序和格式)
  const canonicalHeaders = 'content-type:application/json; charset=utf-8\n' +
                           `host:${endpoint}\n` +
                           `x-tc-action:${action.toLowerCase()}\n`;
  
  const signedHeaders = 'content-type;host;x-tc-action';

  const canonicalRequest = [
    httpRequestMethod,
    canonicalUri,
    canonicalQueryString,
    canonicalHeaders,
    signedHeaders,
    hashedRequestPayload
  ].join('\n');

  console.log(`📝 规范请求串:\n${canonicalRequest}\n`);

  // 步骤2：拼接待签名字符串
  const credentialScope = `${date}/${service}/tc3_request`;
  const hashedCanonicalRequest = crypto.createHash('sha256').update(canonicalRequest, 'utf8').digest('hex').toLowerCase();
  
  const stringToSign = [
    algorithm,
    timestamp,
    credentialScope,
    hashedCanonicalRequest
  ].join('\n');

  console.log(`✍️ 待签名字符串:\n${stringToSign}\n`);

  // 步骤3：计算签名
  const secretDate = sha256(date, 'TC3' + TENCENT_SECRET_KEY);
  const secretService = sha256(service, secretDate);
  const secretSigning = sha256('tc3_request', secretService);
  const signature = sha256(stringToSign, secretSigning);

  console.log(`🔏 最终签名: ${signature}`);

  // 步骤4：拼接Authorization
  const authorization = `${algorithm} Credential=${TENCENT_SECRET_ID}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;
  console.log(`🎫 Authorization: ${authorization}\n`);

  // 发送请求
  const postData = payload;
  
  const options = {
    hostname: endpoint,
    port: 443,
    path: '/',
    method: 'POST',
    headers: {
      'Authorization': authorization,
      'Content-Type': 'application/json; charset=utf-8',
      'X-TC-Action': action,
      'X-TC-Timestamp': timestamp.toString(),
      'X-TC-Version': version,
      'X-TC-Region': region
      // 注意：不再单独设置Host头，让Node.js自动处理
    }
  };

  console.log(`🌐 请求选项:`, {
    hostname: options.hostname,
    path: options.path,
    method: options.method,
    headers: options.headers
  });

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      console.log(`📡 响应状态码: ${res.statusCode}`);
      console.log(`📡 响应头:`, res.headers);
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        console.log(`📥 响应数据: ${data}\n`);
        
        try {
          const response = JSON.parse(data);
          
          if (response.Response && response.Response.Error) {
            const error = response.Response.Error;
            console.error(`❌ API错误: ${error.Code} - ${error.Message}`);
            reject(new Error(`${error.Code}: ${error.Message}`));
          } else if (response.Response && response.Response.TargetText) {
            console.log(`✅ 翻译成功: "${response.Response.TargetText}"`);
            resolve(response.Response.TargetText);
          } else {
            console.error(`❌ 意外的响应格式:`, response);
            reject(new Error('Unexpected response format'));
          }
        } catch (e) {
          console.error(`❌ JSON解析失败:`, e);
          reject(e);
        }
      });
    });

    req.on('error', (e) => {
      console.error(`❌ 请求错误:`, e);
      reject(e);
    });

    console.log(`📤 发送请求体: ${postData}\n`);
    req.write(postData);
    req.end();
  });
}

// 简化的API密钥验证
function validateCredentials() {
  console.log('🔍 验证API密钥格式...');
  
  if (!TENCENT_SECRET_ID || !TENCENT_SECRET_KEY) {
    console.error('❌ API密钥未配置');
    return false;
  }
  
  // 腾讯云API密钥格式检查
  const secretIdPattern = /^AKID[a-zA-Z0-9]{32}$/;
  const secretKeyPattern = /^[a-zA-Z0-9]{32}$/;
  
  if (!secretIdPattern.test(TENCENT_SECRET_ID)) {
    console.error('❌ SecretId格式不正确，应该是AKID开头的36字符字符串');
    return false;
  }
  
  if (!secretKeyPattern.test(TENCENT_SECRET_KEY)) {
    console.error('❌ SecretKey格式不正确，应该是32字符字符串');
    return false;
  }
  
  console.log('✅ API密钥格式验证通过');
  return true;
}

// 主函数
async function main() {
  console.log('🔧 腾讯云翻译API最终调试版本');
  console.log('=' .repeat(60));

  // 验证密钥格式
  if (!validateCredentials()) {
    return;
  }

  try {
    const result = await tencentTranslate(testText);
    console.log('\n🎉 调试成功！腾讯云API工作正常');
    console.log(`📝 最终翻译结果: "${result}"`);
    console.log('\n✅ 可以更新主翻译脚本了！');
    
  } catch (error) {
    console.error('\n❌ 调试仍然失败:', error.message);
    
    // 详细的错误分析
    if (error.message.includes('AuthFailure.SignatureFailure')) {
      console.log('\n🔍 签名失败分析:');
      console.log('1. 时间戳可能与服务器时间差异过大');
      console.log('2. 签名算法实现可能有细微差异');
      console.log('3. 字符编码可能有问题');
      console.log('4. API密钥可能已过期或权限不足');
    } else if (error.message.includes('AuthFailure.SecretIdNotFound')) {
      console.log('\n🔍 SecretId错误分析:');
      console.log('1. SecretId可能输入错误');
      console.log('2. API密钥可能已删除');
    }
  }
}

main(); 