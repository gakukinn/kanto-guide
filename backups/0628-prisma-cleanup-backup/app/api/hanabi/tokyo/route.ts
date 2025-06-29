import { NextResponse } from 'next/server';
import { PrismaClient } from '../../../../src/generated/prisma';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // 获取东京地区
    const tokyoRegion = await prisma.region.findFirst({
      where: {
        code: 'tokyo'
      }
    });

    if (!tokyoRegion) {
      return NextResponse.json({ error: 'Tokyo region not found' }, { status: 404 });
    }

    // 获取东京花火活动
    const events = await prisma.hanabiEvent.findMany({
      where: {
        regionId: tokyoRegion.id
      },
      orderBy: [
        { datetime: 'asc' }
      ]
    });

    return NextResponse.json({
      region: {
        code: tokyoRegion.code,
        name: tokyoRegion.nameCn,
        nameJp: tokyoRegion.nameJp
      },
      events: events,
      total: events.length
    });
  } catch (error) {
    console.error('Error fetching Tokyo hanabi events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' }, 
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 