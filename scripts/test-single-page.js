const { tencentTranslate, processPageFile } = require('./translate-all-pages-working.js');

async function testSinglePage() {
    console.log('🧪 测试单页面翻译...\n');
    
    // 测试腾讯云API
    console.log('1️⃣ 测试翻译API...');
    try {
        const testText = "銚子みなとまつり花火大会";
        const result = await tencentTranslate(testText);
        console.log(`✅ API测试成功: "${testText}" → "${result}"\n`);
    } catch (error) {
        console.log(`❌ API测试失败: ${error.message}\n`);
        return;
    }
    
    // 测试页面处理
    console.log('2️⃣ 测试页面文件处理...');
    const testFile = 'app/chiba/hanabi/activity--02093905/page.tsx';
    
    try {
        const result = await processPageFile(testFile);
        console.log(`\n📊 处理结果:`);
        console.log(`   成功: ${result.success}`);
        console.log(`   翻译数量: ${result.count}`);
        
        if (result.translations && result.translations.length > 0) {
            console.log(`\n📝 翻译详情:`);
            result.translations.forEach((t, i) => {
                console.log(`   ${i + 1}. [${t.field}] ${t.original} → ${t.translated}`);
            });
        }
        
        if (result.error) {
            console.log(`   错误: ${result.error}`);
        }
        
    } catch (error) {
        console.log(`❌ 页面处理失败: ${error.message}`);
    }
}

testSinglePage().catch(console.error); 