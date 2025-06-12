const fs = require('fs');
const path = require('path');

console.log('🔗 综合链接完整性检查系统\n');

// 合并原有的4个链接完整性检查功能
class LinkIntegrityChecker {
  constructor() {
    this.issues = [];
    this.stats = {
      totalLinks: 0,
      validLinks: 0,
      brokenLinks: 0,
      missingFiles: 0
    };
  }

  // 1. 检查详情链接完整性
  checkDetailLinks() {
    console.log('🎯 检查详情链接完整性...');
    
    const level4Files = fs.readdirSync(path.join(__dirname, '../src/data'))
      .filter(f => f.includes('level4') && f.endsWith('.ts'));

    level4Files.forEach(file => {
      try {
        const content = fs.readFileSync(path.join(__dirname, '../src/data', file), 'utf8');
        this.validateDetailLinks(file, content);
      } catch (error) {
        this.issues.push(`❌ ${file}: ${error.message}`);
      }
    });
  }

  validateDetailLinks(filename, content) {
    const detailLinkRegex = /detailLink:\s*['"`]([^'"`]+)['"`]/g;
    let match;
    
    while ((match = detailLinkRegex.exec(content)) !== null) {
      const link = match[1];
      this.stats.totalLinks++;
      
      // 检查对应的页面文件是否存在
      const pagePath = this.getPagePath(link);
      
      if (fs.existsSync(pagePath)) {
        this.stats.validLinks++;
      } else {
        this.stats.brokenLinks++;
        this.issues.push(`❌ ${filename}: 链接指向不存在的页面: ${link}`);
        this.issues.push(`   期望页面文件: ${pagePath}`);
      }
    }
  }

  getPagePath(link) {
    // 转换链接为页面文件路径
    const parts = link.split('/').filter(p => p);
    return path.join(__dirname, '../src/app', ...parts, 'page.tsx');
  }

  // 2. 检查缺失链接
  checkMissingLinks() {
    console.log('🔍 检查缺失链接...');
    
    const level4Files = fs.readdirSync(path.join(__dirname, '../src/data'))
      .filter(f => f.includes('level4') && f.endsWith('.ts'));

    level4Files.forEach(file => {
      try {
        const content = fs.readFileSync(path.join(__dirname, '../src/data', file), 'utf8');
        this.checkForMissingDetailLinks(file, content);
      } catch (error) {
        this.issues.push(`❌ ${file}: ${error.message}`);
      }
    });
  }

  checkForMissingDetailLinks(filename, content) {
    // 检查是否有活动没有detailLink
    const eventMatches = content.match(/{\s*name:/g);
    const linkMatches = content.match(/detailLink:/g);
    
    const eventCount = eventMatches ? eventMatches.length : 0;
    const linkCount = linkMatches ? linkMatches.length : 0;
    
    if (eventCount > linkCount) {
      this.issues.push(`⚠️ ${filename}: 发现${eventCount - linkCount}个活动缺少detailLink`);
    }
  }

  // 3. 检查Tokyo特定链接
  checkTokyoLinks() {
    console.log('🗼 检查Tokyo地区链接...');
    
    const tokyoFile = path.join(__dirname, '../src/data/level4-july-tokyo-hanabi.ts');
    
    if (fs.existsSync(tokyoFile)) {
      const content = fs.readFileSync(tokyoFile, 'utf8');
      this.validateTokyoSpecificLinks(content);
    } else {
      this.issues.push('❌ Tokyo数据文件不存在');
    }
  }

  validateTokyoSpecificLinks(content) {
    const expectedTokyoEvents = [
      'tokyo-keibajo-hanabi',
      'tachikawa-hanabi',
      'mikurajima-hanabi',
      'sumidagawa-hanabi',
      'edogawa-hanabi',
      'itabashi-hanabi'
    ];

    expectedTokyoEvents.forEach(event => {
      const linkPattern = new RegExp(`/july/hanabi/tokyo/${event}`);
      const pageFile = path.join(__dirname, `../src/app/july/hanabi/tokyo/${event}/page.tsx`);
      
      if (linkPattern.test(content)) {
        if (fs.existsSync(pageFile)) {
          this.stats.validLinks++;
        } else {
          this.stats.brokenLinks++;
          this.issues.push(`❌ Tokyo ${event}: 页面文件不存在`);
        }
      }
    });
  }

  // 4. 修复建议
  generateFixSuggestions() {
    console.log('🔧 生成修复建议...');
    
    const suggestions = [];
    
    this.issues.forEach(issue => {
      if (issue.includes('页面文件不存在')) {
        const eventName = this.extractEventName(issue);
        if (eventName) {
          suggestions.push(`创建页面: src/app/july/hanabi/*/${eventName}/page.tsx`);
        }
      }
      
      if (issue.includes('缺少detailLink')) {
        suggestions.push('为活动添加detailLink字段');
      }
    });

    if (suggestions.length > 0) {
      console.log('\n💡 修复建议:');
      [...new Set(suggestions)].forEach(suggestion => {
        console.log(`   • ${suggestion}`);
      });
    }
  }

  extractEventName(issue) {
    const match = issue.match(/([a-z-]+):/);
    return match ? match[1] : null;
  }

  // 生成报告
  generateReport() {
    console.log('\n📊 链接完整性检查报告:');
    console.log(`   总链接数: ${this.stats.totalLinks}`);
    console.log(`   正常链接: ${this.stats.validLinks}`);
    console.log(`   损坏链接: ${this.stats.brokenLinks}`);
    
    if (this.issues.length > 0) {
      console.log('\n🚨 发现的链接问题:');
      this.issues.forEach(issue => console.log(`   ${issue}`));
    } else {
      console.log('\n✅ 所有链接检查通过！');
    }

    this.generateFixSuggestions();

    return {
      success: this.issues.length === 0,
      totalIssues: this.issues.length,
      stats: this.stats
    };
  }

  // 运行所有检查
  runAllChecks() {
    this.checkDetailLinks();
    this.checkMissingLinks();
    this.checkTokyoLinks();
    return this.generateReport();
  }
}

// 执行检查
const checker = new LinkIntegrityChecker();
const result = checker.runAllChecks();

process.exit(result.success ? 0 : 1); 