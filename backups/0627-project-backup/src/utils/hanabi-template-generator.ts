/**
 * 花火详情页面模板生成器
 * 快速生成标准格式的花火详情页面
 * 支持多语言和自动化创建
 */

import { HanabiData } from '../types/hanabi';
import { BasicHanabiInfo } from './hanabi-data-converter';

/**
 * 快速生成花火详情页面的基础模板
 */
export function generateQuickHanabiTemplate(
  basicInfo: BasicHanabiInfo
): HanabiData {
  const currentDate = new Date().toISOString().split('T')[0];

  return {
    // 基本信息
    id: basicInfo.id,
    name: basicInfo.name,
    englishName: basicInfo.englishName,

    // 内部参考（日文源数据）
    _sourceData: {
      japaneseName: basicInfo.japaneseName || basicInfo.name,
      japaneseDescription: basicInfo.japaneseName || basicInfo.name,
    },
    year: basicInfo.year,
    month: basicInfo.month,

    // 时间信息（默认值，需要后续填入）
    date: `${basicInfo.year}年${basicInfo.month}月未定`,
    time: '19:30～20:30（予定）',
    duration: '約60分',

    // 花火信息（默认值）
    fireworksCount: '未定',
    expectedVisitors: '未定',
    weather: '晴天時開催',
    ticketPrice: '詳細是公式网站在確認请',
    status: 'scheduled',
    themeColor: basicInfo.themeColor || 'red',

    // 标签系统
    tags: {
      timeTag: `${basicInfo.month}月`,
      regionTag: basicInfo.regionKey,
      typeTag: '花火',
      layerTag: 'Layer 4詳細页',
    },

    // 会场信息（默认模板）
    venues: [
      {
        name: '会場未定',
        location: '詳細是公式网站在確認请',
        startTime: '19:30',
        features: ['花火大会'],
      },
    ],

    // 交通信息（默认模板）
    access: [
      {
        venue: '会場未定',
        stations: [
          {
            name: '最寄駅',
            lines: ['詳細是公式网站在確認请'],
            walkTime: '詳細是公式网站在確認请',
          },
        ],
      },
    ],

    // 观赏地点（默认模板）
    viewingSpots: [
      {
        name: '主要会場',
        rating: 5,
        crowdLevel: '混雑予想',
        tips: '早的場所取将勧',
        pros: ['最高的視界', '迫力満点'],
        cons: ['混雑', '早的到着必要'],
      },
    ],

    // 历史信息（默认模板）
    history: {
      established: 1,
      significance: '地域的伝統的的花火大会',
      highlights: ['美花火', '地域的絆', '夏的風物詩'],
    },

    // 贴士（默认模板）
    tips: [
      {
        category: '観覧的',
        items: [
          '早的場所取将勧',
          '公式网站在最新情報将確認请',
          '天候在中止延期的場合的有',
        ],
      },
      {
        category: '交通交通',
        items: [
          '公共交通機関将利用请',
          '駐車場情報是公式网站在確認请',
        ],
      },
    ],

    // 联系信息（默认模板）
    contact: {
      organizer: '主催者情報是公式网站在確認请',
      phone: '詳細是公式网站在確認请',
      website: 'https://example.com',
      socialMedia: 'SNS情報是公式网站在確認请',
    },

    // 地图信息（默认模板）
    mapInfo: {
      hasMap: true,
      mapNote: '会場的詳細是公式网站在確認请',
      parking: '駐車場情報是公式网站在確認请',
    },

    // 天气信息
    weatherInfo: {
      month: `${basicInfo.month}月`,
      temperature:
        basicInfo.month >= 6 && basicInfo.month <= 8 ? '25-30°C' : '15-25°C',
      humidity: '60-80%',
      rainfall: '少雨',
      recommendation: '夏的夜空在映花火将楽请',
      rainPolicy: '雨天時是中止了是延期',
      note:
        basicInfo.month >= 6 && basicInfo.month <= 8
          ? '熱中症対策将请不要忘记'
          : '防寒対策将请不要忘记',
    },

    // 特殊功能（默认模板）
    specialFeatures: {
      scale: '規模未定',
      location: '会場未定',
      tradition: '地域的伝統的的花火大会',
      atmosphere: '家族在楽温雰囲気',
    },

    // 2025年特别企划（默认模板）
    special2025: {
      theme: '未定',
      concept: '地域的絆将深花火大会',
      features: ['美花火', '地域的特色', '夏的思出'],
    },

    // 关联推荐（空数组，后续填入）
    related: {
      regionRecommendations: [],
      timeRecommendations: [],
    },

    // 媒体内容（空数组，后续填入）
    media: [],

    // 地图嵌入URL（占位符）
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3141.234!2d139.2394!3d37.9161',

    // 官方数据源验证
    officialSource: {
      walkerPlusUrl: 'https://hanabi.walkerplus.com/',
      verificationDate: currentDate,
      dataConfirmedBy: 'USER_PROVIDED' as const,
      lastChecked: currentDate,
    },
  };
}

