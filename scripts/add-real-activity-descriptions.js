const fs = require('fs');
const path = require('path');

/**
 * 为现有页面添加真正的活动描述
 * 在 hanabiData 对象中添加 description 字段
 */

// 需要检查的目录
const REGIONS = ['tokyo', 'saitama', 'chiba', 'kanagawa', 'kitakanto', 'koshinetsu'];
const ACTIVITY_TYPES = ['hanabi', 'matsuri', 'hanami', 'momiji', 'illumination', 'culture'];

let totalFiles = 0;
let fixedFiles = 0;
let errorFiles = 0;

console.log('📝 开始为现有页面添加真正的活动描述...\n');

// 根据活动类型和名称生成描述的函数
function generateActivityDescription(activityType, name, venue, datetime) {
    const cleanName = name || '活动';
    const cleanVenue = venue || '';
    const cleanDatetime = datetime || '';
    
    switch (activityType) {
        case 'hanabi':
            return `${cleanName}是一场精彩的花火大会，${cleanVenue ? `在${cleanVenue}举办` : ''}${cleanDatetime ? `，举办时间为${cleanDatetime}` : ''}。这是一个不容错过的夏日盛典，为观众带来绚烂的烟花表演和难忘的体验。`;
            
        case 'matsuri':
            return `${cleanName}是一个传统的日本祭典，${cleanVenue ? `在${cleanVenue}举办` : ''}${cleanDatetime ? `，举办时间为${cleanDatetime}` : ''}。这个祭典充满了传统文化的魅力，是体验日本文化的绝佳机会。`;
            
        case 'hanami':
            return `${cleanName}是一个美丽的赏花活动，${cleanVenue ? `在${cleanVenue}举办` : ''}${cleanDatetime ? `，举办时间为${cleanDatetime}` : ''}。在这里可以欣赏到美丽的樱花，感受春天的浪漫气息。`;
            
        case 'momiji':
            return `${cleanName}是一个赏红叶的活动，${cleanVenue ? `在${cleanVenue}举办` : ''}${cleanDatetime ? `，举办时间为${cleanDatetime}` : ''}。秋季的红叶美景令人陶醉，是感受季节变化之美的好时机。`;
            
        case 'illumination':
            return `${cleanName}是一个绚丽的灯光活动，${cleanVenue ? `在${cleanVenue}举办` : ''}${cleanDatetime ? `，举办时间为${cleanDatetime}` : ''}。璀璨的灯光装饰营造出梦幻般的氛围，是冬季的浪漫盛典。`;
            
        case 'culture':
            return `${cleanName}是一个丰富的文化活动，${cleanVenue ? `在${cleanVenue}举办` : ''}${cleanDatetime ? `，举办时间为${cleanDatetime}` : ''}。这个活动展示了深厚的文化底蕴，是了解和体验文化的好机会。`;
            
        default:
            return `${cleanName}是一个精彩的活动，${cleanVenue ? `在${cleanVenue}举办` : ''}${cleanDatetime ? `，举办时间为${cleanDatetime}` : ''}。欢迎大家参与这个有趣的活动。`;
    }
}

function fixFile(filePath, activityType) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // 检查是否已经有 description 字段
        if (content.includes('description:')) {
            console.log(`⏭️  跳过 ${filePath} (已有 description)`);
            return;
        }
        
        // 提取活动信息
        const nameMatch = content.match(/name: "([^"]*)",/);
        const venueMatch = content.match(/venue: "([^"]*)",/);
        const datetimeMatch = content.match(/datetime: "([^"]*)",/);
        
        const name = nameMatch ? nameMatch[1] : '';
        const venue = venueMatch ? venueMatch[1] : '';
        const datetime = datetimeMatch ? datetimeMatch[1] : '';
        
        // 生成活动描述
        const description = generateActivityDescription(activityType, name, venue, datetime);
        
        // 在 name 字段后面添加 description 字段
        const namePattern = /(name: "[^"]*",)/;
        if (namePattern.test(content)) {
            content = content.replace(
                namePattern,
                `$1\n    description: "${description}",`
            );
            
            fs.writeFileSync(filePath, content);
            console.log(`✅ 修复 ${filePath}`);
            console.log(`   描述: ${description.substring(0, 50)}...`);
            fixedFiles++;
        } else {
            console.log(`⚠️  无法找到 name 字段: ${filePath}`);
        }
        
    } catch (error) {
        console.error(`❌ 处理文件时出错 ${filePath}:`, error.message);
        errorFiles++;
    }
}

// 遍历所有页面
REGIONS.forEach(region => {
    ACTIVITY_TYPES.forEach(activityType => {
        const dirPath = path.join('app', region, activityType);
        
        if (fs.existsSync(dirPath)) {
            const items = fs.readdirSync(dirPath, { withFileTypes: true });
            
            items.forEach(item => {
                if (item.isDirectory()) {
                    const pagePath = path.join(dirPath, item.name, 'page.tsx');
                    
                    if (fs.existsSync(pagePath)) {
                        totalFiles++;
                        fixFile(pagePath, activityType);
                    }
                }
            });
        }
    });
});

console.log('\n📊 修复完成统计:');
console.log(`总文件数: ${totalFiles}`);
console.log(`修复成功: ${fixedFiles}`);
console.log(`错误文件: ${errorFiles}`);
console.log(`跳过文件: ${totalFiles - fixedFiles - errorFiles}`);

if (fixedFiles > 0) {
    console.log('\n🎉 修复完成！现在页面应该会显示活动描述了。');
} else {
    console.log('\n⚠️  没有文件需要修复。');
} 