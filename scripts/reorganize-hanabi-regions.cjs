const fs = require('fs');
const path = require('path');

// 定义地区分类规则
const regionMapping = {
  tokyo: ['tokyo'],
  saitama: [
    'saitama',
    'metsa',
    'moomin',
    'seibu',
    'omagi',
    'owada',
    'kumagaya',
    'asaka',
    'ina',
    'higashimatsuyama',
    'iruma',
    'koshigaya',
    'todabashi',
  ],
  chiba: [
    'chiba',
    'ichikawa',
    'makuhari',
    'matsudo',
    'narashino',
    'teganuma',
    'omigawa',
    'choshi',
    'kisarazu',
    'urayasu',
    'motherfarm',
    'marines',
    'shirahama',
    'kamogawa',
    'futtsu',
    'oamishirasato',
  ],
  kanagawa: [
    'kanagawa',
    'seaparadise',
    'yokohama',
    'nightflowers',
    'kamakura',
    'kurihama',
    'sagamiko',
    'kanazawa',
  ],
  kitakanto: [
    'ashikaga',
    'moka',
    'takasaki',
    'maebashi',
    'numata',
    'tamamura',
    'tatebayashi',
    'tamura',
    'mito',
    'hitachinaka',
    'koga',
    'joso',
    'kinugawa',
    'toride',
    'tsuchiura',
    'oarai',
    'oyama',
    'tonegawa',
    'rindoko',
  ],
  koshinetsu: [
    'nagano',
    'niigata',
    'nagaoka',
    'kashiwazaki',
    'gion',
    'agano',
    'gozareya',
    'shinsaku',
    'asahara',
    'kawaguchi',
    'kawaguchiko',
    'nojiri',
    'suwa',
    'ueda',
    'shinmei',
    'ichikawa',
    'suzaka',
    'minna',
    'chikuma',
    'anime',
    'yamanakako',
    'houkosai',
    'sanjo',
    'ojiya',
    'isawa',
    'fuji',
  ],
};

// 创建反向映射
function createReverseMapping() {
  const reverseMapping = {};
  for (const [region, keywords] of Object.entries(regionMapping)) {
    for (const keyword of keywords) {
      reverseMapping[keyword] = region;
    }
  }
  return reverseMapping;
}

// 根据文件名识别地区
function identifyRegion(fileName) {
  const reverseMapping = createReverseMapping();
  const cleanName = fileName
    .replace(/level4-/, '')
    .replace(/\.ts$/, '')
    .toLowerCase();

  for (const [keyword, region] of Object.entries(reverseMapping)) {
    if (cleanName.includes(keyword)) {
      return region;
    }
  }

  // 特殊处理
  if (
    cleanName.includes('jingu') ||
    cleanName.includes('keibajo') ||
    cleanName.includes('sumida') ||
    cleanName.includes('hachioji') ||
    cleanName.includes('chofu') ||
    cleanName.includes('tachikawa') ||
    cleanName.includes('akishima') ||
    cleanName.includes('okutama') ||
    cleanName.includes('kozushima') ||
    cleanName.includes('mikurajima') ||
    cleanName.includes('edogawa') ||
    cleanName.includes('itabashi') ||
    cleanName.includes('kita')
  ) {
    return 'tokyo';
  }

  return 'unknown';
}

// 扫描并分析花火文件
function analyzeHanabiFiles() {
  const hanabiDir = 'src/data/hanabi';
  const files = fs
    .readdirSync(hanabiDir)
    .filter(
      file =>
        file.endsWith('.ts') && file !== 'kanagawa-hanabi-launch-ranking.ts'
    );

  const regionStats = {
    tokyo: [],
    saitama: [],
    chiba: [],
    kanagawa: [],
    kitakanto: [],
    koshinetsu: [],
    unknown: [],
  };

  files.forEach(file => {
    const region = identifyRegion(file);
    regionStats[region].push(file);
  });

  return regionStats;
}

// 创建地区目录结构
function createRegionDirectories() {
  const baseDir = 'src/data/hanabi';
  const regions = [
    'tokyo',
    'saitama',
    'chiba',
    'kanagawa',
    'kitakanto',
    'koshinetsu',
  ];

  regions.forEach(region => {
    const regionDir = path.join(baseDir, region);
    if (!fs.existsSync(regionDir)) {
      fs.mkdirSync(regionDir, { recursive: true });
      console.log(`✅ 创建目录: ${regionDir}`);
    }
  });
}

// 移动文件到对应地区目录
function moveFilesToRegions(regionStats) {
  const baseDir = 'src/data/hanabi';
  let moveCount = 0;

  for (const [region, files] of Object.entries(regionStats)) {
    if (region === 'unknown') continue;

    files.forEach(file => {
      const sourcePath = path.join(baseDir, file);
      const targetPath = path.join(baseDir, region, file);

      if (fs.existsSync(sourcePath)) {
        try {
          fs.renameSync(sourcePath, targetPath);
          console.log(`✅ 移动: ${file} → ${region}/`);
          moveCount++;
        } catch (error) {
          console.error(`❌ 移动失败: ${file} - ${error.message}`);
        }
      }
    });
  }

  return moveCount;
}

// 生成移动报告
function generateReport(regionStats) {
  console.log('\n📊 花火文件地区分布分析报告:');
  console.log('=====================================');

  let totalFiles = 0;
  for (const [region, files] of Object.entries(regionStats)) {
    console.log(`\n🗾 ${region.toUpperCase()}: ${files.length} 个文件`);
    if (files.length > 0) {
      files.slice(0, 5).forEach(file => {
        console.log(`  • ${file}`);
      });
      if (files.length > 5) {
        console.log(`  ... 还有 ${files.length - 5} 个文件`);
      }
    }
    totalFiles += files.length;
  }

  console.log(`\n📈 总计: ${totalFiles} 个花火文件`);

  if (regionStats.unknown.length > 0) {
    console.log('\n⚠️ 未识别地区的文件:');
    regionStats.unknown.forEach(file => console.log(`  • ${file}`));
  }
}

// 主函数
function main() {
  console.log('🗂️ 开始花火文件地区重组...\n');

  // 分析文件分布
  const regionStats = analyzeHanabiFiles();
  generateReport(regionStats);

  console.log('\n🏗️ 创建地区目录结构...');
  createRegionDirectories();

  console.log('\n🚀 开始移动文件...');
  const moveCount = moveFilesToRegions(regionStats);

  console.log(`\n✨ 重组完成！`);
  console.log(`📁 已移动 ${moveCount} 个文件到对应地区目录`);
  console.log(`📂 新的目录结构:`);
  console.log(`   src/data/hanabi/tokyo/`);
  console.log(`   src/data/hanabi/saitama/`);
  console.log(`   src/data/hanabi/chiba/`);
  console.log(`   src/data/hanabi/kanagawa/`);
  console.log(`   src/data/hanabi/kitakanto/`);
  console.log(`   src/data/hanabi/koshinetsu/`);
}

if (require.main === module) {
  main();
}
