const fs = require('fs');
const path = require('path');

// 需要修复的导出名称映射
const exportFixes = [
  {
    file: 'src/data/hanabi/kanagawa/level4-august-atsugi-ayu-matsuri.ts',
    oldExport: 'atsugiAyuMatsuriData',
    newExport: 'atsugiAyuMatsuriData',
    currentExport: 'eventData' // 如果当前导出是这个名称
  },
  {
    file: 'src/data/hanabi/kanagawa/level4-august-odawara-sakawa-hanabi.ts',
    oldExport: 'odawaraSakawaHanabiData',
    newExport: 'odawaraSakawaHanabiData',
    currentExport: 'eventData'
  },
  {
    file: 'src/data/hanabi/kanagawa/level4-august-southern-beach-chigasaki.ts',
    oldExport: 'southernBeachChigasakiData',
    newExport: 'southernBeachChigasakiData',
    currentExport: 'eventData'
  },
  {
    file: 'src/data/hanabi/kitakanto/maebashi-hanabi-2025.ts',
    oldExport: 'maebashiHanabi2025Data',
    newExport: 'maebashiHanabi2025Data',
    currentExport: 'maebashiHanabiData'
  },
  {
    file: 'src/data/hanabi/kitakanto/oyama-hanabi-2025.ts',
    oldExport: 'oyamaHanabi2025Data',
    newExport: 'oyamaHanabi2025Data',
    currentExport: 'oyamaHanabiData'
  },
  {
    file: 'src/data/hanabi/kitakanto/tamamura-hanabi-2025.ts',
    oldExport: 'tamamuraHanabi2025Data',
    newExport: 'tamamuraHanabi2025Data',
    currentExport: 'tamuraHanabiData'
  },
  {
    file: 'src/data/hanabi/koshinetsu/level4-ichikawa-shinmei-hanabi.ts',
    oldExport: 'ichikawaShinmeiHanabiData',
    newExport: 'ichikawaShinmeiHanabiData',
    currentExport: 'shinmeiHanabiData'
  }
];

function fixExportName(filePath, currentExport, newExport) {
  try {
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️ 文件不存在: ${filePath}`);
      return false;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    
    // 查找并替换导出语句
    const exportRegex = new RegExp(`export\\s*{\\s*${currentExport}\\s*}`, 'g');
    const constRegex = new RegExp(`export\\s+const\\s+${currentExport}`, 'g');
    
    let hasChanges = false;
    
    if (content.includes(`export { ${currentExport} }`)) {
      content = content.replace(exportRegex, `export { ${newExport} }`);
      hasChanges = true;
    }
    
    if (content.includes(`export const ${currentExport}`)) {
      content = content.replace(constRegex, `export const ${newExport}`);
      hasChanges = true;
    }
    
    // 同时需要替换变量名声明
    const varRegex = new RegExp(`const\\s+${currentExport}\\s*:`, 'g');
    if (content.includes(`const ${currentExport}:`)) {
      content = content.replace(varRegex, `const ${newExport}:`);
      hasChanges = true;
    }
    
    if (hasChanges) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ 修复导出: ${filePath} (${currentExport} -> ${newExport})`);
      return true;
    } else {
      console.log(`ℹ️ 无需修复: ${filePath}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ 修复失败: ${filePath}`, error.message);
    return false;
  }
}

function main() {
  console.log('🔧 开始修复导出名称不匹配问题...\n');
  
  let fixedCount = 0;
  
  exportFixes.forEach(({ file, currentExport, newExport }) => {
    if (fixExportName(file, currentExport, newExport)) {
      fixedCount++;
    }
  });
  
  console.log(`\n📊 修复统计:`);
  console.log(`- 需要修复: ${exportFixes.length}`);
  console.log(`- 成功修复: ${fixedCount}`);
  console.log(`- 成功率: ${((fixedCount / exportFixes.length) * 100).toFixed(1)}%`);
}

main(); 