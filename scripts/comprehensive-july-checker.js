const fs = require('fs');
const path = require('path');

console.log('🎯 7月花火综合检查系统 v2.0\n');

// 完整的地区映射配置
const REGION_CONFIG = {
  '东京': {
    keywords: ['tokyo', 'sumida', 'tachikawa', 'keibajo', 'katsushika', 'hachioji', 'mikurajima', 'edogawa', 'itabashi', 'jingu'],
    tags: ['东京都'],
    expectedCount: { min: 6, max: 10 }
  },
  '埼玉': {
    keywords: ['saitama', 'koshigaya', 'iruma', 'seibu', 'metsza', 'ogawa', 'owada', 'asaka', 'toda'],
    tags: ['埼玉县'],
    expectedCount: { min: 6, max: 8 }
  },
  '千叶': {
    keywords: ['chiba', 'futtsu', 'kamogawa', 'marines', 'motherfarm', 'oamishirasato', 'shirahama', 'sanmu'],
    tags: ['千叶县'],
    expectedCount: { min: 6, max: 15 }
  },
  '神奈川': {
    keywords: ['kanagawa', 'kamakura', 'yokohama', 'seaparadise', 'nightflowers'],
    tags: ['神奈川县'],
    expectedCount: { min: 3, max: 8 }
  },
  '北关东': {
    keywords: ['kitakanto', 'mito', 'moka', 'tamura', 'tatebayashi'],
    tags: ['群馬県', '栃木県', '茨城県'],
    expectedCount: { min: 4, max: 6 }
  },
  '甲信越': {
    keywords: ['koshinetsu', 'fuji', 'gion', 'sanjo', 'suzaka', 'nojiri', 'anime'],
    tags: ['长野县', '新潟县', '山梨县'],
    expectedCount: { min: 5, max: 8 }
  }
};

// 数据完整性验证规则
const VALIDATION_RULES = {
  required_fields: ['title', 'regionTag', 'regionPath'],
  required_for_july: ['regionPath'],
  official_website_required: true,
  forbidden_websites: ['walkerplus', 'unsplash', 'youtube'],
  region_path_pattern: /\/july\/hanabi\//
};

class JulyFireworksChecker {
  constructor() {
    this.dataDir = path.join(__dirname, '../src/data');
    this.results = {
      total: 0,
      julyEvents: [],
      nonJulyEvents: [],
      regionStats: {},
      validationErrors: [],
      warnings: []
    };
  }

  // 读取所有level5文件
  getAllLevel5Files() {
    try {
      const files = fs.readdirSync(this.dataDir)
        .filter(file => file.startsWith('level5-') && file.endsWith('.ts'))
        .filter(file => !file.includes('august') && !file.includes('september'))
        .sort();
      
      console.log(`📂 扫描到 ${files.length} 个level5文件\n`);
      return files;
    } catch (error) {
      console.error('❌ 读取数据目录失败:', error);
      return [];
    }
  }

