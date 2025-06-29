const { chromium } = require('playwright');
const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient();

/**
 * 埼玉县活动数据爬取器 V5 - 健壮版
 * 增加了超时时间和重试机制
 * 技术栈：Playwright + Prisma
 * 严格按照商业标准：不编造数据，只抓取真实信息
 */
class SaitamaJalanCrawlerV5Robust {
  constructor() {
    this.browser = null;
    this.page = null;
    this.targetUrl = 'https://www.jalan.net/event/110000/?screenId=OUW1702'; // 埼玉县
    this.maxActivities = 3; // 只抓取前3个活动
    this.maxRetries = 3; // 最大重试次数
    this.timeout = 60000; // 增加到60秒超时
  }

  /**
   * 初始化浏览器
   */
  async initBrowser() {
    console.log('🚀 启动浏览器 (健壮版)...');
    this.browser = await chromium.launch({
      headless: false, // 可视化模式便于调试
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-web-security',
        '--disable-blink-features=AutomationControlled',
        '--disable-dev-shm-usage', // 添加内存优化
        '--no-first-run' // 跳过首次运行设置
      ]
    });

    this.page = await this.browser.newPage();
    
    // 设置用户代理和其他请求头
    await this.page.setExtraHTTPHeaders({
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
      'Accept-Language': 'ja-JP,ja;q=0.9,en;q=0.8',
      'Accept-Encoding': 'gzip, deflate, br',
      'Referer': 'https://www.jalan.net/'
    });

    // 设置视口大小
    await this.page.setViewportSize({ width: 1920, height: 1080 });
    
