import { chromium } from 'playwright';
import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as path from 'path';

class TokyoHanabiVerifier {
  constructor() {
    this.browser = null;
    this.page = null;
  }

  async init() {
    console.log('🚀 启动浏览器...');
    this.browser = await chromium.launch({ headless: true });
    this.page = await this.browser.newPage();
  }

  async scrapeWalkerPlusData() {
    console.log('📡 正在从WalkerPlus抓取东京花火数据...');
    
    try {
      await this.page.goto('https://hanabi.walkerplus.com/ranking/ar0313/', {
        waitUntil: 'networkidle',
        timeout: 30000
      });

      // 等待页面加载
      await this.page.waitForTimeout(3000);

      const html = await this.page.content();
      const $ = cheerio.load(html);
      const events = [];

      console.log('🔍 分析WalkerPlus页面结构...');

      // 尝试多种可能的选择器
      const selectors = [
        '.ranking-list .ranking-item',
        '.ranking-list li',
        '.event-list .event-item',
        '.hanabi-list .hanabi-item',
        '.list-item',
        'article',
        '.content-item',
        '.item'
      ];

      let foundElements = false;
      for (const selector of selectors) {
        const elements = $(selector);
        if (elements.length > 0) {
          console.log(`✅ 找到 ${elements.length} 个元素使用选择器: ${selector}`);
          foundElements = true;
          
          elements.each((index, element) => {
            const $el = $(element);
            
            // 提取标题 - 尝试多种可能的选择器
            const titleSelectors = ['h1', 'h2', 'h3', 'h4', '.title', '.name', '.event-name', 'a'];
            let name = '';
            for (const titleSel of titleSelectors) {
              const titleEl = $el.find(titleSel).first();
              if (titleEl.length > 0) {
                name = titleEl.text().trim();
                if (name && name.length > 3) break;
              }
            }
            
            // 只处理包含"花火"的项目
            if (!name || !name.includes('花火')) return;
            
            // 提取其他信息
            let date = this.extractInfo($el, ['.date', '.time', '[class*="date"]', '[class*="time"]']);
            let location = this.extractInfo($el, ['.place', '.location', '.venue', '[class*="place"]', '[class*="location"]']);
            let visitors = this.extractInfo($el, ['.visitor', '.people', '.attendance', '[class*="visitor"]', '[class*="people"]']);
            let fireworks = this.extractInfo($el, ['.firework', '.count', '.number', '[class*="firework"]', '[class*="count"]']);

            events.push({
              id: `walkerplus-${index}`,
              name: name,
              japaneseName: name,
              date: date || '日期待确认',
              location: location || '地点待确认',
              expectedVisitors: visitors || '观众数待确认',
              fireworksCount: fireworks || '花火数待确认',
              source: 'walkerplus'
            });
          });
          break;
        }
      }

      if (!foundElements) {
        console.log('⚠️ 未找到预期的元素，尝试通用抓取...');
        // 通用抓取：查找所有包含"花火"文本的元素
        $('*').each((index, element) => {
          const $el = $(element);
          const text = $el.text();
          if (text.includes('花火') && text.includes('大会') && text.length < 100) {
            events.push({
              id: `walkerplus-generic-${index}`,
              name: text.trim(),
              japaneseName: text.trim(),
              date: '日期待确认',
              location: '地点待确认',
              expectedVisitors: '观众数待确认',
              fireworksCount: '花火数待确认',
              source: 'walkerplus'
            });
          }
        });
      }

      console.log(`✅ 从WalkerPlus抓取到 ${events.length} 个花火大会数据`);
      
      if (events.length === 0) {
        console.log('📄 页面内容预览:');
        console.log($('body').text().substring(0, 500) + '...');
      }

      return events;

    } catch (error) {
      console.error('❌ WalkerPlus数据抓取失败:', error.message);
      return [];
    }
  }

  extractInfo($element, selectors) {
    for (const selector of selectors) {
      const el = $element.find(selector);
      if (el.length > 0) {
        const text = el.text().trim();
        if (text && text.length > 0) {
          return text;
        }
      }
    }
    return '';
  }

