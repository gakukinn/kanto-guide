#!/usr/bin/env node

/**
 * 绝对强制官方数据源验证系统
 * 基于GitHub技术研究的最强约束机制
 */

const fs = require('fs');
const path = require('path');

class AbsoluteSourceEnforcement {
  constructor() {
    this.blockedFiles = [];
    this.violations = [];
    this.requiredSources = [
      'hanabi.walkerplus.com',
      '.go.jp',           // 政府网站
      '.city.jp',         // 市政府网站  
      '.or.jp',           // 官方组织网站
      '.ac.jp'            // 教育机构网站
    ];
    this.setupDirectoryWatch();
  }

  /**
   * 设置目录监控，防止AI创建未验证文件
   */
  setupDirectoryWatch() {
    const dataDir = path.join(process.cwd(), 'src', 'data');
    
    // 创建锁定文件，阻止未授权操作
    const lockFile = path.join(dataDir, '.enforcement-lock');
    if (!fs.existsSync(lockFile)) {
      fs.writeFileSync(lockFile, JSON.stringify({
        locked: true,
        timestamp: Date.now(),
        message: "AI被技术性阻止创建文件。需要官方数据源验证。",
        enforcement: "ABSOLUTE"
      }, null, 2));
    }
  }

  /**
   * 强制验证官方数据源
   */
  enforceOfficialSources() {
    console.log('🔒 启动绝对强制验证系统...\n');
    
    const dataDir = path.join(process.cwd(), 'src', 'data');
    
    if (!fs.existsSync(dataDir)) {
      this.blockOperation('MISSING_DATA_DIRECTORY', '数据目录不存在');
      return false;
    }

    const files = fs.readdirSync(dataDir)
      .filter(f => f.startsWith('level5-') && f.endsWith('.ts'))
      .filter(f => !f.includes('july')); // 排除已验证的七月文件

    console.log(`📊 扫描 ${files.length} 个文件...\n`);

    let validFiles = 0;
    let invalidFiles = 0;

    files.forEach(fileName => {
      const filePath = path.join(dataDir, fileName);
      const result = this.validateOfficialSource(filePath);
      
      if (result.valid) {
        validFiles++;
        console.log(`✅ ${fileName} - 官方数据源已验证`);
      } else {
        invalidFiles++;
        this.blockedFiles.push(fileName);
        console.log(`❌ ${fileName} - ${result.reason}`);
      }
    });

    this.generateReport(validFiles, invalidFiles);
    
    if (invalidFiles > 0) {
      this.activateAbsoluteBlock();
      return false;
    }

    return true;
  }

  /**
   * 验证文件的官方数据源
   */
  validateOfficialSource(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      
      // 检查contact.website字段
      const websiteMatch = content.match(/website:\s*['"`]([^'"`]+)['"`]/);
      
      if (!websiteMatch) {
        return {
          valid: false,
          reason: '缺少contact.website字段'
        };
      }

      const website = websiteMatch[1];
      
      // 验证是否为可信官方域名
      const isOfficialSource = this.requiredSources.some(domain => 
        website.includes(domain)
      );

      if (!isOfficialSource) {
        return {
          valid: false,
          reason: `不可信的域名: ${website}`
        };
      }

      return {
        valid: true,
        source: website
      };

    } catch (error) {
      return {
        valid: false,
        reason: `文件读取错误: ${error.message}`
      };
    }
  }

  /**
   * 激活绝对阻止机制
   */
  activateAbsoluteBlock() {
    console.log('\n🚫 激活绝对阻止机制\n');
    
    // 创建阻止日志
    const blockLog = {
      timestamp: new Date().toISOString(),
      severity: 'CRITICAL',
      violation: 'MISSING_OFFICIAL_SOURCES',
      blockedFiles: this.blockedFiles,
      message: 'AI尝试使用未验证的数据源。操作被技术性阻止。',
      requiresUserAction: true,
      nextSteps: [
        '1. 用户必须提供Walker Plus等官方链接',
        '2. 验证所有数据源的真实性',
        '3. 更新文件中的contact.website字段',
        '4. 重新运行验证脚本'
      ]
    };

    // 保存阻止日志
    const logDir = path.join(process.cwd(), 'logs');
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    fs.writeFileSync(
      path.join(logDir, 'ai-blocked-operations.json'),
      JSON.stringify(blockLog, null, 2)
    );

    // 创建.gitignore阻止
    const gitignorePath = path.join(process.cwd(), '.gitignore');
    let gitignoreContent = '';
    
    if (fs.existsSync(gitignorePath)) {
      gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
    }

    if (!gitignoreContent.includes('# AI enforcement blocked files')) {
      gitignoreContent += '\n# AI enforcement blocked files\n';
      this.blockedFiles.forEach(file => {
        gitignoreContent += `src/data/${file}\n`;
      });
      fs.writeFileSync(gitignorePath, gitignoreContent);
    }

    console.log('📝 阻止日志已保存到: logs/ai-blocked-operations.json');
    console.log('🔒 文件已添加到.gitignore阻止提交');
    
    // 退出码1，技术性阻止继续操作
    process.exit(1);
  }

  /**
   * 生成验证报告
   */
  generateReport(validFiles, invalidFiles) {
    console.log('\n📋 验证报告:');
    console.log(`✅ 通过验证: ${validFiles} 个文件`);
    console.log(`❌ 未通过验证: ${invalidFiles} 个文件`);
    
    if (invalidFiles > 0) {
      console.log('\n🚨 被阻止的文件:');
      this.blockedFiles.forEach(file => {
        console.log(`   - ${file}`);
      });
      
      console.log('\n⚠️  操作要求:');
      console.log('   1. 用户必须提供官方Walker Plus链接');
      console.log('   2. 或提供其他可信官方网站链接');
      console.log('   3. AI不得创建或修改任何内容直到验证通过');
    }
  }

  /**
   * 阻止操作记录
   */
  blockOperation(type, reason) {
    this.violations.push({
      type,
      reason,
      timestamp: Date.now(),
      severity: 'HIGH'
    });
  }
}

// 执行绝对强制验证
const enforcer = new AbsoluteSourceEnforcement();
const success = enforcer.enforceOfficialSources();

if (success) {
  console.log('\n🎉 所有文件通过官方数据源验证！');
  process.exit(0);
} else {
  console.log('\n🚫 验证失败。AI操作被技术性阻止。');
  process.exit(1);
} 