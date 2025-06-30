const fs = require('fs');
const path = require('path');
const glob = require('glob');

const sourceDir = 'C:\\Users\\GAKU\\Desktop\\Kanto Guide\\src\\data';
const targetDir = 'src\\data';

// 需要的数据文件列表（从TypeScript错误中提取）
const neededFiles = [
  // Chiba
  'level4-august-hanabi-ichikawa.ts',
  'level4-october-chiba-urayasu-hanabi.ts', 
  'level4-yachiyo-furusato-oyako-hanabi.ts',
  
  // Kanagawa
  'level4-august-atsugi-ayu-matsuri.ts',
  'level4-kawasaki-tamagawa-hanabi.ts',
  'level4-august-odawara-sakawa-hanabi.ts',
  'level4-sagamihara-hanabi.ts',
  'level4-august-southern-beach-chigasaki.ts',
  'level4-june-yokohama-kaikou-matsuri.ts',
  'level4-yokohama-kaisai-hanabi.ts',
  
  // Kitakanto
  'koga-hanabi-2025.ts',
  'maebashi-hanabi-2025.ts',
  'mitokoumon-matsuri-hanabi-2025.ts',
  'oyama-hanabi-2025.ts',
  'tamamura-hanabi-2025.ts',
  'tonegawa-hanabi-2025.ts',
  'tsuchiura-hanabi-2025.ts',
  
  // Koshinetsu
  'level4-august-chikuma-chikumagawa-hanabi.ts',
  'level4-ichikawa-shinmei-hanabi.ts',
  'level4-august-isawa-onsen-hanabi.ts',
  'level4-august-yamanakako-houkosai-hanabi.ts',
  
  // Saitama
  'level4-seibu-en-hanabi-2025.ts',
  
  // Tokyo
  'level5-august-akishima-hanabi.ts',
  'level5-august-edogawa-hanabi.ts',
  'level5-august-itabashi-hanabi.ts',
  'level5-july-hanabi-katsushika-noryo.ts'
];

// 查找原项目中的相似文件
function findSimilarFile(fileName) {
  // 去掉路径和扩展名
  const baseName = path.basename(fileName, '.ts');
  
  // 在原项目中搜索相似的文件
  const patterns = [
    `${sourceDir}\\${fileName}`,
    `${sourceDir}\\*${baseName}*.ts`,
    `${sourceDir}\\hanabi\\**\\*${baseName}*.ts`,
    `${sourceDir}\\**\\*${baseName}*.ts`
  ];
  
  for (const pattern of patterns) {
    try {
      const files = glob.sync(pattern);
      if (files.length > 0) {
        return files[0];
      }
    } catch (error) {
      // 继续尝试下一个模式
    }
  }
  
  // 尝试部分匹配
  const keywords = baseName.split('-');
  for (const keyword of keywords) {
    if (keyword.length > 3) { // 只使用较长的关键词
      try {
        const files = glob.sync(`${sourceDir}\\**\\*${keyword}*.ts`);
        if (files.length > 0) {
          return files[0];
        }
      } catch (error) {
        // 继续
      }
    }
  }
  
  return null;
}

// 复制文件
function copyFile(sourcePath, targetPath) {
  try {
    // 确保目标目录存在
    const targetDir = path.dirname(targetPath);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    
    // 复制文件
    fs.copyFileSync(sourcePath, targetPath);
    console.log(`✅ 复制: ${path.basename(sourcePath)} -> ${targetPath}`);
    return true;
  } catch (error) {
    console.error(`❌ 复制失败: ${sourcePath} -> ${targetPath}`, error.message);
    return false;
  }
}

function main() {
  console.log('🔍 开始查找和复制缺失的数据文件...\n');
  
  let foundCount = 0;
  let copiedCount = 0;
  
  neededFiles.forEach(fileName => {
    console.log(`\n🔍 查找: ${fileName}`);
    
    const sourcePath = findSimilarFile(fileName);
    if (sourcePath) {
      console.log(`📁 找到: ${sourcePath}`);
      foundCount++;
      
      const targetPath = path.join(targetDir, fileName);
      if (copyFile(sourcePath, targetPath)) {
        copiedCount++;
      }
    } else {
      console.log(`❌ 未找到: ${fileName}`);
    }
  });
  
  console.log(`\n📊 复制统计:`);
  console.log(`- 需要文件: ${neededFiles.length}`);
  console.log(`- 找到文件: ${foundCount}`);
  console.log(`- 成功复制: ${copiedCount}`);
  console.log(`- 成功率: ${((copiedCount / neededFiles.length) * 100).toFixed(1)}%`);
}

main(); 