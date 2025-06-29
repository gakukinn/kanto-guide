/**
 * 祭典页面生成器API接口
 * @description 处理祭典页面生成请求，使用MatsuriDetailTemplate生成四层页面
 */

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';
import fs from 'fs/promises';
import path from 'path';

// POST: 生成祭典页面
export async function POST(request: NextRequest) {
  let prisma: PrismaClient | null = null;
  
  try {
    console.log('📥 接收到POST请求 - 祭典页面生成');
    
    const body = await request.json();
    console.log('📦 请求体:', JSON.stringify(body, null, 2));
    
    const { databaseId, activityType = 'matsuri', options = {} } = body;

    if (!databaseId) {
      const errorResponse = {
        success: false,
        message: '缺少数据库记录ID',
        error: 'databaseId is required'
      };
      console.log('❌ 缺少databaseId，返回错误');
      return NextResponse.json(errorResponse, { status: 400 });
    }

    console.log('📖 连接数据库，查找祭典记录ID:', databaseId);
    
    // 创建Prisma客户端
    prisma = new PrismaClient();
    
    // 从数据库获取祭典记录
    const dbRecord = await prisma.matsuriEvent.findUnique({
      where: { id: databaseId },
      include: {
        region: true  // 包含region信息
      }
    });
    
    if (!dbRecord) {
      return NextResponse.json({
        success: false,
        message: `数据库中未找到ID为 ${databaseId} 的祭典记录`,
        error: 'Record not found'
      }, { status: 404 });
    }
    
    console.log('✅ 找到祭典数据库记录:', dbRecord.name);
    
    // 转换为MatsuriEvent格式
    const matsuriData = convertDbRecordToMatsuriData(dbRecord, options);
    
    // 生成页面文件 - 使用region code
    const regionCode = dbRecord.region?.code || 'tokyo';
    const result = await generateMatsuriDetailPage(matsuriData, regionCode, databaseId);
    
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
          pageType: 'MatsuriDetailTemplate',
          generatedAt: new Date().toISOString()
        }
      };
      
      console.log('✅ 祭典页面生成成功:', JSON.stringify(successResponse, null, 2));
      
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
 * 转换数据库记录为MatsuriEvent格式
 */
function convertDbRecordToMatsuriData(dbRecord: any, options: any = {}) {
  return {
    id: dbRecord.id,
    title: dbRecord.name,
    name: dbRecord.name,
    englishName: dbRecord.englishName || '',
    japaneseName: dbRecord.japaneseName || '',
    _sourceData: {
      japaneseName: dbRecord.japaneseName || '',
      japaneseDescription: dbRecord.description || ''
    },
    date: dbRecord.date || dbRecord.displayDate || '待确认',
    displayDate: dbRecord.displayDate || dbRecord.date || '待确认',
    time: dbRecord.time || '',
    location: dbRecord.location,
    category: dbRecord.matsuriType || '地区祭典',
    matsuriType: dbRecord.matsuriType || '地区祭典',
    traditionLevel: dbRecord.traditionLevel || 3,
    expectedVisitors: dbRecord.expectedVisitors || '数万人',
    duration: dbRecord.duration || '2日间',
    status: dbRecord.status || '正常举办',
    
    // 联系信息
    organizer: dbRecord.contact?.organizer || '',
    contact: dbRecord.contact?.phone || '',
    website: dbRecord.contact?.website || '',
    
    // 场地信息
    venues: dbRecord.venues || [],
    access: typeof dbRecord.access === 'object' && dbRecord.access?.train 
      ? dbRecord.access.train 
      : dbRecord.access || '请查看官方网站',
    // 添加Google地图URL
    googleMapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.2!2d139.7587!3d35.6658!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDM5JzU2LjkiTiAxMznCsDQ1JzMxLjMiRQ!5e0!3m2!1sja!2sjp!4v1640000000000!5m2!1sja!2sjp",
    
    // 历史和特色
    history: dbRecord.history || {},
    highlights: extractHighlights(dbRecord),
    features: extractFeatures(dbRecord),
    
    // 实用信息
    tips: dbRecord.tips || {},
    mapInfo: dbRecord.mapInfo || {},
    
    // 描述
    description: generateDescription(dbRecord),
    
    // 媒体信息
    media: options.uploadedImages?.length > 0 ? 
      options.uploadedImages.map((img: string, index: number) => ({
        type: 'image' as const,
        url: img,
        title: `${dbRecord.name} - 图片${index + 1}`,
        description: `${dbRecord.name}活动现场图片`,
        alt: `${dbRecord.name} - 图片${index + 1}`,
        caption: `${dbRecord.name}活动图片`
      })) : [],
    
    // 其他字段
    likes: 0,
    verified: dbRecord.verified || false
  };
}

