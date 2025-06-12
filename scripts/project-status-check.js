#!/usr/bin/env node

/**
 * 项目状态检查脚本
 * 验证所有修改是否正常工作
 */

const fs = require('fs');
const path = require('path');

class ProjectStatusChecker {
  constructor() {
    this.logFile = path.join(__dirname, '../logs/project-status.log');
    this.issues = [];
    this.successes = [];
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${type.toUpperCase()}: ${message}`;
    console.log(logMessage);
    
    // 确保日志目录存在
    const logDir = path.dirname(this.logFile);
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
    
    fs.appendFileSync(this.logFile, logMessage + '\n');
  }

  // 检查人群等级配置
  checkCrowdLevelConfig() {
    this.log('🔍 检查人群等级配置...');
    
    const configPath = path.join(__dirname, '../src/config/regional-template.ts');
    if (!fs.existsSync(configPath)) {
      this.issues.push('regional-template.ts 配置文件不存在');
      return;
    }

    const content = fs.readFileSync(configPath, 'utf8');
    
    // 检查是否包含正确的人群等级配置
    if (content.includes("text: '拥挤'") && 
        content.includes("text: '适中'") && 
        content.includes("text: '宽松'")) {
      this.successes.push('✅ 人群等级配置正确：拥挤/适中/宽松');
    } else {
      this.issues.push('❌ 人群等级配置错误');
    }
  }

  // 检查数据同步脚本
  checkDataSyncScript() {
    this.log('🔍 检查数据同步脚本...');
    
    const scriptPath = path.join(__dirname, 'sync-layer-data.js');
    if (fs.existsSync(scriptPath)) {
      this.successes.push('✅ 数据同步脚本存在');
    } else {
      this.issues.push('❌ 数据同步脚本缺失');
    }
  }

  // 检查评论系统组件
  checkCommentsSystem() {
    this.log('🔍 检查评论系统组件...');
    
    const componentPath = path.join(__dirname, '../src/components/CommentsSystem.tsx');
    const managerPath = path.join(__dirname, '../src/utils/commentsManager.ts');
    
    if (fs.existsSync(componentPath)) {
      this.successes.push('✅ 评论系统组件存在');
    } else {
      this.issues.push('❌ 评论系统组件缺失');
    }

    if (fs.existsSync(managerPath)) {
      this.successes.push('✅ 评论数据管理工具存在');
    } else {
      this.issues.push('❌ 评论数据管理工具缺失');
    }
  }

  // 检查模板文件
  checkTemplateFiles() {
    this.log('🔍 检查模板文件...');
    
    const regionalTemplate = path.join(__dirname, '../src/components/RegionalHanabiTemplate.tsx');
    const detailTemplate = path.join(__dirname, '../src/components/HanabiDetailTemplate.tsx');
    
    if (fs.existsSync(regionalTemplate)) {
      this.successes.push('✅ 第四层地区模板存在');
    } else {
      this.issues.push('❌ 第四层地区模板缺失');
    }

    if (fs.existsSync(detailTemplate)) {
      this.successes.push('✅ 第五层详情模板存在');
    } else {
      this.issues.push('❌ 第五层详情模板缺失');
    }
  }

  // 检查package.json脚本
  checkPackageScripts() {
    this.log('🔍 检查package.json脚本...');
    
    const packagePath = path.join(__dirname, '../package.json');
    if (!fs.existsSync(packagePath)) {
      this.issues.push('❌ package.json文件不存在');
      return;
    }

    try {
      const packageContent = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
      const scripts = packageContent.scripts || {};
      
      const requiredScripts = [
        'sync-layers',
        'sync-layers:validate',
        'optimize-comments',
        'fix-crowd-levels'
      ];

      requiredScripts.forEach(script => {
        if (scripts[script]) {
          this.successes.push(`✅ 脚本存在: ${script}`);
        } else {
          this.issues.push(`❌ 脚本缺失: ${script}`);
        }
      });

    } catch (error) {
      this.issues.push(`❌ package.json解析错误: ${error.message}`);
    }
  }

  // 检查数据文件
  checkDataFiles() {
    this.log('🔍 检查关键数据文件...');
    
    const dataDir = path.join(__dirname, '../src/data');
    const configDir = path.join(__dirname, '../src/config');
    
    // 检查调布花火数据文件
    const chofuData = path.join(dataDir, 'level5-september-tokyo-chofu-hanabi.ts');
    if (fs.existsSync(chofuData)) {
      this.successes.push('✅ 调布花火数据文件存在');
    } else {
      this.issues.push('❌ 调布花火数据文件缺失');
    }

    // 检查配置文件
    const hanabiConfig = path.join(configDir, 'hanabi-detail-template.ts');
    if (fs.existsSync(hanabiConfig)) {
      this.successes.push('✅ 花火详情模板配置存在');
    } else {
      this.issues.push('❌ 花火详情模板配置缺失');
    }
  }

  // 生成状态报告
  generateReport() {
    this.log('📋 生成项目状态报告...');
    
    const report = `
# 🎯 项目状态检查报告

## 📅 检查时间
${new Date().toLocaleString('zh-CN')}

## ✅ 成功项目 (${this.successes.length})
${this.successes.map(item => `- ${item}`).join('\n')}

## ❌ 问题项目 (${this.issues.length})
${this.issues.map(item => `- ${item}`).join('\n')}

## 📊 总体状态
- 总检查项目: ${this.successes.length + this.issues.length}
- 成功率: ${Math.round((this.successes.length / (this.successes.length + this.issues.length)) * 100)}%
- 状态: ${this.issues.length === 0 ? '🟢 良好' : this.issues.length <= 2 ? '🟡 需要注意' : '🔴 需要修复'}

## 🚀 建议操作
${this.issues.length === 0 ? 
  '所有检查项目都通过了！项目状态良好，可以正常使用。' : 
  '请根据上述问题列表进行修复，然后重新运行检查。'
}
`;

    const reportPath = path.join(__dirname, '../docs/项目状态报告.md');
    fs.writeFileSync(reportPath, report);
    this.log(`📄 状态报告已保存到: ${reportPath}`);
    
    return report;
  }

  // 运行完整检查
  async runFullCheck() {
    this.log('🚀 开始项目状态检查...');
    
    try {
      this.checkCrowdLevelConfig();
      this.checkDataSyncScript();
      this.checkCommentsSystem();
      this.checkTemplateFiles();
      this.checkPackageScripts();
      this.checkDataFiles();
      
      const report = this.generateReport();
      
      this.log('✅ 项目状态检查完成！');
      console.log(report);
      
      return {
        success: this.issues.length === 0,
        issues: this.issues,
        successes: this.successes,
        report
      };
      
    } catch (error) {
      this.log(`❌ 检查过程中出现错误: ${error.message}`, 'error');
      return { success: false, error: error.message };
    }
  }
}

// 运行检查
if (require.main === module) {
  const checker = new ProjectStatusChecker();
  checker.runFullCheck();
}

module.exports = ProjectStatusChecker; 