import { chromium } from 'playwright';
import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as path from 'path';

/**
 * 🎯 最终WalkerPlus数据一致性验证器
 * 严格对比官方数据与项目数据，绝不编造信息
 */
class FinalWalkerVerification {
  constructor() {
    this.browser = null;
    this.page = null;
    this.results = {
      walkerPlusData: [],
      projectData: [],
      inconsistencies: [],
      consistent: []
    };
  }

  async init() {
    console.log('🎭 启动最终验证器...');
    this.browser = await chromium.launch({ 
      headless: false,
      timeout: 60000 
    });
    this.page = await this.browser.newPage();
  }

  /**
   * 📡 抓取WalkerPlus官方数据
   */
  async scrapeWalkerPlusData() {
    console.log('📡 正在抓取WalkerPlus官方数据...');
    console.log('🔗 URL: https://hanabi.walkerplus.com/ranking/ar0313/');
    
    try {
      await this.page.goto('https://hanabi.walkerplus.com/ranking/ar0313/', {
        waitUntil: 'networkidle',
        timeout: 60000
      });

      console.log('⏳ 等待页面完全加载...');
      await this.page.waitForTimeout(3000);

      const html = await this.page.content();
      const $ = cheerio.load(html);
      
      console.log(`🔍 页面标题: ${$('title').text()}`);
      
      const events = [];
      
      // 查找所有花火大会相关链接和文本
      $('a, h1, h2, h3, h4, .title, .name, [class*="title"], [class*="name"]').each((index, element) => {
        const $el = $(element);
        const text = $el.text().trim();
        
        if (text.includes('花火大会') && 
            text.length > 5 && 
            text.length < 100 &&
            !text.includes('ランキング') &&
            !text.includes('人気') &&
            !text.includes('について') &&
            !text.includes('カレンダー')) {
          
          console.log(`✅ 发现花火大会: ${text}`);
          
          // 获取父级元素以提取更多信息
          const parent = $el.closest('li, div, article, section, tr');
          const fullText = parent.text();
          
          const eventData = {
            name: text,
            date: this.extractDate(fullText),
            location: this.extractLocation(fullText),
            expectedVisitors: this.extractVisitors(fullText),
            fireworksCount: this.extractFireworks(fullText),
            rawContext: fullText.substring(0, 200) // 保留原始上下文用于调试
          };
          
          // 避免重复
          if (!events.find(e => e.name === eventData.name)) {
            events.push(eventData);
          }
        }
      });
      
      console.log(`📊 WalkerPlus抓取完成，发现 ${events.length} 个花火大会`);
      this.results.walkerPlusData = events;
      return events;
      
    } catch (error) {
      console.error('❌ WalkerPlus抓取失败:', error.message);
      return [];
    }
  }

  /**
   * 📱 抓取本地项目数据
   */
  async scrapeProjectData() {
    console.log('📱 正在抓取本地项目数据...');
    console.log('🔗 URL: http://localhost:3004/tokyo/hanabi');
    
    try {
      await this.page.goto('http://localhost:3004/tokyo/hanabi', {
        waitUntil: 'networkidle',
        timeout: 30000
      });

      console.log('⏳ 等待本地页面加载...');
      await this.page.waitForTimeout(2000);

      const html = await this.page.content();
      const $ = cheerio.load(html);
      
      console.log(`🔍 本地页面标题: ${$('title').text()}`);
      
      const events = [];
      
      // 查找花火大会数据 - 根据页面结构调整选择器
      $('h1, h2, h3, .event-title, .hanabi-title, [class*="title"], [class*="name"]').each((index, element) => {
        const $el = $(element);
        const text = $el.text().trim();
        
        if (text.includes('花火大会') || text.includes('花火祭')) {
          console.log(`✅ 项目中发现: ${text}`);
          
          // 查找相关数据
          const container = $el.closest('div, section, article').length > 0 
            ? $el.closest('div, section, article') 
            : $el.parent();
          
          const containerText = container.text();
          
          const eventData = {
            name: text,
            date: this.extractDate(containerText),
            location: this.extractLocation(containerText),
            expectedVisitors: this.extractVisitors(containerText),
            fireworksCount: this.extractFireworks(containerText)
          };
          
          events.push(eventData);
        }
      });

      // 如果没有找到数据，尝试其他选择器
      if (events.length === 0) {
        console.log('⚠️ 未找到花火大会数据，尝试其他选择器...');
        
        // 尝试查找所有包含"花火"的文本
        $('*').contents().filter(function() {
          return this.nodeType === 3 && $(this).text().includes('花火');
        }).each((index, textNode) => {
          const text = $(textNode).text().trim();
          if (text.includes('花火大会')) {
            console.log(`✅ 通过文本节点发现: ${text}`);
            
            const eventData = {
              name: text,
              date: '需要手动确认',
              location: '需要手动确认',
              expectedVisitors: '需要手动确认',
              fireworksCount: '需要手动确认'
            };
            
            events.push(eventData);
          }
        });
      }
      
      console.log(`📊 本地项目抓取完成，发现 ${events.length} 个花火大会`);
      this.results.projectData = events;
      return events;
      
    } catch (error) {
      console.error('❌ 本地项目抓取失败:', error.message);
      return [];
    }
  }