/**
 * 提取祭典特色
 */
function extractHighlights(dbRecord: any): string[] {
  const highlights = [];
  
  if (dbRecord.tips?.features) {
    highlights.push(...dbRecord.tips.features);
  }
  
  if (dbRecord.venues && dbRecord.venues.length > 0) {
    dbRecord.venues.forEach((venue: any) => {
      if (venue.activities) {
        highlights.push(...venue.activities);
      }
    });
  }
  
  // 默认特色
  if (highlights.length === 0) {
    highlights.push('传统文化体验', '地区特色活动', '家庭友好');
  }
  
  return [...new Set(highlights)]; // 去重
}

/**
 * 提取祭典特征
 */
function extractFeatures(dbRecord: any): string[] {
  const features = [];
  
  if (dbRecord.matsuriType) {
    features.push(dbRecord.matsuriType);
  }
  
  if (dbRecord.expectedVisitors) {
    features.push(`参与人数：${dbRecord.expectedVisitors}`);
  }
  
  if (dbRecord.duration) {
    features.push(`举办时长：${dbRecord.duration}`);
  }
  
  return features;
}

/**
 * 生成祭典描述
 */
function generateDescription(dbRecord: any): string {
  if (dbRecord.history?.description) {
    return dbRecord.history.description;
  }
  
  return `${dbRecord.name}是${dbRecord.region?.nameCn || '该地区'}的传统祭典活动，${dbRecord.matsuriType || '地区祭典'}类型的文化盛会。活动期间将在${dbRecord.location}举办，为当地居民和游客提供体验传统文化的绝佳机会。`;
}

/**
 * 生成祭典详情页面
 */
async function generateMatsuriDetailPage(matsuriData: any, regionKey: string, eventId: string): Promise<{
  success: boolean;
  message: string;
  filePath?: string;
  url?: string;
  error?: string;
}> {
  try {
    // 生成页面内容
    const pageContent = generateMatsuriDetailPageContent(matsuriData, regionKey, eventId);
    
    // 生成文件名（使用祭典名称的拼音或英文）
    const fileName = generateFileName(matsuriData.name);
    
    // 确定文件路径
    const dirPath = path.join(process.cwd(), 'app', regionKey, 'matsuri', fileName);
    const filePath = path.join(dirPath, 'page.tsx');
    
    // 创建目录
    await fs.mkdir(dirPath, { recursive: true });
    
    // 写入文件
    await fs.writeFile(filePath, pageContent, 'utf8');
    
    // 生成访问URL
    const url = `/${regionKey}/matsuri/${fileName}`;
    
    console.log(`✅ 祭典页面生成成功: ${filePath}`);
    
    return {
      success: true,
      message: `祭典详情页面生成成功！文件路径: ${filePath}`,
      filePath,
      url
    };
    
  } catch (error) {
    console.error('❌ 生成祭典页面失败:', error);
    return {
      success: false,
      message: '生成祭典页面失败',
      error: error instanceof Error ? error.message : '未知错误'
    };
  }
}

