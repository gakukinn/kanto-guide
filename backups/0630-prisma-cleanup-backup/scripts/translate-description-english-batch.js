const fs = require('fs');
const path = require('path');

console.log('🌐 批量翻译四层页面description中的英文词汇...\n');

// 翻译对照表 - 根据用户提供的详细对照表
const TRANSLATION_MAP = {
  // 高频词汇
  'BGM': '背景音乐',
  'JR': '日本铁路',
  
  // 中低频词汇 - 根据用户提供的对照表
  'ji': '寺',  // 用于如"XX-ji" → "XX寺"
  'Sayya': '祭典吆喝声',
  'YOU': 'YOU・游',  // 保留活动原名，同时中文可理解
  'Gionkai': '祇园会',
  'Ondo': '音头舞',
  'Sujiki': '座席',
  'SDGs': '可持续发展目标（SDGs）',
  'in': '',  // 英文介词，根据上下文删除或替换
  'Shoshu': '神道宗派',
  'mosogi': '净化仪式（Misogi）',
  'Aramiya': '荒宫神轿',
  'Howaen': '保和苑',
  'Howa': '保和',
  'en': '苑',
  'ha': '公顷（ha）',
  'Heisei': '平成',
  'Yakumo': '八云神社',
  'Harika': '张子人偶',
  'san': '',  // 敬语后缀，用于地名时删除
  'Yayadoo': '祭典吆喝（Yayadoo）',
  'Daiko': '太鼓',
  'Matsuri Hayashi': '祭典音乐',
  'Ayumu': '步',
  'YouTube': '油管',
  'Yakizaki': '烧崎公园',
  'Otakusen': '祭神仪式（Otakusen）',
  'Oshagiri': '花车',
  'Minatomachi': '港町',
  'Nogoji Ajisai': '能护寺绣球花',
  'Hozan': '宝山神社',
  'Mantoku': '万德号',
  'shane': '号',
  'Soke': '宗家',
  'Shaka': '释迦',
  'gami': '神',  // 如"XX-gami" → "XX神"
  'SL': '蒸汽机车',
  'Za': '座'   // 如"XX-Za" → "XX座"
};

// 特殊处理规则
const SPECIAL_REPLACEMENTS = [
  // ji 后缀处理
  { pattern: /(\w+)-ji寺/g, replacement: '$1寺' },
  { pattern: /長谷寺-ji寺/g, replacement: '长谷寺' },
  
  // gami 后缀处理  
  { pattern: /Shaka-gami玉/g, replacement: '释迦神玉' },
  
  // Za 前缀处理
  { pattern: /Za-高円寺/g, replacement: '座・高圆寺' },
  
  // shane 后缀处理
  { pattern: /Mantoku-shane/g, replacement: '万德号' },
  
  // 复合词处理
  { pattern: /Howa-en/g, replacement: '保和苑' },
  { pattern: /Harika-san/g, replacement: '张子人偶' },
  
  // 特殊上下文处理
  { pattern: /SDGs\s*in\s*ヨコハマ/g, replacement: '可持续发展目标（SDGs）横浜' },
  { pattern: /\s*in\s*横浜/g, replacement: '横浜' },
  
  // 引号内容处理
  { pattern: /"Sayya，Sayya"/g, replacement: '"祭典吆喝声，祭典吆喝声"' },
  { pattern: /"Yayadoo"/g, replacement: '"祭典吆喝（Yayadoo）"' }
];

// 统计信息
const statistics = {
  totalProcessed: 0,
  filesModified: 0,
  translationsApplied: 0,
  translationDetails: []
};

// 检查是否是四层页面
function isFourthLayerPage(filePath) {
  const relativePath = path.relative('app', filePath);
  const pathParts = relativePath.split(path.sep);
  return pathParts.length === 4 && pathParts[3] === 'page.tsx';
}

