#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 需要修复的文件列表
const filesToFix = [
  'src/data/level5-july-hanabi-chiba-kamogawa.ts',
  'src/data/level5-july-hanabi-chiba-marines.ts',
  'src/data/level5-july-hanabi-chiba-motherfarm.ts',
  'src/data/level5-july-hanabi-chiba-oamishirasato.ts',
  'src/data/level5-july-hanabi-chiba-sanmu.ts',
  'src/data/level5-july-hanabi-kanagawa-nightflowers.ts',
  'src/data/level5-july-hanabi-kanagawa-seaparadise.ts'
];

function fixSyntaxErrors(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 1. 修复weatherInfo对象缺少必填字段的问题
    content = content.replace(
      /weatherInfo:\s*\{([^}]*)\}/gs,
      (match, innerContent) => {
        // 检查是否缺少必填字段
        if (!innerContent.includes('month:')) {
          innerContent = `\n   month: '7月',\n   temperature: '最高30°C，最低23°C',\n   humidity: '75%',\n   rainfall: '小雨举行（恶劣天气延期或取消）',${innerContent}`;
        }
        return `weatherInfo: {${innerContent}}`;
      }
    );
    
    // 2. 修复weatherInfo对象后缺少逗号的问题
    content = content.replace(
      /weatherInfo:\s*\{[^}]*\}\s*mapEmbedUrl:/gs,
      (match) => {
        return match.replace(/\}\s*mapEmbedUrl:/, '},\n\n mapEmbedUrl:');
      }
    );
    
    // 3. 确保mapEmbedUrl是对象的最后一个字段
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

console.log('🔧 开始修复语法错误...\n');

filesToFix.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    fixSyntaxErrors(filePath);
  } else {
    console.log(`⚠️  文件不存在: ${filePath}`);
  }
});

console.log('\n✨ 语法错误修复完成！'); 