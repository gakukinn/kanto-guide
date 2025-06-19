const playwright = require('playwright');
const cheerio = require('cheerio');
const fs = require('fs').promises;
const path = require('path');

/**
 * Jalan神奈川祭典活动爬虫
 * 目标：爬取指定祭典活动详情，保存为JSON格式
 * 分类：神奈川 > 祭典 > 四层详情
 */
class JalanKanagawaMatsurriCrawler {
  constructor() {
    this.baseUrl = 'https://www.jalan.net';
    this.targetUrl = 'https://www.jalan.net/event/evt_343917/?screenId=OUW1702';
    this.outputDir = path.join(__dirname, '../../data/kanagawa/matsuri');
    this.browser = null;
    this.page = null;
    this.maxRetries = 3;
    this.retryDelay = 5000; // 5秒重试间隔
  }

  /**
   * 初始化浏览器
   */
  async initBrowser() {
    try {
      this.browser = await playwright.chromium.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-web-security',
          '--disable-features=VizDisplayCompositor',
        ],
      });
      this.page = await this.browser.newPage();

      // 设置用户代理和其他头部信息
      await this.page.setExtraHTTPHeaders({
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'ja,en-US;q=0.9,en;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        Connection: 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      });

      // 设置更长的超时时间
      this.page.setDefaultTimeout(90000);

      // 设置视窗大小
      await this.page.setViewportSize({ width: 1920, height: 1080 });

      console.log('✅ 浏览器初始化成功');
    } catch (error) {
      console.error('❌ 浏览器初始化失败:', error.message);
      throw error;
    }
  }

  /**
   * 爬取祭典活动详情 - 带重试机制
   */
  async crawlMatsurriDetails() {
    let lastError;

    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        console.log(
          `🔍 爬取尝试 ${attempt}/${this.maxRetries}: ${this.targetUrl}`
        );

        // 访问页面 - 使用多种等待策略
        await this.page.goto(this.targetUrl, {
          waitUntil: 'domcontentloaded',
          timeout: 90000,
        });

        // 等待页面稳定加载
        console.log('⏳ 等待页面加载完成...');
        await this.page.waitForTimeout(5000);

        // 尝试等待特定元素加载
        try {
          await this.page.waitForSelector('h1, .event-title, .main-title', {
            timeout: 10000,
          });
        } catch (elementError) {
          console.log('⚠️ 特定元素未找到，继续提取...');
        }

        // 获取页面HTML
        const html = await this.page.content();
        const $ = cheerio.load(html);

        // 提取活动信息
        const matsurriInfo = this.extractMatsurriInfo($);

        // 验证数据完整性
        if (!matsurriInfo.name || matsurriInfo.name.length < 3) {
          throw new Error(`数据不完整 - 活动名称: "${matsurriInfo.name}"`);
        }

        console.log('✅ 成功提取祭典信息');
        return matsurriInfo;
      } catch (error) {
        lastError = error;
        console.error(`❌ 爬取尝试 ${attempt} 失败:`, error.message);

        // 保存调试页面（仅在最后一次尝试时）
        if (attempt === this.maxRetries) {
          try {
            const debugHtml = await this.page.content();
            const debugPath = path.join(
              __dirname,
              '../../debug/jalan-matsuri-debug.html'
            );
            await fs.mkdir(path.dirname(debugPath), { recursive: true });
            await fs.writeFile(debugPath, debugHtml, 'utf8');
            console.log(`📝 调试页面已保存: ${debugPath}`);
          } catch (debugError) {
            console.error('调试页面保存失败:', debugError.message);
          }
        }

        // 如果不是最后一次尝试，等待后重试
        if (attempt < this.maxRetries) {
          console.log(`⏰ ${this.retryDelay / 1000} 秒后重试...`);
          await this.page.waitForTimeout(this.retryDelay);

          // 尝试刷新页面
          try {
            await this.page.reload({
              waitUntil: 'domcontentloaded',
              timeout: 30000,
            });
          } catch (reloadError) {
            console.log('页面刷新失败，重新访问...');
          }
        }
      }
    }

    throw lastError;
  }

  /**
   * 从页面中提取祭典信息
   */
  extractMatsurriInfo($) {
    const matsurriInfo = {
      id: 'evt_343917',
      name: '',
      location: '',
      googleMapLink: '',
      period: '',
      venue: '',
      access: '',
      organizer: '',
      contact: '',
      homepage: '',
      category: 'matsuri',
      region: 'kanagawa',
      level: 'detailed', // 四层详情
      crawledAt: new Date().toISOString(),
      sourceUrl: this.targetUrl,
    };

    try {
      // 提取活动名称
      const nameSelectors = [
        '.event-detail-title h1',
        '.event-title h1',
        'h1.title',
        'h1',
        '.main-title',
      ];

      for (const selector of nameSelectors) {
        const nameElement = $(selector).first();
        if (nameElement.length && nameElement.text().trim()) {
          matsurriInfo.name = nameElement.text().trim();
          break;
        }
      }

      // 提取开催期间
      const periodSelectors = [
        '.event-period',
        '.開催期間',
        '[class*="period"]',
        '.date-info',
      ];

      for (const selector of periodSelectors) {
        const element = $(selector).first();
        if (element.length && element.text().trim()) {
          matsurriInfo.period = element.text().trim();
          break;
        }
      }

      // 提取开催场所
      const venueSelectors = [
        '.event-venue',
        '.開催場所',
        '[class*="venue"]',
        '.location-info',
      ];

      for (const selector of venueSelectors) {
        const element = $(selector).first();
        if (element.length && element.text().trim()) {
          matsurriInfo.venue = element.text().trim();
          break;
        }
      }

      // 提取所在地和地图链接
      const mapLink = $('a[href*="maps.google"]').first();
      if (mapLink.length) {
        matsurriInfo.googleMapLink = mapLink.attr('href') || '';
        matsurriInfo.location = mapLink.text().trim() || matsurriInfo.venue;
      } else {
        // 尝试从地址信息中提取
        const addressSelectors = [
          '.address',
          '.location',
          '[class*="address"]',
        ];

        for (const selector of addressSelectors) {
          const element = $(selector).first();
          if (element.length && element.text().trim()) {
            matsurriInfo.location = element.text().trim();
            break;
          }
        }
      }

      // 提取交通方式
      const accessSelectors = [
        '.access-info',
        '.交通アクセス',
        '[class*="access"]',
        '.transportation',
      ];

      for (const selector of accessSelectors) {
        const element = $(selector).first();
        if (element.length && element.text().trim()) {
          matsurriInfo.access = element.text().trim();
          break;
        }
      }

      // 提取主办方
      const organizerSelectors = [
        '.organizer',
        '.主催',
        '[class*="organizer"]',
        '.host-info',
      ];

      for (const selector of organizerSelectors) {
        const element = $(selector).first();
        if (element.length && element.text().trim()) {
          matsurriInfo.organizer = element.text().trim();
          break;
        }
      }

      // 提取联系方式
      const contactSelectors = [
        '.contact',
        '.問合せ先',
        '[class*="contact"]',
        '.inquiry',
      ];

      for (const selector of contactSelectors) {
        const element = $(selector).first();
        if (element.length && element.text().trim()) {
          matsurriInfo.contact = element.text().trim();
          break;
        }
      }

      // 提取官方网站
      const homepageSelectors = [
        'a[href*="http"]:contains("ホームページ")',
        'a[href*="http"]:contains("公式")',
        'a[href*="http"]:contains("website")',
        '.homepage a',
        '.official-site a',
      ];

      for (const selector of homepageSelectors) {
        const element = $(selector).first();
        if (element.length) {
          matsurriInfo.homepage = element.attr('href') || '';
          break;
        }
      }

      // 从表格结构中提取信息（Jalan常用格式）
      $('table tr, .info-table tr, .detail-table tr').each((i, row) => {
        const $row = $(row);
        const label = $row.find('th, .label, .key').text().trim();
        const value = $row.find('td, .value, .content').text().trim();

        if (label && value) {
          if (label.includes('期間') || label.includes('日時')) {
            matsurriInfo.period = matsurriInfo.period || value;
          } else if (label.includes('場所') || label.includes('会場')) {
            matsurriInfo.venue = matsurriInfo.venue || value;
          } else if (label.includes('アクセス') || label.includes('交通')) {
            matsurriInfo.access = matsurriInfo.access || value;
          } else if (label.includes('主催') || label.includes('主催者')) {
            matsurriInfo.organizer = matsurriInfo.organizer || value;
          } else if (label.includes('問合せ') || label.includes('連絡先')) {
            matsurriInfo.contact = matsurriInfo.contact || value;
          }
        }
      });

      console.log('📊 提取的祭典信息:');
      console.log(`名称: ${matsurriInfo.name}`);
      console.log(`期间: ${matsurriInfo.period}`);
      console.log(`场所: ${matsurriInfo.venue}`);
      console.log(`所在地: ${matsurriInfo.location}`);

      return matsurriInfo;
    } catch (error) {
      console.error('❌ 信息提取失败:', error.message);
      throw error;
    }
  }

  /**
   * 保存数据到JSON文件
   */
  async saveToDatabase(matsurriInfo) {
    try {
      // 确保输出目录存在
      await fs.mkdir(this.outputDir, { recursive: true });

      // 生成文件名
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `${matsurriInfo.id}-${timestamp}.json`;
      const filepath = path.join(this.outputDir, filename);

      // 保存数据
      await fs.writeFile(
        filepath,
        JSON.stringify(matsurriInfo, null, 2),
        'utf8'
      );

      console.log(`✅ 数据已保存: ${filepath}`);

      // 同时保存到最新文件
      const latestPath = path.join(
        this.outputDir,
        `${matsurriInfo.id}-latest.json`
      );
      await fs.writeFile(
        latestPath,
        JSON.stringify(matsurriInfo, null, 2),
        'utf8'
      );

      console.log(`📋 最新数据: ${latestPath}`);

      return filepath;
    } catch (error) {
      console.error('❌ 数据保存失败:', error.message);
      throw error;
    }
  }

  /**
   * 清理资源
   */
  async cleanup() {
    try {
      if (this.page) {
        await this.page.close();
      }
      if (this.browser) {
        await this.browser.close();
      }
      console.log('✅ 资源清理完成');
    } catch (error) {
      console.error('❌ 资源清理失败:', error.message);
    }
  }

  /**
   * 执行完整的爬取流程
   */
  async run() {
    try {
      console.log('🚀 开始执行Jalan神奈川祭典爬虫');

      await this.initBrowser();
      const matsurriInfo = await this.crawlMatsurriDetails();
      const savedPath = await this.saveToDatabase(matsurriInfo);

      console.log('🎉 爬取任务完成！');
      console.log(`📁 数据文件: ${savedPath}`);

      return matsurriInfo;
    } catch (error) {
      console.error('❌ 爬取任务失败:', error.message);
      throw error;
    } finally {
      await this.cleanup();
    }
  }
}

// 直接执行脚本
if (require.main === module) {
  const crawler = new JalanKanagawaMatsurriCrawler();

  crawler
    .run()
    .then(result => {
      console.log('✅ 爬虫执行成功');
      process.exit(0);
    })
    .catch(error => {
      console.error('❌ 爬虫执行失败:', error.message);
      process.exit(1);
    });
}

module.exports = JalanKanagawaMatsurriCrawler;
