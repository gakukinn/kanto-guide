/**
 * 为第五层页面添加标识脚本
 * 批量处理所有花火详情页面
 */

const fs = require('fs');
const path = require('path');

// 第五层页面列表
const level5Pages = [
  // 7月东京
  'src/app/july/hanabi/tokyo/mikurajima-hanabi/page.tsx',
  'src/app/july/hanabi/tokyo/tachikawa-showa-kinen-hanabi/page.tsx',
  'src/app/july/hanabi/tokyo/hachioji-hanabi/page.tsx',
  'src/app/july/hanabi/tokyo/katsushika-noryo-hanabi/page.tsx',
  'src/app/july/hanabi/tokyo/tokyo-keibajo-hanabi/page.tsx',
  'src/app/july/hanabi/tokyo/sumida/page.tsx',
  
  // 7月埼玉
  'src/app/july/hanabi/saitama/moomin-hanabi/page.tsx',
  'src/app/july/hanabi/saitama/seibu-hanabi/page.tsx',
  'src/app/july/hanabi/saitama/iruma-hanabi/page.tsx',
  'src/app/july/hanabi/saitama/koshigaya-hanabi/page.tsx',
  'src/app/july/hanabi/saitama/ogawa-hanabi/page.tsx',
  'src/app/july/hanabi/saitama/saitama-hanabi/page.tsx',
  'src/app/july/hanabi/saitama/mets-nordic-hanabi/page.tsx',
  
  // 7月千叶
  'src/app/july/hanabi/chiba/minami-boso-hanabi/page.tsx',
  'src/app/july/hanabi/chiba/futtsu-hanabi/page.tsx',
  'src/app/july/hanabi/chiba/sanmu-hanabi/page.tsx',
  'src/app/july/hanabi/chiba/oamishirasato-hanabi/page.tsx',
  'src/app/july/hanabi/chiba/kamogawa-hanabi/page.tsx',
  'src/app/july/hanabi/chiba/marines-hanabi/page.tsx',
  'src/app/july/hanabi/chiba/mother-farm-hanabi/page.tsx',
  
  // 7月神奈川
  'src/app/july/hanabi/kanagawa/kamakura-hanabi/page.tsx',
  'src/app/july/hanabi/kanagawa/yokohama-night-hanabi/page.tsx',
  'src/app/july/hanabi/kanagawa/hakkeijima-hanabi/page.tsx',
  
  // 7月北关东
  'src/app/july/hanabi/kitakanto/tamamura-hanabi/page.tsx',
  'src/app/july/hanabi/kitakanto/mito-kairakuen-hanabi/page.tsx',
  'src/app/july/hanabi/kitakanto/moka-hanabi/page.tsx',
  'src/app/july/hanabi/kitakanto/tatebayashi-hanabi/page.tsx',
  
  // 7月甲信越
  'src/app/july/hanabi/koshinetsu/anime-classic-hanabi/page.tsx',
  'src/app/july/hanabi/koshinetsu/fujisan-kawaguchi-hanabi/page.tsx',
  'src/app/july/hanabi/koshinetsu/isawa-onsen-hanabi/page.tsx',
  'src/app/july/hanabi/koshinetsu/yamanashi-fuefuki-hanabi/page.tsx',
  'src/app/july/hanabi/koshinetsu/gion-kashiwazaki-hanabi/page.tsx'
];

// 从路径解析信息
function parsePageInfo(filePath) {
  const parts = filePath.split('/');
  
  // 获取基本信息
  const month = parts[2]; // july
  const region = parts[4]; // tokyo, saitama, etc.
  const eventDir = parts[5]; // tokyo-keibajo-hanabi, etc.
  
  // 地区映射
  const regionMap = {
    'tokyo': '东京',
    'saitama': '埼玉', 
    'chiba': '千叶',
    'kanagawa': '神奈川',
    'kitakanto': '北关东',
    'koshinetsu': '甲信越'
  };
  
  // 月份映射
  const monthMap = {
    'july': '7月',
    'august': '8月',
    'september': '9月'
  };
  
  return {
    month: monthMap[month] || month,
    region: regionMap[region] || region,
    event: eventDir,
    webPath: '/' + parts.slice(2, -1).join('/')
  };
}

// 生成标识注释
function generateIdentifier(info) {
  const { month, region, event, webPath } = info;
  
  return `/**
 * 第五层页面 - ${event}详情
 * @layer 五层 (Detail Layer)
 * @month ${month}
 * @region ${region}
 * @event ${event}
 * @type 花火详情页面
 * @path ${webPath}
 * @description ${event}完整详情信息，包含交通、观赏、历史等
 */
`;
}

// 添加标识到文件
function addIdentifierToFile(filePath, identifier) {
  try {
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  文件不存在: ${filePath}`);
      return false;
    }
    
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // 检查是否已有标识
    if (content.includes('@layer') || content.includes('@type')) {
      console.log(`✅ 已有标识: ${filePath}`);
      return false;
    }
    
    // 添加标识到文件开头
    const newContent = identifier + content;
    fs.writeFileSync(filePath, newContent, 'utf-8');
    
    console.log(`✅ 已添加标识: ${filePath}`);
    return true;
  } catch (error) {
    console.error(`❌ 处理失败 ${filePath}:`, error.message);
    return false;
  }
}

// 主执行函数
function main() {
  console.log('🚀 开始为第五层页面添加标识...\n');
  
  let processedCount = 0;
  let addedCount = 0;
  let notFoundCount = 0;
  
  for (const filePath of level5Pages) {
    console.log(`正在处理: ${filePath}`);
    processedCount++;
    
    // 检查文件是否存在
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  文件不存在: ${filePath}`);
      notFoundCount++;
      continue;
    }
    
    const info = parsePageInfo(filePath);
    const identifier = generateIdentifier(info);
    
    if (addIdentifierToFile(filePath, identifier)) {
      addedCount++;
    }
  }
  
  console.log(`\n📊 处理完成:`);
  console.log(`   - 处理文件: ${processedCount} 个`);
  console.log(`   - 新增标识: ${addedCount} 个`);
  console.log(`   - 已有标识: ${processedCount - addedCount - notFoundCount} 个`);
  console.log(`   - 文件不存在: ${notFoundCount} 个`);
}

// 执行脚本
main(); 