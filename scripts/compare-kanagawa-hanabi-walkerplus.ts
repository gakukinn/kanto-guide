/**
 * 使用Playwright+Cheerio+Crawlee技术对比神奈川花火数据
 * 目标：对比WalkerPlus网站数据与本地三层神奈川花火列表，找出遗漏的重要花火信息
 */

import { PlaywrightCrawler, Dataset } from 'crawlee';
import * as cheerio from 'cheerio';
import fs from 'fs';

// 花火数据接口
interface HanabiEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  source: string;
}

class KanagawaHanabiComparator {
  private walkerPlusData: HanabiEvent[] = [];
  private localData: any[] = [];
  private missingEvents: HanabiEvent[] = [];

  // 步骤1: 使用Crawlee抓取WalkerPlus数据
  async scrapeWalkerPlusData(): Promise<void> {
    console.log('🚀 使用Playwright+Cheerio+Crawlee抓取WalkerPlus神奈川花火数据...');
    
    const crawler = new PlaywrightCrawler({
      // 强制使用Playwright+Cheerio技术栈
      launchContext: {
        useChrome: true,
      },
      
      maxRequestRetries: 3,
      requestHandlerTimeoutSecs: 60,
      maxConcurrency: 1,
      
      requestHandler: async ({ page, request, log }) => {
        log.info(`🔍 正在抓取: ${request.url}`);
        
        try {
          // Playwright自动处理页面加载
          await page.waitForLoadState('domcontentloaded');
          await page.waitForTimeout(3000);
          
          // 获取页面内容
          const content = await page.content();
          
          // 使用Cheerio解析HTML（严格按照你的技术栈要求）
          const $ = cheerio.load(content);
          
          log.info('📋 开始使用Cheerio解析花火数据...');
          
          // 查找花火列表容器
          const hanabiSelectors = [
            '.event-list',
            '.hanabi-list', 
            '[class*="event"]',
            '[class*="hanabi"]',
            '.item-list',
            'article',
            '.content-item'
          ];
          
          let foundEvents = false;
          
          for (const selector of hanabiSelectors) {
            const container = $(selector);
            if (container.length > 0) {
              log.info(`✅ 找到花火容器: ${selector}`);
              
              // 提取花火事件
              container.find('li, .item, .card, div').each((index, element) => {
                const $event = $(element);
                const text = $event.text().trim();
                
                // 检查是否为花火相关内容
                if (this.isHanabiEvent(text)) {
                  const eventData = this.extractHanabiData($event, index, request.url);
                  if (eventData) {
                    this.walkerPlusData.push(eventData);
                    foundEvents = true;
                    log.info(`🎆 提取花火: ${eventData.title}`);
                  }
                }
              });
              
              if (foundEvents) break;
            }
          }
          
          // 如果没找到结构化数据，尝试文本分析
          if (!foundEvents) {
            log.info('⚠️ 未找到结构化数据，尝试文本分析...');
            const bodyText = $('body').text();
            const textEvents = this.extractHanabiFromText(bodyText);
            this.walkerPlusData.push(...textEvents);
          }
          
          // 使用Crawlee自动保存数据
          for (const event of this.walkerPlusData) {
            await Dataset.pushData(event);
          }
          
          log.info(`✅ 成功提取 ${this.walkerPlusData.length} 个花火事件`);
          
        } catch (error: any) {
          log.error(`❌ 抓取失败: ${error.message}`);
          throw error;
        }
      },
      
      failedRequestHandler: async ({ request, log }) => {
        log.error(`💥 请求失败: ${request.url}`);
      }
    });
    
    // 添加目标URL
    await crawler.addRequests(['https://hanabi.walkerplus.com/launch/ar0314/']);
    
    // 启动Crawlee抓取
    await crawler.run();
    
    console.log(`🎯 WalkerPlus抓取完成，共获取 ${this.walkerPlusData.length} 个花火事件`);
  }

