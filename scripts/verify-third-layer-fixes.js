const fs = require('fs');
const glob = require('glob');

function verifyThirdLayerPages() {
  console.log('🔍 开始最终验证所有三层页面...\n');
  
  // 查找所有三层页面文件
  const files = glob.sync('app/*/*/page.tsx');
  
  let totalPages = 0;
  let fixedPages = 0;
  let problemPages = [];
  
  files.forEach(filePath => {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      totalPages++;
      
      console.log(`检查: ${filePath}`);
      
      // 检查关键要素
      const hasImport = content.includes('getStaticRegionActivityData');
      const isAsync = content.includes('export default async function');
      const hasDataReading = content.includes('const events = await getStaticRegionActivityData');
      const usesEvents = content.includes('events={events}');
      const noEmptyArray = !content.includes('events={[]}');
      const noEscapeChars = !content.includes('\\n');
      
      const isFixed = hasImport && isAsync && hasDataReading && usesEvents && noEmptyArray && noEscapeChars;
      
      if (isFixed) {
        console.log(`✅ 已修复`);
        fixedPages++;
      } else {
        console.log(`❌ 需要修复:`);
        if (!hasImport) console.log(`   - 缺少导入语句`);
        if (!isAsync) console.log(`   - 不是异步函数`);
        if (!hasDataReading) console.log(`   - 缺少数据读取代码`);
        if (!usesEvents) console.log(`   - 没有使用events变量`);
        if (!noEmptyArray) console.log(`   - 仍在使用空数组`);
        if (!noEscapeChars) console.log(`   - 存在转义字符问题`);
        
        problemPages.push(filePath);
      }
      
    } catch (error) {
      console.error(`❌ 检查失败 ${filePath}:`, error.message);
    }
  });
  
  console.log(`\n📊 最终验证结果:`);
  console.log(`✅ 已修复页面: ${fixedPages}个`);
  console.log(`❌ 问题页面: ${problemPages.length}个`);
  console.log(`📈 总计页面: ${totalPages}个`);
  console.log(`🎯 修复率: ${((fixedPages / totalPages) * 100).toFixed(1)}%`);
  
  if (problemPages.length > 0) {
    console.log(`\n⚠️ 仍有问题的页面:`);
    problemPages.forEach(page => console.log(`   - ${page}`));
  } else {
    console.log(`\n🎉 所有三层页面都已修复完成！`);
  }
}

verifyThirdLayerPages(); 