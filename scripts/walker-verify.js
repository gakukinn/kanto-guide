import { chromium } from 'playwright';
import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as path from 'path';

class WalkerPlusVerifier {
  constructor() {
    this.browser = null;
    this.page = null;
  }

  async init() {
    console.log('🚀 启动浏览器进行WalkerPlus数据抓取...');
    this.browser = await chromium.launch({ headless: false });
    this.page = await this.browser.newPage();
  }

  async scrapeWalkerPlus() {
    console.log('📡 访问 https://hanabi.walkerplus.com/ranking/ar0313/');
    
    try {
      await this.page.goto('https://hanabi.walkerplus.com/ranking/ar0313/', {
        waitUntil: 'networkidle',
        timeout: 60000
      });

      console.log('⏳ 等待页面加载...');
      await this.page.waitForTimeout(5000);

      const html = await this.page.content();
      const $ = cheerio.load(html);
      
      console.log('🔍 页面标题:', $('title').text());
      
      const events = [];
      
      // 查找所有包含花火大会的链接和文本
      $('a, h1, h2, h3, h4, .title, .name').each((index, element) => {
        const $el = $(element);
        const text = $el.text().trim();
        
        if (text.includes('花火大会') && 
            text.length > 5 && 
            text.length < 100 &&
            !text.includes('ランキング') &&
            !text.includes('人気') &&
            !text.includes('について')) {
          
          console.log(`✅ 发现: ${text}`);
          
          // 尝试从周围元素提取更多信息
          const parent = $el.closest('li, div, article, section');
          const fullText = parent.text();
          
          events.push({
            name: text,
            date: this.extractDate(fullText) || '日期待确认',
            location: this.extractLocation(fullText) || '地点待确认',
            expectedVisitors: this.extractVisitors(fullText) || '观众数待确认',
            fireworksCount: this.extractFireworks(fullText) || '花火数待确认'
          });
        }
      });
      
      console.log(`📊 抓取到 ${events.length} 个花火大会`);
      return events;
      
    } catch (error) {
      console.error('❌ 抓取失败:', error.message);
      return [];
    }
  }

