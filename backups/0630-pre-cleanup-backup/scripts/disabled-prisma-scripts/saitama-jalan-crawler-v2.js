const { chromium } = require('playwright');
const { parse } = require('node-html-parser');
const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient();

/**
 * 埼玉县活动数据爬取器 V2
 * 针对jalan.net页面结构优化
 * 严格按照商业标准：不编造数据，只抓取真实信息
 * 技术栈：Playwright + node-html-parser + Prisma
 */
class SaitamaJalanCrawlerV2 {
  constructor() {
    this.browser = null;
    this.page = null;
    this.targetUrl = 'https://www.jalan.net/event/110000/?screenId=OUW1702'; // 埼玉县
    this.maxActivities = 10; // 前10个活动
  }

  /**
   * 初始化浏览器
   */
  async initBrowser() {
    console.log('🚀 启动浏览器...');
    this.browser = await chromium.launch({
      headless: false, // 设为false方便调试
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-web-security',
        '--disable-blink-features=AutomationControlled'
      ]
    });

    this.page = await this.browser.newPage();
    await this.page.setExtraHTTPHeaders({
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    });
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
      await this.page.waitForTimeout(5000);
      
      // 使用Playwright直接获取链接，更可靠
      const activityLinks = await this.page.evaluate(() => {
        const links = [];
        // 查找所有包含event的链接
        const allLinks = document.querySelectorAll('a[href*="/event/"]');
        
        allLinks.forEach(link => {
          const href = link.href;
          if (href && href.includes('/event/') && !href.includes('?') && !links.includes(href)) {
            links.push(href);
          }
        });
        
        return links.slice(0, 10); // 只取前10个
      });
      
      console.log(`📊 总共找到 ${activityLinks.length} 个活动链接`);
      activityLinks.forEach((link, index) => {
        console.log(`${index + 1}. ${link}`);
      });
      
      return activityLinks;
      
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

      await this.page.waitForTimeout(3000);
      
