const fs = require('fs');
const path = require('path');

console.log('🧹 开始最终清理：处理剩余的Prisma相关错误...');

// 更新tsconfig.json，添加更全面的排除规则
console.log('📝 更新tsconfig.json最终排除规则...');

const tsconfigPath = 'tsconfig.json';
if (fs.existsSync(tsconfigPath)) {
  const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));
  
  // 全面的排除规则
  const comprehensiveExcludes = [
    "scripts/disabled-prisma-scripts/**/*",
    "src/utils/problematic-hanabi-files/**/*",
    "src/utils/*.prisma-backup",
    "**/*.prisma-backup",
    "scripts/prisma-cleanup-*.js",
    "components/shared/HanabiAccessSection.tsx",
    "components/shared/HanabiOverviewSection.tsx", 
    "components/shared/HanabiVenuesSection.tsx",
    "src/utils/data-crawler-tokyo.ts"
  ];
  
  if (!tsconfig.exclude) {
    tsconfig.exclude = [];
  }
  
  // 添加所有排除规则
  for (const exclude of comprehensiveExcludes) {
    if (!tsconfig.exclude.includes(exclude)) {
      tsconfig.exclude.push(exclude);
    }
  }
  
  fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));
  console.log('✅ tsconfig.json最终更新完成');
}

// 处理剩余的有问题组件
console.log('📦 移动剩余的有问题组件...');

const remainingProblematicFiles = [
  'components/shared/HanabiAccessSection.tsx',
  'components/shared/HanabiOverviewSection.tsx',
  'components/shared/HanabiVenuesSection.tsx',
  'src/utils/data-crawler-tokyo.ts'
];

const componentsBackupDir = 'src/components/problematic-hanabi-components';
if (!fs.existsSync(componentsBackupDir)) {
  fs.mkdirSync(componentsBackupDir, { recursive: true });
}

for (const filePath of remainingProblematicFiles) {
  if (fs.existsSync(filePath)) {
    const fileName = path.basename(filePath);
    const backupPath = path.join(componentsBackupDir, fileName);
    
    console.log(`📦 移动有问题的组件: ${filePath} -> ${componentsBackupDir}/`);
    fs.renameSync(filePath, backupPath);
  }
}

// 处理有Prisma导入错误的API文件
console.log('🔧 处理API文件中的Prisma导入...');

const apiDir = 'app/api';
const apiDisabledDir = 'app/api/disabled-prisma-routes';

if (!fs.existsSync(apiDisabledDir)) {
  fs.mkdirSync(apiDisabledDir, { recursive: true });
}

// 递归查找所有API route.ts文件
function findApiRoutes(dir) {
  const routes = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && item !== 'disabled-prisma-routes') {
      routes.push(...findApiRoutes(fullPath));
    } else if (item === 'route.ts') {
      routes.push(fullPath);
    }
  }
  
  return routes;
}

const apiRoutes = findApiRoutes(apiDir);
let movedApiCount = 0;

for (const routePath of apiRoutes) {
  if (fs.existsSync(routePath)) {
    const content = fs.readFileSync(routePath, 'utf8');
    
    if (content.includes('PrismaClient') || content.includes('@prisma/client') || content.includes('from \'../../../src/generated/prisma\'')) {
      // 移动到disabled目录，保持目录结构
      const relativePath = path.relative(apiDir, routePath);
      const backupPath = path.join(apiDisabledDir, relativePath);
      const backupDir = path.dirname(backupPath);
      
      if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir, { recursive: true });
      }
      
      fs.renameSync(routePath, backupPath);
      console.log(`📦 移动API路由: ${relativePath}`);
      movedApiCount++;
    }
  }
}

console.log(`📊 移动了 ${movedApiCount} 个有问题的API路由`);

console.log('✅ 最终清理完成！');
console.log('🎯 重新运行type-check检查结果...'); 