import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    // 获取查询参数
    const { searchParams } = new URL(request.url);
    const month = searchParams.get('month');
    const featured = searchParams.get('featured');
    
    // 构建查询条件
    const whereClause: any = {
      regionRef: {
        code: 'ar0314' // 神奈川的区域代码
      }
    };

    // 如果指定了月份，添加月份筛选
    if (month) {
      whereClause.month = parseInt(month);
    }

    // 如果指定了featured，添加featured筛选
    if (featured === 'true') {
      whereClause.featured = true;
    }

    // 从数据库获取神奈川花火活动
    const hanabiEvents = await prisma.hanabiEvent.findMany({
      where: whereClause,
      include: {
        regionRef: true
      },
      orderBy: [
        { datetime: 'asc' }
      ]
    });

    // 转换数据格式以符合前端需求，使用Prisma实际字段
    const formattedEvents = hanabiEvents.map(event => ({
      id: event.id,
      name: event.name,
      date: event.datetime, // 使用实际的datetime字段
      venue: event.venue,
      address: event.address,
      access: event.access,
      organizer: event.organizer,
      price: event.price,
      contact: event.contact,
      website: event.website,
      googleMap: event.googleMap,
      region: {
        code: event.regionRef.code,
        name: event.regionRef.nameCn,
        nameJp: event.regionRef.nameJp
      }
    }));

    // 返回成功响应
    return NextResponse.json({
      success: true,
      data: formattedEvents,
      count: formattedEvents.length,
      region: 'kanagawa',
      regionName: '神奈川县',
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('神奈川花火API错误:', error);
    
    return NextResponse.json({
      success: false,
      error: '获取神奈川花火数据失败',
      message: error instanceof Error ? error.message : '未知错误'
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
} 