  extractDate(text) {
    const patterns = [
      /(\d{1,2})月(\d{1,2})日/,
      /2025[年\/\-](\d{1,2})[月\/\-](\d{1,2})/
    ];
    
    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        return match[3] ? `2025年${match[2]}月${match[3]}日` : `2025年${match[1]}月${match[2]}日`;
      }
    }
    return null;
  }

  extractLocation(text) {
    const keywords = ['区', '市', '町', '公園', '会場', '河川敷', '競馬場', '外苑'];
    const lines = text.split('\n');
    
    for (const line of lines) {
      for (const keyword of keywords) {
        if (line.includes(keyword) && line.length < 50) {
          return line.trim();
        }
      }
    }
    return null;
  }

  extractVisitors(text) {
    const match = text.match(/[約约]?(\d+(?:\.\d+)?)[万萬]人/);
    return match ? `约${match[1]}万人` : null;
  }

  extractFireworks(text) {
    const match = text.match(/[約约]?(\d+(?:\.\d+)?)[万萬]?[発発]/);
    return match ? `约${match[1]}${match[1].includes('.') ? '' : '万'}发` : null;
  }

  compareWithProject(walkerData) {
    const projectData = [
      { name: '第48回 隅田川花火大会', date: '2025年7月26日', location: '隅田川（台东区・墨田区）', expectedVisitors: '约91万人', fireworksCount: '约2万发' },
      { name: '神宮外苑花火大会', date: '2025年8月16日', location: '明治神宫外苑', expectedVisitors: '约100万人', fireworksCount: '约1万2000发' },
      { name: '東京競馬場花火大会', date: '2025年7月2日', location: '东京竞马场', expectedVisitors: '约6万人', fireworksCount: '约1万4000发' },
      { name: '江戸川区花火大会', date: '2025年8月2日', location: '江戸川河川敷', expectedVisitors: '约3万人', fireworksCount: '約1万4000発' },
      { name: '第59回葛饰纳凉花火大会', date: '2025年7月22日', location: '葛饰区柴又野球场', expectedVisitors: '约77万人', fireworksCount: '約1万5000発' }
    ];

    console.log('\n🔍 开始对比项目数据与WalkerPlus数据...');
    
    const report = {
      matches: [],
      missingInWalker: [],
      missingInProject: [],
      differences: []
    };

    // 检查项目数据在WalkerPlus中的匹配情况
    projectData.forEach(pEvent => {
      const match = walkerData.find(wEvent => this.isMatch(pEvent.name, wEvent.name));
      if (match) {
        console.log(`✅ 匹配: ${pEvent.name}`);
        report.matches.push({ project: pEvent, walker: match });
        
        // 检查详细信息差异
        if (pEvent.date !== match.date && match.date !== '日期待确认') {
          report.differences.push({
            event: pEvent.name,
            field: 'date',
            project: pEvent.date,
            walker: match.date
          });
        }
      } else {
        console.log(`❌ 项目中有但WalkerPlus中未找到: ${pEvent.name}`);
        report.missingInWalker.push(pEvent);
      }
    });

    // 检查WalkerPlus中项目没有的
    walkerData.forEach(wEvent => {
      const match = projectData.find(pEvent => this.isMatch(pEvent.name, wEvent.name));
      if (!match) {
        console.log(`⚠️ WalkerPlus中有但项目中没有: ${wEvent.name}`);
        report.missingInProject.push(wEvent);
      }
    });

    return report;
  }

  isMatch(name1, name2) {
    const normalize = (name) => name.replace(/第\d+回\s?|花火大会|の打ち上げ数・日程など|\s/g, '').toLowerCase();
    return normalize(name1).includes(normalize(name2)) || normalize(name2).includes(normalize(name1));
  }

  generateReport(walkerData, projectReport) {
    let report = '\n🔍 WalkerPlus数据核实报告 (Playwright+Cheerio)\n';
    report += '='.repeat(50) + '\n\n';
    
    report += `📊 数据统计:\n`;
    report += `- WalkerPlus抓取: ${walkerData.length} 个花火大会\n`;
    report += `- 项目数据: 5 个花火大会\n`;
    report += `- 成功匹配: ${projectReport.matches.length} 个\n\n`;

    if (walkerData.length > 0) {
      report += `📡 WalkerPlus实际抓取数据:\n`;
      walkerData.forEach((event, index) => {
        report += `${index + 1}. ${event.name}\n`;
        report += `   📅 日期: ${event.date}\n`;
        report += `   📍 地点: ${event.location}\n`;
        report += `   👥 观众数: ${event.expectedVisitors}\n`;
        report += `   🎆 花火数: ${event.fireworksCount}\n\n`;
      });
    }

    if (projectReport.matches.length > 0) {
      report += `✅ 成功匹配的花火大会:\n`;
      projectReport.matches.forEach((match, index) => {
        report += `${index + 1}. ${match.project.name}\n`;
        report += `   项目: ${match.project.date} | ${match.project.expectedVisitors} | ${match.project.fireworksCount}\n`;
        report += `   WalkerPlus: ${match.walker.date} | ${match.walker.expectedVisitors} | ${match.walker.fireworksCount}\n\n`;
      });
    }

    if (projectReport.missingInWalker.length > 0) {
      report += `❌ WalkerPlus中未找到的项目数据:\n`;
      projectReport.missingInWalker.forEach((event, index) => {
        report += `${index + 1}. ${event.name}\n`;
      });
      report += '\n';
    }

    if (projectReport.differences.length > 0) {
      report += `📝 数据差异:\n`;
      projectReport.differences.forEach((diff, index) => {
        report += `${index + 1}. ${diff.event} - ${diff.field}\n`;
        report += `   项目: "${diff.project}"\n`;
        report += `   WalkerPlus: "${diff.walker}"\n\n`;
      });
    }

    return report;
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
      console.log('🔚 浏览器已关闭');
    }
  }

  async run() {
    try {
      await this.init();
      
      const walkerData = await this.scrapeWalkerPlus();
      const projectReport = this.compareWithProject(walkerData);
      const report = this.generateReport(walkerData, projectReport);
      
      console.log(report);
      
      // 保存报告
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const reportPath = path.join(process.cwd(), `walker-verification-${timestamp}.md`);
      fs.writeFileSync(reportPath, report, 'utf8');
      console.log(`📄 报告已保存: ${reportPath}`);
      
    } catch (error) {
      console.error('❌ 验证过程错误:', error);
    } finally {
      await this.close();
    }
  }
}

console.log('🎯 开始WalkerPlus数据验证...');
const verifier = new WalkerPlusVerifier();
verifier.run().catch(console.error); 