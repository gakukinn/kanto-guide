const { spawn } = require('child_process');
const fs = require('fs');
const cheerio = require('cheerio');
const { PrismaClient } = require('./src/generated/prisma');

class NaganoEventCrawler {
  constructor() {
    this.prisma = new PrismaClient();
    this.url = 'https://www.jalan.net/event/160000/?screenId=OUW1702';
    this.region = '甲信越';
    this.events = [];
  }

  async crawlWithCrawl4AI() {
    console.log('=== 尝试使用 Crawl4AI 智能提取 ===');
    
    return new Promise((resolve) => {
      const pythonScript = `
import asyncio
from crawl4ai import AsyncWebCrawler
import json

async def crawl_nagano_events():
    async with AsyncWebCrawler(verbose=True) as crawler:
        url = "https://www.jalan.net/event/160000/?screenId=OUW1702"
        
        extraction_strategy = """
        请提取页面上前3个活动的以下信息：
        1. 活动名称
        2. 所在地/地址
        3. 开催期间/日期
        4. 开催场所/会场
        5. 交通方式
        6. 主办方
        7. 费用信息
        8. 联系方式
        9. 官方网站
        10. 详情页链接
        
        返回JSON格式，每个活动包含上述10项信息
        """
        
        try:
            result = await crawler.arun(
                url=url,
                word_count_threshold=10,
                extraction_strategy=extraction_strategy,
                chunking_strategy="by_paragraph",
                bypass_cache=True
            )
            
            if result.success:
                print("SUCCESS")
                print(result.extracted_content)
            else:
                print("FAILED")
                print("Failed to crawl:", result.error_message)
                
        except Exception as e:
            print("ERROR")
            print(f"Exception: {str(e)}")

asyncio.run(crawl_nagano_events())
`;

      const pythonProcess = spawn('python', ['-c', pythonScript]);
      let output = '';
      
      pythonProcess.stdout.on('data', (data) => {
        output += data.toString();
      });
      
      pythonProcess.stderr.on('data', (data) => {
        console.log('Python stderr:', data.toString());
      });
      
      pythonProcess.on('close', (code) => {
        console.log('Crawl4AI 结果:', code === 0 ? '成功' : '失败');
        
        if (output.includes('SUCCESS')) {
          try {
            const lines = output.split('\n');
            const jsonStart = lines.findIndex(line => line.trim().startsWith('{') || line.trim().startsWith('['));
            if (jsonStart !== -1) {
              const jsonContent = lines.slice(jsonStart).join('\n');
              const events = JSON.parse(jsonContent);
              resolve({ success: true, events });
            } else {
              resolve({ success: false, reason: 'No JSON found' });
            }
          } catch (e) {
            resolve({ success: false, reason: `JSON parse error: ${e.message}` });
          }
        } else {
          resolve({ success: false, reason: 'Crawl4AI failed' });
        }
      });
    });
  }

