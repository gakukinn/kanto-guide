import { chromium } from 'playwright';
import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as path from 'path';

/**
 * 🎯 同步WalkerPlus数据一致性验证器
 * 专为控制台运行设计，快速显示结果
 */
class SyncWalkerVerification {
  constructor() {
    this.results = {
      walkerPlusData: [],
      projectData: [],
      report: ''
    };
  }

  async quickVerify() {
    console.log('🎯 开始WalkerPlus数据快速验证...');
    
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    
    try {
      // Step 1: 抓取WalkerPlus数据
      console.log('📡 正在访问WalkerPlus...');
      await page.goto('https://hanabi.walkerplus.com/ranking/ar0313/', { 
        waitUntil: 'networkidle', 
        timeout: 30000 
      });
      
      await page.waitForTimeout(3000);
      const walkerHtml = await page.content();
      const $walker = cheerio.load(walkerHtml);
      
      console.log(`🔍 WalkerPlus页面标题: ${$walker('title').text()}`);
      
      // 抓取花火大会信息
      const walkerEvents = [];
      $walker('*').each((index, element) => {
        const text = $walker(element).text().trim();
        if (text.includes('花火大会') && 
            text.length > 8 && 
            text.length < 50 &&
            !text.includes('ランキング') &&
            !text.includes('について')) {
          
          const eventName = text.replace(/第\d+回\s?/, '').trim();
          if (!walkerEvents.find(e => e.name === eventName)) {
            console.log(`✅ WalkerPlus发现: ${eventName}`);
            walkerEvents.push({
              name: eventName,
              source: 'WalkerPlus官方'
            });
          }
        }
      });
      
      this.results.walkerPlusData = walkerEvents.slice(0, 10); // 限制数量避免重复
      
      // Step 2: 抓取项目数据
      console.log('📱 正在访问项目页面...');
      await page.goto('http://localhost:3004/tokyo/hanabi', { 
        waitUntil: 'networkidle', 
        timeout: 30000 
      });
      
      await page.waitForTimeout(2000);
      const projectHtml = await page.content();
      const $project = cheerio.load(projectHtml);
      
      console.log(`🔍 项目页面标题: ${$project('title').text()}`);
      
      // 抓取项目花火大会信息
      const projectEvents = [];
      $project('*').each((index, element) => {
        const text = $project(element).text().trim();
        if ((text.includes('花火大会') || text.includes('花火祭')) && 
            text.length > 8 && 
            text.length < 100) {
          
          const eventName = text.replace(/第\d+回\s?/, '').trim();
          if (!projectEvents.find(e => e.name === eventName)) {
            console.log(`✅ 项目发现: ${eventName}`);
            
            // 尝试提取详细信息
            const container = $project(element).closest('div, section, article, li');
            const containerText = container.text();
            
            projectEvents.push({
              name: eventName,
              date: this.extractInfo(containerText, ['2025', '月', '日']),
              location: this.extractInfo(containerText, ['区', '市', '公园', '会场', '河川敷']),
              visitors: this.extractInfo(containerText, ['万人', '人']),
              fireworks: this.extractInfo(containerText, ['万发', '发', '万發', '發']),
              source: '项目数据'
            });
          }
        }
      });
      
      this.results.projectData = projectEvents.slice(0, 20); // 限制数量
      
      // Step 3: 生成对比报告
      this.generateComparisonReport();
      
    } catch (error) {
      console.error('❌ 验证过程出错:', error.message);
      this.results.report = `验证失败: ${error.message}`;
    } finally {
      await browser.close();
    }
    
    return this.results;
  }
  
  extractInfo(text, keywords) {
    for (const keyword of keywords) {
      const regex = new RegExp(`([^\\s]*${keyword}[^\\s]*)`, 'g');
      const match = text.match(regex);
      if (match && match[0]) {
        return match[0];
      }
    }
    return '未找到';
  }
  
  generateComparisonReport() {
    let report = `
# 🎯 WalkerPlus数据一致性验证报告
**验证时间**: ${new Date().toLocaleString('zh-CN')}

## 📊 验证结果摘要
- **WalkerPlus抓取**: ${this.results.walkerPlusData.length} 个花火大会
- **项目数据**: ${this.results.projectData.length} 个花火大会

## 📡 WalkerPlus官方数据
`;

    this.results.walkerPlusData.forEach((event, index) => {
      report += `${index + 1}. ${event.name}\n`;
    });

    report += `
## 📱 项目数据
`;

    this.results.projectData.forEach((event, index) => {
      report += `${index + 1}. ${event.name}
   - 日期: ${event.date}
   - 地点: ${event.location}
   - 观众数: ${event.visitors}
   - 花火数: ${event.fireworks}
`;
    });

    // 对比分析
    report += `
## 🔍 一致性分析
`;

    const walkerNames = this.results.walkerPlusData.map(e => e.name.toLowerCase());
    const projectNames = this.results.projectData.map(e => e.name.toLowerCase());
    
    let matchCount = 0;
    let inconsistencies = [];
    
    this.results.projectData.forEach(projectEvent => {
      const found = this.results.walkerPlusData.find(walkerEvent => 
        this.isNameMatch(projectEvent.name, walkerEvent.name)
      );
      
      if (found) {
        matchCount++;
        report += `✅ 匹配: ${projectEvent.name} ↔ ${found.name}\n`;
      } else {
        inconsistencies.push(`❌ 项目中有但WalkerPlus中未找到: ${projectEvent.name}`);
      }
    });
    
    this.results.walkerPlusData.forEach(walkerEvent => {
      const found = this.results.projectData.find(projectEvent => 
        this.isNameMatch(projectEvent.name, walkerEvent.name)
      );
      
      if (!found) {
        inconsistencies.push(`⚠️ WalkerPlus中有但项目中未找到: ${walkerEvent.name}`);
      }
    });

    if (inconsistencies.length > 0) {
      report += `
## ❌ 不一致项目
`;
      inconsistencies.forEach(item => {
        report += `${item}\n`;
      });
    }

    report += `
## 🎯 结论
- 匹配度: ${matchCount}/${this.results.projectData.length}
- ${inconsistencies.length === 0 ? '✅ 数据高度一致！' : `⚠️ 发现 ${inconsistencies.length} 处不一致`}
`;

    this.results.report = report;
    console.log(report);
  }
  
  isNameMatch(name1, name2) {
    const normalize = (name) => name.replace(/第\d+回\s?|花火大会|花火祭|\s/g, '').toLowerCase();
    const norm1 = normalize(name1);
    const norm2 = normalize(name2);
    
    return norm1.includes(norm2) || norm2.includes(norm1) || 
           norm1.replace('隅田川', '') === norm2.replace('隅田川', '') ||
           norm1.replace('神宮', '') === norm2.replace('神宮', '');
  }
}

// 执行验证
const verifier = new SyncWalkerVerification();
verifier.quickVerify().then(results => {
  console.log('\n🎉 验证完成！');
  
  // 保存报告
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const reportPath = path.join(process.cwd(), `walker-verification-${timestamp}.md`);
  fs.writeFileSync(reportPath, results.report, 'utf8');
  console.log(`📄 报告已保存: ${reportPath}`);
  
}).catch(error => {
  console.error('验证失败:', error);
  process.exit(1);
}); 