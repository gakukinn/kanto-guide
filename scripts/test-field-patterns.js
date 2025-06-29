const fs = require('fs');

// 读取测试页面文件
const content = fs.readFileSync('app/chiba/hanabi/activity--02093905/page.tsx', 'utf8');

// 字段模式
const fieldPatterns = {
    name: /name\s*[:：]\s*["']([^"']+)["']/,
    venue: /venue\s*[:：]\s*["']([^"']+)["']/,
    access: /access\s*[:：]\s*["']([^"']+)["']/,
    description: /description\s*[:：]\s*["']([^"']+)["']/,
    date: /date\s*[:：]\s*["']([^"']+)["']/,
    time: /time\s*[:：]\s*["']([^"']+)["']/
};

console.log('🔍 字段匹配测试:');
console.log('================');

for (const [fieldName, pattern] of Object.entries(fieldPatterns)) {
    const matches = content.match(pattern);
    if (matches) {
        const text = matches[1];
        const containsJapanese = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(text);
        console.log(`✅ ${fieldName}: ${containsJapanese ? '🇯🇵' : '🌍'} "${text.substring(0, 60)}${text.length > 60 ? '...' : ''}"`);
    } else {
        console.log(`❌ ${fieldName}: 未匹配`);
    }
}

console.log('\n📄 文件前200字符预览:');
console.log(content.substring(0, 200) + '...'); 