const fs = require('fs');
const path = require('path');

const backupDir = 'backups/0628-prisma-cleanup-backup';
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

console.log('🛡️ 开始创建安全备份...');

// 关键目录和文件列表
const criticalPaths = [
  // 生成器目录
  'app/admin',
  'app/api',
  
  // 模板和工具
  'src/components',
  'src/utils',
  'src/types',
  'src/lib',
  
  // 数据文件
  'data',
  
  // 配置文件
  'package.json',
  'tsconfig.json',
  'next.config.js',
  'tailwind.config.js',
  
  // 根目录页面
  'app/page.tsx',
  'app/layout.tsx',
  'app/globals.css',
  'app/sitemap.ts',
  'app/robots.ts',
  
  // 地区页面（不包含具体activity页面，只要主结构）
  'app/tokyo/page.tsx',
  'app/saitama/page.tsx',
  'app/chiba/page.tsx',
  'app/kanagawa/page.tsx',
  'app/kitakanto/page.tsx',
  'app/koshinetsu/page.tsx',
  
  // 各地区的汇总页面
  'app/tokyo/hanabi/page.tsx',
  'app/tokyo/matsuri/page.tsx',
  'app/tokyo/culture/page.tsx',
  'app/tokyo/hanami/page.tsx',
  'app/tokyo/illumination/page.tsx',
  'app/tokyo/momiji/page.tsx',
];

function copyFileSync(src, dest) {
  try {
    const destDir = path.dirname(dest);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    fs.copyFileSync(src, dest);
    return true;
  } catch (error) {
    console.error(`❌ 复制失败: ${src} -> ${dest}`, error.message);
    return false;
  }
}

function copyDirSync(src, dest) {
  if (!fs.existsSync(src)) {
    console.log(`⚠️ 源目录不存在: ${src}`);
    return;
  }
  
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const items = fs.readdirSync(src);
  let copiedCount = 0;
  
  for (const item of items) {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);
    
    const stat = fs.statSync(srcPath);
    
    if (stat.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      if (copyFileSync(srcPath, destPath)) {
        copiedCount++;
      }
    }
  }
  
  console.log(`📂 ${src}: 复制了 ${copiedCount} 个文件`);
}

// 执行备份
console.log(`📁 备份目录: ${backupDir}`);

for (const criticalPath of criticalPaths) {
  const srcPath = criticalPath;
  const destPath = path.join(backupDir, criticalPath);
  
  if (!fs.existsSync(srcPath)) {
    console.log(`⚠️ 跳过不存在的路径: ${srcPath}`);
    continue;
  }
  
  const stat = fs.statSync(srcPath);
  
  if (stat.isDirectory()) {
    console.log(`📂 备份目录: ${srcPath}`);
    copyDirSync(srcPath, destPath);
  } else {
    console.log(`📄 备份文件: ${srcPath}`);
    copyFileSync(srcPath, destPath);
  }
}

// 创建备份说明文件
const readmeContent = `# 0628 Prisma清理前安全备份

## 备份时间
${new Date().toLocaleString('zh-CN')}

## 备份内容
- ✅ 所有生成器 (app/admin/*)
- ✅ 所有API接口 (app/api/*)
- ✅ 所有组件和工具 (src/*)
- ✅ 数据文件 (data/*)
- ✅ 配置文件
- ✅ 主要页面结构

## 备份目的
在清理Prisma残留代码前确保关键功能不丢失

## 特别保护
- 三层页面生成器
- WalkerPlus页面生成器
- Activity页面生成器
- 所有模板文件
- 数据管理工具

## 使用方法
如果清理过程中出现问题，可以从此备份恢复关键文件
`;

fs.writeFileSync(path.join(backupDir, 'README.md'), readmeContent);

console.log('✅ 安全备份完成！');
console.log(`📍 备份位置: ${backupDir}`);
console.log('🚀 现在可以安全地进行Prisma清理了'); 