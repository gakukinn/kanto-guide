#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

console.log('🔧 页面映射自动修复工具\n');

// 获取所有第三层页面（花火页面）
const regions = ['tokyo', 'saitama', 'chiba', 'kanagawa'];
let totalFixed = 0;

for (const region of regions) {
  console.log(`🔧 修复 ${region} 地区:`);
  
  const hanabiPagePath = `src/app/${region}/hanabi/page.tsx`;
  
  if (!fs.existsSync(hanabiPagePath)) {
    console.log(`  ⚠️  花火页面不存在，跳过: ${hanabiPagePath}\n`);
    continue;
  }
  
  // 读取页面内容
  let content = fs.readFileSync(hanabiPagePath, 'utf8');
  
  // 获取实际存在的文件夹
  const hanabiDir = `src/app/${region}/hanabi`;
  const actualFolders = fs.readdirSync(hanabiDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  console.log(`  📁 发现 ${actualFolders.length} 个详情页面文件夹`);
  
  // 提取现有的事件列表，查找所有事件ID
  const eventsMatch = content.match(/const \w+Events\s*=\s*\[([^;]+)\];/s);
  if (!eventsMatch) {
    console.log(`  ❌ 未找到事件列表，跳过\n`);
    continue;
  }
  
  const eventsContent = eventsMatch[1];
  const eventIds = [];
  
  // 匹配所有事件ID
  const idPattern = /id:\s*'([^']+)'/g;
  let match;
  while ((match = idPattern.exec(eventsContent)) !== null) {
    eventIds.push(match[1]);
  }
  
  console.log(`  🎯 找到 ${eventIds.length} 个事件`);
  
  // 智能生成映射表
  const smartMappings = {};
  
  for (const eventId of eventIds) {
    // 查找最匹配的文件夹
    let bestMatch = null;
    let bestScore = 0;
    
    for (const folder of actualFolders) {
      let score = 0;
      
      // 直接匹配
      if (eventId === folder) {
        score = 100;
      }
      // 部分匹配策略
      else if (eventId.includes(folder) || folder.includes(eventId)) {
        score = 80;
      }
      // 关键词匹配
      else {
        const eventWords = eventId.toLowerCase().split(/[-_]/);
        const folderWords = folder.toLowerCase().split(/[-_]/);
        
        for (const eventWord of eventWords) {
          for (const folderWord of folderWords) {
            if (eventWord === folderWord) {
              score += 20;
            } else if (eventWord.includes(folderWord) || folderWord.includes(eventWord)) {
              score += 10;
            }
          }
        }
      }
      
      if (score > bestScore) {
        bestScore = score;
        bestMatch = folder;
      }
    }
    
    // 只有分数足够高才添加映射
    if (bestScore >= 20 && bestMatch) {
      smartMappings[eventId] = bestMatch;
      console.log(`  ✅ 匹配: '${eventId}' -> '${bestMatch}' (分数: ${bestScore})`);
    } else {
      console.log(`  ⚠️  无匹配: '${eventId}' (最高分数: ${bestScore})`);
    }
  }
  
  // 生成新的映射表代码
  const newMappingLines = Object.entries(smartMappings)
    .map(([eventId, folder]) => `                  '${eventId}': '${folder}',`)
    .join('\n');
  
  const newMappingCode = `                const eventToFolderMap: Record<string, string> = {\n${newMappingLines}\n                };`;
  
  // 替换原有的映射表
  const mapRegex = /const eventToFolderMap: Record<string, string> = \{[^}]*\};/s;
  if (mapRegex.test(content)) {
    content = content.replace(mapRegex, newMappingCode);
    console.log(`  🔄 更新了映射表`);
  } else {
    console.log(`  ❌ 未找到原有映射表，跳过`);
    continue;
  }
  
  // 写回文件
  fs.writeFileSync(hanabiPagePath, content, 'utf8');
  console.log(`  💾 已保存文件: ${hanabiPagePath}`);
  
  totalFixed++;
  console.log(`  ✅ ${region} 地区修复完成\n`);
}

console.log(`🎯 修复完成:`);
console.log(`🔧 修复了 ${totalFixed} 个地区的映射表`);
console.log(`✅ 现在所有页面映射应该都正确了！`);

if (totalFixed > 0) {
  console.log(`\n💡 建议运行以下命令验证修复效果:`);
  console.log(`npm run validate-mappings`);
} 