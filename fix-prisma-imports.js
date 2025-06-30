const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('🔧 开始修复Prisma导入问题...');

// 查找所有引用了错误Prisma路径的文件
const files = glob.sync('app/api/**/*.ts');

let fixedCount = 0;

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  
  if (content.includes("from '../../../src/generated/prisma'") || 
      content.includes("from '../../../../src/generated/prisma'")) {
    
    console.log(`修复文件: ${file}`);
    
    // 替换为标准Prisma客户端导入
    const fixedContent = content
      .replace(/import { PrismaClient } from ['"]\.\.\/\.\.\/\.\.\/src\/generated\/prisma['"];?/g, 
               "import { PrismaClient } from '@prisma/client';")
      .replace(/import { PrismaClient } from ['"]\.\.\/\.\.\/\.\.\/\.\.\/src\/generated\/prisma['"];?/g, 
               "import { PrismaClient } from '@prisma/client';");
    
    fs.writeFileSync(file, fixedContent);
    fixedCount++;
  }
});

console.log(`✅ 已修复 ${fixedCount} 个文件的Prisma导入问题`);

// 检查是否还有残留问题
const remainingIssues = glob.sync('app/api/**/*.ts').filter(file => {
  const content = fs.readFileSync(file, 'utf8');
  return content.includes('src/generated/prisma');
});

if (remainingIssues.length > 0) {
  console.log('⚠️ 仍有以下文件存在问题：');
  remainingIssues.forEach(file => console.log(`  - ${file}`));
} else {
  console.log('🎉 所有Prisma导入问题已修复！');
} 