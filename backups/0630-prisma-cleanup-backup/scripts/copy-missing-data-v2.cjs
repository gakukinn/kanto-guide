const fs = require('fs');
const path = require('path');
const glob = require('glob');

const sourceDir = 'C:\\Users\\GAKU\\Desktop\\Kanto Guide\\src\\data';
const targetBaseDir = 'src\\data';

// 从grep结果中提取的实际需要的文件路径
const neededFiles = [
  // 直接在data目录下的文件
  { target: 'level5-august-akishima-hanabi.ts', source: 'level5-august-akishima-hanabi.ts' },
  { target: 'level5-august-edogawa-hanabi.ts', source: 'level5-august-edogawa-hanabi.ts' },
  { target: 'level5-august-itabashi-hanabi.ts', source: 'level5-august-itabashi-hanabi.ts' },
  { target: 'level5-july-hanabi-katsushika-noryo.ts', source: 'level5-july-hanabi-katsushika-noryo.ts' },
  
  // hanabi子目录下的文件
  { target: 'hanabi/tokyo/level4-august-kozushima-hanabi.ts', source: 'level5-august-kozushima-hanabi.ts' },
  { target: 'hanabi/tokyo/level4-july-hanabi-mikurajima.ts', source: 'level5-july-hanabi-mikurajima.ts' },
  { target: 'hanabi/tokyo/level4-july-hanabi-tachikawa-showa.ts', source: 'level5-july-hanabi-tachikawa-showa.ts' },
  { target: 'hanabi/tokyo/level4-setagaya-tamagawa-hanabi.ts', source: 'level5-setagaya-tamagawa-hanabi.ts' },
  { target: 'hanabi/tokyo/level4-july-hanabi-tokyo-keibajo.ts', source: 'hanabi-level4-july-hanabi-tokyo-keibajo.ts' },
  { target: 'hanabi/tokyo/level4-august-okutama-hanabi.ts', source: 'level5-august-okutama-hanabi.ts' },
  { target: 'hanabi/tokyo/level4-august-jingu-gaien-hanabi.ts', source: 'level5-august-jingu-gaien-hanabi.ts' },
  
  // Koshinetsu
  { target: 'hanabi/koshinetsu/level4-august-nagaoka-hanabi.ts', source: 'level5-august-nagaoka-hanabi.ts' },
  { target: 'hanabi/koshinetsu/level4-august-yamanakako-houkosai-hanabi.ts', source: 'level5-august-yamanakako-houkosai-hanabi.ts' },
  { target: 'hanabi/koshinetsu/level4-ichikawa-shinmei-hanabi.ts', source: 'level5-august-shinmei-hanabi.ts' },
  { target: 'hanabi/koshinetsu/level4-august-isawa-onsen-hanabi.ts', source: 'level5-august-isawa-onsen-hanabi.ts' },
  { target: 'hanabi/koshinetsu/level4-gion-kashiwazaki-hanabi.ts', source: 'level5-gion-kashiwazaki-hanabi.ts' },
  { target: 'hanabi/koshinetsu/level4-august-chikuma-chikumagawa-hanabi.ts', source: 'level5-august-chikuma-chikumagawa-hanabi.ts' },
  { target: 'hanabi/koshinetsu/level4-anime-classics-anisong-hanabi.ts', source: 'level5-anime-classics-anisong-hanabi.ts' },
  { target: 'hanabi/koshinetsu/level4-august-hanabi-ichikawa.ts', source: 'level5-august-hanabi-ichikawa.ts' },
  
  // Saitama
  { target: 'hanabi/saitama/level4-july-hanabi-saitama-owada.ts', source: 'saitama-owada-hanabi.ts' },
  { target: 'hanabi/saitama/level4-seibu-en-hanabi-2025.ts', source: 'level5-july-hanabi-seibu-en.ts' },
  { target: 'hanabi/saitama/level4-july-hanabi-koshigaya.ts', source: 'level5-july-hanabi-koshigaya.ts' },
  { target: 'hanabi/saitama/level4-august-todabashi-hanabi.ts', source: 'level5-august-todabashi-hanabi.ts' },
  { target: 'hanabi/saitama/level4-july-hanabi-ogawa-tanabata.ts', source: 'level5-july-hanabi-ogawa-tanabata.ts' },
  { target: 'hanabi/saitama/level4-july-hanabi-metsza-nordic.ts', source: 'level5-july-hanabi-metsza-nordic.ts' },
  { target: 'hanabi/saitama/level4-august-higashimatsuyama-hanabi.ts', source: 'level5-august-higashimatsuyama-hanabi.ts' },
  { target: 'hanabi/saitama/level4-august-kumagaya-hanabi.ts', source: 'level5-august-kumagaya-hanabi.ts' },
  { target: 'hanabi/saitama/level4-august-asaka-hanabi.ts', source: 'level5-august-asaka-hanabi.ts' },
  { target: 'hanabi/saitama/level4-july-hanabi-iruma-base.ts', source: 'level5-july-hanabi-iruma-base.ts' },
  { target: 'hanabi/saitama/level4-august-ina-hanabi.ts', source: 'level5-august-ina-hanabi.ts' },
  
  // Kitakanto
  { target: 'hanabi/kitakanto/koga-hanabi-2025.ts', source: 'level5-august-koga-hanabi.ts' },
  { target: 'hanabi/kitakanto/oyama-hanabi-2025.ts', source: 'level5-september-kitakanto-oyama-hanabi.ts' },
  { target: 'hanabi/kitakanto/level4-august-takasaki-hanabi.ts', source: 'level5-august-takasaki-hanabi.ts' },
  { target: 'hanabi/kitakanto/tsuchiura-hanabi-2025.ts', source: 'level5-august-tsuchiura-hanabi.ts' },
  { target: 'hanabi/kitakanto/tonegawa-hanabi-2025.ts', source: 'level5-september-kitakanto-tonegawa-hanabi.ts' },
  { target: 'hanabi/kitakanto/tamamura-hanabi-2025.ts', source: 'level5-tamura-hanabi.ts' },
  { target: 'hanabi/kitakanto/level4-september-kitakanto-oarai-hanabi.ts', source: 'level5-september-kitakanto-oarai-hanabi.ts' },
  { target: 'hanabi/kitakanto/level4-moka-hanabi.ts', source: 'level5-moka-hanabi.ts' },
  { target: 'hanabi/kitakanto/mitokoumon-matsuri-hanabi-2025.ts', source: 'level5-mito-hanabi.ts' },
  { target: 'hanabi/kitakanto/maebashi-hanabi-2025.ts', source: 'level5-august-maebashi-hanabi.ts' },
  { target: 'hanabi/kitakanto/level4-august-ashikaga-hanabi.ts', source: 'level5-august-ashikaga-hanabi.ts' },
  
  // Kanagawa
  { target: 'hanabi/kanagawa/level4-august-atsugi-ayu-matsuri.ts', source: 'level5-august-kanagawa-atsugi-ayu-matsuri.ts' },
  { target: 'hanabi/kanagawa/level4-july-hanabi-kanagawa-kamakura.ts', source: 'level5-july-hanabi-kanagawa-kamakura.ts' },
  { target: 'hanabi/kanagawa/level4-august-sagamiko-hanabi.ts', source: 'level5-august-sagamiko-hanabi.ts' },
  { target: 'hanabi/kanagawa/level4-yokohama-kaisai-hanabi.ts', source: 'level5-yokohama-kaisai-hanabi.ts' },
  { target: 'hanabi/kanagawa/level4-july-hanabi-kanagawa-nightflowers.ts', source: 'level5-july-hanabi-kanagawa-nightflowers.ts' },
  { target: 'hanabi/kanagawa/level4-september-kanagawa-seaparadise-hanabi.ts', source: 'level5-september-kanagawa-seaparadise-hanabi.ts' },
  { target: 'hanabi/kanagawa/level4-august-odawara-sakawa-hanabi.ts', source: 'level5-august-kanagawa-odawara-sakawa.ts' },
  { target: 'hanabi/kanagawa/level4-june-yokohama-kaikou-matsuri.ts', source: 'level5-june-yokohama-kaikou-matsuri.ts' },
  { target: 'hanabi/kanagawa/level4-august-southern-beach-chigasaki.ts', source: 'level5-august-kanagawa-southern-beach-chigasaki.ts' },
  { target: 'hanabi/kanagawa/level4-july-hanabi-kanagawa-seaparadise.ts', source: 'level5-july-hanabi-kanagawa-seaparadise.ts' },
  { target: 'hanabi/kanagawa/level4-sagamihara-hanabi.ts', source: 'level5-sagamihara-hanabi.ts' },
  { target: 'hanabi/kanagawa/level4-august-minato-mirai-smart.ts', source: 'level5-august-minato-mirai-smart.ts' },
  { target: 'hanabi/kanagawa/level4-august-kurihama-hanabi.ts', source: 'level5-august-kurihama-hanabi.ts' },
  { target: 'hanabi/kanagawa/level4-kawasaki-tamagawa-hanabi.ts', source: 'level5-kawasaki-tamagawa-hanabi.ts' },
  { target: 'hanabi/kanagawa/level4-august-kanazawa-matsuri-hanabi.ts', source: 'level5-august-kanazawa-matsuri-hanabi.ts' },
  
  // Chiba
  { target: 'hanabi/chiba/level4-august-hanabi-kisarazu.ts', source: 'level5-august-hanabi-kisarazu.ts' },
  { target: 'hanabi/chiba/level4-august-hanabi-teganuma.ts', source: 'level5-august-hanabi-teganuma.ts' },
  { target: 'hanabi/chiba/level4-yachiyo-furusato-oyako-hanabi.ts', source: 'level5-yachiyo-furusato-oyako-hanabi.ts' },
  { target: 'hanabi/chiba/level4-october-chiba-urayasu-hanabi.ts', source: 'level5-october-chiba-urayasu-hanabi.ts' },
  { target: 'hanabi/chiba/level4-july-hanabi-chiba-shirahama.ts', source: 'level5-july-hanabi-chiba-shirahama.ts' },
  { target: 'hanabi/chiba/level4-august-omigawa-hanabi.ts', source: 'level5-august-omigawa-hanabi.ts' },
  { target: 'hanabi/chiba/level4-july-hanabi-chiba-oamishirasato.ts', source: 'level5-july-hanabi-chiba-oamishirasato.ts' },
  { target: 'hanabi/chiba/level4-august-hanabi-narashino.ts', source: 'level5-august-hanabi-narashino.ts' },
  { target: 'hanabi/chiba/level4-august-hanabi-matsudo.ts', source: 'level5-august-hanabi-matsudo.ts' },
  { target: 'hanabi/chiba/level4-august-hanabi-makuhari-beach.ts', source: 'level5-august-hanabi-makuhari-beach.ts' },
  { target: 'hanabi/chiba/level4-july-hanabi-chiba-kamogawa.ts', source: 'level5-july-hanabi-chiba-kamogawa.ts' },
  { target: 'hanabi/chiba/level4-july-hanabi-futtsu.ts', source: 'level5-july-hanabi-futtsu.ts' },
  { target: 'hanabi/chiba/level4-august-hanabi-choshi-minato.ts', source: 'level5-august-hanabi-choshi-minato.ts' }
];