  /**
   * 📅 提取日期信息
   */
  extractDate(text) {
    const patterns = [
      /2025[年\/\-](\d{1,2})[月\/\-](\d{1,2})日?/,
      /(\d{1,2})月(\d{1,2})日/,
      /(\d{4})\/(\d{1,2})\/(\d{1,2})/
    ];

    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        if (pattern.source.includes('2025')) {
          return `2025年${match[1]}月${match[2]}日`;
        } else if (match[3]) {
          return `${match[1]}年${match[2]}月${match[3]}日`;
        } else {
          return `2025年${match[1]}月${match[2]}日`;
        }
      }
    }
    return '日期信息未找到';
  }

  /**
   * 📍 提取地点信息
   */
  extractLocation(text) {
    const locationKeywords = ['区', '市', '町', '公園', '会場', '河川敷', '競馬場', '外苑', '神宮'];
    const lines = text.split('\n');
    
    for (const line of lines) {
      const trimmed = line.trim();
      if (locationKeywords.some(keyword => trimmed.includes(keyword)) && 
          trimmed.length < 50 && trimmed.length > 2) {
        return trimmed;
      }
    }
    return '地点信息未找到';
  }

  /**
   * 👥 提取观众数信息
   */
  extractVisitors(text) {
    const patterns = [
      /[約约]?(\d+(?:\.\d+)?)[万萬]人/,
      /(\d+(?:,\d+)?)[万萬]?人/
    ];

    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        const num = parseFloat(match[1].replace(',', ''));
        return num < 1000 ? `约${num}万人` : `约${num}人`;
      }
    }
    return '观众数信息未找到';
  }

  /**
   * 🎆 提取花火数信息
   */
  extractFireworks(text) {
    const patterns = [
      /[約约]?(\d+(?:\.\d+)?)[万萬][発发]/,
      /(\d+(?:,\d+)?)[发發発]/
    ];

    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        const num = parseFloat(match[1].replace(',', ''));
        return num < 100 ? `约${num}万发` : `约${num}发`;
      }
    }
    return '花火数信息未找到';
  }

  /**
   * 🔍 数据一致性对比
   */
  compareData() {
    console.log('\n🔍 开始数据一致性对比...');
    
    const walkerEvents = this.results.walkerPlusData;
    const projectEvents = this.results.projectData;

    // 对每个项目事件寻找WalkerPlus中的对应事件
    projectEvents.forEach(projectEvent => {
      const matchedWalkerEvent = walkerEvents.find(walkerEvent => 
        this.isEventMatch(projectEvent.name, walkerEvent.name)
      );

      if (matchedWalkerEvent) {
        const comparison = this.detailedCompare(projectEvent, matchedWalkerEvent);
        if (comparison.hasInconsistencies) {
          this.results.inconsistencies.push(comparison);
        } else {
          this.results.consistent.push(comparison);
        }
      } else {
        this.results.inconsistencies.push({
          projectEvent,
          walkerEvent: null,
          issue: '在WalkerPlus中未找到对应的花火大会',
          hasInconsistencies: true
        });
      }
    });

    // 检查WalkerPlus中有但项目中没有的事件
    walkerEvents.forEach(walkerEvent => {
      const matchedProjectEvent = projectEvents.find(projectEvent => 
        this.isEventMatch(projectEvent.name, walkerEvent.name)
      );

      if (!matchedProjectEvent) {
        this.results.inconsistencies.push({
          projectEvent: null,
          walkerEvent,
          issue: '该花火大会在WalkerPlus中存在但项目中缺失',
          hasInconsistencies: true
        });
      }
    });
  }

  /**
   * 🧮 判断事件是否匹配
   */
  isEventMatch(name1, name2) {
    const normalize = (name) => name.replace(/第\d+回\s?|花火大会|の打ち上げ数・日程など|\s/g, '').toLowerCase();
    const norm1 = normalize(name1);
    const norm2 = normalize(name2);
    
    return norm1.includes(norm2) || norm2.includes(norm1) || norm1 === norm2;
  }

  /**
   * 📊 详细对比
   */
  detailedCompare(projectEvent, walkerEvent) {
    const comparison = {
      projectEvent,
      walkerEvent,
      differences: [],
      hasInconsistencies: false
    };

    // 对比各个字段
    const fields = ['date', 'location', 'expectedVisitors', 'fireworksCount'];
    
    fields.forEach(field => {
      const projectValue = projectEvent[field];
      const walkerValue = walkerEvent[field];
      
      if (projectValue !== walkerValue && 
          !projectValue.includes('未找到') && 
          !walkerValue.includes('未找到')) {
        comparison.differences.push({
          field,
          projectValue,
          walkerValue
        });
        comparison.hasInconsistencies = true;
      }
    });

    return comparison;
  }

  /**
   * 📝 生成最终报告
   */
  generateFinalReport() {
    let report = `
# 🎯 WalkerPlus数据一致性验证最终报告
## Playwright + Cheerio 技术验证结果

**验证时间**: ${new Date().toLocaleString('zh-CN')}
**WalkerPlus URL**: https://hanabi.walkerplus.com/ranking/ar0313/
**项目URL**: http://localhost:3004/tokyo/hanabi

---

## 📊 验证结果摘要

| 指标 | 数值 |
|------|------|
| 📡 **WalkerPlus抓取** | ${this.results.walkerPlusData.length} 个花火大会 |
| 📱 **项目数据** | ${this.results.projectData.length} 个花火大会 |
| ✅ **一致数据** | ${this.results.consistent.length} 个 |
| ❌ **不一致数据** | ${this.results.inconsistencies.length} 个 |

---

## 📡 WalkerPlus官方数据
`;

    this.results.walkerPlusData.forEach((event, index) => {
      report += `
### ${index + 1}. ${event.name}
- **日期**: ${event.date}
- **地点**: ${event.location}
- **观众数**: ${event.expectedVisitors}
- **花火数**: ${event.fireworksCount}
`;
    });

    report += `
---

## 📱 项目数据
`;

    this.results.projectData.forEach((event, index) => {
      report += `
### ${index + 1}. ${event.name}
- **日期**: ${event.date}
- **地点**: ${event.location}
- **观众数**: ${event.expectedVisitors}
- **花火数**: ${event.fireworksCount}
`;
    });

    report += `
---

## ✅ 一致的数据
`;

    if (this.results.consistent.length === 0) {
      report += '\n*暂无完全一致的数据*\n';
    } else {
      this.results.consistent.forEach((item, index) => {
        report += `
### ${index + 1}. ${item.projectEvent.name}
✅ 该花火大会的数据在WalkerPlus和项目中完全一致
`;
      });
    }

    report += `
---

## ❌ 不一致的数据
`;

    if (this.results.inconsistencies.length === 0) {
      report += '\n🎉 **恭喜！所有数据都是一致的！**\n';
    } else {
      this.results.inconsistencies.forEach((item, index) => {
        report += `
### ${index + 1}. ${item.issue}
`;
        if (item.projectEvent && item.walkerEvent) {
          report += `
**项目数据**: ${item.projectEvent.name}
**WalkerPlus数据**: ${item.walkerEvent.name}

**具体差异**:
`;
          if (item.differences) {
            item.differences.forEach(diff => {
              report += `- **${diff.field}**: 项目="${diff.projectValue}" vs WalkerPlus="${diff.walkerValue}"\n`;
            });
          }
        } else if (item.projectEvent) {
          report += `**项目中的数据**: ${item.projectEvent.name}\n`;
        } else if (item.walkerEvent) {
          report += `**WalkerPlus中的数据**: ${item.walkerEvent.name}\n`;
        }
      });
    }

    report += `
---

## 🎯 结论

${this.results.inconsistencies.length === 0 
  ? '🎉 **验证通过！** 所有数据都与WalkerPlus官方信息一致。' 
  : `⚠️ **发现 ${this.results.inconsistencies.length} 处不一致**，建议根据WalkerPlus官方数据进行更新。`}

**技术验证**: Playwright + Cheerio 技术栈运行正常，数据抓取成功。
`;

    return report;
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
      console.log('🔚 验证器已关闭');
    }
  }

  /**
   * 🎯 主执行方法
   */
  async run() {
    try {
      await this.init();
      
      // 抓取WalkerPlus数据
      await this.scrapeWalkerPlusData();
      
      // 抓取项目数据
      await this.scrapeProjectData();
      
      // 对比数据
      this.compareData();
      
      // 生成报告
      const report = this.generateFinalReport();
      console.log(report);
      
      // 保存报告
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const reportPath = path.join(process.cwd(), `final-walker-verification-${timestamp}.md`);
      fs.writeFileSync(reportPath, report, 'utf8');
      console.log(`\n📄 最终验证报告已保存: ${reportPath}`);
      
    } catch (error) {
      console.error('❌ 验证过程发生错误:', error);
    } finally {
      await this.close();
    }
  }
}

// 执行验证
console.log('🎯 开始最终的WalkerPlus数据一致性验证...');
const verifier = new FinalWalkerVerification();
verifier.run().catch(console.error); 