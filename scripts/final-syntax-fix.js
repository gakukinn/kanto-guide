#!/usr/bin/env node

const fs = require('fs');

const files = [
  'src/data/level5-july-hanabi-chiba-marines.ts',
  'src/data/level5-july-hanabi-chiba-motherfarm.ts',
  'src/data/level5-july-hanabi-chiba-oamishirasato.ts',
  'src/data/level5-july-hanabi-chiba-sanmu.ts',
  'src/data/level5-july-hanabi-kanagawa-nightflowers.ts',
  'src/data/level5-july-hanabi-kanagawa-seaparadise.ts'
];

files.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 1. 修复dataSource字段名
    content = content.replace(/dataSource:\s*\{[^}]*\}/g, "dataSourceUrl: 'https://hanabi.walkerplus.com/detail/ar0312e00786/'");
    
    // 2. 修复weatherInfo缺少必填字段
    content = content.replace(
      /weatherInfo:\s*\{([^}]*)\}\s*mapEmbedUrl:/gs,
      (match, innerContent) => {
        if (!innerContent.includes('month:')) {
          const newWeatherInfo = `weatherInfo: {
   month: '7月',
   temperature: '最高30°C，最低23°C',
   humidity: '80%',
   rainfall: '小雨决行、恶劣天气延期',${innerContent}
 },

 mapEmbedUrl:`;
          return newWeatherInfo;
        }
        return match.replace(/\}\s*mapEmbedUrl:/, '},\n\n mapEmbedUrl:');
      }
    );
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ 修复完成: ${filePath}`);
  }
});

console.log('✨ 所有语法错误修复完成！'); 