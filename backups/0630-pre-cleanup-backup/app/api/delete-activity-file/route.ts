import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { eventId } = await request.json();

    if (!eventId) {
      return NextResponse.json(
        { error: '事件ID不能为空' },
        { status: 400 }
      );
    }

    // 构建JSON文件路径
    const jsonFilePath = path.join(process.cwd(), 'data', 'activities', `${eventId}.json`);
    
    // 构建四层页面目录路径（需要从eventId提取信息）
    const activityId = eventId.split('-').pop(); // 获取时间戳部分
    
    // 删除JSON文件
    if (fs.existsSync(jsonFilePath)) {
      fs.unlinkSync(jsonFilePath);
    }

    // 查找并删除对应的四层页面目录
    const appDir = path.join(process.cwd(), 'app');
    const regions = ['tokyo', 'saitama', 'chiba', 'kanagawa', 'kitakanto', 'koshinetsu'];
    const activities = ['hanabi', 'hanami', 'matsuri'];
    
    for (const region of regions) {
      for (const activity of activities) {
        const pagePath = path.join(appDir, region, activity, `activity-${activityId}`);
        if (fs.existsSync(pagePath)) {
          // 递归删除目录
          fs.rmSync(pagePath, { recursive: true, force: true });
          console.log(`删除页面目录: ${pagePath}`);
        }
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: `已删除活动 ${eventId}`,
      deletedFiles: {
        json: jsonFilePath,
        activityId: activityId
      }
    });

  } catch (error) {
    console.error('删除失败:', error);
    return NextResponse.json(
      { error: '删除失败: ' + (error as Error).message },
      { status: 500 }
    );
  }
} 