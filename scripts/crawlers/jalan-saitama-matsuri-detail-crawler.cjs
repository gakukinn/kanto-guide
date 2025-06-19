const { chromium } = require('playwright');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

/**
 * Jalan.net 埼玉祭典详情页爬虫
 * 目标：爬取特定祭典活动的详细信息
 * 数据层级：四层详情
 * 存储格式：JSON（按照自动化配置规则）
 */
class JalanSaitamaMatsuriDetailCrawler {
  constructor(targetUrl = '') {
    this.targetUrl = targetUrl;
    this.browser = null;
    this.page = null;
    this.outputPath = path.join(
      __dirname,
      '../../data/saitama-matsuri-detail.json'
    );

    // 数据存储路径（按照自动化配置）
    this.backupPath = path.join(
      __dirname,
      '../../data/temp/matsuri-crawl-backup.json'
    );
  }

  async initialize() {
    console.log('🚀 初始化浏览器（Playwright）...');
    this.browser = await chromium.launch({
      headless: false, // 设为false以便调试
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-blink-features=AutomationControlled',
      ],
    });

    // 创建浏览器上下文
    const context = await this.browser.newContext({
      userAgent:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      viewport: { width: 1920, height: 1080 },
      extraHTTPHeaders: {
        'Accept-Language': 'ja-JP,ja;q=0.9,en;q=0.8',
      },
    });

    this.page = await context.newPage();

