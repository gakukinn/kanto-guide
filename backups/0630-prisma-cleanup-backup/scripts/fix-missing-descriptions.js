const fs = require('fs');
const path = require('path');

/**
 * 为缺少 description 字段的页面添加 description
 */

// 需要修复的页面列表（从验证脚本结果中提取）
const PAGES_TO_FIX = [
    'app/tokyo/matsuri/matsuri-event/page.tsx',
    'app/tokyo/matsuri/shinbashi-koichi-matsuri/page.tsx',
    'app/saitama/hanabi/cmc6i2q6v0001vlb8gi98ti64/page.tsx',
    'app/saitama/matsuri/matsuri-event/page.tsx',
    'app/chiba/hanabi/cmc6ikzpn0001vlmol9eaq5g1/page.tsx',
    'app/chiba/matsuri/activity-4192nera/page.tsx',
    'app/chiba/matsuri/matsuri-event/page.tsx',
    'app/chiba/hanami/activity-1zwu3leu/page.tsx',
    'app/chiba/hanami/水郷佐原祭-1zwu3leu/page.tsx',
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

console.log('🔧 开始为缺少 description 字段的页面添加描述...\n');

function extractActivityName(content) {
    // 尝试从注释中提取活动名称
    const nameMatch = content.match(/\* 名称: ([^\n\r]*)/);
    if (nameMatch) {
        return nameMatch[1].trim();
    }
    
    // 从 name 字段提取
    const nameFieldMatch = content.match(/name:\s*"([^"]*)",?/);
    if (nameFieldMatch) {
        return nameFieldMatch[1].trim();
    }
    
    return '';
}

function generateDescription(activityName, filePath) {
    if (!activityName) {
        // 从文件路径推断活动类型
        if (filePath.includes('hanabi')) {
            return '精彩的花火大会活动现场照片。';
        } else if (filePath.includes('matsuri')) {
            return '传统的祭典活动现场照片。';
        } else if (filePath.includes('hanami')) {
            return '美丽的赏花活动现场照片。';
        } else if (filePath.includes('culture')) {
            return '丰富的文化活动现场照片。';
        }
        return '精彩的活动现场照片。';
    }
    
    return `${activityName}的现场照片，记录了活动的精彩瞬间。`;
}

function fixFile(filePath) {
    try {
        if (!fs.existsSync(filePath)) {
            console.log(`❌ 文件不存在: ${filePath}`);
            errorCount++;
            return;
        }
        
        const content = fs.readFileSync(filePath, 'utf8');
        
        // 检查是否已经有 description 字段
        if (content.includes('description:') && !content.match(/description:\s*"",?/)) {
            console.log(`✅ ${filePath} - 已有 description 字段`);
            return;
        }
        
        // 提取活动名称
        const activityName = extractActivityName(content);
        const description = generateDescription(activityName, filePath);
        
        let newContent;
        
        if (content.includes('description: "",')) {
            // 替换空的 description
            newContent = content.replace(
                /description:\s*"",?/,
                `description: "${description}",`
            );
        } else if (content.includes('description:')) {
            // 已有 description 但可能格式不对
            newContent = content.replace(
                /description:\s*"[^"]*",?/,
                `description: "${description}",`
            );
        } else {
            // 添加 description 字段（在 name 字段后面）
            newContent = content.replace(
                /(name:\s*"[^"]*",?)/,
                `$1\n  description: "${description}",`
            );
        }
        
        if (newContent !== content) {
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log(`✅ ${filePath} - 已添加 description: "${description}"`);
            fixedCount++;
        } else {
            console.log(`⚠️  ${filePath} - 无需修改`);
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
    console.log('\n🎉 修复完成！所有页面现在都应该有 description 字段了。');
} else {
    console.log('\n✅ 所有页面都已经有 description 字段。');
} 