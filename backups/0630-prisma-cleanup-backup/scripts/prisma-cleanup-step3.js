const fs = require('fs');
const path = require('path');

console.log('🧹 开始第三步：更新TypeScript配置...');

// 更新tsconfig.json以排除有问题的文件
console.log('📝 更新tsconfig.json排除规则...');

const tsconfigPath = 'tsconfig.json';
if (fs.existsSync(tsconfigPath)) {
  const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));
  
  // 添加要排除的目录和文件
  const additionalExcludes = [
    "scripts/disabled-prisma-scripts/**/*",
    "src/utils/*.prisma-backup",
    "**/*.prisma-backup",
    "scripts/prisma-cleanup-*.js"
  ];
  
  if (!tsconfig.exclude) {
    tsconfig.exclude = [];
  }
  
  // 添加新的排除规则
  for (const exclude of additionalExcludes) {
    if (!tsconfig.exclude.includes(exclude)) {
      tsconfig.exclude.push(exclude);
    }
  }
  
  fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));
  console.log('✅ tsconfig.json已更新');
} else {
  console.log('⚠️ tsconfig.json不存在');
}

// 检查并处理剩余的Prisma相关文件
console.log('🔍 检查剩余的Prisma引用...');

const problematicFiles = [
  'src/components/shared/HanabiAccessSection.tsx',
  'src/components/shared/HanabiOverviewSection.tsx', 
  'src/components/shared/HanabiVenuesSection.tsx',
  'src/utils/86-activities-data-consistency-workflow.ts',
  'src/utils/data-source-extractor.ts',
  'src/utils/data-validator.ts',
  'src/utils/database-uniqueness-scanner.ts',
  'src/utils/hanabi-data-converter.ts',
  'src/utils/hanabi-detail-validation.ts',
  'src/utils/hanabi-template-generator.ts',
  'src/utils/hanabiDataUpdater.ts'
];

console.log('📦 备份有问题的工具文件...');

const problemDir = 'src/utils/problematic-hanabi-files';
if (!fs.existsSync(problemDir)) {
  fs.mkdirSync(problemDir, { recursive: true });
}

for (const filePath of problematicFiles) {
  if (fs.existsSync(filePath)) {
    const fileName = path.basename(filePath);
    const backupPath = path.join(problemDir, fileName);
    
    console.log(`📦 移动有问题的文件: ${filePath} -> ${problemDir}/`);
    fs.renameSync(filePath, backupPath);
  }
}

console.log('🧽 清理node_modules中的Prisma残留...');

// 删除node_modules中的Prisma相关包
const nodeModulesPrisma = [
  'node_modules/@prisma',
  'node_modules/prisma'
];

for (const dir of nodeModulesPrisma) {
  if (fs.existsSync(dir)) {
    console.log(`🗑️ 删除: ${dir}`);
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

console.log('✅ 第三步清理完成！');
console.log('🔧 建议运行 npm install 重新安装依赖');
console.log('📋 然后运行 npm run type-check 检查剩余错误'); 