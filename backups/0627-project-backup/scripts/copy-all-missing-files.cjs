const fs = require('fs');
const path = require('path');

const sourceDir = 'C:\\Users\\GAKU\\Desktop\\Kanto Guide\\src\\data';
const targetDir = 'src\\data';

// 需要复制的所有缺失文件
const missingFiles = [
  // Tokyo 缺失的文件
  { source: 'level5-august-akishima-hanabi.ts', target: 'level5-august-akishima-hanabi.ts' },
  { source: 'level5-august-edogawa-hanabi.ts', target: 'level5-august-edogawa-hanabi.ts' },
  { source: 'level5-august-itabashi-hanabi.ts', target: 'level5-august-itabashi-hanabi.ts' },
  { source: 'level5-july-hanabi-katsushika-noryo.ts', target: 'level5-july-hanabi-katsushika-noryo.ts' },
  
  // Tokyo hanabi子目录
  { source: 'level5-august-kozushima-hanabi.ts', target: 'hanabi/tokyo/level4-august-kozushima-hanabi.ts' },
  { source: 'level5-july-hanabi-mikurajima.ts', target: 'hanabi/tokyo/level4-july-hanabi-mikurajima.ts' },
  { source: 'level5-august-okutama-hanabi.ts', target: 'hanabi/tokyo/level4-august-okutama-hanabi.ts' },
  { source: 'level5-august-jingu-gaien-hanabi.ts', target: 'hanabi/tokyo/level4-august-jingu-gaien-hanabi.ts' },
  { source: 'level5-july-hanabi-tachikawa-showa.ts', target: 'hanabi/tokyo/level4-july-hanabi-tachikawa-showa.ts' },
  { source: 'level5-setagaya-tamagawa-hanabi.ts', target: 'hanabi/tokyo/level4-setagaya-tamagawa-hanabi.ts' },
  
  // Chiba 缺失的文件
  { source: 'level5-yachiyo-furusato-oyako-hanabi.ts', target: 'hanabi/chiba/level4-yachiyo-furusato-oyako-hanabi.ts' },
  { source: 'level5-october-chiba-urayasu-hanabi.ts', target: 'hanabi/chiba/level4-october-chiba-urayasu-hanabi.ts' },
  
  // Kanagawa 缺失的文件
  { source: 'level5-kawasaki-tamagawa-hanabi.ts', target: 'hanabi/kanagawa/level4-kawasaki-tamagawa-hanabi.ts' },
  { source: 'level5-sagamihara-hanabi.ts', target: 'hanabi/kanagawa/level4-sagamihara-hanabi.ts' },
  { source: 'level5-june-yokohama-kaikou-matsuri.ts', target: 'hanabi/kanagawa/level4-june-yokohama-kaikou-matsuri.ts' },
  { source: 'level5-yokohama-kaisai-hanabi.ts', target: 'hanabi/kanagawa/level4-yokohama-kaisai-hanabi.ts' },
  
  // Kitakanto 缺失的文件
  { source: 'level5-august-tsuchiura-hanabi.ts', target: 'hanabi/kitakanto/tsuchiura-hanabi-2025.ts' },
  
  // Koshinetsu 缺失的文件
  { source: 'level5-august-chikuma-chikumagawa-hanabi.ts', target: 'hanabi/koshinetsu/level4-august-chikuma-chikumagawa-hanabi.ts' },
  { source: 'level5-august-isawa-onsen-hanabi.ts', target: 'hanabi/koshinetsu/level4-august-isawa-onsen-hanabi.ts' },
  { source: 'level5-august-yamanakako-houkosai-hanabi.ts', target: 'hanabi/koshinetsu/level4-august-yamanakako-houkosai-hanabi.ts' },
  
  // 其他可能存在的文件（从原项目中找相似的）
  { source: 'level5-fuji-kawaguchi-lake-hanabi.ts', target: 'koshinetsu/hanabi/kawaguchiko-kojosai-2025.json', isJson: true }
];

function copyFileWithConversion(sourcePath, targetPath, isJson = false) {
  try {
    if (!fs.existsSync(sourcePath)) {
      console.log(`⚠️ 源文件不存在: ${path.basename(sourcePath)}`);
      return false;
    }

    // 确保目标目录存在
    const targetDir = path.dirname(targetPath);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    if (isJson) {
      // 如果需要转换为JSON格式
      let content = fs.readFileSync(sourcePath, 'utf8');
      // 这里可以添加TS到JSON的转换逻辑
      // 暂时先复制原文件
      fs.copyFileSync(sourcePath, targetPath.replace('.json', '.ts'));
      console.log(`✅ 复制 (转换): ${path.basename(sourcePath)} -> ${targetPath.replace('.json', '.ts')}`);
    } else {
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`✅ 复制: ${path.basename(sourcePath)} -> ${targetPath}`);
    }
    return true;
  } catch (error) {
    console.error(`❌ 复制失败: ${path.basename(sourcePath)}`, error.message);
    return false;
  }
}

function main() {
  console.log('📁 开始从原项目复制所有缺失的数据文件...\n');
  
  let copiedCount = 0;
  let totalCount = missingFiles.length;
  
  missingFiles.forEach(({ source, target, isJson = false }) => {
    const sourcePath = path.join(sourceDir, source);
    const targetPath = path.join(targetDir, target);
    
    if (copyFileWithConversion(sourcePath, targetPath, isJson)) {
      copiedCount++;
    }
  });
  
  // 同时尝试复制一些可能有用的文件
  console.log('\n🔍 查找其他可能有用的文件...');
  
  const additionalFiles = [
    'level5-august-tsuchiura-hanabi.ts',
    'level5-yachiyo-furusato-oyako-hanabi.ts', 
    'level5-october-chiba-urayasu-hanabi.ts',
    'level5-kawasaki-tamagawa-hanabi.ts',
    'level5-sagamihara-hanabi.ts',
    'level5-june-yokohama-kaikou-matsuri.ts',
    'level5-yokohama-kaisai-hanabi.ts'
  ];
  
  additionalFiles.forEach(fileName => {
    const sourcePath = path.join(sourceDir, fileName);
    if (fs.existsSync(sourcePath)) {
      const targetPath = path.join(targetDir, fileName);
      if (copyFileWithConversion(sourcePath, targetPath)) {
        copiedCount++;
        totalCount++;
      }
    }
  });
  
  console.log(`\n📊 复制统计:`);
  console.log(`- 总文件数: ${totalCount}`);
  console.log(`- 成功复制: ${copiedCount}`);
  console.log(`- 成功率: ${((copiedCount / totalCount) * 100).toFixed(1)}%`);
}

main(); 