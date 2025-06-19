#!/usr/bin/env node

/**
 * 埼玉祭典数据验证脚本
 * 检查新添加的祭典事件数据是否符合要求
 */

const fs = require('fs');
const path = require('path');

// 读取埼玉祭典数据
const saitamaMatsuriPath = path.join(
  __dirname,
  '../src/data/saitama-matsuri.json'
);
const data = JSON.parse(fs.readFileSync(saitamaMatsuriPath, 'utf8'));

console.log('🎋 验证埼玉祭典数据...\n');

// 验证基本结构
console.log(`📊 总数据条数: ${data.length}`);

// 检查必要字段
const requiredFields = [
  'id',
  'title',
  'japaneseName',
  'englishName',
  'date',
  'location',
  'category',
  'highlights',
  'likes',
  'website',
  'description',
  'prefecture',
  'region',
];

let validCount = 0;
let errorCount = 0;

data.forEach((item, index) => {
  const missing = requiredFields.filter(field => !item[field]);

  if (missing.length === 0) {
    validCount++;
  } else {
    errorCount++;
    console.log(
      `❌ 条目 ${index + 1} (${item.title || 'Unknown'}) 缺少字段: ${missing.join(', ')}`
    );
  }
});

console.log(`\n✅ 有效数据: ${validCount} 条`);
if (errorCount > 0) {
  console.log(`❌ 错误数据: ${errorCount} 条`);
} else {
  console.log('🎉 所有数据验证通过！');
}

// 检查新增的祭典（ID范围 saitama-key-013 到 saitama-key-017）
console.log('\n🆕 新增祭典验证:');
const newEvents = data.filter(
  item => item.id && item.id.match(/^saitama-key-01[3-7]$/)
);

newEvents.forEach(event => {
  console.log(`✨ ${event.title} (${event.category}) - ${event.date}`);
  console.log(`   地点: ${event.location}`);
  console.log(`   亮点: ${event.highlights.length} 个特色`);
  console.log(`   点赞数: ${event.likes}`);
  console.log();
});

console.log(`🎊 成功添加 ${newEvents.length} 个新祭典事件！`);

// 按季节分类统计
const seasonMap = {
  春祭り: 0,
  花祭り: 0,
  夏祭り: 0,
  秋祭り: 0,
  冬祭り: 0,
  航空祭: 0,
  音楽祭: 0,
  山车祭典: 0,
  花车祭典: 0,
  传统工艺: 0,
  宿場祭り: 0,
  七夕祭り: 0,
};

data.forEach(item => {
  if (seasonMap.hasOwnProperty(item.category)) {
    seasonMap[item.category]++;
  }
});

console.log('\n📅 按类别统计:');
Object.entries(seasonMap).forEach(([category, count]) => {
  if (count > 0) {
    console.log(`   ${category}: ${count} 个`);
  }
});

console.log('\n✅ 验证完成！');