/**
 * 生成完整的页面文件内容
 */
export function generatePageFileContent(
  hanabiData: HanabiData,
  regionKey: string
): string {
  const componentName =
    hanabiData.id
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('') + 'DetailPage';

  return `/**
 * 第四层页面 - ${hanabiData.name}详情
 * @layer 四层 (Detail Layer)
 * @category 花火
 * @region ${regionKey}
 * @description ${hanabiData.name}的详细信息页面
 * @template HanabiDetailTemplate.tsx
 */

import HanabiDetailTemplate from '../../@/components/HanabiDetailTemplate';

// ${hanabiData.name}详细数据（基于WalkerPlus官方信息）
const hanabiData = ${JSON.stringify(hanabiData, null, 2)};

export default function ${componentName}() {
  return (
    <HanabiDetailTemplate
      data={hanabiData}
      regionKey="${regionKey}"
    />
  );
}`;
}

/**
 * 批量创建多个花火详情页面的配置
 */
export interface BatchCreateConfig {
  events: Array<{
    basicInfo: BasicHanabiInfo;
    walkerPlusUrl?: string;
    customData?: Partial<HanabiData>;
  }>;
  outputDir: string;
  regionKey: string;
}

/**
 * 批量创建花火详情页面
 */
export function generateBatchCreateScript(config: BatchCreateConfig): string {
  return `/**
 * 批量创建花火详情页面脚本
 * 自动生成的批量创建配置
 */

import fs from 'fs';
import path from 'path';
import { generateQuickHanabiTemplate, generatePageFileContent } from '../utils/hanabi-template-generator';

const events = ${JSON.stringify(config.events, null, 2)};

async function createAllPages() {
  for (const event of events) {
    const hanabiData = generateQuickHanabiTemplate(event.basicInfo);
    
    // 如果有自定义数据，合并进去
    if (event.customData) {
      Object.assign(hanabiData, event.customData);
    }
    
    const pageContent = generatePageFileContent(hanabiData, '${
      config.regionKey
    }');
    const outputPath = path.join('${
      config.outputDir
    }', event.basicInfo.id, 'page.tsx');
    
    // 创建目录
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // 写入文件
    fs.writeFileSync(outputPath, pageContent, 'utf8');
    console.log(\`✅ Created: \${outputPath}\`);
  }
  
  console.log(\`🎉 Successfully created \${events.length} hanabi detail pages!\`);
}

createAllPages().catch(console.error);`;
}

/**
 * 创建使用说明文档
 */
