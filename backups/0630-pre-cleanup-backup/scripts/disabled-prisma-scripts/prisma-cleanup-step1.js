const fs = require('fs');
const path = require('path');

console.log('🧹 开始第一步：清理Prisma依赖和生成文件...');

// 第一步：从package.json移除Prisma依赖
console.log('📦 1. 移除package.json中的Prisma依赖...');

const packageJsonPath = 'package.json';
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  // 记录移除的依赖
  const removedDeps = [];
  
  if (packageJson.dependencies) {
    if (packageJson.dependencies['@prisma/client']) {
      removedDeps.push('@prisma/client');
      delete packageJson.dependencies['@prisma/client'];
    }
  }
  
  if (packageJson.devDependencies) {
    if (packageJson.devDependencies.prisma) {
      removedDeps.push('prisma');
      delete packageJson.devDependencies.prisma;
    }
  }
  
  if (removedDeps.length > 0) {
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log(`✅ 已移除依赖: ${removedDeps.join(', ')}`);
  } else {
    console.log('⚠️ package.json中未找到Prisma依赖');
  }
}

// 第二步：删除Prisma生成的目录
console.log('🗂️ 2. 删除Prisma生成文件...');

const dirsToRemove = [
  'src/generated/prisma',
  'prisma'
];

for (const dir of dirsToRemove) {
  if (fs.existsSync(dir)) {
    console.log(`🗑️ 删除目录: ${dir}`);
    fs.rmSync(dir, { recursive: true, force: true });
    console.log(`✅ 已删除: ${dir}`);
  } else {
    console.log(`⚠️ 目录不存在: ${dir}`);
  }
}

// 第三步：删除单独的Prisma文件
console.log('📄 3. 删除Prisma相关文件...');

const filesToRemove = [
  'seed-basic-data.js'
];

for (const file of filesToRemove) {
  if (fs.existsSync(file)) {
    console.log(`🗑️ 删除文件: ${file}`);
    fs.unlinkSync(file);
    console.log(`✅ 已删除: ${file}`);
  } else {
    console.log(`⚠️ 文件不存在: ${file}`);
  }
}

console.log('✅ 第一步清理完成！');
console.log('📋 下一步需要清理代码中的Prisma导入...'); 