  // 步骤2: 读取本地三层神奈川花火数据
  async loadLocalKanagawaData(): Promise<void> {
    console.log('📂 读取本地三层神奈川花火数据...');
    
    try {
      // 查找神奈川相关的数据文件
      const possiblePaths = [
        'src/data/kanagawa/hanabi.json',
        'data/kanagawa/hanabi.json',
        'src/data/kanagawa-hanabi.json',
        'data/kanagawa-hanabi.json'
      ];
      
      let localDataPath: string | null = null;
      for (const filePath of possiblePaths) {
        if (fs.existsSync(filePath)) {
          localDataPath = filePath;
          break;
        }
      }
      
      if (localDataPath) {
        const rawData = fs.readFileSync(localDataPath, 'utf8');
        this.localData = JSON.parse(rawData);
        console.log(`✅ 成功读取本地数据: ${localDataPath}`);
        console.log(`📊 本地花火数量: ${this.localData.length}`);
      } else {
        console.log('⚠️ 未找到本地神奈川花火数据文件');
        this.localData = [];
      }
      
    } catch (error: any) {
      console.error('❌ 读取本地数据失败:', error.message);
      this.localData = [];
    }
  }

  // 步骤3: 对比数据，找出遗漏的重要花火
  compareData(): void {
    console.log('🔍 开始对比WalkerPlus数据与本地数据...');
    
    // 创建本地数据的标题集合（用于快速查找）
    const localTitles = new Set(
      this.localData.map(event => this.normalizeTitle(event.title || event.name || ''))
    );
    
    // 查找WalkerPlus中存在但本地缺失的花火
    this.missingEvents = this.walkerPlusData.filter(walkerEvent => {
      const normalizedTitle = this.normalizeTitle(walkerEvent.title);
      return !localTitles.has(normalizedTitle) && this.isImportantEvent(walkerEvent);
    });
    
    console.log(`📊 对比结果:`);
    console.log(`   - WalkerPlus花火数量: ${this.walkerPlusData.length}`);
    console.log(`   - 本地花火数量: ${this.localData.length}`);
    console.log(`   - 遗漏的重要花火: ${this.missingEvents.length}`);
  }

  // 步骤4: 生成详细报告
  generateReport(): void {
    console.log('\n📋 神奈川花火数据对比报告');
    console.log('='.repeat(60));
    
    if (this.missingEvents.length === 0) {
      console.log('🎉 恭喜！本地数据已包含所有重要花火信息');
      return;
    }
    
    console.log(`⚠️ 发现 ${this.missingEvents.length} 个遗漏的重要花火信息：\n`);
    
    this.missingEvents.forEach((event, index) => {
      console.log(`${index + 1}. 🎆 ${event.title}`);
      console.log(`   📅 日期: ${event.date}`);
      console.log(`   📍 地点: ${event.location}`);
      console.log(`   📝 描述: ${event.description}`);
      console.log(`   🔗 来源: ${event.source}`);
      console.log('');
    });
    
    // 保存报告到文件
    const reportData = {
      timestamp: new Date().toISOString(),
      walkerPlusCount: this.walkerPlusData.length,
      localCount: this.localData.length,
      missingCount: this.missingEvents.length,
      missingEvents: this.missingEvents
    };
    
    const reportPath = `kanagawa-hanabi-comparison-${new Date().toISOString().slice(0, 10)}.json`;
    fs.writeFileSync(reportPath, JSON.stringify(reportData, null, 2), 'utf8');
    
    console.log(`💾 详细报告已保存到: ${reportPath}`);
  }

  // 辅助方法：判断是否为花火事件
  private isHanabiEvent(text: string): boolean {
    const keywords = ['花火', 'hanabi', '花火大会', '花火祭', '烟花', '烟火'];
    return keywords.some(keyword => text.toLowerCase().includes(keyword.toLowerCase()));
  }

