#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

/**
 * 验证图片资源脚本
 * 检查所有数据文件中配置的图片路径是否真实存在
 */

console.log('🔍 开始验证图片资源...\n');

// 获取所有现有的图片文件
const imageDir = path.join(process.cwd(), 'public/images/hanabi');
const existingImages = fs.existsSync(imageDir) 
  ? fs.readdirSync(imageDir).filter(file => file.endsWith('.svg'))
  : [];

console.log('📁 现有图片文件：');
existingImages.forEach(img => console.log(`  ✅ ${img}`));
console.log('');

// 获取所有数据文件
const dataFiles = glob.sync('src/data/level5-*.ts');
const issues = [];
const validImages = [];

// 检查每个数据文件
dataFiles.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf8');
    
    // 提取图片路径
    const imageMatches = content.match(/url:\s*['"`]([^'"`]*images\/hanabi\/[^'"`]*\.svg)['"`]/g);
    
    if (imageMatches) {
      imageMatches.forEach(match => {
        const urlMatch = match.match(/['"`]([^'"`]*images\/hanabi\/[^'"`]*\.svg)['"`]/);
        if (urlMatch) {
          const imagePath = urlMatch[1];
          const fileName = path.basename(imagePath);
          
          if (existingImages.includes(fileName)) {
            validImages.push({
              file: path.basename(file),
              imagePath,
              status: '✅'
            });
          } else {
            issues.push({
              file: path.basename(file),
              imagePath,
              fileName,
              status: '❌'
            });
          }
        }
      });
    }
  } catch (error) {
    console.error(`❌ 读取文件失败: ${file}`, error.message);
  }
});

// 报告结果
console.log('📊 验证结果：');
console.log(`✅ 有效图片配置: ${validImages.length}`);
console.log(`❌ 无效图片配置: ${issues.length}\n`);

if (issues.length > 0) {
  console.log('🚨 发现的问题：');
  issues.forEach(issue => {
    console.log(`${issue.status} ${issue.file}`);
    console.log(`   图片路径: ${issue.imagePath}`);
    console.log(`   缺失文件: ${issue.fileName}`);
    console.log('');
  });
  
  console.log('🔧 建议的修复方案：');
  console.log('方案1: 使用现有图片替换');
  
  const suggestions = issues.map(issue => {
    // 寻找最相似的现有图片
    const suggestedImage = existingImages.find(img => 
      img.includes('fireworks') || img.includes('main')
    ) || existingImages[0];
    
    return {
      file: issue.file,
      current: issue.imagePath,
      suggested: `/images/hanabi/${suggestedImage}`
    };
  });
  
  suggestions.forEach(suggestion => {
    console.log(`📝 ${suggestion.file}:`);
    console.log(`   当前: ${suggestion.current}`);
    console.log(`   建议: ${suggestion.suggested}`);
    console.log('');
  });
  
  console.log('方案2: 创建缺失的图片文件');
  const uniqueFiles = [...new Set(issues.map(i => i.fileName))];
  console.log('需要创建的文件：');
  uniqueFiles.forEach(file => {
    console.log(`   📄 public/images/hanabi/${file}`);
  });
} else {
  console.log('🎉 所有图片配置都有效！');
}

console.log('\n✨ 验证完成'); 