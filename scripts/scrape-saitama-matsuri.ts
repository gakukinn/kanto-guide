import { chromium } from 'playwright';
import * as cheerio from 'cheerio';
import { promises as fs } from 'fs';
import * as path from 'path';

// 数据接口定义
interface ScrapeMatsuriEvent {
  id: string;
  title: string;
  japaneseName: string;
  englishName: string;
  date: string;
  endDate?: string;
  location: string;
  category: string;
  highlights: string[];
  likes: number;
  website: string;
  description: string;
  prefecture: string;
  region: string;
}

class SaitamaMatsuriScraper {
  private browser: any = null;
  private targetUrl = 'https://omaturilink.com/%E5%9F%BC%E7%8E%89%E7%9C%8C/';
  
  async initialize() {
    console.log('🚀 启动浏览器...');
    this.browser = await chromium.launch({ 
      headless: true,
      timeout: 60000 
    });
  }

  async scrapeMatsuriData(): Promise<ScrapeMatsuriEvent[]> {
    if (!this.browser) {
      throw new Error('浏览器未初始化');
    }

    const page = await this.browser.newPage();
    const events: ScrapeMatsuriEvent[] = [];

    try {
      console.log('📡 访问埼玉祭典页面...');
      await page.goto(this.targetUrl, { 
        waitUntil: 'domcontentloaded',
        timeout: 60000 
      });

      // 等待页面完全加载
      await page.waitForTimeout(3000);

      console.log('📋 获取页面内容...');
      const content = await page.content();
      const $ = cheerio.load(content);

      // 分析页面结构，查找祭典信息
      console.log('🔍 分析页面结构...');
      
      // 检查页面标题确认正确性
      const pageTitle = $('title').text();
      console.log(`页面标题: ${pageTitle}`);

      // 查找祭典列表容器
      const matsuriContainers = [
        '.matsuri-list',
        '.event-list', 
        '.festival-list',
        '[class*="matsuri"]',
        '[class*="festival"]',
        '[class*="event"]',
        'article',
        '.content',
        'main'
      ];

      let foundEvents = false;

      for (const selector of matsuriContainers) {
        const container = $(selector);
        if (container.length > 0) {
          console.log(`✅ 找到容器: ${selector}`);
          
          // 在容器中查找事件项
          const eventSelectors = [
            'li',
            '.item',
            '.card',
            '[class*="event"]',
            '[class*="matsuri"]',
            'div'
          ];

          for (const eventSelector of eventSelectors) {
            const eventItems = container.find(eventSelector);
            
            if (eventItems.length > 2) { // 过滤掉只有少量元素的容器
              console.log(`🎯 处理 ${eventItems.length} 个潜在事件项 (${eventSelector})`);
              
              eventItems.each((index, element) => {
                const $event = $(element);
                const text = $event.text().trim();
                
                // 检查是否包含祭典相关关键词
                if (this.isMatsuriEvent(text)) {
                  const eventData = this.extractEventData($event, index);
                  if (eventData) {
                    events.push(eventData);
                    foundEvents = true;
                    console.log(`📅 提取事件: ${eventData.title}`);
                  }
                }
              });

              if (foundEvents) break;
            }
          }
          
          if (foundEvents) break;
        }
      }

      // 如果没有找到结构化数据，尝试文本分析
      if (!foundEvents) {
        console.log('⚠️ 未找到结构化祭典数据，尝试文本分析...');
        const textContent = $('body').text();
        const textEvents = this.extractEventsFromText(textContent);
        events.push(...textEvents);
      }

      console.log(`✅ 总共提取到 ${events.length} 个祭典事件`);
      return events;

    } catch (error) {
      console.error('❌ 抓取过程中出错:', error);
      throw error;
    } finally {
      await page.close();
    }
  }

