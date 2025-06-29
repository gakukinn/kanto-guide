import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const activitiesDir = path.join(process.cwd(), 'data', 'activities');
    
    // 检查目录是否存在
    if (!fs.existsSync(activitiesDir)) {
      return NextResponse.json({ files: [] });
    }

    // 读取所有recognition-*.json文件
    const files = fs.readdirSync(activitiesDir)
      .filter(file => file.startsWith('recognition-') && file.endsWith('.json'))
      .sort();

    return NextResponse.json({ 
      files,
      count: files.length 
    });

  } catch (error) {
    console.error('获取文件列表失败:', error);
    return NextResponse.json(
      { error: '获取文件列表失败: ' + (error as Error).message },
      { status: 500 }
    );
  }
} 