  async crawlWithPlaywrightCheerio() {
    console.log('=== 使用 Playwright + Cheerio 方法 ===');
    
    const { chromium } = require('playwright');
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    
    try {
      console.log('正在访问长野县活动页面...');
      await page.goto(this.url, { waitUntil: 'networkidle', timeout: 30000 });
      
      // 等待页面内容加载
      await page.waitForTimeout(3000);
      
      const html = await page.content();
      const $ = cheerio.load(html);
      
      console.log('页面加载完成，开始解析活动信息...');
      
      // 查找活动列表
      const events = [];
      const eventSelectors = [
        '.event-item',
        '.item',
        '.event-list li',
        '[class*="event"]',
        '.cassette',
        '.event-cassette'
      ];
      
      let foundEvents = false;
      
      for (const selector of eventSelectors) {
        const eventElements = $(selector);
        console.log(`尝试选择器 "${selector}": 找到 ${eventElements.length} 个元素`);
        
        if (eventElements.length >= 3) {
          foundEvents = true;
          
          eventElements.slice(0, 3).each((index, element) => {
            const $event = $(element);
            
            // 提取活动名称
            const name = $event.find('h2, h3, .title, .name, [class*="title"]').first().text().trim() ||
                        $event.find('a').first().text().trim() ||
                        '未找到活动名称';
            
            // 提取详情链接
            let detailUrl = $event.find('a').first().attr('href') || '';
            if (detailUrl && !detailUrl.startsWith('http')) {
              detailUrl = 'https://www.jalan.net' + detailUrl;
            }
            
            // 提取其他信息
            const location = $event.find('[class*="address"], [class*="place"], .location').text().trim() || '长野県';
            const period = $event.find('[class*="date"], [class*="period"], .period').text().trim() || '详见官网';
            const venue = $event.find('[class*="venue"], [class*="place"]').text().trim() || '详见详情页';
            
            events.push({
              name,
              location,
              period,
              venue,
              detailUrl,
              access: '详见详情页',
              organizer: '详见详情页',
              price: '详见详情页',
              contact: '详见详情页',
              website: '详见详情页',
              index: index + 1
            });
          });
          break;
        }
      }
      
      if (!foundEvents) {
        console.log('未找到标准活动选择器，尝试通用方法...');
        
        // 查找包含链接的文本
        const links = $('a[href*="/event/"], a[href*="event"]');
        console.log(`找到 ${links.length} 个活动相关链接`);
        
        links.slice(0, 3).each((index, element) => {
          const $link = $(element);
          const name = $link.text().trim();
          let detailUrl = $link.attr('href') || '';
          
          if (name && name.length > 5) {
            if (detailUrl && !detailUrl.startsWith('http')) {
              detailUrl = 'https://www.jalan.net' + detailUrl;
            }
            
            events.push({
              name,
              location: '长野県',
              period: '详见官网',
              venue: '详见详情页',
              detailUrl,
              access: '详见详情页',
              organizer: '详见详情页',
              price: '详见详情页',
              contact: '详见详情页',
              website: '详见详情页',
              index: index + 1
            });
          }
        });
      }
      
      await browser.close();
      
      if (events.length > 0) {
        console.log(`成功提取 ${events.length} 个活动的基本信息`);
        return { success: true, events };
      } else {
        return { success: false, reason: '未找到活动信息' };
      }
      
    } catch (error) {
      await browser.close();
      console.error('Playwright爬取失败:', error.message);
      return { success: false, reason: error.message };
    }
  }

  async enhanceEventDetails(events) {
    console.log('=== 增强活动详细信息 ===');
    
    const { chromium } = require('playwright');
    const browser = await chromium.launch({ headless: true });
    
    for (let i = 0; i < events.length; i++) {
      const event = events[i];
      
      if (!event.detailUrl || event.detailUrl === '详见详情页') {
        console.log(`活动 ${i + 1} 无详情页链接，跳过增强`);
        continue;
      }
      
      try {
        console.log(`正在获取活动 ${i + 1} 的详细信息...`);
        const page = await browser.newPage();
        await page.goto(event.detailUrl, { waitUntil: 'networkidle', timeout: 20000 });
        await page.waitForTimeout(2000);
        
        const html = await page.content();
        const $ = cheerio.load(html);
        
        // 提取详细信息
        const details = {
          location: this.extractText($, ['.address', '.place', '[class*="address"]', '[class*="place"]']) || event.location,
          period: this.extractText($, ['.period', '.date', '[class*="period"]', '[class*="date"]']) || event.period,
          venue: this.extractText($, ['.venue', '[class*="venue"]', '.hall']) || event.venue,
          access: this.extractText($, ['.access', '[class*="access"]', '.traffic']) || '详见官网',
          organizer: this.extractText($, ['.organizer', '[class*="organizer"]', '.sponsor']) || '详见官网',
          price: this.extractText($, ['.price', '.fee', '[class*="price"]', '[class*="fee"]']) || '详见官网',
          contact: this.extractText($, ['.contact', '.tel', '[class*="contact"]', 'phone']) || '详见官网',
          website: this.extractAttribute($, 'a[href*="http"]', 'href') || event.detailUrl
        };
        
        // 更新活动信息
        Object.assign(event, details);
        
        await page.close();
        console.log(`活动 ${i + 1} 详细信息获取完成`);
        
      } catch (error) {
        console.log(`活动 ${i + 1} 详细信息获取失败: ${error.message}`);
        await browser.newPage().then(p => p.close()).catch(() => {});
      }
    }
    
    await browser.close();
    return events;
  }

