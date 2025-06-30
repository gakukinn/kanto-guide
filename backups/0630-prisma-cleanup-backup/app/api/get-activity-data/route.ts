import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');

    if (!filename) {
      return NextResponse.json(
        { error: '文件名不能为空' },
        { status: 400 }
      );
    }

    // 安全检查：只允许访问recognition-开头的JSON文件
    if (!filename.startsWith('recognition-') || !filename.endsWith('.json')) {
      return NextResponse.json(
        { error: '无效的文件名格式' },
        { status: 400 }
      );
    }

    const filePath = path.join(process.cwd(), 'data', 'activities', filename);
    
    // 检查文件是否存在
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: `文件不存在: ${filename}` },
        { status: 404 }
      );
    }

    // 读取并解析JSON文件
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(fileContent);

    return NextResponse.json(jsonData);

  } catch (error) {
    console.error('读取活动数据失败:', error);
    return NextResponse.json(
      { error: '读取文件失败: ' + (error as Error).message },
      { status: 500 }
    );
  }
} 