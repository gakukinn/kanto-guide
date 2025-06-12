#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 不存在的页面路径列表（从检查报告中提取）
const nonExistentPages = [
  '/august/hanabi/koshinetsu/nagaoka',
  '/august/hanabi/koshinetsu/suwa',
  '/august/hanabi/koshinetsu/shinmei',
  '/august/hanabi/koshinetsu/kawaguchi',
  '/august/hanabi/koshinetsu/niigata',
  '/august/hanabi/koshinetsu/ueda'
];

function removeDetailLinkFromEvent(eventText, detailLink) {
  // 移除detailLink行，保持其他内容不变
  const detailLinkRegex = new RegExp(`\\s*detailLink:\\s*['"\`]${detailLink.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"\`],?\\s*`, 'g');
  return eventText.replace(detailLinkRegex, '');
}

function fixLevel4File(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // 查找所有detailLink字段
    const detailLinkRegex = /detailLink:\s*['"`]([^'"`]+)['"`]/g;
    let match;
    const linksToRemove = [];
    
    while ((match = detailLinkRegex.exec(content)) !== null) {
      const detailLink = match[1];
      
      // 检查是否在不存在页面列表中
      if (nonExistentPages.includes(detailLink)) {
        linksToRemove.push(detailLink);
      }
    }
    
    // 移除找到的损坏链接
    linksToRemove.forEach(link => {
      const linkRegex = new RegExp(`\\s*detailLink:\\s*['"\`]${link.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"\`],?\\s*`, 'g');
      content = content.replace(linkRegex, '');
      console.log(`✅ ${path.basename(filePath)}: 移除损坏链接 ${link}`);
      modified = true;
    });
    
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
  console.log('🔧 开始移除指向不存在页面的detailLink...\n');
  
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