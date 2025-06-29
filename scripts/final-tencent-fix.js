const crypto = require('crypto');
const https = require('https');
require('dotenv').config({ path: '.env.local' });

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
    console.log('\n🔧 最终修复版 - 腾讯云翻译API');
    console.log('📝 文本:', text);
    
    const endpoint = 'tmt.tencentcloudapi.com';
    const service = 'tmt';
    const version = '2018-03-21';
    const action = 'TextTranslate';
    const region = 'ap-beijing';
    const timestamp = Math.floor(Date.now() / 1000);
    const date = getDate(timestamp);

    // 1. 规范请求串
    const httpRequestMethod = 'POST';
    const canonicalUri = '/';
    const canonicalQueryString = '';
    const canonicalHeaders = `content-type:application/json; charset=utf-8\nhost:${endpoint}\nx-tc-action:${action.toLowerCase()}\n`;
    const signedHeaders = 'content-type;host;x-tc-action';
    
    const payload = JSON.stringify({
        SourceText: text,
        Source: 'ja',
        Target: 'zh',
        ProjectId: 0
    });
    
    const hashedRequestPayload = crypto.createHash('sha256').update(payload).digest('hex');
    
    const canonicalRequest = 
        httpRequestMethod + '\n' +
        canonicalUri + '\n' +
        canonicalQueryString + '\n' +
        canonicalHeaders + '\n' +
        signedHeaders + '\n' +
        hashedRequestPayload;

    console.log('📋 规范请求串:');
    console.log(canonicalRequest);

    // 2. 待签名字符串
    const algorithm = 'TC3-HMAC-SHA256';
    const hashedCanonicalRequest = crypto.createHash('sha256').update(canonicalRequest).digest('hex');
    const credentialScope = date + '/' + service + '/' + 'tc3_request';
    const stringToSign = 
        algorithm + '\n' +
        timestamp + '\n' +
        credentialScope + '\n' +
        hashedCanonicalRequest;

    console.log('\n🔐 待签名字符串:');
    console.log(stringToSign);

    // 3. 计算签名
    const secretDate = sha256(date, 'TC3' + SECRET_KEY);
    const secretService = sha256(service, secretDate);
    const secretSigning = sha256('tc3_request', secretService);
    const signature = sha256(stringToSign, secretSigning);

    console.log('\n✍️ 签名结果:', signature);

    // 4. 构建Authorization
    const authorization = 
        algorithm + ' ' +
        'Credential=' + SECRET_ID + '/' + credentialScope + ', ' +
        'SignedHeaders=' + signedHeaders + ', ' +
        'Signature=' + signature;

    console.log('\n🔑 Authorization:', authorization);

    // 5. 发送请求
    const headers = {
        'Authorization': authorization,
        'Content-Type': 'application/json; charset=utf-8',
        'Host': endpoint,
        'X-TC-Action': action,
        'X-TC-Timestamp': timestamp.toString(),
        'X-TC-Version': version,
        'X-TC-Region': region
    };

    console.log('\n📤 请求头:', JSON.stringify(headers, null, 2));

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
                console.log('\n📥 响应状态:', res.statusCode);
                console.log('📄 响应内容:', data);
                
                try {
                    const result = JSON.parse(data);
                    if (result.Response && result.Response.Error) {
                        reject(new Error(`API错误: ${result.Response.Error.Code} - ${result.Response.Error.Message}`));
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
        console.log('🎯 翻译结果:', result);
    })
    .catch(error => {
        console.error('\n❌ 翻译失败:', error.message);
    }); 