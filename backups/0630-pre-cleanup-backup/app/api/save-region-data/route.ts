import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { region, activity, events } = await request.json();

    // 验证参数
    if (!region || !activity || !Array.isArray(events)) {
      return NextResponse.json(
        { error: '参数无效' },
        { status: 400 }
      );
    }

    // 构建文件路径
    const filePath = path.join(process.cwd(), 'data', 'regions', region, `${activity}.json`);
    
    // 确保目录存在
    const dirPath = path.dirname(filePath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    // 保存数据
    fs.writeFileSync(filePath, JSON.stringify(events, null, 2), 'utf-8');

    return NextResponse.json({ 
      success: true, 
      message: `已保存到 ${region}/${activity}.json`,
      eventCount: events.length 
    });

  } catch (error) {
    console.error('保存失败:', error);
    return NextResponse.json(
      { error: '保存失败: ' + (error as Error).message },
      { status: 500 }
    );
  }
} 