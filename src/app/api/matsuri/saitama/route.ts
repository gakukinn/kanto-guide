import { NextResponse } from 'next/server';
import matsuriData from '../../../../data/saitama-matsuri.json';

// 静态导出配置
export const dynamic = 'force-static';

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: matsuriData,
      count: matsuriData.length,
      region: 'saitama',
      prefecture: '埼玉県',
    });
  } catch (error) {
    console.error('Error loading Saitama matsuri data:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to load matsuri data',
        data: [],
        count: 0,
      },
      { status: 500 }
    );
  }
}
