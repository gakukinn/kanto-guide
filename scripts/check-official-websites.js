const fs = require('fs');
const path = require('path');

console.log('🔍 第一步：检查五层页面官方网站\n');

class OfficialWebsiteChecker {
  constructor() {
    this.results = [];
    this.stats = {
      totalLevel5Files: 0,
      hasOfficialWebsite: 0,
      noOfficialWebsite: 0,
      onlyWalkerPlus: 0
    };
  }

  // 检查所有五层文件
  checkAllLevel5Files() {
    const dataDir = path.join(__dirname, '../src/data');
    const level5Files = fs.readdirSync(dataDir)
      .filter(f => f.includes('level5') && f.endsWith('.ts'));

    console.log(`📂 发现 ${level5Files.length} 个五层页面文件\n`);

    level5Files.forEach(file => {
      this.checkSingleFile(file);
    });

    this.stats.totalLevel5Files = level5Files.length;
  }

  // 检查单个文件
  checkSingleFile(filename) {
    try {
      const filePath = path.join(__dirname, '../src/data', filename);
      const content = fs.readFileSync(filePath, 'utf8');
      
      const result = this.analyzeOfficialWebsites(filename, content);
      this.results.push(result);
      
      // 更新统计
      if (result.hasNonWalkerPlusWebsite) {
        this.stats.hasOfficialWebsite++;
      } else if (result.onlyWalkerPlus) {
        this.stats.onlyWalkerPlus++;
      } else {
        this.stats.noOfficialWebsite++;
      }

    } catch (error) {
      console.log(`❌ 读取文件错误 ${filename}: ${error.message}`);
      this.results.push({
        filename,
        error: error.message,
        hasNonWalkerPlusWebsite: false,
        onlyWalkerPlus: false,
        websites: []
      });
    }
  }

  // 分析文件中的官方网站
  analyzeOfficialWebsites(filename, content) {
    const result = {
      filename,
      hasNonWalkerPlusWebsite: false,
      onlyWalkerPlus: false,
      websites: [],
      walkerPlusLinks: []
    };

    // 匹配所有HTTP(S)链接
    const urlRegex = /https?:\/\/[^\s"'`<>)}\]]+/gi;
    const urls = content.match(urlRegex) || [];

    // 分类网站链接
    urls.forEach(url => {
      if (url.includes('walkerplus.com')) {
        result.walkerPlusLinks.push(url);
      } else {
        // 过滤掉一些明显不是官方网站的链接
        if (!this.isExcludedDomain(url)) {
          result.websites.push(url);
        }
      }
    });

    // 判断结果
    result.hasNonWalkerPlusWebsite = result.websites.length > 0;
    result.onlyWalkerPlus = result.walkerPlusLinks.length > 0 && result.websites.length === 0;

    return result;
  }

  // 排除一些不是官方网站的域名
  isExcludedDomain(url) {
    const excludedDomains = [
      'google.com',
      'maps.google.com',
      'googleapis.com',
      'github.com',
      'localhost',
      'example.com',
      'test.com',
      'vercel.app',
      'netlify.app'
    ];

    return excludedDomains.some(domain => url.includes(domain));
  }

  // 生成详细报告
  generateReport() {
    console.log('📊 五层页面官方网站检查报告\n');
    
    // 统计信息
    console.log('📈 统计结果:');
    console.log(`   总五层文件数: ${this.stats.totalLevel5Files}`);
    console.log(`   有官方网站: ${this.stats.hasOfficialWebsite}`);
    console.log(`   只有WalkerPlus: ${this.stats.onlyWalkerPlus}`);
    console.log(`   无官方网站: ${this.stats.noOfficialWebsite}\n`);

    // 有官方网站的文件
    const withOfficialWebsite = this.results.filter(r => r.hasNonWalkerPlusWebsite);
    if (withOfficialWebsite.length > 0) {
      console.log('✅ 有官方网站的页面:');
      withOfficialWebsite.forEach(result => {
        console.log(`\n📄 ${result.filename}:`);
        result.websites.forEach(website => {
          console.log(`   🌐 ${website}`);
        });
      });
      console.log('\n');
    }

    // 只有WalkerPlus的文件
    const onlyWalkerPlus = this.results.filter(r => r.onlyWalkerPlus);
    if (onlyWalkerPlus.length > 0) {
      console.log('⚠️ 只有WalkerPlus链接的页面:');
      onlyWalkerPlus.forEach(result => {
        console.log(`   📄 ${result.filename}`);
      });
      console.log('\n');
    }

    // 无官方网站的文件
    const noWebsite = this.results.filter(r => !r.hasNonWalkerPlusWebsite && !r.onlyWalkerPlus);
    if (noWebsite.length > 0) {
      console.log('❌ 无官方网站的页面:');
      noWebsite.forEach(result => {
        console.log(`   📄 ${result.filename}`);
      });
      console.log('\n');
    }

    // 生成需要处理的清单
    this.generateActionItems();

    return {
      total: this.stats.totalLevel5Files,
      withOfficialWebsite: this.stats.hasOfficialWebsite,
      onlyWalkerPlus: this.stats.onlyWalkerPlus,
      noOfficialWebsite: this.stats.noOfficialWebsite,
      results: this.results
    };
  }

  // 生成行动清单
  generateActionItems() {
    console.log('📋 下一步行动清单:\n');

    const needOfficialWebsite = this.results.filter(r => 
      !r.hasNonWalkerPlusWebsite && !r.error
    );

    if (needOfficialWebsite.length > 0) {
      console.log('🎯 需要添加官方网站的页面:');
      needOfficialWebsite.forEach(result => {
        console.log(`   • ${result.filename} - 需要查找并添加官方网站链接`);
      });
      console.log('\n');
    }

    const withOfficialWebsite = this.results.filter(r => r.hasNonWalkerPlusWebsite);
    if (withOfficialWebsite.length > 0) {
      console.log('✅ 下一步可进行信息核对的页面:');
      withOfficialWebsite.forEach(result => {
        console.log(`   • ${result.filename} - 可与官方网站核对信息`);
        result.websites.forEach(website => {
          console.log(`     📍 ${website}`);
        });
      });
    }
  }

  // 保存结果到文件
  saveResults() {
    const reportData = {
      timestamp: new Date().toISOString(),
      stats: this.stats,
      results: this.results
    };

    const reportPath = path.join(__dirname, '../official-website-check-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(reportData, null, 2));
    
    console.log(`\n💾 详细结果已保存到: ${reportPath}`);
  }
}

// 执行检查
const checker = new OfficialWebsiteChecker();
checker.checkAllLevel5Files();
const report = checker.generateReport();
checker.saveResults();

// 显示总结
console.log('🎯 第一步检查完成！');
console.log(`✅ 发现 ${report.withOfficialWebsite} 个页面有官方网站`);
console.log(`⚠️ 发现 ${report.onlyWalkerPlus + report.noOfficialWebsite} 个页面需要添加官方网站`);

process.exit(0); 