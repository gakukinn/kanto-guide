#!/usr/bin/env node

/**
 * 快速验证脚本 - 检查数据完整性
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 开始快速数据验证...\n');

// 扫描src/data目录下的文件
const dataDir = path.join(process.cwd(), 'src', 'data');
const files = fs.readdirSync(dataDir);

const level5Files = files.filter(f => f.startsWith('level5-') && f.endsWith('.ts'));
const level4Files = files.filter(f => f.startsWith('level4-') && f.endsWith('.ts'));

console.log(`📊 发现文件统计:`);
console.log(`- Level 5文件: ${level5Files.length}个`);
console.log(`- Level 4文件: ${level4Files.length}个\n`);

// 检查Level 5文件的website字段
let level5WithWebsite = 0;
let level5WithoutWebsite = [];

console.log('🔍 检查Level 5文件的website字段:');
level5Files.forEach(fileName => {
  const filePath = path.join(dataDir, fileName);
  const content = fs.readFileSync(filePath, 'utf8');
  
  if (content.includes('website:')) {
    level5WithWebsite++;
    console.log(`✅ ${fileName}: 有website字段`);
  } else {
    level5WithoutWebsite.push(fileName);
    console.log(`❌ ${fileName}: 缺少website字段`);
  }
});

console.log(`\n📋 Level 5文件website字段统计:`);
console.log(`- 有website字段: ${level5WithWebsite}个`);
console.log(`- 缺少website字段: ${level5WithoutWebsite.length}个`);

if (level5WithoutWebsite.length > 0) {
  console.log(`\n❌ 缺少website字段的文件:`);
  level5WithoutWebsite.forEach(file => console.log(`   - ${file}`));
}

// 检查Level 4文件的对应关系
console.log(`\n🔍 检查Level 4文件的类型:`);
const level4Categories = {
  august: [],
  july: [],
  september: []
};

level4Files.forEach(fileName => {
  if (fileName.includes('august')) {
    level4Categories.august.push(fileName);
  } else if (fileName.includes('july')) {
    level4Categories.july.push(fileName);
  } else if (fileName.includes('september')) {
    level4Categories.september.push(fileName);
  }
});

console.log(`📅 Level 4文件月份分布:`);
console.log(`- 七月: ${level4Categories.july.length}个`);
console.log(`- 八月: ${level4Categories.august.length}个`);
console.log(`- 九月: ${level4Categories.september.length}个`);

// 检查具体花火大会页面文件
const specificHanabiFiles = level5Files.filter(f => 
  !f.includes('july-chiba.ts') && 
  !f.includes('july-kanagawa.ts') && 
  !f.includes('july-koshinetsu.ts')
);

console.log(`\n🎆 具体花火大会详情页文件: ${specificHanabiFiles.length}个`);

// 简单总结
console.log(`\n📊 验证总结:`);
console.log(`- Level 5详情页总数: ${level5Files.length}`);
console.log(`- 有website字段: ${level5WithWebsite} (${((level5WithWebsite/level5Files.length)*100).toFixed(1)}%)`);
console.log(`- Level 4地区页总数: ${level4Files.length}`);
console.log(`- 具体花火详情页: ${specificHanabiFiles.length}`);

if (level5WithoutWebsite.length === 0) {
  console.log(`\n🎉 所有Level 5文件都有website字段！`);
} else {
  console.log(`\n⚠️  需要修复 ${level5WithoutWebsite.length} 个文件的website字段`);
} 