// 应用翻译
function applyTranslations(text) {
  let translatedText = text;
  let appliedTranslations = [];
  
  // 首先应用特殊处理规则
  SPECIAL_REPLACEMENTS.forEach(rule => {
    const matches = translatedText.match(rule.pattern);
    if (matches) {
      translatedText = translatedText.replace(rule.pattern, rule.replacement);
      appliedTranslations.push({
        type: 'special',
        original: matches[0],
        translated: rule.replacement
      });
    }
  });
  
  // 然后应用基本翻译映射
  Object.entries(TRANSLATION_MAP).forEach(([english, chinese]) => {
    if (english && chinese && translatedText.includes(english)) {
      const regex = new RegExp(`\\b${english.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g');
      const matches = translatedText.match(regex);
      if (matches) {
        translatedText = translatedText.replace(regex, chinese);
        appliedTranslations.push({
          type: 'basic',
          original: english,
          translated: chinese,
          count: matches.length
        });
      }
    }
  });
  
  return {
    text: translatedText,
    translations: appliedTranslations
  };
}

// 处理单个文件
function processFile(filePath) {
  try {
    statistics.totalProcessed++;
    
    const content = fs.readFileSync(filePath, 'utf8');
    const descriptionMatch = content.match(/description:\s*['"`]([^'"`]*?)['"`]/);
    
    if (!descriptionMatch) {
      console.log(`⚠️  ${filePath} - 未找到description字段`);
      return;
    }
    
    const originalDescription = descriptionMatch[1];
    const result = applyTranslations(originalDescription);
    
    if (result.translations.length > 0) {
      // 替换文件中的description
      const newContent = content.replace(
        /description:\s*(['"`])([^'"`]*?)\1/,
        `description: $1${result.text}$1`
      );
      
      fs.writeFileSync(filePath, newContent, 'utf8');
      statistics.filesModified++;
      statistics.translationsApplied += result.translations.length;
      
      console.log(`✅ ${filePath}`);
      console.log(`   原文: ${originalDescription}`);
      console.log(`   译文: ${result.text}`);
      console.log(`   翻译: ${result.translations.map(t => `${t.original} → ${t.translated}`).join(', ')}`);
      console.log('');
      
      statistics.translationDetails.push({
        file: filePath,
        original: originalDescription,
        translated: result.text,
        translations: result.translations
      });
    } else {
      console.log(`⭕ ${filePath} - description无需翻译`);
    }
    
  } catch (error) {
    console.error(`❌ 处理文件时出错 ${filePath}:`, error.message);
  }
}

// 扫描目录
function scanDirectory(dir) {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    
    if (item.isDirectory()) {
      scanDirectory(fullPath);
    } else if (item.isFile() && item.name === 'page.tsx' && isFourthLayerPage(fullPath)) {
      processFile(fullPath);
    }
  }
}

// 开始处理
console.log('开始批量翻译处理...\n');
scanDirectory('app');

// 输出统计结果
console.log('\n📊 翻译处理统计:');
console.log('==================');
console.log(`处理文件总数: ${statistics.totalProcessed}`);
console.log(`修改文件数量: ${statistics.filesModified}`);
console.log(`应用翻译次数: ${statistics.translationsApplied}`);

// 统计词汇翻译频率
if (statistics.translationDetails.length > 0) {
  const wordStats = new Map();
  
  statistics.translationDetails.forEach(detail => {
    detail.translations.forEach(trans => {
      const key = `${trans.original} → ${trans.translated}`;
      const count = wordStats.get(key) || 0;
      wordStats.set(key, count + (trans.count || 1));
    });
  });
  
  console.log('\n🔍 词汇翻译频率统计:');
  console.log('====================');
  
  Array.from(wordStats.entries())
    .sort((a, b) => b[1] - a[1])
    .forEach(([translation, count]) => {
      console.log(`${translation}: ${count}次`);
    });
}

console.log(`\n${statistics.filesModified > 0 ? '✅' : '⭕'} 翻译完成！${statistics.filesModified > 0 ? `成功翻译 ${statistics.filesModified} 个文件` : '无文件需要翻译'}`); 