const crypto = require('crypto');
const https = require('https');
require('dotenv').config({ path: '.env.local' });

const SECRET_ID = process.env.TENCENT_SECRET_ID;
const SECRET_KEY = process.env.TENCENT_SECRET_KEY;

// 严格按照官方文档的签名算法
function sha256(message, secret = '') {
    const hmac = crypto.createHmac('sha256', secret);
    return hmac.update(message).digest('hex');
}

function getHash(message, encoding = 'hex') {
    const hash = crypto.createHash('sha256');
    return hash.update(message).digest(encoding);
}

function getDate(timestamp) {
    const date = new Date(timestamp * 1000);
    const year = date.getUTCFullYear();
    const month = ('0' + (date.getUTCMonth() + 1)).slice(-2);
    const day = ('0' + date.getUTCDate()).slice(-2);
    return `${year}-${month}-${day}`;
}

async function tencentTranslate(text) {
    console.log('\n🔧 官方文档标准实现');
    console.log('📝 文本:', text);
    
    // 基本参数（严格按照官方文档）
    const endpoint = 'tmt.tencentcloudapi.com';
    const service = 'tmt';
    const region = 'ap-beijing';
    const action = 'TextTranslate';
    const version = '2018-03-21';
    const timestamp = Math.floor(Date.now() / 1000);
    const date = getDate(timestamp);
    
    console.log('🕒 使用时间戳:', timestamp);
    console.log('📅 使用日期:', date);
    
    // ************* 步骤 1：拼接规范请求串 *************
    const payload = JSON.stringify({
        SourceText: text,
        Source: 'ja',
        Target: 'zh',
        ProjectId: 0
    });
    console.log('📦 请求体:', payload);
    
    const hashedRequestPayload = getHash(payload);
    const httpRequestMethod = 'POST';
    const canonicalUri = '/';
    const canonicalQueryString = '';
    
    // 按字典序排序的规范请求头
    const canonicalHeaders = 'content-type:application/json; charset=utf-8\n' +
                           'host:' + endpoint + '\n' +
                           'x-tc-action:' + action.toLowerCase() + '\n';
    
    const signedHeaders = 'content-type;host;x-tc-action';
    
    const canonicalRequest = httpRequestMethod + '\n' +
                           canonicalUri + '\n' +
                           canonicalQueryString + '\n' +
                           canonicalHeaders + '\n' +
                           signedHeaders + '\n' +
                           hashedRequestPayload;
    
    console.log('📋 规范请求串:');
    console.log(canonicalRequest);
    
    // ************* 步骤 2：拼接待签名字符串 *************
    const algorithm = 'TC3-HMAC-SHA256';
    const hashedCanonicalRequest = getHash(canonicalRequest);
    const credentialScope = date + '/' + service + '/' + 'tc3_request';
    const stringToSign = algorithm + '\n' +
                        timestamp + '\n' +
                        credentialScope + '\n' +
                        hashedCanonicalRequest;
    
    console.log('📝 待签名字符串:');
    console.log(stringToSign);
    
    // ************* 步骤 3：计算签名 *************
    const kDate = sha256(date, 'TC3' + SECRET_KEY);
    const kService = sha256(service, kDate);
    const kSigning = sha256('tc3_request', kService);
    const signature = sha256(stringToSign, kSigning);
    
    console.log('🔐 最终签名:', signature);
    
    // ************* 步骤 4：拼接 Authorization *************
    const authorization = algorithm + ' ' +
                         'Credential=' + SECRET_ID + '/' + credentialScope + ', ' +
                         'SignedHeaders=' + signedHeaders + ', ' +
                         'Signature=' + signature;
    
    console.log('🗝️ Authorization头:');
    console.log(authorization);
    
    // 发送请求
    const options = {
        hostname: endpoint,
        port: 443,
        path: '/',
        method: 'POST',
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
    
    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                console.log('📡 响应状态:', res.statusCode);
                console.log('📋 响应头:', JSON.stringify(res.headers, null, 2));
                console.log('📄 响应内容:', data);
                
                try {
                    const response = JSON.parse(data);
                    if (response.Response && response.Response.Error) {
                        console.log('❌ API错误:', response.Response.Error);
                        reject(new Error(response.Response.Error.Message));
                    } else if (response.Response && response.Response.TargetText) {
                        console.log('✅ 翻译成功:', response.Response.TargetText);
                        resolve(response.Response.TargetText);
                    } else {
                        console.log('🔍 完整响应:', JSON.stringify(response, null, 2));
                        resolve(data);
                    }
                } catch (e) {
                    console.log('⚠️ 响应解析失败:', e.message);
                    resolve(data);
                }
            });
        });
        
        req.on('error', (e) => {
            console.log('❌ 请求错误:', e.message);
            reject(e);
        });
        
        req.write(payload);
        req.end();
    });
}

// 测试翻译
async function main() {
    try {
        const result = await tencentTranslate('東京高円寺阿波おどり');
        console.log('\n🎉 最终结果:', result);
    } catch (error) {
        console.log('\n💥 错误:', error.message);
    }
}

main(); 