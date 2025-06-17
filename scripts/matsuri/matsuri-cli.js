#!/usr/bin/env node

/**
 * 祭典数据管理命令行工具
 * 使用方法：
 * node scripts/matsuri-cli.js update tokyo
 * node scripts/matsuri-cli.js validate all
 * node scripts/matsuri-cli.js stats
 */

import { MatsuriDataService } from '../src/lib/services/matsuri-data-service.ts';
import { MatsuriScheduler } from '../src/lib/scheduler/matsuri-scheduler.ts';

class MatsuriCLI {
  constructor() {
    this.dataService = new MatsuriDataService();
    this.scheduler = new MatsuriScheduler();
  }

  async run() {
    const args = process.argv.slice(2);
    const command = args[0];
    const subcommand = args[1];

    try {
      switch (command) {
        case 'update':
          await this.handleUpdate(subcommand);
          break;
        
        case 'validate':
          await this.handleValidate(subcommand);
          break;
        
        case 'stats':
          await this.handleStats(subcommand);
          break;
        
        case 'search':
          await this.handleSearch(subcommand, args[2]);
          break;
        
        case 'scheduler':
          await this.handleScheduler(subcommand);
          break;
        
        case 'backup':
          await this.handleBackup(subcommand);
          break;
        
        case 'health':
          await this.handleHealth();
          break;
        
        case 'help':
        case '--help':
        case '-h':
          this.showHelp();
          break;
        
        default:
          console.error(`Unknown command: ${command}`);
          this.showHelp();
          process.exit(1);
      }
    } catch (error) {
      console.error('CLI Error:', error.message);
      process.exit(1);
    }
  }

  async handleUpdate(prefecture = 'tokyo') {
    console.log(`🔄 Updating matsuri data for ${prefecture}...`);
    
    try {
      const result = await this.scheduler.manualUpdate(prefecture);
      console.log(`✅ Update completed successfully`);
      
      const stats = await this.dataService.getMatsuriStats(prefecture);
      console.log(`📊 Total events: ${stats.total}`);
      console.log(`📅 Upcoming events: ${stats.upcoming}`);
      console.log(`📈 By category:`, stats.byCategory);
    } catch (error) {
      console.error(`❌ Update failed:`, error.message);
      throw error;
    }
  }

  async handleValidate(prefecture = 'tokyo') {
    if (prefecture === 'all') {
      const prefectures = ['tokyo', 'kanagawa', 'saitama', 'chiba'];
      
      for (const pref of prefectures) {
        await this.validateSingle(pref);
      }
    } else {
      await this.validateSingle(prefecture);
    }
  }

  async validateSingle(prefecture) {
    console.log(`🔍 Validating data for ${prefecture}...`);
    
    try {
      const validation = await this.dataService.validateData(prefecture);
      
      if (validation.isValid) {
        console.log(`✅ ${prefecture} data is valid`);
      } else {
        console.error(`❌ ${prefecture} data validation failed:`);
        validation.errors.forEach(error => console.error(`  - ${error}`));
      }
      
      if (validation.warnings.length > 0) {
        console.warn(`⚠️ ${prefecture} warnings:`);
        validation.warnings.forEach(warning => console.warn(`  - ${warning}`));
      }
    } catch (error) {
      console.error(`❌ Validation error for ${prefecture}:`, error.message);
    }
  }

  async handleStats(prefecture = 'all') {
    console.log('📊 Matsuri Data Statistics');
    console.log('=' .repeat(50));
    
    if (prefecture === 'all') {
      const allStats = await this.scheduler.getDataStats();
      
      Object.entries(allStats).forEach(([pref, stats]) => {
        console.log(`\n📍 ${pref.toUpperCase()}`);
        if (stats.error) {
          console.log(`  ❌ Error: ${stats.error}`);
        } else {
          console.log(`  Total: ${stats.total}`);
          console.log(`  Upcoming: ${stats.upcoming}`);
          console.log(`  Categories:`, stats.byCategory);
          console.log(`  Last Updated: ${new Date(stats.lastUpdated).toLocaleString()}`);
        }
      });
    } else {
      const stats = await this.dataService.getMatsuriStats(prefecture);
      console.log(`\n📍 ${prefecture.toUpperCase()}`);
      console.log(`  Total: ${stats.total}`);
      console.log(`  Upcoming: ${stats.upcoming}`);
      console.log(`  Categories:`, stats.byCategory);
      console.log(`  Last Updated: ${new Date(stats.lastUpdated).toLocaleString()}`);
    }
  }

