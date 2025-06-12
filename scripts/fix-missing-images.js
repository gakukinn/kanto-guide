#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 检查图片文件是否存在
function imageExists(imagePath) {
  const fullPath = path.join(__dirname, '../public', imagePath);
  return fs.existsSync(fullPath);
}

// 获取可用的替代图片
function getAvailableImages() {
  const imagesDir = path.join(__dirname, '../public/images/hanabi');
  if (!fs.existsSync(imagesDir)) {
    return [];
  }
  
  return fs.readdirSync(imagesDir)
    .filter(file => file.endsWith('.svg') || file.endsWith('.jpg') || file.endsWith('.png'))
    .map(file => `/images/hanabi/${file}`);
}

function fixImageInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // 查找所有imageUrl字段
    const imageUrlRegex = /imageUrl:\s*['"`]([^'"`]+)['"`]/g;
    let match;
    
    while ((match = imageUrlRegex.exec(content)) !== null) {
      const imageUrl = match[1];
      
      // 检查图片是否存在
      if (!imageExists(imageUrl)) {
        // 使用默认图片替换
        const newImageUrl = '/images/hanabi/default.jpg';
        content = content.replace(match[0], `imageUrl: '${newImageUrl}'`);
        console.log(`✅ ${path.basename(filePath)}: 修复图片 ${imageUrl} -> ${newImageUrl}`);
        modified = true;
      }
    }
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`❌ ${path.basename(filePath)}: ${error.message}`);
    return false;
  }
}

function main() {
  console.log('🔧 开始修复缺失的图片资源...\n');
  
  // 检查可用图片
  const availableImages = getAvailableImages();
  console.log(`📁 可用图片: ${availableImages.length} 个`);
  availableImages.forEach(img => console.log(`   - ${img}`));
  console.log('');
  
  const dataDir = path.join(__dirname, '../src/data');
  const dataFiles = fs.readdirSync(dataDir)
    .filter(file => file.endsWith('.ts'))
    .map(file => path.join(dataDir, file));
  
  let fixedCount = 0;
  
  dataFiles.forEach(filePath => {
    if (fixImageInFile(filePath)) {
      fixedCount++;
    }
  });
  
  console.log(`\n📊 修复完成: ${fixedCount}/${dataFiles.length} 个文件被修复`);
}

if (require.main === module) {
  main();
} 