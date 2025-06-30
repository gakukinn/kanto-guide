const fs = require('fs');
const path = require('path');

console.log('🔧 批量修复 media type 字段...\n');

function findAndFixFiles(dir, fixedFiles = []) {
  const entries = fs.readdirSync(dir);
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      findAndFixFiles(fullPath, fixedFiles);
    } else if (entry === 'page.tsx') {
      const content = fs.readFileSync(fullPath, 'utf8');
      
      // 检查是否包含需要修复的模式
      if (content.includes('"type": "image",') && !content.includes('"type": "image" as const,')) {
        const relativePath = path.relative('.', fullPath);
        const pathParts = relativePath.split(path.sep);
        
        // 确保是六大地区下的文件
        if (pathParts.length >= 4 && pathParts[0] === 'app') {
          const region = pathParts[1];
          const validRegions = ['tokyo', 'kanagawa', 'saitama', 'chiba', 'kitakanto', 'koshinetsu'];
          
          if (validRegions.includes(region)) {
            try {
              // 执行修复：添加 as const
              const fixedContent = content.replace(/"type": "image",/g, '"type": "image" as const,');
              
              // 验证修复是否生效
              if (fixedContent !== content && fixedContent.includes('"type": "image" as const,')) {
                fs.writeFileSync(fullPath, fixedContent, 'utf8');
                fixedFiles.push({
                  path: fullPath,
                  relativePath: relativePath,
                  region: region,
                  activity: pathParts[2],
                  pageId: pathParts[3]
                });
                console.log(`✅ 修复: ${relativePath}`);
              } else {
                console.log(`⚠️ 跳过: ${relativePath} (无需修复或修复失败)`);
              }
            } catch (error) {
              console.log(`❌ 错误: ${relativePath} - ${error.message}`);
            }
          }
        }
      }
    }
  }
  
  return fixedFiles;
}

console.log('🔍 开始扫描和修复文件...\n');

const fixedFiles = findAndFixFiles('app');

console.log(`\n📊 修复结果:`);
console.log(`✅ 成功修复: ${fixedFiles.length} 个文件`);

if (fixedFiles.length > 0) {
  console.log(`\n📋 修复的文件列表:`);
  fixedFiles.forEach((file, index) => {
    console.log(`${(index + 1).toString().padStart(2, ' ')}. ${file.relativePath}`);
  });
  
  console.log(`\n🎉 批量修复完成！`);
  console.log(`🔧 所有文件的 "type": "image", 已改为 "type": "image" as const,`);
} else {
  console.log(`\n✅ 没有找到需要修复的文件，可能已经修复过了`);
}

console.log(`\n🚀 接下来请运行 npm run build 测试构建...`); 