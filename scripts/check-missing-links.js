const fs = require('fs');
const path = require('path');

console.log('🔍 检查Level 5文件与Level 4链接的对应关系\n');

// 数据目录路径
const dataDir = path.join(__dirname, '../src/data');

// 获取所有Level 4文件中的detailLink
function getAllDetailLinks() {
  const level4Files = fs.readdirSync(dataDir).filter(f => 
    f.startsWith('level4-july-') && f.endsWith('.ts')
  );
  
  const allLinks = [];
  
  level4Files.forEach(file => {
    const filePath = path.join(dataDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    const detailLinkMatches = content.match(/detailLink:\s*['"`]([^'"`]+)['"`]/g);
    
    if (detailLinkMatches) {
      detailLinkMatches.forEach(match => {
        const link = match.match(/['"`]([^'"`]+)['"`]/)[1];
        allLinks.push(link);
      });
    }
  });
  
  return allLinks;
}

// 获取所有Level 5文件
function getAllLevel5Files() {
  return fs.readdirSync(dataDir).filter(f => 
    f.startsWith('level5-july-hanabi-') && f.endsWith('.ts')
  );
}

// 根据链接推测对应的数据文件名
function predictDataFileName(link) {
  // 从链接路径推测数据文件名
  const parts = link.split('/');
  const region = parts[2]; // chiba, tokyo, etc.
  const event = parts[3];  // marines-hanabi, etc.
  
  return `level5-july-hanabi-${region}-${event}.ts`;
}

// 主检查函数
function main() {
  const allLinks = getAllDetailLinks();
  const allLevel5Files = getAllLevel5Files();
  
  console.log(`📊 统计信息:`);
  console.log(`- Level 4中的detailLink: ${allLinks.length}个`);
  console.log(`- Level 5数据文件: ${allLevel5Files.length}个`);
  console.log(`- 差异: ${allLevel5Files.length - allLinks.length}个\n`);
  
  console.log('🔗 所有detailLink链接:');
  allLinks.forEach((link, index) => {
    console.log(`${index + 1}. ${link}`);
  });
  
  console.log('\n📁 所有Level 5文件:');
  allLevel5Files.forEach((file, index) => {
    console.log(`${index + 1}. ${file}`);
  });
  
  // 检查哪些Level 5文件没有对应的链接
  console.log('\n🔍 分析未使用的Level 5文件:');
  
  const linkedFiles = allLinks.map(link => predictDataFileName(link));
  const unlinkedFiles = allLevel5Files.filter(file => !linkedFiles.includes(file));
  
  if (unlinkedFiles.length > 0) {
    console.log(`\n❌ 发现 ${unlinkedFiles.length} 个未链接的Level 5文件:`);
    unlinkedFiles.forEach(file => {
      console.log(`   - ${file}`);
    });
  }
  
  // 检查是否有重复的数据文件
  console.log('\n🔍 检查潜在的重复文件:');
  
  const eventMap = new Map();
  allLevel5Files.forEach(file => {
    // 提取事件标识符
    const match = file.match(/level5-july-hanabi-(.+)\.ts/);
    if (match) {
      const eventId = match[1];
      
      // 简化事件ID进行匹配
      const simplifiedId = eventId.replace(/-/g, '').toLowerCase();
      
      if (!eventMap.has(simplifiedId)) {
        eventMap.set(simplifiedId, []);
      }
      eventMap.get(simplifiedId).push(file);
    }
  });
  
  // 查找可能的重复
  let duplicatesFound = false;
  eventMap.forEach((files, eventId) => {
    if (files.length > 1) {
      if (!duplicatesFound) {
        console.log('⚠️  发现可能的重复文件:');
        duplicatesFound = true;
      }
      console.log(`   事件ID "${eventId}": ${files.join(', ')}`);
    }
  });
  
  if (!duplicatesFound) {
    console.log('✅ 未发现明显的重复文件');
  }
  
  // 详细分析每个链接与文件的对应关系
  console.log('\n📋 详细对应关系分析:');
  allLinks.forEach(link => {
    const predictedFile = predictDataFileName(link);
    const exists = allLevel5Files.includes(predictedFile);
    console.log(`${link} → ${predictedFile} ${exists ? '✅' : '❌'}`);
  });
}

main(); 