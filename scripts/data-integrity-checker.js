const fs = require('fs');
const path = require('path');

console.log('🔍 综合数据完整性检查系统\n');

// 合并原有的5个数据完整性检查功能
class DataIntegrityChecker {
  constructor() {
    this.issues = [];
    this.stats = {
      totalFiles: 0,
      validFiles: 0,
      errorFiles: 0
    };
  }

  // 1. 检查July数据完整性
  checkJulyData() {
    console.log('📅 检查July数据完整性...');
    const julyDataDir = path.join(__dirname, '../src/data');
    const julyFiles = fs.readdirSync(julyDataDir)
      .filter(f => f.includes('july') && f.endsWith('.ts'))
      .filter(f => !f.includes('level5'));

    julyFiles.forEach(file => {
      try {
        const content = fs.readFileSync(path.join(julyDataDir, file), 'utf8');
        this.validateDataStructure(file, content);
        this.stats.validFiles++;
      } catch (error) {
        this.issues.push(`❌ ${file}: ${error.message}`);
        this.stats.errorFiles++;
      }
      this.stats.totalFiles++;
    });
  }

  // 2. 验证数据结构
  validateDataStructure(filename, content) {
    const requiredFields = ['name', 'date', 'area', 'likes'];
    const optionalFields = ['visitors', 'fireworks', 'detailLink'];
    
    // 检查必填字段
    requiredFields.forEach(field => {
      if (!content.includes(`${field}:`)) {
        throw new Error(`缺少必填字段: ${field}`);
      }
    });

    // 检查中文字符
    if (/[ひらがなカタカナ]/.test(content)) {
      this.issues.push(`⚠️ ${filename}: 检测到日文字符，需要中文化`);
    }
  }

  // 3. 检查Level5数据
  checkLevel5Data() {
    console.log('🎯 检查Level5数据完整性...');
    const level5Dir = path.join(__dirname, '../src/data');
    const level5Files = fs.readdirSync(level5Dir)
      .filter(f => f.includes('level5') && f.endsWith('.ts'));

    level5Files.forEach(file => {
      try {
        const content = fs.readFileSync(path.join(level5Dir, file), 'utf8');
        this.validateLevel5Structure(file, content);
      } catch (error) {
        this.issues.push(`❌ Level5 ${file}: ${error.message}`);
        this.stats.errorFiles++;
      }
    });
  }

  // 4. 验证Level5结构
  validateLevel5Structure(filename, content) {
    const level5Required = [
      'id:', 'title:', 'date:', 'venue:', 'description:',
      'highlights:', 'viewingSpots:', 'access:', 'tips:'
    ];

    level5Required.forEach(field => {
      if (!content.includes(field)) {
        this.issues.push(`⚠️ ${filename}: 缺少Level5必填字段: ${field}`);
      }
    });

    // 检查地图URL
    if (!content.includes('mapEmbedUrl:') || content.includes('mapEmbedUrl: ""')) {
      this.issues.push(`⚠️ ${filename}: 缺少地图URL`);
    }
  }

  // 5. 多层级验证
  performLayeredVerification() {
    console.log('🔗 多层级数据验证...');
    
    // 检查Level4和Level5的对应关系
    const level4Files = fs.readdirSync(path.join(__dirname, '../src/data'))
      .filter(f => f.includes('level4') && f.endsWith('.ts'));

    level4Files.forEach(file => {
      try {
        const content = fs.readFileSync(path.join(__dirname, '../src/data', file), 'utf8');
        this.validateLevel4Links(file, content);
      } catch (error) {
        this.issues.push(`❌ Level4 ${file}: ${error.message}`);
      }
    });
  }

  validateLevel4Links(filename, content) {
    // 提取detailLink
    const detailLinkRegex = /detailLink:\s*['"`]([^'"`]+)['"`]/g;
    let match;
    
    while ((match = detailLinkRegex.exec(content)) !== null) {
      const link = match[1];
      // 检查对应的Level5文件是否存在
      const expectedLevel5 = this.getExpectedLevel5File(link);
      const level5Path = path.join(__dirname, '../src/data', expectedLevel5);
      
      if (!fs.existsSync(level5Path)) {
        this.issues.push(`⚠️ ${filename}: detailLink指向不存在的Level5文件: ${expectedLevel5}`);
      }
    }
  }

  getExpectedLevel5File(link) {
    // 从链接推断Level5文件名
    const parts = link.split('/');
    const month = parts.find(p => ['july', 'august', 'september'].includes(p));
    const region = parts.find(p => ['tokyo', 'saitama', 'chiba', 'kanagawa', 'kitakanto', 'koshinetsu'].includes(p));
    const event = parts[parts.length - 1];
    
    return `level5-${month}-${region}-${event}.ts`;
  }

  // 生成报告
  generateReport() {
    console.log('\n📊 数据完整性检查报告:');
    console.log(`   总文件数: ${this.stats.totalFiles}`);
    console.log(`   正常文件: ${this.stats.validFiles}`);
    console.log(`   错误文件: ${this.stats.errorFiles}`);
    
    if (this.issues.length > 0) {
      console.log('\n🚨 发现的问题:');
      this.issues.forEach(issue => console.log(`   ${issue}`));
    } else {
      console.log('\n✅ 数据完整性检查通过！');
    }

    return {
      success: this.issues.length === 0,
      totalIssues: this.issues.length,
      stats: this.stats
    };
  }

  // 运行所有检查
  runAllChecks() {
    this.checkJulyData();
    this.checkLevel5Data();
    this.performLayeredVerification();
    return this.generateReport();
  }
}

// 执行检查
const checker = new DataIntegrityChecker();
const result = checker.runAllChecks();

process.exit(result.success ? 0 : 1); 