const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🎯 花火项目合并检查系统管理器\n');

// 合并后的检查系统清单 - 按执行顺序排列
const consolidatedSystems = {
  '第一步-官方网站检查': {
    script: 'check-official-websites.js',
    description: '检查五层页面官方网站（非walkerplus），为后续核对做准备',
    icon: '🌐',
    order: 1
  },
  '数据完整性检查': {
    script: 'data-integrity-checker.js',
    description: '检查July数据、Level5数据、多层级验证、数据结构完整性',
    icon: '🔍',
    order: 2
  },
  '链接完整性检查': {
    script: 'link-integrity-checker.js', 
    description: '验证详情链接、检查缺失链接、Tokyo专项检查、修复建议',
    icon: '🔗',
    order: 3
  },
  '数据准确性强制检查': {
    script: 'accuracy-enforcer.js',
    description: '官方数据源验证、Tokyo准确性、数据完整性强制执行',
    icon: '🎯',
    order: 4
  },
  '综合数据修复': {
    script: 'comprehensive-fixer.js',
    description: '修复损坏链接、地图URL、日期格式、花火数据更新',
    icon: '🔧',
    order: 5
  },
  '资源优化': {
    script: 'resource-optimizer.js',
    description: '图片验证、SEO优化、性能建议、资源清理',
    icon: '🚀',
    order: 6
  },
  '重复文件检查': {
    script: 'find-duplicate-files.js',
    description: '检测重复文件，提供清理建议',
    icon: '📁',
    order: 7
  },
  '快速验证': {
    script: 'quick-verification.js',
    description: '快速系统状态检查',
    icon: '⚡',
    order: 8
  }
};

class ConsolidatedSystemManager {
  constructor() {
    this.results = {};
  }

  // 显示系统菜单 - 按执行顺序
  displayMenu() {
    console.log('📋 可用的检查系统（按推荐执行顺序）:\n');
    
    // 按order字段排序
    const sortedSystems = Object.entries(consolidatedSystems).sort(([,a], [,b]) => a.order - b.order);
    
    sortedSystems.forEach(([name, system]) => {
      console.log(`${system.order}. ${system.icon} ${name}`);
      console.log(`   ${system.description}\n`);
    });

    console.log('💡 使用方法:');
    console.log('   node scripts/consolidated-system-manager.js <选项>\n');
    console.log('🎯 可用选项:');
    console.log('   all        - 运行所有检查');
    console.log('   step1      - 第一步-官方网站检查');
    console.log('   websites   - 第一步-官方网站检查');
    console.log('   integrity  - 数据完整性检查');
    console.log('   links      - 链接完整性检查');
    console.log('   accuracy   - 数据准确性检查');
    console.log('   fix        - 综合数据修复');
    console.log('   optimize   - 资源优化');
    console.log('   duplicates - 重复文件检查');
    console.log('   quick      - 快速验证');
  }

  // 运行指定的检查系统
  async runSystem(systemKey) {
    const systemMap = {
      'step1': '第一步-官方网站检查',
      'websites': '第一步-官方网站检查',
      'integrity': '数据完整性检查',
      'links': '链接完整性检查', 
      'accuracy': '数据准确性强制检查',
      'fix': '综合数据修复',
      'optimize': '资源优化',
      'duplicates': '重复文件检查',
      'quick': '快速验证'
    };

    const systemName = systemMap[systemKey];
    if (!systemName || !consolidatedSystems[systemName]) {
      console.log(`❌ 未知的系统: ${systemKey}`);
      return false;
    }

    const system = consolidatedSystems[systemName];
    console.log(`\n${system.icon} 运行 ${systemName}...`);
    console.log(`📝 ${system.description}\n`);

    return new Promise((resolve) => {
      const scriptPath = path.join(__dirname, system.script);
      const child = spawn('node', [scriptPath], { stdio: 'inherit' });

      child.on('close', (code) => {
        const success = code === 0;
        this.results[systemName] = { success, code };
        
        if (success) {
          console.log(`\n✅ ${systemName} 完成`);
        } else {
          console.log(`\n❌ ${systemName} 发现问题 (退出码: ${code})`);
        }
        
        resolve(success);
      });

      child.on('error', (err) => {
        console.log(`\n💥 ${systemName} 执行错误: ${err.message}`);
        this.results[systemName] = { success: false, error: err.message };
        resolve(false);
      });
    });
  }

