import { NextResponse } from 'next/server';
import { PrismaClient } from '../../../../src/generated/prisma';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // 获取埼玉地区
    const saitamaRegion = await prisma.region.findFirst({
      where: {
        code: 'saitama'
      }
    });

    if (!saitamaRegion) {
      return NextResponse.json({ error: 'Saitama region not found' }, { status: 404 });
    }

    // 获取埼玉花火活动
    const events = await prisma.hanabiEvent.findMany({
      where: {
        regionId: saitamaRegion.id
      },
      orderBy: [
        { datetime: 'asc' }
      ]
    });

    return NextResponse.json({
      region: {
        code: saitamaRegion.code,
        name: saitamaRegion.nameCn,
        nameJp: saitamaRegion.nameJp
      },
      events: events,
      total: events.length
    });
  } catch (error) {
    console.error('Error fetching Saitama hanabi events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' }, 
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 