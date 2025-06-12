/**
 * 扫描实际存在的文件并添加标识脚本
 * 自动发现所有页面文件并添加标准化标识
 */

const fs = require('fs');
const path = require('path');

// 递归扫描目录
function scanDirectory(dir, files = []) {
  try {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // 跳过不需要的目录
        if (item.includes('node_modules') || item.includes('.git') || 
            item.includes('temp-') || item === 'admin' || item === 'test-level5') {
          continue;
        }
        scanDirectory(fullPath, files);
      } else if (item === 'page.tsx') {
        const relativePath = path.relative(process.cwd(), fullPath).replace(/\\/g, '/');
        files.push(relativePath);
      }
    }
  } catch (error) {
    console.error(`扫描目录错误 ${dir}:`, error.message);
  }
  
  return files;
}

// 分析文件类型
function analyzeFile(filePath) {
  const parts = filePath.split('/');
  const pathSegments = parts.filter(p => p !== 'src' && p !== 'app' && p !== 'page.tsx');
  
  // 地区映射
  const regionMap = {
    'tokyo': '东京', 'saitama': '埼玉', 'chiba': '千叶',
    'kanagawa': '神奈川', 'kitakanto': '北关东', 'koshinetsu': '甲信越'
  };
  
  // 月份映射
  const monthMap = {
    'july': '7月', 'august': '8月', 'september': '9月'
  };
  
  if (pathSegments.length === 2 && pathSegments[1] === 'hanabi') {
    // 第三层：/july/hanabi
    const month = pathSegments[0];
    return {
      layer: '三层',
      month: monthMap[month] || month,
      type: '花火活动总览页面',
      description: `展示${monthMap[month] || month}所有地区的花火大会分类导航`,
      webPath: '/' + pathSegments.join('/')
    };
  } else if (pathSegments.length === 3 && pathSegments[1] === 'hanabi') {
    // 第四层：/july/hanabi/tokyo
    const month = pathSegments[0];
    const region = pathSegments[2];
    return {
      layer: '四层',
      month: monthMap[month] || month,
      region: regionMap[region] || region,
      type: '地区花火页面',
      description: `展示${monthMap[month] || month}${regionMap[region] || region}地区所有花火大会列表，包含查看详情链接`,
      webPath: '/' + pathSegments.join('/')
    };
  } else if (pathSegments.length === 4 && pathSegments[1] === 'hanabi') {
    // 第五层：/july/hanabi/tokyo/keibajo-hanabi
    const month = pathSegments[0];
    const region = pathSegments[2];
    const event = pathSegments[3];
    return {
      layer: '五层',
      month: monthMap[month] || month,
      region: regionMap[region] || region,
      event: event,
      type: '花火详情页面',
      description: `${event}完整详情信息，包含交通、观赏、历史等`,
      webPath: '/' + pathSegments.join('/')
    };
  }
  
  return null;
}

// 生成标识注释
function generateIdentifier(info) {
  if (!info) return null;
  
  let identifier = '/**\n';
  identifier += ` * 第${info.layer}页面 - ${info.description}\n`;
  identifier += ` * @layer ${info.layer} (${info.layer === '三层' ? 'Activity' : info.layer === '四层' ? 'Regional' : 'Detail'} Layer)\n`;
  identifier += ` * @month ${info.month}\n`;
  
  if (info.region) {
    identifier += ` * @region ${info.region}\n`;
  }
  
  if (info.event) {
    identifier += ` * @event ${info.event}\n`;
  }
  
  identifier += ` * @type ${info.type}\n`;
  identifier += ` * @path ${info.webPath}\n`;
  identifier += ` * @description ${info.description}\n`;
  identifier += ' */\n';
  
  return identifier;
}

// 添加标识到文件
function addIdentifierToFile(filePath, identifier) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // 检查是否已有标识
    if (content.includes('@layer') || content.includes('@type')) {
      return false;
    }
    
    // 添加标识到文件开头
    const newContent = identifier + content;
    fs.writeFileSync(filePath, newContent, 'utf-8');
    
    return true;
  } catch (error) {
    console.error(`❌ 处理失败 ${filePath}:`, error.message);
    return false;
  }
}

// 主执行函数
function main() {
  console.log('🚀 开始扫描并添加文件标识...\n');
  
  // 扫描所有页面文件
  const allFiles = scanDirectory('./src/app');
  const hanabiFiles = allFiles.filter(file => file.includes('/hanabi/'));
  
  console.log(`📁 发现 ${hanabiFiles.length} 个花火相关页面文件\n`);
  
  let processedCount = 0;
  let addedCount = 0;
  let hasIdentifierCount = 0;
  let unknownCount = 0;
  
  for (const filePath of hanabiFiles) {
    const info = analyzeFile(filePath);
    
    if (!info) {
      console.log(`🤷 无法识别: ${filePath}`);
      unknownCount++;
      continue;
    }
    
    processedCount++;
    const identifier = generateIdentifier(info);
    
    if (addIdentifierToFile(filePath, identifier)) {
      console.log(`✅ 已添加标识: ${filePath} (${info.layer})`);
      addedCount++;
    } else {
      console.log(`✅ 已有标识: ${filePath} (${info.layer})`);
      hasIdentifierCount++;
    }
  }
  
  console.log(`\n📊 处理完成:`);
  console.log(`   - 发现文件: ${hanabiFiles.length} 个`);
  console.log(`   - 处理文件: ${processedCount} 个`);
  console.log(`   - 新增标识: ${addedCount} 个`);
  console.log(`   - 已有标识: ${hasIdentifierCount} 个`);
  console.log(`   - 无法识别: ${unknownCount} 个`);
}

// 执行脚本
main(); 