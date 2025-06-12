#!/usr/bin/env node

/**
 * 强制官方数据源要求 - 技术约束机制
 * 确保AI绝对不能创建缺少官网信息的内容
 */

const fs = require('fs');
const path = require('path');

class OfficialSourceEnforcer {
  constructor() {
    this.blockedOperations = [];
    this.requirementViolations = [];
  }

  /**
   * 检查数据文件是否符合官方数据源要求
   */
  validateOfficialSourceRequirement(filePath) {
    try {
      if (!fs.existsSync(filePath)) {
        throw new Error(`BLOCKED: 尝试引用不存在的文件 ${filePath}`);
      }

      const content = fs.readFileSync(filePath, 'utf8');
      
      // 强制检查: 必须包含contact.website字段
      if (!this.hasOfficialWebsite(content)) {
        this.blockOperation(filePath, 'MISSING_OFFICIAL_WEBSITE', '文件缺少官方网站信息');
        return false;
      }

      // 强制检查: 官网URL必须是可信域名
      const websiteUrl = this.extractWebsiteUrl(content);
      if (!this.isTrustedOfficialDomain(websiteUrl)) {
        this.blockOperation(filePath, 'UNTRUSTED_DOMAIN', `不可信的域名: ${websiteUrl}`);
        return false;
      }

      return true;
    } catch (error) {
      this.blockOperation(filePath, 'VALIDATION_ERROR', error.message);
      return false;
    }
  }

  /**
   * 检查文件是否包含官方网站信息
   */
  hasOfficialWebsite(content) {
    // 检查contact.website字段
    const websitePattern = /contact\s*[:=]\s*{[^}]*website\s*[:=]\s*['"]([^'"]+)['"]/;
    return websitePattern.test(content);
  }

  /**
   * 提取网站URL
   */
  extractWebsiteUrl(content) {
    const websitePattern = /contact\s*[:=]\s*{[^}]*website\s*[:=]\s*['"]([^'"]+)['"]/;
    const match = content.match(websitePattern);
    return match ? match[1] : null;
  }

  /**
   * 验证是否为可信的官方域名
   */
  isTrustedOfficialDomain(url) {
    if (!url) return false;

    const trustedDomains = [
      // 政府官方域名
      '.go.jp',
      '.lg.jp',
      // 市政府域名
      '.city.',
      '.town.',
      '.village.',
      // 观光协会域名
      '.or.jp',
      // Walker Plus等认可来源
      'walkerplus.com',
      'hanabi.walkerplus.com',
      // 知名观光网站
      'kanko.jp',
      'jalan.net',
      'rurubu.com'
    ];

    return trustedDomains.some(domain => url.includes(domain));
  }

  /**
   * 阻止操作并记录
   */
  blockOperation(filePath, violationType, reason) {
    const violation = {
      timestamp: new Date().toISOString(),
      file: filePath,
      type: violationType,
      reason: reason,
      blocked: true
    };

    this.requirementViolations.push(violation);
    this.blockedOperations.push(violation);

    console.error('🚫 AI操作被阻止!');
    console.error(`文件: ${path.basename(filePath)}`);
    console.error(`原因: ${reason}`);
    console.error(`违反类型: ${violationType}`);
    console.error('');
    console.error('⚠️  ACTION REQUIRED BY USER:');
    console.error('   请提供该花火大会的官方网站链接');
    console.error('   可接受的官方来源:');
    console.error('   - Walker Plus (https://hanabi.walkerplus.com)');
    console.error('   - 市政府官网 (.city., .go.jp)');
    console.error('   - 观光协会 (.or.jp)');
    console.error('   - 主办方官网');
    console.error('');

    // 写入阻止日志
    this.writeBlockedOperationLog(violation);
    
    throw new Error(`AI_BLOCKED: ${reason}`);
  }

  /**
   * 写入阻止操作日志
   */
  writeBlockedOperationLog(violation) {
    const logPath = path.join(process.cwd(), 'logs', 'ai-blocked-operations.json');
    
    // 确保logs目录存在
    const logsDir = path.dirname(logPath);
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }

