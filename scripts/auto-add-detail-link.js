#!/usr/bin/env node

/**
 * 自动添加第四层detailLink的工具
 * 使用方法: node scripts/auto-add-detail-link.js [event-name] [month] [region]
 * 例如: node scripts/auto-add-detail-link.js takasaki august kitakanto
 */

const fs = require('fs');
const path = require('path');

// 参数解析
const [, , eventName, month, region] = process.argv;

if (!eventName || !month || !region) {
  console.log('❌ 缺少参数!');
  console.log('使用方法: node scripts/auto-add-detail-link.js [事件名] [月份] [地区]');
  console.log('例如: node scripts/auto-add-detail-link.js takasaki august kitakanto');
  process.exit(1);
}

// 地区映射
const regionMapping = {
  'tokyo': '东京',
  'saitama': '埼玉',
  'chiba': '千叶', 
  'kanagawa': '神奈川',
  'kitakanto': '北关东',
  'koshinetsu': '甲信越'
};

// 月份映射
const monthMapping = {
  'july': '7月',
  'august': '8月',
  'september': '9月'
};

console.log(`🔧 开始处理: ${eventName} (${monthMapping[month]}${regionMapping[region]}花火)`);

// 构建文件路径
const level4FilePath = path.join(__dirname, '..', 'src', 'data', `level4-${month}-${region}-hanabi.ts`);
const level5FilePath = path.join(__dirname, '..', 'src', 'data', `level5-${month}-${eventName}-hanabi.ts`);
const pageFilePath = path.join(__dirname, '..', 'src', 'app', month, 'hanabi', region, eventName, 'page.tsx');

console.log(`📁 检查文件路径:`);
console.log(`   第四层: ${level4FilePath}`);
console.log(`   第五层: ${level5FilePath}`);
console.log(`   页面: ${pageFilePath}`);

// 检查第五层文件是否存在
if (!fs.existsSync(level5FilePath)) {
  console.log('❌ 第五层数据文件不存在:', level5FilePath);
  process.exit(1);
}

if (!fs.existsSync(pageFilePath)) {
  console.log('❌ 页面文件不存在:', pageFilePath);
  process.exit(1);
}

// 检查第四层文件
if (!fs.existsSync(level4FilePath)) {
  console.log('❌ 第四层数据文件不存在:', level4FilePath);
  process.exit(1);
}

// 读取第四层文件内容
let level4Content = fs.readFileSync(level4FilePath, 'utf-8');
console.log('✅ 成功读取第四层数据文件');

// 构建detailLink
const detailLink = `/${month}/hanabi/${region}/${eventName}`;
console.log(`🔗 detailLink: ${detailLink}`);

// 查找对应的事件条目
const eventPattern = new RegExp(
  `(\\s*{[^}]*id:\\s*["']${eventName}-${month}["'][^}]*)(}[^}]*detailLink[^}]*)`,
  'g'
);

let foundMatch = false;

// 尝试各种可能的ID模式
const possibleIds = [
  `${eventName}-${month}`,
  `${eventName}-august`, // 兼容旧格式
  `${eventName}-july`,
  `${eventName}-september`
];

for (const id of possibleIds) {
  const pattern = new RegExp(
    `(\\s*{[^}]*id:\\s*["']${id}["'][^}]*)(}[^}]*detailLink[^}]*})`,
    'g'
  );
  
  if (pattern.test(level4Content)) {
    // 检查是否已经有detailLink
    const hasDetailLink = new RegExp(`id:\\s*["']${id}["'][^}]*detailLink:`).test(level4Content);
    
    if (hasDetailLink) {
      console.log(`✅ ${id} 已存在detailLink，跳过更新`);
      foundMatch = true;
      break;
    }
    
    // 添加detailLink
    level4Content = level4Content.replace(pattern, (match, beforeClosing, afterClosing) => {
      const result = beforeClosing.trim() + `,\n    detailLink: "${detailLink}"` + '\n  }' + afterClosing.substring(1);
      console.log(`✅ 为 ${id} 添加了detailLink`);
      foundMatch = true;
      return result;
    });
    break;
  }
}

if (!foundMatch) {
  console.log(`❌ 在第四层数据文件中未找到匹配的事件ID`);
  console.log(`   尝试的ID: ${possibleIds.join(', ')}`);
  console.log(`   请检查第四层数据文件中的事件ID是否正确`);
  process.exit(1);
}

// 写回文件
try {
  fs.writeFileSync(level4FilePath, level4Content, 'utf-8');
  console.log('✅ 成功更新第四层数据文件!');
} catch (error) {
  console.log('❌ 写入文件失败:', error.message);
  process.exit(1);
}

console.log('');
console.log('🎉 detailLink 自动添加完成!');
console.log('');
console.log('📋 下一步建议:');
console.log('1. 运行 npm run check-all 验证');
console.log('2. 在浏览器中测试"查看详情"按钮');
console.log(`3. 访问: http://localhost:3000${detailLink}`); 