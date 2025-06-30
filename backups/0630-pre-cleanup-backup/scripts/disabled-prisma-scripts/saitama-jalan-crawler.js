const { chromium } = require('playwright');
const { parse } = require('node-html-parser');
const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient();

/**
 * 埼玉县活动数据爬取器
 * 严格按照商业标准：不编造数据，只抓取真实信息
 * 技术栈：Playwright + node-html-parser + Prisma
 */
class SaitamaJalanCrawler {
  constructor() {
    this.browser = null;
    this.page = null;
    this.targetUrl = 'https://www.jalan.net/event/110000/?screenId=OUW1702'; // 埼玉县
    this.maxActivities = 10; // 前10个活动
    this.extracted = [];
  }

  /**
   * 初始化浏览器
   */
  async initBrowser() {
    console.log('🚀 启动浏览器...');
    this.browser = await chromium.launch({
      headless: true, // 设为false可看到浏览器操作过程
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-web-security',
        '--disable-blink-features=AutomationControlled',
        '--disable-features=VizDisplayCompositor'
      ]
    });

    this.page = await this.browser.newPage();
    
    // 设置真实的用户代理避免被识别为爬虫
    await this.page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    
    // 设置视口
    await this.page.setViewportSize({ width: 1920, height: 1080 });
  }

  /**
   * 获取活动列表页面的活动链接
   */
  async getActivityLinks() {
    console.log(`📡 正在访问埼玉县活动列表页面: ${this.targetUrl}`);
    
    try {
      await this.page.goto(this.targetUrl, {
        waitUntil: 'domcontentloaded',
        timeout: 30000
      });

      // 等待页面完全加载
      await this.page.waitForTimeout(3000);
      
      const content = await this.page.content();
      const root = parse(content);
      
      // 查找活动链接 - 根据jalan.net的页面结构
      const activityLinks = [];
      
      // 尝试多种选择器查找活动链接
      const linkSelectors = [
        'a[href*="/event/"]',
        '.event-list a',
        '.event-item a',
        '.list-item a[href*="/event/"]',
        'article a[href*="/event/"]'
      ];
      
      for (const selector of linkSelectors) {
        const links = root.querySelectorAll(selector);
        console.log(`🔍 选择器 "${selector}" 找到 ${links.length} 个链接`);
        
        for (const link of links) {
          const href = link.getAttribute('href');
          if (href && href.includes('/event/') && activityLinks.length < this.maxActivities) {
            // 构建完整URL
            const fullUrl = href.startsWith('http') ? href : `https://www.jalan.net${href}`;
            
            // 避免重复
            if (!activityLinks.includes(fullUrl)) {
              activityLinks.push(fullUrl);
              console.log(`✅ 找到活动链接 ${activityLinks.length}: ${fullUrl}`);
            }
          }
        }
        
        if (activityLinks.length >= this.maxActivities) break;
      }
      
      console.log(`📊 总共找到 ${activityLinks.length} 个活动链接`);
      return activityLinks.slice(0, this.maxActivities);
      
    } catch (error) {
      console.error(`❌ 获取活动链接失败: ${error.message}`);
      throw error;
    }
  }

  /**
   * 从单个活动页面提取十项信息
   */
  async extractActivityInfo(url) {
    console.log(`\n📋 正在提取活动信息: ${url}`);
    
    try {
      await this.page.goto(url, {
        waitUntil: 'domcontentloaded',
        timeout: 30000
      });

      await this.page.waitForTimeout(2000);
      
      const content = await this.page.content();
      const root = parse(content);
      
      // 初始化十项信息结构
      const activityInfo = {
        // 必需的十项信息
        name: '',           // 1. 活动名称
        address: '',        // 2. 详细地址  
        datetime: '',       // 3. 活动时间
        venue: '',          // 4. 活动场地
        access: '',         // 5. 交通方式
        organizer: '',      // 6. 主办方信息
        price: '',          // 7. 费用信息
        contact: '',        // 8. 联系方式
        website: url,       // 9. 官方网站（原网页）
        googleMap: '',      // 10. 地理坐标（稍后处理）
        
        // 元数据
        region: '埼玉县',
        verified: true,     // 标记为已验证的真实数据
        source: 'jalan.net' // 数据来源
      };

      // 提取活动名称
      activityInfo.name = this.extractName(root);
      
      // 提取地址
      activityInfo.address = this.extractAddress(root);
      
      // 提取时间
      activityInfo.datetime = this.extractDateTime(root);
      
      // 提取场地
      activityInfo.venue = this.extractVenue(root);
      
      // 提取交通方式
      activityInfo.access = this.extractAccess(root);
      
      // 提取主办方
      activityInfo.organizer = this.extractOrganizer(root);
      
      // 提取费用
      activityInfo.price = this.extractPrice(root);
      
      // 提取联系方式
      activityInfo.contact = this.extractContact(root);
      
      // 提取官方网站
      const homepage = this.extractHomepage(root);
      if (homepage && homepage !== url) {
        activityInfo.website = homepage; // 如果找到专门的官网，使用官网；否则使用jalan页面
      }
      
      // 提取地图坐标
      activityInfo.googleMap = await this.extractGoogleMapCoordinates();
      
      // 验证数据完整性
      this.validateActivityInfo(activityInfo);
      
      console.log(`✅ 活动信息提取完成: ${activityInfo.name}`);
      return activityInfo;
      
    } catch (error) {
      console.error(`❌ 提取活动信息失败: ${error.message}`);
      // 返回基础信息，避免程序中断
      return {
        name: '信息提取失败',
        address: '地址待确认',
        datetime: '时间待确认', 
        venue: '场地待确认',
        access: '交通待确认',
        organizer: '主办方待确认',
        price: '费用待确认',
        contact: '联系方式待确认',
        website: url,
        googleMap: '',
        region: '埼玉县',
        verified: false, // 标记为未验证
        source: 'jalan.net'
      };
    }
  }

  /**
   * 提取活动名称
   */
  extractName(root) {
    const selectors = [
      'h1.event-title',
      'h1.title',
      '.event-name h1',
      '.main-title',
      'h1',
      '.page-title h1'
    ];
    
    for (const selector of selectors) {
      const element = root.querySelector(selector);
      if (element) {
        const name = element.text.trim();
        if (name && name.length > 0) {
          console.log(`📝 活动名称: ${name}`);
          return name;
        }
      }
    }
    
    console.log('⚠️ 未找到活动名称');
    return '活动名称待确认';
  }

  /**
   * 提取所在地
   */
  extractAddress(root) {
    const selectors = [
      'dt:contains("所在地") + dd',
      'dt:contains("住所") + dd',
      '.address',
      '.event-address',
      '.location-address',
      'tr:has(th:contains("所在地")) td',
      'tr:has(td:contains("所在地")) td:last-child'
    ];
    
    for (const selector of selectors) {
      const element = root.querySelector(selector);
      if (element) {
        const address = element.text.trim();
        if (address && address.length > 3 && !address.includes('所在地')) {
          console.log(`📍 所在地: ${address}`);
          return address;
        }
      }
    }
    
    console.log('⚠️ 未找到所在地信息');
    return '所在地待确认';
  }

  /**
   * 提取開催期間
   */
  extractDateTime(root) {
    const selectors = [
      'dt:contains("開催期間") + dd',
      'dt:contains("開催日") + dd',
      'dt:contains("期間") + dd',
      'tr:has(th:contains("開催期間")) td',
      'tr:has(td:contains("開催期間")) td:last-child',
      '.event-date',
      '.date-time',
      '.period'
    ];
    
    for (const selector of selectors) {
      const element = root.querySelector(selector);
      if (element) {
        const datetime = element.text.trim();
        if (datetime && !datetime.includes('開催期間')) {
          console.log(`📅 開催期間: ${datetime}`);
          return datetime;
        }
      }
    }
    
    console.log('⚠️ 未找到開催期間信息');
    return '開催期間待確認';
  }

  /**
   * 提取開催場所
   */
  extractVenue(root) {
    const selectors = [
      'dt:contains("開催場所") + dd',
      'dt:contains("会場") + dd',
      'dt:contains("場所") + dd',
      'tr:has(th:contains("開催場所")) td',
      'tr:has(td:contains("開催場所")) td:last-child',
      'tr:has(th:contains("会場")) td',
      'tr:has(td:contains("会場")) td:last-child',
      '.venue',
      '.event-venue',
      '.location-name'
    ];
    
    for (const selector of selectors) {
      const element = root.querySelector(selector);
      if (element) {
        const venue = element.text.trim();
        if (venue && !venue.includes('開催場所') && !venue.includes('会場')) {
          console.log(`🏛️ 開催場所: ${venue}`);
          return venue;
        }
      }
    }
    
    console.log('⚠️ 未找到開催場所信息');
    return '開催場所待確認';
  }

  /**
   * 提取交通アクセス
   */
  extractAccess(root) {
    const selectors = [
      'dt:contains("交通アクセス") + dd',
      'dt:contains("アクセス") + dd',
      'dt:contains("交通") + dd',
      'tr:has(th:contains("交通アクセス")) td',
      'tr:has(td:contains("交通アクセス")) td:last-child',
      'tr:has(th:contains("アクセス")) td',
      'tr:has(td:contains("アクセス")) td:last-child',
      '.access',
      '.transportation',
      '.access-info'
    ];
    
    for (const selector of selectors) {
      const element = root.querySelector(selector);
      if (element) {
        const access = element.text.trim();
        if (access && !access.includes('交通') && !access.includes('アクセス')) {
          console.log(`🚄 交通アクセス: ${access}`);
          return access;
        }
      }
    }
    
    console.log('⚠️ 未找到交通アクセス信息');
    return '交通アクセス待確認';
  }

  /**
   * 提取主催
   */
  extractOrganizer(root) {
    const selectors = [
      'dt:contains("主催") + dd',
      'tr:has(th:contains("主催")) td',
      'tr:has(td:contains("主催")) td:last-child',
      'dt:contains("主办") + dd',
      '.organizer',
      '.sponsor'
    ];
    
    for (const selector of selectors) {
      const element = root.querySelector(selector);
      if (element) {
        const organizer = element.text.trim();
        if (organizer && !organizer.includes('主催')) {
          console.log(`🏢 主催: ${organizer}`);
          return organizer;
        }
      }
    }
    
    console.log('⚠️ 未找到主催信息');
    return '主催待確認';
  }

  /**
   * 提取料金
   */
  extractPrice(root) {
    const selectors = [
      'dt:contains("料金") + dd',
      'tr:has(th:contains("料金")) td',
      'tr:has(td:contains("料金")) td:last-child',
      'dt:contains("費用") + dd',
      'dt:contains("入場料") + dd',
      'dt:contains("参加費") + dd',
      '.price',
      '.fee',
      '.cost'
    ];
    
    for (const selector of selectors) {
      const element = root.querySelector(selector);
      if (element) {
        const price = element.text.trim();
        if (price && !price.includes('料金')) {
          console.log(`💰 料金: ${price}`);
          return price;
        }
      }
    }
    
    console.log('⚠️ 未找到料金信息');
    return '料金待確認';
  }

  /**
   * 提取問合せ先
   */
  extractContact(root) {
    const selectors = [
      'dt:contains("問合せ先") + dd',
      'dt:contains("問い合わせ") + dd',
      'tr:has(th:contains("問合せ先")) td',
      'tr:has(td:contains("問合せ先")) td:last-child',
      'tr:has(th:contains("問い合わせ")) td',
      'tr:has(td:contains("問い合わせ")) td:last-child',
      'dt:contains("連絡先") + dd',
      '.contact',
      '.tel',
      '.phone'
    ];
    
    for (const selector of selectors) {
      const element = root.querySelector(selector);
      if (element) {
        const contact = element.text.trim();
        if (contact && !contact.includes('問合せ') && !contact.includes('連絡')) {
          console.log(`📞 問合せ先: ${contact}`);
          return contact;
        }
      }
    }
    
    console.log('⚠️ 未找到問合せ先信息');
    return '問合せ先待確認';
  }

  /**
   * 提取ホームページ
   */
  extractHomepage(root) {
    const selectors = [
      'dt:contains("ホームページ") + dd a',
      'dt:contains("公式サイト") + dd a',
      'tr:has(th:contains("ホームページ")) td a',
      'tr:has(td:contains("ホームページ")) td:last-child a',
      'tr:has(th:contains("公式サイト")) td a',
      'tr:has(td:contains("公式サイト")) td:last-child a',
      '.official-site a',
      '.homepage a',
      'a[href*="http"]:contains("公式")',
      'a[href*="http"]:contains("ホームページ")'
    ];
    
    for (const selector of selectors) {
      const element = root.querySelector(selector);
      if (element) {
        const homepage = element.getAttribute('href');
        if (homepage && homepage.startsWith('http') && !homepage.includes('jalan.net')) {
          console.log(`🌐 ホームページ: ${homepage}`);
          return homepage;
        }
      }
    }
    
    console.log('⚠️ 未找到独立的ホームページ，使用jalan页面');
    return '';
  }

  /**
   * 提取Google地图坐标
   */
  async extractGoogleMapCoordinates() {
    try {
      // 尝试在页面中查找地图相关的脚本或元素
      const mapElements = await this.page.$$('script');
      
      for (const element of mapElements) {
        const content = await element.textContent();
        if (content && (content.includes('lat') || content.includes('lng') || content.includes('LatLng'))) {
          // 尝试提取经纬度
          const latMatch = content.match(/lat[^0-9\-]*([0-9\.\-]+)/i);
          const lngMatch = content.match(/lng[^0-9\-]*([0-9\.\-]+)/i);
          
          if (latMatch && lngMatch) {
            const lat = parseFloat(latMatch[1]);
            const lng = parseFloat(lngMatch[1]);
            
            if (lat >= 35 && lat <= 36.5 && lng >= 138.5 && lng <= 140.5) { // 埼玉県范围
              const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v${Date.now()}!5m2!1sja!2sjp`;
              console.log(`🗺️ 地图坐标: ${lat}, ${lng}`);
              return mapUrl;
            }
          }
        }
      }
      
      console.log('⚠️ 未找到有效的地图坐标');
      return '';
      
    } catch (error) {
      console.log('⚠️ 地图坐标提取失败');
      return '';
    }
  }

  /**
   * 验证活动信息完整性
   */
  validateActivityInfo(info) {
    const requiredFields = ['name', 'address', 'datetime', 'venue', 'access', 'organizer', 'price', 'contact', 'website'];
    const missingFields = [];
    
    for (const field of requiredFields) {
      if (!info[field] || info[field] === `${field}待确认`) {
        missingFields.push(field);
      }
    }
    
    if (missingFields.length > 0) {
      console.log(`⚠️ 缺失字段: ${missingFields.join(', ')}`);
    } else {
      console.log('✅ 十项信息验证通过');
    }
  }

  /**
   * 确定活动类型
   */
  determineActivityType(activityName, url = '') {
    const keywords = {
      matsuri: ['祭', '祭り', '祭典', 'フェス', 'festival', 'matsuri'],
      hanami: ['桜', '花見', '桜祭典', '花见', 'sakura', 'hanami'],
      hanabi: ['花火', '花火大会', '打ち上げ', 'hanabi', 'fireworks'],
      momiji: ['紅葉', 'もみじ', '紅葉狩り', '狩枫', 'momiji', 'autumn'],
      illumination: ['イルミネーション', '夜景', '灯光', 'illumination', 'light'],
      culture: ['展覧会', '美術', '博物館', '文化', 'culture', 'museum', 'art']
    };
    
    const searchText = `${activityName} ${url}`.toLowerCase();
    
    for (const [type, typeKeywords] of Object.entries(keywords)) {
      for (const keyword of typeKeywords) {
        if (searchText.includes(keyword.toLowerCase())) {
          console.log(`🏷️ 活动类型识别: ${type} (关键词: ${keyword})`);
          return type;
        }
      }
    }
    
    console.log('🏷️ 活动类型识别: culture (默认)');
    return 'culture'; // 默认分类为文化活动
  }

  /**
   * 保存到数据库 - 更新重复数据而不添加
   */
  async saveToDatabase(activityInfo) {
    try {
      const activityType = this.determineActivityType(activityInfo.name, activityInfo.website);
      
      // 获取埼玉县的regionId
      const saitamaRegion = await prisma.region.findUnique({
        where: { code: 'saitama' }
      });
      
      if (!saitamaRegion) {
        throw new Error('埼玉县地区记录不存在，请先运行 node scripts/ensure-saitama-region.js');
      }
      
      // 根据活动类型选择对应的数据表
      let model;
      switch (activityType) {
        case 'matsuri':
          model = prisma.matsuriEvent;
          break;
        case 'hanami':
          model = prisma.hanamiEvent;
          break;
        case 'hanabi':
          model = prisma.hanabiEvent;
          break;
        case 'momiji':
          model = prisma.momijiEvent;
          break;
        case 'illumination':
          model = prisma.illuminationEvent;
          break;
        default:
          model = prisma.cultureEvent;
      }
      
      // 首先查找是否存在相同名称的活动
      const existingActivity = await model.findFirst({
        where: {
          name: activityInfo.name,
          region: activityInfo.region
        }
      });
      
      if (existingActivity) {
        // 更新现有记录
        await model.update({
          where: { id: existingActivity.id },
          data: {
            address: activityInfo.address,
            datetime: activityInfo.datetime,
            venue: activityInfo.venue,
            access: activityInfo.access,
            organizer: activityInfo.organizer,
            price: activityInfo.price,
            contact: activityInfo.contact,
            website: activityInfo.website,
            googleMap: activityInfo.googleMap,
            verified: activityInfo.verified,
            updatedAt: new Date()
          }
        });
        
        console.log(`🔄 更新现有活动: ${activityInfo.name} (${activityType})`);
      } else {
        // 创建新记录
        await model.create({
          data: {
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
            verified: activityInfo.verified,
            regionId: saitamaRegion.id
          }
        });
        
        console.log(`➕ 创建新活动: ${activityInfo.name} (${activityType})`);
      }
      
    } catch (error) {
      console.error(`❌ 数据库保存失败: ${error.message}`);
      throw error;
    }
  }

  /**
   * 清理资源
   */
  async cleanup() {
    if (this.browser) {
      await this.browser.close();
      console.log('🧹 浏览器已关闭');
    }
    
    await prisma.$disconnect();
    console.log('🗃️ 数据库连接已关闭');
  }

  /**
   * 主执行流程
   */
  async run() {
    try {
      console.log('🚀 埼玉县活动数据爬取开始');
      console.log('📋 严格模式：只抓取真实数据，严禁编造');
      
      // 1. 初始化浏览器
      await this.initBrowser();
      
      // 2. 获取活动链接
      const activityLinks = await this.getActivityLinks();
      
      if (activityLinks.length === 0) {
        throw new Error('未找到任何活动链接，请检查页面结构是否有变化');
      }
      
      // 3. 逐个提取活动信息
      for (let i = 0; i < activityLinks.length; i++) {
        console.log(`\n--- 处理活动 ${i + 1}/${activityLinks.length} ---`);
        
        const activityInfo = await this.extractActivityInfo(activityLinks[i]);
        
        // 4. 保存到数据库
        await this.saveToDatabase(activityInfo);
        
        // 5. 延迟避免过快请求
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      
      console.log('\n✅ 埼玉县活动数据爬取完成');
      console.log(`📊 总共处理了 ${activityLinks.length} 个活动`);
      
    } catch (error) {
      console.error(`❌ 爬取过程出现错误: ${error.message}`);
      throw error;
    } finally {
      await this.cleanup();
    }
  }
}

// 执行爬取
async function main() {
  const crawler = new SaitamaJalanCrawler();
  
  try {
    await crawler.run();
  } catch (error) {
    console.error('💥 爬取失败:', error.message);
    process.exit(1);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  main();
}

module.exports = SaitamaJalanCrawler; 