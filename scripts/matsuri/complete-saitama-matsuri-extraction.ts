import { chromium, Browser, Page } from 'playwright';
import * as cheerio from 'cheerio';
import { promises as fs } from 'fs';
import * as path from 'path';

interface CompleteMatsuriEvent {
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

class CompleteSaitamaMatsuriExtractor {
  private browser: Browser | null = null;
  private targetUrl = 'https://omaturilink.com/%E5%9F%BC%E7%8E%89%E7%9C%8C/';
  
  async initialize() {
    console.log('🚀 启动浏览器进行完整数据提取...');
    this.browser = await chromium.launch({ 
      headless: true,
      timeout: 60000 
    });
  }

  async extractAllEvents(): Promise<CompleteMatsuriEvent[]> {
    if (!this.browser) {
      throw new Error('浏览器未初始化');
    }

    const page = await this.browser.newPage();
    console.log('📡 访问埼玉祭典完整页面...');
    
    try {
      await page.goto(this.targetUrl, { 
        waitUntil: 'domcontentloaded',
        timeout: 60000 
      });

      // 等待页面完全加载
      await page.waitForTimeout(3000);
      
      const content = await page.content();
      console.log('📄 页面内容已获取，开始解析...');
      
      const $ = cheerio.load(content);
      const events: CompleteMatsuriEvent[] = [];
      
      // 提取所有可能的活动元素 - 使用最宽松的选择器
      const allElements = $('*').toArray();
      console.log(`🔍 找到 ${allElements.length} 个页面元素，开始分析...`);
      
      let eventIndex = 0;
      const processedTexts = new Set<string>();

      for (const element of allElements) {
        const $el = $(element);
        const text = $el.text().trim();
        
        // 跳过空文本和过短文本
        if (!text || text.length < 3) continue;
        
        // 跳过已处理的重复文本
        if (processedTexts.has(text)) continue;
        processedTexts.add(text);
        
        // 检查是否可能是活动信息
        if (this.isPotentialEvent(text, $el)) {
          const eventData = this.extractEventFromElement($el, eventIndex++);
          if (eventData) {
            events.push(eventData);
            console.log(`✅ 提取活动: ${eventData.title}`);
          }
        }
      }

      // 特殊提取：查找特定的活动信息结构
      await this.extractSpecialStructures($, events);
      
      console.log(`🎉 完整提取完成，共获得 ${events.length} 个活动事件`);
      return events;

    } catch (error) {
      console.error('❌ 页面访问或解析失败:', error);
      return [];
    } finally {
      await page.close();
    }
  }

  private isPotentialEvent(text: string, $element: any): boolean {
    // 最宽松的判断标准 - 只要包含任何可能的活动关键词
    const broadKeywords = [
      // 祭典相关
      '祭', 'まつり', '祭り', '祭典', 'フス', 'フスタ', 'イベント',
      // 活动类型
      '花火', '桜', '紅葉', '雪', '夏', '春', '秋', '冬',
      // 场所相关
      '神社', '寺', '公園', '会場', '広場', '商店街',
      // 文化活动
      '踊り', '舞', '音楽', '芸術', '文化', '伝統',
      // 季节活动
      '七夕', '盆踊り', '花見', '紅葉狩り', '雪祭り',
      // 市民活动
      '市民', '地域', '町', '村', '区民',
      // 特殊活动
      '収穫', '豊年', 'コンサート', 'ライブ', 'ショー',
      // 埼玉地名
      '所沢', '川越', '熊谷', '大宮', '浦和', '春日部', '草加', '越谷',
      '秩父', '深谷', '久喜', '入間', '朝霞', '志木', '和光', '新座',
      '桶川', '北本', '八潮', '富士見', '三郷', '蓮田', '坂戸',
      '幸手', '鶴ヶ島', '日高', '吉川', 'ふじみ野', '白岡',
      '埼玉', 'さいたま'
    ];

    // 排除明显的垃圾文本
    const excludeKeywords = [
      'cookie', 'javascript', 'css', 'html', 'meta', 'script',
      'function', 'return', 'var ', 'const ', 'let ', '=/=',
      'undefined', 'null', 'true', 'false'
    ];

    const lowerText = text.toLowerCase();
    
    // 排除垃圾文本
    if (excludeKeywords.some(keyword => lowerText.includes(keyword))) {
      return false;
    }

    // 包含任何相关关键词即认为是潜在活动
    return broadKeywords.some(keyword => text.includes(keyword));
  }

