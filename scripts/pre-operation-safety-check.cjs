/**
 * 预操作安全检查脚本
 * 在任何修改操作前强制执行安全验证
 */

const fs = require('fs');
const path = require('path');
const enforcer = require('./data-backup-enforcer.cjs');

class PreOperationSafetyChecker {
  constructor() {
    this.logFile = path.join(process.cwd(), 'logs', 'safety-violations.log');
    this.ensureLogDir();
  }

  ensureLogDir() {
    const logDir = path.dirname(this.logFile);
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
  }

  /**
   * 检查"核对更新"操作的安全性
   */
  checkUpdateOperationSafety(targetPath) {
    const checks = {
      targetExists: false,
      isFile: false,
      isDirectory: false,
      hasContent: false,
      isGitTracked: false,
      operation: 'UPDATE_CHECK',
      timestamp: new Date().toISOString()
    };

    try {
      if (fs.existsSync(targetPath)) {
        checks.targetExists = true;
        const stats = fs.statSync(targetPath);
        checks.isFile = stats.isFile();
        checks.isDirectory = stats.isDirectory();

        if (checks.isFile) {
          const content = fs.readFileSync(targetPath, 'utf8');
          checks.hasContent = content.length > 0;
          checks.contentLength = content.length;
        }

        // 检查git跟踪状态
        checks.isGitTracked = this.isGitTracked(targetPath);
      }

      this.logSafetyCheck(targetPath, checks);
      return checks;
    } catch (error) {
      checks.error = error.message;
      this.logSafetyCheck(targetPath, checks);
      return checks;
    }
  }

  isGitTracked(filePath) {
    try {
      const { execSync } = require('child_process');
      execSync(`git ls-files --error-unmatch "${filePath}"`, { 
        stdio: 'pipe',
        encoding: 'utf8'
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * 验证操作类型与实际情况的匹配性
   */
  validateOperationTypeMatch(targetPath, intendedOperation) {
    const checks = this.checkUpdateOperationSafety(targetPath);
    const validations = {
      operationValid: true,
      warnings: [],
      errors: [],
      mustBackup: false
    };

    switch (intendedOperation.toUpperCase()) {
      case 'UPDATE':
      case 'CHECK_AND_UPDATE':
        if (!checks.targetExists) {
          validations.warnings.push('UPDATE operation on non-existent file - this should be CREATE operation');
          validations.operationValid = false;
        } else {
          validations.mustBackup = true;
        }
        break;

      case 'CREATE':
        if (checks.targetExists) {
          validations.errors.push('CREATE operation on existing file - this would overwrite existing data');
          validations.operationValid = false;
        }
        break;

      case 'DELETE':
        validations.errors.push('DELETE operation is FORBIDDEN by data protection rules');
        validations.operationValid = false;
        break;

      default:
        validations.warnings.push(`Unknown operation type: ${intendedOperation}`);
    }

    this.logValidation(targetPath, intendedOperation, validations);
    return validations;
  }

  /**
   * 强制执行安全规则
   */
  enforceSafetyRules(targetPath, intendedOperation) {
    const validation = this.validateOperationTypeMatch(targetPath, intendedOperation);
    
    // 如果需要备份，强制执行
    if (validation.mustBackup) {
      const backupResult = enforcer.enforcePreModificationSafety(targetPath, intendedOperation);
      if (!backupResult.safe) {
        validation.errors.push(`Backup enforcement failed: ${backupResult.reason}`);
        validation.operationValid = false;
      }
    }

    // 记录最终决定
    const decision = {
      allowed: validation.operationValid && validation.errors.length === 0,
      targetPath,
      intendedOperation,
      validation,
      timestamp: new Date().toISOString()
    };

    this.logFinalDecision(decision);
    return decision;
  }

  logSafetyCheck(targetPath, checks) {
    const logEntry = `[SAFETY_CHECK] ${targetPath}: ${JSON.stringify(checks)}\n`;
    fs.appendFileSync(this.logFile, logEntry);
  }

  logValidation(targetPath, operation, validations) {
    const logEntry = `[VALIDATION] ${operation} on ${targetPath}: ${JSON.stringify(validations)}\n`;
    fs.appendFileSync(this.logFile, logEntry);
  }

  logFinalDecision(decision) {
    const status = decision.allowed ? 'ALLOWED' : 'BLOCKED';
    const logEntry = `[DECISION] ${status}: ${decision.intendedOperation} on ${decision.targetPath}\n`;
    fs.appendFileSync(this.logFile, logEntry);
    
    if (decision.allowed) {
      console.log(`✅ OPERATION APPROVED: ${decision.intendedOperation} on ${decision.targetPath}`);
    } else {
      console.log(`🚨 OPERATION BLOCKED: ${decision.intendedOperation} on ${decision.targetPath}`);
      if (decision.validation.errors.length > 0) {
        console.log(`   Errors: ${decision.validation.errors.join(', ')}`);
      }
      if (decision.validation.warnings.length > 0) {
        console.log(`   Warnings: ${decision.validation.warnings.join(', ')}`);
      }
    }
  }

  /**
   * 群马花火页面专用检查
   */
  checkGunmaHanabiOperation(intendedOperation = 'UPDATE') {
    const gunmaPath = 'src/app/gunma/hanabi/page.tsx';
    return this.enforceSafetyRules(gunmaPath, intendedOperation);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  const checker = new PreOperationSafetyChecker();
  const targetPath = process.argv[2] || 'src/app/gunma/hanabi/page.tsx';
  const operation = process.argv[3] || 'UPDATE';
  
  console.log(`🔍 执行安全检查: ${operation} on ${targetPath}`);
  const decision = checker.enforceSafetyRules(targetPath, operation);
  
  process.exit(decision.allowed ? 0 : 1);
}

module.exports = PreOperationSafetyChecker; 