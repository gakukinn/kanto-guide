/**
 * 智能顺序修复脚本 - 基于Sequential Thinking理念
 * 分析问题依赖关系，按最优顺序执行修复
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class SequentialThinkingFixer {
  constructor() {
    this.fixSteps = [
      {
        name: '数据源验证',
        command: 'npm run check-websites',
        priority: 1,
        dependencies: []
      },
      {
        name: '日期格式修复',
        command: 'npm run fix-dates',
        priority: 2,
        dependencies: ['数据源验证']
      },
      {
        name: '地图URL修复',
        command: 'npm run fix-maps',
        priority: 3,
        dependencies: ['日期格式修复']
      },
      {
        name: '链接修复',
        command: 'npm run fix-links',
        priority: 4,
        dependencies: ['地图URL修复']
      },
      {
        name: '链接验证',
        command: 'npm run validate-links',
        priority: 5,
        dependencies: ['链接修复']
      },
      {
        name: '图片验证',
        command: 'npm run validate-images',
        priority: 6,
        dependencies: ['链接验证']
      },
      {
        name: '综合检查',
        command: 'npm run check-all',
        priority: 7,
        dependencies: ['图片验证']
      }
    ];
    this.executedSteps = new Set();
    this.failedSteps = new Set();
  }

  // 分析步骤依赖关系
  analyzeThinking() {
    console.log('🧠 开始Sequential Thinking分析...\n');
    
    console.log('📋 修复步骤依赖关系：');
    this.fixSteps.forEach(step => {
      const deps = step.dependencies.length > 0 ? 
        ` (依赖: ${step.dependencies.join(', ')})` : ' (无依赖)';
      console.log(`  ${step.priority}. ${step.name}${deps}`);
    });
    console.log('');
  }

  // 检查步骤是否可执行
  canExecuteStep(step) {
    return step.dependencies.every(dep => {
      const depStep = this.fixSteps.find(s => s.name === dep);
      return this.executedSteps.has(depStep?.name) && !this.failedSteps.has(depStep?.name);
    });
  }

  // 执行单个步骤
  async executeStep(step) {
    if (!this.canExecuteStep(step)) {
      console.log(`⏸️  跳过 ${step.name} - 依赖未满足`);
      return false;
    }

    console.log(`🔄 执行: ${step.name}`);
    console.log(`   命令: ${step.command}`);
    
    try {
      const startTime = Date.now();
      execSync(step.command, { 
        stdio: 'pipe',
        cwd: process.cwd()
      });
      
      const duration = Date.now() - startTime;
      console.log(`✅ ${step.name} 完成 (${duration}ms)\n`);
      this.executedSteps.add(step.name);
      return true;
      
    } catch (error) {
      console.log(`❌ ${step.name} 失败:`);
      console.log(`   错误: ${error.message}\n`);
      this.failedSteps.add(step.name);
      return false;
    }
  }

  // 顺序思考执行流程
  async executeSequentialThinking() {
    console.log('🚀 开始Sequential Thinking修复流程...\n');
    
    // 按优先级排序
    const sortedSteps = [...this.fixSteps].sort((a, b) => a.priority - b.priority);
    
    let allCompleted = true;
    
    for (const step of sortedSteps) {
      const success = await this.executeStep(step);
      if (!success) {
        allCompleted = false;
        
        // 智能决策：是否继续执行后续步骤
        const canContinue = this.shouldContinueAfterFailure(step);
        if (!canContinue) {
          console.log(`🛑 ${step.name} 是关键步骤，停止后续执行`);
          break;
        }
      }
    }
    
    return allCompleted;
  }

  // 失败后是否继续的智能决策
  shouldContinueAfterFailure(failedStep) {
    const criticalSteps = ['数据源验证', '日期格式修复'];
    return !criticalSteps.includes(failedStep.name);
  }

  // 生成执行报告
  generateReport() {
    console.log('📊 Sequential Thinking执行报告：');
    console.log(`✅ 成功步骤: ${this.executedSteps.size}/${this.fixSteps.length}`);
    console.log(`❌ 失败步骤: ${this.failedSteps.size}/${this.fixSteps.length}`);
    
    if (this.executedSteps.size > 0) {
      console.log('\n✅ 成功执行的步骤：');
      this.executedSteps.forEach(step => console.log(`  • ${step}`));
    }
    
    if (this.failedSteps.size > 0) {
      console.log('\n❌ 失败的步骤：');
      this.failedSteps.forEach(step => console.log(`  • ${step}`));
      
      console.log('\n💡 建议：');
      console.log('  1. 检查失败步骤的具体错误信息');
      console.log('  2. 手动修复关键问题后重新运行');
      console.log('  3. 考虑调整步骤依赖关系');
    }
    
    const successRate = (this.executedSteps.size / this.fixSteps.length * 100).toFixed(1);
    console.log(`\n📈 总体成功率: ${successRate}%`);
  }

  // 主执行流程
  async run() {
    console.log('🎯 智能顺序修复系统 - Sequential Thinking模式\n');
    
    this.analyzeThinking();
    const success = await this.executeSequentialThinking();
    this.generateReport();
    
    if (success) {
      console.log('\n🎉 所有修复步骤完成！项目状态良好。');
    } else {
      console.log('\n⚠️  部分步骤失败，请查看报告并手动处理。');
      process.exit(1);
    }
  }
}

// 执行
const fixer = new SequentialThinkingFixer();
fixer.run().catch(console.error); 