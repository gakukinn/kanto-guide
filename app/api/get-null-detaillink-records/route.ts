import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const activityType = searchParams.get('type');
    const region = searchParams.get('region');

    if (!activityType) {
      return NextResponse.json({ error: '活动类型参数缺失' }, { status: 400 });
    }

    // 读取活动数据目录
    const activitiesDir = path.join(process.cwd(), 'data', 'activities');
    
    let files: string[];
    try {
      files = await fs.readdir(activitiesDir);
    } catch (error) {
      console.error('读取活动目录失败:', error);
      return NextResponse.json({ 
        success: true, 
        records: [],
        count: 0 
      });
    }

    const jsonFiles = files.filter(file => file.endsWith('.json'));
    const records = [];

    // 读取并筛选JSON文件
    for (const file of jsonFiles) {
      try {
        const filePath = path.join(activitiesDir, file);
        const content = await fs.readFile(filePath, 'utf-8');
        const activityData = JSON.parse(content);

        // 按活动类型筛选
        if (activityData.activityType === activityType) {
          // 如果指定了地区，也要按地区筛选
          if (!region || activityData.region === region) {
            records.push({
              id: activityData.id,
              name: activityData.name
            });
          }
        }
      } catch (error) {
        console.error(`读取文件 ${file} 失败:`, error);
        // 跳过损坏的文件，继续处理其他文件
        continue;
      }
    }

    // 按ID排序
    records.sort((a, b) => a.id.localeCompare(b.id));

    return NextResponse.json({ 
      success: true, 
      records,
      count: records.length 
    });

  } catch (error) {
    console.error('获取记录失败:', error);
    return NextResponse.json({ 
      error: '获取记录失败', 
      details: error instanceof Error ? error.message : '未知错误' 
    }, { status: 500 });
  }
} 