  extractText($, selectors) {
    for (const selector of selectors) {
      const text = $(selector).first().text().trim();
      if (text && text.length > 0) {
        return text;
      }
    }
    return null;
  }

  extractAttribute($, selector, attribute) {
    const value = $(selector).first().attr(attribute);
    return value ? value.trim() : null;
  }

  classifyEvent(eventName, eventDetails) {
    const name = eventName.toLowerCase();
    const details = JSON.stringify(eventDetails).toLowerCase();
    
    if (name.includes('花火') || name.includes('firework') || details.includes('花火')) {
      return { type: 'hanabi', typeLabel: '花火' };
    }
    
    if (name.includes('祭') || name.includes('まつり') || name.includes('祭り') || 
        name.includes('festival') || details.includes('祭')) {
      return { type: 'matsuri', typeLabel: '祭典' };
    }
    
    if (name.includes('桜') || name.includes('花見') || name.includes('はなみ') ||
        name.includes('cherry') || name.includes('blossom') || details.includes('桜')) {
      return { type: 'hanami', typeLabel: '赏花' };
    }
    
    if (name.includes('紅葉') || name.includes('もみじ') || name.includes('autumn') ||
        name.includes('maple') || details.includes('紅葉')) {
      return { type: 'momiji', typeLabel: '狩枫' };
    }
    
    if (name.includes('イルミ') || name.includes('illumination') || name.includes('light') ||
        details.includes('イルミ')) {
      return { type: 'illumination', typeLabel: '灯光' };
    }
    
    // 默认分类为祭典
    return { type: 'matsuri', typeLabel: '祭典' };
  }

  async extractGoogleMapsCoordinates(events) {
    console.log('=== 提取Google Maps坐标 ===');
    
    const { chromium } = require('playwright');
    const browser = await chromium.launch({ headless: true });
    
    for (let i = 0; i < events.length; i++) {
      const event = events[i];
      
      try {
        console.log(`为活动 ${i + 1} "${event.name}" 提取坐标...`);
        
        const page = await browser.newPage();
        const searchQuery = `${event.name} ${event.location} ${event.venue}`.replace(/\s+/g, ' ').trim();
        const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(searchQuery)}`;
        
        await page.goto(mapsUrl, { waitUntil: 'networkidle', timeout: 15000 });
        await page.waitForTimeout(3000);
        
        // 方法1: 检查URL中的坐标
        const currentUrl = page.url();
        const urlCoordMatch = currentUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
        
        if (urlCoordMatch) {
          const lat = parseFloat(urlCoordMatch[1]);
          const lng = parseFloat(urlCoordMatch[2]);
          
          // 验证坐标是否在日本范围内
          if (lat >= 30 && lat <= 45 && lng >= 129 && lng <= 146) {
            event.googleMap = `https://maps.google.com/?q=${lat},${lng}`;
            event.coordinates = { lat, lng };
            event.coordinateSource = 'url_method';
            console.log(`✓ 坐标提取成功: ${lat}, ${lng}`);
            await page.close();
            continue;
          }
        }
        
        // 方法2: 查找页面中的链接坐标
        const html = await page.content();
        const $ = cheerio.load(html);
        
        const links = $('a[href*="maps.google.com"], a[href*="@"]');
        let coordFound = false;
        
        links.each((index, element) => {
          if (coordFound) return false;
          
          const href = $(element).attr('href');
          if (href) {
            const match = href.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
            if (match) {
              const lat = parseFloat(match[1]);
              const lng = parseFloat(match[2]);
              
              if (lat >= 30 && lat <= 45 && lng >= 129 && lng <= 146) {
                event.googleMap = `https://maps.google.com/?q=${lat},${lng}`;
                event.coordinates = { lat, lng };
                event.coordinateSource = 'link_method';
                console.log(`✓ 坐标提取成功: ${lat}, ${lng}`);
                coordFound = true;
                return false;
              }
            }
          }
        });
        
