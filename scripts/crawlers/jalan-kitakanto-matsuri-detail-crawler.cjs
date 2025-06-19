const { chromium } = require('playwright');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

/**
 * Jalan.net 北关东祭典详情页爬虫
 * 目标：爬取特定祭典活动的详细信息
 * 数据层级：四层详情
 * 存储格式：JSON（按照自动化配置规则）
 * 技术栈：Playwright + Cheerio
 */
class JalanKitakantoMatsuriDetailCrawler {
  constructor() {
    this.targetUrl = 'https://www.jalan.net/event/evt_343509/?screenId=OUW1702';
    this.browser = null;
    this.page = null;

    // 按照自动化配置，祭典数据使用JSON格式
    this.outputPath = path.join(
      __dirname,
      '../../data/kitakanto/matsuri/evt_343509-detail.json'
    );

    // 备份路径
    this.backupPath = path.join(
      __dirname,
      '../../data/temp/kitakanto-matsuri-crawl-backup.json'
    );

    // 调试HTML保存路径
    this.debugPath = path.join(
      __dirname,
      '../../debug/kitakanto-matsuri-evt_343509.html'
    );
  }

  async initialize() {
    console.log('🚀 初始化浏览器（Playwright）...');
    try {
      this.browser = await chromium.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-blink-features=AutomationControlled',
          '--disable-web-security',
          '--disable-dev-shm-usage',
        ],
      });

      // 创建浏览器上下文
      const context = await this.browser.newContext({
        userAgent:
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        viewport: { width: 1920, height: 1080 },
        extraHTTPHeaders: {
          'Accept-Language': 'ja-JP,ja;q=0.9,en;q=0.8',
          Accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          Connection: 'keep-alive',
        },
      });

      this.page = await context.newPage();

      // 设置超时时间
      this.page.setDefaultTimeout(60000);

      console.log('✅ 浏览器初始化成功');
    } catch (error) {
      console.error('❌ 浏览器初始化失败:', error.message);
      throw error;
    }
  }

  async crawlMatsuriDetails() {
    console.log('🔍 开始爬取北关东祭典详情...');
    console.log(`📍 目标URL: ${this.targetUrl}`);

    try {
      // 访问页面
      console.log('📡 正在访问页面...');
      await this.page.goto(this.targetUrl, {
        waitUntil: 'domcontentloaded',
        timeout: 60000,
      });

      // 等待页面加载完成
      console.log('⏳ 等待页面加载完成...');
      await this.page.waitForTimeout(5000);

      // 尝试等待关键元素
      try {
        await this.page.waitForSelector('h1, .event-title, .main-title', {
          timeout: 10000,
        });
      } catch (elementError) {
        console.log('⚠️ 关键元素等待超时，继续提取...');
      }

      // 获取页面HTML内容
      console.log('📄 获取页面HTML内容...');
      const htmlContent = await this.page.content();

      // 保存调试HTML
      this.saveDebugHTML(htmlContent);

      // 使用Cheerio解析HTML
      console.log('🔍 使用Cheerio解析页面内容...');
      const $ = cheerio.load(htmlContent);

      // 提取祭典信息
      const matsuriData = this.extractMatsuriInfo($);

      // 验证数据完整性
      if (!matsuriData.name || matsuriData.name.length < 3) {
        throw new Error(`数据不完整 - 活动名称: "${matsuriData.name}"`);
      }

      console.log('✅ 数据提取完成');
      return matsuriData;
    } catch (error) {
      console.error('❌ 爬取失败:', error.message);
      throw error;
    }
  }

  extractMatsuriInfo($) {
    console.log('📊 开始提取祭典详细信息...');

    const matsuriData = {
      id: 'evt_343509',
      name: '',
      location: '',
      googleMapLink: '',
      period: '', // 開催期間
      venue: '', // 開催場所
      access: '', // 交通アクセス
      organizer: '', // 主催
      contact: '', // 問合せ先
      homepage: '', // ホームページ

      // 元数据
      category: 'matsuri',
      region: 'kitakanto', // 北关东
      level: 'detailed', // 四层详情
      crawledAt: new Date().toISOString(),
      sourceUrl: this.targetUrl,

      // 额外信息
      description: '',
      images: [],
      rawData: {},
    };

    try {
      // 1. 提取活动名称
      console.log('📝 提取活动名称...');
      const titleSelectors = [
        'h1',
        '.event-title h1',
        '.event-detail-title h1',
        '.main-title',
        '.title',
        'h2',
      ];

      for (const selector of titleSelectors) {
        const element = $(selector).first();
        if (element.length && element.text().trim()) {
          matsuriData.name = element.text().trim();
          console.log(`✅ 名称: ${matsuriData.name}`);
          break;
        }
      }

      if (!matsuriData.name) {
        const pageTitle = $('title').text().trim();
        matsuriData.name = pageTitle
          .replace(/【.*?】|アクセス・イベント情報.*?$/g, '')
          .trim();
        console.log(`✅ 从页面标题提取名称: ${matsuriData.name}`);
      }

      // 2. 从表格结构中提取详细信息
      console.log('📊 从表格中提取详细信息...');
      const detailsTable = {};

      // 查找表格行
      $('table tr, .info-table tr, .detail-table tr, .event-info tr').each(
        (i, row) => {
          const $row = $(row);
          const labelElement = $row.find('th, .label, .key, td:first-child');
          const valueElement = $row.find(
            'td:not(:first-child), .value, .content'
          );

          if (labelElement.length && valueElement.length) {
            const label = labelElement.text().trim();
            const value = valueElement.text().trim();

            if (label && value && value !== label) {
              detailsTable[label] = value;
              console.log(`📋 表格信息: ${label} → ${value}`);
            }
          }
        }
      );

      // 3. 从定义列表中提取信息
      console.log('📋 从定义列表中提取信息...');
      $('dl dt, dl dd').each((i, element) => {
        const $el = $(element);
        if ($el.is('dt')) {
          const label = $el.text().trim();
          const valueElement = $el.next('dd');
          if (valueElement.length) {
            const value = valueElement.text().trim();
            if (label && value) {
              detailsTable[label] = value;
              console.log(`📋 定义列表: ${label} → ${value}`);
            }
          }
        }
      });

      // 4. 字段映射和赋值
      console.log('🔄 映射字段信息...');
      for (const [key, value] of Object.entries(detailsTable)) {
        const lowerKey = key.toLowerCase();

        if (
          lowerKey.includes('期間') ||
          lowerKey.includes('日時') ||
          lowerKey.includes('開催日')
        ) {
          matsuriData.period = matsuriData.period || value;
          console.log(`📅 開催期間: ${value}`);
        } else if (
          lowerKey.includes('場所') ||
          lowerKey.includes('会場') ||
          lowerKey.includes('開催場所')
        ) {
          matsuriData.venue = matsuriData.venue || value;
          console.log(`🏢 開催場所: ${value}`);
        } else if (lowerKey.includes('アクセス') || lowerKey.includes('交通')) {
          matsuriData.access = matsuriData.access || value;
          console.log(`🚗 交通アクセス: ${value}`);
        } else if (lowerKey.includes('主催') || lowerKey.includes('主催者')) {
          matsuriData.organizer = matsuriData.organizer || value;
          console.log(`🏛️ 主催: ${value}`);
        } else if (
          lowerKey.includes('問合せ') ||
          lowerKey.includes('連絡先') ||
          lowerKey.includes('お問い合わせ')
        ) {
          matsuriData.contact = matsuriData.contact || value;
          console.log(`📞 問合せ先: ${value}`);
        } else if (lowerKey.includes('住所') || lowerKey.includes('所在地')) {
          matsuriData.location = matsuriData.location || value;
          console.log(`📍 所在地: ${value}`);
        }
      }

      // 5. 查找谷歌地图链接
      console.log('🗺️ 查找谷歌地图链接...');
      const mapSelectors = [
        'a[href*="maps.google"]',
        'a[href*="google.com/maps"]',
        'a[href*="goo.gl/maps"]',
        '.map-link a',
        '.access-map a',
      ];

      for (const selector of mapSelectors) {
        const mapLink = $(selector).first();
        if (mapLink.length) {
          matsuriData.googleMapLink = mapLink.attr('href') || '';
          console.log(`✅ 谷歌地图链接: ${matsuriData.googleMapLink}`);
          break;
        }
      }

      // 6. 查找官方网站
      console.log('🌐 查找官方网站...');
      const homepageSelectors = [
        'a[href*="http"]:contains("ホームページ")',
        'a[href*="http"]:contains("公式")',
        'a[href*="http"]:contains("オフィシャル")',
        'a[href*="http"]:contains("website")',
        '.homepage a',
        '.official-site a',
      ];

      for (const selector of homepageSelectors) {
        const siteLink = $(selector).first();
        if (siteLink.length) {
          const href = siteLink.attr('href');
          if (href && href.startsWith('http')) {
            matsuriData.homepage = href;
            console.log(`✅ 官方网站: ${matsuriData.homepage}`);
            break;
          }
        }
      }

      // 7. 提取描述信息
      console.log('📝 提取描述信息...');
      const descSelectors = [
        '.event-description',
        '.description',
        '.detail-content',
        '.content p',
        '.event-detail p',
        'meta[name="description"]',
      ];

      for (const selector of descSelectors) {
        if (selector.includes('meta')) {
          const metaDesc = $(selector).attr('content');
          if (metaDesc) {
            matsuriData.description = metaDesc.trim();
            break;
          }
        } else {
          const element = $(selector).first();
          if (element.length && element.text().trim()) {
            matsuriData.description = element.text().trim();
            break;
          }
        }
      }

      // 8. 提取图片
      console.log('🖼️ 提取图片信息...');
      $('img').each((index, img) => {
        const src = $(img).attr('src') || $(img).attr('data-src');
        if (
          src &&
          (src.includes('event') ||
            src.includes('matsuri') ||
            src.includes('.jpg') ||
            src.includes('.png'))
        ) {
          let fullSrc = src;
          if (!src.startsWith('http')) {
            if (src.startsWith('//')) {
              fullSrc = 'https:' + src;
            } else if (src.startsWith('/')) {
              fullSrc = 'https://www.jalan.net' + src;
            }
          }
          matsuriData.images.push(fullSrc);
        }
      });

      matsuriData.images = [...new Set(matsuriData.images)]; // 去重

      // 保存原始数据用于调试
      matsuriData.rawData = {
        detailsTable,
        pageTitle: $('title').text().trim(),
        extractedFields: Object.keys(detailsTable).length,
      };

      console.log('✅ 信息提取完成');
      console.log(`📊 提取结果概览:`);
      console.log(`   名称: ${matsuriData.name}`);
      console.log(`   開催期間: ${matsuriData.period}`);
      console.log(`   開催場所: ${matsuriData.venue}`);
      console.log(`   所在地: ${matsuriData.location}`);
      console.log(`   交通アクセス: ${matsuriData.access}`);
      console.log(`   主催: ${matsuriData.organizer}`);
      console.log(`   問合せ先: ${matsuriData.contact}`);
      console.log(`   ホームページ: ${matsuriData.homepage}`);
      console.log(`   谷歌地图: ${matsuriData.googleMapLink}`);

      return matsuriData;
    } catch (error) {
      console.error('❌ 信息提取失败:', error.message);
      throw error;
    }
  }

  saveDebugHTML(htmlContent) {
    try {
      // 确保目录存在
      const debugDir = path.dirname(this.debugPath);
      if (!fs.existsSync(debugDir)) {
        fs.mkdirSync(debugDir, { recursive: true });
      }

      fs.writeFileSync(this.debugPath, htmlContent, 'utf8');
      console.log(`📄 调试HTML已保存: ${this.debugPath}`);
    } catch (error) {
      console.error('⚠️ 保存调试HTML失败:', error.message);
    }
  }

  async saveData(matsuriData) {
    console.log('💾 保存数据到文件...');

    try {
      // 确保输出目录存在
      const outputDir = path.dirname(this.outputPath);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
        console.log(`📁 创建目录: ${outputDir}`);
      }

      // 保存主数据（JSON格式，按照自动化配置）
      const jsonData = JSON.stringify(matsuriData, null, 2);
      fs.writeFileSync(this.outputPath, jsonData, 'utf8');
      console.log(`✅ 数据已保存到: ${this.outputPath}`);

      // 保存备份
      const backupDir = path.dirname(this.backupPath);
      if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir, { recursive: true });
      }

      const backupData = {
        ...matsuriData,
        backupTime: new Date().toISOString(),
        originalFile: this.outputPath,
      };

      fs.writeFileSync(
        this.backupPath,
        JSON.stringify(backupData, null, 2),
        'utf8'
      );
      console.log(`✅ 备份已保存到: ${this.backupPath}`);

      // 生成简要报告
      this.generateReport(matsuriData);
    } catch (error) {
      console.error('❌ 保存数据失败:', error.message);
      throw error;
    }
  }

  generateReport(matsuriData) {
    const report = {
      爬取时间: new Date().toLocaleString('zh-CN'),
      数据源: this.targetUrl,
      数据格式: 'JSON（按自动化配置规则）',
      分类: '北关东 > 祭典 > 四层详情',
      提取字段: {
        基本信息: {
          名称: matsuriData.name ? '✅' : '❌',
          開催期間: matsuriData.period ? '✅' : '❌',
          開催場所: matsuriData.venue ? '✅' : '❌',
        },
        联系信息: {
          所在地: matsuriData.location ? '✅' : '❌',
          交通アクセス: matsuriData.access ? '✅' : '❌',
          主催: matsuriData.organizer ? '✅' : '❌',
          問合せ先: matsuriData.contact ? '✅' : '❌',
          ホームページ: matsuriData.homepage ? '✅' : '❌',
        },
        技术信息: {
          谷歌地图链接: matsuriData.googleMapLink ? '✅' : '❌',
          图片数量: matsuriData.images.length,
          描述信息: matsuriData.description ? '✅' : '❌',
        },
      },
      保存路径: this.outputPath,
      备份路径: this.backupPath,
      调试文件: this.debugPath,
    };

    console.log('\n📋 爬取报告:');
    console.log(JSON.stringify(report, null, 2));
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
      console.log('🧹 浏览器已关闭');
    }
  }

  async run() {
    try {
      console.log('🚀 开始执行北关东祭典数据爬取任务...');
      console.log('📋 按照自动化配置规则：祭典数据→JSON格式');

      await this.initialize();
      const matsuriData = await this.crawlMatsuriDetails();
      await this.saveData(matsuriData);

      console.log('✅ 任务完成！');
      return matsuriData;
    } catch (error) {
      console.error('❌ 任务失败:', error.message);
      throw error;
    } finally {
      await this.cleanup();
    }
  }
}

// 导出类以供使用
module.exports = JalanKitakantoMatsuriDetailCrawler;

// 如果直接运行此脚本
if (require.main === module) {
  const crawler = new JalanKitakantoMatsuriDetailCrawler();
  crawler
    .run()
    .then(data => {
      console.log('🎉 爬取任务成功完成！');
      process.exit(0);
    })
    .catch(error => {
      console.error('💥 爬取任务失败:', error.message);
      process.exit(1);
    });
}