    // 设置默认超时
    this.page.setDefaultTimeout(this.timeout);
  }

  /**
   * 带重试的页面访问
   */
  async gotoWithRetry(url, retries = this.maxRetries) {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        console.log(`📡 尝试访问 (${attempt}/${retries}): ${url}`);
        
        await this.page.goto(url, { 
          waitUntil: 'domcontentloaded', // 改为更宽松的等待条件
          timeout: this.timeout 
        });
        
        // 额外等待页面稳定
        await this.page.waitForTimeout(3000);
        
        console.log('✅ 页面访问成功');
        return true;
        
      } catch (error) {
        console.log(`❌ 第 ${attempt} 次访问失败: ${error.message}`);
        
        if (attempt < retries) {
          console.log(`⏱️ 等待 ${attempt * 2} 秒后重试...`);
          await this.page.waitForTimeout(attempt * 2000);
        }
      }
    }
    
    throw new Error(`经过 ${retries} 次重试后仍无法访问页面`);
  }

  /**
   * 获取活动链接列表
   */
  async getActivityLinks() {
    await this.gotoWithRetry(this.targetUrl);

    // 在页面中执行JavaScript获取活动链接
    const activityLinks = await this.page.evaluate(() => {
      const links = [];
      
      // 查找活动链接的多种可能选择器
      const selectors = [
        'a[href*="/event/evt_"]',
        'a[href*="jalan.net/event/evt_"]',
        '.event-item a',
        '.item a[href*="event"]',
        'a[title*="祭"]',
        'a[title*="まつり"]'
      ];
      
      console.log('开始查找活动链接...');
      
      for (const selector of selectors) {
        console.log(`尝试选择器: ${selector}`);
        const elements = document.querySelectorAll(selector);
        console.log(`找到 ${elements.length} 个元素`);
        
        if (elements.length > 0) {
          elements.forEach((el, index) => {
            const href = el.href;
            if (href && href.includes('/event/evt_') && !links.includes(href)) {
              console.log(`${index + 1}. 找到链接: ${href}`);
              links.push(href);
            }
          });
          
          if (links.length > 0) {
            console.log(`选择器 ${selector} 找到 ${links.length} 个有效链接`);
            break; // 找到链接就停止
          }
        }
      }
      
      return links;
    });

    if (!activityLinks || activityLinks.length === 0) {
      console.log('❌ 未找到活动链接，尝试手动查找...');
      
      // 手动查找的备用方案
      const pageContent = await this.page.content();
      console.log(`页面内容长度: ${pageContent.length} 字符`);
      
      // 检查页面是否包含预期内容
      if (pageContent.includes('埼玉') || pageContent.includes('event')) {
        console.log('✅ 页面包含预期内容');
      } else {
        console.log('⚠️ 页面可能未正确加载');
      }
      
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
      await this.gotoWithRetry(activityUrl);

      // 在页面中执行JavaScript提取数据
      const activityInfo = await this.page.evaluate(() => {
        const extractText = (selectors) => {
          for (const selector of selectors) {
            try {
              const element = document.querySelector(selector);
              if (element && element.textContent.trim()) {
                return element.textContent.trim();
              }
            } catch (e) {
              console.log(`选择器错误: ${selector}`);
            }
          }
          return '';
        };

        // 提取所有可能的表格数据
        const extractFromTable = () => {
          const tableData = {};
          const tables = document.querySelectorAll('table, .table, .info-table, .event-info');
          
          tables.forEach(table => {
            const rows = table.querySelectorAll('tr, .row, .info-row');
            rows.forEach(row => {
              const cells = row.querySelectorAll('td, th, .cell, .info-cell, dt, dd');
              if (cells.length >= 2) {
                const key = cells[0].textContent.trim();
                const value = cells[1].textContent.trim();
                
                if (key.includes('住所') || key.includes('所在地')) tableData.address = value;
                if (key.includes('開催期間') || key.includes('期間') || key.includes('日程')) tableData.datetime = value;
                if (key.includes('会場') || key.includes('場所')) tableData.venue = value;
                if (key.includes('アクセス') || key.includes('交通')) tableData.access = value;
                if (key.includes('主催') || key.includes('主催者')) tableData.organizer = value;
                if (key.includes('料金') || key.includes('費用')) tableData.price = value;
                if (key.includes('問合せ') || key.includes('連絡先') || key.includes('お問い合わせ')) tableData.contact = value;
              }
            });
          });
          
          return tableData;
        };

        // 10个必需字段的提取策略
        const tableData = extractFromTable();
        
        const fields = {
          // 1. 活动名称
          name: extractText([
            'h1',
            '.event-title h1',
            '.title h1',
            '.event-name',
            '.main-title',
            '[class*="title"] h1',
            '.page-title'
          ]),
          
          // 2. 所在地
          address: tableData.address || extractText([
            '.address',
            '.location',
            '[class*="address"]',
            '.event-info .address'
          ]),
          
          // 3. 开催期间
          datetime: tableData.datetime || extractText([
            '.date',
            '.event-date',
            '.period',
            '[class*="date"]',
            '.event-period'
          ]),
          
          // 4. 开催场所
          venue: tableData.venue || extractText([
            '.venue',
            '.place',
            '.event-place',
            '[class*="venue"]'
          ]),
          
          // 5. 交通アクセス
          access: tableData.access || extractText([
            '.access',
            '.transportation',
            '[class*="access"]'
          ]),
          
          // 6. 主催
          organizer: tableData.organizer || extractText([
            '.organizer',
            '.sponsor',
            '[class*="organizer"]'
          ]),
          
          // 7. 料金
          price: tableData.price || extractText([
            '.price',
            '.fee',
            '.cost',
            '[class*="price"]'
          ]),
          
          // 8. 问合せ先
          contact: tableData.contact || extractText([
            '.contact',
            '.inquiry',
            '[class*="contact"]'
          ])
        };

        return fields;
      });

      // 补充网站和地图信息
      activityInfo.website = activityUrl;
      activityInfo.googleMap = ''; // 暂时为空
      activityInfo.region = '埼玉県';

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

      // 确定活动类型（默认为matsuri）
      const activityType = 'matsuri';

      // 准备数据库保存的数据
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
        googleMap: activityInfo.googleMap || '',
        region: activityInfo.region || '埼玉県',
        regionId: saitamaRegion.id,
        verified: true
      };

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
   * 清理数据
   */
  cleanData(data) {
    const cleanedData = {};
    for (const [key, value] of Object.entries(data)) {
      if (typeof value === 'string') {
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
      console.log('🎯 埼玉县活动数据抓取开始 (健壮版)');
      
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

        // 添加延迟
        if (i < activityLinks.length - 1) {
          console.log('⏱️ 等待3秒后处理下一个活动...\n');
          await this.page.waitForTimeout(3000);
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

    console.log('\n🎉 埼玉县活动数据抓取完成！');
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
  const crawler = new SaitamaJalanCrawlerV5Robust();
  await crawler.run();
}

// 如果直接运行此脚本
if (require.main === module) {
  main().catch(console.error);
}

module.exports = SaitamaJalanCrawlerV5Robust; 