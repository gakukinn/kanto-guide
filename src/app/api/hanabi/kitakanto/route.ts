import { NextResponse } from 'next/server';
import hanabiData from '@/data/kitakanto-hanabi.json';

// 静态导出配置
export const dynamic = 'force-static';

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      count: hanabiData.events.length, // 动态计算数量，避免手动维护
      data: hanabiData.events,
    });
  } catch (error) {
    console.error('北关东花火API错误:', error);
    return NextResponse.json(
      {
        success: false,
        error: '数据获取失败',
      },
      { status: 500 }
    );
  }
}
