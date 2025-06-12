#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 文件名映射表 - 将第4层中的错误链接映射到实际存在的文件
const fileNameMapping = {
  // 千叶地区
  'level5-august-chiba-omigawa.ts': 'level5-august-omigawa-hanabi.ts',
  'level5-august-chiba-makuhari-beach-hanabi.ts': 'level5-august-hanabi-makuhari-beach.ts',
  'level5-august-chiba-choshi-minato-hanabi.ts': 'level5-august-hanabi-choshi-minato.ts',
  'level5-august-chiba-ichikawa.ts': 'level5-august-hanabi-ichikawa.ts',
  'level5-august-chiba-narashino.ts': 'level5-august-hanabi-narashino.ts',
  'level5-august-chiba-matsudo.ts': 'level5-august-hanabi-matsudo.ts',
  'level5-august-chiba-teganuma.ts': 'level5-august-hanabi-teganuma.ts',
  'level5-august-chiba-kisarazu.ts': 'level5-august-hanabi-kisarazu.ts',
  
  // 神奈川地区
  'level5-august-kanagawa-sagamiko.ts': 'level5-august-sagamiko-hanabi.ts',
  'level5-august-kanagawa-kurihama.ts': 'level5-august-kurihama-hanabi.ts',
  
  // 北关东地区
  'level5-august-kitakanto-ashikaga.ts': 'level5-august-ashikaga-hanabi.ts',
  'level5-august-kitakanto-koga.ts': 'level5-august-koga-hanabi.ts',
  'level5-august-kitakanto-toride.ts': 'level5-august-toride-hanabi.ts',
  'level5-august-kitakanto-maebashi.ts': 'level5-august-maebashi-hanabi.ts',
  'level5-august-kitakanto-takasaki.ts': 'level5-august-takasaki-hanabi.ts',
  'level5-august-kitakanto-hitachinaka.ts': 'level5-august-hitachinaka-hanabi.ts',
  
  // 埼玉地区
  'level5-august-saitama-higashimatsuyama.ts': 'level5-august-higashimatsuyama-hanabi.ts',
  'level5-august-saitama-todabashi.ts': 'level5-august-todabashi-hanabi.ts',
  'level5-august-saitama-kumagaya.ts': 'level5-august-kumagaya-hanabi.ts',
  'level5-august-saitama-asaka.ts': 'level5-august-asaka-hanabi.ts',
  'level5-august-saitama-omagi.ts': 'level5-august-saitama-omagi-hanabi.ts',
  'level5-august-saitama-ina.ts': 'level5-august-ina-hanabi.ts',
  
  // 东京地区
  'level5-august-tokyo-itabashi.ts': 'level5-august-itabashi-hanabi.ts',
  'level5-august-tokyo-edogawa.ts': 'level5-august-hanabi-tokyo-edogawa.ts',
  'level5-august-tokyo-kozushima.ts': 'level5-august-kozushima-hanabi.ts',
  'level5-august-tokyo-okutama.ts': 'level5-august-okutama-hanabi.ts',
  'level5-august-tokyo-jingu-gaien.ts': 'level5-august-jingu-gaien-hanabi.ts',
  'level5-august-tokyo-akishima.ts': 'level5-august-hanabi-tokyo-akishima.ts',
  
  // 7月文件映射
  'level5-july-chiba-marines-hanabi.ts': 'level5-july-hanabi-chiba-marines.ts',
  'level5-july-chiba-shirahama-ama-matsuri.ts': 'level5-july-hanabi-chiba-shirahama.ts',
  'level5-july-chiba-futtsu-shimin-hanabi.ts': 'level5-july-hanabi-futtsu.ts',
  'level5-july-chiba-oamishirasato-hanabi.ts': 'level5-july-hanabi-chiba-oamishirasato.ts',
  'level5-july-chiba-mother-farm-summer-night.ts': 'level5-july-hanabi-chiba-motherfarm.ts',
  'level5-july-chiba-kamogawa-shimin-hanabi.ts': 'level5-july-hanabi-chiba-kamogawa.ts',
  
  'level5-july-kanagawa-kamakura-hanabi.ts': 'level5-july-hanabi-kanagawa-kamakura.ts',
  'level5-july-kanagawa-yokohama-night-flowers.ts': 'level5-july-hanabi-kanagawa-nightflowers.ts',
  'level5-july-kanagawa-seaparadise-hanabi-symphonia.ts': 'level5-july-hanabi-kanagawa-seaparadise.ts',
  
  'level5-july-kitakanto-tamura-hanabi.ts': 'level5-tamura-hanabi.ts',
  'level5-july-kitakanto-mito-hanabi.ts': 'level5-mito-hanabi.ts',
  'level5-july-kitakanto-moka-hanabi.ts': 'level5-moka-hanabi.ts',
  'level5-july-kitakanto-tatebayashi-hanabi.ts': 'level5-tatebayashi-hanabi.ts',
  
  'level5-july-koshinetsu-gion-kashiwazaki-hanabi.ts': 'level5-gion-kashiwazaki-hanabi.ts',
  'level5-july-koshinetsu-fuji-kawaguchi-lake-hanabi.ts': 'level5-fuji-kawaguchi-lake-hanabi.ts',
  'level5-july-koshinetsu-suzaka-minna-hanabi.ts': 'level5-suzaka-minna-hanabi.ts',
  'level5-july-koshinetsu-anime-classics-anisong-hanabi.ts': 'level5-anime-classics-anisong-hanabi.ts',
  'level5-july-koshinetsu-sanjo-natsumatsuri-hanabi.ts': 'level5-sanjo-natsumatsuri-hanabi.ts',
  'level5-july-koshinetsu-nojiri-lake-hanabi.ts': 'level5-nojiri-lake-hanabi.ts',
  
  'level5-july-saitama-metsza-nordic-2025.ts': 'level5-july-hanabi-metsza-nordic.ts',
  'level5-july-saitama-seibu-en-2025.ts': 'level5-july-hanabi-seibu-en.ts',
  'level5-july-saitama-iruma-base-2025.ts': 'level5-july-hanabi-iruma-base.ts',
  'level5-july-saitama-koshigaya-2025.ts': 'level5-july-hanabi-koshigaya.ts',
  'level5-july-saitama-ogawa-tanabata-2025.ts': 'level5-july-hanabi-ogawa-tanabata.ts',
  'level5-july-saitama-saitama-owada-2025.ts': 'level5-july-hanabi-saitama-owada.ts',
  
  'level5-july-tokyo-tokyo-racecourse-fireworks.ts': 'level5-july-hanabi-tokyo-keibajo.ts',
  'level5-july-tokyo-katsushika-fireworks.ts': 'level5-july-hanabi-katsushika-noryo.ts',
  'level5-july-tokyo-sumidagawa-fireworks.ts': 'level5-july-hanabi-tokyo-sumida.ts',
  'level5-july-tokyo-hachioji-fireworks.ts': 'level5-july-hanabi-tokyo-hachioji.ts',
  'level5-july-tokyo-tachikawa-showa-kinen-park-fireworks.ts': 'level5-july-hanabi-tachikawa-showa.ts',
  'level5-july-tokyo-mikurajima-fireworks.ts': 'level5-july-hanabi-mikurajima.ts'
};

