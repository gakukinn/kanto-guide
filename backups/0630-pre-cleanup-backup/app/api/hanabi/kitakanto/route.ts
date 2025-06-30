import { NextResponse } from 'next/server';
import { PrismaClient } from '../../../../src/generated/prisma';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // 获取北关东地区
    const kitakantoRegion = await prisma.region.findFirst({
      where: {
        code: 'kitakanto'
      }
    });

    if (!kitakantoRegion) {
      return NextResponse.json({ error: 'Kitakanto region not found' }, { status: 404 });
    }

    // 获取北关东花火活动（此地区没有数据）
    const events = await prisma.hanabiEvent.findMany({
      where: {
        regionId: kitakantoRegion.id
      },
      orderBy: [
        { datetime: 'asc' }
      ]
    });

    return NextResponse.json({
      region: {
        code: kitakantoRegion.code,
        name: kitakantoRegion.nameCn,
        nameJp: kitakantoRegion.nameJp
      },
      events: events,
      total: events.length
    });
  } catch (error) {
    console.error('Error fetching Kitakanto hanabi events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' }, 
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 