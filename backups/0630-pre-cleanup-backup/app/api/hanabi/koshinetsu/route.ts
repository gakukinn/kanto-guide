import { NextResponse } from 'next/server';
import { PrismaClient } from '../../../../src/generated/prisma';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // 获取甲信越地区
    const koshinetsuRegion = await prisma.region.findFirst({
      where: {
        code: 'koshinetsu'
      }
    });

    if (!koshinetsuRegion) {
      return NextResponse.json({ error: 'Koshinetsu region not found' }, { status: 404 });
    }

    // 获取甲信越花火活动
    const events = await prisma.hanabiEvent.findMany({
      where: {
        regionId: koshinetsuRegion.id
      },
      orderBy: [
        { datetime: 'asc' }
      ]
    });

    return NextResponse.json({
      region: {
        code: koshinetsuRegion.code,
        name: koshinetsuRegion.nameCn,
        nameJp: koshinetsuRegion.nameJp
      },
      events: events,
      total: events.length
    });
  } catch (error) {
    console.error('Error fetching Koshinetsu hanabi events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' }, 
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 