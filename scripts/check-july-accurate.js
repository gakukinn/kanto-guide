const fs = require('fs');
const path = require('path');

console.log('🎯 7月花火精确检查系统\n');

// 基于实际level4数据文件的精确配置
const ACCURATE_JULY_CONFIG = {
  '东京': {
    level4File: 'level4-july-tokyo-hanabi.ts',
    expectedCount: 6,
    level5Files: [
      'level5-july-hanabi-tokyo-keibajo.ts',
      'level5-july-hanabi-katsushika-noryo.ts', 
      'level5-july-hanabi-tokyo-sumida.ts',
      'level5-july-hanabi-tokyo-hachioji.ts',
      'level5-july-hanabi-tokyo-tachikawa.ts',
      'level5-july-hanabi-mikurajima.ts'
    ]
  },
  '埼玉': {
    level4File: 'level4-july-saitama-hanabi.ts',
    expectedCount: 6,
    level5Files: [
      'level5-july-hanabi-iruma-base.ts',
      'level5-july-hanabi-koshigaya.ts',
      'level5-july-hanabi-ogawa-tanabata.ts',
      'level5-july-hanabi-saitama-owada.ts',
      'level5-july-hanabi-seibu-en.ts',
      'level5-july-hanabi-metsza-nordic.ts'
    ]
  },
  '千叶': {
    level4File: 'level4-july-chiba-hanabi.ts',
    expectedCount: 6, // 根据用户之前的信息
    level5Files: [] // 需要检查实际文件
  },
  '神奈川': {
    level4File: 'level4-july-kanagawa-hanabi.ts',
    expectedCount: 3, // 根据用户之前的信息
    level5Files: [] // 需要检查实际文件
  },
  '北关东': {
    level4File: 'level4-july-kitakanto-hanabi.ts',
    expectedCount: 4, // 根据用户之前的信息
    level5Files: [
      'level5-tamura-hanabi.ts',
      'level5-mito-hanabi.ts',
      'level5-moka-hanabi.ts',
      'level5-tatebayashi-hanabi.ts'
    ]
  },
  '甲信越': {
    level4File: 'level4-july-koshinetsu-hanabi.ts',
    expectedCount: 5, // 根据用户之前的信息
    level5Files: [
      'level5-gion-kashiwazaki-hanabi.ts',
      'level5-fuji-kawaguchi-lake-hanabi.ts',
      'level5-suzaka-minna-hanabi.ts',
      'level5-anime-classics-anisong-hanabi.ts',
      'level5-sanjo-natsumatsuri-hanabi.ts',
      'level5-nojiri-lake-hanabi.ts'
    ]
  }
};

class AccurateJulyChecker {
  constructor() {
    this.dataDir = path.join(__dirname, '../src/data');
    this.results = {
      regions: {},
      totalExpected: 0,
      totalFound: 0,
      errors: []
    };
  }

  // 读取level4文件获取活动数量
  readLevel4Config(region, configFile) {
    const filePath = path.join(this.dataDir, configFile);
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      
      // 提取events数组或类似结构
      const eventsMatch = content.match(/export const \w*events?\w*:\s*\w+\[\]\s*=\s*\[([\s\S]*?)\];/);
      if (eventsMatch) {
        // 计算事件数量（通过计算对象数量）
        const eventsContent = eventsMatch[1];
        const eventCount = (eventsContent.match(/{\s*id:/g) || []).length;
        return eventCount;
      }
      
      // 备用方法：查找totalEvents字段
      const totalMatch = content.match(/totalEvents:\s*(\d+)/);
      if (totalMatch) {
        return parseInt(totalMatch[1]);
      }
      
      return 0;
    } catch (error) {
      console.error(`❌ 读取${region}的level4文件失败:`, error.message);
      return 0;
    }
  }

  // 检查level5文件是否存在
  checkLevel5Files(region, expectedFiles) {
    const foundFiles = [];
    const missingFiles = [];
    
    expectedFiles.forEach(filename => {
      const filePath = path.join(this.dataDir, filename);
      if (fs.existsSync(filePath)) {
        foundFiles.push(filename);
      } else {
        missingFiles.push(filename);
      }
    });
    
    return { foundFiles, missingFiles };
  }

