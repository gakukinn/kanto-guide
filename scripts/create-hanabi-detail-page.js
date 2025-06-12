#!/usr/bin/env node

/**
 * 花火详情页面创建工具 v1.0
 * 标准化创建流程，确保路径一致性和数据完整性
 */

import fs from 'fs';
import path from 'path';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (prompt) => new Promise((resolve) => rl.question(prompt, resolve));

// 支持的地区配置
const REGIONS = {
  tokyo: { name: '东京', path: 'tokyo' },
  saitama: { name: '埼玉', path: 'saitama' },
  chiba: { name: '千叶', path: 'chiba' },
  kanagawa: { name: '神奈川', path: 'kanagawa' },
  ibaraki: { name: '茨城', path: 'ibaraki' },
  tochigi: { name: '栃木', path: 'tochigi' },
  gunma: { name: '群马', path: 'gunma' }
};

async function createHanabiDetailPage() {
  console.log('🎆 花火详情页面创建工具\n');
  
  try {
    // 1. 收集基本信息
    const region = await question('选择地区 (tokyo/saitama/chiba/kanagawa/ibaraki/tochigi/gunma): ');
    
    if (!REGIONS[region]) {
      throw new Error(`不支持的地区: ${region}`);
    }
    
    const folderName = await question('详情页面文件夹名称 (如: jingu-yakyujo): ');
    const eventId = await question('事件ID (如: jingu-yakyujo-hanabi): ');
    const eventName = await question('花火大会名称 (如: 夏休み神宫花火夜场): ');
    const japaneseName = await question('日文名称 (如: 夏休み！ 神宮花火ナイター): ');
    const walkerPlusUrl = await question('Walker Plus数据源URL: ');
    
    // 2. 验证路径
    const regionConfig = REGIONS[region];
    const pageDir = `src/app/${regionConfig.path}/hanabi/${folderName}`;
    const dataFile = `src/data/${regionConfig.path}-${folderName}-hanabi.ts`;
    
    if (fs.existsSync(pageDir)) {
      throw new Error(`页面目录已存在: ${pageDir}`);
    }
    
    if (fs.existsSync(dataFile)) {
      throw new Error(`数据文件已存在: ${dataFile}`);
    }
    
    console.log('\n📋 创建信息确认:');
    console.log(`地区: ${regionConfig.name}`);
    console.log(`页面路径: /${regionConfig.path}/hanabi/${folderName}/`);
    console.log(`数据文件: ${dataFile}`);
    console.log(`事件ID: ${eventId}`);
    console.log(`花火名称: ${eventName}`);
    
    const confirm = await question('\n确认创建? (y/N): ');
    if (confirm.toLowerCase() !== 'y') {
      console.log('已取消创建');
      process.exit(0);
    }
    
    // 3. 创建目录
    fs.mkdirSync(pageDir, { recursive: true });
    
    // 4. 创建数据文件
    const dataTemplate = generateDataTemplate(eventId, eventName, japaneseName, walkerPlusUrl, regionConfig);
    fs.writeFileSync(dataFile, dataTemplate);
    
    // 5. 创建页面文件
    const pageTemplate = generatePageTemplate(eventName, folderName, region, dataFile);
    fs.writeFileSync(path.join(pageDir, 'page.tsx'), pageTemplate);
    
    // 6. 提醒更新映射表
    console.log('\n✅ 创建完成!');
    console.log('\n🚨 重要提醒:');
    console.log(`1. 请在 src/app/${regionConfig.path}/hanabi/page.tsx 的映射表中添加:`);
    console.log(`   '${eventId}': '${folderName}',`);
    console.log(`2. 请在事件列表中添加新的花火事件`);
    console.log(`3. 访问页面: /${regionConfig.path}/hanabi/${folderName}/`);
    console.log(`4. 数据源: ${walkerPlusUrl}`);
    
  } catch (error) {
    console.error('❌ 创建失败:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

function generateDataTemplate(eventId, eventName, japaneseName, walkerPlusUrl, regionConfig) {
  return `import { HanabiData } from '../types/hanabi';

export const ${toCamelCase(eventId)}Data: HanabiData = {
  id: '${eventId}',
  name: '${eventName}',
  japaneseName: '${japaneseName}',
  englishName: '${eventName} Fireworks Festival',
  year: 2025,
  date: '2025-07-XX', // TODO: 更新具体日期
  time: '19:00～', // TODO: 更新具体时间
  duration: '约XX分钟', // TODO: 更新持续时间
  fireworksCount: 'XXXXX发', // TODO: 更新花火数量
  expectedVisitors: '约XX万人', // TODO: 更新预计人数
  weather: '夏季炎热多湿', // TODO: 根据实际情况更新
  ticketPrice: '免费观赏', // TODO: 更新票价信息
  status: '确认举办',
  themeColor: '#FF6B6B', // TODO: 选择主题色
  month: 7, // TODO: 更新月份

  tags: {
    timeTag: '7月', // TODO: 更新时间标签
    regionTag: '${regionConfig.name}',
    typeTag: '花火',
    layerTag: 'Layer 4详情页'
  },

  venues: [
    {
      name: 'TODO: 更新会场名称',
      location: 'TODO: 更新会场地址',
      startTime: 'TODO: 更新开始时间',
      features: ['TODO: 更新会场特色']
    }
  ],

  access: [
    {
      venue: 'TODO: 更新会场名称',
      stations: [
        {
          name: 'TODO: 车站名',
          lines: ['TODO: 线路名'],
          walkTime: 'TODO: 步行时间'
        }
      ]
    }
  ],

  viewingSpots: [
    {
      name: 'TODO: 观赏点名称',
      rating: 5,
      crowdLevel: '中等',
      tips: 'TODO: 观赏建议',
      pros: ['TODO: 优点'],
      cons: ['TODO: 缺点']
    }
  ],

  history: {
    established: 2000, // TODO: 更新创办年份
    significance: 'TODO: 更新历史意义',
    highlights: ['TODO: 更新亮点']
  },

  tips: [
    {
      category: '交通建议',
      items: ['TODO: 更新交通建议']
    }
  ],

  contact: {
    organizer: 'TODO: 主办方名称',
    phone: 'TODO: 联系电话',
    website: 'TODO: 官方网站',
    socialMedia: 'TODO: 社交媒体'
  },

  mapInfo: {
    hasMap: true,
    mapNote: 'TODO: 地图说明',
    parking: 'TODO: 停车信息'
  },

  weatherInfo: {
    month: '7月', // TODO: 更新月份
    temperature: '25-35°C', // TODO: 更新温度
    humidity: '70-80%',
    rainfall: '中等',
    recommendation: 'TODO: 天气建议',
    rainPolicy: 'TODO: 雨天政策'
  },

  specialFeatures: {
    scale: 'TODO: 规模',
    location: 'TODO: 地点特色',
    tradition: 'TODO: 传统特色',
    atmosphere: 'TODO: 氛围特色'
  },

  mapEmbedUrl: 'TODO: 更新地图嵌入URL',

  related: {
    regionRecommendations: [],
    timeRecommendations: []
  },

  website: 'TODO: 官方网站',
  dataSourceUrl: '${walkerPlusUrl}',

  officialSource: {
    walkerPlusUrl: '${walkerPlusUrl}',
    verificationDate: '${new Date().toISOString().split('T')[0]}',
    dataConfirmedBy: 'USER_PROVIDED',
    lastChecked: '${new Date().toISOString().split('T')[0]}'
  },

  dataIntegrityCheck: {
    hasOfficialSource: true,
    userVerified: false, // TODO: 验证后改为true
    lastValidated: '${new Date().toISOString().split('T')[0]}'
  }
};`;
}

function generatePageTemplate(eventName, folderName, region, dataFile) {
  const dataFileName = path.basename(dataFile, '.ts');
  const dataVariableName = toCamelCase(dataFileName.replace(`${region}-`, '').replace('-hanabi', '')) + 'HanabiData';
  
  return `import { Metadata } from 'next';
import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { ${dataVariableName} } from '@/data/${dataFileName}';

// 生成页面元数据
export const metadata: Metadata = {
  title: '${eventName} - 2025年${REGIONS[region].name}花火大会',
  description: 'TODO: 更新页面描述',
  keywords: 'TODO: 更新关键词',
  openGraph: {
    title: '${eventName} - 2025年${REGIONS[region].name}花火大会',
    description: 'TODO: 更新OpenGraph描述',
    type: 'website',
    locale: 'zh_CN',
  },
  twitter: {
    card: 'summary_large_image',
    title: '${eventName} - 2025年${REGIONS[region].name}花火大会',
    description: 'TODO: 更新Twitter描述',
  },
  alternates: {
    canonical: '/${region}/hanabi/${folderName}'
  }
};

export default function ${toPascalCase(folderName)}HanabiPage() {
  const regionKey = '${region}';
  
  return (
    <HanabiDetailTemplate 
      data={${dataVariableName}}
      regionKey={regionKey}
    />
  );
}

// 静态生成
export const dynamic = 'force-static';

// 页面重新验证时间（秒）
export const revalidate = 86400; // 24小时

// TODO: 请完善数据文件中的所有TODO项目
// 信息来源：请以官方网站为准`;
}

function toCamelCase(str) {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase()).replace(/^([a-z])/, (g) => g.toUpperCase());
}

function toPascalCase(str) {
  return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
}

createHanabiDetailPage(); 