      // 使用Playwright直接在页面中提取信息，更准确
      const activityInfo = await this.page.evaluate((pageUrl) => {
        const info = {
          name: '',
          address: '',
          datetime: '',
          venue: '',
          access: '',
          organizer: '',
          price: '',
          contact: '',
          website: pageUrl,
          googleMap: '',
          region: '埼玉県',
          verified: true,
          source: 'jalan.net'
        };

        // 提取活动名称
        const nameSelectors = ['h1', '.event-title', '.main-title', '.title'];
        for (const selector of nameSelectors) {
          const element = document.querySelector(selector);
          if (element && element.textContent.trim()) {
            info.name = element.textContent.trim();
            break;
          }
        }

        // 查找表格数据
        const tables = document.querySelectorAll('table, .event-info, .detail-table');
        for (const table of tables) {
          const rows = table.querySelectorAll('tr');
          for (const row of rows) {
            const cells = row.querySelectorAll('th, td');
            if (cells.length >= 2) {
              const header = cells[0].textContent.trim();
              const value = cells[1].textContent.trim();
              
              if (header.includes('所在地') && !info.address) {
                info.address = value;
              } else if (header.includes('開催期間') && !info.datetime) {
                info.datetime = value;
              } else if (header.includes('開催場所') || header.includes('会場')) {
                info.venue = value;
              } else if (header.includes('アクセス') || header.includes('交通')) {
                info.access = value;
              } else if (header.includes('主催') && !info.organizer) {
                info.organizer = value;
              } else if (header.includes('料金') || header.includes('費用')) {
                info.price = value;
              } else if (header.includes('問合せ') || header.includes('問い合わせ')) {
                info.contact = value;
              }
            }
          }
        }

        // 查找ホームページ链接
        const homepageLinks = document.querySelectorAll('a[href^="http"]');
        for (const link of homepageLinks) {
          const href = link.href;
          const text = link.textContent;
          if ((text.includes('ホームページ') || text.includes('公式') || href.includes('official')) 
              && !href.includes('jalan.net')) {
            info.website = href;
            break;
          }
        }

        // 查找地图坐标
        const scripts = document.querySelectorAll('script');
        for (const script of scripts) {
          const content = script.textContent;
          if (content && (content.includes('lat') || content.includes('lng'))) {
            const latMatch = content.match(/lat[^0-9\-]*([0-9\.\-]+)/i);
            const lngMatch = content.match(/lng[^0-9\-]*([0-9\.\-]+)/i);
            
            if (latMatch && lngMatch) {
              const lat = parseFloat(latMatch[1]);
              const lng = parseFloat(lngMatch[1]);
              
              if (lat >= 35 && lat <= 36.5 && lng >= 138.5 && lng <= 140.5) {
                info.googleMap = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v${Date.now()}!5m2!1sja!2sjp`;
                break;
              }
            }
          }
        }

        return info;
      }, url);

      // 验证和补充信息
      this.validateAndFillDefaults(activityInfo);
      
      console.log(`✅ 活动信息提取完成: ${activityInfo.name}`);
      this.logActivityInfo(activityInfo);
      
      return activityInfo;
      
    } catch (error) {
      console.error(`❌ 提取活动信息失败: ${error.message}`);
      return this.createFailsafeInfo(url);
    }
  }

  /**
   * 验证并填充默认值
   */
  validateAndFillDefaults(info) {
    if (!info.name || info.name.length < 2) {
      info.name = '活動名稱待確認';
      info.verified = false;
    }
    if (!info.address || info.address.length < 3) {
      info.address = '所在地待確認';
    }
    if (!info.datetime) {
      info.datetime = '開催期間待確認';
    }
    if (!info.venue) {
      info.venue = '開催場所待確認';
    }
    if (!info.access) {
      info.access = '交通アクセス待確認';
    }
    if (!info.organizer) {
      info.organizer = '主催待確認';
    }
    if (!info.price) {
      info.price = '料金待確認';
    }
    if (!info.contact) {
      info.contact = '問合せ先待確認';
    }
  }

  /**
   * 创建失败安全信息
   */
  createFailsafeInfo(url) {
    return {
      name: '情報取得失敗',
      address: '所在地待確認',
      datetime: '開催期間待確認',
      venue: '開催場所待確認',
      access: '交通アクセス待確認',
      organizer: '主催待確認',
      price: '料金待確認',
      contact: '問合せ先待確認',
      website: url,
      googleMap: '',
      region: '埼玉県',
      verified: false,
      source: 'jalan.net'
    };
  }

  /**
   * 记录活动信息
   */
  logActivityInfo(info) {
    console.log('📋 提取的十项信息:');
    console.log(`  📝 名称: ${info.name}`);
    console.log(`  📍 所在地: ${info.address}`);
    console.log(`  📅 開催期間: ${info.datetime}`);
    console.log(`  🏛️ 開催場所: ${info.venue}`);
    console.log(`  🚄 交通アクセス: ${info.access}`);
    console.log(`  🏢 主催: ${info.organizer}`);
    console.log(`  💰 料金: ${info.price}`);
    console.log(`  📞 問合せ先: ${info.contact}`);
    console.log(`  🌐 ホームページ: ${info.website}`);
    console.log(`  🗺️ 谷歌地图: ${info.googleMap ? '已提取' : '未找到'}`);
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
    return 'culture';
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
      console.log('🚀 埼玉县活动数据爬取开始 (V2)');
      console.log('📋 严格模式：只抓取真实数据，严禁编造');
      console.log('🔧 十项信息对应：名称/所在地/開催期間/開催場所/交通アクセス/主催/料金/問合せ先/ホームページ/谷歌地图');
      
      // 1. 初始化浏览器
      await this.initBrowser();
      
      // 2. 获取活动链接
      const activityLinks = await this.getActivityLinks();
      
      if (activityLinks.length === 0) {
        throw new Error('未找到任何活动链接，请检查页面结构是否有变化');
      }
      
      // 3. 逐个提取活动信息
      let successCount = 0;
      for (let i = 0; i < activityLinks.length; i++) {
        console.log(`\n--- 处理活动 ${i + 1}/${activityLinks.length} ---`);
        
        try {
          const activityInfo = await this.extractActivityInfo(activityLinks[i]);
          
          // 4. 保存到数据库
          await this.saveToDatabase(activityInfo);
          successCount++;
          
          // 5. 延迟避免过快请求
          await new Promise(resolve => setTimeout(resolve, 3000));
          
        } catch (error) {
          console.error(`❌ 处理活动失败: ${error.message}`);
          console.log('⚠️ 继续处理下一个活动...');
        }
      }
      
      console.log('\n✅ 埼玉县活动数据爬取完成');
      console.log(`📊 总共处理了 ${activityLinks.length} 个活动，成功 ${successCount} 个`);
      
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
  const crawler = new SaitamaJalanCrawlerV2();
  
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

module.exports = SaitamaJalanCrawlerV2; 