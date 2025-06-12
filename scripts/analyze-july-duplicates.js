#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function analyzeJulyDuplicates() {
  const dataDir = path.join(process.cwd(), 'src/data');
  
  // 获取所有7月文件
  const julyFiles = fs.readdirSync(dataDir).filter(file => 
    file.startsWith('level5-july') && file.endsWith('.ts')
  ).sort();

  console.log(`\n📊 7月花火文件分析:`);
  console.log(`总文件数: ${julyFiles.length} 个\n`);

  // 分析可能的重复项
  const duplicates = {};
  const keywords = [];
  
  julyFiles.forEach((file, index) => {
    const cleanName = file.replace('level5-july-hanabi-', '').replace('.ts', '');
    keywords.push(cleanName);
    console.log(`${index + 1}. ${cleanName}`);
  });

  console.log(`\n🔍 查找可能的重复项:`);
  
  // 检查明显的重复
  const potentialDuplicates = [
    ['chiba-futtsu', 'futtsu'],
    ['chiba-kamogawa', 'kamogawa'], 
    ['chiba-marines', 'marines'],
    ['chiba-motherfarm', 'motherfarm'],
    ['chiba-oamishirasato', 'oamishirasato'],
    ['kanagawa-kamakura', 'kamakura'],
    ['kanagawa-seaparadise', 'seaparadise'],
    ['katsushika-noryo', 'tokyo-katsushika'],
    ['tachikawa-showa', 'tokyo-tachikawa'],
    ['kanagawa-nightflowers', 'yokohama-night']
  ];

  let duplicateCount = 0;
  potentialDuplicates.forEach(([file1, file2]) => {
    if (keywords.includes(file1) && keywords.includes(file2)) {
      console.log(`⚠️  可能重复: ${file1} <-> ${file2}`);
      duplicateCount++;
    }
  });

  console.log(`\n📋 分析结果:`);
  console.log(`总文件数: ${julyFiles.length}`);
  console.log(`可能重复组: ${duplicateCount} 组`);
  console.log(`估计实际花火数量: ${julyFiles.length - duplicateCount} 个`);

  return {
    total: julyFiles.length,
    duplicates: duplicateCount,
    estimated: julyFiles.length - duplicateCount
  };
}

if (require.main === module) {
  analyzeJulyDuplicates();
}

module.exports = { analyzeJulyDuplicates }; 