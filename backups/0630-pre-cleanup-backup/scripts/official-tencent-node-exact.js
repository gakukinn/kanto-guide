const crypto = require('crypto');
require('dotenv').config({ path: '.env.local' });

// 腾讯云官方NodeJS示例代码实现
function sha256(message, secret = '', encoding) {
    const hmac = crypto.createHmac('sha256', secret)
    return hmac.update(message).digest(encoding)
}

function getHash(message, encoding = 'hex') {
    const hash = crypto.createHash('sha256')
    return hash.update(message).digest(encoding)
}

function getDate(timestamp) {
    const date = new Date(timestamp * 1000)
    const year = date.getUTCFullYear()
    const month = ('0' + (date.getUTCMonth() + 1)).slice(-2)
    const day = ('0' + date.getUTCDate()).slice(-2)
    return `${year}-${month}-${day}`
}

function main(){
    console.log('🔧 严格按照官方NodeJS示例实现机器翻译API');
    
    // 密钥参数 - 修改为我们的参数
    const SECRET_ID = process.env.TENCENT_SECRET_ID
    const SECRET_KEY = process.env.TENCENT_SECRET_KEY

    // 修改为机器翻译的参数
    const endpoint = "tmt.tencentcloudapi.com"
    const service = "tmt"
    const region = "ap-shanghai"
    const action = "TextTranslate"
    const version = "2018-03-21"
    const timestamp = Math.floor(Date.now() / 1000)
    
    //时间处理, 获取世界时间日期
    const date = getDate(timestamp)

    // ************* 步骤 1：拼接规范请求串 *************
    // 修改为我们的翻译参数
    const payload = JSON.stringify({
        "SourceText": "東京高円寺阿波おどり",
        "Source": "ja",
        "Target": "zh",
        "ProjectId": 0
    })

    const hashedRequestPayload = getHash(payload);
    const httpRequestMethod = "POST"
    const canonicalUri = "/"
    const canonicalQueryString = ""
    const canonicalHeaders = "content-type:application/json; charset=utf-8\n"
        + "host:" + endpoint + "\n"
        + "x-tc-action:" + action.toLowerCase() + "\n"
    const signedHeaders = "content-type;host;x-tc-action"

    const canonicalRequest = httpRequestMethod + "\n"
                         + canonicalUri + "\n"
                         + canonicalQueryString + "\n"
                         + canonicalHeaders + "\n"
                         + signedHeaders + "\n"
                         + hashedRequestPayload
    console.log("规范请求串:")
    console.log(canonicalRequest)

    // ************* 步骤 2：拼接待签名字符串 *************
    const algorithm = "TC3-HMAC-SHA256"
    const hashedCanonicalRequest = getHash(canonicalRequest);
    const credentialScope = date + "/" + service + "/" + "tc3_request"
    const stringToSign = algorithm + "\n" +
                    timestamp + "\n" +
                    credentialScope + "\n" +
                    hashedCanonicalRequest
    console.log("待签名字符串:")
    console.log(stringToSign)

    // ************* 步骤 3：计算签名 *************
    const kDate = sha256(date, 'TC3' + SECRET_KEY)
    const kService = sha256(service, kDate)
    const kSigning = sha256('tc3_request', kService)
    const signature = sha256(stringToSign, kSigning, 'hex')
    console.log("签名:")
    console.log(signature)

    // ************* 步骤 4：拼接 Authorization *************
    const authorization = algorithm + " " +
                    "Credential=" + SECRET_ID + "/" + credentialScope + ", " +
                    "SignedHeaders=" + signedHeaders + ", " +
                    "Signature=" + signature
    console.log("Authorization:")
    console.log(authorization)

    // 发起实际请求
    const https = require('https');
    const postData = payload;
    
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
            'X-TC-Region': region,
            'Content-Length': Buffer.byteLength(postData)
        }
    };

    console.log('\n🚀 发起请求...');
    const req = https.request(options, (res) => {
        console.log(`状态码: ${res.statusCode}`);
        console.log(`响应头: ${JSON.stringify(res.headers)}`);
        
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        
        res.on('end', () => {
            console.log('响应内容:');
            try {
                const response = JSON.parse(data);
                console.log(JSON.stringify(response, null, 2));
                
                if (response.Response && response.Response.TargetText) {
                    console.log('\n✅ 翻译成功!');
                    console.log(`原文: 東京高円寺阿波おどり`);
                    console.log(`译文: ${response.Response.TargetText}`);
                }
            } catch (e) {
                console.log('原始响应:', data);
            }
        });
    });

    req.on('error', (e) => {
        console.error(`请求出错: ${e.message}`);
    });

    req.write(postData);
    req.end();
}

main() 