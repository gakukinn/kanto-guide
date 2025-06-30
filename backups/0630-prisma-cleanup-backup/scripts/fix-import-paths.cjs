const fs = require('fs');
const path = require('path');
const glob = require('glob');

// 需要修复的路径模式
const pathFixes = [
  {
    from: '../@/components/',
    to: '@/components/',
    description: '修复错误的相对路径格式'
  },
  {
    from: '../../../../types/hanabi',
    to: '@/types/hanabi',
    description: '修复类型导入路径'
  },
  {
    from: '../../../../utils/matsuri-data-validator',
    to: '@/utils/matsuri-data-validator',
    description: '修复工具类导入路径'
  },
  {
    from: '../../../../data/',
    to: '@/data/',
    description: '修复数据文件导入路径'
  },
  {
    from: '../../components/',
    to: '@/components/',
    description: '修复组件导入路径'
  },
  {
    from: '../../data/',
    to: '@/data/',
    description: '修复数据导入路径'
  }
];

function fixImportsInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let hasChanges = false;

    pathFixes.forEach(fix => {
      const regex = new RegExp(fix.from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      if (content.includes(fix.from)) {
        content = content.replace(regex, fix.to);
        hasChanges = true;
        console.log(`✅ ${filePath}: ${fix.description}`);
      }
    });

    if (hasChanges) {
      fs.writeFileSync(filePath, content, 'utf8');
      return true;
    }
  } catch (error) {
    console.error(`❌ 修复失败 ${filePath}:`, error.message);
  }
  return false;
}

function main() {
  console.log('🔧 开始批量修复导入路径...\n');
  
  const patterns = [
    'app/**/*.tsx',
    'app/**/*.ts',
    'src/**/*.tsx',
    'src/**/*.ts'
  ];

  let totalFixed = 0;
  let totalFiles = 0;

  patterns.forEach(pattern => {
    const files = glob.sync(pattern);
    files.forEach(file => {
      totalFiles++;
      if (fixImportsInFile(file)) {
        totalFixed++;
      }
    });
  });

  console.log(`\n📊 修复完成:`);
  console.log(`- 总文件数: ${totalFiles}`);
  console.log(`- 修复文件数: ${totalFixed}`);
  console.log(`- 成功率: ${((totalFixed / totalFiles) * 100).toFixed(1)}%`);
}

main(); 