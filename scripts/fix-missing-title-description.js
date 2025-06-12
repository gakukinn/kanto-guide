#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 需要修复的文件列表（从检查报告中提取）
const filesToFix = [
  'level5-august-hanabi-tokyo-akishima.ts',
  'level5-august-hanabi-tokyo-edogawa.ts',
  'level5-august-hitachinaka-hanabi.ts',
  'level5-august-iwatsuki-hanabi.ts',
  'level5-august-kanagawa-southern-beach-chigasaki.ts',
  'level5-august-maebashi-hanabi.ts',
  'level5-august-sagamiko-hanabi.ts',
  'level5-august-takasaki-hanabi.ts',
  'level5-august-toride-hanabi.ts',
  'level5-gion-kashiwazaki-hanabi.ts',
  'level5-july-hanabi-chiba-kamogawa.ts',
  'level5-july-hanabi-chiba-marines.ts',
  'level5-july-hanabi-chiba-motherfarm.ts',
  'level5-july-hanabi-chiba-oamishirasato.ts',
  'level5-july-hanabi-chiba-sanmu.ts',
  'level5-july-hanabi-chiba-shirahama.ts',
  'level5-july-hanabi-kanagawa-kamakura.ts',
  'level5-july-hanabi-kanagawa-nightflowers.ts',
  'level5-july-hanabi-kanagawa-seaparadise.ts',
  'level5-july-hanabi-tokyo-hachioji.ts',
  'level5-nojiri-lake-hanabi.ts'
];

function extractEventInfo(content) {
  // 提取name字段
  const nameMatch = content.match(/name:\s*['"`]([^'"`]+)['"`]/);
  const name = nameMatch ? nameMatch[1] : '';
  
  // 提取month字段
  const monthMatch = content.match(/month:\s*(\d+)/);
  const month = monthMatch ? parseInt(monthMatch[1]) : 0;
  
  // 提取regionTag字段
  const regionMatch = content.match(/regionTag:\s*['"`]([^'"`]+)['"`]/);
  const region = regionMatch ? regionMatch[1] : '';
  
  return { name, month, region };
}

function generateTitleAndDescription(name, month, region) {
  const monthNames = {
    7: '7月',
    8: '8月',
    9: '9月'
  };
  
  const regionMap = {
    '东京都': '东京',
    '神奈川县': '神奈川',
    '千叶县': '千叶',
    '埼玉县': '埼玉',
    '栃木县': '北关东',
    '群马县': '北关东',
    '茨城县': '北关东',
    '新潟县': '甲信越',
    '长野县': '甲信越',
    '山梨县': '甲信越'
  };
  
  const monthStr = monthNames[month] || `${month}月`;
  const regionStr = regionMap[region] || region.replace('县', '').replace('都', '');
  
  const title = `${name} - ${monthStr}${regionStr}花火大会`;
  const description = `${name}详情信息，包含举办时间、地点、交通方式、观赏攻略等完整信息。`;
  
  return { title, description };
}

function fixFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 检查是否已有title和description
    const hasTitle = content.includes('title:');
    const hasDescription = content.includes('description:');
    
    if (hasTitle && hasDescription) {
      console.log(`✅ ${path.basename(filePath)}: 已有title和description字段`);
      return;
    }
    
    // 提取事件信息
    const { name, month, region } = extractEventInfo(content);
    if (!name) {
      console.log(`❌ ${path.basename(filePath)}: 无法提取name字段`);
      return;
    }
    
    // 生成title和description
    const { title, description } = generateTitleAndDescription(name, month, region);
    
    // 在englishName后添加title和description
    if (!hasTitle) {
      content = content.replace(
        /(englishName:\s*['"`][^'"`]*['"`],?\s*\n)/,
        `$1  title: '${title}',\n`
      );
    }
    
    if (!hasDescription) {
      content = content.replace(
        /(title:\s*['"`][^'"`]*['"`],?\s*\n)/,
        `$1  description: '${description}',\n`
      );
    }
    
    // 写回文件
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ ${path.basename(filePath)}: 已添加title和description字段`);
    
  } catch (error) {
    console.error(`❌ ${path.basename(filePath)}: ${error.message}`);
  }
}

function main() {
  console.log('🔧 开始修复缺失的title和description字段...\n');
  
  const dataDir = path.join(__dirname, '../src/data');
  let fixedCount = 0;
  
  filesToFix.forEach(fileName => {
    const filePath = path.join(dataDir, fileName);
    if (fs.existsSync(filePath)) {
      fixFile(filePath);
      fixedCount++;
    } else {
      console.log(`⚠️ ${fileName}: 文件不存在`);
    }
  });
  
  console.log(`\n📊 修复完成: ${fixedCount}/${filesToFix.length} 个文件`);
}

if (require.main === module) {
  main();
} 