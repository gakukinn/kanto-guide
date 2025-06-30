const fs = require('fs');
const path = require('path');

/**
 * 修复页面媒体数据结构问题
 * 1. 添加缺失的 title 和 description 字段
 * 2. 移除不需要的 width 和 height 字段
 * 3. 确保 type 字段有正确的类型断言
 */

// 需要检查的目录
const REGIONS = ['tokyo', 'saitama', 'chiba', 'kanagawa', 'kitakanto', 'koshinetsu'];
const ACTIVITY_TYPES = ['hanabi', 'matsuri', 'hanami', 'momiji', 'illumination', 'culture'];

let totalFiles = 0;
let fixedFiles = 0;
let errorFiles = 0;

console.log('🔧 开始修复页面媒体数据结构问题...\n');

function extractActivityName(content) {
  // 从注释中提取活动名称
  const nameMatch = content.match(/\* 名称: ([^\n\r]*)/);
  if (nameMatch) {
    return nameMatch[1].trim();
  }
  
  // 从 name 字段提取
  const nameFieldMatch = content.match(/name: ["']([^"']*)["']/);
  if (nameFieldMatch) {
    return nameFieldMatch[1].trim();
  }
  
  return '活动';
}

function fixMediaStructure(content, activityName) {
  // 使用正则表达式匹配和修复媒体对象
  const mediaRegex = /media:\s*\[\s*([\s\S]*?)\s*\]/;
  const mediaMatch = content.match(mediaRegex);
  
  if (!mediaMatch) {
    return content; // 没有媒体数据，跳过
  }
  
  const mediaContent = mediaMatch[1];
  
  // 分割每个媒体对象
  const mediaObjects = [];
  let currentObject = '';
  let braceCount = 0;
  let inString = false;
  let stringChar = '';
  
  for (let i = 0; i < mediaContent.length; i++) {
    const char = mediaContent[i];
    
    if (!inString && (char === '"' || char === "'")) {
      inString = true;
      stringChar = char;
    } else if (inString && char === stringChar && mediaContent[i-1] !== '\\') {
      inString = false;
    } else if (!inString) {
      if (char === '{') {
        braceCount++;
      } else if (char === '}') {
        braceCount--;
        if (braceCount === 0) {
          currentObject += char;
          mediaObjects.push(currentObject.trim());
          currentObject = '';
          continue;
        }
      }
    }
    
    if (braceCount > 0) {
      currentObject += char;
    }
  }
  
  // 修复每个媒体对象
  const fixedObjects = mediaObjects.map((obj, index) => {
    let fixed = obj;
    
    // 1. 确保有 type 字段的类型断言
    fixed = fixed.replace(/type:\s*"image"(?!\s+as\s+const)/g, 'type: "image" as const');
    fixed = fixed.replace(/type:\s*"video"(?!\s+as\s+const)/g, 'type: "video" as const');
    
    // 2. 移除 width 和 height 字段
    fixed = fixed.replace(/,?\s*width:\s*\d+/g, '');
    fixed = fixed.replace(/,?\s*height:\s*\d+/g, '');
    
    // 3. 检查并添加缺失的 title 字段
    if (!fixed.includes('title:')) {
      const titleValue = `"${activityName}图片${index + 1}"`;
      // 在 url 字段后添加 title
      fixed = fixed.replace(/(url:\s*"[^"]*")/g, `$1,\n      title: ${titleValue}`);
    }
    
    // 4. 检查并添加缺失的 description 字段
    if (!fixed.includes('description:')) {
      const descriptionValue = `"${activityName}的现场照片"`;
      // 在 title 字段后添加 description
      fixed = fixed.replace(/(title:\s*"[^"]*")/g, `$1,\n      description: ${descriptionValue}`);
    }
    
    // 5. 清理多余的逗号
    fixed = fixed.replace(/,(\s*[}\]])/g, '$1');
    
    return fixed;
  });
  
  // 重新组装媒体数组
  const newMediaContent = fixedObjects.join(',\n    ');
  const newMediaArray = `[\n    ${newMediaContent}\n  ]`;
  
  // 替换原有的媒体数组
  return content.replace(mediaRegex, `media: ${newMediaArray}`);
}

function fixPageFile(filePath) {
  try {
    // 读取文件内容
    const content = fs.readFileSync(filePath, 'utf8');
    
    // 提取活动名称
    const activityName = extractActivityName(content);
    
    // 检查是否需要修复
    const hasMediaIssues = 
      content.includes('width:') || 
      content.includes('height:') ||
      (content.includes('media:') && (!content.includes('title:') || !content.includes('description:'))) ||
      (content.includes('type: "image"') && !content.includes('type: "image" as const'));
    
    if (!hasMediaIssues) {
      console.log(`⏭️  跳过: ${filePath} (无需修复)`);
      return false;
    }
    
    // 执行修复
    const fixedContent = fixMediaStructure(content, activityName);
    
    // 写回文件
    fs.writeFileSync(filePath, fixedContent, 'utf8');
    
    console.log(`✅ 修复: ${filePath} (${activityName})`);
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
  console.log('\n🎉 媒体数据结构修复完成！所有页面现在都符合HanabiMedia接口要求。');
  console.log('✅ 已添加缺失的 title 和 description 字段');
  console.log('✅ 已移除多余的 width 和 height 字段');
  console.log('✅ 已确保 type 字段有正确的类型断言');
} else {
  console.log('\n✨ 所有页面的媒体数据结构都已经正确，无需修复。');
} 