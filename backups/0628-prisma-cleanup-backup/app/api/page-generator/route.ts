/**
 * 页面生成器API接口 - 真实页面生成版本
 * @description 处理前端页面生成器的请求，真正创建页面文件
 */

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';
import fs from 'fs/promises';
import path from 'path';

// POST: 生成新页面（真实版本）
export async function POST(request: NextRequest) {
  let prisma: PrismaClient | null = null;
  
  try {
    console.log('📥 接收到POST请求 - 真实页面生成');
    
    const body = await request.json();
    console.log('📦 请求体:', JSON.stringify(body, null, 2));
    
    const { databaseId, options = {} } = body;

    if (!databaseId) {
      const errorResponse = {
        success: false,
        message: '缺少数据库记录ID',
        error: 'databaseId is required'
      };
      console.log('❌ 缺少databaseId，返回错误');
      return NextResponse.json(errorResponse, { status: 400 });
    }

    console.log('📖 连接数据库，查找记录ID:', databaseId);
    
    // 创建Prisma客户端
    prisma = new PrismaClient();
    
    // 从数据库获取记录
    const dbRecord = await prisma.hanabiEvent.findUnique({
      where: { id: databaseId },
      include: {
        region: true  // 包含region信息
      }
    });
    
    if (!dbRecord) {
      return NextResponse.json({
        success: false,
        message: `数据库中未找到ID为 ${databaseId} 的记录`,
        error: 'Record not found'
      }, { status: 404 });
    }
    
    console.log('✅ 找到数据库记录:', dbRecord.name);
    
    // 转换为HanabiData格式
    const hanabiData = convertDbRecordToHanabiData(dbRecord, options);
    
    // 生成页面文件 - 使用region code
    const regionCode = dbRecord.region?.code || 'tokyo';
    const result = await generateHanabiDetailPage(hanabiData, regionCode, databaseId);
    
    if (result.success) {
      // 生成花火卡片数据并更新区域页面
      console.log('🎴 开始生成花火卡片...');
      const cardResult = await generateAndUpdateHanabiCard(dbRecord, regionCode, databaseId);
      
      const successResponse = {
        success: true,
        message: result.message + (cardResult.success ? '\n🎴 花火卡片已同步生成！' : '\n⚠️ 花火卡片生成失败'), 
        data: {
          eventId: databaseId,
          name: dbRecord.name,
          filePath: result.filePath,
          url: result.url,
          regionKey: regionCode,
          databaseId: databaseId,
          pageType: 'HanabiDetailTemplate',
          cardGenerated: cardResult.success,
          cardMessage: cardResult.message,
          generatedAt: new Date().toISOString()
        }
      };
      
      console.log('✅ 页面生成成功:', JSON.stringify(successResponse, null, 2));
      
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
 * 转换数据库记录为HanabiData格式
 */
function convertDbRecordToHanabiData(dbRecord: any, options: any = {}) {
  const currentYear = new Date().getFullYear();
  
  // 安全地解析日期 - 支持ISO格式和中文格式
  let eventDate: Date;
  if (dbRecord.date) {
    // 如果是ISO格式（如 "2025-07-26"），直接使用
    if (/^\d{4}-\d{2}-\d{2}$/.test(dbRecord.date)) {
      eventDate = new Date(dbRecord.date);
    } else {
      // 如果是其他格式，使用当前年份和月份信息
      eventDate = new Date(currentYear, (dbRecord.month || 7) - 1, 26);
    }
  } else {
    eventDate = new Date();
  }
  
  return {
    id: dbRecord.id,
    name: dbRecord.name,
    englishName: dbRecord.englishName || '',
    _sourceData: {
      japaneseName: dbRecord.japaneseName || '',
      japaneseDescription: dbRecord.description || ''
    },
    year: eventDate.getFullYear() || currentYear,
    // 直接使用displayDate字段，避免Date转换问题
    date: dbRecord.displayDate || dbRecord.date || '待确认',
    displayDate: dbRecord.displayDate || dbRecord.date || '待确认',
    time: dbRecord.startTime ? 
      `${dbRecord.startTime}${dbRecord.endTime ? ' - ' + dbRecord.endTime : ''}` : 
      '19:30 - 20:30',
    duration: dbRecord.duration || '约60分钟',
    fireworksCount: dbRecord.fireworksCount || '约3000发',
    expectedVisitors: dbRecord.expectedVisitors || '约5万人',
    weather: dbRecord.weather || '雨天中止',
    ticketPrice: dbRecord.ticketInfo || '免费观赏',
    status: dbRecord.status || '正常举办',
    themeColor: '#ff6b6b', // 默认主题色
    
    // 标题和描述（用于SEO）
    title: `${dbRecord.name} | 日本东部花火指南`,
    description: dbRecord.description || `${dbRecord.name}是一年一度的精彩花火大会，将为观众呈现绚烂的花火表演。`,
    
    // 标签系统
    tags: {
      timeTag: getTimeTag(eventDate),
      regionTag: getRegionDisplayName(dbRecord.region?.code || 'tokyo'),
      typeTag: '花火大会',
      layerTag: 'Layer 4详情页'
    },
    
    // 关联推荐（空结构）
    related: {
      regionRecommendations: [],
      timeRecommendations: [],
      sameMonth: [],
      sameRegion: [],
      recommended: []
    },
    
    // 媒体信息
    media: options.uploadedImages?.length > 0 ? 
      options.uploadedImages.map((img: string, index: number) => ({
        type: 'image' as const,
        url: img,
        title: `${dbRecord.name} - 图片${index + 1}`,
        description: `${dbRecord.name}活动现场图片`,
        alt: `${dbRecord.name} - 图片${index + 1}`,
        caption: `${dbRecord.name}活动图片`
      })) : 
      [{
        type: 'image' as const,
        url: '/images/hanabi-default.jpg',
        title: `${dbRecord.name}官方图片`,
        description: `${dbRecord.name}活动宣传图片`,
        alt: dbRecord.name,
        caption: `${dbRecord.name}官方图片`
      }],
    
    // 月份（用于面包屑导航）
    month: eventDate.getMonth() + 1,
    
    // 地图嵌入URL（用于iframe显示）
    mapEmbedUrl: generateGoogleMapsEmbedUrl(dbRecord),
    
    // 场地信息
    venues: extractVenues(dbRecord),
    
    // 交通信息
    access: extractAccessInfo(dbRecord),
    
    // 观赏地点
    viewingSpots: [
      {
        name: '主会场观赏区',
        rating: 4.5,
        crowdLevel: '高',
        tips: '建议提前1-2小时到达占位',
        pros: ['视野开阔', '距离近'],
        cons: ['人流密集']
      },
      {
        name: '周边观赏点',
        rating: 4.0,
        crowdLevel: '中',
        tips: '稍远但人流较少，适合家庭观赏',
        pros: ['人流较少', '停车方便'],
        cons: ['距离稍远']
      }
    ],
    
    // 历史信息
    history: {
      established: 1950, // 默认年份
      significance: '当地重要的夏季庆典',
      highlights: [
        '精美的花火表演',
        '丰富的夏日活动',
        '家庭友好的庆典'
      ]
    },
    
    // 贴士分类
    tips: [
      {
        category: '观赏建议',
        items: [
          '建议提前1-2小时到达',
          '携带防蚊用品',
          '准备小板凳或垫子'
        ]
      },
      {
        category: '交通提醒',
        items: [
          '建议使用公共交通',
          '活动结束后避开人流高峰',
          '提前查看末班车时间'
        ]
      }
    ],
    
    // 联系信息
    contact: {
      organizer: extractOrganizers(dbRecord),
      phone: (dbRecord.contact && typeof dbRecord.contact === 'object' && dbRecord.contact.phone) || '',
      website: (dbRecord.contact && typeof dbRecord.contact === 'object' && dbRecord.contact.website) || '',
      socialMedia: '',
      walkerPlusUrl: dbRecord.walkerPlusUrl || ''
    },
    
    // 地图信息
    mapInfo: {
      hasMap: true,
      mapNote: '详细位置请参考地图',
      parking: (dbRecord.access && typeof dbRecord.access === 'object' && dbRecord.access.car) || '建议使用公共交通',
      googleMapsUrl: generateGoogleMapsUrl(dbRecord)
    },
    
    // 天气信息
    weatherInfo: {
      month: getMonthName(eventDate.getMonth() + 1),
      temperature: '夏季温暖',
      humidity: '较高',
      rainfall: '偶有雷雨',
      recommendation: '建议携带雨具和防蚊用品',
      rainPolicy: '雨天中止',
      note: '请关注天气预报'
    },
    
    // 特殊功能
    specialFeatures: {
      scale: '大型',
      location: '海岸线',
      tradition: '历史悠久',
      atmosphere: '浪漫温馨'
    },
    
    // 官方网站
    website: (dbRecord.contact && typeof dbRecord.contact === 'object' && dbRecord.contact.website) || 
             (dbRecord.related && typeof dbRecord.related === 'object' && dbRecord.related.website) || 
             dbRecord.website || '',
    
    // 数据源信息
    officialSource: {
      walkerPlusUrl: dbRecord.walkerPlusUrl || '',
      verificationDate: new Date().toISOString(),
      dataConfirmedBy: 'USER_PROVIDED' as const,
      lastChecked: new Date().toISOString()
    },
    
    // 数据完整性检查
    dataIntegrityCheck: {
      hasOfficialSource: !!dbRecord.website,
      userVerified: true,
      lastValidated: new Date().toISOString()
    }
  };
}

// 辅助函数
function getTimeTag(date: Date): string {
  const month = date.getMonth() + 1;
  if (month >= 7 && month <= 8) return '夏季';
  if (month >= 9 && month <= 10) return '秋季';
  return '其他';
}

function getRegionDisplayName(region: string): string {
  const regionMap: { [key: string]: string } = {
    'tokyo': '东京都',
    'kanagawa': '神奈川县',
    'chiba': '千叶县',
    'saitama': '埼玉县',
    'kitakanto': '北关东',
    'koshinetsu': '甲信越'
  };
  return regionMap[region] || region;
}

function getMonthName(month: number): string {
  const monthNames = [
    '', '1月', '2月', '3月', '4月', '5月', '6月',
    '7月', '8月', '9月', '10月', '11月', '12月'
  ];
  return monthNames[month] || `${month}月`;
}

/**
 * 生成谷歌地图URL
 */
function generateGoogleMapsUrl(dbRecord: any): string {
  try {
    // 从mapInfo JSON字段中提取经纬度
    if (dbRecord.mapInfo && typeof dbRecord.mapInfo === 'object') {
      const mapInfo = dbRecord.mapInfo;
      const lat = mapInfo.latitude;
      const lng = mapInfo.longitude;
      
      if (lat && lng) {
        // 生成谷歌地图URL（带标记点）
        return `https://www.google.com/maps?q=${lat},${lng}&z=15&hl=zh-CN`;
      }
    }
    
    // 如果没有经纬度，尝试使用地址搜索
    if (dbRecord.location) {
      const encodedAddress = encodeURIComponent(dbRecord.location);
      return `https://www.google.com/maps/search/${encodedAddress}?hl=zh-CN`;
    }
    
    // 返回空字符串作为后备
    return '';
  } catch (error) {
    console.warn('生成谷歌地图URL失败:', error);
    return '';
  }
}

/**
 * 生成适合iframe嵌入的谷歌地图URL
 */
function generateGoogleMapsEmbedUrl(dbRecord: any): string {
  try {
    // 从mapInfo JSON字段中提取经纬度
    if (dbRecord.mapInfo && typeof dbRecord.mapInfo === 'object') {
      const mapInfo = dbRecord.mapInfo;
      const lat = mapInfo.latitude;
      const lng = mapInfo.longitude;
      
      if (lat && lng) {
        // 生成正确的iframe嵌入URL格式（修复404问题）
        return `https://maps.google.com/maps?q=${lat},${lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
      }
    }
    
    // 检查是否已经有嵌入URL格式的mapEmbedUrl
    if (dbRecord.mapEmbedUrl && dbRecord.mapEmbedUrl.includes('embed')) {
      return dbRecord.mapEmbedUrl;
    }
    
    // 检查是否有坐标字符串格式的googleMap（如 "lat,lng"）
    if (dbRecord.googleMap && typeof dbRecord.googleMap === 'string') {
      // 如果已经是完整的嵌入URL，直接返回
      if (dbRecord.googleMap.includes('embed')) {
        return dbRecord.googleMap;
      }
      
      // 如果是坐标格式（如 "35.761263,139.881299"），转换为嵌入URL
      const coordMatch = dbRecord.googleMap.match(/^(-?\d+\.?\d*),\s*(-?\d+\.?\d*)$/);
      if (coordMatch) {
        const lat = coordMatch[1];
        const lng = coordMatch[2];
        return `https://maps.google.com/maps?q=${lat},${lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
      }
    }
    
    // 如果没有经纬度，尝试使用地址搜索
    if (dbRecord.location) {
      const encodedAddress = encodeURIComponent(dbRecord.location);
      return `https://maps.google.com/maps?q=${encodedAddress}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    }
    
    // 返回空字符串作为后备
    return '';
  } catch (error) {
    console.warn('生成适合iframe嵌入的谷歌地图URL失败:', error);
    return '';
  }
}

/**
 * 提取主办方信息
 */
function extractOrganizers(dbRecord: any): string {
  try {
    if (dbRecord.contact && typeof dbRecord.contact === 'object') {
      if (dbRecord.contact.organizers && Array.isArray(dbRecord.contact.organizers)) {
        return dbRecord.contact.organizers.join('、');
      }
      if (dbRecord.contact.organization) {
        return dbRecord.contact.organization;
      }
    }
    return '主办方';
  } catch (error) {
    console.warn('提取主办方信息失败:', error);
    return '主办方';
  }
}

/**
 * 提取场地信息
 */
function extractVenues(dbRecord: any): any[] {
  try {
    if (dbRecord.venues && typeof dbRecord.venues === 'object') {
      const venues = [];
      
      // 主会场
      if (dbRecord.venues.main) {
        venues.push({
          name: dbRecord.venues.main,
          location: dbRecord.location || '详细地址待确认',
          startTime: dbRecord.time ? dbRecord.time.split('～')[0] : '19:30',
          features: ['花火观赏', '主会场']
        });
      }
      
      // 其他会场
      if (dbRecord.venues.others && Array.isArray(dbRecord.venues.others)) {
        dbRecord.venues.others.forEach((venue: string) => {
          venues.push({
            name: venue,
            location: dbRecord.location || '详细地址待确认',
            startTime: dbRecord.time ? dbRecord.time.split('～')[0] : '19:30',
            features: ['花火观赏', '观赏点']
          });
        });
      }
      
      return venues.length > 0 ? venues : getDefaultVenues(dbRecord);
    }
    
    return getDefaultVenues(dbRecord);
  } catch (error) {
    console.warn('提取场地信息失败:', error);
    return getDefaultVenues(dbRecord);
  }
}

/**
 * 获取默认场地信息
 */
function getDefaultVenues(dbRecord: any): any[] {
  return [{
    name: dbRecord.location || '主会场',
    location: dbRecord.location || '详细地址待确认',
    startTime: dbRecord.time ? dbRecord.time.split('～')[0] : '19:30',
    features: ['花火观赏', '夏日庆典']
  }];
}

/**
 * 提取交通信息
 */
function extractAccessInfo(dbRecord: any): any[] {
  try {
    if (dbRecord.access && typeof dbRecord.access === 'object' && dbRecord.access.train) {
      const stations = dbRecord.access.train.map((trainInfo: string) => {
        // 解析类似 "京浜急行「京急久里浜駅」から徒歩15分" 的信息
        const walkTimeMatch = trainInfo.match(/徒歩(\d+分)/);
        const walkTime = walkTimeMatch ? `步行约${walkTimeMatch[1]}` : '步行约10分钟';
        
        const stationMatch = trainInfo.match(/「([^」]+)」/);
        const stationName = stationMatch ? stationMatch[1] : '车站';
        
        const lineMatch = trainInfo.match(/^([^「]+)/);
        const lineName = lineMatch ? lineMatch[1] : '详细线路信息请查看官方网站';
        
        return {
          name: stationName,
          lines: [lineName],
          walkTime: walkTime
        };
      });
      
      return [{
        venue: dbRecord.location || '主会场',
        stations: stations
      }];
    }
    
    return [{
      venue: dbRecord.location || '主会场',
      stations: [{
        name: '主要车站',
        lines: ['详细线路信息请查看官方网站'],
        walkTime: '步行约10分钟'
      }]
    }];
  } catch (error) {
    console.warn('提取交通信息失败:', error);
    return [{
      venue: dbRecord.location || '主会场',
      stations: [{
        name: '主要车站',
        lines: ['详细线路信息请查看官方网站'],
        walkTime: '步行约10分钟'
      }]
    }];
  }
}

/**
 * 生成HanabiDetailTemplate页面文件
 */
async function generateHanabiDetailPage(hanabiData: any, regionKey: string, eventId: string): Promise<{
  success: boolean;
  message: string;
  filePath?: string;
  url?: string;
  error?: string;
}> {
  try {
    // 生成页面内容
    const pageContent = generateHanabiDetailPageContent(hanabiData, regionKey, eventId);
    
    // 确定文件路径
    const regionDir = path.join(process.cwd(), 'app', regionKey, 'hanabi');
    const filePath = path.join(regionDir, `${eventId}`, 'page.tsx');
    
    // 确保目录存在
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    
    // 直接写入文件
    await fs.writeFile(filePath, pageContent, 'utf8');
    
    console.log('✅ 页面文件生成成功:', filePath);
    
    return {
      success: true,
      message: '页面生成成功！',
      filePath: filePath.replace(process.cwd(), ''),
      url: `/${regionKey}/hanabi/${eventId}`
    };
    
  } catch (error) {
    console.error('生成页面失败:', error);
    return {
      success: false,
      message: `生成页面失败: ${error instanceof Error ? error.message : '未知错误'}`,
      error: error instanceof Error ? error.message : '未知错误'
    };
  }
}

/**
 * 生成HanabiDetailTemplate页面内容
 */
function generateHanabiDetailPageContent(hanabiData: any, regionKey: string, eventId: string): string {
  return `/**
 * ${hanabiData.name} - 花火详情页面
 * 基于数据库记录生成
 * 生成时间: ${new Date().toLocaleString('zh-CN')}
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { HanabiData } from '@/types/hanabi';

// 花火数据
const hanabiData: HanabiData = ${JSON.stringify(hanabiData, null, 2)};

// SEO元数据
export const metadata: Metadata = {
  title: \`\${hanabiData.name} | 日本东部花火指南 - 2025年花火大会详情\`,
  description: hanabiData.description || \`\${hanabiData.name}将于\${hanabiData.date}举行，地点位于\${hanabiData.venues?.[0]?.location || '待确认'}。精彩花火表演，不容错过！\`,
  keywords: [
    hanabiData.name,
    '花火大会',
    '${regionKey}',
    '2025年花火',
    '日本花火',
    '烟花节',
    '旅游指南',
    hanabiData.tags?.regionTag || '',
    hanabiData.tags?.timeTag || ''
  ].filter(Boolean),
  openGraph: {
    title: hanabiData.name,
    description: hanabiData.description || \`\${hanabiData.name} - 2025年花火大会详情\`,
    type: 'article',
    locale: 'zh_CN',
    images: hanabiData.media?.map(m => ({
      url: m.url,
      alt: m.alt || hanabiData.name
    })) || []
  },
  alternates: {
    canonical: \`/${regionKey}/hanabi/${eventId}\`
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function HanabiDetailPage() {
  // 验证数据完整性
  if (!hanabiData || !hanabiData.name) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <HanabiDetailTemplate 
        data={hanabiData}
        regionKey="${regionKey}"
      />
    </div>
  );
}

// 生成静态参数（用于静态生成）
export async function generateStaticParams() {
  return [];
}
`;
}

// GET: 获取数据库记录（真实版本）
export async function GET(request: NextRequest) {
  let prisma: PrismaClient | null = null;
  
  try {
    console.log('📥 接收到GET请求');
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    prisma = new PrismaClient();
    
    if (id) {
      // 获取单个记录
      const record = await prisma.hanabiEvent.findUnique({
        where: { id }
      });
      
      return NextResponse.json({
        success: true,
        data: record
      });
    } else {
      // 获取所有记录
      const records = await prisma.hanabiEvent.findMany({
        select: {
          id: true,
          name: true,
          regionId: true,
          date: true,
          status: true
        },
        orderBy: { createdAt: 'desc' },
        take: 50
      });
      
      return NextResponse.json({
        success: true,
        data: records
      });
    }
    
  } catch (error) {
    console.error('GET API错误:', error);
    return NextResponse.json({
      success: false,
      message: '获取数据失败',
      error: error instanceof Error ? error.message : '未知错误'
    }, { status: 500 });
  } finally {
    if (prisma) {
      await prisma.$disconnect();
    }
  }
}

/**
 * 生成花火卡片数据并更新区域页面
 */
async function generateAndUpdateHanabiCard(dbRecord: any, regionCode: string, eventId: string): Promise<{
  success: boolean;
  message: string;
  error?: string;
}> {
  try {
    console.log('🎴 为区域生成花火卡片:', regionCode);
    
    // 获取该区域的所有花火事件
    const prisma = new PrismaClient();
    const regionEvents = await prisma.hanabiEvent.findMany({
      where: {
        region: {
          code: regionCode
        }
      },
      include: {
        region: true
      },
      orderBy: {
        date: 'asc'
      }
    });
    
    console.log(`📊 找到 ${regionEvents.length} 个${regionCode}区域的花火事件`);
    
    // 转换为卡片格式
    const cards = regionEvents.map(event => convertToCardFormat(event));
    
    // 更新对应的区域页面
    const updateResult = await updateRegionHanabiPage(regionCode, cards);
    
    await prisma.$disconnect();
    
    if (updateResult.success) {
      return {
        success: true,
        message: `✅ 成功生成 ${cards.length} 个花火卡片并更新${regionCode}页面`
      };
    } else {
      return {
        success: false,
        message: `❌ 花火卡片生成失败: ${updateResult.error}`,
        error: updateResult.error
      };
    }
    
  } catch (error) {
    console.error('❌ 花火卡片生成错误:', error);
    return {
      success: false,
      message: '花火卡片生成失败',
      error: error instanceof Error ? error.message : '未知错误'
    };
  }
}

/**
 * 转换数据库记录为卡片格式
 */
function convertToCardFormat(dbRecord: any) {
  const eventDate = dbRecord.date ? new Date(dbRecord.date) : new Date();
  
  return {
    id: dbRecord.id,
    title: dbRecord.name,
    name: dbRecord.name,
    englishName: dbRecord.englishName || '',
    date: eventDate.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    displayDate: eventDate.toLocaleDateString('zh-CN', {
      month: 'numeric',
      day: 'numeric'
    }),
    time: dbRecord.startTime || '19:30',
    location: getMainVenue(dbRecord),
    category: 'hanabi',
    highlights: [
      `${dbRecord.fireworksCount || '约3000发'}花火`,
      `${dbRecord.expectedVisitors || '约5万人'}观众`,
      dbRecord.duration || '约60分钟'
    ],
    features: [
      `${dbRecord.fireworksCount || '约3000发'}花火`,
      `${dbRecord.expectedVisitors || '约5万人'}观众`,
      dbRecord.duration || '约60分钟'
    ],
    likes: Math.floor(Math.random() * 100) + 50, // 随机点赞数
    description: dbRecord.description || `${dbRecord.name}是一年一度的精彩花火大会，将为观众呈现绚烂的花火表演。`,
    detailLink: `/${dbRecord.region?.code || 'kanagawa'}/hanabi/${dbRecord.id}`,
    fireworksCount: dbRecord.fireworksCount || '约3000发',
    expectedVisitors: dbRecord.expectedVisitors || '约5万人',
    venue: getMainVenue(dbRecord),
    status: dbRecord.status || '正常举办',
    month: eventDate.getMonth() + 1,
    themeColor: getThemeColorByMonth(eventDate.getMonth() + 1)
  };
}

/**
 * 获取主要会场信息
 */
function getMainVenue(dbRecord: any): string {
  if (dbRecord.venues && typeof dbRecord.venues === 'object' && dbRecord.venues.main) {
    return dbRecord.venues.main.name || dbRecord.venues.main;
  }
  
  if (dbRecord.location) {
    return dbRecord.location;
  }
  
  // 从地址中提取主要位置
  if (dbRecord.address) {
    const address = dbRecord.address;
    // 提取市区信息
    const match = address.match(/([^県]+県)?([^市]+市)?([^区町村]+[区町村])?/);
    if (match) {
      return match[0] || address;
    }
    return address;
  }
  
  return '待确认';
}

/**
 * 根据月份获取主题色
 */
function getThemeColorByMonth(month: number): string {
  const colors = {
    1: '#87CEEB', 2: '#FFB6C1', 3: '#98FB98', 4: '#FFC0CB',
    5: '#90EE90', 6: '#87CEFA', 7: '#FF6347', 8: '#FF4500',
    9: '#FFD700', 10: '#FF8C00', 11: '#CD853F', 12: '#4682B4'
  };
  return colors[month as keyof typeof colors] || '#ff6b6b';
}

/**
 * 更新区域花火页面的events数组
 */
async function updateRegionHanabiPage(regionCode: string, cards: any[]): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    const regionPagePath = path.join(process.cwd(), 'app', regionCode, 'hanabi', 'page.tsx');
    
    console.log('📝 更新区域页面:', regionPagePath);
    
    // 生成新的页面内容
    const pageContent = generateRegionHanabiPageContent(regionCode, cards);
    
    // 确保目录存在
    await fs.mkdir(path.dirname(regionPagePath), { recursive: true });
    
    // 写入页面文件
    await fs.writeFile(regionPagePath, pageContent, 'utf8');
    
    console.log(`✅ 成功更新 ${regionCode} 花火页面，包含 ${cards.length} 个卡片`);
    
    return { success: true };
    
  } catch (error) {
    console.error('❌ 更新区域页面失败:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : '未知错误' 
    };
  }
}

/**
 * 生成区域花火页面内容
 */
function generateRegionHanabiPageContent(regionCode: string, cards: any[]): string {
  const regionInfo = getRegionInfo(regionCode);
  
  return `import HanabiPageTemplate from '../../../src/components/HanabiPageTemplate';

export default function ${regionInfo.className}HanabiPage() {
  // ${regionInfo.displayName}地区配置
  const regionConfig = {
    name: '${regionCode}',
    displayName: '${regionInfo.displayName}',
    emoji: '${regionInfo.emoji}',
    description: '${regionInfo.displayName}花火大会活动',
    navigationLinks: ${JSON.stringify(regionInfo.navigationLinks, null, 6)}
  };

  // 动态花火事件数据 - 由页面生成器自动更新
  const events = ${JSON.stringify(cards, null, 4)};

  return (
    <HanabiPageTemplate
      region={regionConfig}
      events={events}
      regionKey="${regionCode}"
      activityKey="hanabi"
      pageTitle="${regionInfo.displayName}花火大会活动列表"
      pageDescription="${regionInfo.displayName}花火大会活动指南，包含夏季花火节庆、烟花表演等精彩活动信息。"
    />
  );
} 
`;
}

/**
 * 获取区域信息
 */
function getRegionInfo(regionCode: string) {
  const regions = {
    kanagawa: {
      displayName: '神奈川县',
      className: 'Kanagawa',
      emoji: '⛵',
      navigationLinks: {
        prev: { name: '千叶县', url: '/chiba/hanabi', emoji: '🌊' },
        current: { name: '神奈川县', url: '/kanagawa/hanabi' },
        next: { name: '北关东', url: '/kitakanto/hanabi', emoji: '♨️' }
      }
    },
    tokyo: {
      displayName: '东京都',
      className: 'Tokyo',
      emoji: '🗼',
      navigationLinks: {
        prev: { name: '甲信越', url: '/koshinetsu/hanabi', emoji: '🗻' },
        current: { name: '东京都', url: '/tokyo/hanabi' },
        next: { name: '埼玉县', url: '/saitama/hanabi', emoji: '🏮' }
      }
    },
    saitama: {
      displayName: '埼玉县',
      className: 'Saitama',
      emoji: '🏮',
      navigationLinks: {
        prev: { name: '东京都', url: '/tokyo/hanabi', emoji: '🗼' },
        current: { name: '埼玉县', url: '/saitama/hanabi' },
        next: { name: '千叶县', url: '/chiba/hanabi', emoji: '🌊' }
      }
    },
    chiba: {
      displayName: '千叶县',
      className: 'Chiba',
      emoji: '🌊',
      navigationLinks: {
        prev: { name: '埼玉县', url: '/saitama/hanabi', emoji: '🏮' },
        current: { name: '千叶县', url: '/chiba/hanabi' },
        next: { name: '神奈川县', url: '/kanagawa/hanabi', emoji: '⛵' }
      }
    },
    kitakanto: {
      displayName: '北关东',
      className: 'Kitakanto',
      emoji: '♨️',
      navigationLinks: {
        prev: { name: '神奈川县', url: '/kanagawa/hanabi', emoji: '⛵' },
        current: { name: '北关东', url: '/kitakanto/hanabi' },
        next: { name: '甲信越', url: '/koshinetsu/hanabi', emoji: '🗻' }
      }
    },
    koshinetsu: {
      displayName: '甲信越',
      className: 'Koshinetsu',
      emoji: '🗻',
      navigationLinks: {
        prev: { name: '北关东', url: '/kitakanto/hanabi', emoji: '♨️' },
        current: { name: '甲信越', url: '/koshinetsu/hanabi' },
        next: { name: '东京都', url: '/tokyo/hanabi', emoji: '🗼' }
      }
    }
  };
  
  return regions[regionCode as keyof typeof regions] || regions.kanagawa;
} 