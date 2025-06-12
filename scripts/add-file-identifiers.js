/**
 * 批量添加文件标识脚本
 * 为所有页面文件和数据文件添加标准化的AI识别注释
 */

const fs = require('fs');
const path = require('path');

// 文件类型和路径映射
const fileMapping = {
  // 第三层页面 (3个)
  'src/app/july/hanabi/page.tsx': {
    layer: '三层 (Activity Layer)',
    month: '7月',
    type: '花火活动总览页面',
    description: '展示7月所有地区的花火大会分类导航'
  },
  'src/app/august/hanabi/page.tsx': {
    layer: '三层 (Activity Layer)',
    month: '8月',
    type: '花火活动总览页面',
    description: '展示8月所有地区的花火大会分类导航'
  },
  'src/app/september/hanabi/page.tsx': {
    layer: '三层 (Activity Layer)',
    month: '9月',
    type: '花火活动总览页面',
    description: '展示9月所有地区的花火大会分类导航'
  },
  
  // 7月第四层页面 (6个)
  'src/app/july/hanabi/tokyo/page.tsx': {
    layer: '四层 (Regional Layer)',
    month: '7月',
    region: '东京',
    type: '地区花火页面',
    description: '展示7月东京地区所有花火大会列表，包含查看详情链接'
  },
  'src/app/july/hanabi/saitama/page.tsx': {
    layer: '四层 (Regional Layer)',
    month: '7月',
    region: '埼玉',
    type: '地区花火页面',
    description: '展示7月埼玉地区所有花火大会列表，包含查看详情链接'
  },
  'src/app/july/hanabi/chiba/page.tsx': {
    layer: '四层 (Regional Layer)',
    month: '7月',
    region: '千叶',
    type: '地区花火页面',
    description: '展示7月千叶地区所有花火大会列表，包含查看详情链接'
  },
  'src/app/july/hanabi/kanagawa/page.tsx': {
    layer: '四层 (Regional Layer)',
    month: '7月',
    region: '神奈川',
    type: '地区花火页面',
    description: '展示7月神奈川地区所有花火大会列表，包含查看详情链接'
  },
  'src/app/july/hanabi/kitakanto/page.tsx': {
    layer: '四层 (Regional Layer)',
    month: '7月',
    region: '北关东',
    type: '地区花火页面',
    description: '展示7月北关东地区所有花火大会列表，包含查看详情链接'
  },
  'src/app/july/hanabi/koshinetsu/page.tsx': {
    layer: '四层 (Regional Layer)',
    month: '7月',
    region: '甲信越',
    type: '地区花火页面',
    description: '展示7月甲信越地区所有花火大会列表，包含查看详情链接'
  }
};

// 生成标识注释
function generateIdentifier(filePath, info) {
  const pathParts = filePath.split('/');
  const filename = pathParts.pop();
  const webPath = '/' + pathParts.slice(2).join('/'); // 移除 src/app 前缀
  
  let identifier = '/**\n';
  
  // 基本信息
  if (info.layer) {
    identifier += ` * 第${info.layer.charAt(0)}层页面 - ${info.description}\n`;
    identifier += ` * @layer ${info.layer}\n`;
  }
  
  if (info.month) {
    identifier += ` * @month ${info.month}\n`;
  }
  
  if (info.region) {
    identifier += ` * @region ${info.region}\n`;
  }
  
  if (info.event) {
    identifier += ` * @event ${info.event}\n`;
  }
  
  identifier += ` * @type ${info.type}\n`;
  identifier += ` * @path ${webPath}\n`;
  identifier += ` * @description ${info.description}\n`;
  identifier += ' */\n';
  
  return identifier;
}

// 添加标识到文件
function addIdentifierToFile(filePath, identifier) {
  try {
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  文件不存在: ${filePath}`);
      return false;
    }
    
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // 检查是否已有标识
    if (content.includes('@layer') || content.includes('@type')) {
      console.log(`✅ 已有标识: ${filePath}`);
      return false;
    }
    
    // 添加标识到文件开头
    const newContent = identifier + content;
    fs.writeFileSync(filePath, newContent, 'utf-8');
    
    console.log(`✅ 已添加标识: ${filePath}`);
    return true;
  } catch (error) {
    console.error(`❌ 处理文件失败 ${filePath}:`, error.message);
    return false;
  }
}

// 主执行函数
function main() {
  console.log('🚀 开始批量添加文件标识...\n');
  
  let processedCount = 0;
  let addedCount = 0;
  
  for (const [filePath, info] of Object.entries(fileMapping)) {
    processedCount++;
    const identifier = generateIdentifier(filePath, info);
    
    if (addIdentifierToFile(filePath, identifier)) {
      addedCount++;
    }
  }
  
  console.log(`\n📊 处理完成:`);
  console.log(`   - 处理文件: ${processedCount} 个`);
  console.log(`   - 新增标识: ${addedCount} 个`);
  console.log(`   - 已有标识: ${processedCount - addedCount} 个`);
}

// 执行脚本
if (require.main === module) {
  main();
}

module.exports = { generateIdentifier, addIdentifierToFile }; 