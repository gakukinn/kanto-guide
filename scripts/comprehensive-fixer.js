const fs = require('fs');
const path = require('path');

console.log('🔧 综合数据修复工具\n');

// 合并原有的4个修复工具功能
class ComprehensiveFixer {
  constructor() {
    this.fixedIssues = [];
    this.failedFixes = [];
    this.stats = {
      totalFixes: 0,
      successfulFixes: 0,
      failedFixes: 0
    };
  }

  // 1. 修复损坏的链接
  fixBrokenLinks() {
    console.log('🔗 修复损坏的链接...');
    
    const level4Files = fs.readdirSync(path.join(__dirname, '../src/data'))
      .filter(f => f.includes('level4') && f.endsWith('.ts'));

    level4Files.forEach(file => {
      try {
        const filePath = path.join(__dirname, '../src/data', file);
        let content = fs.readFileSync(filePath, 'utf8');
        const originalContent = content;
        
        // 修复常见链接错误
        content = this.fixLinkPatterns(content);
        
        if (content !== originalContent) {
          fs.writeFileSync(filePath, content);
          this.fixedIssues.push(`✅ ${file}: 修复链接格式`);
          this.stats.successfulFixes++;
        }
      } catch (error) {
        this.failedFixes.push(`❌ ${file}: ${error.message}`);
        this.stats.failedFixes++;
      }
      this.stats.totalFixes++;
    });
  }

