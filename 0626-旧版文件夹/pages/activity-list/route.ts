import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../../src/generated/prisma';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    
    if (!type) {
      return NextResponse.json(
        { success: false, error: '缺少活动类型参数' },
        { status: 400 }
      );
    }
    
    const activities = await (prisma as any)[`${type}Event`].findMany({
      select: {
        id: true,
        name: true,
        region: true,
        datetime: true,
        verified: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return NextResponse.json({
      success: true,
      activities
    });
    
  } catch (error) {
    console.error('获取活动列表失败:', error);
    return NextResponse.json(
      { success: false, error: '获取活动列表失败' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 