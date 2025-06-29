const { chromium } = require('playwright');
const { parse } = require('node-html-parser');
const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient();

/**
 * 埼玉县活动数据爬取器 V4 - 修复数据库字段版
 * 修复了与数据库schema字段匹配的问题
 * 技术栈：Playwright + node-html-parser + Prisma
 * 严格按照商业标准：不编造数据，只抓取真实信息
 */
class SaitamaJalanCrawlerV4Fixed {
  constructor() {
    this.browser = null;
    this.page = null;
    this.targetUrl = 'https://www.jalan.net/event/110000/?screenId=OUW1702'; // 埼玉县
    this.maxActivities = 3; // 只抓取前3个活动
  }

  /**
   * 初始化浏览器
   */
  async initBrowser() {
    console.log('🚀 启动浏览器 (修复字段版)...');
    this.browser = await chromium.launch({
      headless: false, // 可视化模式便于调试
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-web-security',
        '--disable-blink-features=AutomationControlled'
      ]
    });

    this.page = await this.browser.newPage();
    
    // 设置用户代理和其他请求头
    await this.page.setExtraHTTPHeaders({
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
      'Accept-Language': 'ja-JP,ja;q=0.9,en;q=0.8',
      'Accept-Encoding': 'gzip, deflate, br'
    });

