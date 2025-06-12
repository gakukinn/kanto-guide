#!/usr/bin/env node

/**
 * 层级数据验证系统
 * 五层详细信息来源于公式サイト
 * 四层的信息来源于五层页面
 */

const fs = require('fs');
const path = require('path');

class LayeredDataVerifier {
  constructor() {
    this.level5Files = [];
    this.level4Files = [];
    this.violations = [];
    this.verificationChain = new Map();
  }

  /**
   * 扫描所有数据文件
   */
  scanDataFiles() {
    const srcPath = path.join(process.cwd(), 'src');
    this.findDataFiles(srcPath);
    
    console.log(`🔍 发现 ${this.level5Files.length} 个五层文件`);
    console.log(`🔍 发现 ${this.level4Files.length} 个四层文件`);
  }

  /**
   * 查找数据文件
   */
  findDataFiles(dir) {
    if (!fs.existsSync(dir)) return;
    
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        this.findDataFiles(fullPath);
      } else if (item.endsWith('.ts')) {
        if (item.startsWith('level5-')) {
          this.level5Files.push(fullPath);
        } else if (item.startsWith('level4-')) {
          this.level4Files.push(fullPath);
        }
      }
    });
  }

  /**
   * 验证五层页面的公式サイト链接
   */
  verifyLevel5OfficialSites() {
    console.log('\n🔍 验证五层页面的公式サイト...');
    
    this.level5Files.forEach(filePath => {
      try {
        const data = this.extractDataFromFile(filePath);
        if (!data) return;

        const verification = {
          filePath,
          hasOfficialSite: false,
          officialSiteUrl: null,
          isVerified: false,
          issues: []
        };

        // 检查是否有公式サイト（website字段）
        if (data.contact && data.contact.website) {
          verification.hasOfficialSite = true;
          verification.officialSiteUrl = data.contact.website;
          
          // 验证URL格式
          if (this.isValidOfficialUrl(data.contact.website)) {
            verification.isVerified = true;
            console.log(`✅ ${path.basename(filePath)}: ${data.contact.website}`);
          } else {
            verification.issues.push('公式サイトURL格式可疑');
            console.log(`⚠️  ${path.basename(filePath)}: URL格式需要验证`);
          }
        } else {
          verification.issues.push('缺少公式サイト链接');
          console.log(`❌ ${path.basename(filePath)}: 缺少公式サイト`);
        }

        this.verificationChain.set(filePath, verification);

        if (verification.issues.length > 0) {
          this.violations.push({
            level: 5,
            file: filePath,
            type: 'MISSING_OFFICIAL_SITE',
            issues: verification.issues
          });
        }

      } catch (error) {
        console.log(`❌ ${path.basename(filePath)}: 数据解析失败`);
        this.violations.push({
          level: 5,
          file: filePath,
          type: 'PARSE_ERROR',
          error: error.message
        });
      }
    });
  }

  /**
   * 验证四层页面与五层页面的一致性
   */
  verifyLevel4Consistency() {
    console.log('\n🔍 验证四层与五层页面一致性...');
    
    this.level4Files.forEach(filePath => {
      try {
        const level4Data = this.extractDataFromFile(filePath);
        if (!level4Data) return;

        // 查找对应的五层页面
        const correspondingLevel5 = this.findCorrespondingLevel5(filePath, level4Data);
        
        if (correspondingLevel5) {
          const level5Data = this.extractDataFromFile(correspondingLevel5);
          const consistency = this.checkDataConsistency(level4Data, level5Data);
          
          if (consistency.isConsistent) {
            console.log(`✅ ${path.basename(filePath)} ↔ ${path.basename(correspondingLevel5)}`);
          } else {
            console.log(`❌ ${path.basename(filePath)}: 与五层数据不一致`);
            this.violations.push({
              level: 4,
              file: filePath,
              type: 'INCONSISTENT_WITH_LEVEL5',
              issues: consistency.issues,
              sourceLevel5: correspondingLevel5
            });
          }
        } else {
          console.log(`⚠️  ${path.basename(filePath)}: 未找到对应的五层页面`);
          this.violations.push({
            level: 4,
            file: filePath,
            type: 'NO_CORRESPONDING_LEVEL5',
            issues: ['无法找到对应的五层详细页面']
          });
        }

      } catch (error) {
        console.log(`❌ ${path.basename(filePath)}: 数据解析失败`);
        this.violations.push({
          level: 4,
          file: filePath,
          type: 'PARSE_ERROR',
          error: error.message
        });
      }
    });
  }

  /**
   * 从文件中提取数据
   */
  extractDataFromFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      
      // 提取export const部分
      const exportMatch = content.match(/export\s+const\s+\w+\s*[:=]\s*({[\s\S]*?});?\s*$/m);
      if (!exportMatch) return null;

      // 简单的TypeScript到JavaScript转换
      const jsCode = exportMatch[1]
        .replace(/(\w+):/g, '"$1":')
        .replace(/'/g, '"')
        .replace(/,(\s*[}\]])/g, '$1')
        .replace(/\/\/.*$/gm, '') // 移除注释
        .replace(/\/\*[\s\S]*?\*\//g, ''); // 移除块注释

      return JSON.parse(jsCode);
    } catch (error) {
      console.warn(`解析文件失败 ${filePath}: ${error.message}`);
      return null;
    }
  }

  /**
   * 验证官方URL格式
   */
  isValidOfficialUrl(url) {
    if (!url || typeof url !== 'string') return false;
    
    // 基本URL格式检查
    const urlPattern = /^https?:\/\/[^\s/$.?#].[^\s]*$/;
    if (!urlPattern.test(url)) return false;

    // 检查是否是常见的官方域名
    const officialDomains = [
      '.go.jp',        // 政府机关
      '.lg.jp',        // 地方自治体
      '.tokyo.jp',     // 东京都
      '.city.',        // 市政府
      '.town.',        // 町政府
      '.pref.',        // 都道府县
      '.or.jp',        // 组织
      'festival',      // 节日相关
      'hanabi',        // 花火相关
      'matsuri'        // 祭祀相关
    ];

    return officialDomains.some(domain => url.includes(domain));
  }

  /**
   * 查找对应的五层页面
   */
  findCorrespondingLevel5(level4Path, level4Data) {
    const level4Name = path.basename(level4Path, '.ts');
    
    // 尝试多种匹配策略
    const strategies = [
      // 直接名称匹配
      (l5Path) => {
        const l5Name = path.basename(l5Path, '.ts');
        return l5Name.includes(level4Name.replace('level4-', '').replace('-hanabi', ''));
      },
      
      // 基于数据ID匹配
      (l5Path) => {
        const l5Data = this.extractDataFromFile(l5Path);
        return l5Data && level4Data.id && l5Data.id === level4Data.id;
      },
      
      // 基于活动名称匹配
      (l5Path) => {
        const l5Data = this.extractDataFromFile(l5Path);
        return l5Data && level4Data.name && l5Data.name === level4Data.name;
      }
    ];

    for (const strategy of strategies) {
      const found = this.level5Files.find(strategy);
      if (found) return found;
    }

    return null;
  }

  /**
   * 检查四层和五层数据一致性
   */
  checkDataConsistency(level4Data, level5Data) {
    const issues = [];
    
    // 检查基本信息一致性
    const fieldsToCheck = ['name', 'date', 'location', 'fireworksCount', 'expectedVisitors'];
    
    fieldsToCheck.forEach(field => {
      if (level4Data[field] && level5Data[field]) {
        if (level4Data[field] !== level5Data[field]) {
          issues.push(`${field}不一致: 四层"${level4Data[field]}" vs 五层"${level5Data[field]}"`);
        }
      }
    });

    return {
      isConsistent: issues.length === 0,
      issues
    };
  }

  /**
   * 生成验证报告
   */
  generateReport() {
    console.log('\n📊 层级数据验证报告');
    console.log('='.repeat(50));

    // 五层验证统计
    const level5Verified = this.level5Files.length - this.violations.filter(v => v.level === 5).length;
    console.log(`五层页面: ${level5Verified}/${this.level5Files.length} 通过验证`);

    // 四层验证统计
    const level4Verified = this.level4Files.length - this.violations.filter(v => v.level === 4).length;
    console.log(`四层页面: ${level4Verified}/${this.level4Files.length} 通过验证`);

    // 违规详情
    if (this.violations.length > 0) {
      console.log('\n⚠️  发现的问题:');
      
      const level5Issues = this.violations.filter(v => v.level === 5);
      if (level5Issues.length > 0) {
        console.log('\n📄 五层页面问题:');
        level5Issues.forEach((issue, index) => {
          console.log(`  ${index + 1}. ${path.basename(issue.file)}`);
          console.log(`     类型: ${issue.type}`);
          if (issue.issues) {
            issue.issues.forEach(i => console.log(`     - ${i}`));
          }
        });
      }

      const level4Issues = this.violations.filter(v => v.level === 4);
      if (level4Issues.length > 0) {
        console.log('\n📋 四层页面问题:');
        level4Issues.forEach((issue, index) => {
          console.log(`  ${index + 1}. ${path.basename(issue.file)}`);
          console.log(`     类型: ${issue.type}`);
          if (issue.issues) {
            issue.issues.forEach(i => console.log(`     - ${i}`));
          }
        });
      }
    }

    // 生成修复建议
    this.generateFixRecommendations();

    return {
      level5: { total: this.level5Files.length, verified: level5Verified },
      level4: { total: this.level4Files.length, verified: level4Verified },
      violations: this.violations
    };
  }

  /**
   * 生成修复建议
   */
  generateFixRecommendations() {
    console.log('\n🔧 修复建议:');
    console.log('1. 五层页面必须包含公式サイト链接');
    console.log('2. 四层页面数据必须与对应五层页面保持一致');
    console.log('3. 优先修复五层页面，因为四层依赖五层');
    console.log('4. 验证公式サイト链接的有效性和权威性');
  }

  /**
   * 运行完整验证
   */
  runFullVerification() {
    console.log('🚀 启动层级数据验证系统...');
    console.log('📋 验证规则:');
    console.log('  - 五层页面必须有公式サイト来源');
    console.log('  - 四层页面必须与五层页面一致');
    console.log('  - 建立完整的验证链条');
    console.log('');

    this.scanDataFiles();
    this.verifyLevel5OfficialSites();
    this.verifyLevel4Consistency();
    
    const report = this.generateReport();
    
    // 保存详细报告
    const reportPath = path.join(process.cwd(), 'layered-verification-report.json');
    fs.writeFileSync(reportPath, JSON.stringify({
      timestamp: new Date().toISOString(),
      summary: report,
      verificationChain: Array.from(this.verificationChain.entries()),
      violations: this.violations
    }, null, 2));

    console.log(`\n📄 详细报告已保存: ${reportPath}`);

    return report;
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  const verifier = new LayeredDataVerifier();
  const report = verifier.runFullVerification();

  // 根据结果设置退出码
  if (report.violations && report.violations.length > 0) {
    console.log('\n❌ 层级验证发现问题');
    process.exit(1);
  } else {
    console.log('\n✅ 所有层级验证通过');
    process.exit(0);
  }
}

module.exports = LayeredDataVerifier; 