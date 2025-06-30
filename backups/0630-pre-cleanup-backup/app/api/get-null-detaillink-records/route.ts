import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../../src/generated/prisma';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const activityType = searchParams.get('type');

    if (!activityType) {
      return NextResponse.json({ error: '活动类型参数缺失' }, { status: 400 });
    }

    let records = [];

    // 根据活动类型查询对应的表
    switch (activityType) {
      case 'matsuri':
        records = await prisma.matsuriEvent.findMany({
          where: {
            detailLink: null
          },
          select: {
            id: true,
            name: true
          },
          orderBy: {
            id: 'asc'
          }
        });
        break;

      case 'hanami':
        records = await prisma.hanamiEvent.findMany({
          where: {
            detailLink: null
          },
          select: {
            id: true,
            name: true
          },
          orderBy: {
            id: 'asc'
          }
        });
        break;

      case 'hanabi':
        records = await prisma.hanabiEvent.findMany({
          where: {
            detailLink: null
          },
          select: {
            id: true,
            name: true
          },
          orderBy: {
            id: 'asc'
          }
        });
        break;

      case 'momiji':
        records = await prisma.momijiEvent.findMany({
          where: {
            detailLink: null
          },
          select: {
            id: true,
            name: true
          },
          orderBy: {
            id: 'asc'
          }
        });
        break;

      case 'illumination':
        records = await prisma.illuminationEvent.findMany({
          where: {
            detailLink: null
          },
          select: {
            id: true,
            name: true
          },
          orderBy: {
            id: 'asc'
          }
        });
        break;

      case 'culture':
        records = await prisma.cultureEvent.findMany({
          where: {
            detailLink: null
          },
          select: {
            id: true,
            name: true
          },
          orderBy: {
            id: 'asc'
          }
        });
        break;

      default:
        return NextResponse.json({ error: '不支持的活动类型' }, { status: 400 });
    }

    return NextResponse.json({ 
      success: true, 
      records,
      count: records.length 
    });

  } catch (error) {
    console.error('获取记录失败:', error);
    return NextResponse.json({ 
      error: '获取记录失败', 
      details: error instanceof Error ? error.message : '未知错误' 
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
} 