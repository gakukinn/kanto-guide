const { findPageFiles, processPageFile, tencentTranslate } = require('./translate-all-pages-working.js');
const fs = require('fs');
const path = require('path');

async function batchTranslateRemaining() {
    console.log('🌐 开始批量翻译剩余153个页面');
    console.log('================================');
    
    // 检查API
    console.log('1️⃣ 检查腾讯云API...');
    try {
        await tencentTranslate('テスト');
        console.log('✅ API连接正常\n');
    } catch (error) {
        console.log(`❌ API连接失败: ${error.message}`);
        console.log('🛑 暂停一切执行');
        console.log('💡 建议：检查网络连接和API密钥配置');
        return;
    }
    
    // 获取所有页面
    const allPages = findPageFiles();
    console.log(`📋 总页面数: ${allPages.length}`);
    
    // 跳过已翻译的前5个页面
    const remainingPages = allPages.slice(5);
    console.log(`🎯 需要翻译: ${remainingPages.length}个页面 (跳过前5个已完成)`);
    console.log('');
    
    // 统计变量
    let successCount = 0;
    let failCount = 0;
    let totalTranslations = 0;
    const failedFiles = [];
    const startTime = Date.now();
    
    // 进度日志文件
    const progressFile = 'translation-progress.log';
    
    // 处理每个页面
    for (let i = 0; i < remainingPages.length; i++) {
        const filePath = remainingPages[i];
        const relativePath = filePath.replace(process.cwd(), '.');
        const progress = `[${i+1}/${remainingPages.length}]`;
        
        console.log(`${progress} 📄 处理: ${relativePath}`);
        
        try {
            const result = await processPageFile(filePath);
            
            if (result.success) {
                successCount++;
                totalTranslations += result.count;
                console.log(`${progress} ✅ 成功: 翻译了 ${result.count} 个字段`);
                
                // 记录进度
                const logEntry = `${new Date().toISOString()} SUCCESS ${relativePath} ${result.count} fields\n`;
                fs.appendFileSync(progressFile, logEntry);
                
            } else {
                failCount++;
                failedFiles.push({
                    file: relativePath,
                    error: result.error || '未知错误'
                });
                console.log(`${progress} ❌ 失败: ${result.error || '未知错误'}`);
                
                // 记录失败
                const logEntry = `${new Date().toISOString()} FAILED ${relativePath} ${result.error}\n`;
                fs.appendFileSync(progressFile, logEntry);
            }
            
        } catch (error) {
            failCount++;
            failedFiles.push({
                file: relativePath,
                error: error.message
            });
            
            console.log(`${progress} 💥 异常: ${error.message}`);
            
            // 如果是API相关错误，暂停执行
            if (error.message.includes('API') || error.message.includes('网络') || error.message.includes('连接')) {
                console.log('\n🛑 检测到API/网络问题，暂停一切执行');
                console.log('💡 建议：');
                console.log('  1. 检查网络连接');
                console.log('  2. 检查腾讯云API配额');
                console.log('  3. 稍后重新运行脚本（会自动跳过已完成的）');
                return;
            }
        }
        
        // 每10个页面显示一次进度报告
        if ((i + 1) % 10 === 0) {
            const elapsed = (Date.now() - startTime) / 1000;
            const avgTime = elapsed / (i + 1);
            const estimatedRemaining = avgTime * (remainingPages.length - i - 1);
            
            console.log(`\n📊 进度报告 (每10个):`);
            console.log(`   已处理: ${i + 1}/${remainingPages.length}`);
            console.log(`   成功: ${successCount}, 失败: ${failCount}`);
            console.log(`   翻译总数: ${totalTranslations}`);
            console.log(`   平均耗时: ${avgTime.toFixed(1)}秒/页面`);
            console.log(`   预计剩余: ${Math.round(estimatedRemaining/60)}分钟`);
            console.log('');
        }
        
        // 添加延迟避免API限制
        if (i < remainingPages.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
    
    // 最终报告
    console.log('\n🎉 批量翻译完成！');
    console.log('==================');
    
    const totalTime = (Date.now() - startTime) / 1000;
    const totalProcessed = successCount + failCount;
    
    console.log(`📊 最终统计:`);
    console.log(`   总处理: ${totalProcessed}个页面`);
    console.log(`   成功: ${successCount}个 (${Math.round(successCount/totalProcessed*100)}%)`);
    console.log(`   失败: ${failCount}个`);
    console.log(`   翻译总数: ${totalTranslations}个字段`);
    console.log(`   总耗时: ${Math.round(totalTime/60)}分钟`);
    
    // 失败文件报告
    if (failedFiles.length > 0) {
        console.log(`\n⚠️ 失败的文件 (${failedFiles.length}个):`);
        failedFiles.forEach((item, index) => {
            console.log(`   ${index + 1}. ${item.file}`);
            console.log(`      错误: ${item.error}`);
        });
        
        console.log(`\n💡 建议:`);
        console.log(`   1. 检查失败原因`);
        console.log(`   2. 手动处理失败的文件`);
        console.log(`   3. 或重新运行脚本处理失败的文件`);
    }
    
    console.log(`\n📝 详细日志保存在: ${progressFile}`);
}

// 启动批量翻译
batchTranslateRemaining().catch(error => {
    console.log(`\n💥 致命错误: ${error.message}`);
    console.log('🛑 暂停一切执行');
    console.log('💡 建议：检查脚本配置、网络连接和API状态');
    
    // 保存错误日志
    const errorLog = `${new Date().toISOString()} FATAL ERROR: ${error.message}\n`;
    fs.appendFileSync('translation-progress.log', errorLog);
}); 