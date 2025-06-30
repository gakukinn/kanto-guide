const fs = require('fs');
const path = require('path');

console.log('🔧 开始翻译最后几个英文词汇...\n');

// 最后的翻译映射表
const TRANSLATION_MAP = {
  'YOSAKOI': '夜来祭',
  'Kannon': '观音',
  'jinja': '神社',
  'Gion': '祇园'
};

// 统计结果
const statistics = {
  totalPages: 0,
  modifiedPages: 0,
  totalReplacements: 0,
  replacementsByWord: {},
  modifiedFiles: []
};

// 检查是否是四层页面
function isFourthLayerPage(filePath) {
  const relativePath = path.relative('app', filePath);
  const pathParts = relativePath.split(path.sep);
  return pathParts.length === 4 && pathParts[3] === 'page.tsx';
}

// 替换文本中的英文词汇
function translateContent(content) {
  let modifiedContent = content;
  let replacements = {};
  let hasChanges = false;

  // 按照词汇长度降序排序，避免短词汇覆盖长词汇
  const sortedWords = Object.keys(TRANSLATION_MAP).sort((a, b) => b.length - a.length);
  
  for (const englishWord of sortedWords) {
    const chineseWord = TRANSLATION_MAP[englishWord];
    
    // 使用全局替换，但要注意词边界
    const regex = new RegExp(`\\b${englishWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g');
    const matches = modifiedContent.match(regex);
    
    if (matches && matches.length > 0) {
      modifiedContent = modifiedContent.replace(regex, chineseWord);
      replacements[englishWord] = matches.length;
      hasChanges = true;
    }
  }

  return { content: modifiedContent, replacements, hasChanges };
}

// 扫描并处理所有四层页面
function processAllPages() {
  const appDir = path.join(process.cwd(), 'app');
  
  function scanDirectory(dir) {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        scanDirectory(fullPath);
      } else if (item === 'page.tsx' && isFourthLayerPage(fullPath)) {
        statistics.totalPages++;
        
        try {
          const content = fs.readFileSync(fullPath, 'utf8');
          const result = translateContent(content);
          
          if (result.hasChanges) {
            fs.writeFileSync(fullPath, result.content, 'utf8');
            statistics.modifiedPages++;
            statistics.modifiedFiles.push(path.relative(process.cwd(), fullPath));
            
            // 统计替换次数
            for (const [word, count] of Object.entries(result.replacements)) {
              if (!statistics.replacementsByWord[word]) {
                statistics.replacementsByWord[word] = 0;
              }
              statistics.replacementsByWord[word] += count;
              statistics.totalReplacements += count;
            }
          }
        } catch (error) {
          console.error(`❌ 处理文件失败: ${fullPath}`, error.message);
        }
      }
    }
  }
  
  scanDirectory(appDir);
}

// 执行处理
console.log('🔍 扫描四层页面...');
processAllPages();

// 输出统计结果
console.log('\n✅ 翻译完成！');
console.log('\n📊 翻译统计:');
console.log(`总页面数: ${statistics.totalPages}`);
console.log(`修改页面数: ${statistics.modifiedPages}`);
console.log(`总翻译次数: ${statistics.totalReplacements}`);

if (statistics.totalReplacements > 0) {
  console.log('\n📈 各词汇翻译次数:');
  const sortedReplacements = Object.entries(statistics.replacementsByWord)
    .sort(([,a], [,b]) => b - a);
  
  for (const [word, count] of sortedReplacements) {
    console.log(`${word.padEnd(15)} ${count}次`);
  }
  
  console.log('\n📁 修改的文件:');
  for (const file of statistics.modifiedFiles) {
    console.log(`- ${file}`);
  }
} else {
  console.log('\n🎯 没有发现需要翻译的词汇。');
} 