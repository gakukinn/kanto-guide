const fs = require('fs');
const path = require('path');

/**
 * 修复动态数据页面的 description 字段
 * 这些页面使用 hanabiData.description，如果为空则需要提供默认值
 */

// 需要修复的页面列表（description字段为空的页面）
const PAGES_TO_FIX = [
    'app/saitama/hanabi/cmc6i2q6v0001vlb8gi98ti64/page.tsx',
    'app/saitama/matsuri/matsuri-event/page.tsx',
    'app/chiba/hanabi/cmc6ikzpn0001vlmol9eaq5g1/page.tsx',
    'app/chiba/matsuri/matsuri-event/page.tsx',
    'app/kanagawa/hanabi/cmc66rwgl0001vl5wjardlbtt/page.tsx',
    'app/kanagawa/matsuri/matsuri-event/page.tsx',
    'app/kanagawa/hanami/hanami-event/page.tsx',
    'app/kitakanto/hanabi/cmc6jod9c0001vlf8083whd0a/page.tsx',
    'app/kitakanto/matsuri/matsuri-event/page.tsx',
    'app/kitakanto/hanami/hanami-event/page.tsx',
    'app/kitakanto/hanami/mito-ajisai-matsuri/page.tsx',
    'app/koshinetsu/hanabi/cmc5g14er0063vllc5jzourr0/page.tsx',
    'app/koshinetsu/matsuri/matsuri-event/page.tsx',
    'app/koshinetsu/hanami/kawaguchiko-herb-festival/page.tsx'
];

let fixedCount = 0;
let errorCount = 0;

console.log('🔧 开始修复动态数据页面的 description 字段...\n');

function getDefaultDescription(filePath) {
    if (filePath.includes('hanabi')) {
        return '精彩的花火大会活动，绚烂的烟花表演不容错过！';
    } else if (filePath.includes('matsuri')) {
        return '传统的祭典活动，体验日本文化的绝佳机会！';
    } else if (filePath.includes('hanami')) {
        return '美丽的赏花活动，感受四季变换的自然之美！';
    } else if (filePath.includes('culture')) {
        return '丰富的文化活动，深入了解当地特色！';
    }
    return '精彩的活动体验，欢迎参与！';
}

function fixFile(filePath) {
    try {
        if (!fs.existsSync(filePath)) {
            console.log(`❌ 文件不存在: ${filePath}`);
            errorCount++;
            return;
        }
        
        const content = fs.readFileSync(filePath, 'utf8');
        const defaultDescription = getDefaultDescription(filePath);
        
        // 查找并替换动态description的模式
        let newContent = content;
        let hasChanges = false;
        
        // 模式1: description: hanabiData.description || `...`
        const pattern1 = /description:\s*hanabiData\.description\s*\|\|\s*`[^`]*`,?/g;
        if (pattern1.test(content)) {
            newContent = newContent.replace(
                pattern1,
                `description: hanabiData.description || "${defaultDescription}",`
            );
            hasChanges = true;
        }
        
        // 模式2: description: data.description || `...`
        const pattern2 = /description:\s*data\.description\s*\|\|\s*`[^`]*`,?/g;
        if (pattern2.test(newContent)) {
            newContent = newContent.replace(
                pattern2,
                `description: data.description || "${defaultDescription}",`
            );
            hasChanges = true;
        }
        
        // 模式3: description: activityData.description || `...`
        const pattern3 = /description:\s*activityData\.description\s*\|\|\s*`[^`]*`,?/g;
        if (pattern3.test(newContent)) {
            newContent = newContent.replace(
                pattern3,
                `description: activityData.description || "${defaultDescription}",`
            );
            hasChanges = true;
        }
        
        // 模式4: description: eventData.description || `...`
        const pattern4 = /description:\s*eventData\.description\s*\|\|\s*`[^`]*`,?/g;
        if (pattern4.test(newContent)) {
            newContent = newContent.replace(
                pattern4,
                `description: eventData.description || "${defaultDescription}",`
            );
            hasChanges = true;
        }
        
        if (hasChanges) {
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log(`✅ ${filePath} - 已更新动态 description 默认值`);
            fixedCount++;
        } else {
            console.log(`⚠️  ${filePath} - 未找到匹配的模式或无需修改`);
        }
        
    } catch (error) {
        console.log(`❌ 修复失败: ${filePath} - ${error.message}`);
        errorCount++;
    }
}

// 修复所有需要处理的页面
for (const filePath of PAGES_TO_FIX) {
    fixFile(filePath);
}

console.log('\n📊 修复结果:');
console.log(`成功修复: ${fixedCount} 个页面`);
console.log(`修复失败: ${errorCount} 个页面`);

if (fixedCount > 0) {
    console.log('\n🎉 修复完成！动态数据页面现在都有默认的 description 值了。');
} else {
    console.log('\n✅ 所有动态数据页面都已经有适当的 description 处理。');
} 