  async handleSearch(prefecture = 'tokyo', query) {
    if (!query) {
      console.error('❌ Search query is required');
      console.log('Usage: node scripts/matsuri-cli.js search tokyo "神田祭"');
      return;
    }

    console.log(`🔍 Searching for "${query}" in ${prefecture}...`);
    
    try {
      const results = await this.dataService.searchMatsuri(prefecture, query);
      
      if (results.length === 0) {
        console.log('❌ No results found');
        return;
      }

      console.log(`✅ Found ${results.length} results:`);
      results.forEach((event, index) => {
        console.log(`\n${index + 1}. ${event.title}`);
        console.log(`   📅 Date: ${event.date}`);
        console.log(`   📍 Location: ${event.location}`);
        console.log(`   👥 Visitors: ${event.visitors}`);
        console.log(`   ❤️ Likes: ${event.likes}`);
      });
    } catch (error) {
      console.error('❌ Search failed:', error.message);
    }
  }

  async handleScheduler(action) {
    switch (action) {
      case 'start':
        console.log('🚀 Starting scheduler...');
        this.scheduler.start();
        console.log('✅ Scheduler started');
        break;
      
      case 'stop':
        console.log('🛑 Stopping scheduler...');
        this.scheduler.stop();
        console.log('✅ Scheduler stopped');
        break;
      
      case 'status':
        const status = this.scheduler.getStatus();
        console.log('📊 Scheduler Status:');
        console.log(`  Running: ${status.isRunning ? '✅' : '❌'}`);
        console.log(`  Active Tasks: ${status.activeTasks.length}`);
        console.log(`  Tasks: ${status.activeTasks.join(', ')}`);
        break;
      
      default:
        console.error('❌ Invalid scheduler action. Use: start, stop, or status');
    }
  }

  async handleBackup(prefecture = 'tokyo') {
    console.log(`💾 Creating backup for ${prefecture}...`);
    
    try {
      const data = await this.dataService.loadMatsuriData(prefecture);
      const backupData = {
        prefecture,
        timestamp: new Date().toISOString(),
        count: data.length,
        data
      };

      const fs = await import('fs/promises');
      const path = await import('path');
      
      const backupDir = path.default.join(process.cwd(), 'backups');
      await fs.default.mkdir(backupDir, { recursive: true });
      
      const backupFile = path.default.join(backupDir, `${prefecture}-${Date.now()}.json`);
      await fs.default.writeFile(backupFile, JSON.stringify(backupData, null, 2));
      
      console.log(`✅ Backup created: ${backupFile}`);
      console.log(`📊 Backed up ${data.length} events`);
    } catch (error) {
      console.error('❌ Backup failed:', error.message);
    }
  }

  async handleHealth() {
    console.log('🏥 System Health Check');
    console.log('=' .repeat(50));
    
    try {
      // 检查数据文件
      console.log('\n📁 Data Files:');
      const prefectures = ['tokyo', 'kanagawa', 'saitama', 'chiba'];
      
      for (const pref of prefectures) {
        try {
          const data = await this.dataService.loadMatsuriData(pref);
          console.log(`  ✅ ${pref}: ${data.length} events`);
        } catch (error) {
          console.log(`  ❌ ${pref}: ${error.message}`);
        }
      }

      // 检查调度器
      console.log('\n⏰ Scheduler:');
      const schedulerStatus = this.scheduler.getStatus();
      console.log(`  Status: ${schedulerStatus.isRunning ? '✅ Running' : '❌ Stopped'}`);
      console.log(`  Active Tasks: ${schedulerStatus.activeTasks.length}`);

      // 检查系统资源
      console.log('\n💻 System Resources:');
      const memUsage = process.memoryUsage();
      const memUsageMB = Math.round(memUsage.heapUsed / 1024 / 1024);
      console.log(`  Memory: ${memUsageMB}MB`);
      console.log(`  Uptime: ${Math.round(process.uptime() / 3600)}h`);
      console.log(`  Node.js: ${process.version}`);
      console.log(`  Platform: ${process.platform}`);

    } catch (error) {
      console.error('❌ Health check failed:', error.message);
    }
  }

  showHelp() {
    console.log(`
🎌 Matsuri Data Management CLI

Usage: node scripts/matsuri-cli.js <command> [options]

Commands:
  update <prefecture>     Update matsuri data for specified prefecture
                         Default: tokyo
                         
  validate <prefecture>   Validate data integrity
                         Use 'all' to validate all prefectures
                         
  stats [prefecture]      Show data statistics
                         Use 'all' for all prefectures
                         
  search <prefecture> <query>  Search for matsuri events
                              Example: search tokyo "神田祭"
                              
  scheduler <action>      Manage scheduler (start|stop|status)
  
  backup <prefecture>     Create data backup
  
  health                  Perform system health check
  
  help                    Show this help message

Examples:
  node scripts/matsuri-cli.js update tokyo
  node scripts/matsuri-cli.js validate all
  node scripts/matsuri-cli.js stats
  node scripts/matsuri-cli.js search tokyo "祭"
  node scripts/matsuri-cli.js scheduler status
  node scripts/matsuri-cli.js backup tokyo
  node scripts/matsuri-cli.js health
`);
  }
}

// 运行CLI
const cli = new MatsuriCLI();
cli.run().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

export default MatsuriCLI; 