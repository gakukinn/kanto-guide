const fs = require('fs');
const path = require('path');

console.log('🧹 开始第二步：清理代码中的Prisma导入...');

// 需要处理的有问题的文件（从之前的错误列表中获取）
const problematicFiles = [
  'src/utils/page-generator-core.ts',
  'src/lib/prisma.ts',
  'src/lib/data-fetcher.ts'
];

console.log('🔧 处理有问题的Prisma相关文件...');

for (const filePath of problematicFiles) {
  if (fs.existsSync(filePath)) {
    console.log(`📝 处理文件: ${filePath}`);
    
    if (filePath === 'src/lib/prisma.ts' || filePath === 'src/lib/data-fetcher.ts') {
      // 这些文件主要是Prisma相关，直接删除
      console.log(`🗑️ 删除Prisma专用文件: ${filePath}`);
      fs.unlinkSync(filePath);
      console.log(`✅ 已删除: ${filePath}`);
    } else if (filePath === 'src/utils/page-generator-core.ts') {
      // 这个文件可能包含其他功能，需要检查内容
      const content = fs.readFileSync(filePath, 'utf8');
      if (content.includes('PrismaClient') && content.split('\n').length < 50) {
        // 如果文件很短且主要是Prisma代码，删除
        console.log(`🗑️ 删除主要为Prisma的文件: ${filePath}`);
        fs.unlinkSync(filePath);
        console.log(`✅ 已删除: ${filePath}`);
      } else {
        // 如果文件较长，移动到备份位置
        const backupPath = filePath + '.prisma-backup';
        fs.renameSync(filePath, backupPath);
        console.log(`📦 文件已备份到: ${backupPath}`);
      }
    }
  } else {
    console.log(`⚠️ 文件不存在: ${filePath}`);
  }
}

// 清理脚本中的Prisma导入
console.log('📜 清理scripts目录中的Prisma导入...');

const scriptsDir = 'scripts';
if (fs.existsSync(scriptsDir)) {
  const scriptFiles = fs.readdirSync(scriptsDir).filter(file => 
    file.endsWith('.js') || file.endsWith('.ts')
  );
  
  for (const file of scriptFiles) {
    const filePath = path.join(scriptsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    if (content.includes('PrismaClient') || content.includes('@prisma/client')) {
      // 将这些脚本移动到disabled目录
      const disabledDir = path.join(scriptsDir, 'disabled-prisma-scripts');
      if (!fs.existsSync(disabledDir)) {
        fs.mkdirSync(disabledDir, { recursive: true });
      }
      
      const newPath = path.join(disabledDir, file);
      fs.renameSync(filePath, newPath);
      console.log(`📦 移动Prisma脚本: ${file} -> disabled-prisma-scripts/`);
    }
  }
}

console.log('✅ 第二步清理完成！');
console.log('📋 下一步需要更新TypeScript配置...'); 