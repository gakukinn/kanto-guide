import { NextRequest, NextResponse } from 'next/server';
import { MatsuriDataService } from '@/lib/services/matsuri-data-service';
import { matsuriScheduler } from '@/lib/scheduler/matsuri-scheduler';
import fs from 'fs';
import path from 'path';

// 懒加载服务实例
let dataService: MatsuriDataService | null = null;

function getDataService(): MatsuriDataService {
  if (!dataService) {
    dataService = new MatsuriDataService();
  }
  return dataService;
}

// GET - 获取祭典数据
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const prefecture = searchParams.get('prefecture') || 'tokyo';
    
    // 读取祭典数据文件
    const dataPath = path.join(process.cwd(), 'public', 'data', `${prefecture}-matsuri-data.json`);
    
    if (!fs.existsSync(dataPath)) {
      return NextResponse.json({
        error: 'Data file not found',
        prefecture,
        events: []
      }, { status: 404 });
    }
    
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    
    return NextResponse.json({
      ...data,
      status: 'success',
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error loading matsuri data:', error);
    return NextResponse.json({
      error: 'Failed to load matsuri data',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// POST - 更新祭典数据
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, prefecture = 'tokyo' } = body;

    switch (action) {
      case 'update':
        // 手动触发数据更新
        await matsuriScheduler.manualUpdate(prefecture);
        
        const updatedData = await getDataService().loadMatsuriData(prefecture);
        
        return NextResponse.json({
          success: true,
          message: `Successfully updated ${prefecture} matsuri data`,
          count: updatedData.length,
          timestamp: new Date().toISOString()
        });

      case 'validate':
        // 验证数据完整性
        const validation = await getDataService().validateData(prefecture);
        
        return NextResponse.json({
          success: true,
          validation,
          timestamp: new Date().toISOString()
        });

      case 'like':
        // 更新点赞数
        const { eventId, likes } = body;
        if (!eventId || typeof likes !== 'number') {
          return NextResponse.json(
            { success: false, error: 'Missing eventId or likes parameter' },
            { status: 400 }
          );
        }
        
        await getDataService().updateLikes(prefecture, eventId, likes);
        
        return NextResponse.json({
          success: true,
          message: 'Likes updated successfully',
          eventId,
          likes
        });

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('API POST Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to process request',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 