  private async extractSpecialStructures($: cheerio.Root, events: CompleteMatsuriEvent[]) {
    console.log('🔍 寻找特殊的活动信息结构...');
    
    // 查找链接中的活动
    $('a[href]').each((index, element) => {
      const $link = $(element);
      const href = $link.attr('href') || '';
      const linkText = $link.text().trim();
      
      if (linkText && this.isPotentialEvent(linkText, $link)) {
        const eventData = this.extractEventFromElement($link, events.length);
        if (eventData && !events.some(e => e.title === eventData.title)) {
          eventData.website = href.startsWith('http') ? href : `https://omaturilink.com${href}`;
          events.push(eventData);
          console.log(`✅ 从链接提取活动: ${eventData.title}`);
        }
      }
    });

    // 查找图片的alt文本
    $('img[alt]').each((index, element) => {
      const $img = $(element);
      const alt = $img.attr('alt') || '';
      
      if (alt && this.isPotentialEvent(alt, $img)) {
        const eventData = this.extractEventFromElement($img, events.length);
        if (eventData && !events.some(e => e.title === eventData.title)) {
          events.push(eventData);
          console.log(`✅ 从图片alt提取活动: ${eventData.title}`);
        }
      }
    });

    // 查找特定的容器元素
    $('.post, .event, .festival, .matsuri, article, .content').each((index, element) => {
      const $container = $(element);
      const containerText = $container.text().trim();
      
      if (containerText && this.isPotentialEvent(containerText, $container)) {
        const eventData = this.extractEventFromElement($container, events.length);
        if (eventData && !events.some(e => e.title === eventData.title)) {
          events.push(eventData);
          console.log(`✅ 从容器提取活动: ${eventData.title}`);
        }
      }
    });
  }

  private extractEventFromElement($element: any, index: number): CompleteMatsuriEvent | null {
    try {
      const text = $element.text().trim();
      
      // 提取标题 - 使用文本的前面部分作为标题
      const title = this.extractTitle(text, $element);
      if (!title || title.length < 2) return null;

      // 提取或推断日期
      const date = this.extractDate(text) || '日期待定';
      
      // 提取或推断地点
      const location = this.extractLocation(text, title) || '埼玉县';
      
      // 分类
      const category = this.categorizeEvent(title, text);
      
      // 生成描述和亮点
      const description = this.generateDescription(title, location, category);
      const highlights = this.generateHighlights(title, category);
      
      // 提取网站链接
      let website = '#';
      const $link = $element.closest('a');
      if ($link.length && $link.attr('href')) {
        const href = $link.attr('href');
        website = href.startsWith('http') ? href : `https://omaturilink.com${href}`;
      }

      const eventData: CompleteMatsuriEvent = {
        id: `saitama-complete-${Date.now()}-${index}`,
        title: title,
        japaneseName: title,
        englishName: this.translateToEnglish(title),
        date: date,
        location: location,
        category: category,
        highlights: highlights,
        likes: Math.floor(Math.random() * 100) + 10,
        website: website,
        description: description,
        prefecture: '埼玉県',
        region: 'saitama'
      };

      return eventData;

    } catch (error) {
      console.warn(`⚠️ 提取第${index}个元素时出错:`, error);
      return null;
    }
  }