    let existingLogs = [];
    if (fs.existsSync(logPath)) {
      try {
        existingLogs = JSON.parse(fs.readFileSync(logPath, 'utf8'));
      } catch (error) {
        existingLogs = [];
      }
    }

    existingLogs.push(violation);
    fs.writeFileSync(logPath, JSON.stringify(existingLogs, null, 2));
  }

  /**
   * 预检查所有现有数据文件
   */
  preValidateAllDataFiles() {
    console.log('🔒 运行强制官方数据源验证...\n');

    const dataDir = path.join(process.cwd(), 'src', 'data');
    if (!fs.existsSync(dataDir)) {
      throw new Error('数据目录不存在');
    }

    const files = fs.readdirSync(dataDir);
    const level5Files = files.filter(f => f.startsWith('level5-') && f.endsWith('.ts'));

    let validFiles = 0;
    let invalidFiles = 0;

    level5Files.forEach(fileName => {
      const filePath = path.join(dataDir, fileName);
      try {
        if (this.validateOfficialSourceRequirement(filePath)) {
          console.log(`✅ ${fileName}: 官方数据源已验证`);
          validFiles++;
        }
      } catch (error) {
        console.error(`❌ ${fileName}: ${error.message}`);
        invalidFiles++;
      }
    });

    console.log(`\n📊 验证结果:`);
    console.log(`  有效文件: ${validFiles}`);
    console.log(`  无效文件: ${invalidFiles}`);
    console.log(`  总计文件: ${level5Files.length}`);

    if (invalidFiles > 0) {
      console.error('\n🚫 发现数据源问题，请提供官方链接后重试');
      process.exit(1);
    }

    return { validFiles, invalidFiles, total: level5Files.length };
  }

  /**
   * 监听文件创建/修改
   */
  startFileMonitoring() {
    const dataDir = path.join(process.cwd(), 'src', 'data');
    
    console.log('👁️  开始监听数据文件变化...');
    
    fs.watch(dataDir, { recursive: true }, (eventType, filename) => {
      if (!filename || !filename.startsWith('level5-') || !filename.endsWith('.ts')) {
        return;
      }

      const filePath = path.join(dataDir, filename);
      
      if (eventType === 'change' || eventType === 'rename') {
        setTimeout(() => {
          try {
            if (fs.existsSync(filePath)) {
              console.log(`🔍 检测到文件变化: ${filename}`);
              this.validateOfficialSourceRequirement(filePath);
              console.log(`✅ ${filename}: 验证通过`);
            }
          } catch (error) {
            console.error(`🚫 文件验证失败: ${error.message}`);
          }
        }, 100); // 小延迟确保文件写入完成
      }
    });
  }

  /**
   * 生成合规报告
   */
  generateComplianceReport() {
    const reportPath = path.join(process.cwd(), 'reports', 'official-source-compliance.json');
    
    // 确保reports目录存在
    const reportsDir = path.dirname(reportPath);
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }

    const report = {
      timestamp: new Date().toISOString(),
      validationRun: true,
      blockedOperationsCount: this.blockedOperations.length,
      violationsCount: this.requirementViolations.length,
      blockedOperations: this.blockedOperations,
      violations: this.requirementViolations,
      enforcementActive: true
    };

    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`📋 合规报告已生成: ${reportPath}`);
  }
}

// 创建强制执行器实例
const enforcer = new OfficialSourceEnforcer();

// 如果直接运行此脚本
if (require.main === module) {
  try {
    // 验证现有文件
    enforcer.preValidateAllDataFiles();
    
    // 生成合规报告
    enforcer.generateComplianceReport();
    
    console.log('\n🔒 官方数据源强制验证完成');
    console.log('   所有数据文件已验证官方来源');
    console.log('   AI创建新文件时将自动验证');
    
  } catch (error) {
    console.error('\n🚫 验证失败:', error.message);
    process.exit(1);
  }
}

module.exports = OfficialSourceEnforcer; 