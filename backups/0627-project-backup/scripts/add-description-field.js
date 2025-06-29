const fs = require('fs');
const path = require('path');

/**
 * 批量为现有页面添加 description 字段
 * 从数据库注释中提取活动简介信息
 */

// 需要检查的目录
const REGIONS = ['tokyo', 'saitama', 'chiba', 'kanagawa', 'kitakanto', 'koshinetsu'];
const ACTIVITY_TYPES = ['hanabi', 'matsuri', 'hanami', 'momiji', 'illumination', 'culture'];

let totalFiles = 0;
let fixedFiles = 0;
let errorFiles = 0;

console.log('🔧 开始为现有页面添加 description 字段...\\n');

function extractDescriptionFromComments(content) {
  // 尝试从注释中提取活动信息来生成描述
  const nameMatch = content.match(/\\* 名称: ([^\\n\\r]*)/);
  const venueMatch = content.match(/\\* 开催场所: ([^\\n\\r]*)/);
  const datetimeMatch = content.match(/\\* 开催期间: ([^\\n\\r]*)/);
  
  if (nameMatch) {
    const name = nameMatch[1].trim();
    const venue = venueMatch ? venueMatch[1].trim() : '';
    const datetime = datetimeMatch ? datetimeMatch[1].trim() : '';
    
    // 生成简洁的活动描述
    let description = '';
    
    if (name.includes('花火')) {
      description = `${name}是一场精彩的花火大会`;
      if (venue && !venue.includes('未设置')) {
        description += `，在${venue}举办`;
      }
      if (datetime && !datetime.includes('未设置')) {
        description += `。活动时间为${datetime}`;
      }
      description += '。欢迎前来观赏美丽的花火表演，感受日本传统文化的魅力。';
    } else if (name.includes('祭') || name.includes('まつり')) {
      description = `${name}是一场传统的日本祭典活动`;
      if (venue && !venue.includes('未设置')) {
        description += `，在${venue}举办`;
      }
      if (datetime && !datetime.includes('未设置')) {
        description += `。活动时间为${datetime}`;
      }
      description += '。可以体验丰富的传统文化活动，品尝地道美食，感受节庆氛围。';
    } else if (name.includes('花见') || name.includes('桜')) {
      description = `${name}是一场美丽的赏樱活动`;
      if (venue && !venue.includes('未设置')) {
        description += `，在${venue}举办`;
      }
      if (datetime && !datetime.includes('未设置')) {
        description += `。活动时间为${datetime}`;
      }
      description += '。可以欣赏到盛开的樱花，感受春天的美好时光。';
    } else if (name.includes('紅葉') || name.includes('もみじ')) {
      description = `${name}是一场精彩的红叶观赏活动`;
      if (venue && !venue.includes('未设置')) {
        description += `，在${venue}举办`;
      }
      if (datetime && !datetime.includes('未设置')) {
        description += `。活动时间为${datetime}`;
      }
      description += '。可以欣赏到绚烂的秋叶，感受秋季的诗意美景。';
    } else if (name.includes('イルミネーション') || name.includes('灯光')) {
      description = `${name}是一场璀璨的灯光秀活动`;
      if (venue && !venue.includes('未设置')) {
        description += `，在${venue}举办`;
      }
      if (datetime && !datetime.includes('未设置')) {
        description += `。活动时间为${datetime}`;
      }
      description += '。可以欣赏到美丽的灯光装饰，感受浪漫的夜晚氛围。';
    } else {
      description = `${name}是一场精彩的文化活动`;
      if (venue && !venue.includes('未设置')) {
        description += `，在${venue}举办`;
      }
      if (datetime && !datetime.includes('未设置')) {
        description += `。活动时间为${datetime}`;
      }
      description += '。欢迎参与体验丰富多彩的文化内容。';
    }
    
    return description;
  }
  
  return '';
}

function addDescriptionToPage(filePath) {
  try {
    // 读取文件内容
    const content = fs.readFileSync(filePath, 'utf8');
    
    // 检查是否已经有 description 字段
    if (content.includes('description:')) {
      console.log(`⏭️  跳过: ${filePath} (已有description字段)`);
      return false;
    }
    
    // 查找 activityData 对象
    const activityDataMatch = content.match(/const activityData = \\{([\\s\\S]*?)\\};/);
    if (!activityDataMatch) {
      console.log(`⚠️  跳过: ${filePath} (找不到activityData对象)`);
      return false;
    }
    
    // 提取描述信息
    const description = extractDescriptionFromComments(content);
    if (!description) {
      console.log(`⚠️  跳过: ${filePath} (无法生成描述)`);
      return false;
    }
    
    // 在 region 字段后添加 description 字段
    const updatedContent = content.replace(
      /region: "[^"]*",/,
      `$&\\n  description: "${description}",`
    );
    
    // 检查是否成功添加
    if (updatedContent === content) {
      console.log(`⚠️  跳过: ${filePath} (无法找到插入位置)`);
      return false;
    }
    
    // 写入文件
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    console.log(`✅ 修复: ${filePath}`);
    console.log(`   添加描述: ${description.substring(0, 50)}...`);
    
    return true;
  } catch (error) {
    console.error(`❌ 错误: ${filePath} - ${error.message}`);
    errorFiles++;
    return false;
  }
}

function scanDirectory(dirPath) {
  try {
    const items = fs.readdirSync(dirPath);
    
    for (const item of items) {
      const itemPath = path.join(dirPath, item);
      const stats = fs.statSync(itemPath);
      
      if (stats.isDirectory()) {
        // 递归扫描子目录
        scanDirectory(itemPath);
      } else if (item === 'page.tsx') {
        totalFiles++;
        if (addDescriptionToPage(itemPath)) {
          fixedFiles++;
        }
      }
    }
  } catch (error) {
    console.error(`扫描目录错误: ${dirPath} - ${error.message}`);
  }
}

// 主执行逻辑
console.log('开始扫描所有地区和活动类型...\\n');

for (const region of REGIONS) {
  for (const activityType of ACTIVITY_TYPES) {
    const dirPath = path.join('app', region, activityType);
    
    if (fs.existsSync(dirPath)) {
      console.log(`\\n📂 扫描: ${region}/${activityType}`);
      scanDirectory(dirPath);
    }
  }
}

// 输出统计结果
console.log('\\n' + '='.repeat(60));
console.log('🎉 批量添加 description 字段完成！');
console.log('='.repeat(60));
console.log(`📊 处理统计:`);
console.log(`   总文件数: ${totalFiles}`);
console.log(`   修复成功: ${fixedFiles}`);
console.log(`   修复失败: ${errorFiles}`);
console.log(`   无需修复: ${totalFiles - fixedFiles - errorFiles}`);
console.log('='.repeat(60));

if (fixedFiles > 0) {
  console.log('\\n✨ 现在所有页面都应该有活动描述了！');
  console.log('💡 建议：在浏览器中检查几个页面，确认描述显示正常。');
} 