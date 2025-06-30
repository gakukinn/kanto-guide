const fs = require('fs');
const path = require('path');

console.log('🔍 详细验证页面数量');
console.log('====================');

// 手动扫描逻辑 - 完全透明
function detailedScan() {
    const appDir = path.join(__dirname, '../app');
    console.log(`📂 扫描目录: ${appDir}`);
    
    const results = [];
    let totalFound = 0;
    
    // 遍历app目录下的所有地区
    const regions = fs.readdirSync(appDir).filter(item => {
        const fullPath = path.join(appDir, item);
        return fs.statSync(fullPath).isDirectory();
    });
    
    console.log(`\n📍 发现地区数量: ${regions.length}`);
    regions.forEach(region => console.log(`   ${region}`));
    
    // 遍历每个地区
    for (const region of regions) {
        const regionDir = path.join(appDir, region);
        console.log(`\n📂 检查地区: ${region}`);
        
        const categories = fs.readdirSync(regionDir).filter(item => {
            const fullPath = path.join(regionDir, item);
            return fs.statSync(fullPath).isDirectory();
        });
        
        console.log(`   活动类型: ${categories.join(', ')}`);
        
        // 遍历每个活动类型
        for (const category of categories) {
            const categoryDir = path.join(regionDir, category);
            console.log(`   📁 检查: ${region}/${category}`);
            
            const activities = fs.readdirSync(categoryDir).filter(item => {
                const fullPath = path.join(categoryDir, item);
                return fs.statSync(fullPath).isDirectory();
            });
            
            console.log(`      活动数量: ${activities.length}`);
            
            // 遍历每个具体活动
            let categoryCount = 0;
            for (const activity of activities) {
                const activityDir = path.join(categoryDir, activity);
                const pageFile = path.join(activityDir, 'page.tsx');
                
                if (fs.existsSync(pageFile)) {
                    categoryCount++;
                    totalFound++;
                    results.push(`${region}/${category}/${activity}/page.tsx`);
                }
            }
            console.log(`      有效页面: ${categoryCount}`);
        }
    }
    
    return { results, totalFound };
}

const scanResult = detailedScan();

console.log('\n📊 最终统计:');
console.log('=============');
console.log(`总计发现页面: ${scanResult.totalFound}`);
console.log('');

console.log('📋 前10个页面路径:');
scanResult.results.slice(0, 10).forEach((page, i) => {
    console.log(`  ${i+1}. app/${page}`);
});

if (scanResult.results.length > 10) {
    console.log(`  ... 还有 ${scanResult.results.length - 10} 个页面`);
}

console.log('\n🔍 数据来源说明:');
console.log('- 扫描路径: app/地区/活动类型/具体活动/page.tsx');
console.log('- 扫描深度: 四层目录结构');
console.log('- 文件要求: 必须存在page.tsx文件');
console.log('- 计算方法: 手动遍历 + 文件存在性检查'); 