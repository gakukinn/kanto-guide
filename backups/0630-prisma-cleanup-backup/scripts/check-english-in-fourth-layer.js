const fs = require('fs');
const path = require('path');

console.log('🔍 检查四层页面重要字段中的英文内容...\n');

// 统计结果
const statistics = {
  totalPages: 0,
  pagesWithEnglish: 0,
  totalEnglishWords: 0,
  englishByField: {
    description: 0,
    contact: 0,
    highlights: 0,
    venue: 0,
    access: 0,
    weatherInfo: 0,
    parking: 0,
    notes: 0
  },
  englishFiles: [],
  fieldIssues: {
    description: [],
    contact: [],
    highlights: [],
    venue: [],
    access: [],
    weatherInfo: [],
    parking: [],
    notes: []
  },
  // 词汇频率统计
  wordFrequency: new Map(),
  fieldWordFrequency: {
    description: new Map(),
    contact: new Map(),
    highlights: new Map(),
    venue: new Map(),
    access: new Map(),
    weatherInfo: new Map(),
    parking: new Map(),
    notes: new Map()
  }
};

// 英文检测正则 - 只检测连续的英文单词
const ENGLISH_PATTERN = /\b[A-Za-z]{2,}(?:\s+[A-Za-z]+)*\b/g;

// 需要检查的字段
const TARGET_FIELDS = ['description', 'contact', 'highlights', 'venue', 'access', 'weatherInfo', 'parking', 'notes'];

// 检查是否是四层页面
function isFourthLayerPage(filePath) {
  const relativePath = path.relative('app', filePath);
  const pathParts = relativePath.split(path.sep);
  return pathParts.length === 4 && pathParts[3] === 'page.tsx';
}

// 提取JSON数据中的目标字段
function extractTargetFields(content) {
  const result = {};
  
  TARGET_FIELDS.forEach(field => {
    // 匹配字段及其值
    const regex = new RegExp(`${field}:\\s*['"\`]([^'"\`]*?)['"\`]`, 'gs');
    const matches = [...content.matchAll(regex)];
    
    if (matches.length > 0) {
      result[field] = matches.map(match => match[1]).join(' ');
    }
    
    // 也检查多行字符串
    const multilineRegex = new RegExp(`${field}:\\s*['"\`]([\\s\\S]*?)['"\`]`, 'gs');
    const multilineMatches = [...content.matchAll(multilineRegex)];
    
    if (multilineMatches.length > 0) {
      const multilineContent = multilineMatches.map(match => match[1]).join(' ');
      result[field] = result[field] ? result[field] + ' ' + multilineContent : multilineContent;
    }
  });
  
  return result;
}

// 检查英文并更新统计
function checkEnglishInFields(fields, filePath) {
  let hasEnglish = false;
  const fileIssues = {};
  
  Object.entries(fields).forEach(([fieldName, fieldContent]) => {
    if (fieldContent) {
      const englishMatches = fieldContent.match(ENGLISH_PATTERN);
      if (englishMatches) {
        hasEnglish = true;
        
        // 更新字段统计
        statistics.englishByField[fieldName] += englishMatches.length;
        statistics.totalEnglishWords += englishMatches.length;
        
        // 记录问题
        if (!statistics.fieldIssues[fieldName]) {
          statistics.fieldIssues[fieldName] = [];
        }
        statistics.fieldIssues[fieldName].push({
          file: filePath,
          words: englishMatches
        });
        
        fileIssues[fieldName] = englishMatches;
        
        // 更新词汇频率统计
        englishMatches.forEach(word => {
          const cleanWord = word.trim();
          if (cleanWord) {
            // 全局频率
            if (!statistics.wordFrequency.has(cleanWord)) {
              statistics.wordFrequency.set(cleanWord, 0);
            }
            statistics.wordFrequency.set(cleanWord, statistics.wordFrequency.get(cleanWord) + 1);
            
            // 字段内频率
            if (!statistics.fieldWordFrequency[fieldName].has(cleanWord)) {
              statistics.fieldWordFrequency[fieldName].set(cleanWord, 0);
            }
            statistics.fieldWordFrequency[fieldName].set(cleanWord, statistics.fieldWordFrequency[fieldName].get(cleanWord) + 1);
          }
        });
      }
    }
  });
  
  return { hasEnglish, issues: fileIssues };
}

// 处理单个页面
function processPage(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const relativePath = path.relative('app', filePath);
    
    statistics.totalPages++;
    
    // 提取目标字段
    const fields = extractTargetFields(content);
    
    // 检查英文
    const result = checkEnglishInFields(fields, relativePath);
    
    if (result.hasEnglish) {
      statistics.pagesWithEnglish++;
      statistics.englishFiles.push({
        path: relativePath,
        issues: result.issues
      });
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
  const fourthLayerPages = scanFourthLayerPages();
  
  console.log(`📊 找到 ${fourthLayerPages.length} 个四层页面，检查目标字段中的英文...\n`);
  console.log(`🎯 检查字段: ${TARGET_FIELDS.join(', ')}\n`);
  
  fourthLayerPages.forEach(filePath => {
    processPage(filePath);
  });
  
  // 输出统计结果
  console.log('📊 英文检查统计结果:');
  console.log('=' .repeat(60));
  console.log(`总页面数: ${statistics.totalPages}`);
  console.log(`包含英文的页面: ${statistics.pagesWithEnglish}`);
  console.log(`英文词汇总数: ${statistics.totalEnglishWords}`);
  console.log();
  
  if (statistics.totalEnglishWords > 0) {
    console.log('📈 按字段分布:');
    console.log('=' .repeat(60));
    Object.entries(statistics.englishByField)
      .filter(([field, count]) => count > 0)
      .sort((a, b) => b[1] - a[1])
      .forEach(([field, count]) => {
        console.log(`${field.padEnd(15)} ${count}个英文词汇`);
      });
    console.log();
    
    console.log('🔥 高频英文词汇 (出现2次及以上):');
    console.log('=' .repeat(60));
    const highFreqWords = [...statistics.wordFrequency.entries()]
      .filter(([word, count]) => count >= 2)
      .sort((a, b) => b[1] - a[1]);
    
    if (highFreqWords.length > 0) {
      highFreqWords.forEach(([word, count]) => {
        console.log(`${word.padEnd(25)} ${count}次`);
      });
    } else {
      console.log('没有发现高频英文词汇（2次及以上）');
    }
    console.log();
    
    console.log('📋 所有英文词汇列表:');
    console.log('=' .repeat(60));
    const allWords = [...statistics.wordFrequency.entries()]
      .sort((a, b) => b[1] - a[1]);
    
    allWords.forEach(([word, count]) => {
      console.log(`${word.padEnd(25)} ${count}次`);
    });
  }
}

// 运行主函数
main(); 