  async scrapeProjectData() {
    console.log('📱 正在从本地项目抓取东京花火数据...');
    
    try {
      await this.page.goto('http://localhost:3003/tokyo/hanabi', {
        waitUntil: 'networkidle',
        timeout: 15000
      });

      const html = await this.page.content();
      const $ = cheerio.load(html);
      const events = [];

      // 尝试多种可能的卡片选择器
      const cardSelectors = [
        '.event-card',
        '.hanabi-card', 
        '.activity-card',
        '.card',
        '[class*="card"]',
        '.item',
        '.event-item',
        'article',
        '.content'
      ];

      let foundCards = false;
      for (const selector of cardSelectors) {
        const cards = $(selector);
        if (cards.length > 0) {
          console.log(`✅ 找到 ${cards.length} 个卡片使用选择器: ${selector}`);
          foundCards = true;

          cards.each((index, element) => {
            const $el = $(element);
            
            const name = this.extractInfo($el, ['h1', 'h2', 'h3', '.title', '.name', '.event-title']);
            const date = this.extractInfo($el, ['.date', '.event-date', '[class*="date"]']);
            const location = this.extractInfo($el, ['.location', '.venue', '.place', '[class*="location"]']);
            const visitors = this.extractInfo($el, ['.visitors', '.attendance', '[class*="visitor"]']);
            const fireworks = this.extractInfo($el, ['.fireworks', '.count', '[class*="firework"]']);

            if (name && name.length > 2) {
              events.push({
                id: `project-${index}`,
                name: name,
                japaneseName: name,
                date: date || '日期未设置',
                location: location || '地点未设置',
                expectedVisitors: visitors || '观众数未设置',
                fireworksCount: fireworks || '花火数未设置',
                source: 'project'
              });
            }
          });
          break;
        }
      }

      if (!foundCards) {
        console.log('⚠️ 未找到卡片元素，检查页面是否正常加载...');
        console.log('📄 页面标题:', $('title').text());
        console.log('📄 页面内容预览:', $('body').text().substring(0, 300) + '...');
      }

      console.log(`✅ 从本地项目抓取到 ${events.length} 个花火大会数据`);
      return events;

    } catch (error) {
      console.error('❌ 本地项目数据抓取失败:', error.message);
      return [];
    }
  }

  compareData(walkerPlusData, projectData) {
    console.log('🔍 开始对比数据...');
    
    const result = {
      walkerPlusData,
      projectData,
      discrepancies: {
        missing_in_project: [],
        missing_in_walkerplus: [],
        data_differences: []
      }
    };

    // 检查WalkerPlus中有但项目中没有的
    walkerPlusData.forEach(wpEvent => {
      const found = projectData.find(pEvent => 
        this.isSameEvent(wpEvent.name, pEvent.name)
      );
      if (!found) {
        result.discrepancies.missing_in_project.push(wpEvent);
      }
    });

    // 检查项目中有但WalkerPlus中没有的
    projectData.forEach(pEvent => {
      const found = walkerPlusData.find(wpEvent => 
        this.isSameEvent(wpEvent.name, pEvent.name)
      );
      if (!found) {
        result.discrepancies.missing_in_walkerplus.push(pEvent);
      }
    });

    // 检查相同活动的数据差异
    projectData.forEach(pEvent => {
      const wpEvent = walkerPlusData.find(wp => 
        this.isSameEvent(wp.name, pEvent.name)
      );
      
      if (wpEvent) {
        // 比较各个字段
        const fields = ['date', 'location', 'expectedVisitors', 'fireworksCount'];
        fields.forEach(field => {
          if (wpEvent[field] !== pEvent[field]) {
            result.discrepancies.data_differences.push({
              event: pEvent.name,
              field: field,
              walkerplus_value: wpEvent[field],
              project_value: pEvent[field]
            });
          }
        });
      }
    });

    return result;
  }

  isSameEvent(name1, name2) {
    // 简化名称对比逻辑
    const normalize = (name) => name.replace(/[花火大会\s]/g, '').toLowerCase();
    return normalize(name1) === normalize(name2);
  }

