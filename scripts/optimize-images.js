const fs = require('fs');
const path = require('path');

// 花火大会专业占位符SVG模板
const createHanabiPlaceholderSVG = (name, location, color = '#ff6b6b') => {
  return `<svg width="800" height="600" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bg" cx="50%" cy="50%">
      <stop offset="0%" style="stop-color:#001122;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#000000;stop-opacity:1" />
    </radialGradient>
    <radialGradient id="firework1" cx="50%" cy="50%">
      <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${color};stop-opacity:0" />
    </radialGradient>
    <radialGradient id="firework2" cx="50%" cy="50%">
      <stop offset="0%" style="stop-color:#ffd700;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#ffd700;stop-opacity:0" />
    </radialGradient>
  </defs>
  
  <!-- 夜空背景 -->
  <rect width="800" height="600" fill="url(#bg)"/>
  
  <!-- 星星 -->
  <circle cx="100" cy="80" r="1" fill="#ffffff" opacity="0.7"/>
  <circle cx="200" cy="50" r="1" fill="#ffffff" opacity="0.8"/>
  <circle cx="300" cy="70" r="1" fill="#ffffff" opacity="0.6"/>
  <circle cx="500" cy="60" r="1" fill="#ffffff" opacity="0.9"/>
  <circle cx="600" cy="90" r="1" fill="#ffffff" opacity="0.7"/>
  <circle cx="700" cy="45" r="1" fill="#ffffff" opacity="0.8"/>
  
  <!-- 主花火 -->
  <circle cx="400" cy="200" r="120" fill="url(#firework1)" opacity="0.8"/>
  <circle cx="400" cy="200" r="80" fill="url(#firework1)" opacity="0.6"/>
  <circle cx="400" cy="200" r="40" fill="${color}" opacity="1"/>
  
  <!-- 副花火 -->
  <circle cx="250" cy="150" r="60" fill="url(#firework2)" opacity="0.6"/>
  <circle cx="250" cy="150" r="30" fill="#ffd700" opacity="1"/>
  
  <circle cx="550" cy="180" r="80" fill="url(#firework1)" opacity="0.4"/>
  <circle cx="550" cy="180" r="40" fill="${color}" opacity="0.8"/>
  
  <!-- 花火光芒 -->
  <g stroke="${color}" stroke-width="2" opacity="0.8">
    <line x1="400" y1="80" x2="400" y2="320" />
    <line x1="280" y1="200" x2="520" y2="200" />
    <line x1="330" y1="130" x2="470" y2="270" />
    <line x1="470" y1="130" x2="330" y2="270" />
  </g>
  
  <!-- 地面轮廓 -->
  <path d="M0,550 Q200,530 400,540 Q600,550 800,535 L800,600 L0,600 Z" fill="#1a1a2e" opacity="0.8"/>
  
  <!-- 标题文字 -->
  <text x="400" y="480" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="24" font-weight="bold">
    ${name}
  </text>
  <text x="400" y="510" text-anchor="middle" fill="#cccccc" font-family="Arial, sans-serif" font-size="18">
    ${location}
  </text>
</svg>`;
};

// 专业图片映射配置
const imageMapping = {
  // 东京地区花火
  'edogawa-fireworks.jpg': { name: '江户川区花火大会', location: '东京都江户川区', color: '#ff6b6b' },
  'itabashi-fireworks.jpg': { name: '板桥花火大会', location: '东京都板桥区', color: '#4ecdc4' },
  'okutama-fireworks.jpg': { name: '奥多摩纳凉花火', location: '东京都奥多摩町', color: '#45b7d1' },
  'jingu-gaien-fireworks.jpg': { name: '神宫外苑花火大会', location: '东京都新宿区', color: '#f9ca24' },
  'kozushima-fireworks.jpg': { name: '神津岛渚花火大会', location: '东京都神津岛', color: '#6c5ce7' },
  'akishima-fireworks.jpg': { name: '昭岛市民花火大会', location: '东京都昭岛市', color: '#fd79a8' },
  
  // 千叶地区花火
  'shirahama-fireworks.jpg': { name: '南房总白浜海女祭', location: '千叶县南房总市', color: '#00b894' },
  'futtsu-fireworks.jpg': { name: '富津市民花火大会', location: '千叶县富津市', color: '#e17055' },
  'kamogawa-fireworks.jpg': { name: '鸭川市民花火大会', location: '千叶县鸭川市', color: '#0984e3' },
  'marines-fireworks.jpg': { name: '千叶罗德花火', location: '千叶县千叶市', color: '#74b9ff' },
  
  // 神奈川地区花火
  'kamakura-fireworks.jpg': { name: '镰仓花火大会', location: '神奈川县镰仓市', color: '#fd79a8' },
  'yokohama-night-flowers.jpg': { name: '横浜夜间花火', location: '神奈川县横浜市', color: '#6c5ce7' },
  
  // 甲信越地区花火
  'kawaguchi-lake-fireworks.jpg': { name: '河口湖山开花火大会', location: '山梨县富士河口湖町', color: '#e84393' },
  'anime-classics-fireworks.jpg': { name: '动漫经典动画歌曲花火', location: '山梨县富士川町', color: '#00cec9' },
  
  // 北关东地区花火
  'mito-fireworks.jpg': { name: '水户偕乐园花火大会', location: '茨城县水户市', color: '#ff7675' },
  'tamura-fireworks.jpg': { name: '玉村花火大会', location: '群马县玉村町', color: '#fd79a8' }
};

