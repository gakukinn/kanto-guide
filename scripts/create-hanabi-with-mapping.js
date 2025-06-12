#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

console.log('🎆 智能花火详情页面创建工具\n');
console.log('此工具会自动创建页面并同步更新映射表，确保链接正常工作。\n');

async function main() {
  try {
    // 1. 选择地区
    console.log('📍 选择地区:');
    console.log('1. tokyo (东京)');
    console.log('2. saitama (埼玉)');
    console.log('3. chiba (千叶)');
    console.log('4. kanagawa (神奈川)');
    
    const regionChoice = await question('请输入数字 (1-4): ');
    const regions = ['tokyo', 'saitama', 'chiba', 'kanagawa'];
    const region = regions[parseInt(regionChoice) - 1];
    
    if (!region) {
      console.log('❌ 无效选择');
      process.exit(1);
    }
    
    console.log(`✅ 选择了地区: ${region}\n`);
    
    // 2. 输入事件信息
    const eventId = await question('🆔 请输入事件ID (如: kita-11): ');
    const folderName = await question('📁 请输入文件夹名称 (如: kita): ');
    const eventName = await question('🎯 请输入事件名称 (如: 第11回北区花火会): ');
    
    if (!eventId || !folderName || !eventName) {
      console.log('❌ 所有字段都是必填的');
      process.exit(1);
    }
    
    // 3. 检查文件夹是否已存在
    const targetDir = `src/app/${region}/hanabi/${folderName}`;
    if (fs.existsSync(targetDir)) {
      console.log(`⚠️  文件夹已存在: ${targetDir}`);
      const overwrite = await question('是否覆盖? (y/N): ');
      if (overwrite.toLowerCase() !== 'y') {
        console.log('❌ 操作取消');
        process.exit(1);
      }
    }
    
    // 4. 创建页面文件夹和文件
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    
    const pageContent = `import { Metadata } from 'next';
import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import ${folderName}HanabiData from '@/data/${region}-${folderName}-hanabi';

// 数据来源：[请添加Walker Plus URL]
export const metadata: Metadata = {
  title: '${eventName} | ${region === 'tokyo' ? '东京' : region === 'saitama' ? '埼玉' : region === 'chiba' ? '千叶' : '神奈川'}花火指南',
  description: '${eventName}的详细信息，包括时间、地点、交通方式等。',
  keywords: '${eventName},花火大会,${region === 'tokyo' ? '东京' : region === 'saitama' ? '埼玉' : region === 'chiba' ? '千叶' : '神奈川'}',
  openGraph: {
    title: '${eventName}',
    description: '${eventName}的详细信息',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.kanto-travel-guide.com/${region}/hanabi/${folderName}'
  }
};

export default function ${folderName.charAt(0).toUpperCase() + folderName.slice(1)}HanabiPage() {
  return (
    <HanabiDetailTemplate
      data={${folderName}HanabiData}
      regionKey="${region}"
    />
  );
}`;
    
    fs.writeFileSync(path.join(targetDir, 'page.tsx'), pageContent);
    console.log(`✅ 创建页面文件: ${targetDir}/page.tsx`);
    
    // 5. 创建基础数据文件
    const dataFileName = `src/data/${region}-${folderName}-hanabi.ts`;
    if (!fs.existsSync(dataFileName)) {
      const dataContent = `import { HanabiData } from '@/types/hanabi';

const ${folderName}HanabiData: HanabiData = {
  id: '${region}-${folderName}-hanabi-2025',
  name: '${eventName}',
  japaneseName: '${eventName}',
  englishName: '${eventName}',
  year: 2025,
  date: '请填写日期',
  time: '请填写时间',
  duration: '请填写持续时间',
  fireworksCount: '请填写花火数量',
  expectedVisitors: '请填写预计观众',
  weather: '请填写天气',
  ticketPrice: '请填写门票价格',
  status: '已确认',
  themeColor: 'blue',
  month: 7, // 请修改为正确月份
  website: 'https://example.com',
  tags: {
    timeTag: '请填写',
    regionTag: '${region === 'tokyo' ? '东京都' : region === 'saitama' ? '埼玉县' : region === 'chiba' ? '千叶县' : '神奈川县'}',
    typeTag: '花火',
    layerTag: 'Layer 5详情页'
  },
  venues: [
    {
      name: '请填写会场名称',
      location: '请填写具体位置',
      startTime: '请填写开始时间',
      features: ['请填写特色']
    }
  ],
  access: [
    {
      venue: '请填写会场',
      stations: [
        {
          name: '请填写车站',
          lines: ['请填写线路'],
          walkTime: '请填写步行时间'
        }
      ]
    }
  ],
  viewingSpots: [
    {
      name: '请填写观赏点',
      rating: 5,
      crowdLevel: '中等',
      tips: '请填写观赏建议',
      pros: ['请填写优点'],
      cons: ['请填写缺点']
    }
  ],
  history: {
    established: 2024,
    significance: '请填写意义',
    highlights: ['请填写亮点']
  },
  tips: [
    {
      category: '交通指南',
      items: ['请填写交通建议']
    }
  ],
  contact: {
    organizer: '请填写主办方',
    phone: '请填写电话',
    website: 'https://example.com',
    socialMedia: '请填写社交媒体'
  },
  mapInfo: {
    hasMap: true,
    mapNote: '请填写地图说明',
    parking: '请填写停车信息'
  },
  weatherInfo: {
    month: '请填写月份',
    temperature: '请填写温度',
    humidity: '请填写湿度',
    rainfall: '请填写降雨',
    recommendation: '请填写建议',
    rainPolicy: '请填写雨天政策'
  },
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=请填写地图嵌入URL',
  related: {
    regionRecommendations: [],
    timeRecommendations: []
  },
  officialSource: {
    walkerPlusUrl: '请填写Walker Plus URL',
    verificationDate: new Date().toISOString().split('T')[0],
    dataConfirmedBy: 'USER_PROVIDED',
    lastChecked: new Date().toISOString().split('T')[0]
  }
};

export default ${folderName}HanabiData;`;
      
      fs.writeFileSync(dataFileName, dataContent);
      console.log(`✅ 创建数据文件: ${dataFileName}`);
    }
    
    // 6. 更新映射表
    const hanabiPagePath = `src/app/${region}/hanabi/page.tsx`;
    if (fs.existsSync(hanabiPagePath)) {
      let content = fs.readFileSync(hanabiPagePath, 'utf8');
      
      // 检查映射表是否已包含此条目
      const mapMatch = content.match(/const eventToFolderMap: Record<string, string> = \{([^}]+)\}/s);
      if (mapMatch) {
        const mapContent = mapMatch[1];
        const hasMapping = mapContent.includes(`'${eventId}': '${folderName}'`);
        
        if (!hasMapping) {
          // 添加新的映射条目
          const newMappingLine = `                  '${eventId}': '${folderName}',`;
          const updatedMapContent = mapContent.trimEnd() + '\n' + newMappingLine;
          const newMapBlock = `const eventToFolderMap: Record<string, string> = {${updatedMapContent}\n                }`;
          
          content = content.replace(/const eventToFolderMap: Record<string, string> = \{[^}]*\}/s, newMapBlock);
          fs.writeFileSync(hanabiPagePath, content);
          console.log(`✅ 更新映射表: 添加 '${eventId}' -> '${folderName}'`);
        } else {
          console.log(`ℹ️  映射表已包含此条目`);
        }
      } else {
        console.log(`⚠️  未找到映射表，请手动添加映射`);
      }
    }
    
    // 7. 检查事件是否已在列表中
    const regionPagePath = `src/app/${region}/hanabi/page.tsx`;
    if (fs.existsSync(regionPagePath)) {
      const content = fs.readFileSync(regionPagePath, 'utf8');
      const hasEvent = content.includes(`id: '${eventId}'`);
      
      if (!hasEvent) {
        console.log(`⚠️  注意: 事件 '${eventId}' 尚未添加到 ${region} 花火页面的事件列表中`);
        console.log(`   请手动添加事件到 ${regionPagePath} 中的事件数组`);
      } else {
        console.log(`✅ 事件已在 ${region} 花火页面列表中`);
      }
    }
    
    console.log(`\n🎯 创建完成！`);
    console.log(`📁 页面文件: ${targetDir}/page.tsx`);
    console.log(`📄 数据文件: ${dataFileName}`);
    console.log(`🔗 映射已更新: '${eventId}' -> '${folderName}'`);
    console.log(`\n💡 下一步：`);
    console.log(`1. 编辑数据文件，填写真实的花火大会信息`);
    console.log(`2. 如果事件不在列表中，请添加到事件数组`);
    console.log(`3. 运行 npm run validate-mappings 验证映射`);
    console.log(`4. 运行 npm run dev 测试页面`);
    
  } catch (error) {
    console.error('❌ 错误:', error.message);
  } finally {
    rl.close();
  }
}

main(); 