/**
 * 生成文件名
 */
function generateFileName(name: string): string {
  // 特殊处理新橋こいち祭
  if (name.includes('新橋こいち祭')) {
    return 'shinbashi-koichi-matsuri';
  }
  
  // 移除特殊字符，转换为URL友好的格式
  return name
    .replace(/第\d+回/g, '') // 移除"第XX回"
    .replace(/[^\w\s-]/g, '') // 移除特殊字符
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-') // 空格转换为连字符
    .replace(/[^\w-]/g, '') // 只保留字母、数字和连字符
    || 'matsuri-event'; // 如果结果为空，使用默认名称
}

/**
 * 生成祭典详情页面内容
 */
function generateMatsuriDetailPageContent(matsuriData: any, regionKey: string, eventId: string): string {
  return `import MatsuriDetailTemplate from '../../../../src/components/MatsuriDetailTemplate';

// 页面元数据
export const metadata = {
  title: '${matsuriData.name} | ${getRegionDisplayName(regionKey)}传统祭典指南',
  description: '${matsuriData.description.substring(0, 150)}',
  keywords: '${matsuriData.name}, 祭典, ${getRegionDisplayName(regionKey)}, 传统文化, 日本祭典',
  openGraph: {
    title: '${matsuriData.name} | ${getRegionDisplayName(regionKey)}传统祭典',
    description: '${matsuriData.description.substring(0, 150)}',
    type: 'article',
    locale: 'zh_CN',
  },
};

// ${matsuriData.name} 详情页面数据
const matsuriData = ${JSON.stringify(matsuriData, null, 2)};

export default function ${generateComponentName(matsuriData.name)}Page() {
  return (
    <MatsuriDetailTemplate 
      data={matsuriData as any}
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
    .replace(/[^\w]/g, '') // 移除非字母数字字符
    .replace(/^./, (str) => str.toUpperCase()); // 首字母大写
  
  // 如果组件名以数字开头，添加前缀
  if (/^\d/.test(componentName)) {
    componentName = 'Event' + componentName;
  }
  
  return componentName || 'MatsuriEvent'; // 如果结果为空，使用默认名称
}

/**
 * 获取地区显示名称
 */
function getRegionDisplayName(regionKey: string): string {
  const regionMap: { [key: string]: string } = {
    tokyo: '东京都',
    saitama: '埼玉县',
    kanagawa: '神奈川县',
    chiba: '千叶县',
    kitakanto: '北关东',
    koshinetsu: '甲信越'
  };
  
  return regionMap[regionKey] || '关东地区';
}

// GET: 获取数据库中的祭典记录
export async function GET(request: NextRequest) {
  let prisma: PrismaClient | null = null;
  
  try {
    console.log('📥 接收到GET请求 - 获取祭典记录列表');
    
    prisma = new PrismaClient();
    
    // 获取所有祭典记录
    const matsuriEvents = await prisma.matsuriEvent.findMany({
      include: {
        region: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    const formattedEvents = matsuriEvents.map(event => ({
      id: event.id,
      name: event.name,
      englishName: event.englishName,
      japaneseName: event.japaneseName,
      region: event.region?.nameCn || '未知地区',
      regionCode: event.region?.code || 'unknown',
      date: event.displayDate || event.date,
      location: event.location,
      verified: event.verified,
      createdAt: event.createdAt.toISOString()
    }));
    
    return NextResponse.json({
      success: true,
      data: formattedEvents,
      total: formattedEvents.length,
      message: `成功获取 ${formattedEvents.length} 个祭典记录`
    });
    
  } catch (error) {
    console.error('❌ 获取祭典记录失败:', error);
    
    return NextResponse.json({
      success: false,
      message: '获取祭典记录失败',
      error: error instanceof Error ? error.message : '未知错误'
    }, { status: 500 });
    
  } finally {
    if (prisma) {
      await prisma.$disconnect();
    }
  }
} 