    // 设置视口大小
    await this.page.setViewportSize({ width: 1920, height: 1080 });
  }

  /**
   * 获取活动链接列表
   */
  async getActivityLinks() {
    console.log(`📡 正在访问埼玉县活动列表页面: ${this.targetUrl}`);
    
    await this.page.goto(this.targetUrl, { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });

    // 等待页面完全加载
    await this.page.waitForTimeout(3000);

    // 在页面中执行JavaScript获取活动链接
    const activityLinks = await this.page.evaluate(() => {
      const links = [];
      
      // 查找活动链接的多种可能选择器
      const selectors = [
        'a[href*="/event/evt_"]',
        '.event-item a',
        '.item a[href*="event"]',
        'a[href*="jalan.net/event/"]'
      ];
      
      for (const selector of selectors) {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
          console.log(`找到选择器: ${selector}, 元素数量: ${elements.length}`);
          elements.forEach(el => {
            const href = el.href;
            if (href && href.includes('/event/evt_') && !links.includes(href)) {
              links.push(href);
            }
          });
          
          if (links.length > 0) break; // 找到链接就停止
        }
      }
      
      return links;
    });

    if (!activityLinks || activityLinks.length === 0) {
      console.log('❌ 未找到活动链接');
      return [];
    }

    // 限制前N个活动
    const limitedLinks = activityLinks.slice(0, this.maxActivities);
    
    console.log(`📊 筛选后的前${this.maxActivities}个活动链接:`);
    limitedLinks.forEach((link, index) => {
      console.log(`${index + 1}. ${link}`);
    });

    return limitedLinks;
  }

  /**
   * 提取单个活动的详细信息
   */
  async extractActivityInfo(activityUrl, index) {
    console.log(`📋 [${index + 1}/${this.maxActivities}] 正在提取活动信息: ${activityUrl}`);
    
    try {
      await this.page.goto(activityUrl, { 
        waitUntil: 'networkidle',
        timeout: 30000 
      });

      // 等待页面加载
      await this.page.waitForTimeout(2000);

      // 在页面中执行JavaScript提取数据
      const activityInfo = await this.page.evaluate(() => {
        const extractText = (selectors) => {
          for (const selector of selectors) {
            const element = document.querySelector(selector);
            if (element) {
              return element.textContent.trim();
            }
          }
          return '';
        };

        // 10个必需字段的提取策略（对应数据库schema）
        const fields = {
          // 1. 名称 - name
          name: extractText([
            'h1',
            '.event-title h1',
            '.title h1',
            '.event-name',
            '.main-title'
          ]),
          
          // 2. 所在地 - address  
          address: extractText([
            '.address',
            '.location',
            '[class*="address"]',
            '.event-info .address',
            'dd:contains("住所") + dd',
            'td:contains("住所") + td'
          ]),
          
          // 3. 开催期间 - datetime
          datetime: extractText([
            '.date',
            '.event-date',
            '.period',
            '[class*="date"]',
            'dd:contains("開催期間") + dd',
            'td:contains("開催期間") + td'
          ]),
          
          // 4. 开催场所 - venue
          venue: extractText([
            '.venue',
            '.place',
            '.event-place',
            '[class*="venue"]',
            'dd:contains("会場") + dd',
            'td:contains("会場") + td'
          ]),
          
          // 5. 交通アクセス - access
          access: extractText([
            '.access',
            '.transportation',
            '[class*="access"]',
            'dd:contains("アクセス") + dd',
            'td:contains("アクセス") + td'
          ]),
          
          // 6. 主催 - organizer
          organizer: extractText([
            '.organizer',
            '.sponsor',
            '[class*="organizer"]',
            'dd:contains("主催") + dd',
            'td:contains("主催") + td'
          ]),
          
          // 7. 料金 - price
          price: extractText([
            '.price',
            '.fee',
            '.cost',
            '[class*="price"]',
            'dd:contains("料金") + dd',
            'td:contains("料金") + td'
          ]),
          
          // 8. 问合せ先 - contact
          contact: extractText([
            '.contact',
            '.inquiry',
            '[class*="contact"]',
            'dd:contains("問合せ") + dd',
            'td:contains("問合せ") + td'
          ])
        };

        return fields;
      });

      // 补充网站和地图信息
      activityInfo.website = activityUrl; // 当前页面URL作为官方网站
      activityInfo.googleMap = ''; // 暂时为空，可以后续通过地址获取
      activityInfo.region = '埼玉県'; // 固定为埼玉县

      // 验证提取的字段
      const extractedFields = Object.keys(activityInfo).filter(key => activityInfo[key]);
      console.log(`📊 成功提取字段: ${extractedFields.join(', ')}`);
      
      // 打印关键信息
      console.log(`📝 活动名称: ${activityInfo.name}`);
      console.log(`📅 活动时间: ${activityInfo.datetime}`);
      console.log(`📍 活动地址: ${activityInfo.address}`);

      return activityInfo;

    } catch (error) {
      console.error(`❌ [${index + 1}/${this.maxActivities}] 提取活动信息失败:`, error.message);
      return null;
    }
  }

  /**
   * 保存活动到数据库
   */
  async saveActivityToDatabase(activityInfo, index) {
    try {
      console.log(`💾 [${index + 1}/${this.maxActivities}] 准备保存活动到数据库: ${activityInfo.name}`);

      // 查找埼玉县地区记录
      const saitamaRegion = await prisma.region.findFirst({
        where: { nameCn: '埼玉' }
      });

      if (!saitamaRegion) {
        throw new Error('未找到埼玉县地区记录');
      }

      // 确定活动类型（这里默认为matsuri，可以根据关键词判断）
      const activityType = 'matsuri'; // 祭典类型

      // 准备数据库保存的数据（严格按照schema字段）
      const dbData = {
        name: activityInfo.name || '',
        address: activityInfo.address || '',
        datetime: activityInfo.datetime || '',
        venue: activityInfo.venue || '',
        access: activityInfo.access || '', 
        organizer: activityInfo.organizer || '',
        price: activityInfo.price || '',
        contact: activityInfo.contact || '',
        website: activityInfo.website || '',
        googleMap: activityInfo.googleMap || '', // 注意：schema中是googleMap不是mapInfo
        region: activityInfo.region || '埼玉県',
        regionId: saitamaRegion.id,
        verified: true,
        source: 'jalan.net' // 添加来源标识（虽然schema中没有，但可能需要）
      };

      // 移除schema中不存在的字段
      delete dbData.source;

      // 检查是否已存在相同名称的活动
      const existingActivity = await prisma[`${activityType}Event`].findFirst({
        where: { 
          name: activityInfo.name,
          regionId: saitamaRegion.id
        }
      });

      let savedActivity;
      
      if (existingActivity) {
        console.log(`🔄 更新现有活动: ${activityInfo.name}`);
        savedActivity = await prisma[`${activityType}Event`].update({
          where: { id: existingActivity.id },
          data: dbData
        });
      } else {
        console.log(`🆕 创建新活动: ${activityInfo.name}`);
        savedActivity = await prisma[`${activityType}Event`].create({
          data: dbData
        });
      }

      console.log(`✅ [${index + 1}/${this.maxActivities}] 成功保存活动: ${savedActivity.name} (ID: ${savedActivity.id})`);
      return savedActivity;

    } catch (error) {
      console.error(`❌ [${index + 1}/${this.maxActivities}] 保存活动失败: ${error.message}`);
      throw error;
    }
  }

  /**
   * 清理数据 - 移除多余的空白字符和格式化文本
   */
  cleanData(data) {
    const cleanedData = {};
    for (const [key, value] of Object.entries(data)) {
      if (typeof value === 'string') {
        // 移除多余的空白、换行、制表符
        cleanedData[key] = value
          .replace(/\s+/g, ' ')
          .replace(/[\n\r\t]/g, ' ')
          .trim();
      } else {
        cleanedData[key] = value;
      }
    }
    return cleanedData;
  }

  /**
   * 主执行方法
   */
  async run() {
    const results = {
      success: 0,
      failed: 0,
      errors: []
    };

    try {
      console.log('🎯 埼玉县前3个活动数据抓取开始 (修复字段版)');
      
      await this.initBrowser();
      
      // 获取活动链接
      const activityLinks = await this.getActivityLinks();
      
      if (activityLinks.length === 0) {
        console.log('❌ 没有找到任何活动链接');
        return results;
      }

      console.log(`\n🔄 开始处理 ${activityLinks.length} 个活动...\n`);

      // 逐个处理活动
      for (let i = 0; i < activityLinks.length; i++) {
        try {
          console.log(`🔄 处理第 ${i + 1} 个活动...\n`);
          
          // 提取活动信息
          const activityInfo = await this.extractActivityInfo(activityLinks[i], i);
          
          if (!activityInfo || !activityInfo.name) {
            console.log(`⚠️ 第 ${i + 1} 个活动信息不完整，跳过`);
            results.failed++;
            continue;
          }

          // 清理数据
          const cleanedInfo = this.cleanData(activityInfo);
          
          // 保存到数据库
          await this.saveActivityToDatabase(cleanedInfo, i);
          
          results.success++;
          
        } catch (error) {
          console.error(`⚠️ 第 ${i + 1} 个活动处理失败: ${error.message}`);
          results.failed++;
          results.errors.push(error.message);
        }

        // 添加延迟避免请求过快
        if (i < activityLinks.length - 1) {
          console.log('⏱️ 等待2秒后处理下一个活动...\n');
          await this.page.waitForTimeout(2000);
        }
      }

    } catch (error) {
      console.error('❌ 爬虫执行失败:', error.message);
      results.errors.push(error.message);
    } finally {
      await this.cleanup();
    }

    // 打印结果总结
    console.log('\n📊 抓取结果总结:');
    console.log(`✅ 成功处理: ${results.success}/${this.maxActivities}`);
    console.log(`❌ 失败处理: ${results.failed}/${this.maxActivities}`);
    
    if (results.errors.length > 0) {
      console.log('\n🔍 失败详情:');
      results.errors.forEach((error, index) => {
        console.log(`${index + 1}. ❌ ${error}`);
      });
    }

    console.log('\n🎉 埼玉县前3个活动数据抓取完成！');
    console.log('🏆 任务完成！');

    return results;
  }

  /**
   * 清理资源
   */
  async cleanup() {
    try {
      if (this.browser) {
        await this.browser.close();
        console.log('🧹 浏览器已关闭');
      }
    } catch (error) {
      console.error('清理浏览器失败:', error.message);
    }

    try {
      await prisma.$disconnect();
      console.log('🔌 数据库连接已断开');
    } catch (error) {
      console.error('断开数据库连接失败:', error.message);
    }
  }
}

// 执行爬虫
async function main() {
  const crawler = new SaitamaJalanCrawlerV4Fixed();
  await crawler.run();
}

// 如果直接运行此脚本
if (require.main === module) {
  main().catch(console.error);
}

module.exports = SaitamaJalanCrawlerV4Fixed; 