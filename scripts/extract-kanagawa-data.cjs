#!/usr/bin/env node

/**
 * 神奈川花火数据提取工具
 * 从所有详情页目录中提取数据，生成完整的主页面数据
 */

const fs = require('fs');
const path = require('path');

function extractDataFromFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // 提取数据文件导入路径
    const importMatch = content.match(/import.*from\s+['"]@\/data\/(level5-[^'"]+)['"]/);
    if (!importMatch) {
      console.log(`⚠️  ${filePath} 没有找到数据导入`);
      return null;
    }
    
    const dataFileName = importMatch[1] + '.ts';
    const dataFilePath = path.join('src', 'data', dataFileName);
    
    if (!fs.existsSync(dataFilePath)) {
      console.log(`⚠️  数据文件不存在: ${dataFilePath}`);
      return null;
    }
    
    // 读取数据文件
    const dataContent = fs.readFileSync(dataFilePath, 'utf8');
    
    // 提取关键字段
    const id = extractField(dataContent, 'id');
    const name = extractField(dataContent, 'name');
    const japaneseName = extractField(dataContent, 'japaneseName');
    const englishName = extractField(dataContent, 'englishName');
    const date = extractField(dataContent, 'date');
    const fireworksCount = extractField(dataContent, 'fireworksCount');
    const expectedVisitors = extractField(dataContent, 'expectedVisitors');
    const website = extractField(dataContent, 'website');
    
    // 提取venue信息
    const venueMatch = dataContent.match(/venues:\s*\[\s*{\s*name:\s*['"]([^'"]+)['"]/);
    const venue = venueMatch ? venueMatch[1] : '';
    
    return {
      id: cleanValue(id),
      name: cleanValue(name),
      japaneseName: cleanValue(japaneseName),
      englishName: cleanValue(englishName),
      date: cleanValue(date),
      fireworksCount: cleanValue(fireworksCount),
      expectedVisitors: cleanValue(expectedVisitors),
      website: cleanValue(website),
      venue: cleanValue(venue),
      dataFile: dataFileName
    };
    
  } catch (error) {
    console.error(`❌ 提取数据失败 ${filePath}:`, error.message);
    return null;
  }
}

function extractField(content, fieldName) {
  const patterns = [
    new RegExp(`${fieldName}:\\s*['"]([^'"]+)['"]`),
    new RegExp(`${fieldName}:\\s*([^,\\n}]+)`)
  ];
  
  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match) {
      return match[1].trim();
    }
  }
  return '';
}

function cleanValue(value) {
  if (!value) return '';
  return value.replace(/^['"]|['"]$/g, '').trim();
}

// 转换为主页面数据格式
function convertToMainPageFormat(data) {
  if (!data) return null;
  
  // 生成简单描述
  let description = '';
  if (data.venue && data.fireworksCount) {
    description = `在${data.venue}举办的花火大会，${data.fireworksCount}发花火点亮夜空`;
  } else if (data.venue) {
    description = `在${data.venue}举办的精彩花火大会`;
  } else {
    description = '神奈川地区的精彩花火表演';
  }
  
  // 估算访客数（如果没有的话）
  let visitors = data.expectedVisitors;
  if (!visitors || visitors === 'undefined') {
    visitors = 'undefined';
  } else {
    // 处理访客数格式
    visitors = visitors.replace(/约|人/g, '');
    if (visitors.includes('万')) {
      visitors = parseInt(visitors.replace('万', '')) * 10000;
    }
  }
  
  // 处理花火数量
  let fireworksCount = data.fireworksCount;
  if (fireworksCount) {
    fireworksCount = fireworksCount.replace(/约|发/g, '');
    if (fireworksCount.includes('万')) {
      fireworksCount = parseInt(fireworksCount.replace('万', '')) * 10000;
    } else {
      fireworksCount = parseInt(fireworksCount) || undefined;
    }
  }
  
  return {
    id: data.id,
    name: data.name,
    japaneseName: data.japaneseName,
    englishName: data.englishName,
    date: `2025年${data.date}`,
    location: data.venue,
    description: description,
    features: ['神奈川特色', '夏日花火', '港都文化'],
    likes: Math.floor(Math.random() * 50) + 10, // 临时估算
    website: data.website,
    fireworksCount: fireworksCount,
    expectedVisitors: visitors,
    venue: data.venue
  };
}

function main() {
  console.log('🔍 开始提取神奈川花火数据...');
  
  const kanagawaPath = path.join('src', 'app', 'kanagawa', 'hanabi');
  const items = fs.readdirSync(kanagawaPath);
  
  const events = [];
  
  items.forEach(item => {
    const itemPath = path.join(kanagawaPath, item);
    if (fs.statSync(itemPath).isDirectory()) {
      const pagePath = path.join(itemPath, 'page.tsx');
      if (fs.existsSync(pagePath)) {
        console.log(`📄 处理: ${item}`);
        const data = extractDataFromFile(pagePath);
        if (data) {
          const mainPageData = convertToMainPageFormat(data);
          if (mainPageData) {
            events.push(mainPageData);
            console.log(`✅ 成功提取: ${data.name}`);
          }
        }
      }
    }
  });
  
  console.log(`\n📊 总计提取到 ${events.length} 个活动`);
  
  // 生成主页面数据代码
  const mainPageCode = `// 神奈川花火数据（完整恢复所有详情页数据）
const kanagawaHanabiEvents = [
${events.map(event => `  {
    id: '${event.id}',
    name: '${event.name}',
    japaneseName: '${event.japaneseName}',
    englishName: '${event.englishName}',
    date: '${event.date}',
    location: '${event.location}',
    description: '${event.description}',
    features: ${JSON.stringify(event.features)},
    likes: ${event.likes},
    website: '${event.website}',
    fireworksCount: ${event.fireworksCount || 'undefined'},
    expectedVisitors: ${event.expectedVisitors || 'undefined'},
    venue: '${event.venue}'
  }`).join(',\n')}
];`;
  
  // 保存结果
  fs.writeFileSync('kanagawa-events-recovered.js', mainPageCode);
  console.log('\n📄 完整数据已保存到: kanagawa-events-recovered.js');
  
  // 生成详细报告
  const report = {
    timestamp: new Date().toISOString(),
    region: 'kanagawa',
    totalEvents: events.length,
    recoveredData: events
  };
  
  fs.writeFileSync('kanagawa-recovery-report.json', JSON.stringify(report, null, 2));
  console.log('📄 详细报告已保存到: kanagawa-recovery-report.json');
}

if (require.main === module) {
  main();
}

module.exports = { extractDataFromFile, convertToMainPageFormat }; 