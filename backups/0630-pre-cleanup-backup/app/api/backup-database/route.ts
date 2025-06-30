import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    // 检查备份目录是否存在，不存在则创建
    const backupDir = path.join(process.cwd(), 'backups');
    try {
      await fs.access(backupDir);
    } catch {
      await fs.mkdir(backupDir, { recursive: true });
    }

    // 生成备份文件名（包含时间戳）
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    const backupFileName = `dev-${timestamp}.db`;
    const backupPath = path.join(backupDir, backupFileName);

    // 源数据库路径
    const sourceDbPath = path.join(process.cwd(), 'prisma', 'dev.db');

    // 检查源数据库是否存在
    try {
      await fs.access(sourceDbPath);
    } catch {
      return NextResponse.json(
        { success: false, error: '源数据库文件不存在' },
        { status: 404 }
      );
    }

    // 复制数据库文件
    await fs.copyFile(sourceDbPath, backupPath);

    // 验证备份文件是否创建成功
    try {
      const stats = await fs.stat(backupPath);
      if (stats.size > 0) {
        return NextResponse.json({
          success: true,
          backupFile: backupFileName,
          backupPath: `backups/${backupFileName}`,
          size: Math.round(stats.size / 1024) + ' KB',
          timestamp: new Date().toISOString()
        });
      } else {
        return NextResponse.json(
          { success: false, error: '备份文件创建失败（文件大小为0）' },
          { status: 500 }
        );
      }
    } catch {
      return NextResponse.json(
        { success: false, error: '备份文件验证失败' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('数据库备份错误:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : '未知错误' 
      },
      { status: 500 }
    );
  }
} 