  // 验证官方网站
  verifyOfficialWebsites(files) {
    const websiteInfo = [];
    
    files.forEach(filename => {
      const filePath = path.join(this.dataDir, filename);
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        
        // 提取活动名称
        const titleMatch = content.match(/title:\s*['"`]([^'"`]+)['"`]/);
        const title = titleMatch ? titleMatch[1] : '未知活动';
        
        // 提取官方网站
        const websites = [];
        
        const officialMatch = content.match(/officialWebsite:\s*['"`]([^'"`]+)['"`]/);
        if (officialMatch) websites.push(officialMatch[1]);
        
        const websiteMatch = content.match(/website:\s*['"`]([^'"`]+)['"`]/);
        if (websiteMatch && !websites.includes(websiteMatch[1])) {
          websites.push(websiteMatch[1]);
        }
        
        // 过滤官方网站
        const officialSites = websites.filter(site => 
          !site.includes('walkerplus') && 
          !site.includes('unsplash') && 
          !site.includes('youtube') &&
          !site.includes('google.com/maps')
        );
        
        websiteInfo.push({
          filename,
          title,
          officialWebsites: officialSites,
          hasOfficialSite: officialSites.length > 0
        });
        
      } catch (error) {
        websiteInfo.push({
          filename,
          title: '读取失败',
          officialWebsites: [],
          hasOfficialSite: false,
          error: error.message
        });
      }
    });
    
    return websiteInfo;
  }

  // 执行精确检查
  performAccurateCheck() {
    console.log('🔍 基于level4配置文件的精确检查...\n');
    
    Object.entries(ACCURATE_JULY_CONFIG).forEach(([region, config]) => {
      console.log(`🏮 检查${region}地区:`);
      
      // 读取level4配置
      const level4Count = this.readLevel4Config(region, config.level4File);
      console.log(`   📊 Level4配置: ${level4Count}个活动`);
      console.log(`   🎯 预期数量: ${config.expectedCount}个活动`);
      
      // 检查level5文件
      const { foundFiles, missingFiles } = this.checkLevel5Files(region, config.level5Files);
      console.log(`   📁 Level5文件: ${foundFiles.length}个存在，${missingFiles.length}个缺失`);
      
      // 验证官方网站
      const websiteInfo = this.verifyOfficialWebsites(foundFiles);
      const withOfficialSites = websiteInfo.filter(info => info.hasOfficialSite).length;
      
      console.log(`   🌐 官方网站: ${withOfficialSites}/${foundFiles.length}个 (${Math.round(withOfficialSites/foundFiles.length*100)||0}%)`);
      
      // 显示详细信息
      if (foundFiles.length > 0) {
        console.log('   ✅ 存在的活动:');
        websiteInfo.forEach((info, index) => {
          console.log(`      ${index + 1}. ${info.title}`);
          console.log(`         📁 ${info.filename}`);
          if (info.hasOfficialSite) {
            console.log(`         🌐 ${info.officialWebsites.join(', ')}`);
          } else {
            console.log(`         ❌ 缺少官方网站`);
          }
        });
      }
      
      if (missingFiles.length > 0) {
        console.log('   ❌ 缺失的文件:');
        missingFiles.forEach(file => {
          console.log(`      - ${file}`);
        });
      }
      
      // 检查数量一致性
      if (level4Count !== config.expectedCount) {
        console.log(`   ⚠️ Level4数量(${level4Count})与预期(${config.expectedCount})不一致`);
      }
      
      if (foundFiles.length !== config.expectedCount) {
        console.log(`   ⚠️ Level5文件数量(${foundFiles.length})与预期(${config.expectedCount})不一致`);
      }
      
      if (level4Count === config.expectedCount && foundFiles.length === config.expectedCount) {
        console.log('   ✅ 数量检查通过');
      }
      
      console.log('');
      
      // 保存结果
      this.results.regions[region] = {
        expected: config.expectedCount,
        level4Count,
        level5Count: foundFiles.length,
        missingFiles,
        websiteInfo,
        officialSiteCoverage: withOfficialSites / foundFiles.length * 100 || 0
      };
      
      this.results.totalExpected += config.expectedCount;
      this.results.totalFound += foundFiles.length;
    });
    
    // 生成总结
    this.generateSummary();
  }

  // 生成总结报告
  generateSummary() {
    console.log('📊 7月花火精确检查总结:\n');
    
    console.log('📈 各地区统计:');
    Object.entries(this.results.regions).forEach(([region, data]) => {
      const status = data.level5Count === data.expected ? '✅' : '❌';
      console.log(`   ${region}: ${status} ${data.level5Count}/${data.expected}个 (官网覆盖${Math.round(data.officialSiteCoverage)}%)`);
    });
    
    console.log(`\n🎯 总计: ${this.results.totalFound}/${this.results.totalExpected}个活动`);
    
    const accuracy = Math.round(this.results.totalFound / this.results.totalExpected * 100);
    console.log(`📊 完整性: ${accuracy}%`);
    
    if (accuracy === 100) {
      console.log('\n✅ 7月花火数据完整性检查通过！');
    } else {
      console.log('\n❌ 7月花火数据存在缺失，需要补充！');
    }
    
    // 保存详细报告
    const reportPath = path.join(__dirname, '../july-accurate-check-report.json');
    fs.writeFileSync(reportPath, JSON.stringify({
      timestamp: new Date().toISOString(),
      summary: {
        totalExpected: this.results.totalExpected,
        totalFound: this.results.totalFound,
        accuracy: accuracy
      },
      regions: this.results.regions
    }, null, 2));
    
    console.log(`💾 详细报告已保存: ${reportPath}`);
  }
}

// 运行精确检查
const checker = new AccurateJulyChecker();
checker.performAccurateCheck(); 