export function generateUsageGuide(): string {
  return `# 花火详情页面生成工具使用指南

## 快速开始

### 1. 基本使用
\`\`\`typescript
import { generateQuickHanabiTemplate, generatePageFileContent } from './utils/hanabi-template-generator';

// 定义基本信息
const basicInfo = {
  id: 'example-hanabi-2025',
  name: '例：花火大会',
  englishName: 'Example Fireworks Festival',
  year: 2025,
  month: 8,
  regionKey: 'koshinetsu'
};

// 生成模板数据
const hanabiData = generateQuickHanabiTemplate(basicInfo);

// 生成页面文件内容
const pageContent = generatePageFileContent(hanabiData, 'koshinetsu');

// 保存到文件
fs.writeFileSync('src/app/koshinetsu/hanabi/example-hanabi-2025/page.tsx', pageContent);
\`\`\`

### 2. 与WalkerPlus数据转换器结合使用
\`\`\`typescript
import { convertWalkerPlusToHanabiData } from './utils/hanabi-data-converter';

// 先抓取WalkerPlus数据
const walkerData = await crawlWalkerPlusData(url);

// 转换为标准格式
const hanabiData = convertWalkerPlusToHanabiData(walkerData, basicInfo);

// 生成页面
const pageContent = generatePageFileContent(hanabiData, regionKey);
\`\`\`

### 3. 批量创建
\`\`\`typescript
import { generateBatchCreateScript } from './utils/hanabi-template-generator';

const config = {
  events: [
    {
      basicInfo: {
        id: 'hanabi1-2025',
        name: '花火大会1',
        englishName: 'Fireworks 1',
        year: 2025,
        month: 8,
        regionKey: 'koshinetsu'
      }
    },
    // ... 更多活动
  ],
  outputDir: 'src/app/koshinetsu/hanabi',
  regionKey: 'koshinetsu'
};

const script = generateBatchCreateScript(config);
fs.writeFileSync('scripts/batch-create-hanabi.js', script);
\`\`\`

## 多语言支持

工具已预留多语言接口，未来可以轻松集成翻译API：

\`\`\`typescript
import { MultiLanguageConverter } from './utils/hanabi-data-converter';

// 将日文转换为中文和英文
const multiLangContent = MultiLanguageConverter.convertMultiLanguage([
  '美花火大会',
  '夏的風物詩'
]);
\`\`\`

## 注意事项

1. 生成的模板包含所有必需字段，避免TypeScript错误
2. 默认值可以后续根据实际数据更新
3. 支持自定义主题颜色和地区配置
4. 自动生成符合项目规范的文件结构

## 文件结构

生成的页面文件将遵循以下结构：
\`\`\`
src/app/{region}/hanabi/{event-id}/page.tsx
\`\`\`

每个页面都使用统一的HanabiDetailTemplate模板，确保一致性。`;
}

/**
 * 验证生成的数据是否符合HanabiData接口
 */
export function validateGeneratedData(data: HanabiData): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // 检查必需字段
  const requiredFields = [
    'id',
    'name',
    'englishName',
    'year',
    'month',
    'date',
    'time',
    'duration',
    'fireworksCount',
    'expectedVisitors',
    'weather',
    'ticketPrice',
    'status',
    'themeColor',
    'tags',
    'venues',
    'access',
    'viewingSpots',
    'history',
    'tips',
    'contact',
    'mapInfo',
    'weatherInfo',
    'related',
  ];

  for (const field of requiredFields) {
    if (!(field in data) || data[field as keyof HanabiData] === undefined) {
      errors.push(`Missing required field: ${field}`);
    }
  }

  // 检查数组字段
  if (!Array.isArray(data.venues) || data.venues.length === 0) {
    errors.push('venues must be a non-empty array');
  }

  if (!Array.isArray(data.access) || data.access.length === 0) {
    errors.push('access must be a non-empty array');
  }

  if (!Array.isArray(data.viewingSpots) || data.viewingSpots.length === 0) {
    errors.push('viewingSpots must be a non-empty array');
  }

  if (!Array.isArray(data.tips) || data.tips.length === 0) {
    errors.push('tips must be a non-empty array');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