// 创建图片目录
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// 生成所有占位符图片
function generatePlaceholderImages() {
  const hanabiDir = path.join(__dirname, '../public/images/hanabi');
  ensureDirectoryExists(hanabiDir);
  
  console.log('🎆 开始生成专业花火占位符图片...');
  
  let generated = 0;
  
  Object.entries(imageMapping).forEach(([filename, config]) => {
    const svgFilename = filename.replace('.jpg', '.svg');
    const svgPath = path.join(hanabiDir, svgFilename);
    
    if (!fs.existsSync(svgPath)) {
      const svgContent = createHanabiPlaceholderSVG(config.name, config.location, config.color);
      fs.writeFileSync(svgPath, svgContent);
      console.log(`✅ 生成: ${svgFilename}`);
      generated++;
    } else {
      console.log(`⏭️  跳过: ${svgFilename} (已存在)`);
    }
  });
  
  console.log(`\n🎯 占位符生成完成: ${generated} 个新文件`);
}

// 更新数据文件中的图片路径
function updateImagePaths() {
  const dataDir = path.join(__dirname, '../src/data');
  const files = fs.readdirSync(dataDir).filter(file => file.endsWith('.ts'));
  
  console.log('\n🔄 开始更新图片路径...');
  
  let updatedFiles = 0;
  
  files.forEach(file => {
    const filePath = path.join(dataDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let hasChanges = false;
    
    // 将.jpg替换为.svg
    Object.keys(imageMapping).forEach(jpgFile => {
      const svgFile = jpgFile.replace('.jpg', '.svg');
      const oldPath = `/images/hanabi/${jpgFile}`;
      const newPath = `/images/hanabi/${svgFile}`;
      
      if (content.includes(oldPath)) {
        content = content.replace(new RegExp(oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newPath);
        hasChanges = true;
      }
    });
    
    if (hasChanges) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ 更新: ${file}`);
      updatedFiles++;
    }
  });
  
  console.log(`\n🎯 路径更新完成: ${updatedFiles} 个文件`);
}

// 生成图片优化报告
function generateOptimizationReport() {
  const hanabiDir = path.join(__dirname, '../public/images/hanabi');
  const dataDir = path.join(__dirname, '../src/data');
  
  console.log('\n📊 生成图片优化报告...');
  
  // 统计现有图片
  const existingImages = fs.readdirSync(hanabiDir);
  const svgImages = existingImages.filter(file => file.endsWith('.svg'));
  
  // 扫描数据文件中的图片引用
  const files = fs.readdirSync(dataDir).filter(file => file.endsWith('.ts'));
  const imageReferences = new Set();
  
  files.forEach(file => {
    const content = fs.readFileSync(path.join(dataDir, file), 'utf8');
    const matches = content.match(/\/images\/hanabi\/[^'"\s]+/g);
    if (matches) {
      matches.forEach(match => imageReferences.add(match));
    }
  });
  
  console.log('\n📈 优化报告:');
  console.log(`📁 现有SVG图片: ${svgImages.length} 个`);
  console.log(`🔗 数据文件引用: ${imageReferences.size} 个`);
  console.log(`✨ 占位符映射: ${Object.keys(imageMapping).length} 个`);
  
  // 检查缺失的图片
  const missingImages = [];
  imageReferences.forEach(ref => {
    const filename = path.basename(ref);
    if (!existingImages.includes(filename)) {
      missingImages.push(filename);
    }
  });
  
  if (missingImages.length > 0) {
    console.log(`\n⚠️  缺失图片: ${missingImages.length} 个`);
    missingImages.forEach(img => console.log(`   - ${img}`));
  } else {
    console.log('\n✅ 所有图片资源完整');
  }
}

// 主执行函数
function optimizeImages() {
  console.log('🚀 启动专业图片优化系统...\n');
  
  try {
    generatePlaceholderImages();
    updateImagePaths();
    generateOptimizationReport();
    
    console.log('\n🎉 图片优化完成！网站性能已提升。');
  } catch (error) {
    console.error('❌ 优化过程中出现错误:', error);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  optimizeImages();
}

module.exports = { optimizeImages, createHanabiPlaceholderSVG, imageMapping }; 