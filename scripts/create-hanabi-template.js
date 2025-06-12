const fs = require('fs');
const path = require('path');

// 数据模板
function generateHanabiTemplate(options) {
  const {
    id,
    name,
    date,
    time,
    location,
    fireworksCount,
    expectedVisitors,
    region,
    month
  } = options;

  return `import { HanabiData } from '@/types/hanabi';

export const ${id}Data: HanabiData = {
  id: '${id}',
  name: '${name}',
  englishName: '',
  year: 2025,
  month: ${month},
  date: '${date}',
  time: '${time}',
  duration: '30分钟',
  fireworksCount: '${fireworksCount}',
  expectedVisitors: '${expectedVisitors}',
  weather: '${date}开催',
  ticketPrice: '无料',
  status: '开催确定',
  themeColor: 'blue',
  
  tags: {
    timeTag: '${month}月',
    regionTag: '${region}',
    typeTag: '花火',
    layerTag: 'Layer 5详情页'
  },

  media: [
    {
      type: 'image',
      url: '/images/hanabi/${id}.jpg',
      title: '${name}',
      description: '${name}的美丽花火绽放'
    }
  ],
  
  venues: [
    {
      name: '${location}',
      location: '${region}${location}',
      startTime: '${time.split('-')[0]}',
      features: [
        '待补充',
        '待补充',
        '待补充'
      ]
    }
  ],

  access: [
    {
      venue: '${location}',
      stations: [
        {
          name: '待补充站',
          lines: ['待补充线'],
          walkTime: '步行X分钟'
        }
      ]
    }
  ],

  viewingSpots: [
    {
      name: '主观赏区域',
      rating: 4,
      crowdLevel: '中',
      tips: '待补充观赏建议',
      pros: ['待补充优点'],
      cons: ['待补充缺点']
    }
  ],

  history: {
    established: 2000,
    significance: '待补充历史背景',
    highlights: [
      '待补充特色',
      '待补充亮点'
    ]
  },

  tips: [
    {
      category: '观赏建议',
      items: [
        '待补充建议1',
        '待补充建议2'
      ]
    },
    {
      category: '交通指南',
      items: [
        '待补充交通信息1',
        '待补充交通信息2'
      ]
    }
  ],

  contact: {
    organizer: '待补充主办方',
    phone: '待补充电话',
    website: '待补充网站',
    socialMedia: '待补充社交媒体'
  },

  mapInfo: {
    hasMap: true,
    mapNote: '待补充地图说明',
    parking: '待补充停车信息'
  },

  weatherInfo: {
    month: '${month}月',
    temperature: '待补充温度',
    humidity: '待补充湿度',
    rainfall: '待补充降雨',
    recommendation: '待补充天气建议',
    rainPolicy: '悪天候时中止',
    note: '待补充天气备注'
  },

  specialFeatures: {
    scale: '待补充规模',
    location: '待补充位置特色',
    tradition: '待补充传统',
    atmosphere: '待补充氛围',
    collaboration: '待补充协作特色'
  },

  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.1!2d139.9!3d35.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDE4JzAwLjAiTiAxMznCsDU0JzAwLjAiRQ!5e0!3m2!1sja!2sjp!4v1600000000000!5m2!1sja!2sjp',

  related: {
    regionRecommendations: [
      {
        id: 'template-recommendation-1',
        name: '待补充推荐1',
        date: '待补充日期',
        location: '待补充地点',
        visitors: '待补充访客',
        link: '待补充链接'
      }
    ],
    timeRecommendations: [
      {
        id: 'template-recommendation-2',
        name: '待补充推荐2',
        date: '待补充日期',
        location: '待补充地点',
        visitors: '待补充访客',
        link: '待补充链接'
      }
    ]
  }
};`;
}

// 页面模板
function generatePageTemplate(options) {
  const { id, dataFileName } = options;

  return `'use client';

import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { ${id}Data } from '@/data/${dataFileName}';

export default function ${id.charAt(0).toUpperCase() + id.slice(1)}Page() {
  return <HanabiDetailTemplate data={${id}Data} regionKey="tokyo" />;
}`;
}

// 主函数
function createHanabiTemplate(walkerPlusUrl, basicInfo) {
  try {
    console.log('🚀 开始创建花火模板...');
    
    // 生成文件名
    const dataFileName = \`level5-\${basicInfo.month}-\${basicInfo.id}-hanabi\`;
    const dataFilePath = path.join(__dirname, '../src/data', \`\${dataFileName}.ts\`);
    const pageDir = path.join(__dirname, '../src/app', basicInfo.month, 'hanabi', basicInfo.region, basicInfo.id);
    const pageFilePath = path.join(pageDir, 'page.tsx');

    // 生成数据文件
    const dataContent = generateHanabiTemplate(basicInfo);
    fs.writeFileSync(dataFilePath, dataContent);
    console.log(\`✅ 数据文件已创建: \${dataFileName}.ts\`);

    // 创建页面目录
    if (!fs.existsSync(pageDir)) {
      fs.mkdirSync(pageDir, { recursive: true });
    }

    // 生成页面文件
    const pageContent = generatePageTemplate({
      id: basicInfo.id,
      dataFileName
    });
    fs.writeFileSync(pageFilePath, pageContent);
    console.log(\`✅ 页面文件已创建: \${basicInfo.month}/hanabi/\${basicInfo.region}/\${basicInfo.id}/page.tsx\`);

    console.log('\\n📝 下一步：');
    console.log('1. 编辑数据文件，替换所有"待补充"内容');
    console.log('2. 运行 npm run validate-data 验证');
    console.log('3. 更新第4层数据文件添加detailLink');
    console.log(\`4. Walker Plus源: \${walkerPlusUrl}\`);

  } catch (error) {
    console.error('❌ 创建失败:', error.message);
  }
}

// 示例用法
if (require.main === module) {
  const walkerPlusUrl = process.argv[2];
  
  if (!walkerPlusUrl) {
    console.log('使用方法: node create-hanabi-template.js <Walker Plus URL>');
    console.log('示例: node create-hanabi-template.js https://hanabi.walkerplus.com/detail/ar0313e00876/');
    process.exit(1);
  }

  // 示例数据（实际使用时应该从Walker Plus URL解析）
  const basicInfo = {
    id: 'example-hanabi',
    name: '示例花火大会',
    date: '2025年8月1日',
    time: '19:30-20:30',
    location: '示例会场',
    fireworksCount: '约1000发',
    expectedVisitors: '约1万人',
    region: 'tokyo',
    month: 'august'
  };

  createHanabiTemplate(walkerPlusUrl, basicInfo);
}

module.exports = { createHanabiTemplate, generateHanabiTemplate }; 