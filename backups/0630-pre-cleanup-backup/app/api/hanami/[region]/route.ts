import { NextResponse } from 'next/server';
import { PrismaClient } from '../../../../src/generated/prisma';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ region: string }> }
) {
  try {
    // 等待参数解析
    const { region: regionCode } = await params;
    
    // 获取地区信息
    const region = await prisma.region.findFirst({
      where: {
        code: regionCode
      }
    });

    if (!region) {
      return NextResponse.json({ error: 'Region not found' }, { status: 404 });
    }

    // 获取该地区的花见活动
    const events = await prisma.hanamiEvent.findMany({
      where: {
        regionId: region.id
      },
      orderBy: [
        { name: 'asc' }
      ]
    });

    return NextResponse.json({
      region: {
        code: region.code,
        name: region.nameCn,
        nameJp: region.nameJp
      },
      events: events,
      total: events.length
    });
  } catch (error) {
    console.error(`Error fetching hanami events:`, error);
    return NextResponse.json(
      { error: 'Failed to fetch events' }, 
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 