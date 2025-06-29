const fs = require('fs');
const path = require('path');

/**
 * 删除所有错误的图片描述，保留真正的活动描述
 * 问题：之前的脚本错误地将图片描述当作了活动描述
 * 解决：删除这些图片描述，让页面使用数据库中的真实活动描述
 */

// 需要检查的目录
const REGIONS = ['tokyo', 'saitama', 'chiba', 'kanagawa', 'kitakanto', 'koshinetsu'];
const ACTIVITY_TYPES = ['hanabi', 'matsuri', 'hanami', 'momiji', 'illumination', 'culture'];

let totalFiles = 0;
let fixedFiles = 0;
let errorFiles = 0;

console.log('🧹 开始删除错误的图片描述，保留真正的活动描述...\n');

// 识别图片描述的模式（这些都是错误添加的）
const IMAGE_DESCRIPTION_PATTERNS = [
    /的现场照片/,
    /现场照片/,
    /活动现场照片/,
    /精彩的.*活动现场照片/,
    /美丽的.*活动现场照片/,
    /传统的.*活动现场照片/,
    /丰富的.*活动现场照片/,
    /记录了活动的精彩瞬间/,
    /精彩的花火大会活动现场照片/,
    /传统的祭典活动现场照片/,
    /美丽的赏花活动现场照片/,
    /丰富的文化活动现场照片/,
    /精彩的活动现场照片/
];

function isImageDescription(description) {
    if (!description) return false;
    return IMAGE_DESCRIPTION_PATTERNS.some(pattern => pattern.test(description));
}

function fixFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        
        // 查找 description 字段
        const descMatch = content.match(/description:\s*"([^"]*)",?/);
        
        if (!descMatch) {
            console.log(`⚪ ${filePath} - 没有 description 字段`);
            return;
        }
        
        const currentDescription = descMatch[1];
        
        // 检查是否是图片描述
        if (isImageDescription(currentDescription)) {
            // 删除图片描述，设置为空字符串
            const newContent = content.replace(
                /description:\s*"[^"]*",?/,
                'description: "",'
            );
            
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log(`✅ ${filePath} - 已删除图片描述: "${currentDescription}"`);
            fixedFiles++;
        } else if (currentDescription.trim() === '') {
            console.log(`⚪ ${filePath} - description 已为空`);
        } else {
            console.log(`✅ ${filePath} - 保留活动描述: "${currentDescription}"`);
        }
        
    } catch (error) {
        console.log(`❌ 处理失败: ${filePath} - ${error.message}`);
        errorFiles++;
    }
}

// 遍历所有页面文件
for (const region of REGIONS) {
    for (const activityType of ACTIVITY_TYPES) {
        const dirPath = path.join('app', region, activityType);
        
        if (!fs.existsSync(dirPath)) {
            continue;
        }
        
        const activities = fs.readdirSync(dirPath);
        
        for (const activity of activities) {
            const activityPath = path.join(dirPath, activity);
            const pagePath = path.join(activityPath, 'page.tsx');
            
            if (fs.existsSync(pagePath) && fs.statSync(activityPath).isDirectory()) {
                totalFiles++;
                fixFile(pagePath);
            }
        }
    }
}

console.log('\n📊 处理结果:');
console.log(`总文件数: ${totalFiles}`);
console.log(`已删除图片描述: ${fixedFiles}`);
console.log(`处理失败: ${errorFiles}`);
console.log(`保留真实描述: ${totalFiles - fixedFiles - errorFiles}`);

if (fixedFiles > 0) {
    console.log('\n🎉 清理完成！现在页面将使用数据库中的真实活动描述。');
    console.log('💡 如果数据库中的 description 字段为空，页面将不显示描述部分。');
} else {
    console.log('\n✅ 没有发现需要删除的图片描述。');
} 