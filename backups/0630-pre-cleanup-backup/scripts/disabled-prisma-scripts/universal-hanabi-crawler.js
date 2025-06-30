const { PrismaClient } = require('../src/generated/prisma');
const playwright = require('playwright');
const cheerio = require('cheerio');
const prisma = new PrismaClient();

// 区域映射配置
const REGION_CONFIG = {
  'tokyo': { name: '东京', code: 'tokyo' },
  'saitama': { name: '埼玉', code: 'saitama' },
  'kanagawa': { name: '神奈川', code: 'kanagawa' },
  'chiba': { name: '千叶', code: 'chiba' },
  'kitakanto': { name: '北关东', code: 'kitakanto' },
  'koshinetsu': { name: '甲信越', code: 'koshinetsu' }
};

// 数据源配置
const DATA_SOURCES = {
  jalan: {
    baseUrl: 'https://www.jalan.net/event/',
    searchPath: 'search/',
    eventPath: 'evt_'
  },
  walkerplus: {
    baseUrl: 'https://www.walkerplus.com/',
    searchPath: 'event_list/today/',
    eventPath: 'event/'
  }
};

class UniversalHanabiCrawler {
  constructor() {
    this.browser = null;
    this.page = null;
  }

  async initialize() {
    console.log('🚀 初始化浏览器...');
    this.browser = await playwright.chromium.launch({ 
      headless: false, // 保持可见以便调试
      slowMo: 1000 // 减慢操作速度
    });
    this.page = await this.browser.newPage();
    console.log('✅ 浏览器初始化完成');
  }

  async searchJalanEvents(regionCode, keyword = '花火') {
    try {
      console.log(`🔍 在Jalan搜索 ${REGION_CONFIG[regionCode]?.name} 的${keyword}活动...`);
      
      const searchUrl = `${DATA_SOURCES.jalan.baseUrl}?kw=${encodeURIComponent(keyword)}&pref=${this.getJalanPrefCode(regionCode)}`;
      await this.page.goto(searchUrl);
      
      // 等待页面加载
      await this.page.waitForTimeout(3000);
      
      const content = await this.page.content();
      const $ = cheerio.load(content);
      
      const events = [];
      
      // 提取事件列表
      $('.event-item, .event-list-item').each((index, element) => {
        const $el = $(element);
        const event = this.extractJalanEventData($el);
        if (event && this.isHanabiEvent(event.name)) {
          events.push(event);
        }
      });
      
      console.log(`📋 在Jalan找到 ${events.length} 个花火活动`);
      return events;
      
    } catch (error) {
      console.error(`❌ Jalan搜索失败 (${regionCode}):`, error.message);
      return [];
    }
  }

  async getDetailedEventInfo(eventUrl) {
    try {
      console.log(`🔍 获取详细信息: ${eventUrl}`);
      await this.page.goto(eventUrl);
      await this.page.waitForTimeout(2000);
      
      const content = await this.page.content();
      const $ = cheerio.load(content);
      
      // 提取详细信息
      const details = {
        fireworksCount: this.extractFireworksCount($),
        expectedVisitors: this.extractVisitorCount($),
        organizer: this.extractOrganizer($),
        phone: this.extractPhone($),
        website: this.extractWebsite($),
        venue: this.extractVenue($),
        access: this.extractAccess($),
        description: this.extractDescription($)
      };
      
      return details;
      
    } catch (error) {
      console.error('❌ 获取详细信息失败:', error.message);
      return {};
    }
  }

  extractJalanEventData($element) {
    try {
      const name = $element.find('h3, .event-title, .title').first().text().trim();
      const link = $element.find('a').attr('href');
      const date = $element.find('.date, .event-date').text().trim();
      const location = $element.find('.location, .place').text().trim();
      
      if (!name || !link) return null;
      
      return {
        name: name,
        link: link.startsWith('http') ? link : `https://www.jalan.net${link}`,
        date: date,
        location: location,
        source: 'jalan'
      };
    } catch (error) {
      console.error('❌ 提取Jalan事件数据失败:', error);
      return null;
    }
  }

