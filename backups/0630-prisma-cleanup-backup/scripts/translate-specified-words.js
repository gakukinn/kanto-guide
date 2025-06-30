const fs = require('fs');
const path = require('path');

console.log('🔧 开始翻译用户指定的英文词汇...\n');

// 用户指定的翻译映射表
const TRANSLATION_MAP = {
  'SNS': '社交媒体',
  'Love': '爱',
  'Peace': '和平',
  'Love & Peace': '爱与和平',
  'Ultra Jumbo': '超大型',
  'STARMINE': '连续花火',
  'MUSIC STARMINE': '音乐连续花火',
  'make history': '创造历史',
  'Mito': '水户',
  'Chichibu': '秩父',
  'Koenji': '高円寺'
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

  // 按照长度排序，优先替换长词汇
  const sortedKeys = Object.keys(TRANSLATION_MAP).sort((a, b) => b.length - a.length);

  sortedKeys.forEach(englishWord => {
    const chineseWord = TRANSLATION_MAP[englishWord];
    
    // 使用全局正则替换
    const regex = new RegExp(escapeRegExp(englishWord), 'g');
    const matches = modifiedContent.match(regex);
    
    if (matches) {
      modifiedContent = modifiedContent.replace(regex, chineseWord);
      replacements[englishWord] = matches.length;
      hasChanges = true;
      
      // 更新全局统计
      if (!statistics.replacementsByWord[englishWord]) {
        statistics.replacementsByWord[englishWord] = 0;
      }
      statistics.replacementsByWord[englishWord] += matches.length;
      statistics.totalReplacements += matches.length;
    }
  });

  return {
    content: modifiedContent,
    replacements,
    hasChanges
  };
}

// 转义正则表达式特殊字符
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// 处理单个页面
function processPage(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const relativePath = path.relative('app', filePath);
    
    statistics.totalPages++;
    
    // 翻译内容
    const result = translateContent(content);
    
    if (result.hasChanges) {
      // 写入修改后的文件
      fs.writeFileSync(filePath, result.content, 'utf8');
      
      statistics.modifiedPages++;
      statistics.modifiedFiles.push({
        path: relativePath,
        replacements: result.replacements
      });
      
      console.log(`✅ ${relativePath}:`);
      Object.entries(result.replacements).forEach(([englishWord, count]) => {
        console.log(`   ${englishWord} → ${TRANSLATION_MAP[englishWord]} (${count}次)`);
      });
      console.log();
    }
    
  } catch (error) {
    console.log(`❌ 处理文件失败: ${filePath}, 错误: ${error.message}`);
  }
}

// 扫描所有四层页面
function scanFourthLayerPages() {
  const appDir = './app';
  const fourthLayerPages = [];

  function scanDirectory(dir) {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        scanDirectory(fullPath);
      } else if (item === 'page.tsx' && isFourthLayerPage(fullPath)) {
        fourthLayerPages.push(fullPath);
      }
    }
  }

  scanDirectory(appDir);
  return fourthLayerPages;
}

// 主函数
function main() {
  console.log('📋 用户指定翻译词汇清单:');
  console.log('=' .repeat(60));
  Object.entries(TRANSLATION_MAP).forEach(([english, chinese]) => {
    console.log(`${english.padEnd(20)} → ${chinese}`);
  });
  console.log('=' .repeat(60));
  console.log();

  const fourthLayerPages = scanFourthLayerPages();
  
  console.log(`📊 找到 ${fourthLayerPages.length} 个四层页面，开始翻译...\n`);
  
  fourthLayerPages.forEach(filePath => {
    processPage(filePath);
  });
  
  // 输出统计结果
  console.log('📊 翻译统计结果:');
  console.log('=' .repeat(60));
  console.log(`总页面数: ${statistics.totalPages}`);
  console.log(`修改页面数: ${statistics.modifiedPages}`);
  console.log(`总替换次数: ${statistics.totalReplacements}`);
  console.log();
  
  if (Object.keys(statistics.replacementsByWord).length > 0) {
    console.log('📈 各词汇替换统计:');
    console.log('=' .repeat(60));
    Object.entries(statistics.replacementsByWord)
      .sort((a, b) => b[1] - a[1])
      .forEach(([word, count]) => {
        console.log(`${word.padEnd(20)} → ${TRANSLATION_MAP[word].padEnd(15)} (${count}次)`);
      });
    console.log();
  }
  
  console.log('✅ 翻译完成！');
  console.log(`🎯 共处理 ${statistics.modifiedPages} 个页面，完成 ${statistics.totalReplacements} 处翻译`);
}

// 运行主函数
main(); 