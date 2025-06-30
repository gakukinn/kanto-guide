const { chromium } = require('playwright');
const cheerio = require('cheerio');
const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient();

class BatchActivityCrawler {
  constructor() {
    this.browser = null;
    this.page = null;
    this.extractionLog = [];
  }

  // 初始化浏览器
  async initBrowser() {
    console.log('🚀 启动浏览器...');
    this.browser = await chromium.launch({ 
      headless: true,
      args: [
        '--no-sandbox', 
        '--disable-setuid-sandbox', 
        '--disable-web-security'
      ]
    });
    
    this.page = await this.browser.newPage();
    
    await this.page.setExtraHTTPHeaders({
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    });
  }

  // 从列表页面提取活动链接
  async extractEventList(listUrl) {
    console.log(`📡 正在访问列表页面: ${listUrl}`);
    
    await this.page.goto(listUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    });

    await this.page.waitForTimeout(3000);
    
    const content = await this.page.content();
    const $ = cheerio.load(content);
    
    const eventLinks = [];
    
    // 提取活动链接
    $('a[href*="/event/evt_"]').each((index, element) => {
      if (index < 10) { // 只要前10个
        const $el = $(element);
        let href = $el.attr('href');
        
        if (href && href.includes('/event/evt_')) {
          if (!href.startsWith('http')) {
            href = 'https://www.jalan.net' + href;
          }
          
          // 修正重复的域名问题
          href = href.replace('https://www.jalan.net//www.jalan.net', 'https://www.jalan.net');
          
          const title = $el.text().trim().split('\n')[0];
          
          eventLinks.push({
            title: title.substring(0, 100),
            url: href
          });
        }
      }
    });
    
    console.log(`✅ 提取到 ${eventLinks.length} 个活动链接`);
    eventLinks.forEach((event, index) => {
      console.log(`${index + 1}. ${event.title}`);
    });
    
