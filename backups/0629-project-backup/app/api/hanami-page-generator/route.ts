/**
 * 花见会页面生成器API接口
 * @description 处理花见会页面生成请求，使用HanamiDetailTemplate生成四层页面
 */

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';
import fs from 'fs/promises';
import path from 'path';

// POST: 生成花见会页面
export async function POST(request: NextRequest) {
  let prisma: PrismaClient | null = null;
  
  try {
    console.log('📥 接收到POST请求 - 花见会页面生成');
    
    const body = await request.json();
    console.log('📦 请求体:', JSON.stringify(body, null, 2));
    
    const { databaseId, activityType, options = {} } = body;

    if (!databaseId) {
      const errorResponse = {
        success: false,
        message: '缺少数据库记录ID',
        error: 'databaseId is required'
      };
      console.log('❌ 缺少databaseId，返回错误');
      return NextResponse.json(errorResponse, { status: 400 });
    }

    console.log('📖 连接数据库，查找花见会记录ID:', databaseId);
    
    // 创建Prisma客户端
    prisma = new PrismaClient();
    
    // 从数据库获取花见会记录
    const dbRecord = await prisma.hanamiEvent.findUnique({
      where: { id: databaseId },
      include: {
        regionRef: true  // 包含region信息
      }
    });
    
    if (!dbRecord) {
      return NextResponse.json({
        success: false,
        message: `数据库中未找到ID为 ${databaseId} 的花见会记录`,
        error: 'Record not found'
      }, { status: 404 });
    }
    
    console.log('✅ 找到花见会数据库记录:', dbRecord.name);
    
    // 转换为HanamiEvent格式
    const hanamiData = convertDbRecordToHanamiData(dbRecord, options);
    
    // 生成页面文件 - 使用region code
    const regionCode = dbRecord.regionRef?.code || 'tokyo';
    const result = await generateHanamiDetailPage(hanamiData, regionCode, databaseId);
    
    if (result.success) {
      const successResponse = {
        success: true,
        message: result.message,
        data: {
          eventId: databaseId,
          name: dbRecord.name,
          filePath: result.filePath,
          url: result.url,
          regionKey: regionCode,
          databaseId: databaseId,
          pageType: 'HanamiDetailTemplate',
          generatedAt: new Date().toISOString()
        }
      };
      
      console.log('✅ 花见会页面生成成功:', JSON.stringify(successResponse, null, 2));
      
      return NextResponse.json(successResponse, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } else {
      return NextResponse.json({
        success: false,
        message: result.message,
        error: result.error || '页面生成失败'
      }, { status: 500 });
    }

  } catch (error) {
    console.error('❌ API错误:', error);
    console.error('❌ 错误堆栈:', error instanceof Error ? error.stack : 'No stack trace');
    
    const errorResponse = {
      success: false,
      message: '服务器内部错误',
      error: error instanceof Error ? error.message : '未知错误',
      timestamp: new Date().toISOString()
    };
    
    console.log('📤 返回错误响应:', JSON.stringify(errorResponse, null, 2));
    
    return NextResponse.json(errorResponse, { 
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } finally {
    // 确保数据库连接被关闭
    if (prisma) {
      await prisma.$disconnect();
    }
  }
}

/**
 * 根据数据库记录判断季节
 */
function getSeasonFromData(dbRecord: any): string {
  // 优先使用数据库中的明确季节信息
  if (dbRecord.season) {
    const seasonMap: { [key: string]: string } = {
      'spring': '春季',
      'summer': '夏季', 
      'autumn': '秋季',
      'winter': '冬季'
    };
    return seasonMap[dbRecord.season] || dbRecord.season;
  }
  
  // 如果没有季节信息，使用观赏期时间推断
  if (dbRecord.peakTime) {
    const time = dbRecord.peakTime.toLowerCase();
    if (time.includes('6月') || time.includes('7月') || time.includes('8月')) {
      return '夏季';
    }
    if (time.includes('3月') || time.includes('4月') || time.includes('5月')) {
      return '春季';
    }
    if (time.includes('9月') || time.includes('10月') || time.includes('11月')) {
      return '秋季';
    }
    if (time.includes('12月') || time.includes('1月') || time.includes('2月')) {
      return '冬季';
    }
  }
  
  // 全年活动
  return '全年';
}

/**
 * 根据数据库记录获取观赏对象
 */
function getFlowerTypeFromData(dbRecord: any): string {
  // 优先使用数据库中的明确品种信息
  if (dbRecord.sakuraVarieties) {
    return dbRecord.sakuraVarieties;
  }
  
  // 使用tips中的品种信息
  if (dbRecord.tips?.varieties) {
    return dbRecord.tips.varieties;
  }
  
  // 如果没有明确信息，使用通用描述
  return '多种花卉';
}

/**
 * 转换数据库记录为HanamiEvent格式
 */
function convertDbRecordToHanamiData(dbRecord: any, options: any = {}) {
  return {
    id: dbRecord.id,
    title: dbRecord.name,
    name: dbRecord.name,
    englishName: dbRecord.englishName || '',
    _sourceData: {
      japaneseName: dbRecord.japaneseName || dbRecord.name,
      japaneseDescription: dbRecord.description || ''
    },
    
    // 花见会特有字段
    date: dbRecord.date || dbRecord.displayDate || '待确认',
    dates: dbRecord.displayDate || dbRecord.date || '待确认',
    endDate: dbRecord.endDate || '',
    season: dbRecord.season || '待确认',  // 直接使用数据库中的season字段
    viewingSeason: getSeasonFromData(dbRecord),
    peakTime: dbRecord.peakTime || '待确认',
    sakuraVariety: getFlowerTypeFromData(dbRecord),
    
    // 基础信息
    location: dbRecord.location,
    category: 'hanami',
    expectedVisitors: dbRecord.expectedVisitors || '数万人',
    venue: dbRecord.venue || dbRecord.location,
    prefecture: dbRecord.regionRef?.nameJp || '',
    
    // 交通信息
    access: dbRecord.access,
    
    // 评分和访问
    wantToVisit: dbRecord.wantToVisit || 0,
    haveVisited: dbRecord.haveVisited || 0,
    rank: dbRecord.rank || 0,
    
    // 特色和亮点
    highlights: extractHanamiHighlights(dbRecord),
    features: extractHanamiFeatures(dbRecord),
    
    // tips信息
    tips: dbRecord.tips,
    
    // 描述
    description: generateHanamiDescription(dbRecord),
    
    // 媒体信息
    media: options.uploadedImages?.length > 0 ? 
      options.uploadedImages.map((img: string, index: number) => ({
        type: 'image' as const,
        url: img,
        title: `${dbRecord.name} - 图片${index + 1}`,
        description: `${dbRecord.name}花见会现场图片`,
        alt: `${dbRecord.name} - 图片${index + 1}`,
        caption: `${dbRecord.name}花见会图片`
      })) : [],
    
    // 官方信息
    organizer: dbRecord.organizer || '',
    contact: dbRecord.contact || '',
    price: dbRecord.price || '',
    website: dbRecord.website || '',
    
    // 地图信息
    mapInfo: dbRecord.mapInfo,
    
    // 其他字段
    likes: 0
  };
}

/**
 * 提取花见会特色
 */
function extractHanamiHighlights(dbRecord: any): string[] {
  const highlights = [];
  
  // 优先使用数据库中的特色信息
  if (dbRecord.tips?.features) {
    highlights.push(...dbRecord.tips.features);
  }
  
  // 添加场地活动信息
  if (dbRecord.venues && dbRecord.venues.length > 0) {
    dbRecord.venues.forEach((venue: any) => {
      if (venue.activities) {
        highlights.push(...venue.activities);
      }
    });
  }
  
  // 如果没有特色信息，添加通用特色
  if (highlights.length === 0) {
    highlights.push('自然观赏', '拍照胜地', '休闲放松');
  }
  
  return [...new Set(highlights)]; // 去重
}

/**
 * 提取花见会功能特点
 */
function extractHanamiFeatures(dbRecord: any): string[] {
  const features = [];
  
  if (dbRecord.peakTime) {
    features.push(`最佳观赏期：${dbRecord.peakTime}`);
  }
  
  if (dbRecord.expectedVisitors) {
    features.push(`预计观赏人数：${dbRecord.expectedVisitors}`);
  }
  
  const flowerType = getFlowerTypeFromData(dbRecord);
  if (flowerType && flowerType !== '多种花卉') {
    features.push(`观赏品种：${flowerType}`);
  }
  
  return features;
}

/**
 * 生成花见会描述
 */
function generateHanamiDescription(dbRecord: any): string {
  const name = dbRecord.name;
  const location = dbRecord.location;
  
  // 优先使用数据库中的描述
  if (dbRecord.description) {
    return dbRecord.description;
  }
  
  // 生成通用描述
  const seasonText = getSeasonFromData(dbRecord);
  const flowerType = getFlowerTypeFromData(dbRecord);
  const peakTime = dbRecord.peakTime || '最佳观赏期';
  
  let description = `${name}是位于${location}的知名观赏胜地`;
  
  if (seasonText !== '全年') {
    description += `，每年${seasonText}`;
  }
  
  if (peakTime !== '最佳观赏期') {
    description += `${peakTime}期间`;
  }
  
  description += `吸引众多游客前来观赏。这里的景色优美`;
  
  if (flowerType !== '多种花卉') {
    description += `，${flowerType}品种丰富`;
  }
  
  description += `，是体验自然观赏文化的绝佳场所。`;
  
  return description;
}

/**
 * 生成花见会详情页面
 */
async function generateHanamiDetailPage(hanamiData: any, regionKey: string, eventId: string): Promise<{
  success: boolean;
  message: string;
  filePath?: string;
  url?: string;
  error?: string;
}> {
  try {
    console.log('🔧 开始生成花见会详情页面...');
    
    // 生成文件名和路径
    const fileName = generateFileName(hanamiData.name);
    const dirPath = path.join(process.cwd(), 'app', regionKey, 'hanami', fileName);
    const filePath = path.join(dirPath, 'page.tsx');
    
    console.log('📁 目标目录:', dirPath);
    console.log('📄 目标文件:', filePath);
    
    // 确保目录存在
    await fs.mkdir(dirPath, { recursive: true });
    
    // 生成页面内容
    const pageContent = generateHanamiDetailPageContent(hanamiData, regionKey, eventId);
    
    // 写入文件
    await fs.writeFile(filePath, pageContent, 'utf8');
    
    const url = `/${regionKey}/hanami/${fileName}`;
    
    console.log('✅ 花见会页面生成成功');
    console.log('🔗 页面URL:', url);
    
    return {
      success: true,
      message: `花见会详情页面生成成功！文件路径: ${filePath}`,
      filePath: filePath,
      url: url
    };
    
  } catch (error) {
    console.error('❌ 生成花见会页面失败:', error);
    return {
      success: false,
      message: '生成花见会页面失败',
      error: error instanceof Error ? error.message : '未知错误'
    };
  }
}

/**
 * 生成文件名
 */
function generateFileName(name: string): string {
  // 特殊处理河口湖ハーブフェスティバル
  if (name.includes('河口湖ハーブフェスティバル')) {
    return 'kawaguchiko-herb-festival';
  }
  
  // 特殊处理水戸のあじさいまつり
  if (name.includes('水戸のあじさいまつり')) {
    return 'mito-ajisai-matsuri';
  }
  
  // 移除特殊字符，转换为URL友好的格式
  return name
    .replace(/第\d+回/g, '') // 移除"第XX回"
    .replace(/[^\w\s-]/g, '') // 移除特殊字符
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-') // 空格转换为连字符
    .replace(/[^\w-]/g, '') // 只保留字母、数字和连字符
    || 'hanami-event'; // 如果结果为空，使用默认名称
}

/**
 * 生成花见会详情页面内容
 */
function generateHanamiDetailPageContent(hanamiData: any, regionKey: string, eventId: string): string {
  const componentName = generateComponentName(hanamiData.name);
  const regionDisplayName = getRegionDisplayName(regionKey);
  
  return `import HanamiDetailTemplate from '../../../../src/components/HanamiDetailTemplate';

// 页面元数据
export const metadata = {
  title: '${hanamiData.name} | ${regionDisplayName}花见会指南',
  description: '${hanamiData.description}',
  keywords: '${hanamiData.name}, 花见会, ${regionDisplayName}, 樱花, 日本花见',
  openGraph: {
    title: '${hanamiData.name} | ${regionDisplayName}花见会',
    description: '${hanamiData.description}',
    type: 'article',
    locale: 'zh_CN',
  },
};

// ${hanamiData.name} 详情页面数据
const hanamiData = ${JSON.stringify(hanamiData, null, 2)};

export default function ${componentName}Page() {
  return (
    <HanamiDetailTemplate 
      data={hanamiData as any}
      regionKey="${regionKey}"
    />
  );
}
`;
}

/**
 * 生成组件名称
 */
function generateComponentName(name: string): string {
  let componentName = name
    .replace(/第\d+回/g, '') // 移除"第XX回"
    .replace(/[^\w\s]/g, '') // 移除特殊字符
    .replace(/\s+/g, '') // 移除空格
    .replace(/^./, (str) => str.toUpperCase()); // 首字母大写
  
  // 如果组件名以数字开头，添加前缀
  if (/^\d/.test(componentName)) {
    componentName = 'Event' + componentName;
  }
  
  return componentName || 'HanamiEvent'; // 如果结果为空，使用默认名称
}

/**
 * 获取地区显示名称
 */
function getRegionDisplayName(regionKey: string): string {
  const regionMap: { [key: string]: string } = {
    tokyo: '东京都',
    kanagawa: '神奈川县',
    chiba: '千叶县',
    saitama: '埼玉县',
    kitakanto: '北关东',
    koshinetsu: '甲信越'
  };
  
  return regionMap[regionKey] || regionKey;
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: '花见会页面生成器API',
    version: '1.0.0',
    endpoints: {
      POST: '生成花见会详情页面'
    }
  });
} 