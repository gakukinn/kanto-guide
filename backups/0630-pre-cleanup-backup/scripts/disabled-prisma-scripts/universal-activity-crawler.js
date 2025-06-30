const { chromium } = require('playwright');
const cheerio = require('cheerio');
const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient();

// 通用活动信息爬取器
class UniversalActivityCrawler {
  constructor() {
    this.browser = null;
    this.page = null;
  }

  // 初始化浏览器
  async initBrowser() {
    console.log('🚀 启动浏览器...');
    this.browser = await chromium.launch({ 
      headless: true,
      args: [
        '--no-sandbox', 
        '--disable-setuid-sandbox', 
        '--disable-web-security', 
        '--disable-features=VizDisplayCompositor'
      ]
    });
    
    this.page = await this.browser.newPage();
    
    // 设置用户代理避免反爬虫
    await this.page.setExtraHTTPHeaders({
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    });
  }

  // 从Jalan网站提取活动信息
  async extractActivityInfo(url) {
    console.log(`📡 正在访问: ${url}`);
    
    try {
      await this.page.goto(url, {
        waitUntil: 'domcontentloaded',
        timeout: 30000
      });

      // 等待页面加载
      await this.page.waitForTimeout(2000);
      
      const content = await this.page.content();
      const $ = cheerio.load(content);
      
      // 提取基本信息
      const activityInfo = {
        name: this.extractName($),
        address: this.extractAddress($),
        datetime: this.extractDateTime($),
        venue: this.extractVenue($),
        access: this.extractAccess($),
        organizer: this.extractOrganizer($),
        price: this.extractPrice($),
        contact: this.extractContact($),
        website: url, // 原始URL作为官方网站
        googleMap: '', // 稍后提取坐标
        region: this.detectRegion($) // 自动检测地区
      };

      // 提取地图坐标
      const coordinates = await this.extractCoordinates();
      if (coordinates) {
        activityInfo.googleMap = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d${coordinates.lng}!3d${coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v${Date.now()}!5m2!1sja!2sjp`;
      }

      console.log('✅ 信息提取完成');
      return activityInfo;
      
    } catch (error) {
      console.error(`❌ 页面访问失败: ${error.message}`);
      throw error;
    }
  }

  // 提取活动名称
  extractName($) {
    const selectors = [
      '.event-title h1',
      '.event-name',
      'h1.title',
      '.main-title',
      'h1',
      '.event-header h1'
    ];
    
    for (const selector of selectors) {
      const name = $(selector).first().text().trim();
      if (name) {
        console.log(`📝 活动名称: ${name}`);
        return name;
      }
    }
    
    return '活动名称待确认';
  }

  // 提取地址信息
  extractAddress($) {
    const selectors = [
      '.event-address',
      '.location',
      '.venue-address',
      'dt:contains("住所") + dd',
      'dt:contains("所在地") + dd',
      '.address'
    ];
    
    for (const selector of selectors) {
      const address = $(selector).first().text().trim();
      if (address && address.length > 5) {
        console.log(`📍 地址: ${address}`);
        return address;
      }
    }
    
    return '地址信息待确认';
  }

  // 提取开催期间时间
  extractDateTime($) {
    const selectors = [
      '.event-date',
      '.date-time',
      'dt:contains("開催期間") + dd',
      'dt:contains("開催日") + dd',
      '.period',
      '.schedule'
    ];
    
    for (const selector of selectors) {
      const datetime = $(selector).first().text().trim();
      if (datetime) {
        console.log(`📅 开催期间: ${datetime}`);
        return datetime;
      }
    }
    
    return '开催期间待确认';
  }

  // 提取开催场所
  extractVenue($) {
    const selectors = [
      '.venue',
      '.event-venue',
      'dt:contains("会場") + dd',
      'dt:contains("場所") + dd',
      '.location-name'
    ];
    
    for (const selector of selectors) {
      const venue = $(selector).first().text().trim();
      if (venue) {
        console.log(`🏛️ 开催场所: ${venue}`);
        return venue;
      }
    }
    
    return '开催场所待确认';
  }

  // 提取交通方式
  extractAccess($) {
    const selectors = [
      '.access',
      '.transportation',
      'dt:contains("アクセス") + dd',
      'dt:contains("交通") + dd',
      '.access-info'
    ];
    
    for (const selector of selectors) {
      const access = $(selector).first().text().trim();
      if (access) {
        console.log(`🚄 交通方式: ${access}`);
        return access;
      }
    }
    
    return '交通方式待确认';
  }

  // 提取主办方
  extractOrganizer($) {
    const selectors = [
      '.organizer',
      'dt:contains("主催") + dd',
      'dt:contains("主办") + dd',
      '.sponsor'
    ];
    
    for (const selector of selectors) {
      const organizer = $(selector).first().text().trim();
      if (organizer) {
        console.log(`🏢 主办方: ${organizer}`);
        return organizer;
      }
    }
    
    return '主办方待确认';
  }

  // 提取料金
  extractPrice($) {
    const selectors = [
      '.price',
      '.fee',
      'dt:contains("料金") + dd',
      'dt:contains("入場料") + dd',
      '.admission'
    ];
    
    for (const selector of selectors) {
      const price = $(selector).first().text().trim();
      if (price) {
        console.log(`💰 料金: ${price}`);
        return price;
      }
    }
    
    return '料金待确认';
  }

  // 提取联系方式
  extractContact($) {
    const selectors = [
      '.contact',
      '.phone',
      'dt:contains("お問い合わせ") + dd',
      'dt:contains("連絡先") + dd',
      '.tel'
    ];
    
    for (const selector of selectors) {
      const contact = $(selector).first().text().trim();
      if (contact) {
        console.log(`📞 联系方式: ${contact}`);
        return contact;
      }
    }
    
    return '联系方式待确认';
  }

  // 自动检测地区
  detectRegion($) {
    const text = $.html().toLowerCase();
    
    if (text.includes('東京') || text.includes('tokyo')) return '东京都';
    if (text.includes('埼玉') || text.includes('saitama')) return '埼玉县';
    if (text.includes('千葉') || text.includes('chiba')) return '千叶县';
    if (text.includes('神奈川') || text.includes('kanagawa')) return '神奈川县';
    if (text.includes('茨城') || text.includes('栃木') || text.includes('群馬')) return '北关东';
    if (text.includes('山梨') || text.includes('長野') || text.includes('新潟')) return '甲信越';
    
    return '地区待确认';
  }

  // 提取地图坐标（多方法）
  async extractCoordinates() {
    console.log('🗺️ 提取地图坐标...');
    
    try {
      // 方法1: iframe地图分析
      const iframeCoords = await this.page.evaluate(() => {
        const iframes = Array.from(document.querySelectorAll('iframe'));
        for (const iframe of iframes) {
          const src = iframe.src;
          if (src && (src.includes('maps.google') || src.includes('google.com/maps'))) {
            const coordsMatch = src.match(/[!@]([0-9.-]+),([0-9.-]+)/);
            const centerMatch = src.match(/center=([0-9.-]+),([0-9.-]+)/);
            
            if (coordsMatch) {
              const lat = parseFloat(coordsMatch[1]);
              const lng = parseFloat(coordsMatch[2]);
              if (lat >= 30 && lat <= 40 && lng >= 135 && lng <= 145) {
                return { lat, lng, source: 'iframe地图' };
              }
            }
            
            if (centerMatch) {
              const lat = parseFloat(centerMatch[1]);
              const lng = parseFloat(centerMatch[2]);
              if (lat >= 30 && lat <= 40 && lng >= 135 && lng <= 145) {
                return { lat, lng, source: 'iframe中心点' };
              }
            }
          }
        }
        return null;
      });

      if (iframeCoords) {
        console.log(`✅ 坐标提取成功 (${iframeCoords.source}): ${iframeCoords.lat}, ${iframeCoords.lng}`);
        return iframeCoords;
      }

      // 方法2: 链接坐标提取
      const linkCoords = await this.page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a[href*="maps"], a[href*="google"]'));
        for (const link of links) {
          const href = link.href;
          const patterns = [
            /@([0-9.-]+),([0-9.-]+)/,
            /ll=([0-9.-]+),([0-9.-]+)/,
            /center=([0-9.-]+),([0-9.-]+)/,
            /q=([0-9.-]+),([0-9.-]+)/
          ];
          
          for (const pattern of patterns) {
            const match = href.match(pattern);
            if (match) {
              const lat = parseFloat(match[1]);
              const lng = parseFloat(match[2]);
              if (lat >= 30 && lat <= 40 && lng >= 135 && lng <= 145) {
                return { lat, lng, source: 'Google Maps链接' };
              }
            }
          }
        }
        return null;
      });

      if (linkCoords) {
        console.log(`✅ 坐标提取成功 (${linkCoords.source}): ${linkCoords.lat}, ${linkCoords.lng}`);
        return linkCoords;
      }

      console.log('⚠️ 未能提取到有效坐标');
      return null;
      
    } catch (error) {
      console.error(`❌ 坐标提取失败: ${error.message}`);
      return null;
    }
  }

  // 确定活动类型（优化后的识别逻辑）
  determineActivityType(url, activityName = '') {
    const urlLower = url.toLowerCase();
    const nameLower = activityName.toLowerCase();
    
    // 花火大会识别
    if (urlLower.includes('hanabi') || urlLower.includes('firework') || 
        nameLower.includes('花火') || nameLower.includes('hanabi')) {
      return 'hanabi';
    }
    
    // 祭典识别（优先级最高，因为很多活动都是祭典）
    if (urlLower.includes('matsuri') || urlLower.includes('festival') ||
        nameLower.includes('祭') || nameLower.includes('matsuri') ||
        nameLower.includes('祭典') || nameLower.includes('フェス')) {
      return 'matsuri';
    }
    
    // 花见识别
    if (urlLower.includes('hanami') || urlLower.includes('sakura') ||
        nameLower.includes('花見') || nameLower.includes('桜') || nameLower.includes('hanami')) {
      return 'hanami';
    }
    
    // 红叶识别
    if (urlLower.includes('momiji') || urlLower.includes('autumn') ||
        nameLower.includes('紅葉') || nameLower.includes('もみじ')) {
      return 'momiji';
    }
    
    // 灯光识别
    if (urlLower.includes('illumination') || urlLower.includes('light') ||
        nameLower.includes('イルミネーション') || nameLower.includes('灯光')) {
      return 'illumination';
    }
    
    // 默认为文艺活动
    return 'culture';
  }

  // 保存到数据库
  async saveToDatabase(activityInfo, activityType) {
    console.log('💾 保存到数据库...');
    
    try {
      // 根据地区获取regionId
      const region = await prisma.region.findFirst({
        where: {
          nameCn: activityInfo.region
        }
      });

      if (!region) {
        throw new Error(`未找到地区: ${activityInfo.region}`);
      }

      // 准备数据
      const data = {
        name: activityInfo.name,
        address: activityInfo.address,
        datetime: activityInfo.datetime,
        venue: activityInfo.venue,
        access: activityInfo.access,
        organizer: activityInfo.organizer,
        price: activityInfo.price,
        contact: activityInfo.contact,
        website: activityInfo.website,
        googleMap: activityInfo.googleMap,
        region: activityInfo.region,
        regionId: region.id,
        verified: true
      };

      // 根据活动类型保存到对应表
      let result;
      switch (activityType) {
        case 'hanabi':
          result = await prisma.hanabiEvent.create({ data });
          break;
        case 'matsuri':
          result = await prisma.matsuriEvent.create({ data });
          break;
        case 'hanami':
          result = await prisma.hanamiEvent.create({ data });
          break;
        case 'momiji':
          result = await prisma.momijiEvent.create({ data });
          break;
        case 'illumination':
          result = await prisma.illuminationEvent.create({ data });
          break;
        case 'culture':
          result = await prisma.cultureEvent.create({ data });
          break;
        default:
          throw new Error(`未知活动类型: ${activityType}`);
      }

      console.log(`✅ 数据保存成功，ID: ${result.id}`);
      return result;
      
    } catch (error) {
      console.error(`❌ 数据保存失败: ${error.message}`);
      throw error;
    }
  }

  // 清理资源
  async cleanup() {
    if (this.browser) {
      await this.browser.close();
      console.log('🔚 浏览器已关闭');
    }
    await prisma.$disconnect();
    console.log('🔌 数据库连接已断开');
  }

  // 主要爬取流程
  async crawlActivity(url) {
    try {
      await this.initBrowser();
      
      const activityInfo = await this.extractActivityInfo(url);
      const activityType = this.determineActivityType(url, activityInfo.name);
      
      console.log('\n📋 提取的活动信息:');
      console.log('─'.repeat(50));
      Object.entries(activityInfo).forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
      });
      console.log('─'.repeat(50));
      console.log(`活动类型: ${activityType}\n`);
      
      const result = await this.saveToDatabase(activityInfo, activityType);
      
      console.log('🎉 活动信息爬取并保存成功！');
      return result;
      
    } catch (error) {
      console.error(`❌ 爬取失败: ${error.message}`);
      throw error;
    } finally {
      await this.cleanup();
    }
  }
}

// 命令行执行
async function main() {
  const url = process.argv[2];
  
  if (!url) {
    console.log('使用方法: node scripts/universal-activity-crawler.js <URL>');
    console.log('示例: node scripts/universal-activity-crawler.js https://www.jalan.net/event/evt_343864/');
    process.exit(1);
  }

  const crawler = new UniversalActivityCrawler();
  
  try {
    await crawler.crawlActivity(url);
  } catch (error) {
    console.error('爬取过程出错:', error);
    process.exit(1);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  main();
}

module.exports = UniversalActivityCrawler; 