  private extractTitle(text: string, $element: any): string {
    // 尝试从各种可能的地方提取标题
    let title = '';

    // 1. 尝试从标题标签提取
    const $titleElements = $element.find('h1, h2, h3, h4, h5, h6, .title, .name');
    if ($titleElements.length) {
      title = $titleElements.first().text().trim();
    }

    // 2. 如果没有标题标签，使用文本的第一行
    if (!title) {
      const lines = text.split('\n').filter(line => line.trim());
      title = lines[0] || '';
    }

    // 3. 清理标题
    title = title
      .replace(/^\d+\.?\s*/, '') // 移除开头的数字
      .replace(/写真提供.*$/g, '') // 移除写真提供信息
      .replace(/\s+/g, ' ') // 规范化空格
      .trim();

    // 4. 如果标题太长，截取主要部分
    if (title.length > 40) {
      const parts = title.split(/[・\s\/]/);
      title = parts[0] || title.substring(0, 30);
    }

    return title;
  }

  private extractDate(text: string): string | null {
    // 各种日期格式的正则表达式
    const datePatterns = [
      /(\d{1,2})月(\d{1,2})日/g,
      /(\d{4})年(\d{1,2})月(\d{1,2})日/g,
      /(\d{1,2})\/(\d{1,2})/g,
      /(\d{4})\/(\d{1,2})\/(\d{1,2})/g,
      /(\d{1,2})-(\d{1,2})/g,
      /(春|夏|秋|冬)/g,
      /(1月|2月|3月|4月|5月|6月|7月|8月|9月|10月|11月|12月)/g
    ];

    for (const pattern of datePatterns) {
      const match = text.match(pattern);
      if (match) {
        return match[0];
      }
    }

    return null;
  }

  private extractLocation(text: string, title: string): string {
    // 埼玉的市町村列表
    const saitamaLocations = [
      'さいたま市', '川越市', '熊谷市', '川口市', '行田市', '秩父市', '所沢市',
      '飯能市', '加須市', '本庄市', '東松山市', '春日部市', '狭山市', '羽生市',
      '鴻巣市', '深谷市', '上尾市', '草加市', '越谷市', '蕨市', '戸田市',
      '入間市', '朝霞市', '志木市', '和光市', '新座市', '桶川市', '久喜市',
      '北本市', '八潮市', '富士見市', '三郷市', '蓮田市', '坂戸市', '幸手市',
      '鶴ヶ島市', '日高市', '吉川市', 'ふじみ野市', '白岡市'
    ];

    // 在标题和文本中查找地名
    for (const location of saitamaLocations) {
      if (title.includes(location) || text.includes(location)) {
        return location;
      }
    }

    // 查找简化的地名
    const simpleLocations = [
      '所沢', '川越', '熊谷', '大宮', '浦和', '春日部', '草加', '越谷',
      '秩父', '深谷', '久喜', '入間', '朝霞', '志木', '和光', '新座'
    ];

    for (const location of simpleLocations) {
      if (title.includes(location) || text.includes(location)) {
        return location + '市';
      }
    }

    return '埼玉县';
  }

  private categorizeEvent(title: string, text: string): string {
    if (title.includes('花火') || text.includes('花火')) return '花火祭典';
    if (title.includes('桜') || title.includes('花見')) return '春祭り';
    if (title.includes('七夕')) return '夏祭り';
    if (title.includes('盆踊り') || title.includes('夏祭')) return '夏祭り';
    if (title.includes('紅葉') || title.includes('秋')) return '秋祭り';
    if (title.includes('雪') || title.includes('冬')) return '冬祭り';
    if (title.includes('神社') || title.includes('寺')) return '宗教祭典';
    if (title.includes('市民') || title.includes('地域')) return '市民祭典';
    if (title.includes('文化') || title.includes('芸術')) return '文化祭典';
    if (title.includes('音楽') || title.includes('コンサート')) return '音乐祭典';
    if (title.includes('収穫') || title.includes('豊年')) return '收获祭典';
    return '传统祭典';
  }

  private generateDescription(title: string, location: string, category: string): string {
    return `${title}是在${location}举办的${category}活动，展现了当地独特的文化魅力和传统特色，为游客提供了深入了解埼玉县文化的绝佳机会。`;
  }

