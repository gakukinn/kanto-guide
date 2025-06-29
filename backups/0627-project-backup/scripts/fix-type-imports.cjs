const fs = require('fs');
const path = require('path');
const glob = require('glob');

function fixTypeImports() {
  console.log('🔧 开始修复数据文件中的类型导入路径...\n');
  
  // 查找所有数据文件
  const dataFiles = glob.sync('src/data/hanabi/**/*.ts');
  
  let fixedCount = 0;
  
  dataFiles.forEach(filePath => {
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // 查找相对路径的类型导入
      const relativeImportRegex = /import\s*{[^}]*}\s*from\s*['"]\.\.\/types\/hanabi['"]/g;
      
      if (content.match(relativeImportRegex)) {
        // 替换为@/types/hanabi
        content = content.replace(relativeImportRegex, (match) => {
          return match.replace('../types/hanabi', '@/types/hanabi');
        });
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ 修复类型导入: ${filePath}`);
        fixedCount++;
      }
    } catch (error) {
      console.error(`❌ 修复失败: ${filePath}`, error.message);
    }
  });
  
  console.log(`\n📊 类型导入修复统计:`);
  console.log(`- 检查文件: ${dataFiles.length}`);
  console.log(`- 修复文件: ${fixedCount}`);
  console.log(`- 成功率: ${((fixedCount / dataFiles.length) * 100).toFixed(1)}%`);
}

fixTypeImports(); 