import { NextResponse } from 'next/server';
import { PrismaClient } from '../../../../src/generated/prisma';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // 获取千叶地区
    const chibaRegion = await prisma.region.findFirst({
      where: {
        code: 'chiba'
      }
    });

    if (!chibaRegion) {
      return NextResponse.json({ error: 'Chiba region not found' }, { status: 404 });
    }

    // 获取千叶花火活动
    const events = await prisma.hanabiEvent.findMany({
      where: {
        regionId: chibaRegion.id
      },
      orderBy: [
        { datetime: 'asc' }
      ]
    });

    return NextResponse.json({
      region: {
        code: chibaRegion.code,
        name: chibaRegion.nameCn,
        nameJp: chibaRegion.nameJp
      },
      events: events,
      total: events.length
    });
  } catch (error) {
    console.error('Error fetching Chiba hanabi events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' }, 
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 