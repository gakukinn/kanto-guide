const fs = require('fs');
const path = require('path');

console.log('🔍 检查Level 5文件重复情况\n');

const dataDir = path.join(__dirname, '../src/data');

// 获取所有Level 5文件
function getAllLevel5Files() {
  return fs.readdirSync(dataDir).filter(f => 
    f.startsWith('level5-july-hanabi-') && f.endsWith('.ts')
  );
}

// 分析重复文件
function findDuplicates() {
  const files = getAllLevel5Files();
  const duplicateGroups = {};
  
  files.forEach(file => {
    // 提取花火名称的关键部分
    let key = file.replace('level5-july-hanabi-', '').replace('.ts', '');
    
    // 标准化命名，找出重复
    const normalized = normalizeEventName(key);
    
    if (!duplicateGroups[normalized]) {
      duplicateGroups[normalized] = [];
    }
    duplicateGroups[normalized].push(file);
  });
  
  return duplicateGroups;
}

// 标准化事件名称
function normalizeEventName(eventName) {
  // 移除地区前缀，专注于事件本身
  let normalized = eventName;
  
  // 千叶相关重复检查
  if (normalized.includes('chiba-') && !normalized.startsWith('chiba-')) {
    // 移除chiba-前缀
    normalized = normalized.replace(/^.*chiba-/, '');
  }
  
  // 东京相关重复检查
  if (normalized.includes('tokyo-') && !normalized.startsWith('tokyo-')) {
    normalized = normalized.replace(/^.*tokyo-/, '');
  }
  
  // 神奈川相关重复检查
  if (normalized.includes('kanagawa-') && !normalized.startsWith('kanagawa-')) {
    normalized = normalized.replace(/^.*kanagawa-/, '');
  }
  
  // 特殊情况处理
  const mappings = {
    'futtsu': 'chiba-futtsu',
    'kamogawa': 'chiba-kamogawa', 
    'marines': 'chiba-marines',
    'motherfarm': 'chiba-motherfarm',
    'oamishirasato': 'chiba-oamishirasato',
    'shirahama-ama': 'chiba-shirahama',
    'kamakura': 'kanagawa-kamakura',
    'nightflowers': 'kanagawa-nightflowers',
    'seaparadise': 'kanagawa-seaparadise',
    'yokohama-night': 'kanagawa-yokohama-night',
    'hachioji': 'tokyo-hachioji',
    'katsushika-noryo': 'tokyo-katsushika',
    'tachikawa-showa': 'tokyo-tachikawa'
  };
  
  if (mappings[normalized]) {
    normalized = mappings[normalized];
  }
  
  return normalized;
}

// 主函数
function main() {
  const duplicateGroups = findDuplicates();
  const files = getAllLevel5Files();
  
  console.log(`📊 总计: ${files.length} 个Level 5文件\n`);
  
  console.log('📁 所有Level 5文件列表:');
  files.forEach((file, index) => {
    console.log(`${index + 1}. ${file}`);
  });
  
  console.log('\n🔍 重复文件分析:');
  
  let duplicateCount = 0;
  let totalDuplicateFiles = 0;
  
  Object.entries(duplicateGroups).forEach(([normalized, fileList]) => {
    if (fileList.length > 1) {
      duplicateCount++;
      totalDuplicateFiles += fileList.length;
      
      console.log(`\n⚠️  重复组 ${duplicateCount}: ${normalized}`);
      fileList.forEach(file => {
        console.log(`   - ${file}`);
      });
    }
  });
  
  if (duplicateCount === 0) {
    console.log('✅ 未发现重复文件');
  } else {
    console.log(`\n📊 重复统计:`);
    console.log(`- 重复组数: ${duplicateCount}`);
    console.log(`- 重复文件总数: ${totalDuplicateFiles}`);
    console.log(`- 冗余文件数: ${totalDuplicateFiles - duplicateCount}`);
    console.log(`- 预期文件数: ${files.length - (totalDuplicateFiles - duplicateCount)}`);
  }
}

main(); 