        if (!coordFound) {
          // 使用默认的长野坐标区域
          const naganoCoords = {
            lat: 36.2048 + (Math.random() - 0.5) * 0.1,
            lng: 138.0776 + (Math.random() - 0.5) * 0.1
          };
          event.googleMap = `https://maps.google.com/search/${encodeURIComponent(searchQuery)}`;
          event.coordinates = naganoCoords;
          event.coordinateSource = 'default_nagano';
          console.log(`使用长野默认坐标区域: ${naganoCoords.lat}, ${naganoCoords.lng}`);
        }
        
        await page.close();
        
      } catch (error) {
        console.log(`活动 ${i + 1} 坐标提取失败: ${error.message}`);
        event.googleMap = `https://maps.google.com/search/${encodeURIComponent(event.name)}`;
        event.coordinateSource = 'failed';
      }
    }
    
    await browser.close();
    return events;
  }

  async saveToDatabase(events) {
    console.log('=== 保存到数据库 ===');
    
    try {
      // 获取甲信越地区
      const koshinetsuRegion = await this.prisma.region.findFirst({
        where: { nameCn: '甲信越' }
      });
      
      if (!koshinetsuRegion) {
        throw new Error('甲信越地区不存在');
      }
      
      let successCount = 0;
      
      for (const event of events) {
        try {
          const classification = this.classifyEvent(event.name, event);
          
          const eventData = {
            name: event.name,
            address: event.location,
            datetime: event.period,
            venue: event.venue,
            access: event.access,
            organizer: event.organizer,
            price: event.price,
            contact: event.contact,
            website: event.website,
            googleMap: event.googleMap,
            region: this.region,
            regionId: koshinetsuRegion.id,
            verified: true
          };
          
          let result;
          
          // 检查是否已存在
          const existing = await this.prisma[`${classification.type}Event`].findFirst({
            where: { name: event.name }
          });
          
          if (existing) {
            console.log(`${classification.typeLabel}活动"${event.name}"已存在，跳过`);
            continue;
          }
          
          // 根据分类保存到对应表
          result = await this.prisma[`${classification.type}Event`].create({
            data: eventData
          });
          
          console.log(`✓ 录入${classification.typeLabel}活动: ${event.name}`);
          successCount++;
          
        } catch (error) {
          console.error(`录入活动"${event.name}"失败:`, error.message);
        }
      }
      
      console.log(`\n数据库录入完成，成功录入 ${successCount}/${events.length} 个活动`);
      return successCount;
      
    } catch (error) {
      console.error('数据库操作失败:', error);
      return 0;
    }
  }

  async run() {
    try {
      console.log('=== 长野县活动爬取开始 ===');
      console.log('目标URL:', this.url);
      
      // 尝试Crawl4AI
      let result = await this.crawlWithCrawl4AI();
      
      if (!result.success) {
        console.log('Crawl4AI失败，切换到Playwright + Cheerio方法');
        result = await this.crawlWithPlaywrightCheerio();
      }
      
      if (!result.success) {
        throw new Error(`爬取失败: ${result.reason}`);
      }
      
      let events = result.events;
      console.log(`初步获取 ${events.length} 个活动`);
      
      // 增强详细信息
      events = await this.enhanceEventDetails(events);
      
      // 提取坐标
      events = await this.extractGoogleMapsCoordinates(events);
      
      // 显示结果
      console.log('\n=== 爬取结果 ===');
      events.forEach((event, index) => {
        const classification = this.classifyEvent(event.name, event);
        console.log(`${index + 1}. [${classification.typeLabel}] ${event.name}`);
        console.log(`   所在地: ${event.location}`);
        console.log(`   开催期间: ${event.period}`);
        console.log(`   地图: ${event.googleMap}`);
        console.log('');
      });
      
      // 保存到数据库
      const savedCount = await this.saveToDatabase(events);
      
      console.log('=== 长野县活动爬取完成 ===');
      console.log(`成功录入 ${savedCount} 个活动到甲信越地区`);
      
    } catch (error) {
      console.error('爬取过程失败:', error.message);
    } finally {
      await this.prisma.$disconnect();
    }
  }
}

// 运行爬虫
const crawler = new NaganoEventCrawler();
crawler.run(); 