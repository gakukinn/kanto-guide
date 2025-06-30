const fs = require('fs');
const path = require('path');

console.log('🔍 检查四层页面description字段中的英文内容...\n');

// 统计结果
const statistics = {
  totalPages: 0,
  pagesWithEnglish: 0,
  totalEnglishWords: 0,
  englishWords: new Map(),
  problemPages: []
};

// 英文检测正则 - 只检测连续的英文单词
const ENGLISH_PATTERN = /\b[A-Za-z]{2,}(?:\s+[A-Za-z]+)*\b/g;

// 需要排除的技术词汇和组件名
const EXCLUDE_WORDS = new Set([
  'tsx', 'jsx', 'div', 'className', 'import', 'export', 'default', 'const', 'let', 'var',
  'function', 'return', 'if', 'else', 'for', 'while', 'true', 'false', 'null', 'undefined',
  'React', 'Component', 'Props', 'useState', 'useEffect', 'NextJS', 'Next', 'js', 'css',
  'html', 'src', 'href', 'alt', 'title', 'meta', 'head', 'body', 'main', 'section',
  'article', 'header', 'footer', 'nav', 'aside', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'p', 'span', 'a', 'img', 'button', 'input', 'form', 'label', 'select', 'option',
  'textarea', 'table', 'tr', 'td', 'th', 'thead', 'tbody', 'tfoot',
  'UniversalStaticDetailTemplate', 'RegionPageTemplate', 'WalkerPlusHanabiTemplate',
  'string', 'number', 'boolean', 'object', 'array', 'any', 'void', 'interface', 'type',
  'async', 'await', 'Promise', 'Array', 'Object', 'String', 'Number', 'Boolean',
  'console', 'log', 'error', 'warn', 'info', 'debug',
  'metadata', 'Metadata', 'generateMetadata', 'params', 'searchParams'
]);

// 检查是否是四层页面
function isFourthLayerPage(filePath) {
  const relativePath = path.relative('app', filePath);
  const pathParts = relativePath.split(path.sep);
  return pathParts.length === 4 && pathParts[3] === 'page.tsx';
}

// 提取description字段的值
function extractDescriptionValue(content) {
  // 匹配 description: "..." 或 description: '...' 格式
  const descriptionMatch = content.match(/description:\s*['"`]([^'"`]*?)['"`]/);
  if (descriptionMatch) {
    return descriptionMatch[1];
  }
  return null;
}

// 检测文本中的英文
function findEnglishWords(text) {
  if (!text) return [];
  
  const matches = text.match(ENGLISH_PATTERN) || [];
  return matches.filter(word => {
    // 过滤掉技术词汇和短词
    if (EXCLUDE_WORDS.has(word) || word.length < 2) {
      return false;
    }
    // 过滤掉数字
    if (/^\d+$/.test(word)) {
      return false;
    }
    return true;
  });
}

// 扫描目录下的所有四层页面
function scanDirectory(dir) {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    
    if (item.isDirectory()) {
      scanDirectory(fullPath);
    } else if (item.isFile() && item.name === 'page.tsx' && isFourthLayerPage(fullPath)) {
      analyzePageFile(fullPath);
    }
  }
}

// 分析单个页面文件
function analyzePageFile(filePath) {
  try {
    statistics.totalPages++;
    
    const content = fs.readFileSync(filePath, 'utf8');
    const descriptionValue = extractDescriptionValue(content);
    
    if (!descriptionValue) {
      console.log(`⚠️  ${filePath} - 未找到description字段`);
      return;
    }
    
    const englishWords = findEnglishWords(descriptionValue);
    
    if (englishWords.length > 0) {
      statistics.pagesWithEnglish++;
      statistics.totalEnglishWords += englishWords.length;
      
      // 记录问题页面
      statistics.problemPages.push({
        file: filePath,
        description: descriptionValue,
        englishWords: englishWords
      });
      
      // 统计词频
      englishWords.forEach(word => {
        const count = statistics.englishWords.get(word) || 0;
        statistics.englishWords.set(word, count + 1);
      });
      
      console.log(`🔴 ${filePath}`);
      console.log(`   Description: ${descriptionValue}`);
      console.log(`   英文词汇: ${englishWords.join(', ')}`);
      console.log('');
    } else {
      console.log(`✅ ${filePath} - description无英文`);
    }
    
  } catch (error) {
    console.error(`❌ 处理文件时出错 ${filePath}:`, error.message);
  }
}

// 开始扫描
console.log('开始扫描四层页面...\n');
scanDirectory('app');

// 输出统计结果
console.log('\n📊 检查结果统计:');
console.log('==================');
console.log(`总四层页面数: ${statistics.totalPages}`);
console.log(`包含英文的页面: ${statistics.pagesWithEnglish}`);
console.log(`英文词汇总数: ${statistics.totalEnglishWords}`);

if (statistics.englishWords.size > 0) {
  console.log('\n🔍 英文词汇频率统计:');
  console.log('====================');
  
  // 按频率排序
  const sortedWords = Array.from(statistics.englishWords.entries())
    .sort((a, b) => b[1] - a[1]);
  
  sortedWords.forEach(([word, count]) => {
    console.log(`${word}: ${count}次`);
  });
}

if (statistics.problemPages.length > 0) {
  console.log('\n⚠️  需要处理的页面详情:');
  console.log('========================');
  statistics.problemPages.forEach((page, index) => {
    console.log(`${index + 1}. ${page.file}`);
    console.log(`   原文: ${page.description}`);
    console.log(`   英文: ${page.englishWords.join(', ')}`);
    console.log('');
  });
}

console.log(`\n${statistics.pagesWithEnglish > 0 ? '❌' : '✅'} 检查完成！${statistics.pagesWithEnglish > 0 ? '发现需要翻译的英文内容' : '所有description字段均为中文'}`); 