    return eventLinks;
  }

  // 判断活动是否属于六大类型
  isValidActivityType(title, url) {
    const titleLower = title.toLowerCase();
    const urlLower = url.toLowerCase();
    
    // 花火大会
    if (titleLower.includes('花火') || titleLower.includes('hanabi') || 
        urlLower.includes('hanabi') || titleLower.includes('firework')) {
      return 'hanabi';
    }
    
    // 祭典
    if (titleLower.includes('祭') || titleLower.includes('matsuri') || 
        titleLower.includes('祭典') || titleLower.includes('フェス') ||
        urlLower.includes('matsuri') || urlLower.includes('festival')) {
      return 'matsuri';
    }
    
    // 花见
    if (titleLower.includes('花見') || titleLower.includes('桜') || 
        titleLower.includes('hanami') || titleLower.includes('sakura') ||
        urlLower.includes('hanami') || urlLower.includes('sakura')) {
      return 'hanami';
    }
    
    // 红叶
    if (titleLower.includes('紅葉') || titleLower.includes('もみじ') || 
        titleLower.includes('momiji') || urlLower.includes('momiji')) {
      return 'momiji';
    }
    
    // 灯光
    if (titleLower.includes('イルミネーション') || titleLower.includes('灯光') || 
        titleLower.includes('illumination') || urlLower.includes('illumination')) {
      return 'illumination';
    }
    
    // 文艺（艺术展览、文化活动等）
    if (titleLower.includes('展') || titleLower.includes('アート') || 
        titleLower.includes('文化') || titleLower.includes('芸術')) {
      return 'culture';
    }
    
    return null; // 不属于六大类型
  }

  // 严格提取活动信息（只提取实际存在的信息）
  async extractActivityInfoStrict(url) {
    console.log(`\n📡 正在访问详情页面: ${url}`);
    
    try {
      await this.page.goto(url, {
        waitUntil: 'domcontentloaded',
        timeout: 30000
      });

      await this.page.waitForTimeout(2000);
      
      const content = await this.page.content();
      const $ = cheerio.load(content);
      
      // 严格提取，记录来源
      const activityInfo = {
        name: this.extractWithSource($, 'name'),
        address: this.extractWithSource($, 'address'),
        datetime: this.extractWithSource($, 'datetime'),
        venue: this.extractWithSource($, 'venue'),
        access: this.extractWithSource($, 'access'),
        organizer: this.extractWithSource($, 'organizer'),
        price: this.extractWithSource($, 'price'),
        contact: this.extractWithSource($, 'contact'),
        website: url, // 当前URL作为官方网站
        googleMap: '', // 稍后提取
        region: this.detectRegionStrict($)
      };

      // 尝试提取坐标
      const coordinates = await this.extractCoordinatesStrict();
      if (coordinates) {
        activityInfo.googleMap = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d${coordinates.lng}!3d${coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v${Date.now()}!5m2!1sja!2sjp`;
        activityInfo.coordinatesSource = coordinates.source;
      }

      return activityInfo;
      
    } catch (error) {
      console.error(`❌ 详情页面访问失败: ${error.message}`);
      return null;
    }
  }

  // 严格提取字段信息并记录来源
  extractWithSource($, fieldType) {
    const selectors = this.getSelectorsForField(fieldType);
    
    for (const selectorInfo of selectors) {
      const value = $(selectorInfo.selector).first().text().trim();
      if (value && value.length > 2) {
        // 记录提取来源
        this.extractionLog.push({
          field: fieldType,
          value: value,
          selector: selectorInfo.selector,
          description: selectorInfo.description
        });
        
        console.log(`✅ ${selectorInfo.description}: ${value.substring(0, 50)}...`);
        return value;
      }
    }
    
    // 如果没有找到，明确标记
    this.extractionLog.push({
      field: fieldType,
      value: `${fieldType}信息未在页面找到`,
      selector: 'none',
      description: '页面中无此信息'
    });
    
    console.log(`⚠️ ${fieldType}: 页面中未找到此信息`);
    return `${fieldType}信息未在页面找到`;
  }

  // 获取不同字段的选择器
  getSelectorsForField(fieldType) {
    const selectorMap = {
      name: [
        { selector: 'h1', description: '页面主标题' },
        { selector: '.event-title', description: '活动标题' },
        { selector: '.title', description: '标题元素' }
      ],
      address: [
        { selector: 'dt:contains("住所") + dd', description: '住所字段' },
        { selector: 'dt:contains("所在地") + dd', description: '所在地字段' },
        { selector: '.address', description: '地址元素' }
      ],
      datetime: [
        { selector: 'dt:contains("開催期間") + dd', description: '开催期间字段' },
        { selector: 'dt:contains("開催日") + dd', description: '开催日字段' },
        { selector: '.event-date', description: '活动日期元素' }
      ],
      venue: [
        { selector: 'dt:contains("会場") + dd', description: '会场字段' },
        { selector: 'dt:contains("場所") + dd', description: '场所字段' },
        { selector: '.venue', description: '场所元素' }
      ],
      access: [
        { selector: 'dt:contains("アクセス") + dd', description: '交通方式字段' },
        { selector: '.access', description: '交通元素' }
      ],
      organizer: [
        { selector: 'dt:contains("主催") + dd', description: '主办方字段' },
        { selector: '.organizer', description: '主办方元素' }
      ],
      price: [
        { selector: 'dt:contains("料金") + dd', description: '料金字段' },
        { selector: 'dt:contains("入場料") + dd', description: '入场费字段' },
        { selector: '.price', description: '价格元素' }
      ],
      contact: [
        { selector: 'dt:contains("お問い合わせ") + dd', description: '联系方式字段' },
        { selector: '.contact', description: '联系方式元素' }
      ]
    };
    
    return selectorMap[fieldType] || [];
  }

  // 严格的地区检测
  detectRegionStrict($) {
    const html = $.html();
    
    if (html.includes('東京都') || html.includes('tokyo')) return '东京都';
    if (html.includes('埼玉県') || html.includes('saitama')) return '埼玉县';
    if (html.includes('千葉県') || html.includes('chiba')) return '千叶县';
    if (html.includes('神奈川県') || html.includes('kanagawa')) return '神奈川县';
    if (html.includes('茨城県') || html.includes('栃木県') || html.includes('群馬県')) return '北关东';
    if (html.includes('山梨県') || html.includes('長野県') || html.includes('新潟県')) return '甲信越';
    
    return '地区信息未在页面找到';
  }

  // 严格的坐标提取
  async extractCoordinatesStrict() {
    try {
      // 方法1: iframe地图
      const iframeCoords = await this.page.evaluate(() => {
        const iframes = Array.from(document.querySelectorAll('iframe'));
        for (const iframe of iframes) {
          const src = iframe.src;
          if (src && src.includes('maps.google')) {
            const match = src.match(/[!@]([0-9.-]+),([0-9.-]+)/);
            if (match) {
              const lat = parseFloat(match[1]);
              const lng = parseFloat(match[2]);
              if (lat >= 30 && lat <= 40 && lng >= 135 && lng <= 145) {
                return { lat, lng, source: 'iframe地图坐标' };
              }
            }
          }
        }
        return null;
      });

      if (iframeCoords) return iframeCoords;

      // 方法2: 链接坐标
      const linkCoords = await this.page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a[href*="maps"]'));
        for (const link of links) {
          const match = link.href.match(/@([0-9.-]+),([0-9.-]+)/);
          if (match) {
            const lat = parseFloat(match[1]);
            const lng = parseFloat(match[2]);
            if (lat >= 30 && lat <= 40 && lng >= 135 && lng <= 145) {
              return { lat, lng, source: 'Google Maps链接坐标' };
            }
          }
        }
        return null;
      });

      return linkCoords;
    } catch (error) {
      console.error(`坐标提取失败: ${error.message}`);
      return null;
    }
  }

  // 保存到数据库
  async saveToDatabase(activityInfo, activityType) {
    try {
      const region = await prisma.region.findFirst({
        where: { nameCn: activityInfo.region }
      });

      if (!region) {
        console.log(`⚠️ 地区 "${activityInfo.region}" 不在数据库中，跳过保存`);
        return null;
      }

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
      }

      console.log(`✅ 保存成功，ID: ${result.id}`);
      return result;
    } catch (error) {
      console.error(`❌ 保存失败: ${error.message}`);
      return null;
    }
  }

  // 清理资源
  async cleanup() {
    if (this.browser) {
      await this.browser.close();
    }
    await prisma.$disconnect();
  }

  // 主处理流程
  async processBatch(listUrl) {
    console.log('🎯 开始批量处理活动信息...\n');
    
    try {
      await this.initBrowser();
      
      // 1. 提取活动列表
      const eventList = await this.extractEventList(listUrl);
      
      // 2. 筛选符合类型的活动
      const validEvents = [];
      eventList.forEach(event => {
        const activityType = this.isValidActivityType(event.title, event.url);
        if (activityType) {
          validEvents.push({
            ...event,
            type: activityType
          });
          console.log(`✅ 有效活动 (${activityType}): ${event.title}`);
        } else {
          console.log(`❌ 跳过活动 (不符合类型): ${event.title}`);
        }
      });
      
      console.log(`\n📊 筛选结果: ${validEvents.length}/${eventList.length} 个活动符合要求\n`);
      
      // 3. 逐个处理有效活动
      const results = [];
      for (let i = 0; i < validEvents.length; i++) {
        const event = validEvents[i];
        console.log(`\n🔄 处理第 ${i + 1}/${validEvents.length} 个活动...`);
        console.log(`📝 活动: ${event.title}`);
        console.log(`🏷️ 类型: ${event.type}`);
        
        this.extractionLog = []; // 重置日志
        
        const activityInfo = await this.extractActivityInfoStrict(event.url);
        
        if (activityInfo) {
          console.log('\n📋 提取结果摘要:');
          console.log(`名称: ${activityInfo.name.substring(0, 30)}...`);
          console.log(`地区: ${activityInfo.region}`);
          console.log(`日期: ${activityInfo.datetime.substring(0, 30)}...`);
          
          const saved = await this.saveToDatabase(activityInfo, event.type);
          if (saved) {
            results.push({
              ...event,
              activityInfo,
              saved: true,
              id: saved.id
            });
          }
        }
        
        // 短暂延迟避免过于频繁请求
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      console.log('\n🎉 批量处理完成！');
      console.log(`✅ 成功处理: ${results.length} 个活动`);
      console.log(`❌ 跳过: ${eventList.length - results.length} 个活动`);
      
      return results;
      
    } catch (error) {
      console.error(`❌ 批量处理失败: ${error.message}`);
      throw error;
    } finally {
      await this.cleanup();
    }
  }
}

// 命令行执行
async function main() {
  const listUrl = process.argv[2] || 'https://www.jalan.net/event/130000/?screenId=OUW1025';
  
  console.log('🚀 启动批量活动爬取器');
  console.log('📋 数据真实性保证:');
  console.log('  ✅ 只提取页面实际存在的信息');
  console.log('  ✅ 缺失信息明确标记为"未找到"');
  console.log('  ✅ 记录详细的数据来源');
  console.log('  ✅ 智能筛选六大活动类型');
  console.log(`\n🎯 目标列表: ${listUrl}\n`);

  const crawler = new BatchActivityCrawler();
  
  try {
    const results = await crawler.processBatch(listUrl);
    
    if (results.length > 0) {
      console.log('\n📊 处理结果汇总:');
      results.forEach((result, index) => {
        console.log(`${index + 1}. ${result.title} (${result.type}) - ID: ${result.id}`);
      });
    }
  } catch (error) {
    console.error('处理过程出错:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = BatchActivityCrawler; 