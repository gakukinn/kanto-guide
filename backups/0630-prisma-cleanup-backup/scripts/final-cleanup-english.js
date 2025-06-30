const fs = require('fs');
const path = require('path');

console.log('🧹 最终清理四层页面description中的残留英文内容...\n');

// 最终清理规则 - 针对翻译后的残留内容
const FINAL_CLEANUP_RULES = [
  // 1. 保留原英文的场合，删除英文部分
  {
    search: /YOU・游/g,
    replace: '游乐',
    description: 'YOU・游 → 游乐'
  },
  {
    search: /可持续发展目标（SDGs）/g,
    replace: '可持续发展目标',
    description: '可持续发展目标（SDGs） → 可持续发展目标'
  },
  {
    search: /净化仪式（Misogi）/g,
    replace: '净化仪式',
    description: '净化仪式（Misogi） → 净化仪式'
  },
  {
    search: /公顷（ha）/g,
    replace: '公顷',
    description: '公顷（ha） → 公顷'
  },
  {
    search: /祭典吆喝（Yayadoo）/g,
    replace: '祭典吆喝',
    description: '祭典吆喝（Yayadoo） → 祭典吆喝'
  },
  {
    search: /祭神仪式（Otakusen）/g,
    replace: '祭神仪式',
    description: '祭神仪式（Otakusen） → 祭神仪式'
  },
  // 2. 单独的英文介词
  {
    search: /\s+in\s+/g,
    replace: ' ',
    description: '删除英文介词"in"'
  }
];

// 统计结果
const statistics = {
  totalFiles: 0,
  modifiedFiles: 0,
  totalReplacements: 0,
  replacementDetails: new Map()
};

// 需要处理的特定文件
const TARGET_FILES = [
  'app/chiba/hanabi/activity-you2025-72437548/page.tsx',
  'app/kanagawa/hanabi/activity-2025-02167948/page.tsx',
  'app/kanagawa/matsuri/activity-48887806/page.tsx',
  'app/kitakanto/hanami/activity-34114046/page.tsx',
  'app/kitakanto/matsuri/activity-53460408/page.tsx',
  'app/koshinetsu/matsuri/activity-54877720/page.tsx'
];

function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    let newContent = content;
    const appliedRules = [];

    // 应用所有清理规则
    FINAL_CLEANUP_RULES.forEach(rule => {
      const beforeCount = (newContent.match(rule.search) || []).length;
      if (beforeCount > 0) {
        newContent = newContent.replace(rule.search, rule.replace);
        const afterCount = (newContent.match(rule.search) || []).length;
        const replacementCount = beforeCount - afterCount;
        
        if (replacementCount > 0) {
          modified = true;
          appliedRules.push(`${rule.description} (${replacementCount}次)`);
          
          // 统计
          const existing = statistics.replacementDetails.get(rule.description) || 0;
          statistics.replacementDetails.set(rule.description, existing + replacementCount);
          statistics.totalReplacements += replacementCount;
        }
      }
    });

    if (modified) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      statistics.modifiedFiles++;
      console.log(`✅ ${filePath}`);
      appliedRules.forEach(rule => console.log(`   ${rule}`));
    } else {
      console.log(`⭕ ${filePath} - 无需修改`);
    }

  } catch (error) {
    console.log(`❌ ${filePath} - 处理失败: ${error.message}`);
  }
}

// 处理目标文件
console.log('开始处理目标文件...\n');

TARGET_FILES.forEach(filePath => {
  const fullPath = path.resolve(filePath);
  if (fs.existsSync(fullPath)) {
    statistics.totalFiles++;
    processFile(fullPath);
  } else {
    console.log(`⚠️  ${filePath} - 文件不存在`);
  }
});

// 输出统计结果
console.log('\n📊 最终清理统计:');
console.log('==================');
console.log(`处理文件总数: ${statistics.totalFiles}`);
console.log(`修改文件数量: ${statistics.modifiedFiles}`);
console.log(`总替换次数: ${statistics.totalReplacements}`);

if (statistics.replacementDetails.size > 0) {
  console.log('\n🔍 清理规则应用详情:');
  console.log('====================');
  for (const [rule, count] of statistics.replacementDetails) {
    console.log(`${rule}: ${count}次`);
  }
}

console.log(`\n✅ 最终清理完成！处理 ${statistics.modifiedFiles} 个文件`); 