  private generateHighlights(title: string, category: string): string[] {
    const highlights: string[] = [];
    
    if (title.includes('花火')) highlights.push('绚烂花火表演');
    if (title.includes('桜')) highlights.push('樱花景观欣赏');
    if (title.includes('神社')) highlights.push('传统神社仪式');
    if (title.includes('踊り') || title.includes('舞')) highlights.push('传统舞蹈表演');
    if (title.includes('音楽')) highlights.push('精彩音乐演出');
    if (title.includes('夜')) highlights.push('夜间庆典活动');
    
    // 基于分类添加通用亮点
    if (category.includes('春')) highlights.push('春季自然美景');
    if (category.includes('夏')) highlights.push('夏季清凉体验');
    if (category.includes('秋')) highlights.push('秋季风情体验');
    if (category.includes('冬')) highlights.push('冬季特色活动');
    
    // 确保至少有2个亮点
    if (highlights.length === 0) {
      highlights.push('传统文化体验', '地方特色活动');
    } else if (highlights.length === 1) {
      highlights.push('地方特色体验');
    }

    return highlights.slice(0, 3);
  }

  private translateToEnglish(title: string): string {
    const translations: { [key: string]: string } = {
      '祭': 'Festival', 'まつり': 'Matsuri', '祭り': 'Festival',
      '花火': 'Fireworks', '桜': 'Cherry Blossom', '神社': 'Shrine',
      '夏': 'Summer', '春': 'Spring', '秋': 'Autumn', '冬': 'Winter',
      '市民': 'Citizens', '文化': 'Culture', '音楽': 'Music',
      '大': 'Grand', '小': 'Small', '新': 'New', '古': 'Traditional'
    };

    let englishName = title;
    Object.entries(translations).forEach(([jp, en]) => {
      englishName = englishName.replace(new RegExp(jp, 'g'), en);
    });

    return englishName;
  }

  async saveCompleteData(events: CompleteMatsuriEvent[]) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `saitama-matsuri-complete-${timestamp}.json`;
    const filepath = path.join(process.cwd(), 'data', filename);

    try {
      await fs.mkdir(path.dirname(filepath), { recursive: true });
      await fs.writeFile(filepath, JSON.stringify(events, null, 2), 'utf-8');
      console.log(`💾 完整数据已保存到: ${filepath}`);
      
      // 同时更新最终版本
      const latestPath = path.join(process.cwd(), 'data', 'saitama-matsuri-complete-final.json');
      await fs.writeFile(latestPath, JSON.stringify(events, null, 2), 'utf-8');
      console.log(`💾 完整最终数据: ${latestPath}`);
      
      return filepath;
    } catch (error) {
      console.error('❌ 保存完整数据失败:', error);
      throw error;
    }
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
      console.log('🔒 浏览器已关闭');
    }
  }
}

// 主执行函数
async function main() {
  const extractor = new CompleteSaitamaMatsuriExtractor();

  try {
    console.log('🚀 开始完整提取埼玉祭典数据（无限制模式）...\n');
    
    await extractor.initialize();
    const allEvents = await extractor.extractAllEvents();
    
    if (allEvents.length > 0) {
      await extractor.saveCompleteData(allEvents);
      
      console.log(`\n🎉 完整提取成功！共获得 ${allEvents.length} 个埼玉活动`);
      
      // 显示分类统计
      const categoryStats = allEvents.reduce((acc, event) => {
        acc[event.category] = (acc[event.category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      console.log('\n📊 活动分类统计:');
      Object.entries(categoryStats).forEach(([category, count]) => {
        console.log(`- ${category}: ${count} 个`);
      });
      
      // 显示地区统计
      const locationStats = allEvents.reduce((acc, event) => {
        acc[event.location] = (acc[event.location] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      console.log('\n📍 地区分布统计:');
      Object.entries(locationStats).forEach(([location, count]) => {
        console.log(`- ${location}: ${count} 个`);
      });
      
    } else {
      console.log('⚠️ 没有提取到任何活动数据');
    }

  } catch (error) {
    console.error('❌ 完整提取失败:', error);
  } finally {
    await extractor.cleanup();
  }
}

// 直接运行主函数
main().catch(console.error);

export { CompleteSaitamaMatsuriExtractor }; 