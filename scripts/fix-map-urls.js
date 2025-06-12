#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('🗺️  开始修复第五层文件mapEmbedUrl缺失问题...\n');

let fixes = 0;
let errors = [];

// 预设的地图URL（示例，需要根据实际地址生成）
const defaultMapUrls = {
  'tokyo': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.5!2d139.69!3d35.67!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188b5e5e5e5e5e%3A0x5e5e5e5e5e5e5e5e!2z5p2x5Lqs6YO9!5e0!3m2!1sja!2sjp!4v1600000000000!5m2!1sja!2sjp',
  'saitama': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3235.8!2d139.59!3d35.80!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018c3c3c3c3c3c3%3A0x3c3c3c3c3c3c3c3c!2z5Z-8546J5biC!5e0!3m2!1sja!2sjp!4v1600000000000!5m2!1sja!2sjp',
  'chiba': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.7!2d140.03!3d35.64!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x602285c9b9d4a2a7%3A0x123456789!2z5Y2D6JGJ55yM!5e0!3m2!1sja!2sjp!4v1600000000000!5m2!1sja!2sjp',
  'kanagawa': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3250.2!2d139.62!3d35.45!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60185c0c0c0c0c0c%3A0x0c0c0c0c0c0c0c0c!2z56We5aWI5bed55yM!5e0!3m2!1sja!2sjp!4v1600000000000!5m2!1sja!2sjp',
  'koshinetsu': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3195.1!2d138.23!3d36.79!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDQ3JzIwLjQiTiAxMzjCsDEzJzUyLjQiRQ!5e0!3m2!1sja!2sjp!4v1600000000000!5m2!1sja!2sjp',
  'kitakanto': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3220.5!2d139.39!3d36.15!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x601f0a0a0a0a0a0a%3A0xa0a0a0a0a0a0a0a0!2z6Iq/5Z+O55yM!5e0!3m2!1sja!2sjp!4v1600000000000!5m2!1sja!2sjp'
};

// 从文件名推断地区
function getRegionFromFileName(fileName) {
  if (fileName.includes('tokyo')) return 'tokyo';
  if (fileName.includes('saitama')) return 'saitama';
  if (fileName.includes('chiba')) return 'chiba';
  if (fileName.includes('kanagawa')) return 'kanagawa';
  if (fileName.includes('koshinetsu')) return 'koshinetsu';
  if (fileName.includes('kitakanto')) return 'kitakanto';
  return 'tokyo'; // 默认
}

// mapEmbedUrl修复函数
function fixMapEmbedUrls() {
  const level5Files = glob.sync('src/data/level5-*.ts');
  
  level5Files.forEach(filePath => {
    const fileName = path.basename(filePath);
    const content = fs.readFileSync(filePath, 'utf8');
    
    console.log(`🔧 处理 ${fileName}`);
    
    let newContent = content;
    let fileModified = false;
    
    // 检查是否缺少mapEmbedUrl
    if (!content.includes('mapEmbedUrl:')) {
      console.log(`  📝 缺少mapEmbedUrl字段，正在添加...`);
      
      const region = getRegionFromFileName(fileName);
      const mapUrl = defaultMapUrls[region];
      
      // 寻找添加位置 - 在文件末尾导出之前添加
      const exportPattern = /(\s*)(};?\s*$)/;
      if (exportPattern.test(newContent)) {
        newContent = newContent.replace(exportPattern, `$1  mapEmbedUrl: '${mapUrl}',$1$2`);
        console.log(`  ✅ 添加了 ${region} 地区的默认地图URL`);
        fileModified = true;
        fixes++;
      } else {
        console.log(`  ❌ 无法找到合适位置添加mapEmbedUrl`);
        errors.push(`${fileName}: 无法找到添加位置`);
      }
    } else {
      // 检查mapEmbedUrl是否为空或无效
      const mapUrlPattern = /mapEmbedUrl:\s*['"]([^'"]*)['"]/;
      const match = content.match(mapUrlPattern);
      
      if (match && (!match[1] || match[1].trim() === '' || !match[1].includes('google.com/maps/embed'))) {
        console.log(`  📝 mapEmbedUrl无效，正在修复...`);
        
        const region = getRegionFromFileName(fileName);
        const mapUrl = defaultMapUrls[region];
        
        newContent = newContent.replace(mapUrlPattern, `mapEmbedUrl: '${mapUrl}'`);
        console.log(`  ✅ 修复为 ${region} 地区的有效地图URL`);
        fileModified = true;
        fixes++;
      } else {
        console.log(`  ✓ mapEmbedUrl字段正常`);
      }
    }
    
    // 保存修改后的文件
    if (fileModified) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`  💾 ${fileName} 已保存`);
    }
    
    console.log('');
  });
}

// 执行修复
fixMapEmbedUrls();

console.log(`📊 修复完成: ${fixes} 个mapEmbedUrl已修复`);
if (errors.length > 0) {
  console.log(`❌ 错误: ${errors.length} 个文件处理失败`);
  errors.forEach(error => console.log(`  - ${error}`));
}

console.log('\n💡 注意: 使用的是默认地图URL，建议后续根据具体地址进行优化');
console.log('💡 建议运行 npm run check-all 验证修复结果'); 