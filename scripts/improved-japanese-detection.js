const fs = require('fs');

// 读取翻译后的文件
const content = fs.readFileSync('app/chiba/hanabi/activity--02093905/page.tsx', 'utf8');

console.log('🔍 改进的日文检测...\n');

// 改进的日文检测函数
function containsJapanese(text) {
    // 检测平假名和片假名（这些是日文特有的）
    const hiraganaKatakana = /[\u3040-\u309F\u30A0-\u30FF]/;
    
    // 日文特有的汉字模式
    const japaneseSpecificPatterns = [
        /[々]/,  // 日文重复符号
        /[ヶ]/,  // 日文片假名小字符
        /(?:駅|町|丁目|番地)/,  // 日文地址常用词
        /(?:～|〜)/,  // 日文波浪号
        /(?:※)/,   // 日文注意符号
        /(?:年|月|日)(?:[\u3040-\u309F])/,  // 日期后跟平假名
    ];
    
    // 如果包含平假名/片假名，肯定是日文
    if (hiraganaKatakana.test(text)) {
        return true;
    }
    
    // 检查日文特有模式
    for (const pattern of japaneseSpecificPatterns) {
        if (pattern.test(text)) {
            return true;
        }
    }
    
    return false;
}

// 字段模式
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

console.log('📊 改进的字段检测:');
console.log('==================');

let totalFields = 0;
let stillJapanese = 0;
let translated = 0;

for (const [fieldName, pattern] of Object.entries(fieldPatterns)) {
    const matches = content.match(pattern);
    if (matches) {
        totalFields++;
        const text = matches[1];
        const isJapanese = containsJapanese(text);
        
        if (isJapanese) {
            stillJapanese++;
            console.log(`🇯🇵 ${fieldName}: "${text.substring(0, 50)}..."`);
        } else {
            translated++;
            console.log(`🇨🇳 ${fieldName}: "${text.substring(0, 50)}..."`);
        }
    }
}

console.log('\n📈 改进后的统计:');
console.log(`   总字段数: ${totalFields}`);
console.log(`   仍为日文: ${stillJapanese}`);
console.log(`   已翻译: ${translated}`);

if (translated > 0) {
    console.log(`\n🎉 翻译成功率: ${Math.round(translated/totalFields*100)}%`);
} 