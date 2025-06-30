const fs = require('fs');

/**
 * 检查页面中的description是动态的还是静态的
 */

function checkDescriptionType() {
    console.log('🔍 检查description是动态还是静态...\n');
    
    const pagePath = 'app/tokyo/hanabi/cmc6gu6wt0001vl2saxdj70bt/page.tsx';
    const content = fs.readFileSync(pagePath, 'utf8');
    
    console.log('=== 1. 检查 hanabiData 对象 ===');
    
    // 检查hanabiData对象中是否有description字段
    const lines = content.split('\n');
    let inHanabiData = false;
    let hasStaticDescription = false;
    let staticDescriptionValue = '';
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        if (line.includes('const hanabiData: HanabiData = {')) {
            inHanabiData = true;
            continue;
        }
        
        if (inHanabiData) {
            if (line.includes('"description":')) {
                hasStaticDescription = true;
                const match = line.match(/"description":\s*"([^"]+)"/);
                if (match) {
                    staticDescriptionValue = match[1];
                }
                break;
            }
            
            if (line.includes('};') && line.trim() === '};') {
                break;
            }
        }
    }
    
    console.log('hanabiData中是否有静态description:', hasStaticDescription);
    if (hasStaticDescription) {
        console.log('静态description值:', staticDescriptionValue);
    }
    
    console.log('\n=== 2. 检查 metadata 中的动态表达式 ===');
    
    // 检查metadata中的description表达式
    const metadataMatch = content.match(/export const metadata: Metadata = \{[\s\S]*?\};/);
    if (metadataMatch) {
        const metadataStr = metadataMatch[0];
        const descMatch = metadataStr.match(/description:\s*([^,\n]+)/);
        if (descMatch) {
            const expression = descMatch[1].trim();
            console.log('metadata中的description表达式:', expression);
            
            if (expression.includes('hanabiData.description')) {
                console.log('✅ 这是动态表达式，会尝试使用 hanabiData.description');
            } else {
                console.log('❌ 这是静态值');
            }
        }
    }
    
    console.log('\n=== 3. 检查 HanabiDetailTemplate 接收的数据 ===');
    
    const templateMatch = content.match(/<HanabiDetailTemplate\s+data=\{([^}]+)\}/);
    if (templateMatch) {
        const dataSource = templateMatch[1];
        console.log('HanabiDetailTemplate接收的data:', dataSource);
    }
    
    console.log('\n=== 4. 分析结论 ===');
    
    if (hasStaticDescription) {
        console.log('🔴 问题发现: hanabiData对象中有静态的description字段');
        console.log('   值:', staticDescriptionValue);
        console.log('   这意味着组件会使用这个静态值，而不是数据库中的动态值');
    } else {
        console.log('✅ hanabiData对象中没有静态description字段');
        console.log('   组件应该会使用数据库中的动态值');
    }
    
    console.log('\n📋 页面数据来源分析:');
    console.log('- 如果页面数据来自数据库，description应该是动态的');
    console.log('- 如果hanabiData对象中有静态description，就会覆盖数据库值');
    console.log('- 需要确认页面生成器是如何工作的');
}

checkDescriptionType(); 