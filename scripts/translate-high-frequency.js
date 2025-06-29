const fs = require('fs');
const path = require('path');

// 基于频率分析的高频日文内容翻译映射
const HIGH_FREQUENCY_MAPPINGS = {
    // 花火相关高频词汇
    '花火打ち上げ': '花火燃放',
    '打ち上げられる': '被燃放',
    '打ち上げ花火': '燃放花火',
    '夜空を彩ります': '装点夜空',
    '夜空を彩る': '装点夜空',
    'を彩ります': '装点',
    'を彩る': '装点',
    
    // 活动相关高频词汇
    '開催される': '举办',
    '実施される': '举行',
    '行われる': '举行',
    
    // 敬语简化
    'になります': '', // 删除，简化表达
    'となります': '', // 删除，简化表达
    
    // 信息相关高频短语
    'については詳細が決定次第': '详细信息将在确定后',
    'については詳細': '详细信息',
    'が決定次第': '确定后',
    '大会プログラムは過去の情報になります': '大会项目为过往信息',
    '大会プログラムは過去': '大会项目为过往',
    
    // 其他高频表达
    'げられる': '放', // 主要用于"打ち上げられる"
    'ち上': '燃放', // 主要用于"打ち上げ"
};

// 扫描所有四层页面
function findAllFourthLevelPages() {
    const regions = ['chiba', 'kanagawa', 'kitakanto', 'koshinetsu', 'saitama', 'tokyo'];
    const activities = ['hanabi', 'hanami', 'matsuri', 'bunka'];
    const pages = [];
    
    regions.forEach(region => {
        activities.forEach(activity => {
            const activityDir = path.join('app', region, activity);
            if (fs.existsSync(activityDir)) {
                const items = fs.readdirSync(activityDir);
                items.forEach(item => {
                    const itemPath = path.join(activityDir, item);
                    const pagePath = path.join(itemPath, 'page.tsx');
                    if (fs.existsSync(pagePath)) {
                        pages.push(pagePath);
                    }
                });
            }
        });
    });
    
    return pages;
}

// 处理单个文件的翻译
function translateHighFrequencyContent(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;
        const changes = [];
        
        // 按映射表逐一替换
        for (const [japanese, chinese] of Object.entries(HIGH_FREQUENCY_MAPPINGS)) {
            const regex = new RegExp(japanese.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
            const matches = content.match(regex);
            
            if (matches) {
                if (chinese === '') {
                    // 删除敬语表达，需要清理可能的多余标点
                    content = content.replace(regex, '');
                    // 清理可能的多余句号
                    content = content.replace(/。。/g, '。');
                    content = content.replace(/、。/g, '。');
                } else {
                    content = content.replace(regex, chinese);
                }
                
                changes.push(`${japanese} → ${chinese || '(删除)'} (${matches.length}次)`);
                modified = true;
            }
        }
        
        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            return {
                success: true,
                changes: changes,
                changeCount: changes.length
            };
        }
        
        return {
            success: true,
            changes: [],
            changeCount: 0
        };
        
    } catch (error) {
        return {
            success: false,
            error: error.message,
            changes: [],
            changeCount: 0
        };
    }
}

// 主执行函数
async function main() {
    console.log('🎯 开始针对性翻译高频日文内容...\n');
    
    const pages = findAllFourthLevelPages();
    console.log(`📁 发现 ${pages.length} 个四层页面\n`);
    
    let processedCount = 0;
    let successCount = 0;
    let totalChanges = 0;
    const results = [];
    
    for (const pagePath of pages) {
        processedCount++;
        process.stdout.write(`\r处理进度: ${processedCount}/${pages.length} (${Math.round(processedCount/pages.length*100)}%)`);
        
        const result = translateHighFrequencyContent(pagePath);
        
        if (result.success) {
            successCount++;
            totalChanges += result.changeCount;
            
            if (result.changeCount > 0) {
                results.push({
                    file: pagePath,
                    changes: result.changes
                });
            }
        } else {
            console.log(`\n❌ 处理失败: ${pagePath} - ${result.error}`);
        }
    }
    
    console.log('\n\n📊 翻译完成！');
    console.log('===============================================');
    console.log(`✅ 处理页面: ${processedCount}个`);
    console.log(`🎯 成功翻译: ${successCount}个`);
    console.log(`🔤 翻译字段: ${totalChanges}个`);
    console.log(`📝 修改文件: ${results.length}个`);
    
    if (results.length > 0) {
        console.log('\n📋 详细翻译结果:');
        console.log('================');
        
        let detailCount = 0;
        for (const result of results) {
            if (detailCount < 10) { // 只显示前10个文件的详细信息
                console.log(`\n📄 ${result.file}:`);
                result.changes.forEach(change => {
                    console.log(`   ${change}`);
                });
                detailCount++;
            }
        }
        
        if (results.length > 10) {
            console.log(`\n... 还有 ${results.length - 10} 个文件被修改`);
        }
    }
    
    console.log('\n🎉 针对性翻译完成！所有高频日文内容已处理。');
}

// 运行主函数
main().catch(console.error); 