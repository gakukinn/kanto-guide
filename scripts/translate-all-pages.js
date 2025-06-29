const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const https = require('https');
require('dotenv').config({ path: '.env.local' });

// 腾讯云API配置
const TENCENT_SECRET_ID = process.env.TENCENT_SECRET_ID;
const TENCENT_SECRET_KEY = process.env.TENCENT_SECRET_KEY;

// 需要翻译的字段配置
const FIELD_PATTERNS = {
  name: /name:\s*["'`]([^"'`]+)["'`]/g,
  address: /address:\s*["'`]([^"'`]+)["'`]/g,
  datetime: /datetime:\s*["'`]([^"'`]+)["'`]/g,
  access: /access:\s*["'`]([^"'`]+)["'`]/g,
  price: /price:\s*["'`]([^"'`]+)["'`]/g,
  venue: /venue:\s*["'`]([^"'`]+)["'`]/g,
  organizer: /organizer:\s*["'`]([^"'`]+)["'`]/g,
  contact: /contact:\s*["'`]([^"'`]+)["'`]/g,
  description: /description:\s*["'`]([^"'`]+)["'`]/g,
  // WalkerPlus花火特定字段
  fireworksCount: /fireworksCount:\s*["'`]([^"'`]+)["'`]/g,
  launchTime: /launchTime:\s*["'`]([^"'`]+)["'`]/g,
  expectedVisitors: /expectedVisitors:\s*["'`]([^"'`]+)["'`]/g,
  weatherInfo: /weatherInfo:\s*["'`]([^"'`]+)["'`]/g,
  parkingInfo: /parkingInfo:\s*["'`]([^"'`]+)["'`]/g,
  toiletInfo: /toiletInfo:\s*["'`]([^"'`]+)["'`]/g,
  foodStalls: /foodStalls:\s*["'`]([^"'`]+)["'`]/g,
  highlights: /highlights:\s*["'`]([^"'`]+)["'`]/g
};

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

// 检测是否包含日文
function containsJapanese(text) {
  // 平假名、片假名、汉字（常用日文汉字范围）
  const japaneseRegex = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/;
  return japaneseRegex.test(text);
}

// 腾讯云翻译API调用
async function translateText(text) {
  if (!text || !containsJapanese(text)) {
    return text;
  }

  console.log(`🔄 翻译中: "${text.substring(0, 50)}${text.length > 50 ? '...' : ''}"`);

  const endpoint = 'tmt.tencentcloudapi.com';
  const service = 'tmt';
  const region = 'ap-beijing';
  const action = 'TextTranslate';
  const version = '2018-03-21';
  
  const timestamp = Math.floor(Date.now() / 1000);
  const date = new Date(timestamp * 1000).toISOString().substring(0, 10);
  
  const payload = JSON.stringify({
    SourceText: text,
    Source: 'ja',
    Target: 'zh',
    ProjectId: 0
  });

  const hashedRequestPayload = crypto.createHash('sha256').update(payload).digest('hex');
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
  
  const algorithm = 'TC3-HMAC-SHA256';
  const hashedCanonicalRequest = crypto.createHash('sha256').update(canonicalRequest).digest('hex');
  const credentialScope = `${date}/${service}/tc3_request`;
  const stringToSign = [algorithm, timestamp, credentialScope, hashedCanonicalRequest].join('\n');
  
  const signature = getSignature(TENCENT_SECRET_KEY, date, service, stringToSign);
  const authorization = `${algorithm} Credential=${TENCENT_SECRET_ID}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

  const options = {
    hostname: endpoint,
    method: 'POST',
    path: '/',
    headers: {
      'Authorization': authorization,
      'Content-Type': 'application/json; charset=utf-8',
      'Host': endpoint,
      'X-TC-Action': action,
      'X-TC-Timestamp': timestamp,
      'X-TC-Version': version,
      'X-TC-Region': region
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          if (response.Response && response.Response.TargetText) {
            const translated = response.Response.TargetText;
            console.log(`✅ 翻译完成: "${translated}"`);
            resolve(translated);
          } else if (response.Response && response.Response.Error) {
            console.error('❌ 翻译错误:', response.Response.Error.Message);
            resolve(text); // 翻译失败时返回原文
          } else {
            console.error('❌ 意外的响应格式:', response);
            resolve(text);
          }
        } catch (e) {
          console.error('❌ 解析响应失败:', e);
          resolve(text);
        }
      });
    });

    req.on('error', (e) => {
      console.error('❌ 请求失败:', e);
      resolve(text); // 请求失败时返回原文
    });

    req.write(payload);
    req.end();
  });
}

// 处理单个文件
async function processFile(filePath) {
  console.log(`\n📄 处理文件: ${filePath}`);
  
  let content = fs.readFileSync(filePath, 'utf8');
  let hasChanges = false;

  // 处理每个字段模式
  for (const [fieldName, pattern] of Object.entries(FIELD_PATTERNS)) {
    let match;
    const globalPattern = new RegExp(pattern.source, 'g');
    
    while ((match = globalPattern.exec(content)) !== null) {
      const fullMatch = match[0];
      const originalText = match[1];
      
      if (containsJapanese(originalText)) {
        console.log(`\n🎯 发现 ${fieldName} 字段需要翻译:`);
        console.log(`   原文: ${originalText}`);
        
        const translatedText = await translateText(originalText);
        
        if (translatedText !== originalText) {
          const newMatch = fullMatch.replace(originalText, translatedText);
          content = content.replace(fullMatch, newMatch);
          hasChanges = true;
          console.log(`   译文: ${translatedText}`);
          
          // 添加延迟避免API限制
          await new Promise(resolve => setTimeout(resolve, 200));
        }
      }
    }
  }

  // 如果有变更，保存文件
  if (hasChanges) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ 文件已更新: ${filePath}`);
    return true;
  } else {
    console.log(`ℹ️ 文件无需更新: ${filePath}`);
    return false;
  }
}

// 扫描四层页面文件
function findFourthLayerPages() {
  const appDir = './app';
  const fourthLayerPages = [];

  function scanDirectory(dir) {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // 递归扫描子目录
        scanDirectory(fullPath);
      } else if (item === 'page.tsx') {
        // 检查是否为四层页面（路径中有4个斜杠）
        const pathParts = fullPath.split(path.sep);
        if (pathParts.length >= 5) { // app/region/type/activity/page.tsx
          fourthLayerPages.push(fullPath);
        }
      }
    }
  }

  scanDirectory(appDir);
  return fourthLayerPages;
}

// 主执行函数
async function main() {
  console.log('🚀 开始四层页面翻译任务');
  console.log('=' .repeat(50));

  // 检查API密钥
  if (!TENCENT_SECRET_ID || !TENCENT_SECRET_KEY) {
    console.error('❌ 缺少腾讯云API密钥，请检查 .env.local 文件');
    process.exit(1);
  }

  // 查找所有四层页面
  const fourthLayerPages = findFourthLayerPages();
  console.log(`📊 找到 ${fourthLayerPages.length} 个四层页面:`);
  fourthLayerPages.forEach((page, index) => {
    console.log(`   ${index + 1}. ${page}`);
  });

  if (fourthLayerPages.length === 0) {
    console.log('ℹ️ 没有找到四层页面文件');
    return;
  }

  console.log('\n🔄 开始翻译处理...');
  
  let processedCount = 0;
  let translatedCount = 0;

  for (const filePath of fourthLayerPages) {
    try {
      const hasChanges = await processFile(filePath);
      processedCount++;
      if (hasChanges) {
        translatedCount++;
      }
      
      // 进度显示
      console.log(`\n📈 进度: ${processedCount}/${fourthLayerPages.length} (${Math.round(processedCount/fourthLayerPages.length*100)}%)`);
      
    } catch (error) {
      console.error(`❌ 处理文件失败: ${filePath}`, error);
    }
  }

  console.log('\n' + '=' .repeat(50));
  console.log('🎉 翻译任务完成!');
  console.log(`📊 统计信息:`);
  console.log(`   - 处理文件: ${processedCount}/${fourthLayerPages.length}`);
  console.log(`   - 翻译更新: ${translatedCount} 个文件`);
  console.log(`   - 跳过文件: ${processedCount - translatedCount} 个文件`);
}

// 启动脚本
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { translateText, processFile, findFourthLayerPages }; 