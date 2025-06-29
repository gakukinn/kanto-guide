const fs = require('fs');
const path = require('path');
const glob = require('glob');

function fixEscapeCharacters() {
  console.log('🔧 开始修复转义字符问题...\n');
  
  // 查找所有三层页面文件
  const files = glob.sync('app/*/*/page.tsx');
  
  let fixedCount = 0;
  
  files.forEach(filePath => {
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // 检查是否有转义字符问题
      if (content.includes('\\n')) {
        console.log(`修复文件: ${filePath}`);
        
        // 修复转义字符
        content = content.replace(/\\n/g, '\n');
        
        // 写回文件
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ 修复完成: ${filePath}`);
        fixedCount++;
      }
    } catch (error) {
      console.error(`❌ 修复失败 ${filePath}:`, error.message);
    }
  });
  
  console.log(`\n📊 修复统计:`);
  console.log(`✅ 修复了 ${fixedCount} 个文件的转义字符问题`);
  console.log(`📈 检查了 ${files.length} 个文件`);
}

fixEscapeCharacters(); 