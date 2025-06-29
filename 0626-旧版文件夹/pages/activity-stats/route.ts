import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../../src/generated/prisma';

const prisma = new PrismaClient();

const ACTIVITY_TYPES = {
  hanabi: '花火大会',
  matsuri: '传统祭典',
  hanami: '花见会',
  momiji: '红叶狩',
  illumination: '灯光秀',
  culture: '文艺术'
};

export async function GET() {
  try {
    const stats = [];
    
    for (const [type, name] of Object.entries(ACTIVITY_TYPES)) {
      try {
        const count = await (prisma as any)[`${type}Event`].count();
        stats.push({
          type,
          name,
          count
        });
      } catch (error) {
        console.error(`获取${name}统计失败:`, error);
        stats.push({
          type,
          name,
          count: 0
        });
      }
    }
    
    return NextResponse.json({
      success: true,
      stats
    });
    
  } catch (error) {
    console.error('获取活动统计失败:', error);
    return NextResponse.json(
      { success: false, error: '获取统计失败' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 