  extractFireworksCount($) {
    const patterns = [
      /約?(\d+(?:,\d+)*)\s*発/,
      /(\d+(?:,\d+)*)\s*発/,
      /打[ち上]?上[げ数]*[:：]\s*約?(\d+(?:,\d+)*)/,
      /花火[数個]*[:：]\s*約?(\d+(?:,\d+)*)/
    ];
    
    const text = $.text();
    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        return `約${match[1]}発`;
      }
    }
    return null;
  }

  extractVisitorCount($) {
    const patterns = [
      /約?(\d+(?:[,.\d]*)?)\s*万人/,
      /観客[数人]*[:：]\s*約?(\d+(?:[,.\d]*)?)\s*万人/,
      /来場[者数]*[:：]\s*約?(\d+(?:[,.\d]*)?)\s*万人/
    ];
    
    const text = $.text();
    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        return `${match[1]}万人`;
      }
    }
    return null;
  }

  extractOrganizer($) {
    const patterns = [
      '主催', '主催者', '主催団体', '実行委員会'
    ];
    
    for (const pattern of patterns) {
      const element = $(`td:contains("${pattern}"), dt:contains("${pattern}")`).next();
      if (element.length) {
        return element.text().trim();
      }
    }
    return null;
  }

  extractPhone($) {
    const phonePattern = /(?:電話|TEL|問合せ|連絡先)[:：]?\s*([\d-]+)/i;
    const match = $.text().match(phonePattern);
    return match ? match[1] : null;
  }

  extractWebsite($) {
    const links = $('a[href*="http"]');
    for (let i = 0; i < links.length; i++) {
      const href = $(links[i]).attr('href');
      if (href && !href.includes('jalan.net') && !href.includes('walker')) {
        return href;
      }
    }
    return null;
  }

  extractVenue($) {
    const patterns = ['開催場所', '会場', '場所'];
    for (const pattern of patterns) {
      const element = $(`td:contains("${pattern}"), dt:contains("${pattern}")`).next();
      if (element.length) {
        return element.text().trim();
      }
    }
    return null;
  }

  extractAccess($) {
    const patterns = ['交通アクセス', 'アクセス', '交通'];
    for (const pattern of patterns) {
      const element = $(`td:contains("${pattern}"), dt:contains("${pattern}")`).next();
      if (element.length) {
        return element.text().trim();
      }
    }
    return null;
  }

  extractDescription($) {
    const description = $('.event-description, .description, .content').first().text().trim();
    return description ? description.substring(0, 500) : null;
  }

  isHanabiEvent(name) {
    const hanabiKeywords = ['花火', 'ハナビ', 'hanabi', '打上', '納涼'];
    return hanabiKeywords.some(keyword => 
      name.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  getJalanPrefCode(regionCode) {
    const prefMapping = {
      'tokyo': '130000',
      'saitama': '110000', 
      'kanagawa': '140000',
      'chiba': '120000',
      'kitakanto': '100000', // 群馬作为代表
      'koshinetsu': '150000'  // 長野作为代表
    };
    return prefMapping[regionCode] || '130000';
  }

  async saveToDatabase(eventData, regionCode) {
    try {
      const region = await prisma.region.findFirst({
        where: { code: regionCode }
      });
      
      if (!region) {
        console.error(`❌ 找不到地区: ${regionCode}`);
        return null;
      }

      // 检查是否已存在
      const existing = await prisma.hanabiEvent.findFirst({
        where: {
          name: eventData.name,
          regionId: region.id
        }
      });

      if (existing) {
        console.log(`⚠️  事件已存在: ${eventData.name}`);
        return existing;
      }

      const hanabiEvent = await prisma.hanabiEvent.create({
        data: {
          eventId: `hanabi-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name: eventData.name,
          englishName: eventData.englishName || null,
          year: 2025,
          month: eventData.month || 7,
          date: eventData.date,
          displayDate: eventData.displayDate || eventData.date,
          time: eventData.time || null,
          duration: eventData.duration || null,
          fireworksCount: eventData.fireworksCount || null,
          expectedVisitors: eventData.expectedVisitors || null,
          status: '正常举办',
          location: eventData.location,
          contact: eventData.contact || null,
          walkerPlusUrl: eventData.source === 'jalan' ? eventData.link : null,
          verified: true,
          verificationDate: new Date(),
          regionId: region.id
        }
      });

      console.log(`✅ 保存成功: ${eventData.name} (ID: ${hanabiEvent.id})`);
      return hanabiEvent;

    } catch (error) {
      console.error('❌ 保存到数据库失败:', error);
      return null;
    }
  }

  async crawlRegion(regionCode) {
    console.log(`\n🌟 开始抓取 ${REGION_CONFIG[regionCode]?.name} 地区的花火数据...`);
    
    const jalanEvents = await this.searchJalanEvents(regionCode);
    const savedEvents = [];

    for (const event of jalanEvents) {
      console.log(`\n📄 处理事件: ${event.name}`);
      
      // 获取详细信息
      const details = await this.getDetailedEventInfo(event.link);
      
      // 合并数据
      const completeEventData = {
        ...event,
        ...details,
        displayDate: this.formatDate(event.date),
        month: this.extractMonth(event.date),
        contact: {
          phone: details.phone,
          website: details.website,
          organizer: details.organizer
        }
      };

      // 保存到数据库
      const saved = await this.saveToDatabase(completeEventData, regionCode);
      if (saved) {
        savedEvents.push(saved);
      }

      // 避免过于频繁的请求
      await this.page.waitForTimeout(2000);
    }

    console.log(`\n✅ ${REGION_CONFIG[regionCode]?.name} 地区抓取完成，共保存 ${savedEvents.length} 个事件`);
    return savedEvents;
  }

  formatDate(dateStr) {
    // 简单的日期格式化
    if (dateStr.includes('2025')) {
      return dateStr;
    }
    return `2025年${dateStr}`;
  }

  extractMonth(dateStr) {
    const monthMatch = dateStr.match(/(\d+)月/);
    return monthMatch ? parseInt(monthMatch[1]) : 7; // 默认7月
  }

  async crawlAllRegions() {
    console.log('🎆 开始全地区花火数据抓取...\n');
    
    const results = {};
    
    for (const [regionCode, regionInfo] of Object.entries(REGION_CONFIG)) {
      try {
        results[regionCode] = await this.crawlRegion(regionCode);
      } catch (error) {
        console.error(`❌ ${regionInfo.name} 地区抓取失败:`, error);
        results[regionCode] = [];
      }
    }
    
    // 统计结果
    const totalEvents = Object.values(results).reduce((sum, events) => sum + events.length, 0);
    console.log(`\n🎉 全地区抓取完成！总计新增 ${totalEvents} 个花火事件`);
    
    return results;
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
      console.log('🔚 浏览器已关闭');
    }
    await prisma.$disconnect();
  }
}

// 主执行函数
async function main() {
  const crawler = new UniversalHanabiCrawler();
  
  try {
    await crawler.initialize();
    
    // 如果传入了特定地区参数，只抓取该地区
    const targetRegion = process.argv[2];
    
    if (targetRegion && REGION_CONFIG[targetRegion]) {
      await crawler.crawlRegion(targetRegion);
    } else {
      await crawler.crawlAllRegions();
    }
    
  } catch (error) {
    console.error('❌ 抓取过程发生错误:', error);
  } finally {
    await crawler.close();
  }
}

// 运行脚本
if (require.main === module) {
  main().catch(console.error);
}

module.exports = UniversalHanabiCrawler; 