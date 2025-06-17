#!/usr/bin/env node

/**
 * 东京花火缺失数据提取工具
 * 找出详情页存在但主页面缺失的活动数据
 */

const fs = require('fs');
const path = require('path');

// 当前主页面已有的活动ID
const existingIds = [
  'tokyo-keiba-2025',
  'sumida-river-48', 
  'katsushika-59',
  'edogawa-50',
  'jingu-gaien-2025',
  'itabashi-66',
  'tamagawa-48',
  'adachi-47',
  'taito-shitamachi-34',
  'odaiba-romantic-5',
  'setagaya-tamagawa-47',
  'kita-hanabi-11',
  'okutama-70th',
  'akishima-kujira-53',
  'star-island-2025'
];

// 详情页目录列表
const detailDirs = [
  'akishima', 'chofu-hanabi', 'edogawa', 'hachioji', 'itabashi',
  'jingu-gaien', 'jingu-yakyujo', 'katsushika-noryo', 'keibajo',
  'kita', 'kozushima', 'mikurajima', 'okutama', 'sumida',
  'tachikawa-showa', 'tamagawa'
];

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
      dataFile: dataFileName,
      dirName: path.basename(path.dirname(filePath))
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
    description = '东京地区的精彩花火表演';
  }
  
  // 处理访客数
  let visitors = data.expectedVisitors;
  if (!visitors || visitors === 'undefined' || visitors === '非公开') {
    visitors = 'undefined';
  } else {
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
    features: ['东京特色', '夏日花火', '都市风情'],
    likes: Math.floor(Math.random() * 100) + 20,
    website: data.website,
    fireworksCount: fireworksCount,
    expectedVisitors: visitors,
    venue: data.venue,
    dirName: data.dirName
  };
}

function main() {
  console.log('🔍 开始提取东京缺失花火数据...');
  
  const tokyoPath = path.join('src', 'app', 'tokyo', 'hanabi');
  const missingEvents = [];
  
  detailDirs.forEach(dirName => {
    const pagePath = path.join(tokyoPath, dirName, 'page.tsx');
    if (fs.existsSync(pagePath)) {
      console.log(`📄 处理: ${dirName}`);
      const data = extractDataFromFile(pagePath);
      if (data) {
        // 检查是否已在主页面中
        const isExisting = existingIds.some(id => 
          id === data.id || 
          id.includes(data.id) || 
          data.id.includes(id.split('-')[0])
        );
        
        if (!isExisting) {
          const mainPageData = convertToMainPageFormat(data);
          if (mainPageData) {
            missingEvents.push(mainPageData);
            console.log(`✅ 发现缺失活动: ${data.name}`);
          }
        } else {
          console.log(`ℹ️  已存在: ${data.name}`);
        }
      }
    }
  });
  
  console.log(`\n📊 总计发现缺失活动: ${missingEvents.length} 个`);
  
  if (missingEvents.length > 0) {
    // 生成主页面数据代码
    const mainPageCode = `// 东京花火缺失数据（需要添加到主页面）
${missingEvents.map(event => `  {
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
  }`).join(',\n')}`;
    
    // 保存结果
    fs.writeFileSync('tokyo-missing-events.js', mainPageCode);
    console.log('\n📄 缺失数据已保存到: tokyo-missing-events.js');
    
    // 生成详细报告
    const report = {
      timestamp: new Date().toISOString(),
      region: 'tokyo',
      totalMissing: missingEvents.length,
      missingEvents: missingEvents
    };
    
    fs.writeFileSync('tokyo-missing-report.json', JSON.stringify(report, null, 2));
    console.log('📄 详细报告已保存到: tokyo-missing-report.json');
  }
}

if (require.main === module) {
  main();
}

module.exports = { extractDataFromFile, convertToMainPageFormat }; 