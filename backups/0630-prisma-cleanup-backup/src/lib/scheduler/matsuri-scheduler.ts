import * as cron from 'node-cron';
import { MatsuriDataService } from '@/lib/services/matsuri-data-service';

export class MatsuriScheduler {
  private dataService: MatsuriDataService;
  private tasks: Map<string, any> = new Map();

  constructor() {
    this.dataService = new MatsuriDataService();
  }

  // 启动所有定时任务
  start() {
    console.log('Starting Matsuri Scheduler...');

    // 每月1日凌晨2点更新数据
    this.scheduleTask('monthly-update', '0 2 1 * *', async () => {
      console.log('Running monthly matsuri data update...');
      await this.updateAllPrefectures();
    });

    // 每月15日凌晨3点进行数据验证
    this.scheduleTask('monthly-validation', '0 3 15 * *', async () => {
      console.log('Running monthly data validation...');
      await this.validateAllData();
    });

    // 每周一凌晨1点检查即将到来的祭典（保持较高频率用于通知）
    this.scheduleTask('weekly-check', '0 1 * * 1', async () => {
      await this.checkUpcomingEvents();
    });

    console.log('Matsuri Scheduler started successfully');
    console.log(
      'Schedule: Monthly updates (1st), validation (15th), weekly upcoming checks (Monday)'
    );
  }

  // 停止所有定时任务
  stop() {
    console.log('Stopping Matsuri Scheduler...');
    this.tasks.forEach((task, name) => {
      task.stop();
      console.log(`Stopped task: ${name}`);
    });
    this.tasks.clear();
    console.log('Matsuri Scheduler stopped');
  }

  // 调度单个任务
  private scheduleTask(
    name: string,
    cronExpression: string,
    callback: () => Promise<void>
  ) {
    const task = cron.schedule(
      cronExpression,
      async () => {
        try {
          console.log(`Executing scheduled task: ${name}`);
          await callback();
          console.log(`Completed scheduled task: ${name}`);
        } catch (error) {
          console.error(
            `Error in scheduled task ${name}:`,
            error instanceof Error ? error.message : String(error)
          );
        }
      },
      {
        timezone: 'Asia/Tokyo',
      }
    );

    this.tasks.set(name, task);
    task.start();
    console.log(`Scheduled task: ${name} with cron: ${cronExpression}`);
  }

  // 更新所有都道府县的数据
  private async updateAllPrefectures() {
    const prefectures = ['tokyo', 'kanagawa', 'saitama', 'chiba'];

    for (const prefecture of prefectures) {
      try {
        console.log(`Updating data for ${prefecture}...`);
        const result = await this.dataService.updateMatsuriData(prefecture);

        if (result.success) {
          console.log(
            `✅ Successfully updated ${prefecture}: ${result.data.length} events`
          );
        } else {
          console.error(`❌ Failed to update ${prefecture}:`, result.errors);
        }

        // 添加延迟避免过于频繁的请求
        await this.delay(5000);
      } catch (error) {
        console.error(
          `Error updating ${prefecture}:`,
          error instanceof Error ? error.message : String(error)
        );
      }
    }
  }

  // 验证所有数据
  private async validateAllData() {
    const prefectures = ['tokyo', 'kanagawa', 'saitama', 'chiba'];

    for (const prefecture of prefectures) {
      try {
        console.log(`Validating data for ${prefecture}...`);
        const validation = await this.dataService.validateData(prefecture);

        if (validation.isValid) {
          console.log(`✅ ${prefecture} data is valid`);
        } else {
          console.error(
            `❌ ${prefecture} data validation failed:`,
            validation.errors
          );
        }

        if (validation.warnings.length > 0) {
          console.warn(`⚠️ ${prefecture} data warnings:`, validation.warnings);
        }
      } catch (error) {
        console.error(
          `Error validating ${prefecture}:`,
          error instanceof Error ? error.message : String(error)
        );
      }
    }
  }

  // 检查即将到来的祭典
  private async checkUpcomingEvents() {
    try {
      const stats = await this.dataService.getMatsuriStats('tokyo');

      if (stats.upcoming > 0) {
        console.log(
          `📅 Found ${stats.upcoming} upcoming matsuri events in Tokyo`
        );
      }

      // 这里可以添加通知逻辑，比如发送邮件或推送通知
    } catch (error) {
      console.error(
        'Error checking upcoming events:',
        error instanceof Error ? error.message : String(error)
      );
    }
  }

  // 手动触发数据更新
  async manualUpdate(prefecture: string = 'tokyo'): Promise<void> {
    console.log(`Manual update triggered for ${prefecture}`);
    try {
      const result = await this.dataService.updateMatsuriData(prefecture);

      if (result.success) {
        console.log(
          `✅ Manual update successful: ${result.data.length} events`
        );
      } else {
        console.error(`❌ Manual update failed:`, result.errors);
      }
    } catch (error) {
      console.error(
        'Manual update error:',
        error instanceof Error ? error.message : String(error)
      );
      throw error;
    }
  }

  // 获取调度器状态
  getStatus(): {
    isRunning: boolean;
    activeTasks: string[];
    nextRuns: Record<string, string>;
  } {
    const activeTasks = Array.from(this.tasks.keys());
    const nextRuns: Record<string, string> = {};

    this.tasks.forEach((task, name) => {
      try {
        // 注意：node-cron 可能没有直接的 getNextRun 方法
        // 这里提供一个基本的实现
        nextRuns[name] = 'Next run time not available';
      } catch (error) {
        nextRuns[name] =
          `Error getting next run time: ${error instanceof Error ? error.message : String(error)}`;
      }
    });

    return {
      isRunning: this.tasks.size > 0,
      activeTasks,
      nextRuns,
    };
  }

  // 延迟函数
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // 获取数据统计
  async getDataStats(): Promise<Record<string, any>> {
    const prefectures = ['tokyo', 'kanagawa', 'saitama', 'chiba'];
    const stats: Record<string, any> = {};

    for (const prefecture of prefectures) {
      try {
        stats[prefecture] = await this.dataService.getMatsuriStats(prefecture);
      } catch (error) {
        stats[prefecture] = {
          error: `Failed to get stats: ${error instanceof Error ? error.message : String(error)}`,
        };
      }
    }

    return stats;
  }
}

// 创建全局调度器实例
export const matsuriScheduler = new MatsuriScheduler();

// 在应用启动时自动启动调度器
if (typeof window === 'undefined') {
  // 只在服务器端运行
  process.on('SIGINT', () => {
    console.log('Received SIGINT, stopping scheduler...');
    matsuriScheduler.stop();
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    console.log('Received SIGTERM, stopping scheduler...');
    matsuriScheduler.stop();
    process.exit(0);
  });
}
