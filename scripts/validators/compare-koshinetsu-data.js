import fs from 'fs';

// 现有三层页面的花火活动（从page.tsx提取）
const existingEvents = [
    'kawaguchiko-kojosai-2025', // 河口湖湖上祭
    'ichikawa-shinmei-hanabi-2024', // 市川三郷町ふるさと夏まつり　第37回「神明の花火大会」
    'gion-kashiwazaki-matsuri-hanabi', // ぎおん柏崎まつり 海の大花火大会
    'nagaoka-matsuri-hanabi', // 長岡まつり大花火大会
    'nagano-ebisukou-hanabi-2025', // 第119回 長野えびす講煙火大会
    'niigata-matsuri-hanabi-2025', // 新潟まつり花火大会
    'agano-gozareya-hanabi-2025', // 第51回 阿賀野川ござれや花火
    'ojiya-matsuri-hanabi-2024', // おぢやまつり大花火大会2024
    'yamanakako-houkosai-hanabi', // 山中湖「報湖祭」花火大会
    'chikuma-chikumagawa-hanabi', // 第94回 信州千曲市千曲川納涼煙火大会
    'shinsaku-hanabi-2025', // 全国新作花火チャレンジカップ2025
    'asahara-jinja-aki-hanabi' // 浅原神社 秋季例大祭奉納大煙火
];

// 新获取的花火活动（从WalkerPlus Launch页面）
const newEvents = [
    '長岡まつり大花火大会',
    '市川三郷町ふるさと夏まつり　第37回「神明の花火大会」',
    'ぎおん柏崎まつり 海の大花火大会',
    'アニメクラシックス アニソン花火',
    '山中湖「報湖祭」花火大会',
    '河口湖湖上祭',
    '第61回 石和温泉花火大会',
    '第119回 長野えびす講煙火大会',
    '第41回 咲花温泉水中花火大会',
    'まき夏まつり 花火大会',
    '長岡花火ローズファンタジー',
    '新潟まつり花火大会'
];

// 现有活动的完整名称映射
const existingEventNames = {
    'kawaguchiko-kojosai-2025': '河口湖湖上祭',
    'ichikawa-shinmei-hanabi-2024': '市川三郷町ふるさと夏まつり　第37回「神明の花火大会」',
    'gion-kashiwazaki-matsuri-hanabi': 'ぎおん柏崎まつり 海の大花火大会',
    'nagaoka-matsuri-hanabi': '長岡まつり大花火大会',
    'nagano-ebisukou-hanabi-2025': '第119回 長野えびす講煙火大会',
    'niigata-matsuri-hanabi-2025': '新潟まつり花火大会',
    'agano-gozareya-hanabi-2025': '第51回 阿賀野川ござれや花火',
    'ojiya-matsuri-hanabi-2024': 'おぢやまつり大花火大会2024',
    'yamanakako-houkosai-hanabi': '山中湖「報湖祭」花火大会',
    'chikuma-chikumagawa-hanabi': '第94回 信州千曲市千曲川納涼煙火大会',
    'shinsaku-hanabi-2025': '全国新作花火チャレンジカップ2025',
    'asahara-jinja-aki-hanabi': '浅原神社 秋季例大祭奉納大煙火'
};

console.log('🔍 甲信越花火大会数据对比分析');
console.log('='.repeat(60));

console.log('\n📊 数据统计:');
console.log(`- 现有三层页面活动数: ${existingEvents.length} 个`);
console.log(`- 新获取WalkerPlus活动数: ${newEvents.length} 个`);

// 找出现有活动的名称列表
const existingNames = existingEvents.map(id => existingEventNames[id]);

// 找出新获取数据中缺少的重要活动（现有但新数据中没有的）
const missingInNew = existingNames.filter(name => !newEvents.includes(name));

// 找出新数据中多余的活动（新数据有但现有没有的）
const extraInNew = newEvents.filter(name => !existingNames.includes(name));

// 找出共同的活动
const commonEvents = existingNames.filter(name => newEvents.includes(name));

console.log('\n❌ 新获取数据中遗漏的重要花火活动:');
if (missingInNew.length === 0) {
    console.log('   ✅ 无遗漏，所有现有活动都在新数据中找到了');
} else {
    missingInNew.forEach((name, index) => {
        console.log(`   ${index + 1}. ${name}`);
    });
}

console.log('\n➕ 新获取数据中多余的花火活动（现有页面没有的）:');
if (extraInNew.length === 0) {
    console.log('   ✅ 无多余活动，新数据完全匹配现有页面');
} else {
    extraInNew.forEach((name, index) => {
        console.log(`   ${index + 1}. ${name}`);
    });
}

console.log('\n✅ 共同的花火活动（两边都有的）:');
commonEvents.forEach((name, index) => {
    console.log(`   ${index + 1}. ${name}`);
});

console.log('\n📈 对比结果统计:');
console.log(`- 共同活动: ${commonEvents.length} 个`);
console.log(`- 遗漏活动: ${missingInNew.length} 个`);
console.log(`- 多余活动: ${extraInNew.length} 个`);
console.log(`- 匹配率: ${Math.round(commonEvents.length / existingEvents.length * 100)}%`);

console.log('\n🔍 详细分析:');
if (missingInNew.length > 0) {
    console.log('\n⚠️ 遗漏的重要活动分析:');
    missingInNew.forEach(name => {
        const id = Object.keys(existingEventNames).find(key => existingEventNames[key] === name);
        console.log(`   - ${name} (ID: ${id})`);
        console.log(`     这是现有页面的重要活动，但在WalkerPlus Launch页面中未找到`);
    });
}

if (extraInNew.length > 0) {
    console.log('\n📝 多余活动分析:');
    extraInNew.forEach(name => {
        console.log(`   - ${name}`);
        console.log(`     这是WalkerPlus Launch页面的活动，但现有页面中没有`);
    });
}

console.log('\n💡 建议:');
if (missingInNew.length > 0) {
    console.log(`- 需要关注 ${missingInNew.length} 个遗漏的重要活动`);
    console.log('- 这些活动在现有页面中存在，可能需要在WalkerPlus中查找或确认状态');
}
if (extraInNew.length > 0) {
    console.log(`- 发现 ${extraInNew.length} 个新的花火活动`);
    console.log('- 这些活动可能是值得添加到现有页面的新发现');
}

console.log('\n🔒 注意事项:');
console.log('- 本对比仅分析信息差异，不进行任何删除或添加操作');
console.log('- 缺少的活动列表等待用户指令后再进行添加');
console.log('- 所有数据均来自官方WalkerPlus网站，确保真实性'); 