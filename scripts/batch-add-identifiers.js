/**
 * 批量添加文件标识脚本
 * 为所有页面文件添加标准化的AI识别注释
 */

const fs = require('fs');
const path = require('path');

// 直接列出需要处理的文件
const filesToProcess = [
  // 8月四层页面
  { path: 'src/app/august/hanabi/chiba/page.tsx', info: { layer: '四层', month: '8月', region: '千叶', type: '地区花火页面' } },
  { path: 'src/app/august/hanabi/kanagawa/page.tsx', info: { layer: '四层', month: '8月', region: '神奈川', type: '地区花火页面' } },
  { path: 'src/app/august/hanabi/kitakanto/page.tsx', info: { layer: '四层', month: '8月', region: '北关东', type: '地区花火页面' } },
  { path: 'src/app/august/hanabi/koshinetsu/page.tsx', info: { layer: '四层', month: '8月', region: '甲信越', type: '地区花火页面' } },
  
  // 9月四层页面
  { path: 'src/app/september/hanabi/tokyo/page.tsx', info: { layer: '四层', month: '9月', region: '东京', type: '地区花火页面' } },
  { path: 'src/app/september/hanabi/saitama/page.tsx', info: { layer: '四层', month: '9月', region: '埼玉', type: '地区花火页面' } },
  { path: 'src/app/september/hanabi/chiba/page.tsx', info: { layer: '四层', month: '9月', region: '千叶', type: '地区花火页面' } },
  { path: 'src/app/september/hanabi/kanagawa/page.tsx', info: { layer: '四层', month: '9月', region: '神奈川', type: '地区花火页面' } },
  { path: 'src/app/september/hanabi/kitakanto/page.tsx', info: { layer: '四层', month: '9月', region: '北关东', type: '地区花火页面' } },
  { path: 'src/app/september/hanabi/koshinetsu/page.tsx', info: { layer: '四层', month: '9月', region: '甲信越', type: '地区花火页面' } }
];

// 生成标识注释
function generateIdentifier(info) {
  const { layer, month, region, type } = info;
  const description = `展示${month}${region}地区所有花火大会列表，包含查看详情链接`;
  
  return `/**
 * 第${layer}页面 - ${month}${region}花火大会
 * @layer ${layer} (Regional Layer)
 * @month ${month}
 * @region ${region}
 * @type ${type}
 * @description ${description}
 */
`;
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
    console.error(`❌ 处理失败 ${filePath}:`, error.message);
    return false;
  }
}

// 主执行函数
function main() {
  console.log('🚀 开始批量添加文件标识...\n');
  
  let processedCount = 0;
  let addedCount = 0;
  
  for (const file of filesToProcess) {
    processedCount++;
    const identifier = generateIdentifier(file.info);
    
    if (addIdentifierToFile(file.path, identifier)) {
      addedCount++;
    }
  }
  
  console.log(`\n📊 处理完成:`);
  console.log(`   - 处理文件: ${processedCount} 个`);
  console.log(`   - 新增标识: ${addedCount} 个`);
  console.log(`   - 已有标识: ${processedCount - addedCount} 个`);
}

// 执行脚本
main(); 