const crypto = require('crypto');
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

console.log('🔧 腾讯云签名算法逐步调试');
console.log('================================');

// 基本参数
const timestamp = Math.floor(Date.now() / 1000);
const endpoint = 'tmt.tencentcloudapi.com';
const service = 'tmt';
const version = '2018-03-21';
const action = 'TextTranslate';
const region = 'ap-beijing';
const date = getDate(timestamp);

console.log('📋 基本参数:');
console.log('  时间戳:', timestamp);
console.log('  日期:', date);
console.log('  服务:', service);
console.log('  动作:', action);
console.log('  区域:', region);
console.log('  端点:', endpoint);
console.log();

// 步骤1: 构建请求体
const payload = JSON.stringify({
    SourceText: '東京高円寺阿波おどり',
    Source: 'ja',
    Target: 'zh',
    ProjectId: 0
});

console.log('🔸 步骤1: 请求体');
console.log('  原始payload:', payload);
console.log('  payload长度:', payload.length);

const hashedRequestPayload = crypto.createHash('sha256').update(payload).digest('hex');
console.log('  payload hash:', hashedRequestPayload);
console.log();

// 步骤2: 构建规范请求
const httpRequestMethod = 'POST';
const canonicalUri = '/';
const canonicalQueryString = '';

console.log('🔸 步骤2: 规范请求构建');
console.log('  HTTP方法:', httpRequestMethod);
console.log('  URI:', canonicalUri);
console.log('  查询字符串:', canonicalQueryString || '(空)');

// 重要：检查请求头的构建
const canonicalHeaders = `content-type:application/json; charset=utf-8\nhost:${endpoint}\nx-tc-action:${action.toLowerCase()}\n`;
const signedHeaders = 'content-type;host;x-tc-action';

console.log('  规范请求头:');
console.log('    原始:', JSON.stringify(canonicalHeaders));
console.log('    分解:');
console.log('      content-type: application/json; charset=utf-8');
console.log('      host:', endpoint);
console.log('      x-tc-action:', action.toLowerCase());
console.log('  签名头列表:', signedHeaders);

const canonicalRequest = 
    httpRequestMethod + '\n' +
    canonicalUri + '\n' +
    canonicalQueryString + '\n' +
    canonicalHeaders +
    signedHeaders + '\n' +
    hashedRequestPayload;

console.log('  规范请求字符串:');
console.log('    长度:', canonicalRequest.length);
console.log('    内容 (显示换行符):');
console.log('    ', JSON.stringify(canonicalRequest));

const hashedCanonicalRequest = crypto.createHash('sha256').update(canonicalRequest).digest('hex');
console.log('  规范请求hash:', hashedCanonicalRequest);
console.log();

// 步骤3: 构建待签名字符串
const algorithm = 'TC3-HMAC-SHA256';
const credentialScope = date + '/' + service + '/' + 'tc3_request';

console.log('🔸 步骤3: 待签名字符串');
console.log('  算法:', algorithm);
console.log('  凭证范围:', credentialScope);

const stringToSign = 
    algorithm + '\n' +
    timestamp + '\n' +
    credentialScope + '\n' +
    hashedCanonicalRequest;

console.log('  待签名字符串:');
console.log('    长度:', stringToSign.length);
console.log('    内容:', JSON.stringify(stringToSign));
console.log();

// 步骤4: 计算签名
console.log('🔸 步骤4: 签名计算');
console.log('  SECRET_KEY长度:', SECRET_KEY ? SECRET_KEY.length : '未配置');

const secretDate = sha256(date, 'TC3' + SECRET_KEY);
console.log('  secretDate:', secretDate);

const secretService = sha256(service, secretDate);
console.log('  secretService:', secretService);

const secretSigning = sha256('tc3_request', secretService);
console.log('  secretSigning:', secretSigning);

const signature = sha256(stringToSign, secretSigning);
console.log('  最终签名:', signature);
console.log();

// 步骤5: 构建Authorization头
const authorization = 
    algorithm + ' ' +
    'Credential=' + SECRET_ID + '/' + credentialScope + ', ' +
    'SignedHeaders=' + signedHeaders + ', ' +
    'Signature=' + signature;

console.log('🔸 步骤5: Authorization头');
console.log('  完整Authorization:');
console.log('   ', authorization);
console.log();

console.log('🔸 最终请求头:');
const headers = {
    'Authorization': authorization,
    'Content-Type': 'application/json; charset=utf-8',
    'Host': endpoint,
    'X-TC-Action': action,
    'X-TC-Timestamp': timestamp.toString(),
    'X-TC-Version': version,
    'X-TC-Region': region
};

Object.entries(headers).forEach(([key, value]) => {
    console.log(`  ${key}: ${value}`);
});

console.log();
console.log('✅ 签名调试完成，所有参数已输出');
console.log('请检查每个步骤的输出是否符合腾讯云文档要求'); 