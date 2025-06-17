import { chromium } from 'playwright';
import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as path from 'path';

interface HanabiEvent {
  id: string;
  name: string;
  japaneseName: string;
  date: string;
  location: string;
  expectedVisitors: string;
  fireworksCount: string;
  source: 'walkerplus' | 'project';
}

interface ComparisonResult {
  walkerPlusData: HanabiEvent[];
  projectData: HanabiEvent[];
  discrepancies: {
    missing_in_project: HanabiEvent[];
    missing_in_walkerplus: HanabiEvent[];
    data_differences: {
      event: string;
      field: string;
      walkerplus_value: string;
      project_value: string;
    }[];
  };
}

class TokyoHanabiVerifier {
  private browser: any;
  private page: any;

  async init() {
    console.log('🚀 启动浏览器...');
    this.browser = await chromium.launch({ headless: true });
    this.page = await this.browser.newPage();
  }

  async scrapeWalkerPlusData(): Promise<HanabiEvent[]> {
    console.log('📡 正在从WalkerPlus抓取东京花火数据...');
    
    try {
      await this.page.goto('https://hanabi.walkerplus.com/ranking/ar0313/', {
        waitUntil: 'networkidle',
        timeout: 30000
      });

      const html = await this.page.content();
      const $ = cheerio.load(html);
      const events: HanabiEvent[] = [];

      // 抓取花火大会列表
      $('.ranking-list li, .event-item, .hanabi-item').each((index, element) => {
        const $el = $(element);
        
        // 提取标题
        const nameElement = $el.find('h3, .event-title, .hanabi-title, a[href*="hanabi"]').first();
        const name = nameElement.text().trim();
        
        if (!name || name.length < 3) return; // 跳过无效数据
        
        // 提取日期
        let date = '';
        const dateElement = $el.find('.date, .event-date, .hanabi-date, [class*="date"]');
        if (dateElement.length > 0) {
          date = dateElement.text().trim();
        }
        
        // 提取地点
        let location = '';
        const locationElement = $el.find('.location, .venue, .place, [class*="place"], [class*="venue"]');
        if (locationElement.length > 0) {
          location = locationElement.text().trim();
        }
        
        // 提取观众数
        let expectedVisitors = '';
        const visitorElement = $el.find('[class*="visitor"], [class*="people"], .attendance');
        if (visitorElement.length > 0) {
          expectedVisitors = visitorElement.text().trim();
        }
        
        // 提取花火数
        let fireworksCount = '';
        const fireworksElement = $el.find('[class*="firework"], [class*="count"], .number');
        if (fireworksElement.length > 0) {
          fireworksCount = fireworksElement.text().trim();
        }

        if (name && name.includes('花火')) {
          events.push({
            id: `walkerplus-${index}`,
            name: name,
            japaneseName: name,
            date: date || '日期待确认',
            location: location || '地点待确认',
            expectedVisitors: expectedVisitors || '观众数待确认',
            fireworksCount: fireworksCount || '花火数待确认',
            source: 'walkerplus'
          });
        }
      });

      console.log(`✅ 从WalkerPlus抓取到 ${events.length} 个花火大会数据`);
      return events;

    } catch (error) {
      console.error('❌ WalkerPlus数据抓取失败:', error);
      return [];
    }
  }

  async scrapeProjectData(): Promise<HanabiEvent[]> {
    console.log('📱 正在从本地项目抓取东京花火数据...');
    
    try {
      await this.page.goto('http://localhost:3003/tokyo/hanabi', {
        waitUntil: 'networkidle',
        timeout: 15000
      });

      const html = await this.page.content();
      const $ = cheerio.load(html);
      const events: HanabiEvent[] = [];

      // 抓取项目中的花火大会数据
      $('.event-card, .hanabi-card, .activity-card, [class*="card"]').each((index, element) => {
        const $el = $(element);
        
        const name = $el.find('h2, h3, .title, .name, .event-title').first().text().trim();
        const date = $el.find('.date, .event-date, [class*="date"]').text().trim();
        const location = $el.find('.location, .venue, .place, [class*="location"]').text().trim();
        const expectedVisitors = $el.find('.visitors, .attendance, [class*="visitor"]').text().trim();
        const fireworksCount = $el.find('.fireworks, .count, [class*="firework"]').text().trim();

        if (name && name.length > 2) {
          events.push({
            id: `project-${index}`,
            name: name,
            japaneseName: name,
            date: date || '日期未设置',
            location: location || '地点未设置',
            expectedVisitors: expectedVisitors || '观众数未设置',
            fireworksCount: fireworksCount || '花火数未设置',
            source: 'project'
          });
        }
      });

      console.log(`✅ 从本地项目抓取到 ${events.length} 个花火大会数据`);
      return events;

    } catch (error) {
      console.error('❌ 本地项目数据抓取失败:', error);
      return [];
    }
  }

  compareData(walkerPlusData: HanabiEvent[], projectData: HanabiEvent[]): ComparisonResult {
    console.log('🔍 开始对比数据...');
    
    const result: ComparisonResult = {
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
          if (wpEvent[field as keyof HanabiEvent] !== pEvent[field as keyof HanabiEvent]) {
            result.discrepancies.data_differences.push({
              event: pEvent.name,
              field: field,
              walkerplus_value: wpEvent[field as keyof HanabiEvent] as string,
              project_value: pEvent[field as keyof HanabiEvent] as string
            });
          }
        });
      }
    });

    return result;
  }

  private isSameEvent(name1: string, name2: string): boolean {
    // 简化名称对比逻辑
    const normalize = (name: string) => name.replace(/[花火大会\s]/g, '').toLowerCase();
    return normalize(name1) === normalize(name2);
  }

  generateReport(result: ComparisonResult): string {
    let report = '\n🔍 东京花火大会数据对比报告\n';
    report += '='.repeat(50) + '\n\n';

    report += `📊 数据统计:\n`;
    report += `- WalkerPlus官方数据: ${result.walkerPlusData.length} 个花火大会\n`;
    report += `- 本地项目数据: ${result.projectData.length} 个花火大会\n\n`;

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

  async saveReport(report: string, result: ComparisonResult) {
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