  private isMatsuriEvent(text: string): boolean {
    const keywords = [
      '祭', '祭り', '祭典', 'まつり', 'matsuri',
      '花火', '神社', '寺院', '盆踊り', '夏祭り',
      '秋祭り', '春祭り', '冬祭り', '例大祭'
    ];
    
    return keywords.some(keyword => text.includes(keyword));
  }

  private extractEventData($element: any, index: number): ScrapeMatsuriEvent | null {
    try {
      const text = $element.text().trim();
      
      // 提取标题
      let title = $element.find('h1, h2, h3, h4, .title, .name').first().text().trim();
      if (!title) {
        // 从文本中提取可能的标题
        const lines = text.split('\n').filter((line: string) => line.trim());
        title = lines[0]?.trim() || `埼玉祭典${index + 1}`;
      }

      // 清理标题
      title = this.cleanTitle(title);

      // 提取日期信息
      const dateMatch = text.match(/(\d{1,2})[月\/](\d{1,2})[日]?|(\d{4})[年\/\-](\d{1,2})[月\/\-](\d{1,2})[日]?/);
      let date = '日期待定';
      if (dateMatch) {
        if (dateMatch[1] && dateMatch[2]) {
          date = `${dateMatch[1]}月${dateMatch[2]}日`;
        } else if (dateMatch[3] && dateMatch[4] && dateMatch[5]) {
          date = `${dateMatch[3]}年${dateMatch[4]}月${dateMatch[5]}日`;
        }
      }

      // 提取地点信息
      let location = '埼玉县';
      const locationMatch = text.match(/([\u4e00-\u9fff]+[市町村区]|[\u4e00-\u9fff]+神社|[\u4e00-\u9fff]+寺)/);
      if (locationMatch) {
        location = locationMatch[1];
      }

      // 生成唯一ID
      const id = `saitama-matsuri-${Date.now()}-${index}`;

      // 提取网站链接
      let website = '#';
      const link = $element.find('a').first();
      if (link.length > 0) {
        const href = link.attr('href');
        if (href && href.startsWith('http')) {
          website = href;
        }
      }

      return {
        id,
        title,
        japaneseName: title,
        englishName: this.translateToEnglish(title),
        date,
        location,
        category: this.categorizeEvent(title),
        highlights: this.extractHighlights(text),
        likes: Math.floor(Math.random() * 50) + 10, // 临时数据，实际应从页面提取
        website,
        description: this.generateDescription(title, location),
        prefecture: '埼玉県',
        region: 'saitama'
      };

    } catch (error) {
      console.warn(`⚠️ 提取事件数据时出错 (索引 ${index}):`, error);
      return null;
    }
  }

  private extractEventsFromText(text: string): ScrapeMatsuriEvent[] {
    const events: ScrapeMatsuriEvent[] = [];
    const lines = text.split('\n').filter(line => line.trim());
    
    console.log('📝 分析文本内容，查找祭典信息...');
    
    lines.forEach((line: string, index: number) => {
      if (this.isMatsuriEvent(line) && line.length > 3) {
        const title = this.cleanTitle(line.trim());
        
        const event: ScrapeMatsuriEvent = {
          id: `saitama-text-${Date.now()}-${index}`,
          title,
          japaneseName: title,
          englishName: this.translateToEnglish(title),
          date: '日期待定',
          location: '埼玉县',
          category: this.categorizeEvent(title),
          highlights: this.extractHighlights(line),
          likes: Math.floor(Math.random() * 50) + 10,
          website: '#',
          description: this.generateDescription(title, '埼玉县'),
          prefecture: '埼玉県',
          region: 'saitama'
        };
        
        events.push(event);
        console.log(`📅 从文本提取: ${title}`);
      }
    });

    return events;
  }

  private cleanTitle(title: string): string {
    return title
      .replace(/^[\s\n\r]+|[\s\n\r]+$/g, '')
      .replace(/\s+/g, ' ')
      .replace(/[^\u4e00-\u9fff\u3040-\u309f\u30a0-\u30ff\w\s]/g, '')
      .substring(0, 50);
  }

