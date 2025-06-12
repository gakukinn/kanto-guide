#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * 验证第四层到第五层链接完整性
 * 检查所有第四层数据文件中的detailLink是否有对应的页面文件
 */

console.log('🔗 开始验证第四层到第五层链接完整性...\n');

// 获取所有第四层数据文件
function getLevel4Files() {
  const dataDir = path.join(process.cwd(), 'src/data');
  const files = fs.readdirSync(dataDir);
  return files
    .filter(file => file.startsWith('level4-') && file.endsWith('.ts'))
    .map(file => path.join(dataDir, file));
}

const level4Files = getLevel4Files();
const issues = [];
const validLinks = [];

// 检查每个第四层数据文件
level4Files.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf8');
    
    // 提取detailLink路径
    const linkMatches = content.match(/detailLink:\s*['\"`]([^'\"`]*)['\"`]/g);
    
    if (linkMatches) {
      linkMatches.forEach(match => {
        const link = match.match(/detailLink:\s*['\"`]([^'\"`]*)['\"`]/)[1];
        
        // 构建对应的页面文件路径
        const pagePath = `src/app${link}/page.tsx`;
        
        // 检查页面文件是否存在
        if (fs.existsSync(pagePath)) {
          validLinks.push({
            dataFile: file,
            detailLink: link,
            pageFile: pagePath,
            status: '✅ 正常'
          });
        } else {
          issues.push({
            dataFile: file,
            detailLink: link,
            pageFile: pagePath,
            status: '❌ 缺失',
            problem: '页面文件不存在'
          });
        }
      });
    }
  } catch (error) {
    console.error(`❌ 读取文件失败: ${file}`, error.message);
  }
});

// 输出验证结果
console.log('📊 验证结果总结：');
console.log(`✅ 正常链接：${validLinks.length}个`);
console.log(`❌ 问题链接：${issues.length}个\n`);

if (validLinks.length > 0) {
  console.log('✅ 正常的链接：');
  validLinks.forEach(item => {
    console.log(`  ${item.detailLink} → ${item.pageFile}`);
  });
  console.log('');
}

if (issues.length > 0) {
  console.log('❌ 发现问题：');
  issues.forEach(item => {
    console.log(`  数据文件：${item.dataFile}`);
    console.log(`  链接路径：${item.detailLink}`);
    console.log(`  缺失文件：${item.pageFile}`);
    console.log(`  问题：${item.problem}\n`);
  });
  
  console.log('🔧 修复建议：');
  issues.forEach((item, index) => {
    console.log(`${index + 1}. 创建缺失的页面文件：${item.pageFile}`);
    console.log(`   对应的数据文件路径：${item.dataFile.replace('level4-', 'level5-').replace('.ts', '.ts')}`);
  });
  
  process.exit(1);
} else {
  console.log('🎉 所有链接验证通过！');
  process.exit(0);
} 