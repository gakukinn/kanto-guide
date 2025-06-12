#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('📅 开始修复第五层文件日期格式...\n');

let fixes = 0;
let errors = [];

// 日期格式修复函数
function fixDateFormats() {
  const level5Files = glob.sync('src/data/level5-*.ts');
  
  level5Files.forEach(filePath => {
    const fileName = path.basename(filePath);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // 从文件名中提取月份
    let targetMonth = '';
    if (fileName.includes('july')) {
      targetMonth = '7';
    } else if (fileName.includes('august')) {
      targetMonth = '8';
    } else if (fileName.includes('september')) {
      targetMonth = '9';
    } else {
      // 对于没有明确月份标识的文件，尝试从内容中推断
      console.log(`⚠️  ${fileName}: 无法从文件名确定月份，跳过处理`);
      return;
    }
    
    console.log(`🔧 处理 ${fileName} (${targetMonth}月花火)`);
    
    let newContent = content;
    let fileModified = false;
    
    // 检查和修复各种错误的日期格式
    const wrongDatePatterns = [
      // 简单日期格式错误
      /date:\s*['"](\d{1,2})月(\d{1,2})日['"]/, 
      /date:\s*['"](\d{1,2})月(\d{1,2})日・(\d{1,2})日['"]/, 
      /date:\s*['"](\d{1,2})月(\d{1,2})日\(.\)['"]/, 
      /date:\s*['"](\d{1,2})月(\d{1,2})日-(\d{1,2})月(\d{1,2})日特定日['"]/, 
      /date:\s*['"](\d{1,2})月(\d{1,2})日～(\d{1,2})月(\d{1,2})日期间['"]/, 
      /date:\s*['"](\d{1,2})月(\d{1,2})日・(\d{1,2})日・(\d{1,2})日['"]/, 
      /date:\s*['"](\d{1,2})月(\d{1,2})日・(\d{1,2})日，(\d{1,2})月(\d{1,2})日.+['"]/, 
      /date:\s*['"](\d{1,2})月(\d{1,2})日.+['"]/ 
    ];
    
    // 检查当前日期格式
    wrongDatePatterns.forEach(pattern => {
      if (pattern.test(newContent)) {
        const match = newContent.match(pattern);
        if (match) {
          console.log(`  📝 发现错误日期格式: ${match[0]}`);
          
          // 从匹配中提取第一个日期
          let day = '';
          if (match[2]) { // 有日
            day = match[2];
          } else if (match[1] && !isNaN(match[1])) { // 只有一个数字（可能是日）
            day = match[1];
          } else {
            day = '1'; // 默认1日
          }
          
          const correctDate = `2025年${targetMonth}月${day}日`;
          newContent = newContent.replace(pattern, `date: '${correctDate}'`);
          console.log(`  ✅ 修复为: date: '${correctDate}'`);
          fileModified = true;
          fixes++;
        }
      }
    });
    
    // 检查是否已经是正确格式
    const correctPattern = new RegExp(`date:\\s*['"]2025年${targetMonth}月\\d{1,2}日['"]`);
    if (!correctPattern.test(newContent) && !fileModified) {
      console.log(`  ⚠️  无法确定正确的日期，使用默认: 2025年${targetMonth}月1日`);
      // 寻找任何date字段并替换
      const anyDatePattern = /date:\s*['"][^'"]*['"]/;
      if (anyDatePattern.test(newContent)) {
        newContent = newContent.replace(anyDatePattern, `date: '2025年${targetMonth}月1日'`);
        fileModified = true;
        fixes++;
      }
    }
    
    // 保存修改后的文件
    if (fileModified) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`  💾 ${fileName} 已保存`);
    } else {
      console.log(`  ✓ ${fileName} 日期格式已正确`);
    }
    
    console.log('');
  });
}

// 执行修复
fixDateFormats();

console.log(`📊 修复完成: ${fixes} 个日期格式已修复`);
if (errors.length > 0) {
  console.log(`❌ 错误: ${errors.length} 个文件处理失败`);
  errors.forEach(error => console.log(`  - ${error}`));
}

console.log('\n💡 建议运行 npm run check-all 验证修复结果'); 