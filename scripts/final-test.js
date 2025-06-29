const crypto = require('crypto');
const https = require('https');
require('dotenv').config({ path: '.env.local' });
const { findPageFiles } = require('./translate-all-pages-working.js');

const SECRET_ID = process.env.TENCENT_SECRET_ID;
const SECRET_KEY = process.env.TENCENT_SECRET_KEY;

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
    console.log('\n🔧 最终测试 - 使用当前系统时间');
    console.log('📝 文本:', text);
    
    // 使用当前系统时间
    const timestamp = Math.floor(Date.now() / 1000);
    
    const endpoint = 'tmt.tencentcloudapi.com';
    const service = 'tmt';
    const version = '2018-03-21';
    const action = 'TextTranslate';
    const region = 'ap-beijing';
    const date = getDate(timestamp);

    console.log('📅 时间戳:', timestamp, '(' + new Date(timestamp * 1000).toUTCString() + ')');

    // 构建请求
    const payload = JSON.stringify({
        SourceText: text,
        Source: 'ja',
        Target: 'zh',
        ProjectId: 0
    });
    
    const canonicalHeaders = `content-type:application/json; charset=utf-8\nhost:${endpoint}\nx-tc-action:${action.toLowerCase()}\n`;
    const signedHeaders = 'content-type;host;x-tc-action';
    const hashedRequestPayload = crypto.createHash('sha256').update(payload).digest('hex');
    
    const canonicalRequest = 
        'POST\n' +
        '/\n' +
        '\n' +
        canonicalHeaders +
        signedHeaders + '\n' +
        hashedRequestPayload;

    const algorithm = 'TC3-HMAC-SHA256';
    const hashedCanonicalRequest = crypto.createHash('sha256').update(canonicalRequest).digest('hex');
    const credentialScope = date + '/' + service + '/' + 'tc3_request';
    const stringToSign = 
        algorithm + '\n' +
        timestamp + '\n' +
        credentialScope + '\n' +
        hashedCanonicalRequest;

    const secretDate = sha256(date, 'TC3' + SECRET_KEY);
    const secretService = sha256(service, secretDate);
    const secretSigning = sha256('tc3_request', secretService);
    const signature = sha256(stringToSign, secretSigning);

    const authorization = 
        algorithm + ' ' +
        'Credential=' + SECRET_ID + '/' + credentialScope + ', ' +
        'SignedHeaders=' + signedHeaders + ', ' +
        'Signature=' + signature;

    const headers = {
        'Authorization': authorization,
        'Content-Type': 'application/json; charset=utf-8',
        'Host': endpoint,
        'X-TC-Action': action,
        'X-TC-Timestamp': timestamp.toString(),
        'X-TC-Version': version,
        'X-TC-Region': region
    };

    console.log('🔑 签名:', signature.substring(0, 20) + '...');

    return new Promise((resolve, reject) => {
        const req = https.request({
            hostname: endpoint,
            port: 443,
            path: '/',
            method: 'POST',
            headers: headers
        }, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                console.log('\n📥 状态码:', res.statusCode);
                console.log('📄 响应:', data);
                
                try {
                    const result = JSON.parse(data);
                    if (result.Response && result.Response.Error) {
                        reject(new Error(`${result.Response.Error.Code}: ${result.Response.Error.Message}`));
                    } else if (result.Response && result.Response.TargetText) {
                        resolve(result.Response.TargetText);
                    } else {
                        reject(new Error('未知响应格式'));
                    }
                } catch (e) {
                    reject(new Error('响应解析失败: ' + e.message));
                }
            });
        });

        req.on('error', (e) => {
            console.error('❌ 请求错误:', e.message);
            reject(e);
        });

        req.write(payload);
        req.end();
    });
}

// 测试
tencentTranslate('東京高円寺阿波おどり')
    .then(result => {
        console.log('\n✅ 翻译成功!');
        console.log('🎯 结果:', result);
    })
    .catch(error => {
        console.error('\n❌ 失败:', error.message);
    });

console.log('📊 最终页面统计确认');
console.log('===================');

const allPages = findPageFiles();

console.log(`总页面数: ${allPages.length}`);
console.log(`已测试: 5个页面`);
console.log(`剩余未翻译: ${allPages.length - 5}个页面`);
console.log('');

console.log('✅ 确认：这些都是四层页面');
console.log('路径格式：app/地区/活动类型/具体活动/page.tsx');
console.log('');

console.log('📋 页面分布示例：');
allPages.slice(0, 10).forEach((file, i) => {
  const relativePath = file.replace(process.cwd(), '.');
  console.log(`  ${i+1}. ${relativePath}`);
});

if (allPages.length > 10) {
  console.log(`  ... 还有 ${allPages.length - 10} 个页面`);
}

console.log('');
console.log('🎯 翻译范围确认：');
console.log('• ✅ 只翻译四层页面文件 (page.tsx)');
console.log('• ❌ 不翻译首页、二层、三层页面');
console.log('• ❌ 不翻译JSON配置文件');
console.log('• ❌ 不翻译其他系统文件'); 