  // 辅助方法：提取花火数据
  private extractHanabiData($element: any, index: number, sourceUrl: string): HanabiEvent | null {
    try {
      const text = $element.text().trim();
      
      // 提取标题
      let title = $element.find('h1, h2, h3, .title, .name').first().text().trim();
      if (!title) {
        const lines = text.split('\n').filter((line: string) => line.trim());
        title = lines[0]?.trim() || `神奈川花火${index + 1}`;
      }
      
      // 提取日期
      const dateMatch = text.match(/(\d{1,2})[月\/](\d{1,2})[日]?|(\d{4})[年\/\-](\d{1,2})[月\/\-](\d{1,2})[日]?/);
      let date = '日期待定';
      if (dateMatch) {
        if (dateMatch[1] && dateMatch[2]) {
          date = `${dateMatch[1]}月${dateMatch[2]}日`;
        } else if (dateMatch[3] && dateMatch[4] && dateMatch[5]) {
          date = `${dateMatch[3]}年${dateMatch[4]}月${dateMatch[5]}日`;
        }
      }
      
      // 提取地点
      let location = '神奈川县';
      const locationMatch = text.match(/([\u4e00-\u9fff]+[市町村区]|[\u4e00-\u9fff]+公园|[\u4e00-\u9fff]+会场)/);
      if (locationMatch) {
        location = locationMatch[1];
      }
      
      return {
        id: `kanagawa-hanabi-${Date.now()}-${index}`,
        title: this.cleanTitle(title),
        date,
        location,
        description: text.substring(0, 200) + '...',
        source: sourceUrl
      };
      
    } catch (error: any) {
      console.error('提取花火数据时出错:', error);
      return null;
    }
  }

  // 辅助方法：从文本中提取花火信息
  private extractHanabiFromText(text: string): HanabiEvent[] {
    const events: HanabiEvent[] = [];
    const lines = text.split('\n').filter(line => line.trim());
    
    lines.forEach((line, index) => {
      if (this.isHanabiEvent(line)) {
        events.push({
          id: `text-hanabi-${index}`,
          title: line.trim(),
          date: '日期待定',
          location: '神奈川县',
          description: line.trim(),
          source: 'text-analysis'
        });
      }
    });
    
    return events;
  }

  // 辅助方法：标准化标题（用于对比）
  private normalizeTitle(title: string): string {
    return title.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // 辅助方法：清理标题
  private cleanTitle(title: string): string {
    return title.replace(/[\r\n\t]/g, ' ').replace(/\s+/g, ' ').trim();
  }

  // 辅助方法：判断是否为重要事件
  private isImportantEvent(event: HanabiEvent): boolean {
    const importantKeywords = ['大会', '祭', 'festival', '大型', '著名', '人気'];
    return importantKeywords.some(keyword => 
      event.title.toLowerCase().includes(keyword.toLowerCase()) ||
      event.description.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  // 主执行方法
  async run(): Promise<void> {
    try {
      console.log('🎆 开始神奈川花火数据对比分析...\n');
      
      // 步骤1: 使用Crawlee抓取WalkerPlus数据
      await this.scrapeWalkerPlusData();
      
      // 步骤2: 读取本地数据
      await this.loadLocalKanagawaData();
      
      // 步骤3: 对比数据
      this.compareData();
      
      // 步骤4: 生成报告
      this.generateReport();
      
      console.log('\n✅ 神奈川花火数据对比分析完成！');
      
    } catch (error: any) {
      console.error('💥 分析过程中出错:', error.message);
      throw error;
    }
  }
}

// 主执行函数
async function main(): Promise<void> {
  const comparator = new KanagawaHanabiComparator();
  
  try {
    await comparator.run();
    
  } catch (error: any) {
    console.error('💥 执行失败:', error);
    process.exit(1);
  }
}

// 运行脚本
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export default KanagawaHanabiComparator; 