// 查找并复制文件
function copyFileIfExists(sourceFileName, targetPath) {
  const sourcePath = path.join(sourceDir, sourceFileName);
  
  if (fs.existsSync(sourcePath)) {
    const fullTargetPath = path.join(targetBaseDir, targetPath);
    
    // 确保目标目录存在
    const targetDir = path.dirname(fullTargetPath);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    
    try {
      fs.copyFileSync(sourcePath, fullTargetPath);
      console.log(`✅ 复制: ${sourceFileName} -> ${targetPath}`);
      return true;
    } catch (error) {
      console.error(`❌ 复制失败: ${sourceFileName} -> ${targetPath}`, error.message);
      return false;
    }
  } else {
    console.log(`⚠️ 源文件不存在: ${sourceFileName}`);
    return false;
  }
}

function main() {
  console.log('📁 开始复制缺失的数据文件...\n');
  
  let copiedCount = 0;
  let totalCount = neededFiles.length;
  
  neededFiles.forEach(({ source, target }) => {
    if (copyFileIfExists(source, target)) {
      copiedCount++;
    }
  });
  
  console.log(`\n📊 复制统计:`);
  console.log(`- 总文件数: ${totalCount}`);
  console.log(`- 成功复制: ${copiedCount}`);
  console.log(`- 成功率: ${((copiedCount / totalCount) * 100).toFixed(1)}%`);
}

main(); 