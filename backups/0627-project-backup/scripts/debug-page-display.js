const fs = require('fs');

/**
 * 调试页面中description不显示的技术原因
 */

function debugPageDisplay() {
    console.log('🔍 调试页面description显示问题...\n');
    
    // 1. 检查页面中的description值
    console.log('=== 1. 检查页面数据 ===');
    const pagePath = 'app/tokyo/hanabi/cmc6gu6wt0001vl2saxdj70bt/page.tsx';
    const pageContent = fs.readFileSync(pagePath, 'utf8');
    
    // 提取hanabiData对象中的description
    const lines = pageContent.split('\n');
    let descriptionValue = null;
    let inHanabiData = false;
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        if (line.includes('const hanabiData: HanabiData = {')) {
            inHanabiData = true;
            continue;
        }
        
        if (inHanabiData) {
            if (line.includes('"description":')) {
                const match = line.match(/"description":\s*"([^"]+)"/);
                if (match) {
                    descriptionValue = match[1];
                }
                break;
            }
            
            if (line.includes('};') && line.trim() === '};') {
                break;
            }
        }
    }
    
    console.log('页面中的description值:', descriptionValue || '(未找到)');
    console.log('description长度:', descriptionValue ? descriptionValue.length : 0);
    
    // 2. 检查HanabiDetailTemplate组件的显示逻辑
    console.log('\n=== 2. 检查模板组件显示逻辑 ===');
    const templatePath = 'src/components/HanabiDetailTemplate.tsx';
    const templateContent = fs.readFileSync(templatePath, 'utf8');
    
    // 查找description相关的代码
    const descriptionSection = templateContent.match(/\{data\.description[\s\S]*?<\/div>\s*\)\s*\}/);
    if (descriptionSection) {
        console.log('找到description显示代码段:');
        console.log(descriptionSection[0]);
    }
    
    // 检查显示条件
    const conditionMatch = templateContent.match(/data\.description\s*&&\s*data\.description\s*!==\s*'[^']*'/);
    if (conditionMatch) {
        console.log('\n显示条件:', conditionMatch[0]);
        
        if (descriptionValue) {
            console.log('\n条件检查:');
            console.log('1. data.description 存在:', !!descriptionValue);
            console.log('2. data.description !== "详见官网":', descriptionValue !== '详见官网');
            
            const shouldDisplay = !!descriptionValue && descriptionValue !== '详见官网';
            console.log('3. 应该显示:', shouldDisplay ? '是 ✅' : '否 ❌');
            
            if (shouldDisplay) {
                console.log('\n🚨 问题：条件满足但页面不显示，可能的原因：');
                console.log('1. CSS样式问题（元素被隐藏）');
                console.log('2. JavaScript错误导致组件渲染失败');
                console.log('3. 数据传递问题');
                console.log('4. 组件层级或结构问题');
            }
        }
    }
    
    // 3. 检查可能的CSS或样式问题
    console.log('\n=== 3. 检查可能的样式问题 ===');
    
    // 查找description容器的CSS类
    const cssClassMatch = templateContent.match(/className="[^"]*"[^>]*>\s*{data\.description/);
    if (cssClassMatch) {
        console.log('description容器的CSS类:', cssClassMatch[0]);
    }
    
    // 4. 检查组件结构
    console.log('\n=== 4. 检查组件结构 ===');
    
    // 查找HanabiDetailTemplate的调用
    const templateCallMatch = pageContent.match(/<HanabiDetailTemplate[\s\S]*?\/>/);
    if (templateCallMatch) {
        console.log('HanabiDetailTemplate调用:');
        console.log(templateCallMatch[0]);
    }
    
    // 5. 生成调试建议
    console.log('\n=== 5. 调试建议 ===');
    console.log('请在浏览器中检查以下内容：');
    console.log('');
    console.log('1. 打开浏览器开发者工具 (F12)');
    console.log('2. 在Console标签中执行以下代码：');
    console.log('   console.log("hanabiData.description:", window.hanabiData?.description);');
    console.log('');
    console.log('3. 在Elements标签中搜索 "活动简介" 文本');
    console.log('   - 如果找到元素但不可见，检查CSS样式');
    console.log('   - 如果找不到元素，说明条件判断有问题');
    console.log('');
    console.log('4. 在Console标签中查看是否有JavaScript错误');
    console.log('');
    console.log('5. 检查网络请求是否成功加载了页面数据');
    
    // 6. 生成简单的测试页面
    console.log('\n=== 6. 生成测试用例 ===');
    console.log('可以创建一个简单的测试来验证条件：');
    console.log('');
    console.log('const testData = {');
    console.log(`  description: "${descriptionValue || 'test description'}"`);
    console.log('};');
    console.log('');
    console.log('const shouldShow = testData.description && testData.description !== "详见官网";');
    console.log('console.log("Should show description:", shouldShow);');
    console.log('console.log("Description value:", testData.description);');
}

debugPageDisplay(); 