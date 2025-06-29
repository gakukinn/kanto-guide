const fs = require('fs');

// 读取文件内容
const content = fs.readFileSync('app/chiba/hanabi/activity--02093905/page.tsx', 'utf8');

console.log('🔍 查找字段格式...\n');

// 查找包含 "name" 的行
const nameLines = content.split('\n').filter(line => line.includes('name') && line.includes(':')).slice(0, 3);
console.log('📝 name字段格式:');
nameLines.forEach(line => console.log(`   ${line.trim()}`));

console.log('\n📝 venue字段格式:');
const venueLines = content.split('\n').filter(line => line.includes('venue') && line.includes(':')).slice(0, 3);
venueLines.forEach(line => console.log(`   ${line.trim()}`));

console.log('\n📝 access字段格式:');
const accessLines = content.split('\n').filter(line => line.includes('access') && line.includes(':')).slice(0, 3);
accessLines.forEach(line => console.log(`   ${line.trim()}`));

console.log('\n📝 description字段格式:');
const descLines = content.split('\n').filter(line => line.includes('description') && line.includes(':')).slice(0, 3);
descLines.forEach(line => console.log(`   ${line.trim()}`));

console.log('\n🔤 测试新的正则模式:');

// 测试新的模式 - JSON双引号格式
const newPatterns = {
    name: /"name"\s*:\s*"([^"]+)"/,
    venue: /"venue"\s*:\s*"([^"]+)"/,
    access: /"access"\s*:\s*"([^"]+)"/,
    description: /"description"\s*:\s*"([^"]+)"/
};

for (const [fieldName, pattern] of Object.entries(newPatterns)) {
    const matches = content.match(pattern);
    if (matches) {
        const text = matches[1];
        const containsJapanese = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(text);
        console.log(`✅ ${fieldName}: ${containsJapanese ? '🇯🇵' : '🌍'} "${text.substring(0, 40)}${text.length > 40 ? '...' : ''}"`);
    } else {
        console.log(`❌ ${fieldName}: 未匹配`);
    }
} 