  private translateToEnglish(title: string): string {
    // 简单的翻译映射
    const translations: { [key: string]: string } = {
      '祭': 'Festival',
      '花火': 'Fireworks',
      '盆踊り': 'Bon Dance',
      '夏祭り': 'Summer Festival',
      '神社': 'Shrine',
      '例大祭': 'Annual Festival'
    };

    let englishTitle = title;
    Object.entries(translations).forEach(([jp, en]) => {
      englishTitle = englishTitle.replace(new RegExp(jp, 'g'), en);
    });

    return englishTitle;
  }

  private categorizeEvent(title: string): string {
    if (title.includes('花火')) return '花火祭典';
    if (title.includes('盆踊り')) return '盆踊り';
    if (title.includes('神社')) return '神社祭典';
    if (title.includes('夏')) return '夏祭り';
    if (title.includes('秋')) return '秋祭り';
    return '传统祭典';
  }

  private extractHighlights(text: string): string[] {
    const highlights: string[] = [];
    
    if (text.includes('花火')) highlights.push('绚烂花火表演');
    if (text.includes('神社')) highlights.push('传统神社仪式');
    if (text.includes('踊り')) highlights.push('传统舞蹈表演');
    if (text.includes('屋台')) highlights.push('特色美食摊位');
    if (text.includes('山車')) highlights.push('华丽山车巡游');
    
    if (highlights.length === 0) {
      highlights.push('传统文化体验', '地方特色活动');
    }

    return highlights.slice(0, 3);
  }

  private generateDescription(title: string, location: string): string {
    return `${title}是在${location}举办的传统祭典活动，承载着深厚的历史文化底蕴。活动期间将有丰富的传统表演和地方特色体验，是了解关东地区文化传统的绝佳机会。`;
  }

  async saveResults(events: ScrapeMatsuriEvent[]) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `saitama-matsuri-scraped-${timestamp}.json`;
    const filepath = path.join(process.cwd(), 'data', filename);

    try {
      await fs.mkdir(path.dirname(filepath), { recursive: true });
      await fs.writeFile(filepath, JSON.stringify(events, null, 2), 'utf-8');
      console.log(`💾 数据已保存到: ${filepath}`);
      
      // 同时保存一份最新版本
      const latestPath = path.join(process.cwd(), 'data', 'saitama-matsuri-latest.json');
      await fs.writeFile(latestPath, JSON.stringify(events, null, 2), 'utf-8');
      console.log(`💾 最新数据: ${latestPath}`);
      
      return filepath;
    } catch (error) {
      console.error('❌ 保存数据失败:', error);
      throw error;
    }
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
      console.log('🔚 浏览器已关闭');
    }
  }
}

// 主执行函数
async function main() {
  const scraper = new SaitamaMatsuriScraper();

  try {
    console.log('🎌 开始获取埼玉祭典数据...\n');
    
    await scraper.initialize();
    const events = await scraper.scrapeMatsuriData();
    
    if (events.length > 0) {
      await scraper.saveResults(events);
      console.log(`\n✅ 成功获取 ${events.length} 个埼玉祭典事件`);
      
      // 显示摘要
      console.log('\n📋 获取到的祭典摘要:');
      events.slice(0, 5).forEach((event, index) => {
        console.log(`${index + 1}. ${event.title} - ${event.date} - ${event.location}`);
      });
      
      if (events.length > 5) {
        console.log(`... 还有 ${events.length - 5} 个事件`);
      }
    } else {
      console.log('⚠️ 未获取到任何祭典数据');
    }

  } catch (error) {
    console.error('❌ 获取数据失败:', error);
    process.exit(1);
  } finally {
    await scraper.cleanup();
  }
}

// 直接运行主函数
main().catch(console.error);

export { SaitamaMatsuriScraper };
export { type ScrapeMatsuriEvent }; 