    // 添加请求拦截，模拟真实浏览器行为
    await this.page.route('**/*', route => {
      const request = route.request();
      route.continue();
    });
  }

  async navigateToTarget() {
    if (!this.targetUrl) {
      throw new Error('❌ 目标URL未设置');
    }

    console.log(`📍 导航到目标页面: ${this.targetUrl}`);
    try {
      await this.page.goto(this.targetUrl, {
        waitUntil: 'domcontentloaded',
        timeout: 60000,
      });

      // 等待页面加载完成
      await this.page.waitForTimeout(3000);
      console.log('✅ 页面加载完成');
    } catch (error) {
      console.error('❌ 页面导航失败:', error.message);
      throw error;
    }
  }

  async extractMatsuriDetails() {
    console.log('🔍 开始提取祭典详情数据（使用Cheerio解析）...');

    // 获取页面HTML内容
    const htmlContent = await this.page.content();
    const $ = cheerio.load(htmlContent);

    // 保存调试用HTML文件
    const debugPath = path.join(
      __dirname,
      '../../debug/jalan-matsuri-debug.html'
    );
    fs.writeFileSync(debugPath, htmlContent);
    console.log(`📄 调试HTML已保存: ${debugPath}`);

    const matsuriData = {
      id: `saitama-matsuri-${Date.now()}`,
      level: '4-detail', // 四层详情
      region: 'saitama',
      category: 'matsuri',
      extractedAt: new Date().toISOString(),
      sourceUrl: this.targetUrl,
      rawData: {},
    };

    try {
      // 提取基本信息
      console.log('📝 提取基本信息...');

      // 名称（活动标题）
      const titleSelectors = [
        'h1.event-title',
        'h1',
        '.event-name',
        '.title',
        'h2',
      ];

      let name = '';
      for (const selector of titleSelectors) {
        const element = $(selector).first();
        if (element.length && element.text().trim()) {
          name = element.text().trim();
          console.log(`✅ 名称（选择器: ${selector}）: ${name}`);
          break;
        }
      }

      if (!name) {
        console.log('⚠️  未找到活动名称，使用页面title');
        name = $('title').text().trim() || '未知祭典';
      }

      matsuriData.name = name;
      matsuriData.japaneseName = name;

      // 提取详细信息表格数据
      console.log('📊 提取详细信息表格...');
      const detailsTable = {};

      // 查找包含详细信息的表格或列表
      $('.event-detail table tr, .detail-table tr, .info-table tr').each(
        (index, row) => {
          const $row = $(row);
          const label = $row.find('th, .label, .key').first().text().trim();
          const value = $row.find('td, .value, .content').first().text().trim();

          if (label && value) {
            detailsTable[label] = value;
            console.log(`  ${label}: ${value}`);
          }
        }
      );

      // 如果没有表格，尝试查找其他结构
      if (Object.keys(detailsTable).length === 0) {
        console.log('🔍 未找到表格，尝试其他结构...');

        // 查找定义列表
        $('.event-info dt, .detail-info dt').each((index, dt) => {
          const $dt = $(dt);
          const $dd = $dt.next('dd');
          const label = $dt.text().trim();
          const value = $dd.text().trim();

          if (label && value) {
            detailsTable[label] = value;
            console.log(`  ${label}: ${value}`);
          }
        });
      }

      // 标准化字段映射
      const fieldMapping = {
        開催期間: 'period',
        期間: 'period',
        日程: 'period',
        開催場所: 'venue',
        場所: 'venue',
        会場: 'venue',
        所在地: 'location',
        住所: 'location',
        地域: 'location',
        交通アクセス: 'access',
        アクセス: 'access',
        交通: 'access',
        主催: 'organizer',
        主催者: 'organizer',
        問合せ先: 'contact',
        問い合わせ: 'contact',
        連絡先: 'contact',
        ホームページ: 'website',
        HP: 'website',
        URL: 'website',
        サイト: 'website',
      };

      // 应用字段映射
      for (const [originalKey, standardKey] of Object.entries(fieldMapping)) {
        if (detailsTable[originalKey]) {
          matsuriData[standardKey] = detailsTable[originalKey];
        }
      }

      // 特殊处理：查找谷歌地图链接
      console.log('🗺️  查找谷歌地图链接...');
      const googleMapSelectors = [
        'a[href*="maps.google"]',
        'a[href*="google.com/maps"]',
        'a[href*="goo.gl/maps"]',
        '.map-link a',
        '.access-map a',
      ];

      let googleMapUrl = '';
      for (const selector of googleMapSelectors) {
        const mapLink = $(selector).first();
        if (mapLink.length) {
          googleMapUrl = mapLink.attr('href') || '';
          if (googleMapUrl) {
            console.log(`✅ 找到谷歌地图链接: ${googleMapUrl}`);
            break;
          }
        }
      }

      if (!googleMapUrl) {
        // 在文本中查找地图链接
        const allLinks = $('a').toArray();
        for (const link of allLinks) {
          const href = $(link).attr('href') || '';
          if (
            href.includes('maps.google') ||
            href.includes('google.com/maps')
          ) {
            googleMapUrl = href;
            console.log(`✅ 在文本中找到谷歌地图链接: ${googleMapUrl}`);
            break;
          }
        }
      }

      matsuriData.googleMapUrl = googleMapUrl;

      // 提取图片
      console.log('🖼️  提取图片信息...');
      const images = [];
      $('.event-image img, .main-image img, .gallery img').each(
        (index, img) => {
          const src = $(img).attr('src');
          if (src) {
            const fullSrc = src.startsWith('http')
              ? src
              : `https://www.jalan.net${src}`;
            images.push(fullSrc);
          }
        }
      );
      matsuriData.images = images;

      // 提取描述
      console.log('📝 提取活动描述...');
      const descriptionSelectors = [
        '.event-description',
        '.description',
        '.detail-content',
        '.content',
        '.event-detail p',
      ];

      let description = '';
      for (const selector of descriptionSelectors) {
        const element = $(selector).first();
        if (element.length && element.text().trim()) {
          description = element.text().trim();
          break;
        }
      }
      matsuriData.description = description;

      // 保存原始数据用于调试
      matsuriData.rawData = {
        detailsTable,
        pageTitle: $('title').text().trim(),
        allText: $('body').text().trim().substring(0, 1000), // 前1000字符用于调试
      };

      console.log('✅ 数据提取完成');
      return matsuriData;
    } catch (error) {
      console.error('❌ 数据提取失败:', error.message);
      throw error;
    }
  }

  async saveData(data) {
    console.log('💾 保存数据（JSON格式，按照自动化配置）...');

    try {
      // 确保目录存在
      const dirs = [
        path.dirname(this.outputPath),
        path.dirname(this.backupPath),
      ];

      for (const dir of dirs) {
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
      }

      // 保存主数据文件
      fs.writeFileSync(this.outputPath, JSON.stringify(data, null, 2));
      console.log(`✅ 主数据已保存: ${this.outputPath}`);

      // 保存备份文件
      fs.writeFileSync(this.backupPath, JSON.stringify(data, null, 2));
      console.log(`✅ 备份数据已保存: ${this.backupPath}`);

      // 更新统一的埼玉祭典数据文件
      await this.updateMainMatsuriFile(data);
    } catch (error) {
      console.error('❌ 数据保存失败:', error.message);
      throw error;
    }
  }

  async updateMainMatsuriFile(newData) {
    console.log('🔄 更新主祭典数据文件...');

    try {
      const mainFilePath = path.join(
        __dirname,
        '../../src/data/saitama-matsuri.json'
      );
      let existingData = [];

      // 读取现有数据
      if (fs.existsSync(mainFilePath)) {
        const content = fs.readFileSync(mainFilePath, 'utf8');
        existingData = JSON.parse(content);
      }

      // 检查是否已存在相同数据
      const existingIndex = existingData.findIndex(
        item =>
          item.name === newData.name || item.sourceUrl === newData.sourceUrl
      );

      if (existingIndex >= 0) {
        // 更新现有数据
        existingData[existingIndex] = {
          ...existingData[existingIndex],
          ...newData,
          updatedAt: new Date().toISOString(),
        };
        console.log('✅ 更新了现有祭典数据');
      } else {
        // 添加新数据
        existingData.push(newData);
        console.log('✅ 添加了新祭典数据');
      }

      // 保存更新后的数据
      fs.writeFileSync(mainFilePath, JSON.stringify(existingData, null, 2));
      console.log(`✅ 主祭典文件已更新: ${mainFilePath}`);
    } catch (error) {
      console.error('❌ 更新主祭典文件失败:', error.message);
    }
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
      console.log('🧹 浏览器已关闭');
    }
  }

  async crawl(targetUrl) {
    this.targetUrl = targetUrl;

    try {
      await this.initialize();
      await this.navigateToTarget();
      const data = await this.extractMatsuriDetails();
      await this.saveData(data);

      console.log('🎉 爬取任务完成！');
      console.log(`📊 提取的数据:`);
      console.log(`   名称: ${data.name}`);
      console.log(`   期间: ${data.period || '未获取'}`);
      console.log(`   场所: ${data.venue || '未获取'}`);
      console.log(`   地址: ${data.location || '未获取'}`);
      console.log(`   交通: ${data.access || '未获取'}`);
      console.log(`   主办: ${data.organizer || '未获取'}`);
      console.log(`   联系: ${data.contact || '未获取'}`);
      console.log(`   网站: ${data.website || '未获取'}`);
      console.log(`   地图: ${data.googleMapUrl || '未获取'}`);

      return data;
    } catch (error) {
      console.error('❌ 爬取失败:', error.message);
      throw error;
    } finally {
      await this.cleanup();
    }
  }
}

// 主函数
async function main() {
  const targetUrl =
    process.argv[2] ||
    'https://www.jalan.net/event/evt_343612/?screenId=OUW1702';

  console.log('🏮 Jalan.net 埼玉祭典详情爬虫启动');
  console.log(`🎯 目标URL: ${targetUrl}`);
  console.log('💾 存储格式: JSON（按照自动化配置规则，祭典数据使用JSON格式）');
  console.log('📁 数据层级: 四层详情');
  console.log('🗾 地区分类: 埼玉');

  const crawler = new JalanSaitamaMatsuriDetailCrawler();

  try {
    const result = await crawler.crawl(targetUrl);
    console.log('\n🎊 任务执行成功！');
    process.exit(0);
  } catch (error) {
    console.error('\n💥 任务执行失败:', error.message);
    process.exit(1);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  main();
}

module.exports = JalanSaitamaMatsuriDetailCrawler;
