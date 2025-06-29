const fs = require('fs');
const path = require('path');

console.log('🧹 最终清理步骤：完全隔离Prisma相关文件...');

// 将disabled目录重命名为.bak，确保Next.js不会处理
console.log('📦 重命名disabled目录为.bak...');

const renameDirs = [
  {
    from: 'app/api/disabled-prisma-routes',
    to: 'app/api/disabled-prisma-routes.bak'
  },
  {
    from: 'scripts/disabled-prisma-scripts',
    to: 'scripts/disabled-prisma-scripts.bak'
  },
  {
    from: 'src/utils/problematic-hanabi-files',
    to: 'src/utils/problematic-hanabi-files.bak'
  },
  {
    from: 'src/components/problematic-hanabi-components',
    to: 'src/components/problematic-hanabi-components.bak'
  }
];

for (const {from, to} of renameDirs) {
  if (fs.existsSync(from)) {
    fs.renameSync(from, to);
    console.log(`✅ 重命名: ${from} -> ${to}`);
  }
}

// 更新.gitignore
console.log('📝 更新.gitignore...');

const gitignorePath = '.gitignore';
const gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');

const newIgnoreEntries = [
  '# Prisma残留文件',
  '*.bak/',
  'app/api/disabled-prisma-routes.bak/',
  'scripts/disabled-prisma-scripts.bak/',
  'src/utils/problematic-hanabi-files.bak/',
  'src/components/problematic-hanabi-components.bak/',
  '**/*.prisma-backup'
];

const updatedContent = gitignoreContent + '\n\n' + newIgnoreEntries.join('\n') + '\n';
fs.writeFileSync(gitignorePath, updatedContent);

console.log('✅ .gitignore已更新');

// 更新tsconfig.json
console.log('📝 更新tsconfig.json...');

const tsconfigPath = 'tsconfig.json';
const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));

const newExcludes = [
  "**/*.bak/**/*"
];

if (!tsconfig.exclude) {
  tsconfig.exclude = [];
}

for (const exclude of newExcludes) {
  if (!tsconfig.exclude.includes(exclude)) {
    tsconfig.exclude.push(exclude);
  }
}

fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));
console.log('✅ tsconfig.json已更新');

console.log('🎉 Prisma清理完全完成！');
console.log('✨ 项目现在应该可以正常构建了');
console.log('🔧 建议运行: npm run build 测试构建'); 