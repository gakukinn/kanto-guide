const fs = require('fs');

// 读取翻译后的文件
const content = fs.readFileSync('app/chiba/hanabi/activity--02093905/page.tsx', 'utf8');

console.log('🔍 检查翻译结果...\n');

// 字段模式 - JSON双引号格式
const fieldPatterns = {
    name: /"name"\s*:\s*"([^"]+)"/,
    venue: /"venue"\s*:\s*"([^"]+)"/,
    access: /"access"\s*:\s*"([^"]+)"/,
    date: /"date"\s*:\s*"([^"]+)"/,
    time: /"time"\s*:\s*"([^"]+)"/,
    description: /"description"\s*:\s*"([^"]+)"/,
    price: /"price"\s*:\s*"([^"]+)"/,
    contact: /"contact"\s*:\s*"([^"]+)"/,
    notes: /"notes"\s*:\s*"([^"]+)"/,
    weatherInfo: /"weatherInfo"\s*:\s*"([^"]+)"/,
    parking: /"parking"\s*:\s*"([^"]+)"/
};

// 日文检测函数
function containsJapanese(text) {
    return /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(text);
}

console.log('📊 字段翻译状态:');
console.log('==================');

let totalFields = 0;
let japaneseFields = 0;
let translatedFields = 0;

for (const [fieldName, pattern] of Object.entries(fieldPatterns)) {
    const matches = content.match(pattern);
    if (matches) {
        totalFields++;
        const text = matches[1];
        const hasJapanese = containsJapanese(text);
        
        if (hasJapanese) {
            japaneseFields++;
            console.log(`🇯🇵 ${fieldName}: "${text.substring(0, 50)}..."`);
        } else {
            translatedFields++;
            console.log(`🇨🇳 ${fieldName}: "${text.substring(0, 50)}..."`);
        }
    }
}

console.log('\n📈 统计结果:');
console.log(`   总字段数: ${totalFields}`);
console.log(`   仍为日文: ${japaneseFields}`);
console.log(`   已翻译: ${translatedFields}`);

if (japaneseFields > 0) {
    console.log('\n⚠️  发现未翻译的日文字段，需要检查翻译逻辑');
} 