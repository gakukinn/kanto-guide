/**
 * AI守护系统 - 防止AI破坏性修改
 * 创建时间：2025年1月13日
 * 目的：确保AI不能未经授权修改关键系统文件
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

class AIGuard {
  constructor() {
    this.protectedFiles = [
      'scripts/accuracy-enforcer.js',
      'scripts/data-validator.js',
      'scripts/health-check.js',
      'src/components/HanabiDetailTemplate.tsx',
      'src/components/RegionalHanabiTemplate.tsx'
    ];
    
    this.checksumFile = 'ai-guard-checksums.json';
    this.backupDir = 'ai-guard-backups';
    
    this.ensureBackupDir();
    this.loadChecksums();
  }

  ensureBackupDir() {
    if (!fs.existsSync(this.backupDir)) {
      fs.mkdirSync(this.backupDir, { recursive: true });
    }
  }

  generateChecksum(filePath) {
    if (!fs.existsSync(filePath)) return null;
    const content = fs.readFileSync(filePath, 'utf8');
    return crypto.createHash('md5').update(content).digest('hex');
  }

  loadChecksums() {
    if (fs.existsSync(this.checksumFile)) {
      this.checksums = JSON.parse(fs.readFileSync(this.checksumFile, 'utf8'));
    } else {
      this.checksums = {};
      this.saveChecksums();
    }
  }

  saveChecksums() {
    fs.writeFileSync(this.checksumFile, JSON.stringify(this.checksums, null, 2));
  }

  createBackup(filePath) {
    if (!fs.existsSync(filePath)) return;
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupName = `${path.basename(filePath)}.${timestamp}.backup`;
    const backupPath = path.join(this.backupDir, backupName);
    
    fs.copyFileSync(filePath, backupPath);
    console.log(`🛡️ 已创建备份: ${backupPath}`);
  }

  initializeProtection() {
    console.log('🛡️ 初始化AI守护系统...');
    
    this.protectedFiles.forEach(filePath => {
      if (fs.existsSync(filePath)) {
        // 创建初始备份
        this.createBackup(filePath);
        
        // 记录初始校验码
        const checksum = this.generateChecksum(filePath);
        this.checksums[filePath] = {
          checksum,
          lastBackup: new Date().toISOString(),
          protected: true
        };
        
        console.log(`✅ 已保护文件: ${filePath}`);
      }
    });
    
    this.saveChecksums();
    console.log('🛡️ AI守护系统初始化完成');
  }

  validateFiles() {
    console.log('🔍 正在验证受保护文件...');
    let violations = [];
    
    this.protectedFiles.forEach(filePath => {
      if (!fs.existsSync(filePath)) {
        violations.push(`❌ 文件缺失: ${filePath}`);
        return;
      }
      
      const currentChecksum = this.generateChecksum(filePath);
      const storedData = this.checksums[filePath];
      
      if (!storedData) {
        violations.push(`⚠️ 未保护文件: ${filePath}`);
        return;
      }
      
      if (currentChecksum !== storedData.checksum) {
        violations.push(`🚫 检测到未授权修改: ${filePath}`);
        violations.push(`   预期校验码: ${storedData.checksum}`);
        violations.push(`   当前校验码: ${currentChecksum}`);
      }
    });
    
    if (violations.length > 0) {
      console.log('🚨 AI守护系统检测到违规行为:');
      violations.forEach(v => console.log(v));
      return false;
    }
    
    console.log('✅ 所有受保护文件完整无损');
    return true;
  }

  restoreFile(filePath) {
    const backups = fs.readdirSync(this.backupDir)
      .filter(f => f.startsWith(path.basename(filePath)))
      .sort()
      .reverse();
    
    if (backups.length === 0) {
      console.log(`❌ 没有找到 ${filePath} 的备份文件`);
      return false;
    }
    
    const latestBackup = path.join(this.backupDir, backups[0]);
    fs.copyFileSync(latestBackup, filePath);
    
    console.log(`🔄 已从备份恢复: ${filePath}`);
    console.log(`📁 使用备份: ${latestBackup}`);
    
    // 更新校验码
    const newChecksum = this.generateChecksum(filePath);
    this.checksums[filePath].checksum = newChecksum;
    this.saveChecksums();
    
    return true;
  }

  authorizeChange(filePath, reason) {
    if (!this.protectedFiles.includes(filePath)) {
      console.log(`⚠️ ${filePath} 不在保护列表中`);
      return;
    }
    
    // 创建修改前备份
    this.createBackup(filePath);
    
    // 更新校验码
    const newChecksum = this.generateChecksum(filePath);
    this.checksums[filePath] = {
      checksum: newChecksum,
      lastChange: new Date().toISOString(),
      reason: reason,
      protected: true
    };
    
    this.saveChecksums();
    console.log(`✅ 已授权修改: ${filePath}`);
    console.log(`📝 修改原因: ${reason}`);
  }
}

// 命令行接口
if (require.main === module) {
  const guard = new AIGuard();
  const command = process.argv[2];
  
  switch (command) {
    case 'init':
      guard.initializeProtection();
      break;
      
    case 'validate':
      const isValid = guard.validateFiles();
      process.exit(isValid ? 0 : 1);
      break;
      
    case 'restore':
      const filePath = process.argv[3];
      if (!filePath) {
        console.log('请指定要恢复的文件路径');
        process.exit(1);
      }
      guard.restoreFile(filePath);
      break;
      
    case 'authorize':
      const file = process.argv[3];
      const reason = process.argv[4];
      if (!file || !reason) {
        console.log('用法: npm run ai-authorize <文件路径> <修改原因>');
        process.exit(1);
      }
      guard.authorizeChange(file, reason);
      break;
      
    default:
      console.log('AI守护系统命令:');
      console.log('  npm run ai-guard init     - 初始化保护');
      console.log('  npm run ai-guard validate - 验证文件完整性');
      console.log('  npm run ai-guard restore <文件> - 恢复文件');
      console.log('  npm run ai-authorize <文件> <原因> - 授权修改');
  }
}

module.exports = AIGuard; 