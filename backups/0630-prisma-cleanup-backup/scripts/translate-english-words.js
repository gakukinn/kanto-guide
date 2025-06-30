const fs = require('fs');
const path = require('path');

console.log('🔧 开始批量翻译四层页面中的英文词汇...\n');

// 翻译映射表
const TRANSLATION_MAP = {
  'Wide Star Mine': '大型连续花火',
  'Star Mine': '连续花火',
  'Starmine': '连续花火',
  'HASE': '长谷寺',
  'Hase': '长谷寺',
  'hase': '长谷寺',
  'NEPUTA': '灯笼祭',
  'Neputa': '灯笼祭',
  'neputa': '灯笼祭',
  'Jalannet': '旅游网站',
  'mikoshi': '神輿',
  'J-POP BEST': '日系流行音乐精选',
  'POP BEST': '流行音乐精选',
  'Shakugama': '尺玉',
  'KAPPA': '河童',
  'Kappa': '河童',
  'kappa': '河童'
};

// 统计结果
const statistics = {
  totalPages: 0,
  modifiedPages: 0,
  totalReplacements: 0,
  replacementsByWord: {},
  modifiedFiles: []
};

// 需要检查的字段
const TARGET_FIELDS = ['description', 'contact', 'highlights', 'venue', 'access'];

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

  // 按照长度排序，优先替换长词汇（避免 Star Mine 被部分替换为 连续花火 Mine）
  const sortedKeys = Object.keys(TRANSLATION_MAP).sort((a, b) => b.length - a.length);

  sortedKeys.forEach(englishWord => {
    const chineseWord = TRANSLATION_MAP[englishWord];
    
    // 使用全局正则替换，但要注意边界
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
  console.log('📋 翻译词汇清单:');
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
  
  if (statistics.modifiedFiles.length > 0) {
    console.log('📄 修改的文件列表:');
    console.log('=' .repeat(60));
    statistics.modifiedFiles.forEach((file, index) => {
      const totalReplacements = Object.values(file.replacements).reduce((sum, count) => sum + count, 0);
      console.log(`${(index + 1).toString().padStart(2)}. ${file.path.padEnd(45)} (${totalReplacements}处修改)`);
    });
    console.log();
  }
  
  console.log('✅ 翻译完成！');
  console.log(`🎯 共处理 ${statistics.modifiedPages} 个页面，完成 ${statistics.totalReplacements} 处翻译`);
  
  // 生成翻译报告
  const reportData = {
    timestamp: new Date().toISOString(),
    translationMap: TRANSLATION_MAP,
    statistics,
    modifiedFiles: statistics.modifiedFiles
  };
  
  fs.writeFileSync('DOCS/translation-report.json', JSON.stringify(reportData, null, 2));
  console.log('📄 翻译报告已保存到: DOCS/translation-report.json');
}

// 运行主函数
main(); 