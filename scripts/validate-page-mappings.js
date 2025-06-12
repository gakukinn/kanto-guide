#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

console.log('🔍 页面映射完整性检查工具\n');

// 获取所有第三层页面（花火页面）
const regions = ['tokyo', 'saitama', 'chiba', 'kanagawa'];
let totalErrors = 0;
let totalMappings = 0;

for (const region of regions) {
  console.log(`📍 检查 ${region} 地区:`);
  
  const hanabiPagePath = `src/app/${region}/hanabi/page.tsx`;
  
  if (!fs.existsSync(hanabiPagePath)) {
    console.log(`  ❌ 花火页面不存在: ${hanabiPagePath}`);
    continue;
  }
  
  // 读取页面内容
  const content = fs.readFileSync(hanabiPagePath, 'utf8');
  
  // 提取eventToFolderMap
  const mapMatch = content.match(/const eventToFolderMap: Record<string, string> = \{([^}]+)\}/s);
  if (!mapMatch) {
    console.log(`  ❌ 未找到eventToFolderMap映射表`);
    continue;
  }
  
  // 解析映射表
  const mapContent = mapMatch[1];
  const mappings = {};
  const lines = mapContent.split('\n').filter(line => line.trim());
  
  for (const line of lines) {
    const match = line.match(/'([^']+)':\s*'([^']+)'/);
    if (match) {
      const [, eventId, folderName] = match;
      mappings[eventId] = folderName;
      totalMappings++;
    }
  }
  
  console.log(`  📊 找到 ${Object.keys(mappings).length} 个映射条目`);
  
  // 检查实际文件夹
  const hanabiDir = `src/app/${region}/hanabi`;
  const actualFolders = fs.readdirSync(hanabiDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  console.log(`  📁 实际存在 ${actualFolders.length} 个详情页面文件夹`);
  
  // 检查映射完整性
  let regionErrors = 0;
  
  // 检查映射指向的文件夹是否存在
  for (const [eventId, folderName] of Object.entries(mappings)) {
    if (!actualFolders.includes(folderName)) {
      console.log(`  ❌ 映射错误: '${eventId}' -> '${folderName}' (文件夹不存在)`);
      regionErrors++;
    }
  }
  
  // 检查是否有文件夹没有对应的映射
  for (const folder of actualFolders) {
    const hasMapping = Object.values(mappings).includes(folder);
    if (!hasMapping) {
      console.log(`  ⚠️  孤立文件夹: '${folder}' (没有对应的映射条目)`);
    }
  }
  
  // 提取页面中的事件列表，检查是否所有有detailLink的事件都有映射
  const eventsMatch = content.match(/const \w+Events\s*=\s*\[([^;]+)\];/s);
  if (eventsMatch) {
    const eventsContent = eventsMatch[1];
    const eventIds = [];
    const detailLinkPattern = /id:\s*'([^']+)'[^}]*detailLink:/g;
    let match;
    
    while ((match = detailLinkPattern.exec(eventsContent)) !== null) {
      eventIds.push(match[1]);
    }
    
    console.log(`  🔗 找到 ${eventIds.length} 个有detailLink的事件`);
    
    for (const eventId of eventIds) {
      if (!mappings[eventId]) {
        console.log(`  ❌ 缺失映射: 事件 '${eventId}' 有detailLink但没有映射条目`);
        regionErrors++;
      }
    }
  }
  
  totalErrors += regionErrors;
  
  if (regionErrors === 0) {
    console.log(`  ✅ ${region} 地区映射完整\n`);
  } else {
    console.log(`  ❌ ${region} 地区发现 ${regionErrors} 个问题\n`);
  }
}

console.log(`🎯 检查完成:`);
console.log(`📊 总映射条目: ${totalMappings}`);
console.log(`❌ 发现问题: ${totalErrors}`);

if (totalErrors === 0) {
  console.log(`✅ 所有地区的页面映射都正确！`);
  process.exit(0);
} else {
  console.log(`❌ 发现映射问题，需要修复！`);
  process.exit(1);
} 