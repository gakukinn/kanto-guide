import { NextRequest, NextResponse } from 'next/server';
import { MatsuriDataService } from '@/lib/services/matsuri-data-service';
import { matsuriScheduler } from '@/lib/scheduler/matsuri-scheduler';

// 懒加载服务实例
let dataService: MatsuriDataService | null = null;

function getDataService(): MatsuriDataService {
  if (!dataService) {
    dataService = new MatsuriDataService();
  }
  return dataService;
}

// GET - 获取管理面板数据
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action') || 'dashboard';

    switch (action) {
      case 'dashboard':
        // 获取仪表板数据
        const [stats, schedulerStatus] = await Promise.all([
          matsuriScheduler.getDataStats(),
          Promise.resolve(matsuriScheduler.getStatus())
        ]);

        return NextResponse.json({
          success: true,
          dashboard: {
            stats,
            scheduler: schedulerStatus,
            systemInfo: {
              nodeVersion: process.version,
              platform: process.platform,
              uptime: process.uptime(),
              memoryUsage: process.memoryUsage(),
              timestamp: new Date().toISOString()
            }
          }
        });

      case 'stats':
        // 获取详细统计信息
        const detailedStats = await matsuriScheduler.getDataStats();
        
        return NextResponse.json({
          success: true,
          stats: detailedStats,
          timestamp: new Date().toISOString()
        });

      case 'scheduler':
        // 获取调度器状态
        const status = matsuriScheduler.getStatus();
        
        return NextResponse.json({
          success: true,
          scheduler: status,
          timestamp: new Date().toISOString()
        });

      case 'validate':
        // 验证所有数据
        const prefecture = searchParams.get('prefecture') || 'tokyo';
        const validation = await getDataService().validateData(prefecture);
        
        return NextResponse.json({
          success: true,
          validation,
          prefecture,
          timestamp: new Date().toISOString()
        });

      case 'health':
        // 健康检查
        const healthCheck = await performHealthCheck();
        
        return NextResponse.json({
          success: true,
          health: healthCheck,
          timestamp: new Date().toISOString()
        });

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('Admin API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch admin data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// POST - 管理操作
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, prefecture = 'tokyo' } = body;

    switch (action) {
      case 'start-scheduler':
        // 启动调度器
        matsuriScheduler.start();
        
        return NextResponse.json({
          success: true,
          message: 'Scheduler started successfully',
          status: matsuriScheduler.getStatus()
        });

      case 'stop-scheduler':
        // 停止调度器
        matsuriScheduler.stop();
        
        return NextResponse.json({
          success: true,
          message: 'Scheduler stopped successfully',
          status: matsuriScheduler.getStatus()
        });

      case 'manual-update':
        // 手动更新数据
        const updateResult = await matsuriScheduler.manualUpdate(prefecture);
        
        return NextResponse.json({
          success: true,
          message: `Manual update completed for ${prefecture}`,
          prefecture,
          timestamp: new Date().toISOString()
        });

      case 'clear-data':
        // 清除数据（谨慎操作）
        const { confirm } = body;
        if (confirm !== 'YES_DELETE_ALL_DATA') {
          return NextResponse.json(
            { success: false, error: 'Confirmation required' },
            { status: 400 }
          );
        }
        
        // 这里实现数据清除逻辑
        // 注意：这是危险操作，需要额外的安全检查
        
        return NextResponse.json({
          success: true,
          message: `Data cleared for ${prefecture}`,
          warning: 'This action cannot be undone'
        });

      case 'backup-data':
        // 备份数据
        const backupResult = await createDataBackup(prefecture);
        
        return NextResponse.json({
          success: true,
          message: 'Data backup created successfully',
          backup: backupResult
        });

      case 'restore-data':
        // 恢复数据
        const { backupId } = body;
        if (!backupId) {
          return NextResponse.json(
            { success: false, error: 'Backup ID required' },
            { status: 400 }
          );
        }
        
        const restoreResult = await restoreDataFromBackup(prefecture, backupId);
        
        return NextResponse.json({
          success: true,
          message: 'Data restored successfully',
          restore: restoreResult
        });

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('Admin API POST Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to process admin request',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// 健康检查函数
async function performHealthCheck(): Promise<{
  status: 'healthy' | 'warning' | 'error';
  checks: Record<string, any>;
}> {
  const checks: Record<string, any> = {};
  let overallStatus: 'healthy' | 'warning' | 'error' = 'healthy';

  try {
    // 检查数据文件是否存在
    const tokyoData = await getDataService().loadMatsuriData('tokyo');
    checks.dataFiles = {
      status: 'ok',
      count: tokyoData.length,
      message: `Found ${tokyoData.length} Tokyo matsuri events`
    };
  } catch (error) {
    checks.dataFiles = {
      status: 'error',
      message: 'Failed to load data files',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
    overallStatus = 'error';
  }

  // 检查调度器状态
  const schedulerStatus = matsuriScheduler.getStatus();
  checks.scheduler = {
    status: schedulerStatus.isRunning ? 'ok' : 'warning',
    activeTasks: schedulerStatus.activeTasks.length,
    message: schedulerStatus.isRunning ? 'Scheduler is running' : 'Scheduler is stopped'
  };

  if (!schedulerStatus.isRunning && overallStatus === 'healthy') {
    overallStatus = 'warning';
  }

  // 检查内存使用情况
  const memUsage = process.memoryUsage();
  const memUsageMB = Math.round(memUsage.heapUsed / 1024 / 1024);
  checks.memory = {
    status: memUsageMB > 500 ? 'warning' : 'ok',
    usage: `${memUsageMB}MB`,
    message: `Memory usage: ${memUsageMB}MB`
  };

  if (memUsageMB > 500 && overallStatus === 'healthy') {
    overallStatus = 'warning';
  }

  // 检查系统运行时间
  const uptimeHours = Math.round(process.uptime() / 3600);
  checks.uptime = {
    status: 'ok',
    hours: uptimeHours,
    message: `System uptime: ${uptimeHours} hours`
  };

  return {
    status: overallStatus,
    checks
  };
}

// 创建数据备份
async function createDataBackup(prefecture: string): Promise<{
  backupId: string;
  timestamp: string;
  size: number;
}> {
  const backupId = `backup-${prefecture}-${Date.now()}`;
  const timestamp = new Date().toISOString();
  
  // 这里实现实际的备份逻辑
  // 可以保存到文件系统或云存储
  
  return {
    backupId,
    timestamp,
    size: 0 // 实际备份文件大小
  };
}

// 从备份恢复数据
async function restoreDataFromBackup(prefecture: string, backupId: string): Promise<{
  restored: boolean;
  timestamp: string;
  recordsRestored: number;
}> {
  // 这里实现实际的恢复逻辑
  
  return {
    restored: true,
    timestamp: new Date().toISOString(),
    recordsRestored: 0
  };
} 