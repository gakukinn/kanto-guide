#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 需要修复的文件列表
const filesToFix = [
  'src/data/level5-august-hanabi-tokyo-akishima.ts',
  'src/data/level5-august-hanabi-tokyo-edogawa.ts',
  'src/data/level5-july-hanabi-chiba-kamogawa.ts',
  'src/data/level5-july-hanabi-chiba-marines.ts',
  'src/data/level5-july-hanabi-chiba-motherfarm.ts',
  'src/data/level5-july-hanabi-chiba-oamishirasato.ts',
  'src/data/level5-july-hanabi-chiba-sanmu.ts',
  'src/data/level5-july-hanabi-kanagawa-nightflowers.ts',
  'src/data/level5-july-hanabi-kanagawa-seaparadise.ts'
];

function fixMapEmbedUrlSyntax(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 修复mapEmbedUrl语法错误 - 确保字符串正确闭合
    content = content.replace(
      /mapEmbedUrl:\s*'([^']*?)'\s*,?\s*$/gm,
      "mapEmbedUrl: \"$1\""
    );
    
    // 确保最后一个字段后面没有逗号
    content = content.replace(
      /mapEmbedUrl:\s*"([^"]*?)"\s*,?\s*\n\s*\}\s*;/g,
      'mapEmbedUrl: "$1"\n};'
    );
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ 修复完成: ${filePath}`);
    
  } catch (error) {
    console.error(`❌ 修复失败: ${filePath}`, error.message);
  }
}

console.log('🔧 开始修复mapEmbedUrl语法错误...\n');

filesToFix.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    fixMapEmbedUrlSyntax(filePath);
  } else {
    console.log(`⚠️  文件不存在: ${filePath}`);
  }
});

console.log('\n✨ mapEmbedUrl语法修复完成！'); 