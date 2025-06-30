const { findPageFiles, processPageFile, tencentTranslate } = require('./translate-all-pages-working.js');

async function test5Pages() {
    console.log('🧪 方案A：测试前5个页面翻译\n');
    
    // 检查API
    console.log('1️⃣ 检查腾讯云API...');
    try {
        await tencentTranslate('テスト');
        console.log('✅ API正常\n');
    } catch (error) {
        console.log(`❌ API错误: ${error.message}`);
        console.log('🛑 暂停执行，请检查API配置');
        return;
    }
    
    // 获取页面文件
    console.log('2️⃣ 扫描页面文件...');
    const allPages = findPageFiles();
    console.log(`📋 总共发现 ${allPages.length} 个页面`);
    
    // 只处理前5个
    const testPages = allPages.slice(0, 5);
    console.log(`🎯 测试前 ${testPages.length} 个页面\n`);
    
    const results = [];
    
    // 处理每个页面
    for (let i = 0; i < testPages.length; i++) {
        const filePath = testPages[i];
        const relativePath = filePath.replace(process.cwd(), '.');
        
        console.log(`📄 [${i+1}/${testPages.length}] 处理: ${relativePath}`);
        
        try {
            const result = await processPageFile(filePath);
            results.push({
                file: relativePath,
                success: result.success,
                count: result.count,
                translations: result.translations || []
            });
            
            console.log(`✅ 完成: 翻译了 ${result.count} 个字段\n`);
            
        } catch (error) {
            console.log(`❌ 错误: ${error.message}`);
            console.log('🛑 暂停执行，出现问题');
            console.log('💡 建议：检查文件格式或API状态');
            return;
        }
    }
    
    // 生成测试报告
    console.log('📊 测试报告');
    console.log('=============');
    
    let totalTranslations = 0;
    let successfulFiles = 0;
    
    results.forEach((result, index) => {
        console.log(`${index + 1}. ${result.file}`);
        console.log(`   状态: ${result.success ? '✅ 成功' : '❌ 失败'}`);
        console.log(`   翻译数量: ${result.count}`);
        
        if (result.success) {
            successfulFiles++;
            totalTranslations += result.count;
        }
        console.log('');
    });
    
    console.log('📈 总结:');
    console.log(`   成功文件: ${successfulFiles}/${testPages.length}`);
    console.log(`   总翻译数: ${totalTranslations}`);
    console.log(`   成功率: ${Math.round(successfulFiles/testPages.length*100)}%`);
    
    if (successfulFiles === testPages.length) {
        console.log('\n🎉 测试完全成功！');
        console.log('💡 建议：可以继续批量翻译剩余页面');
    } else {
        console.log('\n⚠️ 测试中有失败的页面');
        console.log('💡 建议：检查失败原因再继续');
    }
}

test5Pages().catch(error => {
    console.log(`\n❌ 致命错误: ${error.message}`);
    console.log('🛑 暂停一切执行');
    console.log('💡 建议：检查脚本配置和网络连接');
}); 