  // 智能文件内容分析
  analyzeFile(filename) {
    const filePath = path.join(this.dataDir, filename);
    
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      
      // 提取关键信息
      const analysis = {
        filename,
        title: this.extractField(content, 'title') || '未知活动',
        regionTag: this.extractField(content, 'regionTag') || '未知地区',
        regionPath: this.extractField(content, 'regionPath') || '',
        eventDate: this.extractField(content, 'date') || '',
        officialWebsites: this.extractOfficialWebsites(content),
        validationIssues: []
      };

      // 判断是否为7月活动
      analysis.isJulyEvent = this.isJulyEvent(analysis);
      
      // 确定地区
      analysis.detectedRegion = this.detectRegion(filename, analysis.regionTag);
      
      // 验证数据完整性
      analysis.validationIssues = this.validateData(analysis);
      
      return analysis;
      
    } catch (error) {
      console.error(`❌ 分析文件失败 ${filename}:`, error);
      return null;
    }
  }

  // 提取字段值
  extractField(content, fieldName) {
    const match = content.match(new RegExp(`${fieldName}:\\s*['"\`]([^'"\`]+)['"\`]`));
    return match ? match[1] : null;
  }

  // 提取官方网站
  extractOfficialWebsites(content) {
    const websites = [];
    
    // 官方网站字段
    const officialMatch = content.match(/officialWebsite:\s*['"`]([^'"`]+)['"`]/);
    if (officialMatch) websites.push(officialMatch[1]);
    
    // 网站字段
    const websiteMatch = content.match(/website:\s*['"`]([^'"`]+)['"`]/);
    if (websiteMatch && !websites.includes(websiteMatch[1])) {
      websites.push(websiteMatch[1]);
    }
    
    // 过滤非官方网站
    return websites.filter(site => 
      !VALIDATION_RULES.forbidden_websites.some(forbidden => site.includes(forbidden)) &&
      !site.includes('google.com/maps')
    );
  }

  // 判断是否为7月活动
  isJulyEvent(analysis) {
    return VALIDATION_RULES.region_path_pattern.test(analysis.regionPath) ||
           analysis.eventDate.includes('7月') ||
           analysis.eventDate.includes('July') ||
           analysis.filename.includes('july');
  }

  // 智能地区检测
  detectRegion(filename, regionTag) {
    // 优先通过文件名关键词匹配
    for (const [region, config] of Object.entries(REGION_CONFIG)) {
      if (config.keywords.some(keyword => filename.toLowerCase().includes(keyword))) {
        return region;
      }
    }
    
    // 通过regionTag匹配
    for (const [region, config] of Object.entries(REGION_CONFIG)) {
      if (config.tags.includes(regionTag)) {
        return region;
      }
    }
    
    return '未知地区';
  }

  // 数据完整性验证
  validateData(analysis) {
    const issues = [];
    
    // 检查必填字段
    VALIDATION_RULES.required_fields.forEach(field => {
      if (!analysis[field] || analysis[field] === '未知活动' || analysis[field] === '未知地区') {
        issues.push(`缺少必填字段: ${field}`);
      }
    });

    // 检查7月活动特殊要求
    if (analysis.isJulyEvent) {
      if (!analysis.regionPath.includes('/july/')) {
        issues.push('7月活动但regionPath不包含/july/路径');
      }
      
      if (VALIDATION_RULES.official_website_required && analysis.officialWebsites.length === 0) {
        issues.push('缺少官方网站');
      }
    }

    // 检查地区识别
    if (analysis.detectedRegion === '未知地区') {
      issues.push('无法识别地区分类');
    }

    return issues;
  }

  // 执行完整检查
  async performComprehensiveCheck() {
    console.log('🔍 开始综合检查...\n');
    
    const files = this.getAllLevel5Files();
    this.results.total = files.length;
    
    // 分析所有文件
    console.log('📊 分析文件内容...');
    files.forEach(filename => {
      const analysis = this.analyzeFile(filename);
      if (!analysis) return;
      
      if (analysis.isJulyEvent) {
        this.results.julyEvents.push(analysis);
        
        // 按地区统计
        if (!this.results.regionStats[analysis.detectedRegion]) {
          this.results.regionStats[analysis.detectedRegion] = [];
        }
        this.results.regionStats[analysis.detectedRegion].push(analysis);
      } else {
        this.results.nonJulyEvents.push(analysis);
      }
      
      // 收集验证错误
      if (analysis.validationIssues.length > 0) {
        this.results.validationErrors.push({
          filename: analysis.filename,
          issues: analysis.validationIssues
        });
      }
    });
    
    console.log('✅ 文件分析完成\n');
    
    // 生成报告
    this.generateComprehensiveReport();
    
    // 验证完整性
    return this.validateCompleteness();
  }

  // 生成综合报告
  generateComprehensiveReport() {
    console.log('📈 7月花火综合检查报告\n');
    
    // 基础统计
    console.log('📊 基础统计:');
    console.log(`   总level5文件: ${this.results.total}个`);
    console.log(`   7月花火活动: ${this.results.julyEvents.length}个`);
    console.log(`   非7月活动: ${this.results.nonJulyEvents.length}个`);
    console.log(`   验证错误: ${this.results.validationErrors.length}个`);
    console.log('');

    // 地区覆盖报告
    const expectedRegions = Object.keys(REGION_CONFIG);
    const foundRegions = Object.keys(this.results.regionStats).filter(r => r !== '未知地区');
    
    console.log('🏮 地区覆盖详情:');
    console.log(`   预期地区: ${expectedRegions.length}个`);
    console.log(`   发现地区: ${foundRegions.length}个`);
    console.log('');

    expectedRegions.forEach(region => {
      const events = this.results.regionStats[region] || [];
      const config = REGION_CONFIG[region];
      const withOfficialSites = events.filter(e => e.officialWebsites.length > 0).length;
      
      console.log(`🏮 七月${region}花火:`);
      console.log(`   活动数量: ${events.length}个 (预期: ${config.expectedCount.min}-${config.expectedCount.max}个)`);
      console.log(`   官网覆盖: ${withOfficialSites}/${events.length}个 (${Math.round(withOfficialSites/events.length*100)||0}%)`);
      
      if (events.length < config.expectedCount.min) {
        console.log(`   ⚠️ 活动数量低于预期最小值`);
      } else if (events.length > config.expectedCount.max) {
        console.log(`   ⚠️ 活动数量超过预期最大值`);
      } else {
        console.log(`   ✅ 活动数量在预期范围内`);
      }
      
      events.forEach((event, index) => {
        console.log(`   ${index + 1}. ${event.title}`);
        console.log(`      📁 ${event.filename}`);
        if (event.officialWebsites.length > 0) {
          console.log(`      🌐 ${event.officialWebsites.join(', ')}`);
        } else {
          console.log(`      ❌ 缺少官方网站`);
        }
      });
      console.log('');
    });

    // 验证错误报告
    if (this.results.validationErrors.length > 0) {
      console.log('🚨 数据验证错误:');
      this.results.validationErrors.forEach(error => {
        console.log(`   📁 ${error.filename}:`);
        error.issues.forEach(issue => {
          console.log(`      ❌ ${issue}`);
        });
      });
      console.log('');
    }
  }

  // 验证完整性
  validateCompleteness() {
    const expectedRegions = Object.keys(REGION_CONFIG);
    const foundRegions = Object.keys(this.results.regionStats).filter(r => r !== '未知地区');
    const missingRegions = expectedRegions.filter(r => !foundRegions.includes(r));
    
    let success = true;
    
    if (missingRegions.length > 0) {
      console.log(`🚨 严重问题：缺失地区 ${missingRegions.join(', ')}`);
      success = false;
    }
    
    if (this.results.validationErrors.length > 0) {
      console.log(`⚠️ 发现 ${this.results.validationErrors.length} 个数据验证错误`);
    }
    
    // 保存详细报告
    const reportPath = path.join(__dirname, '../july-comprehensive-check-report.json');
    fs.writeFileSync(reportPath, JSON.stringify({
      timestamp: new Date().toISOString(),
      summary: {
        totalFiles: this.results.total,
        julyEvents: this.results.julyEvents.length,
        nonJulyEvents: this.results.nonJulyEvents.length,
        validationErrors: this.results.validationErrors.length,
        expectedRegions: expectedRegions.length,
        foundRegions: foundRegions.length,
        missingRegions,
        success
      },
      regionStats: this.results.regionStats,
      validationErrors: this.results.validationErrors,
      fullResults: this.results
    }, null, 2));
    
    console.log(`💾 详细报告已保存: ${reportPath}`);
    
    if (success) {
      console.log('\n✅ 7月花火数据完整性检查通过！');
    } else {
      console.log('\n❌ 7月花火数据完整性检查失败！');
    }
    
    return success;
  }
}

// 运行检查
async function main() {
  const checker = new JulyFireworksChecker();
  const success = await checker.performComprehensiveCheck();
  process.exit(success ? 0 : 1);
}

main().catch(error => {
  console.error('💥 系统错误:', error);
  process.exit(1);
}); 