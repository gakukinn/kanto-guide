const { chromium } = require('playwright');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

/**
 * Jalan.net 埼玉祭典详情页爬虫 V2 (优化版)
 * 目标：准确爬取特定祭典活动的详细信息
 * 数据层级：四层详情
 * 存储格式：JSON（按照自动化配置规则）
 */
class JalanSaitamaMatsuriDetailCrawlerV2 {
  constructor(targetUrl = '') {
    this.targetUrl = targetUrl;
    this.browser = null;
    this.page = null;
    this.outputPath = path.join(
      __dirname,
      '../../data/saitama-matsuri-detail-v2.json'
    );

    // 数据存储路径（按照自动化配置）
    this.backupPath = path.join(
      __dirname,
      '../../data/temp/matsuri-crawl-backup-v2.json'
    );
  }

  async initialize() {
    console.log('🚀 初始化浏览器（Playwright V2）...');
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
    console.log('🔍 开始提取祭典详情数据（优化版Cheerio解析）...');

    // 获取页面HTML内容
    const htmlContent = await this.page.content();
    const $ = cheerio.load(htmlContent);

    // 保存调试用HTML文件
    const debugPath = path.join(
      __dirname,
      '../../debug/jalan-matsuri-debug-v2.html'
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
        'h1',
        '.event-title',
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
        name =
          $('title')
            .text()
            .trim()
            .replace(/【|】|アクセス・イベント情報 - じゃらんnet/g, '') ||
          '未知祭典';
      }

      matsuriData.name = name;
      matsuriData.japaneseName = name;

      // 提取详细信息表格数据（优化版）
      console.log('📊 提取详细信息表格（优化版）...');
      const detailsTable = {};

      // 方法1：查找所有表格行，专门查找th和td配对
      console.log('🔍 方法1：查找表格行...');
      $('tr').each((index, row) => {
        const $row = $(row);
        const th = $row.find('th').first().text().trim();
        const td = $row.find('td').first().text().trim();

        if (th && td && th.length > 0 && td.length > 0) {
          detailsTable[th] = td;
          console.log(`  ✅ ${th}: ${td}`);
        }
      });

      console.log(
        `📋 表格方法1找到 ${Object.keys(detailsTable).length} 条信息`
      );

      // 方法2：如果表格信息不足，尝试查找特定文本模式
      if (Object.keys(detailsTable).length < 3) {
        console.log('🔍 方法2：查找特定文本模式...');

        // 从meta标签提取基本信息
        const metaDescription =
          $('meta[name="description"]').attr('content') || '';
        if (metaDescription.includes('開催期間：')) {
          const periodMatch = metaDescription.match(/開催期間：([^。]+)/);
          if (periodMatch) {
            detailsTable['開催期間'] = periodMatch[1];
            console.log(`  ✅ 開催期間: ${periodMatch[1]}`);
          }
        }

        // 从JSON-LD结构化数据提取
        $('script[type="application/ld+json"]').each((index, script) => {
          try {
            const jsonText = $(script).html();
            if (jsonText && jsonText.includes('Event')) {
              const jsonData = JSON.parse(jsonText);
              const eventData = Array.isArray(jsonData)
                ? jsonData[0]
                : jsonData;

              if (eventData['@type'] === 'Event') {
                if (eventData.startDate && eventData.endDate) {
                  const startDate = eventData.startDate
                    .replace(/-/g, '年')
                    .replace(/年(\d{2})$/, '年$1日');
                  const endDate = eventData.endDate
                    .replace(/-/g, '年')
                    .replace(/年(\d{2})$/, '年$1日');
                  detailsTable['開催期間'] = `${startDate}～${endDate}`;
                  console.log(
                    `  ✅ 開催期間 (JSON-LD): ${startDate}～${endDate}`
                  );
                }

                if (eventData.location && eventData.location.name) {
                  detailsTable['開催場所'] = eventData.location.name;
                  console.log(
                    `  ✅ 開催場所 (JSON-LD): ${eventData.location.name}`
                  );
                }

                if (
                  eventData.location &&
                  eventData.location.address &&
                  eventData.location.address.streetAddress
                ) {
                  detailsTable['所在地'] =
                    eventData.location.address.streetAddress;
                  console.log(
                    `  ✅ 所在地 (JSON-LD): ${eventData.location.address.streetAddress}`
                  );
                }
              }
            }
          } catch (error) {
            // 忽略JSON解析错误
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

      // 查找主要图片
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
            } else {
              fullSrc = `https://www.jalan.net${src}`;
            }
          }
          images.push(fullSrc);
        }
      });

      matsuriData.images = [...new Set(images)]; // 去重

      // 提取描述
      console.log('📝 提取活动描述...');
      let description = '';

      // 从meta description获取
      const metaDesc = $('meta[name="description"]').attr('content');
      if (metaDesc) {
        description = metaDesc.replace(/。.*/, '。'); // 取第一句
      }

      matsuriData.description = description;

      // 保存原始数据用于调试
      matsuriData.rawData = {
        detailsTable,
        pageTitle: $('title').text().trim(),
        metaDescription: metaDesc,
        extractedFields: Object.keys(detailsTable).length,
      };

      console.log('✅ 数据提取完成');
      console.log(
        `📊 总共提取到 ${Object.keys(detailsTable).length} 个详细字段`
      );

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

      console.log('\n🎉 爬取任务完成！');
      console.log(`📊 提取的数据摘要:`);
      console.log(`   名称: ${data.name}`);
      console.log(`   期间: ${data.period || '未获取'}`);
      console.log(`   场所: ${data.venue || '未获取'}`);
      console.log(`   地址: ${data.location || '未获取'}`);
      console.log(`   交通: ${data.access || '未获取'}`);
      console.log(`   主办: ${data.organizer || '未获取'}`);
      console.log(`   联系: ${data.contact || '未获取'}`);
      console.log(`   网站: ${data.website || '未获取'}`);
      console.log(`   地图: ${data.googleMapUrl || '未获取'}`);
      console.log(`   图片: ${data.images ? data.images.length : 0} 张`);

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

  console.log('🏮 Jalan.net 埼玉祭典详情爬虫 V2 启动');
  console.log(`🎯 目标URL: ${targetUrl}`);
  console.log('💾 存储格式: JSON（按照自动化配置规则，祭典数据使用JSON格式）');
  console.log('📁 数据层级: 四层详情');
  console.log('🗾 地区分类: 埼玉');
  console.log('🔧 版本: V2 优化版（改进表格数据提取）');

  const crawler = new JalanSaitamaMatsuriDetailCrawlerV2();

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

module.exports = JalanSaitamaMatsuriDetailCrawlerV2;
