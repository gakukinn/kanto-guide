const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('🧹 开始清理项目中的Prisma相关代码...');

// 查找所有含有Prisma导入的文件
const files = glob.sync('app/api/**/*.ts');

let cleanedCount = 0;
let errorCount = 0;

files.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf8');
    
    // 检查是否包含Prisma相关代码
    if (content.includes('PrismaClient') || content.includes('@prisma/client')) {
      console.log(`🔧 清理文件: ${file}`);
      
      let cleanedContent = content;
      
      // 移除Prisma导入语句
      cleanedContent = cleanedContent
        .replace(/import\s*{\s*PrismaClient\s*}\s*from\s*['"]@prisma\/client['"];?\n?/g, '')
        .replace(/import\s*{\s*PrismaClient\s*}\s*from\s*['"][^'"]*prisma['"];?\n?/g, '')
        .replace(/const\s+prisma\s*=\s*new\s+PrismaClient\(\);?\n?/g, '')
        .replace(/let\s+prisma:\s*PrismaClient[^;]*;\n?/g, '')
        .replace(/prisma\s*=\s*new\s+PrismaClient\(\);?\n?/g, '');
      
      // 如果文件内容有变化，则写入
      if (cleanedContent !== content) {
        fs.writeFileSync(file, cleanedContent, 'utf8');
        cleanedCount++;
        console.log(`  ✅ 已清理 ${file}`);
      } else {
        console.log(`  ⚠️  ${file} 未找到可清理的内容`);
      }
    }
  } catch (error) {
    console.error(`❌ 清理 ${file} 时出错:`, error.message);
    errorCount++;
  }
});

console.log(`\n📊 清理完成:`);
console.log(`  ✅ 成功清理: ${cleanedCount} 个文件`);
console.log(`  ❌ 清理失败: ${errorCount} 个文件`);

if (errorCount > 0) {
  console.log(`\n⚠️  有 ${errorCount} 个文件清理失败，请手动检查！`);
  process.exit(1);
} else {
  console.log(`\n🎉 所有Prisma导入已成功清理！`);
} 