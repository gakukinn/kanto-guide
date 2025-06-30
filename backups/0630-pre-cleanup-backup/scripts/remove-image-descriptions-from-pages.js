const fs = require('fs');
const path = require('path');

/**
 * 删除现有页面中所有的图片描述
 * 只保留活动的description，删除media中的description字段
 */

function removeImageDescriptions() {
    console.log('🧹 删除现有页面中的图片描述...\n');
    
    const regions = ['tokyo', 'saitama', 'chiba', 'kanagawa', 'kitakanto', 'koshinetsu'];
    const activityTypes = ['hanabi', 'matsuri', 'hanami', 'momiji', 'illumination', 'culture'];
    
    let totalFiles = 0;
    let fixedFiles = 0;
    
    for (const region of regions) {
        for (const activityType of activityTypes) {
            const dir = path.join('app', region, activityType);
            if (fs.existsSync(dir)) {
                const items = fs.readdirSync(dir);
                for (const item of items) {
                    const pagePath = path.join(dir, item, 'page.tsx');
                    if (fs.existsSync(pagePath)) {
                        totalFiles++;
                        
                        try {
                            let content = fs.readFileSync(pagePath, 'utf8');
                            let modified = false;
                            
                            // 删除media数组中的description字段
                            // 匹配模式：在media数组的对象中删除description行
                            const mediaPattern = /"media":\s*\[([\s\S]*?)\]/;
                            const mediaMatch = content.match(mediaPattern);
                            
                            if (mediaMatch) {
                                let mediaContent = mediaMatch[1];
                                
                                // 删除每个媒体对象中的description字段
                                const originalMediaContent = mediaContent;
                                
                                // 删除 "description": "..." 行
                                mediaContent = mediaContent.replace(/\s*"description":\s*"[^"]*",?\n?/g, '');
                                
                                if (mediaContent !== originalMediaContent) {
                                    content = content.replace(mediaMatch[1], mediaContent);
                                    modified = true;
                                }
                            }
                            
                            if (modified) {
                                fs.writeFileSync(pagePath, content, 'utf8');
                                fixedFiles++;
                                console.log(`✅ 修复: ${pagePath}`);
                            }
                            
                        } catch (error) {
                            console.error(`❌ 处理文件失败: ${pagePath}`, error.message);
                        }
                    }
                }
            }
        }
    }
    
    console.log('\n📊 处理结果:');
    console.log('总文件数:', totalFiles);
    console.log('修复的文件数:', fixedFiles);
    console.log('未修改的文件数:', totalFiles - fixedFiles);
    
    if (fixedFiles > 0) {
        console.log('\n✅ 成功删除了', fixedFiles, '个页面中的图片描述');
    } else {
        console.log('\n💡 没有找到需要删除的图片描述');
    }
}

removeImageDescriptions(); 