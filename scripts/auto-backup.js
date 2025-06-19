#!/usr/bin/env node

/**
 * 自动备份脚本 - 防止工作丢失
 * 在重要操作前自动创建Git安全点
 */

import { execSync } from 'child_process';

class AutoBackup {
  constructor() {
    this.timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    this.backupBranch = `backup-${this.timestamp}`;
  }

  // 检查是否有未提交的更改
  hasUncommittedChanges() {
    try {
      const status = execSync('git status --porcelain', { encoding: 'utf8' });
      return status.trim().length > 0;
    } catch (error) {
      console.error('❌ Git状态检查失败:', error.message);
      return false;
    }
  }

  // 创建自动备份
  createBackup(message = '自动备份') {
    try {
      console.log('🔄 开始创建自动备份...');

      // 1. 检查当前状态
      if (!this.hasUncommittedChanges()) {
        console.log('✅ 没有未提交的更改，无需备份');
        return true;
      }

      // 2. 创建备份分支
      execSync(`git checkout -b ${this.backupBranch}`, { stdio: 'inherit' });
      console.log(`📦 创建备份分支: ${this.backupBranch}`);

      // 3. 添加所有更改
      execSync('git add .', { stdio: 'inherit' });

      // 4. 提交备份（跳过hooks避免commitlint问题）
      const commitMessage = `${message} - ${this.timestamp}`;
      execSync(`git commit -m "${commitMessage}" --no-verify`, {
        stdio: 'inherit',
      });

      // 5. 切回主分支
      execSync('git checkout main', { stdio: 'inherit' });

      console.log('✅ 自动备份创建成功!');
      console.log(`🎯 备份分支: ${this.backupBranch}`);
      console.log(`📋 提交信息: ${commitMessage}`);

      return true;
    } catch (error) {
      console.error('❌ 自动备份失败:', error.message);

      // 尝试回到主分支
      try {
        execSync('git checkout main', { stdio: 'inherit' });
      } catch (cleanupError) {
        console.error('⚠️ 清理失败，请手动切换到主分支');
      }

      return false;
    }
  }

  // 列出所有备份分支
  listBackups() {
    try {
      const branches = execSync('git branch --list "backup-*"', {
        encoding: 'utf8',
      });
      if (branches.trim()) {
        console.log('📦 现有备份分支:');
        console.log(branches);
      } else {
        console.log('📝 暂无备份分支');
      }
    } catch (error) {
      console.error('❌ 列出备份失败:', error.message);
    }
  }

  // 清理旧备份（保留最近10个）
  cleanOldBackups() {
    try {
      const branches = execSync(
        'git branch --list "backup-*" --sort=-refname',
        { encoding: 'utf8' }
      )
        .split('\n')
        .map(branch => branch.trim().replace('* ', ''))
        .filter(branch => branch.startsWith('backup-'));

      if (branches.length > 10) {
        console.log(
          `🧹 清理旧备份 (保留最近10个，删除${branches.length - 10}个旧备份)`
        );

        const toDelete = branches.slice(10);
        toDelete.forEach(branch => {
          execSync(`git branch -D ${branch}`, { stdio: 'inherit' });
          console.log(`🗑️ 删除旧备份: ${branch}`);
        });
      }
    } catch (error) {
      console.error('❌ 清理备份失败:', error.message);
    }
  }

  // 恢复备份
  restoreBackup(backupBranch) {
    try {
      console.log(`🔄 恢复备份: ${backupBranch}`);

      // 检查备份分支是否存在
      execSync(`git show-ref --verify refs/heads/${backupBranch}`, {
        stdio: 'pipe',
      });

      // 切换到备份分支
      execSync(`git checkout ${backupBranch}`, { stdio: 'inherit' });

      // 创建新的工作分支
      const restoreBranch = `restore-${Date.now()}`;
      execSync(`git checkout -b ${restoreBranch}`, { stdio: 'inherit' });

      console.log(`✅ 备份已恢复到新分支: ${restoreBranch}`);
      console.log('💡 请检查文件后决定是否合并到主分支');
    } catch (error) {
      console.error('❌ 恢复备份失败:', error.message);
    }
  }
}

// 命令行接口
const command = process.argv[2];
const backup = new AutoBackup();

switch (command) {
  case 'create':
    const message = process.argv[3] || '手动备份';
    backup.createBackup(message);
    break;

  case 'list':
    backup.listBackups();
    break;

  case 'clean':
    backup.cleanOldBackups();
    break;

  case 'restore':
    const branchName = process.argv[3];
    if (!branchName) {
      console.error('❌ 请指定要恢复的备份分支名');
      process.exit(1);
    }
    backup.restoreBackup(branchName);
    break;

  default:
    console.log(`
🔧 自动备份工具使用说明:

📦 创建备份:
  node scripts/auto-backup.js create [备份说明]

📋 列出备份:
  node scripts/auto-backup.js list

🧹 清理旧备份:
  node scripts/auto-backup.js clean

🔄 恢复备份:
  node scripts/auto-backup.js restore <分支名>

💡 示例:
  node scripts/auto-backup.js create "部署前备份"
  node scripts/auto-backup.js list
  node scripts/auto-backup.js restore backup-2025-06-19T20-33-47-000Z
`);
}
