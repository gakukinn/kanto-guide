const fs = require('fs');
const path = require('path');

console.log('🔍 检查东京七月花火链接状态\n');

const dataDir = path.join(__dirname, '../src/data');

// 获取东京Level 4的详情链接
function getTokyoDetailLinks() {
  const filePath = path.join(dataDir, 'level4-july-tokyo-hanabi.ts');
  const content = fs.readFileSync(filePath, 'utf8');
  
  const detailLinkMatches = content.match(/detailLink:\s*['"`]([^'"`]+)['"`]/g);
  
  const links = [];
  if (detailLinkMatches) {
    detailLinkMatches.forEach(match => {
      const link = match.match(/['"`]([^'"`]+)['"`]/)[1];
      links.push(link);
    });
  }
  
  return links;
}

// 检查对应的数据文件是否存在
function checkDataFiles(links) {
  const results = [];
  
  links.forEach(link => {
    // 从链接推测文件名
    const parts = link.split('/');
    const eventName = parts[parts.length - 1];
    
    // 可能的文件名变体
    const possibleFiles = [
      `level5-july-hanabi-tokyo-${eventName}.ts`,
      `level5-july-hanabi-${eventName}.ts`
    ];
    
    let fileFound = null;
    possibleFiles.forEach(fileName => {
      const filePath = path.join(dataDir, fileName);
      if (fs.existsSync(filePath)) {
        fileFound = fileName;
      }
    });
    
    results.push({
      link,
      eventName,
      dataFile: fileFound,
      exists: !!fileFound
    });
  });
  
  return results;
}

// 主函数
function main() {
  const links = getTokyoDetailLinks();
  console.log(`📊 东京Level 4中的详情链接数量: ${links.length}\n`);
  
  console.log('🔗 详情链接列表:');
  links.forEach((link, index) => {
    console.log(`${index + 1}. ${link}`);
  });
  
  console.log('\n🔍 数据文件检查结果:');
  const results = checkDataFiles(links);
  
  let allLinked = true;
  results.forEach(result => {
    const status = result.exists ? '✅' : '❌';
    console.log(`${status} ${result.link}`);
    if (result.exists) {
      console.log(`   → ${result.dataFile}`);
    } else {
      console.log(`   → 缺少数据文件`);
      allLinked = false;
    }
  });
  
  console.log(`\n📈 总结:`);
  console.log(`- 总链接数: ${links.length}`);
  console.log(`- 有效链接: ${results.filter(r => r.exists).length}`);
  console.log(`- 缺失链接: ${results.filter(r => !r.exists).length}`);
  console.log(`- 状态: ${allLinked ? '✅ 完美' : '⚠️ 需要修复'}`);
  
  // 检查移动的文件
  const tempDir = path.join(__dirname, '../temp-duplicate-files');
  if (fs.existsSync(tempDir)) {
    const movedFiles = fs.readdirSync(tempDir).filter(f => f.endsWith('.ts'));
    console.log(`\n📦 已移动的重复文件: ${movedFiles.length}个`);
    movedFiles.forEach(file => {
      console.log(`   - ${file}`);
    });
  }
}

main(); 