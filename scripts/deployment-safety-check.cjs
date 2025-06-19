#!/usr/bin/env node

/**
 * 部署安全检查脚本 - 防止自动回滚到旧版本
 * 确保所有更改都已推送到远程仓库
 */

const { execSync } = require('child_process');
const fs = require('fs');

class DeploymentSafetyChecker {
  constructor() {
    this.errors = [];
    this.warnings = [];
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const prefix = {
      info: '✅',
      warning: '⚠️',
      error: '❌',
      success: '🎉',
    }[type];

    console.log(`${prefix} [${timestamp}] ${message}`);
  }

  runCommand(command, description) {
    try {
      this.log(`执行: ${description}`, 'info');
      const result = execSync(command, {
        encoding: 'utf8',
        cwd: process.cwd(),
      });
      return result.trim();
    } catch (error) {
      this.errors.push(`${description} 失败: ${error.message}`);
      return null;
    }
  }

  checkGitStatus() {
    this.log('🔍 检查Git状态...', 'info');

    // 检查是否有未提交的更改
    const status = this.runCommand('git status --porcelain', 'Git状态检查');
    if (status && status.length > 0) {
      this.warnings.push('存在未提交的更改');
      this.log('未提交的文件:', 'warning');
      console.log(status);
    }

    // 检查本地分支是否领先远程分支
    const ahead = this.runCommand(
      'git rev-list --count origin/main..HEAD',
      '检查本地领先提交数'
    );
    if (ahead && parseInt(ahead) > 0) {
      this.errors.push(
        `本地分支领先远程分支 ${ahead} 个提交 - 这可能导致部署回滚！`
      );
      this.log(
        `⚠️  CRITICAL: 您的本地main分支领先origin/main ${ahead}个提交！`,
        'error'
      );
      this.log('这意味着部署平台可能会使用旧版本的代码！', 'error');
    }

    // 检查远程分支状态
    const behind = this.runCommand(
      'git rev-list --count HEAD..origin/main',
      '检查远程领先提交数'
    );
    if (behind && parseInt(behind) > 0) {
      this.warnings.push(`远程分支领先本地分支 ${behind} 个提交`);
    }

    // 显示最近的提交
    const recentCommits = this.runCommand(
      'git log --oneline -5',
      '获取最近提交'
    );
    this.log('最近的提交:', 'info');
    console.log(recentCommits);
  }

  checkBuildIntegrity() {
    this.log('🏗️  检查构建完整性...', 'info');

    // 检查关键文件是否存在
    const criticalFiles = [
      'package.json',
      'next.config.js',
      'vercel.json',
      'src/app/layout.tsx',
    ];

    criticalFiles.forEach(file => {
      if (!fs.existsSync(file)) {
        this.errors.push(`关键文件缺失: ${file}`);
      }
    });

    // 尝试构建
    const buildResult = this.runCommand('npm run build', '项目构建测试');
    if (!buildResult) {
      this.errors.push('构建失败');
    }
  }

  checkDeploymentReadiness() {
    this.log('🚀 检查部署就绪状态...', 'info');

    // 检查环境变量（如果需要）
    if (process.env.NODE_ENV !== 'production') {
      this.log('当前不是生产环境', 'info');
    }

    // 检查图片优化是否完成
    if (fs.existsSync('public/images/optimized')) {
      this.log('图片优化已完成', 'success');
    } else {
      this.warnings.push('图片优化目录不存在');
    }
  }

  suggestSolution() {
    if (this.errors.length > 0) {
      this.log('🔧 推荐解决方案:', 'error');

      // 如果本地领先远程分支
      const aheadError = this.errors.find(e => e.includes('领先远程分支'));
      if (aheadError) {
        console.log(`
📋 解决步骤：
1. 推送所有本地提交到远程仓库：
   git push origin main

2. 验证推送成功：
   git status

3. 等待几分钟让部署平台同步

4. 重新触发部署

这样可以确保部署平台使用最新版本，而不是回滚到旧版本！
        `);
      }
    }
  }

  async run() {
    this.log('🔍 开始部署安全检查...', 'info');
    console.log('='.repeat(60));

    this.checkGitStatus();
    this.checkBuildIntegrity();
    this.checkDeploymentReadiness();

    console.log('='.repeat(60));

    if (this.errors.length > 0) {
      this.log('❌ 发现严重问题:', 'error');
      this.errors.forEach(error => this.log(error, 'error'));
      this.suggestSolution();
      process.exit(1);
    }

    if (this.warnings.length > 0) {
      this.log('⚠️  发现警告:', 'warning');
      this.warnings.forEach(warning => this.log(warning, 'warning'));
    }

    this.log('✅ 部署安全检查完成！', 'success');
    return true;
  }
}

// 立即执行
if (require.main === module) {
  const checker = new DeploymentSafetyChecker();
  checker.run().catch(console.error);
}

module.exports = DeploymentSafetyChecker;