function fixLevel4File(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // 查找所有detailLink字段
    const detailLinkRegex = /detailLink:\s*['"`]([^'"`]+)['"`]/g;
    let match;
    
    while ((match = detailLinkRegex.exec(content)) !== null) {
      const originalLink = match[1];
      
      // 从链接中提取文件名
      const linkParts = originalLink.split('/');
      const expectedFileName = linkParts[linkParts.length - 1];
      
      // 检查映射表中是否有对应的正确文件名
      for (const [wrongName, correctName] of Object.entries(fileNameMapping)) {
        if (originalLink.includes(wrongName.replace('.ts', ''))) {
          const newLink = originalLink.replace(wrongName.replace('.ts', ''), correctName.replace('.ts', ''));
          content = content.replace(match[0], `detailLink: '${newLink}'`);
          console.log(`✅ ${path.basename(filePath)}: 修复链接 ${originalLink} -> ${newLink}`);
          modified = true;
          break;
        }
      }
    }
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`❌ ${path.basename(filePath)}: ${error.message}`);
    return false;
  }
}

function main() {
  console.log('🔧 开始修复第4层损坏的detailLink...\n');
  
  const dataDir = path.join(__dirname, '../src/data');
  const level4Files = fs.readdirSync(dataDir)
    .filter(file => file.startsWith('level4-') && file.endsWith('.ts'))
    .map(file => path.join(dataDir, file));
  
  let fixedCount = 0;
  
  level4Files.forEach(filePath => {
    if (fixLevel4File(filePath)) {
      fixedCount++;
    }
  });
  
  console.log(`\n📊 修复完成: ${fixedCount}/${level4Files.length} 个文件被修复`);
}

if (require.main === module) {
  main();
} 