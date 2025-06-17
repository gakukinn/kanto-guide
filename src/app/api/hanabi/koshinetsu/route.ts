/**
 * 甲信越花火数据API路由
 * 提供甲信越地区(山梨、长野、新潟)花火大会数据
 * 数据源：官方数据源 (ar0400)
 */

import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// 静态导出配置
export const dynamic = 'force-static';

export async function GET(request: NextRequest) {
  try {
    // 读取甲信越花火数据文件
    const dataPath = path.join(
      process.cwd(),
      'src/data/koshinetsu-hanabi.json'
    );
    const jsonData = fs.readFileSync(dataPath, 'utf8');
    const data = JSON.parse(jsonData);

    // 添加CORS头
    const response = NextResponse.json(data, { status: 200 });
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

    return response;
  } catch (error) {
    console.error('甲信越花火数据API错误:', error);
    return NextResponse.json(
      {
        error: '无法加载甲信越花火数据',
        message: error instanceof Error ? error.message : '未知错误',
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
