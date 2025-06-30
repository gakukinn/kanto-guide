import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../../src/generated/prisma';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { activityId, type } = await request.json();
    
    if (!activityId || !type) {
      return NextResponse.json(
        { success: false, error: '缺少必要参数' },
        { status: 400 }
      );
    }
    
    // 查找活动
    const activity = await (prisma as any)[`${type}Event`].findUnique({
      where: { id: activityId }
    });
    
    if (!activity) {
      return NextResponse.json(
        { success: false, error: '未找到活动记录' },
        { status: 404 }
      );
    }
    
    // 删除活动
    await (prisma as any)[`${type}Event`].delete({
      where: { id: activityId }
    });
    
    return NextResponse.json({
      success: true,
      message: '活动删除成功'
    });
    
  } catch (error) {
    console.error('删除活动失败:', error);
    return NextResponse.json(
      { success: false, error: '删除活动失败' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 