  fixLinkPatterns(content) {
    // 修复各种链接格式问题
    let fixed = content;
    
    // 修复缺少协议的链接
    fixed = fixed.replace(/detailLink:\s*['"`](?!https?:\/\/)([^'"`]+)['"`]/g, 'detailLink: "/$1"');
    
    // 修复重复斜杠
    fixed = fixed.replace(/detailLink:\s*['"`]\/+/g, 'detailLink: "/');
    
    // 修复错误的路径格式
    fixed = fixed.replace(/detailLink:\s*['"`]\/july\/hanabi\/([^\/]+)\/([^'"`\/]+)\/['"`]/g, 'detailLink: "/july/hanabi/$1/$2"');
    
    return fixed;
  }

  // 2. 修复地图URL
  fixMapUrls() {
    console.log('🗺️ 修复地图URL...');
    
    const level5Files = fs.readdirSync(path.join(__dirname, '../src/data'))
      .filter(f => f.includes('level5') && f.endsWith('.ts'));

    level5Files.forEach(file => {
      try {
        const filePath = path.join(__dirname, '../src/data', file);
        let content = fs.readFileSync(filePath, 'utf8');
        const originalContent = content;
        
        // 修复地图URL问题
        content = this.fixMapUrlPatterns(content);
        
        if (content !== originalContent) {
          fs.writeFileSync(filePath, content);
          this.fixedIssues.push(`✅ ${file}: 修复地图URL`);
          this.stats.successfulFixes++;
        }
      } catch (error) {
        this.failedFixes.push(`❌ ${file}: ${error.message}`);
        this.stats.failedFixes++;
      }
      this.stats.totalFixes++;
    });
  }

  fixMapUrlPatterns(content) {
    let fixed = content;
    
    // 添加缺失的地图URL
    if (!content.includes('mapEmbedUrl:') || content.includes('mapEmbedUrl: ""')) {
      // 尝试从venue信息生成基础地图URL
      const venueMatch = content.match(/venue:\s*{[^}]*name:\s*['"`]([^'"`]+)['"`]/);
      if (venueMatch) {
        const venueName = venueMatch[1];
        const mapUrl = `https://www.google.com/maps/embed/v1/search?key=YOUR_API_KEY&q=${encodeURIComponent(venueName)}`;
        fixed = fixed.replace(
          /(venue:\s*{[^}]*})/,
          `$1,\n  mapEmbedUrl: "${mapUrl}"`
        );
      }
    }
    
    // 修复无效的地图URL格式
    fixed = fixed.replace(/mapEmbedUrl:\s*['"`](?!https?:\/\/)([^'"`]+)['"`]/g, 'mapEmbedUrl: "https://www.google.com/maps/embed/v1/search?key=YOUR_API_KEY&q=$1"');
    
    return fixed;
  }

  // 3. 修复日期格式
  fixDateFormats() {
    console.log('📅 修复日期格式...');
    
    const allDataFiles = fs.readdirSync(path.join(__dirname, '../src/data'))
      .filter(f => f.endsWith('.ts') && (f.includes('level4') || f.includes('level5')));

    allDataFiles.forEach(file => {
      try {
        const filePath = path.join(__dirname, '../src/data', file);
        let content = fs.readFileSync(filePath, 'utf8');
        const originalContent = content;
        
        // 修复日期格式问题
        content = this.fixDatePatterns(content);
        
        if (content !== originalContent) {
          fs.writeFileSync(filePath, content);
          this.fixedIssues.push(`✅ ${file}: 修复日期格式`);
          this.stats.successfulFixes++;
        }
      } catch (error) {
        this.failedFixes.push(`❌ ${file}: ${error.message}`);
        this.stats.failedFixes++;
      }
      this.stats.totalFixes++;
    });
  }

  fixDatePatterns(content) {
    let fixed = content;
    
    // 统一日期格式
    fixed = fixed.replace(/date:\s*['"`](\d{1,2})月(\d{1,2})日['"`]/g, 'date: "$1月$2日"');
    
    // 修复范围日期格式
    fixed = fixed.replace(/date:\s*['"`](\d{1,2})月(\d{1,2})日[\s\-〜]+(\d{1,2})月(\d{1,2})日['"`]/g, 'date: "$1月$2日-$3月$4日"');
    
    // 修复连续日期格式
    fixed = fixed.replace(/date:\s*['"`](\d{1,2})月(\d{1,2})日・(\d{1,2})日['"`]/g, 'date: "$1月$2日・$3日"');
    
    // 修复英文日期格式
    fixed = fixed.replace(/date:\s*['"`](July|August|September)\s+(\d{1,2})['"`]/g, (match, month, day) => {
      const monthMap = { 'July': '7', 'August': '8', 'September': '9' };
      return `date: "${monthMap[month]}月${day}日"`;
    });
    
    return fixed;
  }

  // 4. 花火数据更新和修复
  updateHanabiData() {
    console.log('🎆 更新花火数据...');
    
    const level4Files = fs.readdirSync(path.join(__dirname, '../src/data'))
      .filter(f => f.includes('level4') && f.endsWith('.ts'));

    level4Files.forEach(file => {
      try {
        const filePath = path.join(__dirname, '../src/data', file);
        let content = fs.readFileSync(filePath, 'utf8');
        const originalContent = content;
        
        // 更新花火数据格式
        content = this.updateDataFormats(content);
        
        if (content !== originalContent) {
          fs.writeFileSync(filePath, content);
          this.fixedIssues.push(`✅ ${file}: 更新数据格式`);
          this.stats.successfulFixes++;
        }
      } catch (error) {
        this.failedFixes.push(`❌ ${file}: ${error.message}`);
        this.stats.failedFixes++;
      }
      this.stats.totalFixes++;
    });
  }

  updateDataFormats(content) {
    let fixed = content;
    
    // 修复访客数格式
    fixed = fixed.replace(/visitors:\s*['"`](\d+)人['"`]/g, 'visitors: "$1人"');
    fixed = fixed.replace(/visitors:\s*['"`]约(\d+)万人['"`]/g, 'visitors: "约$1万人"');
    
    // 修复花火数格式
    fixed = fixed.replace(/fireworks:\s*['"`](\d+)発['"`]/g, 'fireworks: "$1发"');
    fixed = fixed.replace(/fireworks:\s*['"`]约(\d+)发['"`]/g, 'fireworks: "约$1发"');
    
    // 修复红心数格式
    fixed = fixed.replace(/likes:\s*['"`](\d+)['"`]/g, 'likes: $1');
    
    // 修复地区名称中文化
    const regionMap = {
      'Tokyo': '东京',
      'Saitama': '埼玉',
      'Chiba': '千叶',
      'Kanagawa': '神奈川'
    };
    
    Object.entries(regionMap).forEach(([en, cn]) => {
      fixed = fixed.replace(new RegExp(`area:\\s*['"\`]${en}['"\`]`, 'g'), `area: "${cn}"`);
    });
    
    return fixed;
  }

  // 生成修复报告
  generateReport() {
    console.log('\n📊 综合修复报告:');
    console.log(`   尝试修复: ${this.stats.totalFixes}`);
    console.log(`   成功修复: ${this.stats.successfulFixes}`);
    console.log(`   修复失败: ${this.stats.failedFixes}`);
    
    if (this.fixedIssues.length > 0) {
      console.log('\n✅ 成功修复的问题:');
      this.fixedIssues.forEach(issue => console.log(`   ${issue}`));
    }
    
    if (this.failedFixes.length > 0) {
      console.log('\n❌ 修复失败的问题:');
      this.failedFixes.forEach(issue => console.log(`   ${issue}`));
    }

    if (this.fixedIssues.length === 0 && this.failedFixes.length === 0) {
      console.log('\n✅ 没有发现需要修复的问题！');
    }

    return {
      success: this.failedFixes.length === 0,
      totalFixed: this.fixedIssues.length,
      totalFailed: this.failedFixes.length,
      stats: this.stats
    };
  }

  // 运行所有修复
  runAllFixes() {
    this.fixBrokenLinks();
    this.fixMapUrls();
    this.fixDateFormats();
    this.updateHanabiData();
    return this.generateReport();
  }
}

// 执行修复
const fixer = new ComprehensiveFixer();
const result = fixer.runAllFixes();

process.exit(result.success ? 0 : 1); 