  // 运行所有检查系统 - 按顺序执行
  async runAllSystems() {
    console.log('🚀 运行所有检查系统（按顺序执行）...\n');
    
    // 按推荐顺序执行：第一步官网检查 → 完整性 → 链接 → 准确性 → 修复 → 优化
    const systemKeys = ['step1', 'integrity', 'links', 'accuracy', 'fix', 'optimize', 'duplicates', 'quick'];
    const results = [];
    
    for (const key of systemKeys) {
      const success = await this.runSystem(key);
      results.push(success);
      console.log(''.padEnd(50, '─')); // 分隔线
    }
    
    this.generateSummaryReport(results);
    return results.every(r => r);
  }

  // 生成总结报告
  generateSummaryReport(results) {
    console.log('\n📊 系统检查总结报告:\n');
    
    const systemNames = Object.keys(this.results);
    let passedCount = 0;
    let failedCount = 0;
    
    systemNames.forEach((name, index) => {
      const result = this.results[name];
      const status = result.success ? '✅ 通过' : '❌ 失败';
      const system = Object.values(consolidatedSystems).find(s => 
        Object.keys(consolidatedSystems)[Object.values(consolidatedSystems).indexOf(s)] === name
      );
      
      console.log(`${index + 1}. ${system?.icon || '📋'} ${name}: ${status}`);
      
      if (result.success) {
        passedCount++;
      } else {
        failedCount++;
        if (result.code) {
          console.log(`   退出码: ${result.code}`);
        }
        if (result.error) {
          console.log(`   错误: ${result.error}`);
        }
      }
    });
    
    console.log('\n📈 统计结果:');
    console.log(`   总检查项: ${systemNames.length}`);
    console.log(`   通过: ${passedCount}`);
    console.log(`   失败: ${failedCount}`);
    console.log(`   成功率: ${Math.round((passedCount / systemNames.length) * 100)}%`);
    
    if (failedCount === 0) {
      console.log('\n🎉 所有检查都通过了！系统状态良好。');
    } else {
      console.log('\n⚠️ 发现问题，请查看上面的详细信息并进行修复。');
    }
  }

  // 显示系统状态
  displaySystemStatus() {
    console.log('📊 合并后的检查系统状态:\n');
    console.log(`🔢 总系统数: ${Object.keys(consolidatedSystems).length}个`);
    console.log(`📉 从原来的27个脚本合并为${Object.keys(consolidatedSystems).length}个系统`);
    console.log(`📈 简化率: ${Math.round((1 - Object.keys(consolidatedSystems).length / 27) * 100)}%\n`);
    
    console.log('🎯 系统覆盖范围:');
    Object.entries(consolidatedSystems).forEach(([name, system]) => {
      console.log(`   ${system.icon} ${name}`);
    });
  }
}

// 主函数
async function main() {
  const manager = new ConsolidatedSystemManager();
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    manager.displayMenu();
    manager.displaySystemStatus();
    return;
  }
  
  const command = args[0].toLowerCase();
  
  switch (command) {
    case 'all':
      const allSuccess = await manager.runAllSystems();
      process.exit(allSuccess ? 0 : 1);
      break;
      
    case 'step1':
    case 'websites':
    case 'integrity':
    case 'links':
    case 'accuracy':
    case 'fix':
    case 'optimize':
    case 'duplicates':
    case 'quick':
      const success = await manager.runSystem(command);
      process.exit(success ? 0 : 1);
      break;
      
    case 'status':
      manager.displaySystemStatus();
      break;
      
    case 'help':
    case '--help':
    case '-h':
      manager.displayMenu();
      break;
      
    default:
      console.log(`❌ 未知命令: ${command}`);
      console.log('使用 --help 查看可用选项');
      process.exit(1);
  }
}

main().catch(error => {
  console.error('💥 系统管理器执行错误:', error);
  process.exit(1);
}); 