  generateReport(result) {
    let report = '\n🔍 东京花火大会数据对比报告\n';
    report += '='.repeat(50) + '\n\n';

    report += `📊 数据统计:\n`;
    report += `- WalkerPlus官方数据: ${result.walkerPlusData.length} 个花火大会\n`;
    report += `- 本地项目数据: ${result.projectData.length} 个花火大会\n\n`;

    // 显示WalkerPlus数据
    if (result.walkerPlusData.length > 0) {
      report += `📡 WalkerPlus官方数据:\n`;
      result.walkerPlusData.forEach((event, index) => {
        report += `${index + 1}. ${event.name}\n`;
        report += `   日期: ${event.date}\n`;
        report += `   地点: ${event.location}\n`;
        report += `   观众数: ${event.expectedVisitors}\n`;
        report += `   花火数: ${event.fireworksCount}\n\n`;
      });
    }

    // 显示项目数据
    if (result.projectData.length > 0) {
      report += `💻 本地项目数据:\n`;
      result.projectData.forEach((event, index) => {
        report += `${index + 1}. ${event.name}\n`;
        report += `   日期: ${event.date}\n`;
        report += `   地点: ${event.location}\n`;
        report += `   观众数: ${event.expectedVisitors}\n`;
        report += `   花火数: ${event.fireworksCount}\n\n`;
      });
    }

    if (result.discrepancies.missing_in_project.length > 0) {
      report += `❌ 项目中缺失的花火大会 (${result.discrepancies.missing_in_project.length}个):\n`;
      result.discrepancies.missing_in_project.forEach((event, index) => {
        report += `${index + 1}. ${event.name}\n`;
        report += `   日期: ${event.date}\n`;
        report += `   地点: ${event.location}\n`;
        report += `   观众数: ${event.expectedVisitors}\n`;
        report += `   花火数: ${event.fireworksCount}\n\n`;
      });
    }

    if (result.discrepancies.missing_in_walkerplus.length > 0) {
      report += `⚠️ WalkerPlus中未找到的项目数据 (${result.discrepancies.missing_in_walkerplus.length}个):\n`;
      result.discrepancies.missing_in_walkerplus.forEach((event, index) => {
        report += `${index + 1}. ${event.name}\n\n`;
      });
    }

    if (result.discrepancies.data_differences.length > 0) {
      report += `📝 数据差异 (${result.discrepancies.data_differences.length}项):\n`;
      result.discrepancies.data_differences.forEach((diff, index) => {
        report += `${index + 1}. ${diff.event} - ${diff.field}\n`;
        report += `   WalkerPlus: "${diff.walkerplus_value}"\n`;
        report += `   项目数据: "${diff.project_value}"\n\n`;
      });
    }

    if (result.discrepancies.missing_in_project.length === 0 && 
        result.discrepancies.missing_in_walkerplus.length === 0 && 
        result.discrepancies.data_differences.length === 0) {
      report += '✅ 所有数据完全一致！\n';
    }

    return report;
  }

  async saveReport(report, result) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const reportPath = path.join(process.cwd(), `tokyo-hanabi-verification-${timestamp}.md`);
    const dataPath = path.join(process.cwd(), `tokyo-hanabi-data-${timestamp}.json`);

    // 保存报告
    fs.writeFileSync(reportPath, report, 'utf8');
    console.log(`📄 报告已保存到: ${reportPath}`);

    // 保存原始数据
    fs.writeFileSync(dataPath, JSON.stringify(result, null, 2), 'utf8');
    console.log(`💾 原始数据已保存到: ${dataPath}`);
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
      
      const walkerPlusData = await this.scrapeWalkerPlusData();
      const projectData = await this.scrapeProjectData();
      
      const result = this.compareData(walkerPlusData, projectData);
      const report = this.generateReport(result);
      
      console.log(report);
      await this.saveReport(report, result);
      
    } catch (error) {
      console.error('❌ 验证过程中发生错误:', error);
    } finally {
      await this.close();
    }
  }
}

// 运行验证
const verifier = new TokyoHanabiVerifier();
verifier.run().catch(console.error); 