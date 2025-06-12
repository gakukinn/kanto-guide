#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔗 开始修复断开的链接...\n');

let fixes = 0;

// 需要修复的链接映射 (指向实际存在的页面路径)
const linkMappings = {
  '/july/hanabi/chiba/marines': '/july/hanabi/chiba/marines-hanabi',
  '/july/hanabi/chiba/shirahama': '/july/hanabi/chiba/shirahama-ama-matsuri', 
  '/july/hanabi/chiba/futtsu': '/july/hanabi/chiba/futtsu-shimin-hanabi',
  '/july/hanabi/chiba/oamishirasato': '/july/hanabi/chiba/oamishirasato-hanabi',
  '/july/hanabi/chiba/motherfarm': '/july/hanabi/chiba/mother-farm-summer-night',
  '/july/hanabi/chiba/kamogawa': '/july/hanabi/chiba/kamogawa-shimin-hanabi'
};

function fixBrokenLinks() {
  const filePath = 'src/data/level4-july-chiba-hanabi.ts';
  const content = fs.readFileSync(filePath, 'utf8');
  
  console.log('🔧 修复 level4-july-chiba-hanabi.ts 中的断开链接...');
  
  let newContent = content;
  let fileModified = false;
  
  // 逐个替换错误的链接
  Object.entries(linkMappings).forEach(([oldLink, newLink]) => {
    const pattern = new RegExp(`detailLink:\\s*['"]${oldLink.replace(/[/]/g, '\\/')}['"]`, 'g');
    if (pattern.test(newContent)) {
      newContent = newContent.replace(pattern, `detailLink: '${newLink}'`);
      console.log(`  ✅ 修复: ${oldLink} → ${newLink}`);
      fileModified = true;
      fixes++;
    }
  });
  
  // 保存修改后的文件
  if (fileModified) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`  💾 ${path.basename(filePath)} 已保存\n`);
  } else {
    console.log(`  ✓ 没有找到需要修复的链接\n`);
  }
}

// 执行修复
fixBrokenLinks();

console.log(`📊 修复完成: ${fixes} 个断开链接已修复`);
console.log('\n💡 注意: 修复指向的是已存在的第五层页面');
console.log('💡 建议运行 npm run check-all 验证修复结果'); 