const fs = require('fs');
const path = require('path');

/**
 * 批量修复页面TypeScript类型错误
 * 主要修复：type: "image" → type: "image" as const
 */

// 需要检查的目录
const REGIONS = ['tokyo', 'saitama', 'chiba', 'kanagawa', 'kitakanto', 'koshinetsu'];
const ACTIVITY_TYPES = ['hanabi', 'matsuri', 'hanami', 'momiji', 'illumination', 'culture'];

let totalFiles = 0;
let fixedFiles = 0;
let errorFiles = 0;

console.log('🔧 开始批量修复页面TypeScript类型错误...\n');

function fixPageFile(filePath) {
  try {
    // 读取文件内容
    const content = fs.readFileSync(filePath, 'utf8');
    
    // 检查是否需要修复
    const needsFix = content.includes('type: "image"') || content.includes('type: "video"');
    
    if (!needsFix) {
      console.log(`⏭️  跳过: ${filePath} (无需修复)`);
      return false;
    }
    
    // 执行修复
    let fixedContent = content
      .replace(/type: "image"/g, 'type: "image" as const')
      .replace(/type: "video"/g, 'type: "video" as const');
    
    // 写回文件
    fs.writeFileSync(filePath, fixedContent, 'utf8');
    
    console.log(`✅ 修复: ${filePath}`);
    return true;
    
  } catch (error) {
    console.error(`❌ 错误: ${filePath} - ${error.message}`);
    errorFiles++;
    return false;
  }
}

function scanDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    return;
  }
  
  const items = fs.readdirSync(dirPath);
  
  for (const item of items) {
    const itemPath = path.join(dirPath, item);
    const stat = fs.statSync(itemPath);
    
    if (stat.isDirectory()) {
      // 递归扫描子目录
      scanDirectory(itemPath);
    } else if (item === 'page.tsx') {
      // 找到页面文件
      totalFiles++;
      if (fixPageFile(itemPath)) {
        fixedFiles++;
      }
    }
  }
}

// 扫描所有地区和活动类型
console.log('📂 扫描目录结构...');

for (const region of REGIONS) {
  for (const activityType of ACTIVITY_TYPES) {
    const dirPath = path.join('app', region, activityType);
    console.log(`🔍 扫描: ${dirPath}`);
    scanDirectory(dirPath);
  }
}

// 输出统计结果
console.log('\n📊 修复统计:');
console.log(`总文件数: ${totalFiles}`);
console.log(`修复成功: ${fixedFiles}`);
console.log(`修复失败: ${errorFiles}`);
console.log(`无需修复: ${totalFiles - fixedFiles - errorFiles}`);

if (fixedFiles > 0) {
  console.log('\n🎉 批量修复完成！所有页面的TypeScript类型错误已修复。');
} else {
  console.log('\n✨ 所有页面都已经是正确的格式，无需修复。');
} 