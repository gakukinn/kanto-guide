#!/usr/bin/env node

/**
 * 数据完整性强制验证工具
 * 技术约束：确保所有花火数据必须包含官方Walker Plus验证
 * 灵感来源：GitHub上的JSON Schema验证和AI约束技术
 */

const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');

// 强制数据约束Schema
const HANABI_DATA_SCHEMA = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    japaneseName: { 
      type: "string",
      description: "必须提供日文原名 - 技术强制要求"
    },
    date: { type: "string" },
    location: { type: "string" },
    
    // 技术强制约束：必须包含官方来源验证
    officialSource: {
      type: "object",
      properties: {
        walkerPlusUrl: { 
          type: "string", 
          pattern: "^https://hanabi\\.walkerplus\\.com/",
          description: "必须是Walker Plus官方链接"
        },
        verificationDate: { 
          type: "string", 
          format: "date",
          description: "用户验证日期"
        },
        dataConfirmedBy: { 
          type: "string", 
          enum: ["USER_PROVIDED"],
          description: "只能是用户提供的数据"
        },
        lastChecked: { 
          type: "string", 
          format: "date-time",
          description: "最后检查时间"
        }
      },
      required: ["walkerPlusUrl", "verificationDate", "dataConfirmedBy", "lastChecked"],
      additionalProperties: false
    }
  },
  required: ["id", "name", "japaneseName", "officialSource"],
  additionalProperties: true
};

// 初始化验证器
const ajv = new Ajv({ allErrors: true, verbose: true });
addFormats(ajv);
const validate = ajv.compile(HANABI_DATA_SCHEMA);

class DataIntegrityEnforcer {
  constructor() {
    this.violations = [];
    this.checkedFiles = 0;
  }

