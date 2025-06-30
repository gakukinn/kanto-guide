const fs = require('fs');
const path = require('path');

/**
 * 验证页面是否包含 description 字段
 */

// 需要检查的目录
const REGIONS = ['tokyo', 'saitama', 'chiba', 'kanagawa', 'kitakanto', 'koshinetsu'];
const ACTIVITY_TYPES = ['hanabi', 'matsuri', 'hanami', 'momiji', 'illumination', 'culture'];

let totalFiles = 0;
let filesWithDescription = 0;
let filesWithoutDescription = 0;

console.log('🔍 检查页面是否包含 description 字段...\n');

function checkFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        
        // 检查是否包含 description 字段
        const hasDescription = content.includes('description:');
        
        if (hasDescription) {
            // 提取 description 的值
            const descMatch = content.match(/description:\s*"([^"]*)",?/);
            const description = descMatch ? descMatch[1] : '';
            
            if (description.trim() === '') {
                console.log(`❌ ${filePath} - description 字段为空`);
                filesWithoutDescription++;
            } else {
                console.log(`✅ ${filePath} - description: "${description.substring(0, 50)}..."`);
                filesWithDescription++;
            }
        } else {
            console.log(`❌ ${filePath} - 缺少 description 字段`);
            filesWithoutDescription++;
        }
        
        totalFiles++;
    } catch (error) {
        console.log(`❌ 读取文件失败: ${filePath} - ${error.message}`);
    }
}

// 遍历所有区域和活动类型
for (const region of REGIONS) {
    for (const activityType of ACTIVITY_TYPES) {
        const activityDir = path.join('app', region, activityType);
        
        if (fs.existsSync(activityDir)) {
            const subDirs = fs.readdirSync(activityDir, { withFileTypes: true })
                .filter(dirent => dirent.isDirectory())
                .map(dirent => dirent.name);
            
            for (const subDir of subDirs) {
                const pageFile = path.join(activityDir, subDir, 'page.tsx');
                if (fs.existsSync(pageFile)) {
                    checkFile(pageFile);
                }
            }
        }
    }
}

console.log('\n📊 统计结果:');
console.log(`总文件数: ${totalFiles}`);
console.log(`包含 description 的文件: ${filesWithDescription}`);
console.log(`缺少 description 的文件: ${filesWithoutDescription}`);

if (filesWithoutDescription === 0) {
    console.log('\n🎉 所有页面都包含 description 字段！');
} else {
    console.log(`\n⚠️  还有 ${filesWithoutDescription} 个页面需要添加 description 字段`);
} 