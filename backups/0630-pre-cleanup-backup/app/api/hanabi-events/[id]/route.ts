import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../../../src/generated/prisma';

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }

    // 从数据库获取花火大会数据
    const hanabiEvent = await prisma.hanabiEvent.findUnique({
      where: { id: id }
    });

    if (!hanabiEvent) {
      return NextResponse.json(
        { error: 'Hanabi event not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(hanabiEvent);
    
  } catch (error) {
    console.error('Error fetching hanabi event:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 