  /**
   * 验证单个数据文件
   */
  validateFile(filePath) {
    try {
      console.log(`🔍 检查文件: ${filePath}`);
      
      if (!fs.existsSync(filePath)) {
        this.violations.push({
          file: filePath,
          error: "文件不存在",
          severity: "CRITICAL"
        });
        return false;
      }

      const content = fs.readFileSync(filePath, 'utf8');
      
      // 尝试解析文件内容
      let data;
      try {
        // 从TypeScript文件中提取数据
        const dataMatch = content.match(/export\s+const\s+\w+\s*[:=]\s*({[\s\S]*?});?\s*$/m);
        if (dataMatch) {
          // 简单的TypeScript到JSON转换
          const jsonStr = dataMatch[1]
            .replace(/(\w+):/g, '"$1":')  // 属性名加引号
            .replace(/'/g, '"')           // 单引号改双引号
            .replace(/,(\s*[}\]])/g, '$1'); // 移除尾随逗号
          
          data = JSON.parse(jsonStr);
        } else {
          throw new Error("无法从文件中提取数据");
        }
      } catch (parseError) {
        this.violations.push({
          file: filePath,
          error: `数据解析失败: ${parseError.message}`,
          severity: "CRITICAL"
        });
        return false;
      }

      // 执行Schema验证
      const isValid = validate(data);
      
      if (!isValid) {
        const errors = validate.errors.map(err => ({
          path: err.instancePath || err.schemaPath,
          message: err.message,
          value: err.data
        }));

        this.violations.push({
          file: filePath,
          error: "数据约束违规",
          details: errors,
          severity: "CRITICAL",
          recommendation: "必须添加officialSource字段并提供Walker Plus官方验证"
        });
        return false;
      }

      // 额外的业务逻辑验证
      if (!this.validateWalkerPlusUrl(data.officialSource?.walkerPlusUrl)) {
        this.violations.push({
          file: filePath,
          error: "Walker Plus URL格式错误",
          severity: "CRITICAL",
          recommendation: "必须使用正确的Walker Plus官方链接格式"
        });
        return false;
      }

      console.log(`✅ 文件验证通过: ${filePath}`);
      return true;

    } catch (error) {
      this.violations.push({
        file: filePath,
        error: `验证过程失败: ${error.message}`,
        severity: "CRITICAL"
      });
      return false;
    }
  }

  /**
   * 验证Walker Plus URL格式
   */
  validateWalkerPlusUrl(url) {
    if (!url) return false;
    
    const validPatterns = [
      /^https:\/\/hanabi\.walkerplus\.com\/detail\/ar\d+e\d+\/$/,
      /^https:\/\/hanabi\.walkerplus\.com\/calendar\/\d+\/ar\d+\/$/
    ];
    
    return validPatterns.some(pattern => pattern.test(url));
  }

  /**
   * 扫描所有第五层数据文件
   */
  scanLevel5Files() {
    const srcPath = path.join(process.cwd(), 'src');
    const level5Files = this.findLevel5Files(srcPath);

    console.log(`🔍 发现 ${level5Files.length} 个第五层数据文件`);

    level5Files.forEach(file => {
      this.checkedFiles++;
      this.validateFile(file);
    });
  }

  /**
   * 查找所有第五层数据文件
   */
  findLevel5Files(dir) {
    const files = [];
    
    function scanDir(currentDir) {
      if (!fs.existsSync(currentDir)) return;
      
      const items = fs.readdirSync(currentDir);
      
      items.forEach(item => {
        const fullPath = path.join(currentDir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          scanDir(fullPath);
        } else if (item.startsWith('level5-') && item.endsWith('.ts')) {
          files.push(fullPath);
        }
      });
    }
    
    scanDir(dir);
    return files;
  }

  /**
   * 生成违规报告
   */
  generateReport() {
    const report = {
      summary: {
        totalFiles: this.checkedFiles,
        violations: this.violations.length,
        compliant: this.checkedFiles - this.violations.length,
        complianceRate: ((this.checkedFiles - this.violations.length) / this.checkedFiles * 100).toFixed(1)
      },
      violations: this.violations,
      timestamp: new Date().toISOString()
    };

    // 输出到控制台
    console.log('\n🚨 数据完整性检查报告 🚨');
    console.log('='.repeat(50));
    console.log(`检查文件总数: ${report.summary.totalFiles}`);
    console.log(`违规文件数量: ${report.summary.violations}`);
    console.log(`合规文件数量: ${report.summary.compliant}`);
    console.log(`合规率: ${report.summary.complianceRate}%`);

    if (this.violations.length > 0) {
      console.log('\n⚠️  违规详情:');
      this.violations.forEach((violation, index) => {
        console.log(`\n${index + 1}. ${violation.file}`);
        console.log(`   错误: ${violation.error}`);
        if (violation.details) {
          violation.details.forEach(detail => {
            console.log(`   - ${detail.path}: ${detail.message}`);
          });
        }
        if (violation.recommendation) {
          console.log(`   建议: ${violation.recommendation}`);
        }
      });

      console.log('\n🔧 修复步骤:');
      console.log('1. 为每个文件添加 officialSource 字段');
      console.log('2. 提供 Walker Plus 官方链接');
      console.log('3. 记录用户验证信息');
      console.log('4. 重新运行验证');
    }

    // 保存报告文件
    const reportPath = path.join(process.cwd(), 'data-integrity-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`\n📄 详细报告已保存: ${reportPath}`);

    return report;
  }

  /**
   * 创建数据约束修复模板
   */
  generateFixTemplate(filePath) {
    return {
      officialSource: {
        walkerPlusUrl: "https://hanabi.walkerplus.com/detail/ar[地区代码]e[活动ID]/",
        verificationDate: new Date().toISOString().split('T')[0],
        dataConfirmedBy: "USER_PROVIDED",
        lastChecked: new Date().toISOString()
      },
      instructions: [
        "1. 将 [地区代码] 替换为实际的Walker Plus地区代码",
        "2. 将 [活动ID] 替换为实际的活动ID",
        "3. 确保URL指向真实存在的Walker Plus页面",
        "4. 用户必须确认数据的准确性"
      ]
    };
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  const enforcer = new DataIntegrityEnforcer();
  
  console.log('🚀 启动数据完整性强制验证...');
  console.log('📋 验证规则:');
  console.log('  - 必须包含 officialSource 字段');
  console.log('  - 必须提供 Walker Plus 官方链接');
  console.log('  - 必须包含用户验证信息');
  console.log('  - 必须包含日文原名');
  console.log('');

  enforcer.scanLevel5Files();
  const report = enforcer.generateReport();

  // 根据结果设置退出码
  if (report.summary.violations > 0) {
    console.log('\n❌ 数据完整性验证失败');
    process.exit(1);
  } else {
    console.log('\n✅ 所有文件通过数据完整性验证');
    process.exit(0);
  }
}

module.exports = DataIntegrityEnforcer; 